import CircularProgress from "@mui/material/CircularProgress";

export default function Loader() {
  const style = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    zIndex: 999,
    backgroundColor: "rgba(0,0,0,0.3)",
    display: "grid",
    placeItems: "center",
  };
  return (
    <div style={style}>
      <CircularProgress />
    </div>
  );
}
