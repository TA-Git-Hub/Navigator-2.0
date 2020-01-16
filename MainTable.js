class MainTable{

/*
@@ Description - Call this function from the aggregated table, it will generate this awesome table in a smartview syntax
@@ Entry parameters - context - object, properties: table, report, confirmit, user, state, log
*/
  static function GetTable(context){

    const startTime = new Date();

    const report = context.report;
    const table = context.table;
    const log = context.log;
    const user = context.user;

    const qs = GetAllGridIds();
    const waveInfo = Config.Wave;
    const hierarchyInfo = Config.Hierarchy;

	const currWaveFilter = GetFilterExpression({variableId: waveInfo.VariableId, filterExpression: waveInfo.Codes[0]});
    const currOrgcodeFilter = GetFilterExpression({variableId: Config.Hierarchy.VariableId, filterExpression: user.PersonalizedReportBase});
    const currOrgcodeSVSyntax = GetVerticalExpression({label:'Current orgcode: ' + user.PersonalizedReportBase, filterExpression:currOrgcodeFilter, hideheader: 'false', headerType: 'SEGMENT'}, context);
    const currWaveSVSyntax = GetVerticalExpression({label:'Current wave: ' + waveInfo.Codes[0], filterExpression:currWaveFilter, hideheader: 'false', headerType: 'SEGMENT'}, context);

//Get rows - Grid Questions + non-grid questions
    var rows = [];
    for(var i = 0; i < qs.length; i++){
      rows.push(GetHorizontalExpression(qs[i], {title: 'true', totals: 'true'}));
    }

//Get columns for trend filtered by current orgcode
    var waveColumns = [];
    var currOrgcodeColumns= [];
    for(var j = 0; j < waveInfo.Codes.length; j++){
      var filter = GetFilterExpression({variableId: waveInfo.VariableId, filterExpression:waveInfo.Codes[j]});

      waveColumns.push(GetVerticalExpression({label: waveInfo.Codes[j], filterExpression:filter, hideheader: 'false', headerType: 'SEGMENT'}, context));
      currOrgcodeColumns.push(currOrgcodeSVSyntax);
    }

//Join trend columns together - trend / current org level
    var waveColumnsJoined = [];
    for(var y = 0; y < waveColumns.length; y++){
	  	waveColumnsJoined.push([waveColumns[y], currOrgcodeColumns[y]].join("/"));
    }

//Get columns for demos filtered by current wave and current orgcode
    var demoColumns = [];
    var currWaveColumns = [];
    currOrgcodeColumns = [];
    /*var demo = ['Gender', 'Age', 'Tenure', 'Segment_EEF', 'IntentToStay', 'Country', 'Graduate', 'Region', 'Disability', 'Band', 'Manager',
                'Ethnicity', 'ExemptNon', 'UnionNon', 'Wage_Status', 'Worker', 'FullTime', 'Expat', 'Headquarters', 'Job_Function', 'Performance_Rating', 'Site' ];*/
    var demos = ['Segment_EEF', 'Orgcode'];
    for(var x = 0; x < demos.length; x++){
        demoColumns.push(GetHorizontalExpression(demos[x], {title: 'true', totals: 'false', nOfChildren:hierarchyInfo.NumberOfChildren}, context));
        currWaveColumns.push(currWaveSVSyntax);
        currOrgcodeColumns.push(currOrgcodeSVSyntax);
    }

//Join demo columns together - demo / curr wave / curr orgcode
    var demoColumnsJoined = [];
    for(var l = 0; l < demoColumns.length; l++){
	  	demoColumnsJoined.push([demoColumns[l], currWaveColumns[l], currOrgcodeColumns[l]].join("/"));
    }

//Get columns for hierarchy orgcodes filtered by current wave
    var internalColumnsOrgcodes = [];
    currWaveColumns = [];
    var orgcodes = [1000,1001,1002,1003,1004];

    for(var k = 0; k < orgcodes.length; k++){
        var hierarchyFilter = GetFilterExpression({variableId: hierarchyInfo.VariableId, filterExpression: orgcodes[k]});

        internalColumnsOrgcodes.push(GetVerticalExpression({label:'Internal orgcode: ' + orgcodes[k], filterExpression:hierarchyFilter, hideheader: 'false', headerType: 'SEGMENT'}, context));
        currWaveColumns.push(currWaveSVSyntax);
    }

//Join internal columns together - internal columns / curr wave
    var internalColumnsJoined = [];
    for(var l = 0; l < internalColumnsOrgcodes.length; l++){
	  	internalColumnsJoined.push([internalColumnsOrgcodes[l], currWaveColumns[l]].join("/"));
    }

//Create one big syntax for table by connecting arrays
    rows = rows.join("+");
    waveColumnsJoined = waveColumnsJoined.join("+");
    internalColumnsJoined = internalColumnsJoined.join("+");
    demoColumnsJoined = demoColumnsJoined.join("+");
    var allColumns = [waveColumnsJoined, internalColumnsJoined, demoColumnsJoined].join("+");
    var expr = [rows, allColumns].join('^');

    table.AddHeaders(report, Config.DataSources.MainSurvey, expr);

    const endTime = new Date();
    ReportHelper.Debug('MainTables - Get table took: ' + (endTime.getTime() - startTime.getTime())/1000 + 's');
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
*/
  static function GetFilterExpression(properties){

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

    switch(question){
      case Config.Hierarchy.VariableId:
        return (question + '{self: true; children:'+properties.nOfChildren+';title:' + properties.title + '; totals:' + properties.totals+'}');
        break;

      default:
        return (question + '{title:' + properties.title + '; totals:' + properties.totals+'}');
        break;
    }
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
