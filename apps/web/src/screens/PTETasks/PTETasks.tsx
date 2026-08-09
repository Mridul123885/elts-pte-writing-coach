import { useNavigate } from "react-router-dom";

export default function PTETasks() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="max-w-md mx-auto space-y-4">
        <h1 className="text-xl font-semibold text-slate-800 text-center">Choose a PTE Task</h1>

        <button
          onClick={() => navigate("/write/PTE/write_essay")}
          className="w-full text-left bg-white rounded-xl shadow-sm border border-slate-200 p-4 hover:border-slate-400"
        >
          <p className="font-medium text-slate-800">Write Essay</p>
          <p className="text-sm text-slate-500 mt-1">
            20 minutes · 200-300 words
          </p>
        </button>

        <button
          onClick={() => navigate("/write/PTE/summarize_text")}
          className="w-full text-left bg-white rounded-xl shadow-sm border border-slate-200 p-4 hover:border-slate-400"
        >
          <p className="font-medium text-slate-800">Summarize Written Text</p>
          <p className="text-sm text-slate-500 mt-1">
            10 minutes · One sentence, 5-75 words
          </p>
        </button>
      </div>
    </div>
  );
}
