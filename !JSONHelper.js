/**
 * So far not used - if not used in first draft release - DELETE
 */
class JSONHelper{


  /**
   * This function sends items from backend to front-end with JSON
   * @param  {Object} context global properties wrapper
   * @return {Object}         data, labels, languages...
   */
  public static function pageJSON(context){
    switch (ReportHelper.context.page.CurrentPageId) {
      /*case 'resultsSummary':
        return {
          dimensions: ReportHelper.getDimensionObject(),
          label: ReportHelper.getLabels(ReportHelper.context.page.CurrentPageId),
          language: {current: context.report.CurrentLanguage,
                     active: context.report.Languages
                   },
          page: {current: ReportHelper.context.page.CurrentPageId,
                 all: []
                }
        };
        break;*/
      default:
         return {
          dimensions: ReportHelper.getDimensionObject(),
          question: ReportHelper.getAllQuestionObject(),
          nsq: ReportHelper.getNSQObject(),
          label: ReportHelper.getLabels(ReportHelper.context.page.CurrentPageId),
          /*language: {current: context.report.CurrentLanguage,
                     active: context.report.Languages
                   },*/
          language: ReportLanguages.getLanguages(context),
          page: {current: ReportHelper.context.page.CurrentPageId,
                 all: []
                }
        };
    }
  }

    /**
     * DOESNT WORK ATM
     * @param       {[type]} obj [description]
     * @constructor
     */
  public static function GetJSON(obj){

        var t = typeof (obj);
        if (t !== "object" || obj === null) {
            // simple data type
            if (t === "string") obj = '"' + EscapeEntities(obj) + '"';
            else if(t === "number") obj = '"' + obj + '"';

            return String(obj);
        }
        else {
            // recurse array or object
            var n, v, json = [], arr = (obj && obj.constructor === Array);
            for (n in obj) {
                v = obj[n]; t = typeof(v);
                if (t === "string"){
                    v = '"' + EscapeEntities(v) + '"';
                }
                else if (t === "object" && v !== null) v = GetJSON(v);
                json.push((arr ? "" : '"' + n + '":') + String(v));
            }
            return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
        }
  }
  private static function EscapeEntities(str) {
    var entitiesMap = {
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        '\"': '\\&quot;'
          };
    return str.replace(/[&<>\"]/g, function(key) {
        return entitiesMap[key];
    });
  }
}
