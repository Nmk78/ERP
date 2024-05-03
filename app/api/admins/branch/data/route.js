import { connectToDB } from "@/lib/database/connectToDB";
import BRANCH from "@/model/branchData";
import RECORD from "@/model/record";
import STAFF from "@/model/staffs";
import { getSession } from "@auth0/nextjs-auth0";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


// TODO D/M/Y
// TODO Sell Count cards
// TODO Settings 
// TODO PWS change
// TODO Yearly report

////////    api/admins/branch/data?id="_id"
export const GET = async (req, Request, Response) => {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  const branchId = new mongoose.Types.ObjectId(id);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // Adding 1 since January is 0-indexed

  // Construct the start date of the current year (January 1st)
  const startDate = new Date(currentYear, 0, 1); // Month is 0-indexed, so January is 0

  // Construct the end date of the current month (e.g., April 30th)
  const endDate = new Date(
    currentYear,
    currentMonth - 1,
    currentDate.getDate(),
    23,
    59,
    59,
    999
  ); // Subtracting 1 from currentMonth to get the correct index

  console.log(
    "📊 ~ GET ~ Summerizing data:",
    branchId,
    currentDate,
    currentYear,
    currentMonth,
    startDate,
    endDate
  );

  try {
    await connectToDB();

    let staffData = {};
    let dashboardData = {};

const res = new NextResponse();
const session = await getSession(res);

if(session.user.email != branchId){
  return NextResponse.json({
    status: 401,
    message: "Failed to Retrive.",
    errorCode: 401,
    details: {
      error: "Unauthourized",
    },
  });
}


    const branches = await BRANCH.findById(branchId).select("childBranch");
    console.log("🚀 ~ GET ~ branches:", branches);

    let b = branches.childBranch
    b.push(branchId)
    console.log("🚀 ~ GET ~ b:", b)
    await Promise.all(
      b.map(async (b) => {
        const branch = await BRANCH.findById(b).select("companyName").lean(); ////Remove _id

        const s = await STAFF.aggregate([
          {
            $match: {
              branch: b, // Filter by branch _id
            },
          },
          {
            $group: {
              _id: null,
              totalSalary: { $sum: "$salary" },
              totalBonus: { $sum: "$bonus" },
            },
          },
        ]);

        const d = await RECORD.aggregate([
          {
            $match: {
              branch: b,
              date: { $gte: startDate, $lte: endDate },
            },
          },
          {
            $group: {
              _id: { $month: "$date" },
              totalRecords: { $sum: 1 },
              totalSales: { $sum: "$totalPrice" },
            },
          },
          {
            $project: {
              _id: 0,
              month: "$_id",
              totalRecords: 1,
              totalSales: 1,
            },
          },
          {
            $sort: { month: 1 }
          }
        ]);
        
        // Generate all months between start and end dates
        const monthsArray = [];
        let currentDate = new Date(startDate);
        const endDateObj = new Date(endDate);
        while (currentDate <= endDateObj) {
          const currentMonth = currentDate.getMonth() + 1; // Months are zero-based in JavaScript Date objects
          monthsArray.push(currentMonth);
          currentDate.setMonth(currentDate.getMonth() + 1);
        }
        
        // Left outer join with existing aggregation results to include months with zero data
        const result = monthsArray.map(month => {
          const existingMonthData = d.find(item => item.month === month);
          return existingMonthData ? existingMonthData : { month: month, totalRecords: 0, totalSales: 0 };
        });
        
        

        let staff = { [branch.companyName]: { ...s } };
        let dashboard = { [branch.companyName]: { ...result } };

        Object.assign(staffData, staff); 
        Object.assign(dashboardData, dashboard); 
      })
    );

    if (!dashboardData) {
      return NextResponse.json({
        status: "204",
        message: "Failed to retrieve branch data",
        errorCode: 204,
        details: {
          error: "Branch doesn't exist",
        },
      });
    }
    return NextResponse.json({
      meta: {
        status: 201,
        branchId: id,
      },
      data: {
        dashboardData,
        staffData,
      },
    });
  } catch (error) {
    throw error;
  }
};
