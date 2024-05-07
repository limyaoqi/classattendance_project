import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import DateAttendance from "./pages/DateAttendance";
import ClassManage from "./pages/ClassManage";
import StudentManage from "./pages/StudentManage";
import Calendar from "./pages/Calendar";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/date-attendance/:id" element={<DateAttendance />} />
        <Route path="/classmanage" element={<ClassManage />} />
        <Route path="/classmanage/:id" element={<StudentManage />} />
      </Routes>
    </BrowserRouter>
  );
}
