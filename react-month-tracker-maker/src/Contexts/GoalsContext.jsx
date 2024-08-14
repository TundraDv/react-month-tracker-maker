import React, { createContext, useState, useContext, useEffect } from 'react';

const GoalsContext = createContext();

export const GoalsProvider = ({ children }) => {
  const [columns, setColumns] = useState(() => {
    const saved = localStorage.getItem('columns');
    return saved ? JSON.parse(saved) : 3;
  });

  const [rows, setRows] = useState(() => {
    const saved = localStorage.getItem('rows');
    return saved ? JSON.parse(saved) : 3;
  });

  const [textfields, setTextfields] = useState(() => {
    const saved = localStorage.getItem('textfields');
    return saved ? JSON.parse(saved) : Array(24).fill(null).map((_, index) => `${index+1}K Steps`);
  });
  
  const [emojis, setEmojis] = useState(() => {
    const saved = localStorage.getItem('emojis');
    return saved ? JSON.parse(saved) : Array(24).fill('❤️');
  });
  const [fillingEmojis, setFillingEmojis] = useState(() => {
    const saved = localStorage.getItem('fillingEmojis');
    return saved ? JSON.parse(saved) : Array(24).fill('');
  });
  const [emojiSize, setEmojiSize] = useState(() => {
    const saved = localStorage.getItem('emojiSize');
    return saved ? JSON.parse(saved) : 15;
  });

  
  useEffect(() => {
    localStorage.setItem('emojiSize', JSON.stringify(emojiSize));
    localStorage.setItem('columns', JSON.stringify(columns));
    localStorage.setItem('rows', JSON.stringify(rows));
    localStorage.setItem('textfields', JSON.stringify(textfields));
    localStorage.setItem('emojis', JSON.stringify(emojis));
    localStorage.setItem('fillingEmojis', JSON.stringify(fillingEmojis));
  }, [
    emojiSize,
    columns,
    rows,
    textfields,
    emojis,
    fillingEmojis,
  ]);

  const updateColumns = (columns) => {
    setColumns(columns);
  };
  const updateRows = (rows) => {
    setRows(rows);
  };
  const updateTextfields = (textfields) => {
    setTextfields(textfields);
  };
  const updateEmojis = (emojis) => {
    setEmojis(emojis);
  };
  const updateFillingEmojis = (fillingEmojis) => {
    setFillingEmojis(fillingEmojis);
  };
  const updateEmojiSize = (emojiSize) => {
    setEmojiSize(emojiSize);
  };

  return (
    <GoalsContext.Provider value={{ updateEmojiSize, emojiSize, updateFillingEmojis,fillingEmojis, columns, rows, textfields, emojis, updateColumns, updateRows, updateTextfields, updateEmojis }}>
      {children}
    </GoalsContext.Provider>
  );
};

export const useGoalsContext = () => useContext(GoalsContext);