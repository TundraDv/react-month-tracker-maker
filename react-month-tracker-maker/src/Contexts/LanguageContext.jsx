import React, { createContext, useContext, useState } from 'react';
import languagesJson from '../Assets/languages.json';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import 'dayjs/locale/en';


const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = useState('en'); 
  const [calendarKey, setCalendarKey] = useState(0);

  const translate = (key) => languagesJson[key][locale];

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
