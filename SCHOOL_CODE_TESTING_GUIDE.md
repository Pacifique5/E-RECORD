# School Code System - Testing Guide 🧪

## 🚀 **Both Servers Running**
- **Backend**: `http://localhost:3001` ✅
- **Frontend**: `http://localhost:3000` ✅

## 🎯 **Complete Testing Workflow**

### **Test 1: Admin Login & Dashboard Access**
1. **Go to**: `http://localhost:3000/registration/login`
2. **Login as Admin**:
   - Email: `admin@gmail.com`
   - Password: `admin123`
3. **Expected**: Redirect to `http://localhost:3000/admin`
4. **Check**: Admin dashboard loads with school management

### **Test 2: Headmaster Registration & School Request**
1. **Open new browser/incognito**: `http://localhost:3000/registration`
2. **Register Headmaster**:
   - First Name: `Joh`
   - Last Name: `Smit`
   - Email: `johnmith@testschool.edu`
   - Phone: `+250788123456`
   - Password: `password123`
   - Confirm Password: `password123`
3. **Click**: "Next" button
4. **Expected**: Auto-login and redirect to school registration

### **Test 3: School Registration Request**
1. **Fill School Details**:
   - School Name: `Test Primary School`
   - Address: `123 Education Street`
   - City: `Kigali`
   - State: `Kigali Province`
   - Country: `Rwanda`
   - Phone: `+250788654321`
   - Email: `info@testprimary.edu.rw`
2. **Click**: "Submit Registration Request"
3. **Expected**: Redirect to confirmation page
4. **Note**: School gets temporary code like `REQ1704067200000`

### **Test 4: Real-Time Admin Dashboard Update**
1. **Go back to admin tab**: `http://localhost:3000/admin/schools`
2. **Check**: "Schools Request" section should show:
   - **Count**: (1) new request
   - **School Name**: Test Primary School
   - **Status**: Pending
   - **Actions**: View, Accept, Reject buttons

### **Test 5: Admin Approval & Code Assignment**
1. **In Admin Dashboard**: Find "Test Primary School" request
2. **Click**: "Accept" button
3. **Expected Results**:
   - Request disappears from pending list
   - Success message shows: "School approved. Code: SCH0001"
   - Statistics update: Pending count decreases, Active count increases
   - School gets proper code: `SCH0001`

### **Test 6: School Code Verification**
1. **Go to**: `http://localhost:3000/registration/verify`
2. **Enter School Code**: `S-C-H-0-0-1` (one character per box)
3. **Click**: "Check School Status"
4. **Expected Results**:
   - Success message: "🎉 Congratulations! Your school 'Test Primary School' has been approved!"
   - Auto-redirect to login page after 3 seconds

### **Test 7: Headmaster Login After Approval**
1. **Go to**: `http://localhost:3000/registration/login`
2. **Login with Headmaster Credentials**:
   - Email: `john.smith@testschool.edu`
   - Password: `password123`
3. **Expected**: Smart routing to `http://localhost:3000/portal/headmaster`
4. **Check**: Full headmaster portal access granted

### **Test 8: Multiple School Codes**
1. **Register another headmaster** (different email)
2. **Submit another school request**
3. **Admin approves second school**
4. **Expected**: Second school gets code `SCH0002`
5. **Verify**: Sequential code assignment working

### **Test 9: Invalid Code Verification**
1. **Go to**: `http://localhost:3000/registration/verify`
2. **Enter Invalid Code**: `S-C-H-9-9-9`
3. **Click**: "Check School Status"
4. **Expected**: Error message "School code not found"

### **Test 10: Pending School Code Check**
1. **Submit new school request** (don't approve yet)
2. **Try to verify with temporary code** (starts with REQ)
3. **Expected**: Error message about pending approval

## 🔍 **What to Look For**

### **✅ Code Generation**
- First approved school: `SCH0001`
- Second approved school: `SCH0002`
- Third approved school: `SCH0003`
- Sequential numbering with no gaps

### **✅ Verification Results**
- **Approved School**: Success message + redirect to login
- **Pending School**: "Still pending approval" message
- **Rejected School**: "Registration was rejected" message
- **Invalid Code**: "School code not found" message

### **✅ Login Routing**
- **Admin**: → `/admin` (immediate access)
- **Approved Headmaster**: → `/portal/headmaster`
- **Pending Headmaster**: → `/registration/confirmation`
- **No School Headmaster**: → `/registration/school`

### **✅ Real-Time Updates**
- Admin dashboard updates immediately when requests submitted
- Statistics change in real-time when schools approved/rejected
- Auto-refresh every 30 seconds + manual refresh button

## 🎯 **Expected Code Flow**

### **Scenario A: Successful Flow**
```
1. Headmaster registers → john.smith@testschool.edu created
2. School request submitted → Gets REQ1704067200000 (temporary)
3. Admin approves → Code changes to SCH0001 (permanent)
4. Verification works → SCH0001 shows "approved" status
5. Login works → Routes to headmaster portal
```

### **Scenario B: Multiple Schools**
```
School A: Test Primary → SCH0001 (approved)
School B: Demo High School → SCH0002 (approved)
School C: Sample Academy → SCH0003 (approved)
School D: New School → REQ1704067300000 (pending)
```

### **Scenario C: Code Verification**
```
Enter: S-C-H-0-0-1 → Found: "Test Primary School" → Status: approved → Success!
Enter: S-C-H-9-9-9 → Not Found → Error: "School code not found"
Enter: R-E-Q-1-7-0 → Found: "Pending School" → Status: pending → Wait message
```

## 🔧 **Troubleshooting**

### **If Code Generation Fails**
- Check backend logs for database errors
- Verify school repository is working
- Ensure sequential numbering logic is correct

### **If Verification Fails**
- Check API endpoint `/schools/code/:code` is working
- Verify school exists in database with correct code
- Check frontend API call is formatted correctly

### **If Login Routing Fails**
- Verify user has school relationship in database
- Check school status is properly set
- Ensure JWT token includes school information

## 🎉 **Success Indicators**

You'll know the system is working when:
- ✅ Admin can approve schools and see code assignment
- ✅ Codes are sequential (SCH0001, SCH0002, etc.)
- ✅ Verification page correctly identifies school status
- ✅ Approved headmasters can login and access portal
- ✅ Real-time updates work throughout the process

**The school code system provides a complete workflow from registration to portal access!** 🚀