/**
 * This class serves as a global class. It holds Confirmit properties.
 * It also has some basic methods.
 */
class ReportHelper{
  private static var report : Report = null;
  private static var state : ReportState = null;
  private static var confirmit : ConfirmitFacade = null;
  private static var log : Logger = null;
  private static var user : User = null;
  private static var page = null;
  private static var pageContext = null;
  public static var context = null;

  // all ReportQuestion objects
  private static var questionObject = null;
  private static const textReplace = {questionID: ["CustomTexts"],
                                      placeholder: ["^ClientName()^", "^ClientName2()^"],
                                      replacement: ["ClientName", "ClientName2"]
                                    };

  /**
   * This function starts the ReportHelper on page - allows all scripts to use global properties
   * @param  {object} context wrapper of global properties
   */
  public static function start(context : Object) {
    context = context;
    report = context.report;
    state = context.state;
    confirmit = context.confirmit;
    log = context.log;
    user = context.user;
    page = context.page;
    pageContext = context.pageContext;
  }

  /**
   * This allows for log.debug outside of page scripts
   * @param  {whatever} message works best if String or integer
   */
  public static function debug(message){
    log.LogDebug(message);
  }

  /**
   * This function takes Text and searches it for 'WildCardReplacements'
   * @param  {String} text    question text
   * @param  {Object} context wrapper of global properties
   * @return {String}         question text without 'WildCardReplacements'
   */
  public static function cleanText(text, context){
    var replacement = textReplace.replacement;
    var placeholder = textReplace.placeholder;
    var questionID = textReplace.questionID;
    var returnString = text;

    // for every question
    for (var i = 0; i < questionID.length; i++) {
      // try every placeholder
      for (var j = 0; j < placeholder.length; j++) {
        // if you find it in text
        if (text.indexOf(placeholder[j]) !== -1) {
          var answer = context.report.DataSource.GetProject(Config.dataSources.mainSurvey).GetQuestion(questionID[i]).GetAnswer(replacement[j]);
          // and find it's replacement
          if (answer) {
            // replace it
            var tmpReplacement = answer.Text;
            returnString = text.split(placeholder[j]).join(tmpReplacement);
          }
        }
      }
    }

    return returnString;
  }

  /**
   * This function creates hashtable out of ReportQuestions (they have all the information)
   * @return {Object}      All ReportQuestions
   */
  public static function createQuestionHashtable() {
    var question = TableHelper.populateQuestion(context);
    var returnObject = {};

    for (var i = 0; i < question.length; i++) {
      returnObject[question[i].getID()] = question[i].getJSONString(context);
    }

    return returnObject;
  }

/**
 * This function returns scale of question from survey
 * @param       {String} id survey question ID
 * @returns     {Array}  scale
 */
  public static function getQuestionScale(id){
    return report.DataSource.GetProject(Config.dataSources.mainSurvey).GetQuestion(id).GetScale();
  }


  public static function getDimensionObject(context){
    var dimensionObject = {};
    var allQuestionObject = ReportHelper.getAllQuestionObject();
    var dimensionList = Config.dimensionArray;
    for (var i = 0; i < dimensionList.length; i++){
      var dimension = new ReportDimension(dimensionList[i], allQuestionObject);
      var JSONdimensionObject = dimension.getJSONString(context);
      dimensionObject[dimensionList[i].id] = JSONdimensionObject;
    }
    return dimensionObject;

  }


  public static function getAllQuestionObject(){
    return questionObject;
  }

  public static function setAllQuestionObject(){
    questionObject = ReportHelper.createQuestionHashtable();
  }
}
