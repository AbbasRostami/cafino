// "use client";
// import { Skeleton } from "@/components/ui/skeleton";
// import { ApexOptions } from "apexcharts";
// import { useTheme } from "next-themes";
// import ReactApexChart from "react-apexcharts";
// import { BsBookmarkStarFill } from "react-icons/bs";

// const Statistics = () => {
//   const { theme } = useTheme();

//   const series = [
//     Number(10),
//     Number(10),
//   ];
//   const chartOptions: ApexOptions = {
//     chart: {
//       width: 380,
//       type: "donut" as const,
//     },
//     labels: ["کل رزرو ها", "کل خانه ها", "کل کاربران", "امتیاز میانگین"],
//     stroke: {
//       show: false,
//       width: 0,
//       colors: ["transparent"],
//     },
//     colors: ["#F97316", "#FACC15", "#4ADE80", "#60A5FA"],
//     legend: {
//       position: "right",
//       fontSize: "16px",
//       fontWeight: 400,
//       labels: {
//         colors: theme === "dark" ? "#F97316" : "#000",
//         useSeriesColors: false,
//       },

//       markers: {
//         size: 8,
//         offsetX: 5,
//       },
//       itemMargin: {
//         horizontal: 10,
//         vertical: 5,
//       },
//       inverseOrder: true,
//       formatter: function (seriesName: any, opts: any) {
//         const value = opts.w.globals.series[opts.seriesIndex];
//         return ` <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
//             <span style="flex:1;  text-align: right;">  ${value} : <b>${seriesName}</b></span>
//           </div>
//         `;
//       },
//     },
//     responsive: [
//       {
//         breakpoint: 480,
//         options: {
//           chart: {
//             width: 200,
//           },
//           legend: {
//             position: "bottom",
//           },
//         },
//       },
//     ],
//   };

//   return (
//     <div className="shadow-xl transition-all duration-300 items-center justify-center h-full rounded-2xl bg-white/90 border hover:bg-gray-100 border-gray-200 dark:border-gray-800  dark:hover:bg-gray-700/80 dark:bg-gray-900 p-4 space-y-4">
//       <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
//         <BsBookmarkStarFill className="text-color1" size={24} />
//         وضعیت رزروها
//       </h2>
//       {true ? (
//         <div className="flex justify-center items-center h-[200px]">
//           <Skeleton

//             className="rounded-full w-[180px] h-[180px]"
//           />
//         </div>
//       ) : (
//         <ReactApexChart
//           className="flex items-center justify-center"
//           options={chartOptions}
//           series={series}
//           type="donut"
//           height={200}
//         />
//       )}
//     </div>
//   );
// };

// export default Statistics;
