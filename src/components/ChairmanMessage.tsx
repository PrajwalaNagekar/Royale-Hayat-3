import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ChairmanMessage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { lang, t } = useLanguage();

  return (
    <section className="py-16 bg-secondary/10" ref={ref} id="chairman">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            <p className="text-accent text-xs tracking-[0.3em] uppercase font-body mb-3">{t("aMessageFrom")}</p>
            <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-2">{t("theChairman")}</h2>
            <p className="font-body text-sm text-muted-foreground mb-8">{lang === "ar" ? "مرحباً بكم في مستشفى رويال حياة" : "Welcome To Royale Hayat Hospital"}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-popover rounded-2xl p-8 md:p-10 border border-border/50 relative text-start">
            <Quote className="w-8 h-8 text-accent/20 absolute top-6 start-6" />
            <p className="font-body text-xs text-muted-foreground mb-4 italic">{lang === "ar" ? "عزيزي المريض / الزائر،" : "Dear Patient / Visitor,"}</p>
            <blockquote className="font-serif text-base md:text-lg text-foreground leading-relaxed italic mb-6 relative z-10">
              "{t("chairmanQuote")}"
            </blockquote>
            <div className="space-y-4 mb-6">
              {t("chairmanFullMessage").split("\n\n").map((paragraph, i) => (
                <p key={i} className="font-body text-sm text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
            <p className="font-body text-xs text-muted-foreground italic mb-2">
              {lang === "ar" ? "مع أطيب التمنيات،" : "Kindest regards,"}
            </p>
            <p className="font-body text-xs text-accent italic mb-6">
              {lang === "ar" ? "مستشفى رويال حياة ...وجهتك لصحة أفضل والاحتفاء بالحياة!" : "Royale Hayat Hospital ...your destination for better health and to celebrate life!"}
            </p>
            <div>
              <p className="font-body text-xs text-muted-foreground italic mb-1">
                {lang === "ar" ? "مع أطيب التمنيات،" : "With best wishes,"}
              </p>
              <p className="font-serif text-sm text-primary font-medium">{t("chairmanName")}</p>
              <p className="font-body text-xs text-muted-foreground">{t("chairmanTitle")}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ChairmanMessage;
