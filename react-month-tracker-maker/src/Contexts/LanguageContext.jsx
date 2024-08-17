import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import languagesJson from '../Assets/languages.json';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import 'dayjs/locale/en';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = useState(() => {
    const saved = localStorage.getItem('languageSettings');
    return saved ? JSON.parse(saved) : 'en'; // Initialize as string
  });
  const [calendarKey, setCalendarKey] = useState(0);

  // Memoize the languagesJson to ensure reference stability
  const memoizedLanguagesJson = useMemo(() => languagesJson, []);

  const translate = (key) => memoizedLanguagesJson[key][locale] || key;

  useEffect(() => {
    localStorage.setItem('languageSettings', JSON.stringify(locale));
  }, [locale]); 

  const updateLocale = (newLocale) => {
    dayjs.locale(newLocale);
    setLocale(newLocale);
    setCalendarKey(prevKey => prevKey + 1); 
  };

  return (
    <LanguageContext.Provider value={{ calendarKey, locale, translate, updateLocale }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
