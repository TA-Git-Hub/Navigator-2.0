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
    context.log.LogDebug('10'+this.label);
    this.description = getDimDescription();
    //context.log.LogDebug('11'+this.description);
    context.log.LogDebug('12'+getDimDescription());
    this.loadQuestionsToDimension(dim, allQ, context);
    context.log.LogDebug('13');
    this.calculateDimResults(context);
   }


  //fill dimension-----------------------------
    function loadQuestionsToDimension(dim, allQ, context){
      for (var i = 0; i < dim.Questions.length; i++) {
        var qID = dim.Questions[i];
        this.questionArray[qID]= allQ[qID];
      }
    }

    function calculateDimResults(context){
      for (var i = 0; i<Config.Wave.Codes.length; i++){
      var wave = Config.Wave.Codes[i];
      this.results[wave]={}
      this.results[wave]['fav'] = setDimScore('fav', wave);
      this.results[wave]['neu'] = setDimScore('neu', wave);
      this.results[wave]['unfav'] = setDimScore('unfav', wave);
      this.results[wave]['N'] = setDimValidN(wave);
      this.results[wave]['comp'] = {};

      }
    }
    public function GetJSONString(context){
    return {id: this.id, label: this.label, description:this.description, results: this.results, questionArray:this.questionArray, flags: this.flags, apLink: this.apLink};
    }


    function setDimScore(score, wave){
      var total = 0;
      var count = 0;
      for (var q in this.questionArray){
      total =+  q[wave].details[score];
      count =+ 1;
    }
    return total/count;
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
