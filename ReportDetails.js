/**
 * This class represents details such as score, distribution, scale, validN
 */
class ReportDetails{
  private var distribution = [];
  private var distributionTexts = [];
  private var fav = null;
  private var neu = null;
  private var unfav = null;
  private var scale = {};
  private var validN = null;
  private var flags = {minN: null};

  /**
   * Constructor for object of ReportDetails, provide ID and get scale from survey
   * @param       {[String]} id question ID
   * @constructor
   */
  public function ReportDetails(id){
      setScale(id);
  }

  /**
   * This function takes in raw information and changes them into proper format
   * @param       {Object} information raw data from table, includes distribution, score, validN etc
   * @param       {[Object]} context     wrapper of global properties
   */
  public function setup(information, context){

    if (information.distribution !== null) {
      setDistribution(information.distribution);
    }

    if (information.validN !== null) {
      if(information.validN < Config.suppression.minN){
        this.flags.minN = true;

        setDistribution([]);
      }
      else{
        setValidN(information.validN);
      }
    }

    if (information.distributionTexts !== null) {
      this.distributionTexts = information.distributionTexts;
    }

    calculate(context);
  }

/**
 * This function calculates the score of question
 * @param       {[Object]} context wrapper of global properties
 * @constructor
 */
  public function calculate(context){
    this.fav = 0;
    this.neu = 0;
    this.unfav = 0;

    if (this.flags.minN === true){

    }
    else{
      for (var i = 0; i < this.scale.length; i++) {
        switch(this.scale[i].Weight){
          case 1:
            this.fav += this.distribution[i];
            break;
          case 0:
            this.neu += this.distribution[i];
            break;
          case -1:
            this.unfav += this.distribution[i];
            break;

          case undefined:
            // don't know
            break;

          default:
            ReportHelper.debug('ReportDetails.calculate() - unknown scale weight');
          }
        }
    }
    calculateMethology('count/validN');
  }

  /**
   * In the future we may want to offer clients different ways to calculate data
   * @param  {[String]} type expression how to calculate scores
  */
  private function calculateMethology(type){
    switch (type) {
      case 'count/validN':
        this.fav = (this.flags.minN === true) ? -1 : Math.round((this.fav / this.validN)*100);
        this.neu = (this.flags.minN === true) ? -1 : Math.round((this.neu / this.validN)*100);
        this.unfav = (this.flags.minN === true) ? -1 : Math.round((this.unfav / this.validN)*100);
        break;
      default:
      ReportHelper.debug('ReportDetails.calculateMethology() - unknown calculate methology');
    }
  }

  //GETTERS
  public function getValidN(){
    return this.validN;
  }

  public function getFlags(){
    return this.flags;
  }

  public function getJSONString(){
    return {validN: this.validN, distribution: this.distribution, distributionTexts: this.distributionTexts, fav: this.fav, neu: this.neu, unfav: this.unfav, flags: this.flags};

  }

  //Setters

  public function setDistribution(distribution){
    this.distribution = distribution;
  }

  public function setFav(fav){
    this.fav = fav;
  }

  public function setNeu(neu){
    this.neu = neu;
  }

  public function setUnfav(unfav){
    this.unfav = unfav;
  }

  public function setValidN(validN){
    this.validN = validN;
  }

  public function setScale(id){
    this.scale = ReportHelper.getQuestionScale(id);
  }

  public function setFlags(flagItem, flagValue){
    this.flags[flagItem] = flagValue;
  }

}
