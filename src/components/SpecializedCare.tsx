import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import ScrollAnimationWrapper from "./ScrollAnimationWrapper";
import { doctors, Doctor } from "@/data/doctors";

interface ServiceItem {
  num: string;
  name: string;
  nameAr: string;
  desc: string;
  descAr: string;
  img: string;
  department: string;
  subspecialties: { name: string; nameAr: string }[];
}

const services: ServiceItem[] = [
  {
    num: "01", name: "Obstetrics & Gynecology", nameAr: "التوليد وأمراض النساء",
    desc: "Complete maternity care from prenatal through postpartum recovery, supported by over 600 healthcare professionals.",
    descAr: "رعاية أمومة شاملة من ما قبل الولادة حتى التعافي بعدها، بدعم من أكثر من 600 متخصص.",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=250&fit=crop&crop=faces",
    department: "Obstetrics & Gynecology",
    subspecialties: [
      { name: "Women's Health", nameAr: "صحة المرأة" },
      { name: "Urogynecology", nameAr: "أمراض المسالك البولية النسائية" },
      { name: "Cosmetic Gynecology", nameAr: "أمراض النساء التجميلية" },
      { name: "Gynecologic Oncology", nameAr: "أورام النساء" },
      { name: "Physiotherapy", nameAr: "العلاج الطبيعي" },
      { name: "Parent and Childbirth Education", nameAr: "تثقيف الوالدين والولادة" },
    ],
  },
  {
    num: "02", name: "Family Medicine", nameAr: "طب الأسرة",
    desc: "Continuous, personalized care for individuals and families of all ages with coordinated health management.",
    descAr: "رعاية مستمرة ومخصصة للأفراد والعائلات من جميع الأعمار مع إدارة صحية منسقة.",
    img: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=400&h=250&fit=crop",
    department: "Family Medicine",
    subspecialties: [],
  },
  {
    num: "03", name: "Al Safwa Healthcare Program", nameAr: "برنامج الصفوة للرعاية الصحية",
    desc: "Personalized executive health program with premium screening, dedicated coordinators, and elegant private suites.",
    descAr: "برنامج صحي تنفيذي مخصص مع فحوصات متميزة ومنسقين مخصصين وأجنحة خاصة أنيقة.",
    img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=250&fit=crop",
    department: "Al Safwa Healthcare Program",
    subspecialties: [],
  },
  {
    num: "04", name: "Dental Clinic", nameAr: "عيادة الأسنان",
    desc: "Exceptional dental care in a luxurious setting with specialized dentists using advanced technology for all ages.",
    descAr: "رعاية أسنان استثنائية في بيئة فاخرة مع أطباء متخصصين يستخدمون تقنيات متقدمة لجميع الأعمار.",
    img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=250&fit=crop",
    department: "Dental Clinic",
    subspecialties: [],
  },
  {
    num: "05", name: "Reproductive Medicine & IVF", nameAr: "الطب التناسلي وأطفال الأنابيب",
    desc: "Advanced fertility treatments blending expertise with cutting-edge technology, including IVF, ICSI, and genetic diagnosis.",
    descAr: "علاجات خصوبة متقدمة تجمع بين الخبرة والتكنولوجيا المتطورة، بما في ذلك أطفال الأنابيب والحقن المجهري.",
    img: "https://www.zeiss.com/content/dam/rms/reference-master/applications/reproductive-medicine/axio-observer_ivf_narishige-micromanipulation_5.jpg/_jcr_content/renditions/original.image_file.1707.1280.107,0,1814,1280.file/axio-observer_ivf_narishige-micromanipulation_5.jpg",
    department: "IVF & Reproductive Medicine",
    subspecialties: [
      { name: "IVF Treatment", nameAr: "أطفال الأنابيب" },
      { name: "ICSI", nameAr: "الحقن المجهري" },
      { name: "Fertility Preservation", nameAr: "حفظ الخصوبة" },
      { name: "Reproductive Endocrinology", nameAr: "الغدد الصماء التناسلية" },
    ],
  },
  {
    num: "06", name: "Pain Management", nameAr: "إدارة الألم",
    desc: "Comprehensive program offering advanced, compassionate care for acute and chronic pain to restore comfort and functionality.",
    descAr: "برنامج شامل يقدم رعاية متقدمة ورحيمة للألم الحاد والمزمن لاستعادة الراحة والوظائف.",
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=250&fit=crop",
    department: "Pain Management",
    subspecialties: [],
  },
  {
    num: "07", name: "Pediatrics", nameAr: "طب الأطفال",
    desc: "World-class pediatric care with warmth and a child-centered approach, from infancy through adolescence.",
    descAr: "رعاية أطفال عالمية المستوى بدفء ونهج محوره الطفل، من الرضاعة حتى المراهقة.",
    img: "http://kpfamilybirthcenter.org/sites/kpfamilybirthcenter/files/2017-03/nicu-5.jpg",
    department: "Pediatrics",
    subspecialties: [
      { name: "Pediatric Intensive Care Unit (PICU)", nameAr: "وحدة العناية المركزة للأطفال" },
    ],
  },
  {
    num: "08", name: "Anesthesia", nameAr: "التخدير",
    desc: "Top-tier anesthesia services ensuring patient safety and comfort for all surgical and childbirth procedures.",
    descAr: "خدمات تخدير عالية المستوى تضمن سلامة المريض وراحته لجميع الإجراءات الجراحية والولادة.",
    img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=250&fit=crop",
    department: "Anesthesia",
    subspecialties: [],
  },
  {
    num: "09", name: "Neonatal", nameAr: "حديثي الولادة",
    desc: "Level III Neonatal Unit — the highest in Kuwait's private sector — offering specialized care for premature and critically ill infants.",
    descAr: "وحدة حديثي الولادة من المستوى الثالث — الأعلى في القطاع الخاص بالكويت.",
    img: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&h=250&fit=crop",
    department: "Neonatal",
    subspecialties: [
      { name: "Special Care Baby Unit (SCBU)", nameAr: "وحدة العناية الخاصة بالمواليد" },
    ],
  },
  {
    num: "10", name: "Intensive Care", nameAr: "العناية المركزة",
    desc: "Round-the-clock monitoring and care for severe, life-threatening conditions with cutting-edge technology.",
    descAr: "مراقبة ورعاية على مدار الساعة للحالات الحرجة المهددة للحياة بأحدث التقنيات.",
    img: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400&h=250&fit=crop",
    department: "Intensive Care",
    subspecialties: [],
  },
  {
    num: "11", name: "Internal Medicine", nameAr: "الطب الباطني",
    desc: "Comprehensive diagnosis and treatment of complex adult diseases with personalized health check programs.",
    descAr: "تشخيص وعلاج شامل لأمراض البالغين المعقدة مع برامج فحص صحي مخصصة.",
    img: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&h=250&fit=crop",
    department: "Internal Medicine",
    subspecialties: [
      { name: "Cardiology", nameAr: "أمراض القلب" },
      { name: "Nephrology", nameAr: "أمراض الكلى" },
      { name: "Gastroenterology", nameAr: "أمراض الجهاز الهضمي" },
      { name: "Endocrinology & Metabolism", nameAr: "الغدد الصماء والتمثيل الغذائي" },
      { name: "Rheumatology", nameAr: "أمراض الروماتيزم" },
      { name: "Clinical Nutrition & Dietetics", nameAr: "التغذية السريرية" },
    ],
  },
  {
    num: "12", name: "Center for Diagnostic Imaging", nameAr: "مركز التصوير التشخيصي",
    desc: "Advanced diagnostic and image-guided therapeutic services combining expert professionals with state-of-the-art technology.",
    descAr: "خدمات تشخيصية وعلاجية موجهة بالتصوير تجمع بين متخصصين وتقنيات حديثة.",
    img: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=400&h=250&fit=crop",
    department: "Center for Diagnostic Imaging",
    subspecialties: [
      { name: "The Abdominal & Women's Imaging", nameAr: "تصوير البطن والمرأة" },
      { name: "The Breast Imaging", nameAr: "تصوير الثدي" },
      { name: "The Cardiovascular & Thoracic Imaging", nameAr: "تصوير القلب والصدر" },
      { name: "The Musculoskeletal Imaging", nameAr: "تصوير العضلات والعظام" },
      { name: "The Neuroradiology and Head & Neck Imaging", nameAr: "الأشعة العصبية" },
      { name: "The Pediatric Imaging", nameAr: "تصوير الأطفال" },
      { name: "The Vascular & Interventional Radiology", nameAr: "الأشعة الوعائية والتدخلية" },
    ],
  },
  {
    num: "13", name: "General & Laparoscopic Surgery", nameAr: "الجراحة العامة والمنظار",
    desc: "Exceptional surgical care blending expert skills with advanced technology for precision, safety, and quick recovery.",
    descAr: "رعاية جراحية استثنائية تجمع بين المهارات والتكنولوجيا المتقدمة.",
    img: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400&h=250&fit=crop",
    department: "General & Laparoscopic Surgery",
    subspecialties: [
      { name: "Obesity Bariatric Surgery", nameAr: "جراحة السمنة" },
      { name: "Breast Surgical Oncology", nameAr: "أورام الثدي الجراحية" },
      { name: "Abdominal Wall Reconstruction", nameAr: "إعادة بناء جدار البطن" },
      { name: "Clinical Nutrition & Dietetics", nameAr: "التغذية السريرية" },
    ],
  },
  {
    num: "14", name: "Laboratory Services", nameAr: "خدمات المختبر",
    desc: "CAP-accredited laboratory providing gold-standard diagnostic testing and pathology services.",
    descAr: "مختبر معتمد من CAP يقدم فحوصات تشخيصية وخدمات علم الأمراض بأعلى المعايير.",
    img: "https://images.unsplash.com/photo-1579165466741-7f35e4755660?w=400&h=250&fit=crop",
    department: "Laboratory Services",
    subspecialties: [],
  },
  {
    num: "15", name: "Plastic Surgery", nameAr: "الجراحة التجميلية",
    desc: "Internationally certified physicians offering advanced surgical and non-surgical cosmetic and reconstructive solutions.",
    descAr: "أطباء معتمدون دولياً يقدمون حلولاً تجميلية وترميمية جراحية وغير جراحية متقدمة.",
    img: "https://xivents.com/wp-content/uploads/2023/05/Differences-Between-Plastic-Surgery-and-Reconstructive-Surgery.jpg",
    department: "Plastic & Cosmetic Surgery",
    subspecialties: [],
  },
  {
    num: "16", name: "Royale Hayat Pharmacy", nameAr: "صيدلية رويال حياة",
    desc: "Comprehensive pharmacy services ensuring safe and effective medication management for all patients.",
    descAr: "خدمات صيدلية شاملة تضمن إدارة آمنة وفعالة للأدوية لجميع المرضى.",
    img: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400&h=250&fit=crop",
    department: "Royale Hayat Pharmacy",
    subspecialties: [],
  },
  {
    num: "17", name: "Dermatology", nameAr: "الأمراض الجلدية",
    desc: "Expert care for all dermatological needs combining clinical excellence with the latest advances for adults and children.",
    descAr: "رعاية متخصصة لجميع احتياجات الأمراض الجلدية مع أحدث التطورات.",
    img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=250&fit=crop",
    department: "Dermatology",
    subspecialties: [],
  },
  {
    num: "18", name: "Clinical Pharmacy", nameAr: "الصيدلة السريرية",
    desc: "Expert pharmaceutical care integrated with clinical teams for optimal medication therapy outcomes.",
    descAr: "رعاية صيدلانية متخصصة مدمجة مع الفرق السريرية لتحقيق أفضل نتائج العلاج الدوائي.",
    img: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=250&fit=crop",
    department: "Clinical Pharmacy",
    subspecialties: [],
  },
  {
    num: "19", name: "ENT (Ear, Nose & Throat)", nameAr: "الأنف والأذن والحنجرة",
    desc: "Expert care for conditions affecting the ear, nose, throat, head, and neck with both medical and surgical expertise.",
    descAr: "رعاية متخصصة لأمراض الأنف والأذن والحنجرة والرأس والرقبة بخبرات طبية وجراحية.",
    img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop",
    department: "ENT (Ear, Nose & Throat)",
    subspecialties: [],
  },
  {
    num: "20", name: "Royale Home Health", nameAr: "رويال للرعاية المنزلية",
    desc: "Premium medical care delivered in the comfort and privacy of your home by certified professionals.",
    descAr: "رعاية طبية متميزة تُقدم في راحة وخصوصية منزلك من قبل متخصصين معتمدين.",
    img: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=400&h=250&fit=crop",
    department: "Royale Home Health",
    subspecialties: [],
  },
];

const SpecializedCare = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const INITIAL_COUNT = 6;

  const getDeptDoctors = (department: string): Doctor[] => {
    const aliases: Record<string, string[]> = {
      "IVF & Reproductive Medicine": ["IVF & Reproductive Medicine", "Reproductive Medicine & IVF"],
      "Plastic & Cosmetic Surgery": ["Plastic & Cosmetic Surgery", "Plastic Surgery"],
      "Anesthesia": ["Anesthesia", "Anesthesia & Intensive Care"],
    };
    const names = aliases[department] || [department];
    return doctors.filter((d) => names.includes(d.department)).slice(0, 3);
  };

  const scrollDoctors = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 260;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const visibleServices = services.slice(0, INITIAL_COUNT);
  
  // Reorder: expanded card first, rest below
  const reorderedServices = expandedIndex !== null
    ? [visibleServices.find((_, i) => services.indexOf(visibleServices[i]) === expandedIndex) || services[expandedIndex], ...visibleServices.filter((s) => services.indexOf(s) !== expandedIndex)]
    : visibleServices;

  const getOriginalIndex = (service: ServiceItem) =>
    services.findIndex((s) => s.num === service.num);
  
  const isInFirstSix = (origIdx: number) => origIdx < INITIAL_COUNT;

  return (
    <section className="py-16 md:py-20 bg-background" id="services" ref={sectionRef}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 md:mb-12">
          <ScrollAnimationWrapper>
            <div>
              <p className="text-accent text-xs tracking-[0.3em] uppercase font-body mb-3">{t("whatWeOffer")}</p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-foreground">{t("specializedCare")}</h2>
            </div>
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper delay={0.15}>
            <p className="text-muted-foreground font-body max-w-md mt-4 md:mt-0 leading-relaxed text-sm">
              {t("specializedDesc")}
            </p>
          </ScrollAnimationWrapper>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {reorderedServices.map((s) => {
            const origIdx = getOriginalIndex(s);
            const isExpanded = expandedIndex === origIdx;
            const deptDoctors = getDeptDoctors(s.department);
            const showImageCard = isInFirstSix(origIdx);

            return (
              <motion.div
                key={s.num}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: Math.min(origIdx * 0.04, 0.6), ease: [0.25, 0.46, 0.45, 0.94] }}
                className={`bg-popover rounded-xl overflow-hidden border border-border/50 cursor-pointer group transition-all duration-500 ${
                  isExpanded ? "sm:col-span-2 lg:col-span-3" : ""
                }`}
                onClick={() => !isExpanded && handleExpand(origIdx)}
              >
                {!isExpanded ? (
                  showImageCard ? (
                    /* First 6: Image cards */
                    <>
                      <div className="relative h-32 md:h-36 overflow-hidden">
                        <img
                          src={s.img}
                          alt={lang === "ar" ? s.nameAr : s.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-popover/70 to-transparent" />
                        <span className="absolute top-3 left-3 text-2xl font-serif text-primary-foreground/80 drop-shadow-lg">{s.num}</span>
                      </div>
                      <div className="p-4 md:p-5">
                        <h3 className="text-sm md:text-base font-serif text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                          {lang === "ar" ? s.nameAr : s.name}
                        </h3>
                        <p className="text-muted-foreground font-body text-xs leading-relaxed mb-3 line-clamp-2">
                          {lang === "ar" ? s.descAr : s.desc}
                        </p>
                        <span className="inline-flex items-center gap-1.5 text-primary font-body text-xs tracking-wide hover:text-accent transition-colors">
                          {t("learnMore")} <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </>
                  ) : (
                    /* Remaining: compact pill style */
                    <div className="p-4 md:p-5 flex items-center gap-3">
                      <span className="text-lg font-serif text-primary/40 flex-shrink-0">{s.num}</span>
                      <div className="min-w-0">
                        <h3 className="text-xs md:text-sm font-serif text-foreground group-hover:text-primary transition-colors duration-300 truncate">
                          {lang === "ar" ? s.nameAr : s.name}
                        </h3>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 ml-auto" />
                    </div>
                  )
                ) : (
                  /* Expanded Panel */
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col lg:flex-row"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Left: Image + Info */}
                    <div className="lg:w-2/5 relative">
                      <div className="relative h-48 lg:h-full min-h-[280px] overflow-hidden">
                        <img
                          src={s.img}
                          alt={lang === "ar" ? s.nameAr : s.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-popover via-popover/40 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <span className="text-4xl font-serif text-primary/60 mb-2 block">{s.num}</span>
                          <h3 className="text-xl md:text-2xl font-serif text-foreground mb-2">
                            {lang === "ar" ? s.nameAr : s.name}
                          </h3>
                          <p className="text-muted-foreground font-body text-sm leading-relaxed">
                            {lang === "ar" ? s.descAr : s.desc}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right: Sub-specialties + Doctors */}
                    <div className="lg:w-3/5 p-6 lg:p-8 flex flex-col">
                      {/* Close button */}
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          {s.subspecialties.length > 0 && (
                            <>
                              <p className="text-accent text-xs tracking-[0.2em] uppercase font-body mb-2">
                                {lang === "ar" ? "التخصصات الفرعية" : "Sub-specialties"}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {s.subspecialties.map((sub) => (
                                  <span
                                    key={sub.name}
                                    className="px-3 py-1.5 rounded-full text-xs font-body bg-secondary/50 text-foreground border border-border/30"
                                  >
                                    {lang === "ar" ? sub.nameAr : sub.name}
                                  </span>
                                ))}
                              </div>
                            </>
                          )}
                          {s.subspecialties.length === 0 && (
                            <p className="text-muted-foreground font-body text-sm leading-relaxed max-w-lg">
                              {lang === "ar" ? s.descAr : s.desc}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => setExpandedIndex(null)}
                          className="w-8 h-8 rounded-full bg-secondary/50 flex items-center justify-center hover:bg-primary/20 transition-colors flex-shrink-0 ml-4"
                        >
                          <X className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </div>

                      {/* Doctors */}
                      {deptDoctors.length > 0 && (
                        <div className="mt-auto">
                          <div className="flex items-center justify-between mb-4">
                            <p className="text-accent text-xs tracking-[0.2em] uppercase font-body">
                              {lang === "ar" ? "أطباؤنا المتخصصون" : "Our Specialists"}
                            </p>
                            {deptDoctors.length > 2 && (
                              <div className="flex gap-2">
                                <button
                                  onClick={() => scrollDoctors("left")}
                                  className="w-7 h-7 rounded-full border border-border/50 flex items-center justify-center hover:bg-secondary/40 transition-colors ltr-icon"
                                >
                                  <ChevronLeft className="w-3.5 h-3.5 text-muted-foreground" />
                                </button>
                                <button
                                  onClick={() => scrollDoctors("right")}
                                  className="w-7 h-7 rounded-full border border-border/50 flex items-center justify-center hover:bg-secondary/40 transition-colors ltr-icon"
                                >
                                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                                </button>
                              </div>
                            )}
                          </div>
                          <div
                            ref={scrollRef}
                            className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
                            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                          >
                            {deptDoctors.map((doc) => (
                              <motion.div
                                key={doc.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                                onClick={() => navigate(`/doctors/${doc.id}`)}
                                className="flex-shrink-0 w-[220px] bg-background rounded-xl border border-border/40 p-4 hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer group/doc"
                              >
                                <div className={`w-12 h-12 rounded-full ${doc.color} flex items-center justify-center mb-3`}>
                                  <span className="text-sm font-serif text-primary-foreground">{doc.initials}</span>
                                </div>
                                <h4 className="text-sm font-serif text-foreground group-hover/doc:text-primary transition-colors line-clamp-1">
                                  {lang === "ar" ? doc.nameAr : doc.name}
                                </h4>
                                <p className="text-xs text-muted-foreground font-body mt-1 line-clamp-1">
                                  {lang === "ar" ? doc.titleAr : doc.title}
                                </p>
                                <p className="text-xs text-accent font-body mt-2 inline-flex items-center gap-1">
                                  {t("viewProfile")} <ArrowRight className="w-3 h-3" />
                                </p>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Show All Departments button — navigates to full page */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center mt-8"
        >
          <button
            onClick={() => navigate("/departments")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary text-primary font-body text-xs tracking-[0.2em] uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            {lang === "ar" ? "عرض جميع الأقسام" : "Show All Departments"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default SpecializedCare;
