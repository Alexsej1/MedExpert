import React, { createContext, useContext, useState } from "react";

const SymptomContext = createContext();

export const SymptomProvider = ({ children }) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  return (
    <SymptomContext.Provider value={{ selectedSymptoms, setSelectedSymptoms }}>
      {children}
    </SymptomContext.Provider>
  );
};

export const useSymptomContext = () => useContext(SymptomContext);
