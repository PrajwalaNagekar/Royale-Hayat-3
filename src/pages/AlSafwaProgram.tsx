import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";
import { Crown, Star, Target, Stethoscope, ClipboardList, Briefcase, UserPlus, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const AlSafwaProgram = () => {
  const { t, lang } = useLanguage();
  const isAr = lang === "ar";

  const objectives = isAr ? [
    "تقديم رعاية صحية متميزة وشخصية",
    "تحديد المخاطر الصحية والتخفيف منها مبكراً",
    "إدارة الحالات المزمنة والوراثية بكفاءة",
    "توفير تحديثات التطعيم",
    "تعزيز الصحة العامة والرفاهية",
  ] : [
    "Deliver premium, personalized healthcare",
    "Identify and mitigate health risks early",
    "Efficiently manage chronic and hereditary conditions",
    "Provide immunization updates",
    "Enhance overall health and well-being",
  ];

  const features = isAr ? [
    "الوصول إلى أفضل المتخصصين في أمراض القلب والجهاز الهضمي والمزيد",
    "استمتع بأجنحة تنفيذية خاصة وأنيقة",
    "استفد من منسق تنفيذي مخصص لجدولة سلسة",
    "استخدم مختبرنا المعتمد وخدمات التشخيص",
    "احصل على تقرير طبي شامل بعد التقييم",
  ] : [
    "Access top specialists in Cardiology, Gastroenterology, and more",
    "Enjoy elegant, private executive suites",
    "Benefit from a dedicated Executive Coordinator for seamless scheduling",
    "Utilize our accredited laboratory and diagnostic services",
    "Receive a comprehensive medical report after your assessment",
  ];

  const whatToBring = isAr ? [
    "قائمة الأدوية الحالية أو عينات",
    "السجلات الطبية السابقة ونتائج المختبر",
    "تفاصيل الاتصال بالطبيب المحيل",
    "ملابس مريحة للإقامة الليلية",
  ] : [
    "Current medication list or samples",
    "Previous medical records and lab results",
    "Contact details of your referring physician",
    "Comfortable clothing for overnight stays",
  ];

  return (
    <div className="min-h-screen bg-background pt-[var(--header-height,56px)]">
      <Header />

      {/* Hero */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-6">
          <ScrollAnimationWrapper>
            <div className="text-center max-w-3xl mx-auto">
              <div className="w-20 h-20 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-6">
                <Crown className="w-10 h-10 text-accent" />
              </div>
              <p className="text-accent text-xs tracking-[0.3em] uppercase font-body mb-3">{t("eliteHealthcare")}</p>
              <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-6">{t("alSafwaProgram")}</h1>
              <p className="text-muted-foreground font-body text-base leading-relaxed">
                {isAr
                  ? "في عالم اليوم سريع الإيقاع، غالباً ما تأخذ الصحة مقعداً خلفياً. يقدم برنامج الصفوة في مستشفى رويال حياة رعاية طبية متميزة مصممة لتتناسب بسلاسة مع أسلوب حياتك المزدحم."
                  : "In today's fast-paced world, health can often take a backseat. The Al Safwa Program at Royale Hayat Hospital offers elite medical care designed to fit seamlessly into your busy lifestyle."}
              </p>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>

      {/* Program Overview */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <ScrollAnimationWrapper>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-3">{isAr ? "نظرة عامة على البرنامج" : "Program Overview"}</h2>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  {isAr
                    ? "تحكم في صحتك بسهولة مع برنامجنا المخصص. سجّل عن طريق ملء نموذج تسجيل سريع يقدم لمحة عن تاريخك الطبي ونمط حياتك. سيقوم فريقنا بإعداد خطة رعاية مخصصة لك."
                    : "Take control of your health effortlessly with our personalized program. Enroll by completing a quick registration form, providing a snapshot of your medical history and lifestyle. Our team will craft a customized care plan just for you."}
                </p>
              </div>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-6 max-w-4xl">
          <ScrollAnimationWrapper>
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0">
                <Target className="w-6 h-6 text-accent" />
              </div>
              <h2 className="text-2xl md:text-3xl font-serif text-foreground">{isAr ? "الأهداف" : "Objectives"}</h2>
            </div>
          </ScrollAnimationWrapper>
          <div className="grid gap-4 ml-16">
            {objectives.map((obj, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 bg-popover border border-border/50 rounded-xl px-5 py-4">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="font-body text-sm text-foreground">{obj}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <ScrollAnimationWrapper>
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Stethoscope className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-serif text-foreground">{isAr ? "المميزات" : "Features"}</h2>
            </div>
          </ScrollAnimationWrapper>
          <div className="grid gap-4 ml-16">
            {features.map((feat, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 bg-popover border border-border/50 rounded-xl px-5 py-4">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="font-body text-sm text-foreground">{feat}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Preparing for Your Visit */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-6 max-w-4xl">
          <ScrollAnimationWrapper>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0">
                <ClipboardList className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-3">{isAr ? "التحضير لزيارتك" : "Preparing for Your Visit"}</h2>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  {isAr
                    ? "لضمان نتائج دقيقة، يرجى الصيام لمدة 12 ساعة قبل الزيارة واستشارة طبيبك بشأن الأدوية. الوصول مبكراً لإتمام التسجيل والاسترخاء في جناحك التنفيذي."
                    : "To ensure accurate results, please fast for 12 hours before, and consult your doctor about medications. Arrive early to complete registration and relax in your executive suite."}
                </p>
              </div>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>

      {/* What to Bring */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <ScrollAnimationWrapper>
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-serif text-foreground">{isAr ? "ما يجب إحضاره" : "What to Bring"}</h2>
            </div>
          </ScrollAnimationWrapper>
          <div className="grid gap-4 ml-16">
            {whatToBring.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 bg-popover border border-border/50 rounded-xl px-5 py-4">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="font-body text-sm text-foreground">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Register CTA */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-6">
          <ScrollAnimationWrapper>
            <div className="text-center max-w-2xl mx-auto">
              <div className="w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-5">
                <UserPlus className="w-8 h-8 text-accent" />
              </div>
              <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-4">{isAr ? "سجّل اليوم" : "Register Today"}</h2>
              <p className="text-muted-foreground font-body text-sm leading-relaxed mb-6">
                {isAr
                  ? "قم بزيارة موقعنا للانضمام إلى برنامج الصفوة وإعطاء الأولوية لصحتك بفخامة وسهولة."
                  : "Visit our website to join the Al Safwa Program and prioritize your health with luxury and ease."}
              </p>
              <a href="/book-appointment"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-body text-sm tracking-wide hover:bg-primary/90 transition-colors">
                {isAr ? "سجّل الآن" : "Enroll Now"}
              </a>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default AlSafwaProgram;
