import { Suspense, lazy } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import { Error404, Loading, ScrollToTop, Unauthorized } from "@/components";
import DashboardLayout from "@/layout";
import Authentication from "@/pages/Authentication";
import useAuth from "@/hooks/useAuth";

export const Mail = lazy(() => import("@/pages/Mail"));
export const StudentManage = lazy(() => import("@/pages/StudentManage"));
export const Reserve = lazy(() => import("@/pages/Reserve"));
export const ClassView = lazy(() => import("@/pages/ClassesView"));
export const ClassDetailView = lazy(() => import("@/pages/ClassDetailView"));
export const StudentDetail = lazy(() => import("@/pages/StudentDetail"));
export const Reservedetail = lazy(() => import("@/pages/Reservedetail"));
export const StudentDetailByClass = lazy(() =>
  import("@/pages/StudentDetailByClass")
);
export const PreviewEmaill = lazy(() => import("@/pages/PreviewEmail"));

const checkAccess = (role) => {
  return role !== "ROLE_TRAINER";
};

export const Router = () => {
  const { isAuthenticated, infoUser } = useAuth();
  const hasAccess = checkAccess(infoUser?.roleName);

  const routes = useRoutes([
    {
      path: "/",
      element: isAuthenticated ? (
        <Navigate to="/student/view" />
      ) : (
        <Authentication />
      ),
    },
    {
      element: isAuthenticated ? (
        <DashboardLayout>
          <ScrollToTop>
            <Suspense fallback={<Loading />}>
              <Outlet />
            </Suspense>
          </ScrollToTop>
        </DashboardLayout>
      ) : (
        <Navigate to="/" />
      ),
      children: [
        {
          element: hasAccess ? <StudentManage /> : <Unauthorized />,
          path: "/student/view",
        },
        {
          element: hasAccess ? <StudentDetail /> : <Unauthorized />,
          path: "/student/view/:id",
        },
        {
          element: hasAccess ? <Mail /> : <Unauthorized />,
          path: "/email",
        },
        {
          element: hasAccess ? <Reserve /> : <Unauthorized />,
          path: "/reverve/view",
        },
        {
          element: hasAccess ? <Reservedetail /> : <Unauthorized />,
          path: "/reverve/detail/:reservedclassId",
        },
        {
          element: hasAccess ? <PreviewEmaill /> : <Unauthorized />,
          path: "/reverve/PreviewEmail/:templateId/:reservedclassId",
        },
        { element: <ClassView />, path: "/class/view" },
        {
          element: <ClassDetailView />,
          path: "/class/view/:classId",
        },
        {
          element: <StudentDetailByClass />,
          path: "/class/view/studentDetail/:classId/:id",
        },
        { element: <Error404 />, path: "*" },
      ],
    },
  ]);

  return routes;
};
