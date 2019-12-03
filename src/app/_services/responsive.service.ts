import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {

  isXSmall: boolean;
  isSmall: boolean;
  isMedium: boolean;
  isLarge: boolean;

  constructor( private bo: BreakpointObserver ) { 

    const xSmallObserver = this.bo.observe(Breakpoints.XSmall);
    const smallObserver = this.bo.observe(Breakpoints.Small);
    const mediumObserver = this.bo.observe(Breakpoints.Medium);
    const largeObserver = this.bo.observe(Breakpoints.Large);

    xSmallObserver.subscribe(result => this.isXSmall = result.matches);
    smallObserver.subscribe(result => this.isSmall = result.matches);
    mediumObserver.subscribe(result => this.isMedium = result.matches);
    largeObserver.subscribe(result => this.isLarge = result.matches);

  }
}
