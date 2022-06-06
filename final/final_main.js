let input_data;
let scatter_plot;
let bar_chart;
let filter = [];

d3.csv("https://ryamaguhci.github.io/InfoVis2022/final/hotel.csv")
    .then( data => {
        input_data = data;
        input_data.forEach( d => {
            d.hotelMinCharge = +d.hotelMinCharge;
            d.reviewAverage = +d.reviewAverage;
        });

        const color_scale = d3.scaleOrdinal( d3.schemeCategory10 );
        color_scale.domain(['kyoto','gojo','shijo']);

        scatter_plot = new ScatterPlot( {
            parent: '#drawing_region_scatterplot',
            width: 256,
            height: 256,
            margin: {top:10, right:10, bottom:50, left:50},
            xlabel: 'reviewAverage',
            ylabel: 'charge [yen]',
            cscale: color_scale
        }, input_data );
        scatter_plot.update();

        bar_chart = new BarChart( {
            parent: '#drawing_region_barchart',
            width: 256,
            height: 256,
            margin: {top:10, right:10, bottom:50, left:50},
            xlabel: 'area',
            cscale: color_scale
        }, input_data );
        bar_chart.update();
    })
    .catch( error => {
        console.log( error );
    });

function Filter() {
    if ( filter.length == 0 ) {
        scatter_plot.data = input_data;
    }
    else {
        scatter_plot.data = input_data.filter( d => filter.includes( d.station ) );
    }
    scatter_plot.update();
}
