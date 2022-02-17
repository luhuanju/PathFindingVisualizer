import React, { createRef } from "react";
import Square from "./Square";
import Algo from "./Algo";
import TopHeader from "./TopHeader";
class Board extends React.Component {
  rows = 20;
  columns = 40;
  index = 0;
  static squareStates = [];

  createSquareComponent(row, col, state, delay) {
    return (
      <Square
        key={(row, col)}
        className={state}
        coordinate={[row, col]}
        animation={delay}
        onclick={this.clickSquare}
      />
    );
  }
  constructor(props) {
    super(props);
    this.clickSquare = this.clickSquare.bind(this);
    this.state = {
      squares: [],
      tag: false,
    };
  }

  componentDidMount() {
    const cells = [];
    for (let row = 0; row < this.rows; row++) {
      const curRow = [];
      const rowStates = [];
      for (let col = 0; col < this.columns; col++) {
        var state = Square.UNVISITED;
        if (row == 2 && col == 2) {
          state = Square.START;
        } else if (row == this.rows - 1 && col == this.columns - 1) {
          state = Square.DESTINATION;
        }
        curRow.push({
          state: state,
          component: this.createSquareComponent(row, col, state),
        });
        rowStates.push(state);
      }
      cells.push(curRow);
      Board.squareStates.push(rowStates);
    }
    this.setState({
      squares: cells,
    });
  }

  static delayAnimation = {};

  virtualization() {
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.columns; j++) {
        if (Board.squareStates[i][j] == Square.START) {
          Board.delayAnimation = Algo.bfsTraverse(
            this.rows,
            this.columns,
            i,
            j,
            Board.squareStates
          );
          this.setState({
            // squares: this.state.squares
            tag: !this.state.tag,
          });
        }
      }
    }
  }
  clickSquare(coordinate, state, updateParent) {
    let row = coordinate[0];
    let col = coordinate[1];
  }

  row_key = 0;
  col_Key = 0;
  render() {
    return (
      <div className="panel">

        <div className="header">
        </div>
        <TopHeader></TopHeader>
        <div className="row" key={this.row_key++}>
          {this.state.squares.map((row, i) => {
            return (
              <div className="column" key={this.col_Key++}>
                {row.map((square, j) => {
                  return square["component"];
                })}
              </div>
            );
          })}
        </div>
        <button
          className="search"
          onClick={() => {
            this.virtualization();
          }}
        >
          start search{" "}
        </button>
      </div>
    );
  }
}

export default Board;
