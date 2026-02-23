import { createBrowserRouter } from "react-router";
import HomePage from "./pages/home";

import { RouterProvider } from "react-router/dom";
import DetailPage from "./pages/detail";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      index: true, // index: true means this route will be rendered when the path is exactly "/"s
      element: <HomePage />,
    },
    {
      path: "/detail/:name",
      element: <DetailPage />,
    },
  ]);

  return (
    <div className="bg-[url('images/list_bg.jpg')] min-h-screen">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
