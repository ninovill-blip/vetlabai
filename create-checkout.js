import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Valid promo codes
const PROMO_CODES = {
  // Essential tier codes (make it free)
  'NEWYEAR2025': { tier: 'essential', discount: 100 },
  'FRESHSTART': { tier: 'essential', discount: 100 },
  'BETA2025': { tier: 'essential', discount: 100 },
  
  // Premium tier codes (make it free)
  'INVESTOR25': { tier: 'premium', discount: 100 },
  'LAUNCH2025': { tier: 'premium', discount: 100 },
  '2025PETS': { tier: 'premium', discount: 100 },
  
  // Master code (works for both)
  'PETLABAI2025': { tier: 'both', discount: 100 }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { tier, promoCode, petData, labResults } = req.body;

    console.log('═══════════════════════════════════════════════');
    console.log('🎫 CHECKOUT INITIATED');
    console.log('Tier:', tier);
    console.log('Promo Code:', promoCode || 'none');
    console.log('Email:', petData?.email);
    console.log('Pet Name:', petData?.name);
    console.log('═══════════════════════════════════════════════');

    // Validate promo code if provided
    if (promoCode) {
      const code = promoCode.toUpperCase().trim();
      const validCode = PROMO_CODES[code];

      if (!validCode) {
        console.log('❌ Invalid promo code:', code);
        return res.status(400).json({ 
          error: true,
          message: 'That promo code is not valid. Please check and try again.'
        });
      }

      // Check if code is valid for this tier
      if (validCode.tier !== 'both' && validCode.tier !== tier) {
        console.log('❌ Promo code tier mismatch');
        console.log('   Code tier:', validCode.tier);
        console.log('   Selected tier:', tier);
        return res.status(400).json({ 
          error: true,
          message: `This code is only valid for ${validCode.tier} tier.`
        });
      }

      // Code is valid and gives 100% discount - send email
      if (validCode.discount === 100) {
        console.log('✅ Valid 100% discount code:', code);
        console.log('📧 Attempting to send email...');
        
        try {
          const emailPayload = {
            userEmail: petData.email,
            petName: petData.name,
            petBreed: petData.breed,
            petAge: petData.age,
            petWeight: petData.weight,
            petSex: petData.sex,
            analysis: labResults,
            tier: tier,
            promoCode: code
          };

          console.log('Email payload:', JSON.stringify(emailPayload, null, 2));

          const emailResponse = await fetch('https://petlabai.com/api/send-email', {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailPayload)
          });

          console.log('Email API status:', emailResponse.status);
          
          const emailResult = await emailResponse.json();
          console.log('Email API response:', JSON.stringify(emailResult, null, 2));

          if (!emailResponse.ok) {
            console.error('❌ Email API returned error');
            console.error('Status:', emailResponse.status);
            console.error('Response:', emailResult);
            
            // Still return success to user, log error for debugging
            return res.status(200).json({
              success: true,
              free: true,
              message: `✅ Promo code applied! We're sending your ${tier} analysis to ${petData.email}. Check spam if not received in 2 minutes.`,
              tier: tier,
              emailWarning: 'Email may be delayed'
            });
          }

          console.log('✅ Email sent successfully!');
          console.log('Message ID:', emailResult.messageId);

          return res.status(200).json({
            success: true,
            free: true,
            message: `🎉 Promo code applied! Your ${tier} analysis has been sent to ${petData.email}`,
            tier: tier,
            messageId: emailResult.messageId
          });

        } catch (emailError) {
          console.error('❌ EMAIL SENDING ERROR:');
          console.error(emailError);
          console.error('Stack:', emailError.stack);
          
          // Still return success to user
          return res.status(200).json({
            success: true,
            free: true,
            message: `Promo code applied! We'll send your ${tier} analysis to ${petData.email} shortly. Check spam folder.`,
            tier: tier,
            emailError: true
          });
        }
      }
    }

    // No promo code or code doesn't give 100% discount - redirect to Stripe
    let paymentLink;

    if (tier === 'essential') {
      paymentLink = 'https://buy.stripe.com/cNicN6b7s2Es4PwbBu8EM02';
    } else if (tier === 'premium') {
      paymentLink = 'https://buy.stripe.com/fZu00k5N80wkgye5d68EM03';
    } else {
      console.log('❌ Invalid tier:', tier);
      return res.status(400).json({ error: true, message: 'Invalid tier selected' });
    }

    console.log('💳 Redirecting to Stripe:', paymentLink);

    return res.status(200).json({
      success: true,
      paymentUrl: paymentLink,
      tier: tier
    });

  } catch (error) {
    console.error('❌ CHECKOUT ERROR:');
    console.error(error);
    console.error('Stack:', error.stack);
    return res.status(500).json({ 
      error: true,
      message: 'Payment processing failed. Please try again or contact support.'
    });
  }
}
