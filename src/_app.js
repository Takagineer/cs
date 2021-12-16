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

// import React from 'react'
// import { AppProps } from 'next/app'
// import Head from 'next/head'
// import { CssBaseline } from '@material-ui/core'
// import { ThemeProvider } from '@material-ui/core/styles'
// import theme from './theme'

// export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
//   React.useEffect(() => {
//     // Remove the server-side injected CSS.
//     const jssStyles = document.querySelector('#jss-server-side')
//     jssStyles?.parentElement?.removeChild(jssStyles)
//   }, [])

//   return (
//     <>
//       <Head>
//         <title>MyApp</title>
//         <meta
//           name="viewport"
//           content="minimum-scale=1, initial-scale=1, width=device-width"
//         />
//       </Head>
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         <Component {...pageProps} />
//       </ThemeProvider>
//     </>
//   )
// }
