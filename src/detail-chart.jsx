import React, { useState, useEffect } from 'react';
import { Chart } from 'react-chartjs-2';


const endDate = new Date(); // current time
const startDate = new Date(endDate.getTime() - 60 * 60 * 1000); // one hour before current time
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
      max: 1.2,
    },
  },
  maintainAspectRatio: false,
};

const catColors = ["#4A8CC3", "#E37939", "#8FBC89"]
const catId = 0

function createDetailData(detections, catStatus, detectedPeriods, imageInfo) {
  console.log(imageInfo["image_frequency"])
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
        label: 'Detections',
        data: detections["x"],
        borderWidth: 2,
        borderColor: catColors[catId],
        fill: "-1",
        pointRadius: 0,
        },

        {
        type: "line",
        label: 'Cat Status',
        data: catStatus["cat_status"],
        borderWidth: 10,
        borderColor: "#a225",
        pointRadius: 0,
        borderCapStyle:"round",
        },

        {
        type: "bar",
        label: 'RGB Frames',
        data: imageInfo["image_frequency"],
        },
      ],
  };
}


function formatDate(date) {
    const pad = (num) => (num < 10 ? '0' + num : num.toString());
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
           `-${pad(date.getHours())}-${pad(date.getMinutes())}-${pad(date.getSeconds())}`;
}

function handleResponse(response) {
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    console.log(response)
    return response.json();
}

function ChartComponent() {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {

        const start = formatDate(startDate);
        const end = formatDate(endDate);

        const urlDetections = `http://70.175.151.113:10000/v1/ai-cat/chart-data/detections/${start}/${end}/${catId}`;
        const urlCatStatus = `http://70.175.151.113:10000/v1/ai-cat/chart-data/cat-status/${start}/${end}/${catId}`;
        const urlDetectedPeriods = `http://70.175.151.113:10000/v1/ai-cat/chart-data/detected-periods/${start}/${end}/${catId}`;
        const urlImageInfo = `http://70.175.151.113:10000/v1/ai-cat/chart-data/image-info/${start}/${end}`;
	console.log(urlDetections)
	console.log(urlCatStatus)
	console.log(urlDetectedPeriods)	
    console.log(urlImageInfo)	
        Promise.all([
            fetch(urlDetections).then(handleResponse),
            fetch(urlCatStatus).then(handleResponse),
            fetch(urlDetectedPeriods).then(handleResponse),
            fetch(urlImageInfo).then(handleResponse),
        ]).then(([detections, catStatus, detectedPeriods, imageInfo]) => {
	    console.log(detections)
	    console.log(catStatus)
	    console.log(detectedPeriods)
        console.log(imageInfo)
            const data = createDetailData(detections, catStatus, detectedPeriods, imageInfo);
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
