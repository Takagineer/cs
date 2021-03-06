import * as React from "react";
import { Container, AppProps } from "next/app";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { theme } from "styles/theme";

const App = ({ Component, pageProps }) => {
  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
};

export default App;
