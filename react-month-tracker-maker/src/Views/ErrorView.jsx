import React from "react";
import Navbar from '../Components/Navbar'
import { useLanguage } from '../Contexts/LanguageContext';

const ErrorView = () => {
  const { translate } = useLanguage();

  return (
  <div>
    <Navbar/>
    <h1>{translate("error-h1")}</h1>
    <p>{translate("error-p")}</p>
  </div>

  )
};

export default ErrorView;