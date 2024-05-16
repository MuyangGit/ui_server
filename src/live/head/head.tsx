import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import "./head.css"
  
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const catColors = ["#4A8CC3", "#8FBC89", "#E37939"];


const centerTextPlugin = {
    id: 'centerText',
    afterDatasetsDraw: function(chart:any) {
        const { ctx } = chart;
        const { width, height } = chart;
        ctx.save();
        ctx.font = 'bold 50px sans-serif';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(83, width / 2, height / 1.9);
        ctx.restore();
    }
};

const data = {
  type: 'pie',
  labels: [],
  datasets: [
    {
        backgroundColor: ['hsl(100, 100%, 40%)', '#ccc'],
        data: [80, 20],
        borderRadius: 7,
        weight:3
    },
    {
      backgroundColor: ['#AAA', '#777'],
      data: [21, 79],
      borderRadius: 7,
      weight:1
    },
    {
      backgroundColor: ['hsl(0, 100%, 60%)', 'hsl(0, 100%, 35%)'],
      data: [33, 67],
      borderRadius: 7,
      weight:1
    },
    {
        weight:5
    }

  ]
};

const options = {
      responsive: true,
      plugins: {
        legend: {
            display: false,  // Set legend display to false
        },
        tooltip: {
            enabled: true,
        },
        centerText: {
            text: 'Total'
        }
    },
};


export default function Head() {
    const catName = ["QB", "QBO", "YUKI"]
    const [catId, setCatId] = useState(0);

    const handelSelectCat = (catIdentifier:any) => {
        setCatId(catIdentifier)
    }

    return (
        <div id="head-row" className="body-top-block">
            <div id="profile-head-block">
                <img id="profile-pic" src={`/src/assets/c_${catId}.jpg`} className="img-thumbnail"/>
                <div id="profile-name-group">
                    <button 
                        id="profile-name" 
                        type="button" 
                        className="btn" 
                        data-bs-toggle="dropdown" 
                        aria-haspopup="true" 
                        aria-expanded="false"
                        style={{color:catColors[0]}}
                    >
                    {catName[catId]}
                    </button>
                    <div id="profile-name-dropdown" className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                        <a className="dropdown-item" onClick={() => handelSelectCat(0)} href="#">QB</a>
                        <a className="dropdown-item" onClick={() => handelSelectCat(1)} href="#">QBO</a>
                        <a className="dropdown-item" onClick={() => handelSelectCat(2)} href="#">YUKI</a>
                    </div>
                </div>
            </div>
            <div id="basic-statistics-group">
                <div id="sleep-time" className='basic-statistic-block'>
                    <label className='basic-statistic-name'>SLEEP:</label>
                    <label className='basic-statistic-value'>2h 60m</label>
                </div>
                <div id="play-time" className='basic-statistic-block'>
                    <label className='basic-statistic-name'>PLAY:</label>
                    <label className='basic-statistic-value'>2h 43m</label>
                </div>
                <div id="eat-times" className='basic-statistic-block'>
                    <label className='basic-statistic-name'>EAT:</label>
                    <label className='basic-statistic-value'>4 times</label>
                </div>
                <div id="poop-times" className='basic-statistic-block'>
                    <label className='basic-statistic-name'>POOP:</label>
                    <label className='basic-statistic-value'>2 times</label>
                </div>
            </div>
            <div id="score-dashboard">
                <div id="dashboard-pie-chart">
                    <Pie data={data} options={options} plugins={[centerTextPlugin]}/>
                </div>
            </div>
        </div>
        )
    }