import React from "react";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className="  flex items-center">
      <div className="container flex flex-col md:flex-row items-center justify-between px-5 text-gray-700">
        <div className="w-full lg:w-1/2 mx-8">
          <div className="text-7xl text-primary font-dark font-extrabold mb-8">
            Error 404
          </div>
          <p className="text-2xl md:text-3xl font-light leading-normal mb-8">
            Страница которую вы ищете не существует
          </p>
          <Link
            to="/"
            className="px-5 inline py-3 text-sm font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-primary active:bg-red-600 hover:bg-red-700"
          >
            Вернуться на главную
          </Link>
        </div>
        <div className="w-full lg:flex lg:justify-end lg:w-1/2 mx-5">
          <img
            src="https://img.freepik.com/free-vector/online-doctor-with-white-coat_23-2148519127.jpg?t=st=1714895804~exp=1714899404~hmac=378206375b719c3d4c1029e675da07909740c63b1c6d3ead6347d0d3c6b141e1&w=740"
            alt="Page not found"
          />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
