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
static private function Debug(message, log){
  log.LogDebug(message);
}
/*
@@ context = report
*/
  static function PopulateQuestions(context){
    //var columns = GetMainTableData(context);
    Debug("1", context.log);
    var questionMap = CreateQuestionMap(context);
    Debug("2", context.log);
    var rowIterator = 0;
    var columnIterator = 1;
    for(var i = 0; i < allQIds.length; i++){
      Debug(context.report, context.log);
      var column = context.report.TableUtils.GetColumnValues("frodo:MainTable", columnIterator);
      Debug("3A", context.log);
      var question : ReportQuestion = new ReportQuestion(allQIds[i]);
      Debug("3B", context.log);
      var distribution = GetDistribution(rowIterator, questionMap[allQIds[i]], column, context);
      Debug("4", context.log);
      rowIterator += questionMap[allQIds[i]];
      var validN = column[rowIterator];

      question.Setup({distribution: distribution, validN : validN, label: allQIds[i]});
      Debug("5", context.log);
    }
  }

  static function CreateQuestionMap(context){
    var questionMap = {};
    var questions = Config.QuestionsGridStructure;
    Debug("1A", context.log);
    for(var i = 0; i < questions.length; i++){
      var questionScale = context.report.DataSource.GetProject(Config.DataSources.MainSurvey).GetQuestion(questions[i].Id).GetScale().length;
      Debug("1B", context.log);
      if(questions[i].Qs === null){
        questionMap[questions[i].Id] = questionScale;
      }else{
        for(var j = 0; j < questions[i].Qs.length; j++){
          questionMap[questions[i].Qs[j]] = questionScale;
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
