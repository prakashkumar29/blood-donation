export const isInvalidDate = (dateValue = "") =>
  isNaN(new Date(dateValue)) || !dateValue;

export function validateDataForMonth(keys = [], month = "", data = []) {
  const date = new Date(month);
  if (isNaN(date) || !month) return [];
  const year = month.getFullYear();
  const totalDays = new Date(year, month.getMonth() + 1, 0).getDate();

  const dataMap = new Map(data.map((item) => [item.date, item]));

  const validatedData = [];

  for (let day = 1; day <= totalDays; day++) {
    const date = new Date(year, month.getMonth(), day);
    const dateStr = date.toISOString().slice(0, 10);

    if (dataMap.has(dateStr)) {
      validatedData.push(dataMap.get(dateStr));
    } else {
      const newData = { date: dateStr };
      for (const key of keys) {
        newData[key] = 0;
      }
      validatedData.push(newData);
    }
  }
  return validatedData;
}
export function fillDataGapsForMonths(data, startMonth, endMonth, keys) {
  const gapData = [];
  const start = new Date(startMonth);
  const end = new Date(endMonth);
  if (isNaN(start) || isNaN(end) || !startMonth || !endMonth) return [];
  let currentDate = new Date(startMonth);

  while (currentDate <= endMonth) {
    const year = currentDate.getFullYear();
    const month = currentDate.toLocaleString("en-US", { month: "long" });

    const dataForMonth = data.find(
      (item) => item.month === month && item.year === year
    );

    if (dataForMonth) {
      gapData.push(dataForMonth);
    } else {
      const monthData = { month, year };

      for (const key of keys) {
        monthData[key] = 0;
      }

      gapData.push(monthData);
    }

    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  return gapData;
}
