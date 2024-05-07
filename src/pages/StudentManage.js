import { ArrowBack } from "@mui/icons-material";
import { Container, Grid, IconButton, Typography } from "@mui/material";
import { GoBackButton } from "../component/IconButton";

export default function StudentManage() {
  return (
    <Container style={{ height: "100vh" }}>
      <Grid
        container
        margin={"10px 0"}
        justifyContent="space-between"
        sx={{
          margin: { xs: "10px 0", md: "20px 0" },
        }}
      >
        <Grid md={4} xs={12}>
         <GoBackButton type={"student"} />
        </Grid>
        <Grid md={4} xs={12}>
          <Typography
            variant="h4"
            fontWeight={"bolder"}
            paddingLeft={"10px"}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            Class Manage
          </Typography>
        </Grid>
        <Grid
          md={4}
          xs={12}
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          {/* <IconButton
            onClick={toggleAddStudentForm}
            sx={{
              backgroundColor: "blue",
              color: "white",
              borderRadius: "10px",
              transition: "background-color 0.3s ease, color 0.3s ease",
              "&:hover": {
                backgroundColor: "white",
                color: "blue",
              },
              margin: { xs: "10px 0 10px 10px", md: "0" },
            }}
          >
            {addStudentFormOpen ? (
              <Close />
            ) : (
              <>
                Add Class <Add />
              </>
            )}
          </IconButton> */}
        </Grid>
      </Grid>
    </Container>
  );
}
