import { useNavigate } from "react-router-dom";

export default function IELTSTasks() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="max-w-md mx-auto space-y-4">
        <h1 className="text-xl font-semibold text-slate-800 text-center">Choose an IELTS Task</h1>

        <button
          onClick={() => navigate("/write/IELTS/task1")}
          className="w-full text-left bg-white rounded-xl shadow-sm border border-slate-200 p-4 hover:border-slate-400"
        >
          <p className="font-medium text-slate-800">Academic Writing Task 1</p>
          <p className="text-sm text-slate-500 mt-1">
            20 minutes · Describe data · 150+ words
          </p>
        </button>

        <button
          onClick={() => navigate("/write/IELTS/task2")}
          className="w-full text-left bg-white rounded-xl shadow-sm border border-slate-200 p-4 hover:border-slate-400"
        >
          <p className="font-medium text-slate-800">Academic Writing Task 2</p>
          <p className="text-sm text-slate-500 mt-1">
            40 minutes · Essay · 250+ words
          </p>
        </button>
      </div>
    </div>
  );
}
