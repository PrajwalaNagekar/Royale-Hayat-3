import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Brain, Sparkles, Stethoscope, Building2, User, CheckCircle2,
  Search, ArrowRight, ArrowLeft, Clock, Shield, Star,
  Activity, Heart, Baby, Eye, Bone, Pill, Microscope, Scissors, Smile,
  AlertCircle, FileText, Thermometer, ClipboardList, UserPlus, LogIn
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

// ─── DATA ────────────────────────────────────────────────────────────────────

const departments = [
  { id: 1, name: "Obstetrics & Gynecology", icon: Heart, category: "Women's Health" },
  { id: 2, name: "Pediatrics", icon: Baby, category: "Children" },
  { id: 3, name: "Internal Medicine", icon: Activity, category: "General" },
  { id: 4, name: "Cardiology", icon: Heart, category: "Heart & Vascular" },
  { id: 5, name: "Orthopedics", icon: Bone, category: "Bones & Joints" },
  { id: 6, name: "Dermatology", icon: Smile, category: "Skin" },
  { id: 7, name: "Ophthalmology", icon: Eye, category: "Eye" },
  { id: 8, name: "ENT", icon: Stethoscope, category: "Head & Neck" },
  { id: 9, name: "Neurology", icon: Brain, category: "Nervous System" },
  { id: 10, name: "General Surgery", icon: Scissors, category: "Surgery" },
  { id: 11, name: "Pulmonology", icon: Activity, category: "Lungs" },
  { id: 12, name: "Gastroenterology", icon: Pill, category: "Digestive" },
  { id: 13, name: "Urology", icon: Stethoscope, category: "Urinary" },
  { id: 14, name: "Psychiatry", icon: Brain, category: "Mental Health" },
  { id: 15, name: "Nephrology", icon: Microscope, category: "Kidney" },
  { id: 16, name: "Endocrinology", icon: Activity, category: "Hormones" },
  { id: 17, name: "Oncology", icon: Microscope, category: "Cancer Care" },
  { id: 18, name: "Dental Clinic", icon: Smile, category: "Dental" },
  { id: 19, name: "Plastic & Cosmetic Surgery", icon: Scissors, category: "Cosmetic" },
  { id: 20, name: "Neonatal Unit (NICU)", icon: Baby, category: "Children" },
  { id: 21, name: "IVF & Reproductive Medicine", icon: Heart, category: "Women's Health" },
  { id: 22, name: "Physiotherapy", icon: Bone, category: "Rehabilitation" },
  { id: 23, name: "Radiology", icon: Microscope, category: "Diagnostics" },
  { id: 24, name: "Laboratory", icon: Microscope, category: "Diagnostics" },
  { id: 25, name: "Nutrition & Dietetics", icon: Pill, category: "Wellness" },
  { id: 26, name: "Emergency Medicine", icon: AlertCircle, category: "Emergency" },
  { id: 27, name: "Rheumatology", icon: Bone, category: "Bones & Joints" },
  { id: 28, name: "Hematology", icon: Microscope, category: "Blood" },
  { id: 29, name: "Allergy & Immunology", icon: Shield, category: "Immunity" },
  { id: 30, name: "Pain Management", icon: Pill, category: "Wellness" },
];

const doctorsData: Record<number, Array<{
  id: number; name: string; specialty: string; available: boolean;
  languages: string[]; experience: string; rating: number;
}>> = {};

departments.forEach((dept) => {
  const firstNames = ["Dr. Ahmed", "Dr. Hanan", "Dr. Khalid", "Dr. Fatima", "Dr. Omar", "Dr. Sara", "Dr. Mohammed"];
  const lastNames = ["Al-Khaled", "Al-Shammari", "Al-Rashidi", "Al-Mutairi", "Al-Dosari", "Al-Sabah", "Al-Fahad"];
  const count = 3 + Math.floor(Math.random() * 3);
  doctorsData[dept.id] = Array.from({ length: count }, (_, i) => ({
    id: dept.id * 100 + i,
    name: `${firstNames[i % firstNames.length]} ${lastNames[(i + dept.id) % lastNames.length]}`,
    specialty: dept.name,
    available: Math.random() > 0.3,
    languages: i % 2 === 0 ? ["English", "Arabic"] : ["English", "Arabic", "Hindi"],
    experience: `${8 + Math.floor(Math.random() * 15)}+ Years`,
    rating: 4.2 + Math.round(Math.random() * 8) / 10,
  }));
});

// All doctors flat for "know your doctor" path
const allDoctorsFlat = Object.values(doctorsData).flat();

// Steps for primary flow: Department → Doctor → Patient Info → Confirm
// steps are rendered dynamically with translations below

// ─── COMPONENT ───────────────────────────────────────────────────────────────

const BookAppointment = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t, lang } = useLanguage();
  const [step, setStep] = useState(0);
  const [bookingPath, setBookingPath] = useState<"primary" | "doctor" | "symptoms" | null>(null);

  // Step 0: Department
  const [deptSearch, setDeptSearch] = useState("");
  const [selectedDept, setSelectedDept] = useState<number | null>(null);
  const [showAllDepts, setShowAllDepts] = useState(false);

  // Step 1: Doctor
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [doctorSearch, setDoctorSearch] = useState("");
  const [isRequestMode, setIsRequestMode] = useState(false);
  const [showAllDoctors, setShowAllDoctors] = useState(false);

  // Step 2: Patient Details
  const [patientType, setPatientType] = useState<"returning" | "new" | null>(null);
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [patientCountryCode, setPatientCountryCode] = useState("+965");
  const [patientAge, setPatientAge] = useState("");
  const [patientGender, setPatientGender] = useState("");
  const [patientErrors, setPatientErrors] = useState<Record<string, string>>({});

  // Symptom path
  const [symptomText, setSymptomText] = useState("");
  const [symptomChips, setSymptomChips] = useState<string[]>([]);
  const [symptomAnalyzing, setSymptomAnalyzing] = useState(false);
  const [symptomResults, setSymptomResults] = useState<number[] | null>(null);

  const [booked, setBooked] = useState(false);

  // Read query param on mount
  useEffect(() => {
    const pathParam = searchParams.get("path");
    if (pathParam === "primary") { setBookingPath("primary"); setStep(0); }
    else if (pathParam === "doctor") { setBookingPath("doctor"); setStep(1); }
    else if (pathParam === "symptoms") { setBookingPath("symptoms"); setStep(0); }
  }, [searchParams]);

  const filteredDepts = departments.filter(
    (d) =>
      d.name.toLowerCase().includes(deptSearch.toLowerCase()) ||
      d.category.toLowerCase().includes(deptSearch.toLowerCase())
  );

  const doctors = selectedDept ? doctorsData[selectedDept] || [] : [];
  const filteredAllDoctors = allDoctorsFlat.filter(d =>
    d.name.toLowerCase().includes(doctorSearch.toLowerCase()) ||
    d.specialty.toLowerCase().includes(doctorSearch.toLowerCase())
  );
  const selectedDeptObj = departments.find((d) => d.id === selectedDept);
  const selectedDoctorObj = bookingPath === "doctor"
    ? allDoctorsFlat.find(d => d.id === selectedDoctor)
    : doctors.find((d) => d.id === selectedDoctor);

  const isAr = lang === "ar";

  const steps = [
    { label: isAr ? "القسم" : "Department", icon: Building2 },
    { label: isAr ? "الطبيب" : "Doctor", icon: User },
    { label: isAr ? "بيانات المريض" : "Patient Info", icon: ClipboardList },
    { label: isAr ? "تأكيد" : "Confirm", icon: CheckCircle2 },
  ];

  const validatePatientDetails = () => {
    const errors: Record<string, string> = {};
    if (!patientName.trim()) errors.name = isAr ? "الاسم الكامل مطلوب" : "Full name is required";
    if (!patientPhone.trim()) errors.phone = isAr ? "رقم الهاتف مطلوب" : "Phone number is required";
    else if (!/^\d{7,15}$/.test(patientPhone.trim())) errors.phone = isAr ? "أدخل رقم هاتف صحيح" : "Enter a valid phone number";
    if (!patientAge.trim()) errors.age = isAr ? "العمر مطلوب" : "Age is required";
    else if (isNaN(Number(patientAge)) || Number(patientAge) < 0 || Number(patientAge) > 150) errors.age = isAr ? "أدخل عمراً صحيحاً" : "Enter a valid age";
    if (!patientGender) errors.gender = isAr ? "الجنس مطلوب" : "Gender is required";
    setPatientErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const canProceed = () => {
    if (!bookingPath) return false;
    switch (step) {
      case 0: return selectedDept !== null;
      case 1: return selectedDoctor !== null;
      case 2: return patientType === "new" && patientName.trim() !== "" && patientPhone.trim() !== "" && patientAge.trim() !== "" && patientGender !== "";
      default: return true;
    }
  };

  const handleNext = () => {
    if (step === 2) {
      if (patientType !== "new") return;
      if (!validatePatientDetails()) return;
    }
    if (step === 3) { setBooked(true); return; }
    setStep((s) => Math.min(s + 1, 3));
  };

  const handleBack = () => {
    if (step === 0 && bookingPath) {
      setBookingPath(null);
      return;
    }
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleSymptomAnalyze = () => {
    const allSymptoms = [...symptomChips, ...(symptomText.trim() ? [symptomText.trim()] : [])];
    if (allSymptoms.length === 0) return;
    setSymptomAnalyzing(true);
    setTimeout(() => {
      // Simple matching
      const symptomKeywords: Record<string, number[]> = {
        headache: [9, 8], "chest pain": [4, 26], fever: [3, 2], cough: [11, 8],
        fatigue: [3, 16], dizziness: [9, 8], nausea: [12, 1], "back pain": [5, 22],
        "joint pain": [5, 27], "shortness of breath": [11, 4],
      };
      const deptIds = new Set<number>();
      allSymptoms.forEach(s => {
        const matches = symptomKeywords[s.toLowerCase()];
        if (matches) matches.forEach(id => deptIds.add(id));
      });
      if (deptIds.size === 0) { deptIds.add(3); deptIds.add(10); }
      setSymptomResults(Array.from(deptIds));
      setSymptomAnalyzing(false);
    }, 1200);
  };

  const chipOptions = ["Headache", "Chest Pain", "Fever", "Cough", "Fatigue", "Dizziness", "Nausea", "Back Pain", "Joint Pain", "Shortness of Breath"];

  const pageVariants = {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  };

  // ─── BOOKED SUCCESS SCREEN ─────────────────────────────────────────────────
  if (booked) {
    return (
      <div className="min-h-screen bg-background pt-[var(--header-height,56px)]">
        <Header />
        <div className="pt-2">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
            className="bg-primary py-16 text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 rounded-full bg-primary-foreground/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-primary-foreground" />
            </motion.div>
            <h1 className="text-3xl md:text-5xl font-serif text-primary-foreground mb-3">
              {isRequestMode ? t("requestSubmitted") : t("appointmentConfirmed")}
            </h1>
            <p className="text-primary-foreground/70 font-body text-sm max-w-md mx-auto">
              {isRequestMode ? t("requestConfirmMsg") : t("bookingConfirmMsg")}
            </p>
          </motion.div>

          <div className="container mx-auto px-6 py-12 max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="bg-popover rounded-2xl border border-border p-8 mb-6 shadow-sm -mt-8">
              <h3 className="font-serif text-lg text-foreground mb-5">{t("appointmentDetails")}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 font-body text-sm">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-accent mt-0.5" />
                  <div>
                    <p className="text-muted-foreground text-xs uppercase tracking-wider">{t("doctor")}</p>
                    <p className="text-foreground font-medium">{selectedDoctorObj?.name}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-accent mt-0.5" />
                  <div>
                    <p className="text-muted-foreground text-xs uppercase tracking-wider">{t("department")}</p>
                    <p className="text-foreground font-medium">{selectedDeptObj?.name || selectedDoctorObj?.specialty}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ClipboardList className="w-5 h-5 text-accent mt-0.5" />
                  <div>
                    <p className="text-muted-foreground text-xs uppercase tracking-wider">{t("patient")}</p>
                    <p className="text-foreground font-medium">{patientName}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="bg-popover rounded-2xl border border-border p-8 mb-6">
              <h3 className="font-serif text-lg text-foreground mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-accent" />
                {t("nextSteps")}
              </h3>
              <ul className="space-y-3 font-body text-sm text-muted-foreground">
                {[t("step1"), t("step2"), t("step3"), t("step4"), t("step5")].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <div className="text-center">
              <button onClick={() => navigate("/")}
                className="bg-primary text-primary-foreground px-10 py-3.5 rounded-lg font-body text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors">
                {t("backToHome")}
              </button>
            </div>
          </div>
        </div>
        <Footer />
        <ScrollToTop />
      </div>
    );
  }

  // ─── PATH SELECTION ────────────────────────────────────────────────────────
  if (!bookingPath) {
    return (
      <div className="min-h-screen bg-background pt-[var(--header-height,56px)]">
        <Header />
        <div className="container mx-auto px-6 py-6 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-2">{t("bookYourAppointment")}</h1>
            <p className="text-muted-foreground font-body text-sm">
              {lang === "ar" ? "اختر طريقة الحجز المناسبة لك" : "Choose how you'd like to book"}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* PATH 1: Department first */}
            <motion.button whileHover={{ y: -6, boxShadow: "0 20px 40px -12px rgba(74,20,35,0.12)" }} whileTap={{ scale: 0.98 }}
              onClick={() => { setBookingPath("primary"); setStep(0); }}
              className="bg-popover rounded-2xl p-8 border border-border text-center transition-all hover:border-primary/40">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-serif text-lg text-foreground mb-2">{lang === "ar" ? "اختر القسم" : "Select Department"}</h3>
              <p className="font-body text-xs text-muted-foreground">
                {lang === "ar" ? "ابدأ باختيار القسم ثم الطبيب" : "Start by choosing a department, then a doctor"}
              </p>
            </motion.button>

            {/* PATH 2: Know Doctor */}
            <motion.button whileHover={{ y: -6, boxShadow: "0 20px 40px -12px rgba(74,20,35,0.12)" }} whileTap={{ scale: 0.98 }}
              onClick={() => { setBookingPath("doctor"); setStep(1); }}
              className="bg-popover rounded-2xl p-8 border border-border text-center transition-all hover:border-accent/40">
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-serif text-lg text-foreground mb-2">{lang === "ar" ? "أعرف طبيبي" : "I Know My Doctor"}</h3>
              <p className="font-body text-xs text-muted-foreground">
                {lang === "ar" ? "انقر هنا إذا كنت تعرف طبيبك" : "Click here if you know your doctor"}
              </p>
            </motion.button>

            {/* PATH 3: Symptoms */}
            <motion.button whileHover={{ y: -6, boxShadow: "0 20px 40px -12px rgba(74,20,35,0.12)" }} whileTap={{ scale: 0.98 }}
              onClick={() => { setBookingPath("symptoms"); setStep(0); }}
              className="bg-popover rounded-2xl p-8 border border-border text-center transition-all hover:border-primary/40">
              <div className="w-14 h-14 rounded-full bg-secondary/40 flex items-center justify-center mx-auto mb-4">
                <Brain className="w-7 h-7 text-foreground" />
              </div>
              <h3 className="font-serif text-lg text-foreground mb-2">{lang === "ar" ? "لست متأكداً" : "Not Sure?"}</h3>
              <p className="font-body text-xs text-muted-foreground">
                {lang === "ar" ? "لست متأكداً من الطبيب أو القسم؟ تحقق من الأعراض" : "Not sure about doctor or department? Check with symptoms"}
              </p>
            </motion.button>
          </div>
        </div>
        <Footer />
        <ScrollToTop />
      </div>
    );
  }

  // ─── SYMPTOM PATH (inline, then transitions to primary flow) ───────────────
  if (bookingPath === "symptoms" && symptomResults === null) {
    return (
      <div className="min-h-screen bg-background pt-[var(--header-height,56px)]">
        <Header />
        <div className="container mx-auto px-6 py-6 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/5 rounded-full px-4 py-1.5 mb-4">
              <Brain className="w-4 h-4 text-accent" />
              <span className="text-accent text-xs tracking-[0.3em] uppercase font-body">{lang === "ar" ? "فحص الأعراض" : "Symptom Checker"}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-serif text-foreground mb-2">{t("tellUsSymptoms")}</h1>
          </motion.div>

          <div className="bg-popover rounded-2xl p-8 border border-border shadow-sm">
            <div className="flex flex-wrap gap-2 mb-4">
              {chipOptions.map((chip) => (
                <motion.button key={chip} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                  onClick={() => setSymptomChips(prev => prev.includes(chip) ? prev.filter(c => c !== chip) : [...prev, chip])}
                  className={`px-4 py-2 rounded-full text-xs font-body tracking-wide transition-all duration-200 border ${
                    symptomChips.includes(chip)
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "bg-background border-border text-muted-foreground hover:border-accent hover:text-accent"
                  }`}>{chip}</motion.button>
              ))}
            </div>
            <textarea value={symptomText} onChange={(e) => setSymptomText(e.target.value)}
              placeholder={t("describeInDetail")}
              className="w-full h-24 bg-muted/20 border border-border rounded-xl p-4 font-body text-sm text-foreground placeholder:text-muted-foreground/50 resize-none focus:outline-none focus:ring-2 focus:ring-accent/30 mb-4" />

            {/* AI Disclaimer - PROMINENT */}
            <div className="bg-destructive/10 rounded-xl p-4 border-2 border-destructive/30 mb-4">
              <p className="font-body text-sm text-foreground leading-relaxed font-medium">
                <AlertCircle className="w-4 h-4 inline mr-2 text-destructive" />
                {lang === "ar"
                  ? "⚠️ تنويه مهم: هذه الأداة تقدم اقتراحات عامة فقط ولا تُعد بديلاً عن الاستشارة الطبية المتخصصة. يرجى مراجعة الطبيب للتشخيص الدقيق والعلاج المناسب."
                  : "⚠️ Important Disclaimer: This tool provides general suggestions only and is NOT a substitute for professional medical advice. Please consult a doctor for accurate diagnosis and appropriate treatment."}
              </p>
            </div>

            <AnimatePresence>
              {symptomAnalyzing && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center gap-3 py-6">
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    className="w-6 h-6 rounded-full border-2 border-accent/20 border-t-accent" />
                  <span className="font-body text-sm text-accent">{t("analyzing")}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-between">
              <button onClick={() => { setBookingPath(null); setSymptomChips([]); setSymptomText(""); }}
                className="flex items-center gap-2 text-muted-foreground font-body text-sm hover:text-foreground transition-colors">
                <ArrowLeft className="w-4 h-4" /> {t("previous")}
              </button>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={handleSymptomAnalyze}
                disabled={symptomChips.length === 0 && !symptomText.trim() || symptomAnalyzing}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-body text-xs tracking-widest uppercase transition-all ${
                  (symptomChips.length > 0 || symptomText.trim()) && !symptomAnalyzing
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}>
                <Sparkles className="w-3.5 h-3.5" /> {t("analyzeSymptoms")}
              </motion.button>
            </div>
          </div>
        </div>
        <Footer />
        <ScrollToTop />
      </div>
    );
  }

  // After symptoms analyzed, show results then flow into primary
  if (bookingPath === "symptoms" && symptomResults !== null && step === 0) {
    return (
      <div className="min-h-screen bg-background pt-[var(--header-height,56px)]">
        <Header />
        <div className="container mx-auto px-6 py-6 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <h2 className="text-2xl font-serif text-foreground mb-2">{lang === "ar" ? "الأقسام الموصى بها" : "Recommended Departments"}</h2>
            <p className="text-muted-foreground font-body text-xs">{lang === "ar" ? "بناءً على أعراضك، نوصي بالأقسام التالية" : "Based on your symptoms, we recommend these departments"}</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {symptomResults.map(id => {
              const dept = departments.find(d => d.id === id);
              if (!dept) return null;
              return (
                <motion.button key={dept.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={() => { setSelectedDept(dept.id); setBookingPath("primary"); setStep(1); }}
                  className={`flex items-center gap-3 p-4 rounded-xl border transition-all text-left ${
                    selectedDept === dept.id ? "bg-primary text-primary-foreground border-primary" : "bg-popover border-border hover:border-accent text-foreground"
                  }`}>
                  <dept.icon className="w-5 h-5 flex-shrink-0" />
                  <div>
                    <p className="font-body text-sm font-medium">{dept.name}</p>
                    <p className="font-body text-xs text-accent"><Sparkles className="w-3 h-3 inline mr-1" />{lang === "ar" ? "توصية ذكية" : "AI Match"}</p>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <p className="text-center text-muted-foreground font-body text-xs mb-4">{lang === "ar" ? "أو اختر من جميع الأقسام أدناه" : "Or choose from all departments below"}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {departments.filter(d => !symptomResults.includes(d.id)).map(dept => (
              <motion.button key={dept.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={() => { setSelectedDept(dept.id); setBookingPath("primary"); setStep(1); }}
                className="flex items-center gap-3 p-4 rounded-xl border border-border bg-popover hover:border-accent/40 text-foreground text-left">
                <dept.icon className="w-5 h-5 text-accent flex-shrink-0" />
                <div className="min-w-0">
                  <p className="font-body text-sm font-medium truncate">{dept.name}</p>
                  <p className="font-body text-xs text-muted-foreground">{dept.category}</p>
                </div>
              </motion.button>
            ))}
          </div>

          <div className="flex items-center justify-start mt-8">
            <button onClick={() => { setSymptomResults(null); }} className="flex items-center gap-2 text-muted-foreground font-body text-sm hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" /> {t("previous")}
            </button>
          </div>
        </div>
        <Footer />
        <ScrollToTop />
      </div>
    );
  }

  // ─── MAIN BOOKING FLOW ─────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background pt-[var(--header-height,56px)]">
      <Header />
      <div className="container mx-auto px-6 py-6 max-w-6xl">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-serif text-foreground">{t("bookYourAppointment")}</h1>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-1 mb-12 flex-wrap">
          {steps.map((s, i) => (
            <div key={s.label} className="flex items-center">
              <motion.button
                onClick={() => i < step && setStep(i)}
                disabled={i > step}
                whileHover={i < step ? { scale: 1.05 } : {}}
                className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-body tracking-wide transition-all duration-300 ${
                  i === step ? "bg-primary text-primary-foreground shadow-md"
                    : i < step ? "bg-accent/10 text-accent cursor-pointer hover:bg-accent/20"
                    : "bg-muted/40 text-muted-foreground"
                }`}>
                <s.icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{s.label}</span>
              </motion.button>
              {i < steps.length - 1 && <div className={`w-6 h-0.5 mx-0.5 rounded ${i < step ? "bg-accent" : "bg-border"}`} />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* STEP 0: DEPARTMENTS (primary path) */}
          {step === 0 && bookingPath === "primary" && (
            <motion.div key="s0" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.35 }}>
              <div className="max-w-4xl mx-auto">
                <div className="relative mb-6">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type="text" value={deptSearch} onChange={(e) => setDeptSearch(e.target.value)}
                    placeholder={t("searchDepartments")}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-popover font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/30" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {(() => {
                    const displayDepts = deptSearch.trim() || showAllDepts ? filteredDepts : filteredDepts.slice(0, 6);
                    return displayDepts.map((dept) => (
                      <motion.button key={dept.id} whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedDept(dept.id)}
                        className={`flex items-center gap-3 p-4 rounded-xl border transition-all text-left ${
                          selectedDept === dept.id
                            ? "bg-primary text-primary-foreground border-primary shadow-md"
                            : "bg-popover border-border hover:border-accent/40 text-foreground"
                        }`}>
                        <dept.icon className={`w-5 h-5 flex-shrink-0 ${selectedDept === dept.id ? "" : "text-accent"}`} />
                        <div className="min-w-0">
                          <p className="font-body text-sm font-medium truncate">{dept.name}</p>
                          <p className={`font-body text-xs ${selectedDept === dept.id ? "text-primary-foreground/60" : "text-muted-foreground"}`}>{dept.category}</p>
                        </div>
                      </motion.button>
                    ));
                  })()}
                </div>
                {!showAllDepts && !deptSearch.trim() && filteredDepts.length > 6 && (
                  <div className="text-center mt-6">
                    <button onClick={() => setShowAllDepts(true)}
                      className="px-6 py-2.5 rounded-lg font-body text-xs tracking-widest uppercase border border-border hover:border-accent/40 text-muted-foreground hover:text-foreground transition-all">
                      {isAr ? "عرض جميع الأقسام" : `View All (${filteredDepts.length})`}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* STEP 1: DOCTORS */}
          {step === 1 && (
            <motion.div key="s1" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.35 }}>
              <div className="max-w-4xl mx-auto">
                <div className="relative mb-6">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type="text" value={doctorSearch} onChange={(e) => { setDoctorSearch(e.target.value); setShowAllDoctors(true); }}
                    placeholder={lang === "ar" ? "ابحث عن طبيب..." : "Search for a doctor..."}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-popover font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/30" />
                </div>
                {(() => {
                  const docList = bookingPath === "doctor" ? filteredAllDoctors : doctors;
                  const displayList = showAllDoctors || doctorSearch.trim() ? docList : docList.slice(0, 6);
                  return (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {displayList.map((doc) => (
                          <motion.div key={doc.id} whileHover={{ y: -3 }}
                            className={`relative rounded-2xl border p-5 transition-all cursor-pointer ${
                              selectedDoctor === doc.id ? "bg-primary/5 border-primary shadow-md" : "bg-popover border-border hover:border-accent/40"
                            }`}
                            onClick={() => {
                              setSelectedDoctor(doc.id);
                              setIsRequestMode(!doc.available);
                              if (bookingPath === "doctor") {
                                const dept = departments.find(d => d.name === doc.specialty);
                                if (dept) setSelectedDept(dept.id);
                              }
                            }}>
                            <div className="flex items-start gap-4">
                              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-serif text-lg flex-shrink-0">
                                {doc.name.split(" ").slice(1).map(n => n[0]).join("")}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-serif text-base text-foreground mb-0.5">{doc.name}</h4>
                                <p className="font-body text-xs text-muted-foreground mb-2">{doc.specialty}</p>
                                <div className="flex flex-wrap gap-2 mb-2">
                                  <span className="font-body text-[10px] text-muted-foreground bg-muted/30 px-2 py-0.5 rounded-full">{doc.experience}</span>
                                  <span className="font-body text-[10px] text-accent bg-accent/5 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                                    <Star className="w-3 h-3" /> {doc.rating}
                                  </span>
                                </div>
                                <div className="flex flex-wrap gap-1.5 mb-3">
                                  {doc.languages.map((l) => (
                                    <span key={l} className="font-body text-[10px] text-muted-foreground border border-border px-2 py-0.5 rounded-full">{l}</span>
                                  ))}
                                </div>
                                {doc.available ? (
                                  <div className="flex items-center gap-1.5 text-green-600">
                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                    <span className="font-body text-xs">{t("available")}</span>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-1.5 text-destructive">
                                    <div className="w-2 h-2 rounded-full bg-destructive" />
                                    <span className="font-body text-xs">{t("currentlyUnavailable")}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      {!showAllDoctors && !doctorSearch.trim() && docList.length > 6 && (
                        <div className="text-center mt-6">
                          <button onClick={() => setShowAllDoctors(true)}
                            className="px-6 py-2.5 rounded-lg font-body text-xs tracking-widest uppercase border border-border hover:border-accent/40 text-muted-foreground hover:text-foreground transition-all">
                            {lang === "ar" ? "عرض جميع الأطباء" : `View All (${docList.length})`}
                          </button>
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
            </motion.div>
          )}

          {/* STEP 2: PATIENT INFO */}
          {step === 2 && (
            <motion.div key="s2" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.35 }}>
              <div className="max-w-3xl mx-auto">
                {!patientType && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <motion.button whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        window.open("https://afyati.royalehayat.com", "_blank");
                      }}
                      className="bg-popover rounded-2xl p-8 border border-border text-center transition-all hover:border-primary/40">
                      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <LogIn className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="font-serif text-lg text-foreground mb-2">{t("registeredPatient")}</h3>
                      <p className="font-body text-xs text-muted-foreground">
                        {isAr ? "سيتم توجيهك إلى بوابة عافيتي" : "You will be redirected to Afiyati Portal"}
                      </p>
                    </motion.button>
                    <motion.button whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }}
                      onClick={() => setPatientType("new")}
                      className="bg-popover rounded-2xl p-8 border border-border text-center transition-all hover:border-primary/40">
                      <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                        <UserPlus className="w-7 h-7 text-accent" />
                      </div>
                      <h3 className="font-serif text-lg text-foreground mb-2">{t("firstTimeVisitor")}</h3>
                      <p className="font-body text-xs text-muted-foreground">
                        {isAr ? "سيتم توجيهك إلى نموذج طلب الموعد" : "You will be taken to the Appointment Request Form"}
                      </p>
                    </motion.button>
                  </div>
                )}

                {patientType === "new" && (
                  <div className="bg-popover rounded-2xl p-8 md:p-10 border border-border shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                        <ClipboardList className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h2 className="text-xl font-serif text-foreground">{t("patientDetails")}</h2>
                        <p className="text-muted-foreground font-body text-xs">{t("provideInfo")}</p>
                      </div>
                    </div>
                    <div className="space-y-5">
                      <div>
                        <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">
                          {t("fullName")} <span className="text-destructive">*</span>
                        </label>
                        <input type="text" value={patientName}
                          onChange={(e) => { setPatientName(e.target.value); setPatientErrors(prev => ({ ...prev, name: "" })); }}
                          placeholder={t("enterFullName")}
                          className={`w-full px-4 py-3 rounded-xl border bg-background font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all ${patientErrors.name ? "border-destructive" : "border-border"}`} />
                        {patientErrors.name && <p className="font-body text-xs text-destructive mt-1">{patientErrors.name}</p>}
                      </div>
                      <div>
                        <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">
                          {t("phoneNumber")} <span className="text-destructive">*</span>
                        </label>
                        <div className="flex gap-2">
                          <select value={patientCountryCode} onChange={(e) => setPatientCountryCode(e.target.value)}
                            className="w-24 px-3 py-3 rounded-xl border border-border bg-background font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/30">
                            <option value="+965">+965</option><option value="+966">+966</option><option value="+971">+971</option>
                            <option value="+973">+973</option><option value="+968">+968</option><option value="+974">+974</option>
                            <option value="+20">+20</option><option value="+91">+91</option><option value="+44">+44</option><option value="+1">+1</option>
                          </select>
                          <input type="tel" value={patientPhone}
                            onChange={(e) => { setPatientPhone(e.target.value.replace(/\D/g, "")); setPatientErrors(prev => ({ ...prev, phone: "" })); }}
                            placeholder={t("phonePlaceholder")}
                            className={`flex-1 px-4 py-3 rounded-xl border bg-background font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all ${patientErrors.phone ? "border-destructive" : "border-border"}`} />
                        </div>
                        {patientErrors.phone && <p className="font-body text-xs text-destructive mt-1">{patientErrors.phone}</p>}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">
                            {t("age")} <span className="text-destructive">*</span>
                          </label>
                          <input type="number" min="0" max="150" value={patientAge}
                            onChange={(e) => { setPatientAge(e.target.value); setPatientErrors(prev => ({ ...prev, age: "" })); }}
                            placeholder={t("enterAge")}
                            className={`w-full px-4 py-3 rounded-xl border bg-background font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all ${patientErrors.age ? "border-destructive" : "border-border"}`} />
                          {patientErrors.age && <p className="font-body text-xs text-destructive mt-1">{patientErrors.age}</p>}
                        </div>
                        <div>
                          <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">
                            {t("gender")} <span className="text-destructive">*</span>
                          </label>
                          <select value={patientGender}
                            onChange={(e) => { setPatientGender(e.target.value); setPatientErrors(prev => ({ ...prev, gender: "" })); }}
                            className={`w-full px-4 py-3 rounded-xl border bg-background font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all ${patientErrors.gender ? "border-destructive" : "border-border"}`}>
                            <option value="">{t("selectGender")}</option>
                            <option value="male">{t("male")}</option>
                            <option value="female">{t("female")}</option>
                          </select>
                          {patientErrors.gender && <p className="font-body text-xs text-destructive mt-1">{patientErrors.gender}</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {patientType && (
                  <button onClick={() => setPatientType(null)} className="mt-4 font-body text-xs text-muted-foreground hover:text-foreground transition-colors">
                    ← {t("changeSelection")}
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* STEP 3: CONFIRM */}
          {step === 3 && (
            <motion.div key="s3" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.35 }}>
              <div className="max-w-3xl mx-auto">
                <div className="bg-popover rounded-2xl p-8 md:p-10 border border-border shadow-sm">
                  <h2 className="font-serif text-xl text-foreground mb-2">
                    {isRequestMode ? t("reviewSubmit") : t("reviewConfirm")}
                  </h2>
                  {isRequestMode && (
                    <div className="bg-accent/5 border border-accent/10 rounded-xl p-4 mb-6">
                      <p className="font-body text-sm text-accent font-medium">{t("appointmentRequest")}</p>
                      <p className="font-body text-xs text-muted-foreground">{t("requestNote")}</p>
                    </div>
                  )}
                  <div className="space-y-5">
                    {[
                      { label: t("department"), value: selectedDeptObj?.name || selectedDoctorObj?.specialty || "", icon: Building2 },
                      { label: t("doctor"), value: selectedDoctorObj?.name || "", icon: User },
                      { label: t("patient"), value: patientName, icon: ClipboardList },
                      { label: t("phone"), value: `${patientCountryCode} ${patientPhone}`, icon: Stethoscope },
                      { label: t("age"), value: patientAge, icon: User },
                      { label: t("gender"), value: patientGender === "male" ? t("male") : t("female"), icon: User },
                    ].map((row) => (
                      <div key={row.label} className="flex items-start gap-4 py-3 border-b border-border last:border-0">
                        <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                          <row.icon className="w-4 h-4 text-accent" />
                        </div>
                        <div>
                          <p className="font-body text-xs text-muted-foreground uppercase tracking-wider">{row.label}</p>
                          <p className="font-body text-sm text-foreground font-medium">{row.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="max-w-3xl mx-auto flex items-center justify-between mt-8">
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={handleBack}
            className="flex items-center gap-2 text-muted-foreground font-body text-sm hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            {step === 0 ? t("backToHome") : t("previous")}
          </motion.button>
          <motion.button
            whileHover={canProceed() ? { scale: 1.03 } : {}}
            whileTap={canProceed() ? { scale: 0.97 } : {}}
            onClick={handleNext}
            disabled={!canProceed()}
            className={`flex items-center gap-2 px-8 py-3 rounded-lg font-body text-sm tracking-widest uppercase transition-all duration-300 ${
              canProceed()
                ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}>
            {step === 3 ? (
              <><CheckCircle2 className="w-4 h-4" />{isRequestMode ? t("submitRequest") : t("confirmBooking")}</>
            ) : (
              <>{t("continue")} <ArrowRight className="w-4 h-4" /></>
            )}
          </motion.button>
        </div>
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default BookAppointment;
