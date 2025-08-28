import React from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "../store/userUseStore";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
const Dashboard = () => {
   const logout=useUserStore((state)=>state.logout)
const navigate=useNavigate();
  const handleSubmit=async()=>{
    // e.preventDefault();
   await logout();
   navigate("/login");
  }
  return (
    <div className="flex w-full h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4">
        <h2 className="text-2xl font-bold mb-6">My Dashboard</h2>
        <nav className="space-y-3">
          <Link to="/admin/dashboard/overview"
            className="block px-4 py-2 rounded-md hover:bg-gray-200"
          >
            📊 Overview
          </Link>
          <Link
           to="/admin/dashboard/create"
            className="block px-4 py-2 rounded-md hover:bg-gray-200"
          >
            👥 Create-Task
          </Link>
          {/* <Link
           to="/admin/Tasks"
            className="block px-4 py-2 rounded-md hover:bg-gray-200"
          >
            ✅ Tasks
          </Link>
          <Link
           to="/admin/setting"
            className="block px-4 py-2 rounded-md hover:bg-gray-200"
          >
            ⚙️ Settings
          </Link> */}
        </nav>
      </aside>

{/* //dashboard CardContent */}
      <div className="flex-1 flex flex-col">

        <header className="bg-custom shadow-md px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl text-white font-semibold">Welcome Back </h1>
         
          <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Logout
         
          </button>
        </header>


        <main className="p-6 overflow-y-auto flex-1">
          <Outlet/>
        </main>
      </div>  
    </div>
  );
};

export default Dashboard;
