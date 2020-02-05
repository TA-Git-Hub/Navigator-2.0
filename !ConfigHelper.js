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
    const allGridObject = Config.questionsGridStructure;
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
}
