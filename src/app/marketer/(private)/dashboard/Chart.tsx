"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
const monthlyCommission = [
  { month: "فروردین", value: 120000 },
  { month: "اردیبهشت", value: 180000 },
  { month: "خرداد", value: 95000 },
  { month: "تیر", value: 230000 },
  { month: "مرداد", value: 0 },
];

function Chart() {
  return (
    <div className="col-span-1 sm:col-span-2 lg:col-span-5">
      <div className="bg-white p-4 rounded-xl h-full">
        <div className="flex items-center gap-2">
          <div className="bg-gray-200 rounded-lg w-5 h-10" />
          <h2 className="font-semibold text-xl">گزارش پورسانت ماهانه</h2>
        </div>

        <div className="mt-4 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyCommission}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value: number) => `${value.toLocaleString()} تومان`}
              />
              <Bar dataKey="value" fill="#8884d8" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Chart;
