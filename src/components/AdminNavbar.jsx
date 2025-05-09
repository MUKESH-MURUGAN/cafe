import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/Firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { SiCoffeescript } from "react-icons/si";

const AdminNavbar = () => {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setShowDropdown(false);
    alert("Admin logged out...");
    navigate("/login");
  };

  return (
    <div className="fixed w-full z-10">
      <div className="flex justify-between items-center p-5 lg:px-32 px-5 bg-black text-white shadow-md">
        <div className="flex items-center gap-2 cursor-pointer">
          <SiCoffeescript size={25} />
          <h1 className="text-xl font-semibold">Admin Panel</h1>
        </div>

        <div className="flex items-center gap-4">
          {user && (
            <div className="relative">
              <div
                onClick={() => setShowDropdown((prev) => !prev)}
                className="bg-orange-200 text-orange-800 w-10 h-10 flex items-center justify-center rounded-full font-bold text-lg cursor-pointer"
              >
                {user.email.charAt(0).toUpperCase()}
              </div>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-28 bg-white border rounded shadow-md z-50">
                  <button
                    onClick={handleLogout}
                    className="w-full text-white bg-black text-left px-4 py-2 text-sm hover:bg-gray-800"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
