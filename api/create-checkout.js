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

    console.log('Checkout initiated:', { tier, promoCode: promoCode || 'none' });

    // Validate promo code if provided
    if (promoCode) {
      const code = promoCode.toUpperCase().trim();
      const validCode = PROMO_CODES[code];

      if (!validCode) {
        console.log('Invalid promo code:', code);
        return res.status(400).json({ 
          error: true,
          message: 'That promo code is not valid. Please check and try again.'
        });
      }

      // Check if code is valid for this tier
      if (validCode.tier !== 'both' && validCode.tier !== tier) {
        console.log('Promo code tier mismatch:', { code, expectedTier: validCode.tier, providedTier: tier });
        return res.status(400).json({ 
          error: true,
          message: `This code is only valid for ${validCode.tier} tier.`
        });
      }

      // Code is valid and gives 100% discount - skip payment
      if (validCode.discount === 100) {
        console.log('Valid 100% discount code applied:', code);
        
        try {
          // Send analysis email immediately using absolute URL
          const emailResponse = await fetch('https://petlabai.com/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userEmail: petData.email,
              petName: petData.name,
              petBreed: petData.breed,
              petAge: petData.age,
              petWeight: petData.weight,
              petSex: petData.sex,
              analysis: labResults,
              tier: tier,
              promoCode: code
            })
          });

          if (!emailResponse.ok) {
            console.error('Email API error:', await emailResponse.text());
          } else {
            console.log('Email sent successfully via promo code');
          }

          return res.status(200).json({
            success: true,
            free: true,
            message: `🎉 Promo code applied! Your ${tier} analysis has been sent to ${petData.email}`,
            tier: tier
          });

        } catch (emailError) {
          console.error('Email sending failed:', emailError);
          // Still return success since promo code was valid
          return res.status(200).json({
            success: true,
            free: true,
            message: `Promo code applied! We'll send your analysis to ${petData.email} shortly.`,
            tier: tier
          });
        }
      }
    }

    // No promo code or code doesn't give 100% discount - create Stripe checkout
    let paymentLink;

    if (tier === 'essential') {
      paymentLink = 'https://buy.stripe.com/cNicN6b7s2Es4PwbBu8EM02';
    } else if (tier === 'premium') {
      paymentLink = 'https://buy.stripe.com/fZu00k5N80wkgye5d68EM03';
    } else {
      return res.status(400).json({ error: true, message: 'Invalid tier' });
    }

    console.log('Redirecting to Stripe:', paymentLink);

    // Redirect to Stripe payment link
    return res.status(200).json({
      success: true,
      paymentUrl: paymentLink,
      tier: tier
    });

  } catch (error) {
    console.error('Checkout error:', error);
    return res.status(500).json({ 
      error: true,
      message: 'Payment processing failed. Please try again.'
    });
  }
}
