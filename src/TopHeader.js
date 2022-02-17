import React from "react";
import "./TopHeader.css";

class TopHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div id="topHeader">
          <div className="info">
            <div className="startinfo"></div>
            <p>Start Node</p>
          </div>
          <div className="info">
            <div className="endinfo"></div>
            <p>End Node</p>
          </div>
          <div className="info">
            <div className="unvisitedinfo"></div>
            <p>Unvisited Node</p>
          </div>
          <div className="info">
            <div className="wallinfo"></div>
            <p>Wall</p>
          </div>
        </div>
        <p id="textinfo">Pick an algorithm and visualize it!</p>
      </div>
    );
  }
}

export default TopHeader;
