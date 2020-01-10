class ReportQuestion{
  private var id : String = null;
  private var qName : String = null;
  private var qText : String = null;
  private var distribution : int[] = []; // to-do
  private var comparatorValues : int[] = []; // to-do must be sorted!!
  private var scoreMapping = {Fav: null, Neu: null, Unfav: null};
  private var validN : int = null;
  private var flags = {}; // to-do SO, KDA, suppression... TRUE/FALSE
  private var apLink : String = null;
  private var orgcodes : String[] = []; // to-do determines local question visibility

  // constructor
  public function ReportQuestion(id : String) {
    this.id = id;
    //this.qName = questionInfo.qName;
    //this.qText = questionInfo.qText;
    //this.distribution = questionInfo.distribution;
    //this.comparatorValues = questionInfo.comparatorValues;
    //this.scoreMapping = questionInfo.scoreMapping;
    //this.validN = questionInfo.validN;
    //this.flags = questionInfo.flags;
    //this.apLink = questionInfo.apLink;
    //this.orgcodes = questionInfo.orgcodes;
  }

  // -- CALCULATIONS



  // -- GETTERS
  public function GetId() {
  	return this.id;
  }

  // -- SETTERS
  public function SetFlags() {

  }
}
