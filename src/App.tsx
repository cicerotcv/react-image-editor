import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from '@material-ui/core';
import { ThemeProvider } from 'styled-components';
import { ImageWrapper } from './components/ImageWrapper';
import defaultTheme from './styles/defaultTheme';
import GlobalStyle from './styles/global';

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: defaultTheme.colors.primary, // This is an orange looking color: ;
      },
      secondary: {
        main: defaultTheme.colors.secondary, //Another orange-ish color: ;
      },
    },
  });
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <MUIThemeProvider theme={theme}>
        <ImageWrapper />
      </MUIThemeProvider>
    </ThemeProvider>
  );
}

export default App;
