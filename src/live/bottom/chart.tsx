import { useState, useEffect } from 'react';

import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, Filler, LinearScale, BarElement, PointElement, LineElement,ArcElement, Title, Tooltip, Legend, TimeScale, LineController, BarController } from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  BarController,
  LineController,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  Filler
);


const catColors = ["#4A8CC3", "#8FBC89", "#E37939"];

const formatDate = (date:any) => {
    const pad = (num:any) => (num < 10 ? '0' + num : num.toString());
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
           `T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};

const formatDateApi = (date:any) => {
    const pad = (num:any) => (num < 10 ? '0' + num : num.toString());
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
           `-${pad(date.getHours())}-${pad(date.getMinutes())}-${pad(date.getSeconds())}`;
};

const handleResponse = (response:any) => {
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
};

const now = new Date();

const createDetailOptions = (start:string, end:string) => ({
    plugins: {
        legend: {
            display: false
        },
    },
    scales: {
        x: {
            type: "time",
            beginAtZero: false,
            min: start,
            max: end,
            ticks: {
                max: now,
                maxTicksLimit: 6, // Control the maximum number of ticks
            },
            grid: {
                display: false,
                alignToPixels: true,
                drawTicks: false
            },
            stacked: true,
        },
        y: {
            beginAtZero: true,
            min: -0.2,
            max: 1.2,
            grid:{
                color: function(context:any) {
                    if (context.tick.value === 0 || context.tick.value === 1) {
                        return 'rgba(0, 0, 0, 0.1)';
                    }
                    return 'rgba(0, 0, 0, 0)';
                }
            },
            ticks:{
                color: function(context:any) {
                    if (context.tick.value >=0 && context.tick.value <=1) {
                        return 'rgba(0, 0, 0, 0.5)';
                    }
                    return 'rgba(0, 0, 0, 0)';
                }
            }
        },
    },
    maintainAspectRatio: false,
});

const createDetailData = (detections:any, catStatus:any, detectedPeriods:any, imageInfo:any, catColor:any) => {

    const catColor_60 = catColor + "99"
    const catColor_30 = catColor + "22"

    return {
        datasets: [
            {
                type: "line",
                label: 'Detected Period',
                data: detectedPeriods["detected_period_fill_to"],
                borderWidth: 0,
                borderColor: catColor_30,
                pointRadius: 0,
                fill:'origin'
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
                data: imageInfo["rgb_result_json"],
                barThickness:15,
                borderRadius:10,
                backgroundColor: "#dd66",
                borderColor: "#dd66",
                borderWidth:0.5,
                borderSkipped: 'end',
            },
            {
                type: "bar",
                label: 'Grey Frames',
                data: imageInfo["grey_result_json"],
                barThickness:15,
                borderRadius:10,
                backgroundColor: "#6666",
                borderColor: "#6666",
                borderWidth:0.5,
                borderSkipped: 'end',
            },
        ],
    }
};

const ChartComponent = ({ startDate, endDate, catId }:any) => {
    const [chartData, setChartData] = useState(null);
    const [chartOptions, setChartOptions] = useState(null);

    const fetchChartData = (start:string, end:string, catIdentifier:any) => {
        const formattedAxisStart = formatDate(new Date(start));
        const formattedAxisEnd = formatDate(new Date(end));
        const detailOptionAny:any = createDetailOptions(formattedAxisStart, formattedAxisEnd)
        setChartOptions(detailOptionAny);

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
                const data:any = createDetailData(detections, catStatus, detectedPeriods, imageInfo, catColors[catId]);
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
            {chartData && chartOptions && <Chart data={chartData} options={chartOptions} type='line'/>}
        </div>
    );
};

export default ChartComponent;