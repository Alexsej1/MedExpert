import React from "react";
import { Link } from "react-router-dom";
import "../../../src/globals.css";
import FeatureCard from "@/components/FeatureCard";

const About = () => {
  return (
    <div className="w-full">
      <div className="flex bg-white" style={{ height: "600px" }}>
        <div className="flex items-center text-center lg:text-left px-8 md:px-12 lg:w-1/2">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 md:text-3xl">
              <span className="text-4xl text-center font-bold text-primary mb-4">
                MedExpert
              </span>
              - твой карманный врач
            </h2>
            <p className="mt-2 text-sm text-gray-500 md:text-base">
              MedExpert - ваш персональный врач в онлайн-формате, помогающий
              определить возможный диагноз по введенным симптомам.
            </p>

            <div className=" rounded-lg font-semibold mt-5 md:mt-12 md:max-w-lg lg:text-lg">
              <Link
                to={"/SignIN"}
                className="border py-3 px-7 rounded-lg border-primary text-primary mr-2 hover:bg-primary hover:text-white transition duration-300 ease-in-out"
              >
                Поставить диагноз
              </Link>
            </div>
          </div>
        </div>
        <div
          className="hidden lg:block lg:w-1/2"
          style={{
            clipPath: "polygon(10% 0, 100% 0%, 100% 100%, 0 100%)",
          }}
        >
          <div
            className="h-full object-cover"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1589279003513-467d320f47eb?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="h-full bg-black opacity-25"></div>
          </div>
        </div>
      </div>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-6xl text-center font-bold text-primary mb-4">
            Ключевые возможности
          </h2>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              title="Онлайн-диагностика"
              description="Получайте быструю и удобную онлайн-диагностику по введенным симптомам, обеспечивая доступ к медицинским рекомендациям в реальном времени."
            />
            <FeatureCard
              title="Персонализированные рекомендации"
              description="Получайте персонализированные рекомендации и советы от опытных врачей, адаптированные к вашему состоянию здоровья и предпочтениям."
            />
            <FeatureCard
              title="Справочная информация"
              description="Получайте доступ к обширной базе знаний о различных заболеваниях, симптомах и методах лечения, чтобы быть информированным о своем здоровье."
            />
          </div>
        </div>
      </section>

      <section>
        <div className="container max-w-full mx-auto py-12 px-6">
          <h2 className="text-6xl text-center font-bold text-primary mb-4">
            Преимущества использования сервиса
          </h2>

          <div className="max-w-full md:max-w-6xl mx-auto my-3 md:px-8">
            <div className="relative block flex flex-col md:flex-row items-center">
              <div className="w-11/12 max-w-sm sm:w-3/5 lg:w-1/3 sm:my-5 my-8 relative z-0 rounded-lg shadow-lg md:-mr-4">
                <div className="bg-white text-black rounded-lg shadow-inner shadow-lg overflow-hidden">
                  <div className="block text-left text-sm sm:text-md max-w-sm mx-auto mt-2 text-black px-8 lg:px-6">
                    <h1 className="text-lg font-medium uppercase p-3 pb-0 text-center tracking-wide">
                      Экономия времени
                    </h1>
                    Вам не нужно записываться на прием к врачу и ждать в
                    очереди. MedExpert позволяет получить быструю консультацию
                    прямо сейчас, не выходя из дома или офиса.
                  </div>

                  <div className="block flex items-center p-2 uppercase"></div>
                </div>
              </div>

              <div className="w-full max-w-md sm:w-2/3 lg:w-1/3 sm:my-5 my-8 relative z-10 bg-white rounded-lg shadow-lg">
                <div className="text-sm leading-none rounded-t-lg bg-gray-200 text-black font-semibold uppercase py-4 text-center tracking-wide">
                  Самое главное
                </div>
                <div className="block text-left text-sm sm:text-md max-w-sm mx-auto mt-2 text-black px-8 lg:px-6">
                  <h1 className="text-lg font-medium uppercase p-3 pb-0 text-center tracking-wide">
                    Доступность 24/7
                  </h1>
                  Сервис доступен круглосуточно, что означает, что вы можете
                  получить медицинскую помощь в любое время, когда это
                  необходимо, даже в ночное время или в выходные.
                </div>
                <div className="block flex items-center p-8 uppercase"></div>
              </div>

              <div className="w-11/12 max-w-sm sm:w-3/5 lg:w-1/3 sm:my-5 my-8 relative z-0 rounded-lg shadow-lg md:-mr-4">
                <div className="bg-white text-black rounded-lg shadow-inner shadow-lg overflow-hidden">
                  <div className="block text-left text-sm sm:text-md max-w-sm mx-auto mt-2 text-black px-8 lg:px-6">
                    <h1 className="text-lg font-medium uppercase p-3 pb-0 text-center tracking-wide">
                      Простота использования
                    </h1>
                    Интерфейс MedExpert интуитивно понятен и легок в
                    использовании даже для тех, кто не очень хорошо разбирается
                    в компьютерах или мобильных устройствах.
                  </div>

                  <div className="block flex items-center p-2 uppercase"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="max-w-lg  px-4 pt-1 pb-8 mx-auto text-center md:max-w-none md:text-center">
          <h1 className="text-3xl font-extrabold leading-10 tracking-tight text-white md:text-6xl lg:text-7xl">
            <span className="block text-primary">ПОПРОБУЙ ПРЯМО</span>
            <span className="mt-4 text-primary bg-clip-text inline-block md:inline-block">
              СЕЙЧАС
            </span>
          </h1>
          <div className="mx-auto rounded-lg font-semibold mt-5 text-center md:mt-12 md:max-w-lg lg:text-lg">
              <Link
                to={"/SignIN"}
                className="border py-3 px-7 rounded-lg border-primary text-primary mr-2 hover:bg-primary hover:text-white transition duration-300 ease-in-out"
              >
                Поставить диагноз
              </Link>
            </div>

        </div>
      </section>
    </div>
  );
};

export default About;
