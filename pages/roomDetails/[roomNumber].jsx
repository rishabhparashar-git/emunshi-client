import { Button, ButtonGroup } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { transformDate } from "@/helpers/dataTransform";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CallIcon from "@mui/icons-material/Call";
import VerifiedIcon from "@mui/icons-material/Verified";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Image from "next/image";
import defaultProfileImage from "@/public/assets/defaultProfileImage.png";
import GenerateBillModal from "@/component/modal/generateBillModal";
import AddPaymentModal from "@/component/modal/AddPaymentModal";

export default function IndividualRoom() {
  const router = useRouter();
  const { roomNumber } = router.query;
  console.log(roomNumber);
  const [roomDetails, setRoomDetails] = useState({
    _id: "",
    tenantName: "",
    tenantWhatsappNumber: "",
    tenantPhoneNumber: "",
    tenantAadhaarNumber: "",
    adultsCount: "",
    electricityMeterReading: "",
    rent: "",
    balance: "",
    billRate: "",
    arrivalTime: "",
    advance: "",
  });

  useEffect(() => {
    if (!roomDetails._id && roomNumber) {
      // axios
      //   .get(`http://localhost:3043/rooms/getRoom/${roomNumber}`)
      //   .then((res) => res.data)
      //   .then((data) => {
      //     console.log(data);
      //     setRoomDetails(data);
      //   });

      // fetch(`http://localhost:3043/rooms/getRoom/${roomNumber}`)
      fetch(`https://emunshiv1.onrender.com/rooms/getRoom/${roomNumber}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          debugger;
          setRoomDetails(data);
        })
        .catch((err) => {
          console.log(err);
          debugger;
        });
    }
  }, [roomNumber]);

  console.log(roomDetails);

  const [openBillModal, setOpenBillModal] = useState(false);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  return roomDetails ? (
    <div
      style={{
        background: "grey",
        padding: "2rem",
        minHeight: "100vh",
      }}
    >
      <div>
        <div
          style={{
            display: "grid",
            placeItems: "center",
            padding: "1rem",
          }}
        >
          <Image
            src={defaultProfileImage}
            height={300}
            width={300}
            style={{
              borderRadius: "50%",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <p
            style={{
              fontSize: "2.75em",
              textAlign: "center",
            }}
          >
            {roomDetails.tenantName}
          </p>

          <p
            style={{
              textAlign: "center",
              fontSize: "1.25rem",
              marginBottom: "0.35rem",
            }}
          >
            Security ₹{roomDetails.advance} |{" "}
            {transformDate(roomDetails.arrivalTime)}
          </p>

          <p style={{ textAlign: "center", fontSize: "1.5rem" }}>
            Balance : ₹{roomDetails.balance}
          </p>

          {/* <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              margin: "1.2rem",
            }}
          >
            <Button size="large" variant="contained" disableElevation>
              <CallIcon style={{ marginRight: "0.5rem" }} /> Call
            </Button>
            <Button
              size="large"
              variant="contained"
              color="success"
              disableElevation
            >
              <WhatsAppIcon style={{ marginRight: "0.5rem" }} /> WhatsApp
            </Button>
          </div> */}
          <ButtonGroup
            disableElevation
            variant="contained"
            aria-label="Disabled elevation buttons"
            size="large"
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "0.75rem",
              width: "100%",
              marginTop: "1rem",
              marginBottom: "1.2rem",
            }}
          >
            <Button sx={{ width: "100%", fontSize: "1.2rem" }}>
              <CallIcon style={{ marginRight: "0.5rem" }} /> Call
            </Button>
            <Button color="success" sx={{ width: "100%", fontSize: "1.2rem" }}>
              <WhatsAppIcon style={{ marginRight: "0.5rem" }} /> WhatsApp
            </Button>
          </ButtonGroup>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography style={{ fontSize: "1.5rem" }}>
                Tenant Details
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                style={{
                  fontSize: "1.5rem",
                  display: "flex",
                  justifyContent: "space-between",
                  paddingLeft: "1rem",
                  paddingRight: "1rem",
                }}
              >
                <span>Name</span> <span>{roomDetails.tenantName}</span>
              </Typography>
              <Typography
                style={{
                  fontSize: "1.5rem",
                  display: "flex",
                  justifyContent: "space-between",
                  paddingLeft: "1rem",
                  paddingRight: "1rem",
                }}
              >
                <span>Members</span> <span>{roomDetails.adultsCount}</span>
              </Typography>
              <Typography
                style={{
                  fontSize: "1.5rem",
                  display: "flex",
                  justifyContent: "space-between",
                  paddingLeft: "1rem",
                  paddingRight: "1rem",
                }}
              >
                <span>Arrival</span>
                <span>{transformDate(roomDetails.arrivalTime)}</span>
              </Typography>
              <Typography
                style={{
                  fontSize: "1.5rem",
                  display: "flex",
                  justifyContent: "space-between",
                  paddingLeft: "1rem",
                  paddingRight: "1rem",
                }}
              >
                <span>Aadhaar</span>
                <span>{roomDetails.tenantAadhaarNumber}</span>
              </Typography>
              <Typography
                style={{
                  fontSize: "1.5rem",
                  display: "flex",
                  justifyContent: "space-between",
                  paddingLeft: "1rem",
                  paddingRight: "1rem",
                }}
              >
                <span>Phone</span>
                <span>{roomDetails.tenantPhoneNumber}</span>
              </Typography>
              <Typography
                style={{
                  fontSize: "1.5rem",
                  display: "flex",
                  justifyContent: "space-between",
                  paddingLeft: "1rem",
                  paddingRight: "1rem",
                }}
              >
                <span>WhatsApp</span>
                <span>{roomDetails.tenantWhatsappNumber}</span>
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography style={{ fontSize: "1.5rem" }}>
                Room Details
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                style={{
                  fontSize: "1.5rem",
                  display: "flex",
                  justifyContent: "space-between",
                  paddingLeft: "1rem",
                  paddingRight: "1rem",
                }}
              >
                <span>Room no.</span> <span>{roomNumber}</span>
              </Typography>
              <Typography
                style={{
                  fontSize: "1.5rem",
                  display: "flex",
                  justifyContent: "space-between",
                  paddingLeft: "1rem",
                  paddingRight: "1rem",
                }}
              >
                <span>Meter Reading</span>{" "}
                <span>{roomDetails.electricityMeterReading}</span>
              </Typography>
              <Typography
                style={{
                  fontSize: "1.5rem",
                  display: "flex",
                  justifyContent: "space-between",
                  paddingLeft: "1rem",
                  paddingRight: "1rem",
                }}
              >
                <span>Rent</span> <span>₹{roomDetails.rent}/month</span>
              </Typography>
              <Typography
                style={{
                  fontSize: "1.5rem",
                  display: "flex",
                  justifyContent: "space-between",
                  paddingLeft: "1rem",
                  paddingRight: "1rem",
                }}
              >
                <span>Electricity Rate</span>{" "}
                <span>₹{roomDetails.billRate}/unit</span>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>

        <ButtonGroup
          disableElevation
          variant="contained"
          aria-label="Disabled elevation buttons"
          sx={{ width: "100%", marginTop: "1rem" }}
          size="large"
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "0.75rem",
          }}
          color="warning"
        >
          <Button
            onClick={() => setOpenBillModal(true)}
            sx={{ width: "100%", fontSize: "1.2rem" }}
          >
            Bill
          </Button>
          <Button
            onClick={() => setOpenPaymentModal(true)}
            sx={{ width: "100%", fontSize: "1.2rem" }}
          >
            Payment
          </Button>
        </ButtonGroup>
        <GenerateBillModal
          open={openBillModal}
          handleClose={() => setOpenBillModal(false)}
          data={{
            roomNumber: roomDetails.roomNumber,
            _id: roomDetails._id,
            electricityMeterReading: roomDetails.electricityMeterReading,
          }}
        />
        <AddPaymentModal
          open={openPaymentModal}
          handleClose={() => setOpenPaymentModal(false)}
          data={{ roomNumber: roomDetails.roomNumber, _id: roomDetails._id }}
        />
      </div>
      <p style={{ textAlign: "center", fontSize: "1rem", marginTop: "1rem" }}>
        Last update : ₹{transformDate(roomDetails.lastBilledOn)}
      </p>
    </div>
  ) : (
    <h1>No details to Display</h1>
  );
}
