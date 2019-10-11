import React, { Component } from "react";

export class currencyConversion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      diffAmountInfo:[1,2,5,10,20,50,100,250,500,1000,2000,5000,10000]
    };
  }
 
  render() {
    if (this.props.conversionData.length <= 0) {
      return (
          <div className="container">
              <div className="currency_conversion_error">
                  <h3 className="converion_error">Can't Load Conversions! Try Refreshing The Page Again In a Moment</h3>
              </div>
          </div>
        // 
      );
    }
    return (
      <div className="container">
        <div className="currency_conversion">
          <table>
            <thead>
              <tr>
                <td>
                  {
                    this.props.conversionData[
                      "Realtime Currency Exchange Rate"
                    ]["2. From_Currency Name"]
                  }
                </td>
                <td className="table_value" style={{ fontWeight: 700 }}>
                  {
                    this.props.conversionData[
                      "Realtime Currency Exchange Rate"
                    ]["4. To_Currency Name"]
                  }
                </td>
              </tr>
            </thead>
            <tbody>
                {this.state.diffAmountInfo.map((count)=>(
                    <tr key={count}>
                    <td className="table_key"> {`${count} ${ 
                        this.props.conversionData[
                          "Realtime Currency Exchange Rate"
                        ]["1. From_Currency Code"]
                      }`}
                    </td>
                    <td className="table_value">
                      {`${Math.floor(count*this.props.conversionData["Realtime Currency Exchange Rate"]["5. Exchange Rate"]*10000)/10000} ${
                        this.props.conversionData[
                          "Realtime Currency Exchange Rate"
                        ]["3. To_Currency Code"]
                      } `}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          <table>
            <thead>
              <tr>
                <td>
                  {
                    this.props.conversionData[
                      "Realtime Currency Exchange Rate"
                    ]["4. To_Currency Name"]
                  }
                </td>
                <td className="table_value" style={{ fontWeight: 700 }}>
                  {
                    this.props.conversionData[
                      "Realtime Currency Exchange Rate"
                    ]["2. From_Currency Name"]
                  }
                </td>
              </tr>
            </thead>
            <tbody>

                {this.state.diffAmountInfo.map((count)=>(
                    <tr key={count}>
                    <td className="table_key"> {`${count} ${ 
                        this.props.conversionData[
                          "Realtime Currency Exchange Rate"
                        ]["3. To_Currency Code"]
                      }`}
                    </td>
                    <td className="table_value">
                      {`${Math.floor(count/this.props.conversionData["Realtime Currency Exchange Rate"]["5. Exchange Rate"]*10000)/10000} ${
                        this.props.conversionData[
                          "Realtime Currency Exchange Rate"
                        ]["1. From_Currency Code"]
                      } `}
                    </td>
                  </tr>
                ))}
              
             
            </tbody>
          </table>
        </div>
        <style jsx>{`
          .converion_error{
            color: #36c8ff;
          }
          .currency_conversion {
            width: 100%;
            height: auto;
            display: grid;
            align-items: center;
            padding: 80px 0;
            grid-column-gap: 20px;
            grid-template-columns: 1fr 1fr;
          }
          
          table {
            width: 100%;
            height: auto;
            border-collapse: collapse;
            font-family: "Poppins", sans-serif;
            letter-spacing: 0.5px;
            border-radius: 4px;
          }
          table thead,
          table tr {
            width: 50%;
            height: auto;
            border-collapse: collapse;
            padding: 16px;
            border: 1px solid #eee;
          }
          table thead {
            background: #f2f5f7;
            color: #3b4f72 !important;
            font-weight: 700 !important;
          }
          table tr td {
            width: 50%;
            height: auto;
            padding: 10px 16px;
            font-size: 14px;
          }
          .table_key {
            font-weight: 700;
            color: #36c8ff;
          }
          .table_value {
            font-weight: lighter;
            text-align: right;
            color: #3b4f72;
          }
        `}</style>
      </div>
    );
  }
}

export default currencyConversion;
