import portuguese from './portuguese.ts'
import english from './english.ts'
import spanish from "./spanish.ts"

const langs = {
  pt: portuguese,
  en: english,
  es: spanish,
}

const currentLanguage: 'pt' | 'en' | 'es' = 'pt'

export default langs[currentLanguage]