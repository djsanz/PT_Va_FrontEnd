import React from 'react'
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend,} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend);

const GraficaBarrasHotizontal = ({ data,labels}) => {
    const options = {
        indexAxis: 'y',
        elements: {
            bar: {
                borderWidth: 2
            }
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'right'
            },
            title: {
                display: true,
                text: 'Puntuaciones Totales',
                font: {
                    size: 16
                }
            }
        }
    }

    const AllData = {
        labels,
        datasets: data
    }

    return (
        <Bar options={options} data={AllData} className='p-1'/>
    )
}

export default GraficaBarrasHotizontal;
