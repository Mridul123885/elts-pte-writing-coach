-- 0004_pte_questions.sql

insert into exam_questions (exam_type, task_type, prompt_text, source_passage, time_limit_seconds, recommended_min_words)
values (
  'PTE',
  'write_essay',
  'Some people think that governments should invest more in public transportation rather than building new roads for cars. Discuss both views and give your opinion.',
  null,
  1200,
  200
);

insert into exam_questions (exam_type, task_type, prompt_text, source_passage, time_limit_seconds, recommended_min_words)
values (
  'PTE',
  'summarize_text',
  'Summarize the passage below in one sentence.',
  'Renewable energy sources such as solar and wind power have become significantly more cost-competitive over the past decade, with prices falling by more than 80% in some markets. This shift has been driven by improvements in manufacturing efficiency, economies of scale, and supportive government policies in many countries. As a result, several nations have begun to phase out coal-fired power plants in favor of renewable alternatives, though challenges around energy storage and grid infrastructure remain significant obstacles to a full transition.',
  600,
  5
);
