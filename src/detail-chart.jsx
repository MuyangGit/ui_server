import React, { useState, useEffect } from 'react';
import { Chart } from 'react-chartjs-2';


const endDate = new Date(); // current time
const startDate = new Date(endDate.getTime() - 30 * 60 * 1000); // one hour before current time
function formatDate_t(date) {
    const pad = (num) => (num < 10 ? '0' + num : num.toString());
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
           `T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}
const start = formatDate_t(startDate);
const end = formatDate_t(endDate);
const detailOptions = {
  scales: {
    x: {
       type: "time",
       beginAtZero: false,
       min: start,
       max: end,
    },
    y: {
      beginAtZero: true,
      min: -0.2,
      max: 1.2
    },
  },
  maintainAspectRatio: false,
};

const catId = 1

function createDetailData(detections, catStatus, detectedPeriods) {
  return {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [
        {
            type: "line",
            data: detectedPeriods["detected_period_fill_to"],
            borderWidth: 0,
            borderColor: "#2a2",
            pointRadius: 0,
        },
        {
            type: "line",
            label: 'Detected Period',
            data: detectedPeriods["detected_period_fill_from"],
            borderWidth: 0,
            borderColor: "#2a2",
            fill: "-1",
            pointRadius: 0,
            backgroundColor: "#22a2"
        },

        {
            type: "line",
            data: detections["y_min"],
            borderWidth: 0,
            borderColor: "#2a2",
            pointRadius: 0,
        },
        {
            type: "line",
            label: 'Detections',
            data: detections["y_max"],
            borderWidth: 0,
            borderColor: "#2a2",
            fill: "-1",
            pointRadius: 0,
            backgroundColor: "#22a9"
        },

        {
        type: "line",
        label: 'Cat Status',
        data: catStatus["cat_status"],
        borderWidth: 10,
        borderColor: "#a225",
        pointRadius: 0,
        borderCapStyle:"round",
        }
      ],
  };
}


function formatDate(date) {
    const pad = (num) => (num < 10 ? '0' + num : num.toString());
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
           `-${pad(date.getHours())}-${pad(date.getMinutes())}-${pad(date.getSeconds())}`;
}


function ChartComponent() {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {

        // Function to format date in API required format YYYY-MM-DD-HH-MM-SS

        const start = formatDate(startDate);
        const end = formatDate(endDate);

        const urlDetections = `http://192.168.0.96:5000/v1/ai-cat/chart-data/detections/${start}/${end}/${catId}`;
        const urlCatStatus = `http://192.168.0.96:5000/v1/ai-cat/chart-data/cat-status/${start}/${end}/${catId}`;
        const urlDetectedPeriods = `http://192.168.0.96:5000/v1/ai-cat/chart-data/detected-periods/${start}/${end}/${catId}`;

        console.log(urlDetections)
        console.log(urlCatStatus)
        console.log(urlDetectedPeriods)

        Promise.all([
            fetch(urlDetections).then(res => res.json()),
            fetch(urlCatStatus).then(res => res.json()),
            fetch(urlDetectedPeriods).then(res => res.json()),
        ]).then(([detections, catStatus, detectedPeriods]) => {
            const data = createDetailData(detections, catStatus, detectedPeriods);
            setChartData(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);

    return (
        <div className="bar_chart">
            {chartData && <Chart data={chartData} options={detailOptions} />}
        </div>
    );
}

export default ChartComponent;

