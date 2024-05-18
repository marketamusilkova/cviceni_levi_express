import { Seat } from "../Seat"


export const SeatRow = ( {row, rowSelectedSeat} ) => {
console.log(row)
 return ( <div className="seat-row"> {row.map((r) => (<Seat key={r.number} number={r.number} isOccupied={r.isOccupied} isSelected={rowSelectedSeat === r.number}/>))}  </div>)
}

