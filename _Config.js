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
  internals: ['REportBase','TopLevel','Parent:1','Parent:2','internal4'],
  externals: [/*'AllCompany_A_16TO18_Avg'*/],

  defaultValues: {
    internals: ['Top'],
    externals: ['AllCompany_A_16TO18_Avg']
  }
};

static var filters = ['Segment_EEF','intenttostay','Gender','Country','Region','Graduate','Disability','White_Blue_Collar',
                  'Band','Manager','Occupation','Ethnicity','exemptnon','unionnon','wage_status','Age','Worker','Tenure',
                  'FullTime','Expat','Headquarters','job_function','performance_rating','Site'];

static var demographics = ['Orgcode', 'Segment_EEF','intenttostay','Gender','Country','Region','Graduate',
                       'Disability','White_Blue_Collar','Band','Manager','Occupation','Ethnicity','exemptnon',
                       'unionnon','wage_status','Age','Worker','Tenure','FullTime','Expat','Headquarters',
                       'job_function','performance_rating','Site'];


//Hierarchy settings
static const hierarchy = {
    schemaID: 5078, //US - Change for your project
//SchemaId: 3857, //EURO SERVER - Change for your project
//SchemaId: 4237, //EURO-GER SERVER - Change for your project
    parentRelationName: 'parent', // *** NOTE: Case sensitive ***
    tableName: 'Korn Ferry Report new',
    hierarchyName: 'Korn Ferry Report new',
    variableID: 'Orgcode',
    topNodeID: '1000',
    direct: false,
    hideSelector: false,
    violatorColumnName: '__l9hide',
    numberOfChildren: 1
};

static var suppression = {
  // if threshold = 0 its switched off
  minN: 5,
  commentMinN: 30,
  violator: true,
  reminder: 0
}

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

      // Comments Questions
    static var comments = {
      questions: [{id:'Comm1', nodeIds: ['1001']] /*['1001']*/},
                  {id:'Comm2', nodeIds: null/*['1002']*/},
                  {id:'Comm3', nodeIds: null/*['1001','1048']*/}],
      useVerbatimComponent: false, // if false show typical view which has a HitList component. This limits response text to 4K characters
      includeThemesInCommentsTable: true //controls inclusion/exclusion comment themes next to the actual comment in comments table
    };

    static var nsq = {
      multi: [
        {id: 'CQ62', showTrend: true}
      ],
      ranking: [
        {id: 'CQ63', showTrend: true}
      ],
      numeric: [
        {id: 'CQ64', showTrend: true}
      ],
      numericList: [
        {id: 'CQ65', showTrend: true}
      ]
    };
}
