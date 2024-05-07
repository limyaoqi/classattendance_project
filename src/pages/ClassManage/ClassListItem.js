import { Box, IconButton, Typography } from "@mui/material";
import { Edit, Delete, Group } from "@mui/icons-material";
import { Link } from "react-router-dom";

const ClassListItem = ({ classItem, handleEditClass, handleDeleteClass }) => {
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        textAlign="center"
        padding="0 10px"
      >
        <Typography variant="h6" key={classItem.id} margin="10px 0">
          {classItem.name}
        </Typography>
        <Box>
          <IconButton
            component={Link}
            to={`/classmanage/${classItem.id}`}
            sx={{
              "&:hover": {
                color: "blue",
              },
            }}
          >
            <Group />
          </IconButton>
          <IconButton
            onClick={() => handleEditClass(classItem.id)}
            sx={{
              "&:hover": {
                color: "blue",
              },
            }}
          >
            <Edit />
          </IconButton>
          <IconButton
            onClick={() => handleDeleteClass(classItem.id)}
            sx={{
              "&:hover": {
                color: "red",
              },
            }}
          >
            <Delete />
          </IconButton>
        </Box>
      </Box>
      <hr />
    </>
  );
};

export default ClassListItem;
