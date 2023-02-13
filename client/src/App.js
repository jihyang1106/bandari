import { useState } from 'react';

import AppRouter from './routes/AppRouter';

import axios from 'axios';
import { useEffect } from 'react';

function App() {
  const [init, setInit] = useState(true);

  /** Api 요청 실행 예제 */
  const callApi = async () => {
    axios.get('/api').then((res) => console.log(res.data.test));
  };
  useEffect(() => {
    callApi();
  }, []);

  /** axios 요청 */
  // axios.defaults.baseURL = 'http://localhost:5000';
  // axios.defaults.baseURL = 'http://35.174.208.128:5000';

  return (
    <>
      {init ? (
        <>
          <AppRouter />
          test
        </>
      ) : (
        'Initializing...'
      )}
    </>
  );
}

export default App;
