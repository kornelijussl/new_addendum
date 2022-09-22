import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      GB: {
        translation: {
          AppointmentForm: {
            createAppointmentText: "Register New Appointment",
            patientName: "Patient Name",
            patientSurname: "Patient Surname",
            submitButtonText: "Register",
            successText: "Appointment Created!",
          },
        },
      },
      LT: {
        translation: {
          AppointmentForm: {
            createAppointmentText: "Registruoti Naują Rezervaciją",
            patientName: "Paciento Vardas",
            patientSurname: "Paciento Pavardė",
            submitButtonText: "Registruoti",
            successText: "Rezervacija Sėkminga!",
          },
        },
      },
    },
  });

export default i18n;
