class ComparatorUtil{

/*
-getPathByNodeID(nodeID)
-isChildOf( childID, parentID)
-getHierarchyValue (columnName, nodeID, exclude_prefix)
-getTopNodeID()
-getParentID (id)
-getHierarchyColumn(schemaID, tableName, columnName, compareColumnName, compareColumnValue)
-getHierarchyColumn(schemaID, tableName, columnName)
*/
  static function getComparators(){
    var internalComps = Config.comparators.internals;
    var alreadyAdded = {};
    alreadyAdded[ReportHelper.context.user.PersonalizedReportBase.split(',')[0]] = 1;

    var finalArrayOfComps = [];

    for(var i = 0; i < internalComps.length; i++){
      finalArrayOfComps.push(getCase(alreadyAdded, internalComps[i]));
      alreadyAdded[finalArrayOfComps[i].orgcode] = 1;
    }

    return finalArrayOfComps;
  }

  static function contains(array, value){
    var found = false;
    for(var i =  0; i < array.length; i++){
      if(array[i] == value){
        found = true;
      }
    }
    return found;
  }

  static function getCase(alreadyAdded, internalComps){

     var state = ReportHelper.context.state;
     var user = ReportHelper.context.user;
     var internalComp = internalComps.split(':');
     var multiSelect = (user.PersonalizedReportBase.split(',').length > 1) ? true : false;
     var fullPath = HierarchyUtil.getPathByNodeID(user.PersonalizedReportBase);

  	 switch(internalComp[0].toUpperCase()){
        case 'TOPLEVEL':
        var orgcode = HierarchyUtil.getTopNode();

         if(multiSelect){
           return {
            orgcode: orgcode,
            label: HierarchyUtil.getHierarchyValue('', orgcode, false),
            isHidden: contains(user.PersonalizedReportBase.split(','), orgcode)
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
         var orgcode = (fullPath.length > internalComp[1]) ? fullPath[(fullPath.length - internalComp[1])] : user.PersonalizedReportBase;

         return {
            orgcode: orgcode,
            label: HierarchyUtil.getHierarchyValue('', orgcode, false),
            isHidden: (multiSelect == true) ? multiSelect : (alreadyAdded[orgcode] == 1)
          };
          break;

        case 'PARENT':
          var orgcode = (fullPath.length > internalComp[1]) ? fullPath[(internalComp[1])] : user.PersonalizedReportBase;

          return {
            orgcode: orgcode,
            label: HierarchyUtil.getHierarchyValue('', orgcode, false),
            isHidden: (multiSelect == true) ? multiSelect : (alreadyAdded[orgcode] == 1)
         };
          break;

          case 'REPORTBASE':
          var orgcode = state.Parameters.GetString('REPORT_BASE_CURRENT');
          return {
            orgcode: orgcode,
            label: HierarchyUtil.getHierarchyValue('', orgcode, false),
            isHidden: (multiSelect == true) ? multiSelect : (alreadyAdded[orgcode] == 1)
         };
          break;

       default:
         var overrideResult = getOverride(fullPath[0], internalComp[0]);
         var customComparator = (overrideResult == '') ? fullPath[0] : overrideResult;

         return {
            orgcode: customComparator,
            label: HierarchyUtil.getHierarchyValue('', customComparator, false),
            isHidden: (alreadyAdded[customComparator] == 1)
          };
       break;
      }
  }

  static function getOverride(nodeId, hierarchyColumn){
    var overrideNode = HierarchyUtil.getHierarchyValue(hierarchyColumn, nodeId, false);
    nodeId = (overrideNode == '' || overrideNode == null) ? '' : overrideNode;

    return nodeId;
  }

}
