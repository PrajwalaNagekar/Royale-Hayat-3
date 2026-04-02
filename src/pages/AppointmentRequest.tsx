import { useState } from "react";
import { motion } from "framer-motion";
import { ClipboardList, CheckCircle2, ArrowRight, User, Phone, Calendar, Building2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatButton from "@/components/ChatButton";
import ScrollToTop from "@/components/ScrollToTop";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

const departments = [
  "Obstetrics & Gynecology", "Pediatrics", "Internal Medicine", "Cardiology",
  "Orthopedics", "Dermatology", "Ophthalmology", "ENT", "Neurology",
  "General Surgery", "Pulmonology", "Gastroenterology", "Urology",
  "Psychiatry", "Nephrology", "Endocrinology", "Oncology", "Dental Clinic",
  "Plastic & Cosmetic Surgery", "IVF & Reproductive Medicine", "Physiotherapy",
  "Rheumatology", "Allergy & Immunology", "Pain Management"
];

const AppointmentRequest = () => {
  const { lang, t } = useLanguage();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    fullName: "", phone: "", countryCode: "+965", age: "", gender: "",
    department: "", preferredDate: "", message: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = lang === "ar" ? "الاسم مطلوب" : "Full name is required";
    if (!form.phone.trim()) e.phone = lang === "ar" ? "رقم الهاتف مطلوب" : "Phone number is required";
    else if (!/^\d{7,15}$/.test(form.phone.trim())) e.phone = lang === "ar" ? "رقم هاتف غير صحيح" : "Enter a valid phone number";
    if (!form.age.trim()) e.age = lang === "ar" ? "العمر مطلوب" : "Age is required";
    if (!form.gender) e.gender = lang === "ar" ? "الجنس مطلوب" : "Gender is required";
    // department validation removed
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setSubmitted(true);
  };

  const updateField = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background pt-[var(--header-height,56px)]">
        <Header />
        <div className="container mx-auto px-6 py-20 max-w-2xl text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}
            className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-accent" />
          </motion.div>
          <h1 className="text-3xl font-serif text-foreground mb-3">
            {lang === "ar" ? "تم إرسال الطلب بنجاح!" : "Request Submitted Successfully!"}
          </h1>
          <p className="text-muted-foreground font-body text-sm mb-6">
            {lang === "ar" ? "سنتواصل معك خلال 6-12 ساعة لتأكيد موعدك." : "We will contact you within 6-12 hours to confirm your appointment."}
          </p>
          <div className="bg-popover rounded-2xl border border-border p-6 text-start mb-6">
            <h3 className="font-serif text-lg text-foreground mb-4">{t("appointmentDetails")}</h3>
            <div className="space-y-3 font-body text-sm">
              <div className="flex gap-3"><User className="w-4 h-4 text-accent mt-0.5" /><div><p className="text-muted-foreground text-xs">{t("patient")}</p><p className="text-foreground font-medium">{form.fullName}</p></div></div>
              <div className="flex gap-3"><Phone className="w-4 h-4 text-accent mt-0.5" /><div><p className="text-muted-foreground text-xs">{t("phone")}</p><p className="text-foreground font-medium">{form.countryCode} {form.phone}</p></div></div>
              <div className="flex gap-3"><Building2 className="w-4 h-4 text-accent mt-0.5" /><div><p className="text-muted-foreground text-xs">{t("department")}</p><p className="text-foreground font-medium">{form.department}</p></div></div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => navigate("/")} className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-body text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors">
              {t("backToHome")}
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-[var(--header-height,56px)]">
      <Header />

      <div className="bg-primary py-12 text-center">
        <h1 className="text-3xl md:text-4xl font-serif text-primary-foreground mb-2">
          {lang === "ar" ? "نموذج طلب موعد" : "Appointment Request Form"}
        </h1>
        <p className="text-primary-foreground/70 font-body text-sm">
          {lang === "ar" ? "املأ التفاصيل أدناه وسنتواصل معك قريباً" : "Fill in the details below and we'll get back to you shortly"}
        </p>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-popover rounded-2xl p-6 md:p-8 border border-border shadow-sm">
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
            {/* Full Name */}
            <div>
              <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">
                {t("fullName")} <span className="text-destructive">*</span>
              </label>
              <input type="text" value={form.fullName} onChange={(e) => updateField("fullName", e.target.value)}
                placeholder={t("enterFullName")}
                className={`w-full px-4 py-3 rounded-xl border bg-background font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/30 ${errors.fullName ? "border-destructive" : "border-border"}`} />
              {errors.fullName && <p className="font-body text-xs text-destructive mt-1">{errors.fullName}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">
                {t("phoneNumber")} <span className="text-destructive">*</span>
              </label>
              <div className="flex gap-2">
                <select value={form.countryCode} onChange={(e) => updateField("countryCode", e.target.value)}
                  className="w-24 px-3 py-3 rounded-xl border border-border bg-background font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/30">
                  <option value="+965">+965</option><option value="+966">+966</option><option value="+971">+971</option>
                  <option value="+973">+973</option><option value="+968">+968</option><option value="+974">+974</option>
                  <option value="+20">+20</option><option value="+91">+91</option><option value="+44">+44</option><option value="+1">+1</option>
                </select>
                <input type="tel" value={form.phone} onChange={(e) => updateField("phone", e.target.value.replace(/\D/g, ""))}
                  placeholder={t("phonePlaceholder")}
                  className={`flex-1 px-4 py-3 rounded-xl border bg-background font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/30 ${errors.phone ? "border-destructive" : "border-border"}`} />
              </div>
              {errors.phone && <p className="font-body text-xs text-destructive mt-1">{errors.phone}</p>}
            </div>

            {/* Age & Gender */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">
                  {t("age")} <span className="text-destructive">*</span>
                </label>
                <input type="number" min="0" max="150" value={form.age} onChange={(e) => updateField("age", e.target.value)}
                  placeholder={t("enterAge")}
                  className={`w-full px-4 py-3 rounded-xl border bg-background font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/30 ${errors.age ? "border-destructive" : "border-border"}`} />
                {errors.age && <p className="font-body text-xs text-destructive mt-1">{errors.age}</p>}
              </div>
              <div>
                <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">
                  {t("gender")} <span className="text-destructive">*</span>
                </label>
                <select value={form.gender} onChange={(e) => updateField("gender", e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border bg-background font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 ${errors.gender ? "border-destructive" : "border-border"}`}>
                  <option value="">{t("selectGender")}</option>
                  <option value="male">{t("male")}</option>
                  <option value="female">{t("female")}</option>
                </select>
                {errors.gender && <p className="font-body text-xs text-destructive mt-1">{errors.gender}</p>}
              </div>
            </div>


            {/* Message */}
            <div>
              <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">
                {lang === "ar" ? "ملاحظات إضافية" : "Additional Notes"} ({lang === "ar" ? "اختياري" : "Optional"})
              </label>
              <textarea value={form.message} onChange={(e) => updateField("message", e.target.value)}
                placeholder={lang === "ar" ? "أي معلومات إضافية تود مشاركتها..." : "Any additional information you'd like to share..."}
                className="w-full h-24 px-4 py-3 rounded-xl border border-border bg-background font-body text-sm text-foreground placeholder:text-muted-foreground/50 resize-none focus:outline-none focus:ring-2 focus:ring-accent/30" />
            </div>
          </div>

          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={handleSubmit}
            className="w-full mt-6 bg-primary text-primary-foreground py-3.5 rounded-xl font-body text-sm tracking-widest uppercase hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
            {lang === "ar" ? "إرسال الطلب" : "Submit Request"} <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>

      <Footer />
      <ChatButton />
      <ScrollToTop />
    </div>
  );
};

export default AppointmentRequest;
