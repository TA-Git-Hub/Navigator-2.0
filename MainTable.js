class MainTable{
//Notes section until we have TODO

    //Horizontal & vertical expression function (done)
    //Config - Add wave, survey IDs (done)
    //Prepare TODO list (up to Filda)
    //Question texts - where are they taken from in curr navi (done) - Don't use questions one by one, use the whole GRID
    //Added context (copied from Confirmit's AP) - Should we use context as entry arguments all the time? Even for functions you don't really expect to use it?

/*
@@ Description - Call this function from the aggregated table, it will generate this awesome table
@@ Entry parameters - context - object, properties: table, report, confirmit, user, state, log
*/
  static function GetTable(context){
    const report = context.report;
    const table = context.table;
    const log = context.log;

    const qs = GetAllGridIds();
    const trendInfo = Config.Wave;

    var rows = [];
    var columns = [];

//Get rows - Grid Questions + non-grid questions
    for(var i = 0; i < qs.length; i++){
      rows.push(GetHorizontalExpression(qs[i], {title: 'true', totals: 'true'}));
    }

//Get columns for trend
    for(var j = 0; j < trendInfo.Codes.length; j++){
      var filter = GetFilterExpression({variableId: trendInfo.VariableId, filterExpression:trendInfo.Codes[j]});
      columns.push(GetVerticalExpression({label:trendInfo.Codes[j], filterExpression:filter, hideheader: 'false', headerType: 'SEGMENT'}, context));
    }

    var internalColumnsOrgcodes = [];
    var internalColumnsWave = [];
    var orgcodes = [1000,1001,1002,1003];
    var orgcodeSettings = Config.Hierarchy;
    var waveFilter = GetFilterExpression({variableId: trendInfo.VariableId, filterExpression: trendInfo.Codes[0]});

//Get columns for hierarchy orgcodes filtered by current wave
    for(var k = 0; k < orgcodes.length; k++){
        var hierarchyFilter = GetFilterExpression({variableId: orgcodeSettings.VariableId, filterExpression: orgcodes[k]});

        internalColumnsOrgcodes.push(GetVerticalExpression({label:'Internal orgcode: ' + orgcodes[k], filterExpression:hierarchyFilter, hideheader: 'false', headerType: 'SEGMENT'}, context));
        internalColumnsWave.push(GetVerticalExpression({label:'Current wave: ' + trendInfo.Codes[0], filterExpression:waveFilter, hideheader: 'false', headerType: 'SEGMENT'}, context));
        }

    var internalColumnsJoined = [];
    for(var l = 0; l < internalColumnsOrgcodes.length; l++){
		internalColumnsJoined.push([internalColumnsOrgcodes[l], internalColumnsWave[l]].join("/"));
    }

//Create one big syntax for table
    rows = rows.join("+");
    columns = columns.join("+");
    internalColumnsJoined = internalColumnsJoined.join("+");

    var allColumns = [columns, internalColumnsJoined].join("+");
    var expr = [rows, allColumns].join('^');

    table.AddHeaders(report, Config.DataSources.MainSurvey, expr);
}

  static function GetFilterExpression(properties){

    switch(properties.variableId){
        // 'expression:' + report.TableUtils.EncodeJsString('InHierarchy(Orgcode, "1000")')+
      case Config.Hierarchy.VariableId:
        return 'InHierarchy('+Config.Hierarchy.VariableId+',"'+ properties.filterExpression +'")';
      break;

        //'expression:' + report.TableUtils.EncodeJsString('Wave="2016"')+
      default:
        return properties.variableId + '="' + properties.filterExpression + '"';
      break;
    }

  }

/*
@@ Description: This function returns smartview syntax for columns, probably not the solution that would work for all cases
@@ Entry parameters: properties - object, properties: label, filter (string), hideheader (string) 'true' or 'false', headerType (string) 'SEGMENT', 'CONTENT' etc.
@@					 context - object, properties: table, report, confirmit, user, state, log
*/
  static function GetVerticalExpression(properties, context){
      const report = context.report;

      return ('['+ properties.headerType +']{' +
              'label: "'+ properties.label +'";' +
              'hideheader:' + properties.hideheader + ';' +
              'expression:' + report.TableUtils.EncodeJsString(properties.filterExpression)+
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
