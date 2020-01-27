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
      context.log.LogDebug('14');
      for (var i = 0; i<Config.Wave.Codes.length; i++){
        context.log.LogDebug('14');
      var wave = Config.Wave.Codes[i];
      context.log.LogDebug('14');
      this.results[wave]={}
      context.log.LogDebug('14');
      this.results[wave]['fav'] = setDimScore('fav', ConfigHelper.waveID(i), context);
      context.log.LogDebug('15');
      this.results[wave]['neu'] = setDimScore('neu', ConfigHelper.waveID(i), context);
      this.results[wave]['unfav'] = setDimScore('unfav', ConfigHelper.waveID(i), context);
      this.results[wave]['N'] = setDimValidN(ConfigHelper.waveID(i));
      this.results[wave]['comp'] = {};

      }
    }
    public function GetJSONString(context){
    return {id: this.id, label: this.label, description:this.description, results: this.results, questionArray:this.questionArray, flags: this.flags, apLink: this.apLink};
    }

  //public function convertComp


    function setDimScore(score, waveID, context){
      var total = 0;
      var count = 0;
      context.log.LogDebug('16');
      for (var q in this.questionArray){
        context.log.LogDebug('17');
      total = total +  q.details[waveID][score];
        context.log.LogDebug('18');
      count = count + 1;
        context.log.LogDebug('19');
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
