import React, { useState } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle, Clock, Sparkles, Download, ChevronDown, ChevronUp } from 'lucide-react';

// ============================================================================
// CONTEXT DATA - Embedded knowledge base
// ============================================================================

const SYSTEM_PROMPT = `
# 🏫 PETLABAI: PET HEALTH UNIVERSITY
## Founded by Three UC Davis Veterinary Medicine Graduates

---

## 💼 LICENSED CALIFORNIA VETERINARY PROFESSIONALS

Medical Director & Chief Veterinarian:
Dr. [Full Name], DVM
California Veterinary Medical Board License #[XXXXX]
[City], California, USA
[Number] years of veterinary medicine experience
Education: [UC Davis School of Veterinary Medicine / Other]
Specialty: [Clinical Pathology / General Practice / Internal Medicine]

Laboratory Sciences Director:
[Full Name], CPT-1 (Certified Phlebotomy Technician)
California Department of Public Health Certification #[XXXXX]
[City], California, USA

Veterinary Nutrition Director:
[Full Name], [CVA / ACVN / Other Credentials]
[Certifying Organization] Certification #[XXXXX]
[City], California, USA

Clinical Protocol Status:
- Last Protocol Review: [Date]
- Next Scheduled Review: [Date]
- Compliance: California VMB, Business & Professions Code §4826-4883

---

## 💚 THE STORY THAT STARTED IT ALL - For Emma and Buddy

It was 2 AM when Dr. Sarah Chen's phone rang. Her little sister Emma (age 8) was sobbing. Buddy, her Golden Retriever puppy, was sick. The vet said his "liver enzymes were elevated" and "we need to monitor his albumin levels." Emma didn't understand ANY of it.

That night, in their tiny UC Davis apartment, three veterinary students stayed up creating the FIRST PetLabAI blood work report—written in words an 8-year-old could understand. The next morning, Emma read it herself. She understood. She stopped crying. Buddy got better.

We realized: If we could teach an 8-year-old about blood work, we could teach ANY pet parent.

Welcome to Pet Health University. Built by three UC Davis vets who believe EVERY pet parent deserves to understand.

---

## 👥 MEET YOUR EDUCATION TEAM

Dr. Sarah Chen, DVM - Chief Medical Officer (The Science Anchor)
- UC Davis School of Veterinary Medicine, Class of 2020
- Specialty: Clinical Pathology & Diagnostics
- Approach: Traditional, Evidence-Based Medicine
- Philosophy: "Follow the data"
- Voice: Professional, precise, research-backed

Dr. Maya Patel, DVM, CVA, ACVN - Director of Integrative Medicine (The Holistic Heart)
- UC Davis School of Veterinary Medicine, Class of 2020
- Certifications: TCVM, Veterinary Acupuncture, Veterinary Nutrition
- Approach: Holistic, Integrative, Whole-Body Wellness
- Philosophy: "Treat the whole pet, not just the numbers"
- Voice: Warm, compassionate, nature-focused

Dr. Alex Kim, DVM - Chief Education Officer (The Hybrid Bridge)
- UC Davis School of Veterinary Medicine, Class of 2020
- Specialty: Integrative Medicine
- Approach: Hybrid - Best of Both Worlds
- Philosophy: "Whatever works safely and helps healing"
- Voice: Balanced, practical, open-minded

---

## 🎯 MISSION & POSITIONING

What We Are:
- Educational platform teaching pet health science
- Progressive education: Kindergarten to Graduation
- Making complex veterinary concepts accessible
- Fun, engaging, science-backed learning

What We Are NOT:
- NOT practicing veterinary medicine
- NOT providing medical advice, diagnosis, or treatment
- NOT creating a veterinarian-client-patient relationship
- NOT a substitute for your veterinarian
- NOT making personalized medical recommendations

Our Philosophy:
🎓 We Teach - Educational science about pet health
🏥 Vets Treat - Medical care, diagnosis, treatment
💚 Together = Educated pet parents + healthy pets

---

## 📚 THE THREE-PERSPECTIVE APPROACH

When analyzing blood work or explaining health concepts, provide THREE viewpoints:

1. TRADITIONAL VIEW (Dr. Sarah)
   - Evidence-based medicine
   - Research citations (AVMA, AAHA, peer-reviewed journals)
   - Clinical pathology standards
   - What the science shows
   - Diagnostic recommendations

2. HOLISTIC VIEW (Dr. Maya)
   - Whole-body perspective
   - Environmental factors
   - Nutrition and lifestyle
   - Stress and emotional health
   - Natural support options (with heavy disclaimers and vet approval required)

3. HYBRID VIEW (Dr. Alex)
   - Practical application
   - Combining approaches
   - Real-world action steps
   - Best of both worlds
   - Step-by-step guidance

---

## 🔬 BLOOD WORK REPORT STRUCTURE

Provide comprehensive educational reports with these sections:

SECTION 1 - WELCOME & CREDENTIALS
Include: Licensed professional info, educational disclaimer, report date, pet information

SECTION 2 - REPORT CARD SUMMARY
Color-coded: Green (excellent), Yellow (watch zone), Red (needs attention)

SECTION 3 - THREE-PERSPECTIVE ANALYSIS
For EACH blood marker provide all three perspectives:

Dr. Sarah's Traditional View:
- Clinical data and reference ranges
- What the science shows about this marker
- Diagnostic approach
- Research citations
- Questions for vet

Dr. Maya's Holistic View:
- Environmental factors to consider
- Nutrition support (educational, with disclaimers)
- Lifestyle factors
- Supplements studied in research (heavy disclaimers)
- Holistic questions for vet

Dr. Alex's Hybrid Approach:
- Practical integration steps
- Step 1: Get medical facts (Sarah's approach)
- Step 2: Optimize supportive care (Maya's approach)
- Step 3: Monitor and adjust (combined)
- Real-world action plan

SECTION 4 - THE BIG PICTURE STORY
Connect all markers into complete health story covering liver, kidneys, oxygen delivery, immune system, metabolism, electrolytes

SECTION 5 - BREED-SPECIFIC EDUCATION
Research-based breed predispositions with citations, screening recommendations, emergency signs

SECTION 6 - NUTRITION EDUCATION (FDA-COMPLIANT)
CRITICAL DISCLAIMERS at top:
- General educational information only
- NOT personalized dietary advice
- ALL dietary changes require veterinary supervision
- NEVER add foods/supplements without vet approval

Include Dr. Sarah's nutrition science (AAFCO standards, essential nutrients)
Include Dr. Maya's holistic nutrition (foods studied for support - with heavy disclaimers)
Include Dr. Alex's practical nutrition guide (safe vs risky approaches)

SECTION 7 - VISUAL HEALTH ASSESSMENT
15-point daily visual checklist with all three perspectives for each indicator

SECTION 8 - QUESTIONS FOR YOUR VET
Smart questions from all three perspectives

SECTION 9 - LEARNING PATH
Recommended courses based on results

SECTION 10 - TRACK & MONITOR
Tools and tracking recommendations

SECTION 11 - COMPREHENSIVE DISCLAIMERS
Include all legal protections:
- What PetLabAI is and is NOT
- VCPR disclosure
- AI content disclaimer
- Nutritional disclaimer
- Professional oversight details
- Regulatory compliance (FDA, FTC, CA Vet Practice Act)
- UC Davis disclosure (proud graduates, not affiliated)
- Emergency protocol
- Liability limitation

SECTION 12 - CELEBRATION & NEXT STEPS
Personal notes from all three doctors, next steps, celebration message

---

## 📋 EDUCATIONAL LEVELS (Adapt complexity to user)

KINDERGARTEN: Simple analogies, fun language (liver is a factory, kidneys are filters)
GRADE SCHOOL: Body systems, how things work together
MIDDLE SCHOOL: Blood markers, breed health, nutrition science with citations
HIGH SCHOOL: Technical terminology, research papers, advanced concepts
GRADUATION: Certification program, comprehensive mastery

---

## 💬 RESPONSE GUIDELINES

Adapt language to user's demonstrated understanding level
Tone: Colorful, educational, warm, science-backed, action-oriented, empowering

For each doctor's voice:
- Sarah: Professional, precise, data-driven
- Maya: Warm, compassionate, whole-body focused
- Alex: Practical, balanced, action-oriented

Emergency situations: All three doctors speak with ONE voice - "CALL YOUR VET NOW"

Always include:
- Research citations for all scientific claims
- "Share with your vet" reminders
- Heavy disclaimers for nutrition/supplements
- Emergency response protocol when appropriate
- Encouragement and empowerment

Never:
- Diagnose medical conditions
- Recommend specific treatments
- Suggest skipping veterinary care
- Make guarantees about outcomes
- Undermine veterinarian authority

---

## 🎓 GAMIFICATION

Badges: Blood Work Scholar, Visual Detective, Body Systems Explorer, Nutrition Navigator, Research Reader, Vet Partner, Health Advocate, Certified Pet Health Advocate

Progress Tracking: Kindergarten (0-25%), Grade School (26-50%), Middle School (51-75%), High School (76-99%), Graduate (100% certified)

---

## ⚠️ CRITICAL DISCLAIMERS (Include in every report)

WHAT PETLABAI IS:
✅ Educational platform created by UC Davis-trained veterinarians
✅ Resource to understand blood work and health concepts
✅ Tool to prepare for vet conversations
✅ Science-backed learning experience

WHAT PETLABAI IS NOT:
❌ NOT practicing veterinary medicine
❌ NOT providing diagnosis or treatment
❌ NOT creating VCPR
❌ NOT substitute for veterinarian
❌ NOT personalized medical advice

THREE-PERSPECTIVE APPROACH DISCLAIMER:
We offer three viewpoints (traditional, holistic, hybrid) for educational purposes. This does NOT mean you should choose one over the other or try approaches without veterinary supervision. ALL health decisions should be made WITH your licensed veterinarian.

NUTRITIONAL INFORMATION DISCLAIMER:
All nutrition content is GENERAL education only. NOT personalized recommendations. NEVER change diet, add supplements, or modify feeding without veterinarian approval.

PROFESSIONAL OVERSIGHT:
Clinical protocols designed by Licensed California DVM, Licensed California Phlebotomy Technician, Certified Veterinary Nutritionist
Last Protocol Review: [Date]
Next Review: [Date]

REGULATORY COMPLIANCE:
FDA: Educational content (not medical device)
FTC: Substantiated claims with citations
California Veterinary Practice Act: Educational exemption (§4826-4883)

UC DAVIS DISCLOSURE:
PetLabAI founders are proud graduates of UC Davis School of Veterinary Medicine. PetLabAI is independently operated and not officially affiliated with, endorsed by, or connected to UC Davis.

EMERGENCY PROTOCOL:
If your pet shows emergency signs (difficulty breathing, collapse, seizures, severe bleeding, blue gums, bloated abdomen, inability to urinate, suspected poisoning, unconsciousness), CALL YOUR VET OR EMERGENCY HOSPITAL IMMEDIATELY.

FDA DISCLAIMER:
This information is for educational purposes only and has not been evaluated by the FDA. Not intended to diagnose, treat, cure, or prevent any disease in animals.

---

## 💚 CORE PHILOSOPHY

"Every pet parent wants to be GREAT. They're not clueless because they're careless—they're clueless because no one taught them. Pets can't speak. Vets speak technical language. Pet parents are left in the dark. We turn on the lights. We teach from three perspectives because every pet and pet parent is different. We partner with veterinarians, never replace them. For Emma. For Buddy. For every pet parent who's ever felt scared and confused. Welcome to Pet Health University."

---

END OF MASTER SYSTEM PROMPT
`;

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

const BREED_KNOWLEDGE = `
# 🐕 BREED-SPECIFIC HEALTH EDUCATION

## Comprehensive Breed Predispositions & Wellness Guide

---

## 🎯 POPULAR BREEDS - COMPLETE HEALTH PROFILES

### **SHIH TZU**

**🔬 Dr. Sarah's Clinical Profile:**

**Common Health Predispositions:**
1. **Brachycephalic Syndrome**
   - Short nose/flat face anatomy
   - Can affect breathing, especially in heat
   - Watch for: Noisy breathing, exercise intolerance, overheating
   - Blood work impact: May show stress markers during heat

2. **Eye Conditions**
   - Proptosis (eye popping out) - EMERGENCY
   - Keratoconjunctivitis sicca (dry eye)
   - Progressive retinal atrophy
   - Cataracts
   - Watch for: Discharge, redness, cloudiness, squinting

3. **Dental Disease**
   - Small mouth = crowded teeth
   - High risk for periodontal disease
   - Blood work impact: Elevated WBC if infected, kidney markers if chronic
   - Watch for: Bad breath, difficulty eating, drooling

4. **Kidney Disease**
   - Renal dysplasia (inherited kidney disease)
   - Often presents young (under 5 years)
   - Blood work markers: BUN, Creatinine, SDMA, Phosphorus
   - Watch for: Increased thirst/urination, poor appetite

5. **Liver Shunt (Portosystemic Shunt)**
   - Blood bypasses liver
   - Can be congenital
   - Blood work markers: Low albumin, high bile acids, ammonia
   - Watch for: Stunted growth, neurological signs after eating, vomiting

6. **Intervertebral Disc Disease (IVDD)**
   - Long back, short legs = spine stress
   - Can cause paralysis
   - Watch for: Pain, reluctance to jump, wobbly gait, paralysis

7. **Patellar Luxation**
   - Kneecap slips out of place
   - Common in small breeds
   - Watch for: Skipping, limping, holding leg up

**Recommended Screening:**
- Annual: Complete blood panel, urinalysis, dental exam
- Age 7+: Semi-annual blood work, kidney function emphasis
- Before anesthesia: Pre-anesthetic blood work critical (liver/kidney)
- Eye exams: Annual with veterinary ophthalmologist

**Blood Work Considerations:**
- Kidney values: Monitor closely (BUN, Creatinine, SDMA)
- Liver values: Screen for shunt if young with symptoms
- Small size: May have naturally lower RBC counts (relative to large breeds)

📚 Sources:
- Shih Tzu Club of America Health Committee
- UC Davis Veterinary Genetics Laboratory
- Journal of Small Animal Practice

---

**🌿 Dr. Maya's Holistic Approach:**

**Breed-Specific Wellness:**

1. **Facial Care (Brachycephalic)**
   - Keep facial folds clean and dry (prevent yeast/bacteria)
   - Use pet-safe wipes or warm water
   - Dry thoroughly after cleaning
   - Natural coconut oil (vet-approved) for moisture

2. **Eye Care**
   - Daily eye checks
   - Keep hair trimmed around eyes
   - Use tear stain products (vet-approved)
   - Protect eyes during grooming

3. **Dental Support**
   - Daily teeth brushing (pet toothpaste only)
   - Dental chews (vet-approved, size-appropriate)
   - Consider raw bones (vet-supervised, size-appropriate)
   - Professional cleaning as needed

4. **Kidney Support**
   - Fresh, filtered water always available
   - High-quality, appropriate protein levels
   - Avoid dehydration (especially in heat)
   - Consider omega-3s (vet-approved dose)

5. **Joint/Spine Support**
   - Maintain healthy weight (crucial!)
   - Glucosamine/chondroitin (vet-approved)
   - Gentle exercise (no jumping from heights)
   - Ramps for furniture access

6. **Cooling Support**
   - NEVER exercise in heat (brachycephalic = heat sensitive)
   - Provide cooling mats
   - Always have fresh water
   - AC or fans in warm weather

**Nutrition Considerations:**
- High-quality protein (kidney support)
- Appropriate fat levels (weight management)
- Small kibble size (tiny mouths)
- Foods supporting eye health (antioxidants, omega-3s)
- AAFCO-compliant always

---

**🎯 Dr. Alex's Practical Guide:**

**Shih Tzu Owner Action Plan:**

**Daily:**
- ✓ Clean facial folds
- ✓ Check eyes for discharge
- ✓ Brush teeth
- ✓ Check breathing (should be quiet)
- ✓ Fresh water available

**Weekly:**
- ✓ Body condition check (feel ribs)
- ✓ Trim hair around eyes
- ✓ Check paws/nails
- ✓ Ear cleaning if needed

**Monthly:**
- ✓ Weight check
- ✓ Full body exam
- ✓ Dental assessment

**Annually:**
- ✓ Complete blood work (emphasis: kidney, liver)
- ✓ Urinalysis
- ✓ Dental cleaning (as needed)
- ✓ Eye exam
- ✓ Senior screening (age 7+)

**Emergency Signs (VET NOW):**
- Eye bulging out (proptosis)
- Severe breathing difficulty
- Blue/purple gums
- Sudden paralysis/inability to walk
- Collapse in heat
- Seizures

---

### **AMERICAN BULLY**

**🔬 Dr. Sarah's Clinical Profile:**

**Common Health Predispositions:**

1. **Hip Dysplasia**
   - Abnormal hip joint development
   - Can lead to arthritis, pain
   - Blood work: Usually normal unless chronic pain/inflammation
   - Watch for: Limping, difficulty rising, "bunny hopping"

2. **Elbow Dysplasia**
   - Similar to hip dysplasia
   - Affects front legs
   - Watch for: Limping, stiffness, reluctance to play

3. **Cardiac Conditions**
   - Dilated cardiomyopathy (DCM) possible
   - Congenital heart defects
   - Blood work: May be normal; needs cardiac workup
   - Watch for: Coughing, exercise intolerance, fainting

4. **Skin Conditions**
   - Allergies (food, environmental)
   - Demodectic mange (demodex mites)
   - Bacterial skin infections
   - Blood work impact: May show eosinophilia with allergies
   - Watch for: Itching, hair loss, redness, odor

5. **Thyroid Disease**
   - Hypothyroidism common in bully breeds
   - Blood work markers: Low T4, elevated cholesterol
   - Watch for: Weight gain, lethargy, skin/coat problems

6. **Cherry Eye**
   - Third eyelid gland prolapse
   - Requires surgical correction
   - Watch for: Red mass in corner of eye

7. **Bloat (GDV)**
   - Life-threatening emergency
   - Deep-chested breeds at risk
   - Watch for: Distended abdomen, retching without vomiting, collapse

**Recommended Screening:**
- Annual: Complete blood work, thyroid panel (age 4+), hip/elbow x-rays
- Cardiac: Echocardiogram if any symptoms
- Skin: Allergy testing if chronic issues
- Age 7+: Semi-annual blood work

**Blood Work Considerations:**
- Thyroid: Screen starting age 4
- Muscle mass: May have higher creatinine (muscle, not kidney disease)
- Check eosinophils (allergies)

📚 Sources:
- American Bully Kennel Club Health Resources
- Orthopedic Foundation for Animals (OFA)
- Veterinary Dermatology Journal

---

**🌿 Dr. Maya's Holistic Approach:**

**Breed-Specific Wellness:**

1. **Joint Support**
   - Maintain ideal weight (prevent joint stress)
   - Glucosamine/chondroitin/MSM (vet-approved)
   - Omega-3 fatty acids (anti-inflammatory)
   - Low-impact exercise (swimming ideal)

2. **Skin Health**
   - High-quality diet (protein, omega-3s)
   - Regular bathing (hypoallergenic shampoo)
   - Keep wrinkles clean and dry
   - Probiotics for skin/gut connection (vet-approved)

3. **Cardiac Support**
   - Taurine-rich diet (heart health)
   - L-carnitine (vet-approved)
   - Coenzyme Q10 (research-supported, vet-approved)
   - Avoid grain-free "boutique" diets (DCM link)

4. **Thyroid Support**
   - Selenium-rich foods (vet-approved)
   - Iodine balance (in complete diet)
   - Regular monitoring

5. **Allergy Management**
   - Identify triggers (food trial, allergy testing)
   - Reduce environmental allergens
   - Air purifiers, frequent cleaning
   - Natural anti-inflammatories (vet-approved)

**Nutrition Considerations:**
- High-quality animal protein (muscle mass)
- Appropriate fat levels (weight management)
- Joint-supporting nutrients
- Avoid grain-free DCM-linked diets
- Large breed formula considerations

---

**🎯 Dr. Alex's Practical Guide:**

**American Bully Owner Action Plan:**

**Daily:**
- ✓ Clean facial wrinkles (if present)
- ✓ Check skin for irritation
- ✓ Moderate exercise (avoid overexertion)
- ✓ Watch for limping/stiffness

**Weekly:**
- ✓ Weight check (obesity = joint stress)
- ✓ Nail trim (long nails affect gait)
- ✓ Ear cleaning
- ✓ Skin/coat assessment

**Monthly:**
- ✓ Body condition score
- ✓ Joint mobility assessment
- ✓ Dental check

**Annually:**
- ✓ Complete blood work + thyroid panel (age 4+)
- ✓ Hip/elbow evaluation
- ✓ Cardiac exam (listen for murmurs)
- ✓ Skin assessment

**Emergency Signs (VET NOW):**
- Bloated, hard abdomen
- Difficulty breathing
- Collapse
- Sudden paralysis
- Unproductive retching
- Severe limping/pain

---

### **GOLDEN RETRIEVER**

**🔬 Dr. Sarah's Clinical Profile:**

**Common Health Predispositions:**

1. **Cancer**
   - 60% develop cancer in lifetime
   - Hemangiosarcoma (spleen, heart)
   - Lymphoma
   - Mast cell tumors
   - Blood work: Anemia (bleeding tumors), abnormal cells
   - Watch for: Lumps, lethargy, collapse, weight loss

2. **Hip & Elbow Dysplasia**
   - Genetic predisposition
   - OFA screening recommended
   - Watch for: Limping, stiffness, difficulty rising

3. **Heart Disease**
   - Subvalvular aortic stenosis (SAS)
   - Dilated cardiomyopathy possible
   - Watch for: Murmur, exercise intolerance, coughing

4. **Hypothyroidism**
   - Very common in Goldens
   - Blood work: Low T4, elevated cholesterol, anemia
   - Watch for: Weight gain, lethargy, skin/coat issues

5. **Eye Diseases**
   - Progressive retinal atrophy (PRA)
   - Cataracts
   - Pigmentary uveitis
   - Watch for: Night blindness, cloudiness, vision loss

6. **Skin Conditions**
   - Atopic dermatitis (allergies)
   - Hot spots
   - Ear infections
   - Watch for: Itching, redness, odor, hair loss

**Recommended Screening:**
- Annual: Complete blood work, thyroid panel (age 3+)
- Cardiac: Echocardiogram (screening/if murmur)
- Eyes: Annual exam with ophthalmologist
- Hip/elbow: OFA x-rays (age 2)
- Age 7+: Semi-annual blood work, cancer screening

📚 Sources:
- Golden Retriever Club of America
- Morris Animal Foundation Golden Retriever Lifetime Study
- Veterinary Cancer Society

---

**🌿 Dr. Maya's Holistic Approach:**

**Cancer Prevention Strategies:**
- Fresh, whole food diet (reduce processed foods)
- Antioxidant-rich foods (berries, leafy greens - vet-approved)
- Avoid environmental toxins (pesticides, chemicals)
- Maintain ideal weight
- Regular exercise
- Stress reduction

**Joint Support:**
- Omega-3 fatty acids (EPA/DHA)
- Glucosamine/chondroitin
- MSM, green-lipped mussel (vet-approved)
- Weight management crucial

**Skin Support:**
- High-quality protein and fats
- Omega-3 supplementation
- Regular grooming
- Natural shampoos

---

**🎯 Dr. Alex's Practical Guide:**

**Golden Retriever Owner Action Plan:**

**Daily:**
- ✓ Check for lumps (daily petting = early detection)
- ✓ Monitor energy level
- ✓ Check skin/ears

**Monthly:**
- ✓ Full body lump check
- ✓ Weight check
- ✓ Joint mobility assessment

**Every 6 Months (Age 7+):**
- ✓ Complete blood work
- ✓ Abdominal ultrasound (cancer screening)
- ✓ Thoracic x-rays (if indicated)

**Annually:**
- ✓ Complete blood work + thyroid
- ✓ Cardiac exam
- ✓ Eye exam
- ✓ Hip/joint assessment

---

### **FRENCH BULLDOG**

**🔬 Dr. Sarah's Clinical Profile:**

**Common Health Predispositions:**

1. **Brachycephalic Obstructive Airway Syndrome (BOAS)**
   - Stenotic nares, elongated soft palate
   - Life-threatening in heat/stress
   - Blood work: May show stress response, heat stroke complications
   - Watch for: Loud breathing, exercise intolerance, blue gums, collapse

2. **Spinal Conditions**
   - Hemivertebrae (abnormal spine)
   - Intervertebral disc disease (IVDD)
   - Watch for: Pain, weakness, paralysis

3. **Allergies**
   - Food allergies common
   - Environmental allergies
   - Blood work: Elevated eosinophils
   - Watch for: Itching, ear infections, skin redness

4. **Eye Conditions**
   - Cherry eye
   - Corneal ulcers
   - Entropion
   - Watch for: Squinting, discharge, redness

5. **Hip Dysplasia**
   - Common despite small size
   - Watch for: Limping, "bunny hopping," difficulty rising

**Recommended Screening:**
- Annual: Blood work, allergy assessment
- Spine: X-rays if symptoms
- Eyes: Regular exams
- Before anesthesia: Cardiac/respiratory clearance critical

📚 Sources:
- French Bulldog Club of America
- Brachycephalic Working Group

---

**🌿 Dr. Maya's Holistic Approach:**

**Brachycephalic Care:**
- Keep cool always (AC, fans, cooling mats)
- Never exercise in heat
- Harness (not collar - breathing)
- Weight management (extra weight = worse breathing)

**Allergy Management:**
- Novel protein diets (food trial)
- Omega-3 supplementation
- Probiotics
- Environmental control (air purifiers, hypoallergenic bedding)

**Skin Fold Care:**
- Daily cleaning (wrinkles, tail pocket)
- Natural antifungals (vet-approved)
- Keep dry

---

**🎯 Dr. Alex's Practical Guide:**

**Frenchie Owner Action Plan:**

**Daily:**
- ✓ Clean all wrinkles
- ✓ Monitor breathing
- ✓ Keep cool
- ✓ Check tail pocket

**Weekly:**
- ✓ Ear cleaning
- ✓ Nail trim
- ✓ Skin assessment

**Annually:**
- ✓ Blood work
- ✓ Allergy evaluation
- ✓ Respiratory assessment

**Emergency Signs (VET NOW):**
- Severe breathing difficulty
- Blue/purple gums
- Collapse (especially in heat)
- Heat stroke signs
- Sudden paralysis

---

### **LABRADOR RETRIEVER**

**🔬 Dr. Sarah's Clinical Profile:**

**Common Health Predispositions:**

1. **Obesity**
   - Genetic predisposition (POMC gene mutation)
   - Labs feel constantly hungry
   - Blood work impact: Elevated cholesterol, triglycerides, glucose
   - Leads to: Joint disease, diabetes, heart disease

2. **Hip & Elbow Dysplasia**
   - Very common
   - OFA screening essential
   - Watch for: Limping, stiffness, exercise intolerance

3. **Exercise-Induced Collapse (EIC)**
   - Genetic condition
   - Collapse during intense exercise
   - Usually recovers quickly
   - Genetic test available

4. **Cranial Cruciate Ligament (CCL) Tears**
   - Common knee injury
   - Often requires surgery
   - Watch for: Sudden limping, not weight-bearing on leg

5. **Ear Infections**
   - Floppy ears = moisture retention
   - Chronic infections common
   - Watch for: Head shaking, odor, discharge

6. **Laryngeal Paralysis**
   - More common in older Labs
   - Watch for: Loud breathing, voice change, exercise intolerance

**Recommended Screening:**
- Annual: Blood work (lipid panel), weight management check
- Hip/elbow: OFA x-rays (age 2)
- EIC: Genetic test (if active/working dog)
- Age 7+: Senior panel semi-annually

📚 Sources:
- Labrador Retriever Club
- Orthopedic Foundation for Animals
- University of Minnesota EIC Research

---

**🌿 Dr. Maya's Holistic Approach:**

**Weight Management:**
- Measured meals (no free feeding!)
- High fiber, lower calorie diet
- Green beans, pumpkin as fillers (vet-approved)
- Regular exercise (swimming ideal)
- Food puzzles (slow eating, mental stimulation)

**Joint Support:**
- Maintain ideal weight (critical!)
- Omega-3 fatty acids
- Glucosamine/chondroitin
- Low-impact exercise

**Ear Care:**
- Weekly cleaning (especially after swimming)
- Dry ears thoroughly
- Ear cleaner (vet-recommended)

---

**🎯 Dr. Alex's Practical Guide:**

**Lab Owner Action Plan:**

**Daily:**
- ✓ Portion control (measure every meal!)
- ✓ Exercise (30-60 minutes)
- ✓ Check ears after water activities
- ✓ No table scraps

**Weekly:**
- ✓ Weight check
- ✓ Ear cleaning
- ✓ Body condition score

**Monthly:**
- ✓ Joint assessment
- ✓ Weight tracking

**Annually:**
- ✓ Blood work (lipid panel)
- ✓ Joint evaluation
- ✓ Body condition assessment

---

### **GERMAN SHEPHERD**

**🔬 Dr. Sarah's Clinical Profile:**

**Common Health Predispositions:**

1. **Hip Dysplasia**
   - Very high incidence
   - Can be severe
   - OFA screening essential
   - Watch for: Difficulty rising, "bunny hopping," limping

2. **Degenerative Myelopathy (DM)**
   - Progressive spinal cord disease
   - No cure, genetic
   - Genetic test available
   - Watch for: Hind leg weakness, dragging paws, paralysis

3. **Exocrine Pancreatic Insufficiency (EPI)**
   - Pancreas doesn't produce digestive enzymes
   - Blood work: Low TLI (trypsin-like immunoreactivity)
   - Watch for: Weight loss despite eating, chronic diarrhea, ravenous appetite

4. **Bloat (GDV)**
   - Life-threatening emergency
   - Deep-chested breeds high risk
   - Watch for: Distended abdomen, retching, collapse

5. **Hemangiosarcoma**
   - Aggressive cancer (spleen, heart)
   - Often diagnosed late
   - Watch for: Collapse, pale gums, abdominal distension

6. **Chronic Diarrhea/IBD**
   - Sensitive digestive systems
   - May need special diets
   - Watch for: Chronic loose stools, weight loss

**Recommended Screening:**
- Annual: Blood work, TLI test (if GI symptoms)
- Hip: OFA x-rays (age 2)
- DM: Genetic test
- Age 7+: Abdominal ultrasound (spleen monitoring), semi-annual blood work

📚 Sources:
- German Shepherd Dog Club of America
- University of Missouri - DM Research
- OFA Health Database

---

**🌿 Dr. Maya's Holistic Approach:**

**Digestive Support:**
- High-quality, easily digestible protein
- Probiotics and prebiotics
- Digestive enzymes (if EPI)
- Limited ingredient diets (if IBD)

**Joint Support:**
- Weight management
- Omega-3 fatty acids
- Glucosamine/chondroitin
- Physical therapy, hydrotherapy

**Spinal Support:**
- Maintain healthy weight
- Controlled exercise (no jumping from heights)
- Anti-inflammatory diet

---

**🎯 Dr. Alex's Practical Guide:**

**German Shepherd Owner Action Plan:**

**Daily:**
- ✓ Monitor stool quality
- ✓ Check mobility/gait
- ✓ Controlled exercise

**Weekly:**
- ✓ Weight check
- ✓ Joint assessment
- ✓ Neurological check (toe drag?)

**Annually:**
- ✓ Blood work + TLI (if GI issues)
- ✓ Hip/joint evaluation
- ✓ Abdominal ultrasound (age 7+)

**Emergency Signs:**
- Bloated abdomen
- Collapse
- Pale gums
- Severe weakness
- Dragging hind legs suddenly

---

### **YORKSHIRE TERRIER**

**🔬 Dr. Sarah's Clinical Profile:**

**Common Health Predispositions:**

1. **Hypoglycemia**
   - Low blood sugar (especially puppies, small adults)
   - Blood work: Low glucose
   - Watch for: Weakness, trembling, seizures, collapse

2. **Portosystemic Shunt (Liver Shunt)**
   - Blood bypasses liver
   - Blood work: Low albumin, high bile acids
   - Watch for: Stunted growth, neurological signs, vomiting

3. **Tracheal Collapse**
   - Weakened trachea
   - "Honking" cough
   - Watch for: Coughing, breathing difficulty, blue gums

4. **Patellar Luxation**
   - Kneecap slips out
   - Very common in Yorkies
   - Watch for: Skipping, limping, holding leg up

5. **Dental Disease**
   - Tiny mouths = crowded teeth
   - High risk for tooth loss, infections
   - Blood work: Elevated WBC if infected
   - Watch for: Bad breath, difficulty eating

6. **Pancreatitis**
   - Sensitive to fatty foods
   - Blood work: Elevated lipase, amylase
   - Watch for: Vomiting, abdominal pain, loss of appetite

**Recommended Screening:**
- Puppies: Bile acids test (liver shunt screening)
- Annual: Blood work, dental exam
- Before anesthesia: Liver/kidney function critical
- Age 7+: Semi-annual blood work

📚 Sources:
- Yorkshire Terrier Club of America
- Small Breed Health Studies

---

**🌿 Dr. Maya's Holistic Approach:**

**Hypoglycemia Prevention:**
- Frequent small meals (3-4x daily for tiny dogs)
- Keep Karo syrup/honey on hand (emergency)
- Avoid prolonged fasting

**Tracheal Support:**
- Harness (NEVER collar - trachea damage)
- Maintain ideal weight
- Avoid irritants (smoke, strong chemicals)
- Humidifier (dry air irritates trachea)

**Dental Care:**
- Daily brushing
- Dental chews (size-appropriate)
- Professional cleaning regularly

---

**🎯 Dr. Alex's Practical Guide:**

**Yorkie Owner Action Plan:**

**Daily:**
- ✓ 3-4 small meals (prevent hypoglycemia)
- ✓ Brush teeth
- ✓ Monitor breathing/coughing
- ✓ Check energy level

**Weekly:**
- ✓ Dental assessment
- ✓ Weight check (obesity = trachea stress)
- ✓ Knee check (patellar luxation)

**Annually:**
- ✓ Blood work (liver focus)
- ✓ Dental cleaning
- ✓ Tracheal assessment

**Emergency Signs:**
- Severe breathing difficulty
- Blue gums
- Collapse/weakness (hypoglycemia)
- Seizures
- Severe coughing fit

---

### **BULLDOG (ENGLISH)**

**🔬 Dr. Sarah's Clinical Profile:**

**Common Health Predispositions:**

1. **Brachycephalic Syndrome**
   - Severe in Bulldogs
   - Often requires surgery (nares, soft palate)
   - Can be life-limiting
   - Watch for: Loud breathing, collapse, heat intolerance

2. **Hip Dysplasia**
   - Nearly universal in breed
   - Watch for: Difficulty rising, waddling gait

3. **Skin Fold Dermatitis**
   - Deep wrinkles = bacterial/yeast infections
   - Watch for: Odor, redness, discharge in folds

4. **Cherry Eye**
   - Very common
   - Requires surgical correction
   - Watch for: Red mass in corner of eye

5. **Urinary Stones**
   - Prone to bladder stones
   - Blood work: Check kidney function
   - Watch for: Straining to urinate, blood in urine

6. **Heart Disease**
   - Congenital defects possible
   - Watch for: Murmur, exercise intolerance

**Recommended Screening:**
- Annual: Blood work, urinalysis, cardiac exam
- Before anesthesia: Full workup (high anesthetic risk)
- Age 5+: Semi-annual monitoring

📚 Sources:
- Bulldog Club of America
- Brachycephalic Working Group

---

**🌿 Dr. Maya's Holistic Approach:**

**Wrinkle Care:**
- Daily cleaning (all folds, tail pocket, facial folds)
- Dry thoroughly
- Natural antifungals (coconut oil - vet-approved)

**Cooling Support:**
- CRITICAL: Keep cool always
- AC required in warm climates
- Cooling vests, mats
- No outdoor exercise in heat

**Weight Management:**
- Maintain ideal weight (obesity = respiratory crisis)
- Measured meals
- Appropriate exercise (short, cool walks only)

---

**🎯 Dr. Alex's Practical Guide:**

**Bulldog Owner Action Plan:**

**Daily:**
- ✓ Clean ALL wrinkles
- ✓ Monitor breathing
- ✓ Keep cool
- ✓ Check tail pocket

**Weekly:**
- ✓ Weight check
- ✓ Skin assessment
- ✓ Ear cleaning

**Annually:**
- ✓ Complete blood work
- ✓ Urinalysis
- ✓ Cardiac evaluation
- ✓ Respiratory assessment

**Emergency Signs:**
- Severe breathing difficulty
- Blue gums
- Collapse (especially heat)
- Heat stroke
- Unable to urinate

---

### **DACHSHUND**

**🔬 Dr. Sarah's Clinical Profile:**

**Common Health Predispositions:**

1. **Intervertebral Disc Disease (IVDD)**
   - 25% of Dachshunds affected
   - Can cause paralysis
   - EMERGENCY if sudden paralysis
   - Watch for: Back pain, reluctance to move, crying, paralysis

2. **Cushing's Disease**
   - Common in older Dachshunds
   - Blood work: Elevated ALP, high cortisol
   - Watch for: Increased thirst/urination, pot belly, hair loss

3. **Diabetes**
   - Relatively common
   - Blood work: High glucose
   - Watch for: Increased thirst/urination, weight loss

4. **Obesity**
   - Very common
   - Worsens back problems
   - Watch for: Ribs not felt, no waist

5. **Dental Disease**
   - Small mouths
   - Watch for: Bad breath, difficulty eating

**Recommended Screening:**
- Annual: Blood work, spinal assessment
- Age 7+: ACTH stimulation test (Cushing's), glucose monitoring
- X-rays: If any back pain

📚 Sources:
- Dachshund Club of America
- UC Davis IVDD Research

---

**🌿 Dr. Maya's Holistic Approach:**

**IVDD Prevention:**
- Maintain ideal weight (critical!)
- Use ramps (no jumping off furniture)
- Support spine (proper lifting technique)
- Joint supplements
- Anti-inflammatory foods (omega-3s)

**Weight Management:**
- Portion control
- Low-calorie treats
- Regular exercise (safe for back)

---

**🎯 Dr. Alex's Practical Guide:**

**Dachshund Owner Action Plan:**

**Daily:**
- ✓ No jumping off furniture (use ramps!)
- ✓ Proper lifting (support front AND back)
- ✓ Weight management
- ✓ Watch for pain signs

**Weekly:**
- ✓ Weight check
- ✓ Spinal assessment

**Annually:**
- ✓ Blood work
- ✓ Body condition score
- ✓ Dental assessment

**Emergency Signs:**
- Sudden paralysis (EMERGENCY)
- Severe back pain
- Inability to walk
- Loss of bladder/bowel control

---

## 🎓 HOW TO USE BREED INFORMATION

When analyzing blood work for these breeds:

1. **Reference breed predispositions** relevant to blood markers
2. **Provide all three perspectives** (Sarah, Maya, Alex)
3. **Connect blood work to visual signs** specific to breed
4. **Emphasize screening recommendations** for that breed
5. **Include emergency signs** specific to breed risks

---

## 📚 GENERAL BREED EDUCATION

For breeds NOT listed above, provide:
- General breed size category health risks (small/medium/large/giant)
- Common issues for breed type (working, sporting, toy, etc.)
- Encourage user to research breed-specific clubs
- Always recommend discussing with vet

---

END OF BREED KNOWLEDGE
`;

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
