/* eslint-disable react-hooks/set-state-in-effect */
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import MainLayout from "./components/routes/MainLayout";
import Auth from "./components/auth/Auth";
import { useSelector } from "react-redux";
import CourierDetailsForm from "./components/courierDetailsForm/CourierDetailsForm";
import PackageDetails from "./components/packages/PackageDetails";
import TrackPackages from "./components/trackPackage/TrackPackages";

function App() {
  const { loginDetails } = useSelector((state) => state.userDetails);
  const isAuthenticated = !!loginDetails?.token;
  console.log("Test");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/auth"} />}
        />
        <Route
          path="/auth"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Auth />}
        />
        <Route
          element={isAuthenticated ? <MainLayout /> : <Navigate to="/auth" />}
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-courier" element={<CourierDetailsForm />} />
          <Route path="/packages" element={<PackageDetails />} />
          <Route path="/courier-tracking" element={<TrackPackages />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
