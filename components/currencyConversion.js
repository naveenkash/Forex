import React, { Component } from "react";
import Head from "next/head";
export class currencyConversion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      diffAmountInfo: [
        1,
        2,
        5,
        10,
        20,
        50,
        100,
        250,
        500,
        1000,
        2000,
        5000,
        10000,
      ],
    };
  }

  render() {
    return (
      <div className="container">
        <Head>
          <link
            rel="stylesheet"
            href="../static/styles/conversion/conversion.css"
          />
        </Head>
        {this.props.conversionData <= 0 ? (
          <p className="converion_error row">Error Loading Conversions</p>
        ) : (
          <div className="currency_conversion">
            <table>
              <thead>
                <tr>
                  <td>{this.props.conversionFrom}</td>
                  <td className="table_value" style={{ fontWeight: 700 }}>
                    {this.props.conversionTo}
                  </td>
                </tr>
              </thead>
              <tbody>
                {this.state.diffAmountInfo.map((count) => (
                  <tr key={count}>
                    <td className="table_key">
                      {`${count} ${this.props.conversionData.quotes[0].base_currency}`}
                    </td>
                    <td className="table_value">
                      {`${
                        Math.floor(
                          count *
                            this.props.conversionData.quotes[0].bid *
                            10000
                        ) / 10000
                      } ${this.props.conversionData.quotes[0].quote_currency} `}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <table>
              <thead>
                <tr>
                  <td>{this.props.conversionTo}</td>
                  <td className="table_value" style={{ fontWeight: 700 }}>
                    {this.props.conversionFrom}
                  </td>
                </tr>
              </thead>
              <tbody>
                {this.state.diffAmountInfo.map((count) => (
                  <tr key={count}>
                    <td className="table_key">
                      {`${count} ${this.props.conversionData.quotes[0].quote_currency}`}
                    </td>
                    <td className="table_value">
                      {`${
                        Math.floor(
                          (count / this.props.conversionData.quotes[0].bid) *
                            10000
                        ) / 10000
                      } ${this.props.conversionData.quotes[0].base_currency} `}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

export default currencyConversion;
