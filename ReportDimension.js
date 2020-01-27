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
      var compID = ConfigHelper.waveID(i);
      this.getScores(compID);
      }
      for (var i = 0; i<Config.Internal; i++){
      var compID = 'internal'+(i+1);
      this.getScores(compID);
      }
    }

    public function GetJSONString(context){
    return {id: this.id, label: this.label, description:this.description, results: this.results, questionArray:this.questionArray, flags: this.flags, apLink: this.apLink};
    }

  //public function convertComp

public function getScores(compID){
  this.results[compID]={}
  var resultsType=['fav','neu','unfav','validN'];
  for (var j=0; j<reslutsType.lenght;j++){
  var type = reslutsType[j];
  this.results[wave][type] = setDimScore(type, compID, context);
  this.results[compID]['comp'] = {};
  }
}

    function setDimScore(score, compID, context){
      var total = 0;
      var count = 0;
      //context.log.LogDebug(waveID);
      for (var q in this.questionArray){
        //context.log.LogDebug(questionArray[q].id);
      //  context.log.LogDebug(q.details[waveID][score]);
      total = total +  questionArray[q].details[compID][score];
      //  context.log.LogDebug('18');
      count = count + 1;
      //  context.log.LogDebug('19');
    }
    context.log.LogDebug(Math.round(total/count) + ' ' + total/count)
    return Math.round(total/count);
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
