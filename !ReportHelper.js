class ReportHelper{
  private var report : Report = null;
  private var state : ReportState = null;
  private var confirmit : ConfirmitFacade = null;
  private var log : Logger = null;
  private var user : User = null;

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
}
