import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatButton from "@/components/ChatButton";
import ScrollToTop from "@/components/ScrollToTop";
import DepartmentsSection from "@/components/DepartmentsSection";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { doctors } from "@/data/doctors";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Stethoscope } from "lucide-react";
import { useRef } from "react";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";

const FeaturedDoctors = () => {
  const { lang } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const featured = doctors.slice(0, 10);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === "left" ? -280 : 280, behavior: "smooth" });
    }
  };

  return (
    <section className="py-12 bg-muted/20">
      <div className="container mx-auto px-6">
        <ScrollAnimationWrapper>
          <div className="text-center mb-8">
            <p className="text-accent text-xs tracking-[0.3em] uppercase font-body mb-3">
              {lang === "ar" ? "فريقنا الطبي" : "Our Medical Team"}
            </p>
            <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-2">
              {lang === "ar" ? "تعرف على أطبائنا" : "Meet Our Doctors"}
            </h2>
            <p className="text-muted-foreground font-body text-sm max-w-md mx-auto">
              {lang === "ar" ? "نخبة من الأطباء المتخصصين لتقديم أفضل رعاية صحية" : "A team of specialized physicians delivering world-class healthcare"}
            </p>
          </div>
        </ScrollAnimationWrapper>
        <div className="relative">
          <button onClick={() => scroll("left")}
            className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-border bg-background/90 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors shadow-md ltr-icon">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={() => scroll("right")}
            className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-border bg-background/90 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors shadow-md ltr-icon">
            <ChevronRight className="w-5 h-5" />
          </button>
          <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {featured.map((doc) => (
              <Link
                key={doc.id}
                to={`/doctors/${doc.id}`}
                className="min-w-[240px] bg-popover border border-border/50 rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-md transition-all group flex-shrink-0"
              >
                <div className={`${doc.color} h-28 flex items-center justify-center relative`}>
                  <div className="w-14 h-14 rounded-full bg-popover/20 backdrop-blur-sm flex items-center justify-center border-2 border-popover/30">
                    <span className="text-lg font-serif text-primary-foreground">{doc.initials}</span>
                  </div>
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-popover/20 backdrop-blur-sm flex items-center justify-center">
                    <Stethoscope className="w-2.5 h-2.5 text-primary-foreground" />
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-accent text-[9px] tracking-[0.2em] uppercase font-body mb-1">{lang === "ar" ? doc.specialtyAr : doc.specialty}</p>
                  <p className="font-serif text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">{lang === "ar" ? doc.nameAr : doc.name}</p>
                  <p className="font-body text-xs text-muted-foreground mt-0.5 line-clamp-1">{lang === "ar" ? doc.titleAr : doc.title}</p>
                  <span className="inline-flex items-center gap-1 text-primary font-body text-[10px] tracking-wide mt-2">
                    {lang === "ar" ? "عرض الملف ←" : "View Profile →"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="text-center mt-6">
          <Link to="/doctors" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-body text-xs tracking-[0.15em] uppercase hover:bg-primary/90 transition-colors">
            {lang === "ar" ? "عرض جميع الأطباء" : "View All Doctors"}
          </Link>
        </div>
      </div>
    </section>
  );
};

const MedicalServices = () => {
  return (
    <div className="min-h-screen bg-background pt-[var(--header-height,56px)]">
      <Header />
      <DepartmentsSection />
      <FeaturedDoctors />
      <Footer />
      <ChatButton />
      <ScrollToTop />
    </div>
  );
};

export default MedicalServices;
