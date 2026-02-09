import React, { useEffect } from "react";
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
import { useDispatch } from "react-redux";
import { fetchUserProfile } from "./redux/member/userSlice";
import SetPassword from "./pages/Auth/SetPassword";

const App = () =>
{
    const location = useLocation()
    const dispatch = useDispatch();

    useEffect( () =>
    {
        const token = localStorage.getItem( "jwt" );
        if ( !token ) return;

        dispatch( fetchUserProfile() )
    }, [ dispatch ] )


    const isAuthPage = location.pathname === "/signin" || location.pathname.startsWith( "/set-password" );

    return (
        <>
            <div className="flex h-screen overflow-hidden">
                { !isAuthPage && <Sidebar /> }
                <div className={ `flex-1 flex flex-col ${ !isAuthPage ? "ml-76.25" : "" } overflow-hidden` }>
                    { !isAuthPage && <Navbar /> }
                    <div className="flex-1 overflow-y-auto">
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
                            <Route path="/set-password" element={ <SetPassword /> } />
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App