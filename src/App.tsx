import React, { useState } from 'react';
import { Button } from 'antd';

export function Calculator(props) {
  const { initalValue, plugins } = props;
  const [value, setValue] = useState(initalValue || 0);

  const buttons = plugins.map((v) => (
    <Button onClick={() => v.exec(value, setValue)}>{v.name}</Button>
  ));

  return (
    <div>
      <div>{value}</div>
      {buttons}
    </div>
  );
}

export default function showCalculator({ initalValue, plugins = [] }) {
  const corePlugins = [
    { name: 'inc', exec: (val, setVal) => setVal(val + 1) },
    { name: 'dec', exec: (val, setVal) => setVal(val - 1) },
  ];

  const newPlugins = [...corePlugins, ...plugins];

  return <Calculator initalValue={initalValue} plugins={newPlugins} />;
}
