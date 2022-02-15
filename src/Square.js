import React from "react";
import "./Square.css";

class Square extends React.Component {
  static UNVISITED = "unvisited";
  static WALL = "wall";
  static START = "start";
  static END = "end";
  static PATH = "path";
  static INNER_STATE=false

  constructor(props) {
    super(props);
    this.state = {
      className: 'unvisited',
    };
    this.increase = this.increase.bind(this);
  }
  increase() {
    this.setState((state) => {
      return {
        className: "end",
      };
    });
  }
  animationStyle(){
    const traversePath= this.props.traversePath;
    if(traversePath){
      return {
        animation:
        "visitedAnimation 1s ease " +
        // ((this.props.animation[1] +this.props.animation[0])+1) * 0.1 
       ( this.props.animation+1)* 0.1 
        +"s" +" forwards"
      }
    }
  }


  render() {
    let curState=''
    // if(!this.INNER_STATE){
    //   curState= this.state.className;
    // }else{
    //   curState= this.props.className;
    // }
    curState= this.props.className;
    return (
      <button
        style={this.animationStyle()}
        className={curState}
        onMouseMove={() => {
          // curState=(this.state.className == Square.UNVISITED )? Square.WALL : Square.UNVISITED;
          // this.setState({
          //   className: curState,
          // })
        }}
        onClick={() => {
          curState = this.props.className;
          if (curState == Square.START || curState == Square.END) {
          } else if (curState == Square.UNVISITED) {
            curState = Square.WALL;
          } else if (curState == Square.WALL) {
            curState = Square.UNVISITED;
          }
          // console.log(this.statusName);
          // this.setState({
          //   className: curState
          // })
          this.props.onclick(this.props.coordinate, curState, true);
        }}
      ></button>
    );
  }
}

export default Square;
