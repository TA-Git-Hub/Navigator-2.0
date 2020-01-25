class ReportDimension{

  public var questionArray = {}; //Array for question objects
//----------------------------------------------
  public var id = "";
  public var label = "";
  public var description = "";
  public var flags = {}; // to-do SO, KDA, suppression... TRUE/FALSE
  public var apLink = "";

  //Dimension Results
  public var results = {};

  // constructor---------------------------------
  public function ReportDimension(dim, allQ, context) {
    this.id = dim.Id;
    this.label = this.getDimLabel();
    //context.log.LogDebug('10'+this.label);
    this.description = getDimDescription();
    //context.log.LogDebug('11'+this.description);
    context.log.LogDebug('12'+getDimDescription());
    this.loadQuestionsToDimension(dim, allQ, context);
    context.logLogDebug('13');
    this.calculateDimResults(context);
   }


  //fill dimension-----------------------------
    function loadQuestionsToDimension(dim, allQ, context){
      for (var i = 0; i < dim.Questions.length; i++) {
        context.log.LogDebug('i');
        var qID = dim.Questions[i];
        this.questionArray[qID]= allQ[qID];
      }
    }

    function calculateDimResults(context){
      for (var i = 0; i<Config.Wave.Codes.length; i++){
        context.log.LogDebug(i);
      this.results[Config.Wave.Codes[i]]['fav'] = setDimScore(1);
      //this.results[Config.Wave.Codes[i]]['neu'] = setDimScore(0);
      //this.results[Config.Wave.Codes[i]]['unfav'] = setDimScore(-1);
      //this.results[Config.Wave.Codes[i]]['validN'] = setDimValidN();
      //this.results[Config.Wave.Codes[i]]['comparatorValues'] = {};
      }
    }

    function setDimScore(score){
      return 15;
    }

    function setDimValidN() {
      return 200;

    }

//----------------------------------------------
  function getDimDescription(){
  return Config.Wave.Codes[0];
  };

  function getDimLabel(){
  return Config.Wave.Codes[0];

  };

  //----------------------------------------------
  }
