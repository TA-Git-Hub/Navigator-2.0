class ReportQuestion{
  private var id : String = null;
  private var label : String = null;
  private var description : String = null;
  private var distribution : int[] = []; // to-do
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
  private var numberOfAnswers : int = null;

  // constructor
  public function ReportQuestion(id : String) {
    this.id = id;
    //this.scores = Config.GetDistributionIndexes(this.id);
  }

  // -- CALCULATIONS
  public function Setup(information, context) {
    ReportHelper.Debug("1 " + information.label, context.log);
    if(information.label !== null){
      SetLabel(information.label);
    }
    ReportHelper.Debug("2 " + information.description, context.log);
    if(information.description !== null){
      SetDescription(information.description);
    }
    ReportHelper.Debug("3 " + information.distribution, context.log);
    if(information.distribution !== null){
      SetDistribution(information.distribution);
    }
    ReportHelper.Debug("4 " + information.comparatorValues, context.log);
    if(information.comparatorValues !== null){
      SetComparatorValues(information.comparatorValues);
    }
    ReportHelper.Debug("5 " + information.validN, context.log);
    if(information.validN !== null){
      SetValidN(information.validN);
    }
  }

  // -- GETTERS
  public function GetId() {
  	return this.id;
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
