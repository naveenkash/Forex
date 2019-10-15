import React, { Component } from "react";
import { Line } from "react-chartjs-2";

export class currencyChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labelsYAxis: [],
      data: [],
      loading: true,
      show: false
    };
  }
  componentDidMount() {
    fetch(
      `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=${this.props.from}&to_symbol=${this.props.to}&apikey=${process.env.REACT_APP_API_KEY_3}`
    )
      .then(res => {
        return res.json();
      })
      .then(data => {
        if (data.Note || data["Error Message"]) {
          this.setState({ show: true, loading: false });
          alert("Chart Can't be Loaded Beacuse Of Api Call Limit");
          return;
        }
        this.setState({ loading: false });
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
          "Dec"
        ];
        for (var key in dataKey) {
          if (dataKey.hasOwnProperty(key)) {
            var splittedKey = key.split("-");
            dates.push([splittedKey[1], splittedKey[2]].join());
            tempArrFoData.push(dataKey[key][["4. close"]]);
          }
        }
        var convertedDtae = [];
        var onlyNum = 0;
        for (let i = 0; i < dates.length; i++) {
          const element = dates[i];
          var dMS = element.split(",");
          if (dMS[0] < 10) {
            onlyNum = dMS[0].replace(0, "");
            convertedDtae.push(
              [`${months[onlyNum - 1]} ${dMS[1].replace(0, "")}`].join()
            );
          } else if (dMS[0] >= 10) {
            onlyNum = dMS[0];
            if (dMS[1] < 10) {
              dMS[1] = dMS[1].replace(0, "");
            }
            convertedDtae.push([`${months[onlyNum - 1]} ${dMS[1]}`].join());
          }
        }
        this.setState({
          labelsYAxis: convertedDtae,
          data: tempArrFoData
        });
      })
      .catch(err => {
        this.setState({ show: true, loading: false });
        alert(err);
      });
  }
  render() {
    const { from, to } = this.props;
    var data = {
      labels: this.state.labelsYAxis,
      datasets: [
        {
          //   label: `Historical Rates Of ${this.props.to}`,
          data: this.state.data,
          fill: false,
          borderColor: ["#2ed06e"],
          borderWidth: 3
        }
      ]
    };
    var options = {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false,
        labels: {
          // This more specific font property overrides the global property
          fontColor: "white"
        }
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
          title: function(tooltipItem) {
            return tooltipItem[0].xLabel;
          },
          label: function(tooltipItem) {
            return `1 ${from} ➡  ${Number(tooltipItem.yLabel)} ${to}`;
          }
        }
      },
      hover: {
        mode: "index",
        intersect: false
      },
      scales: {
        xAxes: [
          {
            display: true,
            ticks: {
              // maxTicksLimit: 20,
              reverse: true,
              fontColor: "#ffffff",
              fontSize: 14
            },
            gridLines: {
              display: false,
              drawBorder: false
            }
          }
        ],
        yAxes: [
          {
            display: true,
            ticks: {
              fontColor: "#ffffff",
              fontSize: 14
            },
            gridLines: {
              display: true,
              drawBorder: true,
              color: "#6e7880",
              lineWidth: 0.5
            }
          }
        ]
      },
      elements: {
        point: {
          radius: 0
        }
      },
      scaleOverride: true,
      scaleSteps: 100,
      scaleStepWidth: 200,
      scaleStartValue: 200
    };
    return (
      <div className="data_chart">
        {(() => {
          if (this.state.loading) {
            return (
              <div className="loading">
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="45" />
                </svg>
              </div>
            );
          } else if (this.state.show) {
            return (
              // <div className="loading">
              <h3 className="chart_error">
                Can't Load Chart! Try Refreshing The Page Again In a Moment
              </h3>
              // </div>
            );
          } else {
            return <Line data={data} options={options} />;
          }
        })()}

        <style jsx>{`
          .data_chart {
            position: relative;
            width: 100%;
            height: 400px;
          }
        .chart_error{
          color:white;
        }
         
          }
          @media only screen and (max-width:667px){
            .data_chart{
              height:300px;
            }
          }
          @media only screen and (max-width:500px){
            .data_chart{
              height:250px;
            }
          }
          @media only screen and (max-width:400px){
            .data_chart{
              height:200px;
            }
          }
        `}</style>
      </div>
    );
  }
}

export default currencyChart;
