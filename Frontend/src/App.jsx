import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import Overview from "./pages/Overview";
import CreateTask from "./pages/CreateTask";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/AdminDashboard";
import InProgressList from "./pages/InProgressList";
// import InProgressList from "./pages/InProgressList";
import StudentDashboard from "./pages/StudentDashboard";
import ToDoList from "./pages/ToDoList";
import CompleteList from "./pages/Complete";

const App = () => {
  return (
    <div className="max-w-screen-2xl  bg-custom flex justify-items-center ">
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* dashboard phase */}
        {/* <Route path="/admin/dashboard" element={<AdminDashboard/>}/> */}
        {/* student access */}
        <Route path="/student/dashboard" element={<StudentDashboard />} >
           <Route index element={<ToDoList/>}/>
           <Route path="todolist" element={<ToDoList/>}/>
           <Route path="inprogress" element={<InProgressList/>}/>
           <Route path="complete" element={<CompleteList/>}/>
        
        </Route>
          
         {/* Admin access */}
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
