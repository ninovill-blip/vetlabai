# 🐕 VetLabAI - Integrative Blood Work Analysis for Pets

**AI-powered blood test interpretation with holistic pattern analysis and breed-specific insights.**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fninovill-blip%2Fvetlabai&env=VITE_ANTHROPIC_API_KEY&envDescription=Your%20Anthropic%20API%20key%20for%20AI%20analysis&envLink=https%3A%2F%2Fconsole.anthropic.com%2Fsettings%2Fkeys&project-name=vetlabai&repository-name=vetlabai)

**Live Demo:** [petlabai.com](https://petlabai.com)

---

## 🎯 What is VetLabAI?

VetLabAI is an **evidence-based educational platform** that helps pet owners understand their pet's blood work using **Holistic Pattern Analysis™** - a comprehensive approach that looks at the whole picture, not just isolated numbers.

### **Key Philosophy:**
- **Pattern-Based Analysis** - Identifies root causes, not just symptoms
- **Integrative Approach** - Synthesizes multiple veterinary methodologies
- **Species-Appropriate** - Tailored nutrition and lifestyle recommendations
- **Educational Focus** - Empowers pet owners with knowledge

---

## ✨ Features

### **🔬 Comprehensive Analysis**
- ✅ **Instant Interpretation** - Get blood work analysis in seconds
- ✅ **Holistic Pattern Recognition™** - Identifies underlying health patterns
- ✅ **Breed-Specific Intelligence** - Accounts for 40+ breed variations
- ✅ **Optimal Ranges** - Shows both reference AND wellness ranges
- ✅ **System-Based Organization** - Analyzes by organ systems (Detox, Filtration, Digestion, etc.)

### **📊 Smart Risk Assessment**
- 🟢 **Routine** - Schedule regular vet visit
- 🟡 **Soon** - Discuss at next appointment
- 🟠 **Urgent** - Call vet within 2-3 days
- 🔴 **Emergency** - Immediate veterinary attention

### **📖 Educational Insights**
- 📝 **Plain English** - No medical jargon
- 🎯 **Actionable Recommendations** - Species-appropriate nutrition & lifestyle
- 💬 **Vet Discussion Points** - Specific questions to ask your veterinarian
- 📈 **Timeline Guidance** - When to retest specific markers

### **📄 Export & Share**
- 💾 **PDF Reports** - Professional analysis documents
- 📱 **Mobile Responsive** - Works on all devices
- 🔗 **Shareable** - Easy to share with your vet

---

## 🚀 Quick Deploy (1-Click)

### **Step 1: Get Your API Key**

1. Visit [console.anthropic.com](https://console.anthropic.com)
2. Sign up or login
3. Navigate to **API Keys**
4. Click **"Create Key"**
5. Copy your key (starts with `sk-ant-...`)

### **Step 2: Deploy to Vercel**

1. Click the **"Deploy with Vercel"** button above
2. Sign in with GitHub
3. When prompted, paste your **Anthropic API Key**
4. Click **"Deploy"**
5. Wait 1-2 minutes ⏱️

🎉 **Done!** Your VetLabAI instance will be live at `https://your-app.vercel.app`

---

## 🩺 What VetLabAI Analyzes

### **Complete Blood Count (CBC)**
- Red Blood Cells (Foundation System)
- White Blood Cell Differential (Immunity System)
- Platelet Count (Clotting Function)

### **Chemistry Panel**
- **Detox & Regulation System:** ALT, ALP, AST, Bilirubin
- **Filtration System:** BUN, Creatinine, SDMA
- **Digestion System:** Amylase, Lipase
- **Metabolism:** Glucose, Cholesterol, Proteins
- **Electrolytes:** Sodium, Potassium, Chloride

### **Thyroid Panel**
- T4, Free T4, TSH (Foundation System hormones)

---

## 🐾 Holistic Pattern Analysis™

VetLabAI uses **pattern-based analysis** to identify root causes:

### **Core Patterns:**

**1️⃣ INSUFFICIENCY PATTERN**
- What it means: Deficiency or weakness
- Blood signs: Low RBC, low albumin, low WBC
- Common causes: Poor nutrition, chronic disease, aging

**2️⃣ ACCUMULATION PATTERN**
- What it means: Excess or stagnation
- Blood signs: High liver enzymes, high cholesterol, elevated WBC
- Common causes: Diet, inflammation, toxin buildup

**3️⃣ INFLAMMATION PATTERN**
- What it means: Hyperactive inflammatory response
- Blood signs: High WBC with neutrophils, elevated liver markers
- Common causes: Infection, allergies, chronic inflammation

**4️⃣ HYPO-METABOLIC PATTERN**
- What it means: Slowed metabolism
- Blood signs: Low thyroid, low energy markers
- Common causes: Hypothyroidism, adrenal insufficiency

**5️⃣ MIXED PATTERNS**
- What it means: Combination of imbalances
- Example: Digestive weakness + inflammation = food sensitivity pattern

---

## 🧬 Breed-Specific Intelligence

Different breeds have different "normal" values. VetLabAI accounts for:

### **Special Breed Considerations:**

**🐕 Greyhounds/Sighthounds:**
- Higher RBC, hemoglobin, hematocrit (normal for them!)
- Lower platelets (80-200K is healthy)
- Higher thyroid (up to 5.0 μg/dL)

**🦮 Golden Retrievers:**
- High hypothyroidism risk (screen annually age 4+)
- Monitor T4, Free T4, TSH

**🐩 Standard Poodles:**
- Addison's disease predisposition
- Watch Na/K ratio carefully

**🐾 Miniature Schnauzers:**
- Pancreatitis and hyperlipidemia prone
- Monitor amylase, lipase, cholesterol

**📚 40+ Breeds Covered** with specific predisposition data

---

## 💻 Local Development

Want to customize or run locally?

### **Prerequisites:**
- Node.js 16+ and npm
- Anthropic API key

### **Installation:**

```bash
# Clone repository
git clone https://github.com/ninovill-blip/vetlabai.git
cd vetlabai

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Add your API key to .env
# VITE_ANTHROPIC_API_KEY=sk-ant-your-key-here

# Run development server
npm run dev

# Build for production
npm run build
```

### **Environment Variables:**

Create a `.env` file:

```
VITE_ANTHROPIC_API_KEY=sk-ant-your-api-key-here
```

In Vercel, add this in **Settings → Environment Variables**

---

## 🔒 Privacy & Security

- ✅ **No Data Storage** - Analysis happens in real-time, nothing is saved
- ✅ **Secure API** - Your API key is stored as environment variable
- ✅ **Client-Side** - No backend database
- ⚠️ **Educational Only** - Not a substitute for veterinary care

---

## 💰 Cost Information

### **API Usage:**
- **~$0.08-0.15** per blood work analysis
- **Anthropic Free Tier:** $5 in credits (~40-60 analyses)
- **Pay-As-You-Go:** Only pay for what you use

### **Hosting:**
- **Vercel Free Tier:** Unlimited personal projects
- **Vercel Pro:** $20/month for commercial use

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18 + Vite |
| **Styling** | Custom CSS (utility classes) |
| **Icons** | Lucide React |
| **AI Engine** | Anthropic Claude Sonnet 4 |
| **Deployment** | Vercel Edge Network |
| **Language** | JavaScript (JSX) |

---

## 📋 How to Use VetLabAI

### **Step 1: Enter Pet Information**
- Name, breed, age, weight, sex
- Any current concerns or symptoms

### **Step 2: Input Blood Work**
- Copy values from your vet's report
- Include reference ranges in parentheses
- Example: `RBC: 6.8 (5.5-8.5)`

### **Step 3: Analyze**
- Click "Analyze Blood Work"
- Get instant comprehensive report with:
  - Pattern diagnosis
  - Detailed analysis by organ system
  - Breed-specific insights
  - Actionable recommendations
  - Questions for your vet
  - Timeline for follow-up

### **Step 4: Export**
- Download PDF for your records
- Share with your veterinarian
- Track changes over time

---

## 🚨 Important Disclaimer

**VetLabAI provides educational information only and does not constitute veterinary medical advice, diagnosis, or treatment.**

This platform synthesizes integrative veterinary methodologies to help pet owners understand their pet's health patterns. All interpretations should be discussed with your veterinarian, who has access to complete medical history and can perform physical examination.

**If your pet is showing signs of illness or distress, contact your veterinarian or emergency clinic immediately.**

---

## 🎯 Roadmap

### **Phase 1 (Current):**
- ✅ Dog blood work analysis
- ✅ Holistic Pattern Analysis™
- ✅ 40+ breed-specific data
- ✅ PDF export
- ✅ Mobile responsive

### **Phase 2 (Coming Soon):**
- 🔄 Cat blood work support
- 🔄 PDF upload (OCR)
- 🔄 Multi-pet management
- 🔄 Historical trend tracking
- 🔄 User accounts

### **Phase 3 (Future):**
- 📱 Mobile app (iOS/Android)
- 🍖 Nutrition recommendations database
- 🏥 Integrative vet directory
- 📊 Advanced pattern visualization
- 🌐 Multi-language support

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### **Development Guidelines:**
- Follow existing code style
- Test thoroughly before submitting
- Update documentation as needed
- Keep commits focused and descriptive

---

## 📞 Support & Feedback

- **Issues:** [GitHub Issues](https://github.com/ninovill-blip/vetlabai/issues)
- **Anthropic API:** [console.anthropic.com](https://console.anthropic.com)
- **Vercel Support:** [vercel.com/support](https://vercel.com/support)

---

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details

---

## 🏢 About

**VetLabAI** is developed by **Baiopet™** - Evidence-Based Integrative Pet Health Education

**Mission:** Democratize access to professional-grade pet health education through AI-powered analysis.

**Vision:** Empower 1M+ pet owners worldwide to become active participants in their pet's health journey.

---

## 🙏 Acknowledgments

VetLabAI synthesizes evidence-based integrative veterinary methodologies from leading practitioners worldwide. We are grateful to the veterinary community for advancing holistic approaches to animal health.

**Special Thanks:**
- Integrative veterinary medicine community
- Evidence-based nutrition researchers
- Open-source AI community
- Pet owners who inspired this project

---

## ⚖️ Legal

**Trademark:** Baiopet™ is a trademark of Content Crew LLC

**Copyright:** © 2025 Content Crew LLC. All rights reserved.

**Terms of Service:** By using VetLabAI, you agree that:
- This is educational information only
- You will consult your veterinarian for medical advice
- You understand the limitations of AI analysis
- You use this service at your own discretion

---

**Built with ❤️ for pets and their petparents**

**Powered by:** Advanced AI • Evidence-Based Veterinary Science • Integrative Medicine Principles

🐾 **Making professional pet health education accessible to everyone** 🐾
