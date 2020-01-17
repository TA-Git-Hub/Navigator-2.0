class MainTable{

/*
@@ Description - Call this function from the aggregated table, it will generate this awesome table in a smartview syntax
@@ Entry parameters - context - object, properties: table, report, confirmit, user, state, log
*/
  static function GetTable(context){

    const startTime = new Date();

    const report = context.report;
    const table = context.table;
    const user = context.user;

    const qs = GetAllGridIds();
    const waveInfo = Config.Wave;
    const hierarchyInfo = Config.Hierarchy;

	const currWaveFilter = GetFilterExpression({variableId: waveInfo.VariableId, filterExpression: waveInfo.Codes[0]});
    const currOrgcodeFilter = GetFilterExpression({variableId: Config.Hierarchy.VariableId, filterExpression: user.PersonalizedReportBase});
    const currOrgcodeSVSyntax = GetVerticalExpression({label:'Current orgcode: ' + user.PersonalizedReportBase, filterExpression:currOrgcodeFilter, hideheader: 'false', headerType: 'SEGMENT'}, context);
    const currWaveSVSyntax = GetVerticalExpression({label:'Current wave: ' + waveInfo.Codes[0], filterExpression:currWaveFilter, hideheader: 'false', headerType: 'SEGMENT'}, context);

    const syntaxObject = {
      waveSyntax: currWaveSVSyntax,
      orgcodeSyntax: currOrgcodeSVSyntax
    };

//Get rows - Grid Questions + non-grid questions
     var rows = [];
     for(var i = 0; i < qs.length; i++){
       rows.push(GetHorizontalExpression(qs[i], {title: 'true', totals: 'true'}));
     }

//Get columns for trends filtered by current orgcode
     var waveColumnsJoined = GetColumnSyntax('wave', syntaxObject, context)

//Get columns for demos filtered by current wave and current orgcode
     var demos = ['Segment_EEF', 'Orgcode'];
     var demoColumnsJoined = GetColumnSyntax('demos', syntaxObject, context, demos);

//Get columns for hierarchy orgcodes filtered by current wave
    var orgcodes = [1000,1001,1002,1003,1004];
    var internalColumnsJoined = GetColumnSyntax('orgcode', syntaxObject, context, orgcodes);

//Create one big syntax for table by connecting arrays
    rows = rows.join("+");
    var allColumns = [waveColumnsJoined, internalColumnsJoined, demoColumnsJoined].join("+");
    var expr = [rows, allColumns].join('^');

    table.AddHeaders(report, Config.DataSources.MainSurvey, expr);

    const endTime = new Date();
    ReportHelper.Debug('MainTables - Get table took: ' + (endTime.getTime() - startTime.getTime())/1000 + 's');
}

  static function GetColumnSyntax(id, smartViewSyntax, context, columns){
    var helperArray1 = [];
    var helperArray2 = [];
    var helperArray3 = [];
    var result = [];

    switch(id){
      case 'wave':
        for(var i = 0; i < Config.Wave.Codes.length; i++){
          var filter = GetFilterExpression({variableId: Config.Wave.VariableId, filterExpression:Config.Wave.Codes[i]});

          helperArray1.push(GetVerticalExpression({label: Config.Wave.Codes[i], filterExpression:filter, hideheader: 'false', headerType: 'SEGMENT'}, context));
          helperArray2.push(smartViewSyntax.orgcodeSyntax);
        }

        for(var j = 0; j < helperArray1.length; j++){
	  	  result.push([helperArray1[j], helperArray2[j]].join("/"));
        }
        break;

      case 'orgcode':
        for(var i = 0; i < columns.length; i++){
       	 	var hierarchyFilter = GetFilterExpression({variableId: Config.Hierarchy.VariableId, filterExpression: columns[i]});

        	helperArray1.push(GetVerticalExpression({label:'Internal orgcode: ' + columns[i], filterExpression:hierarchyFilter, hideheader: 'false', headerType: 'SEGMENT'}, context, true));
        	helperArray2.push(smartViewSyntax.waveSyntax);
        }

        for(var j = 0; j < helperArray1.length; j++){
	  	    result.push([helperArray1[j], helperArray2[j]].join("/"));
        }
        break;

      case 'demos':
        for(var i = 0; i < columns.length; i++){
            helperArray1.push(GetHorizontalExpression(columns[i], {title: 'true', totals: 'false', nOfChildren:Config.Hierarchy.NumberOfChildren}, context));
       	 	helperArray2.push(smartViewSyntax.waveSyntax);
       	 	helperArray3.push(smartViewSyntax.orgcodeSyntax);
    	}

        for(var j = 0; j < helperArray1.length; j++){
	  		result.push([helperArray1[j], helperArray2[j], helperArray3[j]].join("/"));
    	}
        break;

      default:
        ReportHelper.Debug('Invalid value in GetColumnSyntax function in MainTable class, parameter id: ' + id)
        break;
    }

    result = result.join("+")
  	return result;
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
  static function GetVerticalExpression(properties, context, hidden){

	  const report = context.report;
      if(hidden){
    	return ('[CONTENT]{' +
              'label: "Schovaný sloupec"' +
              '}');
      }
      else{
        return ('['+ properties.headerType +']{' +
              'label: "'+ properties.label +'";' +
              'hideheader:' + properties.hideheader + ';' +
              'expression:' + report.TableUtils.EncodeJsString(properties.filterExpression)+
              '}');;
      }
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
