import Stripe from ‘stripe’;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Valid promo codes
const PROMO_CODES = {
‘NEWYEAR2025’: { tier: ‘essential’, discount: 100 },
‘FRESHSTART’: { tier: ‘essential’, discount: 100 },
‘BETA2025’: { tier: ‘essential’, discount: 100 },
‘INVESTOR25’: { tier: ‘premium’, discount: 100 },
‘LAUNCH2025’: { tier: ‘premium’, discount: 100 },
‘2025PETS’: { tier: ‘premium’, discount: 100 },
‘PETLABAI2025’: { tier: ‘both’, discount: 100 }
};

export default async function handler(req, res) {
// Add CORS headers
res.setHeader(‘Access-Control-Allow-Origin’, ‘*’);
res.setHeader(‘Access-Control-Allow-Methods’, ‘POST, OPTIONS’);
res.setHeader(‘Access-Control-Allow-Headers’, ‘Content-Type’);

if (req.method === ‘OPTIONS’) {
return res.status(200).end();
}

if (req.method !== ‘POST’) {
return res.status(405).json({ error: ‘Method not allowed’ });
}

try {
const { tier, promoCode, petData, labResults } = req.body;

```
console.log('Payment request:', { tier, promoCode: promoCode ? 'PROVIDED' : 'NONE', email: petData?.email });

// Validate required data
if (!tier || !petData || !petData.email) {
 return res.status(400).json({
   error: 'Missing required data',
   message: 'Please ensure all pet information is filled out.'
 });
}

// Handle promo code
if (promoCode) {
 const code = promoCode.toUpperCase().trim();
 const validCode = PROMO_CODES[code];

 console.log('Checking promo code:', code, 'Valid:', !!validCode);

 if (!validCode) {
   return res.status(400).json({
     error: 'Invalid promo code',
     message: 'That promo code is not valid. Please check and try again.'
   });
 }

 if (validCode.tier !== 'both' && validCode.tier !== tier) {
   return res.status(400).json({
     error: 'Invalid promo code for this tier',
     message: `This code is only valid for ${validCode.tier} tier.`
   });
 }

 // Code is valid - send email with analysis
 if (validCode.discount === 100) {
   console.log('Promo code valid! Sending email to:', petData.email);

   try {
     const baseUrl = process.env.VERCEL_URL
       ? `https://${process.env.VERCEL_URL}`
       : 'https://petlabai.com';

     const emailResponse = await fetch(`${baseUrl}/api/send-email`, {
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

     const emailResult = await emailResponse.json();
     console.log('Email sent:', emailResult);

     return res.status(200).json({
       success: true,
       free: true,
       message: `🎉 Promo code applied! Your ${tier} analysis has been sent to ${petData.email}`,
       tier: tier
     });
   } catch (emailError) {
     console.error('Email error:', emailError);
     return res.status(200).json({
       success: true,
       free: true,
       message: `Promo code applied! Please check your email at ${petData.email}`,
       tier: tier
     });
   }
 }
}

// No promo code - create payment link
let paymentLink;

if (tier === 'essential') {
 paymentLink = 'https://buy.stripe.com/cNicN6b7s2Es4PwbBu8EM02';
} else if (tier === 'premium') {
 paymentLink = 'https://buy.stripe.com/fZu00k5N80wkgye5d68EM03';
} else {
 return res.status(400).json({
   error: 'Invalid tier',
   message: 'Please select a valid package tier.'
 });
}

console.log('Redirecting to payment:', paymentLink);

return res.status(200).json({
 success: true,
 paymentUrl: paymentLink,
 tier: tier
});
```

} catch (error) {
console.error(‘Checkout error:’, error);
return res.status(500).json({
error: ‘Payment processing failed’,
message: error.message || ‘An unexpected error occurred. Please try again.’,
details: process.env.NODE_ENV === ‘development’ ? error.stack : undefined
});
}
}
