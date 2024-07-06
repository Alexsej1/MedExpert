import React, { createContext, useContext, useState } from "react";

const AnswersContext = createContext();

export const useAnswers = () => useContext(AnswersContext);

export const AnswersProvider = ({ children }) => {
  const [answers, setAnswers] = useState({});

  const handleOptionChange = (questionName, value) => {
    setAnswers({ ...answers, [questionName]: value });
  };

  return (
    <AnswersContext.Provider value={{ answers, handleOptionChange }}>
      {children}
    </AnswersContext.Provider>
  );
};
