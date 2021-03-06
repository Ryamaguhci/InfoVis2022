d3.csv("https://Ryamaguhci.github.io/InfoVis2022/W04/task02.csv")
    .then( data => {
        data.forEach( d => { d.x = +d.x; d.y = +d.y; });
        
        var config = {
            parent: '#drawing_region',
            width: 512,
            height: 256,
            margin: {top:40, right:40, bottom:40, left:40}
        };

        const barchart_plot = new BarchartPlot( config, data );
        barchart_plot.update();
    })
    .catch( error => {
        console.log( error );
    });

class BarchartPlot {
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

        // Initialize axis scales
        self.xscale = d3.scaleLinear()
        .domain([0, d3.max(self.data, d => d.population)])
        .range([0, self.config.inner_width]);
            

        
        self.yscale = d3.scaleBand()
              .domain(self.data.map(d => d.label))
              .range([0, self.configinner_height])
              .paddingInner(0.1);

       

            self.xaxis = d3.axisBottom( self.xscale )
            .ticks(5)
            .tickSizeOuter(0);
      
        self.yaxis = d3.axisLeft( self.yscale )
            .tickSizeOuter(0);
      
        self.yaxis_group = self.chart.append('g')
            .attr('transform', `translate(" + 0 + "," + (self.inner_height - self.config.margin.top) + ")`);
    }

    update() {
        let self = this;

        const xmin = d3.min( self.data, d => d.x );
        const xmax = d3.max( self.data, d => d.x );
        //self.xscale.domain( [0, 200] );

        const ymin = d3.min( self.data, d => d.y );
        const ymax = d3.max( self.data, d => d.y );
        //self.yscale.domain( [0, 100] );
 
        self.render();
    }

    render() {
        let self = this;

        self.chart.selectAll("rect")
            .data(self.data)
            .enter()
            .append("rect")
            .attr("x", 0 )
            .attr("y", d => self.yscale( d.prefecture ) )
            .attr("width", d => self.xscale(d.population))
            .attr("height", self.config.yscale.bandwidth())
        
        self.xaxis_group
            .call( self.xaxis );

        self.yaxis_group
            .call( self.yaxis );
    }
}