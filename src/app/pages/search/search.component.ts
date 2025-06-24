import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { Observable } from 'rxjs';
import { AsyncPipe, DatePipe, NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [AsyncPipe, FormsModule, DatePipe, RouterLink, NgIf, NgFor],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  locations$: Observable<any[]> = new Observable<any[]>();
  busList: any[] = [];
  masterSrv = inject(MasterService);

  serachObj: any = {
    fromLocation: '',
    toLocation: '',
    travelDate: '',
  };

  ngOnInit(): void {
    this.getAllLocations();
  }

  getAllLocations() {
    this.locations$ = this.masterSrv.getLocations();
  }

  onSearch() {
    const { fromLocation, toLocation, travelDate } = this.serachObj;

    if (!fromLocation || !toLocation || !travelDate) {
      alert('Please fill in all fields');
      return;
    }

    this.masterSrv
      .serachBus(fromLocation, toLocation, travelDate)
      .subscribe((res: any) => {
        this.busList = res;
        if (this.busList.length === 0) {
          alert(
            'No buses found for this route and date.\nMake sure data exists in db.json.'
          );
        }
      });
  }
}
