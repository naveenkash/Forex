import App from "next/app";
import "../static/styles/index/index.css";
import "../static/styles/cryptoCoinInfo/cryptoCoinInfo.css";
import "../static/styles/cryptoHead/cryptoHead.css";
import "../static/styles/cryptoListRates/cryptoListRates.css";
import "../static/styles/cryptoNews/cryptoNews.css";
import "../static/styles/chartStyle/chart.css";
import "../static/styles/conversion/conversion.css";
import "../static/styles/currencyDropdown/currencyDropdown.css";
import "../static/styles/currencyInput/currencyInput.css";
import "../static/styles/panelDropdown/panelDropdown.css";
import "../static/styles/currencyDropdown/currencyDropdown.css";

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    return {
      pageProps: {
        ...(Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {}),
      },
    };
  }

  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}
