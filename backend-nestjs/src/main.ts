import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Get config service
  const configService = app.get(ConfigService);

  // CORS configuration
  app.enableCors({
    origin: configService.get("FRONTEND_URL", "http://localhost:8080"),
    credentials: true,
  });

  // Global prefix
  app.setGlobalPrefix("api/v1");

  const port = configService.get("PORT", 3001);
  await app.listen(port);

  console.log(`🚀 Peptok NestJS API is running on: http://localhost:${port}`);
  console.log(
    `📚 Health check available at: http://localhost:${port}/api/v1/health`,
  );
}

bootstrap().catch((error) => {
  console.error("Error starting application:", error);
  process.exit(1);
});
