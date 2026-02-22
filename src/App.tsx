import { createBrowserRouter } from "react-router";
import HomePage from "./pages/home";
import DetailPage from "./pages/detail";
import { RouterProvider } from "react-router/dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      index: true, // index: true means this route will be rendered when the path is exactly "/"s
      element: <HomePage />,
    },
    {
      path: "/detail",
      element: <DetailPage />,
    },
  ]);

  return (
    <div className="bg-[url('/src/images/list_bg.jpg')] min-h-screen">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
