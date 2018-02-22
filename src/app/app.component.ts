import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './core/auth.service';
import { Observable } from 'rxjs/Observable';
import { User } from './data-models/user';
@Component({
    selector: 'app',
    templateUrl: './app.html'
})

export class AppComponent implements OnInit {

    page_sidebar_minified     = false;
    page_with_footer          = false;
    page_content_full_height  = false;
    page_content_full_width   = false;
    page_sidebar_transparent  = false;
    page_with_wide_sidebar    = false;
    page_with_light_sidebar   = false;
    page_with_right_sidebar   = false;
    page_without_sidebar      = false;
    page_with_two_sidebar     = false;
    page_with_top_menu        = false;
    page_with_mega_menu       = false;
    page_boxed_layout         = false;
    page_content_inverse_mode = false;
    
    page_bg_white             = false;
    page_without_header       = false;
    page_pace_top             = false;

    page_iirp_admin           = false;
    page_tenant_admin         = false;
    page_dashboard            = false;
    
    setPageIIRPAdmin(setting:boolean) {
        this.page_iirp_admin = setting;
    }

    setPageTenantAdminSidebar(setting:boolean){
        this.page_tenant_admin = setting;
    }

    setPageDashboard(setting:boolean){
        this.page_dashboard = setting;
    }

    

    setPageSidebarMinified(setting: boolean) {
        this.page_sidebar_minified = setting;
    }
    setPageFooter(setting: boolean) {
        this.page_with_footer = setting;
    }
    setPageWideSidebar(setting: boolean) {
        this.page_with_wide_sidebar = setting;
    }
    setPageContentFullHeight(setting: boolean) {
        this.page_content_full_height = setting;
    }
    setPageContentFullWidth(setting: boolean) {
        this.page_content_full_width = setting;
    }
    setPageSidebarTransparent(setting: boolean) {
        this.page_sidebar_transparent = setting;
    }
    setPageLightSidebar(setting: boolean) {
        this.page_with_light_sidebar = setting;
    }
    setPageRightSidebar(setting: boolean) {
        this.page_with_right_sidebar = setting;
    }
    setPageWithoutSidebar(setting: boolean) {
        this.page_without_sidebar = setting;
    }
    setPageTwoSidebar(setting: boolean) {
        this.page_with_two_sidebar = setting;
    }
    setPageTopMenu(setting: boolean) {
        this.page_with_top_menu = setting;
    }
    setPageTransparentSidebar(setting: boolean) {
        this.page_sidebar_transparent = setting;
    }
    setPageMegaMenu(setting: boolean) {
        this.page_with_mega_menu = setting;
    }
    setPageContentInverseMode(setting: boolean) {
        this.page_content_inverse_mode = setting;
    }
    setPageBoxedLayout(setting: boolean) {
        this.page_boxed_layout = setting;
        
        if (this.page_boxed_layout) {
            window.dispatchEvent(new CustomEvent('page-boxed-layout'));
        } else {
            window.dispatchEvent(new CustomEvent('clear-boxed-layout'));
        }
    }
    setPageBgWhite(setting: boolean) {
        this.page_bg_white = setting;
        
        if (this.page_bg_white) {
            window.dispatchEvent(new CustomEvent('page-bg-white'));
        } else {
            window.dispatchEvent(new CustomEvent('clear-bg-white'));
        }
    }
    setPageWithoutHeader(setting: boolean) {
        this.page_without_header = setting;
        
        if (this.page_without_header) {
            window.dispatchEvent(new CustomEvent('page-without-header'));
        } else {
            window.dispatchEvent(new CustomEvent('clear-without-header'));
        }
    }
    setPagePaceTop(setting: boolean) {
        this.page_pace_top = setting;
        
        if (this.page_without_header) {
            window.dispatchEvent(new CustomEvent('page-pace-top'));
        } else {
            window.dispatchEvent(new CustomEvent('clear-pace-top'));
        }
    }
    clearSettings() {
        this.page_sidebar_minified     = false;
        this.page_with_footer          = false;
        this.page_content_full_height  = false;
        this.page_content_full_width   = false;
        this.page_with_wide_sidebar    = false;
        this.page_with_right_sidebar   = false;
        this.page_with_light_sidebar   = false;
        this.page_sidebar_transparent  = false;
        this.page_without_sidebar      = false;
        this.page_with_two_sidebar     = false;
        this.page_with_top_menu        = false;
        this.page_sidebar_transparent  = false;
        this.page_with_mega_menu       = false;
        this.page_boxed_layout         = false;
        this.page_content_inverse_mode = false;
        this.page_bg_white             = false;
        this.page_without_header       = false;
        this.page_pace_top             = false;
        
        this.page_iirp_admin            = false;
        this.page_tenant_admin          = false;
        this.page_dashboard             = false;
        
        if (this.page_bg_white) {
            window.dispatchEvent(new CustomEvent('page-bg-white'));
        } else {
            window.dispatchEvent(new CustomEvent('clear-bg-white'));
        }
        if (this.page_boxed_layout) {
            window.dispatchEvent(new CustomEvent('page-boxed-layout'));
        } else {
            window.dispatchEvent(new CustomEvent('clear-boxed-layout'));
        }
        if (this.page_without_header) {
            window.dispatchEvent(new CustomEvent('page-without-header'));
        } else {
            window.dispatchEvent(new CustomEvent('clear-without-header'));
        }
        if (this.page_pace_top) {
            window.dispatchEvent(new CustomEvent('page-pace-top'));
        } else {
            window.dispatchEvent(new CustomEvent('clear-pace-top'));
        }

        if (this.page_iirp_admin){
            window.dispatchEvent(new CustomEvent('page-iirp-admin'));
        } else if (this.page_tenant_admin){
            window.dispatchEvent(new CustomEvent('page-tenant-admin'));
        } else {
            window.dispatchEvent (new CustomEvent('page-dashboard'));
        }
    }

    constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) {
        authService.handleAuthentication();
    }   

    ngOnInit() {
        this.router.events.subscribe((e) => {
            if (e instanceof NavigationStart) {
                this.clearSettings();
            }
        });
    }

}