import { HashRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/lib/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import Login from "@/screens/Auth/Login";
import Register from "@/screens/Auth/Register";
import Home from "@/screens/Home/Home";
import WritingEditor from "@/screens/WritingEditor/WritingEditor";
import ScoreReport from "@/screens/ScoreReport/ScoreReport";
import PTETasks from "@/screens/PTETasks/PTETasks";
import IELTSTasks from "@/screens/IELTSTasks/IELTSTasks";
import Progress from "@/screens/Progress/Progress";

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/ielts-tasks" element={<IELTSTasks />} />
            <Route path="/pte-tasks" element={<PTETasks />} />
            <Route path="/write/:examType/:taskType" element={<WritingEditor />} />
            <Route path="/report/:submissionId" element={<ScoreReport />} />
            <Route path="/progress" element={<Progress />} />
          </Route>
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}
