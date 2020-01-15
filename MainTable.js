class MainTable{

/*
@@ Description - Call this function from the aggregated table, it will generate this awesome table in a smartview syntax
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

//Get columns for hierarchy orgcodes filtered by current wave
    var internalColumnsOrgcodes = [];
    var internalColumnsWave = [];
    var orgcodes = [1000,1001,1002,1003];
    var orgcodeSettings = Config.Hierarchy;
    var waveFilter = GetFilterExpression({variableId: trendInfo.VariableId, filterExpression: trendInfo.Codes[0]});

    for(var k = 0; k < orgcodes.length; k++){
        var hierarchyFilter = GetFilterExpression({variableId: orgcodeSettings.VariableId, filterExpression: orgcodes[k]});

        internalColumnsOrgcodes.push(GetVerticalExpression({label:'Internal orgcode: ' + orgcodes[k], filterExpression:hierarchyFilter, hideheader: 'false', headerType: 'SEGMENT'}, context));
        internalColumnsWave.push(GetVerticalExpression({label:'Current wave: ' + trendInfo.Codes[0], filterExpression:waveFilter, hideheader: 'false', headerType: 'SEGMENT'}, context));
        }

    var internalColumnsJoined = [];
    for(var l = 0; l < internalColumnsOrgcodes.length; l++){
	  	internalColumnsJoined.push([internalColumnsOrgcodes[l], internalColumnsWave[l]].join("/"));
    }

//Create one big syntax for table by connecting arrays
    rows = rows.join("+");
    columns = columns.join("+");
    internalColumnsJoined = internalColumnsJoined.join("+");

    var allColumns = [columns, internalColumnsJoined].join("+");
    var expr = [rows, allColumns].join('^');

    table.AddHeaders(report, Config.DataSources.MainSurvey, expr);
}
/*
@@ Description: This function get you filter expression you can use for example in the smartview syntax. I am not sure how many cases
@@                there can be so I created a switch. One case for Orgcode, second case for everything else.
@@ Entry parameters: properties - object , properties: variableId (string) -> what you want to use as filter
@@                                                     filterExpression (string) -> how you want to filter the VariableId
@@ Return examples: 'InHierarchy(Orgcode, "1000")'
@@                  'Wave="2016"'
@@
@@ This expression should be used in report.TableUtils.EncodeJsString() function for it's magical powers
@@
*/  static function GetFilterExpression(properties){

    switch(properties.variableId){
      case Config.Hierarchy.VariableId:
        return 'InHierarchy('+Config.Hierarchy.VariableId+',"'+ properties.filterExpression +'")';
      break;

      default:
        return properties.variableId + '="' + properties.filterExpression + '"';
      break;
    }

  }

/*
@@ Description: This function returns smartview syntax for columns, probably not the solution that would work for all cases
@@ Entry parameters: properties - object, properties: label, filterExpression (string), hideheader (string) 'true' or 'false', headerType (string) 'SEGMENT', 'CONTENT' etc.
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
