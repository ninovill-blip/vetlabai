import { Resend } from ‘resend’;

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
// Only allow POST requests
if (req.method !== ‘POST’) {
return res.status(405).json({ error: ‘Method not allowed’ });
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
tier = ‘basic’
} = req.body;

```
// Validate required fields
if (!userEmail || !petName || !analysis) {
  return res.status(400).json({ error: 'Missing required fields' });
}

// Determine email content based on tier
let subject, emailBody;

if (tier === 'basic') {
  subject = `🐾 ${petName}'s Blood Work Analysis is Ready!`;
  emailBody = `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

       🐾 PETLABAI EDUCATIONAL BLOOD WORK ANALYSIS 🐾
```

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Dear ${petName}’s Parent,

We know how it feels to stare at your dog’s blood work results and
feel… lost. Those numbers, those ranges, that medical jargon—it can
feel overwhelming when all you want is to understand: “Is my baby okay?”

You’re not alone. And you deserve answers.

That’s why we created PetLabAI’s proprietary Blood Testing Algorithm—
a sophisticated analysis system that takes ${petName}’s unique blood
markers and translates them into clear, actionable insights that YOU
can understand.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```
                📊 HOW OUR SYSTEM WORKS
```

Our advanced algorithm analyzes ${petName}’s blood work through
multiple layers:

✅ BIOMARKER ANALYSIS: Each value is cross-referenced against
veterinary-validated reference ranges specific to ${petName}’s
breed, age, and health profile.

✅ PATTERN RECOGNITION: We don’t just look at numbers in isolation—
we identify patterns across multiple markers that could indicate
underlying health trends.

✅ HOLISTIC CORRELATION: We connect the dots between different
organ systems to give you a complete picture of ${petName}’s
overall wellness.

✅ BREED-SPECIFIC INSIGHTS: ${petBreed} dogs have unique health
considerations—our algorithm accounts for these.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```
                ⚠️ IMPORTANT TO UNDERSTAND
```

This analysis is EDUCATIONAL ONLY. It is designed for YOU,
${petName}’s parent, to:

• Better understand what ${petName}’s numbers mean
• Know which questions to ask your veterinarian
• Feel empowered in conversations about ${petName}’s health
• Advocate effectively for ${petName}’s wellbeing

PetLabAI does NOT diagnose, treat, or prescribe. Only your
licensed veterinarian can do that. Think of this as your
personal translator—helping you understand the language of
${petName}’s blood work so you can be the informed, proactive
parent ${petName} deserves.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```
                🐕 UNDERSTANDING ${petName.toUpperCase()}
```

Name: ${petName}
Breed: ${petBreed}
Age: ${petAge} years
Weight: ${petWeight} lbs
Sex: ${petSex}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Now, let’s help you understand what ${petName}’s blood work
is telling us…

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${analysis}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```
                💙 YOU'RE DOING GREAT
```

By seeking to understand ${petName}‘s health, you’re already being
the advocate ${petName} needs. Armed with this knowledge, you can now:

✅ Have more informed conversations with your vet
✅ Ask specific, targeted questions about ${petName}’s health
✅ Understand which areas might need monitoring
✅ Feel confident in making decisions for ${petName}’s care

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```
                💎 WANT DEEPER INSIGHTS?
```

This was our Basic Analysis. Upgrade to our Complete Educational
Package for:

✅ Full Holistic Pattern Analysis™
✅ Detailed marker-by-marker interpretation
✅ Supplement recommendations & research
✅ Diet & lifestyle guidance
✅ Questions to ask your veterinarian

Normally $29 - Completely FREE during beta!
Visit petlabai.com to upgrade today!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```
                🔬 ABOUT PETLABAI'S ALGORITHM
```

Our Blood Testing Analysis Algorithm combines veterinary-validated
reference ranges with breed-specific health databases, holistic pattern
recognition, and cross-system biomarker correlation to provide
educational insights that help pet parents like you bridge the gap
between confusing lab results and confident understanding.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```
                ⚠️ FINAL DISCLAIMER
```

This PetLabAI Blood Work Analysis is provided for EDUCATIONAL
PURPOSES ONLY. It does not constitute veterinary medical advice,
diagnosis, or treatment.

This analysis is designed to help you, as ${petName}’s parent,
better understand blood work results and have more informed
conversations with your licensed veterinarian.

Always consult with your veterinarian before making any decisions
regarding ${petName}’s health, treatment, or care.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Questions about this analysis? Reply to this email—we’re here to help!

With care and commitment to ${petName}’s wellness,

The PetLabAI Team

P.S. Your feedback helps us improve! How was your experience?
Just hit reply and let us know.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;

```
} else if (tier === 'essential') {
  subject = `🎉 ${petName}'s Complete Educational Package is Ready!`;
  emailBody = `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

 🐾 PETLABAI COMPLETE EDUCATIONAL BLOOD WORK ANALYSIS 🐾
```

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Dear ${petName}’s Parent,

We know the weight you carry—wondering if you’re doing enough,
if you’re catching things early enough, if you’re asking your vet
the right questions. That weight? It’s love. And ${petName} is
lucky to have you.

You took the next step by getting this Complete Educational Analysis.

That tells us everything we need to know about you: You’re the kind
of pet parent who doesn’t just accept “everything looks fine.” You
want to UNDERSTAND. You want to be ${petName}’s ADVOCATE. You want
to be EMPOWERED.

And that’s exactly what PetLabAI’s Blood Testing Algorithm is
designed to give you.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```
                📊 HOW OUR SYSTEM WORKS
```

Our proprietary algorithm doesn’t just read numbers—it tells stories.

For ${petName}, we’ve conducted a multi-layered analysis:

✅ BIOMARKER DEEP DIVE: Each marker analyzed against veterinary-
validated ranges specific to ${petBreed} dogs of ${petAge} years.

✅ HOLISTIC PATTERN RECOGNITION: We look at how ${petName}’s
organ systems communicate with each other through blood chemistry.

✅ CROSS-SYSTEM CORRELATION: Liver talking to kidneys? Thyroid
affecting metabolism? We connect those dots for you.

✅ BREED & AGE OPTIMIZATION: ${petBreed}s have unique health
profiles—our algorithm knows this and adjusts accordingly.

✅ SUPPLEMENT & LIFESTYLE INSIGHTS: Evidence-based recommendations
for supporting ${petName}’s wellness naturally.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```
                ⚠️ WHAT THIS ANALYSIS IS FOR
```

This is YOUR TOOL as ${petName}’s parent. Use it to:

• Understand what each marker means for ${petName} specifically
• Identify which trends to monitor over time
• Ask targeted, informed questions at your next vet visit
• Advocate confidently for ${petName}’s health
• Make empowered decisions about ${petName}’s care

This analysis is EDUCATIONAL and does NOT replace veterinary care.
Think of it as your translator, your guide, your confidence boost
for those vet appointments where you want to be heard and understood.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```
                🐕 ${petName.toUpperCase()}'S PROFILE
```

Name: ${petName}
Breed: ${petBreed}
Age: ${petAge} years
Weight: ${petWeight} lbs
Sex: ${petSex}
Analysis Tier: Complete Educational Package ($29 value)
Status: FREE Beta Access

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Now, let’s dive deep into what ${petName}’s blood work is
revealing about their health…

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${analysis}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```
                💙 YOU'RE AN AMAZING PET PARENT
```

By seeking this level of understanding, you’re doing something
most pet parents never do. You’re going beyond “the numbers look
fine” and asking “but what do they MEAN for my specific dog?”

That’s advocacy. That’s love in action.

Now you can walk into your vet’s office armed with:
✅ Specific questions about ${petName}’s health trends
✅ Understanding of which markers need monitoring
✅ Confidence to discuss holistic support options
✅ Knowledge to be a true partner in ${petName}’s care

Your vet will appreciate having an engaged, informed partner.
And ${petName}? ${petName} gets the best possible advocate—YOU.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```
                🌟 WANT THE ULTIMATE PACKAGE?
```

You received our Complete Educational Package ($29 value).

Ready for our Premium Wellness Package? It includes:
✅ Everything in this analysis PLUS:
✅ Personalized breed-specific nutrition guide
✅ Research-backed supplement protocols
✅ 90-day wellness tracking plan
✅ Priority email support

Normally $99 - FREE during beta!
Visit petlabai.com to upgrade!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```
                🔬 ABOUT OUR ALGORITHM
```

PetLabAI’s Blood Testing Analysis Algorithm is built on:
• Veterinary-validated reference ranges
• Breed-specific health databases (200+ breeds)
• Holistic pattern recognition systems
• Cross-system biomarker correlation
• Evidence-based supplement research
• Age and sex-adjusted interpretations

Developed in consultation with holistic veterinarians and
continuously updated with peer-reviewed veterinary research,
our algorithm bridges the gap between complex lab results and
empowered pet parenting.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```
                ⚠️ FINAL DISCLAIMER
```

This PetLabAI Blood Work Analysis is provided for EDUCATIONAL
PURPOSES ONLY. It is designed for you, ${petName}’s parent, to:

• Better understand blood work results
• Have more informed conversations with your veterinarian
• Know which questions to ask
• Feel empowered as ${petName}’s health advocate

This analysis does NOT constitute veterinary medical advice,
diagnosis, or treatment. Only your licensed veterinarian can
provide medical advice for ${petName}.

Always consult with your veterinarian before making any
decisions regarding ${petName}’s health, treatment, or care.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Questions? Reply to this email—we read every message!

As a beta tester, your feedback shapes PetLabAI’s future.
What did you love? What could be better? Tell us everything!

With deep gratitude for trusting us with ${petName}’s wellness,

The PetLabAI Team

P.S. ${petName} is lucky to have you. Never forget that. 💙

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;

```
} else if (tier === 'premium') {
  subject = `🌟 ${petName}'s Premium Wellness Package - You're All In!`;
  emailBody = `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

   🐾 PETLABAI PREMIUM WELLNESS BLOOD WORK ANALYSIS 🐾
```

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Dear ${petName}’s Devoted Parent,

You went Premium. You went ALL IN on ${petName}.

Do you know how rare that is? Most pet parents stop at “the labs
look fine.” But not you. You’re here because you want MORE—more
understanding, more insights, more ways to support ${petName}’s
health proactively.

You’re not just a pet parent. You’re a health advocate, a wellness
champion, a fierce protector of the life you’ve been entrusted with.

${petName} doesn’t know it yet, but they just won the lottery. Because
they have YOU.

And we’re honored to be part of your journey.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```
                📊 THE PREMIUM DIFFERENCE
```

This isn’t just blood work analysis. This is a complete wellness
blueprint powered by PetLabAI’s most advanced algorithm.

For ${petName}, we’re delivering:

✅ ELITE BIOMARKER ANALYSIS: Every single marker analyzed through
multiple veterinary databases specific to ${petBreed}s at ${petAge} years.

✅ ADVANCED PATTERN RECOGNITION: Our AI identifies subtle trends
that might not be “abnormal” yet but could indicate future concerns.

✅ HOLISTIC SYSTEM MAPPING: See how ${petName}’s liver, kidneys,
thyroid, immune system, and metabolism interconnect.

✅ BREED-SPECIFIC DEEP DIVE: ${petBreed}s have unique genetic
predispositions—we highlight what to watch for specifically.

✅ PERSONALIZED SUPPLEMENT PROTOCOLS: Research-backed, vet-approved
natural support options tailored to ${petName}’s needs.

✅ NUTRITION OPTIMIZATION: Breed-specific dietary recommendations
to support ${petName}’s blood work findings.

✅ 90-DAY WELLNESS ROADMAP: Your action plan for monitoring and
optimizing ${petName}’s health over the next quarter.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```
                ⚠️ THIS IS YOUR EMPOWERMENT TOOL
```

Use this Premium Analysis to:

• Understand ${petName}’s health at the deepest level
• Proactively support wellness before issues arise
• Ask your vet THE most informed questions possible
• Make evidence-based decisions about supplements & nutrition
• Track trends over time with your 90-day roadmap
• Advocate for ${petName} with confidence and knowledge

This is EDUCATIONAL—designed to make you the most informed,
empowered pet parent in your vet’s waiting room. Your vet will
notice. They’ll appreciate you. And ${petName} will benefit
from having a true health partner in you.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```
                🐕 ${petName.toUpperCase()}'S PROFILE
```

Name: ${petName}
Breed: ${petBreed}
Age: ${petAge} years
Weight: ${petWeight} lbs
Sex: ${petSex}
Analysis Tier: Premium Wellness Package ($99 value)
Status: FREE Beta Access - FULL ACCESS UNLOCKED

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Here’s everything you need to be ${petName}’s ultimate
health advocate…

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${analysis}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```
                💎 YOUR PREMIUM PACKAGE INCLUDES
```

✅ Complete Blood Work Analysis (as shown above)
✅ Breed-Specific Nutrition Guide (for ${petBreed}s)
✅ Research-Backed Supplement Protocol
✅ 90-Day Wellness Tracking Plan
✅ Questions to Ask Your Vet (personalized list)
✅ Holistic Support Recommendations
✅ Priority Email Support (reply anytime!)

📦 COMING WHEN WE LAUNCH:
• Premium vitamin packs (${petBreed}-optimized)
• Printed nutrition & wellness guides
• Probiotic supplements
• Monthly wellness check-in emails

As a beta tester, you’re locked in for life at 50% off!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```
                💙 YOU'RE EXTRAORDINARY
```

Most people don’t do this. They don’t invest this level of care,
attention, and love into understanding their dog’s health.

But you’re not “most people.”

You’re the person who:
✅ Googles every symptom at 2am
✅ Reads ingredient labels on dog food
✅ Takes notes at vet appointments
✅ Asks “but WHY?” when told “it’s fine”
✅ Would do ANYTHING for ${petName}

That’s not helicopter parenting. That’s LOVE.

And with this Premium Analysis, you now have:
• The knowledge to back up your instincts
• The vocabulary to communicate with your vet as a partner
• The confidence to make informed decisions
• The roadmap to support ${petName}’s wellness proactively

${petName} can’t thank you. But if they could, they would.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```
                🔬 ABOUT OUR PREMIUM ALGORITHM
```

PetLabAI’s Premium Wellness Algorithm represents the cutting
edge of pet health education technology:

• Veterinary-validated ranges from 50+ reference databases
• Breed-specific health profiles for 200+ breeds
• AI-powered pattern recognition across 100+ biomarkers
• Holistic cross-system correlation analysis
• Evidence-based supplement research from 1,000+ studies
• Nutritional optimization data specific to life stage & breed
• Age, sex, and weight-adjusted interpretations

Developed in partnership with holistic veterinarians, veterinary
nutritionists, and AI specialists, this is the most comprehensive
educational blood work analysis system available to pet parents.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```
                ⚠️ LEGAL DISCLAIMER (Important)
```

This PetLabAI Premium Wellness Analysis is provided for
EDUCATIONAL PURPOSES ONLY.

It is designed to help you, ${petName}’s parent:
• Understand blood work results at a deeper level
• Make informed decisions about wellness support
• Communicate effectively with your veterinarian
• Advocate confidently for ${petName}’s health

This analysis does NOT:
• Diagnose medical conditions
• Prescribe treatments or medications
• Replace veterinary medical advice
• Constitute a doctor-patient relationship

Only your licensed veterinarian can diagnose and treat ${petName}.
All recommendations should be discussed with your vet before
implementation.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```
                💬 WE'RE HERE FOR YOU
```

Premium means priority. Questions about ${petName}‘s analysis?
Reply to this email—we’ll respond within 24 hours.

As our beta tester, you’re shaping the future of PetLabAI.
Your feedback is gold. Tell us:
• What surprised you most?
• What would you add?
• Would you recommend this to other pet parents?

Every insight helps us serve ${petName} better.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

With profound respect for your commitment to ${petName},

The PetLabAI Team

P.S. Seriously—thank you. The world needs more pet parents
like you. ${petName} is one lucky pup. 💙🐾

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
}

```
// Send email using Resend
const data = await resend.emails.send({
  from: 'onboarding@resend.dev',
  to: userEmail,
  subject: subject,
  text: emailBody,
});

// Log the tier selection for analytics
console.log(`📧 Email sent to ${userEmail} | Pet: ${petName} | Tier: ${tier}`);

return res.status(200).json({ 
  success: true, 
  messageId: data.id,
  tier: tier 
});
```

} catch (error) {
console.error(‘Email sending error:’, error);
return res.status(500).json({
error: ‘Failed to send email’,
details: error.message
});
}
}
