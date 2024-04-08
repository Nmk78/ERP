"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faUserFriends,
  faShop,
  faReceipt,
  faTags,
  faChartPie,
  faWarehouse,
  faUserShield,
  faGears,
  faSignOut,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { logOutHandler } from "../_lib/clientHandlers";

const SideBar = () => {
  const pathname = usePathname();

  const [loading, setLoading] = useState(false);

  const logOut = async () => {
    setLoading(true);
    await logOutHandler();
    setLoading(false);
  };

  return (
    <div className=" min-w-36 w-auto min-h-[80vh] h-auto mr-5 flex flex-col drop-shadow-md shadow-md shadow-secondary rounded-lg p-5 select-none">
      {/* <Link href="/" className="w-full h-full"> */}
        {" "}
        <Image
          src="/assets/logo.png"
          width={100}
          height={100}
          alt="logo"
          className="w-full h-full"
        />
      {/* </Link> */}
      <div className="w-full flex flex-col gap-1 mt-10">
        <Link href="/"
          className={`flex items-center pr-8 pl-2 py-2 rounded-lg hover:shadow-md ${
            pathname === "/" || pathname === ""
              ? "shadow-md shadow-secondary text-active"
              : ""
          }`}
        >
          {" "}
          <FontAwesomeIcon
            icon={faChartLine}
            height={22}
            width={22}
            alt="dashboard"
          />
          <span className="text-xl ml-2" >
            Dashboard
          </span>
        </Link>{" "}
        <Link  href="/staffs"
          className={`flex items-center pr-8 pl-2 py-2 rounded-lg hover:shadow-md ${
            pathname === "/staffs"
              ? "shadow-md shadow-secondary text-active"
              : ""
          }`}
        >
          {" "}
          <FontAwesomeIcon
            icon={faUserFriends}
            height={22}
            width={22}
            alt="staffs"
          />
          <span className="text-xl ml-2">
            Staffs
          </span>
        </Link>{" "}
        <Link href="/branches"
          className={`flex items-center pr-8 pl-2 py-2 rounded-lg hover:shadow-md ${
            pathname === "/branches"
              ? "shadow-md shadow-secondary text-active"
              : ""
          }`}
        >
          <FontAwesomeIcon
            icon={faShop}
            height={22}
            width={22}
            alt="branches"
          />
          <span className="text-xl ml-2">
            Branches
          </span>
        </Link>{" "}
        <Link  href="/invoices"
          className={`flex items-center pr-8 pl-2 py-2 rounded-lg hover:shadow-md ${
            pathname === "/invoices"
              ? "shadow-md shadow-secondary text-active"
              : ""
          }`}
        >
          <FontAwesomeIcon
            icon={faReceipt}
            height={22}
            width={22}
            alt="Invoices"
          />
          <span className="text-xl ml-2">
            Invoices
          </span>
        </Link>{" "}
        <Link  href="/products"
          className={`flex items-center pr-8 pl-2 py-2 rounded-lg hover:shadow-md ${
            pathname === "/products"
              ? "shadow-md shadow-secondary text-active"
              : ""
          }`}
        >
          <FontAwesomeIcon
            icon={faTags}
            height={22}
            width={22}
            alt="products"
          />
          <span className="text-xl ml-2">
            Products
          </span>
        </Link>{" "}
        <Link href="/report"
          className={`flex items-center pr-8 pl-2 py-2 rounded-lg hover:shadow-md ${
            pathname === "/report"
              ? "shadow-md shadow-secondary text-active"
              : ""
          }`}
        >
          <FontAwesomeIcon
            icon={faChartPie}
            height={22}
            width={22}
            alt="report"
          />
          <span className="text-xl ml-2" >
            Report
          </span>
        </Link>{" "}
        <Link  href="/warehouse"
          className={`flex items-center pr-8 pl-2 py-2 rounded-lg hover:shadow-md ${
            pathname === "/warehouse"
              ? "shadow-md shadow-secondary text-active"
              : ""
          }`}
        >
          <FontAwesomeIcon
            icon={faWarehouse}
            height={22}
            width={22}
            alt="faWarehouse"
          />
          <span className="text-xl ml-2">
            Warehouse
          </span>
        </Link>{" "}
        <Link  href="/admin"
          className={`flex items-center pr-8 pl-2 py-2 rounded-lg hover:shadow-md ${
            pathname === "/admin"
              ? "shadow-md shadow-secondary text-active"
              : ""
          }`}
        >
          <FontAwesomeIcon
            icon={faUserShield}
            height={22}
            width={22}
            alt="faUserShield"
          />
          <span className="text-xl ml-2">
            Admin
          </span>
        </Link>{" "}
        <Link href="/settings"
          className={`flex items-center pr-8 pl-2 py-2 rounded-lg hover:shadow-md ${
            pathname === "/settings"
              ? "shadow-md shadow-secondary text-active"
              : ""
          }`}
        >
          <FontAwesomeIcon
            icon={faGears}
            height={22}
            width={22}
            alt="Settings"
          />
          <span className="text-xl ml-2" >
            Settings
          </span>
        </Link>{" "}
      </div>
      <div
        id="logout"
        className="mt-auto w-auto py-3 px-2 flex justify-center items-center rounded-xl text-primary hover:text-warning hover:font-bold"
      >
        <button
          disabled={loading}
          className="flex text-xl items-center"
          onClick={logOut}
        >
          {" "}
          <FontAwesomeIcon
            icon={loading ? faSpinner : faSignOut}
            height={22}
            width={22}
            alt="faSignOut"
            className="mr-2"
          />
          {loading ? "Logging Out." : "Logout"}
        </button>
      </div>
    </div>
  );
};

export default SideBar;
