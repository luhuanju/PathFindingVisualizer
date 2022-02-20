import React, { createRef } from "react";
import Square from "./Square";
import Algo from "./Algo";
import TopHeader from "./TopHeader";
import QcEventEmitter from "./QcEventEmitter";
class Board extends React.Component {
  rows = 25;
  columns = 25;
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
    this.virtualization = this.virtualization.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
    this.state = {
      squares: [],
      tag: false,
    };
  }

  load() {
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
  componentDidMount() {
    this.load();
  }

  static delayAnimation = {};

  clearCanvas() {
    Board.delayAnimation={}
    Board.squareStates = [];
    this.load();
  }
  virtualization() {
    QcEventEmitter.emit('contextClick',10,10)
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
        <TopHeader
          onclick={this.virtualization}
          onclear={this.clearCanvas}
        ></TopHeader>
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
      </div>
    );
  }
}

export default Board;
