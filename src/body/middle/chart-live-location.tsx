import React, { useState, useEffect, useCallback } from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, PointElement, LineElement, Tooltip, Legend, CategoryScale, LinearScale, Title } from 'chart.js';


const catColors = ["#4A8CC3", "#8FBC89", "#E37939"];
const catColor_30 = ["#4A8CC322", "#8FBC8922", "#E3793922"]
const backgroundImage = new Image();
backgroundImage.src = '/src/assets/2024-05-14-00-58-37-465828.jpg';

const backgroundImagePlugin = {
  id: 'backgroundImagePlugin',
  beforeDraw: (chart) => {
      if (backgroundImage.complete) {
          const { ctx, chartArea: { left, top, width, height } } = chart;
          ctx.save();
          ctx.drawImage(backgroundImage, left, top, width, height);
          ctx.restore();
      }
  }
};

const customRectPlugin = {
  id: 'customRectPlugin',
  afterDraw(chart) {
    const { ctx, scales: { x, y } } = chart;

    ctx.save(); // Save the initial state once

    chart.data.datasets.forEach(dataset => {
      ctx.fillStyle = dataset.backgroundColor;
      ctx.lineWidth = 1;
      ctx.strokeStyle = dataset.borderColor || 'black';

      dataset.data.forEach(point => {
        const xPixel = x.getPixelForValue(point.x);
        const yPixel = y.getPixelForValue(point.y);
        const xPixelWidth = Math.abs(x.getPixelForValue(point.x + point.width) - xPixel); // Width relative to x scale
        const yPixelHeight = Math.abs(y.getPixelForValue(point.y + point.high) - yPixel); // Height relative to y scale
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


const options= {
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
  }
}

const formatDateApi = (date) => {
  const pad = (num) => (num < 10 ? '0' + num : num.toString());
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
         `-${pad(date.getHours())}-${pad(date.getMinutes())}-${pad(date.getSeconds())}`;
};

const LiveLocation = () => {
  const [chartData, setChartData] = useState(null);

  const fetchChartData = useCallback((start, end) => {
    const formattedStart = formatDateApi(start);
    const formattedEnd = formatDateApi(end);
    const url = `http://70.175.151.113:10000/v1/ai-cat/chart-data/live-locations/${formattedStart}/${formattedEnd}/10`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setChartData(data);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
      });
  }, []);

  console.log("====", chartData)
  useEffect(() => {
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 60 * 60 * 1000); // one hour before current time

    fetchChartData(startDate, endDate);
  }, [fetchChartData]);

  if (!chartData) {
    return <p>Loading...</p>;
  }

  const data = {
    datasets: [
          {
          label: 'Custom Rectangles',
          data: chartData[0],
          backgroundColor: catColor_30[0],
          borderColor: catColors[0]
          },
          {
          label: 'Custom Rectangles',
          data: chartData[1],
          backgroundColor: catColor_30[1],
          borderColor: catColors[1]
          },
          {
          label: 'Custom Rectangles',
          data: chartData[2],
          backgroundColor: catColor_30[2],
          borderColor: catColors[2]
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
  
