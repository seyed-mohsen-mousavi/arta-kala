// "use client";
// import React, { useRef } from "react";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import { useUser } from "@/context/UserContext";
// import { convertNumberToPersian } from "@/utils/converNumbers";
// import { useCart } from "@/context/CartContextProvider";
"use client";
import "@/styles/pdf.css";

// export default function TestPdfComponent() {
//   const pdfRef = useRef<HTMLDivElement>(null);
//   const { user } = useUser();
//   const { cart } = useCart();

//   const downloadPdf = async () => {
//     const element = pdfRef.current;
//     if (!element) return;

//     const canvas = await html2canvas(element, { scale: 2 });
//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF("p", "mm", "a4");

//     const pageWidth = pdf.internal.pageSize.getWidth();
//     const imgProps = pdf.getImageProperties(imgData);
//     const imgHeight = (imgProps.height * pageWidth) / imgProps.width;

//     pdf.addImage(imgData, "PNG", 0, 0, pageWidth, imgHeight);
//     pdf.save("invoice.pdf");
//   };

//   const now = new Date();
//   const persianDate = now.toLocaleDateString("fa-IR");

//   return (
//     <div className="pdf-container">
//       <div ref={pdfRef} className="invoice" dir="rtl">
//         <div className="invoice-header">
//           <h1>فروشگاه آنلاین کفش‌چی</h1>
//           <div className="date">تاریخ: {persianDate}</div>
//         </div>

//         <div className="customer-info">
//           <p>
//             <strong>نام مشتری:</strong> {user?.identity.first_name}{" "}
//             {user?.identity.last_name}
//           </p>
//           <p>
//             <strong>شماره تماس:</strong>{" "}
//             {convertNumberToPersian(String(user?.identity.phone_number))}
//           </p>
//         </div>

//         <table className="product-table">
//           <thead>
//             <tr>
//               <th>نام محصول</th>
//               <th>تعداد</th>
//               <th>قیمت واحد</th>
//               <th>قیمت کل</th>
//             </tr>
//           </thead>
//           <tbody>
//             {cart?.items?.map((item, index) => (
//               <tr key={index} className={index % 2 === 0 ? "even" : "odd"}>
//                 <td>{item.product_name}</td>
//                 <td>{convertNumberToPersian(item.quantity)}</td>
//                 <td>{convertNumberToPersian(item.unit_price)} تومان</td>
//                 <td>
//                   {convertNumberToPersian(item.unit_price * item.quantity)}{" "}
//                   تومان
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <div className="total">
//           جمع کل: {convertNumberToPersian(cart?.total_price || 0)} تومان
//         </div>
//       </div>

//       <div className="download-btn-wrapper">
//         <button onClick={downloadPdf} className="btn-primary">
//           📥 دانلود PDF پیش‌فاکتور
//         </button>
//       </div>
//     </div>
//   );
// }
import React from "react";
// import "./TestInvoiceComponent.css";

export default function TestInvoiceComponent() {
  const services = [
    {
      name: "تعمیر کفش",
      description: "دوخت و وصله",
      hours: 2,
      rate: 50000,
    },
    {
      name: "واکس کفش",
      description: "واکس کامل",
      hours: 1,
      rate: 30000,
    },
  ];

  const subtotal = services.reduce((acc, s) => acc + s.hours * s.rate, 0);

  const format = (num: number) =>
    num.toLocaleString("fa-IR") + " تومان";

  return (
    <div className="invoice-card" dir="rtl">
      <div className="invoice-head">
        <h2>پیش‌فاکتور جدید</h2>
        <div className="invoice-meta">
          <span>#157</span>
        </div>
      </div>

      <div className="invoice-section">
        <div className="bill-column">
          <h4>فروشنده</h4>
          <p>فروشگاه کفش‌چی</p>
          <p>تهران، ایران</p>
          <p>09120000000</p>
        </div>
        <div className="bill-column">
          <h4>مشتری</h4>
          <p>علی رضایی</p>
          <p>مشهد، ایران</p>
          <p>09350000000</p>
        </div>
      </div>

      <div className="invoice-dates">
        <div>
          <label>تاریخ فاکتور</label>
          <p>22 تیر 1403</p>
        </div>
        <div>
          <label>مهلت پرداخت</label>
          <p>29 تیر 1403</p>
        </div>
      </div>

      <table className="invoice-table">
        <thead>
          <tr>
            <th>نام خدمت</th>
            <th>توضیحات</th>
            <th>ساعت</th>
            <th>نرخ</th>
            <th>مبلغ</th>
          </tr>
        </thead>
        <tbody>
          {services.map((s, i) => (
            <tr key={i}>
              <td>{s.name}</td>
              <td>{s.description}</td>
              <td>{s.hours}</td>
              <td>{format(s.rate)}</td>
              <td>{format(s.hours * s.rate)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="invoice-total">
        <strong>جمع کل: </strong> <span>{format(subtotal)}</span>
      </div>
    </div>
  );
}
