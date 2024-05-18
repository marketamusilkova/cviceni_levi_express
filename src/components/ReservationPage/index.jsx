import { useParams } from 'react-router-dom';
import './style.css';
import { useEffect, useState } from 'react';

export const ReservationPage = () => {
  const { reservationId } = useParams();
  const [reservation, setReservation] = useState(null);

  useEffect(() => {
    const fetchURL = async () => {
      const response = await fetch(
        `https://apps.kodim.cz/daweb/leviexpress/api/reservation?id=${reservationId}`,
      );
      const data = await response.json();
      const oJizdence = data.results;
      setReservation(oJizdence);
    };
    fetchURL();
  }, []);

  if (reservation === null) {
    return null;
  }

  return (
    <div className="reservation container">
      <h2>Vaše e-jízdenka č. {reservation.reservationId}</h2>
      <div className="reservation__body">
        <div className="reservation__headings">
          <p>Datum cesty:</p>
          <p>Odjezd:</p>
          <p>Příjezd:</p>
          <p>Sedadlo:</p>
        </div>
        <div className="reservation__info">
          <p>{reservation.date}</p>
          <p>
            {reservation.fromCity.name}, {reservation.fromCity.time}
          </p>
          <p>
            {reservation.toCity.name}, {reservation.toCity.time}
          </p>
          <p>{reservation.seatNumber}</p>
        </div>
      </div>
    </div>
  );
};
