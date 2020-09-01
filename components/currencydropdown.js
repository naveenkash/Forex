import React, { Component } from "react";
import Head from "next/head";
export class currencydropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: [],
      showFullList: true,
      showFilteredList: false,
    };
  }

  componentDidMount() {
    this.setState({ currencies: this.props.currencies });
  }

  setCurrency = (currency) => {
    this.props.dropCurrency(currency);
    this.props.hideCurrency(false);
  };

  findCurrency = (e) => {
    e.stopPropagation();
    if (e.target.value === "") {
      this.setState({ showFullList: true });
    } else {
      this.setState({ showFullList: false });
    }
    var newCurrencyArray = [...this.props.currencies].filter((item) => {
      return item.name.indexOf(e.target.value.toUpperCase()) !== -1;
    });

    this.setState({ currencies: newCurrencyArray });
  };
  render() {
    return (
      <>
        <Head>
          <link
            rel="stylesheet"
            href="../static/styles/currencyDropdown/currencyDropdown.css"
          />
        </Head>
        <div className="currency_dropdown">
          <div className="currency_search">
            <input
              type="text"
              onChange={(e) => {
                this.findCurrency(e);
              }}
              placeholder="Search..."
            />
          </div>
          <div className="all_currrency">
            <ul className="currency_list">
              {!this.state.showFullList ? null : (
                <div>
                  {this.props.currencies.map((currency, i) => (
                    <li
                      key={i}
                      onClick={() => {
                        this.setCurrency(currency);
                      }}
                      title={currency.country}
                    >
                      <div className="currency_item">
                        <div className="currency_flag">
                          <img src={currency.flag} alt="" />
                        </div>
                        <div className="currency_name">
                          <span>{currency.name}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </div>
              )}

              {this.state.showFullList ? null : (
                <div>
                  {this.state.currencies.map((currency, i) => (
                    <li
                      key={i}
                      onClick={() => {
                        this.setCurrency(currency);
                      }}
                      title={currency.country}
                    >
                      <div className="currency_item">
                        <div className="currency_flag">
                          <img src={currency.flag} alt="" />
                        </div>
                        <div className="currency_name">
                          <span>{currency.name}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </div>
              )}
            </ul>
          </div>
        </div>
      </>
    );
  }
}

export default currencydropdown;
