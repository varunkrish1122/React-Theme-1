import React from "react";
import ReactApexChart from "react-apexcharts";

class SellingApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [{
			name: "New Clients",
			data: [180, 150, 200, 100, 80, 70, 40]
        }],
      options: {
        chart: {
          height: 350,
          type: "bar",
		  stacked: true,
          	toolbar: {
            	show: false,
			},
        },
		plotOptions: {
			bar: {
				borderRadius: 6,	
				columnWidth: "25%",
				startingShape: "rounded",				
				colors: {
					backgroundBarColors: ['#f0f5f2', '#f0f5f2', '#f0f5f2', '#f0f5f2','#f0f5f2','#f0f5f2','#f0f5f2','#f0f5f2'],
					backgroundBarOpacity: 1,
					backgroundBarRadius: 5,
				},

			},
			distributed: true
		},
        colors:['#13B497'],
        legend: {
			show: false
		},
		fill: {
          opacity: 1,
        },
        dataLabels: {
			enabled: false,
			colors: ['#000'],
			dropShadow: {
			  enabled: true,
			  top: 1,
			  left: 1,
			  blur: 1,
			  opacity: 1
			}
		},
        stroke: {
          show: true,
          width: 1,
          colors: ['transparent'],
		 
        },
        grid: {
			borderColor:'#f0f5f2'
		},
        
        xaxis: {
			categories: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
			labels: {
				style: {
					colors: '#787878',
					fontSize: '13px',
					fontFamily: 'poppins',
					fontWeight: 100,
					cssClass: 'apexcharts-xaxis-label',
				},
			},
			crosshairs: {
				show: false,
			},
			axisBorder: {
			  show: false,
			},
		},
		// yaxis: {
		// 	show: false
		// },
		tooltip: {
			x: {
				show: true
			}
		},
      },
    };
  }

	render() {
		return (
			<div id="lineChart">
				<ReactApexChart
				  options={this.state.options}
				  series={this.state.series}
				  type="bar"
				  height={350}
				/>
			</div>
		);
	}
}

export default SellingApexChart;
