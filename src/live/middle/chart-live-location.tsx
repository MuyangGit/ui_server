import { useState, useEffect, useCallback } from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, LineController } from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(LineController);

const catColors = ["#4A8CC3", "#8FBC89", "#E37939"];
const catColor_30 = ["#4A8CC322", "#8FBC8922", "#E3793922"];
const catColor_60 = ["#4A8CC399", "#8FBC8999", "#E3793999"];

const customRectPlugin = {
  id: 'customRectPlugin',
  afterDraw(chart) {
    const { ctx, scales: { x, y } } = chart;
    ctx.save();
    chart.data.datasets.forEach(dataset => {
      ctx.fillStyle = dataset.rectBackgroundColor;
      ctx.lineWidth = 1;
      ctx.strokeStyle = dataset.rectBorderColor || 'black';
      dataset.data.forEach(point => {
        const xPixel = x.getPixelForValue(point.x);
        const yPixel = y.getPixelForValue(point.y);
        const xPixelWidth = Math.abs(x.getPixelForValue(point.x + point.width) - xPixel);
        const yPixelHeight = Math.abs(y.getPixelForValue(point.y + point.height) - yPixel);
        const borderRadius = 5;

        ctx.beginPath();
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
    ctx.restore();
  }
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      type: 'linear',
      position: 'bottom',
      min: 0,
      max: 1920,
      display: false
    },
    y: {
      min: 0,
      max: 1080,
      display: false,
      reverse: true
    }
  },
  plugins: {
    legend: {
      display: false
    }
  },
  animation: {
    duration: 0
  },
  elements: {
    line: {
      borderDash: [10, 5],
      borderWidth: 1,
      tension: 0.3
    }
  }
};

const formatDateApi = (date) => {
  const pad = (num) => (num < 10 ? '0' + num.toString() : num.toString());
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}-${pad(date.getHours())}-${pad(date.getMinutes())}-${pad(date.getSeconds())}`;
};

const LiveLocation = () => {
  const [chartData, setChartData] = useState([]);
  const [bgImage, setBGImage] = useState("2024-05-17-16-23-11-040249.jpg");

  const backgroundImage = new Image();
  backgroundImage.src = `/assets/${bgImage}`;

  const backgroundImagePlugin = {
    id: 'backgroundImagePlugin',
    beforeDraw: (chart) => {
      if (backgroundImage.complete) {
          console.log(test)
        const { ctx, chartArea: { left, top, width, height } } = chart;
        ctx.save();
        ctx.globalAlpha = 0.3;
        ctx.drawImage(backgroundImage, left, top, width, height);
        ctx.restore();
      }
    }
  };

  const fetchChartData = useCallback((start, end) => {
    const formattedStart = formatDateApi(start);
    const formattedEnd = formatDateApi(end);
    const url = `http://70.175.151.113:10000/v1/ai-cat/chart-data/live-locations/${formattedStart}/${formattedEnd}/30`;
    console.log(url);

    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setChartData(data);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
      });
  }, []);

  useEffect(() => {
    const fetchData = () => {
      const endDate = new Date();
      const startDate = new Date(endDate.getTime() - 1 * 60 * 1000);
      fetchChartData(startDate, endDate);
    };

    fetchData();
    const intervalId = setInterval(fetchData, 20000);
    return () => clearInterval(intervalId);
  }, [fetchChartData]);

  const updateBackground = () => {
    const url = `http://70.175.151.113:10000/v1/ai-cat/chart-data/update-background`;
    console.log(url);

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log("updated new image:", data);
        setBGImage(data["image_name"]);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
      });
  };

  const data = {
    datasets: [
      {
        label: 'Custom Rectangles',
        data: chartData[0],
        backgroundColor: "#0000",
        rectBackgroundColor: catColor_30[0],
        rectBorderColor: catColors[0],
        borderColor: catColor_60[0],
        showLine: true,
        borderDash: [10, 5],
        pointRadius: chartData[0 + 100]
      },
      {
        label: 'Custom Rectangles',
        data: chartData[1],
        backgroundColor: "#0000",
        rectBackgroundColor: catColor_30[1],
        rectBorderColor: catColors[1],
        borderColor: catColor_60[1],
        showLine: true,
        borderDash: [10, 5],
        pointRadius: chartData[1 + 100]
      },
      {
        label: 'Custom Rectangles',
        data: chartData[2],
        backgroundColor: "#0000",
        rectBackgroundColor: catColor_30[2],
        rectBorderColor: catColors[2],
        borderColor: catColor_60[2],
        showLine: true,
        borderDash: [10, 5],
        pointRadius: chartData[2 + 100]
      },
    ],
  };

  return (
    <div id="live-location-scatter-container">
      <button id="update-background" className="btn" onClick={updateBackground}>Update Background</button>
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
