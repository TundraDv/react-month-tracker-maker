import * as React from "react";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MakerView from "./Views/MakerView";
import ErrorView from "./Views/ErrorView";
import TemplatesView from "./Views/TemplatesView";
import AboutView from "./Views/AboutView";

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
    path: "*", // Catch-all route for undefined paths
    element: <ErrorView />,
  },
])

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
