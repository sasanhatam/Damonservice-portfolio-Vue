# Damoon Portfolio - Deployment Guide

Since you have already provided the URLs, here is how to update the backend code.

## 1. Update Google Apps Script Code

1.  Open your Google Apps Script project: [Link to your Script](https://script.google.com/macros/s/AKfycbz7qG2a5XBqQjscqTy4Ybk0SVWhjILCrpm_J7n9aZgMtLq-sN3Uolf8MMFQ5iGt3R5X/exec) (Note: This is the exec link, you need to open the **Editor** from your Google Drive or `script.google.com`).
2.  Create a new file named `Configuration.gs`.
3.  Copy the content from `backend/Configuration.gs` (generated in this project) and paste it there.
4.  Open `Code.gs`.
5.  Copy the content from `backend/Code.gs` (generated in this project) and paste it there, replacing everything.

## 2. Initialize Database

1.  In the Apps Script Editor, select the function `setupSystem` from the dropdown menu in the toolbar.
2.  Click **Run**.
3.  Grant necessary permissions (Access to Sheets and Drive).
4.  This will create the necessary headers in your Sheet and create a default admin user:
    - **Email**: `admin@damoon.com`
    - **Password**: `admin`

## 3. Deploy

1.  Click **Deploy** > **New deployment**.
2.  Select type: **Web app**.
3.  Description: "v1".
4.  **Execute as**: `Me` (your email).
5.  **Who has access**: `Anyone`.
6.  Click **Deploy**.
7.  **IMPORTANT**: Since you already have a URL, if you want to keep the *same* URL, you should choose **Manage deployments**, select the active one, click the pencil icon (Edit), upload the new version code, and click **Done**. If you create a *New deployment*, you might get a new URL.
    - If you get a new URL, update it in `src/config.ts`.

## 4. Frontend

The frontend is already configured to use your Web App URL in `src/config.ts`.

Run the project:
\`\`\`bash
yarn run dev
\`\`\`
