import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import HoldingsTable from './HoldingsTable';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function App() {
  const [holdings, setHoldings] = useState([]);

  useEffect(() => {
    axios.get('https://canopy-frontend-task.now.sh/api/holdings')
      .then(response => {
        setHoldings(response.data.payload);
      })
      .catch(error => {
        console.error('Error fetching holdings:', error);
      });
  }, []);

  const theme = createTheme({
    palette: {
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
    typography: {
      fontFamily: 'Roboto, sans-serif',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div style={{ padding: '20px' }}>
        <h1 style={{ color: theme.palette.primary.main }}>Holdings Table</h1>
        <HoldingsTable holdings={holdings} />
      </div>
    </ThemeProvider>
  );
}

export default App;
