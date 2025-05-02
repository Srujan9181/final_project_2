import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { useEffect, useState } from 'react';
import { fetchMissed } from '../services/index.js';
import styles from './WeeklyMissedChart.module.css';

const WeeklyMissedChart = () => {
  const [chartData, setChartData] = useState([]);

  const organizeDataByWeek = (rawData) => {
    return rawData.reduce((acc, curr, index) => {
      const currentWeek = Math.floor(index / 7);
      if (!acc[currentWeek]) {
        acc[currentWeek] = { name: `Week ${currentWeek + 1}`, missedChats: 0 };
      }
      acc[currentWeek].missedChats += curr.count;
      return acc;
    }, []);
  };

  useEffect(() => {
    const loadChartData = async () => {
      const response = await fetchMissed();
      const weeklyStats = organizeDataByWeek(response.data);
      setChartData(weeklyStats);
    };
    loadChartData();
  }, []);

  return (
    <div className={styles.chartWrapper}>
      <LineChart
        width={600}
        height={250}
        data={chartData}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Line type="monotone" dataKey="missedChats" stroke="#00d907" />
        <CartesianGrid stroke="#ccc" vertical={false} />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </div>
  );
};

export default WeeklyMissedChart;
