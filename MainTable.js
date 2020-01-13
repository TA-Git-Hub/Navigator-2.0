class MainTable{

//Call this function from the aggregated table
  static function GetTable(table, report){
    var qs = MainTable.GetAllQuestions();

    var X = [];
    for(var i = 0; i < qs.length; i++){
      X.push(qs[i] + '{title:true; totals:true}')
    }
    //There is no config for trend yet, so there is just this easy array of all years
    var trendYears = [2016,2015,2014,2013]
    var Y = [];

    for(var j = 0; j < trendYears.length; j++){
      Y.push('[SEGMENT]{' +
              'label: "'+ trendYears[j] +'";' +
              'hideheader:false;' +
              'expression:' + report.TableUtils.EncodeJsString('Wave="' + trendYears[j] +'"')+
              '}');
    }

    //Horizontal & vertical expression function
    //Config - Add wave, survey IDs
    //Prepare TODO list
    //Question texts - where are they taken from in curr navi

    var rows = X.join("+");
    var columns = Y.join("+");
    var expr = [rows, columns].join('^');

    table.AddHeaders(report, Config.dataSources.MainSurvey, expr);
}

  static function GetAllQuestions(){
    //Array with all GRIDs
    var allGridObjects = Config.QuestionsGridStructure;
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
