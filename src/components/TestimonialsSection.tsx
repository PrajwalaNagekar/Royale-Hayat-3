import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import ScrollAnimationWrapper from "./ScrollAnimationWrapper";
import { useLanguage } from "@/contexts/LanguageContext";

const testimonials = [
  {
    stars: 5,
    text: "The care I received at Royale Hayat was truly exceptional. From the moment I arrived, the staff treated me with warmth and professionalism. The VIP suite was like a five-star hotel.",
    textAr: "كانت الرعاية التي تلقيتها في رويال حياة استثنائية حقاً. منذ لحظة وصولي، عاملني الطاقم بدفء واحترافية. كان الجناح الفاخر كفندق خمس نجوم.",
    name: "Sarah Al-Mutairi", nameAr: "سارة المطيري",
  },
  {
    stars: 5,
    text: "Dr. Al-Shammari and her team made my pregnancy journey stress-free and comfortable. The neonatal unit gave us complete peace of mind. Highly recommend their maternity services.",
    textAr: "جعلت د. الشمري وفريقها رحلة حملي خالية من التوتر ومريحة. وحدة حديثي الولادة منحتنا راحة بال تامة. أوصي بشدة بخدمات الأمومة لديهم.",
    name: "Fatima Al-Rashidi", nameAr: "فاطمة الرشيدي",
  },
  {
    stars: 5,
    text: "World-class medical care in Kuwait. The international accreditations speak volumes about their quality standards. My entire family trusts Royale Hayat for all our healthcare needs.",
    textAr: "رعاية طبية عالمية المستوى في الكويت. الاعتمادات الدولية تتحدث عن معايير الجودة لديهم. عائلتي بأكملها تثق في رويال حياة لجميع احتياجاتنا الصحية.",
    name: "Ahmed Al-Sabah", nameAr: "أحمد الصباح",
  },
  {
    stars: 5,
    text: "The pediatric department was outstanding. My children felt comfortable and safe. The doctors were incredibly patient and thorough with their examinations.",
    textAr: "كان قسم الأطفال متميزاً. شعر أطفالي بالراحة والأمان. كان الأطباء صبورين للغاية ودقيقين في فحوصاتهم.",
    name: "Noura Al-Hajri", nameAr: "نورة الهاجري",
  },
  {
    stars: 5,
    text: "From consultation to recovery, every step was handled with care and precision. The surgical team was world-class and the post-operative care was exceptional.",
    textAr: "من الاستشارة إلى التعافي، تم التعامل مع كل خطوة بعناية ودقة. كان الفريق الجراحي عالمي المستوى والرعاية بعد العملية كانت استثنائية.",
    name: "Mohammed Al-Enezi", nameAr: "محمد العنزي",
  },
  {
    stars: 5,
    text: "I traveled from abroad specifically for treatment here. The international patient services made everything seamless. Truly a premium healthcare experience.",
    textAr: "سافرت من الخارج خصيصاً للعلاج هنا. خدمات المرضى الدوليين جعلت كل شيء سلساً. تجربة رعاية صحية فاخرة حقاً.",
    name: "Layla Hassan", nameAr: "ليلى حسن",
  },
];

const duplicated = [...testimonials, ...testimonials];

const TestimonialsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const { lang, t } = useLanguage();

  return (
    <section className="py-24 bg-popover overflow-hidden">
      <div className="container mx-auto px-6">
        <ScrollAnimationWrapper>
          <div className="text-center mb-16">
            <p className="text-accent text-xs tracking-[0.3em] uppercase font-body mb-4">{t("testimonials")}</p>
            <h2 className="text-4xl md:text-5xl font-serif text-foreground">{t("patientFeedback")}</h2>
          </div>
        </ScrollAnimationWrapper>
      </div>

      <div ref={containerRef} className="relative w-full" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
        <motion.div className="flex gap-6 w-max px-6"
          animate={{ x: lang === "ar" ? ["0%", "50%"] : ["0%", "-50%"] }}
          transition={{ x: { repeat: Infinity, repeatType: "loop", duration: 40, ease: "linear" } }}
          style={{ animationPlayState: isPaused ? "paused" : "running" }}>
          {duplicated.map((item, i) => (
            <motion.div key={`${item.name}-${i}`} whileHover={{ y: -6, boxShadow: "0 20px 40px -15px rgba(74,20,35,0.1)" }}
              className="bg-background rounded-2xl p-8 border border-border/50 w-[360px] flex-shrink-0">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: item.stars }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-foreground font-body leading-relaxed mb-6 text-sm">"{lang === "ar" ? item.textAr : item.text}"</p>
              <p className="font-serif text-foreground text-sm">{lang === "ar" ? item.nameAr : item.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;