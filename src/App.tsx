import React, { useState } from 'react';
import { Button } from 'antd';

export default function Calculator(props) {
  const { initalValue } = props;
  const [value, setValue] = useState(initalValue || 0);

  const handleInc = () => setValue(value + 1);

  const handleDec = () => setValue(value - 1);
  // 新增能力
  const handleSquared = () => setValue(value * value);

  return (
    <div>
      <div>{value}</div>
      <Button onClick={handleInc}>inc</Button>
      <Button onClick={handleDec}>dec</Button>
      <Button onClick={handleSquared}>squared</Button>
    </div>
  );
}
