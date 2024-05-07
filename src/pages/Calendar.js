import React, { useState } from "react";
import {
  Typography,

  Button,
  Grid,
  Container,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";


export default function Calendar() {
    const navigate = useNavigate()
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const maxYear = currentYear + 1;
  const minYear = currentYear - 6;

  const [currentMonthIndex, setCurrentMonthIndex] = useState(currentMonth);
  const [currentYearState, setCurrentYearState] = useState(currentYear);

  const incrementMonth = () => {
    let nextMonthIndex = currentMonthIndex + 1;
    let nextYear = currentYearState;

    if (nextMonthIndex === 12) {
      nextMonthIndex = 0;
      nextYear++;
    }

    if (nextYear <= maxYear) {
      setCurrentMonthIndex(nextMonthIndex);
      setCurrentYearState(nextYear);
    }
  };

  const decrementMonth = () => {
    let prevMonthIndex = currentMonthIndex - 1;
    let prevYear = currentYearState;

    if (prevMonthIndex === -1) {
      prevMonthIndex = 11;
      prevYear--;
    }

    if (prevYear >= minYear) {
      setCurrentMonthIndex(prevMonthIndex);
      setCurrentYearState(prevYear);
    }
  };

  const daysInMonth = (month, year) => {
    if (month === 1) {
      return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0) ? 29 : 28;
    } else {
      return new Date(year, month + 1, 0).getDate();
    }
  };

  const currentMonthName = new Date(
    currentYearState,
    currentMonthIndex
  ).toLocaleString("default", {
    month: "long",
  });
  const numberOfDays = daysInMonth(currentMonthIndex, currentYearState);

  const firstDayOfMonth = new Date(
    currentYearState,
    currentMonthIndex,
    1
  ).getDay();

  // Generate an array of empty squares for days before the 1st of the month
  const emptySquares = Array.from({ length: firstDayOfMonth }, (_, i) => ({
    day: "",
    key: `empty-${i}`,
  }));

  // Generate an array of day squares for the days of the month
  const daySquares = Array.from({ length: numberOfDays }, (_, i) => ({
    day: i + 1,
    key: i + 1,
  }));

  // Combine the empty squares and day squares
  const calendarSquares = [...emptySquares, ...daySquares];
  // console.log(calendarSquares)

  // Group the calendar squares into rows of 7 for each week
  const weeks = [];
  let currentWeek = [];
  calendarSquares.forEach((square, index) => {
    currentWeek.push(square);
    if (currentWeek.length === 7 || index === calendarSquares.length - 1) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  return (
    <Container style={{ height: "100vh" }}>
    <IconButton onClick={()=>navigate("/")}>
        <ArrowBack />
    </IconButton>
      <Grid
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 20px",
        }}
      >
        <Typography>Select Month:</Typography>
        <Select
          value={currentMonthIndex}
          onChange={(e) => setCurrentMonthIndex(parseInt(e.target.value))}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <MenuItem key={i} value={i}>
              {new Date(currentYearState, i).toLocaleString("default", {
                month: "long",
              })}
            </MenuItem>
          ))}
        </Select>
        <Typography>Select Year:</Typography>
        <Select
          value={currentYearState}
          onChange={(e) => setCurrentYearState(parseInt(e.target.value))}
        >
          {Array.from({ length: maxYear - minYear + 1 }, (_, i) => (
            <MenuItem key={minYear + i} value={minYear + i}>
              {minYear + i}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Grid>
          <Grid
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 20px",
              margin: "10px 0",
            }}
          >
            <Button onClick={decrementMonth}>Previous Month</Button>
            <Typography>
              <span style={{ marginRight: "30px" }}>{currentYearState} </span>
              <span style={{ marginLeft: "30px" }}>{currentMonthName}</span>
            </Typography>
            <Button onClick={incrementMonth}>Next Month</Button>
          </Grid>
          <div
            className="calendar"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "0 20px",
            }}
          >
            <Grid container columns={7}>
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                (day, index) => (
                  <Grid key={index} item xs={1} style={calendarDaysStyle}>
                    <Typography style={typoStyle}>{day}</Typography>
                  </Grid>
                )
              )}
              {weeks.map((week, index) => (
                <Grid key={index} container columns={7}>
                  {week.map((square) => (
                    <Grid
                      key={square.key}
                      item
                      style={calendarDaysStyle}
                      xs={1}
                    >
                      <Link
                        to={`/date-attendance/${currentYearState}${String(
                          currentMonthIndex + 1
                        ).padStart(2, "0")}${String(square.day).padStart(
                          2,
                          "0"
                        )}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Typography style={typoStyle}>{square.day}</Typography>
                      </Link>
                    </Grid>
                  ))}
                </Grid>
              ))}
            </Grid>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

const calendarDaysStyle = {
  width: "20px",
  border: "1px solid #ccc",
  textAlign: "center",
  height: "50px",
};
const typoStyle = {
  // textAlign: "center",
  // height:"100%"
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  color: "black",
};
