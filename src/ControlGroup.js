import React, { useState } from 'react';
import { Typography, Input, Badge, Card } from 'antd';

function ControlGroup({data}) {
  const { Title } = Typography;
  const [value, setValue] = useState(data.value);

  function handleChange(e) {
    setValue(Number(e.target.value));
  }

  return (
    <div className="App-main-2-control-group">
      <Badge.Ribbon text={`${data.value} %`}>
        <Card>
          <Title className="title" level={5}>{data.name}</Title>
          <div className="control">
            <span>$</span>
            <Input
              type="number"
              name={data.name}
              value={value}
              onChange={handleChange}
            />
          </div>
          <p className="label">hola</p>
          <p className="label">hola</p>
        </Card>
      </Badge.Ribbon>
    </div>
  )
}

export default ControlGroup;
