import { MantineProvider } from '@mantine/core';
import Dashboard from './Dashboard';

function App() {
  return (
    <MantineProvider theme={{colorScheme:"dark"}} withGlobalStyles withNormalizeCSS>
      <Dashboard />
    </MantineProvider>
  );
}

export default App;
