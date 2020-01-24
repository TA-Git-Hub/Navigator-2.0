class ReportDimension{

  private var questionArray = {}; //Array for question objects
//----------------------------------------------
  private var id = "";
  private var label = "";
  private var description = "";
  private var flags = {}; // to-do SO, KDA, suppression... TRUE/FALSE
  private var apLink = "";

  //Dimension Results
  public var results = {};

  // constructor---------------------------------
  public function ReportDimension(dim, allQ, context) {
    this.id = dim.Id;
    this.label = getDimLabel();
    this.description = getDimDescription();
    loadQuestionsToDimension(dim, allQ, context);
    calculateDimResults();
   }


  //fill dimension-----------------------------
    function loadQuestionsToDimension(dim, allQ, context){
      for (var i = 0; i < dim.Questions.length; i++) {
        var qID = dim.Questions[i];
        this.questionArray[qID]= allQ[qID];
      }
    }

    function calculateDimResults(){
      this.results['fav'] = setDimScore(1);
      this.results['neu'] = setDimScore(0);
      this.results['unfav'] = setDimScore(-1);
      this.results['validN'] = setDimValidN();
      this.results['comparatorValues'] = {};
    }

    function setDimScore(score){
      return 15;
    }

    function setDimValidN() {
      return 200;
    }

//----------------------------------------------
  function getDimDescription(){
  return "Dimension description"
  };

  function getDimLabel(){
  return "Dimension Label"
  };

  //----------------------------------------------
  }
