# School Code System - How It Works 🔍

## 🎯 **School Code Flow Overview**

### **1. Code Generation Process**
```
Headmaster Registers → School Request → Admin Approval → Code Assignment → Verification
```

### **2. Code Format**
- **Pattern**: `SCH` + 4-digit number
- **Examples**: `SCH0001`, `SCH0002`, `SCH0003`
- **Sequential**: Auto-increments based on existing approved schools

## 🔧 **Technical Implementation**

### **Backend Code Generation**
```typescript
// In schools.service.ts
private async generateSchoolCode(): Promise<string> {
  // Find the highest existing school code number
  const schools = await this.schoolRepository.find({
    where: { status: 'approved' },
    order: { code: 'DESC' }
  });
  
  let nextNumber = 1;
  for (const school of schools) {
    if (school.code.startsWith('SCH')) {
      const codeNumber = parseInt(school.code.substring(3));
      if (!isNaN(codeNumber) && codeNumber >= nextNumber) {
        nextNumber = codeNumber + 1;
      }
    }
  }
  
  return `SCH${nextNumber.toString().padStart(4, '0')}`;
}
```

### **When Codes Are Assigned**
```typescript
// When admin accepts a school request
async acceptSchoolRequest(id: string) {
  const school = await this.schoolRepository.findOne({ where: { id } });
  
  // Generate unique code
  const schoolCode = await this.generateSchoolCode(); // SCH0001, SCH0002, etc.
  
  // Update school status and assign code
  school.status = 'approved';
  school.code = schoolCode;
  await this.schoolRepository.save(school);
  
  return { message: `School approved. Code: ${schoolCode}` };
}
```

## 🔍 **Code Verification Process**

### **Frontend Verification**
```typescript
// In /registration/verify page
const handleSubmit = async (e: React.FormEvent) => {
  const schoolCode = code.join(''); // e.g., "SCH001"
  
  try {
    // Check school status by code
    const response = await apiFetch(`/schools/code/${schoolCode}`);
    
    if (response.status === 'approved') {
      setSuccess('School approved! You can now login.');
      setTimeout(() => router.push('/registration/login'), 3000);
    } else if (response.status === 'pending') {
      setError('School still pending approval.');
    } else if (response.status === 'rejected') {
      setError('School registration was rejected.');
    }
  } catch (err) {
    if (err.status === 404) {
      setError('School code not found.');
    }
  }
};
```

### **Backend Code Lookup**
```typescript
// In schools.controller.ts
@Get('code/:code')
async findByCode(@Param('code') code: string): Promise<SchoolResponseDto> {
  return this.schoolsService.findByCode(code);
}

// In schools.service.ts
async findByCode(code: string): Promise<SchoolResponseDto> {
  const school = await this.schoolRepository.findOne({
    where: { code },
  });
  if (!school) {
    throw new NotFoundException(`School with code ${code} not found`);
  }
  return this.toResponseDto(school);
}
```

## 🎯 **User Experience Flow**

### **Step 1: Headmaster Registration**
1. Headmaster registers at `/registration`
2. Submits school details at `/registration/school`
3. School gets temporary code like `REQ1704067200000`
4. Status set to `pending`

### **Step 2: Admin Approval**
1. Admin sees request in dashboard
2. Clicks "Accept" button
3. System generates proper code: `SCH0001`
4. School status changes to `approved`

### **Step 3: Code Verification**
1. Headmaster goes to `/registration/verify`
2. Enters code: `S-C-H-0-0-1`
3. System checks database for school with that code
4. Returns school status and information

### **Step 4: Login Access**
1. If approved, headmaster can login with original credentials
2. System checks school status during login
3. Routes to appropriate dashboard

## 📊 **Code Examples**

### **Scenario 1: First School**
```
Request → Admin Approval → Code: SCH0001
```

### **Scenario 2: Multiple Schools**
```
School A → SCH0001 (approved)
School B → SCH0002 (approved)  
School C → SCH0003 (approved)
School D → REQ1704067200000 (pending)
```

### **Scenario 3: Code Verification**
```
User enters: S-C-H-0-0-1
System finds: School "ABC Primary" - Status: approved
Result: "Congratulations! Your school has been approved!"
```

## 🔒 **Security & Validation**

### **Code Format Validation**
- Must be exactly 6 characters
- Must start with "SCH"
- Must have 4 digits
- Case insensitive input (converted to uppercase)

### **Status Checks**
- Only approved schools have proper SCH codes
- Pending schools have temporary REQ codes
- Rejected schools keep their codes but status shows rejected

## 🎉 **Benefits of This System**

### **✅ For Headmasters**
- **Clear Status**: Know exactly when approved
- **Easy Verification**: Simple 6-character code
- **No Confusion**: Codes only assigned when approved
- **Immediate Feedback**: Real-time status checking

### **✅ For Admins**
- **Automatic Assignment**: No manual code management
- **Sequential Order**: Easy to track school registration order
- **Unique Codes**: No duplicates possible
- **Clear Workflow**: Approval immediately assigns code

### **✅ For System**
- **Database Integrity**: Proper relationships maintained
- **Status Tracking**: Clear approval workflow
- **User Experience**: Smooth registration to portal flow
- **Security**: Only approved schools get access

## 🧪 **Testing the Code System**

### **Test 1: Code Generation**
1. Submit multiple school requests
2. Admin approves them in order
3. Should get: SCH0001, SCH0002, SCH0003, etc.

### **Test 2: Code Verification**
1. Enter approved school code in verify page
2. Should show success message
3. Should redirect to login page

### **Test 3: Invalid Code**
1. Enter non-existent code
2. Should show "Code not found" error

### **Test 4: Pending Code**
1. Enter code of pending school
2. Should show "Still pending approval" message

The school code system provides a clear, secure, and user-friendly way to track school approval status and grant access to the system! 🚀