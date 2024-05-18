import { Seat } from "../Seat"


export const SeatRow = ( {row} ) => {
console.log(row)
 return ( <div className="seat-row"> {row.map((r) => (<Seat key={r.number} number={r.number} isOccupied={r.isOccupied}/>))}  </div>)
}

