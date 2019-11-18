import React, { Component } from 'react'
import './style.css'
import { ResponsiveContainer, AreaChart, XAxis, Legend, Tooltip, Area } from 'recharts';

class BlockStats extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: {}
      }
  }
  
  componentWillMount() {
    // Get the block hash from URL arguments (defined by Route pattern)
    this.getDataState(this.props.data);
  }
  
  getDataState(data) {
    // Set the Component state
    this.setState({
      data: data
    })
  }

  render() {
    const data = this.state.data;  
    var chartData = []
    data.blocks.forEach(element => {
      var data = {
        height: element.number,
        transactions: element.transactions.length,
        size: element.size,
        gasPrice: element.gasUsed
      }
      chartData.push(data)
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
            margin={{ top: 5, right: 20, left: 10, bottom: 15 }}
          >
              <defs>
    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
    </linearGradient>
    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#a18cd1" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#fbc2eb" stopOpacity={0}/>
    </linearGradient>
  </defs>
            <XAxis dataKey="height" />
            
            <Tooltip cursor={false} wrapperStyle={{ background: "#303030", border: 0}} />
            <Legend />
            <Area animationEasing='ease-out' animationDuration={500} type="monotone" dataKey="transactions" stroke="#E74C3C" strokeWidth={2} yAxisId={1} dot={{ stroke: '#E74C3C', fill: '#E74C3C'  }} activeDot={{ stroke: '#E74C3C', strokeWidth: 2, r: 4 }} name="Transactions"/>
            <Area type="monotone" animationEasing='ease-in-out' animationDuration={500} dataKey="size" stroke="#00bc8c" strokeWidth={2} yAxisId={2} dot={{ stroke: '#00bc8c', fill: '#00bc8c'  }} activeDot={{ stroke: '#00bc8c', strokeWidth: 2, r: 4 }} name="Size"/>
            <Area type="monotone" animationEasing='linear' animationDuration={500} dataKey="gasPrice" stroke="#FFFFFF" strokeWidth={2} yAxisId={3} dot={{ stroke: '#FFFFFF', fill: '#2c2c2c'  }} activeDot={{ stroke: '#a18cd1', strokeWidth: 2, r: 4 }} name="Gas Price" fillOpacity={1} fill="url(#colorPv)" />
          </AreaChart>
        </ResponsiveContainer>
        </div>
      </div>
    );
  }
}

export default BlockStats;