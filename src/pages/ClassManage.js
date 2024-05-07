import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Input,
  Typography,
} from "@mui/material";
import {
  Add,
  ArrowBack,
  Close,
  Delete,
  Edit,
  Group,
} from "@mui/icons-material";
import { useState } from "react";
import { nanoid } from "nanoid";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import ClassListItem from "./ClassManage/ClassListItem";
import ClassForm from "./ClassManage/ClassForm";
import { GoBackButton } from "../component/IconButton";

export default function ClassManage() {
  const [addStudentFormOpen, setAddStudentFormOpen] = useState(false);
  const [editStudentFormOpen, setEditStudentFormOpen] = useState(false);
  const [className, setClassName] = useState("");
  const [newClassName, setNewClassName] = useState("");
  const [editingClassId, setEditingClassId] = useState(null);

  const [classList, setClassList] = useState(
    JSON.parse(localStorage.getItem("classList")) || []
  );

  const toggleAddStudentForm = () => {
    setAddStudentFormOpen(!addStudentFormOpen);
    setEditStudentFormOpen(false);
    setClassName("");
  };

  const handleAddClass = () => {
    if (className.trim() !== "") {
      const newClass = { id: nanoid(), name: className };
      setClassList([...classList, newClass]);
      setClassName("");
      // Update localStorage
      localStorage.setItem(
        "classList",
        JSON.stringify([...classList, newClass])
      );
      // setAddStudentFormOpen(false);
      // setEditStudentFormOpen(false);
    }
  };

  const handleEditClass = (id) => {
    // Check if the clicked id is the same as the current editingClassId
    if (id === editingClassId) {
      // If it's the same, close the form
      setEditingClassId(null);
      setAddStudentFormOpen(false);
      setEditStudentFormOpen(false);
      setClassName("");
    } else {
      // If it's different, open the form for the clicked id
      setEditingClassId(id);
      setAddStudentFormOpen(true);
      setEditStudentFormOpen(true);
      const classToEdit = classList.find((classItem) => classItem.id === id);
      setClassName(classToEdit.name);
    }
  };

  const handleEdit = () => {
    if (newClassName.trim() === "") {
      // Show alert if the new class name is empty
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Class name cannot be empty!",
      });
      return; // Exit the function early if the name is empty
    }

    if (newClassName !== className) {
      Swal.fire({
        title: "Confirm Edit",
        text: "Are you sure you want to edit this class?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, edit it!",
      }).then((result) => {
        if (result.isConfirmed) {
          const index = classList.findIndex(
            (classItem) => classItem.id === editingClassId
          );
          if (index !== -1) {
            const updatedClassList = [...classList];
            updatedClassList[index].name = newClassName;
            setClassList(updatedClassList);
            // Update localStorage
            localStorage.setItem("classList", JSON.stringify(updatedClassList));
            // Close the edit form
            setAddStudentFormOpen(false);
            setEditStudentFormOpen(false);
            // Reset the editingClassId
            setEditingClassId(null);
            // Clear the newClassName state
            setNewClassName("");
            Swal.fire("Edited!", "Your class has been edited.", "success");
          }
        }
      });
    } else {
      // Close the edit form if no changes are made
      setAddStudentFormOpen(false);
      setEditStudentFormOpen(false);
      // Reset the editingClassId
      setEditingClassId(null);
      // Clear the newClassName state
      setNewClassName("");
    }
  };

  const handleDeleteClass = (id) => {
    Swal.fire({
      title: "Confirm Deletion",
      text: "Are you sure you want to delete this class?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedClassList = classList.filter(
          (classItem) => classItem.id !== id
        );
        setClassList(updatedClassList);
        // Update localStorage
        localStorage.setItem("classList", JSON.stringify(updatedClassList));
        Swal.fire("Deleted!", "Your class has been deleted.", "success");
      }
    });
  };

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
          <GoBackButton type={"student"}  />
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
          <IconButton
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
          </IconButton>
        </Grid>
      </Grid>
      <Grid container margin={"10px 0"}>
        {addStudentFormOpen || editStudentFormOpen ? (
          <>
            <Grid md={6} xs={12} padding={"10px"}>
              <Box
                border="1px solid black"
                sx={{
                  padding: { xs: "10px 20px", md: "20px 40px" },
                  borderRadius: "10px",
                  overflow: "auto",
                  height: { xs: "35vh", md: "75vh" },
                }}
              >
                <Typography
                  variant="h5"
                  fontWeight={"bold"}
                  sx={{
                    margin: { xs: "5px 0 10px 0", md: "5px 0 20px 0" },
                  }}
                >
                  Class List:
                </Typography>
                {classList.map((classItem) => (
                  <ClassListItem
                    classItem={classItem}
                    handleEditClass={handleEditClass}
                    handleDeleteClass={handleDeleteClass}
                  />
                ))}
              </Box>
            </Grid>
            <Grid md={6} xs={12} padding={"10px"}>
              <ClassForm
                className={className}
                newClassName={newClassName}
                handleChange={(e) => setNewClassName(e.target.value)}
                handleSubmit={handleEdit}
                handleAddClass={handleAddClass}
                isEditing={editStudentFormOpen && addStudentFormOpen}
              />
            </Grid>
          </>
        ) : (
          <Grid xs={12}>
            <Box
              height={"75vh"}
              border="1px solid black"
              sx={{
                padding: { xs: "10px 20px", md: "20px 100px" },
                borderRadius: "10px",
                overflow: "auto",
              }}
            >
              <Typography
                variant="h5"
                fontWeight={"bold"}
                sx={{
                  margin: { xs: "5px 0 10px 0", md: "5px 0 20px 0" },
                }}
              >
                Class List:
              </Typography>
              {classList.map((classItem) => (
                <ClassListItem
                  classItem={classItem}
                  handleEditClass={handleEditClass}
                  handleDeleteClass={handleDeleteClass}
                />
              ))}
            </Box>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
