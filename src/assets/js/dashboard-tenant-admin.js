/*
Template Name: Color Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 3.3.7 & Bootstrap 4.0.0-Alpha 6
Version: 3.0.0
Author: Sean Ngu
Website: http://www.seantheme.com/color-admin-v3.0/admin/angularjs4/

Copy from dashboard.js from the template above 9/5/2017
*/

var blue	= '#348fe2',
blueLight	= '#5da5e8',
blueDark	= '#1993E4',
aqua		= '#49b6d6',
aquaLight	= '#6dc5de',
aquaDark	= '#3a92ab',
green		= '#00acac',
greenLight	= '#33bdbd',
greenDark	= '#008a8a',
orange		= '#f59c1a',
orangeLight	= '#f7b048',
orangeDark	= '#c47d15',
dark		= '#2d353c',
grey		= '#b6c2c9',
purple		= '#727cb6',
purpleLight	= '#8e96c5',
purpleDark	= '#5b6392',
red         = '#ff5b57';

var handleDashboardTenantAdminSparkline = function() {
	"use strict";
    var options = {
        height: '50px',
        width: '100%',
        fillColor: 'transparent',
        lineWidth: 2,
        spotRadius: '4',
        highlightLineColor: blue,
        highlightSpotColor: blue,
        spotColor: false,
        minSpotColor: false,
        maxSpotColor: false
    };
    function renderDashboardTenantAdminSparkline() {
        var value = [50,30,45,40,50,20,35,40,50,70,90,40];
        options.type = 'line';
        options.height = '23px';
        options.lineColor = red;
        options.highlightLineColor = red;
        options.highlightSpotColor = red;
        
        var countWidth = $('#sparkline-number-of-tenants').width();
        if (countWidth >= 200) {
            options.width = '200px';
        } else {
            options.width = '100%';
        }
        
        $('#sparkline-number-of-tenants').sparkline(value, options);
        options.lineColor = blue;
        options.highlightLineColor = blue;
        options.highlightSpotColor = blue;
        $('#sparkline-number-of-device-types').sparkline(value, options);
        options.lineColor = blue;
        options.highlightLineColor = blue;
        options.highlightSpotColor = blue;
        $('#sparkline-number-of-usecases').sparkline(value, options);
        options.lineColor = green;
        options.highlightLineColor = green;
        options.highlightSpotColor = green;
        $('#sparkline-number-of-device-models').sparkline(value, options);
        options.lineColor = orange;
        options.highlightLineColor = orange;
        options.highlightSpotColor = orange;
        $('#sparkline-total-daily-active-devices').sparkline(value, options);
        options.lineColor = red;
        options.highlightLineColor = red;
        options.highlightSpotColor = red;
    }
    
    renderDashboardTenantAdminSparkline();
    
    $(window).on('resize', function() {
        $('#sparkline-number-of-tenants').empty();
        $('#sparkline-number-of-usecases').empty();
        $('#sparkline-number-of-device-types').empty();
        $('#sparkline-total-daily-active-devices').empty();
        $('#sparkline-number-of-device-models').empty();
        renderDashboardTenantAdminSparkline();
    });
};
var handleDashboardGritterNotification = function() {
    setTimeout(function() {
        $.gritter.add({
            title: 'Welcome back, Admin!',
            text: '',
            image: '',
            sticky: true,
            time: '',
            class_name: 'my-sticky-class'
        });
    }, 1000);
};

var DashboardTenantAdmin = function () {
	"use strict";
    return {
        //main function
        init: function () {
            
            
            $.getScript('assets/plugins/sparkline/jquery.sparkline.js').done(function() {
                handleDashboardTenantAdminSparkline();
            });
        
            
           
        }
    };
}();