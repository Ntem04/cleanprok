import { lazy, Suspense, type ReactNode } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Reveal from "./components/ui/Reveal";
import DashboardLayout from "./pages/dashboard/DashboardLayout";

const HomePage = lazy(() => import("./pages/home/HomePage"));
const AboutPage = lazy(() => import("./pages/about/AboutPage"));
const ContactPage = lazy(() => import("./pages/contact/ContactPage"));
const LoginPage = lazy(() => import("./pages/login/LoginPage"));
const NotFoundPage = lazy(() => import("./pages/not-found/NotFoundPage"));
const RegisterPage = lazy(() => import("./pages/register/RegisterPage"));
const ServicesPage = lazy(() => import("./pages/services/ServicesPage"));
const TestimonialsPage = lazy(() => import("./pages/testimonials/TestimonialsPage"));
const OverviewPage = lazy(() => import("./pages/dashboard/overview/OverviewPage"));
const ServicesDashboardPage = lazy(() => import("./pages/dashboard/services/ServicesDashboardPage"));
const TeamsPage = lazy(() => import("./pages/dashboard/teams/TeamsPage"));
const PlanningPage = lazy(() => import("./pages/dashboard/planning/PlanningPage"));
const ReportsPage = lazy(() => import("./pages/dashboard/reports/ReportsPage"));
const MessagesPage = lazy(() => import("./pages/dashboard/messages/MessagesPage"));
const SettingsPage = lazy(() => import("./pages/dashboard/settings/SettingsPage"));

function RouteFallback() {
  return <div className="min-h-32 animate-pulse rounded-xl bg-slate-100" aria-hidden="true" />;
}

function LazyRoute({ children }: { readonly children: ReactNode }) {
  return <Suspense fallback={<RouteFallback />}>{children}</Suspense>;
}

const RootLayout = () => (
  <div className="flex min-h-screen flex-col bg-base-100 font-sans text-base-content">
    <Navbar />
    <main className="flex-1">
      <Outlet />
    </main>
    <Reveal direction="up" delay={200}>
      {" "}
      <Footer />
    </Reveal>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LazyRoute><LoginPage /></LazyRoute>,
    errorElement: <LazyRoute><NotFoundPage /></LazyRoute>,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <LazyRoute><NotFoundPage /></LazyRoute>,
    children: [
      { index: true, element: <LazyRoute><OverviewPage /></LazyRoute> },
      { path: "services", element: <LazyRoute><ServicesDashboardPage /></LazyRoute> },
      { path: "teams", element: <LazyRoute><TeamsPage /></LazyRoute> },
      { path: "planning", element: <LazyRoute><PlanningPage /></LazyRoute> },
      { path: "reports", element: <LazyRoute><ReportsPage /></LazyRoute> },
      { path: "messages", element: <LazyRoute><MessagesPage /></LazyRoute> },
      { path: "settings", element: <LazyRoute><SettingsPage /></LazyRoute> },
    ],
  },
  {
    path: "/",
    element: <RootLayout />,
    // Câblage du composant d'erreur sécurisé
    errorElement: <LazyRoute><NotFoundPage /></LazyRoute>,
    children: [
      {
        index: true,
        element: <LazyRoute><HomePage /></LazyRoute>,
      },
      { path: "services", element: <LazyRoute><ServicesPage /></LazyRoute> },
      { path: "a-propos", element: <LazyRoute><AboutPage /></LazyRoute> },
      { path: "temoignages", element: <LazyRoute><TestimonialsPage /></LazyRoute> },
      { path: "contact", element: <LazyRoute><ContactPage /></LazyRoute> },
      { path: "register", element: <LazyRoute><RegisterPage /></LazyRoute> },
      { path: "*", element: <LazyRoute><NotFoundPage /></LazyRoute> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
