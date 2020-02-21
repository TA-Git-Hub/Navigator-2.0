class HierarchyUtil{

/*
-getPathByNodeID(nodeID)
-isChildOf( childID, parentID)
-getHierarchyValue (columnName, nodeID, exclude_prefix)
-getTopNodeID()
-getParentID (id)
-getHierarchyColumn(schemaID, tableName, columnName, compareColumnName, compareColumnValue)
-getHierarchyColumn(schemaID, tableName, columnName)
 */

static var hashtable = {};

/**-----------------------------------------------------------------------------------------------------------------------------
   * Get an array of node IDs starting with the specified nodeID and ending with the top node. Crazy recursion inside. Warned you.
   * @method getPathByNodeID
   * @param  {String}        nodeID;  Your specified node id
   * @return {Array}         Array of node ids, [nodeid, ... , topNode]
   */
static function getPathByNodeID(nodeID) {
    var full_path_map = {};
		if ( full_path_map[nodeID] == null ) {
			var parentID = getParentID (nodeID);
      full_path_map [ nodeID ] = (parentID == null || parentID == 'undefined')
      ? [ nodeID ] : [ nodeID ].concat (getPathByNodeID( parentID));
		}
    // Return a shallow copy of the array to prevent it from being changed after it's returned
		return full_path_map[nodeID].slice(0,full_path_map[nodeID].length);
	}

/**-----------------------------------------------------------------------------------------------------------------------------
* returns true if childID is equal to or below parentID in the hierarchy
* @method isChildOf
* @param  {String}  childID [description]
* @param  {String}  parentID [description]
* @return {Boolean}
*/
static function isChildOf( childID, parentID) {
    var is_child_of = {};
		var key = childID + ':' + parentID;
		var currentID = childID;
		while ( is_child_of[key] == null ) {
			// first time this combination is requested
			// look up from database
			if (currentID == parentID){
				// found match
				is_child_of[key] = true;
			}
			else {
				if ( currentID == '' || (currentID+'') == 'undefined' || currentID==null) {
					// reached top of hierarchy
					is_child_of[key] = false;
				}
				else {
					// look one level up
					currentID = getParentID ( currentID);
				}
			}
		}
		return is_child_of[key];
	}

/**-----------------------------------------------------------------------------------------------------------------------------
*Get value from hierarchy table based on Ordcode
* @method getHierarchyValue
* @param  {String}      columnName
* @param  {String}      nodeID        nodeID for which we get the value
* @param  {Boolean}     exclude_prefix false for language columns
* @return {String}
*/
static function getHierarchyValue (columnName, nodeID, exclude_prefix) {
    var prefix = null;
		if(exclude_prefix){
			prefix = '';
		}else{
			prefix = '__l' + ReportHelper.context.report.CurrentLanguage;
		}
		var result = getHierarchyColumn(
			Config.hierarchy.schemaId,
			Config.hierarchy.tableName,
			prefix + columnName,
			'id',
			nodeID
		);
		if ( result != null )
			return result[0];
		else
	   return null;
  }

/**-----------------------------------------------------------------------------------------------------------------------------
* Get topnode of attached hierarchy
* @method getTopNodeID
* @return {String}
*/
static function getTopNodeID() {
  var result = getHierarchyColumn(Config.hierarchy.schemaId,
                   				  Config.hierarchy.tableName,
                                  'id',
                   				  Config.hierarchy.parentRelationName,
                   				  undefined
                                  );
   if (result.length == 1)
   	return result[0];
   else
 return null;
}













  static function getTopNode(){

    var confirmit = ReportHelper.context.confirmit;

    var schema : DBDesignerSchema = confirmit.GetDBDesignerSchema(Config.hierarchy.schemaId);
    var table : DBDesignerTable = schema.GetDBDesignerTable(Config.hierarchy.tableName);

    var idColumn : StringCollection = table.GetColumnValues('id');
    var parentColumn : StringCollection = table.GetColumnValues(Config.hierarchy.parentRelationName);

	var indexOfTopNode = parentColumn.IndexOf(undefined);

    return idColumn.Item(indexOfTopNode)
   // var overrideResult = getFieldValue ( 'internal1', topNode, false, context );

   // return (overrideResult == '') ? topNode : overrideResult
}

















/**-----------------------------------------------------------------------------------------------------------------------------
 * Get hierarchy ID of parent node
 * @method getParentID
 * @param  {[type]}   id        nodeID
 * @return {String}             parentID or null
 */
static function getParentID (id) {

	var result =  getHierarchyColumn (	Config.hierarchy.schemaId,            //schema
          							    Config.hierarchy.tableName,           //table
                        				Config.hierarchy.parentRelationName,  //column to return
                        				'id',                                 //conidition column
                        				id                                    //condition
                                   );
	if (result.length == 1)
		return result[0];
	else
return null;
}

/**-----------------------------------------------------------------------------------------------------------------------------
 * Get array of values according to conditions from Hierarchy
 * Checks first if this querry has not been already done. For performance.
 * @method getHierarchyColumn
 * @param  {String}    schemaID
 * @param  {String}    tableName
 * @param  {String}    columnName
 * @param  {String}    compareColumnName
 * @param  {String}    compareColumnValue
 * @return {Array}
 */
static function getHierarchyColumn(schemaID, tableName, columnName, compareColumnName, compareColumnValue) {

  /*  var key = [schemaID, tableName, columnName, compareColumnName, compareColumnValue].join('.');

    if ( hashtable [ key ] == null) {*/
    /* hashtable [ key ] = */return loadColumn (schemaID, tableName, columnName, compareColumnName, compareColumnValue);
    /*}
    return hashtable [ key ];*/
}

//overloaded function, gets whole column
static function getHierarchyColumn(schemaID, tableName, columnName) {
  /*  var key = [schemaID, tableName, columnName].join('.');
    if ( hashtable [ key ] == null) {*/
      /* hashtable [ key ] =*/ return loadColumn (schemaID, tableName, columnName);
    /*}
    return hashtable [ key ];*/
}





 /**-----------------------------------------------------------------------------------------------------------------------------
 /**-----------------------------------------------------------------------------------------------------------------------------
/**HELPER FUNCTIONS HELPER FUNCTIONS HELPER FUNCTIONS HELPER FUNCTIONS HELPER FUNCTIONS HELPER FUNCTIONS
 /**-----------------------------------------------------------------------------------------------------------------------------
 /**-----------------------------------------------------------------------------------------------------------------------------

 * Transform String collection to Array
 * @method stringCollectionToArray
 * @param  {StringCollection}   sc
 * @return {Array}
 */
static function stringCollectionToArray(sc : StringCollection) {
	  var o=[]; for (var s : String in sc) o.push(s); return o;
 }

  /**-----------------------------------------------------------------------------------------------------------------------------
 * Loads array of values from hierarchy column according to specified conditions.
 * @method loadColumn (old ExecQuery)
 * @param  {String}  schemaID
 * @param  {String}  tableName
 * @param  {String}  columnName Name of column that is returned
 * @return {Array}
 *
 * @param  {String}  compareColumnName Name of column where condition is applied
 * @param  {String}  compareColumnValue Value that must match to return this item
 */

static function loadColumn (schemaID, tableName, columnName, compareColumnName, compareColumnValue) {
		var schema : DBDesignerSchema = ReportHelper.context.confirmit.GetDBDesignerSchema(schemaID);
		var table : DBDesignerTable = schema.GetDBDesignerTable(tableName);
		var sc : StringCollection  = table.GetColumnValues(columnName, compareColumnName, compareColumnValue);

		return stringCollectionToArray(sc);
}
//overloaded function returns whole column
static function loadColumn (schemaID, tableName, columnName) {
		var schema : DBDesignerSchema = ReportHelper.context.confirmit.GetDBDesignerSchema(schemaID);
		var table : DBDesignerTable = schema.GetDBDesignerTable(tableName);
		var sc : StringCollection  = table.GetColumnValues(columnName);
		return stringCollectionToArray(sc);
}
}
