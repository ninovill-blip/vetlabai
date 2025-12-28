import React, { useState, useRef } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle, Sparkles, Download, Mic, Camera, FileUp, X, ChevronRight, Zap, Shield, Globe, Gift, Award, Heart, Lock, Share2 } from 'lucide-react';

// ============================================================================
// VETLABAI COMPLETE VIRAL SYSTEM
// First-Mover Global Platform with Multi-Modal Analysis + Viral Unlock
// Master Prompt V3.0 | "Because Our Pets Cannot Speak"
// ============================================================================

const MASTER_PROMPT = `You are VetLabAI, an advanced integrative pet health intelligence platform designed to solve a critical problem: **Our pets cannot speak, yet their health depends entirely on how well we—their guardians—understand their bodies.**

## THE FUNDAMENTAL PROBLEM

Dogs and cats cannot tell us "My kidney function feels off" or "I'm experiencing early liver stress." They depend completely on us—good, caring pet parents—to **know better**, to **see the patterns**, and to **act early** before small imbalances become serious diseases.

Traditional veterinary practice creates a critical knowledge gap where pet parents receive numbers without context, vets have limited time, recommendations vary wildly, and small imbalances progress to disease before anyone notices.

## VETLABAI SOLUTION

**Mission:** Empower pet parents to become the informed health advocates their pets desperately need through comprehensive, integrative analysis delivered instantly, clearly, and actionably.

**Core Philosophy:** We synthesize the best of ALL veterinary paradigms:
- **Conventional Medicine**: Diagnostic precision, emergency protocols
- **Holistic Medicine**: Whole-body pattern recognition, root cause analysis  
- **Functional Medicine**: Optimal ranges, early intervention, wellness optimization

## YOUR CAPABILITIES

You analyze multi-modal health data (blood work + photos + voice + history) to provide:

1. **COMPREHENSIVE PATTERN DIAGNOSIS** using Holistic Pattern Analysis™
2. **CLEAR EXPLANATIONS** in plain language
3. **ACTIONABLE RECOMMENDATIONS** grounded in evidence
4. **URGENCY ASSESSMENT** so parents know when to act
5. **VET DISCUSSION GUIDE** for productive conversations

## HOLISTIC PATTERN ANALYSIS™ METHODOLOGY

Identify ROOT CAUSES through 5 fundamental imbalance patterns:

**PATTERN 1: INSUFFICIENCY** (Deficiency/Weakness)
- Blood: Low RBC, low albumin, low protein, decreased function
- Physical: Fatigue, weakness, pale gums, poor coat, weight loss
- Systems: Foundation (thyroid/adrenal), Immunity, Circulation
- Intervention: Build, nourish, support, restore

**PATTERN 2: ACCUMULATION** (Excess/Stagnation)
- Blood: High cholesterol, elevated liver enzymes, increased WBC, high BUN
- Physical: Weight gain, sluggishness, thick discharge, fluid retention
- Systems: Detox (liver), Filtration (kidneys), Digestion
- Intervention: Clear, drain, mobilize, eliminate

**PATTERN 3: INFLAMMATION** (Heat/Hyperactivity)
- Blood: Elevated WBC with neutrophils, high CRP, increased liver values
- Physical: Red gums, panting, fever, restlessness, skin redness, thirst
- Systems: Immunity, Detox, all tissues
- Intervention: Cool, calm, soothe, anti-inflammatory support

**PATTERN 4: HYPO-METABOLIC** (Cold/Underactivity)
- Blood: Low T4, low energy markers, slow metabolism indicators
- Physical: Lethargy, cold intolerance, slow healing, low appetite
- Systems: Foundation (thyroid/adrenal), Metabolism, Circulation
- Intervention: Activate, energize, warm, stimulate

**PATTERN 5: MIXED/COMPLEX** (Combination States)
- Multiple patterns simultaneously
- Approach: Address in priority order, support whole-body balance

## ORGAN SYSTEM FRAMEWORK

Organize findings by 7 functional systems:
- Foundation System (thyroid/adrenal - energy & regulation)
- Circulation System (RBC - oxygen delivery)
- Immunity System (WBC - defense)
- Detox & Regulation (liver - processing)
- Filtration System (kidneys - elimination)
- Digestion System (pancreas/gut - absorption)
- Clotting System (platelets - hemostasis)

## BREED-SPECIFIC INTELLIGENCE

**Sighthounds (Greyhounds, Whippets):**
- RBC: 7.4-9.0 (vs 5.5-8.5) - HIGHER is NORMAL
- Platelets: 80-200K (vs 200-500K) - LOWER is NORMAL
- T4: Up to 5.0 (vs 1.0-4.0) - HIGHER is NORMAL

**High-Risk Hypothyroidism:** Golden Retriever, Labrador, Doberman
**Addison's Risk:** Standard Poodle, Portuguese Water Dog
**Pancreatitis-Prone:** Miniature Schnauzer, Yorkshire Terrier

## OUTPUT STRUCTURE FOR BASIC RESULTS (FREE)

Provide a concise executive summary:

**1. OVERALL HEALTH STATUS**
[Excellent/Good/Fair/Concerning/Critical]

**2. PRIMARY PATTERN IDENTIFIED**
[Pattern name with confidence level]
Brief explanation in 2-3 sentences a pet parent can understand

**3. TOP 3 KEY FINDINGS**
1. [Most significant finding in plain language]
2. [Second most significant]
3. [Third most significant]

**4. URGENCY LEVEL**
[Routine/Soon/Urgent/Emergency] with timeframe

**5. WHAT THIS MEANS**
2-3 paragraphs explaining the pattern, why it matters, and general direction for addressing it

**6. NEXT STEPS PREVIEW**
Brief mention that detailed protocols, supplement recommendations, dietary strategies, and vet discussion guides are available in the premium analysis

Keep the free analysis valuable but create clear desire for the comprehensive breakdown, specific recommendations, and actionable protocols in the full guides.

## COMMUNICATION PRINCIPLES

- Write like explaining to a smart, caring friend
- Use plain language first, technical terms with explanation
- Acknowledge emotions and empower
- Be specific and explain WHY
- Balance urgency with hope

This is **giving pets a voice through science, wisdom, and compassion.**

*Because our pets cannot speak, we must learn to listen—to their blood, their bodies, and the patterns that reveal their truth.*`;

export default function VetLabAI() {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================
  
  const [step, setStep] = useState('welcome'); // welcome, upload, form, analyzing, basicResults, unlock, complete
  
  const [petData, setPetData] = useState({
    name: '', species: 'dog', breed: '', age: '',
    sex: 'male', neuterStatus: 'neutered', weight: '', concerns: ''
  });
  
  const [uploads, setUploads] = useState({
    bloodWork: null,
    petPhoto: null,
    unlockPhoto: null,
    voiceRecording: null
  });
  
  const [labResults, setLabResults] = useState('');
  const [basicAnalysis, setBasicAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [processingOCR, setProcessingOCR] = useState(false);
  const [voiceRecording, setVoiceRecording] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [recordingTime, setRecordingTime] = useState(0);
  
  // Unlock progress
  const [unlockProgress, setUnlockProgress] = useState({
    photo: false,
    voice: false,
    social: false,
    data: false
  });
  
  const [additionalData, setAdditionalData] = useState({
    diet: '',
    activityLevel: '',
    environment: '',
    otherPets: '',
    topConcern: ''
  });
  
  const fileInputRef = useRef(null);
  const petPhotoRef = useRef(null);
  const unlockPhotoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordingTimerRef = useRef(null);

  // ============================================================================
  // ANALYSIS FLOW - FILE UPLOAD HANDLERS
  // ============================================================================

  const handleFileUpload = async (file, type) => {
    if (!file) return;
    setUploads(prev => ({ ...prev, [type]: file }));

    if (type === 'bloodWork' && (file.type.includes('image') || file.type.includes('pdf'))) {
      await extractBloodWorkValues(file);
    }
  };

  const extractBloodWorkValues = async (file) => {
    setProcessingOCR(true);
    try {
      const base64 = await fileToBase64(file);
      
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 2000,
          messages: [{
            role: 'user',
            content: [
              {
                type: 'image',
                source: { type: 'base64', media_type: file.type, data: base64 }
              },
              {
                type: 'text',
                text: `Extract all blood test values from this veterinary lab report. Format as:

Parameter: Value (Reference Range)

Example:
RBC: 6.8 (5.5-8.5)
WBC: 9.2 (6.0-17.0)

Extract ALL visible values.`
              }
            ]
          }]
        })
      });

      const data = await response.json();
      setLabResults(data.content[0].text);
      
    } catch (err) {
      console.error('OCR error:', err);
      setError('Failed to extract values. Please enter manually.');
    } finally {
      setProcessingOCR(false);
    }
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // ============================================================================
  // VOICE RECORDING (ANALYSIS PHASE)
  // ============================================================================

  const startVoiceRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks = [];
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunks, { type: 'audio/webm' });
        await transcribeAudio(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setVoiceRecording(true);
    } catch (err) {
      console.error('Microphone error:', err);
      setError('Could not access microphone. Please check permissions.');
    }
  };

  const stopVoiceRecording = () => {
    if (mediaRecorderRef.current && voiceRecording) {
      mediaRecorderRef.current.stop();
      setVoiceRecording(false);
    }
  };

  const transcribeAudio = async (audioBlob) => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setVoiceTranscript(transcript);
      setPetData(prev => ({
        ...prev,
        concerns: prev.concerns + (prev.concerns ? ' ' : '') + transcript
      }));
    };

    recognition.start();
  };

  // ============================================================================
  // MAIN ANALYSIS FUNCTION (FREE - BASIC RESULTS)
  // ============================================================================

  const handleAnalyze = async () => {
    if (!petData.name || !petData.breed || !petData.age) {
      setError('Please fill in pet name, breed, and age');
      return;
    }

    if (!labResults && !uploads.bloodWork) {
      setError('Please upload blood work or enter values manually');
      return;
    }

    setLoading(true);
    setError(null);
    setStep('analyzing');

    try {
      const messages = [{
        role: 'user',
        content: []
      }];

      if (uploads.petPhoto) {
        const base64Photo = await fileToBase64(uploads.petPhoto);
        messages[0].content.push({
          type: 'image',
          source: { type: 'base64', media_type: uploads.petPhoto.type, data: base64Photo }
        });
        messages[0].content.push({
          type: 'text',
          text: 'Analyze this pet\'s physical appearance for health indicators.'
        });
      }

      messages[0].content.push({
        type: 'text',
        text: `${MASTER_PROMPT}

# Pet Information
Name: ${petData.name}
Species: ${petData.species}
Breed: ${petData.breed}
Age: ${petData.age} years
Sex: ${petData.sex} (${petData.neuterStatus})
Weight: ${petData.weight} lbs
Owner Concerns: ${petData.concerns || 'None specified'}
${voiceTranscript ? `Voice Recording: ${voiceTranscript}` : ''}

# Blood Work Results
${labResults}

Provide BASIC RESULTS (free preview) as specified in the system prompt. This is the executive summary that creates desire for the complete analysis.`
      });

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 2000,
          messages
        })
      });

      const data = await response.json();
      setBasicAnalysis(data.content[0].text);
      setStep('basicResults');
    } catch (err) {
      console.error('Analysis error:', err);
      setError('Analysis failed. Please check API key and try again.');
      setStep('form');
    } finally {
      setLoading(false);
    }
  };

  // ============================================================================
  // UNLOCK SYSTEM - HANDLERS
  // ============================================================================

  const handleUnlockPhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert("That's not a photo! We need to see that adorable face. 📸");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("Whoa, that's a big file! Try a smaller photo (under 10MB).");
      return;
    }

    setUploads(prev => ({ ...prev, unlockPhoto: file }));
    setUnlockProgress(prev => ({ ...prev, photo: true }));
  };

  const startUnlockVoiceRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks = [];
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunks, { type: 'audio/webm' });
        setUploads(prev => ({ ...prev, voiceRecording: audioBlob }));
        setUnlockProgress(prev => ({ ...prev, voice: true }));
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setVoiceRecording(true);

      let time = 0;
      recordingTimerRef.current = setInterval(() => {
        time++;
        setRecordingTime(time);
        if (time >= 30) stopUnlockVoiceRecording();
      }, 1000);

    } catch (err) {
      alert("Oops! We need microphone access. Check your browser permissions.");
    }
  };

  const stopUnlockVoiceRecording = () => {
    if (mediaRecorderRef.current && voiceRecording) {
      mediaRecorderRef.current.stop();
      setVoiceRecording(false);
      clearInterval(recordingTimerRef.current);
      setRecordingTime(0);
    }
  };

  const generateSocialPost = () => {
    const patternMatch = basicAnalysis?.match(/PATTERN.*?:(.*?)(?:\n|$)/i);
    const pattern = patternMatch ? patternMatch[1].trim() : 'health pattern';
    
    return {
      text: `Meet ${petData.name}! 🐾

We just used VetLabAI to analyze ${petData.name}'s blood work and discovered they have ${pattern.toLowerCase()}.

The best part? The analysis was FREE and took just 2 minutes! 🎉

Now I understand what's going on and have a clear path forward using holistic nutrition and vet collaboration.

If your pet has mysterious symptoms or you just want to understand their health better, try VetLabAI!

#PetLabAIResults #DogHealth #${petData.breed.replace(/\s/g, '')} #HolisticPetCare`,
      
      url: 'https://petlabai.com'
    };
  };

  const shareToSocial = (platform) => {
    const post = generateSocialPost();
    let url = '';
    
    if (platform === 'facebook') {
      url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(post.url)}&quote=${encodeURIComponent(post.text)}`;
    } else if (platform === 'twitter') {
      url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.text)}&url=${encodeURIComponent(post.url)}`;
    } else if (platform === 'instagram') {
      navigator.clipboard.writeText(post.text);
      alert("Caption copied! 📋 Paste it into Instagram with your pet's photo.");
    }
    
    if (url) window.open(url, '_blank', 'width=600,height=400');
    
    setTimeout(() => {
      setUnlockProgress(prev => ({ ...prev, social: true }));
    }, 1000);
  };

  const handleDataSubmit = () => {
    if (!additionalData.diet || !additionalData.activityLevel || 
        !additionalData.environment || !additionalData.otherPets || 
        !additionalData.topConcern) {
      alert("Almost there! Fill in all 5 questions. (Your pet is counting on you! 🐕)");
      return;
    }

    setUnlockProgress(prev => ({ ...prev, data: true }));
  };

  const handleUnlock = () => {
    const completionPercentage = Object.values(unlockProgress).filter(Boolean).length * 25;
    
    if (completionPercentage !== 100) {
      alert("Not quite yet! Complete all 4 steps to unlock your guides.");
      return;
    }

    // In production: Send data to server, generate download tokens, send email
    setStep('complete');
  };

  const handleReset = () => {
    setStep('welcome');
    setPetData({ name: '', species: 'dog', breed: '', age: '', sex: 'male', neuterStatus: 'neutered', weight: '', concerns: '' });
    setUploads({ bloodWork: null, petPhoto: null, unlockPhoto: null, voiceRecording: null });
    setLabResults('');
    setBasicAnalysis(null);
    setVoiceTranscript('');
    setUnlockProgress({ photo: false, voice: false, social: false, data: false });
    setAdditionalData({ diet: '', activityLevel: '', environment: '', otherPets: '', topConcern: '' });
  };

  const completionPercentage = Object.values(unlockProgress).filter(Boolean).length * 25;
  const isFullyUnlocked = completionPercentage === 100;

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-emerald-50 to-blue-50">
      
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-xl border-b border-emerald-100/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent" style={{fontFamily: 'Playfair Display, serif'}}>
                  VetLabAI
                </h1>
                <p className="text-xs text-gray-600 font-medium">Multi-Modal Health Intelligence</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-800">Baiopet™</p>
              <p className="text-xs text-gray-500">Professional Edition</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        
        {/* WELCOME SCREEN */}
        {step === 'welcome' && (
          <div className="text-center space-y-8 animate-fadeIn">
            <div className="space-y-4 max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-semibold">
                <Zap className="w-4 h-4" />
                First-Mover Global Platform
              </div>
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight" style={{fontFamily: 'Playfair Display, serif'}}>
                Your Pet's Voice<br />
                <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Through Science
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Because our pets cannot speak, we give them a voice through comprehensive analysis and Holistic Pattern Analysis™
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
              <div className="bg-white/80 rounded-3xl p-8 border border-emerald-100 hover:shadow-2xl hover:scale-105 transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center mb-4">
                  <Camera className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Photo Upload</h3>
                <p className="text-sm text-gray-600">Instant OCR extraction from blood work reports</p>
              </div>

              <div className="bg-white/80 rounded-3xl p-8 border border-blue-100 hover:shadow-2xl hover:scale-105 transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mb-4">
                  <Mic className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Voice Input</h3>
                <p className="text-sm text-gray-600">Speak symptoms - AI transcribes instantly</p>
              </div>

              <div className="bg-white/80 rounded-3xl p-8 border border-indigo-100 hover:shadow-2xl hover:scale-105 transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-2xl flex items-center justify-center mb-4">
                  <Sparkles className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Pattern Analysis</h3>
                <p className="text-sm text-gray-600">Holistic Pattern Analysis™ reveals root causes</p>
              </div>

              <div className="bg-white/80 rounded-3xl p-8 border border-purple-100 hover:shadow-2xl hover:scale-105 transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Secure & Private</h3>
                <p className="text-sm text-gray-600">Your data never stored</p>
              </div>
            </div>

            <button
              onClick={() => setStep('upload')}
              className="mt-8 px-12 py-5 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all inline-flex items-center gap-3"
            >
              <span>Start FREE Analysis</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* UPLOAD SCREEN */}
        {step === 'upload' && (
          <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
            <div className="text-center space-y-2">
              <h2 className="text-4xl font-bold text-gray-900" style={{fontFamily: 'Playfair Display, serif'}}>
                Upload Your Pet's Information
              </h2>
              <p className="text-gray-600">Multi-modal input for comprehensive analysis</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="bg-white rounded-3xl p-8 border-2 border-dashed border-emerald-200 hover:border-emerald-400 transition-all">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 mx-auto bg-emerald-100 rounded-2xl flex items-center justify-center">
                    <FileUp className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Blood Work Report</h3>
                  <p className="text-sm text-gray-600">AI extracts all values automatically</p>
                  
                  {uploads.bloodWork ? (
                    <div className="bg-emerald-50 p-4 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-emerald-600" />
                          <span className="text-sm font-semibold text-emerald-900">{uploads.bloodWork.name}</span>
                        </div>
                        <button onClick={() => setUploads(prev => ({ ...prev, bloodWork: null }))} className="text-emerald-600">
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      {processingOCR && <div className="mt-2 text-xs text-emerald-700">Extracting values...</div>}
                    </div>
                  ) : (
                    <>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileUpload(e.target.files[0], 'bloodWork')}
                        className="hidden"
                      />
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700"
                      >
                        Choose File or Snap Photo
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 border-2 border-dashed border-blue-200 hover:border-blue-400 transition-all">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 mx-auto bg-blue-100 rounded-2xl flex items-center justify-center">
                    <Camera className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Pet Photo</h3>
                  <p className="text-sm text-gray-600">Visual health assessment</p>
                  
                  {uploads.petPhoto ? (
                    <div className="bg-blue-50 p-4 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-blue-600" />
                          <span className="text-sm font-semibold text-blue-900">{uploads.petPhoto.name}</span>
                        </div>
                        <button onClick={() => setUploads(prev => ({ ...prev, petPhoto: null }))} className="text-blue-600">
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <input
                        ref={petPhotoRef}
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={(e) => handleFileUpload(e.target.files[0], 'petPhoto')}
                        className="hidden"
                      />
                      <button
                        onClick={() => petPhotoRef.current?.click()}
                        className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700"
                      >
                        Upload Pet Photo
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-indigo-200">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center">
                  <Mic className="w-8 h-8 text-indigo-600" />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Voice Description</h3>
                    <p className="text-sm text-gray-600">Describe symptoms or concerns</p>
                  </div>
                  
                  {voiceTranscript && (
                    <div className="bg-indigo-50 p-4 rounded-xl">
                      <p className="text-sm text-indigo-900"><strong>Transcribed:</strong> {voiceTranscript}</p>
                    </div>
                  )}

                  <button
                    onClick={voiceRecording ? stopVoiceRecording : startVoiceRecording}
                    className={`px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2 ${
                      voiceRecording ? 'bg-red-600 text-white' : 'bg-indigo-600 text-white'
                    }`}
                  >
                    <Mic className="w-5 h-5" />
                    {voiceRecording ? 'Stop Recording' : 'Start Recording'}
                  </button>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => setStep('form')}
                disabled={!uploads.bloodWork && !labResults}
                className="px-12 py-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all disabled:opacity-50 inline-flex items-center gap-3"
              >
                Continue to Pet Details
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* FORM SCREEN */}
        {step === 'form' && (
          <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-2" style={{fontFamily: 'Playfair Display, serif'}}>
                Pet Profile Details
              </h2>
              <p className="text-gray-600">Help us understand your pet for accurate analysis</p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Pet's Name *</label>
                  <input
                    type="text"
                    value={petData.name}
                    onChange={(e) => setPetData({...petData, name: e.target.value})}
                    placeholder="e.g., Max"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Breed *</label>
                  <input
                    type="text"
                    value={petData.breed}
                    onChange={(e) => setPetData({...petData, breed: e.target.value})}
                    placeholder="e.g., Golden Retriever"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Age (years) *</label>
                  <input
                    type="number"
                    value={petData.age}
                    onChange={(e) => setPetData({...petData, age: e.target.value})}
                    placeholder="e.g., 5"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Weight (lbs)</label>
                  <input
                    type="number"
                    value={petData.weight}
                    onChange={(e) => setPetData({...petData, weight: e.target.value})}
                    placeholder="e.g., 65"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Sex</label>
                  <select
                    value={petData.sex}
                    onChange={(e) => setPetData({...petData, sex: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Neuter Status</label>
                  <select
                    value={petData.neuterStatus}
                    onChange={(e) => setPetData({...petData, neuterStatus: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="neutered">Neutered/Spayed</option>
                    <option value="intact">Intact</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Additional Concerns</label>
                  <textarea
                    value={petData.concerns}
                    onChange={(e) => setPetData({...petData, concerns: e.target.value})}
                    placeholder="Any other symptoms or concerns..."
                    rows="3"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 resize-none"
                  />
                </div>

              </div>
            </div>

            {!labResults && (
              <div className="bg-white rounded-3xl p-8 shadow-xl">
                <h3 className="text-xl font-bold mb-4">Manual Blood Work Entry</h3>
                <textarea
                  value={labResults}
                  onChange={(e) => setLabResults(e.target.value)}
                  placeholder="RBC: 6.8 (5.5-8.5)&#10;WBC: 9.2 (6.0-17.0)&#10;..."
                  rows="8"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 resize-none font-mono text-sm"
                />
              </div>
            )}

            <div className="text-center">
              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="px-12 py-5 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-2xl font-bold text-xl hover:shadow-2xl hover:scale-105 transition-all disabled:opacity-50 inline-flex items-center gap-3"
              >
                {loading ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-6 h-6" />
                    Analyze with AI - FREE
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* ANALYZING SCREEN */}
        {step === 'analyzing' && (
          <div className="flex flex-col items-center justify-center py-24 space-y-8">
            <div className="relative">
              <div className="w-32 h-32 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-12 h-12 text-emerald-600 animate-pulse" />
              </div>
            </div>
            <div className="text-center space-y-3">
              <h3 className="text-3xl font-bold text-gray-900" style={{fontFamily: 'Playfair Display, serif'}}>
                Analyzing {petData.name}'s Health Patterns
              </h3>
              <div className="space-y-2 text-gray-600">
                <p className="flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  Processing blood work values
                </p>
                {uploads.petPhoto && (
                  <p className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    Analyzing visual health
                  </p>
                )}
                <p className="flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  Applying Holistic Pattern Analysis™
                </p>
              </div>
            </div>
          </div>
        )}

        {/* BASIC RESULTS SCREEN (FREE) */}
        {step === 'basicResults' && basicAnalysis && (
          <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-3xl p-10 text-white shadow-2xl">
              <div className="inline-block px-4 py-1 bg-white/20 rounded-full text-sm font-semibold mb-3">
                FREE Basic Analysis Complete ✓
              </div>
              <h2 className="text-4xl font-bold mb-3" style={{fontFamily: 'Playfair Display, serif'}}>
                {petData.name}'s Health Pattern Analysis
              </h2>
              <p className="text-emerald-100">
                {petData.breed} • {petData.age} years • {petData.sex}
              </p>
            </div>

            <div className="bg-white rounded-3xl p-10 shadow-xl">
              <div className="prose prose-lg max-w-none">
                <div className="whitespace-pre-wrap" style={{lineHeight: '1.9'}}>
                  {basicAnalysis}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-3xl p-8">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Gift className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Want the Complete Analysis?</h3>
                  <p className="text-gray-700 mb-4">
                    You've seen the pattern. Now get the detailed protocols, supplement recommendations, 
                    dietary strategies, and vet discussion guides to help {petData.name} thrive.
                  </p>
                  <div className="bg-white rounded-xl p-6 mb-6">
                    <div className="text-sm text-gray-700 space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                        <span>System-by-system detailed breakdown</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                        <span>Pattern-specific nutritional protocols</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                        <span>Supplement recommendations & dosing</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                        <span>Veterinarian discussion guide</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                        <span>3 comprehensive guide books ($297 value)</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setStep('unlock')}
                    className="w-full px-8 py-5 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 text-white rounded-2xl font-bold text-xl hover:shadow-2xl hover:scale-105 transition-all"
                  >
                    Unlock Complete Analysis FREE 🎁
                  </button>
                  <p className="text-center text-sm text-gray-600 mt-3">
                    Share your experience & get $297 worth of guides instantly
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* UNLOCK SCREEN (VIRAL SYSTEM) - CONDENSED VERSION */}
        {step === 'unlock' && (
          <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
            
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-2" style={{fontFamily: 'Playfair Display, serif'}}>
                Unlock $297 in Premium Guides
              </h2>
              <p className="text-gray-600">Complete 4 simple steps to get instant access</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-gray-900">Progress</span>
                <span className="text-2xl font-bold text-emerald-600">{completionPercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>

            {/* STEP 1: Photo */}
            <div className={`bg-white rounded-3xl p-8 shadow-lg border-2 ${unlockProgress.photo ? 'border-emerald-500' : 'border-gray-200'}`}>
              <div className="flex items-start gap-6">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${unlockProgress.photo ? 'bg-emerald-500 text-white' : 'bg-gray-100'}`}>
                  {unlockProgress.photo ? <CheckCircle className="w-8 h-8" /> : <Camera className="w-8 h-8" />}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Step 1: Show Us {petData.name}!</h3>
                  <p className="text-gray-600 mb-4">Upload a clear photo. (We know they're the cutest! 📸)</p>
                  
                  {!unlockProgress.photo ? (
                    <>
                      <input
                        ref={unlockPhotoRef}
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={handleUnlockPhotoUpload}
                        className="hidden"
                      />
                      <button
                        onClick={() => unlockPhotoRef.current?.click()}
                        className="px-8 py-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700"
                      >
                        <Camera className="w-5 h-5 inline mr-2" />
                        Upload Photo
                      </button>
                    </>
                  ) : (
                    <div className="text-emerald-700 font-bold">✓ Photo uploaded!</div>
                  )}
                </div>
              </div>
            </div>

            {/* STEP 2: Voice */}
            <div className={`bg-white rounded-3xl p-8 shadow-lg border-2 ${unlockProgress.voice ? 'border-blue-500' : 'border-gray-200'}`}>
              <div className="flex items-start gap-6">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${unlockProgress.voice ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}>
                  {unlockProgress.voice ? <CheckCircle className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Step 2: Tell Their Story</h3>
                  <p className="text-gray-600 mb-4">30-second voice recording (can be anonymous!)</p>
                  
                  {!unlockProgress.voice ? (
                    voiceRecording ? (
                      <div className="space-y-2">
                        <div className="text-2xl font-bold">{recordingTime}s / 30s</div>
                        <button
                          onClick={stopUnlockVoiceRecording}
                          className="px-8 py-4 bg-red-600 text-white rounded-xl font-bold"
                        >
                          Stop Recording
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={startUnlockVoiceRecording}
                        className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700"
                      >
                        <Mic className="w-5 h-5 inline mr-2" />
                        Start Recording
                      </button>
                    )
                  ) : (
                    <div className="text-blue-700 font-bold">✓ Voice recorded!</div>
                  )}
                </div>
              </div>
            </div>

            {/* STEP 3: Social */}
            <div className={`bg-white rounded-3xl p-8 shadow-lg border-2 ${unlockProgress.social ? 'border-purple-500' : 'border-gray-200'}`}>
              <div className="flex items-start gap-6">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${unlockProgress.social ? 'bg-purple-500 text-white' : 'bg-gray-100'}`}>
                  {unlockProgress.social ? <CheckCircle className="w-8 h-8" /> : <Share2 className="w-8 h-8" />}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Step 3: Help Other Pet Parents</h3>
                  <p className="text-gray-600 mb-4">Share with #PetLabAIResults</p>
                  
                  {!unlockProgress.social ? (
                    <div className="grid grid-cols-3 gap-3">
                      <button onClick={() => shareToSocial('facebook')} className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold">Facebook</button>
                      <button onClick={() => shareToSocial('twitter')} className="px-6 py-3 bg-sky-500 text-white rounded-xl font-semibold">Twitter</button>
                      <button onClick={() => shareToSocial('instagram')} className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold">Instagram</button>
                    </div>
                  ) : (
                    <div className="text-purple-700 font-bold">✓ Shared on social!</div>
                  )}
                </div>
              </div>
            </div>

            {/* STEP 4: Data */}
            <div className={`bg-white rounded-3xl p-8 shadow-lg border-2 ${unlockProgress.data ? 'border-amber-500' : 'border-gray-200'}`}>
              <div className="flex items-start gap-6">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${unlockProgress.data ? 'bg-amber-500 text-white' : 'bg-gray-100'}`}>
                  {unlockProgress.data ? <CheckCircle className="w-8 h-8" /> : <Award className="w-8 h-8" />}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Step 4: 5 Quick Questions</h3>
                  
                  {!unlockProgress.data ? (
                    <div className="space-y-4">
                      <select value={additionalData.diet} onChange={(e) => setAdditionalData({...additionalData, diet: e.target.value})} className="w-full px-4 py-3 border-2 rounded-xl">
                        <option value="">What does {petData.name} eat?</option>
                        <option value="kibble">Kibble</option>
                        <option value="raw">Raw</option>
                        <option value="cooked">Home-cooked</option>
                      </select>
                      
                      <select value={additionalData.activityLevel} onChange={(e) => setAdditionalData({...additionalData, activityLevel: e.target.value})} className="w-full px-4 py-3 border-2 rounded-xl">
                        <option value="">Activity level?</option>
                        <option value="low">Low</option>
                        <option value="moderate">Moderate</option>
                        <option value="high">High</option>
                      </select>
                      
                      <select value={additionalData.environment} onChange={(e) => setAdditionalData({...additionalData, environment: e.target.value})} className="w-full px-4 py-3 border-2 rounded-xl">
                        <option value="">Living environment?</option>
                        <option value="apartment">Apartment</option>
                        <option value="house">House</option>
                        <option value="farm">Farm</option>
                      </select>
                      
                      <select value={additionalData.otherPets} onChange={(e) => setAdditionalData({...additionalData, otherPets: e.target.value})} className="w-full px-4 py-3 border-2 rounded-xl">
                        <option value="">Other pets?</option>
                        <option value="none">No</option>
                        <option value="dogs">Yes, dogs</option>
                        <option value="cats">Yes, cats</option>
                      </select>
                      
                      <input 
                        type="text" 
                        value={additionalData.topConcern} 
                        onChange={(e) => setAdditionalData({...additionalData, topConcern: e.target.value})} 
                        placeholder="Top health concern?"
                        className="w-full px-4 py-3 border-2 rounded-xl"
                      />
                      
                      <button onClick={handleDataSubmit} className="w-full px-8 py-4 bg-amber-600 text-white rounded-xl font-bold hover:bg-amber-700">
                        Submit Answers
                      </button>
                    </div>
                  ) : (
                    <div className="text-amber-700 font-bold">✓ All answered!</div>
                  )}
                </div>
              </div>
            </div>

            {/* Unlock Button */}
            <div className="bg-white rounded-3xl p-8 shadow-lg text-center">
              <button
                onClick={handleUnlock}
                disabled={!isFullyUnlocked}
                className={`px-12 py-6 rounded-2xl font-bold text-xl inline-flex items-center gap-3 ${
                  isFullyUnlocked
                    ? 'bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 text-white hover:shadow-2xl hover:scale-105 cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isFullyUnlocked ? (
                  <>
                    <Download className="w-6 h-6" />
                    Unlock My $297 in Guides FREE
                  </>
                ) : (
                  <>
                    <Lock className="w-6 h-6" />
                    Complete All Steps to Unlock
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* COMPLETE SCREEN */}
        {step === 'complete' && (
          <div className="text-center space-y-8 animate-fadeIn max-w-3xl mx-auto py-12">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-16 h-16 text-white" />
            </div>
            
            <div>
              <h2 className="text-5xl font-bold text-gray-900 mb-4" style={{fontFamily: 'Playfair Display, serif'}}>
                🎉 Unlocked!
              </h2>
              <p className="text-xl text-gray-600">
                Check your email for download links to all 3 premium guides ($297 value)
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-6">Your Premium Guides:</h3>
              <div className="space-y-4 text-left">
                <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-xl">
                  <Download className="w-8 h-8 text-emerald-600" />
                  <div>
                    <div className="font-bold">Holistic Pattern Restoration Guide™</div>
                    <div className="text-sm text-gray-600">88 pages • $97 value</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl">
                  <Download className="w-8 h-8 text-blue-600" />
                  <div>
                    <div className="font-bold">Breed-Specific Wellness Blueprint™</div>
                    <div className="text-sm text-gray-600">124 pages • $127 value</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-indigo-50 rounded-xl">
                  <Download className="w-8 h-8 text-indigo-600" />
                  <div>
                    <div className="font-bold">Integrative Vet Visit Mastery™</div>
                    <div className="text-sm text-gray-600">76 pages • $73 value</div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="px-12 py-5 bg-emerald-600 text-white rounded-2xl font-bold text-lg hover:bg-emerald-700"
            >
              Analyze Another Pet
            </button>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="fixed bottom-6 right-6 bg-red-50 border-2 border-red-200 rounded-2xl p-6 max-w-md shadow-2xl z-50">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-600" />
              <div>
                <h4 className="font-bold text-red-900 mb-1">Error</h4>
                <p className="text-red-700 text-sm">{error}</p>
                <button onClick={() => setError(null)} className="mt-2 text-sm text-red-600 font-semibold">
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-white/90 backdrop-blur-lg border-t border-emerald-100 mt-24">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 text-sm text-gray-600">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span>Bank-Level Security</span>
              <span className="text-gray-300">•</span>
              <Globe className="w-4 h-4 text-emerald-600" />
              <span>Global Platform</span>
              <span className="text-gray-300">•</span>
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>AI-Powered Analysis</span>
            </div>
            <p className="text-sm text-gray-600 max-w-3xl mx-auto">
              <strong>VetLabAI</strong> provides educational information using multi-modal AI and integrative veterinary methodologies. 
              Always consult your veterinarian for medical advice.
            </p>
            <div className="border-t border-gray-200 pt-4">
              <p className="text-sm font-semibold text-gray-800">Baiopet™</p>
              <p className="text-xs text-gray-500 mt-1">Evidence-Based Integrative Pet Health Platform</p>
              <p className="text-xs text-gray-500">© {new Date().getFullYear()} Content Crew LLC. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;500;600;700&display=swap');
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
