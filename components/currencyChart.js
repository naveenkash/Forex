import React, { Component } from "react";
import { Line } from "react-chartjs-2";

export class currencyChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labelsYAxis: [],
      data: []
    };
  }
  componentDidMount() {
    fetch(
      `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=${this.props.from}&to_symbol=${this.props.to}&apikey=VOT3RRAJ6BT3YJI6`
    )
      .then(res => {
        return res.json();
      })
      .then(data => {
        if (data.Note) {
          alert(
            "This is free api so it limit the number of request sent. Sorry for the inconvenience. Try agian in few seconds"
          );
          return;
        }
        var tempArrFoData = [];
        var dataKey = data["Time Series FX (Daily)"];
        for (var key in dataKey) {
          if (dataKey.hasOwnProperty(key)) {
            console.log("key", key, "value", dataKey[key][["4. close"]]);
            tempArrFoData.push(dataKey[key][["4. close"]]);
          }
        }
        this.setState({
          labelsYAxis: Object.keys(data["Time Series FX (Daily)"]),
          data: tempArrFoData
        });
      });
  }
  render() {
    console.log(this.props);
    const { from, to } = this.props;
    var data = {
      labels: this.state.labelsYAxis,
      datasets: [
        {
          //   label: `Historical Rates Of ${this.props.to}`,
          data: this.state.data,
          fill: false,
          borderColor: ["#2FC070"],
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
        xPadding: 15,
        yPadding: 15,
        mode: "index",
        cornerRadius: 2,
        intersect: false,
        callbacks: {
          label: function(tooltipItem, data) {
            var label = `1 ${from} ➡ ${data.datasets[tooltipItem.datasetIndex].data} ${to}`;

            return label;
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
              //    type: "invertedLinear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
              // display: true,
              // position: "right",
              // reverse:true,
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
      <div>
        <Line data={data} width={1100} height={400} options={options} />
      </div>
    );
  }
}

export default currencyChart;
