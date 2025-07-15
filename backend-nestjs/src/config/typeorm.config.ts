import { DataSource } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { User } from "../modules/users/entities/user.entity";
import { Coach } from "../modules/coaches/entities/coach.entity";
import { Company } from "../modules/companies/entities/company.entity";
import { Session } from "../modules/sessions/entities/session.entity";
import { AdminSettings } from "../modules/admin/entities/admin-settings.entity";
import { Review } from "../modules/reviews/entities/review.entity";
import { MatchingRequest } from "../modules/matching/entities/matching-request.entity";
import { Match } from "../modules/matching/entities/match.entity";

export const createTypeOrmConfig = (configService: ConfigService) => {
  const isProduction = configService.get("NODE_ENV") === "production";
  const databaseUrl = configService.get("DATABASE_URL");

  // Use PostgreSQL in production or if DATABASE_URL is set, SQLite for development
  if (isProduction || databaseUrl) {
    return {
      type: "postgres" as const,
      host: configService.get("DATABASE_HOST", "localhost"),
      port: configService.get("DATABASE_PORT", 5432),
      username: configService.get("DATABASE_USER", "peptok_user"),
      password: configService.get("DATABASE_PASSWORD", "peptok_password"),
      database: configService.get("DATABASE_NAME", "peptok_dev"),
      entities: [
        User,
        Coach,
        Company,
        Session,
        AdminSettings,
        Review,
        MatchingRequest,
        Match,
      ],
      synchronize: true,
      logging: configService.get("NODE_ENV") === "development",
      migrations: ["dist/migrations/**/*.js"],
      subscribers: ["dist/subscribers/**/*.js"],
      ssl: isProduction ? { rejectUnauthorized: false } : false,
    };
  } else {
    // SQLite for local development
    return {
      type: "sqlite" as const,
      database: "nestjs-database.sqlite",
      entities: [
        User,
        Coach,
        Company,
        Session,
        AdminSettings,
        Review,
        MatchingRequest,
        Match,
      ],
      synchronize: true,
      logging: configService.get("NODE_ENV") === "development",
    };
  }
};

// For CLI usage
const configService = new ConfigService();
export default new DataSource(createTypeOrmConfig(configService));
