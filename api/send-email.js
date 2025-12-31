import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { 
      userEmail, 
      petName, 
      petBreed,
      petAge,
      petWeight,
      petSex,
      analysis,
      tier = 'basic',
      promoCode = null
    } = req.body;

    if (!userEmail || !petName || !analysis) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    let subject, emailBody;
    const promoMessage = promoCode ? `\n🎉 Promo Code Applied: ${promoCode}` : '';

    if (tier === 'basic') {
      subject = `🐾 ${petName}'s Blood Work Analysis is Ready!`;
      emailBody = `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

           🐾 PETLABAI EDUCATIONAL BLOOD WORK ANALYSIS 🐾

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


Dear ${petName}'s Parent,

We know how it feels to stare at your dog's blood work results and 
feel... lost. Those numbers, those ranges, that medical jargon—it can 
feel overwhelming when all you want is to understand: "Is my baby okay?"

You're not alone. And you deserve answers.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

                    🐕 UNDERSTANDING ${petName.toUpperCase()}

Name: ${petName}
Breed: ${petBreed}
Age: ${petAge} years
Weight: ${petWeight} lbs
Sex: ${petSex}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${analysis}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

                    💙 YOU'RE DOING GREAT

By seeking to understand ${petName}'s health, you're already being 
the advocate ${petName} needs.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

                    💎 WANT DEEPER INSIGHTS?

Upgrade to our Complete Educational Package:

✅ Full Holistic Pattern Analysis™
✅ Detailed marker-by-marker interpretation
✅ Supplement recommendations & research
✅ Diet & lifestyle guidance

ESSENTIAL: $20.26 (New Year Special!)
PREMIUM: $62.20 (New Year Special!)

Visit petlabai.com to upgrade!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️ EDUCATIONAL DISCLAIMER

This PetLabAI Blood Work Analysis is provided for EDUCATIONAL 
PURPOSES ONLY. It does not constitute veterinary medical advice, 
diagnosis, or treatment.

Always consult with your veterinarian before making any decisions 
regarding ${petName}'s health, treatment, or care.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

With care,
The PetLabAI Team

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;

    } else if (tier === 'essential') {
      subject = `🎉 ${petName}'s Complete Educational Package!`;
      emailBody = `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

     🐾 PETLABAI COMPLETE EDUCATIONAL ANALYSIS 🐾
     
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


Dear ${petName}'s Parent,

Thank you for choosing the Essential Package!${promoMessage}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

                    🐕 ${petName.toUpperCase()}'S PROFILE

Name: ${petName}
Breed: ${petBreed}
Age: ${petAge} years
Weight: ${petWeight} lbs
Sex: ${petSex}
Package: Essential ($20.26 value)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${analysis}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️ EDUCATIONAL DISCLAIMER

This analysis is for educational purposes only. Always consult your 
licensed veterinarian.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

With care,
The PetLabAI Team

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;

    } else if (tier === 'premium') {
      subject = `🌟 ${petName}'s Premium Wellness Package!`;
      emailBody = `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

       🐾 PETLABAI PREMIUM WELLNESS ANALYSIS 🐾
       
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


Dear ${petName}'s Devoted Parent,

You went Premium. You went ALL IN on ${petName}.${promoMessage}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

                    🐕 ${petName.toUpperCase()}'S PROFILE

Name: ${petName}
Breed: ${petBreed}
Age: ${petAge} years
Weight: ${petWeight} lbs
Sex: ${petSex}
Package: Premium Wellness ($62.20 value)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${analysis}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️ EDUCATIONAL DISCLAIMER

Always consult your licensed veterinarian before making health decisions.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Priority Support: Reply to this email anytime!

With deep gratitude,
The PetLabAI Team

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
    }

    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: userEmail,
      subject: subject,
      text: emailBody,
    });

    console.log(`📧 Email sent | To: ${userEmail} | Pet: ${petName} | Tier: ${tier}`);

    return res.status(200).json({ 
      success: true, 
      messageId: data.id,
      tier: tier 
    });

  } catch (error) {
    console.error('Email sending error:', error);
    return res.status(500).json({ 
      error: 'Failed to send email',
      details: error.message 
    });
  }
}
