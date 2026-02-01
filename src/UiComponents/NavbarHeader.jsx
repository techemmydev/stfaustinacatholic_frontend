import React from "react";
import logo from "../assets/images/stfaustinaimage.png";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  Bars3Icon,
  // BellIcon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router";

/* ------------------ USER (optional) ------------------ */
// const user = {
//   name: "Tom Cook",
//   email: "tom@example.com",
//   imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
// };

/* ------------------ NAV LINKS ------------------ */
const navLinks = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  {
    label: "Sacraments",
    path: "/sacraments",
    children: [
      { label: "All Sacraments", path: "/sacraments" },
      { label: "Baptism", path: "/sacraments/baptism" },
      { label: "First Communion", path: "/sacraments/first-communion" },
      { label: "Confirmation", path: "/sacraments/confirmation" },
      { label: "Confession", path: "/sacraments/confession" },
      { label: "Wedding", path: "/sacraments/wedding" },
    ],
  },
  { label: "Mass Schedule", path: "/mass-schedule" },
  { label: "Sermons", path: "/sermons" },
  { label: "Contact", path: "/contact" },
  { label: "Donate", path: "/donate" },
  ,
];

const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

/* ------------------ HELPERS ------------------ */
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function useNavigation() {
  const location = useLocation();

  return navLinks.map((item) => ({
    ...item,
    current:
      item.path === "/"
        ? location.pathname === "/"
        : location.pathname.startsWith(item.path),
  }));
}

/* ------------------ COMPONENT ------------------ */
export default function NavbarHeader() {
  const navigation = useNavigation();

  return (
    <div className="min-h-full">
      <Disclosure
        as="nav"
        className="fixed top-0 left-0 w-full bg-gray-800 z-50 shadow-md"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 lg:py-5">
          <div className="flex h-16 items-center justify-between">
            {/* ---------------- LOGO ---------------- */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-3">
                <img
                  src={logo}
                  alt="St. Faustina Parish Catholic Church"
                  className="h-15 w-auto"
                />
                <span className="hidden sm:block text-white font-semibold text-sm leading-tight">
                  St. Faustina Parish
                  <br />
                  Catholic Church
                </span>
              </Link>

              {/* ---------------- DESKTOP NAV ---------------- */}
              <div className="hidden md:block">
                <div className="ml-10 flex items-center space-x-4">
                  {navigation.map((item) => {
                    if (item.label === "Donate") {
                      return (
                        <Link
                          key={item.label}
                          to={item.path}
                          className="ml-4 rounded-full bg-yellow-500 px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-yellow-400 transition"
                        >
                          Donate
                        </Link>
                      );
                    }

                    if (item.children) {
                      return (
                        <Menu key={item.label} as="div" className="relative">
                          <MenuButton
                            className={classNames(
                              item.current
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-white/5 hover:text-white",
                              "inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium",
                            )}
                          >
                            {item.label}
                            <ChevronDownIcon className="size-4" />
                          </MenuButton>

                          <MenuItems className="absolute left-0 z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg">
                            {item.children.map((child) => (
                              <MenuItem key={child.path}>
                                <Link
                                  to={child.path}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  {child.label}
                                </Link>
                              </MenuItem>
                            ))}
                          </MenuItems>
                        </Menu>
                      );
                    }

                    return (
                      <Link
                        key={item.label}
                        to={item.path}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-white/5 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium",
                        )}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ---------------- RIGHT SIDE ---------------- */}
            <div className="hidden md:flex items-center gap-4">
              {/* Login */}
              <Link
                to="/admin-login"
                className="text-sm font-medium text-gray-300 hover:text-white transition"
              >
                Admin login
              </Link>

              {/* Sign Up */}
              <Link
                to="/register"
                className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100 transition"
              >
                Membership
              </Link>

              {/* Notification */}
              {/* <button className="rounded-full p-1 text-gray-400 hover:text-white">
                <BellIcon className="size-6" />
              </button> */}

              {/* Profile Menu */}
              {/* <Menu as="div" className="relative">
                <MenuButton className="flex items-center rounded-full">
                  <img
                    src={user.imageUrl}
                    alt="User profile"
                    className="size-8 rounded-full"
                  />
                </MenuButton>

                <MenuItems className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg">
                  {userNavigation.map((item) => (
                    <MenuItem key={item.name}>
                      <a
                        href={item.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {item.name}
                      </a>
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu> */}
            </div>

            {/* ---------------- MOBILE BUTTON ---------------- */}
            <div className="-mr-2 flex md:hidden">
              <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-white">
                <Bars3Icon className="block size-6 group-data-open:hidden" />
                <XMarkIcon className="hidden size-6 group-data-open:block" />
              </DisclosureButton>
            </div>
          </div>
        </div>

        {/* ---------------- MOBILE MENU ---------------- */}
        <DisclosurePanel className="md:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3">
            {navigation.map((item) =>
              item.children ? (
                <Disclosure key={item.label}>
                  <DisclosureButton className="flex w-full items-center justify-between rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white">
                    {item.label}
                    <ChevronDownIcon className="size-4" />
                  </DisclosureButton>

                  <DisclosurePanel className="pl-4 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className="block rounded-md px-3 py-2 text-sm text-gray-400 hover:bg-white/5 hover:text-white"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </DisclosurePanel>
                </Disclosure>
              ) : (
                <DisclosureButton
                  key={item.label}
                  as={Link}
                  to={item.path}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-white/5 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium",
                  )}
                >
                  {item.label}
                </DisclosureButton>
              ),
            )}

            {/* Mobile Auth Links */}
            <div className="border-t border-gray-700 mt-3 pt-3 space-y-2">
              <Link
                to="/admin-login"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>
    </div>
  );
}
