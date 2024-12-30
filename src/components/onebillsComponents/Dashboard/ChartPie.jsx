// src/components/PolarChart.js
import React from 'react';
import { PolarArea } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, RadialLinearScale, ArcElement } from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(Title, Tooltip, Legend, RadialLinearScale, ArcElement);

const PolarChart = () => {
    const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: 'Dataset 1',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false, // Hide the legend
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.label}: ${tooltipItem.raw}`;
                    },
                },
                // Tooltip animation
                animation: {
                    duration: 500, // duration of the tooltip animation in milliseconds
                },
            },
        },
        elements: {
            arc: {
                // Animation when hovering over arcs
                hover: {
                    animationDuration: 1000, // duration of hover animation in milliseconds
                },
                // Animation when the chart first renders
                animation: {
                    duration: 1000, // duration of initial animation in milliseconds
                    easing: 'easeInOutBounce', // easing function for the initial animation
                },
            },
        },
    };

    return (
        <div style={{width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
            <h2 style={{fontSize:'16px'}}>Polar Chart Example</h2>
            <PolarArea data={data} options={options} />
        </div>
    );
};

export default PolarChart;
