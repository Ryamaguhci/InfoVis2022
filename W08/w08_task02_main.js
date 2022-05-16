d3.csv("https://Ryamaguhci.github.io/InfoVis2022/W08/w08_task02.csv")
    .then( data => {
        data.forEach( d => { d.value = +d.value; d.label = d.label; });
        var config = {
            parent: '#drawing_region',
            width: 256,
            height: 128,
            margin: {top:20, right:10, bottom:20, left:100},
            title: 'task02',
        };
        const area_chart = new AreaChart( config, data );
        bar_chart.update();
    })
    .catch( error => {
        console.log( error );
    });
class AreaChart {
    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 128,
            margin: config.margin || {top:20, right:10, bottom:20, left:100},
            title: config.title || '',
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
       
        
        const title_space = 20;
        self.svg.append('text')
            .style('font-size', '20px')
            .style('font-weight', 'bold')
            .attr('text-anchor', 'middle')
            .attr('x', self.config.width / 2)
            .attr('y', self.config.margin.top - title_space)
            .text( self.config.title );
    }
    update() {
        self.render();
    }
    render() {
        let self = this;
        self.chart.selectAll("path")
            .data(self.data)
            .enter()
            .append("path")
            .attr('stroke', 'black')
            .attr('fill', 'black');
        
    }
}