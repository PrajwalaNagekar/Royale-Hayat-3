import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatButton from "@/components/ChatButton";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Heart, Users, Clock, GraduationCap, Shield, Award, AlertTriangle, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const categories = [
  "View All",
  "Hospitality / Guest Services",
  "Marketing & Communications",
  "Nursing Support",
  "Quality & Patient Safety",
  "Royale Home Health",
  "Service Excellence",
  "Medical",
  "Administrative",
];

const openPositions = [
  {
    title: "Floor Coordinator only Female, Bilingual (Arabic & English)",
    category: "Hospitality / Guest Services",
    location: "On-site",
    type: "Full-time",
    desc: "Royale Hayat Hospital have devoted considerable effort to applying established strategies for quality improvement thus they created a position of Floor coordinator",
  },
  {
    title: "Guest Relations Officer",
    category: "Hospitality / Guest Services",
    location: "On-site",
    type: "Full-time",
    desc: "Provide outstanding hospitality and patient experience throughout the hospital premises.",
  },
  {
    title: "Marketing Specialist – Digital & Social Media",
    category: "Marketing & Communications",
    location: "On-site",
    type: "Full-time",
    desc: "Drive digital marketing campaigns, manage social media channels, and enhance brand visibility for the hospital.",
  },
  {
    title: "Content Writer – Arabic & English",
    category: "Marketing & Communications",
    location: "On-site",
    type: "Full-time",
    desc: "Create compelling bilingual content for website, social media, press releases, and patient education materials.",
  },
  {
    title: "Registered Nurse – ICU",
    category: "Nursing Support",
    location: "On-site",
    type: "Full-time",
    desc: "Provide critical care nursing in the Intensive Care Unit with advanced monitoring and patient assessment skills.",
  },
  {
    title: "Registered Nurse – Labor & Delivery",
    category: "Nursing Support",
    location: "On-site",
    type: "Full-time",
    desc: "Deliver compassionate care to mothers during labor, delivery, and postpartum recovery.",
  },
  {
    title: "Nurse Manager – Surgical Ward",
    category: "Nursing Support",
    location: "On-site",
    type: "Full-time",
    desc: "Lead and manage the surgical ward nursing team, ensuring high standards of patient care and safety.",
  },
  {
    title: "Quality Improvement Coordinator",
    category: "Quality & Patient Safety",
    location: "On-site",
    type: "Full-time",
    desc: "Implement quality improvement initiatives and monitor patient safety indicators across departments.",
  },
  {
    title: "Patient Safety Officer",
    category: "Quality & Patient Safety",
    location: "On-site",
    type: "Full-time",
    desc: "Oversee incident reporting, risk assessments, and safety protocols to ensure the highest standards of patient care.",
  },
  {
    title: "Home Health Nurse",
    category: "Royale Home Health",
    location: "Field",
    type: "Full-time",
    desc: "Provide professional nursing care to patients in their homes, including wound care, medication management, and health education.",
  },
  {
    title: "Home Health Physiotherapist",
    category: "Royale Home Health",
    location: "Field",
    type: "Full-time",
    desc: "Deliver physiotherapy rehabilitation programs to patients recovering at home after surgery or illness.",
  },
  {
    title: "Service Excellence Trainer",
    category: "Service Excellence",
    location: "On-site",
    type: "Full-time",
    desc: "Design and deliver training programs that elevate service standards and patient experience across all departments.",
  },
  {
    title: "Consultant Cardiologist",
    category: "Medical",
    location: "On-site",
    type: "Full-time",
    desc: "Provide expert cardiac consultations, diagnostics, and treatment plans in a state-of-the-art cardiology department.",
  },
  {
    title: "Specialist – Obstetrics & Gynecology",
    category: "Medical",
    location: "On-site",
    type: "Full-time",
    desc: "Deliver comprehensive women's health services including prenatal care, high-risk pregnancies, and gynecological procedures.",
  },
  {
    title: "Pediatrician",
    category: "Medical",
    location: "On-site",
    type: "Full-time",
    desc: "Provide expert medical care for infants, children, and adolescents in outpatient and inpatient settings.",
  },
  {
    title: "Human Resources Coordinator",
    category: "Administrative",
    location: "On-site",
    type: "Full-time",
    desc: "Support HR operations including recruitment, onboarding, employee relations, and benefits administration.",
  },
  {
    title: "Medical Records Specialist",
    category: "Administrative",
    location: "On-site",
    type: "Full-time",
    desc: "Manage and maintain accurate medical records, ensuring compliance with healthcare regulations and standards.",
  },
];

const WorkWithUs = () => {
  const { lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("View All");
  const [searchParams] = useSearchParams();
  const section = searchParams.get("section");
  const showAll = !section;
  const showSection = (s: string) => showAll || section === s;

  const filtered = activeCategory === "View All"
    ? openPositions
    : openPositions.filter(p => p.category === activeCategory);

  const cultureItems = [
    { icon: Heart, title: lang === "ar" ? "ثقافة الرعاية" : "Culture of Care", desc: lang === "ar" ? "نحن نؤمن بأن رعاية فريقنا تؤدي إلى رعاية أفضل لمرضانا." : "We believe caring for our team leads to better care for our patients." },
    { icon: Users, title: lang === "ar" ? "فريق متنوع" : "Diverse Team", desc: lang === "ar" ? "فريق متعدد الثقافات يضم أكثر من 600 متخصص من جميع أنحاء العالم." : "A multicultural team of 600+ professionals from around the world." },
    { icon: Clock, title: lang === "ar" ? "التوازن بين العمل والحياة" : "Work-Life Balance", desc: lang === "ar" ? "جداول مرنة وبرامج دعم للموظفين لضمان رفاهيتك." : "Flexible schedules and employee support programs to ensure your well-being." },
    { icon: GraduationCap, title: lang === "ar" ? "التعلم المستمر" : "Continuous Learning", desc: lang === "ar" ? "برامج تدريب وتطوير مستمرة لنمو حياتك المهنية." : "Ongoing training and development programs to grow your career." },
    { icon: Shield, title: lang === "ar" ? "بيئة آمنة" : "Safe Environment", desc: lang === "ar" ? "معايير أمان عالمية وبيئة عمل داعمة." : "World-class safety standards and a supportive work environment." },
    { icon: Award, title: lang === "ar" ? "التقدير والمكافآت" : "Recognition & Rewards", desc: lang === "ar" ? "برامج تقدير الموظفين والمكافآت التنافسية." : "Employee recognition programs and competitive compensation." },
  ];

  return (
    <div className="min-h-screen bg-background pt-[var(--header-height,56px)]">
      <Header />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-primary/5">
        <div className="container mx-auto px-6 text-center">
          <ScrollAnimationWrapper>
            <p className="text-accent text-xs tracking-[0.3em] uppercase font-body mb-3">{lang === "ar" ? "انضم إلى فريقنا" : "Careers"}</p>
            <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-4">
              {section === "positions" ? (lang === "ar" ? "الوظائف المتاحة" : "Open Positions")
                : section === "culture" ? (lang === "ar" ? "ثقافة العمل" : "Work Culture")
                : (lang === "ar" ? "اعمل معنا" : "Work With Us")}
            </h1>
            <p className="text-muted-foreground font-body text-sm max-w-xl mx-auto">
              {lang === "ar" ? "انضم إلى فريق رويال حياة وكن جزءاً من رحلة التميز في الرعاية الصحية." : "Join the Royale Hayat team and be part of a journey of healthcare excellence."}
            </p>
          </ScrollAnimationWrapper>
        </div>
      </section>


      {/* Work Culture */}
      {showSection("culture") && (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <ScrollAnimationWrapper>
            <div className="text-center mb-10">
              <p className="text-accent text-xs tracking-[0.3em] uppercase font-body mb-3">{lang === "ar" ? "ثقافة العمل" : "Work Culture"}</p>
              <h2 className="text-2xl md:text-3xl font-serif text-foreground">{lang === "ar" ? "لماذا تعمل في رويال حياة؟" : "Why Work at Royale Hayat?"}</h2>
            </div>
          </ScrollAnimationWrapper>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {cultureItems.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-popover border border-border/50 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-serif text-base text-foreground mb-2">{item.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Open Positions with Category Tabs */}
      {showSection("positions") && (
      <section className="py-16 bg-secondary/10">
        <div className="container mx-auto px-6">
          <ScrollAnimationWrapper>
            <div className="text-center mb-8">
              <p className="text-accent text-xs tracking-[0.3em] uppercase font-body mb-3">
                {lang === "ar" ? "انضم إلى شبكتنا" : "Join Our Network!"}
              </p>
              <h2 className="text-2xl md:text-3xl font-serif text-foreground">{lang === "ar" ? "الوظائف المتاحة" : "Open Positions"}</h2>
              <p className="text-muted-foreground font-body text-sm max-w-xl mx-auto mt-3">
                {lang === "ar" ? "استعرض الوظائف المتاحة وتقدم للانضمام إلى فريقنا." : "Browse available positions and apply to join our team."}
              </p>
            </div>
          </ScrollAnimationWrapper>

          {/* Category filter tabs - horizontal scrollable */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-xs font-body tracking-wide border transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-popover text-foreground border-border hover:border-primary/40"
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Job cards */}
          <div className="max-w-5xl mx-auto space-y-5">
            {filtered.map((pos, i) => (
              <motion.div
                key={pos.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-popover border border-border/50 rounded-2xl p-6 md:p-8 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-serif text-lg md:text-xl text-foreground mb-2">{pos.title}</h3>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="inline-block px-3 py-1 bg-secondary/30 text-foreground text-[11px] font-body rounded tracking-wide">
                        {pos.category.toUpperCase()}
                      </span>
                    </div>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">{pos.desc}</p>
                  </div>
                  <div className="flex flex-col items-end gap-3 flex-shrink-0">
                    <motion.a
                      href="mailto:hr@royalehayat.com"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-1 text-accent font-body text-sm font-semibold hover:underline"
                    >
                      Apply Now <ArrowUpRight className="w-4 h-4" />
                    </motion.a>
                    <div className="flex items-center gap-4 text-xs font-body text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" /> {pos.location.toUpperCase()}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {pos.type.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="font-body text-sm text-muted-foreground">
              {lang === "ar" ? "لا ترى الوظيفة المناسبة؟ أرسل سيرتك الذاتية إلى" : "Don't see the right fit? Send your CV to"}{" "}
              <a href="mailto:hr@royalehayat.com" className="text-primary hover:text-accent transition-colors font-semibold">hr@royalehayat.com</a>
            </p>
          </div>
        </div>
      </section>
      )}

      {/* Notice to the Public - always visible at bottom */}
      <section className="py-12 bg-accent/5">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto bg-popover border border-accent/30 rounded-2xl p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h2 className="font-serif text-lg text-foreground mb-3">{lang === "ar" ? "إشعار للعموم" : "Notice to the Public"}</h2>
                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
                  {lang === "ar"
                    ? "قام مستشفى رويال حياة، الكويت، بتعيين \"LEADPEC FIRMA PVT Ltd, Delhi, India\" رسمياً كوكالة التوظيف لتوظيف الممرضين والطاقم الطبي أو أي موظفين إداريين في مؤسستنا."
                    : "Royale Hayat Hospital, Kuwait, has officially appointed \"LEADPEC FIRMA PVT Ltd, Delhi, India\" as the recruitment agency for recruiting Nurses, Medical staff, or any Administrative Staff to our organization."}
                </p>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" />
                  <p className="font-body text-sm text-foreground">
                    {lang === "ar" ? "لمزيد من المعلومات، يرجى التواصل مع قسم الموارد البشرية على" : "For further more information, please contact our Human Resources department at"}{" "}
                    <a href="mailto:hr@royalehayat.com" className="text-accent hover:underline font-semibold">hr@royalehayat.com</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ChatButton />
      <ScrollToTop />
    </div>
  );
};

export default WorkWithUs;
