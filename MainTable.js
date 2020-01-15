class MainTable{
//Notes section until we have TODO

/*
@@ Description - Call this function from the aggregated table
@@ Entry parameters - context - object, properties: table, report, confirmit, user, state, log
*/
  static function GetTable(context){
    const report = context.report;
    const table = context.table;

    const qs = GetAllGridIds();
    const trendInfo = Config.Wave;

    var X = [];
    var Y = [];

//Get rows
    for(var i = 0; i < qs.length; i++){
      X.push(GetHorizontalExpression(qs[i], {title: 'true', totals: 'true'}));
    }

//Get columns
    for(var j = 0; j < trendInfo.Codes.length; j++){
      Y.push(GetVerticalExpression({label:trendInfo.Codes[j], variableId: trendInfo.VariableId, filterExpression:trendInfo.Codes[j], hideheader: 'false', headerType: 'SEGMENT'}, context));
    }

    var rows = X.join("+");
    var columns = Y.join("+");
    var expr = [rows, columns].join('^');

    table.AddHeaders(report, Config.DataSources.MainSurvey, expr);
}

/*
@@ Description: This function returns smartview syntax for columns, probably not the solution that would work for all cases
@@ Entry parameters: properties - object, properties: label, variableID (string), filterExpression, hideheader (string) 'true' or 'false', headerType (string) 'SEGMENT', 'CONTENT' etc.
@@					 context - object, properties: table, report, confirmit, user, state, log
*/
  static function GetVerticalExpression(properties, context){
      const report = context.report;

      return ('['+ properties.headerType +']{' +
              'label: "'+ properties.label +'";' +
              'hideheader:' + properties.hideheader + ';' +
              'expression:' + report.TableUtils.EncodeJsString(properties.variableId + '="' + properties.filterExpression + '"')+
              '}');
  }

/*
@@ Description: This function returns possibly the easiest smartview syntax for rows
@@ Entry parameters: question - string, id of a question from Main survey
@@					 properties: object, properties: title (string), totals (string) - 'true' or 'false'
*/
  static function GetHorizontalExpression(question, properties){
    return (question + '{title:' + properties.title + '; totals:' + properties.totals+'}');
  }

/*
@@ Description: This function returns an array with all questions found in Questions Grid Structure variable in Config
*/
/*  static function GetAllGridQuestions(){

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
  }*/
/*
@@ Description: Function that returns array of grid Ids, and/or non-grid questions
*/
  static function GetAllGridIds(){
//Array with all GRIDs
    const allGridObjects = Config.QuestionsGridStructure;
    var allIds= [];

    for(var i = 0; i < allGridObjects.length; i++){
      allIds.push(allGridObjects[i].Id);
    }

    return allIds;
  }
}
