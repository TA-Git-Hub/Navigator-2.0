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
  private var description : String = null;
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

    if(information.description !== null){
      SetDescription(information.description);
    }

    if(information.distribution !== null){
      SetDistribution(information.distribution);
    }

    if(information.comparatorValues !== null){
      SetComparatorValues(information.comparatorValues);
    }

    if(information.validN !== null){
      SetValidN(information.validN);
    }
    Calculate(context);
  }


  /**
    * [@About]      - this function takes distributions and validN - then calculates fav/neu/unfav

    * [@Parameters] - context     - object with confirmit global variables (report, state, etc.)

    * [@Return]     - none
  **/
  public function Calculate(context){
    var indexes = Config.GetDistributionIndexes(this.id);

    for(var key in indexes){
      if(indexes[key] !== null){
        var count = 0;
        for(var i = 0; i < indexes[key].length; i++){
          count += this.distribution[indexes[key][i]];
        }
        switch (key) {
          case "fav":
            if (this.scores.validN !== 0) {
              this.scores.fav = Math.round((count / this.scores.validN)*100);
            }
            else{
              this.scores.fav = -1;
            }
            break;
          case "neu":
            if (this.scores.validN !== 0) {
              this.scores.neu = Math.round((count / this.scores.validN)*100);
            }
            else{
              this.scores.neu = -1;
            }
            break;
          case "unfav":
            if (this.scores.validN !== 0) {
              this.scores.unfav = Math.round((count / this.scores.validN)*100);
            }
            else{
              this.scores.unfav = -1;
            }
            break;
          default:
            ReportHelper.Debug("ERROR: ReportQuestion.Calculate()");
        }
      }
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

  public function GetDistribution() {
    return this.distribution;
  }

  public function GetComparatorValues() {
    return this.comparatorValues;
  }

  public function GetValidN() {
    return this.scores.validN;
  }

  public function GetScores() {
    return this.scores;
  }

  // -- SETTERS
  public function SetLabel(label) {
      this.label = label;
  }

  public function SetDescription(description) {
    this.description = description;
  }

  public function SetDistribution(distribution) {
    this.distribution = distribution;

  }

  public function SetComparatorValues(comparatorValues) {
    this.comparatorValues.trend = comparatorValues.trend;
    this.comparatorValues.inter = comparatorValues.inter;
    this.comparatorValues.exter = comparatorValues.exter;

  }

  public function SetScores(scores) {
    this.scores.fav = scores.fav;
    this.scores.neu = scores.neu;
    this.scores.unfav = scores.unfav;
  }

  public function SetValidN(validN) {
    this.scores.validN = validN;
  }

  public function SetFlags() {

  }

}
