class ReportHelper{
  private var report : Report = null;
  private var state : ReportState = null;
  private var confirmit : ConfirmitFacade = null;
  private var log : Logger = null;
  private var user : User = null;

  public static function Start(context : Object) {
    this.report = context.report;
    this.state = context.state;
    this.confirmit = context.confirmit;
    this.log = context.log;
    this.user = context.user;
  }

  public static function Debug(message){
    this.log.LogDebug(message);
  }

  public static function GetText(project, questionId, context){
    var question = context.report.DataSource.GetProject(project).GetQuestion(questionId);
    return question.Title;
  }
}
