// --- CONFIGURATION ---
const SPREADSHEET_ID = "1vIusuQYijZsim9w711LzkAnfX4eh86b-TU-MT9VPVNc";
const DRIVE_FOLDER_ID = "1NMCxhvX6Dgzke2CresAhuRhpdT0wANrC";
const ADMIN_USERNAME = "admin";
const DEFAULT_PASSWORD = "admin";

// --- MAIN ENTRY POINTS ---
function doGet(e) {
  return handleRequest(e, 'GET');
}

function doPost(e) {
  return handleRequest(e, 'POST');
}

function handleRequest(e, method) {
  try {
    // Check DB Structure (Lazy Load - Fast Check)
    ensureDbStructure();

    const params = method === 'POST' ? JSON.parse(e.postData.contents) : e.parameter;
    const action = params.action;

    // --- READ ACTIONS (No Lock Required - High Concurrency) ---
    if (action === 'listProjects') {
      return success(listProjects(params));
    } 
    else if (action === 'getProject') {
      return success(getProject(params.id));
    }
    else if (action === 'listCatalogs') {
      return success(listCatalogs());
    }
    else if (action === 'login') {
      return success(login(params.username, params.password));
    }

    // --- WRITE ACTIONS (Lock Required - Safety) ---
    // We acquire lock ONLY for writes to prevent race conditions
    const lock = LockService.getScriptLock();
    try {
      // Wait up to 30 seconds for the lock
      lock.waitLock(30000); 
      
      // Verify Auth for Writes
      verifyAuth(params.token);

      if (action === 'createProject') {
        return success(createProject(params.payload));
      } 
      else if (action === 'updateProject') {
        return success(updateProject(params.id, params.payload));
      } 
      else if (action === 'deleteProject') {
        return success(deleteProject(params.id));
      } 
      else if (action === 'uploadProjectImages') {
        return success(uploadProjectImages(params.id, params.files));
      } 
      else if (action === 'uploadCatalog') {
        return success(uploadCatalog(params.file));
      }
      else if (action === 'deleteCatalog') {
        return success(deleteCatalog(params.id));
      }
      else if (action === 'logout') {
        return success({ message: "Logged out" });
      }
      
      return error("Invalid action: " + action);

    } catch (e) {
      // Lock acquisition failed or other error
      if (e.message.includes("Lock")) return error("System busy, please try again.");
      throw e;
    } finally {
      lock.releaseLock();
    }

  } catch (err) {
    return error(err.toString());
  }
}

// --- DATABASE LOGIC ---

function listProjects(params) {
  const sheet = getSheet("Projects");
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);
  
  let projects = rows.map(row => mapRowToObj(row, headers));
  
  // Filter: Deleted
  projects = projects.filter(p => !p.is_deleted);
  
  // Filter: Category
  if (params.category) {
    projects = projects.filter(p => p.category === params.category);
  }
  
  // Filter: System Type
  if (params.system_type) {
    projects = projects.filter(p => p.system_type === params.system_type);
  }
  
  // Filter: Search
  if (params.q) {
    const q = params.q.toLowerCase();
    projects = projects.filter(p => 
      (p.title && String(p.title).toLowerCase().includes(q)) ||
      (p.city && String(p.city).toLowerCase().includes(q)) ||
      (p.employer_name && String(p.employer_name).toLowerCase().includes(q))
    );
  }
  
  // Sort (Newest First)
  projects.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  
  return { projects: projects.map(formatProjectOutput), total: projects.length };
}

function getProject(id) {
  const sheet = getSheet("Projects");
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rowIndex = data.findIndex(r => r[0] === id);
  
  if (rowIndex === -1) throw new Error("Project not found");
  
  const project = mapRowToObj(data[rowIndex], headers);
  
  // Increment View Count (Fire and forget, no lock needed for simple counter usually, 
  // but technically a write. We'll skip lock for speed, risk of race condition on view count is acceptable)
  try {
     const viewColIndex = headers.indexOf('view_count') + 1;
     if (viewColIndex > 0) {
       sheet.getRange(rowIndex + 1, viewColIndex).setValue((project.view_count || 0) + 1);
     }
  } catch(e) {}

  return formatProjectOutput(project);
}

function createProject(payload) {
  const sheet = getSheet("Projects");
  const headers = sheet.getDataRange().getValues()[0];
  const newId = "PRJ-" + new Date().getFullYear() + "-" + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  
  const row = headers.map(header => {
    if (header === 'id') return newId;
    if (header === 'created_at') return new Date().toISOString();
    if (header === 'updated_at') return new Date().toISOString();
    if (header === 'is_deleted') return false;
    if (header === 'view_count') return 0;
    if (header === 'advantages') return Array.isArray(payload.advantages) ? payload.advantages.join('\n') : payload.advantages;
    return payload[header] || "";
  });
  
  sheet.appendRow(row);
  return { id: newId, message: "Created" };
}

function updateProject(id, payload) {
  const sheet = getSheet("Projects");
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rowIndex = data.findIndex(r => r[0] === id);
  
  if (rowIndex === -1) throw new Error("Project not found");
  
  const realRowIndex = rowIndex + 1;
  const currentRow = data[rowIndex];
  
  const updatedRow = headers.map((header, colIndex) => {
    // Immutable fields
    if (header === 'id' || header === 'created_at') return currentRow[colIndex];
    if (header === 'updated_at') return new Date().toISOString();
    
    // Arrays
    if (header === 'advantages') {
        return Array.isArray(payload.advantages) ? payload.advantages.join('\n') : 
               (payload.advantages !== undefined ? payload.advantages : currentRow[colIndex]);
    }
    
    // Update if present in payload
    if (payload[header] !== undefined) return payload[header];
    
    // Keep existing
    return currentRow[colIndex];
  });
  
  sheet.getRange(realRowIndex, 1, 1, headers.length).setValues([updatedRow]);
  return { id: id, message: "Updated" };
}

function deleteProject(id) {
  const sheet = getSheet("Projects");
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rowIndex = data.findIndex(r => r[0] === id);
  
  if (rowIndex === -1) throw new Error("Project not found");
  
  const isDeletedCol = headers.indexOf('is_deleted') + 1;
  if (isDeletedCol > 0) {
    sheet.getRange(rowIndex + 1, isDeletedCol).setValue(true);
  }
  return { id: id, message: "Deleted" };
}

// --- CATALOGS ---
function listCatalogs() {
  const sheet = getSheet("Catalogs");
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);
  const catalogs = rows.map(r => mapRowToObj(r, headers));
  catalogs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  return catalogs;
}

function uploadCatalog(file) {
  const folder = getOrMakeFolder("catalogs", getDriveRoot());
  const blob = Utilities.newBlob(Utilities.base64Decode(file.base64), file.type, file.name);
  const driveFile = folder.createFile(blob);
  driveFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  
  const fileId = driveFile.getId();
  const downloadUrl = "https://drive.google.com/uc?export=download&id=" + fileId;
  const id = "CAT-" + Math.floor(Math.random() * 100000);
  
  const sheet = getSheet("Catalogs");
  sheet.appendRow([id, file.name, fileId, downloadUrl, new Date().toISOString()]);
  
  return { id, name: file.name, file_id: fileId, download_url: downloadUrl };
}

function deleteCatalog(id) {
  const sheet = getSheet("Catalogs");
  const data = sheet.getDataRange().getValues();
  const rowIndex = data.findIndex(r => r[0] === id);
  if (rowIndex === -1) throw new Error("Catalog not found");
  
  // Optional: Delete from Drive (skipped for safety)
  sheet.deleteRow(rowIndex + 1);
  return { message: "Deleted" };
}

// --- IMAGES ---
function uploadProjectImages(id, files) {
  const folder = getOrMakeFolder("projects-images", getDriveRoot());
  const projectFolder = getOrMakeFolder(id, folder);
  
  const uploaded = [];
  const galleryIds = [];
  const galleryUrls = [];
  
  files.forEach(file => {
    const blob = Utilities.newBlob(Utilities.base64Decode(file.base64), file.type, file.name);
    const driveFile = projectFolder.createFile(blob);
    driveFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    const fileId = driveFile.getId();
    const url = "https://lh3.googleusercontent.com/d/" + fileId;
    
    uploaded.push({ fileId: fileId, url: url });
    galleryIds.push(fileId);
    galleryUrls.push(url);
  });
  
  // Update Project Record
  const sheet = getSheet("Projects");
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rowIndex = data.findIndex(r => r[0] === id);
  
  if (rowIndex > -1) {
    const realRow = rowIndex + 1;
    const project = mapRowToObj(data[rowIndex], headers);
    
    // Merge with existing
    const currentIds = project.gallery_image_file_ids ? String(project.gallery_image_file_ids).split(',') : [];
    const currentUrls = project.gallery_image_urls ? String(project.gallery_image_urls).split(',') : [];
    
    const newIds = [...currentIds, ...galleryIds].join(',');
    const newUrls = [...currentUrls, ...galleryUrls].join(',');
    
    // Set Cover if empty
    if (!project.cover_image_url && galleryUrls.length > 0) {
       sheet.getRange(realRow, headers.indexOf('cover_image_url') + 1).setValue(galleryUrls[0]);
       sheet.getRange(realRow, headers.indexOf('cover_image_file_id') + 1).setValue(galleryIds[0]);
    }
    
    sheet.getRange(realRow, headers.indexOf('gallery_image_urls') + 1).setValue(newUrls);
    sheet.getRange(realRow, headers.indexOf('gallery_image_file_ids') + 1).setValue(newIds);
  }
  
  return { uploaded: uploaded };
}

// --- AUTH ---
function login(username, password) {
  const sheet = getSheet("Admins");
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const admin = data.slice(1).map(r => mapRowToObj(r, headers)).find(a => a.username === username);
  
  if (!admin) throw new Error("Invalid credentials");
  if (String(admin.password) !== String(password)) throw new Error("Invalid credentials");
  
  const token = Utilities.getUuid();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
  
  const sessionSheet = getSheet("Sessions");
  sessionSheet.appendRow([token, username, expiresAt, new Date().toISOString()]);
  
  return { token: token, expiresAt: expiresAt };
}

function verifyAuth(token) {
  if (!token) throw new Error("No token");
  const sheet = getSheet("Sessions");
  const data = sheet.getDataRange().getValues();
  const session = data.slice(1).find(r => r[0] === token);
  
  if (!session) throw new Error("Invalid token");
  if (new Date() > new Date(session[2])) throw new Error("Token expired");
  return true;
}

// --- SELF-HEALING DB ---
function ensureDbStructure() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  
  // Fast Check: Do sheets exist?
  const pSheet = ss.getSheetByName("Projects");
  const cSheet = ss.getSheetByName("Catalogs");
  const aSheet = ss.getSheetByName("Admins");
  const sSheet = ss.getSheetByName("Sessions");
  
  if (pSheet && cSheet && aSheet && sSheet) {
     // Sheets exist, check columns lazily or skip for speed.
     // For robustness, we check columns only if we suspect they are missing, 
     // but to keep reads fast, we assume structure is good if sheets exist.
     // If you add new columns, you might want to run a manual setup or delete the sheet to regenerate.
     // Or, we can do a quick header check.
     return; 
  }

  // If missing, acquire lock to create them safely
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
     // Double-check inside lock
     if (!ss.getSheetByName("Projects")) {
        const s = ss.insertSheet("Projects");
        s.appendRow([
          "id", "title", "category", "system_type", "brand", "employer_name", 
          "address_full", "city", "province", "year_completed", "capacity_summary", 
          "system_model", "advantages", "description", "cover_image_file_id", 
          "cover_image_url", "gallery_image_file_ids", "gallery_image_urls", 
          "catalog_file_id", "catalog_download_url", "created_at", "updated_at", 
          "is_deleted", "view_count"
        ]);
     }
     if (!ss.getSheetByName("Catalogs")) {
        const s = ss.insertSheet("Catalogs");
        s.appendRow(["id", "name", "file_id", "download_url", "created_at"]);
     }
     if (!ss.getSheetByName("Admins")) {
        const s = ss.insertSheet("Admins");
        s.appendRow(["username", "password"]);
        s.appendRow([ADMIN_USERNAME, DEFAULT_PASSWORD]);
     }
     if (!ss.getSheetByName("Sessions")) {
        const s = ss.insertSheet("Sessions");
        s.appendRow(["token", "username", "expires_at", "created_at"]);
     }
  } finally {
     lock.releaseLock();
  }
}

// --- HELPERS ---
function getSheet(name) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(name);
  if (!sheet) throw new Error("Sheet " + name + " missing");
  return sheet;
}
function getDriveRoot() { return DriveApp.getFolderById(DRIVE_FOLDER_ID); }
function getOrMakeFolder(name, parent) {
  const folders = parent.getFoldersByName(name);
  if (folders.hasNext()) return folders.next();
  return parent.createFolder(name);
}
function mapRowToObj(row, headers) {
  let obj = {};
  headers.forEach((h, i) => { obj[h] = row[i]; });
  return obj;
}
function formatProjectOutput(p) {
  if (typeof p.advantages === 'string') p.advantages = p.advantages ? p.advantages.split('\n') : [];
  if (typeof p.gallery_image_urls === 'string') p.gallery_image_urls = p.gallery_image_urls ? p.gallery_image_urls.split(',').filter(x => x) : [];
  return p;
}
function success(data) {
  return ContentService.createTextOutput(JSON.stringify({ status: 'success', data: data })).setMimeType(ContentService.MimeType.JSON);
}
function error(msg) {
  return ContentService.createTextOutput(JSON.stringify({ status: 'error', error: msg })).setMimeType(ContentService.MimeType.JSON);
}
