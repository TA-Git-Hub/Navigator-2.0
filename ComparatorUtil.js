class ComparatorUtil{

/**
 * This function gets you array of all comparators.
 * @return {[Array of objects]} [Array of all comparator object. Object props: Orgcode, label, isHidden (true/false)]
 */
  static function getComparators() {
    var internalComps = Config.comparators.internals;
    var alreadyAdded = {};

    //Already added variable determines whether the comparator should be hidden or not
    //At first, I want to add the current level, because I don't want to show an internal comparator of current levl
    //Additionaly, in case I want to hide the comparator, I can just use the current level for suppression as it has been already added here
    alreadyAdded[ReportHelper.context.user.PersonalizedReportBase.split(',')[0]] = 1;

    var finalArrayOfComps = [];

    for(var i = 0; i < internalComps.length; i++){
      finalArrayOfComps.push(getComparator(alreadyAdded, internalComps[i]));
      alreadyAdded[finalArrayOfComps[i].orgcode] = 1;
    }

    return finalArrayOfComps;
  }

  static function getComparator(alreadyAdded, internalComps) {

     var state = ReportHelper.context.state;
     var user = ReportHelper.context.user;
     //This should get me either an array that should look like ['Parent', '1'], or only the first part - ['TopLevel']
     //First part detemines what type of comparator it is, the second part is the depth in the hierarchy, so the 'Parent:1'
     //would represent first level above mine.
     var internalComp = internalComps.split(':');
     var multiSelect = (user.PersonalizedReportBase.split(',').length > 1) ? true : false;
     var fullPath = HierarchyUtil.getPathByNodeID(user.PersonalizedReportBase);
     var schemaId = Config.hierarchy.schemaID;
     var tableName = Config.hierarchy.tableName;

  	 switch (internalComp[0].toUpperCase()) {
        case 'TOPLEVEL':
        var orgcode = HierarchyUtil.getTopNode();
        var isViolator = HierarchyUtil.isNodeViolator(schemaId, tableName, orgcode);
//If multi select is true (we have more than 1 unit selected), check whether one of that units is top level, if so, hide the column
//othervise we can display the comparator
//If single select, just check whether this orgcode has been already added (or if we are on top level)
         if (multiSelect) {
           return {
            orgcode: orgcode,
            label: HierarchyUtil.getHierarchyValue('', orgcode, false),
            isHidden: ReportHelper.arrayContains(user.PersonalizedReportBase.split(','), orgcode)
          }
         }else{
           return {
            orgcode: orgcode,
            label: HierarchyUtil.getHierarchyValue('', orgcode, false),
            isHidden: (alreadyAdded[orgcode] == 1)
          }
         }
          break;

        case 'LEVEL':
         var orgcode = (fullPath.length > internalComp[1]) ? fullPath[(fullPath.length - internalComp[1])] : user.PersonalizedReportBase.split(',')[0];
         var isViolator = HierarchyUtil.isNodeViolator(schemaId, tableName, orgcode);
         return {
            orgcode: orgcode,
            label: HierarchyUtil.getHierarchyValue('', orgcode, false),
            isHidden: isHidden({multiSelect: multiSelect, isViolator: isViolator}, alreadyAdded, orgcode)//(multiSelect == true) ? multiSelect : (alreadyAdded[orgcode] == 1)
          };
          break;

        case 'PARENT':
          var orgcode = (fullPath.length > internalComp[1]) ? fullPath[(internalComp[1])] : user.PersonalizedReportBase.split(',')[0];
          var isViolator = HierarchyUtil.isNodeViolator(schemaId, tableName, orgcode);
          return {
            orgcode: orgcode,
            label: HierarchyUtil.getHierarchyValue('', orgcode, false),
            isHidden: isHidden({multiSelect: multiSelect, isViolator: isViolator}, alreadyAdded, orgcode)//(multiSelect == true) ? multiSelect : (alreadyAdded[orgcode] == 1)
         };
          break;

          case 'REPORTBASE':
          var orgcode = state.Parameters.GetString('REPORT_BASE_CURRENT');
          var isViolator = HierarchyUtil.isNodeViolator(schemaId, tableName, orgcode);
          return {
            orgcode: orgcode,
            label: HierarchyUtil.getHierarchyValue('', orgcode, false),
            isHidden: isHidden({multiSelect: multiSelect, isViolator: isViolator}, alreadyAdded, orgcode)//(multiSelect == true) ? multiSelect : (alreadyAdded[orgcode] == 1)
         };
          break;

       default:
         var overrideResult = getOverride(fullPath[0], internalComp[0]);
         var customComparator = (overrideResult == '') ? fullPath[0] : overrideResult;
         var isViolator = HierarchyUtil.isNodeViolator(schemaId, tableName, customComparator);
         return {
            orgcode: customComparator,
            label: HierarchyUtil.getHierarchyValue('', customComparator, false),
            isHidden: isHidden({multiSelect: multiSelect, isViolator: isViolator}, alreadyAdded, customComparator) //(multiSelect == true) ? multiSelect : (alreadyAdded[customComparator] == 1)
          };
       break;
      }
  }

  static function isHidden(conditionObject, alreadyAdded, orgcode){
    if (conditionObject.isViolator === true) {
      ReportHelper.debug('isHidden because of violator === true');
      return true;
    }

    if (conditionObject.multiSelect === true) {
      return true;
    }else if (alreadyAdded[orgcode] == 1) {
            return true;
          }else {
            return false;
          }
  }
/**
 * Will return a value in the specified column for the specified orgcode in the hierarchy
 * @param  {[string]} nodeId          [orgcode ID you want to find the value for]
 * @param  {[string]} hierarchyColumn [column in the hierarchy]
 * @return {[string]}                 [overridden value]
 */
  static function getOverride(nodeId, hierarchyColumn){
    var overrideNode = HierarchyUtil.getHierarchyValue(hierarchyColumn, nodeId, false);
    nodeId = (overrideNode == '' || overrideNode == null) ? '' : overrideNode;

    return nodeId;
  }

}
