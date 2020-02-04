class ConfigHelper{
  public static function GetQuestions(){
    //Array with all GRIDs
    const allGridObjects = Config.QuestionsGridStructure;
    var allQuestions = [];

    //Iterate through each Grid question. If the Grid has no QS, push Grid ID to the allQuestions array, otherwise push QS
    for(var i = 0; i < allGridObjects.length; i++){
      if(allGridObjects[i].Qs != null){
    	 	for(var j = 0; j < allGridObjects[i].Qs.length; j++){
          allQuestions.push(allGridObjects[i].Qs[j]);
        }
      }else{
        allQuestions.push(allGridObjects[i].Id)
      }
    }
    return allQuestions;
  }

  public static function GetWaveKey(index){
    if(index === 0){
      return "current";
    }
    if(index > 0){
      return "previous" + index;
    }
  }
}
