import { useState, useRef } from "react";
import { Search, ChevronLeft, ChevronRight, Stethoscope } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatButton from "@/components/ChatButton";
import ScrollToTop from "@/components/ScrollToTop";
import { useLanguage } from "@/contexts/LanguageContext";
import { getDoctorsByDepartment, searchDoctorsBySymptom, Doctor } from "@/data/doctors";
import { Input } from "@/components/ui/input";

const DoctorCard = ({ doc }: { doc: Doctor }) => {
  const { lang } = useLanguage();
  return (
    <Link to={`/doctors/${doc.id}`} className="block min-w-[280px] max-w-[300px] flex-shrink-0">
      <motion.div
        whileHover={{ y: -6, boxShadow: "0 20px 40px -12px hsl(var(--primary) / 0.12)" }}
        className="bg-popover rounded-2xl overflow-hidden border border-border/50 group cursor-pointer h-full"
      >
        <div className={`${doc.color} h-36 flex items-center justify-center relative overflow-hidden`}>
          <div className="w-20 h-20 rounded-full bg-popover/20 backdrop-blur-sm flex items-center justify-center border-2 border-popover/30">
            <span className="text-2xl font-serif text-primary-foreground">{doc.initials}</span>
          </div>
          <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-popover/20 backdrop-blur-sm flex items-center justify-center">
            <Stethoscope className="w-3.5 h-3.5 text-primary-foreground" />
          </div>
        </div>
        <div className="p-5">
          <p className="text-accent text-[10px] tracking-[0.2em] uppercase font-body mb-1.5">
            {lang === "ar" ? doc.specialtyAr : doc.specialty}
          </p>
          <h3 className="text-base font-serif text-foreground mb-1">{lang === "ar" ? doc.nameAr : doc.name}</h3>
          <p className="text-muted-foreground font-body text-xs mb-3">{lang === "ar" ? doc.titleAr : doc.title}</p>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {(lang === "ar" ? doc.languagesAr : doc.languages).map((l) => (
              <span key={l} className="px-2.5 py-0.5 rounded-full bg-secondary/40 text-[10px] font-body text-foreground">{l}</span>
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
          <span className="inline-flex items-center gap-1.5 text-primary font-body text-xs tracking-wide group-hover:text-accent transition-colors">
            {lang === "ar" ? "عرض الملف الشخصي ←" : "View Profile →"}
          </span>
        </div>
      </motion.div>
    </Link>
  );
};

const DepartmentRow = ({ department, departmentAr, docs }: { department: string; departmentAr: string; docs: Doctor[] }) => {
  const { lang } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const showArrows = docs.length > 4;

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      const amount = 320;
      scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
    }
  };

  return (
    <div className="mb-12">
      <div className="mb-5">
        <h3 className="text-xl md:text-2xl font-serif text-foreground">
          {lang === "ar" ? departmentAr : department}
        </h3>
      </div>
      <div className="relative">
        {showArrows && (
          <>
            <button onClick={() => scroll("left")}
              className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full border border-border bg-background/90 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors shadow-md ltr-icon">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={() => scroll("right")}
              className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full border border-border bg-background/90 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors shadow-md ltr-icon">
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
        <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {docs.map((doc) => (
            <DoctorCard key={doc.id} doc={doc} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Doctors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { lang, t } = useLanguage();
  const grouped = getDoctorsByDepartment();
  const searchResults = searchDoctorsBySymptom(searchQuery);
  const isSearching = searchQuery.trim().length > 0;

  return (
    <div className="min-h-screen bg-background pt-[var(--header-height,56px)]">
      <Header />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-accent text-xs tracking-[0.3em] uppercase font-body mb-4">{t("ourTeam")}</p>
            <h1 className="text-3xl md:text-5xl font-serif text-foreground mb-4">{t("meetOurDoctors")}</h1>
            <p className="text-muted-foreground font-body max-w-lg mx-auto text-sm md:text-base">
              {lang === "ar" ? "ابحث عن الطبيب المناسب حسب الأعراض أو التخصص" : "Find the right doctor by symptom or specialty"}
            </p>
          </div>

          {/* Symptom Search */}
          <div className="max-w-2xl mx-auto mb-14">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === "ar" ? "ابحث عن الأعراض، الطبيب، القسم..." : "Search symptoms, doctor, department..."}
                className="pl-12 pr-4 py-6 text-base rounded-2xl border-border/60 bg-popover shadow-sm focus:ring-primary"
              />
            </div>
          </div>

          {/* Search results */}
          {isSearching ? (
            <div>
              <h3 className="text-lg font-serif text-foreground mb-6">
                {lang === "ar" ? `نتائج البحث (${searchResults.length})` : `Search Results (${searchResults.length})`}
              </h3>
              {searchResults.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {searchResults.map((doc) => (
                    <div key={doc.id} className="min-w-0 max-w-none">
                      <DoctorCard doc={doc} />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-12 font-body">
                  {lang === "ar" ? "لم يتم العثور على نتائج. حاول بكلمات مختلفة." : "No results found. Try different keywords."}
                </p>
              )}
            </div>
          ) : (
            /* Department-grouped doctors */
            Object.entries(grouped).map(([dept, docs]) => (
              <DepartmentRow
                key={dept}
                department={dept}
                departmentAr={docs[0].departmentAr}
                docs={docs}
              />
            ))
          )}
        </div>
      </section>

      <Footer />
      <ChatButton />
      <ScrollToTop />
    </div>
  );
};

export default Doctors;
