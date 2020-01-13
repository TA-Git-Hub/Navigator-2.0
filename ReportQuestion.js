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
  }

  // -- CALCULATIONS



  // -- GETTERS
  public function GetId() {
  	return this.id;
  }

  // -- SETTERS
  public function SetFlags() {

  }

  //TEST of Confirmit JS
  public function SetOrgcodes(testArray : String[]) {
    this.orgcodes = new String[testArray.length];

    for(var i = 0; i < testArray.length; i++){
      this.orgcodes[i] = testArray[i];
      //this.orgcodes.push(testArray[i]);
    }
  }
}
