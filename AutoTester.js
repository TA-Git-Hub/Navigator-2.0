class AutoTester{
  private var report : Report = null;
  private var state : State = null;
  private var user : User = null;

  public function AutoTester(context : Object) {
    this.report = context.report;
    this.state = context.state;
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

  private function CollectQuestionIds(){
    var testSubjects : Object = {dimensions: Config.Dimensions, grid: Config.QuestionsGridStructure};
    var questionIds : Object = {};
    for (var i = 0; i < testSubjects.dimensions.length; i++) {
      var dimension = testSubjects.dimensions[i];
      if (dimension.Questions.isArray()){
        for (var j = 0; j < dimension.Questions.length; j++) {
          if (questionIds[dimension.Questions[j]] === undefined){
            questionIds[dimension.Questions[j]] = true;
          }
        }
      }
    }
    for (var i = 0; i < testSubjects.grid.length; i++) {
      var grid = testSubjects.grid[i];
      if (grid.Qs !== null) {
        for (var j = 0; j < grid.Qs.length; j++) {
          if (questionIds[grid.Qs[j]] === undefined){
            questionIds[grid.Qs[j]] = true;
          }
        }
      }else {
        if (questionIds[grid.Id] === undefined){
          questionIds[grid.Id] = true;
        }
      }
    }
    var returnArray : String[] = [];
    for(var key in questionIds) {
      if(questionIds[key] === true) {
        returnArray.push(key);
      }
    }
    return returnArray;
  }
}
