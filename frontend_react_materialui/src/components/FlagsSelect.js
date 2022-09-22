// REACT
import * as React from "react";

// REACT FLAGS SELECT
import ReactFlagsSelect from "react-flags-select";

// REACT-I18NEXT
import { useTranslation } from "react-i18next";

// CONTEXT
import { i18nContext } from "../context/I18nContext";

// ------------------------------------------------------------

export default function FlagsSelect() {
  // ### CONTEXT
  const { selectedCountryFlag, setSelectedCountryFlag } =
    React.useContext(i18nContext);

  // ### HOOKS
  const { i18n } = useTranslation();

  return (
    <ReactFlagsSelect
      fullWidth={false}
      countries={["GB", "LT"]}
      selected={selectedCountryFlag}
      onSelect={(code) => {
        i18n.changeLanguage(code);
        setSelectedCountryFlag(code);
      }}
    />
  );
}
