"use client";
import { DataContext } from "@/Context/DataContext";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import { redirect } from "next/navigation";
import React, { useContext, useEffect } from "react";

const Setting = () => {
  const { user, error, isLoading } = useUser();
  const { data, isOpen, toggleSideBar } = useContext(DataContext);

  useEffect(() => {
    if (!user) {
      return redirect("/login");
    }
  }, [user]);

  const info = {
    companyName: "Your Company Name",
      street: "123 Main Street",
      city: "Anytown",
      state: "Example State",
      country: "Myanmar",
      phone: "+1234567890",
      email: "info@example.com",
      website: "yourwebsite.com",
  };

  return (
    <div className="w-full h-full">
      {user && (
        <div
          id="user"
          className="flex flex-col group focus-within: transition-all absolute top-50 right-10 hover:block content-end w-max ml-auto mr-7 gap-3 px-4 py-2 pr-7 rounded-lg bg-background shadow-md shadow-secondary"
        >
          <div class="max-w-lg mx-auto">
            <details className=" outline-none ring-0">
              <summary class="flex gap-2 items-center justify-end text-sm leading-6 text-slate-900 ring-0 font-semibold select-none">
                <Image
                  width={40}
                  height={40}
                  className="rounded-sm"
                  src={`${user?.picture}`}
                  alt="user-profile"
                />
                <p className="font-bold my-2 text-lg text-active">{user?.name}</p>
              </summary>
              <div class="mt-3 leading-6 text-active text-md font-semibold">
                <p>Email: {user?.email}</p>
              </div>
            </details>
          </div>
        </div>
      )}
      <div
        id="settings"
        className="flex mt-20 justify-evenly w-full h-auto min-h-[75vh] p-5"
      >
        <div id="leftCol" className="w-1/2 p-3 border-r-2 border-active">
          <div id="editDetails" className="w-full h-[75%]">
            <span className="font-bold my-2 text-3xl text-active">Setting</span>
            <div id="info" className=" grid grid-cols-2 mt-5">
              <span className="font-bold my-2 text-xl text-active">
                Company Name:
              </span>
              <span className="font-bold my-2 text-xl text-active">
                {info.companyName}
              </span>{" "}
              <span className="font-bold my-2 text-xl text-active">Country:</span>
              <span className="font-bold my-2 text-xl text-active">
                {info.country}
              </span>{" "}
              <span className="font-bold my-2 text-xl text-active">State:</span>
              <span className="font-bold my-2 text-xl text-active">
                {info.state}
              </span>{" "}
              <span className="font-bold my-2 text-xl text-active">City:</span>
              <span className="font-bold my-2 text-xl text-active">
                {info.city}
              </span>{" "}
              <span className="font-bold my-2 text-xl text-active">Street:</span>
              <span className="font-bold my-2 text-xl text-active">
                {info.street}
              </span>{" "}
              <span className="font-bold my-2 text-xl text-active">Website:</span>
              <span className="font-bold my-2 text-xl text-active">
                {info.website}
              </span>{" "}
              <span className="font-bold my-2 text-xl text-active">Email:</span>
              <span className="font-bold my-2 text-xl text-active">
                {info.email}
              </span>{" "}
              <span className="font-bold my-2 text-xl text-active">Phone:</span>
              <span className="font-bold my-2 text-xl text-active">
                {info.phone}
              </span>
            </div>
            <div className="w-full flex">
                {" "}
                <button
                  className="bg-active text-background ml-auto text-sm p-2.5 px-3 my-5 rounded-lg font-bold"
                  onClick={() => toggleSideBar("edit-branch")}
                >
                  Edit info
                </button>
              </div>
          </div>
          <div id="downloadData" className="w-full h-[15%] ">
            <button className="w-full h-full border-2 text-3xl text-primary border-active border-dashed rounded-lg cursor-pointer">
              Download all data
            </button>
          </div>
        </div>
        <div
          id="rightCol"
          className="w-1/2 h-[75vh] flex flex-col justify-center items-center p-3 "
        >
          <p>AI Suggestion</p>
          <p>(Avaliable in future.)</p>
        </div>
      </div>
    </div>
  );
};

export default Setting;
