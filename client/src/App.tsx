import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./globals.css";
import SignInForm from "./_auth/forms/SignInForm";
import { ThemeProvider } from "@/components/theme-provider";
import Result from "./_root/pages/Result";
import { SymptomProvider } from "./components/SymptomProvider";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import { Redirect, Navigate } from "react-router-dom";
import { UserProvider } from "../src/components/UserContext";
import { AnswersProvider } from "../src/components/AnswersContext";
import NotFound from "./_root/pages/NotFound";
import About from "./_root/pages/About";
import Survey from "./_root/pages/Survey";
import Symptoms from "./_root/pages/Symptoms";
import Test from "./_root/pages/Test";

const App = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isSurveyCompleted, setIsSurveyCompleted] = useState(false);

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <SymptomProvider>
        <AnswersProvider>
          <UserProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                <div className="container mx-auto">
                  <Routes>
                    <Route
                      path="/SignIn"
                      element={<SignInForm setIsRegistered={setIsRegistered} />}
                    />
                    <Route path="/" element={<About />} />
                    <Route path="/Symptoms" element={<Symptoms />} />
                    <Route path="/Result" element={<Result />} />
                    <Route path="/Test" element={<Test />} />
                    <Route path="*" element={<NotFound />} />
                    <Route
                      path="/Survey"
                      element={
                        isRegistered ? (
                          isSurveyCompleted ? (
                            <Navigate to="/Symptoms" />
                          ) : (
                            <Survey
                              setIsSurveyCompleted={setIsSurveyCompleted}
                            />
                          )
                        ) : (
                          <Navigate to="/SignIn" />
                        )
                      }
                    />
                  </Routes>
                </div>
              </main>
              <Footer />
            </div>
          </UserProvider>
        </AnswersProvider>
      </SymptomProvider>
    </ThemeProvider>
  );
};

export default App;
