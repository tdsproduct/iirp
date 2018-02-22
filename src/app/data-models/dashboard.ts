/**
 * Created by roxystimpsoniot on 2017-08-30.
 */

export class Dashboard {
    id: '';
    uri: 'dashboard:devices-by-region';
    highcharts: 
    {
        chart:{
            type:'line'
        },
        title:{ text:'IIRP Platform Devices by Region, 2017';}
        subtitle:{text:'Source: adm1n-iirp.iotworldlabs.io/dashboards/devices-by-region'},
        yAxis:
        {
            title:{
                text:"Number of Smart Machines & Devices"
            }
        },
        legend:{
            layout:"vertical",
            align:"right",
            verticalAlign:"middle"
        },
        xAxis:{
            type:"datetime"
        },
        plotOptions:{
            series:
            {
                pointStart:"Date.UTC(2017, 0, 1)",
                pointIntervalUnit:"month"
            }
        },
        series:[{
            type: "line",
            data:[
            {
                name:"India",
                data:[43934,52503,57177,69658,97031,119931,137133,154175,null]
            },
            {
                name:"US",
                data:[24916,25064,40742,55851,66490,80282,98121,100434]
            },
            {
                name:"Japan",
                data:[11744,19722,25005,30771,43185,58377,66147,75387]
            },
            {
                name:"Europe",
                data:[null,null,7988,12169,15112,22452,34400,34227]
            },
            {
                name:"Other",
                data:[12908,5948,8105,11248,8989,11816,18274,18111]
            }]
        }]
        }
};