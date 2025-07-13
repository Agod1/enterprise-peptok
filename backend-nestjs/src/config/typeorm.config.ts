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

export const createTypeOrmConfig = (configService: ConfigService) => ({
  type: "postgres" as const,
  host: configService.get<string>("DB_HOST", "localhost"),
  port: configService.get<number>("DB_PORT", 5432),
  username: configService.get<string>("DB_USERNAME", "postgres"),
  password: configService.get<string>("DB_PASSWORD", "postgres"),
  database: configService.get<string>("DB_NAME", "peptok_coaching"),
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
  synchronize: configService.get<boolean>("DB_SYNCHRONIZE", false),
  logging: configService.get<boolean>("DB_LOGGING", false),
  ssl: configService.get<boolean>("DB_SSL", false)
    ? {
        rejectUnauthorized: false,
      }
    : false,
  migrations: ["dist/migrations/**/*.js"],
  subscribers: ["dist/subscribers/**/*.js"],
});

// For CLI usage
const configService = new ConfigService();
export default new DataSource(createTypeOrmConfig(configService));
