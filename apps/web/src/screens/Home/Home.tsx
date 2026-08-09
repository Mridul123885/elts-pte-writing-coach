import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabaseClient";

interface Profile {
  display_name: string;
  target_ielts_band: number | null;
  target_pte_score: number | null;
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
          <p className="text-slate-700">
            Target Band: {profile?.target_ielts_band ?? "not set"}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-2">
          <p className="text-sm text-slate-500">PTE Writing</p>
          <p className="text-slate-700">
            Target Score: {profile?.target_pte_score ?? "not set"}
          </p>
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
