import { useState } from 'react';

function IndexSidePanel() {
  const [data, setData] = useState('');

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 16,
      }}
    >
      <h2>
        Welcome to your
        <a href="https://www.plasmo.com" target="_blank" rel="noopener">
          {' '}
          Plasmo
        </a>{' '}
        Extension!
      </h2>
      <input onChange={(e) => setData(e.target.value)} value={data} />
      <a href="https://docs.plasmo.com" target="_blank" rel="noopener">
        View Docs
      </a>
    </div>
  );
}

export default IndexSidePanel;
