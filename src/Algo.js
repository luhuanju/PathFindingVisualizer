import Square from "./Square";

export default class Algo {
  static bfsTraverse(n, m, row, col, data) {
    let map = {};
    var findDestination=false
    let level = 0;
    var dict = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1]
      // [-1, -1],
      // [1, -1],
      // [1, 1],
      // [-1, 1],
    ];
    var queue = [];
    queue.push([row, col]);
    var hash = new Set();
    hash.add("" + [row, col]);
    while (queue.length > 0) {
      level++;
      var times = queue.length;
      for (let k = 0; k < times; k++) {
        var node = queue.shift();
        var x = node[0];
        var y = node[1];
        map[[x, y]] = level;
        
        for (let i = 0; i < 4; i++) {
          var dic = dict[i];
          var new_x = dic[0] + x;
          var new_y = dic[1] + y;
          if (
            new_x < 0 ||
            new_x >= n ||
            new_y < 0 ||
            new_y >= m ||
            hash.has("" + [new_x, new_y])
          ) {
          } else if (data[new_x][new_y] == Square.UNVISITED) {
            queue.push([new_x, new_y]);
            hash.add("" + [new_x, new_y]);
          }
          else if (data[new_x][new_y] == Square.DESTINATION) {
            findDestination=true
            queue.push([new_x, new_y]);
            hash.add("" + [new_x, new_y]);
          }
        }
      }
      if(findDestination){ 
        console.log('=>'+map);
        delete map[[row, col]];
        return map;}
    }
    delete map[[row, col]];
    console.log(map);
    return map;
  }
}
