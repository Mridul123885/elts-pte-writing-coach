-- 0003_analysis.sql

create table if not exists writing_analysis (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null unique references writing_submissions(id) on delete cascade,
  estimated_score numeric(3,1) not null,
  score_min numeric(3,1),
  score_max numeric(3,1),
  criteria jsonb not null,
  strengths jsonb not null,
  weaknesses jsonb not null,
  corrected_answer text,
  enhanced_answer text,
  score_explanation text,
  improvement_plan jsonb,
  prompt_version text not null,
  model_used text not null,
  created_at timestamptz default now()
);

alter table writing_analysis enable row level security;

-- Access is scoped through the parent submission's user_id, since
-- writing_analysis has no user_id column of its own.
create policy "Users can view analysis of their own submissions"
  on writing_analysis for select
  using (
    exists (
      select 1 from writing_submissions
      where writing_submissions.id = writing_analysis.submission_id
      and writing_submissions.user_id = auth.uid()
    )
  );

-- Inserts/updates come only from the Edge Function using the service role key,
-- which bypasses RLS — no client-facing insert/update policy is needed or created.

create table if not exists writing_errors (
  id uuid primary key default gen_random_uuid(),
  analysis_id uuid not null references writing_analysis(id) on delete cascade,
  original_text text not null,
  corrected_text text not null,
  category text not null,
  explanation text not null,
  severity text not null check (severity in ('low','medium','high')),
  suggestion text,
  start_index int,
  end_index int
);

alter table writing_errors enable row level security;

create policy "Users can view errors on their own analysis"
  on writing_errors for select
  using (
    exists (
      select 1 from writing_analysis
      join writing_submissions on writing_submissions.id = writing_analysis.submission_id
      where writing_analysis.id = writing_errors.analysis_id
      and writing_submissions.user_id = auth.uid()
    )
  );

create index if not exists idx_writing_errors_analysis on writing_errors(analysis_id);
