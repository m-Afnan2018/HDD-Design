"use client";
import React from "react";
import LineChart from "../chart/line-chart";

const SalesReport = () => {

  return (
    <>
      <div className="chart-main-wrapper mb-6 grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <div className="chart-single bg-white py-3 px-3 sm:py-10 sm:px-10 h-fit rounded-md">
            <h3 className="text-xl">Sales Statistics</h3>
            <LineChart/>
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesReport;
