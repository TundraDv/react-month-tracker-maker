import React, { createContext, useState, useContext, useEffect } from 'react';
import dayjs from 'dayjs';

const ComponentsContext = createContext();

export const ComponentsProvider = ({ children }) => {
  const [titleTextContext, setTitleTextContext] = useState(() => {
    const saved = localStorage.getItem('titleTextContext');
    return saved ? JSON.parse(saved) : "Step Tracker";
  });
  
  const [titleContext, setTitle] = useState(() => {
    const saved = localStorage.getItem('titleContext');
    return saved ? JSON.parse(saved) : true;
  });

  const [yearContext, setYearContext] = useState(() => {
    const saved = localStorage.getItem('yearContext');
    return saved ? JSON.parse(saved) : true;
  });

  const [daysNameContext, setDaysNameContext] = useState(() => {
    const saved = localStorage.getItem('daysNameContext');
    return saved ? JSON.parse(saved) : true;
  });

  const [monthContext, setMonthContext] = useState(() => {
    const saved = localStorage.getItem('monthContext');
    return saved ? JSON.parse(saved) : true;
  });

  const [dateValueContext, setDateValueContext] = useState(() => {
    const saved = localStorage.getItem('dateValueContext');
    return saved ? dayjs(JSON.parse(saved)) : dayjs();
  });

  const [firstDayContext, setFirstDayContext] = useState(() => {
    const saved = localStorage.getItem('firstDayContext');
    return saved ? JSON.parse(saved) : 0;
  });

  const [heightContext, setHeightContext] = useState(() => {
    const saved = localStorage.getItem('heightContext');
    return saved ? JSON.parse(saved) : 660;
  });

  useEffect(() => {
    localStorage.setItem('titleTextContext', JSON.stringify(titleTextContext));
    localStorage.setItem('titleContext', JSON.stringify(titleContext));
    localStorage.setItem('yearContext', JSON.stringify(yearContext));
    localStorage.setItem('daysNameContext', JSON.stringify(daysNameContext));
    localStorage.setItem('monthContext', JSON.stringify(monthContext));
    localStorage.setItem('dateValueContext', JSON.stringify(dateValueContext.format()));
    localStorage.setItem('firstDayContext', JSON.stringify(firstDayContext));
    localStorage.setItem('heightContext', JSON.stringify(heightContext));
  }, [
    titleTextContext,
    titleContext,
    yearContext,
    daysNameContext,
    monthContext,
    dateValueContext,
    firstDayContext,
    heightContext
  ]);

  const updateTitleTextContext = (value) => {
    setTitleTextContext(value);
  };

  const updateTitleContext = (value) => {
    setTitle(value);
  };

  const updateYearContext = (value) => {
    setYearContext(value);
  };

  const updateDaysNameContext = (value) => {
    setDaysNameContext(value);
  };

  const updateMonthContext = (value) => {
    setMonthContext(value);
  };

  const updateDateValueContext = (value) => {
    setDateValueContext(value);
  };

  const updateFirstDayContext = (value) => {
    setFirstDayContext(value);
  };

  const updateHeightContext = (value) => {
    setHeightContext(value);
  };

  return (
    <ComponentsContext.Provider value={{ 
      daysNameContext,
      dateValueContext,
      monthContext,
      titleTextContext, 
      titleContext, 
      yearContext,
      firstDayContext,
      heightContext,
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
