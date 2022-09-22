import * as React from "react";

import { useTranslation } from "react-i18next";
export const i18nContext = React.createContext();

export default function I18nContextProvider({ children }) {
  const [selectedCountryFlag, setSelectedCountryFlag] = React.useState("GB");

  const { i18n } = useTranslation();

  React.useEffect(() => {
    setSelectedCountryFlag(i18n.language);
  }, [i18n.language]);

  return (
    <i18nContext.Provider
      value={{ selectedCountryFlag, setSelectedCountryFlag }}
    >
      {children}
    </i18nContext.Provider>
  );
}
