

# Royale Hayat Prototype – Final Modifications Plan

## Summary
Apply structural, flow, translation, and UX fixes across the existing prototype without changing colors, fonts, or visual design.

---

## Changes Grouped by Area

### 1. HOME SCREEN – Replace Symptom Section with Book Appointment Block
**File:** `src/pages/Index.tsx`, `src/components/IntelligentBooking.tsx`

- Remove `<IntelligentBooking />` from the homepage
- Create a new `HomeBookingBlock` component that replicates the uploaded screenshot layout: 3 clickable cards side-by-side ("Select Department", "I Know My Doctor", "Not Sure?")
- Each card routes to `/book-appointment` with a query param to auto-select the path (`?path=primary`, `?path=doctor`, `?path=symptoms`)
- `BookAppointment.tsx` reads the query param on mount to auto-set `bookingPath`

### 2. BOOK APPOINTMENT – Registered Patient Step (Before Patient Info)
**File:** `src/pages/BookAppointment.tsx`

- The "Registered patient / First-time user" check already exists at Step 2 in the booking flow
- Ensure it appears in ALL flows (primary, doctor, symptoms) — currently it does
- **Registered → redirect to `afyati.royalehayat.com`** (not login form)
- **First-time → continue to patient info form**
- Remove the existing "returning patient login" form; replace with redirect to Afiyati portal
- This step must also appear in the "I Know My Doctor" flow after selecting a doctor

### 3. BOOK APPOINTMENT – "I Know My Doctor" Flow Fix
**File:** `src/pages/BookAppointment.tsx`

- Current flow: Select Doctor → Patient Info (Step 2 with registered check)
- Ensure the registered/first-time step is NOT skippable in this path

### 4. BOOK APPOINTMENT – AI Analysis Structured Output
**File:** `src/pages/BookAppointment.tsx`

- After symptom analysis, display results in 3 clearly separated sections:
  - **Possible Issues** (condition hints)
  - **Suggested Departments**
  - **Suggested Doctors** (from matched departments)
- Add AI disclaimer text
- Only shown after user clicks "Analyze"

### 5. DOCTOR AVAILABILITY – Profile & Listing Cards
**Files:** `src/data/doctors.ts`, `src/pages/DoctorProfile.tsx`, `src/pages/Doctors.tsx`, `src/components/DoctorsSection.tsx`

- Add `availableOnline: boolean` field to the Doctor interface
- Mark at least 2 doctors per department as NOT available for online consultation
- Show availability badge on doctor listing cards and profile pages
- If NOT available: show message "Not available for online consultation" and hide/disable booking button for online

### 6. DOCTOR PROFILE – Simplified Booking Flow
**File:** `src/pages/DoctorProfile.tsx`

- Remove Department selection step (doctor is already known)
- Remove Date of Birth field (not currently present, confirm)
- Booking from profile goes directly to registered/first-time check, then patient info

### 7. DOCTOR & DEPARTMENT DISPLAY LIMITS
**File:** `src/pages/BookAppointment.tsx`

- Show only 6 departments initially with "View All" button (currently shows all 30)
- Show only 6 doctors initially with "View All" (already implemented for doctor path)
- Add search for departments (already exists)

### 8. NAVIGATION SPACING FIX
**Files:** `src/pages/BookAppointment.tsx`, `src/pages/Index.tsx`, and other pages

- Reduce `pt-[var(--header-height)]` gap — content starts closer to navbar
- Remove duplicate padding (e.g., BookAppointment has double `pt-[var(--header-height)]`)

### 9. DOCTOR CAROUSEL – Smooth Transitions
**File:** `src/components/DoctorsSection.tsx`

- Change `AnimatePresence mode="popLayout"` to `mode="wait"` or use CSS transitions
- Use smoother `transition` values (ease-in-out, longer duration)
- Remove abrupt x-axis entrance/exit animations; use opacity-only fades

### 10. CONTACT US – Remove Dropdown, Direct Page Only
**File:** `src/components/Header.tsx`

- Remove `hasDropdown: "contact"` from Contact Us nav item
- Make it a direct link to `/contact-us` with no dropdown

### 11. WORK WITH US – Remove "Notice to Public" from Dropdown
**File:** `src/components/Header.tsx`

- Remove the "Notice to Public" item from `workWithUsSubLinks`
- Keep only "Open Positions" and "Work Culture"

### 12. ARABIC DROPDOWN POSITIONING FIX
**File:** `src/components/Header.tsx`

- Change dropdown positioning from `left-1/2 -translate-x-1/2` to use `right-0` or dynamic positioning
- Ensure dropdowns stay within viewport bounds, especially for rightmost items in RTL mode
- Add `max-h` with overflow scroll and ensure visibility

### 13. ARABIC TRANSLATION – Complete Coverage
**Files:** `src/contexts/LanguageContext.tsx`, various component files

- Audit all remaining English strings across all pages
- Add missing Arabic translations for:
  - BookAppointment: "Registered patient", "First-time user", all step labels
  - Doctor availability labels
  - All button text, labels, and small text across pages
  - Patients & Visitors, Work With Us, Open Positions pages

### 14. CHATBOT & SCROLL-TO-TOP – Arabic Positioning
**Files:** `src/components/ChatButton.tsx`, `src/components/ScrollToTop.tsx`

- ScrollToTop already handles Arabic positioning (left-6 in Arabic mode) ✓
- Verify ChatButton also switches to left side in Arabic mode

### 15. REDIRECT FIX – afiyati.com → afyati.royalehayat.com
**Files:** `src/components/IntelligentBooking.tsx`, `src/pages/BookAppointment.tsx`

- Replace `https://afiyati.com` with `https://afyati.royalehayat.com` in IntelligentBooking.tsx (line 375)
- Verify DoctorProfile.tsx already uses correct URL (it does: line 89)

### 16. PAGE LAYOUT – Remove Empty Spaces
**Files:** Various page files

- Audit all pages for excessive left/right padding or empty gaps
- Ensure containers use `max-w-7xl` or wider where content is sparse
- Balance media + content layouts in hospitality/luxury sections

---

## Technical Notes

- **No design changes**: All modifications preserve existing colors, fonts, spacing style
- **Doctor data**: Add `availableOnline` boolean to Doctor interface; set ~30% of doctors to `false`
- **Routing**: BookAppointment reads `?path=` query param from URL for homepage integration
- **Registered patient flow**: Replace current login form with simple redirect to Afiyati portal
- **Files touched**: ~12-15 files total

