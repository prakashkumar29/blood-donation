export const initialValues = {
  reportType: "donor",
  option: "dateWise",
  dateValue: new Date(),
  monthValue: new Date(),
  startDate: new Date().setMonth(new Date().getMonth() - 1),
  endDate: new Date(),
};

export const timeOptions = [
  { id: 1, name: "Date wise", code: "dateWise" },
  { id: 2, name: "Month", code: "month" },
  { id: 3, name: "Monthly", code: "isMonthly" },
  { id: 3, name: "Yearly", code: "isYearly" },
];
export const reportTypes = [
  { id: "donor", name: "Donor reports" },
  { id: "request", name: "Blood requests" },
  { id: "dropped", name: "Dropped out donors" },
];
export const bars = {
  donor: ["totalDonorCount", "activeDonorCount", "inActiveDonorCount"],
  request: ["totalBloodRequestCount", "filledBloodRequestCount"],
  dropped: ["droppedOutDonorCount"],
};
export const names = {
  donor: ["Total donors", "Active donors", "Inactive donors"],
  request: ["Total blood requests", "Filled blood requets"],
  dropped: ["Dropped out donors"],
};
export const fills = {
  donor: ["#0288d1", "#2e7d32", "#ed6c02"],
  request: ["#0288d1", "#2e7d32"],
  dropped: ["#ed6c02"],
};
