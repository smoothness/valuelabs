import React, { useState } from 'react';
import { Typography, Table, Space, Button } from 'antd';
import { CaretRightOutlined, CaretLeftOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import 'antd/dist/antd.css';

import { changeRiskGraphData, selectRiskData } from './features/chart/chartSlice';
import { setCalculatorAmounts } from './features/calculator/calculatorSlice';
import { investmentData } from './libs/business-logic';
import { formatData } from './libs/helpers';
import Chart from './features/chart/Chart';
import Calculator from './features/calculator/Calculator';
import './App.css';

function App() {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const riskData = useSelector(selectRiskData);
  const [currentStep, setCurrentStep] = useState(1);

  function setSelectedRisk(row) {
    dispatch(changeRiskGraphData(formatData(row)));
    dispatch(setCalculatorAmounts(formatData(row)))
  }

  function goToRiskAssessment() {
    riskData.length === 0
      ? alert('Please select a risk level')
      : setCurrentStep(2);
  }

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
          <Button type="button" onClick={goToRiskAssessment}>
            Go <CaretRightOutlined />
          </Button>
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

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRisk(selectedRows[0]);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  };

  const goBack = () => setCurrentStep(1);

  return (
    <div className="App">
      <header className="App-header">
        <Title>Value Labs Financial Advisor</Title>
      </header>
      <main className="App-main">
        {currentStep === 1 && (
          <section className="App-main-1">
            <Table
              id="riskDataGrid"
              dataSource={dataSource}
              columns={columns}
              rowSelection={{
                type: 'radio',
                ...rowSelection,
              }}
            />
            <Chart data={riskData} />
          </section>
        )}
        {currentStep === 2 && (
          <section className="App-main-2">
            <div>
              <Button
                className="goBack"
                type="primary"
                onClick={goBack}
              >
                <CaretLeftOutlined /> Go Back
              </Button>
              <Title level={3}>Level {riskData.risk} Risk Tolerance - Recommendation Calculator</Title>
              <Calculator />
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
