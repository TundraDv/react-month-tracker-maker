import * as React from "react";
import MakerView from "./Views/MakerView";
import ErrorView from "./Views/ErrorView";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

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
