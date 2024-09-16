import React, { FC } from 'react';
import Sidebar from './Components/Sidebar/Sidebar';
import Main from './Components/Main/Main';
import { Box } from '@mui/material';

const App: FC = () => {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box
          sx={{ flexGrow: 1 }}
        >
          <Main />
        </Box>

      </Box>
    </>
  );
};

export default App;