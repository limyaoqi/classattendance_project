import { Button, Container, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <Container>
      <Grid container spacing={2} justifyContent="center" alignItems="center" height="100%">
        <Grid item md={6} xs={12} style={{ textAlign: "center" }}>
          <Button variant="contained" onClick={() => navigate("/calendar")}>
            Calendar
          </Button>
        </Grid>
        <Grid item md={6} xs={12} style={{ textAlign: "center" }}>
          <Button variant="contained" onClick={() => navigate("/classmanage")}>
            Class Manage
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
