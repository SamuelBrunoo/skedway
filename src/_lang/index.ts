import portuguese from "./portuguese.ts"
import english from "./english.ts"
import spanish from "./spanish.ts"

const langs = {
  pt: portuguese,
  en: english,
  es: spanish,
}

const getLang = () => {
  const navLanguage = window.navigator.language

  if (/en/.test(navLanguage)) return "en"
  else if (/pt/.test(navLanguage)) return "pt"
  else if (/es/.test(navLanguage)) return "es"

  return "en"
}

const currentLanguage: "pt" | "en" | "es" = getLang()

export default langs[currentLanguage]
