import React, { useEffect, useState } from "react";
import { BarChart } from '@mui/x-charts/BarChart';
import _ from 'lodash';

export default function Chart() {
    const [chartData, setChartData] = useState({ xAxis: [], series: [] });
    const trainingURL = 'https://customerrestservice-personaltraining.rahtiapp.fi/gettrainings';

    useEffect(() => {
        fetch(trainingURL)
            .then(response => response.json())
            .then(responseData => {
                const formattedTrainings = responseData.map(training => ({
                    id: training.id,
                    activity: training.activity,
                    duration: training.duration
                }));

                const groupedTrainings = _.groupBy(formattedTrainings, 'activity');
                const trainingTypes = _.keys(groupedTrainings);
                const durations = _.map(groupedTrainings, activities => _.sumBy(activities, 'duration'));

                setChartData({
                    xAxis: [{ id: 'barTypes', data: trainingTypes, scaleType: 'band' }],
                    series: [{ data: durations }],
                });
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <>
            <h1>amount of x training</h1>
            <div style={{ display: 'flex', justifyContent: 'center',
                 alignItems: 'center', height: '100vh' }}>
                <BarChart xAxis={chartData.xAxis} series={chartData.series} width={800} height={400} />
            </div>
        </>
    );
}
