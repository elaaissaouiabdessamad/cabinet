import React, { useState, useEffect } from "react";

const HeaderDossierClinicalExamShow = ({ handleDossierClinicalExamShow }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex items-center w-full">
      <button
        onClick={handleDossierClinicalExamShow}
        className={`mr-4 fixed py-2 px-4 rounded-lg flex items-center bg-green-500 hover:bg-green-600 text-white font-bold transition-all duration-300 ease-in-out ${
          isScrolled ? "translate-y-[5px]" : "translate-y-[15px]"
        }`}
        style={{ transition: "width 0.5s, opacity 0.5s, transform 0.5s" }}
      >
        <i className="fa fa-angle-double-left"></i>&nbsp;
        <span
          className={`transition-opacity duration-500 ${
            isScrolled ? "opacity-0" : "opacity-100"
          }`}
          style={{ transition: "opacity 0.5s" }}
        >
          {isScrolled ? "" : "Au examen clinique"}
        </span>
      </button>
    </div>
  );
};

export default HeaderDossierClinicalExamShow;
