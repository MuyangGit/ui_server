import { useState, useEffect, useCallback } from 'react';
import { Scatter } from 'react-chartjs-2';

import { Chart as ChartJS, LineController } from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(
  LineController
);

const catColors = ["#4A8CC3", "#8FBC89", "#E37939"];
const catColor_30 = ["#4A8CC322", "#8FBC8922", "#E3793922"]
const catColor_60 = ["#4A8CC399", "#8FBC8999", "#E3793999"]
const backgroundImage = new Image();
backgroundImage.src = '/assets/2024-05-14-19-42-34-671553.jpg'

const backgroundImagePlugin = {
  id: 'backgroundImagePlugin',
  beforeDraw: (chart: any) => {
      if (backgroundImage.complete) {
          const { ctx, chartArea: { left, top, width, height } } = chart;
          ctx.save();
          ctx.globalAlpha = 0.3;
          ctx.drawImage(backgroundImage, left, top, width, height);
          ctx.restore();
      }
  }
};

const customRectPlugin = {
  id: 'customRectPlugin',
  afterDraw(chart: any) {
    const { ctx, scales: { x, y } } = chart;

    ctx.save(); // Save the initial state once
    chart.data.datasets.forEach((dataset: { rectBackgroundColor: any; rectBorderColor: string; data: any[]; }) => {
      ctx.fillStyle = dataset.rectBackgroundColor;
      ctx.lineWidth = 1;
      ctx.strokeStyle = dataset.rectBorderColor || 'black';

      dataset.data.forEach((point: { x: any; y: any; width: any; height: any; }) => {
        const xPixel = x.getPixelForValue(point.x);
        const yPixel = y.getPixelForValue(point.y);
        const xPixelWidth = Math.abs(x.getPixelForValue(point.x + point.width) - xPixel); // Width relative to x scale
        const yPixelHeight = Math.abs(y.getPixelForValue(point.y + point.height) - yPixel); // Height relative to y scale
        const borderRadius = 5;

        ctx.beginPath();
        // Top left corner
        ctx.moveTo(xPixel - xPixelWidth / 2 + borderRadius, yPixel - yPixelHeight / 2);
        ctx.lineTo(xPixel + xPixelWidth / 2 - borderRadius, yPixel - yPixelHeight / 2);
        ctx.quadraticCurveTo(xPixel + xPixelWidth / 2, yPixel - yPixelHeight / 2, xPixel + xPixelWidth / 2, yPixel - yPixelHeight / 2 + borderRadius);
        ctx.lineTo(xPixel + xPixelWidth / 2, yPixel + yPixelHeight / 2 - borderRadius);
        ctx.quadraticCurveTo(xPixel + xPixelWidth / 2, yPixel + yPixelHeight / 2, xPixel + xPixelWidth / 2 - borderRadius, yPixel + yPixelHeight / 2);
        ctx.lineTo(xPixel - xPixelWidth / 2 + borderRadius, yPixel + yPixelHeight / 2);
        ctx.quadraticCurveTo(xPixel - xPixelWidth / 2, yPixel + yPixelHeight / 2, xPixel - xPixelWidth / 2, yPixel + yPixelHeight / 2 - borderRadius);
        ctx.lineTo(xPixel - xPixelWidth / 2, yPixel - yPixelHeight / 2 + borderRadius);
        ctx.quadraticCurveTo(xPixel - xPixelWidth / 2, yPixel - yPixelHeight / 2, xPixel - xPixelWidth / 2 + borderRadius, yPixel - yPixelHeight / 2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      });
    });

    ctx.restore(); // Restore the initial state once
  }
};

const options:any = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      type: 'linear',
      position: 'bottom',
      min:0,
      max:1920,
      display:false
    },
    y: {
      min: 0,
      max: 1080,
      display:false,
      reverse: true
    }
  },
  plugins: {
    legend: {
        display: false,  // Set legend display to false
    },
  },
  animation: {
      duration: 0
  },
  elements: {
      line: {
          borderDash: [10, 5],
          borderWidth:1,
          tension: 0.3 // Disables bezier curves
      }
  }
}

const formatDateApi = (date: { getFullYear: () => any; getMonth: () => number; getDate: () => any; getHours: () => any; getMinutes: () => any; getSeconds: () => any; }) => {
  const pad = (num: number) => (num < 10 ? '0' + num.toString() : num.toString());
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
         `-${pad(date.getHours())}-${pad(date.getMinutes())}-${pad(date.getSeconds())}`;
};

const LiveLocation = () => {
  const [chartData, setChartData] = useState([]);

  const fetchChartData = useCallback((start: any, end: any) => {
    const formattedStart = formatDateApi(start);
    const formattedEnd = formatDateApi(end);
    const url = `http://70.175.151.113:10000/v1/ai-cat/chart-data/live-locations/${formattedStart}/${formattedEnd}/30`;
    console.log(url)

    fetch(url)
      .then(response => response.json())
      .then(data => {
          console.log(data)
        setChartData(data);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
      });
  }, []);

    useEffect(() => {
      const fetchData = () => {
        const endDate = new Date();
        const startDate = new Date(endDate.getTime() - 1 * 60 * 1000); // 10 minutes before current time
        fetchChartData(startDate, endDate);
      };

      fetchData();
      const intervalId = setInterval(fetchData, 20000);
      return () => clearInterval(intervalId);
    }, [fetchChartData]);  // Dependency on fetchChartData, ensure it's stable


  const data = {
    datasets: [
      {
      label: 'Custom Rectangles',
      data: chartData[0],
      backgroundColor: "#0000",
      rectBackgroundColor: catColor_30[0],
      rectBorderColor: catColors[0],
      borderColor: catColor_60[0],
      showLine:true,
      borderDash: [10, 5],
      pointRadius: chartData[0+100]
      },
      {
      label: 'Custom Rectangles',
      data: chartData[1],
      backgroundColor: "#0000",
      rectBackgroundColor: catColor_30[1],
      rectBorderColor: catColors[1],
      borderColor: catColor_60[1],
      showLine:true,
      pointRadius: chartData[1+100]
      },
      {
      label: 'Custom Rectangles',
      data: chartData[2],
      backgroundColor: "#0000",
      rectBackgroundColor: catColor_30[2],
      rectBorderColor: catColors[2],
      borderColor: catColor_60[2],
      showLine:true,
      borderDash: [10, 5],
      pointRadius: chartData[2+100]
      },
    ],
  };

  return (
    <div id="live-location-scatter-container">
      <Scatter
        id="live-location-scatter"
        data={data}
        options={options}
        plugins={[backgroundImagePlugin, customRectPlugin]}
      />
    </div>
  );
};

export default LiveLocation;

