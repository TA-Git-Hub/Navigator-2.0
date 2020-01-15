class TableHelper{
  static var allQIds = ConfigHelper.GetQuestions();
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
    var questionMap = CreateQuestionMap(context);
    var rowIterator = 0;
    var columnIterator = 1;
    for(var i = 0; i < allQIds.length; i++){
      var column = context.report.TableUtils.GetColumnValues("source:MainTable", columnIterator);
      var question : ReportQuestion = new ReportQuestion(allQIds[i]);
      var distribution = GetDistribution(rowIterator, questionMap[allQIds[i]], column, context);
      rowIterator += questionMap[allQIds[i]];
      var validN = column[rowIterator];

      question.Setup({distribution: distribution, validN : validN, label: allQIds[i]});

    }
  }

  static function CreateQuestionMap(context){
    var questionMap = {};
    var questions = Config.QuestionsGridStructure;

    for(var i = 0; i < questions.length; i++){
      var questionScale = context.report.DataSource.GetProject(Config.DataSources.MainSurvey).GetQuestion(questions[i]).GetScale().length;
      if(questions[i].Qs === null){
        questionMap[questions[i].Id] = questionScale;
      }else{
        for(var j = 0; j < question[i].Qs.length; j++){
          questionMap[question[i].Qs[j]] = questionScale;
        }
      }
    }
    return questionMap;
  }

  static function GetDistribution(rowIterator, numberOfAnswers, column, context){

    var distribution = [];

    for(var i = 0; i < numberOfAnswers; i++){
      distribution.push(column[rowIterator + i]);
    }

    return distribution;
  }
}
