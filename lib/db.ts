import { PrismaClient } from "@prisma/client";

// Required due to next.js's hot reload
declare global
{
  var prisma: PrismaClient | undefined;
}

export const db: PrismaClient = globalThis.prisma || new PrismaClient();

if ( process.env.NODE_ENV !== "production" )
  globalThis.prisma = db;