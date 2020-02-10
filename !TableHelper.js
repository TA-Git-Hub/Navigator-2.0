/**
 * This class is meant for working with tables
 */
class TableHelper{
  static var allQuestionID = ConfigHelper.getQuestionArray();
  private var reportQuestionHT = {};

  /**
   * This function maps pageID to it's table
   * @param       {[type]} pageId [description]
   */
  static function tableMapping(pageID){

    switch(pageID){
      case 'frodo' : return 'MainTable';
      case 'gandalf' : return 'MainTable';
      case 'boromir' : return 'TestTable';
      case 'theoden' : return 'MainTable';

      default : return undefined;
    }
  }

  /**
   * This function returns ReportQuestion based on what page you are currently using
   * These ReportQuestion are filled with all infomation from table
   * @param  {Object} context  wrapper of global properties
   * @return {Array}         array of ReportQuestion
   */
  static function populateQuestion(context){
    // create map where questionID is key and Scale length is value
    var questionMap = createQuestionMap(context);
    // get the path of table we want
    var tablePath = context.page.CurrentPageId + ':' + tableMapping(context.page.CurrentPageId);
    // all question texts from table
    var questionText = context.report.TableUtils.GetRowHeaderCategoryTitles(tablePath);
    var returnArray = [];
    var rowIterator = 0;
    var tempIt = 0;
    var columnCount = getColumnCount(tablePath);

    // for questions
    for (var i = 0; i < allQuestionID.length; i++) {
      var detailTable = [];
      // start at 1 - Confirmit indexes from 1 - go over columns
      for (var columnIterator = 1; columnIterator <= columnCount; columnIterator++) {
        rowIterator = tempIt;
        // get rid of 'WildCardReplacements'
        var label = ReportHelper.cleanText(questionText[rowIterator][1], context);
        // prepare question detail
        var details = new ReportDetails(allQuestionID[i]);

        var column = context.report.TableUtils.GetColumnValues(tablePath, columnIterator);
        // get data from the column segment
        var distribution = getDistribution(rowIterator, questionMap[allQuestionID[i]], column, context);
        // update current column position with question answer scale length
        rowIterator += questionMap[allQuestionID[i]];
        var validN = column[rowIterator].Value;
        // for validN row
        rowIterator += 1;

        // set data in details that weren't set yet
        details.setup({distribution: distribution, validN: validN}, context);

        // if we are in trend column
        if (columnIterator <= Config.wave.codes.length) {
            detailTable.push({details: details, id: ConfigHelper.getWaveID(columnIterator - 1)});
        }

        // if we are past trend column and below end - internal column
        if (columnIterator > Config.wave.codes.length && columnIterator <= columnCount){
          detailTable.push({details: details, id: ConfigHelper.getInternalID(columnIterator - Config.wave.codes.length - 1)});
        }
      }
      tempIt = rowIterator;

      // we have all the information needed, create question and fill it
      var question : ReportQuestion = new ReportQuestion(allQuestionID[i]);
      question.setup({label: label, details: detailTable}, context);

      returnArray.push(question);
    }
    return returnArray;
  }

  /**
   * This function creates map - 'questionID' : 'number of answers'
   * @param  {Object} context wrapper of global properties
   * @return {Object}         Map
   */
  static function createQuestionMap(context){
    var questionMap = {};
    var question = Config.questionGridStructure;

    for(var i = 0; i < question.length; i++){
      var questionScale = ReportHelper.getQuestionScale(question[i].id).length;

      if(question[i].question === null){
        questionMap[question[i].id] = questionScale;
      }
      else{
        for(var j = 0; j < question[i].question.length; j++){
          questionMap[question[i].question[j]] = questionScale;
        }
      }
    }
    return questionMap;
  }

  /**
   * Thi function takes column from certain point and takes information from it until certain point
   * @param  {[integer]} rowIterator     Start point
   * @param  {[integer]} numberOfAnswers End point
   * @param  {[Array]} column           data
   * @param  {[Object]} context         wrapper of global properties
   * @return {[Object]}                 distribution
   */
  static function getDistribution(rowIterator, numberOfAnswers, column, context){
    var distribution = [];

    for(var i = 0; i < numberOfAnswers; i++){
      distribution.push(column[rowIterator + i].Value);
    }

    return distribution;
  }

  /**
   * This function returns number of columns in table based on table name and it's page
   * @param  {[String]} tablePath pageID:tableName
   * @return {[integer]}           number of columns
   */
  static function getColumnCount(tablePath){
    switch(tablePath){
      case 'frodo:MainTable' :
        return Config.wave.codes.length + Config.comparators.internals.length + Config.comparators.externals.length;

      default : return undefined;
    }
  }
}
