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

    // Validate promo code if provided
    if (promoCode) {
      const code = promoCode.toUpperCase().trim();
      const validCode = PROMO_CODES[code];

      if (!validCode) {
        return res.status(400).json({ 
          error: 'Invalid promo code',
          message: 'That promo code is not valid. Please check and try again.'
        });
      }

      // Check if code is valid for this tier
      if (validCode.tier !== 'both' && validCode.tier !== tier) {
        return res.status(400).json({ 
          error: 'Invalid promo code for this tier',
          message: `This code is only valid for ${validCode.tier} tier.`
        });
      }

      // Code is valid and gives 100% discount - skip payment
      if (validCode.discount === 100) {
        // Send analysis email immediately
        const emailResponse = await fetch(`${process.env.VERCEL_URL || 'http://localhost:3000'}/api/send-email`, {
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

        return res.status(200).json({
          success: true,
          free: true,
          message: `Promo code applied! Your ${tier} analysis has been sent to ${petData.email}`,
          tier: tier
        });
      }
    }

    // No promo code or code doesn't give 100% discount - create Stripe checkout
    let priceAmount, productName, paymentLink;

    if (tier === 'essential') {
      priceAmount = 2026; // $20.26 in cents
      productName = 'Essential Analysis Package';
      paymentLink = 'https://buy.stripe.com/cNicN6b7s2Es4PwbBu8EM02';
    } else if (tier === 'premium') {
      priceAmount = 6220; // $62.20 in cents
      productName = 'Premium Wellness Package';
      paymentLink = 'https://buy.stripe.com/fZu00k5N80wkgye5d68EM03';
    } else {
      return res.status(400).json({ error: 'Invalid tier' });
    }

    // Store pet data and lab results in metadata for retrieval after payment
    const metadata = {
      petName: petData.name,
      petEmail: petData.email,
      petBreed: petData.breed,
      petAge: petData.age,
      petWeight: petData.weight,
      petSex: petData.sex,
      tier: tier,
      // Note: labResults might be too long for metadata, store separately if needed
    };

    // Redirect to Stripe payment link with metadata
    // For now, use the payment links you provided
    return res.status(200).json({
      success: true,
      paymentUrl: paymentLink,
      tier: tier,
      amount: priceAmount
    });

  } catch (error) {
    console.error('Checkout error:', error);
    return res.status(500).json({ 
      error: 'Payment processing failed',
      details: error.message 
    });
  }
}
