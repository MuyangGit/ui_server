import './App.css'

import { detailData, detailOptions } from '/src/detail-chart.js'
import { pieData, pieOptions } from '/src/score-chart.js'
import { Line, Chart, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, Filler, LinearScale, BarElement, PointElement, LineElement,ArcElement, Title, Tooltip, Legend, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns';

// Register the necessary components
ChartJS.register(
//   CategoryScale,
  LinearScale,
//   BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  Filler
);

function App() {
  return (
    <>
      <div id="menu-row" className="body-top-block">
      </div>
      <div id="head-row" className="body-top-block">
          <div id="profile"></div>
          <div id="status"></div>
          <div id="score">
                <Pie data={pieData} options={pieOptions} />
          </div>
      </div>
      <div id="body-row" className="body-top-block">
          <div id="time-line"></div>
          <div id="right-body">
                <div id="live-position"></div>
                <div id="activity-records"></div>
          </div>
      </div>
      <div id="bottom-row" className="body-top-block">
        <div className="bar_chart">
          <Chart data={detailData} options={detailOptions} />
        </div>
    </div>
      <div id="comment-row" className="body-top-block">
      </div>
    </>
  )
}

export default App
