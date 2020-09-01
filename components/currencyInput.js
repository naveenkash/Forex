import React, { Component } from "react";
import Dropdown from "./paneldropdown";
import SwapIcon from "./swapcurrency";
import Head from "next/head";
export class currencyInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allCurrencies: [],
      fromCurrencyValue: 1,
      toCurrencyValue: 0,
      mainConvertedCurrencyValue: 0,
      selectedFrom: "USD",
      selectedFromFlag:
        "https://cdn.pixabay.com/photo/2017/03/14/21/00/american-flag-2144392__340.png",
      selectedTo: "INR",
      selectedToFlag:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAgBAMAAACm+uYvAAAAMFBMVEUSiAc4RVs8SF48SV9jbX5jbX9lb4CVnKiWnKiyt8DKzdPLztTq6+7x8vP/mTP///8DX5tcAAAAUUlEQVQoz2N4hwMwDHuJ/zgAksTvRLH9WCWa5py0wCbxS/f//8v7sUh8m////898LBIfz3/x/yOPXSIeqwROo37b4rD8fzEO5+L2IFqQjFgAAKYM7paqvXB1AAAAAElFTkSuQmCC",
      showDrop1: false,
      showDrop2: false,
      hideDrop: false,
      cunversionFrom: "US Dollar",
      cunversionTo: "Indian Rupee",
    };
  }
  componentDidMount() {
    fetch("https://restcountries.eu/rest/v2/all")
      .then((res) => {
        if (!res.ok) {
          throw Error("AN ERROR OCCURED");
        }
        return res.json();
      })
      .then((data) => {
        var copyCurrencyArray = [];
        data.map((currencyData) => {
          if (
            currencyData.currencies[0].code === null ||
            currencyData.currencies[0].name === null
          ) {
            return;
          }
          var obj = {
            name: currencyData.currencies[0].code,
            flag: currencyData.flag,
            code: currencyData.area,
            country: currencyData.name,
            currency_full_name: currencyData.currencies[0].name,
          };
          copyCurrencyArray.push(obj);
        });
        this.setState(
          {
            allCurrencies: copyCurrencyArray,
          },
          () => {
            this.fetchDataFromSelecting();
          }
        );
      })
      .catch((err) => {
        alert(err);
      });
  }
  setDataToState = (data) => {
    this.setState({
      mainConvertedCurrencyValue: data.quotes[0].bid,
      fromCurrencyValue: 1,
      toCurrencyValue: data.quotes[0].bid,
    });
  };
  UNSAFE_componentWillReceiveProps() {
    this.setState({
      showDrop1: this.props.hideDropFromClickOnWindow,
      showDrop2: this.props.hideDropFromClickOnWindow,
    });
  }
  handleHover = (e, node) => {
    var input_wrapper = document.getElementsByClassName(node);
    for (let i = 0; i < input_wrapper.length; i++) {
      const element = input_wrapper[i];
      element.classList.add("normalBorder");
      if (element.classList.contains("activeFocus")) {
        element.classList.add("activeFocus");
      }
    }
    e.currentTarget.parentNode.classList.add("activeHover");
  };
  handleLeave = (e) => {
    e.currentTarget.parentNode.classList.remove("activeHover");
    e.currentTarget.parentNode.classList.add("normalBorder");
  };
  handleDown = (e, node) => {
    e.stopPropagation();
    var input_wrapper = document.getElementsByClassName(node);
    for (let i = 0; i < input_wrapper.length; i++) {
      const element = input_wrapper[i];
      element.classList.remove("activeFocus");
    }
    e.currentTarget.parentNode.classList.remove("activeHover");
    e.currentTarget.parentNode.classList.remove("normalBorder");
    e.currentTarget.parentNode.classList.add("activeFocus");
  };
  selectedFrom = (currency) => {
    if (currency.name === this.state.selectedTo) {
      this.setState({
        selectedTo: this.state.allCurrencies[0].name,
        selectedToFlag: this.state.allCurrencies[0].flag,
      });
    }
    this.setState(
      {
        selectedFrom: currency.name,
        selectedFromFlag: currency.flag,
        cunversionFrom: currency.currency_full_name,
      },
      () => {
        this.fetchDataFromSelecting();
        this.props.ConversionCurr(currency.currency_full_name);
      }
    );
  };
  selectedTo = (currency) => {
    this.setState(
      {
        selectedTo: currency.name,
        selectedToFlag: currency.flag,
        cunversionTo: currency.currency_full_name,
      },
      () => {
        this.fetchDataFromSelecting();
        this.props.ConversionCurrTo(currency.currency_full_name);
      }
    );
  };
  fetchDataFromSelecting = () => {
    fetch(
      `https://www1.oanda.com/rates/api/v2/rates/spot.json?api_key=${process.env.REACT_APP_API_KEY_1}&base=${this.state.selectedFrom}&quote=${this.state.selectedTo}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setDataToState(data);
        this.props.currencyRate(data);
      })
      .catch((err) => {
        alert(err);
      });
  };
  swapCurrency = (data) => {
    this.setDataToState(data);
    this.setState(
      {
        selectedFrom: this.state.selectedTo,
        selectedFromFlag: this.state.selectedToFlag,
        selectedTo: this.state.selectedFrom,
        selectedToFlag: this.state.selectedFromFlag,
      },
      () => {
        this.props.currencyRate(data);
        this.props.ConversionCurr(this.state.cunversionTo);
        this.props.ConversionCurrTo(this.state.cunversionFrom);
      }
    );
  };
  calculateCurrency = (e) => {
    if (isNaN(e.target.value)) {
      alert("Please enter a number ");
      return;
    }
    var CurrencyCalculated =
      e.target.value * this.state.mainConvertedCurrencyValue;
    this.setState({
      fromCurrencyValue: e.target.value,
      toCurrencyValue: CurrencyCalculated,
    });
  };
  showDropDown1 = (show, e) => {
    e.stopPropagation();
    this.setState({ showDrop1: show, showDrop2: false });
  };
  showDropDown2 = (show, e) => {
    e.stopPropagation();
    this.setState({ showDrop1: false, showDrop2: show });
  };
  hideDropDown = (hide) => {
    this.setState({ showDrop1: hide, showDrop2: hide });
  };

  render() {
    return (
      <>
        <Head>
          <link
            rel="stylesheet"
            href="../static\styles\currencyInput\currencyInput.css"
          />
        </Head>
        <div className="panel">
          <div className="panel_body">
            <div className="panel_input_wrapper">
              <div className="label_convert">
                <label>Amount</label>
              </div>
              <div className="panel_input">
                <input
                  onMouseEnter={(e) => this.handleHover(e, "panel_input")}
                  onMouseLeave={(e) => this.handleLeave(e, "panel_input")}
                  onClick={(e) => this.handleDown(e, "panel_input")}
                  type="text"
                  value={this.state.fromCurrencyValue}
                  onChange={(e) => {
                    this.calculateCurrency(e);
                  }}
                />
                <div className="panel_currency">
                  <span>{this.state.selectedFrom}</span>
                </div>
              </div>
            </div>
            <div className="panel_input_wrapper">
              <div className="label_convert">
                <label>Converted To</label>
              </div>
              <div className="panel_input">
                <input
                  onMouseEnter={(e) => this.handleHover(e, "panel_input")}
                  onMouseLeave={(e) => this.handleLeave(e, "panel_input")}
                  onClick={(e) => this.handleDown(e, "panel_input")}
                  type="text"
                  value={
                    Math.floor(this.state.toCurrencyValue * 100000) / 100000
                  }
                  onChange={() => {}}
                />
                <div className="panel_currency">
                  <span>{this.state.selectedTo}</span>
                </div>
              </div>
            </div>
            <div className="panel_select_wrapper">
              <div className="panel_input_wrapper panel_select_item_wrapper">
                <div className="panel_select">
                  <Dropdown
                    showDrop={this.state.showDrop1}
                    showDropDown={this.showDropDown1}
                    hideDropDown={this.hideDropDown}
                    selected={this.selectedFrom}
                    convert={"From"}
                    allCurrencies={this.state.allCurrencies}
                    currency={this.state.selectedFrom}
                    filterCurrency={this.state.selectedTo}
                    flag={this.state.selectedFromFlag}
                  />
                  <SwapIcon
                    swapCurrency={this.swapCurrency}
                    from={this.state.selectedFrom}
                    to={this.state.selectedTo}
                  />
                  <Dropdown
                    showDrop={this.state.showDrop2}
                    showDropDown={this.showDropDown2}
                    hideDropDown={this.hideDropDown}
                    selected={this.selectedTo}
                    convert={"To"}
                    allCurrencies={this.state.allCurrencies}
                    currency={this.state.selectedTo}
                    filterCurrency={this.state.selectedFrom}
                    flag={this.state.selectedToFlag}
                  />
                </div>
              </div>
              <div className="panel_input_wrapper panel_select_item_wrapper">
                <div className="exchange_rate">
                  <h3>
                    <span>1 {this.state.selectedFrom} ➡ </span>
                    <span>
                      {`${
                        Math.floor(
                          this.state.mainConvertedCurrencyValue * 100000
                        ) / 100000
                      } ${this.state.selectedTo}`}
                    </span>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default currencyInput;
