import React, { useState } from ‘react’;
import { Upload, FileText, AlertCircle, CheckCircle, Clock, Sparkles, Download, CreditCard, Tag } from ‘lucide-react’;

// ============================================================================
// SYSTEM PROMPTS - Keep all your existing prompts
// ============================================================================

const SYSTEM_PROMPT = `You are PetLabAI, a specialized veterinary educational assistant designed to help pet owners understand blood test results for dogs and cats. You provide clear, actionable insights while emphasizing the importance of veterinary consultation.

## Core Operating Principles

### EDUCATIONAL FOCUS

- ALWAYS emphasize that you provide educational information, not veterinary diagnosis
- NEVER suggest delaying veterinary care for abnormal values
- Clearly flag any values requiring immediate veterinary attention
- Frame all insights as tools to help owners have informed conversations with their vet

### ACCURACY & VALIDATION

- Use only veterinary-validated reference ranges
- Account for breed-specific variations
- Consider age, sex, and neuter status in interpretation
- Cross-reference multiple biomarkers for pattern recognition

### CLARITY & EMPATHY

- Use plain language, not medical jargon (or explain jargon when necessary)
- Acknowledge pet owner emotions and concerns
- Provide context for why each test matters
- Use analogies that resonate with pet owners

### ACTIONABLE INSIGHTS

- Provide specific, practical next steps
- Recommend dietary modifications when appropriate
- Suggest questions to ask the veterinarian
- Explain what to monitor at home

## Output Structure

### SUMMARY

- Overall wellness status (Excellent, Good, Fair, Needs Attention, Urgent)
- Number of values outside normal range
- Top 3 most significant findings
- Recommended timeline for vet discussion

### DETAILED ANALYSIS

Organize by organ system:

- Red Blood Cells & Oxygen Transport
- White Blood Cells & Immune Function
- Platelets & Clotting
- Liver Function
- Kidney Function
- Metabolic Markers
- Other relevant systems

### BREED-SPECIFIC NOTES

Note any breed predispositions relevant to findings.

### EDUCATIONAL RECOMMENDATIONS

- Dietary considerations
- Lifestyle modifications
- Home monitoring suggestions
- Questions for your veterinarian

### TIMELINE

When to schedule vet discussion (routine, soon, this week, today)

Always end with educational disclaimer.`;

const CANINE_RANGES = `# Canine Reference Ranges [Your existing ranges - keeping them as is]`;

const BREED_KNOWLEDGE = `# Breed-Specific Knowledge [Your existing breed knowledge - keeping as is]`;

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function PetLabAI() {
// State management
const [step, setStep] = useState(‘input’); // input, analyzing, results, payment
const [selectedTier, setSelectedTier] = useState(‘basic’);
const [promoCode, setPromoCode] = useState(’’);
const [showPayment, setShowPayment] = useState(false);

const [petData, setPetData] = useState({
name: ‘’,
email: ‘’,
species: ‘dog’,
breed: ‘’,
age: ‘’,
weight: ‘’,
sex: ‘male’,
neuterStatus: ‘neutered’,
concerns: ‘’
});

const [labResults, setLabResults] = useState(’’);
const [analysis, setAnalysis] = useState(null);
const [loading, setLoading] = useState(false);

// ============================================================================
// HANDLERS
// ============================================================================

const handleAnalyze = async () => {
if (!labResults.trim() || !petData.name || !petData.email) {
alert(‘Please fill in pet name, email, and blood work results’);
return;
}

```
setLoading(true);
setStep('analyzing');

try {
  const fullPrompt = `${SYSTEM_PROMPT}
```

${petData.species === ‘dog’ ? CANINE_RANGES : ‘’}

Pet Information:

- Name: ${petData.name}
- Breed: ${petData.breed}
- Age: ${petData.age} years
- Weight: ${petData.weight} lbs
- Sex: ${petData.sex}
- Neuter Status: ${petData.neuterStatus}
  ${petData.concerns ? `- Concerns: ${petData.concerns}` : ‘’}

Blood Work Results:
${labResults}

Please provide a comprehensive educational analysis following the structure outlined.`;

```
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY || 'your-api-key',
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: fullPrompt }]
    })
  });

  if (!response.ok) throw new Error('Analysis failed');

  const data = await response.json();
  const result = data.content[0].text;
  setAnalysis(result);

  // For FREE tier - send email immediately
  if (selectedTier === 'basic') {
    try {
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userEmail: petData.email,
          petName: petData.name,
          petBreed: petData.breed,
          petAge: petData.age,
          petWeight: petData.weight,
          petSex: petData.sex,
          analysis: result,
          tier: 'basic'
        })
      });
    } catch (err) {
      console.error('Email failed:', err);
    }
    setStep('results');
  } else {
    // Paid tiers - show payment option
    setShowPayment(true);
    setStep('results');
  }

} catch (error) {
  console.error('Analysis error:', error);
  alert('Analysis failed. Please try again.');
  setStep('input');
} finally {
  setLoading(false);
}
```

};

const handlePayment = async () => {
try {
const response = await fetch(’/api/create-checkout’, {
method: ‘POST’,
headers: { ‘Content-Type’: ‘application/json’ },
body: JSON.stringify({
tier: selectedTier,
promoCode: promoCode,
petData: petData,
labResults: analysis
})
});

```
  const data = await response.json();

  if (data.free) {
    alert(data.message);
    setShowPayment(false);
  } else if (data.paymentUrl) {
    window.location.href = data.paymentUrl;
  } else if (data.error) {
    alert(data.message || 'Payment failed');
  }
} catch (error) {
  console.error('Payment error:', error);
  alert('Payment processing failed');
}
```

};

const handleReset = () => {
setStep(‘input’);
setAnalysis(null);
setShowPayment(false);
setPromoCode(’’);
};

const exportToPDF = () => {
const content = `PetLabAI Analysis for ${petData.name}\n\n${analysis}`;
const blob = new Blob([content], { type: ‘text/plain’ });
const url = URL.createObjectURL(blob);
const a = document.createElement(‘a’);
a.href = url;
a.download = `${petData.name}_Analysis.txt`;
a.click();
};

// ============================================================================
// RENDER
// ============================================================================

return (
<div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-indigo-50">
{/* Header */}
<header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-50 border-b border-emerald-100">
<div className="max-w-6xl mx-auto px-6 py-4">
<div className="flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-blue-600 rounded-xl flex items-center justify-center">
<Sparkles className="w-6 h-6 text-white" />
</div>
<div>
<h1 className=“text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent” style={{fontFamily: ‘Georgia, serif’}}>
PetLabAI
</h1>
<p className="text-xs text-gray-600">Educational Blood Work Analysis</p>
</div>
</div>
</div>
</div>
</header>

```
  {/* Main Content */}
  <main className="max-w-6xl mx-auto px-6 py-12">

    {/* Input Step */}
    {step === 'input' && (
      <div className="space-y-8 animate-fadeIn">

        {/* Hero Section */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900" style={{fontFamily: 'Georgia, serif'}}>
            Understand Your Pet's Blood Work
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get educational insights powered by AI to help you have more informed conversations with your veterinarian
          </p>
        </div>

        {/* Tier Selection */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-emerald-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center" style={{fontFamily: 'Georgia, serif'}}>
            Choose Your Analysis Package
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* FREE Tier */}
            <div
              onClick={() => setSelectedTier('basic')}
              className={`border-2 rounded-2xl p-6 cursor-pointer transition-all ${selectedTier === 'basic' ? 'border-emerald-600 bg-emerald-50 shadow-lg scale-105' : 'border-gray-200 hover:border-emerald-300'}`}
            >
              <div className="text-center">
                <h4 className="text-lg font-bold text-gray-900 mb-2">Basic</h4>
                <div className="text-3xl font-bold text-emerald-600 mb-2">FREE</div>
                <p className="text-sm text-gray-600 mb-4">Essential insights</p>
                <ul className="text-sm text-gray-600 space-y-2 text-left">
                  <li>✅ Top 3 findings</li>
                  <li>✅ Basic interpretation</li>
                  <li>✅ Email delivery</li>
                </ul>
              </div>
            </div>

            {/* ESSENTIAL Tier */}
            <div
              onClick={() => setSelectedTier('essential')}
              className={`border-2 rounded-2xl p-6 cursor-pointer transition-all ${selectedTier === 'essential' ? 'border-blue-600 bg-blue-50 shadow-lg scale-105' : 'border-gray-200 hover:border-blue-300'}`}
            >
              <div className="text-center">
                <div className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-2">
                  🎉 NEW YEAR SPECIAL
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Essential</h4>
                <div className="mb-2">
                  <span className="text-lg text-gray-400 line-through">$29</span>
                  <span className="text-3xl font-bold text-blue-600 ml-2">$20.26</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">Complete analysis</p>
                <ul className="text-sm text-gray-600 space-y-2 text-left">
                  <li>✅ Full analysis</li>
                  <li>✅ Supplement guide</li>
                  <li>✅ Diet recommendations</li>
                  <li>✅ Vet questions</li>
                </ul>
              </div>
            </div>

            {/* PREMIUM Tier */}
            <div
              onClick={() => setSelectedTier('premium')}
              className={`border-2 rounded-2xl p-6 cursor-pointer transition-all ${selectedTier === 'premium' ? 'border-purple-600 bg-purple-50 shadow-lg scale-105' : 'border-gray-200 hover:border-purple-300'}`}
            >
              <div className="text-center">
                <div className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-2">
                  ⭐ BEST VALUE
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Premium</h4>
                <div className="mb-2">
                  <span className="text-lg text-gray-400 line-through">$99</span>
                  <span className="text-3xl font-bold text-purple-600 ml-2">$62.20</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">Ultimate wellness</p>
                <ul className="text-sm text-gray-600 space-y-2 text-left">
                  <li>✅ Everything in Essential</li>
                  <li>✅ Breed nutrition plan</li>
                  <li>✅ 90-day wellness plan</li>
                  <li>✅ Priority support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Pet Details Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-emerald-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6" style={{fontFamily: 'Georgia, serif'}}>
            Pet Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Pet's Name *
              </label>
              <input
                type="text"
                required
                value={petData.name}
                onChange={(e) => setPetData({...petData, name: e.target.value})}
                placeholder="Max"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Email Address *
              </label>
              <input
                type="email"
                required
                value={petData.email}
                onChange={(e) => setPetData({...petData, email: e.target.value})}
                placeholder="your.email@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
              <p className="text-xs text-gray-500 mt-1">
                📧 We'll email you {petData.name ? petData.name + "'s" : "the"} analysis
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Breed
              </label>
              <input
                type="text"
                value={petData.breed}
                onChange={(e) => setPetData({...petData, breed: e.target.value})}
                placeholder="Golden Retriever"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
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
          </div>

          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Any Concerns? (Optional)
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
          <h3 className="text-2xl font-bold text-gray-900 mb-6" style={{fontFamily: 'Georgia, serif'}}>
            Blood Test Results
          </h3>

          <textarea
            value={labResults}
            onChange={(e) => setLabResults(e.target.value)}
            placeholder={`Enter blood work values:
```

RBC: 6.8 (5.5-8.5)
Hemoglobin: 15.2 g/dL (12.0-18.0)
WBC: 9.5 (6.0-17.0)
ALT: 45 U/L (10-100)
BUN: 18 mg/dL (7-27)
Creatinine: 1.1 mg/dL (0.5-1.8)`}
rows=“12”
className=“w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none font-mono text-sm”
/>

```
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4">
            <p className="text-sm text-blue-900">
              <strong>💡 Tip:</strong> Copy values directly from your vet's report. Include reference ranges for best results.
            </p>
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
              {selectedTier === 'basic' ? 'AI Analyze & Educate Me - FREE' : `Get ${selectedTier === 'essential' ? 'Essential' : 'Premium'} Analysis`}
            </>
          )}
        </button>
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
            Our AI is analyzing the results...
          </p>
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
              Export
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

        {/* Payment Modal */}
        {showPayment && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl shadow-xl p-8 border-2 border-blue-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Complete Your {selectedTier === 'essential' ? 'Essential' : 'Premium'} Package
            </h3>

            <div className="bg-white rounded-2xl p-6 mb-6">
              <div className="text-center mb-4">
                <div className="text-sm text-gray-600 mb-2">
                  {selectedTier === 'essential' ? 'Essential Package' : 'Premium Wellness Package'}
                </div>
                <div className="text-4xl font-bold text-gray-900">
                  ${selectedTier === 'essential' ? '20.26' : '62.20'}
                </div>
                <div className="text-sm text-gray-400 line-through">
                  Was ${selectedTier === 'essential' ? '$29' : '$99'}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Have a promo code?
                </label>
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                  placeholder="Enter code (e.g., NEWYEAR2025)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 mb-4"
                />
                <div className="text-xs text-gray-500 mb-4">
                  💡 Try: NEWYEAR2025, INVESTOR25, PETLABAI2025
                </div>
              </div>

              <button
                onClick={handlePayment}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <CreditCard className="w-5 h-5" />
                {promoCode ? 'Apply Code & Continue' : 'Proceed to Payment'}
              </button>
            </div>
          </div>
        )}

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
          <strong>⚠️ Educational Disclaimer:</strong> PetLabAI provides educational
          information only and does not diagnose, treat, or prescribe. Always consult
          your licensed veterinarian before making health decisions for your pet.
        </p>
        <div className="border-t border-gray-200 pt-3">
          <p className="text-sm text-gray-700 font-semibold">
            PetLabAI
          </p>
          <p className="text-xs text-gray-500 mt-1">
            © {new Date().getFullYear()} Content Crew LLC. All rights reserved.
          </p>
        </div>
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
```

);
}

