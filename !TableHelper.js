class TableHelper{
  static var allQIds = ConfigHelper.GetQuestions();
  private var reportQuestionHT = {};

  static function PopulateQuestions(context){
    var questionMap = CreateQuestionMap(context);
    var questionTexts = context.report.TableUtils.GetRowHeaderCategoryTitles("frodo:MainTable");
    var returnArray = [];
    var rowIterator = 0;
    var tempIt = 0;
    var columnCount = Config.Wave.Codes.length + 4; // 4 = number of internal comparators

    for(var i = 0; i < allQIds.length; i++){
      //var qValues = {current: null, trends: [], inter: [], exter: []};
      var detailsTable = {};
      for(var columnIterator = 1; columnIterator <= columnCount; columnIterator++){
        rowIterator = tempIt;
        var label = questionTexts[rowIterator][1];
        var column = context.report.TableUtils.GetColumnValues("frodo:MainTable", columnIterator);
        var details = new ReportDetails(allQIds[i]);
        var distribution = GetDistribution(rowIterator, questionMap[allQIds[i]], column, context);
        rowIterator += questionMap[allQIds[i]];
        var validN = column[rowIterator].Value;

        details.Setup({distribution: distribution, validN: validN}, context);
  //      ReportHelper.Debug('After details.Setup');
        rowIterator += 1;

        if (columnIterator === 1) {
          detailsTable["current"] = details;
        //  ReportHelper.Debug('Current: ' + details.GetValidN());
        //  qValues.current = {distribution: distribution, validN: validN};
        }

        if (columnIterator > 1 && columnIterator <= Config.Wave.Codes.length) {
            detailsTable["previous" + (columnIterator - 1)] = details;
        //  qValues.trends.push({distribution: distribution, validN: validN});
        }

        if (columnIterator > Config.Wave.Codes.length && columnIterator <= Config.Wave.Codes.length + 4){
          detailsTable["internal" + (columnIterator - Config.Wave.Codes.length -1)] = details;
        //  qValues.inter.push({distribution: distribution, validN: validN});
        }
      }
      tempIt = rowIterator;

      var question : ReportQuestion = new ReportQuestion(allQIds[i]);
  //    ReportHelper.Debug('Before question.Setup');
      question.Setup({label: label, details: detailsTable, description: ""}, context);
  //    ReportHelper.Debug('After question.Setup');

      returnArray.push(question);
    }
    return returnArray;
  }

  static function CreateQuestionMap(context){
    var questionMap = {};
    var questions = Config.QuestionsGridStructure;

    for(var i = 0; i < questions.length; i++){
      var questionScale = context.report.DataSource.GetProject(Config.DataSources.MainSurvey).GetQuestion(questions[i].Id).GetScale().length;

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
    }

    return distribution;
  }
}
