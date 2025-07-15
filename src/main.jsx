import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "@/pages/ErrorPage";
import LoginPage from "@/pages/LoginPage";
import SettingPage from "@/pages/dashboard/SettingPage";
import DashboardLayout from "@/components/layout/DashboardLayout";
import DataFethcing from "@/pages/dashboard/DataFetching";

import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/components/provider/AuthProvider";
import { ProtectedRoute } from "@/components/route/ProtectedRoute";
import { NoAuthRoute } from "@/components/route/NoAuthRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthProvider />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <NoAuthRoute>
            <LoginPage />
          </NoAuthRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "/dashboard/setting",
            element: <SettingPage />,
          },
          {
            path: "/dashboard/data-fetching",
            element: <DataFethcing />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </StrictMode>
);
