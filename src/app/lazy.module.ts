import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyParentComponent } from './lazy-parent/lazy-parent.component';
import { LazyChildComponent } from './lazy-child/lazy-child.component';

import { Routes, RouterModule } from '@angular/router';

export const ROUTES: Routes = [
  { path: '', component: LazyParentComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [LazyParentComponent, LazyChildComponent]
})
export class LazyModule { }
