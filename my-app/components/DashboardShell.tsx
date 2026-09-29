"use client";
 import { useState } from"react"; 
 import Sidebar from "./Sidebar"; 
 import Navbar from "./Navbar"; 
 export default function DashboardShell({ children, }:
     { children: React.ReactNode; 

     })
      { const [isSidebarOpen, setIsSidebarOpen] = useState(true);
        
        return (
             <div className={`dashboard${isSidebarOpen ? "" : " sidebar-closed"}`}> 
             <Sidebar isOpen={isSidebarOpen} /> <div className="main-content"> 
                <Navbar
                 onMenuClick={() =>setIsSidebarOpen(!isSidebarOpen)} /> {children} 
                    </div> 
                    </div> );
                     }