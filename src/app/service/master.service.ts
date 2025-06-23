import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  apiURl: string = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  // ✅ Get all available locations
  getLocations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURl}locations`);
  }

  // ✅ Search buses by from, to (travelDate optional for now)
  serachBus(from: string, to: string, travelDate: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURl}buses?from=${from}&to=${to}`);
  }

  // ✅ Get schedule (bus) details by id (you use scheduleId as bus id)
  getScehduelById(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURl}buses?id=${id}`);
  }

  // ✅ Extract booked seats for a given schedule (based on all bookings)
  getBookedSeats(scheduleId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiURl}bookings?scheduleId=${scheduleId}`
    );
  }

  // ✅ Register a new user
  onRegisterUser(obj: any): Observable<any> {
    return this.http.post<any>(`${this.apiURl}users`, obj);
  }

  // ✅ Post new booking (along with passengers and seatNos)
  onBooking(obj: any): Observable<any> {
    return this.http.post<any>(`${this.apiURl}bookings`, obj);
  }
}
