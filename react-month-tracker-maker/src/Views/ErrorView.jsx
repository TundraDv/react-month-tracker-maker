import React from "react";
import Navbar from '../Components/Navbar'

const ErrorView = () => (
  <div>
    <Navbar/>
    <h1>Oops! Something went wrong.</h1>
    <p>We're sorry, but the page you're looking for cannot be found or an error has occurred.</p>
  </div>
);

export default ErrorView;