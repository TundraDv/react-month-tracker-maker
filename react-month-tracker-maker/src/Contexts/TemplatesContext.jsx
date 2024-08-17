import React, { createContext, useContext, useState } from 'react';
import templates from '../Assets/Templates/templates.json'; 

const TemplatesContext = createContext();

export const TemplatesProvider = ({ children }) => {
  const [templatesData, setTemplatesData] = useState(templates);

  const [templatesId, setTemplatesId] = useState(2);

  const [templatesIdData, setTemplatesIdData] = useState(templatesId[templatesId]);

  const updateTemplatesId = (id) => {
    setTemplatesId(id)
  }

  return (
    <TemplatesContext.Provider value={{ templatesIdData, updateTemplatesId, templatesData, setTemplatesData }}>
      {children}
    </TemplatesContext.Provider>
  );
};

export const useTemplates = () => useContext(TemplatesContext);
