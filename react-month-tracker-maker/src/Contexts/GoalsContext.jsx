import React, { createContext, useState, useContext, useEffect } from 'react';
import { useTemplates } from './TemplatesContext';
const GoalsContext = createContext();

export const GoalsProvider = ({ children }) => {
  const { templatesIdData } = useTemplates();

  const [goalsSettings, setGoalsSettings] = useState(() => {
    const saved = localStorage.getItem('goalsSettings');
    return saved ? JSON.parse(saved) : {
      columns: 3,
      rows: 3,
      textfields: Array(24).fill(null).map((_, index) => `${index + 1}K Steps`),
      emojis: Array(24).fill('❤️'),
      fillingEmojis: Array(24).fill(''),
      emojiSize: 15
    };
  });

  useEffect(() => {
    localStorage.setItem('goalsSettings', JSON.stringify(goalsSettings));
  }, [goalsSettings]);

  const updateColumns = (columns) => {
    setGoalsSettings(prev => ({ ...prev, columns }));
  };

  const updateRows = (rows) => {
    setGoalsSettings(prev => ({ ...prev, rows }));
  };

  const updateTextfields = (textfields) => {
    setGoalsSettings(prev => ({ ...prev, textfields }));
  };

  const updateEmojis = (emojis) => {
    setGoalsSettings(prev => ({ ...prev, emojis }));
  };

  const updateFillingEmojis = (fillingEmojis) => {
    setGoalsSettings(prev => ({ ...prev, fillingEmojis }));
  };

  const updateEmojiSize = (emojiSize) => {
    setGoalsSettings(prev => ({ ...prev, emojiSize }));
  };

  return (
    <GoalsContext.Provider value={{ 
      updateColumns, 
      updateRows, 
      updateTextfields, 
      updateEmojis, 
      updateFillingEmojis, 
      updateEmojiSize,
      ...goalsSettings 
    }}>
      {children}
    </GoalsContext.Provider>
  );
};

export const useGoalsContext = () => useContext(GoalsContext);
