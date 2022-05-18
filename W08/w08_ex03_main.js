var data = [
    {x:0, y:100},
    {x:40, y:5},
    {x:120, y:80},
    {x:150, y:30},
    {x:200, y:50}
];

var width = 256;
var height = 128;

var svg = d3.select('#drawing_region')
    .attr('width', width)
    .attr('height', height);

const area = d3.area()
      .x( d => d.x )
      .y1( d => d.y )
<<<<<<< HEAD
      .y0( 0 );
=======
      .y0( d3.max(self.data, d => d.y )  );
>>>>>>> b47dcfd6e8dfa5d1572f464dc6c28f6b1dc76dfb

svg.append('path')
    .attr('d', area(data))
    .attr('stroke', 'black')
    .attr('fill', 'black');
