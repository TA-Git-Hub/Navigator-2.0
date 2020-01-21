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
  public function ReportDimension(dim, allQ, context) {
    this.id = dim.id;
    this.questionArray = loadQuestionsToDimension(dim, allQ, context);
    this.description = getDimDescription()
  }
//----------------------------------------------
  function getDimDescription(){
  };
//----------------------------------------------
  function loadQuestionsToDimension(dim, allQ, context){
    for (var j = 0; j < dim.questions.length; j++) {
    var qID = dim.questions[j];
    questionArray[qID]= allQ[qID];
    }
  }
  }
//----------------------------------------------
