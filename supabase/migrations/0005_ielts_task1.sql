-- 0005_ielts_task1.sql

insert into exam_questions (exam_type, task_type, prompt_text, source_passage, time_limit_seconds, recommended_min_words)
values (
  'IELTS',
  'task1',
  'The data below shows the percentage of households with internet access in three countries (Country A, Country B, Country C) in the years 2000, 2010, and 2020. Summarize the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
  'Internet access (% of households):
Country A — 2000: 15%, 2010: 55%, 2020: 92%
Country B — 2000: 5%, 2010: 30%, 2020: 78%
Country C — 2000: 20%, 2010: 45%, 2020: 65%',
  1200,
  150
);
