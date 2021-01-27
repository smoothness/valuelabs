import React, { useEffect, useState } from 'react';
import { Typography } from 'antd';
import { PieChart, Pie, Cell } from 'recharts';

// import styles from './Counter.module.css';
const { Title } = Typography;
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#C733FF', '#FF5733'];
const COLUMNS = ['bonds',	'largeCap',	'midCap',	'foreign', 'smallCaps'];

function Chart({data}) {
  const [formatedData, setFormatedData] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    setTitle(data[0]);
    const dataWithoutTitle = data.slice(1);
    const formatedData = dataWithoutTitle.map((item, i) => {
      return {
        name: COLUMNS[i],
        value: item
      }
    });

    setFormatedData(formatedData);
  }, [data]);

  let renderLabel = function(entry) {
    return entry.name;
  }

  return (
    <>
      <Title level={3}>Risk factor: {title}</Title>
      <PieChart width={600} height={600}>
        <Pie
          data={formatedData}
          cx={300}
          cy={300}
          label={renderLabel}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {
            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
        </Pie>
      </PieChart>
    </>
  );
}

export default Chart;