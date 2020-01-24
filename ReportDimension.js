class ReportDimension{

  private var questionArray = {}; //Array for question objects
//----------------------------------------------
  private var id = "";
  private var label = "";
  private var description = "";
  private var flags = {}; // to-do SO, KDA, suppression... TRUE/FALSE
  private var apLink = "";

  //Dimension Results
  private var results = {};

  // constructor---------------------------------
  public function ReportDimension(dimID, allQ, context) {
    this.id = dimID;
    this.label = getDimLabel();
    this.description = getDimDescription();
    loadQuestionsToDimension(allQ, context);
    calculateDimResults();
   }


  //fill dimension-----------------------------
    function loadQuestionsToDimension(allQ, context){
      for (var i = 0; i < this.Questions.length; i++) {
        var qID = this.Questions[i];
        this.questionArray[qID]= allQ[qID];
      }
    }

    function calculateDimResults(){
      this.results['fav'] = setDimScore(1);
      this.results['neu'] = setDimScore(0);
      this.results['unfav'] = setDimScore(-1);
      this.results['validN'] = setDimValidN;
      this.results['comparatorValues'] = {};
    }

    function setDimScore(score){
      return 15*score;
    }

    function setDimValid () {
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
