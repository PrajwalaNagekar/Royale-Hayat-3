import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Stethoscope } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import ScrollAnimationWrapper from "./ScrollAnimationWrapper";
import { useLanguage } from "@/contexts/LanguageContext";
import { doctors } from "@/data/doctors";
import { useIsMobile } from "@/hooks/use-mobile";

const DoctorsSection = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { lang, t } = useLanguage();
  const isMobile = useIsMobile();

  const featuredDoctors = doctors.slice(0, 12);
  const visibleCount = isMobile ? 1 : 4;
  const maxStart = Math.max(0, featuredDoctors.length - visibleCount);

  const next = useCallback(() => setStartIndex((p) => (p >= maxStart ? 0 : p + 1)), [maxStart]);
  const prev = () => setStartIndex((p) => (p <= 0 ? maxStart : p - 1));

  // Auto-advance every 3 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 3000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  const visibleDoctors = featuredDoctors.slice(startIndex, startIndex + visibleCount);

  return (
    <section className="py-20 bg-background" id="our-doctors">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between mb-14">
          <ScrollAnimationWrapper>
            <div>
              <p className="text-accent text-xs tracking-[0.3em] uppercase font-body mb-4">{t("ourTeam")}</p>
              <h2 className="text-3xl md:text-4xl font-serif text-foreground">{t("meetOurDoctors")}</h2>
            </div>
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper delay={0.1}>
            <Link to="/doctors" className="hidden md:inline-flex items-center gap-2 border border-foreground text-foreground px-6 py-3 rounded-full font-body text-xs tracking-widest uppercase hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors duration-300">
              {t("viewAllDoctors")}
            </Link>
          </ScrollAnimationWrapper>
        </div>

        <div className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left Arrow */}
          <button onClick={prev}
            disabled={startIndex === 0}
            className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-border bg-background/90 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed shadow-md ltr-icon">
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow */}
          <button onClick={next}
            disabled={startIndex >= maxStart}
            className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-border bg-background/90 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed shadow-md ltr-icon">
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="wait">
            {visibleDoctors.map((doc, offset) => (
              <Link to={`/doctors/${doc.id}`} key={doc.id}>
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut", delay: offset * 0.05 }}
                  whileHover={{ y: -6, boxShadow: "0 20px 40px -12px rgba(74,20,35,0.12)" }}
                  className="bg-popover rounded-2xl overflow-hidden border border-border/50 group cursor-pointer"
                >
                  <div className={`${doc.color} h-44 flex items-center justify-center relative overflow-hidden`}>
                    <div className="w-20 h-20 rounded-full bg-popover/20 backdrop-blur-sm flex items-center justify-center border-2 border-popover/30">
                      <span className="text-2xl font-serif text-primary-foreground">{doc.initials}</span>
                    </div>
                    <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-popover/20 backdrop-blur-sm flex items-center justify-center">
                      <Stethoscope className="w-3.5 h-3.5 text-primary-foreground" />
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-accent text-[10px] tracking-[0.2em] uppercase font-body mb-1.5">{lang === "ar" ? doc.specialtyAr : doc.specialty}</p>
                    <h3 className="text-base font-serif text-foreground mb-1 group-hover:text-primary transition-colors">{lang === "ar" ? doc.nameAr : doc.name}</h3>
                    <p className="text-muted-foreground font-body text-xs mb-1">{lang === "ar" ? doc.titleAr : doc.title}</p>
                    <p className="text-muted-foreground/70 font-body text-[11px] leading-relaxed mb-3 line-clamp-2 italic">
                      {lang === "ar" ? doc.departmentAr : doc.department}
                      {" — "}
                      {lang === "ar" ? doc.bioAr : doc.bio}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {(lang === "ar" ? doc.languagesAr : doc.languages).map((l) => (
                        <span key={l} className="px-2 py-0.5 rounded-full bg-secondary/40 text-[10px] font-body text-foreground">{l}</span>
                      ))}
                    </div>
                    <div className={`flex items-center gap-1.5 mb-2 ${doc.availableOnline !== false ? "text-green-600" : "text-destructive"}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${doc.availableOnline !== false ? "bg-green-500" : "bg-destructive"}`} />
                      <span className="font-body text-[10px]">
                        {doc.availableOnline !== false
                          ? (lang === "ar" ? "متاح عبر الإنترنت" : "Available online")
                          : (lang === "ar" ? "غير متاح عبر الإنترنت" : "Not available online")}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-2 text-primary font-body text-xs tracking-wide hover:text-accent transition-colors">
                      {t("viewProfile")}
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </AnimatePresence>
        </div>
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center gap-1.5 mt-8">
          {Array.from({ length: maxStart + 1 }).map((_, i) => (
            <button key={i} onClick={() => setStartIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === startIndex ? "bg-accent w-6" : "bg-border w-2 hover:bg-muted-foreground"}`} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DoctorsSection;
