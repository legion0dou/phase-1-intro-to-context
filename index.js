// Your code here
// Create an employee record object
function createEmployeeRecord(employeeData) {
    return {
      firstName: employeeData[0],
      familyName: employeeData[1],
      title: employeeData[2],
      payPerHour: employeeData[3],
      timeInEvents: [],
      timeOutEvents: [],
    };
  }
  
  // Create an array of employee records from nested arrays
  function createEmployeeRecords(employeesData) {
    return employeesData.map(employeeData => createEmployeeRecord(employeeData));
  }
  
  // Add a time-in event to an employee record
  function createTimeInEvent(employeeRecord, timestamp) {
    const [date, hour] = timestamp.split(" ");
    employeeRecord.timeInEvents.push({ type: "TimeIn", hour: parseInt(hour, 10), date });
    return employeeRecord;
  }
  
  // Add a time-out event to an employee record
  function createTimeOutEvent(employeeRecord, timestamp) {
    const [date, hour] = timestamp.split(" ");
    employeeRecord.timeOutEvents.push({ type: "TimeOut", hour: parseInt(hour, 10), date });
    return employeeRecord;
  }
  
  // Calculate hours worked on a specific date
  function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
  
    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
    return hoursWorked;
  }
  
  // Calculate wages earned on a specific date
  function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    return hoursWorked * employeeRecord.payPerHour;
  }
  
  // Calculate total wages earned by an employee
  function allWagesFor(employeeRecord) {
    const datesWorked = employeeRecord.timeInEvents.map(event => event.date);
    const totalWages = datesWorked.reduce((total, date) => total + wagesEarnedOnDate(employeeRecord, date), 0);
    return totalWages;
  }
  
  // Calculate total wages for all employees
  function calculatePayroll(employeeRecords) {
    const totalPayroll = employeeRecords.reduce((total, employeeRecord) => total + allWagesFor(employeeRecord), 0);
    return totalPayroll;
  }
  