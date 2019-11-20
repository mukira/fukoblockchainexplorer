import React, { Component } from "react";
import "./style.css";
import _ from "lodash";

import { ResponsiveContainer, AreaChart, Area, Tooltip, XAxis } from "recharts";

class GasUse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  componentWillMount() {
    // Get the block hash from URL arguments (defined by Route pattern)
    this.getDataState(this.props.data);
  }

  getDataState(data) {
    // Set the Component state
    this.setState({
      data: data
    });
  }

  render() {
    var data = this.state.data.blocks;
    var chartData = [];
    _.each(data, (value, index) => {
      chartData.push({
        block: data[index].timestamp,
        a: data[index].gasLimit - data[index].gasUsed,
        b: data[index].gasUsed
      });
    });
    chartData.reverse();

    return (
      <div className="GasUse">
          <ResponsiveContainer width="100%" height={140}>
            <AreaChart
              width={1020}
              height={800}
              data={chartData}
              stackOffset="expand"
              margin={{ top: 30, right: 0, left: 0, bottom: 10 }}
            >
              <defs>
                <linearGradient id="GasUsedFill" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="rgba(255, 255, 255, 0.14)"
                    stopOpacity={1}
                  />
                  <stop
                    offset="95%"
                    stopColor="rgba(128, 182, 244, 0)"
                    stopOpacity={.6}
                  />
                </linearGradient>
              </defs>

              <Tooltip
                cursor={false}
                wrapperStyle={{ background: "#FFFFFF", border: 0 }}
                labelStyle={{ color: "#000"}}
                itemStyle={{ color: "#000"}}
                coordinate={{ x: 100, y: 100 }}
                offset={50}
              />
              <XAxis
                dataKey="block"
                type="number"
                domain={["auto", "auto"]}
                tickCount={0}
                tickSize={0}
                tick={false}
                axisLine={false}
                hide={true}
              />
              <Area
                type="monotone"
                animationEasing="linear"
                animationDuration={500}
                dataKey="b"
                stroke="#ffffff"
                strokeWidth={2}
                yAxisId={3}
                dot={{
                  stroke: "#ffffff",
                  fill: "#ffffff",
                  strokeWidth: 2,
                  r: 5
                }}
                activeDot={{
                  stroke: "#FFFFFF",
                  fill: "#FFFFFF",
                  strokeWidth: 2,
                  r: 6
                }}
                name="Gas Used"
                fillOpacity={1}
                fill="url(#GasUsedFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
    );
  }
}

export default GasUse;
