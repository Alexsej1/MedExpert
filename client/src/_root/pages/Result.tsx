import React, { useEffect, useState } from "react";
import { useSymptomContext } from "@/components/SymptomProvider";
import { useFetch } from "../../components/hooks/useFetch";
import { useUser } from "@/components/UserContext";
import { useLocation } from "react-router-dom";
import DiagnosisInfo from "@/components/DiagnosisInfo";
import Maps from "@/components/Maps";
import "../../globals.css";

const Result = () => {
  const { user } = useUser();
  const { selectedSymptoms } = useSymptomContext();

  const location = useLocation();
  const diagnosisResults = location.state && location.state.diagnosisResults;

  const { data: DiagnoseMedicine, loading: medicineLoading } = useFetch(
    "http://localhost:5000/DiagnoseMedicine"
  );

  const { data: Diagnoses, loading: diagnosesLoading } = useFetch(
    "http://localhost:5000/Diagnoses"
  );

  const topDiagnoses = diagnosisResults
    ? diagnosisResults.sort((a, b) => b.percentage - a.percentage).slice(0, 3)
    : [];

  const getMedicinesForDiagnosis = (diagnosisName) => {
    return DiagnoseMedicine
      ? DiagnoseMedicine.filter(
          (item) => item.DiagnoseName === diagnosisName
        ).map((item) => item.MedicineName)
      : [];
  };

  const getDescription = (diagnosisName) => {
    if (Diagnoses) {
      const diagnose = Diagnoses.find(
        (item) => item.DiagnoseName === diagnosisName
      );
      return diagnose ? diagnose.DiagnoseDesc : "";
    }
    return "";
  };

  if (medicineLoading || diagnosesLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex justify-center">
      <div className="max-w-[80%]">
        <h1 className="text-7xl text-center font-bold text-primary mb-6 ">
          Ваш предполагаемый диагноз
        </h1>

        <div className="bg-lightblue  px-4">
          {topDiagnoses.map((diagnosis, index) => (
            <DiagnosisInfo
              key={index}
              name={diagnosis.diagnosis}
              percentage={diagnosis.percentage.toFixed(1)}
              description={getDescription(diagnosis.diagnosis)}
              medicines={getMedicinesForDiagnosis(diagnosis.diagnosis)}
            />
          ))}

          <div className="mx-auto max-w-6xl border-primary border-2 rounded-lg py-3 mb-4">
            <h2 className="text-4xl text-primary font-extrabold custom-margin-left mb-4 ">
              Куда обратиться
            </h2>
            <Maps />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
