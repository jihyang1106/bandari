import { useState } from 'react';

import AppRouter from './routes/AppRouter';

function App() {
  const [init, setInit] = useState(true);

  return (
    <>
      {init ? (
        <>
          <AppRouter />
        </>
      ) : (
        'Initializing...'
      )}
    </>
  );
}

export default App;
