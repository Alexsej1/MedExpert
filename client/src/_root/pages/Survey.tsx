import React from "react";
import { Button } from "@/components/ui/button";
import SurveyQuestion from "@/components/SurveyQuestion";
import { useAnswers } from "@/components/AnswersContext";
import { useNavigate } from "react-router-dom";

const Survey = ({ setIsSurveyCompleted }) => {
  // Принимаем setIsSurveyCompleted как проп
  const { answers, handleOptionChange } = useAnswers();
  const navigate = useNavigate();

  const questions = [
    { question: "У меня снижена иммунная система", name: "immuneSystem" },
    { question: "Я имею избыточный вес", name: "overweight" },
    { question: "Я курю сигареты", name: "smoking" },
    { question: "Я имею проблемы с пищеварением", name: "digestiveProblems" },
    { question: "У меня гипертония", name: "hypertension" },
  ];

  const handleSubmit = () => {
    console.log("Ответы:", answers);
    setIsSurveyCompleted(true); // Устанавливаем переменную состояния isSurveyCompleted в true
    navigate("/Symptoms");
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className="text-8xl text-center font-bold text-primary mb-3">
        Опрос
      </h1>
      <h2 className="text-2xl font-semibold pb-4 text-gray-700 text-center mx-auto max-w-5xl">
        Пройдите небольшой опрос
      </h2>
      {questions.map((question, index) => (
        <SurveyQuestion
          key={index}
          question={question.question}
          name={question.name}
          selectedOption={answers[question.name] || ""}
          onOptionChange={(value) => handleOptionChange(question.name, value)}
        />
      ))}
      <Button onClick={handleSubmit}>Продолжить</Button>
    </div>
  );
};

export default Survey;
