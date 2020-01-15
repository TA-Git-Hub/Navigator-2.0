class ReportQuestion{
  private var id : String = null;
  private var label : String = null;
  private var description : String = null;
  private var distribution /*: int[]*/ = []; // to-do
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

  // constructor
  public function ReportQuestion(id : String) {
    this.id = id;
    //this.scores = Config.GetDistributionIndexes(this.id);
  }

  // -- CALCULATIONS
  public function Setup(information, context) {
  //  ReportHelper.Debug("1 " + information.label, context.log);
    if(information.label !== null){
      SetLabel(information.label);
    }
  //  ReportHelper.Debug("2 " + information.description, context.log);
    if(information.description !== null){
      SetDescription(information.description);
    }
  //  ReportHelper.Debug("3 " + information.distribution, context.log);
    if(information.distribution !== null){
      SetDistribution(information.distribution);
    }
  //  ReportHelper.Debug("4 " + information.comparatorValues, context.log);
    if(information.comparatorValues !== null){
      SetComparatorValues(information.comparatorValues);
    }
  //  ReportHelper.Debug("5 " + information.validN, context.log);
    if(information.validN !== null){
      SetValidN(information.validN);
    }
    Calculate(context);
  }

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
              this.scores.fav = Math.round((count / this.scores.validN)*100);
            break;
          case "neu":
              this.scores.neu = Math.round((count / this.scores.validN)*100);
            break;
          case "unfav":
              this.scores.unfav = Math.round((count / this.scores.validN)*100);
            break;
          default:
            ReportHelper.Debug("ERROR: ReportQuestion.Calculate()", context.log);
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
    this.distribution = distribution;/*new int[distribution.length];
    for(var i = 0; i < distribution.length; i++){
      this.distribution[i] = distribution[i];
    }*/

  }

  public function SetComparatorValues(comparatorValues) {
    this.comparatorValues.trend = comparatorValues.trend;
    this.comparatorValues.internal = comparatorValues.internal;
    this.comparatorValues.external = comparatorValues.external;

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
