import React, { createContext, useContext, useState, useMemo } from 'react';
import templates from '../Assets/Templates/templates.json'; 

const TemplatesContext = createContext();

export const TemplatesProvider = ({ children }) => {
  // Memoize the templates data to ensure reference stability
  const memoizedTemplates = useMemo(() => templates, []);

  const [templatesData, setTemplatesData] = useState(memoizedTemplates);
  const [templatesId, setTemplatesId] = useState(2);
  
  const [templatesIdData, setTemplatesIdData] = useState(memoizedTemplates[templatesId]);

  // Update templatesId and corresponding templatesIdData
  const updateTemplatesId = (id) => {
    setTemplatesId(id);
    setTemplatesIdData(memoizedTemplates[id]);
  };

  return (
    <TemplatesContext.Provider value={{ templatesIdData, updateTemplatesId, templatesData, setTemplatesData }}>
      {children}
    </TemplatesContext.Provider>
  );
};

export const useTemplates = () => useContext(TemplatesContext);
