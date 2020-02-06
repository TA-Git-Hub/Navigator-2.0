class Config {

  static const dataSources = {
    mainSurvey: 'ds0',
    rtSurvey: 'ds_rt',
    apSurvey: 'ds_ap',
    normSurvey: 'ds_norm'
  };

  // Wave (for Historical Data)
static const wave = {
  variableID: 'Wave',
  //Current wave year
  //Current: 2016,
  //UPDATED THE BELOW TO REFLECT WAVE CODE VALUES IN SURVEY FOR YOUR PROJECT
  //Current year ALWAYS to be first in Codes!

  codes: [2016, 2015, 2014, 2013] // RP-24 Three years of Trends
};

static const comparators = {
  internals: ['Top', 'Parent', 'Level2', 'Custom1', 'Custom2'],
  externals: [/*'AllCompany_A_16TO18_Avg'*/],

  defaultValues: {
    internals: ['Top'],
    externals: ['AllCompany_A_16TO18_Avg']
  }
};


//Hierarchy settings
static var hierarchy = {
    schemaId: 5078, //US - Change for your project
//SchemaId: 3857, //EURO SERVER - Change for your project
//SchemaId: 4237, //EURO-GER SERVER - Change for your project
    parentRelationName: 'parent', // *** NOTE: Case sensitive ***
    tableName: 'Korn Ferry Report new',
    variableID: 'Orgcode',
    topNodeID: '1000',
    direct: false,
    hideSelector: false,
    hideScoresColumnName: '__l9hide',
    numberOfChildren: 1
};

  static var dimensionArray = [
      //{ Id:'DIM_ENG', Questions: [ 'OM12', /* 'OM01' ,*/ 'OS02', 'OM06', 'OM11'], Tier:2 } ,
      	{ id:'DIM_ENG', question: ['OM11', 'OM12', 'OM01', 'OM06'], tier:2},
        { id:'DIM_ENA', question: ['WE08', 'WE12', 'JS05', 'JS02'], tier:2},
	      { id:'DIM_N51', question: ['SD03', 'SD04', 'SD05', 'GP07'], tier:1}, //Clear and promising direction
	      { id:'DIM_N53', question: ['SD05', 'GP12', 'LD04', 'LD09'], tier:1}, //Confidence in leaders
        { id:'DIM_N50', question: ['IV04', 'DM02', 'VC04'], tier:2},
        { id:'DIM_N61', question: ['PE03', 'PE06', 'PE09', 'CP14'], tier:2},
        { id:'DIM_N52', question: ['GP09', 'TW06', 'TW04'], tier:2},
        { id:'DIM_N65', question: ['GP10', 'WL01', 'ER01', 'RC01'], tier:2},
        { id:'DIM_N67', question: ['ST01', 'IV02', 'WE01'], tier:2},
        { id:'DIM_N64', question: ['WS03', 'DC11', 'RE01'], tier:2},
        { id:'DIM_N63', question: ['QS02', 'QS01', 'QS03', 'QS16', 'OS02'], tier:2},
        { id:'DIM_N66', question: ['TR01', 'TR09', 'TR04'], tier:2},
        { id:'DIM_N54', question: ['AV15', 'AV09', 'SP12'], tier:2},
        { id:'DIM_N60', question: ['CP11', 'CP12', 'BN01'], tier:2},
      	{ id:'DIM_ENPS', question: ['NP01'], suppressScoring: false, tier:2}
  	];

    static var questionGridStructure = [
                {id: 'GRID1', question: ['SD03',	'SD04',	'SD05',	'GP07',	'GP12',	'LD04',	'LD09',	'IV04',
                     'DM02',	'VC04',	'PE03',	'PE06',	'PE09',	'CP14',	'GP09',	'TW06',
                     'TW04',	'GP10',	'WL01',	'ER01',	'RC01',	'ST01',	'IV02',	'WE01',
                     'WS03',	'DC11',	'RE01',	'QS02',	'QS01',	'QS03',	'QS16',	'TR01',
                     'TR09',	'TR04',	'AV15',	'AV09',	'SP12',	'CP11',	'CP12',	'BN01',
                     'WE08',	'WE12',	'JS05',	'JS02',	'OM11',	'OM12',	'OS02',	'OM01',
                     'CQ50',	'CQ51',	'CQ52',	'CQ53',	'CQ54',	'CQ55',	'CQ56',	'CQ57',
                     'CQ58',	'CQ59',	'CQ60',	'CQ61']},
                {id: 'OM06', question: null},
                {id: 'NP01', question: null}
      ];
}
