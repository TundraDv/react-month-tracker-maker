import React, { createContext, useState, useContext, useEffect } from 'react';
import dayjs from 'dayjs';
import { useTemplates } from './TemplatesContext';

const ComponentsContext = createContext();

export const ComponentsProvider = ({ children }) => {
  const { templatesIdData } = useTemplates();

  const [componentsSettings, setComponentsSettings] = useState(() => {
    const saved = localStorage.getItem('componentsSettings');
    const parsedSettings = saved ? JSON.parse(saved) : {
      pickerTab: 0,
      titleTextContext: "Step Tracker",
      titleContext: true,
      yearContext: true,
      daysNameContext: true,
      monthContext: true,
      dateValueContext: dayjs(),
      firstDayContext: 0,
      heightContext: 660
    };
    // Convert dateValueContext back to dayjs object
    return {
      ...parsedSettings,
      dateValueContext: dayjs(parsedSettings.dateValueContext)
    };
  });

  useEffect(() => {
    localStorage.setItem('componentsSettings', JSON.stringify({
      ...componentsSettings,
      dateValueContext: componentsSettings.dateValueContext.format()  // Convert dayjs object to string
    }));
  }, [componentsSettings]);

  const updatePickerTab = (value) => {
    setComponentsSettings(prev => ({ ...prev, pickerTab: value }));
  };

  const updateTitleTextContext = (value) => {
    setComponentsSettings(prev => ({ ...prev, titleTextContext: value }));
  };

  const updateTitleContext = (value) => {
    setComponentsSettings(prev => ({ ...prev, titleContext: value }));
  };

  const updateYearContext = (value) => {
    setComponentsSettings(prev => ({ ...prev, yearContext: value }));
  };

  const updateDaysNameContext = (value) => {
    setComponentsSettings(prev => ({ ...prev, daysNameContext: value }));
  };

  const updateMonthContext = (value) => {
    setComponentsSettings(prev => ({ ...prev, monthContext: value }));
  };

  const updateDateValueContext = (value) => {
    setComponentsSettings(prev => ({ ...prev, dateValueContext: value }));
  };

  const updateFirstDayContext = (value) => {
    setComponentsSettings(prev => ({ ...prev, firstDayContext: value }));
  };

  const updateHeightContext = (value) => {
    setComponentsSettings(prev => ({ ...prev, heightContext: value }));
  };

  return (
    <ComponentsContext.Provider value={{ 
      ...componentsSettings,
      updatePickerTab,
      updateHeightContext,
      updateDaysNameContext,
      updateTitleTextContext,
      updateTitleContext,
      updateYearContext,
      updateMonthContext,
      updateDateValueContext,
      updateFirstDayContext
    }}>
      {children}
    </ComponentsContext.Provider>
  );
};

export const useComponentsContext = () => useContext(ComponentsContext);
