class ReportDimension {

  var questionArray = {}; //Array for question objects
  var id = "";
  var label = "";
  var description = "";
  var flags = {}; // to-do SO, KDA, suppression... TRUE/FALSE
  var apLink = "";
  var results = {};

  // constructor---------------------------------
  function ReportDimension(dim, allQ, context) {
    this.id = dim.id;
    this.label = this.getDimLabel();
    this.description = getDimDescription();
    loadQuestionsToDimension(dim, allQ, context);
    calculateDimResults(context);
  }

  //fill dimension-----------------------------
  function loadQuestionsToDimension(dim, allQ, context) {
    for (var i = 0; i < dim.question.length; i++) {
      var qID = dim.question[i];
      this.questionArray[qID] = allQ[qID];
    }
  }

  //----------------Fill dimension scores
  function calculateDimResults(context) {
    for (var i = 0; i < Config.wave.codes.length; i++) {
      var compID = ConfigHelper.getWaveID(i);
      this.getScores(compID, context);
    }
    for (var i = 0; i < Config.comparators.internals; i++) {
      var compID = 'internal' + (i);
      this.getScores(compID, context);
    }
  }

  function getScores(compID, context) {
    this.results[compID] = {}
    var resultsType = ['fav', 'neu', 'unfav', 'validN'];
    for (var j = 0; j < resultsType.length; j++) {
      var type = resultsType[j];
      this.results[compID][type] = setDimScore(type, compID, context);
    }
    this.results[compID]['comp'] = {};
  }

  function setDimScore(score, compID, context) {
    var total = 0;
    var count = 0;
    for (var q in this.questionArray) {
      total = total + questionArray[q].details[compID][score];
      count = count + 1;
    }
    return Math.round(total / count);
  }

  //----------------------------------------------
  function getDimDescription() {
    return Config.wave.codes[0];
  };

  function getDimLabel() {
    return Config.wave.codes[0];
  };
  //----------------------------------------------
  function GetJSONString(context) {
    return {
      id: this.id,
      label: this.label,
      description: this.description,
      results: this.results,
      questionArray: this.questionArray,
      flags: this.flags,
      apLink: this.apLink
    };
  }
}
