class MainTable{

//Call this function from the aggregated table
  static function GetTable(table, report){
    const qs = MainTable.GetAllQuestions();
    const trendInfo = Config.Wave

    var X = [];
    for(var i = 0; i < qs.length; i++){
      X.push(qs[i] + '{title:true; totals:true}')
    }
    //There is no config for trend yet, so there is just this easy array of all years
    var trendYears = trendInfo.Current.concat(trendInfo.Previous)
    var Y = [];

    for(var j = 0; j < trendYears.length; j++){
      Y.push('[SEGMENT]{' +
              'label: "'+ trendYears[j] +'";' +
              'hideheader:false;' +
              'expression:' + report.TableUtils.EncodeJsString(trendInfo.VariableId + '=' + trendYears[j])+
              '}');
    }

    //Horizontal & vertical expression function
    //Config - Add wave, survey IDs (done)
    //Prepare TODO list (up to Filda)
    //Question texts - where are they taken from in curr navi

    var rows = X.join("+");
    var columns = Y.join("+");
    var expr = [rows, columns].join('^');

    table.AddHeaders(report, Config.DataSources.MainSurvey, expr);
}

  static function GetAllQuestions(){
    //Array with all GRIDs
    const allGridObjects = Config.QuestionsGridStructure;
    var allQuestions = [];

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
}