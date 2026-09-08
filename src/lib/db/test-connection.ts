import { prisma } from "./prisma";

async function testDatabaseConnection() {
  console.log("--------------------------------------------------");
  console.log("Checking Database Connection (Hostinger MySQL)...");
  console.log("--------------------------------------------------");

  try {
    const startTime = Date.now();
    await prisma.$connect();
    const duration = Date.now() - startTime;
    console.log(`[SUCCESS] Connected to database in ${duration}ms.`);

    // Check existing tables without modifying data
    const tables: Array<{ [key: string]: string }> = await prisma.$queryRaw`SHOW TABLES;`;
    console.log(`[INFO] Existing tables count: ${tables.length}`);

    if (tables.length === 0) {
      console.log("[INFO] Database is currently empty (ready for initial migration/push).");
    } else {
      console.log("[INFO] Existing tables in database:");
      tables.forEach((t) => {
        const tableName = Object.values(t)[0];
        console.log(`  - ${tableName}`);
      });
    }

    console.log("--------------------------------------------------");
    console.log("[STATUS] Database connection verified successfully.");
    console.log("--------------------------------------------------");
  } catch (error: unknown) {
    console.error("--------------------------------------------------");
    console.error("[ERROR] Failed to connect to Hostinger MySQL database.");
    if (error instanceof Error) {
      console.error(`Reason: ${error.message}`);
    } else {
      console.error("Unknown error occurred during connection attempt.");
    }
    console.error("--------------------------------------------------");
    console.error("[DIAGNOSTIC HINTS]:");
    console.error("1. Ensure Hostinger Remote MySQL is enabled in hPanel.");
    console.error("2. Ensure '%' or your current IP is added to the Remote MySQL allowlist.");
    console.error("3. Ensure the host IP/domain in .env matches the Hostinger MySQL server.");
    console.error("--------------------------------------------------");
  } finally {
    await prisma.$disconnect();
  }
}

testDatabaseConnection();
