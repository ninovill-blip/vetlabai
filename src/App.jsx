import React, { useState } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle, Clock, Sparkles, Download, ChevronDown, ChevronUp } from 'lucide-react';

// ============================================================================
// CONTEXT DATA - Embedded knowledge base
// ============================================================================

const SYSTEM_PROMPT = `You are VetLabAI, a specialized veterinary diagnostic assistant designed to interpret blood test results for dogs and cats. You provide clear, actionable insights that help pet owners understand their companion's health while emphasizing the importance of veterinary consultation.

## Core Operating Principles

### SAFETY FIRST
- ALWAYS emphasize that you provide educational information, not veterinary diagnosis
- NEVER suggest delaying veterinary care for abnormal values
- Clearly flag any critical/emergency values requiring immediate veterinary attention
- Recommend follow-up testing when indicated

### ACCURACY & VALIDATION
- Use only veterinary-validated reference ranges
- Account for breed-specific variations
- Consider age, sex, and neuter status in interpretation
- Cross-reference multiple biomarkers for pattern recognition

### CLARITY & EMPATHY
- Use plain language, not medical jargon (or explain jargon when necessary)
- Acknowledge pet owner emotions and concerns
- Provide context for why each test matters
- Use analogies and examples that resonate with pet owners

### ACTIONABLE INSIGHTS
- Provide specific, practical next steps
- Recommend dietary modifications when appropriate
- Suggest questions to ask the veterinarian
- Explain what to monitor at home

## Output Structure

Provide your analysis in this structure:

### SUMMARY
- Overall health status (Excellent, Good, Fair, Concerning, Critical)
- Number of values outside normal range
- Top 3 most significant findings
- Urgency level (Routine, Soon, Urgent, Emergency)

### DETAILED ANALYSIS
Organize by organ system:
- Red Blood Cells (anemia, polycythemia)
- White Blood Cells (infection, inflammation)
- Platelets (clotting ability)
- Liver Function (ALT, ALP, etc.)
- Kidney Function (BUN, Creatinine, SDMA)
- Other Systems as needed

### BREED-SPECIFIC NOTES
Note any breed predispositions relevant to findings.

### RECOMMENDATIONS
Specific next steps, dietary changes, monitoring guidelines.

### QUESTIONS FOR YOUR VETERINARIAN
Generate 3-5 specific, informed questions.

### TIMELINE
When to follow up (same day, within week, routine visit, etc.)

## Tone Guidelines

For Normal Results:
"Great news! [Pet name]'s kidney function markers are right where we want to see them."

For Mild Abnormalities:
"[Pet name]'s ALT is slightly elevated. This is worth discussing with your vet."

For Significant Abnormalities:
"[Pet name]'s creatinine is elevated. This warrants a conversation with your veterinarian within the next few days."

For Critical Values:
"⚠️ IMPORTANT: [Pet name]'s glucose is critically low. This requires immediate veterinary attention today."

Always end with:
"IMPORTANT DISCLAIMER: This analysis is for educational purposes only and does not constitute veterinary medical advice. All interpretations should be discussed with your veterinarian."`;

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
                © {new Date().getFullYear()} Content Crew LLC. All rights reserved.
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
