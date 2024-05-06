"use server";

import { Category } from "@prisma/client";
import { db } from "@/lib/db";

export const getCategories = (): Promise<Category[]> => db.category.findMany();