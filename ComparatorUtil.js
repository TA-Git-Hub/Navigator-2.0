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
    alreadyAdded[ReportHelper.context.user.PersonalizedReportBase] = 1;

    var finalArrayOfComps = [];

    for(var i = 0; i < internalComps.length; i++){
     finalArrayOfComps.push(getCase(i, alreadyAdded, internalComps));
     alreadyAdded[finalArrayOfComps[i].orgcode] = 1;
    }
    return finalArrayOfComps;
  }

  static function getCase(i, alreadyAdded, internalComps){

     var user = ReportHelper.context.user;
     var topNode = HierarchyUtil.getTopNode();

  	 switch(internalComps[i]){
        case 'Top':
          var overrideResult = getOverride(user.PersonalizedReportBase, i);
          topNode = (overrideResult == '') ? topNode : overrideResult;
          return {
            orgcode: topNode,
            label: HierarchyUtil.getHierarchyValue('', topNode, false),
            isHidden: (alreadyAdded[topNode] == 1)
          };
          break;

        case 'Parent':
          var parentId = HierarchyUtil.getParentID(user.PersonalizedReportBase)
          var overrideResult = getOverride(user.PersonalizedReportBase, i);
          if(overrideResult == ''){
            parentId = (parentId == 'undefined') ? topNode : parentId;
          }else{
            parentId = overrideResult;
          }

          return {
            orgcode: parentId,
            label: HierarchyUtil.getHierarchyValue('', parentId, false),
            isHidden: (alreadyAdded[parentId] == 1)
         };
          break;

        case 'Level2':
          var fullPath = HierarchyUtil.getPathByNodeID(user.PersonalizedReportBase);
          var level2Node = topNode;
          var overrideResult = getOverride(user.PersonalizedReportBase, i);

          if(overrideResult == ''){
          	if(fullPath.length > 2){
              level2Node = fullPath[2];
         	 }
          }else{
            level2Node = overrideResult;
          }

          return {
            orgcode: level2Node,
            label: HierarchyUtil.getHierarchyValue('', level2Node, false),
            isHidden: (alreadyAdded[level2Node] == 1)
          };
        break;
       default:
         var overrideResult = getOverride(user.PersonalizedReportBase, i);
         var customComparator = (overrideResult == '') ? topNode : overrideResult;

         return {
            orgcode: customComparator,
            label: HierarchyUtil.getHierarchyValue('', customComparator, false),
            isHidden: (alreadyAdded[customComparator] == 1)
          };
       break;
      }
  }

  static function getOverride(nodeId, index){
     var overrideNode = HierarchyUtil.getHierarchyValue('internal'+(index+1), nodeId, false);
     nodeId = (overrideNode == '' || overrideNode == null) ? '' : overrideNode;

    return nodeId;
  }

}
