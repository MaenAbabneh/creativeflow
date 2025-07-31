"use server";

import { ActionResponse, ErrorResponse, Users } from "@/types/global";
import { PaginatedSearchSchema } from "../validatoin";
import action from "../handler/action";
import { handleError } from "../handler/error";
import { FilterQuery } from "mongoose";
import { User } from "@/database";

export async function getAllUsers(
  params: PaginatedSearchParams
): Promise<ActionResponse<{ users: Users[]; isNext: boolean }>> {
  const validationResult = await action({
    params,
    schema: PaginatedSearchSchema,
  });
  if (validationResult instanceof Error) {
    return handleError(validationResult.error) as ErrorResponse;
  }
  const {page=1 , pageSize=10, query="", filter="", sort=""} = params!;

  const skip = (Number(page) - 1) * pageSize;
  const limit = pageSize;

  const filterQuery: FilterQuery<typeof User> = {};

  if (query) {
    filterQuery.$or = [
      { name: { $regex: query, $options: "i" }},
        { email: { $regex: query, $options: "i" }},
    ];
    }
    
    let sortCriteria = {};

    switch (filter) {
    case "newest":
      sortCriteria = { createdAt: -1 };
      break;
    case "oldest":
      sortCriteria = { createdAt: 1 };
      break;
    case "popular":
      sortCriteria = { reputation: -1 };
      break;
    default:
      sortCriteria = { createdAt: -1 };
      break;
    }
    
  try {
    const totalUsers = await User.countDocuments(filterQuery);

    const users = await User.find(filterQuery)
    .sort(sortCriteria)
    .skip(skip)
    .limit(limit);

    const isNext = totalUsers > skip + users.length;

     return {
      success: true,
      data: {
        users: JSON.parse(JSON.stringify(users)),
        isNext,
      },
    };

  } catch (error) {
    return handleError(error) as ErrorResponse;
    
  }

  
}
