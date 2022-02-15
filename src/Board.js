import React, { createRef } from "react";
import Square from "./Square";
import Algo from "./Algo";

class Board extends React.Component {
   rows = 20;
   columns = 30;
   index=0;

  constructor(props) {
    super(props);
    // alert("some")
    this.clickSquare = this.clickSquare.bind(this);
    this.state = {
      squares: [],
      animation: [],
      button: "unvisited",
      traversePath: false
    };
  }


  

  componentDidMount() {
    // const cells = [];
    const states = [];
    for (let i = 0; i < this.rows; i++) {
      const curRow = [];
      const curRowStates = [];
      states.push(curRowStates);
      for (let j = 0; j < this.columns; j++) {
        // mock start node
        if(i===15 && j==15){
          curRowStates.push(Square.START);
        }else if(i===this.rows-1 && j==this.columns-1){
          curRowStates.push(Square.END);
        }
        else{
          curRowStates.push(Square.UNVISITED);
        }
        curRow.push(
          <Square
            className={Square.UNVISITED}
          ></Square>
        );
      }
      this.state.squares.push(curRow);
    }
    for(let i=0; i <20;i++){
      let i=Math.floor(Math.random() * this.rows)
      let j=Math.floor(Math.random() * this.columns)
      this.state.animation.push([i,j]);
    }
    this.setState({
      squareStates: states });
  }
  /**
   * call back function when a square fot clicked 
   * @param {*} coordinate 
   * @param {*} state 
   */

  static map={};
  clickSquare(coordinate,state,update) {
    const row=coordinate[0]
    const col=coordinate[1]
    //update this cell state
    this.state.squareStates[row][col] = state;

    Board.map = Algo.bfsTraverse(this.rows,this.columns,row,col);

    //update
    if(update){
      this.setState({ 
        traversePath: true,
        squares: this.state.squareStates });
    }
  }

  startingTraversePath(i,j){
    return (this.state.squareStates[i][j]===Square.UNVISITED)
  }

  render() {
    return (
      <div className="row">
        {this.state.squares.map((row, i) => {
          return (
            <div className="column">
              {row.map((square, j) => {
                // return square;
                this.index=this.index+1
                
                return (
                  <Square
                    index={this.index}
                    traversePath={this.state.traversePath}
                    animation={Board.map[[i,j]]}
                    coordinate={[i, j]}
                    className={this.state.squareStates[i][j]}
                    onclick={this.clickSquare}
                  ></Square>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Board;
