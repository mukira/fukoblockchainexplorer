import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import "./style.css";

import { Table } from "reactstrap";

class LatestBlocks extends Component {
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
    var data = this.state.data;
    var tableRows = [];
    _.each(data.blocks, (block, index) => {
      tableRows.push(
        <tr key={block.number}>
          <td className="tdCenter">
            <small>{block.number}</small>
          </td>
          <td>
            <small>
              <Link to={`/block/${block.hash}`}>{block.hash}</Link>
            </small>
          </td>
        </tr>
      );
    });
    return (
      <div className="LatestBlocks">
        <h2>Latest Blocks</h2>
        <Table responsive>
          <thead className="text-primary">
            <tr>
              <th>no.</th>
              <th>Hash</th>
            </tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </Table>
      </div>
    );
  }
}

export default LatestBlocks;
