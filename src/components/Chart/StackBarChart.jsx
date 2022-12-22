import React from 'react';
// import { Chart as ArcElement, Tooltip, Legend } from 'chart.js';
// import { getVaccine } from '../../Service/Service';
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
const StackBarChart = ({ data }) => {
    // const labels = ["1", "2", "3", "4", "5", "6", "7"]

    const [labels, setLabels] = useState([])
    const [vaccines, setVaccines] = useState([])

    useEffect(() => {
        // fetchVaccine()
    }, [])

    // const fetchVaccine = () => {
    //     getVaccine(2022)
    //         .then(res => {
    //             var label = res.data.map((item) => {
    //                 return item.monthProfit
    //             })
    //             var vaccine = res.data.map((item) => {
    //                 return item.vaccineName
    //             })
    //             setLabels(label)
    //             setVaccines(vaccine)
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
    // }
    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Chart.js Bar Chart - Stacked',
            },
        },
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
    var dummy1 = ["dataSet1", "dataset2", "dataset3"]
    var dummy2 = [[123, , 333], [654, 235, 256], [111, 987, 523]]
    var dummy3 = ['rgb(255, 99, 132)', 'rgb(75, 192, 192)', 'rgb(53, 162, 235)']
    var khuyen = []

    const data1 = {
        title: "Khuyen",
        labels: labels,
        datasets: [
            {
                label: dummy1[0],
                data: dummy2[0],
                backgroundColor: dummy3[0],
            },

            {
                label: dummy1[1],
                data: dummy2[1],
                backgroundColor: dummy3[1],
            },
            {
                label: dummy1[2],
                data: dummy2[2],
                backgroundColor: dummy3[2],
            }

            //     vaccines.map((item) => {

            //     }),
            //   {
            //     label: 'Dataset 1',
            //     data: [123, 456, 345],
            //     backgroundColor: 'rgb(255, 99, 132)',
            //   },
            //   {
            //     label: 'Dataset 2',
            //     data: [654,235,256],
            //     backgroundColor: 'rgb(75, 192, 192)',
            //   },
            //   {
            //     label: 'Dataset 3',
            //     data: [111, 987, 523],
            //     backgroundColor: 'rgb(53, 162, 235)',
            //   },
        ]
        // datasets: [{
        //   label: 'Số người tiêm',
        //   data: people,
        //   backgroundColor: [
        //     'rgba(255, 99, 132, 0.2)',
        //     'rgba(255, 159, 64, 0.2)',
        //     'rgba(255, 205, 86, 0.2)',
        //     'rgba(75, 192, 192, 0.2)',
        //     'rgba(54, 162, 235, 0.2)',
        //     'rgba(153, 102, 255, 0.2)',
        //     'rgba(201, 203, 207, 0.2)'
        //   ], borderColor: [
        //       'rgb(255, 99, 132)',
        //       'rgb(255, 159, 64)',
        //       'rgb(255, 205, 86)',
        //       'rgb(75, 192, 192)',
        //       'rgb(54, 162, 235)',
        //       'rgb(153, 102, 255)',
        //       'rgb(201, 203, 207)'
        //     ],
        //     borderWidth: 1
        //   }]
    };


    return <Bar options={options} data={data1} />;
}

export default StackBarChart;