import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'antd';

import ControlGroup from '../../ControlGroup';
import { calculatorAmountsData, setMoneyAmounts } from './calculatorSlice';

function Calculator() {
  const dispatch = useDispatch();
  const { risk, money } = useSelector(calculatorAmountsData);
  const [totalMoney, setTotalMoney] = useState(0);
  const [formData, setFormData] = useState({});

  function calculateTotalMoney() {
    return Object.values(money).reduce((t, {value}) => t + value, 0);
  }

  useEffect(() => {
    setTotalMoney(calculateTotalMoney())
    dispatch(setMoneyAmounts(formData));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  return (
    <>
      <form className="App-main-2-form"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const data = Object.fromEntries(formData.entries());
          const formatedData = Object.keys(data).map(i => { return {[i]: data[i]}})
          setFormData(data);
        }}
      >
        <div className="App-main-2-fields">
          { risk.map(item => <ControlGroup key={item.name} data={item} />) }
        </div>
        <Button type="primary" htmlType="submit">Calulate adjustements</Button>
      </form>
      <div className="App-main-2-messages">
        <p>$ {totalMoney} Under Management</p>
      </div>
    </>
  );
}

export default Calculator;