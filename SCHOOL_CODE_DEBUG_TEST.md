# School Code Debug Test 🔍

## 🐛 **Current Issue**
- School `SCH0001` shows in admin Active Schools table
- But verification page says "School code not found"
- Need to debug what's actually in the database

## 🔧 **Debug Steps Added**

### **1. Frontend Debug Logs**
```typescript
console.log('Verifying school code:', schoolCode);
console.log('API response:', response);
console.error('Verification error:', err);
```

### **2. Backend Debug Logs**
```typescript
console.log('Looking for school with code:', code);
console.log('Found school:', school ? school.name : 'Not found');
```

### **3. Debug Endpoint**
Added: `GET /schools/debug/all` to see all schools in database

## 🧪 **Testing Process**

### **Step 1: Check Browser Console**
1. Open browser dev tools (F12)
2. Go to `/registration/verify`
3. Enter `SCH0001`
4. Check console for debug logs

### **Step 2: Check Backend Logs**
1. Look at backend terminal output
2. Should see logs when API call is made

### **Step 3: Check Database Contents**
1. Go to: `http://localhost:3001/schools/debug/all`
2. Should show all schools with their codes and status

## 🎯 **What to Look For**

### **Expected in Database**
```json
{
  "id": "uuid",
  "name": "Test Primary School", 
  "code": "SCH0001",
  "status": "approved",
  "isActive": true
}
```

### **Possible Issues**
- Code format mismatch (SCH0001 vs SCH001)
- Status not set to 'approved'
- Database not updated properly
- Case sensitivity issues

## 🚀 **Test Now**

1. **Try verification again** with debug logs
2. **Check console** for exact error details
3. **Visit debug endpoint** to see database contents
4. **Compare** what's in database vs what verification expects

The debug logs will show us exactly what's happening! 🔍