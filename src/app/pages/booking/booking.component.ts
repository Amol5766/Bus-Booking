import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MasterService } from '../../service/master.service';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor, NgClass } from '@angular/common';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, NgClass],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css',
})
export class BookingComponent {
  scheduleId: number = 0;
  scehduielData: any = {};
  seatArray: number[] = [];
  bookedSeatsArray: number[] = [];
  userSelectedSeatArray: any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private masterSrv: MasterService
  ) {
    this.activatedRoute.params.subscribe((res: any) => {
      this.scheduleId = +res.id;
      this.getScehduleDetaislById();
      this.getBookedSeats();
    });
  }

  getScehduleDetaislById() {
    this.masterSrv.getScehduelById(this.scheduleId).subscribe((res: any) => {
      if (res && res.length > 0) {
        this.scehduielData = res[0];
        this.seatArray = Array.from(
          { length: this.scehduielData.totalSeats },
          (_, i) => i + 1
        );
      }
    });
  }

  getBookedSeats() {
    this.masterSrv.getBookedSeats(this.scheduleId).subscribe((res: any[]) => {
      const allSeats: number[] = [];
      for (const booking of res) {
        if (Array.isArray(booking.BusBookingPassengers)) {
          const seats = booking.BusBookingPassengers.map((p: any) => p.seatNo);
          allSeats.push(...seats);
        } else if (booking.seat) {
          allSeats.push(booking.seat); // fallback for earlier single seat structure
        }
      }
      this.bookedSeatsArray = allSeats;
    });
  }

  checkIfSeatBooked(seatNo: number): boolean {
    return this.bookedSeatsArray.includes(seatNo);
  }

  checkIsSeatSelected(seatNo: number): number {
    return this.userSelectedSeatArray.findIndex((m) => m.seatNo === seatNo);
  }

  selectSeat(seatNo: number) {
    if (this.checkIfSeatBooked(seatNo)) {
      alert('Seat already booked');
      return;
    }

    const index = this.checkIsSeatSelected(seatNo);
    if (index !== -1) {
      this.userSelectedSeatArray.splice(index, 1);
    } else {
      const obj = {
        passengerId: 0,
        bookingId: 0,
        passengerName: '',
        age: 0,
        gender: '',
        seatNo: seatNo,
      };
      this.userSelectedSeatArray.push(obj);
    }
  }

  bookNow() {
    if (this.userSelectedSeatArray.length === 0) {
      alert('Please select seats and enter passenger details');
      return;
    }

    const loggedUserData = localStorage.getItem('redBusUser');
    if (!loggedUserData) {
      alert('Please login first');
      return;
    }

    const user = JSON.parse(loggedUserData);
    const booking = {
      bookingId: 0,
      custId: user.userId,
      bookingDate: new Date(),
      scheduleId: this.scheduleId,
      BusBookingPassengers: this.userSelectedSeatArray,
    };

    this.masterSrv.onBooking(booking).subscribe(
      () => {
        alert('Booking successful!');
        this.userSelectedSeatArray = [];
        this.getBookedSeats(); // 🧊 Freeze booked seats after update
      },
      () => {
        alert('Booking failed');
      }
    );
  }
}
