import { demoUsers, demoCompanies } from "../data/demoDatabase";
import { toast } from "sonner";

/**
 * Account verification utility to ensure the requested accounts are properly created
 */
export class AccountVerification {
  /**
   * Verify that the requested accounts exist and are properly configured
   */
  static verifyAccounts(): void {
    console.log("🔍 Verifying account setup...");

    // Check Sarah Johnson account
    const sarahAccount = demoUsers.find(
      (user) => user.email === "admin@techcorp.com",
    );
    if (sarahAccount) {
      console.log("✅ Sarah Johnson account verified:");
      console.log(`  - Email: ${sarahAccount.email}`);
      console.log(`  - Name: ${sarahAccount.name}`);
      console.log(`  - Role: ${sarahAccount.userType}`);
      console.log(`  - Company ID: ${sarahAccount.companyId}`);
    } else {
      console.error("❌ Sarah Johnson account not found!");
    }

    // Check Daniel Hayes account
    const danielAccount = demoUsers.find(
      (user) => user.email === "coach@marketing.com",
    );
    if (danielAccount) {
      console.log("✅ Daniel Hayes account verified:");
      console.log(`  - Email: ${danielAccount.email}`);
      console.log(`  - Name: ${danielAccount.name}`);
      console.log(`  - Role: ${danielAccount.userType}`);
      console.log(`  - Experience: ${danielAccount.experience} years`);
      console.log(`  - Rating: ${danielAccount.rating}/5.0`);
      console.log(`  - Hourly Rate: $${danielAccount.hourlyRate}`);
    } else {
      console.error("❌ Daniel Hayes account not found!");
    }

    // Check TechCorp Industries company
    const techCorpCompany = demoCompanies.find(
      (company) => company.id === "comp_001",
    );
    if (techCorpCompany) {
      console.log("✅ TechCorp Industries company verified:");
      console.log(`  - Name: ${techCorpCompany.name}`);
      console.log(`  - Industry: ${techCorpCompany.industry}`);
      console.log(`  - Admin ID: ${techCorpCompany.adminId}`);
      console.log(`  - Status: ${techCorpCompany.status}`);
    } else {
      console.error("❌ TechCorp Industries company not found!");
    }

    // Summary
    const allAccountsExist = sarahAccount && danielAccount && techCorpCompany;
    if (allAccountsExist) {
      console.log("🎉 All accounts verified successfully!");
      toast.success("Accounts verified: Sarah Johnson & Daniel Hayes ready");
    } else {
      console.error("⚠️ Some accounts are missing or misconfigured");
      toast.error("Account verification failed - check console");
    }
  }

  /**
   * Get login credentials for easy reference
   */
  static getLoginCredentials(): void {
    console.log("🔑 Login Credentials:");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("👩‍💼 Sarah Johnson (Company Admin)");
    console.log("   Email: admin@techcorp.com");
    console.log("   Password: admin123");
    console.log("   Company: TechCorp Industries");
    console.log("");
    console.log("👨‍🏫 Daniel Hayes (Coach)");
    console.log("   Email: coach@marketing.com");
    console.log("   Password: coach123");
    console.log("   Specialization: Marketing Strategy & Leadership");
    console.log("���━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    toast.info("Login credentials logged to console");
  }

  /**
   * Complete account setup verification
   */
  static performCompleteVerification(): void {
    this.verifyAccounts();
    this.getLoginCredentials();
  }
}

// Export the verification utility
export const accountVerification = AccountVerification;
