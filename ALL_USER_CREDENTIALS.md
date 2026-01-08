# E-RECORD SYSTEM - ALL USER CREDENTIALS
# Generated on: 2026-01-08T14:19:47.511Z
# 
# This file contains all user accounts in the system for testing purposes
# 

## 🔐 ADMIN ACCOUNT
Email: admin@gmail.com
Password: admin123
Role: admin
Access: Full admin dashboard at /admin
Notes: Can approve/reject schools, manage all users

## 👤 HEADMASTER ACCOUNTS

### John Doe
Email: john.headmaster@test.com
Password: password123
Role: headmaster
School: Test Headmaster School
School Code: SCH0004
Access: Headmaster portal at /portal/headmaster (if school approved)
Notes: Use personal email/password to login

### Sarah Johnson
Email: sarah.headmaster@example.com
Password: mypassword123
Role: headmaster
School: Excellence Academy
School Code: SCH0005
Access: Headmaster portal at /portal/headmaster (if school approved)
Notes: Use personal email/password to login

### Emma Wilson
Email: emma.headmaster@brightfuture.com
Password: mypassword456
Role: headmaster
School: Bright Future School
School Code: SCH0006
Access: Headmaster portal at /portal/headmaster (if school approved)
Notes: Use personal email/password to login

### Michael Thompson
Email: michael.headmaster@newschool.com
Password: securepass123
Role: headmaster
School: Future Leaders Academy
School Code: REQ1767879481068
Access: Headmaster portal at /portal/headmaster (if school approved)
Notes: Use personal email/password to login

## 🏫 SCHOOLS IN DATABASE

### 1. Default School
School Code: DEFAULT
Status: pending
Active: true
ID: 61e1de54-d43c-4ea2-8e1a-873b09c16551

### 2. Rwanda Coding Academy
School Code: SCH8297
Status: pending
Active: true
ID: a301667a-2139-4d03-8b2c-bbf0307defed

### 3. Rwanda Coding Academy
School Code: REQ1767867162109
Status: pending
Active: true
ID: a2a040f8-64b1-4f7a-bbe9-3ccbb8940ff5

### 4. Petit Semnaire Virgo Fidelis
School Code: REQ1767869163610
Status: pending
Active: true
ID: ca2b47e2-7205-4f6e-b41f-f78d9d0166a0

### 5. Test Primary School
School Code: SCH0001
Status: approved
Active: true
ID: d8f1b970-e279-4a5c-8a15-65fb05836d2f

### 6. Test Primary School
School Code: SCH0002
Status: approved
Active: true
ID: 655db5f9-ff01-460c-8bc0-55242b78989f

### 7. Okay Primary School
School Code: SCH0003
Status: approved
Active: true
ID: 887776c1-c812-45f1-8a63-54ff7c2ec019

### 8. Test Headmaster School
School Code: SCH0004
Status: approved
Active: true
ID: 00c4a2b8-9ad3-4c33-98f1-5605817fe100

### 9. Excellence Academy
School Code: SCH0005
Status: approved
Active: true
ID: 88c1d06e-0a1e-4600-b804-b3b94143b23a

### 10. Future Leaders Academy
School Code: REQ1767879481068
Status: pending
Active: true
ID: ed33bf0a-491a-45be-aeaa-4f2fb3aff861

### 11. Bright Future School
School Code: SCH0006
Status: approved
Active: true
ID: 188da7f0-c488-4a58-b961-b04f02791180

### 12. AUCA
School Code: SCH0007
Status: approved
Active: true
ID: 31c9b8f5-bf8c-420b-9a02-ce4bea95f3bb

## 🔍 SCHOOL CODE VERIFICATION

The following school codes can be used for verification at /registration/verify:

- SCH0001 → Test Primary School (approved)
- SCH0002 → Test Primary School (approved)
- SCH0003 → Okay Primary School (approved)
- SCH0004 → Test Headmaster School (approved)
- SCH0005 → Excellence Academy (approved)
- SCH0006 → Bright Future School (approved)
- SCH0007 → AUCA (approved)

## 📝 TESTING WORKFLOWS

### 1. Admin Workflow:
1. Login: admin@gmail.com / admin123
2. Go to: /admin/schools
3. Approve pending schools
4. View active schools

### 2. Headmaster Workflow (Existing Users):
1. Login with any headmaster email/password above
2. If school approved → redirected to /portal/headmaster
3. If school pending → redirected to /registration/confirmation

### 3. New Registration Workflow:
1. Go to: /registration
2. Fill single form with headmaster + school info
3. Wait for admin approval
4. Login with personal credentials

### 4. School Code Verification:
1. Go to: /registration/verify
2. Enter any approved school code (7 characters)
3. View school status

## 🚨 IMPORTANT NOTES

- All passwords are for testing purposes only
- Admin account has full system access
- Headmaster accounts are linked to their respective schools
- School codes are assigned when admin approves schools
- Use personal email/password (not school email) for headmaster login

## 🔄 SYSTEM STATUS

- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- Database: PostgreSQL (configured in backend/.env)
- Authentication: JWT tokens
- School Codes: 7-character format (SCH0001, SCH0002, etc.)

## ✅ CREDENTIAL VERIFICATION STATUS
*Last verified: 2026-01-08T14:20:00Z*

- ✅ Admin login: admin@gmail.com / admin123 - WORKING
- ✅ Headmaster login: john.headmaster@test.com / password123 - WORKING (School: SCH0004 approved)
- ✅ Headmaster login: emma.headmaster@brightfuture.com / mypassword456 - WORKING (School: SCH0006 approved)
- ✅ School verification: All approved school codes (SCH0001-SCH0007) working
- ✅ Single-step registration: New combined form working
- ✅ Admin approval workflow: Working correctly

## 🎯 QUICK TEST COMMANDS

```bash
# Test admin login
curl -X POST http://localhost:3001/auth/login -H "Content-Type: application/json" -d '{"email":"admin@gmail.com","password":"admin123"}'

# Test headmaster login  
curl -X POST http://localhost:3001/auth/login -H "Content-Type: application/json" -d '{"email":"john.headmaster@test.com","password":"password123"}'

# Test school code verification
curl http://localhost:3001/schools/code/SCH0004
```

