import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Projects from "./pages/Project/Projects";
import KanbanBoard from "./pages/Kanban/KanbanBoard";
import { Routes, Route, useLocation } from 'react-router-dom';
import MyTasks from "./pages/Tasks/MyTasks";
import Calendar from "./pages/Calendar/Calendar";
import Chat from "./pages/Chat/Chat";
import Drive from "./pages/Drive/Drive";
import Users from "./pages/Users/Users";
import Profile from './pages/Account/Profile'
import Signin from "./pages/Auth/Signin";
import Dashboard from "./pages/Dashboard/Dashboard";

const App = () =>
{
    const location = useLocation()
    return (
        <>
            <div className="flex items-start">
                { location.pathname != "/signin" && <Sidebar /> }
                <div className={ `w-full ${ location.pathname != "/signin" && "ml-76.25" }  pb-10` }>
                    { location.pathname != "/signin" && <Navbar /> }
                    <Routes>
                        <Route path="/dashboard" element={ <Dashboard /> } />
                        <Route path="/projects" element={ <Projects /> } />
                        <Route path="/projects/:projectId/kanban" element={ <KanbanBoard /> } />
                        <Route path="/my-tasks" element={ <MyTasks /> } />
                        <Route path="/calendar" element={ <Calendar /> } />
                        <Route path="/chat" element={ <Chat /> } />
                        <Route path="/drive" element={ <Drive /> } />
                        <Route path="/users" element={ <Users /> } />
                        <Route path="/profile" element={ <Profile /> } />
                        <Route path="/signin" element={ <Signin /> } />
                    </Routes>
                </div>
            </div>
        </>
    )
}

export default App