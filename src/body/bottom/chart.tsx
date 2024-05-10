import React, { useState, useEffect } from 'react';

import { Line, Chart, Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, Filler, LinearScale, BarElement, PointElement, LineElement,ArcElement, Title, Tooltip, Legend, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  Filler
);


const catColors = ["#4A8CC3", "#8FBC89", "#E37939"];

const formatDate = (date) => {
    const pad = (num) => (num < 10 ? '0' + num : num.toString());
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
           `T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};

const formatDateApi = (date) => {
    const pad = (num) => (num < 10 ? '0' + num : num.toString());
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
           `-${pad(date.getHours())}-${pad(date.getMinutes())}-${pad(date.getSeconds())}`;
};

const getFormattedDateRange = () => {
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 60 * 60 * 1000); // one hour before current time
    return {
        start: formatDate(startDate),
        end: formatDate(endDate)
    };
};

const handleResponse = (response) => {
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
};

const createDetailOptions = (start, end) => ({
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
});

const createDetailData = (detections, catStatus, detectedPeriods, imageInfo, catColor) => {

    const catColor_60 = catColor + "99"
    const catColor_30 = catColor + "22"

    return {
        datasets: [
            {
                type: "line",
                data: detectedPeriods["detected_period_fill_to"],
                borderWidth: 0,
                borderColor: catColor_30,
                pointRadius: 0,
            },
            {
                type: "line",
                label: 'Detected Period',
                data: detectedPeriods["detected_period_fill_from"],
                borderWidth: 0,
                fill: "-1",
                pointRadius: 0,
                backgroundColor: catColor_30
            },
            {
                type: "line",
                label: 'Detections',
                data: detections["x"],
                borderWidth: 2,
                borderColor: catColor, // Assuming catId = 0
                fill: "-1",
                pointRadius: 0,
                borderCapStyle: "round",
            },
            {
                type: "line",
                label: 'Cat Status',
                data: catStatus["cat_status"],
                borderWidth: 10,
                borderColor: catColor_60,
                pointRadius: 0,
                borderCapStyle: "round",
                borderOpacity: 0.6,
            },
            {
                type: "bar",
                label: 'RGB Frames',
                data: imageInfo["image_frequency"],
            },
        ],
    }
};


const ChartComponent = ({ startDate, endDate, catId }) => {
    console.log("Cart Component::", startDate, endDate, catId )
    const [chartData, setChartData] = useState(null);
    const [chartOptions, setChartOptions] = useState(null);

    const fetchChartData = (start, end, catIdentifier) => {
        console.log(start, end, catIdentifier)
        const formattedAxisStart = formatDate(new Date(start));
        const formattedAxisEnd = formatDate(new Date(end));
        setChartOptions(createDetailOptions(formattedAxisStart, formattedAxisEnd));

        const formattedStart = formatDateApi(new Date(start));
        const formattedEnd = formatDateApi(new Date(end));

        const urls = [
            `http://70.175.151.113:10000/v1/ai-cat/chart-data/detections/${formattedStart}/${formattedEnd}/${catIdentifier}`,
            `http://70.175.151.113:10000/v1/ai-cat/chart-data/cat-status/${formattedStart}/${formattedEnd}/${catIdentifier}`,
            `http://70.175.151.113:10000/v1/ai-cat/chart-data/detected-periods/${formattedStart}/${formattedEnd}/${catIdentifier}`,
            `http://70.175.151.113:10000/v1/ai-cat/chart-data/image-info/${formattedStart}/${formattedEnd}`
        ];
        console.log(urls)
        Promise.all(urls.map(url => fetch(url).then(handleResponse)))
            .then(([detections, catStatus, detectedPeriods, imageInfo]) => {
                const data = createDetailData(detections, catStatus, detectedPeriods, imageInfo, catColors[catId]);
                setChartData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    useEffect(() => {
        fetchChartData(startDate, endDate, catId);
    }, [startDate, endDate, catId]);

    return (
        <div className="bar_chart">
            {chartData && chartOptions && <Chart data={chartData} options={chartOptions} />}
        </div>
    );
};

export default ChartComponent;