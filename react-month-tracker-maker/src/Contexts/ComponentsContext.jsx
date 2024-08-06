import React, { createContext, useState, useContext } from 'react';
import dayjs from 'dayjs';

const ComponentsContext = createContext();

export const ComponentsProvider = ({ children }) => {
  const [titleTextContext, setTitleTextContext] = useState("Step Tracker");
  const [titleContext, setTitle] = useState(true);
  const [yearContext, setYearContext] = useState(true);
  const [daysNameContext, setdaysNameContext] = useState(true);
  const [monthContext, setMonthContext] = useState(true);
  const [dateValueContext, setDateValueContext] = useState(dayjs());
  const [firstDayContext, setFirstDayContext] = useState(0);
  const [heightContext, setHeightContext] = useState(70);

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
    setdaysNameContext(value);
  };
  const updateMonthContext = (value) => {
    setMonthContext(value);
  };
  const updateDateValueContext = (value) => {
    console.log(dateValueContext)
    setDateValueContext(value);
  };
  const updateFirstDayContext = (value) => {
    setFirstDayContext(value)
  }
  const updateHeightContext = (value) => {
    setHeightContext(value)
  }
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
      updateFirstDayContext }}>
      {children}
    </ComponentsContext.Provider>
  );
};

export const useComponentsContext = () => useContext(ComponentsContext);