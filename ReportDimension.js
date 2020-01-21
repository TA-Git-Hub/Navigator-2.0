class ReportDimension{

  private var questionArray = {}; //Array for question objects
  private var id: String = null;
  private var label: String = null;
  private var description: String = null;

  private var flags = {}; // to-do SO, KDA, suppression... TRUE/FALSE
  private var apLink: String = null;
  private var orgcodes: String[] = []; // to-do determines local question visibility

  //Dimension Details
  private var fav: int = null;
  private var neu: int = null;
  private var unfav: int = null;
  private var validN: int = null;
  private var comparatorValues = {};
//----------------------------------------------
  // constructor
  public function ReportDimension(dim) {
    this.id = dim.id;
    this.questionArray = loadQuestionsToDimension(dim);
    this.description = getDimDescription()
  }
//----------------------------------------------
  function getDimDescription(){
  };
//----------------------------------------------
  function loadQuestionsToDimension(dim){
    for (var j = 0; j < dim.questions.length; j++) {
      log.LogDebug('a');
    var qID = dim.questions[j];
      log.LogDebug(qID);
    questionArray[qID]= allQ[qID];
    }
  }
//----------------------------------------------}
