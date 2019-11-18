import React, { Component } from "react";
import "./style.css";
import _ from "lodash";
import { Text } from "@aragon/ui";

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
        <Text style={{ textAlign: "center" }}>Gas Usage</Text>
        <div className="card-body">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart
              width={1020}
              height={800}
              data={chartData}
              stackOffset="expand"
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="GasFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f96332" stopOpacity={1} />
                  <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0} />
                </linearGradient>
              </defs>

              <Tooltip
                cursor={false}
                wrapperStyle={{ background: "#FFFFFF", border: 0 }}
                coordinate={{ x: 100, y: 140 }}
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
                stroke="#f96332"
                strokeWidth={2}
                yAxisId={3}
                dot={{ stroke: "#f96332", fill: "#ffffff" }}
                activeDot={{ stroke: "#FFFFFF", strokeWidth: 2, r: 4 }}
                name="Gas Used"
                fillOpacity={1}
                fill="url(#GasFill)"
              />
              <Area
                type="monotone"
                animationDuration={500}
                animationEasing="ease-in-out"
                dataKey="a"
                name="Unused Gas Limit"
                stackId="1"
                stroke="#ffffff"
                fill="#2c2c2c"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}

export default GasUse;
