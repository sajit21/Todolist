import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import Overview from "./pages/Overview";
import CreateTask from "./pages/CreateTask";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/AdminDashboard";

const App = () => {
  return (
    <div className="max-w-screen-2xl  bg-custom flex justify-items-center ">
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* dashboard phase */}
        {/* <Route path="/admin/dashboard" element={<AdminDashboard/>}/> */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />}>
          <Route index element={<Overview />} /> 
          <Route path="overview" element={<Overview />} />
          <Route path="create" element={<CreateTask />} />
        </Route>
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
