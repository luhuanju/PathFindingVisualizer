import React from "react";
import Board from "./Board";
import "./Square.css";

class Square extends React.Component {
  static UNVISITED = "unvisited";
  static WALL = "wall";
  static START = "start";
  static DESTINATION = "destination";
  static VISITED = "visited";

  static END = "end";
  static PATH = "path";
  static INNER_STATE = false;

  static onMouseDown = false;
  static dragStart = false;
  static dragEnd = false;

  row = 0;
  col = 0;
  constructor(props) {
    super(props);
    this.state = {
      className: Square.UNVISITED,
    };
  }
  animationStyle() {

    if(Board.squareStates[this.row][this.col]==Square.WALL) return;
    // if(Board.delayTime.size)
    var pathAnimationDelay = Board.delayTime[[this.row, this.col]];
    if (pathAnimationDelay != undefined) {
      return {
        animation:
          "flyInFromBottom 1s ease " +(3 + pathAnimationDelay) * 0.1 +"s" +" forwards",
      };
    }
    if(Board.delayAnimation==undefined) return;
    console.log(Board.delayAnimation)
    var delayTime = Board.delayAnimation[[this.row, this.col]];
    if (delayTime != undefined) {
      return {
        animation:
          "visitedAnimation 1s ease " + delayTime * 0.1 + "s" + " forwards"
      };
    }
  }

  render() {
    this.row = this.props.coordinate[0];
    this.col = this.props.coordinate[1];
    let curState = Board.squareStates[this.row][this.col];
    return (
      <button
        style={this.animationStyle()}
        className={curState}
        onMouseDown={() => {
          Square.onMouseDown = true;
        }}
        onMouseUp={() => {
          Square.dragEnd = false;
          Square.onMouseDown = false;
          Square.dragStart = false;
        }}
        onMouseOver={() => {}}
        onPointerEnter={() => {
          if (Square.onMouseDown) {
            if (Square.dragStart) {
              Board.squareStates[this.row][this.col] = Square.START;
              this.setState({
                className: Square.START,
              });
            } else if (Square.dragEnd) {
              Board.squareStates[this.row][this.col] = Square.DESTINATION;
              this.setState({
                className: Square.DESTINATION,
              });
            } else if (
              Board.squareStates[this.row][this.col] == Square.UNVISITED ||
              Board.squareStates[this.row][this.col] == Square.VISITED
            ) {
              Board.squareStates[this.row][this.col] = Square.WALL;
              this.setState({
                className: Square.WALL,
              });
            }
          }
        }}
        onPointerLeave={(e) => {
          console.log("onPointerLeave");
          if (Square.onMouseDown) {
            if (Board.squareStates[this.row][this.col] == Square.DESTINATION) {
              Square.dragEnd = true;
              Board.squareStates[this.row][this.col] = Square.UNVISITED;
              this.setState({
                className: Square.UNVISITED,
              });
            } else if (
              Board.squareStates[this.row][this.col] === Square.START
            ) {
              Square.dragStart = true;
              Board.squareStates[this.row][this.col] = Square.UNVISITED;
              this.setState({
                className: Square.UNVISITED,
              });
            }
          }
        }}
        onClick={() => {
          console.log("onClick");
          // let state=this.state.className==Square.WALL?Square.UNVISITED:Square.WALL;
          // Board.squareStates[this.props.coordinate[0]][this.props.coordinate[1]]=state;
          // this.setState({
          //   className: state
          // })
          // this.props.onclick(this.props.coordinate, curState,false)
        }}
      ></button>
    );
  }
}

export default Square;
