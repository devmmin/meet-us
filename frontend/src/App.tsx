import { Box, Button, useColorMode } from '@chakra-ui/react';
import Login from './components/Login';

function App() {
  const { toggleColorMode } = useColorMode();
  const useTheme = false;
  return (
    <Box className="App">
      {useTheme && <Button colorScheme="green" onClick={toggleColorMode}>Theme</Button>}
      <Login />
    </Box>
  );
}

export default App;
