 export default class Algo {
    static bfsTraverse(n, m, i, j) {
    let map = new Object();
    let level = 0;
    var dics = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
      [-1, -1],
      [1, -1],
      [1, 1],
      [-1, 1],
    ];

    // quuq
    var queue = [];
    queue.push([i, j]);
    // set
    var hash = new Set();
    hash.add("" + [i, j]);

    while (queue.length > 0) {
      level++;
      var times = queue.length;
       for(let k=0;k<times;k++){
        var node = queue.shift();
        var x = node[0];
        var y = node[1];

        map[[x, y]] = level;
        

        for (let i = 0; i < 8; i++) {
          var dic = dics[i];
          var new_x = dic[0] + x;
          var new_y = dic[1] + y;

          if (
            new_x < 0 ||
            new_x >= n ||
            new_y < 0 ||
            new_y >= m ||
            hash.has(''+ [new_x, new_y])
          ) {
            console.log('comtains')
          } else {
            queue.push([new_x, new_y]);
            hash.add("" + [new_x, new_y]);
          }
        }
      }
    }
    return map
  }
}
