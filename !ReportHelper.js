class ReportHelper{
  private static var report : Report = null;
  private static var state : ReportState = null;
  private static var confirmit : ConfirmitFacade = null;
  private static var log : Logger = null;
  private static var user : User = null;
  private static var page = null;
  private static const textReplace = {questionId: "CustomTexts", placeholders: ["^ClientName()^", "^ClientName2()^"], replacements: ["ClientName", "ClientName2"]};

  public static function Start(context : Object) {
    report = context.report;
    state = context.state;
    confirmit = context.confirmit;
    log = context.log;
    user = context.user;
    page = context.page;
  }

  public static function Debug(message){
    log.LogDebug(message);
  }

  public static function CleanText(text, context){
    var replacements = textReplace.replacements;
    var placeholders = textReplace.placeholders;
    var returnString = text;

    for(var i = 0; i < placeholders.length; i++){

      if(text.indexOf(placeholders[i]) !== -1){
        var answer = context.report.DataSource.GetProject(Config.DataSources.MainSurvey).GetQuestion(textReplace.questionId).GetAnswer(replacements[i]);
        if(answer){
          var tmpReplacement = answer.Text;
          returnString = text.split(placeholders[i]).join(tmpReplacement);
        }
      }

    }
    return returnString;


  }


  public static function QuestionHashtable() {
    var questions = TableHelper.PopulateQuestions({report: report, page: page});

    var returnObject = {};
    for(var i = 0; i < questions.length; i++){
      returnObject[questions[i].GetId()] = questions[i].GetJSONString(context);
    }
    return returnObject;
  }


  public static function GetQuestionScale(id){
    return report.DataSource.GetProject(Config.DataSources.MainSurvey).GetQuestion(id).GetScale();

  //pravdepodobne se nepouziva
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
