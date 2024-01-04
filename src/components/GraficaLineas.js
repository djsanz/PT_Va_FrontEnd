import React from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend);

const GraficaLineas = ({ data }) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: false,
                text: 'Chart.js Line Chart'
            }
        }
    }

    const AllData = {
        labels:data.labels,
        datasets: data.datasets
    }

    return (
        <Line options={options} data={AllData} className='p-1' />
    )
}

export default GraficaLineas;
