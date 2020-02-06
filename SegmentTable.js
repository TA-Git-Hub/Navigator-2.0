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
    const rows = MainTables.getHorizontalExpression(segment, {title: 'true', totals: 'false'}, context);

    const waveInfo = Config.Wave;
    const hierarchyInfo = Config.Hierarchy;

	  const currWaveFilter = MainTables.getFilterExpression({variableId: waveInfo.VariableId, filterExpression: waveInfo.Codes[0]});
    const currOrgcodeFilter = MainTables.getFilterExpression({variableId: Config.Hierarchy.VariableId, filterExpression: user.PersonalizedReportBase});
    const currOrgcodeSVSyntax = MainTables.getVerticalExpression({label:'Current orgcode: ' + user.PersonalizedReportBase, filterExpression:currOrgcodeFilter, hideheader: 'false', headerType: 'SEGMENT'}, context);
    const currWaveSVSyntax = MainTables.getVerticalExpression({label:'Current wave: ' + waveInfo.Codes[0], filterExpression:currWaveFilter, hideheader: 'false', headerType: 'SEGMENT'}, context);

    const syntaxObject = {
      waveSyntax: currWaveSVSyntax,
      orgcodeSyntax: currOrgcodeSVSyntax
    };

//Get columns for trends filtered by current orgcode
     var waveColumnsJoined = MainTables.getColumnSyntax('wave', syntaxObject, context)

//Get columns for demos filtered by current wave and current orgcode
     var demos = [ Config.Hierarchy.VariableId ];
     var demoColumnsJoined = MainTables.getColumnSyntax('demos', syntaxObject, context, demos);

//Get columns for hierarchy orgcodes filtered by current wave
    var orgcodes = [1000,1001,1002,1003,1004];
    var internalColumnsJoined = MainTables.getColumnSyntax('orgcode', syntaxObject, context, orgcodes);

//Create one big syntax for table by connecting arrays
//    rows = rows.join("+");
    var allColumns = [waveColumnsJoined, internalColumnsJoined, demoColumnsJoined].join("+");
    var expr = [rows, allColumns].join('^');

    table.AddHeaders(report, Config.DataSources.MainSurvey, expr);
  }
}
