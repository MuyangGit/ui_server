import React from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, PointElement, LineElement, Tooltip, Legend, CategoryScale, LinearScale, Title } from 'chart.js';


const catColors = ["#4A8CC3", "#8FBC89", "#E37939"];

const backgroundImage = new Image();
backgroundImage.src = '/src/assets/live-bg.jpg';
backgroundImage.onload = () => {
    // Create the chart once the image is loaded
    createChart();
};

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
        const yPixelHeight = Math.abs(y.getPixelForValue(point.y + point.height) - yPixel); // Height relative to y scale
        const borderRadius = point.borderRadius || 0;

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


const data = {
    datasets: [
        {
            label: 'Custom Rectangles',
            data: [
                { x: 200, y: 500, width: 180, height: 250, borderRadius: 5 },
                { x: 600, y: 130, width: 400, height: 200, borderRadius: 8 },
                { x: 1030, y: 700, width: 400, height: 300, borderRadius: 8 },
            ],
            backgroundColor: "#4A8CC377",
            borderColor: "#4A8CC3"
        },
    ],
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
      display:false
    }
  },
  plugins: {
    legend: {
        display: false,  // Set legend display to false
    },
  }
}

  const LiveLocation = () => {

    return (
      <div id="live-location-scatter-container">
        <Scatter id="live-location-scatter" data={data} options={options} plugins={[backgroundImagePlugin, customRectPlugin]} />
      </div>
    );
};

export default LiveLocation;
  
