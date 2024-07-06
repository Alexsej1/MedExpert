import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { useFetch } from "../components/hooks/useFetch";
import { useUser } from "./UserContext";
import { useAnswers } from "./AnswersContext";
import DynamicAprior from "./DynamicAprior";
import { useNavigate } from "react-router-dom";

const Bayes = ({ selectedSymptoms }) => {
  const { data: Symptoms } = useFetch("http://localhost:5000/Symptoms");
  const { data: Diagnoses } = useFetch("http://localhost:5000/Diagnoses");
  const { data: DiagnoseSymptom } = useFetch(
    "http://localhost:5000/DiagnoseSymptom"
  );

  const { user } = useUser();
  const { answers } = useAnswers();
  const [loading, setLoading] = useState(true);
  const [symptomsNames, setSymptomsNames] = useState([]);
  const [priorProbabilities, setPriorProbabilities] = useState({});
  const [symptomLikelihoods, setSymptomLikelihoods] = useState({});
  const [diagnosisResults, setDiagnosisResults] = useState([]);
  const [minThreshold, setMinThreshold] = useState(80);
  const navigate = useNavigate();

  console.log(answers);

  useEffect(() => {
    if (Symptoms && Diagnoses && DiagnoseSymptom) {
      setSymptomsNames(Symptoms.map((item) => item.SymptomsName));

      const probabilities = Diagnoses.reduce((acc, item) => {
        acc[item.DiagnoseName] = item.Aprior;
        return acc;
      }, {});
      setPriorProbabilities(probabilities);

      let likelihoods = {};
      for (let diagnose of Diagnoses) {
        likelihoods[diagnose.DiagnoseName] = {};

        for (let item of DiagnoseSymptom) {
          if (item.DiagnoseID === diagnose.DiagnoseID) {
            let symptom = Symptoms.find(
              (s) => s.SymptomsID === item.SymptomsID
            );

            likelihoods[diagnose.DiagnoseName][symptom.SymptomsName] =
              item.Aposterior;
          }
        }
      }
      setSymptomLikelihoods(likelihoods);
      setLoading(false);
    }
  }, [Symptoms, Diagnoses, DiagnoseSymptom]);

  useEffect(() => {
    if (!loading && selectedSymptoms.length > 0 && user) {
      diagnose(selectedSymptoms);
    }
  }, [loading, selectedSymptoms, user]);

  useEffect(() => {
    if (!loading && user) {
      const updatedPriorProbabilities = DynamicAprior(
        user.age,
        user.gender,
        priorProbabilities,
        answers
      );
      setPriorProbabilities(updatedPriorProbabilities);
    }
  }, [loading, user, answers]);

  const calculatePosteriorProbability = useCallback(
    (diagnosis, symptoms) => {
      let posteriorProbability = priorProbabilities[diagnosis];

      for (const symptom of symptomsNames) {
        let symptomLikelihood;
        if (symptoms.includes(symptom)) {
          symptomLikelihood = symptomLikelihoods[diagnosis][symptom] || 0;
        } else {
          symptomLikelihood = 1 - (symptomLikelihoods[diagnosis][symptom] || 0);
        }

        posteriorProbability *= symptomLikelihood;
      }

      return posteriorProbability;
    },
    [priorProbabilities, symptomLikelihoods, symptomsNames]
  );

  const diagnose = useCallback(
    (symptoms) => {
      const results = [];

      for (const diagnosis in priorProbabilities) {
        const posteriorProbability = calculatePosteriorProbability(
          diagnosis,
          symptoms
        );
        results.push({ diagnosis, posteriorProbability });
      }

      results.sort((a, b) => b.posteriorProbability - a.posteriorProbability);

      const top3Diagnoses = results.slice(0, 5);
      const sumPosteriorProbability = results.reduce(
        (acc, { posteriorProbability }) => acc + posteriorProbability,
        0
      );

      const diagnosisResults = top3Diagnoses.map(
        ({ diagnosis, posteriorProbability }) => {
          const percentage =
            (posteriorProbability / sumPosteriorProbability) * 100;
          console.log(`Процент для ${diagnosis}: ${percentage.toFixed(2)}%`);
          return { diagnosis, percentage };
        }
      );

      const maxPercentage = Math.max(
        ...diagnosisResults.map(({ percentage }) => percentage)
      );
      if (maxPercentage < minThreshold) {
        console.log(
          "Максимальный процент диагноза меньше минимального значения"
        );
        navigate("/Test", { state: { diagnosisResults } });
      } else {
        navigate("/Result", { state: { diagnosisResults } });
      }

      console.log("Топ-3 диагноза:", diagnosisResults);
      setDiagnosisResults(diagnosisResults);
    },
    [calculatePosteriorProbability, minThreshold, navigate]
  );

  const memoizedDiagnosisResults = useMemo(
    () => diagnosisResults,
    [diagnosisResults]
  );
  const memoizedSymptomsNames = useMemo(() => symptomsNames, [symptomsNames]);
  const memoizedSymptomLikelihoods = useMemo(
    () => symptomLikelihoods,
    [symptomLikelihoods]
  );
  const memoizedPriorProbabilities = useMemo(
    () => priorProbabilities,
    [priorProbabilities]
  );
};

export default Bayes;
