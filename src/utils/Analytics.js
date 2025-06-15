export const formatDate = (timestamp, type = "day") => {
  const date = new Date(timestamp);
  switch (type) {
    case "day":
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

    case "month":
      return date.toLocaleDateString("en-US", { month: "short" }); // e.g., "Jan"

    case "week":
      const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
      const diff = date - firstDayOfYear;
      const dayOfWeek = firstDayOfYear.getDay(); // Sunday = 0
      const week = Math.ceil((diff / 86400000 + dayOfWeek + 1) / 7);
      return `W${week}`;

    default:
      return "";
  }
};

export const getCounts = (data, type = "day", selectedYear) => {
  const counts = {};

  // Count actual data
  data.forEach((item) => {
    const date = new Date(item.timestamp);
    if (date.getFullYear() !== selectedYear) return;

    const key = formatDate(item.timestamp, type);
    counts[key] = (counts[key] || 0) + 1;
  });

  const filledCounts = {};

  if (type === "month") {
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
    months.forEach((m) => {
      filledCounts[m] = counts[m] || 0;
    });
  } else if (type === "week") {
    const totalWeeks = getWeeksInYear(selectedYear);
    for (let i = 1; i <= totalWeeks; i++) {
      const weekKey = `W${i}`;
      filledCounts[weekKey] = counts[weekKey] || 0;
    }
  } else if (type === "day") {
    // Day labels are already sorted and do not need filling
    return {
      labels: Object.keys(counts),
      values: Object.keys(counts).map((key) => counts[key]),
    };
  }

  // Return filled and numerically sorted data
  const sortedLabels = Object.keys(filledCounts).sort((a, b) => {
    // Convert W1, W2,... or Jan, Feb,... to sortable index
    if (type === "week") return parseInt(a.slice(1)) - parseInt(b.slice(1));
    if (type === "month") {
      const monthIndex = (m) =>
        [
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
        ].indexOf(m);
      return monthIndex(a) - monthIndex(b);
    }
    return 0;
  });

  return {
    labels: sortedLabels,
    values: sortedLabels.map((label) => filledCounts[label]),
  };
};

// Helper to get total weeks in a year
const getWeeksInYear = (year) => {
  const d = new Date(year, 11, 31); // Dec 31
  const week = Math.ceil(
    ((d - new Date(year, 0, 1)) / 86400000 +
      new Date(year, 0, 1).getDay() +
      1) /
      7
  );
  return week;
};
