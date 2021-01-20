export class Flight {
    constructor(
        public id: number,
        public airlineId: number,
        public departureAirportId: number,
        public arrivalAirportId: number,
        public price: number
    ) {}
}
