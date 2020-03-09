class ParamUtil{

  static function setDefaultValues(){

    var state =  ReportHelper.context.state;
    var user =  ReportHelper.context.user;
    if(state.Parameters.GetString('RUN_ONCE') != '1'){
      var table = Config.hierarchy.tableName;
      Save('REPORT_BASE_DEFAULT', user.PersonalizedReportBase);
      user.SetReportBase(user.PersonalizedReportBase.split(',')[0] + "§"+ table +"§id");
  	  Save('REPORT_BASE_CURRENT', user.PersonalizedReportBase.split(',')[0]);
      Save('RUN_ONCE', '1');
    }
  }

  static function setCurrentReportBase(){

    var user = ReportHelper.context.user;
    var state = ReportHelper.context.state;
    var table = Config.hierarchy.tableName;

    if(user.PersonalizedReportBase.split(',').length == 1){

      var fullPath = HierarchyUtil.getPathByNodeID(user.PersonalizedReportBase);
      var defaultReportBase = state.Parameters.GetString('REPORT_BASE_DEFAULT').split(',');
      var reportBases = [];

      for(var i = 0; i < fullPath.length; i ++){
        for(var j = 0; j < defaultReportBase.length; j++)
          if(fullPath[i] == defaultReportBase[j]){
            reportBases.push(fullPath[i]);
          }
        }
      Save('REPORT_BASE_CURRENT', reportBases[(reportBases.length - 1)]);
    }
  }

  static function Save (param_name, value) {
    var report =  ReportHelper.context.report;
    var state =  ReportHelper.context.state;

    var a : ParameterValueResponse = new ParameterValueResponse();
    a.StringKeyValue = value;

    var lbls : LanguageTextCollection = new LanguageTextCollection();
    lbls.Add(new LanguageText(report.CurrentLanguage, value));
    a.LocalizedLabel = new Label(lbls);
    a.StringValue = value;

    state.Parameters[param_name] = a;
 }
}
