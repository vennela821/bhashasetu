import React, { useState, useEffect, useRef } from "react";
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Send,
  ShieldAlert,
  ShieldCheck,
  Globe,
  Menu,
  X,
  User,
  Download,
  Sparkles,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  Camera,
} from "lucide-react";

// Multi-language localization dictionary (8 Indian Languages)
const LANGUAGES = {
  te: {
    name: "తెలుగు",
    code: "te-IN",
    nativeName: "తెలుగు",
    tagline: "తల్లిదండ్రుల కోసం సాంకేతిక వంతెన",
    missionQuote:
      "మా నాన్నగారిలాంటి ఎంతోమందికి డిజిటల్ స్వాతంత్ర్యం, భద్రత కల్పించేందుకు రూపొందించిన సహాయకుడు.",
    drawerTitle: "భాషాసేతు సూచిక",
    demoUser: "రామారావు గారు (డెమో)",
    menu: {
      home: "ప్రారంభం",
      tools: "ఉపకరణాలు",
      guide: "ఎలా ఉపయోగించాలి",
      install: "యాప్ పొందండి",
      about: "గురించి & డెవలపర్",
    },
    tools: {
      sectionBadge: "నాలుగు ముఖ్య ఆధారాలు • CORE TOOLS",
      sectionHeading: "పెద్దవారికి అండగా నిలిచే సాధనాలు",
      sectionSub: "సంప్రదాయ పద్ధతిలోనే అత్యంత తేలికగా పనిచేసే సహాయక ఉపకరణాలు:",
      toolLabel: "ఉపకరణం",
      t1Title: "వాయిస్ టైపింగ్ (Voice Transcript)",
      t1Desc: "మీ మాతృభాషలో మాట్లాడండి, క్షణాల్లో వాట్సాప్ & ఆఫీస్ ఇంగ్లీష్‌గా మారుతుంది.",
      t2Title: "చదివి వివరించు (Translate & Read)",
      t2Desc: "ఇంగ్లీష్ పత్రాలు, బ్యాంక్ మెసేజ్‌లను తేలికపాటి తెలుగులో చదివి వినిపిస్తుంది.",
      t3Title: "రక్షణ కవచం (Quick Scam Shield)",
      t3Desc: "మోసపూరిత ఎస్ఎంఎస్, నకిలీ లాటరీ లింకులను పసిగట్టి ముందే హెచ్చరిస్తుంది.",
      t4Title: "చిట్టీ / పత్రం స్కాన్ (Slip OCR Scanner)",
      t4Desc: "కరెంట్ బిల్లులు, మెడికల్ చిట్టీల ఫోటో తీస్తే ముఖ్యమైన వివరాలు వివరించి చెబుతుంది.",
      openBtn: "ఉపయోగించండి",
    },
    assistant: {
      title: "భాషాసేతు సహాయకుడు",
      sub: "మీ సేవలో ఎల్లప్పుడూ సిద్ధం",
      slowVoice: "తాపీగా వినండి (0.75x)",
      normalVoice: "సాధారణం (1.0x)",
      tab1: "వాయిస్",
      tab2: "అనువాదం",
      tab3: "రక్షణ",
      tab4: "పత్రం స్కాన్",
      startSpeak: "మాట్లాడటానికి నొక్కండి",
      listening: "వింటున్నాను... మాట్లాడండి...",
      stopSpeak: "పూర్తయ్యింది",
      speechUnsupported: "మీ బ్రౌజర్ స్పీచ్ రికగ్నిషన్ సపోర్ట్ చేయదు. కింద ఉన్న నమూనా వాక్యాలను ప్రయత్నించండి.",
      casualEnglish: "సాధారణ ఇంగ్లీష్ (వాట్సాప్ కోసం):",
      formalEnglish: "కార్యాలయ ఇంగ్లీష్ (ఆఫీస్ / ఈమెయిల్):",
      copyBtn: "కాపీ చేయండి",
      copiedBtn: "కాపీ అయ్యింది!",
      whatsappBtn: "వాట్సాప్‌లో పంపండి",
      inputPromptText: "ఇంగ్లీష్ సందేశం లేదా నోటీస్ ఇక్కడ నమోదు చేయండి:",
      explainBtn: "తేలికగా వివరించు",
      explainingBtn: "వివరిస్తున్నాను...",
      nativeExplanation: "సరళమైన వివరణ:",
      listenAudio: "వినండి",
      stopAudio: "ఆపండి",
      checkScamBtn: "రక్షణ తనిఖీ చేయండి",
      scamDanger: "హెచ్చరిక: ఇది మోసపూరిత సందేశం కావచ్చు!",
      scamSafe: "సురక్షితం: ఇది సాధారణమైన సందేశం లాగా ఉంది.",
      scanDocBtn: "స్కాన్ చేసి వివరించు",
      billAmount: "చెల్లించాల్సిన మొత్తం:",
      dueDate: "చివరి గడువు:",
      actionTip: "మీరు చేయాల్సింది:",
    },
    guide: {
      badge: "సులభమైన విధానం",
      title: "ఎలా ఉపయోగించాలి?",
      step1Title: "1. నాణెంపై నొక్కండి",
      step1Desc: "స్క్రీన్ కుడివైపున కనిపించే భాషాసేతు గుండ్రని చిహ్నాన్ని తాకండి.",
      step2Title: "2. మాట్లాడండి లేదా కాపీ చేయండి",
      step2Desc: "మీ తెలుగు మాటలు చెప్పండి లేదా అనుమానాస్పద ఇంగ్లీష్ మెసేజ్ అతికించండి.",
      step3Title: "3. వినండి & భద్రంగా పంపండి",
      step3Desc: "స్పష్టమైన స్వరంతో వివరణ వినండి లేదా ఇంగ్లీష్ సందేశాన్ని వాట్సాప్‌లో పంపండి.",
    },
    install: {
      title: "భాషాసేతు వెబ్‌సైట్‌ను ఎలా తెరవాలి?",
      desc: "ఈ వెబ్‌సైట్‌ను మీ ఫోన్‌లో bookmark చేసుకోండి. ఇది ప్రస్తుతం browser extension కాదు.",
      btnText: "వెబ్‌సైట్ సహాయం",
    },
  },
  en: {
    name: "English",
    code: "en-US",
    nativeName: "English",
    tagline: "The Digital Bridge for Our Elders",
    missionQuote:
      "Built with love to grant digital independence, confidence, and fraud protection to parents who struggle with English.",
    drawerTitle: "BhashaSetu Navigation",
    demoUser: "Ramarao Garu (Demo)",
    menu: {
      home: "Home",
      tools: "Tools",
      guide: "How to Use",
      install: "Install App",
      about: "About & Developer",
    },
    tools: {
      sectionBadge: "Four Core Pillars • CORE TOOLS",
      sectionHeading: "Empowering Everyday Digital Life",
      sectionSub: "Carefully designed assistive utilities with zero friction for seniors:",
      toolLabel: "Tool",
      t1Title: "Voice Transcript",
      t1Desc: "Speak naturally in your native language, instantly formatted into polished English.",
      t2Title: "Translate & Read Aloud",
      t2Desc: "Translates and explains official documents or bank SMS in conversational native tongue.",
      t3Title: "Quick Scam Shield",
      t3Desc: "Scans suspicious text messages, lottery links, and phishing threats with audio warnings.",
      t4Title: "Parchment Slip OCR",
      t4Desc: "Snap a photo of electricity bills or doctor slips to hear key amounts and due dates.",
      openBtn: "Try Tool",
    },
    assistant: {
      title: "BhashaSetu Companion",
      sub: "Always here to assist",
      slowVoice: "Calm Voice (0.75x)",
      normalVoice: "Normal (1.0x)",
      tab1: "Voice",
      tab2: "Translate",
      tab3: "Scam Shield",
      tab4: "Slip Scan",
      startSpeak: "Tap to Speak",
      listening: "Listening... Please speak...",
      stopSpeak: "Finish Recording",
      speechUnsupported: "Web Speech API not supported in this browser. Please try sample presets below.",
      casualEnglish: "Casual English (for WhatsApp):",
      formalEnglish: "Formal English (Office/Email):",
      copyBtn: "Copy Text",
      copiedBtn: "Copied!",
      whatsappBtn: "Share on WhatsApp",
      inputPromptText: "Paste English notice, message, or bank SMS here:",
      explainBtn: "Simplify & Explain",
      explainingBtn: "Analyzing...",
      nativeExplanation: "Simplified Explanation:",
      listenAudio: "Listen Aloud",
      stopAudio: "Stop Audio",
      checkScamBtn: "Scan for Safety",
      scamDanger: "WARNING: High Probability of Scam / Phishing!",
      scamSafe: "SAFE: Appears to be a genuine regular notification.",
      scanDocBtn: "Scan & Explain Slip",
      billAmount: "Amount Due:",
      dueDate: "Payment Deadline:",
      actionTip: "Required Action:",
    },
    guide: {
      badge: "Effortless Experience",
      title: "How Does It Work?",
      step1Title: "1. Tap the Heritage Coin",
      step1Desc: "Touch the circular assistant coin resting at the bottom-right of your screen.",
      step2Title: "2. Speak or Paste Any Message",
      step2Desc: "Dictate in your own language or paste confusing English notifications.",
      step3Title: "3. Listen & Share Safely",
      step3Desc: "Listen to natural audio breakdowns or copy ready-made English replies safely.",
    },
    install: {
      title: "Save BhashaSetu for easy access",
      desc: "This is a website, not a browser extension. Bookmark it in your browser to open it again easily.",
      btnText: "How to use this website",
    },
  },
  hi: {
    name: "हिंदी",
    code: "hi-IN",
    nativeName: "हिंदी",
    tagline: "बुजुर्गों के लिए डिजिटल सेतु",
    missionQuote:
      "हमारे माता-पिता को अंग्रेजी की बाधाओं से मुक्त कर आत्मनिर्भर और सुरक्षित बनाने का प्रयास।",
    drawerTitle: "भाषासेतु सूची",
    demoUser: "श्री रामाराव (डेमो)",
    menu: {
      home: "होम",
      tools: "उपकरण",
      guide: "उपयोग विधि",
      install: "ऐप प्राप्त करें",
      about: "के बारे में & डेवलपर",
    },
    tools: {
      sectionBadge: "चार मुख्य स्तंभ • CORE TOOLS",
      sectionHeading: "बुजुर्गों के लिए सरल डिजिटल साधन",
      sectionSub: "भारतीय संस्कृति और आधुनिक तकनीक का एक सहज संगम:",
      toolLabel: "साधन",
      t1Title: "आवाज से अनुवाद (Voice Transcript)",
      t1Desc: "अपनी मातृभाषा में बोलें, तुरंत सुंदर अंग्रेजी संदेश में बदलें।",
      t2Title: "सरल व्याख्या और वाचन (Translate & Read)",
      t2Desc: "कठिन बैंक मैसेज और नोटिस को सरल हिंदी में समझें और सुनें।",
      t3Title: "धोखाधड़ी से सुरक्षा (Scam Shield)",
      t3Desc: "फर्जी संदेशों और फिशिंग लिंक की तुरंत जांच कर सचेत करता है।",
      t4Title: "रसीद व पर्ची स्कैन (Slip Scanner)",
      t4Desc: "बिजली बिल या डॉक्टर की पर्ची की तस्वीर से मुख्य जानकारी जानें।",
      openBtn: "उपयोग करें",
    },
    assistant: {
      title: "भाषासेतु सहायक",
      sub: "आपकी सेवा में सदैव तत्पर",
      slowVoice: "धीमी आवाज (0.75x)",
      normalVoice: "सामान्य (1.0x)",
      tab1: "आवाज",
      tab2: "अनुवाद",
      tab3: "सुरक्षा",
      tab4: "पर्ची स्कैन",
      startSpeak: "बोलने के लिए दबाएं",
      listening: "सुन रहा हूँ... बोलिए...",
      stopSpeak: "पूर्ण हुआ",
      speechUnsupported: "ब्राउज़र में वॉयस सपोर्ट उपलब्ध नहीं है। कृपया नीचे दिए गए उदाहरण चुनें।",
      casualEnglish: "अनौपचारिक अंग्रेजी (WhatsApp के लिए):",
      formalEnglish: "कार्यालयी अंग्रेजी (ईमेल/ऑफिस):",
      copyBtn: "कॉपी करें",
      copiedBtn: "कॉपी हो गया!",
      whatsappBtn: "व्हाट्सएप पर भेजें",
      inputPromptText: "संदेश या बैंक एसएमएस यहाँ दर्ज करें:",
      explainBtn: "सरल भाषा में समझाएं",
      explainingBtn: "विश्लेषण हो रहा है...",
      nativeExplanation: "सरल व्याख्या:",
      listenAudio: "सुनें",
      stopAudio: "रोकें",
      checkScamBtn: "सुरक्षा जांचें",
      scamDanger: "चेतावनी: यह संदेश धोखाधड़ी (Scam) हो सकता है!",
      scamSafe: "सुरक्षित: यह एक सामान्य सुरक्षित संदेश प्रतीत होता है।",
      scanDocBtn: "स्कैन करें और समझें",
      billAmount: "भुगतान राशि:",
      dueDate: "अंतिम तिथि:",
      actionTip: "आपको क्या करना है:",
    },
    guide: {
      badge: "अति सरल विधि",
      title: "इसका उपयोग कैसे करें?",
      step1Title: "1. सिक्के पर स्पर्श करें",
      step1Desc: "स्क्रीन के नीचे दाईं ओर मौजूद भाषासेतु सिक्के को दबाएं।",
      step2Title: "2. बोलें या संदेश पेस्ट करें",
      step2Desc: "अपनी भाषा में बोलें या आया हुआ अंग्रेजी एसएमएस यहाँ डालें।",
      step3Title: "3. सुनें और सुरक्षित रहें",
      step3Desc: "मधुर आवाज में पूरी बात समझें और आवश्यक कदम उठाएं।",
    },
    install: {
      title: "भाषासेतु वेबसाइट कैसे खोलें?",
      desc: "यह वेबसाइट है, मोबाइल ऐप या browser extension नहीं। इसे आसानी से खोलने के लिए bookmark करें।",
      btnText: "वेबसाइट सहायता",
    },
  },
  ta: {
    name: "தமிழ்",
    code: "ta-IN",
    nativeName: "தமிழ்",
    tagline: "பெரியவர்களுக்கான எளிய டிஜிட்டல் பாலம்",
    missionQuote:
      "ஆங்கிலம் அறியாத நமது பெற்றோருக்கு முழுமையான டிஜிட்டல் சுதந்திரம் மற்றும் பாதுகாப்பு வழங்கும் முயற்சி.",
    drawerTitle: "பாஷாசேது வழிகாட்டி",
    demoUser: "திரு. ராமாராவ் (டெமோ)",
    menu: {
      home: "முகப்பு",
      tools: "கருவிகள்",
      guide: "பயன்படுத்துவது எப்படி",
      install: "செயலி பெறுக",
      about: "பற்றி & உருவாக்குநர்",
    },
    tools: {
      sectionBadge: "நான்கு முக்கிய தூண்கள் • CORE TOOLS",
      sectionHeading: "முதியோருக்கான எளிய டிஜிட்டல் கருவிகள்",
      sectionSub: "பாரம்பரிய பாணியில் மிக எளிதாக இயங்கும் தொழில்நுட்பம்:",
      toolLabel: "கருவி",
      t1Title: "குரல் வழி தட்டச்சு (Voice Transcript)",
      t1Desc: "உங்கள் தாய்மொழியில் பேசுங்கள், அழகான ஆங்கில செய்தியாக மாறும்.",
      t2Title: "படித்து விளக்குதல் (Translate & Read)",
      t2Desc: "ஆங்கில கடிதங்கள் மற்றும் வங்கி செய்திகளை எளிய தமிழில் விளக்கி வாசிக்கும்.",
      t3Title: "மோசடி தடுப்புக் கவசம் (Scam Shield)",
      t3Desc: "போலி செய்திகள் மற்றும் மோசடி இணைப்புகளைக் கண்டறிந்து எச்சரிக்கும்.",
      t4Title: "ரசீது & சீட்டு ஸ்கேனர் (Slip Scanner)",
      t4Desc: "மின்சார ரசீது அல்லது மருத்துவ சீட்டின் முக்கிய விவரங்களை எளிதாகக் கூறும்.",
      openBtn: "பயன்படுத்துக",
    },
    assistant: {
      title: "பாஷாசேது உதவியாளர்",
      sub: "உங்களுக்கு உதவ எப்போதும் தயார்",
      slowVoice: "பொறுமையாகக் கேட்க (0.75x)",
      normalVoice: "வழக்கமான வேகம் (1.0x)",
      tab1: "குரல்",
      tab2: "மொழிபெயர்ப்பு",
      tab3: "பாதுகாப்பு",
      tab4: "சீட்டு ஸ்கேன்",
      startSpeak: "பேச அழுத்தவும்",
      listening: "கேட்கிறது... பேசுங்கள்...",
      stopSpeak: "முடிந்தது",
      speechUnsupported: "உங்கள் உலாவியில் குரல் ஆதரவு இல்லை. மாதிரி வாக்கியங்களைப் பயன்படுத்தவும்.",
      casualEnglish: "நட்பான ஆங்கிலம் (WhatsApp-க்கு):",
      formalEnglish: "அலுவலக ஆங்கிலம் (Office/Email):",
      copyBtn: "நகலெடு",
      copiedBtn: "நகலெடுக்கப்பட்டது!",
      whatsappBtn: "WhatsApp-ல் அனுப்புக",
      inputPromptText: "ஆங்கில செய்தி அல்லது வங்கி தகவலை இங்கே உள்ளிடவும்:",
      explainBtn: "விளக்கி கூறுக",
      explainingBtn: "ஆராய்கிறது...",
      nativeExplanation: "எளிய விளக்கம்:",
      listenAudio: "கேளுங்கள்",
      stopAudio: "நிறுத்து",
      checkScamBtn: "பாதுகாப்பை சோதிக்க",
      scamDanger: "எச்சரிக்கை: இது மோசடி செய்தியாக இருக்க வாய்ப்புள்ளது!",
      scamSafe: "பாதுகாப்பானது: இது வழக்கமான முறையான செய்தி.",
      scanDocBtn: "ஸ்கேன் செய்து விளக்கு",
      billAmount: "செலுத்த வேண்டிய தொகை:",
      dueDate: "கடைசி தேதி:",
      actionTip: "நீங்கள் செய்ய வேண்டியது:",
    },
    guide: {
      badge: "மிக எளிய முறை",
      title: "எவ்வாறு பயன்படுத்துவது?",
      step1Title: "1. நாணயத்தைத் தொடவும்",
      step1Desc: "திரையின் கீழே வலதுபுறம் உள்ள வட்ட நாணயத்தைத் தொடவும்.",
      step2Title: "2. பேசுங்கள் அல்லது செய்தியை இடுங்கள்",
      step2Desc: "உங்கள் மொழியில் பேசுங்கள் அல்லது குழப்பமான ஆங்கில செய்தியை உள்ளிடவும்.",
      step3Title: "3. கேட்டுப் புரிந்து பகிருங்கள்",
      step3Desc: "தெளிவான குரலில் விளக்கம் கேட்டுப் பயமின்றி பாதுகாப்பாகப் பகிருங்கள்.",
    },
    install: {
      title: "பாஷாசேது இணையதளத்தை எப்படி திறப்பது?",
      desc: "இது ஒரு இணையதளம்; செயலி அல்லது browser extension அல்ல. மீண்டும் திறக்க browser-ல் bookmark செய்யுங்கள்.",
      btnText: "இணையதள உதவி",
    },
  },
  kn: {
    name: "ಕನ್ನಡ",
    code: "kn-IN",
    nativeName: "ಕನ್ನಡ",
    tagline: "ಹಿರಿಯರಿಗಾಗಿ ಡಿಜಿಟಲ್ ಸೇತು",
    missionQuote:
      "ನಮ್ಮ ಪೋಷಕರಿಗೆ ಭಾಷೆಯ ಅಡೆತಡೆಯಿಲ್ಲದೆ ಸ್ವಾವಲಂಬನೆ ಮತ್ತು ಸುರಕ್ಷತೆ ಒದಗಿಸುವ ಸಾರ್ಥಕ ಪ್ರಯತ್ನ.",
    drawerTitle: "ಭಾಷಾಸೇತು ಸೂಚಿ",
    demoUser: "ಶ್ರೀ ರಾಮರಾವ್ (ಡೆಮೋ)",
    menu: {
      home: "ಮುಖಪುಟ",
      tools: "ಉಪಕರಣಗಳು",
      guide: "ಬಳಸುವುದು ಹೇಗೆ",
      install: "ಆ್ಯಪ್ ಪಡೆಯಿರಿ",
      about: "ಬಗ್ಗೆ & ಡೆವಲಪರ್",
    },
    tools: {
      sectionBadge: "ನಾಲ್ಕು ಪ್ರಮುಖ ಸ್ತಂಭಗಳು • CORE TOOLS",
      sectionHeading: "ಹಿರಿಯರಿಗೆ ನೆರವಾಗುವ ಸಾಧನಗಳು",
      sectionSub: "ಸರಳ ಮತ್ತು ಸುಲಭವಾಗಿ ಬಳಸಬಹುದಾದ ತಾಂತ್ರಿಕ ಉಪಕರಣಗಳು:",
      toolLabel: "ಸಾಧನ",
      t1Title: "ಧ್ವನಿ ಬರೆವಣಿಗೆ (Voice Transcript)",
      t1Desc: "ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ಮಾತನಾಡಿ, ತಕ್ಷಣ ಇಂಗ್ಲಿಷ್ ಸಂದೇಶವಾಗಿ ಪರಿವರ್ತಿಸಿ.",
      t2Title: "ಅರ್ಥವಿವರಣೆ ಮತ್ತು ವಾಚನ (Translate & Read)",
      t2Desc: "ಇಂಗ್ಲಿಷ್ ಪತ್ರಗಳು, ಬ್ಯಾಂಕ್ ಮೆಸೇಜ್‌ಗಳನ್ನು ಸರಳ ಕನ್ನಡದಲ್ಲಿ ಓದಿ ಹೇಳುತ್ತದೆ.",
      t3Title: "ವಂಚನೆ ತಡೆ ರಕ್ಷಾ ಕವಚ (Scam Shield)",
      t3Desc: "ನಕಲಿ ಕರೆ, ಮೋಸದ ಲಿಂಕ್‌ಗಳನ್ನು ಗುರುತಿಸಿ ಮುಂಚಿತವಾಗಿ ಎಚ್ಚರಿಸುತ್ತದೆ.",
      t4Title: "ರಸೀದಿ ಸ್ಕ್ಯಾನರ್ (Slip Scanner)",
      t4Desc: "ಕರೆಂಟ್ ಬಿಲ್ ಅಥವಾ ಔಷಧಿ ಚೀಟಿಯ ವಿವರಗಳನ್ನು ಸರಳವಾಗಿ ತಿಳಿಸುತ್ತದೆ.",
      openBtn: "ಬಳಸಿ",
    },
    assistant: {
      title: "ಭಾಷಾಸೇತು ಸಹಾಯಕ",
      sub: "ನಿಮ್ಮ ಸೇವೆಗೆ ಸದಾ ಸಿದ್ಧ",
      slowVoice: "ನಿಧಾನವಾಗಿ ಆಲಿಸಿ (0.75x)",
      normalVoice: "ಸಾಮಾನ್ಯ (1.0x)",
      tab1: "ಧ್ವನಿ",
      tab2: "ಅನುವಾದ",
      tab3: "ರಕ್ಷಣೆ",
      tab4: "ಚೀಟಿ ಸ್ಕ್ಯಾನ್",
      startSpeak: "ಮಾತನಾಡಲು ಒತ್ತಿ",
      listening: "ಕೇಳಿಸಿಕೊಳ್ಳುತ್ತಿದ್ದೇನೆ... ಮಾತನಾಡಿ...",
      stopSpeak: "ಮುಗಿಯಿತು",
      speechUnsupported: "ನಿಮ್ಮ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಧ್ವನಿ ಸೌಲಭ್ಯವಿಲ್ಲ. ಕೆಳಗಿನ ಉದಾಹರಣೆಗಳನ್ನು ಬಳಸಿ.",
      casualEnglish: "ಸಾಮಾನ್ಯ ಇಂಗ್ಲಿಷ್ (WhatsApp ಗಾಗಿ):",
      formalEnglish: "ಕಚೇರಿ ಇಂಗ್ಲಿಷ್ (Office/Email):",
      copyBtn: "ಕಾಪಿ ಮಾಡಿ",
      copiedBtn: "ಕಾಪಿ ಆಯಿತು!",
      whatsappBtn: "WhatsApp ನಲ್ಲಿ ಕಳುಹಿಸಿ",
      inputPromptText: "ಇಂಗ್ಲಿಷ್ ಸಂದೇಶ ಅಥವಾ ಬ್ಯಾಂಕ್ ಮೆಸೇಜ್ ಇಲ್ಲಿ ನಮೂದಿಸಿ:",
      explainBtn: "ಸರಳವಾಗಿ ವಿವರಿಸಿ",
      explainingBtn: "ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...",
      nativeExplanation: "ಸರಳ ವಿವರಣೆ:",
      listenAudio: "ಆಲಿಸಿ",
      stopAudio: "ನಿಲ್ಲಿಸಿ",
      checkScamBtn: "ಸುರಕ್ಷತೆ ಪರಿಶೀಲಿಸಿ",
      scamDanger: "ಎಚ್ಚರಿಕೆ: ಇದು ವಂಚನೆಯ (Scam) ಸಂದೇಶವಾಗಿರಬಹುದು!",
      scamSafe: "ಸುರಕ್ಷಿತ: ಇದು ಅಧಿಕೃತ ಸಾಮಾನ್ಯ ಸಂದೇಶದಂತಿದೆ.",
      scanDocBtn: "ಸ್ಕ್ಯಾನ್ ಮಾಡಿ ತಿಳಿಸಿ",
      billAmount: "ಪಾವತಿಸಬೇಕಾದ ಮೊತ್ತ:",
      dueDate: "ಕೊನೆಯ ದಿನಾಂಕ:",
      actionTip: "ನೀವು ಮಾಡಬೇಕಾದುದು:",
    },
    guide: {
      badge: "ಅತ್ಯಂತ ಸುಲಭ",
      title: "ಬಳಸುವುದು ಹೇಗೆ?",
      step1Title: "1. ನಾಣ್ಯದ ಮೇಲೆ ಒತ್ತಿ",
      step1Desc: "ಸ್ಕ್ರೀನ್ ಕೆಳಗೆ ಬಲಭಾಗದಲ್ಲಿರುವ ಭಾಷಾಸೇತು ನಾಣ್ಯವನ್ನು ಒತ್ತಿ.",
      step2Title: "2. ಮಾತನಾಡಿ ಅಥವಾ ಸಂದೇಶ ಹಾಕಿ",
      step2Desc: "ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ಮಾತನಾಡಿ ಅಥವಾ ಇಂಗ್ಲಿಷ್ ಸಂದೇಶವನ್ನು ನಮೂದಿಸಿ.",
      step3Title: "3. ಆಲಿಸಿ ಮತ್ತು ಸುರಕ್ಷಿತವಾಗಿರಿ",
      step3Desc: "ಸ್ಪಷ್ಟ ಧ್ವನಿಯಲ್ಲಿ ಅರ್ಥ ತಿಳಿದುಕೊಂಡು ನಿರಾತಂಕವಾಗಿ ಕಳುಹಿಸಿ.",
    },
    install: {
      title: "ಭಾಷಾಸೇತು ವೆಬ್‌ಸೈಟ್ ತೆರೆಯುವುದು ಹೇಗೆ?",
      desc: "ಇದು ವೆಬ್‌ಸೈಟ್; ಮೊಬೈಲ್ ಆ್ಯಪ್ ಅಥವಾ browser extension ಅಲ್ಲ. ಮತ್ತೆ ತೆರೆಯಲು bookmark ಮಾಡಿ.",
      btnText: "ವೆಬ್‌ಸೈಟ್ ಸಹಾಯ",
    },
  },
  ml: {
    name: "മലയാളം",
    code: "ml-IN",
    nativeName: "മലയാളം",
    tagline: "മുതിർന്നവർക്കായി ഒരു ഡിജിറ്റൽ പാലം",
    missionQuote:
      "ഇംഗ്ലീഷ് ഭാഷാ തടസ്സങ്ങൾ മറികടന്ന് നമ്മുടെ മാതാപിതാക്കൾക്ക് സുരക്ഷിതത്വം ഉറപ്പാക്കുന്നു.",
    drawerTitle: "ഭാഷാസേതു വിവരണം",
    demoUser: "രാമറാവു സാർ (ഡെമോ)",
    menu: {
      home: "ഹോം",
      tools: "ഉപകരണങ്ങൾ",
      guide: "ഉപയോഗിക്കേണ്ട വിധം",
      install: "ആപ്പ് നേടൂ",
      about: "കുറിച്ച് & ഡെവലപ്പർ",
    },
    tools: {
      sectionBadge: "നാല് പ്രധാന സ്തംഭങ്ങൾ • CORE TOOLS",
      sectionHeading: "മുതിർന്നവർക്കായുള്ള ലളിത ഉപകരണങ്ങൾ",
      sectionSub: "ഏറ്റവും എളുപ്പത്തിൽ ഉപയോഗിക്കാവുന്ന ഡിജിറ്റൽ സംവിധാനങ്ങൾ:",
      toolLabel: "ഉപകരണം",
      t1Title: "ശബ്ദ സന്ദേശം (Voice Transcript)",
      t1Desc: "മാതൃഭാഷയിൽ സംസാരിക്കൂ, ലളിതമായ ഇംഗ്ലീഷ് സന്ദേശമായി മാറും.",
      t2Title: "ലളിതമായ വിശദീകരണം (Translate & Read)",
      t2Desc: "ഇംഗ്ലീഷ് മെസ്സേജുകളും ബാങ്ക് വിവരങ്ങളും മലയാളത്തിൽ വായിച്ചു കേൾപ്പിക്കുന്നു.",
      t3Title: "തട്ടിപ്പ് തടയൽ കവചം (Scam Shield)",
      t3Desc: "വ്യാജ ലോട്ടറി, തട്ടിപ്പ് ലിങ്കുകൾ എന്നിവ കണ്ടെത്തി മുന്നറിയിപ്പ് നൽകുന്നു.",
      t4Title: "രസീത് സ്കാനർ (Slip Scanner)",
      t4Desc: "വൈദ്യുതി ബിൽ, കുറിപ്പടികൾ എന്നിവയിലെ വിവരങ്ങൾ ലളിതമായി പറഞ്ഞുതരുന്നു.",
      openBtn: "തുടങ്ങുക",
    },
    assistant: {
      title: "ഭാഷാസേതു സഹായി",
      sub: "നിങ്ങളെ സഹായിക്കാൻ സദാ സന്നദ്ധം",
      slowVoice: "പതുക്കെ കേൾക്കുക (0.75x)",
      normalVoice: "സാധാരണ (1.0x)",
      tab1: "ശബ്ദം",
      tab2: "വിവർത്തനം",
      tab3: "സുരക്ഷ",
      tab4: "രസീത് സ്കാൻ",
      startSpeak: "സംസാരിക്കാൻ അമർത്തുക",
      listening: "കേൾക്കുന്നു... പറയൂ...",
      stopSpeak: "പൂർത്തിയായി",
      speechUnsupported: "ബ്രൗസറിൽ വോയ്‌സ് ലഭ്യമല്ല. മാതൃകകൾ പരീക്ഷിക്കൂ.",
      casualEnglish: "സാധാരണ ഇംഗ്ലീഷ് (WhatsApp-നായി):",
      formalEnglish: "ഔദ്യോഗിക ഇംഗ്ലീഷ് (Office/Email):",
      copyBtn: "പകർത്തുക",
      copiedBtn: "പകർത്തി!",
      whatsappBtn: "WhatsApp-ൽ അയക്കുക",
      inputPromptText: "ഇംഗ്ലീഷ് സന്ദേശമോ നോട്ടീസോ ഇവിടെ ചേർക്കുക:",
      explainBtn: "ലളിതമായി വിശദീകരിക്കുക",
      explainingBtn: "വിശകലനം ചെയ്യുന്നു...",
      nativeExplanation: "ലളിതമായ അർത്ഥം:",
      listenAudio: "കേൾക്കുക",
      stopAudio: "നിർത്തുക",
      checkScamBtn: "സുരക്ഷ പരിശോധിക്കുക",
      scamDanger: "മുന്നറിയിപ്പ്: ഇതൊരു വ്യാജ സന്ദേശമാകാൻ സാധ്യതയുണ്ട്!",
      scamSafe: "സുരക്ഷിതം: ഇത് സാധാരണ സുരക്ഷിത സന്ദേശമാണ്.",
      scanDocBtn: "സ്കാൻ ചെയ്തു മനസ്സിലാക്കുക",
      billAmount: "അടയ്ക്കാനുള്ള തുക:",
      dueDate: "അവസാന തീയതി:",
      actionTip: "നിങ്ങൾ ചെയ്യേണ്ടത്:",
    },
    guide: {
      badge: "വളരെ എളുപ്പം",
      title: "എങ്ങനെ ഉപയോഗിക്കാം?",
      step1Title: "1. നാണയത്തിൽ തൊടുക",
      step1Desc: "സ്ക്രീനിൻ്റെ താഴെ വലതുഭാഗത്തുള്ള നാണയ രൂപത്തിലുള്ള ഐക്കണിൽ തൊടുക.",
      step2Title: "2. സംസാരിക്കുക അല്ലെങ്കിൽ ചേർക്കുക",
      step2Desc: "നിങ്ങളുടെ ഭാഷയിൽ സംസാരിക്കുകയോ സന്ദേശം പേസ്റ്റ് ചെയ്യുകയോ ചെയ്യുക.",
      step3Title: "3. കേട്ടു മനസ്സിലാക്കുക",
      step3Desc: "വ്യക്തമായ ശബ്ദത്തിൽ കാര്യം മനസ്സിലാക്കി സുരക്ഷിതമായി അയക്കുക.",
    },
    install: {
      title: "ഭാഷാസേതു വെബ്‌സൈറ്റ് എങ്ങനെ തുറക്കാം?",
      desc: "ഇത് ഒരു വെബ്‌സൈറ്റാണ്; മൊബൈൽ ആപ്പോ browser extension-ഓ അല്ല. എളുപ്പത്തിൽ വീണ്ടും തുറക്കാൻ bookmark ചെയ്യൂ.",
      btnText: "വെബ്‌സൈറ്റ് സഹായം",
    },
  },
  mr: {
    name: "मराठी",
    code: "mr-IN",
    nativeName: "मराठी",
    tagline: "ज्येष्ठांसाठी डिजिटल सेतू",
    missionQuote:
      "आपल्या पालकांना इंग्रजी भाषेच्या अडथळ्यांवर मात करून स्वावलंबी व सुरक्षित बनवणारा सोबती.",
    drawerTitle: "भाषासेतू मार्गदर्शक",
    demoUser: "श्री रामाराव (डेमो)",
    menu: {
      home: "मुख्यपृष्ठ",
      tools: "साधने",
      guide: "कसे वापरावे",
      install: "अ‍ॅप मिळवा",
      about: "बद्दल & डेव्हलपर",
    },
    tools: {
      sectionBadge: "चार मुख्य आधार • CORE TOOLS",
      sectionHeading: "ज्येष्ठांसाठी उपयुक्त साधने",
      sectionSub: "अतिशय सोप्या आणि पारंपारिक पद्धतीने काम करणारी प्रणाली:",
      toolLabel: "साधन",
      t1Title: "आवाज टंकलेखन (Voice Transcript)",
      t1Desc: "तुमच्या भाषेत बोला, लगेच अचूक इंग्रजी संदेश तयार होईल.",
      t2Title: "सोपा अर्थ व वाचन (Translate & Read)",
      t2Desc: "इंग्रजी संदेश आणि बँक सूचना सोप्या मराठीत ऐका आणि समजून घ्या.",
      t3Title: "फसवणूक संरक्षण कवच (Scam Shield)",
      t3Desc: "संशयास्पद एसएमएस आणि बनावट लिंक ओळखून त्वरित सतर्क करते.",
      t4Title: "पावती व बिल स्कॅनर (Slip Scanner)",
      t4Desc: "लाईट बिल किंवा डॉक्टरांच्या चिठ्ठीतील महत्त्वाची माहिती समजून घ्या.",
      openBtn: "वापरा",
    },
    assistant: {
      title: "भाषासेतू सहाय्यक",
      sub: "आपल्या सेवेत सदैव तत्पर",
      slowVoice: "हळू आवाजात ऐका (0.75x)",
      normalVoice: "सामान्य (1.0x)",
      tab1: "आवाज",
      tab2: "अनुवाद",
      tab3: "संरक्षण",
      tab4: "पावती स्कॅन",
      startSpeak: "बोलण्यासाठी दाबा",
      listening: "ऐकत आहे... बोला...",
      stopSpeak: "पूर्ण झाले",
      speechUnsupported: "ब्राउझरमध्ये व्हॉइस सपोर्ट नाही. खालील उदाहरणे वापरा.",
      casualEnglish: "सामान्य इंग्रजी (WhatsApp साठी):",
      formalEnglish: "कार्यालयीन इंग्रजी (Office/Email):",
      copyBtn: "कॉपी करा",
      copiedBtn: "कॉपी झाले!",
      whatsappBtn: "WhatsApp वर पाठवा",
      inputPromptText: "इंग्रजी संदेश किंवा बँक एसएमएस इथे पेस्ट करा:",
      explainBtn: "सोप्या भाषेत सांगा",
      explainingBtn: "विश्लेषण सुरू आहे...",
      nativeExplanation: "सोपा अर्थ:",
      listenAudio: "ऐका",
      stopAudio: "थांबवा",
      checkScamBtn: "सुरक्षा तपासा",
      scamDanger: "धोका: हा फसवणूक (Scam) करणारा संदेश असू शकतो!",
      scamSafe: "सुरक्षित: हा एक सामान्य अधिकृत संदेश वाटतो.",
      scanDocBtn: "स्कॅन करून माहिती घ्या",
      billAmount: "भरावयाची रक्कम:",
      dueDate: "अंतिम तारीख:",
      actionTip: "तुम्हाला काय करायचे आहे:",
    },
    guide: {
      badge: "अतिशय सोपे",
      title: "वापर कसा करावा?",
      step1Title: "१. नाण्यावर स्पर्श करा",
      step1Desc: "स्क्रीनच्या खाली उजव्या बाजूला असलेल्या भाषासेतू नाण्याला स्पर्श करा.",
      step2Title: "२. बोला किंवा संदेश टाका",
      step2Desc: "तुमच्या भाषेत बोला किंवा आलेला इंग्रजी संदेश पेस्ट करा.",
      step3Title: "३. ऐका आणि सुरक्षित राहा",
      step3Desc: "स्पष्ट आवाजात ऐकून समजून घ्या आणि आत्मविश्वासाने संदेश पाठवा.",
    },
    install: {
      title: "भाषासेतू वेबसाइट कशी उघडावी?",
      desc: "ही वेबसाइट आहे; mobile app किंवा browser extension नाही. पुन्हा उघडण्यासाठी bookmark करा.",
      btnText: "वेबसाइट मदत",
    },
  },
  bn: {
    name: "বাংলা",
    code: "bn-IN",
    nativeName: "বাংলা",
    tagline: "প্রবীণদের জন্য ডিজিটাল সেতু",
    missionQuote:
      "ইংরেজি না জানা অভিভাবকদের জন্য ডিজিটাল স্বাধীনতা ও সাইবার সুরক্ষার একটি বিশ্বস্ত মাধ্যম।",
    drawerTitle: "ভাষা সেতু সূচক",
    demoUser: "শ্রী রামারাও (ডেমো)",
    menu: {
      home: "হোম",
      tools: "টুলস",
      guide: "ব্যবহারবিধি",
      install: "অ্যাপ পান",
      about: "সম্পর্কে & বিকাশকারী",
    },
    tools: {
      sectionBadge: "চারটি মূল স্তম্ভ • CORE TOOLS",
      sectionHeading: "প্রবীণদের জন্য সহজ ডিজিটাল মাধ্যম",
      sectionSub: "ঐতিহ্য ও প্রযুক্তির মেলবন্ধনে তৈরি সহায়ক উপাদান:",
      toolLabel: "টুল",
      t1Title: "ভয়েস টাইপিং (Voice Transcript)",
      t1Desc: "নিজের মাতৃভাষায় কথা বলুন, নিমিষেই সুন্দর ইংরেজি বার্তায় রূপান্তরিত হবে।",
      t2Title: "সহজ ব্যাখ্যা ও পাঠ (Translate & Read)",
      t2Desc: "কঠিন ইংরেজি চিঠি ও ব্যাংকের মেসেজ সহজ বাংলায় শুনে বুঝে নিন।",
      t3Title: "প্রতারণা প্রতিরোধ কবচ (Scam Shield)",
      t3Desc: "ভুয়ো বার্তা এবং প্রতারণামূলক লিংক শনাক্ত করে সতর্ক করে।",
      t4Title: "রসিদ ও স্লিপ স্ক্যানার (Slip Scanner)",
      t4Desc: "বিদ্যুৎ বিল বা প্রেসক্রিপশনের ছবি তুলে মূল বিষয় সহজে শুনুন।",
      openBtn: "ব্যবহার করুন",
    },
    assistant: {
      title: "ভাষা সেতু সহায়ক",
      sub: "আপনার সেবায় সর্বদা প্রস্তুত",
      slowVoice: "ধীরে শুনুন (0.75x)",
      normalVoice: "স্বাভাবিক (1.0x)",
      tab1: "কণ্ঠস্বর",
      tab2: "অনুবাদ",
      tab3: "সুরক্ষা",
      tab4: "স্লিপ স্ক্যান",
      startSpeak: "বলতে চাপুন",
      listening: "শুনছি... বলুন...",
      stopSpeak: "সম্পন্ন হয়েছে",
      speechUnsupported: "ব্রাউজারে ভয়েস সাপোর্ট নেই। নিচের উদাহরণগুলো পরীক্ষা করুন।",
      casualEnglish: "সাধারণ ইংরেজি (WhatsApp-এর জন্য):",
      formalEnglish: "দাপ্তরিক ইংরেজি (Office/Email):",
      copyBtn: "কপি করুন",
      copiedBtn: "কপি হয়েছে!",
      whatsappBtn: "WhatsApp-এ পাঠান",
      inputPromptText: "ইংরেজি বার্তা বা নোটিশ এখানে লিখুন:",
      explainBtn: "সহজে ব্যাখ্যা করুন",
      explainingBtn: "বিশ্লেষণ হচ্ছে...",
      nativeExplanation: "সহজ ব্যাখ্যা:",
      listenAudio: "শুনুন",
      stopAudio: "থামান",
      checkScamBtn: "সুরক্ষা পরীক্ষা করুন",
      scamDanger: "সতর্কতা: এটি প্রতারণামূলক (Scam) বার্তা হতে পারে!",
      scamSafe: "নিরাপদ: এটি একটি স্বাভাবিক নিরাপদ বার্তা বলে মনে হচ্ছে।",
      scanDocBtn: "স্ক্যান করে শুনুন",
      billAmount: "পরিশোধের পরিমাণ:",
      dueDate: "শেষ তারিখ:",
      actionTip: "আপনার করণীয়:",
    },
    guide: {
      badge: "অত্যন্ত সহজ",
      title: "কীভাবে ব্যবহার করবেন?",
      step1Title: "১. মুদ্রায় স্পর্শ করুন",
      step1Desc: "স্ক্রিনের নিচে ডানদিকে থাকা গোলাকার মুদ্রায় স্পর্শ করুন।",
      step2Title: "২. বলুন বা পেস্ট করুন",
      step2Desc: "আপনার ভাষায় কথা বলুন বা ইংরেজি বার্তাটি এখানে দিন।",
      step3Title: "৩. শুনুন ও সুরক্ষিত থাকুন",
      step3Desc: "মধুর কণ্ঠে বিষয়টি বুঝে নিয়ে নিরাপদে উত্তর পাঠান।",
    },
    install: {
      title: "ভাষাসেতু ওয়েবসাইট কীভাবে খুলবেন?",
      desc: "এটি একটি ওয়েবসাইট, মোবাইল অ্যাপ বা browser extension নয়। সহজে খুলতে browser-এ bookmark করুন।",
      btnText: "ওয়েবসাইট সহায়তা",
    },
  },
};

// Preset testing data for instant demonstration without typing or speaking
const SETUP_COPY = {
  te: {
    languageQuestion: "మీ మాతృభాష ఏది?",
    languageSub: "మీకు అత్యంత సౌకర్యంగా అనిపించే భాషను ఎంచుకోండి.",
    helpQuestion: "మీకు ఏ విషయంలో సహాయం కావాలి?",
    helpSub: "ఒక ఎంపికను ఎంచుకోండి. దీన్ని తర్వాత మార్చుకోవచ్చు.",
    understand: "ఆంగ్ల సందేశాలను అర్థం చేసుకోవడంలో నాకు ఇబ్బంది ఉంది.",
    translate: "నా భాషలోని సందేశాలను ఆంగ్లంలోకి అనువదించాలనుకుంటున్నాను.",
    both: "ఈ రెండింటిలోనూ నాకు సహాయం కావాలి.",
    all: "అన్ని సదుపాయాలను చూడాలనుకుంటున్నాను.",
    back: "భాషను మళ్లీ ఎంచుకోండి", continue: "కొనసాగించండి", done: "పూర్తయింది", changePreference: "సహాయం ఎంపికను మార్చండి",
  },
  en: {
    languageQuestion: "What is your native language?",
    languageSub: "Choose the language you are most comfortable with.",
    helpQuestion: "What would you like help with?",
    helpSub: "Choose one option. You can change this later.",
    understand: "I have difficulty understanding English messages.",
    translate: "I want to translate messages from my language into English.",
    both: "I need help with both.", all: "I want to explore all features.",
    back: "Back to language choices", continue: "Continue", done: "Done", changePreference: "Change my help preference",
  },
  hi: {
    languageQuestion: "आपकी मातृभाषा क्या है?", languageSub: "वह भाषा चुनें जिसमें आप सबसे सहज हैं।",
    helpQuestion: "आपको किस काम में मदद चाहिए?", helpSub: "एक विकल्प चुनें। आप इसे बाद में बदल सकते हैं।",
    understand: "मुझे अंग्रेज़ी संदेश समझने में कठिनाई होती है।", translate: "मैं अपनी भाषा के संदेशों का अंग्रेज़ी में अनुवाद चाहता/चाहती हूँ।",
    both: "मुझे दोनों कामों में मदद चाहिए।", all: "मैं सभी सुविधाएँ देखना चाहता/चाहती हूँ।",
    back: "भाषा चुनने के लिए वापस जाएँ", continue: "आगे बढ़ें", done: "हो गया", changePreference: "मदद की पसंद बदलें",
  },
  ta: {
    languageQuestion: "உங்கள் தாய்மொழி எது?", languageSub: "உங்களுக்கு மிகவும் வசதியான மொழியைத் தேர்ந்தெடுக்கவும்.",
    helpQuestion: "எதில் உங்களுக்கு உதவி வேண்டும்?", helpSub: "ஒரு விருப்பத்தைத் தேர்ந்தெடுக்கவும். இதை பின்னர் மாற்றலாம்.",
    understand: "ஆங்கிலச் செய்திகளைப் புரிந்துகொள்வதில் எனக்குச் சிரமம் உள்ளது.", translate: "என் மொழிச் செய்திகளை ஆங்கிலத்தில் மொழிபெயர்க்க விரும்புகிறேன்.",
    both: "இரண்டிலும் எனக்கு உதவி வேண்டும்.", all: "எல்லா வசதிகளையும் பார்க்க விரும்புகிறேன்.",
    back: "மொழித் தேர்வுக்குத் திரும்பு", continue: "தொடரவும்", done: "முடிந்தது", changePreference: "உதவி விருப்பத்தை மாற்று",
  },
  kn: {
    languageQuestion: "ನಿಮ್ಮ ಮಾತೃಭಾಷೆ ಯಾವುದು?", languageSub: "ನಿಮಗೆ ಹೆಚ್ಚು ಅನುಕೂಲವಾದ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
    helpQuestion: "ನಿಮಗೆ ಯಾವ ವಿಷಯದಲ್ಲಿ ಸಹಾಯ ಬೇಕು?", helpSub: "ಒಂದು ಆಯ್ಕೆಯನ್ನು ಆರಿಸಿ. ಇದನ್ನು ನಂತರ ಬದಲಾಯಿಸಬಹುದು.",
    understand: "ಇಂಗ್ಲಿಷ್ ಸಂದೇಶಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ನನಗೆ ಕಷ್ಟವಾಗುತ್ತದೆ.", translate: "ನನ್ನ ಭಾಷೆಯ ಸಂದೇಶಗಳನ್ನು ಇಂಗ್ಲಿಷ್‌ಗೆ ಅನುವಾದಿಸಲು ಬಯಸುತ್ತೇನೆ.",
    both: "ಈ ಎರಡರಲ್ಲೂ ನನಗೆ ಸಹಾಯ ಬೇಕು.", all: "ಎಲ್ಲಾ ಸೌಲಭ್ಯಗಳನ್ನು ನೋಡಲು ಬಯಸುತ್ತೇನೆ.",
    back: "ಭಾಷೆಯ ಆಯ್ಕೆಗೆ ಹಿಂತಿರುಗಿ", continue: "ಮುಂದುವರಿಸಿ", done: "ಮುಗಿದಿದೆ", changePreference: "ಸಹಾಯದ ಆಯ್ಕೆಯನ್ನು ಬದಲಿಸಿ",
  },
  ml: {
    languageQuestion: "നിങ്ങളുടെ മാതൃഭാഷ ഏതാണ്?", languageSub: "നിങ്ങൾക്ക് ഏറ്റവും സൗകര്യമുള്ള ഭാഷ തിരഞ്ഞെടുക്കുക.",
    helpQuestion: "ഏത് കാര്യത്തിലാണ് സഹായം വേണ്ടത്?", helpSub: "ഒരു ഓപ്ഷൻ തിരഞ്ഞെടുക്കുക. പിന്നീട് മാറ്റാം.",
    understand: "ഇംഗ്ലീഷ് സന്ദേശങ്ങൾ മനസ്സിലാക്കാൻ എനിക്ക് ബുദ്ധിമുട്ടുണ്ട്.", translate: "എന്റെ ഭാഷയിലെ സന്ദേശങ്ങൾ ഇംഗ്ലീഷിലേക്ക് വിവർത്തനം ചെയ്യണം.",
    both: "രണ്ടിലും എനിക്ക് സഹായം വേണം.", all: "എല്ലാ സൗകര്യങ്ങളും കാണണം.",
    back: "ഭാഷ തിരഞ്ഞെടുക്കാൻ മടങ്ങുക", continue: "തുടരുക", done: "പൂർത്തിയായി", changePreference: "സഹായത്തിനുള്ള ഇഷ്ടം മാറ്റുക",
  },
  mr: {
    languageQuestion: "तुमची मातृभाषा कोणती?", languageSub: "तुम्हाला सर्वात सोयीची वाटणारी भाषा निवडा.",
    helpQuestion: "तुम्हाला कोणत्या बाबतीत मदत हवी आहे?", helpSub: "एक पर्याय निवडा. तुम्ही तो नंतर बदलू शकता.",
    understand: "मला इंग्रजी संदेश समजण्यात अडचण येते.", translate: "माझ्या भाषेतील संदेशांचे इंग्रजीत भाषांतर हवे आहे.",
    both: "मला दोन्ही बाबतीत मदत हवी आहे.", all: "मला सर्व सुविधा पाहायच्या आहेत.",
    back: "भाषा निवडीकडे परत जा", continue: "पुढे चला", done: "झाले", changePreference: "मदतीची पसंती बदला",
  },
  bn: {
    languageQuestion: "আপনার মাতৃভাষা কী?", languageSub: "আপনার কাছে সবচেয়ে স্বাচ্ছন্দ্যকর ভাষাটি বেছে নিন।",
    helpQuestion: "কোন বিষয়ে আপনার সাহায্য দরকার?", helpSub: "একটি বিকল্প বেছে নিন। পরে এটি বদলানো যাবে।",
    understand: "ইংরেজি বার্তা বুঝতে আমার অসুবিধা হয়।", translate: "আমার ভাষার বার্তা ইংরেজিতে অনুবাদ করতে চাই।",
    both: "দুটো বিষয়েই আমার সাহায্য দরকার।", all: "আমি সব সুবিধা দেখতে চাই।",
    back: "ভাষা বেছে নিতে ফিরে যান", continue: "এগিয়ে যান", done: "সম্পন্ন", changePreference: "সাহায্যের পছন্দ বদলান",
  },
};

const SAMPLE_PRESETS = {
  voice: [
    {
      te: "రేపు ఉదయం 10 గంటలకి బస్ స్టాండ్ దగ్గర కలుద్దాం, టికెట్ తీసుకుంటారా?",
      en_casual: "Let's meet tomorrow morning at 10 AM near the bus stand. Will you book the tickets?",
      en_formal: "Kindly be advised that we shall convene near the bus station tomorrow at 10:00 AM. Please confirm if you will procure the tickets.",
    },
    {
      te: "బాబూ, ఈ నెల కరెంట్ బిల్లు కట్టేశాను, రసీదు వాట్సాప్ చేశాను చూడు.",
      en_casual: "Son, I have paid this month's electricity bill and sent the receipt on WhatsApp. Please check.",
      en_formal: "I have successfully settled this month's electricity utility bill. The payment confirmation receipt has been transmitted via WhatsApp.",
    },
  ],
  messages: [
    {
      type: "scam",
      text: "URGENT: SBI Customer Alert! Your account will be BLOCKED within 24 hrs due to missing PAN verification. Click here immediately to update: http://sbi-kyc-verify-alert.xyz/pan",
      te: "హెచ్చరిక: ఇది 100% నకిలీ మెసేజ్. మీ బ్యాంక్ ఎప్పుడూ ఇలాంటి లింకులు పంపదు. దయచేసి ఎటువంటి లింకును క్లిక్ చేయకండి, ఓటీపీ ఎవరికీ చెప్పకండి.",
      en: "WARNING: This is a fraudulent scam. Banks never ask for PAN card updates through suspicious web links. Do not click or provide OTP.",
      hi: "चेतावनी: यह संदेश पूरी तरह फर्जी है। बैंक कभी भी ऐसे संदिग्ध लिंक नहीं भेजता। किसी भी लिंक पर क्लिक न करें।",
      ta: "எச்சரிக்கை: இது போலி வங்கி செய்தி. வங்கி எப்போதும் இதுபோன்ற இணைப்புகளை அனுப்பாது. தயவுசெய்து எதையும் கிளிக் செய்யாதீர்கள்.",
      kn: "ಎಚ್ಚರಿಕೆ: ಇದು ನಕಲಿ ಸಂದೇಶ. ಬ್ಯಾಂಕ್ ಎಂದಿಗೂ ಇಂತಹ ಲಿಂಕ್ ಕಳುಹಿಸುವುದಿಲ್ಲ. ದಯವಿಟ್ಟು ಕ್ಲಿಕ್ ಮಾಡಬೇಡಿ.",
      ml: "മുന്നറിയിപ്പ്: ഇതൊരു വ്യാജ സന്ദേശമാണ്. ബാങ്ക് ഒരിക്കലും ഇത്തരം ലിങ്കുകൾ അയക്കില്ല. ക്ലിക്ക് ചെയ്യരുത്.",
      mr: "धोका: हा बनावट संदेश आहे. बँक कधीही अशा संशयास्पद लिंक्स पाठवत नाही. कृपया क्लिक करू नका.",
      bn: "সতর্কতা: এটি সম্পূর্ণ ভুয়ো বার্তা। ব্যাংক কখনোই এরকম লিংক পাঠায় না। ভুলেও লিংকে ক্লিক করবেন না।",
    },
    {
      type: "safe",
      text: "Dear Customer, INR 5,420.00 has been credited to your A/C ending in 4102 on 24-Oct-26 via NEFT from LIC of India. Available balance: INR 28,450.00.",
      te: "శుభవార్త: మీ ఖాతాలో ఎల్ఐసీ నుండి రూ. 5,420 జమ అయ్యాయి. మీ ఖాతాలో మొత్తం రూ. 28,450 నిల్వ ఉంది.",
      en: "Good news: INR 5,420 has been safely deposited into your account from LIC of India. Current balance is INR 28,450.",
      hi: "शुभ समाचार: आपके खाते में एलआईसी से ₹ 5,420 जमा हो गए हैं। वर्तमान शेष राशि ₹ 28,450 है।",
      ta: "நல்ல செய்தி: உங்கள் வங்கிக் கணக்கில் LIC நிறுவனத்திலிருந்து ரூ. 5,420 வரவு வைக்கப்பட்டுள்ளது. இருப்புத் தொகை ரூ. 28,450.",
      kn: "ಶುಭ ಸುದ್ದಿ: ನಿಮ್ಮ ಖಾತೆಗೆ ಎಲ್‌ಐಸಿಯಿಂದ ₹ 5,420 ಜಮಾ ಆಗಿದೆ. ನಿಮ್ಮ ಒಟ್ಟು ಬ್ಯಾಲೆನ್ಸ್ ₹ 28,450 ಆಗಿದೆ.",
      ml: "നല്ല വാർത്ത: നിങ്ങളുടെ അക്കൗണ്ടിൽ എൽഐസിയിൽ നിന്ന് 5,420 രൂപ ക്രെഡിറ്റ് ആയിട്ടുണ്ട്. ബാലൻസ് 28,450 രൂപയാണ്.",
      mr: "आनंदाची बातमी: आपल्या खात्यात एलआयसीकडून ₹ 5,420 जमा झाले आहेत. एकूण शिल्लक ₹ 28,450 आहे.",
      bn: "সুসংবাদ: আপনার অ্যাকাউন্টে এলআইসি থেকে ৫,৪২০ টাকা জমা হয়েছে। বর্তমান ব্যালেন্স ২৮,৪৫০ টাকা।",
    },
  ],
  slips: [
    {
      name: "TSSPDCL Electricity Bill (కరెంట్ బిల్లు)",
      amount: "₹ 1,480.00",
      due: "05-Nov-2026",
      desc_te: "ఇది మీ అక్టోబర్ నెల కరెంట్ బిల్లు. మొత్తం ₹ 1,480 నవంబర్ 5 లోపు చెల్లించాలి.",
      desc_en: "October Electricity Utility Bill. Total payable: ₹ 1,480 before 05-Nov-2026.",
      desc_hi: "यह अक्टूबर महीने का बिजली बिल है। ₹ 1,480 का भुगतान 5 नवंबर से पहले करना होगा।",
      desc_ta: "இது அக்டோபர் மாத மின்சார கட்டணம். ₹ 1,480 தொகையை நவம்பர் 5-க்குள் செலுத்த வேண்டும்.",
      desc_kn: "ಇದು ಅಕ್ಟೋಬರ್ ತಿಂಗಳ ಕರೆಂಟ್ ಬಿಲ್. ಒಟ್ಟು ₹ 1,480 ಮೊತ್ತವನ್ನು ನವೆಂಬರ್ 5 ರೊಳಗೆ ಪಾವತಿಸಬೇಕು.",
      desc_ml: "ഇത് ഒക്ടോബർ മാസത്തെ വൈദ്യുതി ബില്ലാണ്. നവംബർ 5-ന് മുമ്പ് 1,480 രൂപ അടയ്ക്കണം.",
      desc_mr: "हे ऑक्टोबर महिन्याचे वीज बिल आहे. ५ नोव्हेंबरपूर्वी ₹ १,४८० भरायचे आहेत.",
      desc_bn: "এটি অক্টোবর মাসের বিদ্যুৎ বিল। ৫ নভেম্বরের মধ্যে মোট ১,৪৮০ টাকা জমা দিতে হবে।",
    },
    {
      name: "Clinic Medicine Slip (డాక్టర్ చీటీ)",
      amount: "₹ 450.00 (మందుల ఖర్చు)",
      due: "5 Days Course (ఉదయం & రాత్రి)",
      desc_te: "డాక్టర్ రాసిన యాంటీబయాటిక్ మరియు జ్వరం మాత్రలు. భోజనం తర్వాత ఉదయం, రాత్రి 5 రోజులు వేసుకోవాలి.",
      desc_en: "Prescription slip for 5 days. Take tablets twice daily after meals.",
      desc_hi: "5 दिनों की दवा की पर्ची। भोजन के बाद सुबह और रात में गोलियां लेनी हैं।",
      desc_ta: "5 நாட்களுக்கான மருந்துச் சீட்டு. உணவுக்குப் பின் காலை மற்றும் இரவு மாத்திரைகளை உட்கொள்ளவும்.",
      desc_kn: "5 ದಿನಗಳ ಔಷಧ ಚೀಟಿ. ಊಟದ ನಂತರ ಬೆಳಿಗ್ಗೆ ಮತ್ತು ರಾತ್ರಿ ಮಾತ್ರೆ ತೆಗೆದುಕೊಳ್ಳಬೇಕು.",
      desc_ml: "5 ദിവസത്തേക്കുള്ള കുറിപ്പടി. ഭക്ഷണത്തിനു ശേഷം രാവിലെയും രാത്രിയും ഗുളിക കഴിക്കുക.",
      desc_mr: "५ दिवसांच्या औषधांची चिठ्ठी. जेवणानंतर सकाळी आणि संध्याकाळी गोळ्या घ्याव्यात.",
      desc_bn: "৫ দিনের ওষুধের প্রেসক্রিপশন। খাবার পরে সকালে ও রাতে ওষুধ খেতে হবে।",
    },
  ],
};

// Use the deployed API by default in production so the Vercel app still works
// when VITE_API_BASE_URL has not been added to the Vercel project settings.
const API_BASE = import.meta.env.VITE_API_BASE_URL || (import.meta.env.PROD ? "https://bhashasetu-uj95.onrender.com" : "");
const PREFERENCES_KEY = "bhashasetu.preferences";
const LOGIN_DISMISSED_KEY = "bhashasetu.loginPromptDismissedAt";
const FACT_LABELS = {
  te: { amount: "చెల్లించాల్సిన మొత్తం", date: "చివరి తేదీ", status: "చెల్లింపు స్థితి", actions: "మీరు చేయాల్సింది" },
  hi: { amount: "देय राशि", date: "अंतिम तिथि", status: "भुगतान की स्थिति", actions: "आपको क्या करना है" },
  ta: { amount: "செலுத்த வேண்டிய தொகை", date: "கடைசி தேதி", status: "கட்டண நிலை", actions: "நீங்கள் செய்ய வேண்டியது" },
  kn: { amount: "ಪಾವತಿಸಬೇಕಾದ ಮೊತ್ತ", date: "ಕೊನೆಯ ದಿನಾಂಕ", status: "ಪಾವತಿ ಸ್ಥಿತಿ", actions: "ನೀವು ಮಾಡಬೇಕಾದದ್ದು" },
  ml: { amount: "അടയ്ക്കേണ്ട തുക", date: "അവസാന തീയതി", status: "പണമടച്ച നില", actions: "നിങ്ങൾ ചെയ്യേണ്ടത്" },
  mr: { amount: "देय रक्कम", date: "अंतिम तारीख", status: "पेमेंट स्थिती", actions: "तुम्ही काय करावे" },
  bn: { amount: "দেওয়ার পরিমাণ", date: "শেষ তারিখ", status: "পেমেন্টের অবস্থা", actions: "আপনার করণীয়" },
  en: { amount: "Amount due", date: "Due date", status: "Payment status", actions: "What to do" },
};
const readPreferences = () => {
  try { return JSON.parse(localStorage.getItem(PREFERENCES_KEY) || "{}"); }
  catch { return {}; }
};
function savePreferences(patch) {
  try { localStorage.setItem(PREFERENCES_KEY, JSON.stringify({ ...readPreferences(), ...patch })); }
  catch { /* Preferences are optional when storage is unavailable. */ }
}
async function apiRequest(path, options = {}, timeoutMs = 120000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(`${API_BASE}/api/${path}`, { ...options, signal: controller.signal });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.detail || "The service could not complete that request.");
    return data;
  } catch (error) {
    if (error.name === "AbortError") throw new Error("This request took too long. Please try again.");
    if (error instanceof TypeError) throw new Error("Cannot reach BhashaSetu right now. Check that the backend is running and try again.");
    throw error;
  } finally { clearTimeout(timer); }
}
async function apiPost(path, body) {
  return apiRequest(path, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
}
async function apiAudio(path, body, signal) {
  const response = await fetch(`${API_BASE}/api/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal,
  });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.detail || "Speech could not be generated. Please try again.");
  }
  return response.blob();
}

export default function App() {
  // App States
  const [selectedLangKey, setSelectedLangKey] = useState(() => readPreferences().lang || "te");
  const [showLanguageModal, setShowLanguageModal] = useState(() => !readPreferences().setupComplete);
  const [isFirstSetup, setIsFirstSetup] = useState(() => !readPreferences().setupComplete);
  const [setupStep, setSetupStep] = useState("language");
  const [helpPreference, setHelpPreference] = useState(() => readPreferences().helpPreference || "all");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [installModalOpen, setInstallModalOpen] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [largeFont, setLargeFont] = useState(false);
  const [activeTab, setActiveTab] = useState("voice"); // 'voice' | 'translate' | 'scam' | 'slip'
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  // Audio Speech Rate State (Senior calm 0.75x vs Normal 1.0x)
  const [speechRate, setSpeechRate] = useState(() => readPreferences().speechRate || 0.75);

  // Tool 1: Voice Transcript State
  const [isListening, setIsListening] = useState(false);
  const [spokenTranscript, setSpokenTranscript] = useState("");
  const [casualResult, setCasualResult] = useState("");
  const [formalResult, setFormalResult] = useState("");
  const [copiedType, setCopiedType] = useState(null);
  const [voiceBusy, setVoiceBusy] = useState(false);

  // Tool 2: Translate & Read Aloud State
  const [inputEnglishText, setInputEnglishText] = useState("");
  const [translatedExplanation, setTranslatedExplanation] = useState("");
  const [translationFacts, setTranslationFacts] = useState(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Tool 3: Scam Shield State
  const [scamInput, setScamInput] = useState("");
  const [scamVerdict, setScamVerdict] = useState(null); // 'safe' | 'danger'
  const [scamExplanation, setScamExplanation] = useState("");

  // Tool 4: Physical Slip OCR State
  const [slipData, setSlipData] = useState(null);
  const [serviceError, setServiceError] = useState("");
  const [scanBusy, setScanBusy] = useState(false);
  const [scanDetails, setScanDetails] = useState(null);
  const [speechError, setSpeechError] = useState("");
  const [isTranscribingVoice, setIsTranscribingVoice] = useState(false);

  const recorderRef = useRef(null);
  const recordingStreamRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioRef = useRef(null);
  const audioUrlRef = useRef(null);
  const speechRequestRef = useRef(null);
  const previouslyFocusedRef = useRef(null);
  const activeLang = LANGUAGES[selectedLangKey] || LANGUAGES.te;

  useEffect(() => {
    savePreferences({ lang: selectedLangKey, highContrast, largeFont, speechRate, helpPreference });
  }, [selectedLangKey, highContrast, largeFont, speechRate, helpPreference]);

  useEffect(() => () => {
    speechRequestRef.current?.abort();
    audioRef.current?.pause();
    if (recorderRef.current?.state === "recording") {
      recorderRef.current.onstop = null;
      recorderRef.current.onerror = null;
      recorderRef.current.stop();
    }
    recordingStreamRef.current?.getTracks().forEach((track) => track.stop());
    if (audioUrlRef.current) URL.revokeObjectURL(audioUrlRef.current);
  }, []);

  useEffect(() => {
    if (showLanguageModal) return undefined;
    let timer;
    let remaining = 10000;
    let startedAt = 0;
    try {
      const dismissedAt = Number(localStorage.getItem(LOGIN_DISMISSED_KEY) || 0);
      if (dismissedAt && Date.now() - dismissedAt < 7 * 24 * 60 * 60 * 1000) return undefined;
    } catch { /* Continue without persisted dismissal. */ }
    const start = () => {
      if (document.visibilityState !== "visible" || remaining <= 0) return;
      startedAt = Date.now();
      timer = setTimeout(() => setLoginModalOpen(true), remaining);
    };
    const pause = () => {
      if (document.visibilityState === "hidden") {
        clearTimeout(timer);
        remaining = Math.max(0, remaining - (Date.now() - startedAt));
      } else start();
    };
    start();
    document.addEventListener("visibilitychange", pause);
    return () => { clearTimeout(timer); document.removeEventListener("visibilitychange", pause); };
  }, [showLanguageModal]);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key !== "Escape") return;
      if (loginModalOpen) dismissLoginPrompt();
      else if (isAssistantOpen) setIsAssistantOpen(false);
      else if (drawerOpen) setDrawerOpen(false);
      else if (installModalOpen) setInstallModalOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [loginModalOpen, isAssistantOpen, drawerOpen, installModalOpen]);

  useEffect(() => {
    const modalOpen = showLanguageModal || isAssistantOpen || loginModalOpen || installModalOpen;
    if (!modalOpen) return undefined;
    previouslyFocusedRef.current = document.activeElement;
    const getDialog = () => Array.from(document.querySelectorAll('[role="dialog"]')).at(-1);
    const focusFirst = requestAnimationFrame(() => getDialog()?.querySelector("button, input, textarea, select, a[href], [tabindex]:not([tabindex='-1'])")?.focus());
    const trapTab = (event) => {
      if (event.key !== "Tab") return;
      const dialog = getDialog();
      const controls = Array.from(dialog?.querySelectorAll("button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), a[href], [tabindex]:not([tabindex='-1'])") || []);
      if (!controls.length) { event.preventDefault(); return; }
      const first = controls[0]; const last = controls[controls.length - 1];
      if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", trapTab);
    return () => {
      cancelAnimationFrame(focusFirst);
      document.removeEventListener("keydown", trapTab);
      if (previouslyFocusedRef.current?.isConnected) previouslyFocusedRef.current.focus();
    };
  }, [showLanguageModal, isAssistantOpen, loginModalOpen, installModalOpen]);

  const transcribeVoiceRecording = async (blob, language) => {
    if (!blob.size) {
      setSpeechError("No audio was recorded. Please tap the microphone and try again.");
      return;
    }
    setIsTranscribingVoice(true);
    setSpeechError("");
    try {
      const form = new FormData();
      form.append("file", blob, `recording.${blob.type.includes("ogg") ? "ogg" : blob.type.includes("mp4") ? "mp4" : "webm"}`);
      const result = await apiRequest(`transcribe-audio?lang=${language}`, { method: "POST", body: form }, 120000);
      if (!result.text?.trim()) throw new Error("No speech was detected. Please try again or type your message.");
      setSpokenTranscript(result.text.trim());
      setCasualResult("");
      setFormalResult("");
    } catch (error) {
      setSpeechError(error.message || "Voice recognition could not complete. Please try again or type your message.");
    } finally {
      setIsTranscribingVoice(false);
    }
  };

  // Record locally, then transcribe through the backend instead of browser speech services.
  const toggleListening = async () => {
    if (recorderRef.current?.state === "recording") {
      recorderRef.current.stop();
      return;
    }
    if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
      setSpeechError("Microphone recording is not supported in this browser. Try current Chrome or Edge, or type your message.");
      return;
    }
    try {
      setSpeechError("");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      recordingStreamRef.current = stream;
      const mimeType = ["audio/webm;codecs=opus", "audio/ogg;codecs=opus", "audio/mp4"]
        .find((candidate) => MediaRecorder.isTypeSupported(candidate));
      const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
      audioChunksRef.current = [];
      recorder.ondataavailable = (event) => { if (event.data.size) audioChunksRef.current.push(event.data); };
      recorder.onerror = () => {
        stream.getTracks().forEach((track) => track.stop());
        recordingStreamRef.current = null;
        recorderRef.current = null;
        setIsListening(false);
        setSpeechError("The microphone recording failed. Check microphone access and try again, or type your message.");
      };
      recorder.onstop = () => {
        stream.getTracks().forEach((track) => track.stop());
        recordingStreamRef.current = null;
        recorderRef.current = null;
        setIsListening(false);
        const blob = new Blob(audioChunksRef.current, { type: recorder.mimeType || "audio/webm" });
        void transcribeVoiceRecording(blob, selectedLangKey);
      };
      recorderRef.current = recorder;
      recorder.start();
      setIsListening(true);
    } catch (error) {
      const detail = error.name === "NotAllowedError" || error.name === "SecurityError"
        ? "Microphone access is blocked. Allow microphone access for this site, then try again."
        : error.name === "NotFoundError"
          ? "No microphone was found. Connect a microphone or type your message."
          : "Could not start the microphone. Check microphone access and try again, or type your message.";
      setSpeechError(detail);
    }
  };

  // Convert voice to dual English representations
  const processVoiceToEnglish = async (text) => {
    if (!text.trim() || voiceBusy) return;
    setVoiceBusy(true);
    setServiceError("");
    try {
      const result = await apiPost("translate", { text, lang: selectedLangKey });
      setCasualResult(result.casual_english);
      setFormalResult(result.formal_english);
    } catch (error) { setServiceError(error.message); setCasualResult(""); setFormalResult(""); }
    finally { setVoiceBusy(false); }
  };

  // Generate speech on the backend so playback does not depend on device voice packs.
  const speakText = async (text, language = activeLang.code) => {
    if (isPlayingAudio) {
      speechRequestRef.current?.abort();
      audioRef.current?.pause();
      audioRef.current = null;
      if (audioUrlRef.current) URL.revokeObjectURL(audioUrlRef.current);
      audioUrlRef.current = null;
      window.speechSynthesis?.cancel();
      setIsPlayingAudio(false);
      return;
    }

    if (!text.trim()) return;
    setSpeechError("");
    const langKey = Object.entries(LANGUAGES).find(([, item]) => item.code.toLowerCase() === language.toLowerCase())?.[0]
      || (language.toLowerCase().startsWith("en") ? "en" : selectedLangKey);
    const controller = new AbortController();
    speechRequestRef.current = controller;
    setIsPlayingAudio(true);
    try {
      const audioBlob = await apiAudio("speech", { text, lang: langKey, rate: speechRate }, controller.signal);
      if (controller.signal.aborted) return;
      const audioUrl = URL.createObjectURL(audioBlob);
      audioUrlRef.current = audioUrl;
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      const finish = () => {
        if (audioUrlRef.current === audioUrl) {
          URL.revokeObjectURL(audioUrl);
          audioUrlRef.current = null;
          audioRef.current = null;
          setIsPlayingAudio(false);
        }
      };
      audio.onended = finish;
      audio.onerror = finish;
      await audio.play();
    } catch (error) {
      if (controller.signal.aborted) return;
      setIsPlayingAudio(false);
      setSpeechError(error.message || "Speech could not be generated. Please try again.");
    }
  };

  // Process English simplification
  const handleTranslateExplain = async () => {
    if (!inputEnglishText.trim() || isTranslating) return;
    setIsTranslating(true);
    setServiceError("");
    setTranslatedExplanation(""); setTranslationFacts(null);
    try {
      const result = await apiPost("explain-message", { text: inputEnglishText, lang: selectedLangKey });
      setTranslatedExplanation(result.explanation);
      setTranslationFacts(result);
    } catch (error) { setServiceError(error.message); }
    finally { setIsTranslating(false); }
  };

  // Check message for phishing / scams
  const handleCheckScam = async (overrideText) => {
    const textToCheck = overrideText || scamInput;
    if (!textToCheck.trim() || scanBusy) return;
    setScanDetails(null); setScamVerdict(null); setScamExplanation("");
    setServiceError(""); setScanBusy(true);
    try {
      const result = await apiPost("scam-check", { text: textToCheck, lang: selectedLangKey });
      setScanDetails(result);
      setScamVerdict(result.risk_level === "Low" ? "safe" : "danger");
      setScamExplanation(result.explanation); speakText(result.explanation);
    } catch (error) { setServiceError(error.message); }
    finally { setScanBusy(false); }
  };

  // Read a bill or prescription image through the backend OCR endpoint.
  const handleScanSlip = async (file) => {
    if (!file || scanBusy) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) { setServiceError("Choose a JPG, PNG, or WEBP image."); return; }
    if (file.size > 8 * 1024 * 1024) { setServiceError("The image must be 8 MB or smaller."); return; }
    setServiceError(""); setScanBusy(true);
    try {
      const form = new FormData(); form.append("file", file);
      const result = await apiRequest(`read-document?lang=${selectedLangKey}`, { method: "POST", body: form }, 150000);
      setSlipData({ name: result.document_type || file.name, amount: result.amount_due || "Not identified", due: result.due_date || "Not identified", description: result.explanation });
      speakText(result.explanation);
    } catch (error) { setServiceError(error.message); }
    finally { setScanBusy(false); }
  };

  // Copy to clipboard helper
  const handleCopy = (text, type) => {
    if (!navigator.clipboard?.writeText) { setServiceError("Clipboard access is not available. Please select and copy the text manually."); return; }
    navigator.clipboard.writeText(text).then(() => {
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2000);
    }).catch(() => setServiceError("Could not copy the text. Please select and copy it manually."));
  };

  const chooseLanguage = (key) => {
    setSelectedLangKey(key);
    savePreferences({ lang: key });
    if (isFirstSetup) setSetupStep("help");
    else setShowLanguageModal(false);
  };

  const finishSetup = (preference) => {
    setHelpPreference(preference);
    savePreferences({ lang: selectedLangKey, helpPreference: preference, setupComplete: true });
    setIsFirstSetup(false);
    setShowLanguageModal(false);
    if (preference === "understand") { setActiveTab("translate"); setIsAssistantOpen(true); }
    else if (preference === "translate") { setActiveTab("voice"); setIsAssistantOpen(true); }
    else if (preference === "both") { setActiveTab("translate"); setIsAssistantOpen(true); }
  };

  function dismissLoginPrompt() {
    setLoginModalOpen(false);
    try { localStorage.setItem(LOGIN_DISMISSED_KEY, String(Date.now())); } catch { /* Optional preference. */ }
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-200 font-serif ${
        highContrast
          ? "bg-black text-amber-400"
          : "bg-[#FDF8EE] text-[#3D2619] selection:bg-[#E8D3B9]"
      } ${highContrast ? "high-contrast" : ""} ${largeFont ? "elder-large-font" : ""} ${largeFont ? "text-lg" : "text-base"}`}
      style={{
        backgroundImage: highContrast
          ? "none"
          : "radial-gradient(#8B3A2B 0.5px, transparent 0.5px), radial-gradient(#8B3A2B 0.5px, #FDF8EE 0.5px)",
        backgroundSize: "24px 24px",
      }}
    >
      {/* ===================== 1. FIRST-LOAD LANGUAGE SELECT MODAL ===================== */}
      {showLanguageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div role="dialog" aria-modal="true" aria-labelledby="setup-title" className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border-4 border-[#8B3A2B] bg-[#FFFDF7] p-6 shadow-2xl">
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#8B3A2B] bg-[#F7EBD3] text-3xl font-bold text-[#8B3A2B]">
                భ
              </div>
              <h2 id="setup-title" className="text-2xl font-bold tracking-wide text-[#8B3A2B] sm:text-3xl">
                {setupStep === "language" ? SETUP_COPY[selectedLangKey].languageQuestion : SETUP_COPY[selectedLangKey].helpQuestion}
              </h2>
              <p className="mt-1 text-base text-[#6E4F3E]">
                {setupStep === "language" ? SETUP_COPY[selectedLangKey].languageSub : SETUP_COPY[selectedLangKey].helpSub}
              </p>
            </div>

            {setupStep === "language" ? <>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {Object.entries(LANGUAGES).map(([key, lang]) => (
                  <button key={key} onClick={() => chooseLanguage(key)} className={`group relative flex min-h-16 flex-col items-center justify-center rounded-xl border-2 p-3.5 text-base transition-colors hover:shadow-md focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-amber-600 ${selectedLangKey === key ? "border-[#8B3A2B] bg-[#F7EBD3] font-bold text-[#8B3A2B] shadow-inner" : "border-[#DDCBB5] bg-white text-[#4A3525] hover:border-[#8B3A2B]"}`}>
                    <span className="text-lg font-bold">{lang.nativeName}</span><span className="text-sm opacity-75">{lang.name}</span>
                  </button>
                ))}
              </div>
              {!isFirstSetup && <button className="mt-4 text-sm font-semibold text-[#8B3A2B] underline focus-visible:outline focus-visible:outline-2" onClick={() => setSetupStep("help")}>{SETUP_COPY[selectedLangKey].changePreference}</button>}
            </> : <div className="mt-6 grid gap-3">
              {[
                ["understand", SETUP_COPY[selectedLangKey].understand],
                ["translate", SETUP_COPY[selectedLangKey].translate],
                ["both", SETUP_COPY[selectedLangKey].both],
                ["all", SETUP_COPY[selectedLangKey].all],
              ].map(([value, label]) => <button key={value} onClick={() => finishSetup(value)} className="min-h-14 rounded-xl border-2 border-[#DDCBB5] bg-white px-4 py-3 text-left text-base font-semibold text-[#4A3525] hover:border-[#8B3A2B] hover:bg-[#F7EBD3] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-amber-600">{label}</button>)}
              <button onClick={() => setSetupStep("language")} className="min-h-12 text-base font-semibold text-[#8B3A2B] underline focus-visible:outline focus-visible:outline-2">{SETUP_COPY[selectedLangKey].back}</button>
            </div>}

            {setupStep === "language" && <div className="mt-6 text-center"><button onClick={() => isFirstSetup ? setSetupStep("help") : setShowLanguageModal(false)} className="w-full rounded-xl bg-[#8B3A2B] py-3 text-base font-semibold text-white shadow-md hover:bg-[#722F22] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-amber-600">{isFirstSetup ? SETUP_COPY[selectedLangKey].continue : SETUP_COPY[selectedLangKey].done}</button></div>}
          </div>
        </div>
      )}

      {/* ===================== 2. HEADER & DRAWER NAVIGATION ===================== */}
      <header className="sticky top-0 z-30 border-b-2 border-[#8B3A2B]/40 bg-[#FFFDF7]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-3 sm:px-6">
          {/* Left: Hamburger Menu */}
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation menu"
              className="min-h-11 min-w-11 rounded-lg border border-[#8B3A2B]/50 p-2 text-[#8B3A2B] hover:bg-[#F4E6D2] focus-visible:outline focus-visible:outline-2"
              title="Menu"
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* App Brand */}
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#8B3A2B] text-lg font-bold text-amber-100 shadow-sm">
                  {selectedLangKey === "te" ? "భ" : "B"}
                </span>
                <h1 className="text-lg font-bold tracking-wide text-[#8B3A2B] sm:text-2xl">
                  BhashaSetu
                </h1>
              </div>
              <p className="hidden text-xs text-[#7B5B47] sm:block">
                {activeLang.tagline}
              </p>
            </div>
          </div>

          {/* Right: Senior Accessibility & Profile Controls */}
          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            {/* Language Switcher Button */}
            <button
              onClick={() => { setIsFirstSetup(false); setSetupStep("language"); setShowLanguageModal(true); }}
              aria-label={`Change language. Current language: ${activeLang.name}`}
              className="flex items-center gap-1 rounded-lg border border-[#8B3A2B]/60 bg-[#F7EBD3] px-1.5 py-1.5 text-xs font-semibold text-[#8B3A2B] hover:bg-[#EEDBBF] sm:gap-1.5 sm:px-2.5"
            >
              <Globe className="h-3.5 w-3.5" />
              <span>{activeLang.nativeName}</span>
              <ChevronDown className="h-3 w-3" />
            </button>

            {/* A+ Text Scale Toggle */}
            <button
              onClick={() => setLargeFont(!largeFont)}
              aria-label={largeFont ? "Turn off larger text" : "Turn on larger text"}
              aria-pressed={largeFont}
              className={`rounded-lg border px-2 py-1 text-xs font-bold ${
                largeFont
                  ? "border-[#8B3A2B] bg-[#8B3A2B] text-white"
                  : "border-[#8B3A2B]/50 text-[#8B3A2B] hover:bg-[#F4E6D2]"
              }`}
              title="Font Size Toggle"
            >
              A+
            </button>

            {/* High Contrast Toggle */}
            <button
              onClick={() => setHighContrast(!highContrast)}
              aria-label={highContrast ? "Turn off high contrast" : "Turn on high contrast"}
              aria-pressed={highContrast}
              className={`rounded-lg border p-1.5 ${
                highContrast
                  ? "border-amber-400 bg-amber-400 text-black"
                  : "border-[#8B3A2B]/50 text-[#8B3A2B] hover:bg-[#F4E6D2]"
              }`}
              title="High Contrast Mode"
            >
              <Sparkles className="h-4 w-4" />
            </button>

            {/* Login / Profile Button */}
            <button
              onClick={() => setLoginModalOpen(true)}
              aria-label="Account information; sign-in is not available yet"
              className="hidden items-center gap-1 rounded-lg border border-[#8B3A2B] bg-[#8B3A2B] px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-[#722F22] sm:flex"
            >
              <User className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">ఖాతా / Login</span>
            </button>
          </div>
        </div>
      </header>

      {/* Slide-out Hamburger Menu Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="relative z-50 flex h-full w-72 flex-col border-r-4 border-[#8B3A2B] bg-[#FFFDF7] p-5 shadow-2xl">
            <div className="flex items-center justify-between border-b-2 border-[#8B3A2B]/30 pb-4">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#8B3A2B] text-sm font-bold text-amber-100">
                  భ
                </span>
                <span className="font-bold text-[#8B3A2B]">
                  {activeLang.drawerTitle}
                </span>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="text-[#8B3A2B] hover:bg-[#F4E6D2] rounded-md p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="mt-5 flex-1 space-y-2">
              <a
                href="#hero"
                onClick={() => setDrawerOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-[#F7EBD3]"
              >
                ❧ {activeLang.menu.home}
              </a>
              <a
                href="#tools"
                onClick={() => setDrawerOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-[#F7EBD3]"
              >
                ❧ {activeLang.menu.tools}
              </a>
              <a
                href="#guide"
                onClick={() => setDrawerOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-[#F7EBD3]"
              >
                ❧ {activeLang.menu.guide}
              </a>
              <a
                href="#install"
                onClick={() => setDrawerOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-[#F7EBD3]"
              >
                ❧ {activeLang.menu.install}
              </a>
              <a
                href="#about"
                onClick={() => setDrawerOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-[#F7EBD3]"
              >
                ❧ {activeLang.menu.about}
              </a>
              <button
                onClick={() => { setDrawerOpen(false); setLoginModalOpen(true); }}
                aria-label="Account information; sign-in is not available yet"
                className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium hover:bg-[#F7EBD3] sm:hidden"
              >
                ❧ ఖాతా సమాచారం / Login information
              </button>
            </nav>

            <div className="border-t border-[#8B3A2B]/30 pt-4 text-xs text-[#6E4F3E]">
              <p className="font-semibold text-[#8B3A2B]">{activeLang.demoUser}</p>
              <p className="mt-1">Designed by Badugu Vennela (CSE-1, 2nd Year)</p>
            </div>
          </div>
        </div>
      )}

      {/* ===================== 3. HERO SECTION ===================== */}
      <section id="hero" className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="relative rounded-3xl border-4 border-[#8B3A2B] bg-[#FFFDF7] p-6 text-center shadow-xl sm:p-10">
          <div className="absolute left-3 top-2 text-2xl text-[#8B3A2B]/50">❧</div>
          <div className="absolute right-3 top-2 text-2xl text-[#8B3A2B]/50">☙</div>
          <div className="absolute bottom-2 left-3 text-2xl text-[#8B3A2B]/50">☙</div>
          <div className="absolute bottom-2 right-3 text-2xl text-[#8B3A2B]/50">❧</div>

          {/* Central Medallion */}
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-4 border-[#8B3A2B] bg-[#F7EBD3] text-5xl font-bold text-[#8B3A2B] shadow-inner sm:h-28 sm:w-28 sm:text-6xl">
            {selectedLangKey === "te" ? "భ" : "B"}
          </div>

          <h2 className="mt-4 text-2xl font-bold tracking-wide text-[#8B3A2B] sm:text-4xl">
            భాషాసేతు • BhashaSetu
          </h2>
          <p className="mt-1 text-sm font-medium text-[#A64B2A] sm:text-base">
            {activeLang.tagline}
          </p>

          <blockquote className="mx-auto mt-4 max-w-2xl rounded-xl border-y-2 border-[#8B3A2B]/30 bg-[#FAF1E3] py-3 px-4 italic text-[#5C3D2E]">
            "{activeLang.missionQuote}"
          </blockquote>

          {/* Quick Triggers */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => {
                setIsAssistantOpen(true);
                setActiveTab("voice");
              }}
              className="flex items-center gap-2 rounded-xl border-2 border-[#8B3A2B] bg-[#8B3A2B] px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-[#722F22]"
            >
              <Mic className="h-4 w-4" />
              <span>{activeLang.tools.t1Title}</span>
            </button>
            <button
              onClick={() => {
                setIsAssistantOpen(true);
                setActiveTab("scam");
              }}
              className="flex items-center gap-2 rounded-xl border-2 border-[#8B3A2B] bg-[#F7EBD3] px-5 py-2.5 text-sm font-bold text-[#8B3A2B] shadow-md hover:bg-[#EEDBBF]"
            >
              <ShieldAlert className="h-4 w-4" />
              <span>{activeLang.tools.t3Title}</span>
            </button>
          </div>
        </div>
      </section>

      {/* ===================== 4. FEATURES & CORE TOOLS GRID ===================== */}
      <section id="tools" className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="text-center">
          <span className="rounded-full border border-[#8B3A2B]/40 bg-[#F7EBD3] px-3 py-1 text-xs font-bold text-[#8B3A2B]">
            {activeLang.tools.sectionBadge}
          </span>
          <h3 className="mt-2 text-2xl font-bold text-[#8B3A2B] sm:text-3xl">
            {activeLang.tools.sectionHeading}
          </h3>
          <p className="mt-1 text-sm text-[#6E4F3E]">
            {activeLang.tools.sectionSub}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Tool 1 */}
          <div className="flex flex-col justify-between rounded-2xl border-2 border-[#8B3A2B]/60 bg-[#FFFDF7] p-5 shadow-md hover:border-[#8B3A2B]">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F7EBD3] text-[#8B3A2B]">
                <Mic className="h-6 w-6" />
              </div>
              <span className="mt-3 block text-xs font-bold uppercase tracking-wider text-[#A64B2A]">
                {activeLang.tools.toolLabel} 1
              </span>
              <h4 className="mt-1 text-lg font-bold text-[#8B3A2B]">
                {activeLang.tools.t1Title}
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-[#5C3D2E]">
                {activeLang.tools.t1Desc}
              </p>
            </div>
            <button
              onClick={() => {
                setIsAssistantOpen(true);
                setActiveTab("voice");
              }}
              className="mt-4 flex items-center justify-center gap-1 rounded-lg border border-[#8B3A2B] bg-[#FAF1E3] py-2 text-xs font-bold text-[#8B3A2B] hover:bg-[#8B3A2B] hover:text-white"
            >
              <span>{activeLang.tools.openBtn}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Tool 2 */}
          <div className="flex flex-col justify-between rounded-2xl border-2 border-[#8B3A2B]/60 bg-[#FFFDF7] p-5 shadow-md hover:border-[#8B3A2B]">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F7EBD3] text-[#8B3A2B]">
                <Volume2 className="h-6 w-6" />
              </div>
              <span className="mt-3 block text-xs font-bold uppercase tracking-wider text-[#A64B2A]">
                {activeLang.tools.toolLabel} 2
              </span>
              <h4 className="mt-1 text-lg font-bold text-[#8B3A2B]">
                {activeLang.tools.t2Title}
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-[#5C3D2E]">
                {activeLang.tools.t2Desc}
              </p>
            </div>
            <button
              onClick={() => {
                setIsAssistantOpen(true);
                setActiveTab("translate");
              }}
              className="mt-4 flex items-center justify-center gap-1 rounded-lg border border-[#8B3A2B] bg-[#FAF1E3] py-2 text-xs font-bold text-[#8B3A2B] hover:bg-[#8B3A2B] hover:text-white"
            >
              <span>{activeLang.tools.openBtn}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Tool 3 */}
          <div className="flex flex-col justify-between rounded-2xl border-2 border-[#8B3A2B]/60 bg-[#FFFDF7] p-5 shadow-md hover:border-[#8B3A2B]">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F7EBD3] text-[#8B3A2B]">
                <ShieldAlert className="h-6 w-6" />
              </div>
              <span className="mt-3 block text-xs font-bold uppercase tracking-wider text-[#A64B2A]">
                {activeLang.tools.toolLabel} 3
              </span>
              <h4 className="mt-1 text-lg font-bold text-[#8B3A2B]">
                {activeLang.tools.t3Title}
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-[#5C3D2E]">
                {activeLang.tools.t3Desc}
              </p>
            </div>
            <button
              onClick={() => {
                setIsAssistantOpen(true);
                setActiveTab("scam");
              }}
              className="mt-4 flex items-center justify-center gap-1 rounded-lg border border-[#8B3A2B] bg-[#FAF1E3] py-2 text-xs font-bold text-[#8B3A2B] hover:bg-[#8B3A2B] hover:text-white"
            >
              <span>{activeLang.tools.openBtn}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Tool 4 */}
          <div className="flex flex-col justify-between rounded-2xl border-2 border-[#8B3A2B]/60 bg-[#FFFDF7] p-5 shadow-md hover:border-[#8B3A2B]">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F7EBD3] text-[#8B3A2B]">
                <Camera className="h-6 w-6" />
              </div>
              <span className="mt-3 block text-xs font-bold uppercase tracking-wider text-[#A64B2A]">
                {activeLang.tools.toolLabel} 4
              </span>
              <h4 className="mt-1 text-lg font-bold text-[#8B3A2B]">
                {activeLang.tools.t4Title}
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-[#5C3D2E]">
                {activeLang.tools.t4Desc}
              </p>
            </div>
            <button
              onClick={() => {
                setIsAssistantOpen(true);
                setActiveTab("slip");
              }}
              className="mt-4 flex items-center justify-center gap-1 rounded-lg border border-[#8B3A2B] bg-[#FAF1E3] py-2 text-xs font-bold text-[#8B3A2B] hover:bg-[#8B3A2B] hover:text-white"
            >
              <span>{activeLang.tools.openBtn}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ===================== 5. INSTALL ACTION SECTION ===================== */}
      <section id="install" className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <div className="rounded-2xl border-2 border-[#8B3A2B] bg-[#F7EBD3] p-6 text-center shadow-lg">
          <h3 className="text-xl font-bold text-[#8B3A2B] sm:text-2xl">
            {activeLang.install.title}
          </h3>
          <p className="mt-1 text-xs text-[#6E4F3E] sm:text-sm">
            {activeLang.install.desc}
          </p>
          <button
            onClick={() => setInstallModalOpen(true)}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#8B3A2B] px-6 py-2.5 text-sm font-bold text-white shadow hover:bg-[#722F22]"
          >
            <Download className="h-4 w-4" />
            <span>{activeLang.install.btnText}</span>
          </button>
        </div>
      </section>

      {/* ===================== 6. USAGE GUIDE SECTION ===================== */}
      <section id="guide" className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="text-center">
          <span className="rounded-full border border-[#8B3A2B]/40 bg-[#F7EBD3] px-3 py-1 text-xs font-bold text-[#8B3A2B]">
            {activeLang.guide.badge}
          </span>
          <h3 className="mt-2 text-2xl font-bold text-[#8B3A2B]">
            {activeLang.guide.title}
          </h3>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border-2 border-[#8B3A2B]/40 bg-[#FFFDF7] p-5 shadow-sm">
            <h4 className="text-base font-bold text-[#8B3A2B]">
              {activeLang.guide.step1Title}
            </h4>
            <p className="mt-2 text-xs leading-relaxed text-[#5C3D2E]">
              {activeLang.guide.step1Desc}
            </p>
          </div>

          <div className="rounded-2xl border-2 border-[#8B3A2B]/40 bg-[#FFFDF7] p-5 shadow-sm">
            <h4 className="text-base font-bold text-[#8B3A2B]">
              {activeLang.guide.step2Title}
            </h4>
            <p className="mt-2 text-xs leading-relaxed text-[#5C3D2E]">
              {activeLang.guide.step2Desc}
            </p>
          </div>

          <div className="rounded-2xl border-2 border-[#8B3A2B]/40 bg-[#FFFDF7] p-5 shadow-sm">
            <h4 className="text-base font-bold text-[#8B3A2B]">
              {activeLang.guide.step3Title}
            </h4>
            <p className="mt-2 text-xs leading-relaxed text-[#5C3D2E]">
              {activeLang.guide.step3Desc}
            </p>
          </div>
        </div>
      </section>

      {/* ===================== 7. ABOUT BHASHASETU & DEVELOPER PROFILE ===================== */}
      <section id="about" className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="relative rounded-3xl border-4 border-[#8B3A2B] bg-[#FFFDF7] p-6 shadow-xl sm:p-10">
          <div className="absolute left-3 top-2 text-2xl text-[#8B3A2B]/50">❧</div>
          <div className="absolute right-3 top-2 text-2xl text-[#8B3A2B]/50">☙</div>

          {/* Section Heading */}
          <div className="text-center">
            <span className="rounded-full border border-[#8B3A2B]/40 bg-[#F7EBD3] px-3 py-1 text-xs font-bold text-[#8B3A2B]">
              సంకల్పం & పరిచయం • PROJECT & DEVELOPER
            </span>
            <h3 className="mt-3 text-2xl font-bold text-[#8B3A2B] sm:text-3xl">
              BhashaSetu — Breaking Language Barriers, Building Digital Safety
            </h3>
            <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-[#5C3D2E] sm:text-base">
              BhashaSetu is a multilingual digital safety assistant designed to help elderly people understand digital messages, bank alerts, bills, and potentially fraudulent communications in their preferred language. It aims to make digital technology more accessible by simplifying complicated messages, explaining potential risks in familiar language, and helping users make informed decisions.
            </p>
          </div>

          {/* Key Features Status (Implemented vs Planned) */}
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Working Implemented Features */}
            <div className="rounded-2xl border-2 border-[#8B3A2B]/50 bg-[#FAF1E3] p-5">
              <div className="flex items-center gap-2 border-b border-[#8B3A2B]/30 pb-2">
                <Check className="h-5 w-5 text-emerald-800" />
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#8B3A2B]">
                  Currently Implemented & Working Features
                </h4>
              </div>
              <ul className="mt-3 space-y-2 text-xs leading-relaxed text-[#3D2619]">
                <li className="flex items-start gap-2">
                  <span className="text-[#8B3A2B] font-bold">•</span>
                  <span><strong>Multilingual Translation:</strong> 8 regional Indian languages with direct dual casual WhatsApp and formal English outputs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8B3A2B] font-bold">•</span>
                  <span><strong>Suspicious Message Analysis:</strong> Instant threat assessment for phishing keywords, lottery traps, and KYC blocking threats.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8B3A2B] font-bold">•</span>
                  <span><strong>Senior-Friendly Accessibility:</strong> Large readable text mode (A+), High-Contrast pure black/amber mode, and traditional zero-clutter Bapu aesthetic.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8B3A2B] font-bold">•</span>
                  <span><strong>Voice Input & Text-to-Speech:</strong> Record speech in the browser for backend transcription, and use backend-generated multilingual audio to read the complete translation and action items.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8B3A2B] font-bold">•</span>
                  <span><strong>AI-Powered Physical Slip OCR:</strong> Reads supported bill and prescription images through the Gemini backend and extracts clearly legible details.</span>
                </li>
              </ul>
            </div>

            {/* Planned Enhancements */}
            <div className="rounded-2xl border-2 border-dashed border-[#8B3A2B]/40 bg-[#FFFDF7] p-5">
              <div className="flex items-center gap-2 border-b border-[#8B3A2B]/30 pb-2">
                <Sparkles className="h-5 w-5 text-amber-700" />
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#8B3A2B]">
                  Architectural Roadmap (Planned Features)
                </h4>
              </div>
              <ul className="mt-3 space-y-2 text-xs leading-relaxed text-[#6E4F3E]">
                <li className="flex items-start gap-2">
                  <span className="text-[#8B3A2B] font-bold">◦</span>
                  <span><strong>Direct Mobile Accessibility Service:</strong> Floating system-wide Android bubble for live inspection across WhatsApp and banking apps.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8B3A2B] font-bold">◦</span>
                  <span><strong>Live Camera Scanning:</strong> Capture and crop a bill or prescription directly from the device camera before Gemini image reading.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8B3A2B] font-bold">◦</span>
                  <span><strong>Consent-Based Family Safety Alerts:</strong> Secure family contact management and alert records after authentication and per-user access controls are added; optional verified WhatsApp delivery can follow.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Developer Profile Card */}
          <div className="mt-8 rounded-2xl border-2 border-[#8B3A2B] bg-[#F7EBD3] p-5 sm:p-6 shadow-md">
            <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-[#8B3A2B] bg-[#8B3A2B] text-2xl font-bold text-amber-100 shadow">
                  BV
                </div>
                <div>
                  <div className="inline-block rounded-full bg-[#8B3A2B]/10 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-[#8B3A2B]">
                    Solo Developer Project
                  </div>
                  <h4 className="text-xl font-bold text-[#8B3A2B]">Badugu Vennela</h4>
                  <p className="text-xs font-semibold text-[#6E4F3E]">
                    KL University, Vaddeswaram • CSE-1 · 2nd Year
                  </p>
                </div>
              </div>

              {/* External Profile Links */}
              <div className="flex flex-wrap justify-center gap-2.5">
                <a
                  href="https://github.com/vennela821"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-[#8B3A2B] bg-[#FFFDF7] px-3.5 py-2 text-xs font-bold text-[#8B3A2B] shadow-sm transition hover:bg-[#8B3A2B] hover:text-white"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>GitHub</span>
                  <ExternalLink className="h-3 w-3 opacity-70" />
                </a>

                <a
                  href="https://www.linkedin.com/in/vennela-badugu-b9388936a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-[#8B3A2B] bg-[#8B3A2B] px-3.5 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-[#722F22]"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>LinkedIn</span>
                  <ExternalLink className="h-3 w-3 opacity-70" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== 8. FOOTER & CREDITS ===================== */}
      <footer id="footer" className="mt-8 border-t-2 border-[#8B3A2B]/40 bg-[#FAF1E3] py-8 text-center">
        <div className="mx-auto max-w-4xl px-4 space-y-2">
          <p className="text-sm font-bold text-[#8B3A2B]">
            Designed & Developed by Badugu Vennela
          </p>
          <p className="text-xs font-medium text-[#6E4F3E]">
            KL University, Vaddeswaram | CSE-1 | 2nd Year
          </p>
          <p className="text-xs font-semibold text-[#8B3A2B]/80 tracking-wide">
            BhashaSetu © 2026
          </p>

          <div className="pt-2 flex items-center justify-center gap-4">
            <a
              href="https://github.com/vennela821"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#8B3A2B] hover:underline"
              aria-label="GitHub Profile"
            >
              <ExternalLink className="h-4 w-4" />
              <span>GitHub</span>
            </a>
            <span className="text-[#8B3A2B]/40">•</span>
            <a
              href="https://www.linkedin.com/in/vennela-badugu-b9388936a/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#8B3A2B] hover:underline"
              aria-label="LinkedIn Profile"
            >
              <ExternalLink className="h-4 w-4" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </footer>

      {/* ===================== 9. FLOATING GRAMMARLY-STYLE COIN & ASSISTANT MODAL ===================== */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsAssistantOpen((open) => !open)}
          aria-label={isAssistantOpen ? "Close BhashaSetu Companion" : "Open BhashaSetu Companion"}
          aria-haspopup="dialog"
          aria-expanded={isAssistantOpen}
          className="group relative flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#8B3A2B] bg-[#F7EBD3] text-2xl font-bold text-[#8B3A2B] shadow-2xl focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
          title="BhashaSetu Companion"
        >
          <span className="group-hover:rotate-12 transition-transform duration-300">
            {selectedLangKey === "te" ? "భ" : "B"}
          </span>
          <span className="absolute -bottom-1 rounded-full bg-[#8B3A2B] px-1.5 py-0.5 text-[9px] font-bold text-white shadow">
            {selectedLangKey === "te" ? "సేతువు" : "Bridge"}
          </span>
        </button>
      </div>

      {isAssistantOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end bg-black/30 p-2 sm:p-6">
          <div role="dialog" aria-modal="true" aria-labelledby="companion-title" className="relative flex h-[92vh] w-full max-w-xl flex-col rounded-3xl border-4 border-[#8B3A2B] bg-[#FFFDF7] shadow-2xl sm:h-[85vh]">
            {/* Assistant Header */}
            <div className="flex items-center justify-between border-b-2 border-[#8B3A2B]/30 bg-[#FAF1E3] px-5 py-3 rounded-t-[20px]">
              <div>
                <h3 id="companion-title" className="text-lg font-bold text-[#8B3A2B]">
                  {activeLang.assistant.title}
                </h3>
                <p className="text-xs text-[#6E4F3E]">
                  {activeLang.assistant.sub}
                </p>
              </div>

              {/* Slow Voice Controller 0.75x vs 1.0x */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSpeechRate(speechRate === 0.75 ? 1.0 : 0.75)}
                  className={`rounded-lg border px-2 py-1 text-xs font-bold ${
                    speechRate === 0.75
                      ? "border-[#8B3A2B] bg-[#8B3A2B] text-white"
                      : "border-[#8B3A2B]/40 bg-white text-[#8B3A2B]"
                  }`}
                  title="Audio Pace Controller"
                >
                  {speechRate === 0.75
                    ? `🐢 ${activeLang.assistant.slowVoice}`
                    : `⚡ ${activeLang.assistant.normalVoice}`}
                </button>

                <button
                  onClick={() => setIsAssistantOpen(false)}
                  aria-label="Close BhashaSetu Companion"
                  className="min-h-11 min-w-11 rounded-lg p-2 text-[#8B3A2B] hover:bg-[#F4E6D2] focus-visible:outline focus-visible:outline-2"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            {serviceError && <div role="alert" className="mx-4 mt-3 rounded-lg border border-red-600 bg-red-50 px-3 py-2 text-xs font-semibold text-red-800">{serviceError}</div>}

            {/* 4 Tool Selector Tabs */}
            <div role="tablist" aria-label="BhashaSetu tools" className="grid grid-cols-4 border-b-2 border-[#8B3A2B]/20 bg-[#F7EBD3] text-xs font-bold text-[#8B3A2B]">
              <button
                onClick={() => setActiveTab("voice")}
                role="tab" aria-selected={activeTab === "voice"}
                className={`py-2.5 transition-colors ${
                  activeTab === "voice"
                    ? "bg-[#FFFDF7] border-b-2 border-[#8B3A2B] text-[#8B3A2B]"
                    : "hover:bg-[#EEDBBF]"
                }`}
              >
                {activeLang.assistant.tab1}
              </button>
              <button
                onClick={() => setActiveTab("translate")}
                role="tab" aria-selected={activeTab === "translate"}
                className={`py-2.5 transition-colors ${
                  activeTab === "translate"
                    ? "bg-[#FFFDF7] border-b-2 border-[#8B3A2B] text-[#8B3A2B]"
                    : "hover:bg-[#EEDBBF]"
                }`}
              >
                {activeLang.assistant.tab2}
              </button>
              <button
                onClick={() => setActiveTab("scam")}
                role="tab" aria-selected={activeTab === "scam"}
                className={`py-2.5 transition-colors ${
                  activeTab === "scam"
                    ? "bg-[#FFFDF7] border-b-2 border-[#8B3A2B] text-[#8B3A2B]"
                    : "hover:bg-[#EEDBBF]"
                }`}
              >
                {activeLang.assistant.tab3}
              </button>
              <button
                onClick={() => setActiveTab("slip")}
                role="tab" aria-selected={activeTab === "slip"}
                className={`py-2.5 transition-colors ${
                  activeTab === "slip"
                    ? "bg-[#FFFDF7] border-b-2 border-[#8B3A2B] text-[#8B3A2B]"
                    : "hover:bg-[#EEDBBF]"
                }`}
              >
                {activeLang.assistant.tab4}
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {/* TAB 1: VOICE TRANSCRIPT */}
              {activeTab === "voice" && (
                <div className="space-y-4">
                  {speechError && <p role="status" className="rounded-lg border border-amber-700 bg-amber-50 p-3 text-sm text-amber-950">{speechError}</p>}
                  <div className="rounded-2xl border-2 border-[#8B3A2B]/30 bg-[#FAF1E3] p-5 text-center">
                    <button
                      onClick={toggleListening}
                      aria-label={isTranscribingVoice ? "Transcribing voice recording" : isListening ? "Stop voice recording" : "Start voice recording"}
                      aria-pressed={isListening}
                      disabled={isTranscribingVoice}
                      className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full border-4 shadow-xl focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-amber-600 ${
                        isListening
                          ? "border-red-600 bg-red-600 text-white"
                          : "border-[#8B3A2B] bg-[#8B3A2B] text-white hover:bg-[#722F22]"
                      }`}
                    >
                      {isListening ? (
                        <MicOff className="h-8 w-8" />
                      ) : (
                        <Mic className="h-8 w-8" />
                      )}
                    </button>
                    <p className="mt-3 text-sm font-bold text-[#8B3A2B]">
                      {isTranscribingVoice
                        ? "Transcribing your recording…"
                        : isListening
                        ? activeLang.assistant.listening
                        : activeLang.assistant.startSpeak}
                    </p>
                  </div>

                  <div>
                    <label htmlFor="voice-message" className="text-sm font-bold text-[#8B3A2B]">Type or review your message in {activeLang.name}</label>
                    <textarea id="voice-message" value={spokenTranscript} onChange={(event) => setSpokenTranscript(event.target.value)} rows={3} className="mt-2 w-full rounded-xl border-2 border-[#8B3A2B]/40 bg-white p-3 text-base outline-none focus:border-[#8B3A2B]" placeholder="Type your message here, or use the microphone above." />
                    <button onClick={() => processVoiceToEnglish(spokenTranscript)} disabled={voiceBusy || !spokenTranscript.trim()} aria-busy={voiceBusy} className="mt-2 min-h-12 w-full rounded-xl bg-[#8B3A2B] px-4 py-3 text-base font-bold text-white shadow hover:bg-[#722F22] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-amber-600">{voiceBusy ? "Translating… please wait" : "Translate to English"}</button>
                  </div>

                  {/* Telugu sample messages are shown only when Telugu is selected. */}
                  {selectedLangKey === "te" && <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#8B3A2B]">
                      నమూనా వాక్యాలు / Sample Presets:
                    </span>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {SAMPLE_PRESETS.voice.map((sample, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setSpokenTranscript(sample.te);
                            setCasualResult(""); setFormalResult("");
                          }}
                          className="min-h-10 rounded-lg border border-[#8B3A2B]/40 bg-[#F7EBD3] px-3 py-2 text-sm text-[#5C3D2E] hover:bg-[#EEDBBF] focus-visible:outline focus-visible:outline-2"
                        >
                          నమూనా {idx + 1}
                        </button>
                      ))}
                    </div>
                  </div>}

                  {spokenTranscript && (
                    <div className="rounded-xl border border-[#8B3A2B]/30 bg-white p-3 text-xs text-[#3D2619]">
                      <span className="font-bold text-[#8B3A2B]">మీ మాటలు: </span>
                      {spokenTranscript}
                    </div>
                  )}

                  {/* Generated English Outputs */}
                  {casualResult && (
                    <div className="space-y-3">
                      <div className="rounded-xl border border-[#8B3A2B]/30 bg-[#FAF1E3] p-3 text-sm"><strong className="text-[#8B3A2B]">Original message / మీ సందేశం</strong><p className="mt-1 whitespace-pre-wrap">{spokenTranscript}</p></div>
                      <div className="rounded-xl border-2 border-[#8B3A2B]/40 bg-white p-3.5 shadow-sm">
                        <span className="text-xs font-bold text-[#8B3A2B]">
                          {activeLang.assistant.casualEnglish}
                        </span>
                        <p className="mt-1 text-sm text-[#3D2619]">{casualResult}</p>
                        <div className="mt-3 flex gap-2">
                          <button onClick={() => speakText(casualResult, "en-US")} aria-label="Listen to casual English translation" className="flex min-h-10 items-center gap-1 rounded-lg border border-[#8B3A2B] px-2.5 py-1 text-sm font-semibold text-[#8B3A2B] hover:bg-[#FAF1E3]"><Volume2 className="h-4 w-4" /><span>Listen</span></button>
                          <button
                            onClick={() => handleCopy(casualResult, "casual")}
                            className="flex items-center gap-1 rounded-lg border border-[#8B3A2B] px-2.5 py-1 text-xs font-semibold text-[#8B3A2B] hover:bg-[#FAF1E3]"
                          >
                            {copiedType === "casual" ? (
                              <Check className="h-3 w-3" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                            <span>
                              {copiedType === "casual"
                                ? activeLang.assistant.copiedBtn
                                : activeLang.assistant.copyBtn}
                            </span>
                          </button>
                          <a
                            href={`https://wa.me/?text=${encodeURIComponent(casualResult)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1 rounded-lg bg-green-700 px-2.5 py-1 text-xs font-semibold text-white hover:bg-green-800"
                          >
                            <Send className="h-3 w-3" />
                            <span>{activeLang.assistant.whatsappBtn}</span>
                          </a>
                        </div>
                      </div>

                      <div className="rounded-xl border border-[#8B3A2B]/30 bg-white p-3.5 shadow-sm">
                        <span className="text-xs font-bold text-[#6E4F3E]">
                          {activeLang.assistant.formalEnglish}
                        </span>
                        <p className="mt-1 text-xs text-[#5C3D2E]">{formalResult}</p>
                        <button onClick={() => speakText(formalResult, "en-US")} className="mt-2 flex min-h-10 items-center gap-1 rounded-lg border border-[#8B3A2B] px-2.5 py-1 text-sm font-semibold text-[#8B3A2B] hover:bg-[#FAF1E3]"><Volume2 className="h-4 w-4" /><span>Listen</span></button>
                        <button
                          onClick={() => handleCopy(formalResult, "formal")}
                          className="mt-2 flex items-center gap-1 rounded-lg border border-[#8B3A2B]/50 px-2 py-1 text-xs font-semibold text-[#8B3A2B] hover:bg-[#FAF1E3]"
                        >
                          {copiedType === "formal" ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                          <span>
                            {copiedType === "formal"
                              ? activeLang.assistant.copiedBtn
                              : activeLang.assistant.copyBtn}
                          </span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: TRANSLATE & READ ALOUD */}
              {activeTab === "translate" && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-[#8B3A2B]">
                      {activeLang.assistant.inputPromptText}
                    </label>
                    <textarea
                      value={inputEnglishText}
                      onChange={(e) => setInputEnglishText(e.target.value)}
                      rows={3}
                      className="mt-1 w-full rounded-xl border-2 border-[#8B3A2B]/40 bg-white p-3 text-xs outline-none focus:border-[#8B3A2B]"
                      placeholder="Paste SMS e.g., 'Dear Customer, your electricity bill is due...'"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="text-[11px] font-bold text-[#8B3A2B]">
                      నమూనా సందేశం:
                    </span>
                    <button
                      onClick={() =>
                        setInputEnglishText(SAMPLE_PRESETS.messages[1].text)
                      }
                      className="rounded-lg border border-[#8B3A2B]/30 bg-[#F7EBD3] px-2 py-0.5 text-xs hover:bg-[#EEDBBF]"
                    >
                      బ్యాంక్ జమ సందేశం (Bank Credit)
                    </button>
                  </div>

                  <button
                    onClick={handleTranslateExplain}
                    disabled={isTranslating}
                    className="w-full rounded-xl bg-[#8B3A2B] py-2.5 text-xs font-bold text-white shadow hover:bg-[#722F22]"
                  >
                    {isTranslating
                      ? activeLang.assistant.explainingBtn
                      : activeLang.assistant.explainBtn}
                  </button>

                  {translatedExplanation && (
                    <div className="rounded-xl border-2 border-[#8B3A2B]/40 bg-[#FAF1E3] p-4">
                      <div className="grid gap-3 md:grid-cols-2">
                        <div className="rounded-lg border border-[#8B3A2B]/20 bg-white p-3">
                          <span className="text-xs font-bold text-[#8B3A2B]">Original English</span>
                          <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-[#3D2619]">{inputEnglishText}</p>
                        </div>
                        <div className="rounded-lg border border-[#8B3A2B]/20 bg-white p-3">
                          <span className="text-xs font-bold text-[#8B3A2B]">{activeLang.assistant.nativeExplanation}</span>
                          <p className="mt-1 whitespace-pre-wrap text-sm font-medium leading-relaxed text-[#3D2619]">{translatedExplanation}</p>
                          {translationFacts && <div className="mt-3 space-y-2 border-t border-[#8B3A2B]/20 pt-3 text-sm">{translationFacts.amount_due && <p><strong>{FACT_LABELS[selectedLangKey].amount}:</strong> {translationFacts.amount_due}</p>}{translationFacts.due_date && <p><strong>{FACT_LABELS[selectedLangKey].date}:</strong> {translationFacts.due_date}</p>}{translationFacts.payment_status && <p><strong>{FACT_LABELS[selectedLangKey].status}:</strong> {translationFacts.payment_status}</p>}{translationFacts.action_items?.length > 0 && <div><strong>{FACT_LABELS[selectedLangKey].actions}:</strong><ul className="list-disc pl-5">{translationFacts.action_items.map((action, index) => <li key={`${index}-${action}`}>{action}</li>)}</ul></div>}</div>}
                        </div>
                      </div>

                      <div className="mt-3 flex gap-2">
                        <button
                          onClick={() => speakText([
                            translatedExplanation,
                            translationFacts?.amount_due && `${FACT_LABELS[selectedLangKey].amount}: ${translationFacts.amount_due}`,
                            translationFacts?.due_date && `${FACT_LABELS[selectedLangKey].date}: ${translationFacts.due_date}`,
                            translationFacts?.payment_status && `${FACT_LABELS[selectedLangKey].status}: ${translationFacts.payment_status}`,
                            translationFacts?.action_items?.length > 0 && `${FACT_LABELS[selectedLangKey].actions}: ${translationFacts.action_items.join(". ")}`,
                          ].filter(Boolean).join(". "))}
                          className="flex items-center gap-1.5 rounded-lg bg-[#8B3A2B] px-3 py-1.5 text-xs font-bold text-white shadow hover:bg-[#722F22]"
                        >
                          {isPlayingAudio ? (
                            <VolumeX className="h-4 w-4" />
                          ) : (
                            <Volume2 className="h-4 w-4" />
                          )}
                          <span>
                            {isPlayingAudio
                              ? activeLang.assistant.stopAudio
                              : activeLang.assistant.listenAudio}
                          </span>
                        </button>
                      </div>
                      {speechError && <p role="status" className="mt-2 rounded-lg border border-amber-700 bg-amber-50 p-2 text-sm text-amber-950">{speechError}</p>}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: SCAM SHIELD */}
              {activeTab === "scam" && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-[#8B3A2B]">
                      అనుమానాస్పద మెసేజ్ లేదా లింక్:
                    </label>
                    <textarea
                      value={scamInput}
                      onChange={(e) => setScamInput(e.target.value)}
                      rows={3}
                      className="mt-1 w-full rounded-xl border-2 border-[#8B3A2B]/40 bg-white p-3 text-xs outline-none focus:border-[#8B3A2B]"
                      placeholder="Paste suspicious SMS or lottery notification here..."
                    />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="text-[11px] font-bold text-[#8B3A2B]">
                      పరీక్షించండి:
                    </span>
                    <button
                      onClick={() => {
                        setScamInput(SAMPLE_PRESETS.messages[0].text);
                        handleCheckScam(SAMPLE_PRESETS.messages[0].text);
                      }}
                      className="rounded-lg border border-red-400 bg-red-50 px-2 py-0.5 text-xs font-semibold text-red-700 hover:bg-red-100"
                    >
                      ⚠️ నకిలీ కేవైసీ మెసేజ్ (Fake Scam)
                    </button>
                  </div>

                  <button
                    onClick={() => handleCheckScam()}
                    disabled={scanBusy}
                    className="w-full rounded-xl bg-[#8B3A2B] py-2.5 text-xs font-bold text-white shadow hover:bg-[#722F22]"
                  >
                    {scanBusy ? "Analyzing…" : activeLang.assistant.checkScamBtn}
                  </button>

                  {scamVerdict && (
                    <div
                      className={`rounded-xl border-2 p-4 ${
                        scanDetails?.risk_level === "High"
                          ? "border-red-600 bg-red-50 text-red-900"
                          : scanDetails?.risk_level === "Medium"
                            ? "border-amber-600 bg-amber-50 text-amber-950"
                            : "border-green-600 bg-green-50 text-green-900"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {scanDetails?.risk_level !== "Low" ? (
                          <ShieldAlert className="h-6 w-6 text-red-600" />
                        ) : (
                          <ShieldCheck className="h-6 w-6 text-green-600" />
                        )}
                        <h4 className="text-sm font-bold">
                          {scanDetails ? `Risk assessment: ${scanDetails.risk_level}` : activeLang.assistant.scamDanger}
                        </h4>
                      </div>

                      <p className="mt-2 text-xs leading-relaxed">
                        {scamExplanation}
                      </p>
                      {scanDetails && <div className="mt-3 space-y-1 text-xs"><strong>Risk: {scanDetails.risk_level} ({scanDetails.risk_score}/100)</strong>{scanDetails.reasons?.map((reason) => <p key={reason}>• {reason}</p>)}{scanDetails.recommended_actions?.map((action) => <p key={action}>→ {action}</p>)}<p className="mt-2 font-semibold">{scanDetails.disclaimer}</p></div>}

                      <div className="mt-3 flex flex-wrap gap-2">
                        <button
                          onClick={() => speakText(scamExplanation)}
                          className="flex items-center gap-1 rounded-lg border border-current px-2.5 py-1 text-xs font-bold hover:bg-black/5"
                        >
                          <Volume2 className="h-3.5 w-3.5" />
                          <span>{activeLang.assistant.listenAudio}</span>
                        </button>

                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: PHYSICAL SLIP OCR SCANNER */}
              {activeTab === "slip" && (
                <div className="space-y-4">
                  <div className="rounded-xl border-2 border-dashed border-[#8B3A2B]/40 bg-[#FAF1E3] p-4 text-center">
                    <Camera className="mx-auto h-8 w-8 text-[#8B3A2B]" />
                    <p className="mt-2 text-xs font-bold text-[#8B3A2B]">
                      కరెంట్ బిల్లు లేదా మందుల చిట్టీ ఫోటో స్కాన్ చేయండి
                    </p>
                    <p className="text-[11px] text-[#6E4F3E]">
                      Take photo of physical slip or choose a sample below:
                    </p>

                    <label className="mt-3 inline-flex cursor-pointer rounded-lg border border-[#8B3A2B] bg-white px-3 py-2 text-xs font-bold text-[#8B3A2B] hover:bg-[#F7EBD3]">
                      {scanBusy ? "Reading image…" : "Choose bill or prescription photo"}
                      <input className="sr-only" type="file" accept="image/jpeg,image/png,image/webp" disabled={scanBusy} onChange={(event) => { handleScanSlip(event.target.files?.[0]); event.target.value = ""; }} />
                    </label>
                  </div>

                  {slipData && (
                    <div className="rounded-xl border-2 border-[#8B3A2B] bg-white p-4 shadow-md space-y-2">
                      <div className="border-b border-[#8B3A2B]/20 pb-2">
                        <span className="text-xs font-bold text-[#A64B2A] uppercase">
                          గుర్తించిన వివరాలు:
                        </span>
                        <h4 className="text-sm font-bold text-[#8B3A2B]">
                          {slipData.name}
                        </h4>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="rounded-lg bg-[#FAF1E3] p-2">
                          <span className="block font-semibold text-[#6E4F3E]">
                            {activeLang.assistant.billAmount}
                          </span>
                          <span className="text-sm font-bold text-green-700">
                            {slipData.amount}
                          </span>
                        </div>
                        <div className="rounded-lg bg-[#FAF1E3] p-2">
                          <span className="block font-semibold text-[#6E4F3E]">
                            {activeLang.assistant.dueDate}
                          </span>
                          <span className="text-sm font-bold text-[#8B3A2B]">
                            {slipData.due}
                          </span>
                        </div>
                      </div>

                      <div className="pt-2">
                        <span className="text-xs font-bold text-[#8B3A2B]">
                          {activeLang.assistant.actionTip}
                        </span>
                        <p className="mt-1 text-xs leading-relaxed text-[#3D2619]">
                          {slipData.description}
                        </p>
                      </div>

                      <button
                        onClick={() => speakText(slipData.description)}
                        className="mt-2 flex items-center gap-1.5 rounded-lg bg-[#8B3A2B] px-3 py-1.5 text-xs font-bold text-white shadow hover:bg-[#722F22]"
                      >
                        <Volume2 className="h-4 w-4" />
                        <span>{activeLang.assistant.listenAudio}</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ===================== 10. MODALS: LOGIN & INSTALLATION ===================== */}
      {/* Login Modal */}
      {loginModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div role="dialog" aria-modal="true" aria-labelledby="login-title" className="w-full max-w-sm rounded-2xl border-4 border-[#8B3A2B] bg-[#FFFDF7] p-6 shadow-2xl">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 id="login-title" className="font-bold text-[#8B3A2B]">ఖాతా / Account</h3>
              <button
                onClick={dismissLoginPrompt}
                aria-label="Close account information"
                className="min-h-11 min-w-11 rounded-lg p-2 text-[#8B3A2B] focus-visible:outline focus-visible:outline-2"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-[#3D2619]">
              <p>Sign-in is not set up yet. This project does not have a real account service, so this window will not ask for or store a password.</p>
              <p>You can still use translation, message explanation, and Scam Shield without signing in.</p>
              <button onClick={dismissLoginPrompt} className="min-h-12 w-full rounded-lg bg-[#8B3A2B] px-4 py-3 text-base font-bold text-white shadow focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-amber-600">Continue without an account</button>
            </div>
          </div>
        </div>
      )}

      {/* Install Modal */}
      {installModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div role="dialog" aria-modal="true" aria-labelledby="install-title" className="w-full max-w-sm rounded-2xl border-4 border-[#8B3A2B] bg-[#FFFDF7] p-6 shadow-2xl">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 id="install-title" className="font-bold text-[#8B3A2B]">Website help / వెబ్‌సైట్ సహాయం</h3>
              <button
                onClick={() => setInstallModalOpen(false)}
                aria-label="Close website help"
                className="min-h-11 min-w-11 rounded-lg p-2 text-[#8B3A2B] focus-visible:outline focus-visible:outline-2"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4 space-y-3 text-base leading-relaxed text-[#5C3D2E]">
              <p>This is a website. There is no browser extension in this project.</p>
              <ol className="list-decimal space-y-2 pl-5">
                <li>Open BhashaSetu in your browser and save it as a bookmark or favorite.</li>
                <li>On some phones, the browser menu may offer “Add to Home Screen”. This creates a shortcut; it is not an app-store installation.</li>
                <li>Tap the round BhashaSetu coin at the bottom-right. Choose Voice, Translate, Scam Shield, or Slip Scan.</li>
              </ol>
              <p>ఈ ప్రాజెక్ట్ వెబ్‌సైట్ మాత్రమే; browser extension కాదు. సులభంగా మళ్లీ తెరవడానికి bookmark చేసుకోండి.</p>
            </div>
            <button
              onClick={() => setInstallModalOpen(false)}
              className="mt-4 min-h-12 w-full rounded-lg bg-[#8B3A2B] px-4 py-3 text-base font-bold text-white shadow focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
            >
              సరే / Understand
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
