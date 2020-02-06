/**
 * This class serves for testing of provided settings
 * checks wheter the project can be created using them
 */
class AutoTester{
  private var report : Report = null;
  private var state : ReportState = null;
  private var confirmit : ConfirmitFacade = null;
  private var log : Logger = null;
  private var user : User = null;

/**
 * Create object of Autotester and set it's properties via the global properties
 * @param       {Object} context wrapper of global properties
 * @constructor
 */
  public function AutoTester(context : Object) {
    this.report = context.report;
    this.state = context.state;
    this.confirmit = context.confirmit;
    this.log = context.log;
    this.user = context.user;
  }

  /**
   * This function tests question IDs in Config and tries whether they are present in survey
   * @return {[Boolean]} true if all ids found / false if any ID not found or any other issue
   */
  public function testQuestion() {
    var qID : String[] = collectQuestionID();
    for(var i = 0; i < qID.length; i++){
      try{
        new ReportQuestion(qID[i]);
      }catch(e){
        return false;
      }
    }
    return true;
  }

/**
 * This function gathers all the question IDs provided via Config
 * @return {[type]} [description]
 */
  private function collectQuestionID(){
    var testSubject : Object = {dimensions: Config.dimensionArray, grid: Config.questionGridStructure};
    var questionID : Object = {};

    // get IDs from dimensions
    for (var i = 0; i < testSubject.dimensions.length; i++) {
      var dimension = testSubject.dimensions[i];
      if (dimension.question !== null){
        for (var j = 0; j < dimension.question.length; j++) {
          if (questionID[dimension.question[j]] === undefined){
            questionID[dimension.question[j]] = dimension.question[j];
          }
        }
      }
    }

    //  get IDs from grid structure
    for (var i = 0; i < testSubject.grid.length; i++) {
      var grid = testSubject.grid[i];
      if (grid.question !== null) {
        for (var j = 0; j < grid.question.length; j++) {
          if (questionID[grid.question[j]] === undefined){
            questionID[grid.question[j]] = grid.question[j];
          }
        }
      }
      else {
        if (questionID[grid.id] === undefined){
          questionID[grid.id] = grid.id;
        }
      }
    }

    // convert hashtable to Array
    var returnArray = [];
    for(var key in questionID) {
      returnArray.push(questionID[key]);
    }
    return returnArray;
  }
}
