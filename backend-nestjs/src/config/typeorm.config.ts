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
  type: "sqlite" as const,
  database: "peptok_coaching.db",
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
  synchronize: true, // For testing only
  logging: false,
  migrations: ["dist/migrations/**/*.js"],
  subscribers: ["dist/subscribers/**/*.js"],
});

// For CLI usage
const configService = new ConfigService();
export default new DataSource(createTypeOrmConfig(configService));
