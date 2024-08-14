import * as React from "react";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MakerView from "./Views/MakerView";
import ErrorView from "./Views/ErrorView";
import TemplatesView from "./Views/TemplatesView";
import AboutView from "./Views/AboutView";
import Navbar from './Components/Navbar'
import { LanguageProvider } from './Contexts/LanguageContext'

const router = createBrowserRouter([
  {
    path: "/",
    element: <MakerView/>,
  },
  {
    path: "/month",
    element: <MakerView/>,
  },
  {
    path: "/templates",
    element: <TemplatesView/>,
  },
  {
    path: "/about",
    element: <AboutView/>,
  },
  {
    path: "*", 
    element: <ErrorView />,
  },
])

function App() {
  return (
    <LanguageProvider>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </LanguageProvider>
  );
}

export default App;
