class AutoTester{
  private var report : Report = null;
  private var state : ReportState = null;
  private var confirmit : ConfirmitFacade = null;
  private var log : Logger = null;
  private var user : User = null;

  public function AutoTester(context : Object) {
    this.report = context.report;
    this.state = context.state;
    this.confirmit = context.confirmit;
    this.log = context.log;
    this.user = context.user;
  }

  public function TestQuestions() {
    var qIds : String[] = CollectQuestionIds();
    for(var i = 0; i < qIds.length; i++){
      try{
        new ReportQuestion(qIds[i]);
      }catch(e){
        return false;
      }
    }
    return true;
  }

  private function Debug(message){
    this.log.LogDebug(message);
  }

  private function CollectQuestionIds(){
    var testSubjects : Object = {dimensions: Config.Dimensions, grid: Config.QuestionsGridStructure};
    var questionIds : Object = {};
    Debug("Dimensions : " + testSubjects.dimensions.length);
    for (var i = 0; i < testSubjects.dimensions.length; i++) {
      Debug(i);
      var dimension = testSubjects.dimensions[i];
      if (dimension.Questions !== null){
        Debug("Dim_Questions : " + dimension.Questions.length);
        for (var j = 0; j < dimension.Questions.length; j++) {
          Debug(j);
          if (questionIds[dimension.Questions[j]] === undefined){
            questionIds[dimension.Questions[j]] = dimension.Questions[j];
          }
        }
      }
    }
    Debug("Grid : " + testSubjects.grid.length);
    for (var i = 0; i < testSubjects.grid.length; i++) {
      Debug(i);
      var grid = testSubjects.grid[i];
      if (grid.Qs !== null) {
        Debug("Grid_Questions : " + grid.Qs.length);
        for (var j = 0; j < grid.Qs.length; j++) {
          Debug(j);
          if (questionIds[grid.Qs[j]] === undefined){
            questionIds[grid.Qs[j]] = grid.Qs[j];
          }
        }
      }else {
        if (questionIds[grid.Id] === undefined){
          questionIds[grid.Id] = grid.Id;
        }
      }
    }
    var returnArray : String[] = [];
    Debug("questionIds");
    for(var key in questionIds) {
      Debug("questionIds_Key : " + key);
      returnArray.push(questionIds[key]);
    }
    return returnArray;
  }
}
