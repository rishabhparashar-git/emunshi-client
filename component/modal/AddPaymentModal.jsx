import {
  TextField,
  Modal,
  Box,
  Typography,
  Button,
  ButtonGroup,
} from "@mui/material";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import cashImage from "@/public/assets/cashImage.jpg";
import Loader from "../common/Loader";

export default function AddPaymentModal({ open, handleClose, data }) {
  const [loading, setLoading] = useState(false);
  const [amountPaid, setAmountPaid] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    axios
      .patch(
        `https://emunshiv1.onrender.com/rooms/addPayment/${data.roomNumber}`,
        {
          ...data,
          amountPaid,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90vw",
    bgcolor: "background.paper",
    borderRadius: "24px",
    boxShadow: 24,
    p: 4,
  };
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <>{loading && <Loader />}</>
          <Typography
            sx={{
              color: "black",
              margin: "0.5rem",
              fontWeight: "bolder",
              textAlign: "center",
              fontSize: "1.3rem",
            }}
          >
            Enter Received Amount
          </Typography>
          <div
            style={{
              display: "grid",
              placeItems: "center",
              margin: "0.5rem",
            }}
          >
            <Image src={cashImage} alt="Cash" height={320} width={320} />
          </div>

          <TextField
            id="outlined-basic"
            label="Amount Received"
            variant="outlined"
            fullWidth
            type="number"
            onChange={(e) => setAmountPaid(e.target.value)}
          />
          <Button
            sx={{ margin: "10px", float: "right" }}
            disabled={!amountPaid}
            variant="contained"
            size="large"
            onClick={handleSubmit}
          >
            Add Payment
          </Button>
        </Box>
      </Modal>
    </>
  );
}
