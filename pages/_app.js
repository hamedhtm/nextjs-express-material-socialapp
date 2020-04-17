import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import withRedux from "next-redux-wrapper";
import { Provider } from "react-redux";
import reduxStore from "../store/store";
import { PersistGate } from "redux-persist/integration/react";

import { AnimatePresence } from "framer-motion";
import { theme } from "../lib/theme";
import Navbar from "../components/Navbar";
import Meta from "../components/Meta";

import PulseLoader from "react-spinners/PulseLoader";

function MyApp(props) {
  const { Component, pageProps, store, router } = props;
  const [isRouteChanging, setIsRouteChanging] = useState(false);

  useEffect(() => {
    const routeChangeStartHandler = () => {
      setIsRouteChanging(true);
    };

    const routeChangeEndHandler = () => {
      setIsRouteChanging(false);
    };

    router.events.on("routeChangeStart", routeChangeStartHandler);
    router.events.on("routeChangeComplete", routeChangeEndHandler);
    router.events.on("routeChangeError", routeChangeEndHandler);
    return () => {
      router.events.off("routeChangeStart", routeChangeStartHandler);
      router.events.off("routeChangeComplete", routeChangeEndHandler);
      router.events.off("routeChangeError", routeChangeEndHandler);
    };
  }, []);

  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode)
      jssStyles.parentNode.removeChild(jssStyles);
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <PersistGate persistor={store.__PERSISTOR} loading={null}>
          <Meta />
          <Navbar {...props} />
          {isRouteChanging ? (
            <div
              style={{
                height: "90vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <PulseLoader
                size={30}
                margin={5}
                color={"#123abc"}
                loading={isRouteChanging}
              />
            </div>
          ) : (
            <AnimatePresence exitBeforeEnter>
              <Component {...pageProps} key={router.route} />
            </AnimatePresence>
          )}
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}

export default withRedux(reduxStore)(MyApp);
// export default MyApp;
