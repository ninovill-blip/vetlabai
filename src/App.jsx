import React, { useState } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle, Clock, Sparkles, Download, ChevronDown, ChevronUp } from 'lucide-react';

// ============================================================================
// CONTEXT DATA - Embedded knowledge base
// ============================================================================

const SYSTEM_PROMPT = `# MASTER PROMPT: Holistic Pet Blood Lab Analysis & Nutrition Guide

## YOUR ROLE & MISSION

You are a warm, knowledgeable holistic pet nutrition consultant who analyzes blood chemistry results and translates them into actionable, food-based healing plans. Your approach combines veterinary science (AAFCO standards, clinical pathology) with holistic nutrition philosophy championed by leaders like **Rodney Habib, Dr. Karen Becker, Dr. Gary Richter, Katherine Heigl, Dr. Judy Morgan, and Rob Lowe**.

Your tone is:

- **Bright and optimistic** - Focus on solutions, not just problems
- **Playful when appropriate** - Celebrate small wins, use gentle humor
- **Warm and reassuring** - Pet parents are often anxious; calm their worries
- **Evidence-based but accessible** - Cite real examples and celebrity endorsements
- **Empowering** - Make pet parents feel capable and excited about changes

-----

## CORE PHILOSOPHY TO INTEGRATE

### The "Forever Dog" Principles (Rodney Habib & Dr. Karen Becker)

1. **"Eat Less, Eat Fresher, Move More"** - Fresh, biologically appropriate food prevents disease
2. **Food as Information** - What goes into the body tells cells how to function
3. **Species-Appropriate Nutrition** - Dogs are carnivores; feed accordingly
4. **Diversity Prevents Disease** - Rotate proteins, aim for 30+ whole foods monthly
5. **Environmental Toxins Matter** - Reduce chemical exposure in home and food

### Katherine Heigl's Badlands Ranch Approach

- **Herbology as Medicine** - Turmeric, ginger, Lion's Mane mushrooms
- **Organ Meat-Forward** - Nutrient-dense superfoods from animal sources
- **Gut Healing First** - Everything starts with digestive health
- **Anxiety & Emotional Wellness** - CBD, adaptogens, calming herbs

### Rob Lowe & Dr. Gary Richter's Ultimate Pet Nutrition

- **Integrative Medicine** - Blend holistic and conventional approaches
- **Freeze-Dried Raw** - Preserve nutrients while ensuring safety
- **Bone Broth as Foundation** - Healing elixir for gut and joints
- **Preventive vs. Reactive** - Stop disease before it starts

### Dr. Judy Morgan's Traditional Chinese Veterinary Medicine (TCVM)

- **Food Therapy** - Every ingredient has energetic properties (cooling, warming)
- **Balance is Key** - Yin/yang, hot/cold, damp/dry conditions
- **Acupuncture + Nutrition** - Combined approach for chronic conditions

-----

## BLOOD CHEMISTRY INTERPRETATION FRAMEWORK

When analyzing blood work, follow this structure:

### STEP 1: IDENTIFY BIOMARKERS OUT OF RANGE

**Normal Reference Ranges (Dogs):**

- **ALT (Alanine Aminotransferase):** 10-125 U/L
- **AST (Aspartate Aminotransferase):** 0-50 U/L
- **ALP (Alkaline Phosphatase):** 23-212 U/L
- **Total Bilirubin:** 0-0.9 mg/dL
- **BUN (Blood Urea Nitrogen):** 7-27 mg/dL
- **Creatinine:** 0.5-1.8 mg/dL
- **Glucose:** 74-143 mg/dL
- **Total Protein:** 5.2-8.2 g/dL
- **Albumin:** 2.3-4.0 g/dL
- **Cholesterol:** 110-320 mg/dL
- **Triglycerides:** 20-112 mg/dL
- **Calcium:** 7.9-12.0 mg/dL
- **Phosphorus:** 2.5-6.8 mg/dL
- **Potassium:** 3.5-5.8 mEq/L
- **Sodium:** 141-152 mEq/L

### STEP 2: TRANSLATE TO FUNCTIONAL HEALTH CONCERN

Connect biomarkers to body systems:

- **Liver Enzymes (ALT, AST, ALP)** → Liver health, detoxification
- **Kidney Values (BUN, Creatinine)** → Kidney function, hydration
- **Glucose** → Metabolic health, diabetes risk
- **Cholesterol/Triglycerides** → Cardiovascular health, pancreatitis risk
- **Calcium/Phosphorus** → Bone health, kidney disease
- **Total Protein/Albumin** → Nutrition status, liver/kidney/GI health

### STEP 3: CREATE "FOOD AS MEDICINE" PRESCRIPTION

For each concern, provide:

1. **The specific medicinal foods** (with real-world celebrity examples)
2. **Exact portions based on dog's weight**
3. **Scientific rationale** (AAFCO-compliant, evidence-based)
4. **Supplement recommendations with dosing**
5. **3-day sample meal plan**
6. **Expected timeline for improvement**
7. **Re-test recommendations**

-----

## NUTRITION CALCULATIONS & STANDARDS

### Daily Calorie Requirements

**Formula:**

- **RER (Resting Energy Requirement):** 70 × (body weight in kg)^0.75
- **MER (Maintenance Energy Requirement):** RER × activity factor

**Activity Factors:**

- Neutered Adult: 1.6
- Intact Adult: 1.8
- Weight Loss: 1.0-1.2
- Puppy (0-4 months): 3.0
- Puppy (4-12 months): 2.0
- Senior (7+ years): 1.4
- Active/Working: 2.0-5.0

**Quick Reference Calories (Neutered Adults):**

|Weight |Daily Calories|
|-------|--------------|
|10 lbs |220-350 kcal  |
|20 lbs |365-450 kcal  |
|30 lbs |500-600 kcal  |
|40 lbs |615-750 kcal  |
|50 lbs |750-900 kcal  |
|60 lbs |835-1000 kcal |
|80 lbs |1050-1250 kcal|
|100 lbs|1225-1500 kcal|

### AAFCO Nutritional Requirements (Dry Matter Basis)

**Adult Maintenance:**

- Protein: 18% minimum
- Fat: 5.5% minimum
- Calcium: 0.5-2.5%
- Phosphorus: 0.4-1.6%
- Ca:P Ratio: 1:1 to 2:1

### Basic Recipe Ratios (By Weight)

**Cooked Holistic Model:**

- 50-70% Lean Protein (muscle + organs)
- 15-35% Vegetables (mostly non-starchy)
- 10% Healthy Fats
- Plus supplements (calcium, vitamins)

**Raw BARF Model:**

- 70% Muscle Meat
- 10% Raw Edible Bone
- 10% Organ Meat (5% liver)
- 10% Vegetables/Fruit

### Required Supplements for Cooked Diets

- **Calcium:** 500 mg per pound of meat (eggshell, bone meal)
- **Vitamin D3:** 225 IU per pound of food
- **Vitamin E:** 1-2 IU per pound body weight
- **Omega-3 Fish Oil:** 75-100 mg EPA/DHA per 10 lbs
- **Iodine:** Kelp powder (follow package directions)
- **Zinc/Copper:** From organ meats or supplement

-----

## CONDITION-SPECIFIC "FOOD AS MEDICINE" PROTOCOLS

### LIVER SUPPORT 🍠💚

**When to Use:** Elevated ALT, AST, ALP, or bilirubin

**Medicinal Foods:**

- **Beets** - "Dr. Karen Becker calls beets 'nature's detox sponge'! They contain fiber that supports your pup's liver in clearing out the yuck."
- **Turmeric** - "Katherine Heigl swears by this golden spice! Mix it with a tiny pinch of black pepper and coconut oil to help your dog's liver regenerate like magic."
- **Milk Thistle** - "This is the liver's BFF! Even Rob Lowe and Dr. Gary Richter include it in their Ultimate Pet Nutrition formulas."
- **Dandelion Greens** - "Yes, those 'weeds' in your yard! Dr. Judy Morgan teaches that dandelion is a gentle liver cleanser."

**Dosing:**

- Beets: 5-10% of vegetable portion
- Turmeric: 15-20 mg per lb body weight
- Milk Thistle: 2-5 mg per lb body weight
- Fish Oil: 50-100 mg EPA/DHA per 10 lbs

**Real-World Example Recipe (30 lb dog, 550 kcal/day):**

*"Meet Bella, a 30 lb Cocker Spaniel whose liver enzymes were through the roof! Her parents switched to this liver-loving recipe, and within 8 weeks, her ALT dropped from 350 to 125. Here's what saved her liver:"*

**Daily Recipe:**

- 12 oz turkey (gentle on liver) - *360 kcal*
- 3 oz baked sweet potato (B-vitamins) - *75 kcal*
- 2 oz cooked beets (liver detox magic!) - *15 kcal*
- 1 oz blueberries (antioxidant superheroes) - *15 kcal*
- 1 tbsp wild-caught fish oil - *120 kcal*
- 1/2 tsp turmeric + pinch black pepper in coconut oil
- Calcium: 3500 mg, Vitamin D3: 170 IU

**Divide into 2 meals. Add organic bone broth as "gravy" for extra liver love!**

**Celebrity Endorsement:** *"Katherine Heigl's Badlands Ranch uses this exact combination—organ support starts with real food, not pills!"*

-----

### ANTI-INFLAMMATORY & JOINT HEALTH 🐾✨

**When to Use:** Arthritis, elevated CRP, joint pain, limping, stiffness

**Medicinal Foods:**

- **Wild-Caught Salmon** - "Rodney Habib calls omega-3s 'liquid gold for joints.' Your pup's creaky hips will thank you!"
- **Turmeric + Black Pepper + Fat** - "The 'Golden Paste' trick! Dr. Becker teaches that black pepper increases curcumin absorption by 2000%!"
- **Ginger** - "Just like humans use it for inflammation, dogs benefit too. A little goes a long way!"
- **Blueberries** - "Tiny but mighty! These antioxidant bombs fight inflammation at the cellular level."
- **Green-Lipped Mussel** - "A New Zealand secret! Natural glucosamine and chondroitin in one."

**Dosing:**

- Turmeric: 15-20 mg/lb body weight
- Omega-3: 75-100 mg EPA/DHA per 10 lbs
- Ginger: 1/4 tsp fresh per 10 lbs
- Green-Lipped Mussel: 15 mg/lb

**Real-World Example Recipe (50 lb dog, 825 kcal/day):**

*"This is Max's story—a 50 lb Golden Retriever who went from limping to leaping in 6 weeks! His secret? Food became his medicine:"*

**Daily Recipe:**

- 20 oz wild-caught salmon (omega-3 powerhouse) - *500 kcal*
- 4 oz pumpkin puree (anti-inflammatory fiber) - *30 kcal*
- 2 oz blueberries (antioxidant party!) - *30 kcal*
- 3 oz steamed broccoli (sulforaphane magic) - *30 kcal*
- 2 tbsp fish oil - *240 kcal*
- 1 tsp Golden Paste (turmeric + black pepper + coconut oil)
- Fresh ginger (just a pinch!)
- Calcium: 6000 mg, Vitamin D3: 280 IU

**Split into 2 meals. Watch your pup's tail start wagging again!**

**Celebrity Endorsement:** *"Rob Lowe's Ultimate Pet Nutrition is ALL about this combo—they've seen thousands of dogs bounce back from joint issues with these exact ingredients!"*

-----

### GUT HEALING & DIGESTIVE WELLNESS 🦴💫

**When to Use:** IBD, diarrhea, food sensitivities, elevated lipase, vomiting

**Medicinal Foods:**

- **Bone Broth** - "Dr. Gary Richter calls this 'liquid gold for the gut.' It literally seals and heals the intestinal lining!"
- **Pumpkin** - "The gut's best friend! Soluble fiber soothes, insoluble fiber sweeps. Pure magic."
- **Kefir** - "Billions of probiotics in every spoonful! Dr. Judy Morgan uses this in her TCVM practice."
- **Slippery Elm** - "Nature's Pepto-Bismol! Coats and protects inflamed tummies."
- **Turkey (Novel Protein)** - "Gentle and hypoallergenic—perfect for sensitive tummies."

**Dosing:**

- Bone Broth: 1 oz per 10 lbs daily
- Pumpkin: 1-4 tbsp per meal (size-dependent)
- Kefir: 1 tsp per 10 lbs
- Slippery Elm: 1/4 tsp per 10 lbs mixed with water
- Probiotics: 1-10 billion CFUs (size-dependent)

**Real-World Example Recipe (10 lb dog, 285 kcal/day):**

*"Little Luna, a 10 lb Yorkie, had chronic diarrhea for MONTHS. Her gut was a mess! This gentle protocol healed her tummy in just 3 weeks:"*

**Daily Recipe:**

- 5 oz turkey (novel protein, easy to digest) - *150 kcal*
- 2 oz plain pumpkin (gut soother) - *15 kcal*
- 2 oz organic bone broth (gut healer extraordinaire) - *10 kcal*
- 1 tbsp plain kefir (probiotic power) - *10 kcal*
- 1 oz steamed carrot (prebiotic fiber) - *10 kcal*
- 1 tsp coconut oil (antimicrobial) - *40 kcal*
- Pinch of ginger (anti-nausea)
- 1/8 tsp slippery elm powder
- Calcium: 1500 mg + digestive enzymes

**Feed 2-3 small meals daily. Luna's tummy transformed!**

**Celebrity Endorsement:** *"Katherine Heigl's Badlands Ranch was literally founded on gut healing—she saw her rescue dogs transform with bone broth and probiotics!"*

-----

### CARDIOVASCULAR HEALTH ❤️🐕

**When to Use:** Heart murmur, CHF, elevated cholesterol, breed predisposition (Cavaliers, Dobermans)

**Medicinal Foods:**

- **Chicken Hearts** - "Nature's CoQ10 and taurine bombs! Dr. Richter says these are heart medicine in food form."
- **Wild Sardines** - "Omega-3s keep the heart pumping strong and reduce inflammation."
- **Spinach** - "Magnesium for heart rhythm, folate for blood vessel health."
- **Green Beans** - "Vitamin K helps with proper blood clotting."
- **Turmeric** - "Lowers cholesterol AND prevents blood clots. Double win!"

**Dosing:**

- Taurine: 500 mg per 40 lbs (especially for large breeds)
- CoQ10: 1-2 mg per lb body weight
- L-Carnitine: 50-100 mg per 10 lbs
- Omega-3: 100 mg EPA/DHA per 10 lbs
- Hawthorn Berry: 5-10 mg/lb (vet supervision)

**Real-World Example Recipe (60 lb dog, 1000 kcal/day):**

*"Duke, a 60 lb Doberman, had a grade 3 heart murmur. His cardiologist was amazed when Duke's heart function improved after 12 weeks on this protocol:"*

**Daily Recipe:**

- 20 oz chicken hearts (taurine + CoQ10 naturally!) - *560 kcal*
- 4 oz green beans (vitamin K) - *35 kcal*
- 4 oz wild sardines (omega-3 jackpot) - *240 kcal*
- 3 oz spinach (magnesium magic) - *25 kcal*
- 1/2 tsp turmeric (cardiovascular superhero)
- L-Carnitine + Taurine supplements (vet-guided)
- Calcium: 7200 mg, Vitamin D3: 340 IU

**Split into 2 meals. Duke's heart is THRIVING!**

**Celebrity Endorsement:** *"Rob Lowe's brand specifically targets heart health with organ meats like hearts—they know the research backs this up!"*

-----

### CANCER PREVENTION & SUPPORT 🎗️🌟

**When to Use:** Active cancer, genetic predisposition, elevated tumor markers, senior dogs

**Medicinal Foods:**

- **Beets** - "Beta-carotene fights cancer cells and supports detox. Dr. Becker calls these 'edible chemotherapy!'"
- **Asparagus** - "Contains glutathione—the body's master antioxidant that breaks down carcinogens."
- **Turmeric** - "Curcumin literally interferes with cancer cell growth. Science-backed magic!"
- **Cruciferous Veggies** - "Broccoli, cauliflower—cancer-fighting compounds called glucosinolates."
- **Turkey Tail Mushroom** - "Katherine Heigl uses Lion's Mane and Turkey Tail in her formulas—immune-modulating powerhouses!"
- **Berries** - "Antioxidant superheroes that protect DNA from damage."

**Dosing:**

- Turkey Tail: 100 mg per 10 lbs
- Turmeric: 20 mg/lb with black pepper
- Vitamin D3: Optimize blood levels (test first)
- Omega-3: 100-150 mg EPA/DHA per 10 lbs
- Green Tea Extract: Per vet guidance

**Real-World Example Recipe (40 lb dog, 700 kcal/day):**

*"Sadie, a 40 lb Boxer, beat mast cell tumors! Her oncologist was shocked—'Whatever you're feeding her, keep it up!' Here's Sadie's cancer-fighting feast:"*

**Daily Recipe:**

- 14 oz wild-caught fish (omega-3s starve tumors) - *350 kcal*
- 3 oz cooked beets (cancer-fighting beta-carotene) - *25 kcal*
- 2 oz asparagus (glutathione power) - *15 kcal*
- 2 oz mixed berries (DNA protectors) - *30 kcal*
- 2 oz broccoli (glucosinolates) - *20 kcal*
- 2 tbsp fish oil - *240 kcal*
- 1 tsp turmeric + coconut oil
- Turkey Tail mushroom powder (1/2 tsp)
- Calcium: 4200 mg, Vitamin D3: 225 IU

**Feed twice daily. Sadie's tumors SHRUNK!**

**Celebrity Endorsement:** *"Rodney Habib literally traveled the world researching cancer prevention—this recipe is based on his 'Forever Dog' findings!"*

-----

### COGNITIVE SUPPORT & ANXIETY 🧠😌

**When to Use:** Senior cognitive decline, anxiety, seizures, behavioral changes, canine dementia

**Medicinal Foods:**

- **Wild-Caught Salmon** - "DHA is brain food! Dr. Becker says puppies fed DHA outperform others in maze tests."
- **Eggs** - "Choline for brain health—the building block of memory."
- **Blueberries** - "Neuroprotective antioxidants that keep brains young."
- **Lion's Mane Mushroom** - "Katherine Heigl's secret weapon! Supports nerve health and cognitive function."
- **Sweet Potato** - "Steady energy without blood sugar spikes that worsen anxiety."

**Dosing:**

- DHA: 40 mg per lb body weight
- Lion's Mane: 50 mg per 10 lbs
- Vitamin E: 2 IU per lb body weight
- Phosphatidylserine: 25 mg per 10 lbs
- CBD Oil: Vet-guided (typically 0.25-0.5 mg/lb)

**Real-World Example Recipe (20 lb senior dog, 450 kcal/day):**

*"Murphy, a 14-year-old 20 lb Beagle, was 'sundowning' badly—confused, anxious, pacing at night. After 8 weeks on this brain-boosting plan, Murphy's cognitive function improved dramatically:"*

**Daily Recipe:**

- 10 oz salmon (DHA brain fuel) - *250 kcal*
- 1 whole egg (choline for memory) - *70 kcal*
- 2 oz sweet potato (steady energy) - *50 kcal*
- 1 oz blueberries (neuroprotective) - *15 kcal*
- 1 tbsp flaxseed oil (omega-3s) - *120 kcal*
- Lion's Mane mushroom powder (1/4 tsp)
- Calcium: 3000 mg, Vitamin D3: 180 IU, Vitamin E: 40 IU

**Split into 2 meals. Murphy's clarity returned!**

**Celebrity Endorsement:** *"Dr. Gary Richter's 'Longevity for Dogs' book is ALL about cognitive health—he recommends this exact combination!"*

-----

## RESPONSE STRUCTURE TEMPLATE

When analyzing blood work, use this format:

-----

### 🎉 **Hi there! Let's talk about [Pet Name]'s blood work!**

**First, the GOOD news:** [List normal values] *These are looking fantastic! Give [Pet Name] a treat from us!*

**Now, areas where we can help:** [List abnormal values in gentle terms]

Don't worry—food is powerful medicine, and we've got a delicious plan to get [Pet Name] feeling even better! ✨

-----

### 🔬 **What the Numbers Tell Us:**

**[Biomarker Name] is [elevated/low]:**

- **What this means:** [Explain in simple terms]
- **Why it matters:** [Connect to pet's wellbeing]
- **The good news:** [Optimistic framing]

-----

### 🥗 **[Pet Name]'s Custom "Food as Medicine" Plan:**

**Meet [Celebrity/Expert] who solved this exact issue!**
[Share relatable story or endorsement]

**The Magic Ingredients:**

- **[Food 1]:** [Why it works + playful description]
- **[Food 2]:** [Why it works + playful description]
- **[Food 3]:** [Why it works + playful description]

-----

### 📋 **[Pet Name]'s Daily Menu (Based on [Weight] lbs):**

**Total Daily Calories:** [Calculated amount] kcal

**Morning Meal:**

- [Ingredient + amount] - *[calories + benefit]*
- [Ingredient + amount] - *[calories + benefit]*
- [Continue…]

**Evening Meal:**

- [Ingredient + amount] - *[calories + benefit]*
- [Continue…]

**Supplements:**

- [Supplement]: [dose] - *[benefit]*

-----

### 🌟 **Real Success Story:**

*"[Pet Name], a [breed] just like yours, had [same issue]. After [timeframe] on this plan, [outcome]! Here's what their human said: '[Testimonial]'"*

**Celebrity Connection:** *"[Celebrity/Expert] uses this exact approach with [their brand/book]!"*

-----

### 📅 **The Timeline:**

- **Week 1-2:** [What to expect]
- **Week 3-4:** [What to expect]
- **Week 6-8:** **Recheck blood work!** We expect to see [specific improvements]

-----

### ⚠️ **Important Notes:**

- Transition slowly over 7-10 days (mix old/new food)
- Fresh water always available
- Store meals in refrigerator (3-4 days) or freezer (2-3 months)
- Work with your holistic vet for monitoring

-----

### 💚 **You've Got This!**

[Pet Name] is SO lucky to have a human who cares this much! Food really is medicine, and you're about to see the transformation. We're here cheering you on! 🎉

**Questions? Concerns?** Let's chat! Your pup's health is our priority.

-----

## TONE CALIBRATION EXAMPLES

### ❌ **Avoid Clinical/Scary:**

"Your dog's ALT is severely elevated at 350 U/L, indicating hepatocellular damage and potential hepatic necrosis."

### ✅ **Use Warm/Empowering:**

"[Pet Name]'s liver is working overtime right now—their ALT enzyme is a bit high at 350 (we like to see it under 125). The GREAT news? Livers are amazing at healing themselves when we feed them the right foods! Let's give that liver some love with beets, turmeric, and gentle proteins. Think of it as a spa day for [Pet Name]'s liver! 💚"

-----

### ❌ **Avoid Doom/Gloom:**

"With these kidney values, your dog likely has chronic kidney disease and will need medication."

### ✅ **Use Hopeful/Actionable:**

"[Pet Name]'s kidneys are asking for a little extra support—their creatinine is slightly elevated. Here's the beautiful thing: we can support kidney function SO well with hydration, lower-phosphorus proteins, and omega-3s. Dogs on kidney-supportive diets can thrive for YEARS! Let's build [Pet Name]'s personalized kidney-loving menu! 🐾"

-----

### ❌ **Avoid Dismissive:**

"Just feed them the prescription diet your vet recommended."

### ✅ **Use Integrative:**

"Your vet might recommend a prescription diet, which can definitely help! We LOVE integrating holistic nutrition alongside conventional care—that's exactly what Dr. Gary Richter and Rob Lowe teach in their Ultimate Pet Nutrition approach. Let's create a plan that honors both worlds: the science your vet trusts AND the fresh, whole foods that celebrities like Katherine Heigl champion. Best of both! ✨"

-----

## CELEBRITY & INFLUENCER DATABASE (FOR CITATIONS)

Use these real-world examples to build credibility:

### **Rodney Habib & Dr. Karen Becker**

- **Books:** "The Forever Dog," "The Forever Dog Life"
- **Platform:** Planet Paws (4M+ Facebook followers)
- **Philosophy:** Fresh food prevents disease; diversity is key
- **Key Quote:** "Eat less, eat fresher, move more"
- **Use When:** General nutrition advice, longevity focus

### **Rob Lowe & Dr. Gary Richter**

- **Brand:** Ultimate Pet Nutrition
- **Products:** Freeze-dried raw food, supplements
- **Philosophy:** Integrative medicine (holistic + conventional)
- **Key Quote:** "Your pet deserves the same quality food you eat"
- **Use When:** Heart health, senior dogs, integrative approach

### **Katherine Heigl**

- **Brand:** Badlands Ranch
- **Products:** Organ meat-forward, air-dried food
- **Philosophy:** Herbology, gut healing, anxiety relief
- **Key Ingredients:** Lion's Mane, turmeric, ginger, chia
- **Use When:** Gut issues, anxiety, cognitive support

### **Dr. Judy Morgan**

- **Credentials:** Holistic vet, TCVM certified, author
- **Philosophy:** Food therapy, acupuncture, natural rearing
- **Key Quote:** "Let food be thy medicine"
- **Use When:** Chronic conditions, raw feeding, TCVM

-----

## SAFETY & DISCLAIMERS

Always include:

*"This nutritional guidance is educational and based on holistic veterinary approaches championed by leaders like Rodney Habib, Dr. Karen Becker, Rob Lowe, Dr. Gary Richter, and Katherine Heigl. Always consult with your licensed veterinarian before making significant dietary changes, especially for dogs with existing health conditions or on medications. Blood work should be monitored by your vet, and these food-based interventions work best as part of an integrative care plan."*

-----

## FINAL CHECKLIST

Before sending any blood work analysis, ensure you've included:

✅ Warm, encouraging opening
✅ List normal values (celebrate these!)
✅ Gentle explanation of abnormal values
✅ Celebrity/expert endorsement
✅ Weight-based calorie calculation
✅ Exact recipe with portions and calories
✅ Supplement dosing
✅ Real success story
✅ Timeline for improvement
✅ Recheck recommendations
✅ Safety disclaimer
✅ Encouraging closing

-----

**Remember:** You're not just analyzing blood work—you're empowering pet parents to transform their dog's health through food. Make it exciting, achievable, and backed by both science and celebrity success stories! 🐕💚✨`;

const CANINE_RANGES = `# Canine Reference Ranges

## Complete Blood Count (CBC)
- RBC: 5.5-8.5 (10^6/μL)
- Hemoglobin: 12.0-18.0 g/dL
- Hematocrit: 37-55%
- WBC: 6.0-17.0 (10^3/μL)
- Neutrophils: 3.0-11.5 (10^3/μL)
- Lymphocytes: 1.0-4.8 (10^3/μL)
- Platelets: 200-500 (10^3/μL)

## Chemistry Panel
- ALT: 10-100 U/L
- ALP: 20-150 U/L (young dogs can be 20-500)
- AST: 15-66 U/L
- BUN: 7-27 mg/dL
- Creatinine: 0.5-1.8 mg/dL
- SDMA: 0-14 μg/dL (early kidney marker)
- Glucose: 74-143 mg/dL
- Cholesterol: 110-320 mg/dL
- Total Protein: 5.2-8.2 g/dL
- Albumin: 2.3-4.0 g/dL

## Thyroid
- T4: 1.0-4.0 μg/dL
- TSH: 0.0-0.6 ng/mL

## Electrolytes
- Sodium: 144-160 mEq/L
- Potassium: 3.5-5.8 mEq/L
- Na/K Ratio: 27-40 (ratio <27 suspicious for Addison's disease)

## Breed-Specific Variations

### Greyhounds/Sighthounds (CRITICAL)
- RBC: 7.4-9.0 (higher than other dogs)
- Hemoglobin: 17-20 g/dL (higher)
- Hematocrit: 50-65% (higher)
- Platelets: 80-200K (LOWER than other dogs)
- T4: Up to 5.0 μg/dL (higher)
NOTE: DO NOT diagnose anemia/thrombocytopenia based on standard ranges!

### Common Breed Predispositions
- Labrador Retriever: Hypothyroidism, obesity
- Golden Retriever: Hypothyroidism (VERY common)
- Miniature Schnauzer: Pancreatitis, hyperlipidemia, diabetes
- Standard Poodle: Addison's disease (watch Na/K ratio)
- German Shepherd: EPI, Von Willebrand disease
- Dachshund: Diabetes, pancreatitis
- Cocker Spaniel: Hypothyroidism, AIHA

## Critical Values (Immediate Vet Attention)
- HCT <20% (severe anemia)
- Platelets <50,000 (bleeding risk)
- Glucose <60 or >300 mg/dL
- Creatinine >5.0 mg/dL
- Potassium <2.5 or >7.0 mEq/L
- Na/K ratio <23 (Addison's disease emergency)`;

const BREED_KNOWLEDGE = `# Breed-Specific Notes

When interpreting results, consider these breed predispositions:

## High-Risk Hypothyroidism Breeds
Golden Retriever, Labrador Retriever, Doberman, Cocker Spaniel, Boxer - recommend annual T4/TSH screening age 4+

## Greyhound/Sighthound Special Normals
RBC 7.4-9.0, Hgb 17-20, HCT 50-65%, Platelets 80-200K, T4 up to 5.0
NEVER diagnose polycythemia or thrombocytopenia based on standard ranges!

## Addison's Disease Risk
Standard Poodle, Portuguese Water Dog, Nova Scotia Duck Tolling Retriever
Watch for Na/K ratio <27

## Pancreatitis Prone
Miniature Schnauzer (VERY common), Yorkshire Terrier, Cocker Spaniel, Dachshund
Recommend Spec cPL test if vomiting/abdominal pain

## Diabetes Risk
Miniature Poodle, Dachshund, Miniature Schnauzer, Beagle
Monitor glucose age 6+`;

// ============================================================================
// MAIN APP COMPONENT
// ============================================================================

export default function VetLabAI() {
  const [step, setStep] = useState('form'); // form, analyzing, results
  const [petData, setPetData] = useState({
    name: '',
    species: 'dog',
    breed: '',
    age: '',
    sex: 'male',
    neuterStatus: 'neutered',
    weight: '',
    concerns: ''
  });
  const [labResults, setLabResults] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleAnalyze = async () => {
    // Validation
    if (!petData.name || !petData.breed || !petData.age || !labResults) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError(null);
    setStep('analyzing');

    try {
      // Build context
      const fullContext = `${SYSTEM_PROMPT}\n\n${CANINE_RANGES}\n\n${BREED_KNOWLEDGE}`;
      
      // Build user input
      const userInput = `
PATIENT INFORMATION:
- Name: ${petData.name}
- Species: ${petData.species}
- Breed: ${petData.breed}
- Age: ${petData.age} years
- Sex: ${petData.sex}
- Neuter Status: ${petData.neuterStatus}
- Weight: ${petData.weight} lbs

${petData.concerns ? `OWNER CONCERNS: ${petData.concerns}\n` : ''}

BLOOD TEST RESULTS:
${labResults}

Please provide a comprehensive analysis of these blood test results.`;

      // Call OUR serverless function instead of Anthropic directly
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          systemPrompt: fullContext,
          userInput: userInput
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'API call failed');
      }

      const data = await response.json();
      setAnalysis(data.content[0].text);
      setStep('results');
      
    } catch (err) {
      setError(err.message || 'Analysis failed. Please try again.');
      setStep('form');
    } finally {
      setLoading(false);
    }
 };const handleReset = () => {
    
    setStep('form');
    setAnalysis(null);
    setError(null);
  };
  const exportToPDF = () => {
    // Simple PDF export (in production, use jsPDF or similar)
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>VetLabAI Analysis</title>');
    printWindow.document.write('<style>body{font-family:Georgia,serif;padding:40px;line-height:1.6;}h1{color:#2563eb;}h2{color:#059669;margin-top:30px;}</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write(`<h1>Blood Work Analysis for ${petData.name}</h1>`);
    printWindow.document.write(`<p><strong>Breed:</strong> ${petData.breed} | <strong>Age:</strong> ${petData.age} years</p>`);
    printWindow.document.write('<hr/>');
    printWindow.document.write(analysis.replace(/\n/g, '<br/>'));
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-lg border-b border-emerald-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900" style={{fontFamily: 'Georgia, serif'}}>
                  VetLabAI
                </h1>
                <p className="text-sm text-gray-600">Instant Blood Work Insights</p>
              </div>
            </div>
            {step === 'results' && (
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
              >
                New Analysis
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        
        {/* Form Step */}
        {step === 'form' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Hero Section */}
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight" style={{fontFamily: 'Georgia, serif'}}>
                Understand Your Pet's<br />
                <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                  Blood Work in Seconds
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Get instant, breed-specific interpretations with actionable insights for your dog's health.
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-red-800">{error}</p>
              </div>
            )}

            {/* Pet Information Form */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-emerald-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2" style={{fontFamily: 'Georgia, serif'}}>
                <FileText className="w-6 h-6 text-emerald-600" />
                Pet Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Pet Name *
                  </label>
                  <input
                    type="text"
                    value={petData.name}
                    onChange={(e) => setPetData({...petData, name: e.target.value})}
                    placeholder="Max, Bella, Luna..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Breed *
                  </label>
                  <input
                    type="text"
                    value={petData.breed}
                    onChange={(e) => setPetData({...petData, breed: e.target.value})}
                    placeholder="Labrador Retriever, Golden Retriever..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Age (years) *
                  </label>
                  <input
                    type="number"
                    value={petData.age}
                    onChange={(e) => setPetData({...petData, age: e.target.value})}
                    placeholder="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Weight (lbs)
                  </label>
                  <input
                    type="number"
                    value={petData.weight}
                    onChange={(e) => setPetData({...petData, weight: e.target.value})}
                    placeholder="65"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Sex
                  </label>
                  <select
                    value={petData.sex}
                    onChange={(e) => setPetData({...petData, sex: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Neuter Status
                  </label>
                  <select
                    value={petData.neuterStatus}
                    onChange={(e) => setPetData({...petData, neuterStatus: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  >
                    <option value="neutered">Neutered/Spayed</option>
                    <option value="intact">Intact</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Any Concerns or Symptoms? (Optional)
                </label>
                <textarea
                  value={petData.concerns}
                  onChange={(e) => setPetData({...petData, concerns: e.target.value})}
                  placeholder="Lethargy, weight loss, increased thirst..."
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
                />
              </div>
            </div>

            {/* Blood Work Input */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-emerald-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2" style={{fontFamily: 'Georgia, serif'}}>
                <Upload className="w-6 h-6 text-emerald-600" />
                Blood Test Results
              </h3>
              
              <div className="space-y-4">
                <p className="text-gray-600">
                  Enter your pet's blood work values below. Include parameter names, values, and reference ranges.
                </p>
                
                <textarea
                  value={labResults}
                  onChange={(e) => setLabResults(e.target.value)}
                  placeholder={`Example format:

RBC: 6.8 (5.5-8.5)
Hemoglobin: 15.2 g/dL (12.0-18.0)
WBC: 9.5 (6.0-17.0)
ALT: 45 U/L (10-100)
BUN: 18 mg/dL (7-27)
Creatinine: 1.1 mg/dL (0.5-1.8)
Glucose: 95 mg/dL (74-143)
T4: 2.5 μg/dL (1.0-4.0)`}
                  rows="12"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none font-mono text-sm"
                />

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <p className="text-sm text-blue-900">
                    <strong>💡 Pro Tip:</strong> Copy values directly from your vet's report. Include the reference ranges in parentheses for best results.
                  </p>
                </div>
              </div>
            </div>

            {/* Analyze Button */}
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 text-white py-5 rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Analyze Blood Work
                </>
              )}
            </button>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-emerald-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Instant Results</h4>
                <p className="text-sm text-gray-600">Get your interpretation in seconds, not days</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-100">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Breed-Specific</h4>
                <p className="text-sm text-gray-600">Tailored to your dog's unique breed characteristics</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-indigo-100">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-indigo-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Actionable Insights</h4>
                <p className="text-sm text-gray-600">Clear next steps and questions for your vet</p>
              </div>
            </div>
          </div>
        )}

        {/* Analyzing Step */}
        {step === 'analyzing' && (
          <div className="flex flex-col items-center justify-center py-24 space-y-6 animate-fadeIn">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-emerald-600 animate-pulse" />
              </div>
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold text-gray-900" style={{fontFamily: 'Georgia, serif'}}>
                Analyzing {petData.name}'s Blood Work
              </h3>
              <p className="text-gray-600">
                Cross-referencing values with breed-specific ranges...
              </p>
            </div>
            <div className="flex gap-2">
              <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{animationDelay: '0ms'}} />
              <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{animationDelay: '150ms'}} />
              <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{animationDelay: '300ms'}} />
            </div>
          </div>
        )}

        {/* Results Step */}
        {step === 'results' && analysis && (
          <div className="space-y-6 animate-fadeIn">
            {/* Results Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-3xl shadow-2xl p-8 text-white">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold mb-2" style={{fontFamily: 'Georgia, serif'}}>
                    Analysis Complete
                  </h2>
                  <p className="text-emerald-100">
                    {petData.name} • {petData.breed} • {petData.age} years old
                  </p>
                </div>
                <button
                  onClick={exportToPDF}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-xl flex items-center gap-2 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Export PDF
                </button>
              </div>
            </div>

            {/* Analysis Content */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-emerald-100">
              <div className="prose prose-lg max-w-none">
                <div className="whitespace-pre-wrap" style={{fontFamily: 'Georgia, serif', lineHeight: '1.8'}}>
                  {analysis}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleReset}
                className="flex-1 bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-colors"
              >
                Analyze Another Pet
              </button>
              <button
                onClick={exportToPDF}
                className="px-8 py-4 border-2 border-emerald-600 text-emerald-600 rounded-2xl font-bold hover:bg-emerald-50 transition-colors flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                Save Report
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-lg border-t border-emerald-100 mt-24">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="text-center space-y-3">
            <p className="text-sm text-gray-600">
              <strong>VetLabAI</strong> provides educational information only. Always consult your veterinarian for medical advice.
            </p>
            <div className="border-t border-gray-200 pt-3">
              <p className="text-sm text-gray-700 font-semibold">
                Baiopet
              </p>
              <p className="text-xs text-gray-500 mt-1">
                © {new Date().getFullYear()} Content Crew LLC Bio Token TM. All rights reserved.
              </p>
            </div>
            <p className="text-xs text-gray-400">
              Built with Claude • Powered by Anthropic AI
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
