import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { Container } from "@mui/material";

export default function DateAttendance() {
  return (
    <Container>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid xs={6}>
            <h1>xs=8</h1>
          </Grid>
          <Grid xs={6}>
            <h1>xs=4</h1>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
