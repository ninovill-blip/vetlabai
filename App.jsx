import React, { useState } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle, Clock, Sparkles, Download, ChevronDown, ChevronUp } from 'lucide-react';

// ============================================================================
// CONTEXT DATA - Embedded knowledge base
// ============================================================================

const SYSTEM_PROMPT = `You are VetLabAI, a specialized integrative veterinary diagnostic assistant designed to interpret blood test results for dogs and cats using evidence-based pattern analysis. You provide clear, actionable insights that help pet owners understand their companion's health while emphasizing the importance of veterinary consultation.

## Core Operating Principles

### SAFETY FIRST
- ALWAYS emphasize that you provide educational information, not veterinary diagnosis
- NEVER suggest delaying veterinary care for abnormal values
- Clearly flag any critical/emergency values requiring immediate veterinary attention
- Recommend follow-up testing when indicated

### ACCURACY & VALIDATION
- Use only veterinary-validated reference ranges AND optimal wellness ranges
- Account for breed-specific variations
- Consider age, sex, and neuter status in interpretation
- Cross-reference multiple biomarkers for holistic pattern recognition
- Apply Integrative Veterinary Medicine principles (whole-body assessment)

### HOLISTIC PATTERN ANALYSIS™
- Identify underlying patterns, not just isolated abnormalities
- Recognize these core patterns:
  * Insufficiency Pattern (deficiency/weakness)
  * Accumulation Pattern (excess/stagnation)
  * Inflammation Pattern (heat/hyperactivity)
  * Hypo-metabolic Pattern (cold/underactivity)
  * Mixed Patterns (combination states)
- Connect symptoms across organ systems
- Identify root causes, not just symptoms

### CLARITY & EMPATHY
- Use plain language, not medical jargon (or explain jargon when necessary)
- Acknowledge pet owner emotions and concerns
- Provide context for why each test matters
- Use analogies and examples that resonate with pet owners

### ACTIONABLE INSIGHTS
- Provide specific, practical next steps
- Recommend species-appropriate nutritional modifications when indicated
- Suggest questions to ask the veterinarian
- Explain what to monitor at home
- Include timeline for retest/follow-up

## Output Structure

Provide your analysis in this structure:

### SUMMARY
- Overall health status (Excellent, Good, Fair, Concerning, Critical)
- Number of values outside optimal range
- Pattern diagnosis (if applicable)
- Top 3 most significant findings
- Urgency level (Routine, Soon, Urgent, Emergency)

### DETAILED ANALYSIS
Organize by organ system with pattern context:
- Red Blood Cells (anemia, polycythemia) - Foundation System
- White Blood Cells (infection, inflammation) - Immunity System
- Platelets (clotting ability)
- Liver Function (ALT, ALP, etc.) - Detox & Regulation System
- Kidney Function (BUN, Creatinine, SDMA) - Filtration System
- Pancreas & Metabolism - Digestion System
- Other Systems as needed

### BREED-SPECIFIC NOTES
Note any breed predispositions relevant to findings.

### HOLISTIC RECOMMENDATIONS
Based on pattern analysis:
- Nutritional medicine approach (species-appropriate)
- Lifestyle modifications
- Environmental factors
- Stress reduction (if relevant)
- Root cause support

### QUESTIONS FOR YOUR VETERINARIAN
Generate 3-5 specific, informed questions.

### TIMELINE
When to follow up (same day, within week, 2-4 weeks, routine visit)
When to retest specific markers

## Tone Guidelines

For Normal Results:
"Great news! [Pet name]'s kidney function markers are right where we want to see them - within optimal wellness ranges."

For Mild Abnormalities:
"[Pet name]'s ALT is slightly elevated. This pattern suggests liver stress. Let's discuss dietary support and monitoring with your vet."

For Significant Abnormalities:
"[Pet name]'s creatinine is elevated, indicating a Filtration System (kidney) pattern. This warrants a conversation with your veterinarian within the next few days to assess kidney function and begin supportive care."

For Critical Values:
"⚠️ IMPORTANT: [Pet name]'s glucose is critically low. This requires immediate veterinary attention today."

Always end with:
"IMPORTANT DISCLAIMER: This analysis is for educational purposes only and does not constitute veterinary medical advice. VetLabAI synthesizes integrative veterinary methodologies to help you understand your pet's health patterns. All interpretations should be discussed with your veterinarian, who can provide proper diagnosis and treatment."`;

const CANINE_RANGES = `# Canine Reference Ranges

## Complete Blood Count (CBC)
- RBC: 5.5-8.5 (10^6/μL) | Optimal: 6.5-7.8
- Hemoglobin: 12.0-18.0 g/dL | Optimal: 15-17
- Hematocrit: 37-55% | Optimal: 45-52%
- WBC: 6.0-17.0 (10^3/μL) | Optimal: 7-12
- Neutrophils: 3.0-11.5 (10^3/μL) | Optimal: 4-8
- Lymphocytes: 1.0-4.8 (10^3/μL) | Optimal: 2-3.5
- Eosinophils: 0.1-1.5 (10^3/μL) | Optimal: <0.75
- Platelets: 200-500 (10^3/μL) | Optimal: 250-450

## Chemistry Panel
- ALT: 10-100 U/L | Optimal: 15-60
- ALP: 20-150 U/L (young dogs can be 20-500) | Optimal: 20-100
- AST: 15-66 U/L | Optimal: 20-50
- BUN: 7-27 mg/dL | Optimal: 10-25
- Creatinine: 0.5-1.8 mg/dL | Optimal: 0.5-1.5
- SDMA: 0-14 μg/dL (early kidney marker) | Optimal: <10
- Glucose: 74-143 mg/dL | Optimal: 80-110
- Cholesterol: 110-320 mg/dL | Optimal: 150-270
- Total Protein: 5.2-8.2 g/dL | Optimal: 6-7.5
- Albumin: 2.3-4.0 g/dL | Optimal: 3-3.8
- Globulin: 2.5-4.5 g/dL | Optimal: 2.8-4.2

## Thyroid
- T4: 1.0-4.0 μg/dL | Optimal: 2.0-3.5
- Free T4: 0.7-2.6 ng/dL | Optimal: 1.2-2.0
- TSH: 0.0-0.6 ng/mL | Optimal: <0.4

## Electrolytes
- Sodium: 144-160 mEq/L | Optimal: 145-155
- Potassium: 3.5-5.8 mEq/L | Optimal: 4-5
- Chloride: 109-122 mEq/L | Optimal: 110-118
- Na/K Ratio: 27-40 | Optimal: 30-35 (ratio <27 suspicious for Addison's disease)

## Breed-Specific Variations

### Greyhounds/Sighthounds (CRITICAL)
- RBC: 7.4-9.0 (higher than other dogs)
- Hemoglobin: 17-20 g/dL (higher)
- Hematocrit: 50-65% (higher)
- Platelets: 80-200K (LOWER than other dogs - this is NORMAL for them)
- T4: Up to 5.0 μg/dL (higher)
NOTE: DO NOT diagnose anemia/thrombocytopenia based on standard ranges!

### Common Breed Predispositions
- Labrador Retriever: Foundation System weakness (hypothyroidism), metabolic accumulation (obesity)
- Golden Retriever: Foundation System weakness (hypothyroidism) - VERY common
- Miniature Schnauzer: Digestive inflammation (pancreatitis), metabolic accumulation (hyperlipidemia, diabetes)
- Standard Poodle: Metabolic foundation deficiency (Addison's disease - watch Na/K ratio)
- German Shepherd: Digestive insufficiency (EPI), clotting disorders
- Dachshund: Metabolic inflammation (diabetes, pancreatitis)
- Cocker Spaniel: Foundation System weakness (hypothyroidism), immune dysregulation

## Critical Values (Immediate Vet Attention)
- HCT <20% (severe anemia)
- Platelets <50,000 (bleeding risk)
- Glucose <60 or >300 mg/dL
- Creatinine >5.0 mg/dL
- Potassium <2.5 or >7.0 mEq/L
- Na/K ratio <23 (Addison's disease emergency)
- ALT >500 U/L (severe liver damage)`;

const BREED_KNOWLEDGE = `# Breed-Specific Notes

When interpreting results, consider these breed predispositions using integrative pattern analysis:

## High-Risk Foundation System Weakness (Hypothyroidism)
Golden Retriever, Labrador Retriever, Doberman, Cocker Spaniel, Boxer
Recommend annual T4/Free T4/TSH screening age 4+
Pattern: Hypo-metabolic with energy deficiency

## Greyhound/Sighthound Special Normals
RBC 7.4-9.0, Hgb 17-20, HCT 50-65%, Platelets 80-200K, T4 up to 5.0
NEVER diagnose polycythemia or thrombocytopenia based on standard ranges!
This is their optimal physiology for running.

## Metabolic Foundation Deficiency Risk (Addison's Disease)
Standard Poodle, Portuguese Water Dog, Nova Scotia Duck Tolling Retriever
Watch for Na/K ratio <27
Pattern: Electrolyte imbalance with weakness

## Digestive Inflammation Pattern (Pancreatitis Prone)
Miniature Schnauzer (VERY common), Yorkshire Terrier, Cocker Spaniel, Dachshund
Recommend Spec cPL test if vomiting/abdominal pain
Pattern: Digestive heat with fat accumulation

## Metabolic Inflammation Risk (Diabetes)
Miniature Poodle, Dachshund, Miniature Schnauzer, Beagle
Monitor glucose age 6+
Pattern: Metabolic dysfunction with glucose accumulation`;

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
      const contextData = `
# Pet Information
Name: ${petData.name}
Species: ${petData.species}
Breed: ${petData.breed}
Age: ${petData.age} years
Sex: ${petData.sex} (${petData.neuterStatus})
Weight: ${petData.weight} lbs
Owner Concerns: ${petData.concerns || 'None specified'}

# Laboratory Results
${labResults}

# Reference Ranges
${petData.species === 'dog' ? CANINE_RANGES : 'Feline ranges not yet implemented'}

# Breed-Specific Knowledge
${BREED_KNOWLEDGE}
`;

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 4000,
          messages: [
            {
              role: 'user',
              content: `${SYSTEM_PROMPT}\n\n${contextData}\n\nPlease analyze this blood work using integrative veterinary pattern analysis principles. Provide comprehensive interpretation with holistic recommendations.`
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const analysisText = data.content[0].text;

      setAnalysis(analysisText);
      setStep('results');
    } catch (err) {
      console.error('Analysis error:', err);
      setError('Failed to analyze blood work. Please check your API key and try again.');
      setStep('form');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep('form');
    setPetData({
      name: '',
      species: 'dog',
      breed: '',
      age: '',
      sex: 'male',
      neuterStatus: 'neutered',
      weight: '',
      concerns: ''
    });
    setLabResults('');
    setAnalysis(null);
    setError(null);
  };

  const exportToPDF = () => {
    const printContent = `
      <html>
        <head>
          <title>VetLabAI Report - ${petData.name}</title>
          <style>
            body { font-family: Georgia, serif; max-width: 800px; margin: 40px auto; padding: 20px; }
            h1 { color: #059669; }
            .header { border-bottom: 3px solid #059669; padding-bottom: 20px; margin-bottom: 30px; }
            .info { background: #f0fdf4; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
            .disclaimer { background: #fef3c7; padding: 15px; border-radius: 8px; margin-top: 30px; font-size: 14px; }
            pre { white-space: pre-wrap; line-height: 1.6; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🐾 VetLabAI Analysis Report</h1>
            <p><strong>Generated:</strong> ${new Date().toLocaleDateString()}</p>
          </div>
          
          <div class="info">
            <h2>Pet Information</h2>
            <p><strong>Name:</strong> ${petData.name}</p>
            <p><strong>Breed:</strong> ${petData.breed}</p>
            <p><strong>Age:</strong> ${petData.age} years</p>
            <p><strong>Sex:</strong> ${petData.sex} (${petData.neuterStatus})</p>
            <p><strong>Weight:</strong> ${petData.weight} lbs</p>
            ${petData.concerns ? `<p><strong>Concerns:</strong> ${petData.concerns}</p>` : ''}
          </div>

          <div class="analysis">
            <h2>Integrative Analysis</h2>
            <pre>${analysis}</pre>
          </div>

          <div class="disclaimer">
            <strong>⚠️ IMPORTANT DISCLAIMER</strong><br>
            This report is for educational purposes only and does not constitute veterinary medical advice, diagnosis, or treatment. 
            VetLabAI uses integrative veterinary methodologies to help you understand your pet's health patterns. 
            All interpretations should be discussed with your veterinarian, who can provide proper diagnosis and treatment based on 
            complete medical history and physical examination.<br><br>
            <strong>Generated by VetLabAI</strong> - Evidence-Based Integrative Veterinary Analysis<br>
            © ${new Date().getFullYear()} Baiopet™ - Content Crew LLC. All rights reserved.
          </div>
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-emerald-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-blue-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent" style={{fontFamily: 'Georgia, serif'}}>
                VetLabAI
              </h1>
              <p className="text-xs text-gray-600">Integrative Blood Work Analysis</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-800">Baiopet™</p>
            <p className="text-xs text-gray-500">Evidence-Based Pet Health</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section */}
        {step === 'form' && (
          <div className="text-center mb-12 space-y-4 animate-fadeIn">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight" style={{fontFamily: 'Georgia, serif'}}>
              Understand Your Pet's <br />
              <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Blood Work Patterns
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Integrative veterinary analysis in seconds. Get comprehensive pattern-based interpretation 
              with species-appropriate recommendations.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Evidence-Based</span>
              <span className="text-gray-300">•</span>
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Holistic Pattern Analysis™</span>
              <span className="text-gray-300">•</span>
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Breed-Specific</span>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-6 flex items-start gap-3 animate-fadeIn">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-red-900 mb-1">Error</h4>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Form Step */}
        {step === 'form' && (
          <div className="space-y-8">
            {/* Pet Information */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-emerald-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2" style={{fontFamily: 'Georgia, serif'}}>
                <FileText className="w-6 h-6 text-emerald-600" />
                Pet Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Pet's Name *
                  </label>
                  <input
                    type="text"
                    value={petData.name}
                    onChange={(e) => setPetData({...petData, name: e.target.value})}
                    placeholder="e.g., Max"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Species *
                  </label>
                  <select
                    value={petData.species}
                    onChange={(e) => setPetData({...petData, species: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  >
                    <option value="dog">Dog</option>
                    <option value="cat">Cat (Coming Soon)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Breed *
                  </label>
                  <input
                    type="text"
                    value={petData.breed}
                    onChange={(e) => setPetData({...petData, breed: e.target.value})}
                    placeholder="e.g., Golden Retriever"
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
                    placeholder="e.g., 5"
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

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Weight (lbs)
                  </label>
                  <input
                    type="number"
                    value={petData.weight}
                    onChange={(e) => setPetData({...petData, weight: e.target.value})}
                    placeholder="e.g., 65"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Any Current Concerns or Symptoms?
                  </label>
                  <textarea
                    value={petData.concerns}
                    onChange={(e) => setPetData({...petData, concerns: e.target.value})}
                    placeholder="e.g., Increased thirst, lethargy, skin issues..."
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
                  />
                </div>
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
                  Enter your pet's blood work values below. Include parameter names, values, and reference ranges for best analysis.
                </p>
                
                <textarea
                  value={labResults}
                  onChange={(e) => setLabResults(e.target.value)}
                  placeholder={`Example format:

RBC: 6.8 (5.5-8.5)
Hemoglobin: 15.2 g/dL (12.0-18.0)
WBC: 9.5 (6.0-17.0)
Neutrophils: 6.2 (3.0-11.5)
ALT: 45 U/L (10-100)
ALP: 75 U/L (20-150)
BUN: 18 mg/dL (7-27)
Creatinine: 1.1 mg/dL (0.5-1.8)
Glucose: 95 mg/dL (74-143)
T4: 2.5 μg/dL (1.0-4.0)`}
                  rows="14"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none font-mono text-sm"
                />

                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                  <p className="text-sm text-emerald-900">
                    <strong>💡 Pro Tip:</strong> Copy values directly from your vet's report. VetLabAI will analyze patterns 
                    across multiple biomarkers using integrative veterinary principles - looking at the whole picture, not just isolated numbers.
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
                  Analyzing Patterns...
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
                <h4 className="font-bold text-gray-900 mb-2">Instant Analysis</h4>
                <p className="text-sm text-gray-600">Pattern-based interpretation in seconds using evidence-based integrative methods</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-100">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Holistic Approach</h4>
                <p className="text-sm text-gray-600">Whole-body pattern recognition with breed-specific insights</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-indigo-100">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-indigo-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Actionable Insights</h4>
                <p className="text-sm text-gray-600">Species-appropriate recommendations and vet discussion points</p>
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
                Applying Holistic Pattern Analysis™ with breed-specific ranges...
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
                    Integrative Analysis Complete
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
              <strong>VetLabAI</strong> provides educational information only using integrative veterinary methodologies. 
              Always consult your veterinarian for medical advice, diagnosis, and treatment.
            </p>
            <div className="border-t border-gray-200 pt-3">
              <p className="text-sm text-gray-700 font-semibold">
                Baiopet™
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Evidence-Based Integrative Pet Health Education
              </p>
              <p className="text-xs text-gray-500">
                © {new Date().getFullYear()} Content Crew LLC. All rights reserved.
              </p>
            </div>
            <p className="text-xs text-gray-400">
              Powered by Advanced AI • Integrative Veterinary Analysis
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
