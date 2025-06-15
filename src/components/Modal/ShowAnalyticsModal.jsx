import React, { useRef, useState, useEffect } from "react";
import { LuLogIn } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { IoMdPerson } from "react-icons/io";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { getCounts } from "@/utils/Analytics";
ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
  // Tooltip,
  // Legend
);

export const ShowAnalyticsModal = ({ closeModal, linkAnalytics }) => {
  const modalRef = useRef();
  const handleClick = (e) => {
    if (modalRef.current === e.target) closeModal();
  };
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2020 + 1 },
    (_, i) => 2020 + i
  );

  const [grouping, setGrouping] = useState("day");
  const [chartData, setChartData] = useState({ labels: [], values: [] });
  const [selectedYear, setSelectedYear] = useState(currentYear);
  useEffect(() => {
    console.log(selectedYear,typeof(selectedYear));
    const grouped = getCounts(linkAnalytics, grouping, selectedYear);
    setChartData(grouped);
  }, [grouping, selectedYear]);

  const chartConfig = {
    labels: chartData.labels,
    datasets: [
      {
        data: chartData.values,
        fill: true,
        borderColor: "#1E90FF",
        tension: 0.5,
      },
    ],
  };
  const chartOptions = {
    scales: {
      x: {
        ticks: {
          color: '#6B7280', // Tailwind gray-500
        },
        grid: {
          color: '#E5E7EB', // Tailwind gray-200
        },
      },
      y: {
        ticks: {
          color: '#6B7280',
          callback: function (value) {
            return Number.isInteger(value) ? value : null; // Hides decimal values
          },
        },
        grid: {
          color: '#E5E7EB',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };
  
  return (
    <div
      ref={modalRef}
      onClick={handleClick}
      className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-30 flex items-center justify-center"
    >
      <div className="md:w-[35rem] w-[95vw] bg-white rounded-lg drop-shadow-md flex flex-col  pb-6">
        <div className="flex flex-row  justify-between text-xl gap-5 px-8 py-4 border-b-[1px] border-gray-200">
          <h1 className="font-semibold">Link Performance Overview</h1>
          <button className=" opacity-20" onClick={closeModal}>
            <IoClose size={26} />
          </button>
        </div>

        <div className="px-4 relative">
          <div className="py-2 flex justify-between">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="text-sm focus:outline-none border-2 border-gray-500 rounded-md shadow-inner outline-none drop-shadow-sm "
            >
              {years.map((year, index) => (
                <option key={index} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <select
              value={grouping}
              onChange={(e) => setGrouping(e.target.value)}
              className="text-sm focus:outline-none border-2 border-gray-500 rounded-md shadow-inner outline-none drop-shadow-sm "
            >
              <option value="day">Daily</option>
              {/* <option value="week">Weekly</option> */}
              <option value="month">Monthly</option>
            </select>
          </div>
          <div className="flex items-center justify-center flex-col h-56 md:h-64 ">
            {chartData.labels.length > 0 ? (
              <Line typeof="line" data={chartConfig} options={chartOptions} className="px-4" />
            ) : (
              <div className="h-44 tex-lg text-gray-600">No data found for <span className="text-blue-400 font-semibold">{selectedYear}</span></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
