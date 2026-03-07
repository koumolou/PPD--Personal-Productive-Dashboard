import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./component/ProfilePage";
import Setting from "./pages/settings";

import Navbar from "./component/navbar";
import Sidebar from "./component/sidebar";
import Notes from "./pages/Notes.jsx";
import Tasks from "./pages/Tasks.jsx";

 interface SideLink {
  key: number;
  name: string;
  icon: string;
  route: string;
}

 interface NavLink {
  name: string;
  path: string;
  key: number;
}



function App() {
  const sidelinks: SideLink[] = [
    { key: 1, name: "Dashboard", icon: "🏠", route: "/" },
    { key: 2, name: "Tasks", icon: "✅", route: "/tasks" },
    { key: 3, name: "Notes", icon: "📝", route: "/notes" },
    { key: 5, name: "Settings", icon: "⚙️", route: "/settings" },
  ];

  const links: NavLink[] = [
    { name: "Dashboard", path: "/", key: 1 },
    { name: "Tasks", path: "/tasks", key: 2 },
    { name: "Notes", path: "/notes", key: 3 },
    { name: "settings", path: "/settings", key: 4 },
  ];


  return (
    <div className="flex flex-col h-screen">
      <Navbar links={links}  />

      <div className="flex flex-1">
        <Sidebar
          sidelinks={sidelinks}
        
        />

        <main className="flex-1 p-6 overflow-auto bg-slate-100 min-h-screen relative">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<Setting />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/tasks" element={<Tasks />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;