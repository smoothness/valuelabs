import React, { useEffect } from 'react';
import { Table, Space, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { changeRiskGraphData, selectRiskData } from './features/chart/chartSlice';
import { investmentData } from './libs/business-logic';
import Chart from './features/chart/Chart';
import 'antd/dist/antd.css';
import './App.css';

function App() {
  const riskData = useSelector(selectRiskData);
  const dispatch = useDispatch();

  function setSelectedRisk(row) {
    const rowCellArray = Array.from(row.querySelectorAll('td'));
    const rawRowData = rowCellArray.map(cell => Number(cell.innerHTML));
    const rowData = rawRowData.slice(0, -1);

    dispatch(changeRiskGraphData(rowData));
  }

  function getSelectedRow(e) {
    const row = e.target.closest('.ant-table-row');

    setSelectedRisk(row);
  }

  useEffect(() => {
    const firstRow = document.querySelector('#riskDataGrid tbody tr:first-child');
    setSelectedRisk(firstRow);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rawColumns = Object.keys(investmentData).map(col => {
    return {
      title: col,
      dataIndex: col,
      key: col,
    }
  });

  const columns = [
    ...rawColumns,
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="button" onClick={getSelectedRow}>Select</Button>
        </Space>
      )
    }
  ];

  const rawData = Object.values(investmentData);
  const dataSource = investmentData.risk.map((row, i) => {
    return {
      key: (i + 1).toString(),
      [columns[0].title]: rawData[0][i] + 1,
      [columns[1].title]: rawData[1][i],
      [columns[2].title]: rawData[2][i],
      [columns[3].title]: rawData[3][i],
      [columns[4].title]: rawData[4][i],
      [columns[5].title]: rawData[5][i],
    }
  });

  return (
    <div className="App">
      <header className="App-header">
        <Table id="riskDataGrid" dataSource={dataSource} columns={columns} />
        <Chart data={riskData} />
      </header>
    </div>
  );
}

export default App;
