class MainTable{

/*
@@ Description - Call this function from the aggregated table, it will generate this awesome table in a smartview syntax
@@ Entry parameters - context - object, properties: table, report, confirmit, user, state, log
*/
  static function getTable(table){

    const startTime = new Date();

    const report = ReportHelper.context.report;
    const user = ReportHelper.context.user;

    const qs = getAllGridID();
    const waveInfo = Config.wave;
    const hierarchyInfo = Config.hierarchy;

    const currWaveFilter = getFilterExpression({variableID: waveInfo.variableID, filterExpression: waveInfo.codes[0]});
    const currOrgcodeFilter = getFilterExpression({variableID: Config.hierarchy.variableID, filterExpression: user.PersonalizedReportBase});
    const currOrgcodeSVSyntax = getVerticalExpression({label:'Current orgcode: ' + user.PersonalizedReportBase, filterExpression:currOrgcodeFilter, hideheader: 'false', headerType: 'SEGMENT'});
    const currWaveSVSyntax = getVerticalExpression({label:'Current wave: ' + waveInfo.codes[0], filterExpression:currWaveFilter, hideheader: 'false', headerType: 'SEGMENT'});

    const syntaxObject = {
      waveSyntax: currWaveSVSyntax,
      orgcodeSyntax: currOrgcodeSVSyntax
    };

//Get rows - Grid Questions + non-grid questions
     var rows = [];
     for (var i = 0; i < qs.length; i++) {
       rows.push(getHorizontalExpression(qs[i], {title: 'true', totals: 'true'}));
     }

//Get columns for trends filtered by current orgcode
     var waveColumnsJoined = getColumnSyntax('wave', syntaxObject)

//Get columns for demos filtered by current wave and current orgcode
     var demos = ['Segment_EEF', 'Orgcode'];
     var demoColumnsJoined = getColumnSyntax('demos', syntaxObject, demos);

    var comps = ComparatorUtil.getComparators();
//Get columns for hierarchy orgcodes filtered by current wave
 //   var orgcodes = [1000, 1001, 1002, 1003, 1004];
    var internalColumnsJoined = getColumnSyntax('orgcode', syntaxObject, comps);

//Create one big syntax for table by connecting arrays
    rows = rows.join("+");
    var allColumns = [waveColumnsJoined, internalColumnsJoined, demoColumnsJoined].join("+");
    var expr = [rows, allColumns].join('^');

    table.AddHeaders(report, Config.dataSources.mainSurvey, expr);

    const endTime = new Date();
    ReportHelper.debug('MainTables - Get table took: ' + (endTime.getTime() - startTime.getTime())/1000 + 's');
}

  static function getColumnSyntax(id, smartViewSyntax, columns){
    var helperArray1 = [];
    var helperArray2 = [];
    var helperArray3 = [];
    var result = [];

    switch(id){
      case 'wave':
        for (var i = 0; i < Config.wave.codes.length; i++) {
          var filter = getFilterExpression({variableID: Config.wave.variableID, filterExpression: Config.wave.codes[i]});

          helperArray1.push(getVerticalExpression({label: Config.wave.codes[i], filterExpression:filter, hideheader: 'false', headerType: 'SEGMENT'}));
          helperArray2.push(smartViewSyntax.orgcodeSyntax);
        }

        for (var j = 0; j < helperArray1.length; j++) {
	  	  result.push([helperArray1[j], helperArray2[j]].join("/"));
        }
        break;

      case 'orgcode':
        for (var i = 0; i < columns.length; i++) {
       	 	var hierarchyFilter = getFilterExpression({variableID: Config.hierarchy.variableID, filterExpression: columns[i].orgcode});

        	helperArray1.push(getVerticalExpression({label: columns[i].label, filterExpression:hierarchyFilter, hideheader: 'false', headerType: 'SEGMENT'}, columns[i].isHidden));
        	helperArray2.push(smartViewSyntax.waveSyntax);
        }

        for (var j = 0; j < helperArray1.length; j++) {
	  	    result.push([helperArray1[j], helperArray2[j]].join("/"));
        }
        break;

      case 'demos':
        for (var i = 0; i < columns.length; i++) {
            helperArray1.push(getHorizontalExpression(columns[i], {title: 'true', totals: 'false', nOfChildren:Config.hierarchy.numberOfChildren}));
       	 	helperArray2.push(smartViewSyntax.waveSyntax);
       	 	helperArray3.push(smartViewSyntax.orgcodeSyntax);
    	}

        for(var j = 0; j < helperArray1.length; j++){
	  		result.push([helperArray1[j], helperArray2[j], helperArray3[j]].join("/"));
    	}
        break;

      default:
        ReportHelper.debug('Invalid value in GetColumnSyntax function in MainTable class, parameter id: ' + id)
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
  static function getFilterExpression(properties){

    switch (properties.variableID) {
      case Config.hierarchy.variableID:
        return 'InHierarchy('+Config.hierarchy.variableID+',"'+ properties.filterExpression +'")';
        break;

      default:
        return properties.variableID + '="' + properties.filterExpression + '"';
        break;
    }
  }

/*
@@ Description: This function returns smartview syntax for columns, probably not the solution that would work for all cases
@@ Entry parameters: properties - object, properties: label, filterExpression (string), hideheader (string) 'true' or 'false', headerType (string) 'SEGMENT', 'CONTENT' etc.
@@					 context - object, properties: table, report, confirmit, user, state, log
*/
  static function getVerticalExpression(properties, hidden){

	  const report = ReportHelper.context.report;
      if (hidden) {
    	return ('[CONTENT]{' +
                'label: "Hidden: ' + properties.label + '"' +
                '}');
      }
      else{
        return ('['+ properties.headerType +']{' +
                'label: "'+ properties.label +'";' +
                'hideheader:' + properties.hideheader + ';' +
                'expression:' + report.TableUtils.EncodeJsString(properties.filterExpression)+
                '}');
      }
  }

/*
@@ Description: This function returns possibly the easiest smartview syntax for rows
@@ Entry parameters: question - string, id of a question from Main survey
@@					 properties: object, properties: title (string), totals (string) - 'true' or 'false'
*/
  static function getHorizontalExpression(question, properties){

    switch (question) {
      case Config.hierarchy.variableID:
        return (question + '{self: true; children:' + properties.nOfChildren + ';title:' + properties.title + '; totals:' + properties.totals+'}');
        break;

      default:
        return (question + '{title:' + properties.title + '; totals:' + properties.totals+'}');
        break;
    }
  }

/*
@@ Description: Function that returns array of grid Ids, and/or non-grid questions
*/
  static function getAllGridID(){
//Array with all GRIDs
    const allGridObjects = Config.questionGridStructure;
    var allIDs = [];

    for(var i = 0; i < allGridObjects.length; i++){
      allIDs.push(allGridObjects[i].id);
    }

    return allIDs;
  }
}
