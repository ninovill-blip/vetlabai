import React, { useState, useRef } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle, Sparkles, Download, Mic, Camera, FileUp, X, ChevronRight, Zap, Shield, Globe, Gift, Award, Heart, Lock, Share2, CreditCard, Tag } from 'lucide-react';

// ============================================================================
// PETLABAI - COMPLETE WITH PAYMENT SYSTEM
// All Features: OCR, Photo, Voice, Payments, Promo Codes
// ============================================================================

const MASTER_PROMPT = `You are PETLABAI, an advanced integrative pet health intelligence platform designed to solve a critical problem: **Our pets cannot speak, yet their health depends entirely on how well we—their guardians—understand their bodies.**

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
Brief mention that detailed protocols available in premium analysis

This is **giving pets a voice through science, wisdom, and compassion.**`;

export default function PetLabAI() {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================
  
  const [step, setStep] = useState('welcome');
  const [selectedTier, setSelectedTier] = useState('basic');
  const [promoCode, setPromoCode] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  
  const [petData, setPetData] = useState({ 
    name: '', 
    email: '', 
    species: 'dog', 
    breed: '', 
    age: '', 
    sex: 'male', 
    neuterStatus: 'neutered', 
    weight: '', 
    concerns: '' 
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
  
  const fileInputRef = useRef(null);
  const petPhotoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordingTimerRef = useRef(null);

  // ============================================================================
  // FILE UPLOAD HANDLERS
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
      
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 2000,
          messages: [{
            role: 'user',
            content: [
              { type: 'image', source: { type: 'base64', media_type: file.type, data: base64 } },
              { type: 'text', text: `Extract all blood test values from this veterinary lab report. Format as:

Parameter: Value (Reference Range)

Example:
RBC: 6.8 (5.5-8.5)
WBC: 9.2 (6.0-17.0)

Extract ALL visible values.` }
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
  // VOICE RECORDING
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

      let time = 0;
      recordingTimerRef.current = setInterval(() => {
        time++;
        setRecordingTime(time);
        if (time >= 30) stopVoiceRecording();
      }, 1000);

    } catch (err) {
      console.error('Microphone error:', err);
      setError('Could not access microphone. Please check permissions.');
    }
  };

  const stopVoiceRecording = () => {
    if (mediaRecorderRef.current && voiceRecording) {
      mediaRecorderRef.current.stop();
      setVoiceRecording(false);
      clearInterval(recordingTimerRef.current);
      setRecordingTime(0);
    }
  };

  const transcribeAudio = async (audioBlob) => {
    try {
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
    } catch (err) {
      console.log('Voice transcription not available');
    }
  };

  // ============================================================================
  // ANALYSIS FUNCTION
  // ============================================================================

  const handleAnalyze = async () => {
    if (!petData.name || !petData.email || !petData.breed || !petData.age) {
      setError('Please fill in pet name, email, breed, and age');
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

      // Add pet photo if available
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

      // Add text analysis
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

Provide BASIC RESULTS (free preview) as specified.`
      });

      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 2000,
          messages
        })
      });

      const data = await response.json();
      setBasicAnalysis(data.content[0].text);

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
              analysis: data.content[0].text,
              tier: 'basic'
            })
          });
        } catch (emailError) {
          console.error('Email failed:', emailError);
        }
        setStep('basicResults');
      } else {
        // Paid tiers - show payment option
        setShowPayment(true);
        setStep('basicResults');
      }

    } catch (err) {
      console.error('Analysis error:', err);
      setError('Analysis failed. Please try again.');
      setStep('form');
    } finally {
      setLoading(false);
    }
  };

  // ============================================================================
  // PAYMENT HANDLER
  // ============================================================================

  const handlePayment = async () => {
    try {
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tier: selectedTier,
          promoCode: promoCode,
          petData: petData,
          labResults: basicAnalysis
        })
      });

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
  };

  const handleReset = () => {
    setStep('welcome');
    setSelectedTier('basic');
    setPromoCode('');
    setShowPayment(false);
    setPetData({ name: '', email: '', species: 'dog', breed: '', age: '', sex: 'male', neuterStatus: 'neutered', weight: '', concerns: '' });
    setUploads({ bloodWork: null, petPhoto: null, unlockPhoto: null, voiceRecording: null });
    setLabResults('');
    setBasicAnalysis(null);
    setVoiceTranscript('');
  };

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
              <img 
                src="/LOGO.png" 
                alt="PETLABAI - Holistic First" 
                style={{ height: '220px', width: 'auto' }}
              />
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-800">Pet Blood Test Analysis</p>
              <p className="text-xs text-gray-600">EDU + Holistic</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        
        {/* WELCOME SCREEN */}
        {step === 'welcome' && (
          <div className="text-center space-y-8 animate-fadeIn">
            <div className="space-y-4 max-w-4xl mx-auto">
            {/* New Year Emblem */}
            <div className="flex justify-center mb-6">
              <img 
                src="/HNY2026.png" 
                alt="Happy New Year 2026" 
                className="w-32 h-32 md:w-40 md:h-40 animate-float"
              />
            </div>
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
                Because our pets cannot speak, we give them a voice through comprehensive analysis
              </p>
            </div>

            {/* Feature Cards */}
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

            {/* Tier Selection */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-emerald-100 max-w-5xl mx-auto mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Choose Your Analysis Package
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

            <button
              onClick={() => setStep('upload')}
              className="mt-8 px-12 py-5 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all inline-flex items-center gap-3"
            >
              <span>{selectedTier === 'basic' ? 'Start FREE Analysis' : `Get ${selectedTier === 'essential' ? 'Essential' : 'Premium'} Analysis`}</span>
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
              
              {/* Blood Work Upload */}
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

              {/* Pet Photo Upload */}
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

            {/* Voice Recording */}
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

                  {voiceRecording ? (
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-indigo-600">{recordingTime}s / 30s</div>
                      <button
                        onClick={stopVoiceRecording}
                        className="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold inline-flex items-center gap-2"
                      >
                        <Mic className="w-5 h-5" />
                        Stop Recording
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={startVoiceRecording}
                      className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold inline-flex items-center gap-2"
                    >
                      <Mic className="w-5 h-5" />
                      Start Recording
                    </button>
                  )}
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
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Pet's Name *</label>
                  <input
                    type="text"
                    value={petData.name}
                    onChange={(e) => setPetData({...petData, name: e.target.value})}
                    placeholder="Max"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Your Email *</label>
                  <input
                    type="email"
                    value={petData.email}
                    onChange={(e) => setPetData({...petData, email: e.target.value})}
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">📧 We'll email you the analysis</p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Breed *</label>
                  <input
                    type="text"
                    value={petData.breed}
                    onChange={(e) => setPetData({...petData, breed: e.target.value})}
                    placeholder="Golden Retriever"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Age (years) *</label>
                  <input
                    type="number"
                    value={petData.age}
                    onChange={(e) => setPetData({...petData, age: e.target.value})}
                    placeholder="5"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Weight (lbs)</label>
                  <input
                    type="number"
                    value={petData.weight}
                    onChange={(e) => setPetData({...petData, weight: e.target.value})}
                    placeholder="65"
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

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Additional Concerns</label>
                  <textarea
                    value={petData.concerns}
                    onChange={(e) => setPetData({...petData, concerns: e.target.value})}
                    placeholder="Any other symptoms..."
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
                    {selectedTier === 'basic' ? 'AI Analyze & Educate Me - FREE' : `Get ${selectedTier === 'essential' ? 'Essential' : 'Premium'} Analysis`}
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

        {/* RESULTS SCREEN */}
        {step === 'basicResults' && basicAnalysis && (
          <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-3xl p-10 text-white shadow-2xl">
              <div className="inline-block px-4 py-1 bg-white/20 rounded-full text-sm font-semibold mb-3">
                {selectedTier === 'basic' ? 'FREE Basic Analysis Complete ✓' : 'Analysis Preview'}
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

            <div className="flex gap-4">
              <button
                onClick={handleReset}
                className="flex-1 bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-colors"
              >
                Analyze Another Pet
              </button>
            </div>
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
              <strong>PETLABAI™</strong> provides educational information only. Always consult your veterinarian for medical advice.
            </p>
            <div className="border-t border-gray-200 pt-4">
              <p className="text-sm font-semibold text-gray-800">Content Crew LLC • Baiohuman</p>
              <p className="text-xs text-gray-500 mt-1">Pet Blood Test Analysis EDU + Holistic</p>
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
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }

  .animate-float {
    animation: float 3s ease-in-out infinite;
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
