/**
  * [@About]      - this class represents question of report

  * [@Functions]  - ReportQuestion() -constructor : line 36
                  - Setup()                       : line 50
                  - Calculate()                   : line 61
                  - non-interesting getters & setters
**/
class ReportQuestion{
  public var id : String = null;
  public var label : String = null;
  public var description : String = null;
  public var details = {};
  /*
  private var distribution = [];
  private var comparatorValues = {trend:  [],
                        inter:  [],
                        exter:  []
                      };
  private var scores = {fav:  null,
                        neu: null,
                        unfav: null,
                        validN:  null
                      };
  */
  public var flags = {}; // to-do SO, KDA, suppression... TRUE/FALSE
  public var apLink : String = null;
  public var orgcodes : String[] = []; // to-do determines local question visibility



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

    if(information.description !== null){
      SetDescription(information.description);
    }

    if(information.details !== null){
    //  ReportHelper.Debug('Question validN: ' + information.details['current'].GetValidN());
      SetDetails(information.details);
    }
  }

  // -- GETTERS
  public function GetId() {
  	return this.id;
  }

  public function GetLabel() {
    return this.label;
  }

  public function GetDescription() {
    return this.description;
  }

  public function GetDetails() {
    return this.details;
  }

  // -- SETTERS
  public function SetLabel(label) {
      this.label = label;
  }

  public function SetDescription(description) {
    this.description = description;
  }

  public function SetDetails(details) {
    this.details = details;
  }

  public function SetFlags() {

  }

}
