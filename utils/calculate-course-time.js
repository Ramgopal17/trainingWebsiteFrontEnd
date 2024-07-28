const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const calculateCourseTime = (
  duration,
  weekDay,
  weekEnd,
  publishedAt
) => {
  const oneWeek = 5 * weekDay + weekEnd;
  const totalWeek = Math.ceil(duration / oneWeek);
  const totalDays = totalWeek * 7;

  // Input date
  var inputDate = new Date(publishedAt);

  // Adding 66 days
  inputDate.setDate(inputDate.getDate() + totalDays);

  var month = inputDate.getMonth();
  var day = inputDate.getDate();
  var year = inputDate.getFullYear();
  // console.log(months[month], day, year);
  const endDate = `${months[month]} ${day}, ${year}`;

  return endDate.includes("NaN") ? "" : endDate;
};

export const startDate = (publishedAt) => {
  var inputDate = new Date(publishedAt);
  var month = inputDate.getMonth();
  var day = inputDate.getDate();
  var year = inputDate.getFullYear();
  const startDate = `${months[month]} ${day}, ${year}`;

  return startDate.includes("NaN") ? "" : startDate;
};

export const courseCompleteDate = (completeDate) => {
  var inputDate = new Date(completeDate);
  var month = inputDate.getMonth();
  var day = inputDate.getDate();
  var year = inputDate.getFullYear();
  const completedDate = `${year}-${month + 1}-${day}`;

  return completedDate;
};

export const expiryDate = (completeDate) => {
  var inputDate = new Date(completeDate);
  inputDate.setDate(inputDate.getDate() + 365);
  var month = inputDate.getMonth();
  var day = inputDate.getDate();
  var year = inputDate.getFullYear();

  const expiry = `${year}-${month + 1}-${day}`;
  return expiry;
};
