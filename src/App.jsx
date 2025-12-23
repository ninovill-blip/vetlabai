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

  const SYSTEM_PROMPT = `You are an educational veterinary blood work interpreter for PetLabAI - Pet Health University.

CRITICAL: Generate reports based on tier: ${reportTier}

TIER: FREE
- Welcome message
- Blood work report card (🟢🟡🔴)
- Top 3 concerns
- Emergency red flags
- Basic interpretation (Traditional DVM perspective only)
- When to see vet
- NO detailed analysis
- NO three perspectives
- NO breed deep-dive
- NO nutrition
- LENGTH: 400-500 words
- END WITH: "🎓 Want Complete Analysis? Upgrade to $9.99 for detailed explanations + 3 questions"

TIER: PAID ($9.99+)
- Everything from FREE plus complete detailed analysis
- All blood markers explained
- Three perspectives (Traditional, Holistic, Hybrid)
- Breed-specific health guide
- Nutrition recommendations (heavily disclaimed)
- Visual health checklist
- Questions for vet
- LENGTH: 2500-3500 words

EDUCATIONAL DISCLAIMERS:
- This is educational content only
- NOT veterinary medical advice
- NOT diagnosis or treatment
- Share with licensed veterinarian
- Does NOT create veterinarian-client-patient relationship

PROFESSIONAL TONE:
- Clear, educational language
- Evidence-based information
- Cite research when possible (AVMA, AAHA)
- Empowering but not alarming
- Partner with veterinarians, never replace

Brand: Pet Health University
Mission: 🔬 Laboratory Science • 🎓 Educational Excellence • 🐾 Veterinary Expertise
Tagline: We Teach • Vets Treat • Together = Healthy Pets`;

  const CANINE_RANGES = `CANINE REFERENCE RANGES:
RBC: 5.5-8.5 M/μL | Hemoglobin: 12-18 g/dL | Hematocrit: 37-55%
WBC: 6.0-17.0 K/μL | Platelets: 200-500 K/μL
Neutrophils: 3.0-11.5 K/μL | Lymphocytes: 1.0-4.8 K/μL
ALT: 10-125 U/L | AST: 15-66 U/L | ALP: 20-150 U/L
BUN: 7-27 mg/dL | Creatinine: 0.5-1.8 mg/dL
Glucose: 70-143 mg/dL | Total Protein: 5.2-8.2 g/dL
Albumin: 2.3-4.0 g/dL | Calcium: 7.9-12.0 mg/dL
Phosphorus: 2.5-6.8 mg/dL | Sodium: 141-152 mmol/L
Potassium: 3.5-5.8 mmol/L`;

  const handleAnalyze = async () => {
    if (!petData.name || !petData.breed || !bloodWork) {
      setError('Please fill in pet name, breed, and blood work results');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      // Call our backend API
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          systemPrompt: SYSTEM_PROMPT,
          canineRanges: CANINE_RANGES,
          petData,
          bloodWork,
          reportTier
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Analysis failed');
      }

      const data = await response.json();
      const analysisText = data.content
        .filter(item => item.type === 'text')
        .map(item => item.text)
        .join('\n');
      
      setResult(analysisText);
    } catch (err) {
      console.error('Error:', err);
      setError(`Failed to analyze: ${err.message}`);
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
                medical advice. For medical guidance, consult a licensed veterinarian.
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
            <div className="text-6xl mb-4 animate-bounce">🎓</div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#003057] to-[#00a0af] bg-clip-text text-transparent mb-3">
              Creating {petData.name}'s Education Report!
            </h2>
            <p className="text-lg text-gray-700">
              📚 Teaching you about {petData.name}'s health...
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
              <div className="mb-6 pb-6 border-b-2 border-teal-100">
                <div className="flex items-center justify-center mb-3">
                  <span className="text-3xl mr-2">🎓</span>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#003057]">
                    {petData.name}'s Education Report
                  </h2>
                </div>
              </div>

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
                  Enter your email to save this report.
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
                    Save
                  </button>
                </div>
              </div>
            )}

            {/* Upgrade Pricing */}
            {reportTier === 'free' && (
              <div className="bg-white border-2 border-[#00a0af] rounded-xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                  <div className="text-5xl mb-4">🎓</div>
                  <h2 className="text-3xl font-bold text-[#003057] mb-3">
                    Want Complete Clinical Analysis?
                  </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  
                  {/* $9.99 */}
                  <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 hover:border-[#00a0af] transition">
                    <div className="text-center mb-4">
                      <div className="text-3xl font-bold text-[#003057]">$9.99</div>
                      <div className="text-sm text-gray-600">One-Time</div>
                    </div>
                    <ul className="text-sm space-y-2 mb-6">
                      <li>✓ Complete clinical analysis</li>
                      <li>✓ All markers explained</li>
                      <li>✓ Breed-specific risks</li>
                      <li>✓ Ask 3 questions</li>
                    </ul>
                    <a
                      href={STRIPE_LINKS.tier1}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-[#00a0af] hover:bg-[#008a97] text-white text-center py-3 rounded-lg font-semibold transition"
                    >
                      Get Analysis
                    </a>
                  </div>

                  {/* $19.99 */}
                  <div className="bg-white rounded-xl p-6 shadow-2xl border-4 border-[#003057] transform scale-105">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#ff6b6b] text-white px-6 py-2 rounded-full text-sm font-bold">
                      ⭐ BEST VALUE
                    </div>
                    <div className="text-center mb-4 mt-2">
                      <div className="text-3xl font-bold text-[#003057]">$19.99</div>
                      <div className="text-sm text-gray-600">One-Time</div>
                    </div>
                    <ul className="text-sm space-y-2 mb-6">
                      <li>✓ Everything in $9.99</li>
                      <li>✓ <strong>3 doctor perspectives</strong></li>
                      <li>✓ <strong>Diet & nutrition plan</strong></li>
                      <li>✓ Visual health checklist</li>
                    </ul>
                    <a
                      href={STRIPE_LINKS.tier2}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-[#003057] hover:bg-[#00446b] text-white text-center py-3 rounded-lg font-semibold transition"
                    >
                      Get Complete Report
                    </a>
                  </div>

                  {/* $29.99/mo */}
                  <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-xl p-6 shadow-lg border-2 border-[#00a0af]">
                    <div className="text-center mb-4">
                      <div className="text-3xl font-bold text-[#003057]">$29.99</div>
                      <div className="text-sm text-gray-600">Per Month</div>
                    </div>
                    <ul className="text-sm space-y-2 mb-6">
                      <li>✓ Everything in $19.99</li>
                      <li>✓ <strong>UNLIMITED reports</strong></li>
                      <li>✓ <strong>UNLIMITED questions</strong></li>
                      <li>✓ Track over time</li>
                    </ul>
                    <a
                      href={STRIPE_LINKS.subscription}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-[#00a0af] hover:bg-[#008a97] text-white text-center py-3 rounded-lg font-semibold transition"
                    >
                      Subscribe
                    </a>
                  </div>

                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#003057] to-[#00446b] text-white mt-16 py-10">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <span className="text-4xl mr-3">🔬🎓🐾</span>
            <div>
              <p className="text-2xl font-bold">PetLabAI</p>
              <p className="text-sm text-cyan-200">Pet Health University</p>
            </div>
          </div>
          <p className="text-sm text-cyan-300 mb-4">
            © 2025 Content Crew LLC. All rights reserved.
          </p>
          <p className="text-xs text-cyan-300">
            Educational content only. Not a substitute for veterinary care.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
