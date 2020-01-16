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
    ReportHelper.Debug("1");
    var questionMap = CreateQuestionMap(context);
    var questionTexts = context.report.TableUtils.GetRowHeaderCategoryTitles("frodo:MainTable");
  //  Debug("2", context.log);
    var returnArray = [];
    var rowIterator = 0;
    var tempIt = 0;
    var columnCount = Config.Wave.Codes.length + 5; // 5 = number of internal comparators
    for(var i = 0; i < allQIds.length; i++){
      ReportHelper.Debug("2A-" + i);
      var qValues = {current: null, trends: [], inter: [], exter: []};
    //  Debug("scale: " + questionMap[allQIds[i]], context.log);
      //Debug("i/length: " + i + '/' + allQIds.length, context.log);
      for(var columnIterator = 1; columnIterator <= columnCount; columnIterator++){
        ReportHelper.Debug("2B-" + columnIterator);
        rowIterator = tempIt;
        //Debug("rowIterator: " + rowIterator, context.log);

        var label = questionTexts[rowIterator][1];//ReportHelper.GetText(Config.DataSources.MainSurvey, allQIds[i], context);
        var column = context.report.TableUtils.GetColumnValues("frodo:MainTable", columnIterator);
        var distribution = GetDistribution(rowIterator, questionMap[allQIds[i]], column, context);
        rowIterator += questionMap[allQIds[i]];
        var validN = column[rowIterator].Value;
        rowIterator += 1;

        if (columnIterator === 1) {
          ReportHelper.Debug("3A");
          qValues.current = {distribution: distribution, validN: validN};
        }

        if (columnIterator > 1 && columnIterator <= Config.Wave.Codes.length) {
          ReportHelper.Debug("3B");
          qValues.trends.push({distribution: distribution, validN: validN});
        }

        if (columnIterator > Config.Wave.Codes.length && columnIterator <= Config.Wave.Codes.length + 5){
          ReportHelper.Debug("3C");
          qValues.inter.push({distribution: distribution, validN: validN});
        }
      }


      tempIt = rowIterator;

      var question : ReportQuestion = new ReportQuestion(allQIds[i]);
      question.Setup({distribution: qValues.current.distribution, validN : qValues.current.validN, label: label, comparatorValues: {trend: qValues.trends, inter: qValues.inter}, description: ""}, context);
      returnArray.push(question);
    }
    return returnArray;
  }

  static function CreateQuestionMap(context){
    var questionMap = {};
    var questions = Config.QuestionsGridStructure;
  //  Debug("1A", context.log);
    for(var i = 0; i < questions.length; i++){
      var questionScale = context.report.DataSource.GetProject(Config.DataSources.MainSurvey).GetQuestion(questions[i].Id).GetScale().length;
  //    Debug("1B", context.log);
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
      distribution.push(column[rowIterator + i].Value);
      //Debug(column[rowIterator + i].Value, context.log);
    }

    return distribution;
  }
}
