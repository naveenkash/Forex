import React, { Component } from "react";
import { Line } from "react-chartjs-2";
export class currencyChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labelsYAxis: [],
      data: [],
      loading: true,
      show: false,
    };
  }
  fetchChartData = (from, to) => {
    fetch(
      `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=${from}&to_symbol=${to}&apikey=${process.env.REACT_APP_API_KEY_3}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.Note || data["Error Message"]) {
          this.setState({ show: true, loading: false });
          data = {};
          throw new Error("Chart Can t be Loaded Beacuse Of Api Call Limit");
        }
        var tempArrFoData = [];
        var dataKey = data["Time Series FX (Daily)"];
        var dates = [];
        var months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        for (var key in dataKey) {
          if (dataKey.hasOwnProperty(key)) {
            var splittedKey = key.split("-");
            dates.push([splittedKey[1], splittedKey[2]].join());
            tempArrFoData.push(dataKey[key][["4. close"]]);
          }
        }
        var convertedDate = [];
        var onlyNum = 0;
        for (let i = 0; i < dates.length; i++) {
          const element = dates[i];
          var dMS = element.split(",");
          if (dMS[0] < 10) {
            onlyNum = dMS[0].replace(0, "");
            if (dMS[1] < 10) {
              dMS[1] = dMS[1].replace(0, "");
            }
            convertedDate.push([`${months[onlyNum - 1]} ${dMS[1]}`].join());
          } else if (dMS[0] >= 10) {
            onlyNum = dMS[0];
            if (dMS[1] < 10) {
              dMS[1] = dMS[1].replace(0, "");
            }
            convertedDate.push([`${months[onlyNum - 1]} ${dMS[1]}`].join());
          }
        }
        this.setState({
          labelsYAxis: convertedDate,
          data: tempArrFoData,
          loading: false,
          show: false,
        });
      })
      .catch((err) => {
        this.setState({ show: true, loading: false });
        alert(err);
      });
  };
  componentDidMount() {
    this.fetchChartData(this.props.from, this.props.to);
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    this.fetchChartData(newProps.from, newProps.to);
  }

  render() {
    const { from, to } = this.props;
    var data = {
      labels: this.state.labelsYAxis,
      datasets: [
        {
          data: this.state.data,
          fill: false,
          borderColor: ["#2ed06e"],
          borderWidth: 3,
        },
      ],
    };
    var options = {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false,
        labels: {
          // This more specific font property overrides the global property
          fontColor: "white",
        },
      },
      tooltips: {
        backgroundColor: "white",
        bodyFontColor: "#2e4369",
        titleFontColor: "#2e4369",
        displayColors: false,
        titleFontSize: 14,
        xPadding: 15,
        yPadding: 8,
        mode: "index",
        cornerRadius: 2,
        intersect: false,
        callbacks: {
          title: function (tooltipItem) {
            return tooltipItem[0].xLabel;
          },
          label: function (tooltipItem) {
            return `1 ${from} ➡  ${Number(tooltipItem.yLabel)} ${to}`;
          },
        },
      },
      hover: {
        mode: "index",
        intersect: false,
      },
      scales: {
        xAxes: [
          {
            display: true,
            ticks: {
              reverse: true,
              fontColor: "#ffffff",
              fontSize: 14,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
          },
        ],
        yAxes: [
          {
            display: true,
            ticks: {
              fontColor: "#ffffff",
              fontSize: 14,
            },
            gridLines: {
              display: true,
              drawBorder: true,
              color: "#6e7880",
              lineWidth: 0.5,
            },
          },
        ],
      },
      elements: {
        point: {
          radius: 0,
        },
      },
      scaleOverride: true,
      scaleSteps: 100,
      scaleStepWidth: 200,
      scaleStartValue: 200,
    };
    return (
      <>
        {this.state.show ? (
          <p className="loadingError chart_error row">
            Can't Load Chart! Try Refreshing The Page Again In a Moment
          </p>
        ) : (
          <div className="data_chart">
            {this.state.loading ? (
              <div className="loading">
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="45" />
                </svg>
              </div>
            ) : (
              <Line
                ref={(reference) => (this.chartReference = reference)}
                key={this.props.from}
                data={data}
                options={options}
              />
            )}
          </div>
        )}
      </>
    );
  }
}

export default currencyChart;
