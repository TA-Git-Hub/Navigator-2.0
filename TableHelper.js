class TableHelper{
  var allQIds = MainTable.GetAllGridQuestions();
  private var reportQuestionHT = {};

  static function GetMainTableData(context){
    var columns = {text: context.report.TableUtils.GetColumnValues("source:MainTable", 0),
                   currentResult: context.report.TableUtils.GetColumnValues("source:MainTable", 1),
                   previous: GetPrevious(context)
                 };

    return columns;
  }

  static function GetPrevious(context){
    var previous = Config.Wave.Previous;
    var returnArray = [];
    for(var i = 1; i < previous.length; i++){
      returnArray[i-1] = context.report.TableUtils.GetColumnValues("source:MainTable", i+1);
    }
    return returnArray;
  }

  static function PopulateQuestions(context){
    var columns = GetMainTableData(context);
    for(var i = 0; i < allQIds.length; i++){
      var question : ReportQuestion = new ReportQuestion(allQIds[i]);


      question.Setup();
    }
  }
}
