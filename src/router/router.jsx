import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Home from "../pages/Home/Home";
import MyProfile from "../pages/MyProfile";
import AllBooks from "../pages/AllBooks";
import BookDetails from "../pages/BookDetails";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import MyOrders from "../pages/dashboard/MyOrders";
import Payment from "../pages/dashboard/Payment/Payment";
import PaymentSuccess from "../pages/dashboard/Payment/PaymentSuccess";
import PaymentCancelled from "../pages/dashboard/Payment/PaymentCancelled";
import PaymentHistory from "../pages/dashboard/PaymentHistory";
import SellerAccount from "../pages/Seller/SellerAccount";
import ApproveSeller from "../pages/dashboard/ApproveSeller";
import UserManagement from "../pages/dashboard/admin/UserManagement";
import AdminRoute from "./AdminRoute";
import SellerOrderManagement from "../pages/dashboard/seller/SellerOrderManagement";
import AddBook from "../pages/dashboard/seller/AddBook";
import MyBooks from "../pages/dashboard/seller/MyBooks";
import EditBook from "../pages/dashboard/seller/EditBook";
import ManageBooks from "../pages/dashboard/admin/ManageBooks";
import Dashboard from "../pages/dashboard/Dashboard";
import Coverage from "../pages/Coverage";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Review from "../pages/dashboard/Review";
import DashboardNotFound from "../pages/ErrorPage/DashboardNotFound";
import AuthNotFound from "../pages/ErrorPage/AuthNotFound";
import NotFound from "../pages/ErrorPage/NotFound";
import GlobalError from "../pages/ErrorPage/GlobalError";

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     Component: RootLayout,
//     children: [
//       {
//         index: true,
//         Component: Home,
//       },
//       {
//         path: "books",
//         Component: AllBooks,
//       },
//       {
//         path: "books/:id",
//         Component: BookDetails,
//       },
//       {
//         path: "coverage",
//         Component: Coverage
//       },
//       {
//         path: "create-seller-account",
//         element: <PrivateRoute><SellerAccount /></PrivateRoute>
//       },
//       {
//         path: "myProfile",
//         element: (
//           <PrivateRoute>
//             <MyProfile />
//           </PrivateRoute>
//         ),
//       },
//       {
//         path: "about",
//         Component: About,
//       },
//       {
//         path: "contact",
//         Component: Contact,
//       }
//     ],
//   },
//   {
//     path: "/",
//     Component: AuthLayout,
//     children: [
//       {
//         path: "login",
//         Component: Login,
//       },
//       {
//         path: "register",
//         Component: Register,
//       },
//       {
//         path: "reset-password",
//         element: <div>Reset Password Page</div>,
//       },
//     ],
//   },
//   {
//     path: "/dashboard",
//     element: (
//       <PrivateRoute>
//         <DashboardLayout />
//       </PrivateRoute>
//     ),
//     children: [
//       {
//         index: true,
//         element: <Dashboard></Dashboard>
//       },
//       {
//         path: "add-book",
//         element: <AddBook></AddBook>
//       },
//       {
//         path: 'book-review/:id',
//         element: <Review></Review>
//       },
//       {
//         path: "my-books",
//         element: <MyBooks></MyBooks>
//       },
//       {
//         path: "edit-book/:id",
//         element: <EditBook></EditBook>
//       },
//       {
//         path: "order-management",
//         element: <SellerOrderManagement></SellerOrderManagement>, 
//       },
//       {
//         path: "my-orders",
//         Component: MyOrders,
//       },
//       {
//         path: "payment/:id",
//         Component: Payment,
//       },
//       {
//         path: "order-history",
//         Component: PaymentHistory,
//       },
//       {
//         path: "invoices",
//         element: <div>Invoices Page</div>,
//       },
//       {
//         path: "payment-success",
//         Component: PaymentSuccess,
//       },
//       {
//         path: "payment-cancelled",
//         Component: PaymentCancelled,
//       },
//       {
//         path: "approve-seller",
//         element: <AdminRoute><ApproveSeller></ApproveSeller></AdminRoute>
//       },
//       {
//         path: "users-management",
//         element: <AdminRoute><UserManagement></UserManagement></AdminRoute>,
//         // Component: UserManagement,
//       },
//       {
//         path: "manage-books",
//         element: <AdminRoute><ManageBooks></ManageBooks></AdminRoute>
//       }
//     ],
//   },
// ]);


export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <GlobalError />,
    children: [
      { index: true, Component: Home },
      { path: "books", Component: AllBooks },
      { path: "books/:id", Component: BookDetails },
      { path: "coverage", Component: Coverage },
      {
        path: "create-seller-account",
        element: (
          <PrivateRoute>
            <SellerAccount />
          </PrivateRoute>
        ),
      },
      {
        path: "myProfile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
      { path: "about", Component: About },
      { path: "contact", Component: Contact },

      // ❌ Public 404
      { path: "*", Component: NotFound },
    ],
  },

  {
    path: "/",
    Component: AuthLayout,
    children: [
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      { path: "reset-password", element: <div>Reset Password Page</div> },

      // ❌ Auth 404
      { path: "*", Component: AuthNotFound },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "add-book", element: <AddBook /> },
      { path: "book-review/:id", element: <Review /> },
      { path: "my-books", element: <MyBooks /> },
      { path: "edit-book/:id", element: <EditBook /> },
      { path: "order-management", element: <SellerOrderManagement /> },
      { path: "my-orders", Component: MyOrders },
      { path: "payment/:id", Component: Payment },
      { path: "order-history", Component: PaymentHistory },
      { path: "invoices", element: <div>Invoices Page</div> },
      { path: "payment-success", Component: PaymentSuccess },
      { path: "payment-cancelled", Component: PaymentCancelled },
      {
        path: "approve-seller",
        element: (
          <AdminRoute>
            <ApproveSeller />
          </AdminRoute>
        ),
      },
      {
        path: "users-management",
        element: (
          <AdminRoute>
            <UserManagement />
          </AdminRoute>
        ),
      },
      {
        path: "manage-books",
        element: (
          <AdminRoute>
            <ManageBooks />
          </AdminRoute>
        ),
      },

      // ❌ Dashboard 404
      { path: "*", Component: DashboardNotFound },
    ],
  },
]);
