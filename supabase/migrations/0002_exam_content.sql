-- 0002_exam_content.sql

create table if not exists exam_questions (
  id uuid primary key default gen_random_uuid(),
  exam_type text not null check (exam_type in ('IELTS','PTE')),
  task_type text not null,
  prompt_text text not null,
  source_passage text,
  time_limit_seconds int not null,
  recommended_min_words int,
  created_at timestamptz default now()
);

-- public read, no write policy for regular users (content is admin-managed)
alter table exam_questions enable row level security;

create policy "Anyone can read exam questions"
  on exam_questions for select
  using (true);

create table if not exists writing_submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  question_id uuid references exam_questions(id),
  exam_type text not null check (exam_type in ('IELTS','PTE')),
  task_type text not null,
  mode text not null default 'practice' check (mode in ('practice','exam')),
  answer_text text not null default '',
  word_count int not null default 0,
  status text not null default 'draft' check (status in ('draft','submitted')),
  started_at timestamptz not null default now(),
  submitted_at timestamptz,
  created_at timestamptz default now()
);

alter table writing_submissions enable row level security;

create policy "Users can view their own submissions"
  on writing_submissions for select
  using (auth.uid() = user_id);

create policy "Users can insert their own submissions"
  on writing_submissions for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own submissions"
  on writing_submissions for update
  using (auth.uid() = user_id);

create index if not exists idx_writing_submissions_user on writing_submissions(user_id);

-- Seed one IELTS Task 2 question so the editor has something to show immediately
insert into exam_questions (exam_type, task_type, prompt_text, time_limit_seconds, recommended_min_words)
values (
  'IELTS',
  'task2',
  'Some people believe that unpaid community service should be a compulsory part of high school education. To what extent do you agree or disagree?',
  2400,
  250
);
