/**
  * [@About]      - this class represents report information

  * [@Functions]  - Setup()         : line 16
                  - Calculate()     : line 30
                  - non-interesting getters & setters
**/
class ReportDetails{
  private var distribution = [];
  private var fav = null;
  private var neu = null;
  private var unfav = null;
  private var scale = {};
  private var validN = null;

  public function ReportDetails(id){
      SetScale(id);
  }

  public function Setup(information, context){

    if(information.distribution !== null){

      SetDistribution(information.distribution);
    }

    if(information.validN !== null){
      //ReportHelper.Debug('Details validN: ' + information.validN);
      SetValidN(information.validN);
    }

    Calculate(context);
  }

  /**
    * [@About]      - this function takes distributions and validN - then calculates fav/neu/unfav

    * [@Parameters] - context     - object with confirmit global variables (report, state, etc.)

    * [@Return]     - none
  **/
  public function Calculate(context){
    this.fav = 0;
    this.neu = 0;
    this.unfav = 0;

    for(var i = 0; i < this.scale.length; i++){

      switch(this.scale[i].Weight){
        case 1 :
        ReportHelper.Debug('Distribution: ' + this.distribution[i]);
          this.fav += this.distribution[i];
          break;
        case 0 :
          this.neu += this.distribution[i];
          break;
        case -1:
          this.unfav += this.distribution[i];
          break;

        default:
      }
    }
    CalculateMethology('count/validN');
  }

  private function CalculateMethology(type){

    switch (type) {
      case 'count/validN':
    //  ReportHelper.Debug('favBefore: ' + this.fav);
        this.fav = (this.validN === 0) ? -1 : Math.round((this.fav / this.validN)*100);

      //  ReportHelper.Debug('favAfter: ' + this.fav);

      /*  ReportHelper.Debug('neuBefore: ' + this.neu);
        var temp = this.neu;*/
        this.neu = (this.validN === 0) ? -1 : Math.round((temp / this.validN)*100);

      //  ReportHelper.Debug('neuafter: ' + this.neu);
        this.unfav = (this.validN === 0) ? -1 : Math.round((this.unfav / this.validN)*100);
        break;
      default:

    }
  }

  //GETTERS
  public function GetValidN(){
    return this.validN;
  }

  public function GetJSONString(){
    return {validN: this.validN, distribution: this.distribution, /*scale: this.scale,*/ fav: this.fav, neu: this.neu, unfav: this.unfav};

  }

  //Setters

  public function SetDistribution(distribution){
    this.distribution = distribution;
  }

  public function SetFav(fav){
    this.fav = fav;
  }

  public function SetNeu(neu){
    this.neu = neu;
  }

  public function SetUnfav(unfav){
    this.unfav = unfav;
  }

  public function SetValidN(validN){
    this.validN = validN;
  }

  public function SetScale(id){
    this.scale = ReportHelper.GetQuestionScale(id);
  }

}
