import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Request,
  ForbiddenException,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { CompaniesService } from "./companies.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";

@ApiTags("companies")
@ApiBearerAuth("JWT-auth")
@Controller("companies")
@UseGuards(JwtAuthGuard)
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  @UseGuards(RolesGuard)
  create(@Body() createCompanyDto: any) {
    return this.companiesService.create(createCompanyDto);
  }

  @Get()
  @UseGuards(RolesGuard)
  findAll(@Query() query: any) {
    return this.companiesService.findAll(query);
  }

  @Get(":id")
  async findOne(@Param("id") id: string, @Request() req: any) {
    // Only allow company admins to view their own company or platform admins to view any
    const user = req.user;
    if (
      user.userType !== "platform_admin" &&
      (user.userType !== "company_admin" || user.companyId !== id)
    ) {
      throw new ForbiddenException(
        "You can only access your own company information",
      );
    }
    return this.companiesService.findOne(id);
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateCompanyDto: any,
    @Request() req: any,
  ) {
    // Only allow company admins to update their own company or platform admins to update any
    const user = req.user;
    if (
      user.userType !== "platform_admin" &&
      (user.userType !== "company_admin" || user.companyId !== id)
    ) {
      throw new ForbiddenException(
        "You can only update your own company information",
      );
    }
    return this.companiesService.update(id, updateCompanyDto);
  }

  @Delete(":id")
  @UseGuards(RolesGuard)
  remove(@Param("id") id: string) {
    return this.companiesService.remove(id);
  }

  /**
   * Get comprehensive dashboard metrics for a company
   * Accessible by company admins for their own company or platform admins for any company
   */
  @ApiOperation({
    summary: "Get company dashboard metrics",
    description:
      "Returns comprehensive dashboard metrics for a specific company including sessions, programs, and statistics",
  })
  @ApiResponse({
    status: 200,
    description: "Dashboard metrics retrieved successfully",
    schema: {
      type: "object",
      properties: {
        activeSessions: { type: "number" },
        activeCoaching: { type: "number" },
        goalsProgress: { type: "number" },
        totalHours: { type: "number" },
        totalPrograms: { type: "number" },
        completedPrograms: { type: "number" },
        averageRating: { type: "number" },
        monthlySpend: { type: "number" },
      },
    },
  })
  @ApiResponse({ status: 403, description: "Access denied to company metrics" })
  @ApiResponse({ status: 404, description: "Company not found" })
  @Get(":id/dashboard-metrics")
  async getDashboardMetrics(@Param("id") id: string, @Request() req: any) {
    const user = req.user;
    if (
      user.userType !== "platform_admin" &&
      (user.userType !== "company_admin" || user.companyId !== id)
    ) {
      throw new ForbiddenException(
        "You can only access your own company metrics",
      );
    }
    return this.companiesService.getDashboardMetrics(id);
  }

  /**
   * Get program statistics for a company
   */
  @ApiOperation({
    summary: "Get company program statistics",
    description: "Returns program statistics for a specific company",
  })
  @ApiResponse({
    status: 200,
    description: "Program statistics retrieved successfully",
    schema: {
      type: "object",
      properties: {
        total: { type: "number" },
        pending: { type: "number" },
        processing: { type: "number" },
        completed: { type: "number" },
        failed: { type: "number" },
      },
    },
  })
  @Get(":id/program-stats")
  async getProgramStats(@Param("id") id: string, @Request() req: any) {
    const user = req.user;
    if (
      user.userType !== "platform_admin" &&
      (user.userType !== "company_admin" || user.companyId !== id)
    ) {
      throw new ForbiddenException(
        "You can only access your own company program statistics",
      );
    }
    return this.companiesService.getProgramStats(id);
  }

  /**
   * Get session statistics for a company
   */
  @ApiOperation({
    summary: "Get company session statistics",
    description: "Returns session statistics for a specific company",
  })
  @ApiResponse({
    status: 200,
    description: "Session statistics retrieved successfully",
    schema: {
      type: "object",
      properties: {
        total: { type: "number" },
        scheduled: { type: "number" },
        confirmed: { type: "number" },
        inProgress: { type: "number" },
        completed: { type: "number" },
        cancelled: { type: "number" },
        totalHours: { type: "number" },
      },
    },
  })
  @Get(":id/session-stats")
  async getSessionStats(@Param("id") id: string, @Request() req: any) {
    const user = req.user;
    if (
      user.userType !== "platform_admin" &&
      (user.userType !== "company_admin" || user.companyId !== id)
    ) {
      throw new ForbiddenException(
        "You can only access your own company session statistics",
      );
    }
    return this.companiesService.getSessionStats(id);
  }
}
