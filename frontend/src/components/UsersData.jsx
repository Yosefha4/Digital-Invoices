import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title
);

const UsersData = () => {
  const [invoicesData, setInvoicesData] = useState([]);
  const [invoiceCounts, setInvoiceCounts] = useState([]);
  const [totalAmounts, setTotalAmounts] = useState([]);
  const [selectedYear, setSelectedYear] = useState(2023);


  const years = Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i);





  useEffect(() => {
    fetchInvoicesData();

    
  }, []);

  useEffect(() => {

    // const counts  = calcInvoicesPerMonth(invoicesData);
    const counts = calculateInvoiceData(invoicesData, selectedYear);

    const amounts = calculateTotalAmounts(invoicesData);

    setInvoiceCounts(counts);
    setTotalAmounts(amounts)
    console.log("amounts : " + amounts)

    // console.log(invoiceCounts);
  }, [invoicesData,selectedYear]);

  // console.log(new Date().getFullYear())


  const fetchInvoicesData = async () => {
    try {
      const res = await axios.get("http://localhost:5002/api/invoices");
      setInvoicesData(res.data);
      console.log("invoicesData : " + res.data[3].total_amount);
    } catch (error) {
      console.log("Error fetch invoices !");
    }
  };

  const calcInvoicesPerMonth = (data) => {
    const counts = Array(12).fill(0); // Initialize an array with 12 elements, all set to 0
    
    data.forEach((item) => {
      const month = parseInt(item.invoice_date.split("-")[1]) - 1; // Adjust month to 0-based index
      counts[month]++;
    });
    return counts;
  };

  function calculateInvoiceData(data, year) {
    const invoiceCounts = Array(12).fill(0); // Initialize an array with 12 elements, all set to 0
  
    data.forEach(item => {
      const invoiceYear = parseInt(item.invoice_date.split('-')[0]);
      if (invoiceYear === year) {
        const monthIndex = parseInt(item.invoice_date.split('-')[1]) - 1; // Adjust month to 0-based index
        invoiceCounts[monthIndex]++;
      }
    });
  
    return invoiceCounts;
  }


  const calculateTotalAmounts = (data) => {
    const totalAmounts = Array(12).fill(0); // Initialize an array with 12 elements, all set to 0
  
    data.forEach(item => {
      const monthIndex = parseInt(item.invoice_date.split('-')[1]) - 1; // Adjust month to 0-based index
      const totalAmount = parseFloat(item.total_amount);
      totalAmounts[monthIndex] += totalAmount;
    });
  
    return totalAmounts;
  }

  const dataPie = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Total Amount by Month",
        data: invoiceCounts ? invoiceCounts :  [12, 19, 3, 5, 2, 3, 1, 10, 9, 40, 20, 14],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)", // Red
          "rgba(54, 162, 235, 0.2)", // Blue
          "rgba(255, 206, 86, 0.2)", // Yellow
          "rgba(75, 192, 192, 0.2)", // Green
          "rgba(153, 102, 255, 0.2)", // Purple
          "rgba(255, 159, 64, 0.2)", // Orange
          "rgba(255, 205, 86, 0.2)", // Light Yellow
          "rgba(75, 192, 192, 0.2)", // Teal
          "rgba(54, 162, 235, 0.2)", // Sky Blue
          "rgba(255, 99, 132, 0.2)", // Pink
          "rgba(153, 102, 255, 0.2)", // Lavender
          "rgba(255, 159, 64, 0.2)", // Light Orange
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)", // Red
          "rgba(54, 162, 235, 1)", // Blue
          "rgba(255, 206, 86, 1)", // Yellow
          "rgba(75, 192, 192, 1)", // Green
          "rgba(153, 102, 255, 1)", // Purple
          "rgba(255, 159, 64, 1)", // Orange
          "rgba(255, 205, 86, 1)", // Light Yellow
          "rgba(75, 192, 192, 1)", // Teal
          "rgba(54, 162, 235, 1)", // Sky Blue
          "rgba(255, 99, 132, 1)", // Pink
          "rgba(153, 102, 255, 1)", // Lavender
          "rgba(255, 159, 64, 1)", // Light Orange
        ],
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Amounts Bar Chart",
      },
    },
  };
  const barData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Total Amount of Invoices per Month",
        data: totalAmounts ? totalAmounts : [1000, 1200, 800, 1500, 2000, 1800, 1600, 1900, 2200, 2500, 2300, 2100,], // Replace with your total amount data
        backgroundColor: "lightblue", // Blue
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="user-data-cont">
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <div className="sBox">
        <h1>Total Invoices by Month</h1>

<select id="yearSelect" value={selectedYear} onChange={e => setSelectedYear(parseInt(e.target.value))}>
{years.map((year, index) => (
  <option key={index} value={year}>
    {year}
  </option>
))}
</select>
        </div>
              
        {invoicesData && <Pie data={dataPie} style={{ marginTop: 20 }} />}
      </div>
      <div className="barchart">
        <h1>Total Invoices by Month</h1>
        {invoicesData && (
          <Bar data={barData} style={{ width: "70%" }} options={barOptions} />
        )}
      </div>
    </div>
  );
};

export default UsersData;
