class TableHelper{
  static var allQIds = MainTable.GetAllGridQuestions();
  private var reportQuestionHT = {};

/*  static function GetMainTableData(context){
    var columns = {currentResult: context.report.TableUtils.GetColumnValues("source:MainTable", 1),
                   previous: GetPrevious(context)
                 };

    return columns;
  }

  static function GetPrevious(context){
    var previous = Config.Wave.Codes;
    var returnArray = [];
    for(var i = 1; i < previous.length; i++){
      returnArray[i-1] = context.report.TableUtils.GetColumnValues("source:MainTable", i+1);
    }
    return returnArray;
  }
*/
  static function PopulateQuestions(context){
    var columns = GetMainTableData(context);
    var questionMap = CreateQuestionMap();
    var rowIterator = 0;
    var columnIterator = 1;
    for(var i = 0; i < allQIds.length; i++){
      var question : ReportQuestion = new ReportQuestion(allQIds[i]);

      var distribution = GetDistribution(rowIterator, columnIterator, questionMap[allQIds[i]], context);

      question.Setup();
      rowIterator += questionMap[allQIds[i]];
    }
  }

  static function CreateQuestionMap(){
    var questionMap = {};
    var questions = Config.QuestionsGridStructure;

    for(var i = 0; i < questions.length; i++){
      if(questions[i].Qs === null){
        questionMap[questions[i].Id] = questions[i].NumberOfAnswers;
      }else{
        for(var j = 0; j < question[i].Qs.length; j++){
          questionMap[question[i].Qs[j]] = question[i].NumberOfAnswers;
        }
      }
    }
    return questionMap;
  }

  static function GetDistribution(rowIterator, columnIterator, numberOfAnswers, context){
    var column = context.report.TableUtils.GetColumnValues("source:MainTable", columnIterator);
    var distribution = [];

    for(var i = 0; i < numberOfAnswers; i++){
      distribution.push(column[rowIterator + i]);
    }
  }
}
