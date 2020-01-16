/*
Current:
- class ReportQuestion:

- class TableHelper:
      2) fix distribution for trends

Luky & Venca --
- class MainTable:
    Discuss: Implementation of Demographics
             Should both wave and demo columns be filtered by current level?
             If we want to have Orgcode as demo in the table, we'd need to have 'children' info somewhere in the Config
             How to implement Norm scores
*/


/*
Finished:
15.01.2020 - ReportQuestion class: get numberOfAnswers from Config.GetDistributionIndexes(Id)
           - class MainTable - added Horizontal & vertical expression function
                             - Main table takes data and text from GRID, not individual questions
                             - Added context object with all possible stuff we may need in the future
                             - Added special function for creating filter expression
                             - Added internal comparator columns
           - class Config - Add wave, survey DataSources reference

16.01.2020 - ReportHelper class created
           - class ReportQuestion - get score mapping
           - cůass TableHelper - get distributions for questions
*/
