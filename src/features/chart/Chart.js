import React from 'react';
import { useSelector } from 'react-redux';
import { Typography } from 'antd';
import { PieChart, Pie, Cell } from 'recharts';

import { selectRiskData } from './chartSlice';
const { Title } = Typography;
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#C733FF', '#FF5733'];

function Chart() {
  const riskData = useSelector(selectRiskData);

  let renderLabel = function(entry) {
    return entry.name;
  }

  return (
    <>
      <Title level={3}>Risk factor: {riskData.title}</Title>
      <PieChart width={1024} height={300}>
        <Pie
          data={riskData}
          cx="50%"
          cy="50%"
          dataKey="value"
          nameKey="key"
          outerRadius={80}
          label={renderLabel}
        >
          {
            riskData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index]} />)
          }
        </Pie>
      </PieChart>
    </>
  );
}

export default Chart;