import { useState } from 'react';
import { Clock } from 'lucide-react';

const App = () => {
  const [petData, setPetData] = useState({
    name: '',
    breed: '',
    age: '',
    weight: '',
    sex: '',
    neuteredSpayed: ''
  });
  
  const [bloodWork, setBloodWork] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [reportTier, setReportTier] = useState('free');

  // Stripe Payment Links
  const STRIPE_LINKS = {
    tier1: 'https://buy.stripe.com/bJeaEY6Rc6UIgye8pi8EM00',
    tier2: 'https://buy.stripe.com/3cI9AU2AW7YMbdUgVO8EM01',
    subscription: 'https://buy.stripe.com/cNicN6b7s2Es4PwbBu8EM02'
  };

  const SYSTEM_PROMPT = `
## 🎯 REPORT TIER SYSTEM

You must generate reports based on the tier specified.

---

### TIER 0: FREE - "Basic Health Check"

CONTENT TO PROVIDE:
- Welcome message
- Blood work report card (🟢🟡🔴 traffic light summary)
- Top 3 concerns identified
- Emergency red flags (if any)
- Basic interpretation by Traditional DVM perspective only
- "When to see your vet" guidance
- NO detailed marker analysis
- NO three perspectives
- NO breed deep-dive
- NO nutrition guidance
- NO questions feature

LENGTH: 400-500 words maximum

END WITH UPGRADE CTA:
"🎓 Want Complete Clinical Analysis?
Upgrade to $9.99 for detailed explanations of every marker + ask 3 questions
[Or get all 3 doctors' perspectives + diet plan for $19.99]"

---

### TIER 1: $9.99 - "Detailed Analysis + Questions"

CONTENT TO PROVIDE:
- Everything from FREE tier PLUS:
- Complete detailed analysis by Traditional DVM perspective
- Clinical interpretation of EVERY blood marker
- What each marker means
- Why it might be elevated/low
- Diagnostic recommendations
- Breed-specific health risks (clinical perspective)
- Research citations (AVMA, AAHA, peer-reviewed journals)
- Questions to ask YOUR vet
- NO holistic perspective
- NO hybrid perspective  
- NO nutrition/diet guidance

LENGTH: 1500-2000 words

TONE: Professional, clinical, evidence-based

END WITH UPGRADE OPTION:
"💚 Want the Complete Picture?
Upgrade to $19.99 for holistic insights + hybrid action plan + complete diet recommendations"

---

### TIER 2: $19.99 - "Complete 3-Doctor Assessment"

CONTENT TO PROVIDE:
- Everything from $9.99 tier PLUS:
- Traditional Clinical Analysis (evidence-based)
- Holistic Assessment (whole-body, environmental, lifestyle)
- Hybrid Action Plan (practical steps combining both approaches)
- Complete breed-specific health guide (all three perspectives)
- Nutrition & diet recommendations (FDA-compliant, heavily disclaimed)
- Visual health assessment checklist
- Questions to ask YOUR vet (from all three perspectives)

LENGTH: 2500-3500 words

STRUCTURE:
For each blood marker, provide perspectives from:
1. Traditional Clinical View
2. Holistic Whole-Body View
3. Hybrid Practical Approach

---

### TIER 3: $29.99/mo - "Unlimited Membership"

CONTENT TO PROVIDE:
- SAME comprehensive report as $19.99 tier
- All three perspectives
- Complete analysis
- Full features

---

# 🏫 PETLABAI: PET HEALTH UNIVERSITY
## Laboratory Science • Educational Excellence • Veterinary Expertise

---

## 🎯 MISSION & POSITIONING

**What We Are:**
An educational platform teaching pet health science using progressive methods. We make complex veterinary concepts accessible through engaging education.

**What We Are NOT:**
- NOT practicing veterinary medicine
- NOT providing medical advice, diagnosis, or treatment
- NOT creating a veterinarian-client-patient relationship (VCPR)
- NOT a substitute for your veterinarian

**Our Philosophy:**
🔬 We Teach - Educational science about pet health
🏥 Vets Treat - Medical care, diagnosis, treatment
🐾 Together = Educated pet parents + healthy pets

---

## 📚 THREE-PERSPECTIVE EDUCATIONAL APPROACH

When analyzing blood work, provide THREE viewpoints:

### 1. TRADITIONAL CLINICAL VIEW
- Evidence-based medicine
- Research citations
- Clinical pathology standards
- AVMA/AAHA guidelines
- What the science shows

### 2. HOLISTIC WHOLE-BODY VIEW
- Whole-body perspective
- Environmental factors
- Nutrition and lifestyle
- Natural support (with disclaimers)
- Integrative approaches

### 3. HYBRID PRACTICAL APPROACH
- Practical application
- Combining approaches
- Real-world steps
- Action-oriented guidance

---

## 🔬 BLOOD WORK REPORT STRUCTURE

### SECTION 1 - WELCOME
- Educational disclaimer
- Report tier information
- Pet information summary

### SECTION 2 - REPORT CARD
Color-coded summary:
- 🟢 Excellent (within range)
- 🟡 Watch Zone (discuss with vet)
- 🔴 Needs Attention (vet should review)

### SECTION 3 - MARKER ANALYSIS
For each marker (tier-dependent):
- Clinical interpretation
- What it means
- Why it matters
- Breed considerations
- Next steps

### SECTION 4 - BREED-SPECIFIC INFO
Research-based breed predispositions with citations

### SECTION 5 - QUESTIONS FOR YOUR VET
Prepared questions based on results

### SECTION 6 - NEXT STEPS
Clear action items and monitoring recommendations

---

## ⚠️ CRITICAL DISCLAIMERS

WHAT PETLABAI IS:
✅ Educational platform for understanding pet health
✅ Resource to prepare for vet conversations
✅ Science-backed learning experience

WHAT PETLABAI IS NOT:
❌ NOT practicing veterinary medicine
❌ NOT providing diagnosis or treatment
❌ NOT creating VCPR
❌ NOT substitute for veterinarian

NUTRITIONAL INFORMATION (if included in tier):
All nutrition content is GENERAL education only. NOT personalized recommendations. NEVER change diet or add supplements without veterinarian approval.

EMERGENCY PROTOCOL:
If your pet shows emergency signs (difficulty breathing, collapse, seizures, severe bleeding, blue gums, bloated abdomen, inability to urinate, suspected poisoning, unconsciousness), CALL YOUR VET OR EMERGENCY HOSPITAL IMMEDIATELY.

---

## 💚 CORE PHILOSOPHY

"Every pet parent wants to be GREAT. They're not confused because they're careless—they're confused because no one taught them in language they can understand.

Pets can't speak. Vets speak technical language. Pet parents are left in the dark.

We turn on the lights. 💡

We provide education from multiple perspectives because every pet and pet parent is different.

We partner with veterinarians, never replace them.

Welcome to Pet Health University. Let's learn together."

---

END OF SYSTEM PROMPT
`;

  const CANINE_RANGES = `# Canine Reference Ranges

RBC (Red Blood Cells): 5.5-8.5 M/μL
Hemoglobin: 12-18 g/dL
Hematocrit: 37-55%
WBC (White Blood Cells): 6.0-17.0 K/μL
Platelets: 200-500 K/μL
Neutrophils: 3.0-11.5 K/μL
Lymphocytes: 1.0-4.8 K/μL
Monocytes: 0.2-1.8 K/μL
Eosinophils: 0.1-1.3 K/μL
Basophils: 0.0-0.1 K/μL

ALT (Alanine Aminotransferase): 10-125 U/L
AST (Aspartate Aminotransferase): 15-66 U/L
ALP (Alkaline Phosphatase): 20-150 U/L
GGT (Gamma-Glutamyl Transferase): 0-14 U/L
Total Bilirubin: 0.1-0.5 mg/dL
BUN (Blood Urea Nitrogen): 7-27 mg/dL
Creatinine: 0.5-1.8 mg/dL
Glucose: 70-143 mg/dL
Total Protein: 5.2-8.2 g/dL
Albumin: 2.3-4.0 g/dL
Globulin: 2.5-4.5 g/dL
Calcium: 7.9-12.0 mg/dL
Phosphorus: 2.5-6.8 mg/dL
Sodium: 141-152 mmol/L
Potassium: 3.5-5.8 mmol/L
Chloride: 105-115 mmol/L`;

  const handleAnalyze = async () => {
    if (!petData.name || !petData.breed || !bloodWork) {
      setError('Please fill in pet information and blood work results');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': import.meta.env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 4000,
          messages: [{
            role: 'user',
            content: `${SYSTEM_PROMPT}

REPORT TIER: ${reportTier}

${CANINE_RANGES}

Pet Information:
Name: ${petData.name}
Breed: ${petData.breed}
Age: ${petData.age} years
Weight: ${petData.weight} lbs
Sex: ${petData.sex}
Neuter Status: ${petData.neuteredSpayed}

Blood Work Results:
${bloodWork}

Generate the appropriate report based on the tier specified above.`
          }]
        })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      const analysisText = data.content
        .filter(item => item.type === 'text')
        .map(item => item.text)
        .join('\n');
      
      setResult(analysisText);
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to analyze blood work. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEmail = () => {
    if (!userEmail) {
      alert('Please enter your email');
      return;
    }
    alert('Report saved! Check your email.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      
      {/* Header */}
      <header className="bg-gradient-to-r from-[#003057] to-[#00a0af] text-white shadow-xl">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Logo */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-3xl">
                <span>🔬</span>
                <span>🎓</span>
                <span>🐾</span>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">PetLabAI</h1>
                <p className="text-sm md:text-base text-cyan-100 font-medium">Pet Health University</p>
              </div>
            </div>
            
            {/* Tagline */}
            <div className="hidden lg:flex flex-col items-end text-sm">
              <div className="flex items-center gap-3 font-medium">
                <span>🔬 Laboratory Science</span>
                <span className="text-cyan-300">•</span>
                <span>🎓 Educational Excellence</span>
                <span className="text-cyan-300">•</span>
                <span>🐾 Veterinary Expertise</span>
              </div>
              <p className="text-cyan-200 text-xs mt-1">We Teach • Vets Treat • Together = Healthy Pets</p>
            </div>
            
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
        
        {/* Hero Section */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#003057] mb-3">
            Understanding Your Pet's Blood Work Made Simple
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Turn confusing lab results into knowledge you can use. Learn from laboratory science, 
            educational experts, and veterinary professionals.
          </p>
        </div>

        {/* Educational Disclaimer */}
        <div className="mb-8 bg-gradient-to-r from-cyan-50 to-teal-50 border-l-4 border-[#00a0af] rounded-r-lg p-5 shadow-md">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📚</span>
            <div>
              <p className="text-sm font-semibold text-[#003057] mb-1">
                Educational Tool Only
              </p>
              <p className="text-xs text-gray-700 leading-relaxed">
                PetLabAI provides educational information about pet blood work. This is NOT veterinary 
                medical advice. For medical guidance, consult a licensed veterinarian. Using this platform 
                does not create a veterinarian-client-patient relationship.
              </p>
            </div>
          </div>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 border-t-4 border-[#00a0af] mb-8">
          <h3 className="text-2xl font-bold text-[#003057] mb-6 flex items-center gap-2">
            <span>🐾</span> Pet Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Pet Name *
              </label>
              <input
                type="text"
                value={petData.name}
                onChange={(e) => setPetData({...petData, name: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#00a0af] focus:outline-none transition"
                placeholder="e.g., Max"
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
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#00a0af] focus:outline-none transition"
                placeholder="e.g., Labrador Retriever"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Age (years)
              </label>
              <input
                type="number"
                value={petData.age}
                onChange={(e) => setPetData({...petData, age: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#00a0af] focus:outline-none transition"
                placeholder="e.g., 7"
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
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#00a0af] focus:outline-none transition"
                placeholder="e.g., 75"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Sex
              </label>
              <select
                value={petData.sex}
                onChange={(e) => setPetData({...petData, sex: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#00a0af] focus:outline-none transition"
              >
                <option value="">Select...</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Spayed/Neutered
              </label>
              <select
                value={petData.neuteredSpayed}
                onChange={(e) => setPetData({...petData, neuteredSpayed: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#00a0af] focus:outline-none transition"
              >
                <option value="">Select...</option>
                <option value="Spayed">Spayed</option>
                <option value="Neutered">Neutered</option>
                <option value="Intact">Intact</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <span>🔬</span> Blood Work Results *
            </label>
            <textarea
              value={bloodWork}
              onChange={(e) => setBloodWork(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#00a0af] focus:outline-none transition h-64 font-mono text-sm"
              placeholder="Paste blood work results here, e.g.:

RBC: 6.5
Hemoglobin: 15.0
WBC: 11.0
ALT: 95
BUN: 22
Creatinine: 1.3
..."
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#00a0af] to-[#008a97] hover:from-[#008a97] hover:to-[#007a87] text-white py-4 px-6 rounded-lg font-bold text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg disabled:transform-none flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Clock className="w-6 h-6 animate-spin" />
                Creating Your Education Report...
              </>
            ) : (
              <>
                🎓 Start My Pet's Education Report
              </>
            )}
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-xl shadow-2xl p-12 text-center border-t-4 border-[#00a0af]">
            <div className="relative mb-8">
              <div className="text-7xl animate-bounce mb-4">🎓</div>
              <div className="text-5xl absolute top-0 left-1/2 transform -translate-x-1/2 animate-spin">🔬</div>
            </div>
            
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#003057] to-[#00a0af] bg-clip-text text-transparent mb-3">
              Creating {petData.name}'s Education Report!
            </h2>
            
            <p className="text-lg text-gray-700 mb-6">
              📚 Teaching you about {petData.name}'s health...
            </p>
            
            <div className="max-w-md mx-auto">
              <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                <span className="animate-pulse">✓ Analyzing markers</span>
                <span className="animate-pulse" style={{animationDelay: '0.2s'}}>✓ Building insights</span>
                <span className="animate-pulse" style={{animationDelay: '0.4s'}}>✓ Preparing education</span>
              </div>
            </div>
            
            <p className="text-sm text-gray-500 mt-8">
              This may take 1-2 minutes...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 rounded-r-lg p-6 mb-8">
            <p className="text-red-800 font-semibold">{error}</p>
          </div>
        )}

        {/* Results */}
        {result && !loading && (
          <>
            <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 border-t-4 border-[#00a0af] mb-8">
              
              {/* Results Header */}
              <div className="mb-6 pb-6 border-b-2 border-teal-100">
                <div className="flex items-center justify-center mb-3">
                  <span className="text-3xl mr-2">🎓</span>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#003057]">
                    {petData.name}'s Education Report
                  </h2>
                </div>
                <p className="text-center text-sm text-gray-600">
                  📚 Learning about your pet's health • 🏥 Share with your vet
                </p>
              </div>

              {/* Report Content */}
              <div className="prose prose-lg max-w-none">
                <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                  {result}
                </div>
              </div>
            </div>

            {/* Email Capture for Free Users */}
            {reportTier === 'free' && !userEmail && (
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border-2 border-[#00a0af] rounded-xl p-6 mb-8 shadow-lg">
                <h3 className="text-xl font-bold text-[#003057] mb-3 flex items-center gap-2">
                  <span>📧</span> Save Your Report
                </h3>
                <p className="text-gray-700 mb-4">
                  Enter your email to save this report and get notified about {petData.name}'s health updates.
                </p>
                <div className="flex gap-3">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#00a0af] focus:outline-none"
                  />
                  <button
                    onClick={handleSaveEmail}
                    className="bg-[#00a0af] hover:bg-[#008a97] text-white px-8 py-3 rounded-lg font-semibold transition shadow-md"
                  >
                    Save Report
                  </button>
                </div>
              </div>
            )}

            {/* Upgrade Options for Free Users */}
            {reportTier === 'free' && (
              <div className="bg-gradient-to-br from-white to-teal-50 border-2 border-[#00a0af] rounded-xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                  <div className="text-5xl mb-4">🎓</div>
                  <h2 className="text-3xl font-bold text-[#003057] mb-3">
                    Want Complete Clinical Analysis?
                  </h2>
                  <p className="text-gray-700 max-w-2xl mx-auto">
                    Unlock detailed clinical interpretation of every marker + ask 3 questions directly to veterinary experts
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                  
                  {/* Tier 1: $9.99 */}
                  <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 hover:border-[#00a0af] transition-all hover:shadow-xl">
                    <div className="text-center mb-4">
                      <div className="text-3xl font-bold text-[#003057] mb-1">$9.99</div>
                      <div className="text-sm text-gray-600 font-medium">One-Time Payment</div>
                    </div>
                    
                    <div className="mb-6">
                      <div className="text-sm font-bold text-[#00a0af] mb-3">✅ What You Get:</div>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-[#00a0af] mt-0.5">🔬</span>
                          <span>Complete clinical analysis</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#00a0af] mt-0.5">📋</span>
                          <span>Detailed explanation of every marker</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#00a0af] mt-0.5">🐕</span>
                          <span>Breed-specific health risks</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#00a0af] mt-0.5">💬</span>
                          <span><strong>Ask 3 questions</strong></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#00a0af] mt-0.5">📄</span>
                          <span>Downloadable PDF</span>
                        </li>
                      </ul>
                    </div>

                    <a
                      href={STRIPE_LINKS.tier1}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-[#00a0af] hover:bg-[#008a97] text-white text-center py-3 rounded-lg font-semibold transition shadow-md"
                    >
                      Get Detailed Analysis
                    </a>
                    
                    <p className="text-xs text-center text-gray-500 mt-3">
                      Perfect for one-time checkup
                    </p>
                  </div>

                  {/* Tier 2: $19.99 - MOST POPULAR */}
                  <div className="bg-white rounded-xl p-6 shadow-2xl border-4 border-[#003057] relative transform md:scale-105">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#ff6b6b] to-[#ff8787] text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      ⭐ MOST POPULAR
                    </div>
                    
                    <div className="text-center mb-4 mt-2">
                      <div className="text-3xl font-bold text-[#003057] mb-1">$19.99</div>
                      <div className="text-sm text-gray-600 font-medium">One-Time Payment</div>
                    </div>
                    
                    <div className="mb-6">
                      <div className="text-sm font-bold text-[#003057] mb-3">✅ Everything in $9.99 PLUS:</div>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-[#003057] mt-0.5">🌿</span>
                          <span><strong>Holistic whole-body assessment</strong></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#003057] mt-0.5">🎯</span>
                          <span><strong>Hybrid practical action plan</strong></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#003057] mt-0.5">🥗</span>
                          <span><strong>Complete diet & nutrition plan</strong></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#003057] mt-0.5">📸</span>
                          <span>Visual health checklist</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#003057] mt-0.5">💬</span>
                          <span><strong>Ask 3 questions to any expert</strong></span>
                        </li>
                      </ul>
                    </div>

                    <a
                      href={STRIPE_LINKS.tier2}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-gradient-to-r from-[#003057] to-[#00446b] hover:from-[#00446b] hover:to-[#003057] text-white text-center py-3 rounded-lg font-semibold transition shadow-lg"
                    >
                      Get Complete Assessment
                    </a>
                    
                    <p className="text-xs text-center text-gray-500 mt-3">
                      <strong>Best value!</strong> Get all 3 perspectives
                    </p>
                  </div>

                  {/* Tier 3: $29.99/mo */}
                  <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-xl p-6 shadow-lg border-2 border-[#00a0af] hover:shadow-xl transition-all">
                    <div className="text-center mb-4">
                      <div className="text-3xl font-bold text-[#003057] mb-1">$29.99</div>
                      <div className="text-sm text-gray-600 font-medium">Per Month</div>
                    </div>
                    
                    <div className="mb-6">
                      <div className="text-sm font-bold text-[#00a0af] mb-3">✅ Everything in $19.99 PLUS:</div>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-[#00a0af] mt-0.5">🔄</span>
                          <span><strong>UNLIMITED reports</strong></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#00a0af] mt-0.5">💬</span>
                          <span><strong>UNLIMITED questions</strong></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#00a0af] mt-0.5">📊</span>
                          <span>Track over time</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#00a0af] mt-0.5">📚</span>
                          <span>Course library access</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#00a0af] mt-0.5">🎥</span>
                          <span>Monthly Q&A webinars</span>
                        </li>
                      </ul>
                    </div>

                    <a
                      href={STRIPE_LINKS.subscription}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-[#00a0af] hover:bg-[#008a97] text-white text-center py-3 rounded-lg font-semibold transition shadow-md"
                    >
                      Subscribe Now
                    </a>
                    
                    <p className="text-xs text-center text-gray-500 mt-3">
                      For multiple pets or chronic conditions
                    </p>
                  </div>

                </div>

                <div className="mt-8 text-center text-sm text-gray-600">
                  <p className="mb-2">🔒 Secure payment via Stripe • 💯 30-day money-back guarantee</p>
                  <p className="text-xs">All plans include downloadable PDF reports you can share with your vet</p>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#003057] to-[#00446b] text-white mt-16">
        <div className="container mx-auto px-6 py-10">
          <div className="bg-gradient-to-r from-[#00446b]/50 to-[#003057]/50 backdrop-blur rounded-lg p-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <span className="text-4xl mr-3">🔬🎓🐾</span>
                <div>
                  <p className="text-2xl font-bold">PetLabAI</p>
                  <p className="text-sm text-cyan-200 font-medium">Pet Health University</p>
                </div>
              </div>
              
              <p className="text-base mb-2 font-medium text-cyan-100">
                🔬 Laboratory Science • 🎓 Educational Excellence • 🐾 Veterinary Expertise
              </p>
              
              <div className="flex items-center justify-center gap-3 text-sm text-cyan-200 mb-4">
                <span>We Teach</span>
                <span>•</span>
                <span>Your Vet Treats</span>
                <span>•</span>
                <span>Together = Healthy Pets</span>
              </div>
              
              <div className="border-t border-cyan-600 pt-6 mt-6">
                <p className="text-sm text-cyan-100 mb-2">
                  © 2025 Content Crew LLC. All rights reserved.
                </p>
                <a 
                  href="https://www.contentcrewai.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm text-cyan-300 hover:text-white hover:underline font-medium transition"
                >
                  www.contentcrewai.com
                </a>
              </div>
              
              <div className="mt-6 text-xs text-cyan-300 space-x-4">
                <a href="#" className="hover:text-white transition">Medical Disclaimer</a>
                <span>•</span>
                <a href="#" className="hover:text-white transition">Privacy Policy</a>
                <span>•</span>
                <a href="#" className="hover:text-white transition">Terms of Service</a>
              </div>

              <div className="mt-6 pt-6 border-t border-cyan-600">
                <p className="text-xs text-cyan-300 leading-relaxed max-w-3xl mx-auto">
                  Educational content only. Not a substitute for veterinary care. PetLabAI does not provide 
                  medical advice, diagnosis, or treatment. Always consult a licensed veterinarian for medical 
                  guidance. Using this platform does not create a veterinarian-client-patient relationship.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
