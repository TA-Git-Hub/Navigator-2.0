/**
 * This class contains methods to process information inside Config
 */
class ConfigHelper{
  /**
   * This function goes over Config.questionsGridStructure, ignores Grids and saves questionIDs
   * @return {[Array]} String IDs of questions
   */
  public static function getQuestionArray(){
    //Array with all GRIDs
    const allGridObject = Config.questionGridStructure;
    var allQuestion = [];

    //Iterate through each Grid question.
    //If the Grid has no question, push Grid ID to the allQuestions array, otherwise push question
    for (var i = 0; i < allGridObject.length; i++) {
      if (allGridObject[i].question !== null) {
        // this grid has questions inside it, we need those
    	 	for (var j = 0; j < allGridObject[i].question.length; j++) {
          allQuestion.push(allGridObject[i].question[j]);
        }
      }
      else {
        allQuestion.push(allGridObject[i].id);
      }
    }

    return allQuestion;
  }

  public static function getNSQArray(getRanking){
    var nsq = Config.nsq;
    var questionIDArray = []

    for (var list in nsq) {
      // we want only ranking questions, skip everything else
      if (getRanking === true && list !== 'ranking') {
        continue;
      }
      if (nsq[list].length > 0) {
        for (var i = 0; i < nsq[list].length; i++) {
          questionIDArray.push(nsq[list][i].id);
        }
      }
    }

    return questionIDArray;
  }

  /**
   * This function returns ID of wave based on it's position in Array
   * @param  {integer} index
   * @return {String}  ID
   */
  public static function getWaveID(index){
    if (index === 0){
      return "current";
    }
    if (index > 0){
      return "previous" + index;
    }
  }

  /**
   * This function returns ID of internal based on it's position in Array
   * @param  {[integer]} index
   * @return {[String]}      ID
   */
  public static function getInternalID(index){
    if (index >= 0) {
      return "internal" + index;
    }
  }
}
