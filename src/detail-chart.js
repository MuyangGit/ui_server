
export const detailData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
          type: "line",
          data: [["2024-05-14T13:00:00", 40],
          ["2024-05-16T15:30:33",20],
          [null, 30],
          ["2024-05-17T09:05:07", 30],
          ["2024-05-17T19:16:07", 15]],
          borderWidth: 0,
          borderColor: "#2a2",
          pointRadius:0,
        },
        {
            type: "line",
            label: 'Detections',
            data: [["2024-05-14T13:00:00", 30],
            ["2024-05-16T15:30:33",10],
            [null, 30],
            ["2024-05-17T09:05:07", 20],
            ["2024-05-17T19:16:07", 5]],
            borderWidth: 0,
            borderColor: "#2a2",
            fill: "-1",
            pointRadius:0,
            backgroundColor: "#22a2"
          },
    ],
  };

export const detailOptions = {
    scales: {
      x: {
         type: "time",
         beginAtZero: false,
         min: "2024-05-13",
         max: "2024-05-18"
      },
      y: {
        beginAtZero: true,
      },
    },
    maintainAspectRatio: false,
  };