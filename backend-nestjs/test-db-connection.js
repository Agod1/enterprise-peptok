const { ConfigService } = require("@nestjs/config");

// Test the TypeORM configuration
const configService = new ConfigService({
  DATABASE_HOST: "localhost",
  DATABASE_PORT: 5432,
  DATABASE_USER: "peptok_user",
  DATABASE_PASSWORD: "peptok_password",
  DATABASE_NAME: "peptok_dev",
  NODE_ENV: "development",
});

// Import and test the configuration function
const { createTypeOrmConfig } = require("./dist/config/typeorm.config");

try {
  const config = createTypeOrmConfig(configService);
  console.log("✅ TypeORM Configuration Test Passed");
  console.log("Database Type:", config.type);
  console.log("Database Host:", config.host);
  console.log("Database Port:", config.port);
  console.log("Database Name:", config.database);
  console.log("Database User:", config.username);
  console.log("Entities Count:", config.entities.length);
  console.log("Synchronize:", config.synchronize);
} catch (error) {
  console.error("❌ TypeORM Configuration Test Failed:", error.message);
  process.exit(1);
}
