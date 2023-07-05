import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field'
import {NgxPaginationModule} from 'ngx-pagination'; 



const MaterialComponents = [
  MatButtonModule,
  MatTableModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatSortModule,
  MatFormFieldModule,
  MatInputModule,
  NgxPaginationModule

]

@NgModule({
  exports: [MaterialComponents],
  imports: [
    MaterialComponents

  ]
})
export class MaterialModule { }
