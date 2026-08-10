-- 0007_bulk_questions.sql
-- Brings each task type up to 25 questions (100 total)

-- ===== IELTS Task 2 (20 more, bringing total to 25) =====
insert into exam_questions (exam_type, task_type, prompt_text, source_passage, time_limit_seconds, recommended_min_words) values
('IELTS', 'task2', 'Some people think that the government should provide free healthcare for all citizens, while others believe individuals should pay for their own healthcare. Discuss both views and give your opinion.', null, 2400, 250),
('IELTS', 'task2', 'In the future, fewer people will own cars and more will rely on public transportation. To what extent do you agree or disagree?', null, 2400, 250),
('IELTS', 'task2', 'Some people believe that unpaid volunteer work benefits both the individual and society. Others think it is a waste of time that could be spent earning money. Discuss both views and give your own opinion.', null, 2400, 250),
('IELTS', 'task2', 'Many countries are experiencing an aging population. What problems does this cause, and what solutions can you suggest?', null, 2400, 250),
('IELTS', 'task2', 'Some people think that advertising encourages people to buy things they do not need. To what extent do you agree or disagree?', null, 2400, 250),
('IELTS', 'task2', 'In many countries, the gap between the rich and the poor is increasing. What are the causes of this, and what measures can be taken to reduce it?', null, 2400, 250),
('IELTS', 'task2', 'Some people believe that studying abroad is the best way to learn about other cultures, while others think travel is a better way. Discuss both views and give your opinion.', null, 2400, 250),
('IELTS', 'task2', 'Many employers now allow their staff to work flexible hours. Do the advantages of this outweigh the disadvantages?', null, 2400, 250),
('IELTS', 'task2', 'Some people think that children should be taught how to manage money at school. To what extent do you agree or disagree?', null, 2400, 250),
('IELTS', 'task2', 'In many cities, historic buildings are being demolished to make way for new development. Do you think this is a positive or negative development?', null, 2400, 250),
('IELTS', 'task2', 'Some people believe that competition in schools encourages children to try harder, while others think it causes unnecessary stress. Discuss both views and give your own opinion.', null, 2400, 250),
('IELTS', 'task2', 'Governments should invest more money in renewable energy sources rather than fossil fuels. To what extent do you agree or disagree?', null, 2400, 250),
('IELTS', 'task2', 'Some people think that the best way to solve environmental problems is through individual action, while others believe governments must take responsibility. Discuss both views and give your opinion.', null, 2400, 250),
('IELTS', 'task2', 'In many countries, more people are choosing to live alone rather than with family or a partner. What are the reasons for this, and is it a positive or negative trend?', null, 2400, 250),
('IELTS', 'task2', 'Some people believe that fast food is harming public health and should be more heavily taxed or regulated. To what extent do you agree or disagree?', null, 2400, 250),
('IELTS', 'task2', 'Some people think that children should attend boarding schools away from home, while others believe children should stay at home with their families. Discuss both views and give your opinion.', null, 2400, 250),
('IELTS', 'task2', 'Many people believe that watching television is harmful to young children''s development. To what extent do you agree or disagree?', null, 2400, 250),
('IELTS', 'task2', 'Some people think that international sports events like the Olympics bring countries together, while others believe they cause unnecessary rivalry. Discuss both views and give your own opinion.', null, 2400, 250),
('IELTS', 'task2', 'In many workplaces, robots and automation are replacing human workers. What are the advantages and disadvantages of this trend?', null, 2400, 250),
('IELTS', 'task2', 'Some people believe that art and music education should be a compulsory part of the school curriculum. To what extent do you agree or disagree?', null, 2400, 250);

-- ===== IELTS Task 1 (20 more, bringing total to 25) =====
insert into exam_questions (exam_type, task_type, prompt_text, source_passage, time_limit_seconds, recommended_min_words) values
('IELTS', 'task1',
 'The line graph below shows unemployment rates in three countries between 2000 and 2020. Summarize the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
 'Unemployment rate (%):
Country A — 2000: 8%, 2005: 6%, 2010: 10%, 2015: 7%, 2020: 5%
Country B — 2000: 4%, 2005: 4.5%, 2010: 9%, 2015: 6%, 2020: 4%
Country C — 2000: 12%, 2005: 10%, 2010: 14%, 2015: 11%, 2020: 8%',
 1200, 150),
('IELTS', 'task1',
 'The pie charts below show the sources of electricity generation in a country in 2000 and 2020. Summarize the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
 '2000 electricity sources: Coal 55%, Natural Gas 20%, Nuclear 15%, Renewables 5%, Other 5%.
2020 electricity sources: Coal 20%, Natural Gas 25%, Nuclear 15%, Renewables 35%, Other 5%.',
 1200, 150),
('IELTS', 'task1',
 'The table below shows the number of students enrolled in three university departments between 2015 and 2023. Summarize the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
 'Student enrollment:
Engineering — 2015: 1200, 2019: 1500, 2023: 2100
Business — 2015: 1800, 2019: 1700, 2023: 1600
Arts — 2015: 900, 2019: 750, 2023: 600',
 1200, 150),
('IELTS', 'task1',
 'The diagram below shows the process of recycling plastic bottles. Summarize the information by describing the main stages of the process. Write at least 150 words.',
 'Process stages: 1) Plastic bottles collected from recycling bins. 2) Bottles transported to a sorting facility. 3) Bottles sorted by plastic type and color. 4) Bottles cleaned to remove labels and residue. 5) Bottles shredded into small plastic flakes. 6) Flakes melted and formed into pellets. 7) Pellets sold to manufacturers to make new plastic products.',
 1200, 150),
('IELTS', 'task1',
 'The bar chart below shows average weekly hours spent on different leisure activities by adults in 2023. Summarize the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
 'Average weekly hours:
Watching TV/streaming: 12 hours
Social media: 9 hours
Reading: 3 hours
Exercise: 4 hours
Socializing in person: 6 hours',
 1200, 150),
('IELTS', 'task1',
 'The maps below show a small town in 1990 and the same town in 2020. Summarize the information by describing the main changes. Write at least 150 words.',
 '1990: Town has a small market square, a church, a school, and mostly farmland surrounding it, with one main road.
2020: The farmland has been replaced by a shopping mall and housing estates. The school has been expanded. A new highway bypass has been built around the town. The church remains but the market square is now a parking lot.',
 1200, 150),
('IELTS', 'task1',
 'The graph below shows the average price of houses in three cities between 2010 and 2023. Summarize the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
 'Average house price ($1000s):
City A — 2010: 250, 2015: 320, 2020: 450, 2023: 520
City B — 2010: 180, 2015: 200, 2020: 260, 2023: 300
City C — 2010: 400, 2015: 480, 2020: 600, 2023: 650',
 1200, 150),
('IELTS', 'task1',
 'The table below shows the percentage of adults who smoked cigarettes in four countries in 2000 and 2020. Summarize the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
 'Percentage of adult smokers:
Country A — 2000: 35%, 2020: 15%
Country B — 2000: 28%, 2020: 18%
Country C — 2000: 40%, 2020: 22%
Country D — 2000: 20%, 2020: 12%',
 1200, 150),
('IELTS', 'task1',
 'The pie chart below shows how a family''s monthly household budget of $4000 was spent in 2023. Summarize the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
 'Monthly budget breakdown ($4000 total): Housing 35%, Food 20%, Transportation 15%, Utilities 10%, Entertainment 8%, Savings 7%, Other 5%.',
 1200, 150),
('IELTS', 'task1',
 'The diagram below shows the water cycle. Summarize the information by describing the main stages of the process. Write at least 150 words.',
 'Process stages: 1) Water evaporates from oceans, lakes, and rivers due to heat from the sun. 2) Water vapor rises and cools, forming clouds through condensation. 3) Water droplets in clouds combine and fall as precipitation (rain or snow). 4) Precipitation collects in rivers, lakes, and underground aquifers. 5) Water flows back to the ocean via rivers, and the cycle repeats.',
 1200, 150),
('IELTS', 'task1',
 'The bar chart below shows the number of new businesses started in five industry sectors in 2023. Summarize the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
 'New businesses started (thousands):
Technology: 45
Retail: 30
Food service: 38
Healthcare: 22
Construction: 18',
 1200, 150),
('IELTS', 'task1',
 'The line graph below shows the average daily screen time (in hours) for teenagers in three countries from 2015 to 2023. Summarize the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
 'Average daily screen time (hours):
Country A — 2015: 3.5, 2019: 5.0, 2023: 6.5
Country B — 2015: 4.0, 2019: 5.5, 2023: 6.0
Country C — 2015: 2.5, 2019: 3.5, 2023: 4.5',
 1200, 150),
('IELTS', 'task1',
 'The table below shows the percentage of renewable energy used in total energy consumption for four countries in 2023. Summarize the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
 'Renewable energy as % of total consumption (2023):
Country A: 62%
Country B: 45%
Country C: 28%
Country D: 15%',
 1200, 150),
('IELTS', 'task1',
 'The diagram below shows how solar panels generate electricity for a home. Summarize the information by describing the main stages of the process. Write at least 150 words.',
 'Process stages: 1) Sunlight hits photovoltaic cells on the solar panel. 2) Cells convert sunlight into direct current (DC) electricity. 3) An inverter converts DC electricity into alternating current (AC) electricity usable by the home. 4) AC electricity powers household appliances. 5) Excess electricity is stored in a battery or sent back to the electrical grid.',
 1200, 150),
('IELTS', 'task1',
 'The pie charts below show the main reasons people gave for choosing their job, surveyed in 2010 and 2023. Summarize the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
 '2010 reasons for choosing a job: Salary 40%, Job security 25%, Interest in the work 20%, Location 10%, Other 5%.
2023 reasons for choosing a job: Salary 30%, Job security 15%, Interest in the work 30%, Work-life balance 20%, Other 5%.',
 1200, 150),
('IELTS', 'task1',
 'The bar chart below compares the literacy rates of men and women in four countries in 2023. Summarize the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
 'Literacy rate (%):
Country A — Men: 95%, Women: 92%
Country B — Men: 80%, Women: 65%
Country C — Men: 99%, Women: 98%
Country D — Men: 70%, Women: 55%',
 1200, 150),
('IELTS', 'task1',
 'The graph below shows the number of electric vehicles sold in a country between 2015 and 2023. Summarize the information by selecting and reporting the main features. Write at least 150 words.',
 'Electric vehicles sold (thousands):
2015: 5
2017: 15
2019: 40
2021: 90
2023: 180',
 1200, 150),
('IELTS', 'task1',
 'The table below shows the average number of hours worked per week in five countries in 2023. Summarize the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
 'Average weekly working hours (2023):
Country A: 38
Country B: 42
Country C: 35
Country D: 46
Country E: 40',
 1200, 150),
('IELTS', 'task1',
 'The diagram below shows the process of coffee production, from harvesting to packaging. Summarize the information by describing the main stages of the process. Write at least 150 words.',
 'Process stages: 1) Coffee cherries are hand-picked from coffee plants. 2) Cherries are pulped to remove the outer skin. 3) Beans are fermented and washed to remove remaining fruit residue. 4) Beans are dried in the sun or using machines. 5) Dried beans are roasted at high temperatures. 6) Roasted beans are ground or packaged whole for sale.',
 1200, 150),
('IELTS', 'task1',
 'The line graph below shows the average life expectancy in three countries between 1980 and 2020. Summarize the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
 'Life expectancy (years):
Country A — 1980: 65, 2000: 72, 2020: 79
Country B — 1980: 58, 2000: 68, 2020: 76
Country C — 1980: 70, 2000: 76, 2020: 82',
 1200, 150);

-- ===== PTE Write Essay (20 more, bringing total to 25) =====
insert into exam_questions (exam_type, task_type, prompt_text, source_passage, time_limit_seconds, recommended_min_words) values
('PTE', 'write_essay', 'Some people believe that healthcare should be free for everyone, while others think individuals should pay for their own medical care. Discuss both views and give your opinion.', null, 1200, 200),
('PTE', 'write_essay', 'In the future, fewer people will own private vehicles and more will rely on public transportation and ride-sharing. To what extent do you agree or disagree?', null, 1200, 200),
('PTE', 'write_essay', 'Many countries are experiencing an aging population. What problems does this create, and what solutions can governments implement?', null, 1200, 200),
('PTE', 'write_essay', 'Some people think advertising manipulates consumers into buying things they don''t need. To what extent do you agree or disagree?', null, 1200, 200),
('PTE', 'write_essay', 'Some people believe that studying abroad is the best way to understand other cultures, while others believe traveling is more effective. Discuss both views and give your opinion.', null, 1200, 200),
('PTE', 'write_essay', 'Many employers now offer flexible working hours to their staff. Do the advantages of this practice outweigh the disadvantages?', null, 1200, 200),
('PTE', 'write_essay', 'Some people think that children should learn financial literacy in school. To what extent do you agree or disagree?', null, 1200, 200),
('PTE', 'write_essay', 'In many cities, historic buildings are demolished to make way for modern development. Is this a positive or negative trend?', null, 1200, 200),
('PTE', 'write_essay', 'Governments should invest more in renewable energy rather than fossil fuels. To what extent do you agree or disagree?', null, 1200, 200),
('PTE', 'write_essay', 'Some people think that individual actions are the key to solving environmental problems, while others believe governments must lead. Discuss both views and give your opinion.', null, 1200, 200),
('PTE', 'write_essay', 'More people today are choosing to live alone rather than with family. What are the reasons, and is this a positive or negative development?', null, 1200, 200),
('PTE', 'write_essay', 'Some people believe fast food should be taxed more heavily due to its health impact. To what extent do you agree or disagree?', null, 1200, 200),
('PTE', 'write_essay', 'Some people think boarding schools benefit children''s independence, while others believe children should stay home with family. Discuss both views and give your opinion.', null, 1200, 200),
('PTE', 'write_essay', 'Many people believe television and streaming content negatively affects young children''s development. To what extent do you agree or disagree?', null, 1200, 200),
('PTE', 'write_essay', 'International sporting events like the Olympics bring countries together, but some argue they create unnecessary rivalry. Discuss both views and give your own opinion.', null, 1200, 200),
('PTE', 'write_essay', 'Automation and robots are increasingly replacing human workers in many industries. What are the advantages and disadvantages of this trend?', null, 1200, 200),
('PTE', 'write_essay', 'Some people believe art and music education should be compulsory in schools. To what extent do you agree or disagree?', null, 1200, 200),
('PTE', 'write_essay', 'Some people think social media has improved how people communicate, while others believe it has damaged real relationships. Discuss both views and give your opinion.', null, 1200, 200),
('PTE', 'write_essay', 'Should companies be allowed to use customer data to personalize advertising? To what extent do you agree or disagree?', null, 1200, 200),
('PTE', 'write_essay', 'Some people believe that university degrees are becoming less valuable in the modern job market. To what extent do you agree or disagree?', null, 1200, 200);

-- ===== PTE Summarize Written Text (20 more, bringing total to 25) =====
insert into exam_questions (exam_type, task_type, prompt_text, source_passage, time_limit_seconds, recommended_min_words) values
('PTE', 'summarize_text', 'Summarize the passage below in one sentence.',
 'Microplastics, tiny plastic particles smaller than five millimeters, have been found in oceans, soil, and even human blood, raising growing concern among scientists about their long-term health and environmental effects. These particles originate from the breakdown of larger plastic waste, synthetic clothing fibers released during washing, and microbeads once common in cosmetic products. While some countries have banned microbeads in consumer goods, the broader problem of plastic pollution continues to grow, and researchers are still working to understand the full scope of microplastics'' impact on marine ecosystems and human health.',
 600, 5),
('PTE', 'summarize_text', 'Summarize the passage below in one sentence.',
 'The rise of e-commerce has transformed retail industries worldwide, with online sales growing at a much faster rate than traditional brick-and-mortar stores over the past decade. This shift has been driven by increased internet access, the convenience of home delivery, and improvements in online payment security. However, the growth of e-commerce has also created challenges for small local businesses that struggle to compete with large online retailers, as well as concerns about the environmental impact of increased packaging waste and delivery vehicle emissions.',
 600, 5),
('PTE', 'summarize_text', 'Summarize the passage below in one sentence.',
 'Sleep deprivation has become increasingly common in modern society, with studies suggesting that a significant proportion of adults regularly get less than the recommended seven to nine hours of sleep per night. Contributing factors include increased screen time before bed, work-related stress, and irregular schedules caused by shift work. Chronic sleep deprivation has been linked to a range of health problems, including impaired cognitive function, weakened immune response, and increased risk of cardiovascular disease, prompting public health officials to emphasize the importance of sleep hygiene.',
 600, 5),
('PTE', 'summarize_text', 'Summarize the passage below in one sentence.',
 'Vertical farming, the practice of growing crops in stacked layers within controlled indoor environments, has emerged as a potential solution to challenges facing traditional agriculture, including limited arable land and unpredictable weather patterns caused by climate change. These farms use significantly less water than conventional farming and can be located close to urban centers, reducing transportation costs and emissions. Critics, however, point to the high energy costs of artificial lighting and climate control as a barrier to making vertical farming economically viable at a large scale.',
 600, 5),
('PTE', 'summarize_text', 'Summarize the passage below in one sentence.',
 'The concept of a four-day work week has gained traction in recent years, with several companies and even entire countries conducting trials to assess its impact on productivity and employee wellbeing. Early results from these trials have generally been positive, showing that employees report lower stress levels and improved work-life balance without a corresponding drop in output. Skeptics argue that a shorter work week may not be feasible for all industries, particularly those requiring continuous staffing, such as healthcare and manufacturing.',
 600, 5),
('PTE', 'summarize_text', 'Summarize the passage below in one sentence.',
 'Coral reefs, often described as the rainforests of the sea due to their extraordinary biodiversity, are facing unprecedented threats from rising ocean temperatures, a phenomenon that causes coral bleaching and can lead to widespread reef death. Scientists estimate that a significant percentage of the world''s coral reefs have already experienced severe bleaching events in the past two decades. Conservation efforts, including the establishment of marine protected areas and coral restoration projects, aim to slow this decline, though many experts warn that addressing the root cause of climate change is essential for long-term reef survival.',
 600, 5),
('PTE', 'summarize_text', 'Summarize the passage below in one sentence.',
 'The gig economy, characterized by short-term contracts and freelance work facilitated by digital platforms, has expanded rapidly over the past decade, offering workers flexibility but often lacking the job security and benefits associated with traditional employment. Proponents argue that gig work allows individuals to set their own schedules and pursue multiple income streams. Critics, however, highlight concerns about inconsistent income, lack of health insurance, and limited legal protections, prompting some governments to consider new regulations to better protect gig workers.',
 600, 5),
('PTE', 'summarize_text', 'Summarize the passage below in one sentence.',
 'Antibiotic resistance, a growing global health concern, occurs when bacteria evolve mechanisms to survive exposure to drugs designed to kill them, rendering common treatments less effective over time. This phenomenon is accelerated by the overuse and misuse of antibiotics in both human medicine and agriculture. Health organizations have called for more responsible prescribing practices and increased investment in new antibiotic development, warning that without action, routine infections and minor surgeries could become significantly more dangerous in the coming decades.',
 600, 5),
('PTE', 'summarize_text', 'Summarize the passage below in one sentence.',
 'Space tourism, once confined to the realm of science fiction, has become a commercial reality in recent years as private companies have successfully launched paying customers into suborbital and orbital flight. While ticket prices remain extremely high, limiting access to wealthy individuals, industry analysts predict that costs could decrease significantly as technology matures and competition increases. Environmental groups have raised concerns about the carbon footprint of rocket launches, questioning whether the growth of space tourism is compatible with global efforts to reduce emissions.',
 600, 5),
('PTE', 'summarize_text', 'Summarize the passage below in one sentence.',
 'Food waste represents a significant global challenge, with estimates suggesting that roughly one-third of all food produced for human consumption is lost or wasted each year, occurring at every stage from farm production to household consumption. In developed countries, much of this waste happens at the consumer level due to over-purchasing and confusion over expiration date labeling, while in developing countries, losses often occur earlier in the supply chain due to inadequate storage and transportation infrastructure. Reducing food waste is increasingly recognized as an important strategy for improving food security and reducing environmental impact.',
 600, 5),
('PTE', 'summarize_text', 'Summarize the passage below in one sentence.',
 'Mental health awareness has increased substantially in workplaces over the past decade, with many organizations now offering employee assistance programs, mental health days, and training for managers to recognize signs of employee distress. This shift has been driven partly by research demonstrating the significant economic costs of untreated mental health conditions, including reduced productivity and increased absenteeism. Despite this progress, stigma surrounding mental health issues persists in many workplace cultures, and access to adequate mental health support remains uneven across different industries and regions.',
 600, 5),
('PTE', 'summarize_text', 'Summarize the passage below in one sentence.',
 'The practice of intermittent fasting, which involves cycling between periods of eating and voluntary fasting, has gained popularity as a dietary approach for weight management and potential health benefits. Some studies suggest that intermittent fasting may improve markers of metabolic health, including insulin sensitivity and cholesterol levels, though researchers caution that much of the existing evidence comes from animal studies or short-term human trials. Nutrition experts generally agree that more long-term research is needed before intermittent fasting can be recommended as superior to other approaches to weight management.',
 600, 5),
('PTE', 'summarize_text', 'Summarize the passage below in one sentence.',
 'Urban air pollution remains a major public health challenge in many of the world''s largest cities, contributing to respiratory illnesses, cardiovascular disease, and premature death, particularly among vulnerable populations such as children and the elderly. Major sources of urban air pollution include vehicle emissions, industrial activity, and, in some regions, the burning of solid fuels for heating and cooking. Cities that have implemented stricter emissions standards, expanded public transportation, and promoted electric vehicles have seen measurable improvements in air quality, offering a model for other urban centers to follow.',
 600, 5),
('PTE', 'summarize_text', 'Summarize the passage below in one sentence.',
 'The traditional retirement age, long fixed around 65 in many developed countries, is increasingly being reconsidered as life expectancy rises and pension systems face financial strain from aging populations. Several governments have already raised the official retirement age or introduced incentives for people to continue working longer. Critics of these changes argue that physically demanding jobs make working into old age difficult for many people, while supporters contend that flexible retirement policies can help address labor shortages and reduce pressure on public pension systems.',
 600, 5),
('PTE', 'summarize_text', 'Summarize the passage below in one sentence.',
 'Desalination, the process of removing salt from seawater to produce fresh drinking water, has become an increasingly important water source for arid regions facing chronic water scarcity. While desalination technology has improved significantly, reducing both costs and energy consumption over the past two decades, the process still requires substantial energy input and produces a concentrated brine byproduct that can harm marine ecosystems if not properly managed. Researchers continue to explore ways to make desalination more sustainable, including powering plants with renewable energy sources.',
 600, 5),
('PTE', 'summarize_text', 'Summarize the passage below in one sentence.',
 'Citizen science, in which members of the public participate in scientific research by collecting or analyzing data, has grown significantly with the spread of smartphone technology and online platforms that make participation accessible to non-experts. Projects range from tracking bird migrations to classifying distant galaxies, allowing researchers to gather data at a scale that would be impossible with professional scientists alone. While citizen science has produced valuable contributions to numerous fields, some researchers note the importance of careful data validation to ensure the accuracy of results collected by non-professional volunteers.',
 600, 5),
('PTE', 'summarize_text', 'Summarize the passage below in one sentence.',
 'The transition to a circular economy, in which products are designed for reuse, repair, and recycling rather than disposal, is gaining attention as a strategy to reduce waste and resource consumption. Businesses adopting circular economy principles often redesign products to be more durable and easier to disassemble, while also developing take-back programs to recover materials at the end of a product''s life. Proponents argue that this model can reduce environmental impact while creating new economic opportunities, though widespread adoption still faces obstacles including consumer habits and the upfront cost of redesigning manufacturing processes.',
 600, 5),
('PTE', 'summarize_text', 'Summarize the passage below in one sentence.',
 'Language loss is accelerating worldwide, with linguists estimating that a significant proportion of the world''s roughly 7,000 languages could disappear within the next century as younger generations increasingly adopt dominant global languages for economic and social reasons. Efforts to document and revitalize endangered languages include community-led education programs, digital archiving projects, and government policies supporting bilingual education. Linguists argue that language loss represents not only a cultural loss but also a loss of unique knowledge systems, particularly regarding local ecosystems and traditional practices embedded within endangered languages.',
 600, 5),
('PTE', 'summarize_text', 'Summarize the passage below in one sentence.',
 'Autonomous vehicle technology has advanced considerably over the past decade, with several companies now testing self-driving cars on public roads under various levels of human supervision. Proponents argue that widespread adoption of autonomous vehicles could significantly reduce traffic accidents caused by human error, which accounts for the vast majority of road fatalities. However, significant technical, legal, and ethical challenges remain, including how autonomous systems should be programmed to make split-second decisions in unavoidable accident scenarios, and questions of liability when a self-driving vehicle is involved in a crash.',
 600, 5),
('PTE', 'summarize_text', 'Summarize the passage below in one sentence.',
 'Traditional print newspapers have experienced a sharp decline in circulation over the past two decades as readers increasingly turn to digital news sources and social media for information. This shift has significantly impacted the advertising revenue that once sustained many newspapers, leading to widespread layoffs and the closure of numerous local publications. Some media analysts warn that the decline of local journalism, in particular, has created "news deserts" in many communities, reducing accountability for local government and institutions that previously relied on newspaper coverage.',
 600, 5);
