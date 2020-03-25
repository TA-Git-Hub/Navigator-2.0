/*class NSQTable{

  static function getQuestionID(){
    var nsq = Config.nsq;
    var questionIDArray = []

    for (var list in nsq) {
      if (nsq[list].length > 0) {
        for (var i = 0; i < nsq[list].length; i++) {
          questionIDArray.push(nsq[list]);
        }
      }
    }

    return questionIDArray;
  }

/**
 * This function generates the segment table, basically the same way as the main table
 * @param       {table} context [contains table property]
 * @constructor
 */
/*  static function getTable(table, mode){

    const report = ReportHelper.context.report;
    const user = ReportHelper.context.user;

    const waveInfo = Config.wave;
    const hierarchyInfo = Config.hierarchy;

    var headerType = (mode === 'Ranking') ? 'CATEGORIES]+[SEGMENT' : 'SEGMENT';

	const currWaveFilter = MainTable.getFilterExpression({variableID: waveInfo.variableID, filterExpression: waveInfo.codes[0]});
    const currOrgcodeFilter = MainTable.getFilterExpression({variableID: hierarchyInfo.variableID, filterExpression: user.PersonalizedReportBase});
    const currOrgcodeSVSyntax = MainTable.getVerticalExpression({label:'Current orgcode: ' + user.PersonalizedReportBase, filterExpression: currOrgcodeFilter, hideheader: 'false', headerType: headerType});
    const currWaveSVSyntax = MainTable.getVerticalExpression({label:'Current wave: ' + waveInfo.codes[0], filterExpression:currWaveFilter, hideheader: 'false', headerType: headerType});

    const syntaxObject = {
      waveSyntax: currWaveSVSyntax,
      orgcodeSyntax: currOrgcodeSVSyntax
    };

    var questionID = getQuestionID();
    var rows = [];

    for (var i = 0; i < questionID.length; i++) {
      var type = report.DataSource.GetProject(Config.dataSources.mainSurvey).GetQuestion(questionID[i]).QuestionType;

      // we are not using table for ranking - ignore ranking
      if(type === QuestionType.MultiOrdered && mode !== 'Ranking') continue;

      // we are using table for ranking - ignore everything else
      if(type !== QuestionType.MultiOrdered && mode === 'Ranking') continue;

      var specialColumn = (mode === 'Ranking') ?
          '[FORMULA]{expression:"if( ROW = 1,CELLV(2,1), CELLV(COL,ROW-1)+CELLV(COL+1,ROW))"} + [CATEGORIES]/[SEGMENT]' : '[SEGMENT]';
      rows.push(questionID[i] + '{title:true; totals:true; collapsed:true}');
    }

    //Get columns for trends filtered by current orgcode
       var waveColumnsJoined = MainTable.getColumnSyntax('wave', syntaxObject);

      //Get columns for demos filtered by current wave and current orgcode
       var demos = [ Config.hierarchy.variableID ];
       var demoColumnsJoined = MainTable.getColumnSyntax('demos', syntaxObject, demos);
       var comps = ComparatorUtil.getComparators();
      //Get columns for hierarchy orgcodes filtered by current wave
      if(comps.length > 0){
        var internalColumnsJoined = MainTable.getColumnSyntax('orgcode', syntaxObject, comps);
      }

      //Create one big syntax for table by connecting arrays
      if(internalColumnsJoined != undefined){
        var allColumns = [waveColumnsJoined, internalColumnsJoined, demoColumnsJoined].join("+");
      }else{
        var allColumns = [waveColumnsJoined, demoColumnsJoined].join("+");
      }

      var expr = [rows.join('+'), allColumns].join('^');

      table.AddHeaders(report, Config.dataSources.mainSurvey, expr);
  }
}
*/
