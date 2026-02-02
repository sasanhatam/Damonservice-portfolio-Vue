// ============================================================================
// DAMON SERVICE - BACKEND CONFIGURATION
// ============================================================================

var CONFIG = {
  // The Spreadsheet ID acting as the Database
  // Extracted from: https://docs.google.com/spreadsheets/d/1vIusuQYijZsim9w711LzkAnfX4eh86b-TU-MT9VPVNc/edit
  SPREADSHEET_ID: "1vIusuQYijZsim9w711LzkAnfX4eh86b-TU-MT9VPVNc",

  // The Root Drive Folder ID for storing images/catalogs
  // Extracted from: https://drive.google.com/drive/folders/1NMCxhvX6Dgzke2CresAhuRhpdT0wANrC
  DRIVE_ROOT_FOLDER_ID: "1NMCxhvX6Dgzke2CresAhuRhpdT0wANrC",

  // Security
  TOKEN_SECRET: "DAMON_SECURE_SECRET_KEY_2025", // Change this if needed
  TOKEN_EXPIRY_HOURS: 24,
  
  // Default Admin (Created automatically if Admins sheet is empty)
  DEFAULT_ADMIN: {
    email: "admin@damoon.com",
    password: "admin"
  }
};

var SHEETS = {
  PROJECTS: "Projects",
  ADMINS: "Admins",
  SESSIONS: "Sessions",
  LOGS: "Logs"
};
