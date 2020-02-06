class ReportDimension {

  var questionObject = {}; //Array for question objects
  var id = "";
  var label = "";
  var description = "";
  var flags = {}; // to-do SO, KDA, suppression... TRUE/FALSE
  var apLink = "";
  var results = {};

  /**---------------------------------------------------------------------
 * [ReportDimension description]
 * @param       {[ReportDimension]} dimension  [description]
 * @param       {[Object]} allQuestion [object with all questions and their results]
 * @constructor
 */
public function ReportDimension(dimension, allQuestionObject) {
    this.id = dimension.id;
    this.label = this.getDimLabel();
    this.description = this.getDimDescription();
    loadQuestionsToDimension(dimension, allQuestionObject);
    calculateDimResult();
  }


/**---------------------------------------------------------------------
 * [loadQuestionsToDimension description]
 * @param  {[type]} dim         [description]
 * @param  {[type]} allQuestion [description]
 * @return {[type]}             [description]
 */
  function loadQuestionsToDimension(dim, allQuestionObject) {
    for (var i = 0; i < dim.question.length; i++) {
      var qID = dim.question[i];
      this.questionObject[qID] = allQuestionObject[qID];
    }
  }

/**---------------------------------------------------------------------
 * [calculateDimResult description]
 * @method calculateDimResult
 * @return {[type]}                   [description]
 */
  function calculateDimResult() {
    for (var i = 0; i < Config.wave.codes.length; i++) {
      var comparatorID = ConfigHelper.getWaveID(i);
      this.getScores(comparatorID);
    }
    for (var i = 0; i < Config.comparators.internals; i++) {
      var comparatorID = 'internal' + (i);
      this.getScore(comparatorID);
    }
  }


/**---------------------------------------------------------------------
 * [getScores description]
 * @method getScores
 * @param  {[type]}  comparatorID [description]
 */
  function getScore(comparatorID) {
    this.results[comparatorID] = {}
    var statisticArray = ['fav', 'neu', 'unfav'];

    for (var j = 0; j < statisticArray.length; j++) {
      var statistic = statisticArray[j];
      this.detail[comparatorID][statistic] = setDimScore(statistic, comparatorID);
    }
    this.detail[comparatorID]['validN'] = setDimValidN(comparatorID);
    this.detail[comparatorID]['comp'] = {};
  }


  /**---------------------------------------------------------------------
   * returns average score of questions in dimension (Confirmit NVG 1.0 methodology)
   * @method setDimScore
   * @param  {string}    statistic        [type of statistic]
   * @param  {string}    comparatorID [wave, level]
   */

  function setDimScore(statistic, comparatorID) {
    var total = 0;
    var count = 0;
    for (var question in this.questionObject) {
      total = total + questionObject[question].detail[comparatorID][statistic];
      count = count + 1;
    }
    return Math.round(total / count);
  }


  /**---------------------------------------------------------------------
   * Returns max validN of dimenison questions (Confirmit NVG 1.0 methodology)
   * @method setDimValidN
   * @param  {string}    comparatorID [wave, level]
   */
    function setDimValidN (comparatorID) {
      var maxValidN = 0;
      for (var question in this.questionObject) {
      var questionValidN = questionObject[question].detail[comparatorID]['validN'];
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

  function getDimDescription() {
    return Config.wave.code[0];
  }



/**---------------------------------------------------------------------
 *  NOT READY Gets dimension label from resource text survey
 * @method getDimLabel
 * @return {String}
 */

  function getDimLabel() {
    return 'Planice je vesnice';
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
      detail: this.detail,
      questionObject: this.questionObject,
      flag: this.flag,
      apLink: this.apLink
    };
  }
}
