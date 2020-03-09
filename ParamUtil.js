class ParamUtil{
/**
 * This function should setup some default values we may need in the future.
 * Currently it save default report base (all possible report bases), and current reports base (only one reportbase)
 */
  static function setDefaultValues(){

    var state =  ReportHelper.context.state;

    if(state.Parameters.GetString('RUN_ONCE') != '1'){
      var user =  ReportHelper.context.user;
      var table = Config.hierarchy.tableName;

      Save('REPORT_BASE_DEFAULT', user.PersonalizedReportBase);
      Save('REPORT_BASE_CURRENT', user.PersonalizedReportBase.split(',')[0]);
      user.SetReportBase(user.PersonalizedReportBase.split(',')[0] + "§"+ table +"§id");
      Save('RUN_ONCE', '1');
    }
  }
/**
 * In case of single select hierarchy, this function sets the current report base we use for comparators.
 * It's comparting your report bases to your full path (hierarchy path from your level to the top level), and if it matches, it pushes
 * that orgcode to an array. Then it saves the latest match to the parameter. It uses the latest in case of multiple report report
 * within the same hierarchy branch, which shouldn't happen, just in case... So normally the array should contain only one element
 */
  static function setCurrentReportBase(){

    var user = ReportHelper.context.user;

    if(user.PersonalizedReportBase.split(',').length == 1){

      var table = Config.hierarchy.tableName;
      var state = ReportHelper.context.state;

      var fullPath = HierarchyUtil.getPathByNodeID(user.PersonalizedReportBase);
      var defaultReportBase = state.Parameters.GetString('REPORT_BASE_DEFAULT').split(',');
      var reportBases = [];

      for(var i = 0; i < fullPath.length; i ++){
        for(var j = 0; j < defaultReportBase.length; j++){
          if(fullPath[i] == defaultReportBase[j]){
            reportBases.push(fullPath[i]);
          }
        }
      }
      Save('REPORT_BASE_CURRENT', reportBases[(reportBases.length - 1)]);
    }
  }
/**
 * This function is used for saving stuff to the parameters
 * @param       {[String]} param_name [Name of the parameter]
 * @param       {[String, int, probably w/e]} value      [value of thing you want to save]
 */
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
