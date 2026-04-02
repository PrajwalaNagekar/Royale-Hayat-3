import { useState, useRef, useEffect, useMemo } from "react";
import { Menu, X, Search, ChevronDown, Building2, Stethoscope, Users, Home, Heart, Star, ShieldCheck, Phone, MapPin, Bed, Sparkles, BookOpen, Coffee, Droplets, ClipboardList, UserCheck, ScrollText, Baby } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { doctors } from "@/data/doctors";
import logoFull from "@/assets/rhh-logo-full-color.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showLogo, setShowLogo] = useState(true);
  const { lang, setLang, t } = useLanguage();
  const navigate = useNavigate();
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);
  const lastScrollY = useRef(0);
  const headerRef = useRef<HTMLElement>(null);

  // Update CSS variable for dynamic page padding
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight;
        document.documentElement.style.setProperty('--header-height', `${height}px`);
      }
    };
    updateHeaderHeight();
    const observer = new ResizeObserver(updateHeaderHeight);
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, [showLogo]);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY.current && currentY > 80) {
        setShowLogo(false);
      } else {
        setShowLogo(true);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const aboutSubLinks = [
    { label: t("ourStory"), href: "/about-us?section=history", icon: BookOpen, desc: lang === "ar" ? "قصة مستشفى رويال حياة" : "The story of Royale Hayat Hospital" },
    { label: lang === "ar" ? "الرسالة والقيم" : "Mission & Values", href: "/about-us?section=mission", icon: Heart, desc: lang === "ar" ? "رسالتنا وقيمنا الأساسية" : "Our mission and core values" },
    { label: t("chairmanMessage"), href: "/about-us?section=chairman", icon: Users, desc: lang === "ar" ? "رسالة رئيس مجلس الإدارة" : "A message from the Chairman" },
    { label: lang === "ar" ? "فريق القيادة" : "Leadership Team", href: "/about-us?section=leadership", icon: UserCheck, desc: lang === "ar" ? "تعرف على فريق القيادة" : "Meet our visionary leaders" },
  ];

  const medicalSubLinks = [
    { label: t("departments"), href: "/departments", icon: Building2, desc: t("deptCount") },
    { label: t("doctors"), href: "/doctors", icon: Stethoscope, desc: t("meetOurDoctors") },
    { label: lang === "ar" ? "رويال للرعاية المنزلية" : "Royale Home Health", href: "/home-health", icon: Home, desc: lang === "ar" ? "رعاية طبية متميزة في المنزل" : "Premium medical care at home" },
  ];

  const hospitalitySubLinks = [
    { label: lang === "ar" ? "القاعات الفاخرة" : "Luxury Halls", href: "/hospitality?section=halls", icon: Star, desc: lang === "ar" ? "قاعات أنيقة للمناسبات" : "Elegant event spaces for celebrations" },
    { label: lang === "ar" ? "الأجنحة الفاخرة" : "Luxury Suites", href: "/hospitality?section=suites", icon: Bed, desc: lang === "ar" ? "أجنحة فاخرة بمعايير فندقية" : "Luxury hotel-standard suites" },
    { label: lang === "ar" ? "خدمات الفعاليات في الغرف" : "In-Room Event Services", href: "/in-room-events", icon: Sparkles, desc: lang === "ar" ? "ترتيبات فعاليات مخصصة" : "Personalized event arrangements" },
    { label: lang === "ar" ? "سبا إليمنتس" : "Elements Spa", href: "/hospitality?section=spa", icon: Droplets, desc: lang === "ar" ? "خدمات استرخاء وعافية" : "Relaxation and wellness services" },
    { label: lang === "ar" ? "مقهى الليوان" : "Al Liwan Cafe", href: "/hospitality?section=cafe", icon: Coffee, desc: lang === "ar" ? "مأكولات راقية ومرطبات" : "Fine dining and refreshments" },
  ];

  const patientsSubLinks = [
    { label: lang === "ar" ? "التمريض" : "Nursing", href: "/patients-visitors?tab=nursing", icon: Heart, desc: lang === "ar" ? "رعاية تمريضية متفانية" : "Dedicated nursing care" },
    { label: lang === "ar" ? "معلومات القبول" : "Admission Information", href: "/patients-visitors?tab=admission", icon: ClipboardList, desc: lang === "ar" ? "ما يجب معرفته قبل القبول" : "What to know before admission" },
    { label: lang === "ar" ? "التأمين الصحي" : "Health Insurance", href: "/patients-visitors?tab=insurance", icon: ShieldCheck, desc: lang === "ar" ? "المطالبات والموافقات المسبقة" : "Claims and pre-approvals" },
    { label: lang === "ar" ? "أثناء إقامتك" : "During Your Stay", href: "/patients-visitors?tab=during-stay", icon: Bed, desc: lang === "ar" ? "خدمات الغرف والراحة" : "Room services and comfort" },
    { label: lang === "ar" ? "وثيقة حقوق المريض" : "Patient Bill of Rights", href: "/patients-visitors?tab=bill-of-rights", icon: ScrollText, desc: lang === "ar" ? "حقوقك ومسؤولياتك" : "Your rights and responsibilities" },
    { label: lang === "ar" ? "المرضى الدوليون" : "International Patient", href: "/international-patient", icon: MapPin, desc: lang === "ar" ? "دعم مخصص للمرضى الدوليين" : "Dedicated international patient support" },
    { label: lang === "ar" ? "نظام أمان الرضّع TrackerWave" : "TrackerWave Infant Security", href: "/trackerwave-infant-security", icon: Baby, desc: lang === "ar" ? "حماية متقدمة للمواليد على مدار الساعة" : "Advanced 24/7 newborn protection system" },
  ];

  const workWithUsSubLinks = [
    { label: lang === "ar" ? "الوظائف المتاحة" : "Open Positions", href: "/work-with-us?section=positions", icon: Users, desc: lang === "ar" ? "تصفح جميع الفرص الوظيفية" : "Browse all career opportunities" },
    { label: lang === "ar" ? "ثقافة العمل" : "Work Culture", href: "/work-with-us?section=culture", icon: Heart, desc: lang === "ar" ? "لماذا تعمل في رويال حياة" : "Why work at Royale Hayat" },
  ];

  const navItems = [
    { label: t("aboutUsNav"), href: "/about-us", hasDropdown: "about" },
    { label: t("medicalServices"), href: "/medical-services", hasDropdown: "medical" },
    { label: t("hospitalityServices"), href: "/hospitality", hasDropdown: "hospitality" },
    { label: t("patientsVisitors"), href: "/patients-visitors", hasDropdown: "patients" },
    { label: lang === "ar" ? "اعمل معنا" : "Work With Us", href: "/work-with-us", hasDropdown: "workwithus" },
    { label: lang === "ar" ? "اتصل بنا" : "Contact Us", href: "/contact-us" },
  ];

  const contactSubLinks = [
    { label: t("bookAppointment"), href: "/book-appointment", icon: Phone, desc: lang === "ar" ? "احجز موعدك مع أطبائنا" : "Schedule your visit with our doctors" },
    { label: lang === "ar" ? "المرضى الدوليون" : "International Patient", href: "/international-patient", icon: MapPin, desc: lang === "ar" ? "دعم مخصص للمرضى الدوليين" : "Dedicated support for international patients" },
    { label: lang === "ar" ? "اتصل بنا" : "Call Us", href: "tel:+96525360555", icon: Phone, desc: "+965 2536 0555" },
  ];

  const handleDropdownEnter = (key: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setActiveDropdown(key);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 200);
  };

  // Build comprehensive search index
  const searchIndex = useMemo(() => {
    const items: { label: string; labelAr: string; type: string; typeAr: string; href: string }[] = [];

    // Pages
    items.push(
      { label: "Home", labelAr: "الرئيسية", type: "Page", typeAr: "صفحة", href: "/" },
      { label: "About Us", labelAr: "من نحن", type: "Page", typeAr: "صفحة", href: "/about-us" },
      { label: "Medical Services", labelAr: "الخدمات الطبية", type: "Page", typeAr: "صفحة", href: "/medical-services" },
      { label: "Book Appointment", labelAr: "حجز موعد", type: "Page", typeAr: "صفحة", href: "/book-appointment" },
      { label: "Hospitality Services", labelAr: "خدمات الضيافة", type: "Page", typeAr: "صفحة", href: "/hospitality" },
      { label: "Patients & Visitors", labelAr: "المرضى والزوار", type: "Page", typeAr: "صفحة", href: "/patients-visitors" },
      { label: "Work With Us", labelAr: "اعمل معنا", type: "Page", typeAr: "صفحة", href: "/work-with-us" },
      { label: "Al Safwa Program", labelAr: "برنامج الصفوة", type: "Page", typeAr: "صفحة", href: "/al-safwa" },
      { label: "Home Health", labelAr: "الرعاية المنزلية", type: "Page", typeAr: "صفحة", href: "/home-health" },
      { label: "Doctors", labelAr: "الأطباء", type: "Page", typeAr: "صفحة", href: "/doctors" },
      { label: "Departments", labelAr: "الأقسام", type: "Page", typeAr: "صفحة", href: "/departments" },
      { label: "International Patient", labelAr: "المرضى الدوليون", type: "Page", typeAr: "صفحة", href: "/international-patient" },
      { label: "Downloads", labelAr: "التحميلات", type: "Page", typeAr: "صفحة", href: "/downloads" },
      { label: "My Medical Reports", labelAr: "تقاريري الطبية", type: "Page", typeAr: "صفحة", href: "#" },
    );

    // Departments
    const deptNames = [
      { en: "Obstetrics & Gynecology", ar: "التوليد وأمراض النساء" },
      { en: "Family Medicine", ar: "طب الأسرة" },
      { en: "Al Safwa Healthcare Program", ar: "برنامج الصفوة للرعاية الصحية" },
      { en: "Pediatrics & Neonatology", ar: "طب الأطفال وحديثي الولادة" },
      { en: "Internal Medicine", ar: "الطب الباطني" },
      { en: "General Surgery", ar: "الجراحة العامة" },
      { en: "Orthopedics", ar: "جراحة العظام" },
      { en: "ENT", ar: "الأنف والأذن والحنجرة" },
      { en: "Dermatology", ar: "الأمراض الجلدية" },
      { en: "Dental", ar: "طب الأسنان" },
      { en: "Cardiology", ar: "القلب" },
      { en: "Ophthalmology", ar: "العيون" },
      { en: "Urology", ar: "المسالك البولية" },
      { en: "Radiology", ar: "الأشعة" },
      { en: "Laboratory", ar: "المختبر" },
      { en: "Physiotherapy", ar: "العلاج الطبيعي" },
      { en: "Plastic Surgery", ar: "الجراحة التجميلية" },
      { en: "Psychiatry", ar: "الطب النفسي" },
      { en: "Nutrition & Dietetics", ar: "التغذية" },
      { en: "Emergency", ar: "الطوارئ" },
    ];
    deptNames.forEach(d => {
      items.push({ label: d.en, labelAr: d.ar, type: "Department", typeAr: "قسم", href: "/departments" });
    });

    // Doctors
    doctors.forEach(doc => {
      items.push({
        label: doc.name,
        labelAr: doc.nameAr,
        type: `Doctor · ${doc.specialty}`,
        typeAr: `طبيب · ${doc.specialtyAr}`,
        href: `/doctors/${doc.id}`,
      });
    });

    // Services / sections
    const services = [
      { en: "Luxury Suites", ar: "الأجنحة الفاخرة", href: "/hospitality" },
      { en: "Elements Spa", ar: "سبا إليمنتس", href: "/hospitality" },
      { en: "Al Liwan Cafe", ar: "مقهى الليوان", href: "/hospitality" },
      { en: "Newborn Photography", ar: "تصوير المواليد", href: "/patients-visitors" },
      { en: "Health Insurance", ar: "التأمين الصحي", href: "/patients-visitors" },
      { en: "Nursing Services", ar: "خدمات التمريض", href: "/home-health" },
      { en: "Post-Surgery Care", ar: "الرعاية بعد الجراحة", href: "/home-health" },
      { en: "Executive Health Screening", ar: "الفحص الصحي التنفيذي", href: "/al-safwa" },
      { en: "Chairman Message", ar: "رسالة رئيس مجلس الإدارة", href: "/about-us" },
      { en: "Awards & Accreditations", ar: "الجوائز والاعتمادات", href: "/#awards" },
      { en: "Insurance Partners", ar: "شركاء التأمين", href: "/#insurance" },
      { en: "Patient Testimonials", ar: "شهادات المرضى", href: "/#testimonials" },
    ];
    services.forEach(s => {
      items.push({ label: s.en, labelAr: s.ar, type: "Service", typeAr: "خدمة", href: s.href });
    });

    // Symptoms (mapped to departments)
    const symptoms = [
      { en: "Headache", ar: "صداع", href: "/departments" },
      { en: "Fever", ar: "حمى", href: "/departments" },
      { en: "Back Pain", ar: "ألم الظهر", href: "/departments" },
      { en: "Pregnancy", ar: "حمل", href: "/departments" },
      { en: "Skin Rash", ar: "طفح جلدي", href: "/departments" },
      { en: "Chest Pain", ar: "ألم في الصدر", href: "/departments" },
      { en: "Toothache", ar: "ألم الأسنان", href: "/departments" },
      { en: "Eye Problems", ar: "مشاكل العيون", href: "/departments" },
      { en: "Joint Pain", ar: "ألم المفاصل", href: "/departments" },
      { en: "Cough", ar: "سعال", href: "/departments" },
      { en: "Allergy", ar: "حساسية", href: "/departments" },
      { en: "Diabetes", ar: "سكري", href: "/departments" },
      { en: "High Blood Pressure", ar: "ضغط الدم المرتفع", href: "/departments" },
    ];
    symptoms.forEach(s => {
      items.push({ label: s.en, labelAr: s.ar, type: "Symptom", typeAr: "عرض", href: s.href });
    });

    return items;
  }, []);

  const searchResults = useMemo(() => {
    if (!searchQuery || searchQuery.length < 2) return [];
    const q = searchQuery.toLowerCase();
    return searchIndex
      .filter(item => item.label.toLowerCase().includes(q) || item.labelAr.includes(searchQuery))
      .slice(0, 8);
  }, [searchQuery, searchIndex]);

  const linkClass =
    "text-foreground font-body text-[13px] tracking-wide hover:text-accent transition-colors duration-300 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-accent after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left inline-flex items-center whitespace-nowrap";

  const getSubLinks = (key: string) => {
    switch (key) {
      case "about": return aboutSubLinks;
      case "medical": return medicalSubLinks;
      case "hospitality": return hospitalitySubLinks;
      case "patients": return patientsSubLinks;
      case "workwithus": return workWithUsSubLinks;
      case "contact": return contactSubLinks;
      default: return [];
    }
  };

  // Flag SVG components
  const BritainFlag = () => (
    <svg viewBox="0 0 60 30" className="w-5 h-3 rounded-sm overflow-hidden" aria-hidden="true">
      <clipPath id="s"><path d="M0,0 v30 h60 v-30 z"/></clipPath>
      <clipPath id="t"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/></clipPath>
      <g clipPath="url(#s)">
        <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
        <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4"/>
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
      </g>
    </svg>
  );

  const KuwaitFlag = () => (
    <svg viewBox="0 0 60 30" className="w-5 h-3 rounded-sm overflow-hidden" aria-hidden="true">
      <rect width="60" height="10" fill="#007A3D"/>
      <rect y="10" width="60" height="10" fill="#FFFFFF"/>
      <rect y="20" width="60" height="10" fill="#CE1126"/>
      <path d="M0,0 L15,15 L0,30 Z" fill="#000000"/>
    </svg>
  );

  return (
    <header ref={headerRef} className="bg-popover border-b border-border fixed top-0 left-0 right-0 z-50">
      {/* Search Popup */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-popover border-b border-border shadow-lg z-50"
          >
            <div className="container mx-auto px-6 py-4">
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t("searchPlaceholder")}
                  className="w-full pl-12 pr-10 py-3 rounded-xl bg-background border border-border text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  autoFocus
                />
                <button onClick={() => { setSearchOpen(false); setSearchQuery(""); }} className="absolute right-3 top-1/2 -translate-y-1/2">
                  <X className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                </button>
              </div>
              {searchResults.length > 0 && (
                <div className="max-w-2xl mx-auto mt-2 bg-popover border border-border rounded-xl overflow-hidden shadow-lg">
                  {searchResults.map((s) => (
                    <button
                      key={s.label + s.href}
                      className="w-full px-4 py-3 flex items-center justify-between hover:bg-background transition-colors text-left"
                      onClick={() => {
                        setSearchOpen(false);
                        setSearchQuery("");
                        if (s.href.startsWith("/#")) {
                          navigate("/");
                          setTimeout(() => {
                            document.querySelector(s.href.replace("/", ""))?.scrollIntoView({ behavior: "smooth" });
                          }, 300);
                        } else if (s.href.startsWith("#")) {
                          document.querySelector(s.href)?.scrollIntoView({ behavior: "smooth" });
                        } else {
                          navigate(s.href);
                        }
                      }}
                    >
                      <span className="font-body text-sm text-foreground">{lang === "ar" ? s.labelAr : s.label}</span>
                      <span className="text-xs font-body text-muted-foreground bg-secondary/20 px-2 py-0.5 rounded-full">{lang === "ar" ? s.typeAr : s.type}</span>
                    </button>
                  ))}
                </div>
              )}
              {searchQuery.length >= 2 && searchResults.length === 0 && (
                <div className="max-w-2xl mx-auto mt-2 bg-popover border border-border rounded-xl p-4 shadow-lg text-center">
                  <p className="font-body text-sm text-muted-foreground">{lang === "ar" ? "لا توجد نتائج" : "No results found"}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Row 1: Logo (centered on desktop, left on mobile — always visible on mobile) */}
      <div className="hidden md:block">
        <AnimatePresence>
          {showLogo && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-b border-border/50"
            >
              <div className="container mx-auto flex items-center justify-center py-3 px-4 md:px-6">
                <Link to="/">
                  <img src={logoFull} alt="Royale Hayat Hospital" className="h-16 md:h-[72px] w-auto" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Row 2: Navigation bar */}
      <div className="container mx-auto flex items-center justify-between py-1.5 px-3 md:py-2 md:px-6 gap-2 md:gap-4">
        {/* Mobile logo — always visible, left-aligned, smaller */}
        <Link to="/" className="md:hidden flex-shrink-0">
          <img src={logoFull} alt="Royale Hayat Hospital" className="h-7 w-auto" />
        </Link>

        {/* Desktop nav - evenly spaced */}
        <nav className="hidden xl:flex items-center flex-1 justify-between">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.hasDropdown && handleDropdownEnter(item.hasDropdown)}
              onMouseLeave={handleDropdownLeave}
            >
              {item.href.startsWith("/") ? (
                <Link to={item.href} className={linkClass}>
                  <span className="inline-flex items-center gap-0.5 w-fit">
                    <span>{item.label}</span>
                    {item.hasDropdown && <ChevronDown className="w-3.5 h-3.5 shrink-0" />}
                  </span>
                </Link>
              ) : (
                <a href={item.href} className={linkClass}>
                  <span className="inline-flex items-center gap-0.5 w-fit">
                    <span>{item.label}</span>
                    {item.hasDropdown && <ChevronDown className="w-3.5 h-3.5 shrink-0" />}
                  </span>
                </a>
              )}

              {/* Mega Menu Dropdown */}
              <AnimatePresence>
                {item.hasDropdown && activeDropdown === item.hasDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute top-full mt-2 ${item.hasDropdown === "patients" ? "w-[680px]" : "w-[480px]"} bg-popover border border-border rounded-2xl shadow-2xl overflow-hidden z-50 p-6 ${lang === "ar" ? "right-0" : "left-1/2 -translate-x-1/2"}`}
                    style={{ maxWidth: 'calc(100vw - 2rem)' }}
                  >
                    <p className="text-xs tracking-[0.2em] uppercase font-body text-accent mb-4">{item.label}</p>
                    <div className={`grid ${item.hasDropdown === "patients" ? "grid-cols-2" : "grid-cols-1"} gap-2`}>
                      {getSubLinks(item.hasDropdown).map((sub) => (
                        sub.href.startsWith("/") ? (
                          <Link
                            key={sub.label}
                            to={sub.href}
                            onClick={(e) => {
                              const currentPath = window.location.pathname + window.location.search;
                              if (currentPath === sub.href) {
                                e.preventDefault();
                                window.location.href = sub.href;
                              }
                              setActiveDropdown(null);
                            }}
                            className="flex items-start gap-4 p-3 rounded-xl hover:bg-background transition-colors group"
                          >
                            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                              <sub.icon className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-body text-sm font-medium text-foreground group-hover:text-primary transition-colors">{sub.label}</p>
                              <p className="font-body text-xs text-muted-foreground mt-0.5">{sub.desc}</p>
                            </div>
                          </Link>
                        ) : (
                          <a
                            key={sub.label}
                            href={sub.href}
                            className="flex items-start gap-4 p-3 rounded-xl hover:bg-background transition-colors group"
                          >
                            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                              <sub.icon className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-body text-sm font-medium text-foreground group-hover:text-primary transition-colors">{sub.label}</p>
                              <p className="font-body text-xs text-muted-foreground mt-0.5">{sub.desc}</p>
                            </div>
                          </a>
                        )
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Right side buttons */}
        <div className="flex items-center gap-1.5 md:gap-4 ml-auto">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full hover:bg-background transition-colors"
            aria-label="Search"
          >
            <Search className="w-4 h-4 text-foreground" />
          </button>
          <Link
            to="/book-appointment"
            className="hidden sm:inline-flex bg-primary text-primary-foreground px-3.5 py-1.5 rounded-full text-[11px] font-body tracking-wide hover:bg-primary/90 transition-colors duration-300"
          >
            {t("bookAppointment")}
          </Link>
          
          <button
            className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-body tracking-wide border border-border text-foreground hover:bg-background transition-colors duration-300"
          >
            {t("login")}
          </button>
          
          {/* Language capsule toggle EN | AR */}
          <div className="flex items-center bg-muted/40 rounded-full p-0.5 border border-border">
            <button
              onClick={() => setLang("en")}
              className={`px-2 md:px-3 h-6 md:h-7 rounded-full text-[10px] md:text-xs font-semibold tracking-wide transition-all duration-300 ${
                lang === "en"
                  ? "bg-accent text-accent-foreground shadow-sm"
                  : "bg-transparent text-muted-foreground hover:bg-background/60"
              }`}
              aria-label="English"
            >
              EN
            </button>
            <button
              onClick={() => setLang("ar")}
              className={`px-2 md:px-3 h-6 md:h-7 rounded-full text-[10px] md:text-xs font-semibold tracking-wide transition-all duration-300 ${
                lang === "ar"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-transparent text-muted-foreground hover:bg-background/60"
              }`}
              aria-label="العربية"
            >
              AR
            </button>
          </div>

          <button
            className="xl:hidden w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-foreground flex-shrink-0"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5 md:w-6 md:h-6" /> : <Menu className="w-5 h-5 md:w-6 md:h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-popover border-t border-border overflow-hidden"
          >
            <nav className="flex flex-col py-4 px-6">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.href.startsWith("/") ? (
                    <Link
                      to={item.href}
                      className="text-foreground font-body text-sm tracking-wide py-3 border-b border-border/50 hover:text-accent transition-colors block"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      className="text-foreground font-body text-sm tracking-wide py-3 border-b border-border/50 hover:text-accent transition-colors block"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  )}
                </div>
              ))}
              <Link
                to="/book-appointment"
                className="text-primary font-body text-sm tracking-wide py-3 border-b border-border/50 hover:text-accent transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {t("bookAppointment")}
              </Link>
              <button
                className="text-left text-foreground font-body text-sm tracking-wide py-3 border-b border-border/50 hover:text-accent transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {t("login")}
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
