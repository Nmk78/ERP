import BRANCH from "@/model/branchData";
import ADMIN from "@/model/admin";
import { NextResponse, NextRequest } from "next/server";

import { connectToDB } from "@/lib/database/connectToDB";
import PRODUCT from "@/model/product";
// import { parse } from "next/dist/build/swc";

/// /api/admins/branch/products
export const POST = async (Request) => {
  try {
    const body = await Request.json();
    const { name, description, category, price, quantity, notes, email } = body;
    console.log(
      "👽 Creating a new Product = ",
      name,
      description,
      category,
      price,
      quantity,
      notes,
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
    const newProduct = new PRODUCT({
      name: name,
      description: description,
      category: category,
      price: price,
      quantity: quantity,
      notes: notes,
      branch: branch.id,
    });
    const createdProduct = await newProduct.save();

    console.log(createdProduct);
    return NextResponse.json({
      meta: {
        status: 201,
        branch: createdProduct.branch,
        productId: createdProduct._id,
      },
      data: { createdProduct },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error in Creating Branch", error: error },
      { status: 500 }
    );
  }
};

export const PATCH = async (Request) => {
  try {
    const body = await Request.json();
    const { _id, name, description, category, price, quantity, notes, email } =
      body;
    console.log(
      "👽 Updating a Product = ",
      _id,
      name,
      description,
      category,
      price,
      quantity,
      notes,
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
    const existingProduct = await PRODUCT.findById({ _id: _id });
    // console.log("🚀 ~ PATCH ~ existingBranch:", existingBranch)

    if (!existingProduct) {
      return NextResponse.json(
        { error: "Product didn't found." },
        { status: 401 }
      );
    }

    const updateFields = {};

    /// This filter unmatched values before actual update to db
    for (const key in body) {
      if (body.hasOwnProperty(key) || existingProduct.hasOwnProperty(key)) {
        if (existingProduct[key] !== body[key]) {
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

    const updatedProduct = await PRODUCT.findOneAndUpdate(
      { _id: _id },
      { $set: updateFields },
      { new: true }
    );
    console.log("🚀 ~ PATCH ~ updateFields:", updateFields);
    console.log("🚀 ~ PATCH ~ updatedProduct:", updatedProduct);

    if (!updatedProduct) {
      return NextResponse.json(
        { error: "Product not found." },
        { status: 404 }
      );
    }

    // console.log(createdBranch);
    return NextResponse.json({
      meta: {
        status: 201,
        branch: updatedProduct.branch,
        productId: updatedProduct._id,
      },
      data: { updatedProduct },
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
//// `/api/admins/branch/products?branch=${branch}&page=${page}&limit=${limit}`

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
  console.log("🚀 ~ GET ~ search:", search);

    // Count total documents
    const totalProducts = await PRODUCT.countDocuments({ branch });

    // Validate pagination
    if ((page - 1) * limit > totalProducts) {
      return NextResponse.json({
        status: "204",
        message: "Failed to retrieve product data.",
        errorCode: 204,
        details: {
          error: "Product doesn't exist",
        },
      });
    }

    // Construct query
    let query = { branch };
    if (search) {
      query = {
        $and: [
          { branch },
          { name: { $regex: search, $options: "i" } },

          {
            $or: [
              { name: { $regex: search, $options: "i" } },
              { description: { $regex: search, $options: "i" } },
              { category: { $regex: search, $options: "i" } },
              { notes: { $regex: search, $options: "i" } },
            ],
          },
        ],
      };
    }

    // Fetch products
    // const products = await PRODUCT.find(query)
    const products = await PRODUCT.find({
      branch: "66213e5a3b089febfa583dc8",
      $or: [
        { name: { $regex: search, $options: "i" } },
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ],
    })
      .skip(search ? 0 : (page - 1) * limit)
      .limit(search  ? undefined : parseInt(limit));


    // Return response
    return NextResponse.json({
      meta: {
        status: 201,
        message:
          "If this was a search operation, page and limit will be neglected.",
        ...(!search  && { page: page }),
        ...(!search && { count: limit }),
        totalProducts,
        branchId: branch,
      },
      data: { products },
    });
  } catch (error) {
    throw error;
  }
};
