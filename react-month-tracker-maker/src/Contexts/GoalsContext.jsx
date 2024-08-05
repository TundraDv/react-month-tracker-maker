import React, { createContext, useState, useContext } from 'react';

const GoalsContext = createContext();

export const GoalsProvider = ({ children }) => {
  const [columns, setColumns] = useState(2);
  const [rows, setRows] = useState(2);
  const [textfields, setTextfields] = useState([]);
  const [emojis, setEmojis] = useState([]);

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

  return (
    <GoalsContext.Provider value={{ columns, rows, textfields, emojis, updateColumns, updateRows, updateTextfields, updateEmojis }}>
      {children}
    </GoalsContext.Provider>
  );
};

export const useGoalsContext = () => useContext(GoalsContext);