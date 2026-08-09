import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabaseClient";

interface ScoreEntry {
  id: string;
  exam_type: "IELTS" | "PTE";
  task_type: string;
  estimated_score: number;
  recorded_at: string;
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 text-center">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-2xl font-semibold text-slate-800 mt-1">{value}</p>
    </div>
  );
}

function ExamProgress({ examType, entries }: { examType: "IELTS" | "PTE"; entries: ScoreEntry[] }) {
  if (entries.length === 0) return null;

  const scores = entries.map((e) => e.estimated_score);
  const current = scores[scores.length - 1];
  const average = Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 10) / 10;
  const highest = Math.max(...scores);

  return (
    <div className="space-y-3">
      <h2 className="text-sm font-semibold text-slate-700">
        {examType === "IELTS" ? "IELTS Writing Progress" : "PTE Writing Progress"}
      </h2>

      <div className="grid grid-cols-3 gap-3">
        <Stat label="Current" value={current} />
        <Stat label="Average" value={average} />
        <Stat label="Highest" value={highest} />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
        <p className="text-xs text-slate-500 mb-3">Recent scores (oldest → newest)</p>
        <div className="flex items-end gap-2 h-24">
          {entries.slice(-10).map((entry) => {
            const heightPct = Math.max(10, (entry.estimated_score / (examType === "IELTS" ? 9 : 90)) * 100);
            return (
              <div key={entry.id} className="flex-1 flex flex-col items-center justify-end gap-1">
                <span className="text-xs text-slate-500">{entry.estimated_score}</span>
                <div
                  className="w-full bg-slate-700 rounded-t"
                  style={{ height: `${heightPct}%` }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function Progress() {
  const { user } = useAuth();
  const [entries, setEntries] = useState<ScoreEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    supabase
      .from("score_history")
      .select("*")
      .eq("user_id", user.id)
      .order("recorded_at", { ascending: true })
      .then(({ data }) => {
        setEntries((data ?? []) as ScoreEntry[]);
        setLoading(false);
      });
  }, [user]);

  const ieltsEntries = entries.filter((e) => e.exam_type === "IELTS");
  const pteEntries = entries.filter((e) => e.exam_type === "PTE");

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-xl font-semibold text-slate-800">Your Progress</h1>

        {loading && <p className="text-sm text-slate-500">Loading...</p>}

        {!loading && entries.length === 0 && (
          <p className="text-sm text-slate-500">
            No submissions yet — complete a practice writing task to start tracking your progress.
          </p>
        )}

        <ExamProgress examType="IELTS" entries={ieltsEntries} />
        <ExamProgress examType="PTE" entries={pteEntries} />

        <Link to="/" className="block text-center text-sm text-slate-500 underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
