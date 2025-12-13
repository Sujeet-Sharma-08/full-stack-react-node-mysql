import { NavLink } from "react-router-dom";

const Sidebar = () => {

  return (
    <div className="w-64 bg-gray-200 min-h-screen text-gray-800">
      <h2 className="text-2xl font-bold text-center py-5 mb-6">
        Dashboard
      </h2>

      <nav className="flex flex-col gap-2 text-start">
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `w-full text-center px-4 py-2 font-semibold 
             ${isActive ? "bg-gray-400 text-white " : "hover:bg-gray-300"}`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/dashboard/users"
          className={({ isActive }) =>
            `w-full text-center px-4 py-2 font-semibold
             ${isActive ? "bg-gray-400 text-white " : "hover:bg-gray-300"}`
          }
        >
          All Users
        </NavLink>

        <NavLink
          to="/dashboard/all-ideas"
          className={({ isActive }) =>
            `w-full text-center px-4 py-2 font-semibold
             ${isActive ? "bg-gray-400 text-white" : "hover:bg-gray-300"}`
          }
        >
          All Ideas
        </NavLink>

        <NavLink
          to="/dashboard/settings"
          className={({ isActive }) =>
            `w-full text-center px-4 py-2 font-semibold
             ${isActive ? "bg-gray-400 text-white" : "hover:bg-gray-300"}`
          }
        >
          Settings
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
