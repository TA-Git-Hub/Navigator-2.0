/*
Current:
- class ReportQuestion:
      1) question text replace ClientName (maybe other script cause Dimensions?)

- class TableHelper:
      2) fix distribution for trends

Luky & Venca --
- class MainTable:
    Discuss:

             How to implement Norm scores
             Hiding Orgcode demo columns in special cases - violators etc.
*/


/*
Finished:
16.01.2020 - ReportHelper class created
           - class ReportQuestion - get score mapping
           - cůass TableHelper - get distributions for questions
           - class Config - Added NumberOfChildren information to the Config.Hierarchy

15.01.2020 - ReportQuestion class: get numberOfAnswers from Config.GetDistributionIndexes(Id)
           - class MainTable - Added Horizontal & vertical expression function
                             - Main table takes data and text from GRID, not individual questions
                             - Added context object with all possible stuff we may need in the future
                             - Added special function for creating filter expression
                             - Added internal comparator columns
                             - Added demographics/filters
                             - Added filters for current wave and current levels
           - class Config - Add wave, survey DataSources reference
*/
