import React from 'react';
// import { Chart as ArcElement, Tooltip, Legend } from 'chart.js';
import { getPeople } from '../../Service/Service';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const BarChart = ({ data }) => {
  // const labels = ["1", "2", "3", "4", "5", "6", "7"]

  const [labels, setLabels] = useState([])
  const [people, setPeople] = useState([])

  useEffect(() => {
    fetchPeople()
    console.log(people)
  }, [])

  const fetchPeople = () => {
    getPeople(2022)
      .then(res => {
        var label = res.data.map((item) => {
          return item.monthProfit
        })
        var people = res.data.map((item) => {
          return item.people
        })
        setLabels(label)
        setPeople(people)
        console.log(people)
      })
      .catch(err => {
        console.log(err)
      })
  }
  const options = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  }
  const data1 = {
    labels: labels,
    datasets: [{
   label: "people",
      data: people,
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
    };


  return <Bar options = {options} data={data1} />;
}

export default BarChart;