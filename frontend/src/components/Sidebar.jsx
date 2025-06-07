import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, HomeIcon, ShipWheelIcon, UsersIcon, XIcon } from "lucide-react";

const Sidebar = ({ isOpen, onClose }) => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      {/* Mobile Overlay */}
      <div className={`
        fixed inset-0 bg-black z-40 lg:hidden transition-opacity duration-300 ease-in-out
        ${isOpen ? 'opacity-50 pointer-events-auto' : 'opacity-0 pointer-events-none'}
      `}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <aside className={`
        w-72 bg-base-200 border-r border-base-300 flex-col h-screen z-50 transition-transform duration-300 ease-in-out
        lg:flex lg:sticky lg:top-0 lg:translate-x-0
        ${isOpen 
          ? 'fixed left-0 top-0 flex translate-x-0' 
          : 'fixed left-0 top-0 flex -translate-x-full lg:translate-x-0 lg:flex'
        }
      `}>
        <div className="p-5 border-b border-base-300">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5" onClick={onClose}>
              <ShipWheelIcon className="size-9 text-primary" />
              <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                Streamify
              </span>
            </Link>
            
            {/* Close button for mobile */}
            <button
              className="btn btn-ghost btn-sm lg:hidden"
              onClick={onClose}
              aria-label="Close sidebar"
            >
              <XIcon className="size-5" />
            </button>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <Link
            to="/"
            className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
              currentPath === "/" ? "btn-active" : ""
            }`}
            onClick={onClose}
          >
            <HomeIcon className="size-5 text-base-content opacity-70" />
            <span>Home</span>
          </Link>

          <Link
            to="/friends"
            className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
              currentPath === "/friends" ? "btn-active" : ""
            }`}
            onClick={onClose}
          >
            <UsersIcon className="size-5 text-base-content opacity-70" />
            <span>Friends</span>
          </Link>

          <Link
            to="/notifications"
            className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
              currentPath === "/notifications" ? "btn-active" : ""
            }`}
            onClick={onClose}
          >
            <BellIcon className="size-5 text-base-content opacity-70" />
            <span>Notifications</span>
          </Link>
        </nav>

        {/* USER PROFILE SECTION */}
        <div className="p-4 border-t border-base-300 mt-auto">
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img src={authUser?.profilePic} alt="User Avatar" />
              </div>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">{authUser?.fullName}</p>
              <p className="text-xs text-success flex items-center gap-1">
                <span className="size-2 rounded-full bg-success inline-block" />
                Online
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;