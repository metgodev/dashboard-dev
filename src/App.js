import React, { useLayoutEffect } from 'react';
import { ThemeProvider } from "@material-ui/styles";
import { Box, CssBaseline } from "@material-ui/core";
import { setPageDirection } from './utils/dir';
import { useSelector } from 'react-redux';
import Root from './Root/Root';
import Themes from "./themes";

const App = () => {
  //global
  const { theme, lang } = useSelector(s => s.mainRememberReducer)
  let type = () => theme ? Themes.default : Themes.dark

  useLayoutEffect(() => {
    setPageDirection(lang)
  }, [lang])

  return (
    <Box >
      <ThemeProvider theme={type(theme)} >
        <CssBaseline />
        <Root />
      </ThemeProvider >
    </Box>
  )
}

export default App;
