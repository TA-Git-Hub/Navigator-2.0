/**
  * [@About]      - this class represents question of report

  * [@Functions]  - ReportQuestion() -constructor : line 36
                  - Setup()                       : line 50
                  - Calculate()                   : line 61
                  - non-interesting getters & setters
**/
class ReportQuestion{
  private var id : String = null;
  private var label : String = null;
  //private var description : String = null; //Won't be used, because Filip said so.
  private var details = {};
  private var flags = {}; // to-do SO, KDA, suppression... TRUE/FALSE
  private var apLink : String = null;
  private var orgcodes : String[] = []; // to-do determines local question visibility



  /**
    * [@About]      - this function is constructor

    * [@Parameters] - id - id of question ('OM06')

    * [@Return]     - none
  **/
  public function ReportQuestion(id : String) {
    this.id = id;
  }


  /**
    * [@About]      - this function assigns data to question, using it's setters
                    - it calls Calculate()

    * [@Parameters] - information - object with data to-be setup for question
                    - context     - object with confirmit global variables (report, state, etc.)

    * [@Return]     - none
  **/
  public function Setup(information, context) {
    if(information.label !== null){
      SetLabel(information.label);
    }

    /*if(information.description !== null){
      SetDescription(information.description);
    }*/

    if(information.details !== null){
    //  ReportHelper.Debug('Question validN: ' + information.details['current'].GetValidN());
      SetDetails(information.details);
    }
  }

  // -- GETTERS
  public function GetJSONString(){
    var details = {};
    for(var key in this.details){
      details[key] = this.details[key].GetJSONString();
    }
    return {id: this.id, label: this.label, details: details, flags: this.flags, apLink: this.apLink, orgcodes: this.orgcodes};
  }

  public function GetId() {
  	return this.id;
  }

  public function GetLabel() {
    return this.label;
  }

/*  public function GetDescription() {
    return this.description;
  }*/

  public function GetDetails() {
    return this.details;
  }

  // -- SETTERS
  public function SetLabel(label) {
      this.label = label;
  }

/*  public function SetDescription(description) {
    this.description = description;
  }*/

  public function SetDetails(details) {
  //  this.details = details;

    for (var i = 0; i < details.length; i++) {
      this.details[details[i].id] = details[i].details;
    }
  }

  public function SetFlags() {

  }

}
