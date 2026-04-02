import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Stethoscope, Globe, Award, Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatButton from "@/components/ChatButton";
import { useLanguage } from "@/contexts/LanguageContext";
import { doctors } from "@/data/doctors";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const patientFeedback = [
  {
    name: "Sara Al-Mutairi", nameAr: "سارة المطيري",
    rating: 5,
    comment: "Exceptional care and professionalism. I felt genuinely listened to and my treatment was thoroughly explained at every step.",
    commentAr: "رعاية استثنائية واحترافية. شعرت بأنه يتم الاستماع إلي حقاً وتم شرح علاجي بدقة في كل خطوة.",
    date: "March 2025"
  },
  {
    name: "Ahmed Al-Rashidi", nameAr: "أحمد الرشيدي",
    rating: 5,
    comment: "One of the best medical experiences I've had. The doctor was incredibly knowledgeable and took the time to answer all my questions.",
    commentAr: "واحدة من أفضل التجارب الطبية التي مررت بها. كان الطبيب على دراية كبيرة وأخذ الوقت للإجابة على جميع أسئلتي.",
    date: "February 2025"
  },
  {
    name: "Fatima Hassan", nameAr: "فاطمة حسن",
    rating: 4,
    comment: "Very professional and caring. The entire team made me feel comfortable and at ease throughout my visit.",
    commentAr: "احترافية ورعاية عالية. جعلني الفريق بأكمله أشعر بالراحة والاطمئنان طوال زيارتي.",
    date: "January 2025"
  },
  {
    name: "Nora Al-Sabah", nameAr: "نورة الصباح",
    rating: 5,
    comment: "World-class treatment in a beautiful facility. The doctor's attention to detail was remarkable.",
    commentAr: "علاج عالمي في منشأة جميلة. كان اهتمام الطبيب بالتفاصيل رائعاً.",
    date: "December 2024"
  },
  {
    name: "Mohammed Al-Enezi", nameAr: "محمد العنزي",
    rating: 5,
    comment: "I traveled from abroad for this doctor and it was absolutely worth it. Truly exceptional medical expertise.",
    commentAr: "سافرت من الخارج لهذا الطبيب وكان الأمر يستحق تماماً. خبرة طبية استثنائية حقاً.",
    date: "November 2024"
  },
  {
    name: "Layla Al-Dhafiri", nameAr: "ليلى الظفيري",
    rating: 4,
    comment: "The follow-up care was just as impressive as the initial consultation. They truly care about long-term outcomes.",
    commentAr: "كانت رعاية المتابعة مثيرة للإعجاب تماماً مثل الاستشارة الأولى. إنهم يهتمون حقاً بالنتائج طويلة المدى.",
    date: "October 2024"
  },
];

const DoctorProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { lang, t } = useLanguage();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const doctor = doctors.find((d) => d.id === id);

  if (!doctor) {
    return (
      <div className="min-h-screen bg-background pt-[var(--header-height,56px)]">
        <Header />
        <div className="container mx-auto px-6 py-24 text-center">
          <h1 className="text-3xl font-serif text-foreground mb-4">
            {lang === "ar" ? "الطبيب غير موجود" : "Doctor Not Found"}
          </h1>
          <button onClick={() => navigate(-1)} className="text-primary hover:text-accent font-body transition-colors">
            {lang === "ar" ? "← رجوع" : "← Go Back"}
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const isOnlineAvailable = doctor.availableOnline !== false;

  const handleBookAppointment = () => {
    if (isOnlineAvailable) {
      setShowModal(true);
    }
  };

  const handleRegisteredYes = () => {
    setShowModal(false);
    window.open("https://afyati.royalehayat.com", "_blank");
  };

  const handleRegisteredNo = () => {
    setShowModal(false);
    navigate("/appointment-request");
  };

  return (
    <div className="min-h-screen bg-background pt-[var(--header-height,56px)]">
      <Header />

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          {/* Back link */}
          <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary font-body text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            {lang === "ar" ? "رجوع" : "Go Back"}
          </button>

          <div className="grid md:grid-cols-3 gap-10">
            {/* Left – Doctor Avatar & Quick Info */}
            <div className="md:col-span-1">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="bg-popover rounded-2xl overflow-hidden border border-border/50 sticky top-24">
                <div className={`${doctor.color} h-52 flex items-center justify-center relative`}>
                  <div className="w-28 h-28 rounded-full bg-popover/20 backdrop-blur-sm flex items-center justify-center border-2 border-popover/30">
                    <span className="text-4xl font-serif text-primary-foreground">{doctor.initials}</span>
                  </div>
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-popover/20 backdrop-blur-sm flex items-center justify-center">
                    <Stethoscope className="w-4.5 h-4.5 text-primary-foreground" />
                  </div>
                </div>
                <div className="p-6 text-center">
                  <p className="text-accent text-xs tracking-[0.2em] uppercase font-body mb-2">
                    {lang === "ar" ? doctor.specialtyAr : doctor.specialty}
                  </p>
                  <h1 className="text-2xl font-serif text-foreground mb-1">{lang === "ar" ? doctor.nameAr : doctor.name}</h1>
                  <p className="text-muted-foreground font-body text-sm mb-5">{lang === "ar" ? doctor.titleAr : doctor.title}</p>

                  {/* Availability Badge */}
                  <div className={`flex items-center gap-1.5 mb-4 justify-center ${isOnlineAvailable ? "text-green-600" : "text-destructive"}`}>
                    <div className={`w-2 h-2 rounded-full ${isOnlineAvailable ? "bg-green-500" : "bg-destructive"}`} />
                    <span className="font-body text-xs">
                      {isOnlineAvailable
                        ? (lang === "ar" ? "متاح للاستشارة عبر الإنترنت" : "Available for online consultation")
                        : (lang === "ar" ? "غير متاح للاستشارة عبر الإنترنت" : "Not available for online consultation")}
                    </span>
                  </div>

                  {isOnlineAvailable ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleBookAppointment}
                      className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-body text-sm tracking-wider uppercase hover:bg-primary/90 transition-colors"
                    >
                      {t("bookAppointment")}
                    </motion.button>
                  ) : (
                    <p className="font-body text-xs text-muted-foreground text-center bg-muted/30 rounded-xl py-3 px-4">
                      {lang === "ar"
                        ? "يرجى الاتصال بالمستشفى مباشرة لحجز موعد مع هذا الطبيب"
                        : "Please contact the hospital directly to book with this doctor"}
                    </p>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Right – Details */}
            <div className="md:col-span-2 space-y-8">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <h2 className="text-lg font-serif text-foreground mb-3">
                  {lang === "ar" ? "نبذة" : "About"}
                </h2>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  {lang === "ar" ? doctor.bioAr : doctor.bio}
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <h2 className="text-lg font-serif text-foreground mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-accent" />
                  {lang === "ar" ? "مجالات الخبرة" : "Areas of Expertise"}
                </h2>
                <div className="flex flex-wrap gap-2.5">
                  {(lang === "ar" ? doctor.expertiseAr : doctor.expertise).map((exp) => (
                    <span key={exp} className="px-4 py-2 rounded-xl bg-secondary/50 text-sm font-body text-foreground border border-border/30">
                      {exp}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <h2 className="text-lg font-serif text-foreground mb-3 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-accent" />
                  {lang === "ar" ? "اللغات" : "Languages"}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {(lang === "ar" ? doctor.languagesAr : doctor.languages).map((l) => (
                    <span key={l} className="px-4 py-2 rounded-full bg-secondary/40 text-sm font-body text-foreground">{l}</span>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <h2 className="text-lg font-serif text-foreground mb-3">
                  {lang === "ar" ? "القسم" : "Department"}
                </h2>
                <p className="text-muted-foreground font-body text-sm">
                  {lang === "ar" ? doctor.departmentAr : doctor.department}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Patient Feedback - Full Width Marquee */}
      <section className="py-12 bg-background overflow-hidden">
        <div className="container mx-auto px-6 mb-6">
          <h2 className="text-xl font-serif text-foreground flex items-center gap-2">
            <Quote className="w-5 h-5 text-accent" />
            {lang === "ar" ? "آراء المرضى" : "Patient Feedback"}
          </h2>
        </div>
        <div className="relative overflow-hidden">
          <div className={`flex gap-5 w-max hover:[animation-play-state:paused] ${lang === "ar" ? "animate-[feedbackMarqueeRtl_30s_linear_infinite]" : "animate-[feedbackMarquee_30s_linear_infinite]"}`}>
            {[...patientFeedback, ...patientFeedback].map((fb, i) => (
              <div
                key={i}
                className="w-[280px] h-[280px] flex-shrink-0 bg-popover rounded-2xl border border-border/40 p-5 flex flex-col justify-between hover:shadow-lg transition-shadow"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-serif text-primary">{(lang === "ar" ? fb.nameAr : fb.name).charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-body text-sm font-medium text-foreground">{lang === "ar" ? fb.nameAr : fb.name}</p>
                      <p className="font-body text-[10px] text-muted-foreground">{fb.date}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground font-body text-xs leading-relaxed italic line-clamp-5">
                    "{lang === "ar" ? fb.commentAr : fb.comment}"
                  </p>
                </div>
                <div className="flex items-center gap-0.5 mt-3">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className={`w-3.5 h-3.5 ${s < fb.rating ? "text-accent fill-accent" : "text-border"}`} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registered Patient Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader className="text-center">
            <DialogTitle className="text-xl font-serif text-foreground">
              {t("areYouRegistered")}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground font-body text-sm mt-2">
              {lang === "ar"
                ? "يرجى اختيار ما ينطبق عليك للمتابعة"
                : "Please select the option that applies to you to continue"}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <Button
              onClick={handleRegisteredYes}
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl py-6 text-base font-body tracking-wide"
            >
              {t("yes")}
            </Button>
            <Button
              onClick={handleRegisteredNo}
              variant="outline"
              className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-xl py-6 text-base font-body tracking-wide"
            >
              {t("no")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
      <ChatButton />
    </div>
  );
};

export default DoctorProfile;
