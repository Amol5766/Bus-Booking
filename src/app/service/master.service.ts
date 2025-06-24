import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  // ✅ Pointing to your deployed Render backend
  apiURl: string = 'https://bus-booking-bus5.onrender.com/';

  constructor(private http: HttpClient) {}

  // ✅ Get all locations
  getLocations(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURl + 'locations');
  }

  // ✅ Search buses
  serachBus(from: string, to: string, travelDate: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURl}buses?from=${from}&to=${to}`);
  }

  // ✅ Fixed: Use `id` instead of `scheduleId`
  getScehduelById(id: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiURl + 'buses?id=' + id);
  }

  // ✅ Get booked seats using scheduleId
  getBookedSeats(id: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiURl + 'bookings?scheduleId=' + id);
  }

  // ✅ Register user
  onRegisterUser(obj: any): Observable<any> {
    return this.http.post<any>(this.apiURl + 'users', obj);
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURl + 'users');
  }

  // ✅ Post booking
  onBooking(obj: any): Observable<any> {
    return this.http.post<any>(this.apiURl + 'bookings', obj);
  }
}
