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
  private static var allQuestionObject = null;
  private static const textReplace = {questionID: ["CustomTexts"],
                                      placeholder: ["^ClientName()^", "^ClientName2()^"],
                                      replacement: ["ClientName", "ClientName2"]
                                    };

  /**
   * This function starts the ReportHelper on page - allows all scripts to use global properties
   * @param  {object} context wrapper of global properties
   */
  public static function start(input : Object) {
    context = input;
    report = input.report;
    state = input.state;
    confirmit = input.confirmit;
    log = input.log;
    user = input.user;
    page = input.page;
    pageContext = input.pageContext;
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

    allQuestionObject = returnObject;
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


  public static function getDimensionObject(){
    var dimensionObject = {};
    var dimensionList = Config.dimensionArray;
    for (var i = 0; i < dimensionList.length; i++){
      var dimension = new ReportDimension(dimensionList[i], allQuestionObject);
      var jsonDIM = dimension.getJSONString();
      dimensionObject[dimensionList[i].id] = jsonDIM;
    }
    return dimensionObject;
  }

  public static function getAllQuestionObject(){
    return allQuestionObject;
  }

/**-------------------------------------------------------------------------
 * returns question text from RT survey
 * @method getTextRT/getTextSV
 * @param  {String}  qID   ID of Survey question
 * @param  {String}  code  ID of question answer
 * @return {String}
 */

  public static function getTextRT(qID,code){
    var project = report.DataSource.GetProject(Config.dataSources.rtSurvey);
    return getText(project,qID,code)
  };

/*  public static function getTextRT(qID){
    var project = report.DataSource.GetProject(Config.dataSources.rtSurvey);
    var code = null;
    return getText(project,id,code)
  };*/

  /**-------------------------------------------------------------------------
   * returns question text from SV survey
   * @method getTextSV
   * @param  {String}  qID   ID of Survey question
   * @param  {String}  code  ID of question answer
   * @return {String}
   */

/*  public static function getTextSV(id,code){
    var project = report.DataSource.GetProject(Config.dataSources.svSurvey);
    return getText(project,id,code)
  };

  public static function getTextSV(id){
    var project = report.DataSource.GetProject(Config.dataSources.svSurvey);
    var code = null;
    return getText(project,id,code)
  };*/

  /**-------------------------------------------------------------------------
   * Inner function of getTextSV, getTextRT, returns question text from survey
   * @method getText
   * @param  {String}  qID   ID of Survey question
   * @param  {String}  code  ID of question answer
   * @return {String}
   */

  public static function getText(project, qID, code){
    try{
      if (code == null) {
          var question = project.GetQuestion(qID);
          var returnValue = question.HtmlText;
      }
      else {
          var answer : Answer = project.GetQuestion(qID).GetAnswer(code);
          var returnValue = answer.HtmlText;
      }
      return returnValue;
    }
    catch (e) {
      ReportHelper.debug ('[MISSING RESOURCE TEXT: ' + qID + '.' + code + ']');
      return '[MISSING RESOURCE TEXT: ' + qID + '.' + code + ']';
    }
  }

  /**-------------------------------------------------------------------------
   * This function is used to get labels and translations for page
   * @param  {String} pageID id of page we wish to translate
   * @return {Object} object with all the labels needed
   */
  public static function getLabels(pageID){
    var defaultTableHeaders = {'fav': getTextRT(pageID, 'fav'),
                              'unfav': getTextRT(pageID, 'unfav'),
                              'neu': getTextRT(pageID, 'neu'),
                              'trend': getTextRT(pageID, 'trend'),
                              'description': getTextRT(pageID, 'description'),
                              'text': getTextRT(pageID, 'text'),
                              'questionID': getTextRT(pageID, 'questionID'),
                              'distribution': getTextRT(pageID, 'distribution'),
                              'validN': getTextRT(pageID, 'validN')
                            };

    switch (pageID) {
     /* case 'resultsSummary':
        var labels = {tableHeaders: defaultTableHeaders,
                       preamble: getTextRT('pagePreamble', pageID),
                       title: getTextRT('pageTitle', pageID)
                  };

          return labels;
        break;*/
      default:
        var labels = {tableHeaders: defaultTableHeaders,
                       preamble: getTextRT('pagePreamble', pageID),
                       title: getTextRT('pageTitle', pageID)
                  };

          return labels;
    }
  }
  /**-------------------------------------------------------------------------
 * returns in Debug all methods an properties of passed object
 * @method getProperties
 * @param  {Object}   object
 */
static function getProperties(object){
   var myPropertyInfo= object.GetType().GetMethods();
   log.LogDebug("Methods are:--------------------------------------------------------------");
   for (var i = 0; i < myPropertyInfo.length; i++){
    log.LogDebug(myPropertyInfo[i].ToString());}
   var myPropertyInfo= object.GetType().GetProperties();
  log.LogDebug("Properties of confirmit are:--------------------------------------------------");
   for (var i = 0; i < myPropertyInfo.length; i++){
   log.LogDebug(myPropertyInfo[i].ToString());}
}

/**
 * Setting of hierarchy selector
 * @method setReportBase
 * @param  {string}  units separated by coma (1000,1001,1002)
 */
static function setReportBase(unit){
  var stringArray=[];
  var unitArray=unit.split(',');
  for(var i =0; i<unitArray.length; i++){
    stringArray.push(unitArray[i]+'§'+Config.hierarchyName+'§'+Config.parentRelationName);
  }
  user.SetReportBase(stringArray);
}

}
