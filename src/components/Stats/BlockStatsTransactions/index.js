import React, { Component } from "react";
import "./style.css";
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  Legend,
  Tooltip,
  Area
} from "recharts";

class BlockStats extends Component {
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
    const data = this.state.data;
    var chartData = [];
    data.blocks.forEach(element => {
      var data = {
        height: element.number,
        transactions: element.transactions.length,
        size: element.size,
        gasPrice: element.gasUsed
      };
      chartData.push(data);
    });
    chartData.reverse();

    return (
      <div className="BlockStats">
        <div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart
              width={1020}
              height={250}
              data={chartData}
              margin={{ top: 25, right: 2, left: 2, bottom: 15 }}
            >
              <defs>
                <linearGradient
                  id="TransactionsFill"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#2CA8FF" stopOpacity={1} />
                  <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="height" />

              <Tooltip
                cursor={false}
                wrapperStyle={{ background: "#303030", border: 0 }}
              />
              <Legend />
              <Area
                animationEasing="ease-out"
                animationDuration={500}
                type="monotone"
                dataKey="transactions"
                stroke="#80b6f4"
                strokeWidth={2}
                yAxisId={1}
                //dot={{ stroke: "#FFFFFF", fill: "#80b6f4" }}
                activeDot={{ stroke: "#FFFFFF", strokeWidth: 2, r: 4 }}
                name="Transactions"
                fill="url(#TransactionsFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}

export default BlockStats;
