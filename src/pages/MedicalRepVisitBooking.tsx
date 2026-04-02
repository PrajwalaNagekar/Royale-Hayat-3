import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatButton from "@/components/ChatButton";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CalendarCheck, ListChecks } from "lucide-react";

const MedicalRepVisitBooking = () => {
  const { t } = useLanguage();

  const steps = [
    'Click on the "Register" button.',
    "Choose the desired doctor or department.",
    'The calendar will open, allowing you to select your preferred date and time. Once done, click "Next."',
    'Enter your full name, email address, and mobile number. Click on "Scheduled Event" to proceed.',
    "A confirmation page will appear, and a confirmation email will be sent to your registered email address.",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-40 pb-16 bg-primary">
        <div className="container mx-auto px-6 text-center">
          <ScrollAnimationWrapper>
            <p className="text-accent text-xs tracking-[0.3em] uppercase font-body mb-3">Medical Representatives</p>
            <h1 className="text-4xl md:text-5xl font-serif text-primary-foreground mb-4">Medical Rep. Visit Booking</h1>
          </ScrollAnimationWrapper>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-3xl">
          <ScrollAnimationWrapper>
            <h2 className="text-2xl font-serif text-foreground mb-4">Medical Representative Online System Reservation</h2>
            <h3 className="text-lg font-body font-semibold text-foreground mb-6">Welcome to our Medical Representative Online Reservation System</h3>
            <div className="font-body text-sm text-muted-foreground leading-relaxed space-y-4">
              <p>This platform has been designed exclusively for medical representatives who need to schedule a visit with doctors at Royale Hayat Hospital. Please note that these appointments are not meant for medical consultations. It's important to keep in mind that an appointment visit will be valid based on the doctor's availability. Kindly approach the secretary or receptionist and present them with your booking confirmation. To ensure a smooth and efficient process, we kindly request that you comply with the hospital policy, which prohibits standing in front of the clinic doors. We greatly appreciate your cooperation in this matter.</p>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 bg-secondary/10">
        <div className="container mx-auto px-6 max-w-3xl">
          <ScrollAnimationWrapper>
            <h2 className="text-2xl font-serif text-foreground mb-8">To book an appointment visit, please follow these steps:</h2>
            <ol className="space-y-4">
              {steps.map((step, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-body text-sm font-bold">{i + 1}</span>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed pt-1">{step}</p>
                </li>
              ))}
            </ol>
          </ScrollAnimationWrapper>
        </div>
      </section>

      {/* General Links */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-3xl">
          <ScrollAnimationWrapper>
            <h2 className="text-2xl font-serif text-foreground mb-8">General Link</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/book-appointment">
                <Button size="lg" className="gap-2">
                  <CalendarCheck className="w-5 h-5" />
                  Book Now
                </Button>
              </Link>
              <Link to="/departments">
                <Button size="lg" variant="outline" className="gap-2">
                  <ListChecks className="w-5 h-5" />
                  List of Departments
                </Button>
              </Link>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>

      <Footer />
      <ChatButton />
      <ScrollToTop />
    </div>
  );
};

export default MedicalRepVisitBooking;
