export function createBlankCharacterState({
  id='',
  instanceId=null
}={}){
  return {
    alienBiology:null,
    id,
    instanceId,

    name:'',
    title:'',

    raceParts:[],
    race:'',
    lineage:{},

    birthStratum:'',
    birthRegion:'',
    culture:'',

    gender:'',
    size:'',

    arch:'',
    archParts:[],
    slayerTarget:null,

    job:'',
    history:[],

    extra:'',
    extraDetail:[],
    extraStatMods:[],

    relationships:[],

    genealogy:{
      parents:[],
      children:[],
      generation:1,
      lineage:[],
      partnerLinks:[]
    },

    personality:'',
    stats:{},

    powers:[],
    weapons:[],

    weakness:'',

    blessings:[],
    curses:[],

    clothingStyle:'',
    appearance:{},

    transformation:null,
    awakening:null,
    chi:null,
    martial:null,

    prodigeMods:[],
    logs:[]
  };
}
