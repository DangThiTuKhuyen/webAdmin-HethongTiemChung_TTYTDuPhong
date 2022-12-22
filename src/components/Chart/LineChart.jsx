import React from "react";
import 'chart.js/auto';
import { Line, Pie } from "react-chartjs-2";
import { useState, useEffect } from 'react';
import { getProfit } from '../../Service/Service';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const LineChart = () => {
  const [labels, setLabels] = useState([])
  const [profits, setProfits] = useState([])

  useEffect(() => {
    fetchProfit()
  }, [])

  const fetchProfit = () => {
    getProfit(2022)
      .then(res => {
        var label = res.data.map((item) => {
          return item.monthProfit
        })
        var profit = res.data.map((item) => {
          return item.profit
        })
        setLabels(label)
        setProfits(profit)
      })
      .catch(err => {
        console.log(err)
      })
  }
  
  const data = {
    labels: labels,
    datasets: [{
      label: 'VNĐ',
      data: profits,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)',
        'rgba(177, 169, 204, 0.2)',
        'rgba(193, 169, 204, 0.2)',
        'rgba(204, 175, 169, 0.2)',
        'rgba(204, 169, 185, 0.2)',
        'rgba(169, 204, 202, 0.2)'
      ], borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)',
        'rgb(177, 169, 204)',
        'rgb(193, 169, 204)',
        'rgb(204, 175, 169)',
        'rgb(204, 169, 185)',
        'rgb(169, 204, 202)'
      ],
      borderWidth: 1
    }]
  }


  return <Line data={data} />
}

export default LineChart