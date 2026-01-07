import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { lazy, Suspense } from "react";
import Loading from "../components/Loading";
import AuthLayout from "../layouts/AuthLayout.tsx";
import RequireAuth from "./RequireAuth.tsx";

const Home = lazy(() => import("../features/movies/MovieList"));
const MovieList = lazy(() => import("../features/movies/MovieList.tsx"));
const NotFound = lazy(() => import("../components/NotFound.tsx"));
const Login = lazy(() => import("../features/auth/Login.tsx"));
const Register = lazy(() => import("../features/auth/Register.tsx"));
const Profile = lazy(() => import("../features/auth/Profile.tsx"));

const withSuspense = (el: React.ReactNode) => (
  <Suspense fallback={<Loading />}>{el}</Suspense>
);

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { index: true, element: withSuspense(<Home />) },
      {
        path: "/movies/:id",
        element: withSuspense(<MovieList />),
      },
      { path: "/search", element: withSuspense(<Home />) },
      { path: "*", element: withSuspense(<NotFound />) },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: withSuspense(<Login />) },
      { path: "/register", element: withSuspense(<Register />) },
    ],
  },

  // Protected Routes
  {
    path: "/profile",
    // element: <RequireAuth>{withSuspense(<Profile />)}</RequireAuth>,
  },
]);
