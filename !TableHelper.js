/**
 * This class is meant for working with tables
 */
class TableHelper{
  static var allSingleID = ConfigHelper.getQuestionArray();
  static var allNSQid = ConfigHelper.getNSQArray(false);
  static var allRankingID = ConfigHelper.getNSQArray(true);
  private var reportQuestionHT = {};


  static function gatherQuestions(context, type){

    var questionMap = createQuestionMap(context, type);
    var tablePath = 'dataPage:'; // pageID

    /**
     * In this switch we prepare some important things listed below
     *
     *  tablePath - set the ID of table, we want to use from dataPage
     *  allQuestion - get the IDs of questions, which have been used in this table
     *  subColumnCount - for example Ranking questions have by default some subColumnCount - let's declare their pressence for our code
     */
    switch (type) {
      case 'NSQ':
        tablePath += 'NSQ'; // tableID
        var allQuestion = allNSQid;
        var subColumnCount = 0;  // none
        break;

      case 'Ranking':
        tablePath += 'Ranking'; // tableID
        var allQuestion = allRankingID;
        var subColumnCount = 1; // some
        break;
      // grid -- single -- questions
      default:
        tablePath += 'MainTable'; // tableID
        var allQuestion = allSingleID;
        var subColumnCount = 0; // none

    }

    var questionText = context.report.TableUtils.GetRowHeaderCategoryTitles(tablePath);
    var returnArray = [];
    var rowIterator = 0;
    var tempIt = rowIterator;
    var columnCount = getColumnCount(tablePath);

    // for questions
    for (var i = 0; i < allQuestion.length; i++) {
      var detailTable = [];
      var question : ReportQuestion = new ReportQuestion(allQuestion[i]);

      // we have some subColumnCount - Yay! (add +1 for totals column), but in case we don't let's improve that Zero to One, for math purposes
      subColumnCount = (subColumnCount > 0) ? (context.report.DataSource.GetProject(Config.dataSources.mainSurvey).GetQuestion(allQuestion[i]).GetScale().length + 1) : 0;

      // get answer texts
      var distributionTexts = (question.getType() === 'Single') ? null : getDistributionText(allQuestion[i]);

      // start at 1 - Confirm it indexes from 1 - go over columns
      for (var columnIterator = 1; columnIterator <= columnCount; columnIterator++) {
        rowIterator = tempIt;

        // get rid of 'WildCardReplacements'
        // most question types have their text on position text[row][1]
        // numeric types have their text on position text[row][0] -- this is due to them 'not having' answers
        try{
          var textToClean = questionText[rowIterator][1];
        }
        catch(e){
          var textToClean = questionText[rowIterator][0];
        }

        var label = ReportHelper.cleanText(textToClean, context);
        // prepare question detail
        var details = new ReportDetails(allQuestion[i]);

        var column = context.report.TableUtils.GetColumnValues(tablePath, columnIterator);
        // get data from the column segment
        // note that if we have table with subcolumns, we switch to a function which iterates subcolumns
        var distribution = (subColumnCount === 0) ? getDistribution(rowIterator, questionMap[allQuestion[i]], column, context)
                                                  : iterateTheSubColumn(rowIterator, questionMap[allQuestion[i]], columnIterator, subColumnCount, tablePath, context);
        // update current column position with question answer scale length
        rowIterator += questionMap[allQuestion[i]];
        var validN = column[rowIterator].Value;
        // for validN row
        rowIterator += 1;

        // set data in details that weren't set yet
        details.setup({distribution: distribution, validN: validN, distributionTexts: distributionTexts}, context);

        // if we are in trend column
        if (columnIterator <= Config.wave.codes.length) {
            if(type === 'NSQ' || type === 'Ranking'){
              var questionType = question.getType();

              if (Config.nsq[questionType][allQuestion[i]].showTrend === false) {
                continue;
              }
            }

            detailTable.push({details: details, id: ConfigHelper.getWaveID(columnIterator - 1)});
        }

        // if we are past trend column and below end - internal column
        if (columnIterator > Config.wave.codes.length && columnIterator <= columnCount){
          detailTable.push({details: details, id: ConfigHelper.getInternalID(columnIterator - Config.wave.codes.length - 1)});
        }
      }
      tempIt = rowIterator;

      // we have all the information needed, setup question
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
  static function createQuestionMap(context, type){
    var questionMap = {};

    switch (type) {
        case 'NSQ':
          for (var i = 0; i < allNSQid.length; i++) {
            var questionScale = ReportHelper.getQuestionScale(allNSQid[i]).length;
            var type = context.report.DataSource.GetProject(Config.dataSources.mainSurvey).GetQuestion(allNSQid[i]).QuestionType;

            // for some reason numeric questions return scale length = 0; that would mess up with our methology
            // as there is surely 1 answer for numeric questions we apply a little cheat here
            if (type === QuestionType.Numeric){
              questionScale = 1;
            }
            questionMap[allNSQid[i]] = questionScale;
          }
        break;

        case 'Ranking':
          for (var i = 0; i < allRankingID.length; i++) {
            var questionScale = ReportHelper.getQuestionScale(allRankingID[i]).length;
            questionMap[allRankingID[i]] = questionScale;
          }
        break;

      default:
      // standard -- single -- grid questions
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
    }

    return questionMap;
  }

  /**
   * We use mostly questions of type SINGLE - this function is meant mainly for almost every other type [ranking, multi, multiNumeric, ...]
   * As the other types need to report more than answer data, but also the answer text
   *
   * NOTE: I'm not sure if this works with translations - further testing needed!!!
   * @param  {[String]} id Question ID
   * @return {[String Array]}    Answer texts
   */
  static function getDistributionText(id){
    var scale = ReportHelper.getQuestionScale(id);
    var textArray = [];

    for (var i = 0; i < scale.length; i++) {
      textArray.push(scale[i].Text);
    }

    return textArray;
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

    for (var i = 0; i < numberOfAnswers; i++){
      distribution.push(column[rowIterator + i].Value);
    }

    return distribution;
  }

  static function iterateTheSubColumn(rowIterator, numberOfAnswers, mainColumnIndex, subColumnCount, tablePath, context){
    var startIndex = (mainColumnIndex-1)*subColumnCount + 1;
    var endIndex = (mainColumnIndex-1)*subColumnCount + subColumnCount;

    var distribution = [];

    for (var i = startIndex; i <= endIndex; i++) {
      var column = context.report.TableUtils.GetColumnValues(tablePath, i);
      distribution.push(getDistribution(rowIterator, numberOfAnswers, column, context));
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
      case 'dataPage:Ranking':
      case 'dataPage:NSQ':
      case 'dataPage:MainTable' :
        return Config.wave.codes.length + Config.comparators.internals.length + Config.comparators.externals.length;

      default : return undefined;
    }
  }
}
