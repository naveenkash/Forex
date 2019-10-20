import { Provider } from 'react-redux';
import App from 'next/app';
import withRedux from 'next-redux-wrapper';
import { initStore } from '../redux';

export default withRedux(initStore, { debug: false })(
  class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        ctx.store.dispatch({ type: 'UPDATE_RATE_ARRAY', payload: 'foo' });
      return {
        pageProps: {
          ...(Component.getInitialProps
            ? await Component.getInitialProps(ctx)
            : {})
        }
      };
    }

    render() {
      const { Component, pageProps, store } = this.props;
      return (
        // <Container>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        // </Container>
      );
    }
  }
);