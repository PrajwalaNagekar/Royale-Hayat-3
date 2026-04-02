import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatButton from "@/components/ChatButton";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";
import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const MedicalRecordsRequest = () => {
  const { t } = useLanguage();
  const [dischargeSummaryDate, setDischargeSummaryDate] = useState<Date>();
  const [dob, setDob] = useState<Date>();
  const [specificDateChecked, setSpecificDateChecked] = useState(false);
  const [dischargeSummaryChecked, setDischargeSummaryChecked] = useState(false);
  const [purposeValue, setPurposeValue] = useState("");
  const [requestedBy, setRequestedBy] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [govIdFile, setGovIdFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!agreeTerms) {
      toast({ title: "Agreement Required", description: "Please agree to the terms before submitting.", variant: "destructive" });
      return;
    }
    toast({ title: "Form Submitted", description: "Your medical records request has been submitted successfully. We will contact you shortly." });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-40 pb-16 bg-primary">
        <div className="container mx-auto px-6 text-center">
          <ScrollAnimationWrapper>
            <p className="text-accent text-xs tracking-[0.3em] uppercase font-body mb-3">Patient Services</p>
            <h1 className="text-4xl md:text-5xl font-serif text-primary-foreground mb-4">Medical Records Request Form</h1>
          </ScrollAnimationWrapper>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <ScrollAnimationWrapper>
            <h2 className="text-xl font-serif text-foreground mb-4">Authorization for the Disclosure of Patient Health Information via Email Upon Patient Request</h2>
            <div className="p-5 rounded-xl bg-destructive/10 border border-destructive/20 mb-8">
              <h3 className="font-body text-sm font-bold text-destructive mb-2">Disclaimer</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">By choosing to receive the Patient Health Information electronically, I accept full responsibility for the security of the email address provided and the device(s) used to receive and store the data. I understand and assume all inherent risks of this electronic transfer, including unauthorized access, accidental forwarding to unintended recipients, and the dangers of unsecured storage once the information is delivered.</p>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>

      {/* Form */}
      <section className="pb-20">
        <div className="container mx-auto px-6 max-w-3xl">
          <form onSubmit={handleSubmit} className="space-y-12">

            {/* Section 1 */}
            <ScrollAnimationWrapper>
              <div className="space-y-6">
                <h3 className="text-lg font-serif text-foreground border-b border-border pb-3">1. Patient Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name <span className="text-destructive">*</span></Label>
                    <Input id="fullName" required placeholder="Enter your full name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="civilId">Civil ID (Civil ID Number) <span className="text-destructive">*</span></Label>
                    <Input id="civilId" required placeholder="Enter Civil ID number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="govId">Passport / Valid Government ID <span className="text-destructive">*</span></Label>
                    <div className="flex items-center gap-3">
                      <Input
                        id="govId"
                        type="file"
                        accept=".png,.jpg,.jpeg,.pdf"
                        required
                        onChange={(e) => setGovIdFile(e.target.files?.[0] || null)}
                        className="text-sm"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Accepted formats: PNG, JPG, PDF</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fileNo">Patient File No. (URN) <span className="text-destructive">*</span></Label>
                    <Input id="fileNo" required placeholder="Enter patient file number" />
                  </div>
                  <div className="space-y-2">
                    <Label>Date of Birth <span className="text-destructive">*</span></Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !dob && "text-muted-foreground")}>
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dob ? format(dob, "PPP") : "Select date of birth"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={dob} onSelect={setDob} disabled={(date) => date > new Date()} initialFocus className={cn("p-3 pointer-events-auto")} />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            </ScrollAnimationWrapper>

            {/* Section 2 */}
            <ScrollAnimationWrapper>
              <div className="space-y-4">
                <h3 className="text-lg font-serif text-foreground border-b border-border pb-3">2. Authorization and Information to be Disclosed</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">I authorize the undersigned to voluntarily authorize Royale Hayat Hospital to send the health information described below to the recipient listed in Section 4, using unencrypted or encrypted email.</p>
              </div>
            </ScrollAnimationWrapper>

            {/* Section 3 */}
            <ScrollAnimationWrapper>
              <div className="space-y-4">
                <h3 className="text-lg font-serif text-foreground border-b border-border pb-3">3. Please select the specific information you are authorizing for release</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Checkbox id="dischargeSummary" checked={dischargeSummaryChecked} onCheckedChange={(c) => setDischargeSummaryChecked(c === true)} />
                    <Label htmlFor="dischargeSummary" className="font-normal cursor-pointer">Discharge Summary</Label>
                  </div>
                  <div className="flex items-start gap-3">
                    <Checkbox id="dischargeSummaryDate" checked={specificDateChecked} onCheckedChange={(c) => setSpecificDateChecked(c === true)} />
                    <div className="space-y-2 flex-1">
                      <Label htmlFor="dischargeSummaryDate" className="font-normal cursor-pointer">Discharge Summary with a specific date of service</Label>
                      {specificDateChecked && (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" size="sm" className={cn("w-full sm:w-auto justify-start text-left font-normal", !dischargeSummaryDate && "text-muted-foreground")}>
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {dischargeSummaryDate ? format(dischargeSummaryDate, "PPP") : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar mode="single" selected={dischargeSummaryDate} onSelect={setDischargeSummaryDate} initialFocus className={cn("p-3 pointer-events-auto")} />
                          </PopoverContent>
                        </Popover>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimationWrapper>

            {/* Section 4 */}
            <ScrollAnimationWrapper>
              <div className="space-y-6">
                <h3 className="text-lg font-serif text-foreground border-b border-border pb-3">4. Recipient Information and Purpose</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="recipientName">Recipient Name <span className="text-destructive">*</span></Label>
                    <Input id="recipientName" required placeholder="Enter recipient name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="recipientEmail">Recipient's Email Address <span className="text-destructive">*</span></Label>
                    <Input id="recipientEmail" type="email" required placeholder="Enter recipient email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="recipientPhone">Recipient's Contact Number <span className="text-destructive">*</span></Label>
                    <Input id="recipientPhone" type="tel" required placeholder="Enter contact number" />
                  </div>
                </div>
                <div className="space-y-3">
                  <Label>Purpose of Disclosure <span className="text-destructive">*</span></Label>
                  <p className="text-xs text-muted-foreground">(e.g., Continuing Care – Insurance Filing – other)</p>
                  <RadioGroup value={purposeValue} onValueChange={setPurposeValue} className="space-y-2">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="continuing-care" id="continuingCare" />
                      <Label htmlFor="continuingCare" className="font-normal cursor-pointer">Continuing Care</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="insurance-filing" id="insuranceFiling" />
                      <Label htmlFor="insuranceFiling" className="font-normal cursor-pointer">Insurance Filing</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="others" id="others" />
                      <Label htmlFor="others" className="font-normal cursor-pointer">Others</Label>
                    </div>
                  </RadioGroup>
                  {purposeValue === "others" && (
                    <Textarea placeholder="Please specify the purpose..." className="mt-2" />
                  )}
                </div>
              </div>
            </ScrollAnimationWrapper>

            {/* Section 5 */}
            <ScrollAnimationWrapper>
              <div className="space-y-6">
                <h3 className="text-lg font-serif text-foreground border-b border-border pb-3">5. Electronic Signature Agreement</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">By checking the box below and clicking "Submit," I certify that I have read and understand this authorization, and I authorize the electronic disclosure of my health information as described above. My electronic signature is the legal equivalent of a manual signature.</p>
                <div className="flex items-start gap-3 p-4 border border-border rounded-lg bg-secondary/5">
                  <Checkbox id="agreeTerms" checked={agreeTerms} onCheckedChange={(c) => setAgreeTerms(c === true)} />
                  <Label htmlFor="agreeTerms" className="font-normal cursor-pointer text-sm leading-relaxed">I have read, understand, and agree to the terms of this Electronic Authorization.</Label>
                </div>

                <div className="space-y-4">
                  <Label>Requested by: <span className="text-destructive">*</span></Label>
                  <RadioGroup value={requestedBy} onValueChange={setRequestedBy} className="flex gap-6">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="patient" id="reqPatient" />
                      <Label htmlFor="reqPatient" className="font-normal cursor-pointer">Patient</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="legal-representative" id="reqLegal" />
                      <Label htmlFor="reqLegal" className="font-normal cursor-pointer">Legal Representative</Label>
                    </div>
                  </RadioGroup>
                </div>

                {requestedBy === "patient" && (
                  <div className="space-y-2">
                    <Label htmlFor="eSignature">Patient Full Name (E-Signature) <span className="text-destructive">*</span></Label>
                    <Input id="eSignature" required placeholder="Type your full name as electronic signature" className="font-serif italic" />
                  </div>
                )}
              </div>
            </ScrollAnimationWrapper>

            <ScrollAnimationWrapper>
              <div className="space-y-4">
                <p className="font-body text-xs text-muted-foreground">The fields marked with a red asterisk (<span className="text-destructive">*</span>) are mandatory to be filled out.</p>
                <Button type="submit" size="lg" className="w-full sm:w-auto">Submit</Button>
              </div>
            </ScrollAnimationWrapper>

          </form>
        </div>
      </section>

      <Footer />
      <ChatButton />
      <ScrollToTop />
    </div>
  );
};

export default MedicalRecordsRequest;
