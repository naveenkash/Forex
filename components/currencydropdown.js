import React, { Component } from "react";
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

          <style jsx>{`
            .currency_dropdown {
              width: 100%;
              height: 350px;
              background: white;
              box-shadow: 0 20px 66px 0 rgba(34, 48, 73, 0.2);
              position: absolute;
              top: 0;
              left: 0;
              z-index: 1;
              padding: 8px;
              overflow-y: scroll;
            }
            .currency_search {
              width: 100%;
              height: 45px;
              margin-bottom: 15px;
            }
            .currency_search input {
              width: 100%;
              height: 100%;
              padding: 14px;
              font-size: 16px;
              color: #384c70;
              outline: none;
              border: 1px solid #17bfff;
              border-radius: 4px;
            }
            .all_currrency {
              display: flex;
              align-items: center;
              flex-direction: column;
            }
            .all_currrency ul {
              padding: 0;
              margin: 0;
              list-style: none;
              width: 100%;
            }
            .currency_item {
              width: 100%;
              height: 45px;
              display: flex;
              align-items: center;
              padding: 12px;
            }
            .currency_flag {
              width: 26px;
              height: 17px;
              margin-right: 5px;
            }
            .currency_flag img {
              width: 100%;
              height: 100%;
            }
            .currency_item:hover {
              background: #f2f5f7;
            }
            .currency_active {
              background: #2e4369;
            }
          `}</style>
        </div>
      </>
    );
  }
}

export default currencydropdown;
