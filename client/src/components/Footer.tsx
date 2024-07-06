import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
const ContactUs = z.object({
  name: z // Изменено с "Name" на "name"
    .string()
    .min(2, { message: "Имя должно содержать не менее 2 символов" })
    .max(50, { message: "Имя должно содержать не более 50 символов" }),
  email: z // Изменено с "Email" на "email"
    .string()
    .email({ message: "Введите корректный адрес электронной почты" })
    .min(2, { message: "Email должен содержать не менее 2 символов" })
    .max(50, { message: "Email должен содержать не более 50 символов" }),
  message: z // Изменено с "Message" на "message"
    .string()
    .min(1, { message: "Сообщение должно содержать хотя бы 1 символ" })
    .max(300, { message: "Сообщение должно содержать не более 300 символов" }),
});

export function Footer() {
  const form = useForm<z.infer<typeof ContactUs>>({
    resolver: zodResolver(ContactUs),
    defaultValues: {
      name: "", // Изменено с "Name" на "name"
      email: "", // Изменено с "Email" на "email"
      message: "", // Изменено с "Message" на "message"
    },
  });

  async function onSubmit(values: z.infer<typeof ContactUs>) {
    try {
      const response = await axios.post(
        "http://localhost:5000/Problems",
        values
      );
      console.log(values);
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    }
  }

  return (
    <footer className="pt-10">
      <hr className="text-white mx-5" />
      <div className="container mx-auto md:px-6 pt-2">
        <section>
          <div className="flex flex-wrap">
            <div className="mb-10 w-full md:w-4/12 md:px-3 lg:px-6">
              <h2 className="mb-6 text-3xl font-bold">Свяжитесь с нами</h2>
              <p className="mb-6 text-neutral-500 dark:text-neutral-300">
                В случае вопросов свяжитесь с нами
              </p>
            </div>
            <div className="mb-6 w-full md:w-8/12 md:px-3 lg:px-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name="name" // Изменено с "Name" на "name"
                    render={({ field }) => (
                      <FormItem className="mb-6">
                        <FormLabel className="block text-sm font-medium text-gray-700">
                          Имя
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Введите ваше имя"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email" // Изменено с "Email" на "email"
                    render={({ field }) => (
                      <FormItem className="mb-6">
                        <FormLabel className="block text-sm font-medium text-gray-700">
                          Эл. почта
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            {...field}
                            placeholder="Введите вашу эл. почту"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message" // Изменено с "Message" на "message"
                    render={({ field }) => (
                      <FormItem className="mb-6">
                        <FormLabel className="block text-sm font-medium text-gray-700">
                          Сообщение
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            {...field}
                            placeholder="Введите вашу проблему/пожелания"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Отправить
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
}

export default Footer;
