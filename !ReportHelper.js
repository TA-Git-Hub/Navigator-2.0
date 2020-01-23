class ReportHelper{
  private static var report : Report = null;
  private static var state : ReportState = null;
  private static var confirmit : ConfirmitFacade = null;
  private static var log : Logger = null;
  private static var user : User = null;
  private static const textReplace = {questionId: "CustomTexts", placeholder1: "^ClientName()^", placeholder2: "^ClientName2()^",
                                                                 replacement1: "ClientName", replacement2: "ClientName2"};

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

  public static function CleanText(text, context){
    var replacement = null;
    var returnString = text;
    if(text.indexOf(textReplace.placeholder1) !== -1){
      replacement = context.report.DataSource.GetProject(Config.DataSources.MainSurvey).GetQuestion(textReplace.questionId).GetAnswer(textReplace.replacement1).Text;
      returnString = text.split(textReplace.placeholder1).join(replacement);
    }

    if(text.indexOf(textReplace.placeholder2) !== -1){
      replacement = context.report.DataSource.GetProject(Config.DataSources.MainSurvey).GetQuestion(textReplace.questionId).GetAnswer(textReplace.replacement2).Text;
      returnString = text.split(textReplace.placeholder2).join(replacement);
    }

    return returnString;


  }

  public static function QuestionHashtable() {
    var questions = TableHelper.PopulateQuestions({report: report});
    var returnObject = {};
    for(var i = 0; i < questions.length; i++){
      returnObject[questions[i].GetId()] = questions[i].GetJSONString();
    }
    return returnObject;
  }
}
