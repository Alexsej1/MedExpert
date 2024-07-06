import React from "react";

const DynamicAprior = (age, gender, priorProbabilities, answers) => {
  const updatePriorProbabilities = (
    age,
    gender,
    priorProbabilities,
    answers
  ) => {
    const updatedProbabilities = { ...priorProbabilities };

    if (age > 60) {
      updatedProbabilities["Пневмония"] *= 1.1;
      updatedProbabilities["Грипп"] *= 1.2;
      updatedProbabilities["Конъюнктивит"] *= 1.05;
    }

    if (age > 5 && age < 25) {
      updatedProbabilities["Ангина"] *= 1.1;
    }

    if (gender === "М") {
      updatedProbabilities["Ангина"] *= 1.05;
      updatedProbabilities["Отравление"] *= 1.05;
    }

    if (answers["immuneSystem"] === "Yes") {
      updatedProbabilities["Пневмония"] *= 1.1;
      updatedProbabilities["Грипп"] *= 1.1;
      updatedProbabilities["Конъюнктивит"] *= 1.1;
      updatedProbabilities["Ангина"] *= 1.1;
    }

    return updatedProbabilities;
  };

  const updatedProbabilities = updatePriorProbabilities(
    age,
    gender,
    priorProbabilities,
    answers
  );

  return updatedProbabilities;
};

export default DynamicAprior;
