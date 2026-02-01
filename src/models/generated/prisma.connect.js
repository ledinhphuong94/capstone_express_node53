import "dotenv/config";
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from './prisma/client.js';
import {DATABASE_HOST, DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME, DATABASE_PORT} from "../../common/constant/common.constant.js";

const adapter = new PrismaMariaDb({
  host: DATABASE_HOST,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  port: DATABASE_PORT,
  connectionLimit: 5
});
const prisma = new PrismaClient({ adapter });

export { prisma }


