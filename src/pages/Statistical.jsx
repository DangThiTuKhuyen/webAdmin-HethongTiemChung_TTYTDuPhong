import React from 'react';
// import './Statistical.scss'
import LineChart from '../components/Chart/LineChart';
import PieChart from '../components/Chart/Piechart';
import BarChart from '../components/Chart/BarChart'
import { useState } from 'react';
import DoughnutChart from '../components/Chart/DoughnutChart';

const Statistical = () => {
  const [chartData, setChartData] = useState({
    labels: [2015, 2016, 2017, 2018, 2019],
    datasets: [
      {
        label: "Users Gained ",
        data: [15, 15, 76, 34, 56],
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderColor: "black",
        borderWidth: 2
      }
    ]
  })
  return (
    <div className="container">
      <div className="row row-cols-2">
        <div className="col">
          <DoughnutChart data={chartData}></DoughnutChart>
        </div>
        <div className="col">
          <PieChart data={chartData}></PieChart>
        </div>
        <div className="col">
        <LineChart data={chartData}></LineChart>
      </div>
      <div className="col">
        <BarChart data={chartData}></BarChart>
      </div>
      </div>
      
    </div>
  );
};

export default Statistical;