import { Add } from "@mui/icons-material";
import { Box, Button, IconButton, Input, Typography } from "@mui/material";

const ClassForm = ({
  className,
  handleAddClass,
  newClassName,
  handleChange,
  handleSubmit,
  isEditing,
}) => {
  return (
    <Box
      border="1px solid black"
      sx={{
        padding: { xs: "10px 20px", md: "20px 40px" },
        borderRadius: "10px",
        height: {  md: "75vh" },
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{ margin: { xs: "5px 0 10px 0", md: "5px 0 20px 0" } }}
      >
        {isEditing ? "Edit The Class:" : "Add New Class:"}
      </Typography>
      {isEditing ? (
        <>
          <Box margin="10px 0">
            <Typography variant="h6">Old Class Name:</Typography>
            <Input
              fullWidth
              type="text"
              value={className}
              disabled
              style={{ marginLeft: "10px" }}
            />
          </Box>
          <Box margin="10px 0">
            <Typography variant="h6">New Class Name:</Typography>
            <Input
              fullWidth
              type="text"
              value={newClassName}
              onChange={handleChange}
              style={{ marginLeft: "10px" }}
            />
          </Box>
          <Box>
            <Button
              sx={{
                backgroundColor: "blue",
                color: "white",
                borderRadius: "10px",
                transition: "background-color 0.3s ease, color 0.3s ease",
                "&:hover": {
                  backgroundColor: "white",
                  color: "blue",
                },
              }}
              onClick={handleSubmit}
            >
              Edit
            </Button>
          </Box>
        </>
      ) : (
        <Box display="flex" margin={"10px 0"}>
          <Input
            fullWidth
            type="text"
            value={className}
            onChange={handleChange}
          />
          <IconButton onClick={handleAddClass}>
            <Add />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default ClassForm;
