class SegmentTable{
/**
 * [GetSegmentTable description]
 * @param       {object} context [Contains all the basic stuff - report, table, state, user, confirmit, table, log]
 * @constructor
 */
  static function getSegmentTable(context){

    const table = context.table;
    const report = context.report;
    const user = context.user;

    const segment = 'Segment_EEF';
    const rows = MainTable.getHorizontalExpression(segment, {title: 'true', totals: 'false'}, context);

    const waveInfo = Config.wave;
    const hierarchyInfo = Config.hierarchy;

	  const currWaveFilter = MainTable.getFilterExpression({variableID: waveInfo.variableID, filterExpression: waveInfo.codes[0]});
    const currOrgcodeFilter = MainTable.getFilterExpression({variableID: hierarchyInfo.variableID, filterExpression: user.PersonalizedReportBase});
    const currOrgcodeSVSyntax = MainTable.getVerticalExpression({label:'Current orgcode: ' + user.PersonalizedReportBase, filterExpression: currOrgcodeFilter, hideheader: 'false', headerType: 'SEGMENT'}, context);
    const currWaveSVSyntax = MainTable.getVerticalExpression({label:'Current wave: ' + waveInfo.codes[0], filterExpression:currWaveFilter, hideheader: 'false', headerType: 'SEGMENT'}, context);

    const syntaxObject = {
      waveSyntax: currWaveSVSyntax,
      orgcodeSyntax: currOrgcodeSVSyntax
    };

//Get columns for trends filtered by current orgcode
     var waveColumnsJoined = MainTable.getColumnSyntax('wave', syntaxObject, context)

//Get columns for demos filtered by current wave and current orgcode
     var demos = [ Config.hierarchy.variableID ];
     var demoColumnsJoined = MainTable.getColumnSyntax('demos', syntaxObject, context, demos);

//Get columns for hierarchy orgcodes filtered by current wave
    var orgcodes = [1000,1001,1002,1003,1004];
    var internalColumnsJoined = MainTable.getColumnSyntax('orgcode', syntaxObject, context, orgcodes);

//Create one big syntax for table by connecting arrays
//    rows = rows.join("+");
    var allColumns = [waveColumnsJoined, internalColumnsJoined, demoColumnsJoined].join("+");
    var expr = [rows, allColumns].join('^');

    table.AddHeaders(report, Config.dataSources.mainSurvey, expr);
  }
}
