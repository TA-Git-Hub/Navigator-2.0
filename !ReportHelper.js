class ReportHelper{
  private static var report : Report = null;
  private static var state : ReportState = null;
  private static var confirmit : ConfirmitFacade = null;
  private static var log : Logger = null;
  private static var user : User = null;

  public static function Start(context : Object) {
    report = context.report;
    state = context.state;
    confirmit = context.confirmit;
    log = context.log;
    user = context.user;
  }

  public static function Debug(message){
    log.LogDebug(message);
  }

  public static function GetText(project, questionId, context){
    var question = context.report.DataSource.GetProject(project).GetQuestion(questionId);
    return question.Title;
  }

  public static function QuestionHashtable(context) {
    var questions = TableHelper.PopulateQuestions({report: report});
    var returnObject = {};
    for(var i = 0; i < questions.length; i++){
      returnObject[questions[i].GetId()] = questions[i].GetJSONString(context);
    }
    return returnObject;
  }

  public static function getDimensionObject(context){
    var dimensions = {};
    //load questions object
    var allQ = ReportHelper.QuestionHashtable(context);
    //list of dimensions and mapped questions
    var dimensionList = Config.Dimensions;
    for (var i = 0; i < dimensionList.length; i++){
      var dimensionObject = new ReportDimension(dimensionList[i], allQ, context);
      var JSONdimensionObject = dimensionObject.GetJSONString(context);
      dimensions[dimensionList[i].Id] = JSONdimensionObject;
    }
    return dimensions;
  }
}
