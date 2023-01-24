import { Directive, ElementRef } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Directive({
    selector: '[hideShowTab]',
})
export class HideShowTabDirective {
    routesHide: string[] = ['sign', 'sign-up', 'welcome', 'what-are-you'];

    constructor(private el: ElementRef, private router: Router) {
        this.router.events
            .pipe(filter((event) => event instanceof NavigationStart))
            .subscribe((route) => {
                this.hideShowByRoute(route as NavigationStart);
            });
    }

    extractNameRoute(route: string): string {
        return route.split('/').pop()!.split('?')[0];
    }

    hideShowByRoute(route: NavigationStart) {
        const nameUrl: string = this.extractNameRoute(route.url);
        const isUrlHide: boolean = this.routesHide.includes(nameUrl);
        const display = isUrlHide || route.url === '/' ? 'none' : 'flex';
        this.hideShow(display);
    }

    hideShow(display: 'none' | 'flex'): void {
        this.el.nativeElement.style.display = display;
    }
}
