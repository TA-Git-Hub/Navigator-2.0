class TableHelper{
  static var allQIds = ConfigHelper.GetQuestions();
  private var reportQuestionHT = {};

  /**
    * [@About]      - this function is mapping all tables to their pages

    * [@Parameters] - pageId - string Id of page

    * [@Return]     - string with name of table
  **/
  static function TableMapping(pageId){
    switch(pageId){
      case 'frodo' : return 'MainTable';
      case 'gandalf' : return 'MainTable';
      case 'boromir' : return 'TestTable';

      default : return undefined;
    }
  }

  static function PopulateQuestions(context){
    var questionMap = CreateQuestionMap(context);
    var tablePath = context.page.Id + ':' + TableMapping(context.page.Id);
    var questionTexts = context.report.TableUtils.GetRowHeaderCategoryTitles(tablePath);
    var returnArray = [];
    var rowIterator = 0;
    var tempIt = 0;
    var columnCount = GetColumnCount(tablePath); // 4 = number of internal comparators

    for(var i = 0; i < allQIds.length; i++){
      //var qValues = {current: null, trends: [], inter: [], exter: []};
      var detailsTable = [];//{};
      for(var columnIterator = 1; columnIterator <= columnCount; columnIterator++){
        rowIterator = tempIt;
        var label = ReportHelper.CleanText(questionTexts[rowIterator][1], context);
        var column = context.report.TableUtils.GetColumnValues(tablePath, columnIterator);
        var details = new ReportDetails(allQIds[i]);
        var distribution = GetDistribution(rowIterator, questionMap[allQIds[i]], column, context);
        rowIterator += questionMap[allQIds[i]];
        var validN = column[rowIterator].Value;

        details.Setup({distribution: distribution, validN: validN}, context);
  //      ReportHelper.Debug('After details.Setup');
        rowIterator += 1;

        if (columnIterator <= Config.Wave.Codes.length) {
            //detailsTable["previous" + (columnIterator - 1)] = details;
            detailsTable.push({details: details, id: ConfigHelper.GetWaveKey(columnIterator - 1)});
        //  qValues.trends.push({distribution: distribution, validN: validN});
        }

        if (columnIterator > Config.Wave.Codes.length && columnIterator <= columnCount){
          //detailsTable["internal" + (columnIterator - Config.Wave.Codes.length -1)] = details;
          detailsTable.push({details: details, id: Config.Comparators.Internal[columnIterator - Config.Wave.Codes.length]});
        //  qValues.inter.push({distribution: distribution, validN: validN});
        }
      }
      tempIt = rowIterator;

      var question : ReportQuestion = new ReportQuestion(allQIds[i]);
  //    ReportHelper.Debug('Before question.Setup');
      question.Setup({label: label, details: detailsTable}, context);
    //  ReportHelper.Debug('After question.Setup: ' + question.details['current'].validN);

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

  static function GetColumnCount(tablaPath){
    switch(tablaPath){
      case 'frodo:MainTable' :
        return Config.Wave.Codes.length + Config.Comparators.Internal.length + Config.Comparators.External.length;

      default : return undefined;
    }
  }
}
