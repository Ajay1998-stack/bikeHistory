import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { HttpResponse, HttpHeaders, HttpClient } from '@angular/common/http';


export interface UserData {
  id: number;
  regno: number;
  rideCount:number;
  initStation: string;
  finalStation: string;
  initTime: Date;
  finalTime: Date;
  comments:string;
  userName: string;
}


@Component({
  selector: 'app-bike-history',
  templateUrl: './bike-history.component.html',
  styleUrls: ['./bike-history.component.css']
})
export class BikeHistoryComponent implements OnInit {

  bikeHistory =  [];
  bikeHistoryBehaviour: BehaviorSubject<any>
  res: HttpResponse<any>
  dataSource: MatTableDataSource<UserData>;
  private headers = new HttpHeaders().set('Content-type','application/json; charset=utf-8');
  displayedColumns: string[] = [ 'regno', 'rideCount', 'initStation', 'finalStation', 'initTime', 'finalTime', 'comments','userName'];

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(private http:HttpClient) {


    this.bikeHistoryBehaviour = new BehaviorSubject<any> (this.bikeHistory);
     
   }

  ngOnInit() {
    this.fetchData();
    this.bikeHistoryBehaviour.subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
    })
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

 

  fetchData= function(){
    this.http.get("http://localhost:3000/bikehistory").subscribe(
      res=>{
        this.bikeHistoryBehaviour.next(res);
      }
    )
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

   
  }
}

