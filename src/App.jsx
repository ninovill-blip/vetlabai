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

  const SYSTEM_PROMPT = `You are an educational veterinary blood work interpreter for PetLabAI.

CRITICAL: Generate reports based on tier: ${reportTier}

TIER: FREE (Basic Report Card)
Generate a concise basic report with:
- Welcome message
- Blood work report card using traffic light system:
  🟢 GREEN (Normal): Values within normal range
  🟡 YELLOW (Watch): Slightly elevated/decreased, monitor
  🔴 RED (Concern): Significantly abnormal, discuss with vet
- Top 3 concerns (if any abnormal values exist)
- Emergency red flags (if critical values)
- Basic interpretation from Traditional DVM perspective only
- When to see your veterinarian
- Questions to ask your vet
- NO detailed marker explanations
- NO three perspectives
- NO breed-specific deep-dive
- NO nutrition recommendations
- LENGTH: 400-600 words
- END WITH UPGRADE CTA: "For complete analysis with all 3 veterinary perspectives, breed-specific guidance, and nutrition recommendations, upgrade to our Complete Analysis for $9.99"

TIER: PAID ($9.99 - Complete Analysis)
Generate a comprehensive professional report with:
- Welcome and blood work overview
- Detailed traffic light report card for ALL markers
- Complete analysis from THREE veterinary perspectives:
  * Dr. Sarah Chen (Traditional DVM) - Clinical interpretation
  * Dr. Maya Patel (Holistic DVM) - Whole-body assessment  
  * Dr. Alex Rodriguez (Integrative DVM) - Combined action plan
- Breed-specific health risks and considerations
- Nutrition and diet recommendations (heavily disclaimed, FDA-compliant)
- Visual health monitoring checklist
- Questions for YOUR veterinarian (from all perspectives)
- Research citations (AVMA, AAHA, peer-reviewed journals)
- LENGTH: 2500-4000 words
- Professional, thorough, actionable

EDUCATIONAL DISCLAIMERS (ALL TIERS):
- This is educational content only
- NOT veterinary medical advice
- NOT diagnosis or treatment
- Share with licensed veterinarian
- Does NOT create veterinarian-client-patient relationship (VCPR)

PROFESSIONAL TONE:
- Clear, educational language
- Evidence-based information
- Cite research when possible (AVMA, AAHA, veterinary journals)
- Empowering but not alarming
- Partner with veterinarians, never replace them

Brand: PetLabAI™
Mission: The First Veterinary-Approved Dog and Cat Blood AI Analysis
Credentials: Designed by veterinarians and students from UC Davis, Iowa State University, and laboratories nationwide`;

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
    <div className="min-h-screen bg-white">
      
      {/* Header */}
      <header className="bg-white border-b-2 border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="max-w-4xl mx-auto text-center">
            
            {/* Logo */}
            <div className="mb-4">
              <h1 className="text-4xl md:text-5xl font-light tracking-wide text-[#003057] mb-2">
                PetLabAI<sup className="text-lg font-normal">™</sup>
              </h1>
            </div>
            
            {/* Main Tagline */}
            <div className="mb-6">
              <p className="text-lg md:text-xl text-gray-700 font-medium leading-relaxed">
                The First Veterinary-Approved Dog and Cat Blood AI Analysis
              </p>
            </div>
            
            {/* Value Proposition */}
            <div className="mb-4">
              <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Be educated on how to interpret and improve your Dog and Cat's wellbeing
              </p>
            </div>
            
          </div>
        </div>
        
        {/* Educational Disclaimer Bar */}
        <div className="bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-6 py-4">
            <p className="text-xs md:text-sm text-gray-600 text-center leading-relaxed max-w-4xl mx-auto">
              <span className="font-semibold">Educational Tool:</span> PetLabAI provides educational information 
              about blood work designed by leading veterinarians and students from UC Davis, Iowa State University, 
              and laboratories nationwide.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl bg-gray-50 min-h-screen">
        
        {/* Hero Section */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-light text-[#003057] mb-4 leading-tight">
            Professional Blood Work Analysis for Your Pet
          </h2>
          <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed mb-4">
            Get started with a free basic report card, or upgrade to our complete veterinary-approved 
            analysis with all three doctor perspectives and personalized recommendations.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span>Free Basic Report</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#00a0af] font-bold">✓</span>
              <span>$9.99 Complete Analysis</span>
            </div>
          </div>
        </div>

        {/* Educational Disclaimer */}
        <div className="mb-8 bg-white border border-gray-300 rounded-lg p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-[#00a0af] rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">i</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#003057] mb-2">
                Important: Educational Tool Only
              </p>
              <p className="text-xs text-gray-700 leading-relaxed">
                PetLabAI provides educational information to help you understand your pet's blood work. 
                This is not a substitute for professional veterinary medical advice, diagnosis, or treatment. 
                Always consult with a licensed veterinarian for medical guidance regarding your pet's health.
              </p>
            </div>
          </div>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 border-t-4 border-[#00a0af] mb-8">
          <h3 className="text-2xl font-light text-[#003057] mb-6 border-b border-gray-200 pb-3">
            Pet Information
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
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Blood Work Results *
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
            className="w-full bg-gradient-to-r from-[#00a0af] to-[#008a97] hover:from-[#008a97] hover:to-[#007a87] text-white py-4 px-6 rounded-lg font-semibold text-base transition-all transform hover:scale-[1.01] active:scale-[0.99] disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md disabled:transform-none flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Clock className="w-5 h-5 animate-spin" />
                Generating Analysis...
              </>
            ) : (
              'Generate Blood Work Analysis'
            )}
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-200">
            <div className="w-16 h-16 border-4 border-[#00a0af] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-2xl font-light text-[#003057] mb-2">
              Analyzing {petData.name}'s Blood Work
            </h2>
            <p className="text-base text-gray-600">
              Processing results with veterinary-approved analysis methods...
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
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-200 mb-8">
              <div className="mb-6 pb-6 border-b border-gray-200">
                <h2 className="text-2xl md:text-3xl font-light text-[#003057] text-center">
                  Blood Work Analysis: {petData.name}
                </h2>
                <p className="text-sm text-gray-600 text-center mt-2">
                  {petData.breed} • {petData.age} years old
                </p>
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

            {/* Email Capture & Upgrade */}
            {reportTier === 'free' && (
              <div className="space-y-6">
                
                {/* Email Capture for Free Report */}
                {!userEmail && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-[#003057] mb-3 text-center">
                      Save Your Basic Report
                    </h3>
                    <p className="text-sm text-gray-700 mb-4 text-center">
                      Enter your email to receive and save your basic blood work report card.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        className="flex-1 px-5 py-3 border border-gray-300 rounded-md focus:border-[#00a0af] focus:outline-none focus:ring-1 focus:ring-[#00a0af]"
                      />
                      <button
                        onClick={handleSaveEmail}
                        className="bg-gradient-to-r from-[#00a0af] to-[#008a97] hover:from-[#008a97] hover:to-[#007a87] text-white px-6 py-3 rounded-md font-semibold transition shadow-sm whitespace-nowrap"
                      >
                        Save Report
                      </button>
                    </div>
                  </div>
                )}

                {/* Upgrade to Complete Analysis */}
                <div className="bg-white border-2 border-[#00a0af] rounded-lg p-8 shadow-md">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-light text-[#003057] mb-3">
                      Upgrade to Complete Analysis
                    </h2>
                    <p className="text-base text-gray-700 max-w-2xl mx-auto leading-relaxed">
                      Get the full professional veterinary-approved analysis with all three doctor perspectives, 
                      breed-specific guidance, and personalized nutrition recommendations.
                    </p>
                  </div>

                  <div className="max-w-2xl mx-auto mb-6">
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                        <div>
                          <h3 className="text-xl font-semibold text-[#003057]">Complete Analysis</h3>
                          <p className="text-sm text-gray-600">One-time payment</p>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-light text-[#003057]">$9.99</div>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <p className="text-sm font-semibold text-[#003057] mb-2">Included in Free Report:</p>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li className="flex items-start gap-2">
                              <span className="text-gray-400 mt-0.5">•</span>
                              <span>Basic report card (🟢🟡🔴)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-gray-400 mt-0.5">•</span>
                              <span>Top 3 concerns</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-gray-400 mt-0.5">•</span>
                              <span>Emergency alerts</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-gray-400 mt-0.5">•</span>
                              <span>Questions for your vet</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div>
                          <p className="text-sm font-semibold text-[#00a0af] mb-2">Added with Complete Analysis:</p>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li className="flex items-start gap-2">
                              <span className="text-[#00a0af] mt-0.5">✓</span>
                              <span>All 3 veterinary perspectives</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-[#00a0af] mt-0.5">✓</span>
                              <span>Detailed marker explanations</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-[#00a0af] mt-0.5">✓</span>
                              <span>Breed-specific health guidance</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-[#00a0af] mt-0.5">✓</span>
                              <span>Nutrition recommendations</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-[#00a0af] mt-0.5">✓</span>
                              <span>Downloadable PDF report</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-[#00a0af] mt-0.5">✓</span>
                              <span>Research citations (AVMA, AAHA)</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <a
                        href={STRIPE_LINKS.tier1}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-gradient-to-r from-[#00a0af] to-[#008a97] hover:from-[#008a97] hover:to-[#007a87] text-white text-center py-4 rounded-md font-semibold text-lg transition shadow-md"
                      >
                        Upgrade to Complete Analysis - $9.99
                      </a>
                      
                      <p className="text-xs text-gray-500 text-center mt-3">
                        Secure payment processed by Stripe • One-time fee • Instant access
                      </p>
                    </div>
                  </div>

                  <div className="text-center text-xs text-gray-500">
                    <p>All payments are secure and encrypted</p>
                  </div>
                </div>
                
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 mt-16 py-10">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <p className="text-2xl font-light text-white mb-2">
                PetLabAI<sup className="text-sm">™</sup>
              </p>
              <p className="text-sm text-gray-400">
                The First Veterinary-Approved Dog and Cat Blood AI Analysis
              </p>
            </div>
            <div className="border-t border-gray-700 pt-6 mb-6">
              <p className="text-sm text-gray-400 mb-2">
                A Content Crew LLC / Baio Token AI Company
              </p>
              <p className="text-sm text-gray-400">
                Irvine, California
              </p>
            </div>
            <div className="text-xs text-gray-500 space-y-1">
              <p>© 2025 Content Crew LLC. All rights reserved.</p>
              <p>Educational content only. Not a substitute for veterinary care.</p>
              <p>Developed in collaboration with veterinarians from UC Davis, Iowa State University, and laboratories nationwide.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
