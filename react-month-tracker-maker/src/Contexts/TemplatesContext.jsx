import React, { createContext, useContext, useState } from 'react';
import templates from '../Assets/Templates/templates.json'; 

const TemplatesContext = createContext();

export const TemplatesProvider = ({ children }) => {
  const [templatesData, setTemplatesData] = useState(templates);

  return (
    <TemplatesContext.Provider value={{ templatesData, setTemplatesData }}>
      {children}
    </TemplatesContext.Provider>
  );
};

export const useTemplates = () => useContext(TemplatesContext);
