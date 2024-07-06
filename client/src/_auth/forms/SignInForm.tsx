import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../src/globals.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SignInValidation } from "@/lib/validation";
import { useUser } from "@/components/UserContext";

const SignInForm = ({ setIsRegistered }) => {
  // Принимаем setIsRegistered как проп
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      name: localStorage.getItem("name") || "",
      email: localStorage.getItem("email") || "",
      gender: localStorage.getItem("gender") || "М",
      age: localStorage.getItem("age") || 18,
    },
  });

  const { setUser } = useUser();

  useEffect(() => {
    const { name, email, gender, age } = form.getValues();
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("gender", gender);
    localStorage.setItem("age", age);
    setUser({ name, email, gender, age });
  }, [form.getValues(), setUser]);

  async function onSubmit(values: z.infer<typeof SignInValidation>) {
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/client", values);
      setIsRegistered(true); 
      navigate("/Survey");
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    }
    setIsLoading(false);
  }
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex justify-center ">
        <div
          className="hidden bg-cover lg:block lg:w-2/4"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
            maxHeight: "625px",
          }}
        >
          <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
            <div>
              <h2 className="text-4xl font-bold text-white">MedExpert</h2>

              <p className="max-w-xl mt-3 text-gray-300">
                MedExpert - ваш персональный врач в онлайн-формате, помогающий
                определить возможный диагноз по введенным симптомам.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-start w-full max-w-md px-6 mx-auto lg:w-2/4">
          <div className="flex-1">
            <div className="text-center">
              <h2 className="text-4xl text-center font-bold text-primary ">
                Узнать диагноз по симтомам
              </h2>
              <h2 className="text-xl text-center font-semibold  mb-2 text-gray-500 dark:text-gray-300">
                Чтобы начать введи некоторые данные
              </h2>
            </div>

            <div className="mt-2">
              <Form {...form}>
                <div className="space-y-4">
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-5 w-full mt-4 px-6 py-4 border border-primary rounded-md"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="shad-form-item">
                          <FormLabel>Имя</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              className="shad-input"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="shad-form-item">
                          <FormLabel>Эл. почта</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              className="shad-input"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem className="shad-form-item">
                          <FormLabel>Пол</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="М" />
                                </FormControl>
                                <FormLabel className="font-normal">М</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="Ж" />
                                </FormControl>
                                <FormLabel className="font-normal">Ж</FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="age"
                      render={({ field }) => (
                        <FormItem className="shad-form-item">
                          <FormLabel>Возраст</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              className="shad-input"
                              {...field}
                              onChange={(e) => {
                                field.onChange(Number(e.target.value));
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex items-center ">
                      <Label className="text-sm  opacity-50">
                        Нажимая кнопку 'Продолжить', вы соглашаетесь с тем, что
                        это приложение не предоставляет профессиональный
                        медицинский диагноз.
                      </Label>
                    </div>
                    <Button
                      type="submit"
                      className="shad-button_primary inline-block"
                    >
                      {isLoading ? (
                        <div className="flex-center">Loading...</div>
                      ) : (
                        "Продолжить"
                      )}
                    </Button>
                  </form>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
