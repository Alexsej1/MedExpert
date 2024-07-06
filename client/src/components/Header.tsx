import React from "react";
import { Typography } from "@mui/material";
import { HeartPulse } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import "../../src/globals.css";

const Header = () => {
  return (
    <header className="py-6">
      <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between">
        <div className="bg-white bg-opacity-5 text-black shadow-md hidden md:flex items-center flex-1">
          <div className="container mx-auto flex items-center h-24">
            <Link to={"/"} className="flex items-center space-x-2 mr-auto">
              <HeartPulse color="red" size={24} />
              <h4 className="font-semibold text-lg">MedExpert</h4>
            </Link>
            <div className="flex items-center space-x-4">
              <div className=" rounded-lg font-semibold ">
                <Link
                  to={"/SignIN"}
                  className="border py-3 px-7 rounded-lg border-primary text-primary mr-2 hover:bg-primary hover:text-white transition duration-300 ease-in-out"
                >
                  Поставить диагноз
                </Link>
              </div>
              <ModeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
