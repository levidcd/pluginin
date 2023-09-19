import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import event from './event';

export function Calculator(props) {
  const { initalValue, plugins, onMount, onUnMount } = props;
  const [value, setValue] = useState(initalValue || 0);

  const buttons = plugins.map((v, index) => (
    <Button onClick={() => v.exec(value, setValue)} key={index}>
      {v.name}
    </Button>
  ));

  useEffect(() => {
    onMount();
    return () => {
      onUnMount();
    };
  }, []);

  return (
    <div>
      <div>{value}</div>
      {buttons}
    </div>
  );
}

export default function showCalculator({ initalValue, plugins = [] }) {
  const corePlugins = [
    {
      name: 'inc',
      exec: (val, setVal) => setVal(val + 1),
      onMount: () => {
        console.log('inc is mount');
      },
    },
    { name: 'dec', exec: (val, setVal) => setVal(val - 1) },
  ];

  const newPlugins = [...corePlugins, ...plugins];
  useEffect(() => {
    newPlugins.forEach((p) => {
      // 把所有on开头的都注册一下
      Object.keys(p)
        .filter(
          (key) => key.indexOf('on') === 0 && typeof p[key] === 'function'
        )
        .forEach((key) => event.listen(key, p[key]));
    });
  }, [newPlugins.length]);

  // 这里就简单定义两个生命周期
  const handleMount = () => event.trigger('onMount');

  const handleUnMount = () => event.trigger('onUnMount');

  return (
    <Calculator
      onMount={handleMount}
      onUnMount={handleUnMount}
      initalValue={initalValue}
      plugins={newPlugins}
    />
  );
}
