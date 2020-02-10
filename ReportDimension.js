class ReportDimension {

  var questionObject = {};//object with all questions from this dimension and references to question objects
  var id = "";
  var label = "";
  var description = "";
  var tier = "1"
  var flags = {dimensionScore: true}; // to-do SO, KDA, suppression... TRUE/FALSE
  var apLink = "";
  var detail = {};

  /**---------------------------------------------------------------------
 * @constructor
 * @param       {[ReportDimension]} dimension  [description]
 * @param       {[Object]} allQuestion [object with all questions and their results]
 */
public function ReportDimension(dimension, allQuestionObject) {
    this.id = dimension.id;
    this.label = getDimLabel(this.id);
    this.description = getDimDescription(this.id);
    loadQuestionToDimension(dimension, allQuestionObject);
    calculateDimResult();
  }


/**---------------------------------------------------------------------
 * assign question objects to dimension instance
 * @param  {Object} dimension selected dimension from config dimension list(has attributes "id" and "question")
 * @param  {Object} allQuestionObject results of all questions
 */
  function loadQuestionToDimension(dimension, allQuestionObject) {
    for (var i = 0; i < dimension.question.length; i++) {
      var questionID = dimension.question[i];
      this.questionObject[questionID] = allQuestionObject[questionID];
    }
  }

/**---------------------------------------------------------------------
 * Set dimension values for all trends and internal comparators *
 * @method calculateDimResult
 */
  function calculateDimResult() {
    //Trends
    for (var i = 0; i < Config.wave.codes.length; i++) {
      var comparatorID = ConfigHelper.getWaveID(i);
      getScore(comparatorID);
    }
    //Internal comparators
    for (var i = 0; i < Config.comparators.internals.length; i++) {
      var comparatorID = ConfigHelper.getInternalID(i);
      getScore(comparatorID);
    }
  }


/**---------------------------------------------------------------------
 * Inner function of calculateDimResults
 * Loops through statistics and sets dim values
 * @method getScores
 * @param  {[type]}  comparatorID [description]
 */
  function getScore(comparatorID) {
    this.details[comparatorID] = {};
    var statisticArray = ['fav', 'neu', 'unfav'];

    for (var j = 0; j < statisticArray.length; j++) {
      var statistic = statisticArray[j];
      this.details[comparatorID][statistic] = setDimScore(statistic, comparatorID);
    }
    this.details[comparatorID]['validN'] = setDimValidN(comparatorID);
    this.details[comparatorID]['comp'] = {};
  }


  /**---------------------------------------------------------------------
   * Returns average score of questions in dimension
   * (Confirmit NVG 1.0 methodology)
   * @method setDimScore
   * @param  {string}    statistic        [type of statistic]
   * @param  {string}    comparatorID [wave, level]
   */

  function setDimScore(statistic, comparatorID) {
    var total = 0;
    var count = 0;
    for (var question in this.questionObject) {
      total = total + this.questionObject[question].details[comparatorID][statistic];
      count = count + 1;
    }
    return Math.round(total / count);
  }


  /**---------------------------------------------------------------------
   * Returns max validN of dimenison questions
   * (Confirmit NVG 1.0 methodology)
   * @method setDimValidN
   * @param  {string}    comparatorID [wave, level]
   */
    function setDimValidN (comparatorID) {
      var maxValidN = 0;
      for (var question in this.questionObject) {
      var questionValidN = this.questionObject[question].details[comparatorID]['validN'];
      if (questionValidN > maxValidN) {
        maxValidN = questionValidN;
      }
      return maxValidN;
    }
  }


  /**---------------------------------------------------------------------
   * NOT READY --- Gets dimension description text from resource text survey
   * @method getDimDescription
   * @return {String}
   */

  function getDimDescription(dimensionID) {
    return ReportHelper.getTextRT('dimensionDescription',dimensionID)+' in Painnice';
  }



/**---------------------------------------------------------------------
 *  NOT READY Gets dimension label from resource text survey
 * @method getDimLabel
 * @return {String}
 */

  function getDimLabel(dimensionID) {
    return ReportHelper.getTextRT('dimension',dimensionID);
  }

/**---------------------------------------------------------------------
 * Returns object in serializable format
 * @param  {Object} context confirmit functions
 * @return {Object}
 */
  function getJSONString() {
    return {
      id: this.id,
      label: this.label,
      description: this.description,
      details: this.details,
      questionObject: this.questionObject,
      tier: this.tier,
      flags: this.flags
      apLink: this.apLink
    };
  }
}
