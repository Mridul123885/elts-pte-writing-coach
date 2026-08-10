import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabaseClient";

interface Profile {
  display_name: string;
  target_ielts_band: number | null;
  target_pte_score: number | null;
}

function TargetEditor({
  label,
  value,
  min,
  max,
  step,
  onSave,
}: {
  label: string;
  value: number | null;
  min: number;
  max: number;
  step: number;
  onSave: (value: number) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value?.toString() ?? "");

  if (editing) {
    return (
      <div className="flex items-center gap-2">
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          autoFocus
          className="w-20 rounded-md border border-slate-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
        />
        <button
          onClick={() => {
            const num = Number(draft);
            if (!Number.isNaN(num)) onSave(num);
            setEditing(false);
          }}
          className="text-sm text-slate-800 font-medium underline"
        >
          Save
        </button>
        <button
          onClick={() => {
            setDraft(value?.toString() ?? "");
            setEditing(false);
          }}
          className="text-sm text-slate-400"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <p className="text-slate-700">
        {label}: {value ?? "not set"}
      </p>
      <button
        onClick={() => setEditing(true)}
        className="text-xs text-slate-500 underline"
      >
        {value == null ? "Set target" : "Edit"}
      </button>
    </div>
  );
}

export default function Home() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("display_name, target_ielts_band, target_pte_score")
      .eq("id", user.id)
      .single()
      .then(({ data }) => {
        setProfile(data);
        setLoading(false);
      });
  }, [user]);

  async function saveTargetIelts(value: number) {
    if (!user) return;
    await supabase.from("profiles").update({ target_ielts_band: value }).eq("id", user.id);
    setProfile((prev) => (prev ? { ...prev, target_ielts_band: value } : prev));
  }

  async function saveTargetPte(value: number) {
    if (!user) return;
    await supabase.from("profiles").update({ target_pte_score: value }).eq("id", user.id);
    setProfile((prev) => (prev ? { ...prev, target_pte_score: value } : prev));
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="max-w-md mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-slate-800">
            {loading ? "Welcome" : `Welcome back, ${profile?.display_name ?? "there"}`}
          </h1>
          <button
            onClick={signOut}
            className="text-sm text-slate-500 hover:text-slate-800"
          >
            Log out
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-2">
          <p className="text-sm text-slate-500">IELTS Writing</p>
          <TargetEditor
            label="Target Band"
            value={profile?.target_ielts_band ?? null}
            min={4}
            max={9}
            step={0.5}
            onSave={saveTargetIelts}
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-2">
          <p className="text-sm text-slate-500">PTE Writing</p>
          <TargetEditor
            label="Target Score"
            value={profile?.target_pte_score ?? null}
            min={10}
            max={90}
            step={1}
            onSave={saveTargetPte}
          />
        </div>

        <button
          onClick={() => navigate("/ielts-tasks")}
          className="w-full rounded-md bg-slate-800 text-white py-2 text-sm font-medium hover:bg-slate-700"
        >
          Practice IELTS
        </button>
        <button
          onClick={() => navigate("/pte-tasks")}
          className="w-full rounded-md bg-white border border-slate-300 text-slate-800 py-2 text-sm font-medium hover:bg-slate-100"
        >
          Practice PTE
        </button>

        <Link to="/progress" className="block text-center text-sm text-slate-500 underline">
          View Full Progress
        </Link>
      </div>
    </div>
  );
}
