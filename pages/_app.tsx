import App, { Container } from "next/app";
import React from "react";
import withMobxStore from "../lib/with-mobx-store";
import { Provider } from "mobx-react";

interface Props {
  mobxStore?: any;
}

class MyApp extends App<Props> {
  // static async getInitialProps({ Component, router, ctx }) {
  //   let pageProps = {};
  //   if (Component.getInitialProps) {
  //     pageProps = await Component.getInitialProps(ctx);
  //   }

  //   return { pageProps };
  // }
  render() {
    const { Component, pageProps, mobxStore } = this.props;
    return (
      <Container>
        <Provider store={mobxStore}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default withMobxStore(MyApp);
