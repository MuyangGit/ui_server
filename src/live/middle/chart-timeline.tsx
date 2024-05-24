import { Bar } from 'react-chartjs-2';
import { useState, useEffect, useCallback } from 'react';

const formatDate = (date:any) => {
    const pad = (num:any) => (num < 10 ? '0' + num : num.toString());
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
           `T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};

const formatToday = (date:any) => {
    const pad = (num:any) => (num < 10 ? '0' + num : num.toString());
    return [`${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` + `T00:00:00`, 
            `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate()+1)}` + `T00:00:00`]
};


const bar_location = 2
const startNow = new Date();
const endNow = new Date(startNow.getTime() + 2 * 60 * 1000);

const today = formatToday(startNow)

const nowTime = [formatDate(startNow), formatDate(endNow)]


const options:any = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      type: 'linear',
      position: 'bottom',
      min:-10,
      max:10,
      display:false,
      stacked: true,
    },
    y: {
        type: "time",
        position: "center",
        reverse: true,
        min: today[0],
        max: today[1],
        ticks: {
            stepSize: 120,
        },
    }
  },
  plugins: {
    legend: {
        display: false,  // Set legend display to false
    },
  }
}

  const TimeLine = () => {
    const cat_id = 0

    const [chartData, setChartData] = useState([]);

    const fetchChartData = useCallback((date:any, cat_id:any) => {
      const url = `http://70.175.151.113:10000/v1/ai-cat/chart-data/timeline/${date}/${cat_id}`;
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
        fetchChartData(today, cat_id);
    }, [today, cat_id]);

    const data:any = {
        datasets: [
            {
                label: 'Undetected',
                data: chartData["undetected"],
                backgroundColor: "#77777733",
                borderColor: "#77777744",
                barThickness: 15,
                borderRadius: 5,
                borderWidth:1,
                borderSkipped: false,
                type:'bar'
            },
            {
                label: 'Play',
                data: chartData["active"],
                backgroundColor: "#8888ff99",
                type:'bar',
                barThickness:50,
                borderRadius:10,
                borderColor: "#8888",
                borderWidth:1,
                borderSkipped: false,
            },
            {
                label: 'Rest',
                data: chartData["rest"],
                backgroundColor: "#aaddaa77",
                type:'bar',
                barThickness:50,
                borderRadius:10,
                borderColor: "#aaddaa77",
                borderWidth:1,
                borderSkipped: false,
            },
            {
                label: 'Eat',
                data: [
                    { x: bar_location, y: ["2024-05-13T05:30:00", "2024-05-13T05:50:00"]}
                ],
                backgroundColor: "#4A8CC377",
                type:'bar',
                barThickness:50,
                borderRadius:10,
                borderColor: "#4A8CC377",
                borderWidth:1,
                borderSkipped: false,
            },
            {
                label: 'Poop',
                data: [
                    { x: bar_location, y: ["2024-05-13T05:50:00", "2024-05-13T06:00:00"]}
                ],
                backgroundColor: "#6666",
                type:'bar',
                barThickness:50,
                borderRadius:10,
                borderColor: "#6666",
                borderWidth:1,
                borderSkipped: false,
            },
            {
                label: 'Now',
                data: [
                    { x: bar_location, y: nowTime}
                ],
                backgroundColor: "#d00",
                type:'bar',
                barThickness:50,
                borderColor: "#d00",
                borderWidth:1,
            },
        ],
    };


    return (
      <div id="time-line-chart-container">
          <div id="time-line-chart-container-scroll">
            <Bar id="time-line-chart" data={data} options={options} />
          </div>
      </div>
    );
};

export default TimeLine;