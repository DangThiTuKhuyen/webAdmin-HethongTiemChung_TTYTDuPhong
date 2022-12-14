import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale,
    LinearScale, BarElement,
    Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, CategoryScale,
    LinearScale, BarElement,
    Title, Tooltip, Legend);
const DoughnutChart = ({data}) => {

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Doughnut Chart'
          }
        },
        animation: {
            duration: 1000
        },
        title: 'My Daily Activities',
    pieHole: 0.25,
    pieStartAngle: 0
        
    }
    return <Doughnut data={data} options={options} width='50px' height='50px' />
}

export default DoughnutChart