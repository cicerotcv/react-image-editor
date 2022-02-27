import { ThemeProvider } from 'styled-components';
import { ImageWrapper } from './components/ImageWrapper';
import defaultTheme from './styles/defaultTheme';
import GlobalStyle from './styles/global';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <ImageWrapper />
    </ThemeProvider>
  );
}

export default App;
