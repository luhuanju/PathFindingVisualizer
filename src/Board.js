import React, { createRef } from "react";
import Square from "./Square";
import Algo from "./Algo";
import TopHeader from "./TopHeader";
import QcEventEmitter from "./QcEventEmitter";
class Board extends React.Component {
  rows = 20;
  columns = 40;
  index = 0;
  static squareStates = [];
  static run = false;

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
    this.generateMaze = this.generateMaze.bind(this);
    
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
        } else if (
          row == Math.ceil(this.rows / 2) &&
          col == Math.ceil(this.columns / 2)
        ) {
          state = Square.DESTINATION;
        }
        else{
          var rand = Boolean(Math.round(Math.random()));
          var rand1 = Boolean(Math.round(Math.random()));
          if(rand && rand1){
            state=Square.WALL;
          }
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
  static delayTime = {};

  clearCanvas() {
    Board.delayAnimation={}
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        if (Board.squareStates[i][j] === Square.WALL) {
          Board.squareStates[i][j] = Square.UNVISITED;
        }
      }
    }
    this.setState({});
  }


  generateMaze() {
    Board.delayAnimation=new Map();
    Board.delayTime = {};
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        if (Board.squareStates[i][j] == Square.START || Board.squareStates[i][j] == Square.DESTINATION ) {
        }
        else{
          if(Board.squareStates[i][j]==Square.WALL){
            Board.squareStates[i][j]=Square.UNVISITED
          }
          var rand = Boolean(Math.round(Math.random()));
          var rand1 = Boolean(Math.round(Math.random()));
          if(rand && rand1){
            Board.squareStates[i][j]=Square.WALL;
          }
        }
      }
    }
    this.setState({});
  }

  virtualization() {
    // QcEventEmitter.emit('contextClick',10,10)
    // Board.delayAnimation=new Map();
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.columns; j++) {
        if (Board.squareStates[i][j] == Square.START) {
          var result = Algo.bfsTraverse(
            this.rows,
            this.columns,
            i,
            j,
            Board.squareStates
          );
          Board.delayAnimation = result[0];
          var max = result[2];
          this.setState({}, () => {
            if(result[1].length==0) return;
            for (let k = 0; k < result[1].length; k++) {
              max++;
              Board.delayTime[result[1][k]] = max;
            }
            this.setState({});
          });
          return;
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
          ongenerate={this.generateMaze}
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
