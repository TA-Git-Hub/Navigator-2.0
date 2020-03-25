/**
 * This class represents a single question for report
 */
class ReportQuestion{
  private var id : String = null;
  private var label : String = null;
  private var details = {};
  private var flags = {}; // to-do SO, KDA, suppression... TRUE/FALSE
  private var apLink : String = null;
  private var orgcodes : String[] = []; // to-do determines local question visibility



  /**
   * Constructor for Object of ReportQuestion
   * @param       {[String]} id survey question ID
   * @constructor
   */
  public function ReportQuestion(id : String) {
    this.id = id;
  }


  /**
   * This function takes raw information and sets the ReportQuestion
   * @param       {[Object]} information raw data
   * @param       {[Object]} context     global properties wrapper
   * @constructor
   */
  public function setup(information, context) {
    if (information.label !== null) {
      setLabel(information.label);
    }

    if (information.details !== null) {
      setDetails(information.details);
      checkCurrentMinN();
    }
  }

  public function getJSONString(context){
    var details = {};
    for(var key in this.details){
    //context.log.LogDebug('key: ' + key)
      details[key] = this.details[key].getJSONString(context);
    }
    return {id: this.id, label: this.label, details: details, flags: this.flags, apLink: this.apLink, orgcodes: this.orgcodes};
  }

  public function getID() {
  	return this.id;
  }

  public function getLabel() {
    return this.label;
  }


  public function getDetails() {
    return this.details;
  }

  // -- SETTERS
  public function setLabel(label) {
      this.label = label;
  }


  public function setDetails(details) {
   //this.details = details;

    for (var i = 0; i < details.length; i++) {
      this.details[details[i].id] = details[i].details;
    }
  }

  public function checkCurrentMinN() {
    var current = this.details.current;
    var minN = current.getFlags().minN;

    if (minN === true){
      for (var key in this.details){
        details[key].setFlags('minN', true);
        details[key].calculate({});
      }
      this.flags.minN = true;
    }
  }

  public function setFlags() {

  }

}

class ReportNSQ extends ReportQuestion{
  private var type = null;

  public function ReportNSQ(id){
    super(id);
  }

}
