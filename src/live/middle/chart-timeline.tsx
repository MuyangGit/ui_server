import { Bar } from 'react-chartjs-2';


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
const data:any = {
    datasets: [
        {
            label: 'Undetected',
            data: [
                { x: bar_location, y: ["2024-05-13T00:00:00", "2024-05-13T04:00:00"]},
                { x: bar_location, y: ["2024-05-13T08:00:00", "2024-05-14T00:00:00"]}
            ],
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
            data: [
                { x: bar_location, y: ["2024-05-13T04:00:00", "2024-05-13T05:00:00"]},
                { x: bar_location, y: ["2024-05-13T06:00:00", "2024-05-13T08:00:00"]}
            ],
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
            data: [
                { x: bar_location, y: ["2024-05-13T05:00:00", "2024-05-13T05:30:00"]}
            ],
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

    return (
      <div id="time-line-chart-container">
          <div id="time-line-chart-container-scroll">
            <Bar id="time-line-chart" data={data} options={options} />
          </div>
      </div>
    );
};

export default TimeLine;