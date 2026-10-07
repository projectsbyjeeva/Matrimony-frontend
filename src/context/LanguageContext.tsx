import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Language = "en" | "ta";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const tamilTranslations: Record<string, string> = {
  VALLUVAN: "வள்ளுவன்",
  MATRIMONY: "மணமாலை",
  MANAMAALAI: "மணமாலை",
  "Valluvan Manamaalai": "வள்ளுவன் மணமாலை",
  Home: "முகப்பு",
  Search: "தேடல்",
  "Success Stories": "வெற்றிக் கதைகள்",
  Contact: "தொடர்பு",
  Login: "உள்நுழைய",
  "Register Free": "இலவசமாக பதிவு செய்க",
  English: "ஆங்கிலம்",
  Tamil: "தமிழ்",
  "Trusted Tamil Matrimony": "நம்பகமான தமிழ் திருமண சேவை",
  "❤️ Trusted Tamil Matrimony": "❤️ நம்பகமான தமிழ் திருமண சேவை",
  "Find Your": "உங்கள்",
  Perfect: "சிறந்த",
  "Life Partner": "வாழ்க்கைத் துணை",
  "Perfect Life Partner": "சிறந்த வாழ்க்கைத் துணையைத் தேடுங்கள்",
  "Discover verified bride and groom profiles from trusted families. Safe, secure and designed to help you find your perfect life partner.": "நம்பகமான குடும்பங்களின் சரிபார்க்கப்பட்ட மணமகள் மற்றும் மணமகன் சுயவிவரங்களைக் கண்டறியுங்கள். உங்கள் சிறந்த வாழ்க்கைத் துணையைக் கண்டறிய பாதுகாப்பான முறையில் வடிவமைக்கப்பட்டுள்ளது.",
  "Browse Profiles": "சுயவிவரங்களைப் பார்க்க",
  "Verified Profiles": "சரிபார்த்த சுயவிவரங்கள்",
  "Trusted Families": "நம்பகக் குடும்பங்கள்",
  "Privacy Protected": "தனியுரிமைப் பாதுகாப்பு",
  "SMART MATCH SEARCH": "பொருத்தமான துணைத் தேடல்",
  "Discover suitable profiles": "பொருத்தமான சுயவிவரங்களைக் கண்டறியுங்கள்",
  "Match search": "துணை தேடல்",
  "Profile ID": "சுயவிவர எண்",
  "Looking for": "தேடுவது",
  "Search for a": "தேடுங்கள்",
  Bride: "மணமகள்",
  Groom: "மணமகன்",
  "Preferred age": "விருப்பமான வயது",
  FROM: "முதல்",
  TO: "வரை",
  "City or district": "நகரம் அல்லது மாவட்டம்",
  "Enter city or district": "நகரம் அல்லது மாவட்டத்தை உள்ளிடவும்",
  "Marital status": "திருமண நிலை",
  "Any marital status": "எந்த திருமண நிலையும்",
  "Valluvan community": "வள்ளுவன் சமூகம்",
  "Any Valluvan community": "எந்த வள்ளுவன் சமூகமும்",
  Education: "கல்வி",
  "Any education": "எந்த கல்வியும்",
  Profession: "தொழில்",
  "Any profession": "எந்த தொழிலும்",
  "Advanced filters": "கூடுதல் வடிகட்டிகள்",
  "Hide advanced filters": "கூடுதல் வடிகட்டிகளை மறைக்க",
  "Find my matches": "எனது பொருத்தங்களைக் கண்டறிய",
  Popular: "பிரபலமானவை",
  "Your preferences are secure and will not be shown publicly.": "உங்கள் விருப்பங்கள் பாதுகாப்பாக இருக்கும்; பொதுவில் காட்டப்படாது.",
  "Partner Preferences": "துணை விருப்பங்கள்",
  "Choose your preferences to find matching profiles": "பொருத்தமான சுயவிவரங்களைக் கண்டறிய உங்கள் விருப்பங்களைத் தேர்ந்தெடுக்கவும்",
  "Search Profiles": "சுயவிவரங்களைத் தேடுங்கள்",
  "Matching Profiles": "பொருத்தமான சுயவிவரங்கள்",
  "View Profile": "சுயவிவரத்தைப் பார்க்க",
  "No matching profiles": "பொருத்தமான சுயவிவரங்கள் இல்லை",
  "Try changing one or more filters and search again.": "ஒன்று அல்லது அதற்கு மேற்பட்ட வடிகட்டிகளை மாற்றி மீண்டும் தேடுங்கள்.",
  "Why Choose Us": "ஏன் எங்களைத் தேர்ந்தெடுக்க வேண்டும்",
  "Featured Profiles": "சிறப்பு சுயவிவரங்கள்",
  "Happy Marriages": "மகிழ்ச்சியான திருமணங்கள்",
  "Begin your journey to a meaningful match.": "அர்த்தமுள்ள வாழ்க்கைத் துணைக்கான உங்கள் பயணத்தைத் தொடங்குங்கள்.",
  "Basic Information": "அடிப்படை தகவல்கள்",
  "Profile created for": "சுயவிவரம் உருவாக்கப்படுவது",
  Gender: "பாலினம்",
  "Full name": "முழுப் பெயர்",
  "Date of birth": "பிறந்த தேதி",
  Continue: "தொடரவும்",
  "Already registered?": "ஏற்கனவே பதிவு செய்துள்ளீர்களா?",
  "Login to your account": "உங்கள் கணக்கில் உள்நுழையுங்கள்",
  "WELCOME BACK": "மீண்டும் வரவேற்கிறோம்",
  "Secure login": "பாதுகாப்பான உள்நுழைவு",
  Email: "மின்னஞ்சல்",
  Phone: "தொலைபேசி",
  Password: "கடவுச்சொல்",
  Age: "வயது",
  Height: "உயரம்",
  Occupation: "தொழில்",
  Location: "இருப்பிடம்",
  Country: "நாடு",
  State: "மாநிலம்",
  City: "நகரம்",
  Religion: "மதம்",
  Community: "சமூகம்",
  Male: "ஆண்",
  Female: "பெண்",
  "Never Married": "திருமணமாகாதவர்",
  Divorced: "விவாகரத்து பெற்றவர்",
  Widowed: "துணையை இழந்தவர்",
  Myself: "எனக்காக",
  Son: "மகன்",
  Friend: "நண்பர்",
  "Parent / Guardian": "பெற்றோர் / பாதுகாவலர்",
  Other: "மற்றவை",
  "Back to Search": "தேடலுக்குத் திரும்பு",
  "Register to View Profile": "சுயவிவரத்தைப் பார்க்க பதிவு செய்க",
  "Profile not found": "சுயவிவரம் கிடைக்கவில்லை",
  "Personal Details": "தனிப்பட்ட விவரங்கள்",
  "Contact Details": "தொடர்பு விவரங்கள்",
  "Family Details": "குடும்ப விவரங்கள்",
  "Partner Expectations": "துணை பற்றிய எதிர்பார்ப்புகள்",
  "Languages Known": "தெரிந்த மொழிகள்",
  "Native Place": "சொந்த ஊர்",
  "Quick Links": "விரைவு இணைப்புகள்",
  Services: "சேவைகள்",
  "Customer Support": "வாடிக்கையாளர் உதவி",
  "Privacy Protection": "தனியுரிமைப் பாதுகாப்பு",
  Close: "மூடு",
};

Object.assign(tamilTranslations, {
  "Account": "கணக்கு",
  "Basic": "அடிப்படை",
  "Details": "விவரங்கள்",
  "Tell us who this matrimony profile is for.": "இந்தத் திருமணச் சுயவிவரம் யாருக்காக என்பதைத் தெரிவியுங்கள்.",
  "Enter your contact and login information.": "உங்கள் தொடர்பு மற்றும் உள்நுழைவுத் தகவல்களை உள்ளிடுங்கள்.",
  "Help us provide more relevant profile matches.": "மேலும் பொருத்தமான சுயவிவரங்களை வழங்க எங்களுக்கு உதவுங்கள்.",
  "Select profile type": "சுயவிவர வகையைத் தேர்ந்தெடுக்கவும்",
  "Select gender": "பாலினத்தைத் தேர்ந்தெடுக்கவும்",
  "Select religion": "மதத்தைத் தேர்ந்தெடுக்கவும்",
  "Enter the name as per official records": "அதிகாரப்பூர்வ ஆவணங்களில் உள்ளபடி பெயரை உள்ளிடவும்",
  "Enter your email address or mobile number": "உங்கள் மின்னஞ்சல் முகவரி அல்லது கைப்பேசி எண்ணை உள்ளிடவும்",
  "Enter your password": "உங்கள் கடவுச்சொல்லை உள்ளிடவும்",
  "Re-enter your password": "உங்கள் கடவுச்சொல்லை மீண்டும் உள்ளிடவும்",
  "Minimum 8 characters": "குறைந்தது 8 எழுத்துகள்",
  "Send OTP to:": "ஒருமுறை கடவுச்சொல்லை அனுப்ப வேண்டிய எண்:",
  "Verify OTP & Login": "ஒருமுறை கடவுச்சொல்லைச் சரிபார்த்து உள்நுழையவும்",
  "Enter 6-digit OTP": "6 இலக்க ஒருமுறை கடவுச்சொல்லை உள்ளிடவும்",
  "Create Account": "கணக்கை உருவாக்கவும்",
  "Keep me logged in": "என்னை உள்நுழைந்த நிலையில் வைத்திருக்கவும்",
  "New to Valluvan Manamaalai?": "வள்ளுவன் மணமாலைக்குப் புதியவரா?",
  "Your account information is protected.": "உங்கள் கணக்குத் தகவல்கள் பாதுகாக்கப்படுகின்றன.",
  "Profile Type": "சுயவிவர வகை",
  "Contact Person": "தொடர்பு நபர்",
  "Family Background": "குடும்பப் பின்னணி",
  "Father's Occupation": "தந்தையின் தொழில்",
  "Mother's Occupation": "தாயின் தொழில்",
  "Siblings": "உடன்பிறந்தவர்கள்",
  "Horoscope Status": "ஜாதக நிலை",
  "Horoscope Match": "ஜாதகப் பொருத்தம்",
  "Membership": "உறுப்பினர் நிலை",
  "Premium Membership": "சிறப்பு உறுப்பினர் நிலை",
  "Verified Member": "சரிபார்க்கப்பட்ட உறுப்பினர்",
  "Verified Profile": "சரிபார்க்கப்பட்ட சுயவிவரம்",
  "Available": "கிடைக்கிறது",
  "DIRECT PROFILE SEARCH": "நேரடி சுயவிவரத் தேடல்",
  "Already know the Profile ID?": "சுயவிவர எண் ஏற்கனவே தெரியுமா?",
  "Find matches with advanced filters.": "மேம்பட்ட வடிகட்டிகளுடன் பொருத்தங்களைக் கண்டறியுங்கள்.",
  "More search filters": "மேலும் தேடல் வடிகட்டிகள்",
  "Ready to meet your match?": "உங்கள் துணையைச் சந்திக்கத் தயாரா?",
  "verified profiles": "சரிபார்க்கப்பட்ட சுயவிவரங்கள்",
  "Profiles Found": "சுயவிவரங்கள் கிடைத்தன",
  "Back to Search": "தேடலுக்குத் திரும்பு",
  "Register to View Profile": "சுயவிவரத்தைப் பார்க்க பதிவு செய்க",
  "Please register first to view complete profile details and contact information.": "முழுமையான சுயவிவரம் மற்றும் தொடர்புத் தகவல்களைப் பார்க்க முதலில் பதிவு செய்யவும்.",
  "Contact details are protected and shared only after mutual interest.": "தொடர்பு விவரங்கள் பாதுகாக்கப்பட்டு, இருவரின் விருப்பத்திற்குப் பிறகே பகிரப்படும்.",
  "Continue discovering suitable partners.": "பொருத்தமான துணைகளைத் தொடர்ந்து கண்டறியுங்கள்.",
  "Why Choose": "ஏன் தேர்ந்தெடுக்க வேண்டும்",
  "Why Choose Us": "ஏன் எங்களைத் தேர்ந்தெடுக்க வேண்டும்",
  "Meet some of our recently registered verified members.": "சமீபத்தில் பதிவு செய்த சரிபார்க்கப்பட்ட உறுப்பினர்களைப் பாருங்கள்.",
  "Every profile is manually verified for your safety.": "உங்கள் பாதுகாப்பிற்காக ஒவ்வொரு சுயவிவரமும் நேரடியாகச் சரிபார்க்கப்படுகிறது.",
  "Connect easily with interested matches.": "விருப்பமுள்ள துணைகளுடன் எளிதாகத் தொடர்புகொள்ளுங்கள்.",
  "Get better visibility and priority.": "சிறந்த பார்வையையும் முன்னுரிமையையும் பெறுங்கள்.",
  "We are here to help you at every step.": "ஒவ்வொரு படியிலும் உங்களுக்கு உதவ நாங்கள் இருக்கிறோம்.",
  "Your privacy is our top priority.": "உங்கள் தனியுரிமையே எங்கள் முதன்மை முன்னுரிமை.",
  "Genuine profiles": "உண்மையான சுயவிவரங்கள்",
  "Meaningful matches": "அர்த்தமுள்ள பொருத்தங்கள்",
  "Relevant matches": "பொருத்தமான துணைகள்",
  "Dedicated Support": "அர்ப்பணிப்பான உதவி",
  "Easy Communication": "எளிய தொடர்பு",
  "Privacy protected": "தனியுரிமை பாதுகாக்கப்பட்டது",
  "Private preferences": "தனிப்பட்ட விருப்பங்கள்",
  "Quick Links": "விரைவு இணைப்புகள்",
  "Services": "சேவைகள்",
  "Customer Support": "வாடிக்கையாளர் உதவி",
  "Successful Marriages": "வெற்றிகரமான திருமணங்கள்",
  "Registered Members": "பதிவு செய்த உறுப்பினர்கள்",
  "Customer Rating": "வாடிக்கையாளர் மதிப்பீடு",
  "Myself": "எனக்காக",
  "Son": "மகன்",
  "Daughter": "மகள்",
  "Brother": "சகோதரர்",
  "Sister": "சகோதரி",
  "Friend": "நண்பர்",
  "Parent / Guardian": "பெற்றோர் / பாதுகாவலர்",
  "Hindu": "இந்து",
  "Christian": "கிறிஸ்தவர்",
  "Muslim": "இஸ்லாமியர்",
  "Buddhist": "பௌத்தர்",
  "Jain": "சமணர்",
  "Sikh": "சீக்கியர்",
  "Never Married": "திருமணமாகாதவர்",
  "Divorced": "விவாகரத்து பெற்றவர்",
  "Widowed": "துணையை இழந்தவர்",
  "Engineer": "பொறியாளர்",
  "Doctor": "மருத்துவர்",
  "Teacher": "ஆசிரியர்",
  "Business": "வணிகம்",
  "Homemaker": "இல்லத்தரசி",
  "Software Engineer": "மென்பொருள் பொறியாளர்",
  "Civil Engineer": "கட்டிடப் பொறியாளர்",
  "Banking Professional": "வங்கித் துறை நிபுணர்",
  "Business Owner": "தொழில் உரிமையாளர்",
  "Product Designer": "தயாரிப்பு வடிவமைப்பாளர்",
  "Project Manager": "திட்ட மேலாளர்",
  "IT Professional": "தகவல் தொழில்நுட்ப நிபுணர்",
  "Senior Engineer": "மூத்த பொறியாளர்",
  "India": "இந்தியா",
  "Tamil Nadu": "தமிழ்நாடு",
  "Chennai": "சென்னை",
  "Coimbatore": "கோயம்புத்தூர்",
  "Erode": "ஈரோடு",
  "Salem": "சேலம்",
  "Madurai": "மதுரை",
  "Bengaluru": "பெங்களூரு",
  "Trichy": "திருச்சி",
  "Tirunelveli": "திருநெல்வேலி",
  "Karnataka": "கர்நாடகம்",
  "Kerala": "கேரளம்",
  "Puducherry": "புதுச்சேரி",
  "Singapore": "சிங்கப்பூர்",
  "Malaysia": "மலேசியா",
  "Australia": "ஆஸ்திரேலியா",
  "Canada": "கனடா",
  "United Kingdom": "ஐக்கிய இராச்சியம்",
  "United States": "அமெரிக்கா",
  "United Arab Emirates": "ஐக்கிய அரபு அமீரகம்",
  "Arun": "அருண்",
  "Priya": "பிரியா",
  "Karthik": "கார்த்திக்",
  "Divya": "திவ்யா",
  "Vignesh": "விக்னேஷ்",
  "Harini": "ஹரிணி",
  "Keerthana": "கீர்த்தனா",
  "Pradeep": "பிரதீப்",
  "Nithya": "நித்யா",
  "Surya": "சூர்யா",
  "Arun & Priya": "அருண் மற்றும் பிரியா",
  "Karthik & Divya": "கார்த்திக் மற்றும் திவ்யா",
  "Vignesh & Harini": "விக்னேஷ் மற்றும் ஹரிணி",
  "Please enter the full name": "முழுப் பெயரை உள்ளிடவும்",
  "Please select profile type": "சுயவிவர வகையைத் தேர்ந்தெடுக்கவும்",
  "Please select gender": "பாலினத்தைத் தேர்ந்தெடுக்கவும்",
  "Please select date of birth": "பிறந்த தேதியைத் தேர்ந்தெடுக்கவும்",
  "Please select religion": "மதத்தைத் தேர்ந்தெடுக்கவும்",
  "Please select community": "சமூகத்தைத் தேர்ந்தெடுக்கவும்",
  "Please enter your city or district": "உங்கள் நகரம் அல்லது மாவட்டத்தை உள்ளிடவும்",
  "Please enter a valid email address": "சரியான மின்னஞ்சல் முகவரியை உள்ளிடவும்",
  "Please confirm your password": "உங்கள் கடவுச்சொல்லை உறுதிப்படுத்தவும்",
  "Passwords do not match": "கடவுச்சொற்கள் பொருந்தவில்லை",
  "Password must contain at least 8 characters": "கடவுச்சொல்லில் குறைந்தது 8 எழுத்துகள் இருக்க வேண்டும்",
  "Please accept the terms and privacy policy": "விதிமுறைகள் மற்றும் தனியுரிமைக் கொள்கையை ஏற்கவும்",
  "Enter a valid 10-digit mobile number": "சரியான 10 இலக்க கைப்பேசி எண்ணை உள்ளிடவும்",
  "Enter a valid 6-digit OTP": "சரியான 6 இலக்க ஒருமுறை கடவுச்சொல்லை உள்ளிடவும்",
  "Andhra Pradesh": "ஆந்திரப் பிரதேசம்",
  "Arunachal Pradesh": "அருணாச்சலப் பிரதேசம்",
  "Assam": "அசாம்",
  "Bihar": "பீகார்",
  "Chhattisgarh": "சத்தீஸ்கர்",
  "Delhi": "தில்லி",
  "Goa": "கோவா",
  "Gujarat": "குஜராத்",
  "Haryana": "ஹரியானா",
  "Himachal Pradesh": "இமாச்சலப் பிரதேசம்",
  "Jammu and Kashmir": "ஜம்மு மற்றும் காஷ்மீர்",
  "Jharkhand": "ஜார்க்கண்ட்",
  "Madhya Pradesh": "மத்தியப் பிரதேசம்",
  "Maharashtra": "மகாராஷ்டிரம்",
  "Manipur": "மணிப்பூர்",
  "Meghalaya": "மேகாலயா",
  "Mizoram": "மிசோரம்",
  "Nagaland": "நாகாலாந்து",
  "Odisha": "ஒடிசா",
  "Punjab": "பஞ்சாப்",
  "Rajasthan": "ராஜஸ்தான்",
  "Telangana": "தெலங்கானா",
  "Tripura": "திரிபுரா",
  "Uttar Pradesh": "உத்தரப் பிரதேசம்",
  "Uttarakhand": "உத்தராகண்ட்",
  "West Bengal": "மேற்கு வங்காளம்",
  "Gounder": "கவுண்டர்",
  "Nadar": "நாடார்",
  "Vanniyar": "வன்னியர்",
  "Tamil, English": "தமிழ், ஆங்கிலம்",
  "One sibling": "ஒரு உடன்பிறந்தவர்",
  "Well-settled and respected family": "நல்ல நிலையில் உள்ள மதிப்புமிக்க குடும்பம்",
  "Kind, educated and from a good family.": "அன்பானவர், கல்வியறிவு பெற்றவர், நல்ல குடும்பத்தைச் சேர்ந்தவர்.",
  "Any": "எதுவாகவும்",
  "B.E": "பொறியியல் இளநிலை",
  "B.Tech": "தொழில்நுட்ப இளநிலை",
  "B.Sc": "அறிவியல் இளநிலை",
  "M.Tech": "தொழில்நுட்ப முதுநிலை",
  "M.Com": "வணிகவியல் முதுநிலை",
  "MBA": "வணிக மேலாண்மை முதுநிலை",
  "MCA": "கணினிப் பயன்பாட்டியல் முதுநிலை",
  "B.Arch": "கட்டிடக்கலை இளநிலை",
});

const originalText = new WeakMap<Text, string>();
const originalAttributes = new WeakMap<Element, Map<string, string>>();

function translateString(value: string, language: Language) {
  const leading = value.match(/^\s*/)?.[0] || "";
  const trailing = value.match(/\s*$/)?.[0] || "";
  const clean = value.trim();
  if (!clean) return value;
  if (language === "ta") {
    const years = clean.match(/^(\d+) years?$/i);
    if (years) return `${leading}${years[1]} வயது${trailing}`;

    const profiles = clean.match(/^(\d+) Profiles Found$/i);
    if (profiles) return `${leading}${profiles[1]} சுயவிவரங்கள் கிடைத்தன${trailing}`;

    const preview = clean.match(/^Preview ends in (\d+)s$/i);
    if (preview) return `${leading}முன்னோட்டம் ${preview[1]} வினாடிகளில் முடியும்${trailing}`;
  }
  const translated = language === "ta"
    ? tamilTranslations[clean] || clean
    : clean;
  return `${leading}${translated}${trailing}`;
}

function translatePage(language: Language) {
  const root = document.body;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let current = walker.nextNode() as Text | null;

  while (current) {
    const parent = current.parentElement;
    if (
      parent &&
      !["SCRIPT", "STYLE"].includes(parent.tagName) &&
      !parent.closest("[data-no-translate]")
    ) {
      const currentValue = current.nodeValue || "";
      const storedValue = originalText.get(current);

      if (
        storedValue === undefined ||
        (language === "en" &&
          /[A-Za-z]/.test(currentValue) &&
          !/[A-Za-z]/.test(storedValue))
      ) {
        originalText.set(current, currentValue);
      }

      const source = originalText.get(current) || "";
      current.nodeValue = translateString(source, language);
    }
    current = walker.nextNode() as Text | null;
  }

  root.querySelectorAll("input, button, [title], [aria-label]").forEach((element) => {
    if (element.closest("[data-no-translate]")) return;
    const names = ["placeholder", "title", "aria-label"];
    if (!originalAttributes.has(element)) originalAttributes.set(element, new Map());
    const stored = originalAttributes.get(element)!;
    names.forEach((name) => {
      const value = element.getAttribute(name);
      if (value !== null && !stored.has(name)) stored.set(name, value);
      const source = stored.get(name);
      if (source !== undefined) element.setAttribute(name, translateString(source, language));
    });
  });
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() =>
    localStorage.getItem("valluvan-language") === "ta" ? "ta" : "en"
  );

  useEffect(() => {
    localStorage.setItem("valluvan-language", language);
    document.documentElement.lang = language;
    translatePage(language);

    const observer = new MutationObserver(() => translatePage(language));
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage }), [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error("useLanguage must be used inside LanguageProvider");
  return value;
}
