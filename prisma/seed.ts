// prisma/seed.ts

import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("password123", 10); // Hash "password123"

  const user = await prisma.user.create({
    data: {
      email: "testuser@example.com",
      password: password,
      name: "Test User",
      city: "Chicago",
      hometown: "Dallas",
      jobTitle: "Software Engineer",
      company: "Test Company",
      latestTrip: "New York",
      favoriteActivity: "Pottery",
      personalUpdate: "Learning how to cook!",
      profilePic: "https://example.com/profile-pic.png",
      birthday: new Date("1998-05-15"),
    },
  });

  console.log("Created user:", user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
