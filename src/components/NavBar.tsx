import logo from "../assets/logo.png";
import search_icon from "../assets/search_icon.svg";
import bell_icon from "../assets/bell_icon.svg";
import profile_icon from "../assets/profile_img.png";
import dropDown_icon from "../assets/caret_icon.svg";
import { useEffect, useRef, useState } from "react";
import { logout, auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { onAuthStateChanged, User } from "firebase/auth";

const NavBar = () => {
  const navRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null); //for user login state
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY >= 80) {
        navRef.current?.classList.add("bg-black", "bg-opacity-90");
      } else {
        navRef.current?.classList.remove("bg-black", "bg-opacity-90");
      }
    });
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      <div
        ref={navRef}
        className="flex flex-row fixed w-screen z-50 text-white justify-between gap-3 items-center p-1 md:p-3 px-3 lg:px-10 transition-colors duration-500"
      >
        <div className="flex flex-row justify-evenly gap-10 items-center">
          <Link to="/">
            <img src={logo} alt="Logo" className="w-30" />
          </Link>
          <ul className="hidden md:flex md:gap-4 lg:gap-10">
            <Link to="/">Home</Link>
            <Link to="/tvShows">TV Shows</Link>
            <Link to="/movies">Movies</Link>
            <Link to="/language">By Language</Link>
          </ul>
        </div>
        <div className="flex flex-row justify-between gap-3 lg:gap-5 items-center">
          <img src={search_icon} alt="Search" className="w-4" />
          <Link to="/children" className="hidden md:flex">
            Children
          </Link>
          <img src={bell_icon} alt="Bell" className="w-4" />

          {/* Login/Logout Toggle */}
          {currentUser ? (
            <div className="flex flex-row gap-1 relative group">
              <img src={profile_icon} alt="Profile"
                className="cursor-pointer"/>
              <img src={dropDown_icon} alt="Dropdown"
                className="w-3 cursor-pointer"/>
              <div className="absolute right-0 top-8 p-3 w-max hidden group-hover:block hover:block">
                <p onClick={handleLogout} className="hover:underline cursor-pointer text-[13px]">
                  Sign Out Of Netflix
                </p>
              </div>
            </div>
          ) : (
            <button onClick={() => navigate("/login")}
              className="text-sm px-4 py-2 bg-red-700 cursor-pointer rounded hover:bg-red-800 transition">
              Login
            </button>
          )}

          <button onClick={toggleMenu}
            className="md:hidden cursor-pointer ml-2 text-white text-2xl">
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="fixed top-[40px] left-0 w-full bg-black text-neutral-300 flex flex-col px-6 py-4 space-y-4 z-40 md:hidden transition-all duration-300">
          <Link to="/" className="hover:text-white">
            Home
          </Link>
          <Link to="/tvShows" className="hover:text-white">
            TV Shows
          </Link>
          <Link to="/movies" className="hover:text-white">
            Movies
          </Link>
          <Link to="/language" className="hover:text-white">
            By Language
          </Link>
          <Link to="/children" className="hover:text-white">
            Children
          </Link>
        </div>
      )}
    </>
  );
};

export default NavBar;
