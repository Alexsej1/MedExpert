import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SurveyQuestion = ({ question, name, selectedOption, onOptionChange }) => {
  const options = [
    { value: "Yes", label: "Да" },
    { value: "No", label: "Нет" },
    { value: "Unknown", label: "Не знаю" },
  ];

  return (
    <Card className="w-[70rem] border-2 border-b-4 my-4 border-gray-200 rounded-xl hover:bg-gray-50">
      <div className="grid grid-cols-6 p-5 gap-y-2">
        <div className="col-span-5 md:col-span-4 ml-4">
          <CardHeader>
            <CardTitle className="text-primary font-bold">{question}</CardTitle>
          </CardHeader>
        </div>

        <div className="flex items-center ml-4 col-span-5 md:col-span-2">
          <RadioGroup onValueChange={onOptionChange} className="flex space-x-4">
            {options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={option.value}
                  id={option.value}
                  name={name}
                />
                <Label
                  htmlFor={option.value}
                  className="block cursor-pointer select-none rounded-xl p-2 text-center text-2xl peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
    </Card>
  );
};

export default SurveyQuestion;
