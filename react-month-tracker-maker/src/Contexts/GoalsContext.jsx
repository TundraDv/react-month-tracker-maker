import React, { createContext, useState, useContext } from 'react';

const GoalsContext = createContext();

export const GoalsProvider = ({ children }) => {
  const [columns, setColumns] = useState(3);
  const [rows, setRows] = useState(4);
  const [textfields, setTextfields] = useState(Array(24).fill(null).map((_, index) => `${index+1}K Steps`));
  const [emojis, setEmojis] = useState(Array(24).fill('❤️'));

  const updateColumns = (columns) => {
    setColumns(columns);
  };
  const updateRows = (rows) => {
    setRows(rows);
  };
  const updateTextfields = (textfields) => {
    console.log(textfields)
    setTextfields(textfields);
  };
  const updateEmojis = (emojis) => {
    setEmojis(emojis);
  };

  return (
    <GoalsContext.Provider value={{ columns, rows, textfields, emojis, updateColumns, updateRows, updateTextfields, updateEmojis }}>
      {children}
    </GoalsContext.Provider>
  );
};

export const useGoalsContext = () => useContext(GoalsContext);