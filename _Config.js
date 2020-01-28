class Config {

  static const DataSources = {
    MainSurvey: 'ds0',
    RTSurvey: 'ds_rt',
    APSurvey: 'ds_ap',
    NormSurvey: 'ds_norm'
  };

  // Wave (for Historical Data)
static const Wave = {
  VariableId: 'Wave',
  //Current wave year
  //Current: 2016,
  //UPDATED THE BELOW TO REFLECT WAVE CODE VALUES IN SURVEY FOR YOUR PROJECT
  //Current year ALWAYS to be first in Codes!
  Codes:[2016, 2015, 2014, 2013] // RP-24 Three years of Trends
};

static const Comparators = {
  Internal: ['Top', 'Parent', 'Level2', 'Custom1', 'Custom2'],
  External: [/*'AllCompany_A_16TO18_Avg'*/],

  DefaultValues: {
    Internal: ['Top'],
    External: ['AllCompany_A_16TO18_Avg']
  }
};


//Hierarchy settings
static var Hierarchy = {
    SchemaId: 5078, //US - Change for your project
//SchemaId: 3857, //EURO SERVER - Change for your project
//SchemaId: 4237, //EURO-GER SERVER - Change for your project
    ParentRelationName: 'parent', // *** NOTE: Case sensitive ***
    TableName: 'Korn Ferry Report new',
    VariableId: 'Orgcode',
    TopNodeId: '1000',
    Direct: false,
    HideSelector: false,
    HideScoresColumnName: '__l9hide',
    NumberOfChildren: 1
};

  static var Dimensions = [
      //{ Id:'DIM_ENG', Questions: [ 'OM12', /* 'OM01' ,*/ 'OS02', 'OM06', 'OM11'], Tier:2 } ,
      	{ Id:'DIM_ENG', Questions: ['OM11','OM12','OM01','OM06'],Tier:2},
        { Id:'DIM_ENA', Questions: ['WE08','WE12','JS05','JS02'],Tier:2},
	      { Id:'DIM_N51', Questions: ['SD03','SD04','SD05','GP07'],Tier:1}, //Clear and promising direction
	      { Id:'DIM_N53', Questions: ['SD05','GP12','LD04','LD09'],Tier:1}, //Confidence in leaders
        { Id:'DIM_N50', Questions: ['IV04','DM02','VC04'],Tier:2},
        { Id:'DIM_N61', Questions: ['PE03','PE06','PE09','CP14'],Tier:2},
        { Id:'DIM_N52', Questions: ['GP09','TW06','TW04'],Tier:2},
        { Id:'DIM_N65', Questions: ['GP10','WL01','ER01','RC01'],Tier:2},
        { Id:'DIM_N67', Questions: ['ST01','IV02','WE01'],Tier:2},
        { Id:'DIM_N64', Questions: ['WS03','DC11','RE01'],Tier:2},
        { Id:'DIM_N63', Questions: ['QS02','QS01','QS03','QS16','OS02'],Tier:2},
        { Id:'DIM_N66', Questions: ['TR01','TR09','TR04'],Tier:2},
        { Id:'DIM_N54', Questions: ['AV15','AV09','SP12'],Tier:2},
        { Id:'DIM_N60', Questions: ['CP11','CP12','BN01'],Tier:2},
      	{ Id:'DIM_ENPS', Questions: ['NP01'], SuppressScoring:false,Tier:2}
  	];

    static var QuestionsGridStructure = [
                {Id: 'GRID1', Qs: ['SD03',	'SD04',	'SD05',	'GP07',	'GP12',	'LD04',	'LD09',	'IV04',
                     'DM02',	'VC04',	'PE03',	'PE06',	'PE09',	'CP14',	'GP09',	'TW06',
                     'TW04',	'GP10',	'WL01',	'ER01',	'RC01',	'ST01',	'IV02',	'WE01',
                     'WS03',	'DC11',	'RE01',	'QS02',	'QS01',	'QS03',	'QS16',	'TR01',
                     'TR09',	'TR04',	'AV15',	'AV09',	'SP12',	'CP11',	'CP12',	'BN01',
                     'WE08',	'WE12',	'JS05',	'JS02',	'OM11',	'OM12',	'OS02',	'OM01',
                     'CQ50',	'CQ51',	'CQ52',	'CQ53',	'CQ54',	'CQ55',	'CQ56',	'CQ57',
                     'CQ58',	'CQ59',	'CQ60',	'CQ61']},
                {Id: 'OM06', Qs:null},
                {Id: 'NP01', Qs:null}
      ];

/*  static function GetDistributionIndexes (id : String) {
  		switch (id) {

  			// Questions with non-standard scales
  			case 'OM06':
  				return {fav:[3], neu:[2], unfav:[0,1]};
  				break;

  			//ENPS EXAMPLE
  			case 'NP01':
  				return {fav:[9,10], neu:[7,8], unfav:[0,1,2,3,4,5,6]};
  				break;

  			// Negatively worded questions (reverse scale)
  			case 'XXXX':
  				return { Fav:[3,4], Neu:[2], Unfav:[0,1], TopBox: 4};
  				break;


  		  // Default recoding  (normal scale)
  		  default:
  			return {fav:[0,1], neu:[2], unfav:[3,4]};
  		}
    };*/
}
