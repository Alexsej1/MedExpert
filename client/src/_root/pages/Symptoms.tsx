import MuiAutocomplete from "@/components/MuiAutocomplete";
import "../../../src/globals.css";
import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import Bayes from "@/components/Bayes";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { useSymptomContext } from "@/components/SymptomProvider";

const Symptoms = () => {
  const { selectedSymptoms, setSelectedSymptoms } = useSymptomContext();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [showDiagnoses, setShowDiagnoses] = useState(false);
  const handleDiagnose = () => {
    setShowDiagnoses(true);
  };

  useEffect(() => {
    if (selectedSymptoms.length < 3) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [selectedSymptoms]);

  const handleSymptomsChange = (symptoms) => {
    setSelectedSymptoms(symptoms);
  };

  return (
    <section className="text-gray-600 body-font flex flex-col items-center justify-center">
      <div className="max-w-5xl pt-2 pb-2 mx-auto">
        <h1 className="text-8xl text-center font-bold text-primary mb-6">
          Введите ваши симптомы
        </h1>
        <h2 className="text-2xl font-semibold pb-11 text-gray-700 text-center">
          Для того, чтобы поставить вам диагноз, нам необходимо знать ваши
          симптомы
        </h2>
      </div>

      <MuiAutocomplete onSymptomsChange={handleSymptomsChange} />
      {selectedSymptoms.length < 3 && (
        <Typography
          variant="body2"
          gutterBottom
          align="center"
          className="text-red-500"
        >
          Введите минимум 3 симптома
        </Typography>
      )}

      <Button
        className="border  mt-5 py-3 px-7 rounded-lg border-primary bg-white text-primary mr-2 hover:bg-primary hover:text-white transition duration-300 ease-in-out"
        disabled={buttonDisabled}
        onClick={handleDiagnose}
      >
        Продолжить
      </Button>
      {showDiagnoses && <Bayes selectedSymptoms={selectedSymptoms} />}
    </section>
  );
};

export default Symptoms;
