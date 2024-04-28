import BRANCH from "@/model/branchData";
import { NextResponse, NextRequest } from "next/server";

import { connectToDB } from "@/lib/database/connectToDB";
import STAFF from "@/model/staffs";
// import { parse } from "next/dist/build/swc";

/// /api/admins/branch/staffs
export const POST = async (Request) => {
  try {
    const body = await Request.json();
    const { name, position, salary, phone, address, bonus, dayOff, email } =
      body;
    console.log(
      "👮‍♀️ Creating a new Staff = ",
      name,
      position,
      phone,
      address,
      salary,
      bonus,
      dayOff,
      email
    );
    await connectToDB();
    const branch = await BRANCH.findOne({ manager: email }); //check whether the branch was exist with given mananger email

    if (!branch) {
      return NextResponse.json(
        { error: "Branch doesn't exist." },
        { status: 404 }
      );
    }
    const newStaff = new STAFF({
      name: name,
      position: position,
      salary: salary,
      bonus: bonus,
      dayOff: dayOff,
      phone: phone,
      address: address,
      branch: branch._id,
    });
    const createdStaff = await newStaff.save();

    console.log(createdStaff);
    return NextResponse.json({
      meta: {
        status: 201,
        branch: createdStaff.branch,
        productId: createdStaff._id,
      },
      data: { createdStaff },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error in Creating Staff", error: error },
      { status: 500 }
    );
  }
};

export const PATCH = async (Request) => {
  try {
    const body = await Request.json();
    const {
      _id,
      name,
      position,
      salary,
      phone,
      address,
      bonus,
      dayOff,
      email,
    } = body;
    console.log(
      "👮‍♀️ Updating Staff = ",
      _id,
      name,
      position,
      phone,
      address,
      salary,
      bonus,
      dayOff,
      email
    );
    await connectToDB();

    const existingStaff = await STAFF.findById({ _id: _id });
    // console.log("🚀 ~ PATCH ~ existingBranch:", existingBranch)

    if (!existingStaff) {
      return NextResponse.json(
        { error: "Staff didn't found." },
        { status: 401 }
      );
    }

    const updateFields = {};

    /// This filter unmatched values before actual update to db
    for (const key in body) {
      if (body.hasOwnProperty(key) || existingStaff.hasOwnProperty(key)) {
        if (existingStaff[key] !== body[key]) {
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

    const updatedStaff = await STAFF.findOneAndUpdate(
      { _id: _id },
      { $set: updateFields },
      { new: true }
    );
    console.log("🚀 ~ PATCH ~ updateFields:", updateFields);
    console.log("🚀 ~ PATCH ~ updatedStaff:", updatedStaff);

    if (!updatedStaff) {
      return NextResponse.json(
        { error: "Product not found." },
        { status: 404 }
      );
    }

    // console.log(createdBranch);
    return NextResponse.json({
      meta: {
        status: 201,
        branch: updatedStaff.branch,
        productId: updatedStaff._id,
      },
      data: { updatedStaff },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Internal Server Error in product route while updating",
        error: error,
      },
      { status: 500 }
    );
  }
};

///// Get Products Data with pagination
//// `/api/admins/branch/staffs?branch=${branch}&page=${page}&limit=${limit}`
export const GET = async (req, res) => {
  try {
    const searchParams = req.nextUrl.searchParams;

    // Extract query parameters
    const search = searchParams.get("search");
    const branch = searchParams.get("branch");
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");

    // Connect to the database
    await connectToDB();
    console.log(
      "🚀 ~ GET ~ search:",
      search,
      "Branch: ",
      branch,
      "Page:",
      page,
      "limit:",
      limit
    );

    // Count total documents
    const totalStaffs = await STAFF.countDocuments({ branch });

    // Validate pagination
    if ((page - 1) * limit > totalStaffs) {
      return NextResponse.json({
        status: "204",
        message: "Failed to retrieve staff data.",
        errorCode: 204,
        details: {
          error: "Staff doesn't exist",
        },
      });
    }

    // Construct query
    let query = { branch };
    if (search) {
      query = {
        $and: [{ branch }, { name: { $regex: search, $options: "i" } }],
      };
    }

    const staffs = await STAFF.find(query)
      .skip(search ? 0 : (page - 1) * limit)
      .limit(search ? undefined : parseInt(limit));

    console.log("🚀 ~ GET ~ Staff query:", query);

    // Return response
    return NextResponse.json({
      meta: {
        status: 201,
        message:
          "If this was a search operation, page and limit will be neglected.",
        ...(!search == undefined && { page: page }),
        ...(!search == undefined && { count: limit }),
        totalStaffs,
        branchId: branch,
      },
      data: { staffs },
    });
  } catch (error) {
    throw error;
  }
};

export const DELETE = async (req) => {
  console.log("💂💂💂");
  try {
    const searchParams = req.nextUrl.searchParams;

    // Extract query parameters
    const _id = searchParams.get("id");


    console.log("💂 Removing Staff", _id);
    await connectToDB();

    const deletedStaff = await STAFF.findByIdAndDelete(_id);
    console.log("🚀 ~ PATCH ~ deletedStaff:", deletedStaff);

    if (!deletedStaff) {
      return NextResponse.json({ error: "Staff not found." }, { status: 404 });
    }

    return NextResponse.json({
      meta: {
        status: 204,
        message: "staffRemoved",
      },
      data: deletedStaff,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Internal Server Error in remove staff route while updating",
        error: error,
      },
      { status: 500 }
    );
  }
};