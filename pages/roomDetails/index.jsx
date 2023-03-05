import axios from "axios";
import {
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Table,
} from "@mui/material";
import { transformDate } from "@/helpers/dataTransform";

import { useRouter } from "next/router";
import { staticRooms } from "./StaticRooms";

export default function Layout({ rooms }) {
  const router = useRouter();
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow style={{ background: "white" }}>
            <TableCell>Room</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Balance</TableCell>
            <TableCell>Last Updated</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rooms.map((room, index) => {
            return (
              <TableRow
                style={{ background: "white", cursor: "pointer" }}
                onClick={() => router.push(`roomDetails/${room.roomNumber}`)}
                key={index}
              >
                <TableCell>{room.roomNumber}</TableCell>
                <TableCell>{room.tenantName}</TableCell>
                <TableCell>{room.balance}</TableCell>
                <TableCell>{transformDate(room.updatedAt)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export async function getServerSideProps(context) {
  console.log("running");
  let rooms;
  try {
    rooms = await axios
      .get("https://emunshiv1.onrender.com/rooms/getAllRooms")
      .then((res) => res.data)
      .catch((err) => console.log(err));
    // rooms = await fetch("http://localhost:3043/rooms/getAllRooms")
    //   .then((res) =>
    //     res.json();
    //   )
    //   .then((data) =>
    // data;
    //   )
    //   .catch((err) => console.log(err));
  } catch {
    rooms = staticRooms;
  }
  console.log(rooms);

  return { props: { rooms } };
}
