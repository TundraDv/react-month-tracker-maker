import * as React from "react";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MakerView from "./Views/MakerView";
import ErrorView from "./Views/ErrorView";
import TemplatesView from "./Views/TemplatesView";
import AboutView from "./Views/AboutView";
import MainLayout from "./Layouts/MainLayout";

import { LanguageProvider } from './Contexts/LanguageContext'
import { DayShapeProvider } from './Contexts/DayShapeContext';
import { BackgroundImageProvider } from './Contexts/BackgroundImageContext';
import { GoalsProvider } from './Contexts/GoalsContext';
import { ComponentsProvider } from './Contexts/ComponentsContext';
import { FontProvider } from './Contexts/FontContext';
import { TemplatesProvider } from './Contexts/TemplatesContext'

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      // {
      //   path: "/",
      //   element: <Navigate to="/templates/0" />, 
      // },
      {
        path: "/",
        element: <MakerView />, 
      },
      {
        path: "/templates",
        element: <TemplatesView />,
      },
      {
        path: "/templates/:id", 
        element: <MakerView />,
      },
      {
        path: "/month",
        element: <MakerView />,
      },
      {
        path: "/about",
        element: <AboutView />,
      },
      {
        path: "*", 
        element: <ErrorView />,
      },
    ],
  },
]);

function App() {
  return (
    <LanguageProvider>
      <TemplatesProvider>
        <DayShapeProvider>
          <BackgroundImageProvider>
            <GoalsProvider>
              <ComponentsProvider>
                <FontProvider>
                  <div className="App">
                    <RouterProvider router={router} />
                  </div>
                </FontProvider>
              </ComponentsProvider>
            </GoalsProvider>
          </BackgroundImageProvider>
        </DayShapeProvider>
      </TemplatesProvider>
    </LanguageProvider>
  );
}

export default App;
