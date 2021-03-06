d3.csv("https://Ryamaguhci.github.io/InfoVis2022/W06/task02.csv")
    .then( data => {
        data.forEach( d => { d.x = +d.x; d.y = +d.y; });
        var config = {
            parent: '#drawing_region',
            width: 512,
            height: 256,
            margin: {top:40, right:20, bottom:40, left:80}
        };

        const scatter_plot = new ScatterPlot( config, data );
        scatter_plot.update();
    })
    .catch( error => {
        console.log( error );
    });

class ScatterPlot {
    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 256,
            margin: config.margin || {top:10, right:10, bottom:10, left:10}
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
            .range( [self.inner_height, 0] );
            

        self.xaxis = d3.axisBottom( self.xscale )
            .ticks(12);

        self.xaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_height})`);

        self.yaxis = d3.axisLeft( self.yscale )
            .ticks(10);

        self.yaxis_group = self.chart.append('g')
            .attr('transform', `translate(" + 0 + "," + (self.inner_height - self.config.margin.top) + ")`);

        self.title = self.chart.append('g')
            .attr('transform', `translate(0,100)`)
        
    }

    update() {
        let self = this;

        const xmin = d3.min( self.data, d => d.x );
        const xmax = d3.max( self.data, d => d.x );
        self.xscale.domain( [0, xmax+1] );

        const ymin = d3.min( self.data, d => d.y );
        const ymax = d3.max( self.data, d => d.y );
        self.yscale.domain( [0, ymax+5] );
 
        self.render();
    }

    render() {
        let self = this;

        self.chart.selectAll("circle")
            .data(self.data)
            .enter()
            .append("circle")
            .attr("cx", d => self.xscale( d.x ) )
            .attr("cy", d => self.yscale( d.y ) )
            .attr("r", d => d.r);
        
        self.xaxis_group
            .call( self.xaxis )
            .append('text')
            .attr("fill", "black")
            .attr("x", (self.inner_width - self.config.margin.left - self.config.margin.right) / 2 + self.config.margin.left)
            .attr("y", 35)
            .attr("text-anchor", "middle")
            .attr("font-size", "10pt")
            .attr("font-weight", "bold")
            .text("month")

        self.yaxis_group
            .call( self.yaxis )
            .append('text')
            .attr("fill", "black")
            .attr("x", -(self.inner_height - self.config.margin.top - self.config.margin.bottom) / 2 - self.config.margin.top)
            .attr("y", -35)
            .attr("transform", "rotate(-90)")
            .attr("text-anchor", "middle")
            .attr("font-size", "10pt")
            .attr("font-weight", "bold")
            .text("mean temperature[degree Celsius]")
        
        self.title
            .append('text')
            .attr("fill", "black")
            .attr("x", (self.inner_width - self.config.margin.left - self.config.margin.right) / 2 + self.config.margin.left)
            .attr("y", -120)
            .attr("text-anchor", "middle")
            .attr("font-size", "10pt")
            .attr("font-weight", "bold")
            .text("monthly mean temperature at Kyoto(2021)")
    }
}
