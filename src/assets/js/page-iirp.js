/*
Template Name: IIRP Admin - IIRP Dashboard Template build with Twitter Bootstrap 3.3.7 & Bootstrap 4.0.0-Alpha 6
Version: 1.0.0
Author: Roxy stimpson
Website: http://www.seantheme.com/color-admin-v3.0/admin/angularjs4/

01. Organizaton Admin Page
*/



/* 01. Super Admin Page
------------------------------------------------ */
window.addEventListener('dashboard-organization-admin-ready', function(e) {
    $.getScript('/assets/js/dashboard-organization-admin.min.js').done(function() {
        DashboardOrganizationAdmin.init();
        App.initComponent();
    });
});

/* 01. Tenant Admin Page
------------------------------------------------ */
window.addEventListener('dashboard-tenant-admin-ready', function(e) {
    $.getScript('/assets/js/dashboard-tenant-admin.min.js').done(function() {
        DashboardTenantAdmin.init();
        App.initComponent();
    });
});

/* 01. Dashboard Home Page
------------------------------------------------*/
window.addEventListener('dashboard-ready', function(e){
    $.getScript('/assets/js/dashboard.min.js').done(function(){
        Dashboard.init();
        App.initComponent();
    });
});

// From Sean's template 9/11/2017
/* 26. Table Manage Combine 
------------------------------------------------ */
window.addEventListener('table-manage-combine-ready', function(e) {
    $.getScript('/assets/js/table-manage-combine.demo.min.js').done(function() {
        TableManageCombine.init();
    });
});


