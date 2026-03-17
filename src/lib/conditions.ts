import type { Symptom, Diagnosis, Language } from "@/types";

export const SYMPTOMS: Symptom[] = [
  {
    id: "fever",
    emoji: "🌡️",
    labels: {
      hi: "बुखार",
      bn: "জ্বর",
      ta: "காய்ச்சல்",
      te: "జ్వరం",
      mr: "ताप",
      en: "Fever",
    },
  },
  {
    id: "cough",
    emoji: "😮‍💨",
    labels: {
      hi: "खांसी",
      bn: "কাশি",
      ta: "இருமல்",
      te: "దగ్గు",
      mr: "खोकला",
      en: "Cough",
    },
  },
  {
    id: "headache",
    emoji: "🤕",
    labels: {
      hi: "सिरदर्द",
      bn: "মাথা ব্যথা",
      ta: "தலைவலி",
      te: "తలనొప్పి",
      mr: "डोकेदुखी",
      en: "Headache",
    },
  },
  {
    id: "stomach",
    emoji: "🤢",
    labels: {
      hi: "पेट दर्द",
      bn: "পেট ব্যথা",
      ta: "வயிற்றுவலி",
      te: "కడుపు నొప్పి",
      mr: "पोटदुखी",
      en: "Stomach pain",
    },
  },
  {
    id: "chest",
    emoji: "💔",
    labels: {
      hi: "छाती दर्द",
      bn: "বুক ব্যথা",
      ta: "மார்பு வலி",
      te: "ఛాతీ నొప్పి",
      mr: "छातीदुखी",
      en: "Chest pain",
    },
  },
  {
    id: "throat",
    emoji: "🤧",
    labels: {
      hi: "गले में दर्द",
      bn: "গলা ব্যথা",
      ta: "தொண்டை வலி",
      te: "గొంతు నొప్పి",
      mr: "घसादुखी",
      en: "Sore throat",
    },
  },
  {
    id: "body",
    emoji: "💪",
    labels: {
      hi: "बदन दर्द",
      bn: "শরীর ব্যথা",
      ta: "உடல் வலி",
      te: "శరీర నొప్పి",
      mr: "अंगदुखी",
      en: "Body ache",
    },
  },
  {
    id: "dizzy",
    emoji: "😵",
    labels: {
      hi: "चक्कर",
      bn: "মাথা ঘোরা",
      ta: "தலைச்சுற்றல்",
      te: "తలతిరుగుతోంది",
      mr: "चक्कर",
      en: "Dizziness",
    },
  },
  {
    id: "diarrhea",
    emoji: "🚽",
    labels: {
      hi: "दस्त",
      bn: "ডায়রিয়া",
      ta: "வயிற்றுப்போக்கு",
      te: "విరేచనాలు",
      mr: "जुलाब",
      en: "Diarrhea",
    },
  },
  {
    id: "vomiting",
    emoji: "🤮",
    labels: {
      hi: "उल्टी",
      bn: "বমি",
      ta: "வாந்தி",
      te: "వాంతులు",
      mr: "उलटी",
      en: "Vomiting",
    },
  },
  {
    id: "rash",
    emoji: "🔴",
    labels: {
      hi: "चकत्ते",
      bn: "র‍্যাশ",
      ta: "தடிப்பு",
      te: "దద్దుర్లు",
      mr: "पुरळ",
      en: "Skin rash",
    },
  },
  {
    id: "breathless",
    emoji: "😤",
    labels: {
      hi: "सांस लेने में तकलीफ",
      bn: "শ্বাসকষ্ট",
      ta: "மூச்சு திணறல்",
      te: "శ్వాస తీసుకోవడం కష్టం",
      mr: "श्वास घेण्यास त्रास",
      en: "Breathlessness",
    },
  },
];

type OfflineCondition = {
  condition: Record<Language, string>;
  severity: "mild" | "moderate" | "urgent";
  description: Record<Language, string>;
  firstAid: Record<Language, string[]>;
  medicines: { name: string; dosage: string; note: string; price: string }[];
  whenToSeek: Record<Language, string>;
  possibleConditions: Record<Language, string[]>;
  homeCareAdvice: Record<Language, string[]>;
  recommendedDoctor: Record<Language, string>;
  hospitalRecommendation: Record<Language, string>;
  dietRecommendation: Record<Language, string[]>;
  lifestyleAndExercise: Record<Language, string[]>;
};

export const OFFLINE_CONDITIONS: Record<string, OfflineCondition> = {
  "fever+cough": {
    condition: {
      hi: "वायरल बुखार",
      bn: "ভাইরাল জ্বর",
      ta: "வைரல் காய்ச்சல்",
      te: "వైరల్ జ్వరం",
      mr: "विषाणूजन्य ताप",
      en: "Viral Fever",
    },
    severity: "mild",
    description: {
      hi: "मौसम बदलने के समय यह आम है। आराम और पानी से ज़्यादातर ठीक हो जाता है।",
      bn: "ঋতু পরিবর্তনে সাধারণ। বিশ্রাম ও পানিতে সেরে যায়।",
      ta: "பருவகால மாற்றத்தில் பொதுவானது. ஓய்வு மற்றும் நீரில் குணமடையும்.",
      te: "కాలం మారే సమయంలో సాధారణం. విశ్రాంతి మరియు నీరు తో తగ్గుతుంది.",
      mr: "ऋतू बदलाच्या वेळी सामान्य. विश्रांती आणि पाण्याने बरे होते.",
      en: "Common during seasonal changes. Usually resolves with rest and hydration.",
    },
    firstAid: {
      hi: [
        "खूब पानी पिएं — दिन में 8+ गिलास",
        "Paracetamol 500mg हर 6 घंटे (बड़ों के लिए)",
        "आराम करें, भारी काम न करें",
        "नमक पानी से गरारे करें",
      ],
      bn: [
        "প্রচুর পানি পান করুন — দিনে ৮+ গ্লাস",
        "Paracetamol 500mg প্রতি ৬ ঘণ্টায়",
        "বিশ্রাম নিন",
        "গরম পানিতে গারগল করুন",
      ],
      ta: [
        "நிறைய தண்ணீர் குடியுங்கள் — நாளொன்றுக்கு 8+ கிளாஸ்",
        "Paracetamol 500mg ஒவ்வொரு 6 மணி நேரமும்",
        "ஓய்வு எடுங்கள்",
        "உப்பு நீரில் கொப்பளிக்கவும்",
      ],
      te: [
        "చాలా నీరు తాగండి — రోజుకు 8+ గ్లాసులు",
        "Paracetamol 500mg ప్రతి 6 గంటలకు",
        "విశ్రాంతి తీసుకోండి",
        "ఉప్పు నీటితో గార్గిల్ చేయండి",
      ],
      mr: [
        "भरपूर पाणी प्या — दिवसातून 8+ ग्लास",
        "Paracetamol 500mg दर 6 तासांनी",
        "विश्रांती घ्या",
        "मिठाच्या पाण्याने गुळण्या करा",
      ],
      en: [
        "Drink plenty of water — 8+ glasses daily",
        "Paracetamol 500mg every 6 hours (adults)",
        "Get rest, avoid heavy work",
        "Gargle with warm salt water",
      ],
    },
    medicines: [
      {
        name: "Paracetamol 500mg",
        dosage: "1 tab every 6 hrs",
        note: "Do not exceed 4 tabs/day",
        price: "₹2–5",
      },
      {
        name: "Cetirizine 10mg",
        dosage: "1 tab at night",
        note: "For runny nose/sneezing",
        price: "₹3–6",
      },
    ],
    whenToSeek: {
      hi: "यदि 3 दिन में बुखार न उतरे या 103°F से ऊपर हो तो डॉक्टर से मिलें।",
      bn: "3 দিনে জ্বর না কমলে বা 103°F এর উপরে হলে ডাক্তার দেখান।",
      ta: "3 நாட்களில் காய்ச்சல் குறையவில்லை அல்லது 103°F கு மேல் இருந்தால் மருத்துவரை சந்தியுங்கள்.",
      te: "3 రోజుల్లో జ్వరం తగ్గకపోతే లేదా 103°F కంటే ఎక్కువ ఉంటే డాక్టర్ దగ్గరకు వెళ్ళండి.",
      mr: "3 दिवसात ताप न उतरल्यास किंवा 103°F पेक्षा जास्त असल्यास डॉक्टरांकडे जा.",
      en: "See a doctor if fever doesn't reduce in 3 days or exceeds 103°F.",
    },
    possibleConditions: {
      hi: ["सामान्य सर्दी", "फ्लू"],
      bn: ["সাধারণ ঠান্ডা", "ফ্লু"],
      ta: ["சாதாரண சளி", "காய்ச்சல்"],
      te: ["సాధారణ జలుబు", "ఫ్లూ"],
      mr: ["सामान्य सर्दी", "फ्लू"],
      en: ["Common Cold", "Flu"],
    },
    homeCareAdvice: {
      hi: ["आराम करें", "गर्म पानी पिएं"],
      bn: ["বিশ্রাম নিন", "গরম জল পান করুন"],
      ta: ["ஓய்வெடுக்கவும்", "சூடான நீர் குடிக்கவும்"],
      te: ["విశ్రాంతి తీసుకోండి", "వేడి నీరు త్రాగాలి"],
      mr: ["विश्रांती घ्या", "गरम पाणी प्या"],
      en: ["Get adequate rest", "Drink warm fluids"],
    },
    recommendedDoctor: { hi: "सामान्य चिकित्सक", bn: "সাধারণ চিকিৎসক", ta: "பொது மருத்துவர்", te: "సాధారణ వైద్యుడు", mr: "सामान्य चिकित्सक", en: "General Physician" },
    hospitalRecommendation: { hi: "निकटतम स्वास्थ्य केंद्र", bn: "নিকটস্থ স্বাস্থ্য কেন্দ্র", ta: "அருகிலுள்ள சுகாதார மையம்", te: "సమీప ఆరోగ్య కేంద్రం", mr: "जवळचे आरोग्य केंद्र", en: "Nearest Health Center or Clinic" },
    dietRecommendation: {
      hi: ["हल्का भोजन लें", "खूब पानी पिएं"],
      bn: ["হালকা খাবার খান", "প্রচুর জল পান করুন"],
      ta: ["மெல்லிய உணவு உண்ணவும்", "நிறைய தண்ணீர் குடிக்கவும்"],
      te: ["తేలికపాటి ఆహారం తీసుకోండి", "చాలా నీరు త్రాగాలి"],
      mr: ["हलके अन्न खा", "भरपूर पाणी प्या"],
      en: ["Eat light meals like porridge", "Stay hydrated"],
    },
    lifestyleAndExercise: {
      hi: ["ठंड से बचें", "भारी व्यायाम न करें"],
      bn: ["ঠান্ডা এড়িয়ে চলুন", "ভারী ব্যায়াম করবেন না"],
      ta: ["குளிரைத் தவிர்க்கவும்", "கடினமான உடற்பயிற்சி வேண்டாம்"],
      te: ["చలి నుండి దూరంగా ఉండండి", "భారీ వ్యాయామం చేయవద్దు"],
      mr: ["थंडी टाळा", "जड व्यायाम करू नका"],
      en: ["Avoid cold exposure", "Avoid heavy physical exertion"],
    },
  },

  chest: {
    condition: {
      hi: "छाती दर्द — आपातकाल",
      bn: "বুক ব্যথা — জরুরি",
      ta: "மார்பு வலி — அவசரம்",
      te: "ఛాతీ నొప్పి — అత్యవసరం",
      mr: "छातीदुखी — आणीबाणी",
      en: "Chest Pain — Emergency",
    },
    severity: "urgent",
    description: {
      hi: "छाती दर्द हृदय संबंधी हो सकता है। देर न करें — तुरंत चिकित्सा लें।",
      bn: "বুক ব্যথা হৃদযন্ত্রের সমস্যা হতে পারে। দেরি না করে সাথে সাথে ডাক্তার দেখান।",
      ta: "மார்பு வலி இதய பிரச்சனையாக இருக்கலாம். தாமதிக்காதீர்கள்.",
      te: "ఛాతీ నొప్పి గుండె సమస్య అయి ఉండవచ్చు. ఆలస్యం చేయకండి.",
      mr: "छातीदुखी हृदयाशी संबंधित असू शकते. उशीर करू नका.",
      en: "Chest pain may indicate a heart issue. Do not delay — seek immediate care.",
    },
    firstAid: {
      hi: [
        "तुरंत 108 पर कॉल करें",
        "लेट जाएं और शांत रहें",
        "कुछ खाएं-पिएं नहीं",
        "किसी को पास रखें",
      ],
      bn: [
        "সাথে সাথে 108 কল করুন",
        "শুয়ে পড়ুন ও শান্ত থাকুন",
        "কিছু খাবেন না",
        "কাউকে পাশে রাখুন",
      ],
      ta: [
        "உடனே 108 அழைக்கவும்",
        "படுத்துக்கொள்ளுங்கள், அமைதியாக இருங்கள்",
        "எதுவும் சாப்பிட வேண்டாம்",
        "யாரையாவது அருகில் வையுங்கள்",
      ],
      te: [
        "వెంటనే 108 కు కాల్ చేయండి",
        "పడుకోండి మరియు ప్రశాంతంగా ఉండండి",
        "ఏమీ తినకండి తాగకండి",
        "ఎవరైనా దగ్గర ఉండాలి",
      ],
      mr: [
        "ताबडतोब 108 वर कॉल करा",
        "झोपा आणि शांत राहा",
        "काही खाऊ पिऊ नका",
        "कोणाला जवळ ठेवा",
      ],
      en: [
        "Call 108 immediately",
        "Lie down and stay calm",
        "Do not eat or drink anything",
        "Keep someone with you",
      ],
    },
    medicines: [],
    whenToSeek: {
      hi: "तुरंत आपातकालीन सेवा से संपर्क करें।",
      bn: "অবিলম্বে জরুরি সেবা যোগাযোগ করুন।",
      ta: "உடனடியாக அவசர சேவையை தொடர்பு கொள்ளுங்கள்.",
      te: "వెంటనే అత్యవసర సేవను సంప్రదించండి.",
      mr: "ताबडतोब आपत्कालीन सेवेशी संपर्क साधा.",
      en: "Contact emergency services immediately.",
    },
    possibleConditions: {
      hi: ["हृदय की समस्या", "एसिडिटी"],
      bn: ["হৃদরোগ", "অ্যাসিডিটি"],
      ta: ["இதய பிரச்சினை", "இரைப்பை அழற்சி"],
      te: ["గుండె సమస్య", "ఎసిడిటీ"],
      mr: ["हृदयविकार", "अॅसिडिटी"],
      en: ["Heart issue", "Severe Acidity"],
    },
    homeCareAdvice: {
      hi: ["हिलें डुलें नहीं", "शांत रहें"],
      bn: ["নড়াচড়া করবেন না", "শান্ত থাকুন"],
      ta: ["நகரவோ அசையவோ வேண்டாம்", "அமைதியாக இருங்கள்"],
      te: ["కదలకుండా ఉండండి", "ప్రశాంతంగా ఉండండి"],
      mr: ["हालचाल करू नका", "शांत राहा"],
      en: ["Do not move around", "Stay completely calm"],
    },
    recommendedDoctor: { hi: "हृदय रोग विशेषज्ञ", bn: "হৃদরোগ বিশেষজ্ঞ", ta: "இதய மருத்துவர்", te: "గుండె వైద్యుడు", mr: "हृदयविकार तज्ज्ञ", en: "Cardiologist (ER)" },
    hospitalRecommendation: { hi: "बड़े अस्पताल की आपातकालीन", bn: "বড় হাসপাতালের জরুরি বিভাগ", ta: "பெரிய மருத்துவமனை அவசரம்", te: "పెద్ద ఆసుపత్రి ఎమర్జెన్సీ", mr: "मोठ्या रुग्णालयातील आपत्कालीन", en: "Large Hospital Emergency Room" },
    dietRecommendation: {
      hi: ["कुछ न खाएं-पिएं"],
      bn: ["কিছু খাবেন বা পান করবেন না"],
      ta: ["எதுவும் சாப்பிடவோ குடிக்கவோ வேண்டாம்"],
      te: ["ఏమీ తినకూడదు త్రాగకూడదు"],
      mr: ["काहीही खाऊ किंवा पिऊ नका"],
      en: ["Do not consume anything right now"],
    },
    lifestyleAndExercise: {
      hi: ["पूर्ण आराम"],
      bn: ["পূর্ণ বিশ্রাম"],
      ta: ["முழுமையான ஓய்வு"],
      te: ["సంపూర్ణ విశ్రాంతి"],
      mr: ["पूर्ण विश्रांती"],
      en: ["Absolute rest right now"],
    },
  },

  "stomach+diarrhea": {
    condition: {
      hi: "गैस्ट्रोएंटेराइटिस",
      bn: "গ্যাস্ট্রোএন্টেরাইটিস",
      ta: "இரைப்பை குடல் அழற்சி",
      te: "గ్యాస్ట్రోఎంటిరైటిస్",
      mr: "जठरांत्र दाह",
      en: "Gastroenteritis",
    },
    severity: "mild",
    description: {
      hi: "दूषित खाना या पानी से पेट का संक्रमण। ORS पीते रहें।",
      bn: "দূষিত খাবার বা পানি থেকে পেটের সংক্রমণ। ORS পান করতে থাকুন।",
      ta: "மாசுபட்ட உணவு அல்லது தண்ணீரில் இருந்து வயிற்று தொற்று. ORS குடிக்கவும்.",
      te: "కలుషితమైన ఆహారం లేదా నీటి నుండి కడుపు ఇన్ఫెక్షన్. ORS తాగుతూ ఉండండి.",
      mr: "दूषित अन्न किंवा पाण्यामुळे पोटाचा संसर्ग. ORS पीत राहा.",
      en: "Stomach infection from contaminated food/water. Keep drinking ORS.",
    },
    firstAid: {
      hi: [
        "ORS घोल पिएं — हर 30 मिनट में",
        "नरम खाना खाएं — दलिया, खिचड़ी",
        "मसालेदार खाना बंद करें",
        "हाथ साफ रखें",
      ],
      bn: [
        "ORS পান করুন — প্রতি ৩০ মিনিটে",
        "নরম খাবার খান — দলিয়া, খিচুড়ি",
        "মশলাদার খাবার বন্ধ করুন",
        "হাত পরিষ্কার রাখুন",
      ],
      ta: [
        "ORS குடியுங்கள் — ஒவ்வொரு 30 நிமிடமும்",
        "மென்மையான உணவு சாப்பிடுங்கள்",
        "காரமான உணவை தவிர்க்கவும்",
        "கைகளை சுத்தமாக வைத்துக்கொள்ளுங்கள்",
      ],
      te: [
        "ORS తాగండి — ప్రతి 30 నిమిషాలకు",
        "మెత్తని ఆహారం తినండి",
        "కారమైన ఆహారం ఆపండి",
        "చేతులు శుభ్రంగా ఉంచుకోండి",
      ],
      mr: [
        "ORS द्रावण प्या — दर 30 मिनिटांनी",
        "मऊ अन्न खा — दलिया, खिचडी",
        "तिखट अन्न बंद करा",
        "हात स्वच्छ ठेवा",
      ],
      en: [
        "Drink ORS solution every 30 minutes",
        "Eat soft food — porridge, khichdi",
        "Avoid spicy food",
        "Keep hands clean",
      ],
    },
    medicines: [
      {
        name: "ORS sachets",
        dosage: "1 sachet in 1L water",
        note: "Drink frequently",
        price: "₹2–5",
      },
      {
        name: "Zinc 20mg",
        dosage: "1 tab daily for 14 days",
        note: "Especially for children",
        price: "₹5–10",
      },
    ],
    whenToSeek: {
      hi: "2 दिन में ठीक न हो, या खून आए, या बच्चा हो — तुरंत डॉक्टर जाएं।",
      bn: "2 দিনে না সারলে, রক্ত আসলে, বা শিশু হলে — তাৎক্ষণিক ডাক্তার দেখান।",
      ta: "2 நாட்களில் குணமடையவில்லை அல்லது இரத்தம் வந்தால் — உடனே மருத்துவரை சந்தியுங்கள்.",
      te: "2 రోజుల్లో తగ్గకపోతే, రక్తం వస్తే, లేదా పిల్లల విషయంలో — వెంటనే డాక్టర్ దగ్గరకు వెళ్ళండి.",
      mr: "2 दिवसात बरे न झाल्यास, रक्त आल्यास किंवा मूल असल्यास — ताबडतोब डॉक्टरांकडे जा.",
      en: "See doctor if not better in 2 days, blood in stool, or if it's a child.",
    },
    possibleConditions: {
      hi: ["फ़ूड पॉइज़निंग", "पेट का संक्रमण"],
      bn: ["ফুড পয়জনিং", "পেটের সংক্রমণ"],
      ta: ["உணவு விஷம்", "இரைப்பை தொற்று"],
      te: ["ఫుడ్ పాయిజనింగ్", "కడుపు ఇన్ఫెక్షన్"],
      mr: ["अन्नविषबाधा", "पोटाचा संसर्ग"],
      en: ["Food Poisoning", "Stomach Infection"],
    },
    homeCareAdvice: {
      hi: ["ORS पीते रहें", "साफ-सफाई रखें"],
      bn: ["ORS পান করতে থাকুন", "পরিষ্কার-পরিচ্ছন্নতা বজায় রাখুন"],
      ta: ["ORS குடிக்கவும்", "சுத்தமாக இருக்கவும்"],
      te: ["ORS తాగుతూ ఉండండి", "పరిశుభ్రత పాటించండి"],
      mr: ["ORS पीत राहा", "स्वच्छता राखा"],
      en: ["Sip ORS continuously", "Maintain good hygiene"],
    },
    recommendedDoctor: { hi: "सामान्य चिकित्सक", bn: "সাধারণ চিকিৎসক", ta: "பொது மருத்துவர்", te: "సాధారణ వైద్యుడు", mr: "सामान्य चिकित्सक", en: "General Physician" },
    hospitalRecommendation: { hi: "निकटतम क्लिनिक", bn: "নিকটস্থ ক্লিনিক", ta: "அருகிலுள்ள கிளினிக்", te: "సమీప క్లినిక్", mr: "जवळचे क्लिनिक", en: "Nearest Clinic" },
    dietRecommendation: {
      hi: ["खिचड़ी", "दही"],
      bn: ["খিচুড়ি", "দই"],
      ta: ["கஞ்சி", "தயிர்"],
      te: ["కిచిడి", "పెరుగు"],
      mr: ["खिचडी", "दही"],
      en: ["Khichdi (Rice/Lentils)", "Yogurt/Curd"],
    },
    lifestyleAndExercise: {
      hi: ["आराम करें"],
      bn: ["বিশ্রাম নিন"],
      ta: ["ஓய்வெடுக்கவும்"],
      te: ["విశ్రాంతి తీసుకోండి"],
      mr: ["विश्रांती घ्या"],
      en: ["Rest at home"],
    },
  },

  default: {
    condition: {
      hi: "सामान्य कमजोरी",
      bn: "সাধারণ দুর্বলতা",
      ta: "பொது அசதி",
      te: "సాధారణ బలహీనత",
      mr: "सामान्य अशक्तपणा",
      en: "General Weakness",
    },
    severity: "mild",
    description: {
      hi: "सामान्य थकान या छोटी तकलीफ हो सकती है।",
      bn: "সাধারণ ক্লান্তি বা ছোট সমস্যা হতে পারে।",
      ta: "பொது சோர்வு அல்லது சிறிய அசௌகரியம் இருக்கலாம்.",
      te: "సాధారణ అలసట లేదా చిన్న అసౌకర్యం అయి ఉండవచ్చు.",
      mr: "सामान्य थकवा किंवा छोटी तक्रार असू शकते.",
      en: "Could be general fatigue or a minor ailment.",
    },
    firstAid: {
      hi: [
        "आराम करें",
        "पानी और ORS पिएं",
        "हल्का खाना खाएं",
        "2 दिन में ठीक न हो तो डॉक्टर जाएं",
      ],
      bn: [
        "বিশ্রাম নিন",
        "পানি ও ORS পান করুন",
        "হালকা খাবার খান",
        "2 দিনে না সারলে ডাক্তার দেখান",
      ],
      ta: [
        "ஓய்வு எடுங்கள்",
        "தண்ணீர் மற்றும் ORS குடியுங்கள்",
        "லேசான உணவு சாப்பிடுங்கள்",
        "2 நாட்களில் குணமடையவில்லை எனில் மருத்துவரை சந்தியுங்கள்",
      ],
      te: [
        "విశ్రాంతి తీసుకోండి",
        "నీరు మరియు ORS తాగండి",
        "తేలికపాటి ఆహారం తినండి",
        "2 రోజుల్లో తగ్గకపోతే డాక్టర్ దగ్గరకు వెళ్ళండి",
      ],
      mr: [
        "विश्रांती घ्या",
        "पाणी आणि ORS प्या",
        "हलके अन्न खा",
        "2 दिवसात बरे न झाल्यास डॉक्टरांकडे जा",
      ],
      en: [
        "Get rest",
        "Drink water and ORS",
        "Eat light food",
        "See a doctor if not better in 2 days",
      ],
    },
    medicines: [
      {
        name: "ORS sachets",
        dosage: "As needed",
        note: "For hydration",
        price: "₹2–5",
      },
    ],
    whenToSeek: {
      hi: "2 दिन में ठीक न हो तो डॉक्टर से मिलें।",
      bn: "2 দিনে না সারলে ডাক্তার দেখান।",
      ta: "2 நாட்களில் குணமடையவில்லை எனில் மருத்துவரை பாருங்கள்.",
      te: "2 రోజుల్లో తగ్గకపోతే డాక్టర్ ను సంప్రదించండి.",
      mr: "2 दिवसात बरे न झाल्यास डॉक्टरांकडे जा.",
      en: "See a doctor if not better in 2 days.",
    },
    possibleConditions: {
      hi: ["थकान", "तनाव"],
      bn: ["ক্লান্তি", "মানসিক চাপ"],
      ta: ["சோர்வு", "மனஅழுத்தம்"],
      te: ["అలసట", "ఒత్తిడి"],
      mr: ["थकवा", "तणाव"],
      en: ["Fatigue", "Stress"],
    },
    homeCareAdvice: {
      hi: ["आराम करें", "नींद पूरी लें"],
      bn: ["বিশ্রাম নিন", "পর্যাপ্ত ঘুমান"],
      ta: ["ஓய்வெடுக்கவும்", "நன்கு தூங்கவும்"],
      te: ["విశ్రాంతి తీసుకోండి", "బాగా నిద్రపోండి"],
      mr: ["विश्रांती घ्या", "पुरेशी झोप घ्या"],
      en: ["Take a rest", "Get enough sleep"],
    },
    recommendedDoctor: { hi: "सामान्य चिकित्सक", bn: "সাধারণ চিকিৎসক", ta: "பொது மருத்துவர்", te: "సాధారణ వైద్యుడు", mr: "सामान्य चिकित्सक", en: "General Physician" },
    hospitalRecommendation: { hi: "निकटतम स्वास्थ्य केंद्र", bn: "নিকটস্থ স্বাস্থ্য কেন্দ্র", ta: "அருகிலுள்ள சுகாதார மையம்", te: "సమీప ఆరోగ్య కేంద్రం", mr: "जवळचे आरोग्य केंद्र", en: "Nearest Health Center or Clinic" },
    dietRecommendation: {
      hi: ["संतुलित आहार लें"],
      bn: ["সুষম খাবার খান"],
      ta: ["சமச்சீரான உணவு உண்ணவும்"],
      te: ["సమతుల్య ఆహారం తీసుకోండి"],
      mr: ["संतुलित आहार घ्या"],
      en: ["Eat a balanced diet"],
    },
    lifestyleAndExercise: {
      hi: ["हल्का टहलें", "योग करें"],
      bn: ["হালকা হাঁটুন", "যোগব্যায়াম করুন"],
      ta: ["லேசாக நடக்கவும்", "யோகா செய்யவும்"],
      te: ["తేలికగా నడవండి", "యోగా చేయండి"],
      mr: ["हलके चाला", "योग करा"],
      en: ["Take light walks", "Do light stretching/yoga"],
    },
  },
};

export function getOfflineDiagnosis(
  symptoms: string[],
  language: Language,
): Diagnosis {
  const s = new Set(symptoms);
  let key = "default";
  if (s.has("chest") || s.has("breathless")) key = "chest";
  else if (s.has("stomach") && s.has("diarrhea")) key = "stomach+diarrhea";
  else if (s.has("fever") && (s.has("cough") || s.has("throat")))
    key = "fever+cough";

  const c = OFFLINE_CONDITIONS[key];
  return {
    condition: c.condition[language] || c.condition.en,
    severity: c.severity,
    description: c.description[language] || c.description.en,
    firstAid: c.firstAid[language] || c.firstAid.en,
    medicines: c.medicines,
    whenToSeek: c.whenToSeek[language] || c.whenToSeek.en,
    possibleConditions: c.possibleConditions[language] || c.possibleConditions.en,
    homeCareAdvice: c.homeCareAdvice[language] || c.homeCareAdvice.en,
    recommendedDoctor: c.recommendedDoctor[language] || c.recommendedDoctor.en,
    hospitalRecommendation: c.hospitalRecommendation[language] || c.hospitalRecommendation.en,
    dietRecommendation: c.dietRecommendation[language] || c.dietRecommendation.en,
    lifestyleAndExercise: c.lifestyleAndExercise[language] || c.lifestyleAndExercise.en,
  };
}
