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
    var indexes = this.scale;

    for(var key in indexes){
      if(indexes[key] !== null){
        var count = 0;
        for(var i = 0; i < indexes[key].length; i++){
          count += this.distribution[indexes[key][i]];
        }

        if (this.validN !== 0) {
          this[key] = Math.round((count / this.validN)*100);
        }
        else{
          this[key] = -1;
        }
/*        switch (key) {
          case "fav":
            if (this.validN !== 0) {
              this.fav = Math.round((count / this.validN)*100);
            }
            else{
              this.fav = -1;
            }
            break;
          case "neu":
            if (this.validN !== 0) {
              this.neu = Math.round((count / this.validN)*100);
            }
            else{
              this.neu = -1;
            }
            break;
          case "unfav":
            if (this.validN !== 0) {
              this.unfav = Math.round((count / this.validN)*100);
            }
            else{
              this.unfav = -1;
            }
            break;
          default:
            ReportHelper.Debug("ERROR: ReportDetails.Calculate()");
        }*/
      }
    }
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
    this.scale = Config.GetDistributionIndexes(id);
  }
}