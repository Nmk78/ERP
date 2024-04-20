import BRANCH from "@/model/branchData";
import ADMIN from "@/model/admin";
import { NextResponse, NextRequest } from "next/server";

import { connectToDB } from "@/lib/database/connectToDB";

export const POST = async (Request) => {
  try {
    const body = await Request.json();
    const {
      companyName,
      countryName,
      stateName,
      cityName,
      streetName,
      websiteUrl,
      email,
      branchEmail,
      phone,
    } = body;
    console.log(
      "😐",
      companyName,
      countryName,
      stateName,
      cityName,
      streetName,
      websiteUrl,
      email,
      phone,
      branchEmail
    );
    await connectToDB();
    const admin = await ADMIN.findOne({ email: email });

    if (!admin) {
      return NextResponse.json(
        { error: "Admin doesn't exist." },
        { status: 404 }
      );
    }
    const newBranch = new BRANCH({
      id: admin._id,
      companyName: companyName,
      cityName: cityName,
      countryName: countryName,
      email: branchEmail,
      phone: phone,
      stateName: stateName,
      streetName: streetName,
      websiteUrl: websiteUrl,
      manager: email,
    });
    const createdBranch = await newBranch.save();

    console.log(createdBranch);
    return NextResponse.json(
      JSON.stringify({
        meta: {
          status: 201,
          manager: createdBranch.manager,
          branchId: createdBranch._id,
        },
        data: { createdBranch },
      })
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error in Branch route", error: error },
      { status: 500 }
    );
  }
};

export const PATCH = async (Request) => {
  try {
    const body = await Request.json();
    const {
      companyName,
      countryName,
      stateName,
      cityName,
      streetName,
      websiteUrl,
      email,
      branchEmail,
      phone,
    } = body;
    console.log(
      "😐",
      companyName,
      countryName,
      stateName,
      cityName,
      streetName,
      websiteUrl,
      email,
      phone,
      branchEmail
    );
    await connectToDB();
    const admin = await ADMIN.findOne({ email: email });
    const existingBranch = await BRANCH.findOne({ manager: email });
    // console.log("🚀 ~ PATCH ~ existingBranch:", existingBranch)

    if (!admin) {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 }
      );
    }

    const updateFields = {};

    /// This filter unmatched values before actual update to db
    for (const key in body) {
      if (body.hasOwnProperty(key) || existingBranch.hasOwnProperty(key)) {

        if (existingBranch[key] !== body[key]) {
          updateFields[key] = body[key];
        }
      }
    }

    if (Object.keys(updateFields).length === 0) {
      return NextResponse.json(
        { error: "There is no updated fields." },
        { status: 422 }
      );
    }

    const updatedBranch = await BRANCH.findOneAndUpdate(
      { manager: email },
      { $set: updateFields },
      { new: true }
    );

    if (!updatedBranch) {
      return NextResponse.json(
        { error: "Branch not found." },
        { status: 404 }
      );
    }


    // console.log(createdBranch);
    return NextResponse.json(
      JSON.stringify({
        meta: {
          status: 201,
          manager: updatedBranch.manager,
          branchId: updatedBranch._id,
        },
        data: { updatedBranch },
      })
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error in Branch route while updating", error: error },
      { status: 500 }
    );
  }
};

////  api/admins/branch?email="email"
export const GET = async (req, Request, Response) => {
  const searchParams = req.nextUrl.searchParams;
  const email = searchParams.get("email");

  try {
    await connectToDB();
    const branch = await BRANCH.findOne({ manager: email });

    if(!branch){
      return NextResponse.json({
        "status": "204",
        "message": "Failed to retrieve branch data",
        "errorCode": 204,
        "details": {
          "error": "Branch doesn't exist",
        }
      }
      )
    }
    return NextResponse.json({
      meta: {
        status: 201,
        manager: branch?.manager,
        branchId: branch._id,
      },
      data: {
        branch,
      },
    });
  } catch (error) {
    throw error;
  }
};