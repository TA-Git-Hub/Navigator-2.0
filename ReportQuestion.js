class ReportQuestion{
  private var id : String = null;
  private var label : String = null;
  private var description : String = null;
  private var distribution : int[] = []; // to-do
  private var comparatorValues = {trend: int[] = null,
                        internal: int[] = null,
                        external: int[] = null
                      };
  private var scores = {fav: int = null,
                        neu: int = null,
                        unfav: int = null,
                        validN: int = null
                      };
  private var flags = {}; // to-do SO, KDA, suppression... TRUE/FALSE
  private var apLink : String = null;
  private var orgcodes : String[] = []; // to-do determines local question visibility

  // constructor
  public function ReportQuestion(id : String) {
    this.id = id;
  }

  // -- CALCULATIONS
  public function Setup(information) {
    if(information.label !== null){
      SetLabel(information.label);
    }
    if(information.description !== null){
      SetDecsription(information.description);
    }
    if(information.distribution !== null){
      SetDistribution(information.distribution);
    }
    if(information.comparatorValues !== null){
      SetComparatorValues(information.comparatorValues);
    }
    if(information.scores !== null){
      SetScores(information.scores);
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

  public function SetDecsription(description) {
    this.description = description;
  }

  public function SetDistribution(distribution) {
    this.distribution = distribution;
  }

  public funtion SetComparatorValues(comparatorValues) {
    this.comparatorValues.trend = comparatorValues.trend;
    this.comparatorValues.internal = comparatorValues.internal;
    this.comparatorValues.external = comparatorValues.external;

  }

  public function SetScores(scores) {
    this.scores.fav = scores.fav;
    this.scores.neu = scores.neu;
    this.scores.unfav = scores.unfav;
    this.scores.validN = scores.validN;
  }

  public function SetFlags() {

  }

}
