import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

const root = createRoot(document.getElementById('app'));

root.render(
  <StrictMode>
    <App
      initalValue={0}
      plugins={[
        { name: 'square', exec: (val, setVal) => setVal(val * val) },
        {
          name: 'zero',
          exec: (val, setVal) => setVal(0),
          onMount: () => {
            console.log('zero is mount');
          },
        },
      ]}
    />
  </StrictMode>
);
