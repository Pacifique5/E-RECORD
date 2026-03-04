# Headmaster Settings Page - Complete Guide

## ✅ Current Implementation Status

Your headmaster settings page is **fully implemented** with all the features shown in your design:

### 1. General Settings Section
- **School Name**: Displays the school name (read-only)
- **School Logo**: Displays the uploaded school logo
- **Academic Year**: Shows current academic year (2024-2025)
- **Term**: Shows current term (Term 1)
- **Location**: Shows school location (Kigali Rwanda)

### 2. Personal Settings Section
- **Full Names**: Displays headmaster's full name
- **Role**: Shows user role (Headmaster)
- **Email**: Displays headmaster's email
- **Phone Number**: Shows phone number
- **Location**: Shows location

### 3. Accountant Management Section
- **Add Accountant Button**: Opens modal to create new accountant
- **Accountants Table**: Lists all accountants with:
  - Name
  - Email
  - Created date
  - Edit and Delete buttons

### 4. Notifications Section
- **Notification Email**: Email for notifications
- **SMS Notification Number**: Phone for SMS alerts
- **Allowed Notifications**: Dropdown (All, Important Only, None)

### 5. Data Backup Section
- **Backup Frequency**: Dropdown (Daily, Weekly, Monthly)

---

## 🔧 How to Fix School Logo Display

The school logo is already being stored and retrieved correctly from the database. However, you need to **refresh your authentication** to see it.

### Steps to Fix:

1. **Log Out**
   - Click your profile icon in the top right
   - Click "Logout"
   - You'll be redirected to the landing page

2. **Log Back In**
   - Go to: http://localhost:3000/registration/login
   - Enter your credentials:
     - Email: `pacifiquem58@gmail.com`
     - Password: `password123`
   - Click "Login"

3. **Navigate to Settings**
   - Go to: http://localhost:3000/portal/headmaster/settings
   - Your school logo should now display correctly

### Why This Works:

When you log in, the backend returns your user data including the school information with the logo path. This data is stored in localStorage. The recent backend updates added the `logo` field to the response, but your current session still has the old data without the logo field.

Logging out and back in refreshes this data with the complete school information including the logo.

---

## 📸 School Logo System

### How It Works:

1. **Upload During Registration**
   - When registering a school, you can upload a logo
   - Logo is saved to: `backend/uploads/logos/`
   - Path is stored in database: `/uploads/logos/logo-xxxxx.jpeg`

2. **Display in Settings**
   - Logo is fetched from: `http://localhost:3001/uploads/logos/logo-xxxxx.jpeg`
   - Displayed as 64x64px image
   - Has fallback if logo fails to load

3. **Current Logo in Database**
   - Your school "Rwanda Coding Academy" has logo at:
   - Path: `/uploads/logos/logo-1768135573714-68217471.jpeg`
   - Full URL: `http://localhost:3001/uploads/logos/logo-1768135573714-68217471.jpeg`

---

## 👥 Add Accountant Feature

### How to Add an Accountant:

1. **Click "Add an accountant" Button**
   - Located in the Accountant Management section
   - Opens a modal dialog

2. **Fill in the Form**
   - **Accountant Name**: First and last name (shown as "Duahimire aine" in your example)
   - **Email**: Accountant's email (e.g., `aiduahimire@gmail.com`)
   - **Role**: Automatically set to "accountant"
   - **Phone Number**: Optional phone number (e.g., `0798380290`)
   - **Default Password**: Set initial password (e.g., `rca#2025!`)

3. **Submit**
   - Click "Create an accountant" button
   - Accountant is created and linked to your school
   - Appears in the accountants table immediately

4. **Accountant Can Login**
   - Accountant uses their email and password to login
   - Automatically routed to: `/portal/accountant`
   - Has access to accountant-specific features

### Edit Accountant:

- Click "Edit" button next to accountant name
- Opens edit modal with same fields
- Update information and save

### Delete Accountant:

- Click "Delete" button next to accountant name
- Confirmation dialog appears
- Accountant is removed from system

---

## 🎯 Settings Page Features

### Read-Only Fields:
These fields display information but cannot be edited directly:
- School Name
- School Logo
- Academic Year
- Term
- Location (in General Settings)
- Full Names
- Role
- Email
- Phone Number
- Location (in Personal Settings)
- Notification Email
- SMS Notification Number

### Editable Fields:
These fields can be changed:
- Allowed Notifications (dropdown)
- Backup Frequency (dropdown)

### Interactive Features:
- **Add Accountant**: Opens modal to create new accountant
- **Edit Accountant**: Opens modal to edit accountant details
- **Delete Accountant**: Removes accountant with confirmation

---

## 🔍 Verification Steps

### 1. Check School Logo in Database:
```bash
cd backend
node check-data.js
```

Should show:
```
Schools in database:
- Rwanda Coding Academy (SCH0001) - Status: approved
  Logo: /uploads/logos/logo-1768135573714-68217471.jpeg
```

### 2. Check Logo File Exists:
```bash
dir backend\uploads\logos
```

Should show the logo file.

### 3. Test Logo URL:
Open in browser: `http://localhost:3001/uploads/logos/logo-1768135573714-68217471.jpeg`

Should display your school logo image.

---

## 🐛 Troubleshooting

### Logo Shows Blue Placeholder:

**Problem**: Logo not displaying, shows blue square instead

**Solution**:
1. Log out completely
2. Log back in with your credentials
3. Navigate to settings page
4. Logo should now display

### "Failed to fetch" Error:

**Problem**: API calls failing

**Solution**:
1. Ensure backend is running: `cd backend && npm run start:dev`
2. Check backend is on port 3001
3. Log out and log back in to refresh JWT token

### Accountants Not Loading:

**Problem**: Accountant table shows "Loading..." forever

**Solution**:
1. Check backend is running
2. Verify you're logged in as headmaster
3. Check browser console for errors
4. Refresh the page

### Can't Add Accountant:

**Problem**: Modal doesn't open or form doesn't submit

**Solution**:
1. Check browser console for errors
2. Ensure all required fields are filled
3. Verify backend is running
4. Check JWT token is valid (log out and back in)

---

## 📊 Current System Status

### ✅ Working Features:
- General Settings display
- Personal Settings display
- School logo upload and storage
- School logo display (after login refresh)
- Add accountant functionality
- Edit accountant functionality
- Delete accountant functionality
- Accountant table with real data
- Notifications settings
- Data backup settings

### 🔄 Requires Action:
- **Log out and log back in** to see school logo

---

## 🎉 Summary

Your headmaster settings page is **fully functional** and matches the design you showed. All sections are implemented:

1. ✅ General Settings with school logo
2. ✅ Personal Settings with user info
3. ✅ Accountant Management with add/edit/delete
4. ✅ Notifications configuration
5. ✅ Data Backup settings

**Next Step**: Simply log out and log back in to refresh your user data and see the school logo displayed correctly!

---

**Page URL**: http://localhost:3000/portal/headmaster/settings  
**Login URL**: http://localhost:3000/registration/login  
**Credentials**: pacifiquem58@gmail.com / password123