class ReportDimension {

  //Array for question objects
  private var questionArray = {};

  //ID and texts
  private  var id: String = null;
  private  var label: String = null;
  private  var description: String = null;

  //Statistics from table
  private var scores = {fav: int = null,
                        neu: int = null,
                        unfav: int = null,
                        validN: int = null
                      }

 //todo Question class includes count, valid N , fav

  private var comparatorValues = {};

  private var flags = {}; // to-do SO, KDA, suppression... TRUE/FALSE
  private var apLink: String = null;
  private var orgcodes: String[] = []; // to-do determines local question visibility

  // constructor
  public function ReportDimension(id : String) {
    this.id = id;
    questionArray = getQuestions(id);

    for (var stat in scores){
      if checkSuppression(){
        scores.stat=getScore(stat);
      }
      else{
        scores.stat=-1;
      }
    }
  }

  public function checkSuppression(){
    return false;
  }

//Get Dimension score calculated from question scores
  public function getScore (stat){
    var count = 0;
      var sum = 0;
      for (var i = 0; i < questionArray.length; i++) {
        var q = questionArray[i];
        sum += q.stat;
        count ++;
      }
      return = Math.round(sum/count);
  }


//add question objects into dimension object
  private function getQuestions (dID){
    for (var i = 0; i < Config.Dimensions[dID].length; i++) {
      var q = new ReportQuestion(Config.Dimensions[dID][i]);
      questionArray.qID=q;
    }
  }



}
