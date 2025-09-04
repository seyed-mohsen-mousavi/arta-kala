"use client";
import { convertNumberToPersian } from "@/utils/converNumbers";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface Order {
  order_date: string;
}

interface Commission {
  created_at: string;
  commission: number;
}

interface ChartProps {
  orders: Order[];
  commissions: Commission[];
}

function groupData(ordersData: any, commissionsData: any) {
  const grouped: Record<string, { orders: number; commission: number }> = {};

  ordersData.forEach((order: Order) => {
    const date = formatShamsiDate(order.order_date.split(" ")[0]);
    if (!grouped[date]) grouped[date] = { orders: 0, commission: 0 };
    grouped[date].orders += 1;
  });

  commissionsData.forEach((com: Commission) => {
    const date = formatShamsiDate(com.created_at.split(" ")[0]);
    if (!grouped[date]) grouped[date] = { orders: 0, commission: 0 };
    grouped[date].commission += com.commission;
  });

  return Object.keys(grouped).map((date) => ({
    date,
    orders: grouped[date].orders,
    commission: grouped[date].commission,
  }));
}
const CustomLegend = () => {
  return (
    <ul style={{ display: "flex", listStyle: "none", padding: 0 }}>
      <li style={{ marginRight: 16, display: "flex", alignItems: "center" }}>
        <span
          style={{
            width: 12,
            height: 12,
            background: "#4f46e5",
            display: "inline-block",
            marginLeft: 6,
          }}
        />
        تعداد سفارش‌ها
      </li>
      <li style={{ marginRight: 16, display: "flex", alignItems: "center" }}>
        <span
          style={{
            width: 12,
            height: 12,
            background: "#10b981",
            display: "inline-block",
            marginLeft: 6,
          }}
        />
        پورسانت
      </li>
    </ul>
  );
};
function formatShamsiDate(dateString: string) {
  const [year, month, day] = dateString.split("-").map(Number);
  const monthNames = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ];

  const persianDay = convertNumberToPersian(day);
  const persianMonth = monthNames[month - 1];
  const persianYear = convertNumberToPersian(year);

  return `${persianDay} ${persianMonth} ${persianYear}`;
}

function Chart({ orders, commissions }: ChartProps) {
  const chartData = groupData(orders, commissions);

  return (
    <div className="bg-white p-4 rounded-xl h-full col-span-5">
      <h2 className="font-semibold text-xl mb-4">
        📈 سفارش‌ها و پورسانت روزانه
      </h2>
      <div className="h-96" dir="rtl">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          >
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const orderData = payload.find((p) => p.dataKey === "orders");
                  const commissionData = payload.find(
                    (p) => p.dataKey === "commission"
                  );

                  return (
                    <div
                      style={{
                        backgroundColor: "white",
                        border: "1px solid #ccc",
                        padding: "8px",
                        borderRadius: "8px",
                        textAlign: "right",
                      }}
                    >
                      <strong>{payload[0].payload.date}</strong>
                      {orderData && (
                        <p style={{ color: "#4f46e5" }}>
                          {orderData.value.toLocaleString("fa-IR")} سفارش
                        </p>
                      )}
                      {commissionData && (
                        <p style={{ color: "#10b981" }}>
                          {commissionData.value.toLocaleString("fa-IR")} تومان
                        </p>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend content={<CustomLegend />} />
            <Line
              type="monotone"
              dataKey="orders"
              stroke="#4f46e5"
              strokeWidth={1}
              dot={{ r: 3 }}
            />
            <Line
              type="monotone"
              dataKey="commission"
              stroke="#10b981"
              strokeWidth={1}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Chart;
