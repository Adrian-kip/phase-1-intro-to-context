function createEmployeeRecord(arr) {
    return {
      firstName: arr[0],
      familyName: arr[1],
      title: arr[2],
      payPerHour: arr[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  function createEmployeeRecords(arrays) {
    return arrays.map(createEmployeeRecord);
  }
  
  function createTimeInEvent(record, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    record.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date: date
    });
    return record;
  }
  
  function createTimeOutEvent(record, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    record.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date: date
    });
    return record;
  }
  
  function hoursWorkedOnDate(record, date) {
    const timeIn = record.timeInEvents.find(e => e.date === date);
    const timeOut = record.timeOutEvents.find(e => e.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
  }
  
  function wagesEarnedOnDate(record, date) {
    const hours = hoursWorkedOnDate(record, date);
    return hours * record.payPerHour;
  }
  
  function allWagesFor(record) {
    return record.timeInEvents.reduce((total, event) => {
      return total + wagesEarnedOnDate(record, event.date);
    }, 0);
  }
  
  function calculatePayroll(records) {
    return records.reduce((total, record) => {
      return total + allWagesFor(record);
    }, 0);
  }
  