# 🐕 VetLabAI - Instant Blood Work Insights for Your Pet

AI-powered blood test interpretation for dogs with breed-specific insights and actionable recommendations.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FYOUR-USERNAME%2Fvetlabai&env=VITE_ANTHROPIC_API_KEY&envDescription=Your%20Anthropic%20API%20key%20for%20AI%20analysis&envLink=https%3A%2F%2Fconsole.anthropic.com%2Fsettings%2Fkeys&project-name=vetlabai&repository-name=vetlabai)

---

## 🚀 One-Click Deploy to Vercel

### Step 1: Get Your Anthropic API Key

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up or login
3. Navigate to **API Keys**
4. Click **"Create Key"**
5. Copy your key (starts with `sk-ant-...`)

### Step 2: Deploy

1. Click the **"Deploy with Vercel"** button above
2. Sign in with GitHub (or create account)
3. When prompted for environment variables:
   - **VITE_ANTHROPIC_API_KEY**: Paste your Anthropic API key
4. Click **"Deploy"**
5. Wait 1-2 minutes

🎉 **Done!** Your app will be live at `https://your-app.vercel.app`

---

## ✨ Features

- ✅ **Instant Analysis** - Get blood work interpretation in seconds
- ✅ **Breed-Specific** - Tailored insights for 40+ dog breeds
- ✅ **Smart Risk Assessment** - Urgency levels (Routine, Soon, Urgent, Emergency)
- ✅ **Plain English** - No medical jargon, clear explanations
- ✅ **Actionable Insights** - Specific next steps and vet questions
- ✅ **Export Reports** - Download as PDF
- ✅ **Mobile Responsive** - Works on all devices

---

## 🧪 How to Use

1. **Enter Pet Information**
   - Name, breed, age, weight, sex
   - Any concerns or symptoms

2. **Input Blood Work**
   - Copy values from your vet's report
   - Include reference ranges in parentheses

3. **Analyze**
   - Click "Analyze Blood Work"
   - Get instant comprehensive report

4. **Export**
   - Download PDF for your records
   - Share with your veterinarian

---

## 🩺 What It Analyzes

### Complete Blood Count (CBC)
- Red blood cells, hemoglobin, hematocrit
- White blood cell differential
- Platelet count

### Chemistry Panel
- Liver function (ALT, ALP, AST)
- Kidney function (BUN, Creatinine, SDMA)
- Pancreas (Amylase, Lipase)
- Glucose & metabolism
- Electrolytes

### Thyroid Panel
- T4, Free T4, TSH

---

## 🐾 Breed-Specific Intelligence

VetLabAI knows that different breeds have different "normal" values:

- **Greyhounds** - Higher RBC, lower platelets (normal for them!)
- **Golden Retrievers** - Hypothyroidism predisposition
- **Miniature Schnauzers** - Pancreatitis and hyperlipidemia risk
- **Standard Poodles** - Addison's disease monitoring
- **40+ breeds** with specific considerations

---

## 💻 Local Development

Want to run locally or customize?

```bash
# Clone the repo
git clone https://github.com/YOUR-USERNAME/vetlabai.git
cd vetlabai

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env and add your VITE_ANTHROPIC_API_KEY

# Run development server
npm run dev

# Build for production
npm run build
```

---

## 🔒 Security & Privacy

- ✅ Your API key is stored as an environment variable (not in code)
- ✅ No data is stored or logged by VetLabAI
- ✅ All analysis happens in real-time
- ⚠️ **Important**: This is educational information only, not veterinary diagnosis

---

## 💰 Cost

**API Usage:**
- ~$0.10 per blood work analysis
- Free tier: $5 in credits (~50 analyses)
- Paid: Pay only for what you use

**Vercel Hosting:**
- Free tier: Unlimited personal projects
- Pro: $20/month for commercial use

---

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Custom CSS (Tailwind-inspired utilities)
- **Icons**: Lucide React
- **AI**: Anthropic Claude Sonnet 4
- **Deployment**: Vercel
- **Hosting**: Edge Network (globally distributed)

---

## 📋 Environment Variables

Create a `.env` file with:

```
VITE_ANTHROPIC_API_KEY=sk-ant-your-api-key-here
```

In Vercel, add this as an environment variable in your project settings.

---

## 🚨 Disclaimer

**VetLabAI provides educational information only and does not constitute veterinary medical advice, diagnosis, or treatment.**

All interpretations should be discussed with your veterinarian, who has the complete medical history and can perform a physical examination.

If your pet is showing signs of illness or distress, please contact your veterinarian or emergency clinic immediately.

---

## 📄 License

MIT License - See LICENSE file for details

---

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/YOUR-USERNAME/vetlabai/issues)
- **Anthropic API**: [console.anthropic.com](https://console.anthropic.com)
- **Vercel Support**: [vercel.com/support](https://vercel.com/support)

---

## 🎯 Roadmap

- [ ] PDF upload support
- [ ] User accounts (save history)
- [ ] Multi-pet support
- [ ] Trend tracking over time
- [ ] Cat blood work support
- [ ] Vet marketplace integration
- [ ] Mobile app (iOS/Android)
- [ ] Nutrition recommendations
- [ ] Treatment cost estimates

---

Built with ❤️ for pets and their humans

**Powered by**: Anthropic Claude AI | Vercel Edge Network 

**All rights reserved Content Crew LLC Baiopet TM


