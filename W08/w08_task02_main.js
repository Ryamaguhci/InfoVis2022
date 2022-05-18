d3.csv("https://Ryamaguhci.github.io/InfoVis2022/W08/w08_task02.csv")
.then( data => {
    data.forEach( d => { d.x = +d.x; d.y = +d.y; });

    var config = {
        parent: '#drawing_region',
        width: 350,
        height: 256,
        margin: {top:10, right:10, bottom:10, left:20},
    };

    const area_chart = new AreaChart( config, data );
    area_chart.update();
})
.catch( error => {
    console.log( error );
});

class AreaChart {
constructor( config, data ) {
    this.config = {
        parent: config.parent,
        width: config.width || 350,
        height: config.height || 256,
        margin: config.margin || {top:10, right:10, bottom:10, left:20},
    }
    this.data = data;
    this.init();
}

init() {
    let self = this;

    self.svg = d3.select( self.config.parent )
        .attr('width', self.config.width)
        .attr('height', self.config.height);

    self.chart = self.svg.append('g')
        .attr('transform', `translate(${self.config.margin.left}, ${self.config.margin.top})`);

    self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
    self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;

    self.xscale = d3.scaleLinear()
        .range( [0, self.inner_width] );

    self.yscale = d3.scaleLinear()
        .range( [0, self.inner_height] );

    self.xaxis = d3.axisBottom( self.xscale )
        .ticks(0)
        .tickSizeOuter(0);

    self.yaxis = d3.axisLeft( self.yscale )
        .ticks(0)
        .tickSizeOuter(0);

    self.xaxis_group = self.chart.append('g')
        .attr('transform', `translate(0, ${self.inner_height})`);

    self.yaxis_group = self.chart.append('g');

    self.area = d3.area()
        .x(d => self.xscale(d.x))
        .y1(d => self.yscale(d.y))
        .y0( d3.max(self.data, d => d.y ) + self.inner_height - 100);

}

update() {
    let self = this;

    const space = 10;
    const xmin = d3.min( self.data, d => d.x ) - space;
    const xmax = d3.max( self.data, d => d.x ) + space;
    self.xscale.domain([xmin, xmax]);


    const ymin = d3.min( self.data, d => d.y ) - space;
    const ymax = d3.max( self.data, d => d.y ) + space;
    self.yscale.domain([ymin, ymax]);

    self.render();
}

render() {
    let self = this;

    self.chart.append('path')
        .attr('d', self.area(self.data))
        .attr('stroke', 'red')
        .attr('fill', 'red');

    self.xaxis_group
        .call( self.xaxis );

    self.yaxis_group
        .call( self.yaxis );
    
}
}