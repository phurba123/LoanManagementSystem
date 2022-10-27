import { Component, OnDestroy, ViewChild, AfterViewInit, SimpleChanges } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Subscription } from 'rxjs'
import { MatSidenav } from '@angular/material/sidenav';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
	title = 'LoanManagementSystem';
	subscription!: Subscription;

	@ViewChild(MatSidenav)
	sidenav!: MatSidenav;

	constructor(private _breakObserver: BreakpointObserver) {}

	// accessing view child after view is initialized
	ngAfterViewInit(): void {
		this.subscription = this._breakObserver.observe(['(max-width: 600px)']).subscribe((res: BreakpointState) => {
			console.log('observer res : ', res)
			if (res.matches) {
				this.sidenav.mode = 'over';
				this.sidenav.close();
			} else {
				this.sidenav.mode = 'side';
				this.sidenav.open();
			}
		});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}

