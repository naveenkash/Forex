import React, { Component } from "react";
import DropdownHead from "./paneldropdown";
import SwapIcon from "./swapcurrency";
export class currencyInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      all_currencies: [],
      fromCurrencyValue: 1,
      toCurrencyValue: 0,
      mainConvertedCurrencyValue: 0,
      all_currencies2: [],
      selectedFrom: "USD",
      selectedFromFlag:
        "https://cdn.pixabay.com/photo/2017/03/14/21/00/american-flag-2144392__340.png",
      selectedTo: "INR",
      selectedToFlag:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAgBAMAAACm+uYvAAAAMFBMVEUSiAc4RVs8SF48SV9jbX5jbX9lb4CVnKiWnKiyt8DKzdPLztTq6+7x8vP/mTP///8DX5tcAAAAUUlEQVQoz2N4hwMwDHuJ/zgAksTvRLH9WCWa5py0wCbxS/f//8v7sUh8m////898LBIfz3/x/yOPXSIeqwROo37b4rD8fzEO5+L2IFqQjFgAAKYM7paqvXB1AAAAAElFTkSuQmCC",
      showDrop1: false,
      showDrop2: false,
      hideDrop: false,
      cunversionFrom:"US Dollar",
      cunversionTo:"Indian Rupee"
    };
  }
  componentDidMount() {
    fetch("https://restcountries.eu/rest/v2/all")
      .then(res => {
        if (!res.ok) {
          throw Error("AN ERROR OCCURED");
        }
        return res.json();
      })
      .then(data => {
        var copyCurrencyArray = [];
        data.map((currencyData, i) => {
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
            currency_full_name: currencyData.currencies[0].name
          };
          // console.log(obj);

          copyCurrencyArray = [...copyCurrencyArray, obj];
        });
        var currency2 = [...copyCurrencyArray].filter(item => {
          return item.name !== "USD";
        });
        this.setState({
          all_currencies: copyCurrencyArray,
          all_currencies2: currency2
        });
      })
      .catch(err => {
        alert(err);
      });

    fetch(
      `https://www1.oanda.com/rates/api/v2/rates/spot.json?api_key=${process.env.REACT_APP_API_KEY_1}&base=${this.state.selectedFrom}&quote=${this.state.selectedTo}`
    )
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setDataToState(data);
        this.props.currencyRate(data);
      })
      .catch(err => {
        alert(err);
      });
  }
  setDataToState = data => {
    this.setState({
      mainConvertedCurrencyValue: data.quotes[0].bid,
      fromCurrencyValue: 1,
      toCurrencyValue: data.quotes[0].bid
    });
  };
  UNSAFE_componentWillReceiveProps() {
    this.setState({
      showDrop1: this.props.hideDropFromClickOnWindow,
      showDrop2: this.props.hideDropFromClickOnWindow
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
  handleLeave = (e, node) => {
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
  removeEl = currency => {
    var res = this.state.all_currencies.filter(item => {
      return item.name !== currency.name;
    });
    this.setState({ all_currencies2: res });
  };
  selectedFrom = currency => {
    if (currency.name === this.state.selectedTo) {
      this.setState({
        selectedTo: this.state.all_currencies[0].name,
        selectedToFlag: this.state.all_currencies[0].flag
      });
    }
    this.setState(
      {
        selectedFrom: currency.name,
        selectedFromFlag: currency.flag,
        cunversionFrom:currency.currency_full_name
      },
      () => {
        this.fetchDataFromSelecting();
        this.props.ConversionCurr(currency.currency_full_name);
      }
    );
  };
  selectedTo = currency => {
    this.setState(
      { selectedTo: currency.name, selectedToFlag: currency.flag ,cunversionTo:currency.currency_full_name},
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
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setDataToState(data);
        this.props.currencyRate(data);
      });
  };
  swapCurrency = data => {
    this.setDataToState(data);
    this.setState(
      {
        selectedFrom: this.state.selectedTo,
        selectedFromFlag: this.state.selectedToFlag,
        selectedTo: this.state.selectedFrom,
        selectedToFlag: this.state.selectedFromFlag
      },
      () => {
        this.props.currencyRate(data);
        this.props.ConversionCurr(this.state.cunversionTo);
        this.props.ConversionCurrTo(this.state.cunversionFrom);
      }
    );

    // this.props.ConversionCurr(currency)
  };
  calculateCurrency = e => {
    if (isNaN(e.target.value)) {
      alert("Please enter a number ");
      return;
    }
    var CurrencyCalculated =
      e.target.value * this.state.mainConvertedCurrencyValue;
    this.setState({
      fromCurrencyValue: e.target.value,
      toCurrencyValue: CurrencyCalculated
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
  hideDropDown = hide => {
    this.setState({ showDrop1: hide, showDrop2: hide });
  };

  render() {
    return (
      <div className="panel">
        <div className="panel_body">
          <div className="panel_input_wrapper">
            <div className="label_convert">
              <label>Amount</label>
            </div>
            <div className="panel_input">
              <input
                onMouseEnter={e => this.handleHover(e, "panel_input")}
                onMouseLeave={e => this.handleLeave(e, "panel_input")}
                onClick={e => this.handleDown(e, "panel_input")}
                type="text"
                value={this.state.fromCurrencyValue}
                onChange={e => {
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
                onMouseEnter={e => this.handleHover(e, "panel_input")}
                onMouseLeave={e => this.handleLeave(e, "panel_input")}
                onClick={e => this.handleDown(e, "panel_input")}
                type="text"
                value={Math.floor(this.state.toCurrencyValue * 100000) / 100000}
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
                <DropdownHead
                  showDrop={this.state.showDrop1}
                  showDropDown={this.showDropDown1}
                  hideDropDown={this.hideDropDown}
                  selected={this.selectedFrom}
                  convert={"From"}
                  all_currencies={this.state.all_currencies}
                  removeEl={this.removeEl}
                  currency={this.state.selectedFrom}
                  flag={this.state.selectedFromFlag}
                />
                <SwapIcon
                  swapCurrency={this.swapCurrency}
                  from={this.state.selectedFrom}
                  to={this.state.selectedTo}
                />
                <DropdownHead
                  showDrop={this.state.showDrop2}
                  showDropDown={this.showDropDown2}
                  hideDropDown={this.hideDropDown}
                  selected={this.selectedTo}
                  convert={"To"}
                  all_currencies={this.state.all_currencies2}
                  currency={this.state.selectedTo}
                  removeEl={() => {}}
                  flag={this.state.selectedToFlag}
                />
              </div>
            </div>
            <div className="panel_input_wrapper panel_select_item_wrapper">
              <div className="exchange_rate">
                <h3>
                  <span>1 {this.state.selectedFrom} ➡ </span>
                  <span>
                    {`${Math.floor(
                      this.state.mainConvertedCurrencyValue * 100000
                    ) / 100000} ${this.state.selectedTo}`}
                  </span>
                </h3>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
          .panel {
            max-width: 100%;
            height: auto;
            background: white;
            border-radius: 5px;
            padding: 30px;
            margin: 30px 0 60px;
          }
          .panel_body {
            width: 100%;
            height: auto;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
          }
          .panel_input_wrapper {
            width: 50%;
            padding: 0 10px;
          }
          .panel_select_wrapper {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
          }
          .label_convert label {
            color: #919ea4;
            font-size: 15px;
            transition: 0.1s;
          }
          .panel_input {
            position: relative;
            margin-bottom: 24px;
            margin-top: 3px;
            transition: 0.1s;
            border-radius: 3px;
            border: 1px solid #d3d5d8;
          }
          .panel_currency {
            position: absolute;
            top: 0;
            right: 0;
            height: 72px;
            padding: 13px 16px 11px;
            display: flex;
            align-items: center;
            background: white;
          }
          .panel_currency span {
            color: #829ca9;
            font-family: "Poppins", sans-serif;
            letter-spacing: 0.5px;
          }
          .panel_input input {
            width: 100%;
            padding: 13px 16px 11px;
            height: 72px;
            outline: none;
            border: none;
            font-size: 22px;
            border-radius: 3px;
            color: #384c70;
          }
          .panel_select {
            width: 100%;
            display: flex;
            align-items: center;
            margin-bottom: 30px;
          }
          .panel_dropdown {
            width: 40%;
            cursor: pointer;
          }

          .panel_drop_select {
            height: 45px;
            width: 100%;
            position: relative;
            display: flex;
            align-items: center;
            padding: 15px;
          }
          .drop_arrow {
            width: 18px;
            height: 18px;
            position: absolute;
            right: 10px;
            bottom: 13px;
          }
          .drop_arrow i {
            width: 100%;
            height: 100%;
            color: rgb(54, 200, 255);
          }
          .panel_drop_select i svg {
            width: 100%;
            height: 100%;
          }
          .panel_flag {
            margin-right: 5px;
            width: 24px;
            height: 16px;
            background-size: 100%;
            background-repeat: no repeat;
          }
          .panel_flag img {
            width: 100%;
            height: 100%;
          }
          .panel_curr_info span {
            font-family: "Poppins", sans-serif;
            letter-spacing: 0.5px;
          }
          .exchange_rate {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .exchange_rate span {
            font-weight: 700;
            color: #2e4369;
            font-size: 22px;
            font-family: "Noto Sans", sans-serif;
            letter-spacing: 0.5px;
          }
          .activeHover {
            border-color: #829ca9 !important;
          }
          .activeFocus {
            border-color: #17bfff !important;
          }
          .normalBorder {
            border-color: #d3d5d8;
          }
          @media only screen and (max-width: 1100px) {
            .panel {
              padding: 30px 20px;
            }
          }
          @media only screen and (max-width: 767px) {
            .panel {
              background: none;
              padding: 0;
            }
            .panel_input {
              margin-bottom: 18px;
            }
            .panel_select_item_wrapper {
              width: 100%;
            }
            .panel_input input {
              height: 45px;
              font-size: 16px;
            }
            .panel_currency {
              height: 45px;
            }
            .exchange_rate span {
              color: white;
              font-size: 16px;
            }
          }
          @media only screen and (max-width: 575px) {
            .panel_input_wrapper {
              width: 100%;
              padding: 0;
            }
          }
        `}</style>
      </div>
    );
  }
}

export default currencyInput;
