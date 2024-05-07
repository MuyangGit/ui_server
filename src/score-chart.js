const DATA_COUNT = 5;
const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};

export const pieData = {
  labels: ['Overall Yay', 'Overall Nay', 'Group A Yay', 'Group A Nay', 'Group B Yay', 'Group B Nay', 'Group C Yay', 'Group C Nay'],
  datasets: [
    {
      backgroundColor: ['#AAA', '#777'],
      borderRadius: 30,
      data: [21, 79],
      borderWidth:2,
    },
    {
      backgroundColor: ['hsl(0, 100%, 60%)', 'hsl(0, 100%, 35%)'],
      data: [33, 67],
      borderRadius: 30,
      borderWidth:2,
    },
    {
      backgroundColor: ['hsl(100, 100%, 60%)', 'hsl(100, 100%, 35%)'],
      data: [20, 80],
      borderRadius: 30,
      borderWidth:2,
    },
    {}
  ]
};

export const pieOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false  // This will turn off the legend display
        }
    },
    }