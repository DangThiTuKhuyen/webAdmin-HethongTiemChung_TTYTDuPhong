import React from 'react';
import { useEffect, useState } from 'react';
import { getDisease } from '../../Service/Service';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale,
    LinearScale, BarElement,
    Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, CategoryScale,
    LinearScale, BarElement,
    Title, Tooltip, Legend);

const DoughnutChart = () => {

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          // title: {
          //   display: true,
          //   text: 'Chart.js Doughnut Chart'
          // }
        },
        animation: {
            duration: 1000
        },
        // title: 'My Daily Activities',
    pieHole: 0.25,
    pieStartAngle: 0
        
    }
    const [labels, setLabels] = useState([])
  const [people, setPeople] = useState([])

  useEffect(() => {
    fetchDisease()
    console.log(people)
  }, [])

  const fetchDisease = () => {
    getDisease(2022)
      .then(res => {
        var label = res.data.map((item) => {
          return item.diseaseName
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
 
  const data = {
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
    return <Doughnut data={data} options={options} />
}

export default DoughnutChart