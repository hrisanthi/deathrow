$(function () {
    var chart,
        colors = Highcharts.getOptions().colors;

    function setChart(name, categories, data, color) {
        chart.xAxis[0].setCategories(categories);
        chart.series[0].remove();
        chart.addSeries({
            name: name,
            data: data,
            color: color || 'white'
        });
    }

    $(document).ready(function() {

        var categories = ['States with death penalty', 'States without death penalty'],
            name = 'States',
            data = [{
                    y: 36,
                    color: colors[0],
                    drilldown: {
                        name: 'States with death penalty',
                        categories: ['Alabama', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Idaho', 'Indiana', 'Kansas', 'Kentucky', 'Louisiana', 'Mississippi', 'Missouri', 'Montana', 'Nebraska','Nevada', 'New Hampshire', 'New Mexico', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon','Pennsylvania', 'South Carolina','South Dakota', 'Tennessee','Texas', 'Utah', 'Virginia', 'Washington','Wyoming', 'US Government', 'US Military'],
                        data: [201, 124, 35, 746, 3, 12, 17, 401, 85, 11, 14, 9, 34, 85, 48, 33, 2, 11, 78, 1, 2, 157, 145, 48, 36, 184, 44, 3, 73, 271, 9, 8, 9, 1, 61, 6],
                        color: colors[0]
                    }
                }, {
                    y: 14,
                    color: colors[1],
                    states: {
                        name: 'States without death penalty',
                        categories: ['Alaska (1957)', 'Connecticut(2012)', 'Hawaii(1957)', 'Illinios(2011)', 'Iowa(1965)', 'Main(1887)', 'Maryland(2013)','Massachusetts(1984)', 'Michigan(1846)', 'Minnesota(1911)', 'Nebraska(2015)', 'New Jersey(2007)', 'New Mexico(2009)', 'New York(2007)', 'North Dakota(1973)', 'Rhode Island(1984)', 'Vermont(1964)', 'West Virginia(1965)', 'Wisconsin(1853)'],
                        data: [],
                        color: colors[1]
                    }
                }];

        chart = new Highcharts.Chart({
            chart: {
                renderTo: 'container',
                type: 'column'
            },
            title: {
                text: 'Breakdown of the death penelty by state'
            },
            subtitle: {
                text: 'Click the columns to see the breakdown. Click again to go back.'
            },
            xAxis: {
                categories: categories
            },
            yAxis: {
                title: {
                    text: 'Number of states'
                }
            },
            plotOptions: {
                column: {
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: function() {
                                var drilldown = this.drilldown;
                                if (drilldown) { // drill down
                                    setChart(drilldown.name, drilldown.categories, drilldown.data, drilldown.color);
                                } else { // restore
                                    setChart(name, categories, data);
                                }
                            }
                        }
                    },
                    dataLabels: {
                        enabled: true,
                        color: colors[0],
                        style: {
                            fontWeight: 'bold'
                        },
                        formatter: function() {
                            return this.y;
                        }
                    }
                }
            },
            tooltip: {
                formatter: function() {
                    var point = this.point,
                        s = this.x +':<b>'+ this.y +' inmates</b><br/>';
                    if (point.drilldown) {
                        s += 'Click to view '+ point.category +' breakdown';
                    }
                    return s;
                }
            },
            series: [{
                name: name,
                data: data,
                color: 'white'
            }],
            exporting: {
                enabled: false
            }
        });
    });


});
