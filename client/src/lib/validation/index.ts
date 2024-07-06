import { z } from "zod";

export const SignInValidation = z.object({
  name: z
    .string()
    .min(2, { message: "Имя должно содержать не менее 2 символов" })
    .max(50, { message: "Имя должно содержать не более 50 символов" }),
  email: z
    .string()
    .email({ message: "Введите корректный адрес электронной почты" }),
  gender: z.enum(["М", "Ж"], { message: "Пожалуйста, выберите М или Ж" }),
  age: z
    .number()
    .min(16, { message: "Возраст должен быть не менее 16 лет" })
    .max(99, { message: "Возраст должен быть не более 99 лет" }),
});
