import { useContext } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { FaCartShopping } from "react-icons/fa6";
import { useEffect } from "react";
import { CartContext } from "../../Context/CartContext";
import { IoPersonSharp } from "react-icons/io5";
import logo from "../../assets/freshcart-logo.svg";

export default function Navbar() {
  const { isLogin, setToken } = useContext(UserContext);
  const { numOfCartItems } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {}, [numOfCartItems]);

  function Logout() {
    setToken(null);
    navigate("/login");
  }

  const mainMenu = [
    { text: "Home", path: "/" },
    { text: "Cart", path: "/cart" },
    { text: "Wishlist", path: "/wishlist" },
    { text: "Products", path: "/products" },
    { text: "Categories", path: "/categories" },
    { text: "Brands", path: "/brands" },
  ];

  const authMenu = [
    { text: "Login", path: "/login" },
    { text: "Register", path: "/register" },
  ];

  const mobileMenu = isLogin ? [...mainMenu] : [...authMenu];

  return (
    <>
      <nav className="border-gray-200 bg-gray-100 fixed top-0 left-0 right-0 h-16 z-50 shadow-md">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between p-4 mx-auto relative">
          {/* Logo */}
          <div>
            <Link to={"/"}>
              <img
                src={logo}
                className="h-8 ms-8"
                alt="Freshcart Logo"
              />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          {/* Main Menu - Centered (Desktop) */}
          {isLogin && (
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 md:w-auto">
              <ul className=" flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-100 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
                {mainMenu.map(({ text, path }) => (
                  <li key={path}>
                    <NavLink
                      to={path}
                      className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-600 md:p-0"
                    >
                      {text}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Auth Menu - Right Side (Desktop) */}
          <div className="hidden md:flex space-x-4">
            {!isLogin &&
              authMenu.map(({ text, path }) => (
                <NavLink
                  key={path}
                  to={path}
                  className="py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-600 md:p-0"
                >
                  {text}
                </NavLink>
              ))}

            {isLogin && (
              <div className="flex justify-center items-center">
                <button className="me-2"></button>

                <ul>
                  <button
                    id="dropdownNavbarLink"
                    data-dropdown-toggle="dropdownNavbar"
                    className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 md:w-auto "
                  >
                    <IoPersonSharp className="text-2xl md:hover:text-green-600 cursor-pointer" />
                    <svg
                      className="w-2.5 h-2.5 me-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>

                  <div
                    id="dropdownNavbar"
                    className="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 "
                  >
                    <ul
                      className="py-2 text-sm text-gray-700 "
                      aria-labelledby="dropdownLargeButton"
                    >
                      <li>
                        <Link
                          to={"/allorders"}
                          className="block px-4 py-2 hover:bg-gray-100 "
                        >
                          My Orders
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={"/Forgot"}
                          className="block px-4 py-2 hover:bg-gray-100 "
                        >
                          Change Password
                        </Link>
                      </li>
                    </ul>
                  </div>
                </ul>

                <button className="relative me-5">
                  <Link to={"/cart"}>
                    <FaCartShopping className="text-2xl md:hover:text-green-600 cursor-pointer" />
                  </Link>

                  {numOfCartItems > 0 && (
                    <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border border-white rounded-full -top-5 -end-4 ">
                      {numOfCartItems}
                    </div>
                  )}
                </button>
                <button
                  className="cursor-pointer py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-600 md:p-0"
                  onClick={() => Logout()}
                >
                  Log Out
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu (Dropdown) */}
          <div className="hidden w-full md:hidden" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-100">
              <hr />
              <li>
                <NavLink
                  to={"/allorders"}
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-200"
                >
                  My Orders
                </NavLink>
              </li>
              <hr />
              {mobileMenu.map(({ text, path }) => (
                <li key={path}>
                  <NavLink
                    to={path}
                    className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-200"
                  >
                    {text}
                  </NavLink>
                </li>
              ))}
              {isLogin && (
                <li>
                  <button
                    className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-200 w-full text-left"
                    onClick={Logout}
                  >
                    Log Out
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
