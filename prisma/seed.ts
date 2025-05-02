// prisma/seed.ts

import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Test user with known credentials (email: test@example.com, password: password123)
  const testUser = await prisma.user.create({
    data: {
      email: "test@example.com",
      password: await bcrypt.hash("password123", 10),
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

  // Additional users
  const users = [
    {
      email: "alice@example.com",
      password: await bcrypt.hash("alice123", 10),
      name: "Alice Johnson",
      city: "San Francisco",
      hometown: "Seattle",
      jobTitle: "Product Manager",
      company: "Tech Corp",
      latestTrip: "Tokyo",
      favoriteActivity: "Hiking",
      personalUpdate: "Just got promoted!",
      profilePic: "https://example.com/alice.png",
      birthday: new Date("1990-03-20"),
    },
    {
      email: "bob@example.com",
      password: await bcrypt.hash("bob123", 10),
      name: "Bob Smith",
      city: "New York",
      hometown: "Boston",
      jobTitle: "Data Scientist",
      company: "Data Insights",
      latestTrip: "Paris",
      favoriteActivity: "Photography",
      personalUpdate: "Started a new project",
      profilePic: "https://example.com/bob.png",
      birthday: new Date("1992-07-10"),
    },
    {
      email: "carol@example.com",
      password: await bcrypt.hash("carol123", 10),
      name: "Carol Williams",
      city: "Austin",
      hometown: "Houston",
      jobTitle: "UX Designer",
      company: "Design Studio",
      latestTrip: "Barcelona",
      favoriteActivity: "Yoga",
      personalUpdate: "Learning Spanish",
      profilePic: "https://example.com/carol.png",
      birthday: new Date("1995-11-30"),
    },
  ];

  for (const userData of users) {
    await prisma.user.create({
      data: userData,
    });
  }

  console.log("Created test user:", testUser);
  console.log("Created additional users");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
