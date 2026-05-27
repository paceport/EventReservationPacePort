import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import {
  DynamicItem,
  Sidebar,
  ForgotPassword,
  MainLogin,
  NewReservation,
  MyFeedback,
  MyDashboard,
  ReservationsHeader,
  EventDetails,
} from "./components";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Category } from "./components/Reservation/NewReservation";
import OTPInput from "./components/Login/OTP";
import ConfirmPassword from "./components/Login/ConfirmPassword";
import CreateReservation from "./components/CreateReservation/createReservation";
import SignUpConfirm from "./components/Login/Confirmed";
import SuccessScreen from "./components/CreateReservation/SuccessScreen";
import { AuthProvider, useAuth } from "./Hooks/useAuth";
import { ProtectedRoute, PublicRoute } from "./components/ProtectedRoute";

function Root() {
  return (
    <div id="main">
      <Sidebar>
        <Outlet />
      </Sidebar>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <MainLogin />
              </PublicRoute>
            }
          />
          <Route
            path="signupconfirm"
            element={
              <PublicRoute>
                <SignUpConfirm />
              </PublicRoute>
            }
          />
          <Route
            path="forgotpassword"
            element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            }
          />
          <Route
            path="confirmpassword"
            element={
              <PublicRoute>
                <ConfirmPassword />
              </PublicRoute>
            }
          />
          <Route
            path="otp"
            element={
              <PublicRoute>
                <OTPInput />
              </PublicRoute>
            }
          />
          <Route
            path="/sidebar"
            element={
              <ProtectedRoute>
                <Root />
              </ProtectedRoute>
            }
          >
            <Route
              index
              // path="/sidebar"
              element={
                <DynamicItem page={<MyDashboard />} navTitle="My Dashboard" />
              }
            />
            <Route
              path="/sidebar/reservation"
              element={
                <DynamicItem
                  page={<NewReservation />}
                  navTitle="New Reservation"
                />
              }
            >
              <Route index element={<Category />} />
              <Route path="new" element={<CreateReservation />} />
              <Route path="success" element={<SuccessScreen />} />
            </Route>
            <Route
              path="/sidebar/feedback"
              element={
                <DynamicItem page={<MyFeedback />} navTitle="My Feedback" />
              }
            />
            <Route
              path="/sidebar/admin"
              element={
                <DynamicItem page={<ReservationsHeader />} navTitle="Admin" />
              }
            />
          </Route>
          <Route path="/sidebar/eventDetails" element={<EventDetails />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}


