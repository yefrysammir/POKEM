// ============================================================
// TYPE CHART (Gen VI+) — Ghost vs Normal = 1x per user spec
// ============================================================
const TC={
  fire:{grass:2,ice:2,bug:2,steel:2,water:.5,fire:.5,rock:.5,dragon:.5},
  water:{fire:2,ground:2,rock:2,water:.5,grass:.5,dragon:.5},
  grass:{water:2,ground:2,rock:2,fire:.5,grass:.5,poison:.5,flying:.5,bug:.5,dragon:.5,steel:.5},
  electric:{water:2,flying:2,grass:.5,electric:.5,dragon:.5,ground:0},
  ice:{grass:2,ground:2,flying:2,dragon:2,fire:.5,water:.5,ice:.5,steel:.5},
  fighting:{normal:2,ice:2,rock:2,dark:2,steel:2,poison:.5,flying:.5,psychic:.5,bug:.5,ghost:0,fairy:.5},
  poison:{grass:2,fairy:2,poison:.5,ground:.5,rock:.5,ghost:.5,steel:0},
  ground:{fire:2,electric:2,poison:2,rock:2,steel:2,grass:.5,bug:.5,flying:0},
  flying:{grass:2,fighting:2,bug:2,electric:.5,rock:.5,steel:.5},
  psychic:{fighting:2,poison:2,psychic:.5,steel:.5,dark:0},
  bug:{grass:2,psychic:2,dark:2,fire:.5,fighting:.5,poison:.5,flying:.5,ghost:.5,steel:.5,fairy:.5},
  rock:{fire:2,ice:2,flying:2,bug:2,fighting:.5,ground:.5,steel:.5},
  ghost:{psychic:2,ghost:2,dark:.5,normal:1},
  dragon:{dragon:2,steel:.5,fairy:0},
  dark:{psychic:2,ghost:2,fighting:.5,dark:.5,fairy:.5},
  steel:{ice:2,rock:2,fairy:2,fire:.5,water:.5,electric:.5,steel:.5},
  fairy:{fighting:2,dragon:2,dark:2,fire:.5,poison:.5,steel:.5},
  normal:{ghost:0,steel:.5}
};
const TCOL={normal:'#a8a77a',fire:'#ee8130',water:'#6390f0',electric:'#f7d02c',grass:'#7ac74c',ice:'#96d9d6',fighting:'#c22e28',poison:'#a33ea1',ground:'#e2bf65',flying:'#a98ff3',psychic:'#f95587',bug:'#a6b91a',rock:'#b6a136',ghost:'#735797',dragon:'#6f35fc',dark:'#705746',steel:'#b7b7ce',fairy:'#d685ad'};

const MOVE={
  'Latigo Cepa':{type:'grass',power:45,acc:100,fx:null,cat:'physical'},
  'Placaje':{type:'normal',power:40,acc:100,fx:null,cat:'physical'},
  'Rayo Solar':{type:'grass',power:120,acc:100,fx:null,cat:'special'},
  'Tóxico':{type:'poison',power:0,acc:90,fx:'poison',cat:'status'},
  'Ascuas':{type:'fire',power:40,acc:100,fx:'burn',fxChance:10,cat:'special'},
  'Arañazo':{type:'normal',power:40,acc:100,fx:null,cat:'physical'},
  'Lanzallamas':{type:'fire',power:90,acc:100,fx:'burn',fxChance:10,cat:'special'},
  'Vuelo':{type:'flying',power:90,acc:95,fx:null,cat:'physical'},
  'Garra Dragón':{type:'dragon',power:80,acc:100,fx:null,cat:'physical'},
  'Pistola Agua':{type:'water',power:40,acc:100,fx:null,cat:'special'},
  'Rayo Burbuja':{type:'water',power:65,acc:100,fx:null,cat:'special'},
  'Hidrobomba':{type:'water',power:110,acc:80,fx:null,cat:'special'},
  'Cañón de Agua':{type:'water',power:90,acc:100,fx:null,cat:'special'},
  'Impactrueno':{type:'electric',power:40,acc:100,fx:'paralyze',fxChance:30,cat:'special'},
  'Rayo':{type:'electric',power:90,acc:100,fx:'paralyze',fxChance:10,cat:'special'},
  'Trueno':{type:'electric',power:110,acc:70,fx:'paralyze',fxChance:30,cat:'special'},
  'Canto':{type:'normal',power:0,acc:55,fx:'sleep',fxChance:100,cat:'status'},
  'Paliza':{type:'normal',power:80,acc:100,fx:null,cat:'physical'},
  'Hiperrayo':{type:'normal',power:150,acc:90,fx:null,cat:'special'},
  'Golpe Bajo':{type:'dark',power:65,acc:100,fx:null,cat:'physical'},
  'Garra Umbría':{type:'dark',power:80,acc:100,fx:null,cat:'physical'},
  'Bola Sombra':{type:'ghost',power:80,acc:100,fx:null,cat:'special'},
  'Hipnosis':{type:'psychic',power:0,acc:60,fx:'sleep',fxChance:100,cat:'status'},
  'Canto Helado':{type:'ice',power:55,acc:95,fx:'freeze',fxChance:10,cat:'special'},
  'Surf':{type:'water',power:90,acc:100,fx:null,cat:'special'},
  'Amnesia':{type:'psychic',power:0,acc:100,fx:'buff_spd',fxChance:100,cat:'status'},
  'Psíquico':{type:'psychic',power:90,acc:100,fx:null,cat:'special'},
  'Transformación':{type:'normal',power:0,acc:100,fx:null,cat:'status'},
  'Ventisca':{type:'ice',power:110,acc:70,fx:'freeze',fxChance:10,cat:'special'},
  'Ventarrón':{type:'flying',power:110,acc:70,fx:null,cat:'special'},
  'Rayo de Hielo':{type:'ice',power:90,acc:100,fx:'freeze',fxChance:10,cat:'special'}
};

const PD={
1:{id:1,n:'Bulbasaur',t:['grass','poison'],mv:['Latigo Cepa','Placaje','Ventarrón'],sp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/1.gif',spb:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/1.gif',bs:{hp:90,atk:118,def:111,spd:80},evo:[2],evLv:16,rar:'normal',rs:12,rc:8,shSp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png',shSpb:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png',evItem:null,expY:64,goldY:30,mapT:['grass'],gender:{hasGender:true,maleChance:87},lvR:[3,12],shinyR:1.2,darkR:99.0},
2:{id:2,n:'Ivysaur',t:['grass','poison'],mv:['Latigo Cepa','Rayo Solar'],sp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/2.gif',spb:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/2.gif',bs:{hp:110,atk:132,def:123,spd:90},evo:[3],evLv:32,rar:'pseudo',rs:5,rc:5,shSp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/2.png',shSpb:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/2.png',evItem:null,expY:142,goldY:60,mapT:['grass'],gender:{hasGender:true,maleChance:87},lvR:[16,28]},
3:{id:3,n:'Venusaur',t:['grass','poison'],mv:['Rayo Solar','Tóxico'],sp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/3.gif',spb:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/3.gif',bs:{hp:160,atk:182,def:153,spd:110},evo:[],evLv:null,rar:'pseudo',rs:2,rc:3,shSp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/3.png',shSpb:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/3.png',evItem:null,expY:236,goldY:120,mapT:['grass'],gender:{hasGender:true,maleChance:87},lvR:[32,50]},
4:{id:4,n:'Charmander',t:['fire'],mv:['Ascuas','Arañazo'],sp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/4.gif',spb:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/4.gif',bs:{hp:78,atk:104,def:78,spd:100},evo:[5],evLv:16,rar:'normal',rs:12,rc:8,shSp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/4.png',shSpb:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/4.png',evItem:null,expY:62,goldY:30,mapT:['fire'],gender:{hasGender:true,maleChance:87},lvR:[3,12]},
5:{id:5,n:'Charmeleon',t:['fire'],mv:['Ascuas','Garra Dragón'],sp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/5.gif',spb:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/5.gif',bs:{hp:98,atk:129,def:103,spd:120},evo:[6],evLv:36,rar:'pseudo',rs:5,rc:5,shSp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/5.png',shSpb:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/5.png',evItem:null,expY:142,goldY:65,mapT:['fire'],gender:{hasGender:true,maleChance:87},lvR:[16,30]},
6:{id:6,n:'Charizard',t:['fire','flying'],mv:['Lanzallamas','Vuelo'],sp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/6.gif',spb:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/6.gif',bs:{hp:156,atk:223,def:173,spd:150},evo:[],evLv:null,rar:'pseudo',rs:2,rc:3,shSp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/6.png',shSpb:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/6.png',evItem:null,expY:240,goldY:130,mapT:['fire'],gender:{hasGender:true,maleChance:87},lvR:[36,55]},
7:{id:7,n:'Squirtle',t:['water'],mv:['Pistola Agua','Placaje'],sp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/7.gif',spb:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/7.gif',bs:{hp:88,atk:86,def:120,spd:78},evo:[8],evLv:16,rar:'normal',rs:12,rc:8,shSp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/7.png',shSpb:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/7.png',evItem:null,expY:63,goldY:30,mapT:['water'],gender:{hasGender:true,maleChance:87},lvR:[3,12]},
8:{id:8,n:'Wartortle',t:['water'],mv:['Pistola Agua','Rayo Burbuja'],sp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/8.gif',spb:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/8.gif',bs:{hp:108,atk:113,def:145,spd:98},evo:[9],evLv:36,rar:'pseudo',rs:5,rc:5,shSp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/8.png',shSpb:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/8.png',evItem:null,expY:142,goldY:65,mapT:['water'],gender:{hasGender:true,maleChance:87},lvR:[16,30]},
9:{id:9,n:'Blastoise',t:['water'],mv:['Hidrobomba','Cañón de Agua'],sp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/9.gif',spb:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/9.gif',bs:{hp:158,atk:143,def:195,spd:118},evo:[],evLv:null,rar:'pseudo',rs:2,rc:3,shSp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/9.png',shSpb:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/9.png',evItem:null,expY:239,goldY:130,mapT:['water'],gender:{hasGender:true,maleChance:87},lvR:[36,55]},
25:{id:25,n:'Pikachu',t:['electric'],mv:['Impactrueno','Rayo'],sp:'https://play.pokemonshowdown.com/sprites/ani/pikachu.gif',spb:'https://play.pokemonshowdown.com/sprites/ani-back/pikachu.gif',bs:{hp:70,atk:112,def:55,spd:120},evo:[26],evLv:null,rar:'normal',rs:10,rc:7,shSp:'https://play.pokemonshowdown.com/sprites/ani-shiny/pikachu.gif',shSpb:'https://play.pokemonshowdown.com/sprites/ani-back-shiny/pikachu.gif',evItem:101,expY:112,goldY:40,mapT:['electric','normal'],gender:{hasGender:true,maleChance:50},lvR:[5,25]},
26:{id:26,n:'Raichu',t:['electric'],mv:['Rayo','Trueno'],sp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/26.gif',spb:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/26.gif',bs:{hp:110,atk:165,def:105,spd:150},evo:[],evLv:null,rar:'pseudo',rs:3,rc:4,shSp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/26.png',shSpb:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/26.png',evItem:null,expY:218,goldY:90,mapT:['electric'],gender:{hasGender:true,maleChance:50},lvR:[25,45]},
52:{id:52,n:'Meowth',t:['normal'],mv:['Arañazo','Golpe Bajo'],sp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/52.gif',spb:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/52.gif',bs:{hp:80,atk:75,def:60,spd:110},evo:[53],evLv:28,rar:'normal',rs:14,rc:10,shSp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/52.png',shSpb:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/52.png',evItem:null,expY:58,goldY:35,mapT:['normal'],gender:{hasGender:true,maleChance:50},lvR:[5,22]},
53:{id:53,n:'Persian',t:['normal'],mv:['Garra Umbría','Hiperrayo'],sp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/53.gif',spb:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/53.gif',bs:{hp:105,atk:110,def:95,spd:145},evo:[],evLv:null,rar:'pseudo',rs:4,rc:4,shSp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/53.png',shSpb:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/53.png',evItem:null,expY:154,goldY:75,mapT:['normal'],gender:{hasGender:true,maleChance:50},lvR:[28,40]},
94:{id:94,n:'Gengar',t:['ghost','poison'],mv:['Bola Sombra','Hipnosis'],sp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/94.gif',spb:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/94.gif',bs:{hp:120,atk:204,def:128,spd:178},evo:[],evLv:null,rar:'especial',rs:3,rc:4,shSp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/94.png',shSpb:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/94.png',evItem:null,expY:225,goldY:115,mapT:['ghost'],gender:{hasGender:true,maleChance:50},lvR:[25,50]},
131:{id:131,n:'Lapras',t:['water','ice'],mv:['Canto Helado','Surf'],sp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/131.gif',spb:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/131.gif',bs:{hp:260,atk:165,def:168,spd:100},evo:[],evLv:null,rar:'especial',rs:3,rc:3,shSp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/131.png',shSpb:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/131.png',evItem:null,expY:187,goldY:100,mapT:['water'],gender:{hasGender:true,maleChance:50},lvR:[30,55]},
143:{id:143,n:'Snorlax',t:['normal'],mv:['Amnesia','Hiperrayo'],sp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/143.gif',spb:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/143.gif',bs:{hp:320,atk:190,def:130,spd:30},evo:[],evLv:null,rar:'especial',rs:2,rc:3,shSp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/143.png',shSpb:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/143.png',evItem:null,expY:189,goldY:105,mapT:['normal'],gender:{hasGender:true,maleChance:87},lvR:[30,50]},
144:{id:144,n:'Articuno',t:['ice','flying'],mv:['Ventisca','Ventarrón'],sp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/144.gif',spb:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/144.gif',bs:{hp:180,atk:198,def:218,spd:130},evo:[],evLv:null,rar:'legendario',rs:1,rc:1,shSp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/144.png',shSpb:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/144.png',evItem:null,expY:290,goldY:300,mapT:['ice'],gender:{hasGender:false,maleChance:0},lvR:[50,70]},
145:{id:145,n:'Zapdos',t:['electric','flying'],mv:['Trueno','Ventarrón'],sp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/145.gif',spb:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/145.gif',bs:{hp:180,atk:232,def:178,spd:158},evo:[],evLv:null,rar:'legendario',rs:1,rc:1,shSp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/145.png',shSpb:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/145.png',evItem:null,expY:290,goldY:300,mapT:['electric'],gender:{hasGender:false,maleChance:0},lvR:[50,70]},
146:{id:146,n:'Moltres',t:['fire','flying'],mv:['Lanzallamas','Vuelo'],sp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/146.gif',spb:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/146.gif',bs:{hp:180,atk:242,def:168,spd:148},evo:[],evLv:null,rar:'legendario',rs:1,rc:1,shSp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/146.png',shSpb:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/146.png',evItem:null,expY:290,goldY:300,mapT:['fire'],gender:{hasGender:false,maleChance:0},lvR:[50,70]},
149:{id:149,n:'Dragonite',t:['dragon','flying'],mv:['Garra Dragón','Hiperrayo'],sp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/149.gif',spb:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/149.gif',bs:{hp:182,atk:263,def:198,spd:158},evo:[],evLv:null,rar:'pseudo',rs:1,rc:2,shSp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/149.png',shSpb:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/149.png',evItem:null,expY:270,goldY:150,mapT:['dragon'],gender:{hasGender:true,maleChance:50},lvR:[55,75]},
150:{id:150,n:'Mewtwo',t:['psychic'],mv:['Psíquico','Bola Sombra'],sp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/150.gif',spb:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/150.gif',bs:{hp:212,atk:300,def:182,spd:212},evo:[],evLv:null,rar:'legendario',rs:1,rc:1,shSp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/150.png',shSpb:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/150.png',evItem:null,expY:340,goldY:500,mapT:['psychic'],gender:{hasGender:false,maleChance:0},lvR:[60,80]},
151:{id:151,n:'Mew',t:['psychic'],mv:['Psíquico','Transformación'],sp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/151.gif',spb:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/151.gif',bs:{hp:200,atk:220,def:220,spd:220},evo:[],evLv:null,rar:'singular',rs:61,rc:61,shSp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/151.png',shSpb:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/151.png',evItem:null,expY:340,goldY:600,mapT:['psychic'],gender:{hasGender:false,maleChance:0},lvR:[70,100]},
885:{id:885,n:'Dreepy',t:['dragon','ghost'],mv:['Garra Dragón','Bola Sombra'],sp:'https://play.pokemonshowdown.com/sprites/ani/dreepy.gif',spb:'https://play.pokemonshowdown.com/sprites/ani-back/dreepy.gif',bs:{hp:28,atk:60,def:30,spd:82},evo:[886],evLv:50,rar:'pseudo',rs:20,rc:100,shSp:'https://play.pokemonshowdown.com/sprites/ani-shiny/dreepy.gif',shSpb:'https://play.pokemonshowdown.com/sprites/ani-back-shiny/dreepy.gif',evItem:null,expY:100,goldY:200,mapT:['ghost'],gender:{hasGender:true,maleChance:80},lvR:[40,60]},
999:{id:999,n:'Arceus Fairy',t:['fairy'],mv:['Psíquico','Bola Sombra'],sp:'https://play.pokemonshowdown.com/sprites/ani/arceus-fairy.gif',spb:'https://play.pokemonshowdown.com/sprites/ani-back/arceus-fairy.gif',bs:{hp:999,atk:999,def:999,spd:999},evo:[],evLv:null,rar:'especial',rs:20,rc:100,shSp:'https://play.pokemonshowdown.com/sprites/ani-shiny/arceus-fairy.gif',shSpb:'https://play.pokemonshowdown.com/sprites/ani-back-shiny/arceus-fairy.gif',evItem:null,expY:100,goldY:200,mapT:['ghost'],gender:{hasGender:false,maleChance:0},lvR:[80,100]}
};

const ITEMS={
  1:{id:1,n:'Poké Ball',cat:'pokeball',bonus:0,price:200,sell:9100,sp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png',desc:'Sin bonificación de captura.'},
  2:{id:2,n:'Súper Ball',cat:'pokeball',bonus:10,price:600,sell:300,sp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/great-ball.png',desc:'+10% ratio de captura.'},
  3:{id:3,n:'Ultra Ball',cat:'pokeball',bonus:20,price:1200,sell:600,sp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ultra-ball.png',desc:'+20% ratio de captura.'},
  4:{id:4,n:'Master Ball',cat:'pokeball',bonus:100,price:90000,sell:1,sp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png',desc:'Captura garantizada.'},
  10:{id:10,n:'Poción',cat:'heal',hp:20,price:300,sell:150,sp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/potion.png',desc:'Restaura 20 HP.'},
  11:{id:11,n:'Súper Poción',cat:'heal',hp:50,price:700,sell:350,sp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/super-potion.png',desc:'Restaura 50 HP.'},
  12:{id:12,n:'Hiper Poción',cat:'heal',hp:120,price:1500,sell:750,sp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/hyper-potion.png',desc:'Restaura 120 HP.'},
  13:{id:13,n:'Restaurador',cat:'heal',hp:9999,price:3000,sell:1500,sp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/max-potion.png',desc:'HP al máximo.'},
  14:{id:14,n:'Antídoto',cat:'heal',cures:['poison'],price:200,sell:100,sp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/antidote.png',desc:'Cura el veneno.'},
  15:{id:15,n:'Revivir',cat:'revive',pct:50,price:2000,sell:1000,sp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/revive.png',desc:'Revive con 50% HP.'},
  16:{id:16,n:'Revivir Máx',cat:'revive',pct:100,price:4500,sell:2000,sp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/max-revive.png',desc:'Revive con HP al máximo.'},
  17:{id:17,n:'Despertar',cat:'heal',cures:['sleep'],price:250,sell:100,sp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/awakening.png',desc:'Cura el sueño.'},
  18:{id:18,n:'Antihielo',cat:'heal',cures:['freeze'],price:250,sell:100,sp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ice-heal.png',desc:'Cura la congelación.'},
  19:{id:19,n:'Paraheal',cat:'heal',cures:['paralyze'],price:250,sell:100,sp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/parlyz-heal.png',desc:'Cura la parálisis.'},
  20:{id:20,n:'Cura Quemadura',cat:'heal',cures:['burn'],price:250,sell:100,sp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/burn-heal.png',desc:'Cura la quemadura.'},
  21:{id:21,n:'Cura Total',cat:'heal',hp:9999,cures:['poison','burn','freeze','paralyze','sleep'],price:6000,sell:2500,sp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/full-heal.png',desc:'Cura HP y todos los estados.'},
  22:{id:22,n:'Caramelo Raro',cat:'candy',price:3000,sell:500,sp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rare-candy.png',desc:'+1 nivel al Pokémon elegido (máx. 100).'},
  101:{id:101,n:'Piedra Trueno',cat:'evo',eIds:[25],price:5000,sell:2500,sp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/thunder-stone.png',desc:'Evoluciona Pikachu.'},
  102:{id:102,n:'Piedra Luna',cat:'evo',eIds:[],price:5000,sell:2500,sp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/moon-stone.png',desc:'Piedra de evolución lunar.'},
  103:{id:103,n:'Piedra Fuego',cat:'evo',eIds:[],price:5000,sell:2500,sp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/fire-stone.png',desc:'Piedra de evolución fuego.'},
  104:{id:104,n:'Piedra Agua',cat:'evo',eIds:[],price:5000,sell:2500,sp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/water-stone.png',desc:'Piedra de evolución agua.'},
  200:{id:200,n:'Repartir Exp',cat:'held',price:8000,sell:0,sp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/exp-share.png',desc:'Todo el equipo gana 50% EXP.'},
  201:{id:201,n:'MT Fuego',cat:'mt',mv:'Lanzallamas',price:15000,sell:500,sp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-fire.png',desc:'Enseña Lanzallamas.'},
  202:{id:202,n:'MT Agua',cat:'mt',mv:'Hidrobomba',price:15000,sell:500,sp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-water.png',desc:'Enseña Hidrobomba.'},
  203:{id:203,n:'MT Eléctrico',cat:'mt',mv:'Trueno',price:15000,sell:500,sp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-electric.png',desc:'Enseña Trueno.'},
  204:{id:204,n:'MT Psíquico',cat:'mt',mv:'Psíquico',price:15000,sell:500,sp:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-psychic.png',desc:'Enseña Psíquico.'}
};

const MAPS={
  normal:{id:'normal',name:'Ruta Normal',col:'#a8a77a',bg:'linear-gradient(135deg,#d4c89a,#b8a870)',gc:'rgba(168,167,122,.35)',pool:[52,53,25,143],leg:[],legUn:false,bgImg:'https://pokemonbattlearena.wordpress.com/wp-content/uploads/2008/12/route-14.jpg'},
  fire:{id:'fire',bgImg:null,__dummy:1,name:'Montaña Volcánica',col:'#ee8130',bg:'linear-gradient(135deg,#ff6b35,#c0392b)',gc:'rgba(238,129,48,.35)',pool:[4,5,6],leg:[146],legUn:false,bgImg:null},
  water:{id:'water',bgImg:null,__dummy:1,name:'Archipiélago Celeste',col:'#6390f0',bg:'linear-gradient(135deg,#1a6fa8,#0d4f7c)',gc:'rgba(99,144,240,.35)',pool:[7,8,9,131],leg:[144],legUn:false,bgImg:null},
  grass:{id:'grass',bgImg:null,__dummy:1,name:'Bosque Esmeralda',col:'#7ac74c',bg:'linear-gradient(135deg,#2ecc71,#1a7a40)',gc:'rgba(122,199,76,.35)',pool:[1,2,3],leg:[],legUn:false,bgImg:'https://static.wikia.nocookie.net/pokemoncrater/images/b/bc/Grass_Type.jpg/revision/latest?cb=20100315205316'},
  electric:{id:'electric',bgImg:null,__dummy:1,name:'Torre Eléctrica',col:'#f7d02c',bg:'linear-gradient(135deg,#f1c40f,#b7950b)',gc:'rgba(247,208,44,.35)',pool:[25,26],leg:[145],legUn:false,bgImg:null},
  ghost:{id:'ghost',bgImg:null,__dummy:1,name:'Torre Lavanda',col:'#735797',bg:'linear-gradient(135deg,#2c1654,#4a235a)',gc:'rgba(115,87,151,.35)',pool:[94,885,999],leg:[],legUn:false,bgImg:null},
  psychic:{id:'psychic',bgImg:null,__dummy:1,name:'Ruinas Antiguas',col:'#f95587',bg:'linear-gradient(135deg,#9b59b6,#6c3483)',gc:'rgba(249,85,135,.35)',pool:[94,149],leg:[150,151],legUn:false,bgImg:null}
};

// ============================================================
// FIX 8 — STATIC WALL BLOCKS per map (world coordinates)
// ============================================================
const MAP_BLOCKS={
  normal:new Set(['5,3','6,3','5,4','6,4','-5,-3','-6,-3','-5,-4','2,8','3,8','4,8','-3,-8','-4,-8','8,1','8,2','8,0','-8,-1','-8,-2','-8,0','-3,5','-4,5','-3,6','0,9','1,9','0,-9','-1,-9','7,-5','7,-6','8,-5','-7,5','-7,6','-8,5']),
  fire:new Set(['4,4','5,4','4,5','5,5','-4,-4','-5,-4','-4,-5','7,2','7,3','8,2','-7,-2','-7,-3','2,-7','3,-7','2,-8','-2,7','-3,7','0,6','1,6','0,7','-1,-6','-1,-7','9,-3','9,-2','-9,3']),
  water:new Set(['3,5','4,5','3,6','4,6','-3,-5','-4,-5','-3,-6','7,1','8,1','7,0','-7,-1','-8,-1','6,-6','7,-6','6,-7','-6,6','-7,6','5,8','6,8','-5,-8','0,-8','1,-8','-1,8','0,8']),
  grass:new Set(['2,6','3,6','2,7','3,7','-2,-6','-3,-6','-2,-7','6,3','7,3','6,2','-6,-3','-7,-3','5,-5','6,-5','5,-6','-5,5','-6,5','-1,8','0,8','-1,9','4,9','5,9','-4,-9','-5,-9']),
  electric:new Set(['4,2','5,2','4,3','5,3','-4,-2','-5,-2','-4,-3','7,5','8,5','7,6','-7,-5','-8,-5','3,-8','4,-8','3,-9','-3,8','-4,8','9,0','9,1','-9,0','-9,-1','6,-3','6,-4','-6,3']),
  ghost:new Set(['3,3','4,3','3,4','4,4','-3,-3','-4,-3','-3,-4','6,1','7,1','6,0','-6,-1','-7,-1','2,-6','3,-6','2,-7','-2,6','-3,6','-2,4','-3,4','0,7','1,7','0,8','-1,-7','5,-8','6,-8','-5,8']),
  psychic:new Set(['5,2','6,2','5,3','6,3','-5,-2','-6,-2','-5,-3','8,4','9,4','8,5','-8,-4','-9,-4','4,-7','5,-7','4,-8','-4,7','-5,7','-4,6','-7,0','-8,0','0,9','1,9','-1,-9','7,-2','7,-3'])
};
function isBlocked(wx,wy){return(MAP_BLOCKS[GS.map.id]||new Set()).has(`${wx},${wy}`);}

const TRAINERS={kanto:{name:'Kanto',col:'#e74c3c',trainers:[
  {id:'brock',n:'Líder Brock',icon:'bolt',minLv:12,rew:500,pk:[{id:74,n:'Geodude',lv:12,hp:55,atk:55,def:80,spd:35,mv:['Placaje','Paliza'],t:['rock','ground']},{id:75,n:'Onix',lv:14,hp:50,atk:40,def:120,spd:55,mv:['Placaje','Paliza'],t:['rock','ground']}],def:false},
  {id:'misty',n:'Líder Misty',icon:'water_drop',minLv:21,rew:800,pk:[{id:120,n:'Staryu',lv:18,hp:75,atk:65,def:70,spd:80,mv:['Pistola Agua','Rayo de Hielo'],t:['water']},{id:121,n:'Starmie',lv:21,hp:85,atk:85,def:85,spd:110,mv:['Pistola Agua','Psíquico'],t:['water','psychic']}],def:false},
  {id:'surge',n:'Teniente Surge',icon:'thunderstorm',minLv:24,rew:1000,pk:[{id:26,n:'Raichu',lv:24,hp:95,atk:100,def:70,spd:115,mv:['Impactrueno','Rayo'],t:['electric']}],def:false},
  {id:'erika',n:'Líder Erika',icon:'local_florist',minLv:29,rew:1200,pk:[{id:71,n:'Victreebel',lv:29,hp:105,atk:95,def:60,spd:65,mv:['Latigo Cepa','Tóxico'],t:['grass','poison']}],def:false},
  {id:'koga',n:'Koga',icon:'science',minLv:43,rew:2000,pk:[{id:89,n:'Muk',lv:37,hp:140,atk:90,def:65,spd:45,mv:['Tóxico','Paliza'],t:['poison']},{id:110,n:'Weezing',lv:43,hp:115,atk:80,def:110,spd:55,mv:['Tóxico','Bola Sombra'],t:['poison']}],def:false},
  {id:'blue',n:'Campeón Blue',icon:'emoji_events',minLv:65,rew:10000,pk:[{id:6,n:'Charizard',lv:65},{id:9,n:'Blastoise',lv:63},{id:3,n:'Venusaur',lv:65}],def:false}
]}};

const RARITY_CFG={
  normal:{label:'normal',col:'#95a5a6',cls:'rar-normal'},
  pseudo:{label:'Pseudo',col:'#2980b9',cls:'rar-pseudo'},
  especial:{label:'Especial',col:'#8e44ad',cls:'rar-especial'},
  legendario:{label:'Legendario',col:'#d4ac0d',cls:'rar-legendario'},
  singular:{label:'Singular',col:'#e74c3c',cls:'rar-singular'}
};

const CODES={
  'POKEFAN2025':{desc:'¡Bienvenido al mundo Pokémon!',rewards:[{t:'gold',v:5000},{t:'item',id:1,q:10},{t:'item',id:2,q:5}]},
  'MASTERBALL':{desc:'¡Una Master Ball exclusiva!',rewards:[{t:'item',id:4,q:1}]},
  'LEGENDPOWER':{desc:'Oro y pociones para el campeón.',rewards:[{t:'gold',v:20000},{t:'item',id:13,q:3},{t:'item',id:16,q:2}]},
  'SHINYHUNTER':{desc:'Pack de Ultra Balls.',rewards:[{t:'item',id:3,q:20}]},
  'STARTPACK':{desc:'Pack de inicio completo.',rewards:[{t:'gold',v:3000},{t:'item',id:1,q:15},{t:'item',id:10,q:5},{t:'item',id:15,q:2}]},
  'GIFTGHOST':{desc:'¡Gengar Shiny Lv.50 de regalo!',rewards:[{t:'pokemon',pid:94,variant:'shiny',lv:50,rar:'especial'}]},
  'DULCE10':{desc:'10 Caramelos Raros de regalo.',rewards:[{t:'item',id:22,q:10}]}
};

// ============================================================
// GAME STATE
// ============================================================
const DEFAULT_AVATAR='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/25.gif';

function stopMapKeys(e){e.stopPropagation();}
function validateAlNum(e){
  if(['Backspace','Delete','ArrowLeft','ArrowRight','Tab','Enter','Home','End'].includes(e.key))return;
  if(e.ctrlKey||e.metaKey||e.altKey)return;
  if(e.key.length===1&&!/^[\w\u00C0-\u024F]$/u.test(e.key))e.preventDefault();
}
function formatDate(ts){if(!ts)return'';const d=new Date(ts);return d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear();}
function dname(pkm){return pkm.nickname||pkm.name;}

const GS={
  player:{name:'Entrenador',gold:1000,team:[],pc:[],bag:{},usedCodes:new Set(),defeatedTrainers:new Set(),expShareOn:false,avatar:'',steps:0,deaths:0,createdAt:null},
  map:{id:'normal',x:0,y:0},
  spawns:[],battle:null,screen:'radar',adventureStarted:false,viewMode:'detailed',pcPage:0,pcSearch:'',_prevScreen:'radar',_spawnOpen:true
};
const MAP_LIMIT=99;
// FIX 1 — direction for GPS arrow (starts pointing up)
let lastDir={dx:0,dy:-1};
// FIX 9 — selected starter
let _selectedStarterId=null;

// ============================================================
// SAVE / LOAD
// ============================================================
function save(){
  if(!GS.adventureStarted)return;
  try{
    const d={player:{...GS.player,usedCodes:[...GS.player.usedCodes],defeatedTrainers:[...GS.player.defeatedTrainers]},map:GS.map,legUn:{},trDef:{},viewMode:GS.viewMode,adventureStarted:GS.adventureStarted};
    Object.keys(MAPS).forEach(k=>d.legUn[k]=MAPS[k].legUn);
    Object.keys(TRAINERS).forEach(r=>d.trDef[r]=TRAINERS[r].trainers.map(t=>t.def));
    localStorage.setItem('pf3_save',JSON.stringify(d));
  }catch(e){}
}
function load(){
  try{
    const raw=localStorage.getItem('pf3_save');if(!raw)return;
    const d=JSON.parse(raw);
    GS.player={...d.player,usedCodes:new Set(d.player.usedCodes||[]),defeatedTrainers:new Set(d.player.defeatedTrainers||[])};
    if(typeof GS.player.steps!=='number')GS.player.steps=0;
    if(!GS.player.avatar)GS.player.avatar='';
    GS.map=d.map||{id:'normal',x:0,y:0};
    if(d.legUn)Object.keys(d.legUn).forEach(k=>{if(MAPS[k])MAPS[k].legUn=d.legUn[k];});
    if(d.trDef)Object.keys(d.trDef).forEach(r=>{if(TRAINERS[r])d.trDef[r].forEach((v,i)=>{if(TRAINERS[r].trainers[i])TRAINERS[r].trainers[i].def=v;});});
    GS.adventureStarted=true;
    GS.viewMode=d.viewMode||'detailed';
    GS.pcPage=0;GS.pcSearch='';
    if(!GS.player.deaths)GS.player.deaths=0;
    if(!GS.player.createdAt)GS.player.createdAt=Date.now();
  }catch(e){console.warn('Load err',e);}
}

// ============================================================
// UTILS
// ============================================================
let _nt=null;
function notif(msg,type='info',dur=3000){
  const el=document.getElementById('notif');if(!el)return;
  el.textContent=msg;el.className='show '+type;
  if(_nt)clearTimeout(_nt);_nt=setTimeout(()=>{el.className='';},dur);
}
function hpCol(pct){return pct>50?'#2ecc71':pct>25?'#f39c12':'#e74c3c';}
function hpPct(p){return p&&p.maxHp?Math.max(0,Math.round(p.currentHp/p.maxHp*100)):0;}
function typeEff(atType,defTypes){
  let m=1;const chart=TC[atType]||{};
  (defTypes||['normal']).forEach(dt=>{const v=chart[dt];if(v!==undefined)m*=v;});
  return m;
}
function typeBadges(types){return(types||['normal']).map(t=>`<span class="tbadge" style="background:${TCOL[t]||'#777'}">${t}</span>`).join('');}
// FIX 3 — Authentic Gen formula
function calcHP(base,lv){return Math.floor(2*base*lv/100+lv+10);}
function calcStat(base,lv){return Math.floor(2*base*lv/100+5);}
function expReq(lv){return Math.floor(100*Math.pow(lv,1.5));}
function rollGender(pid){const g=PD[pid]?.gender;if(!g||!g.hasGender)return null;return Math.random()*100<g.maleChance?'M':'F';}
function genderTag(gender){
  if(gender==='M')return`<span style="color:#6db4ff;font-size:11px;font-weight:700">♂</span>`;
  if(gender==='F')return`<span style="color:#ff8fb3;font-size:11px;font-weight:700">♀</span>`;
  return`<span style="color:var(--dim);font-size:11px"></span>`;
}
function getSprite(pkm){
  // FIX 10 — always read from PD to get latest URL
  const b=PD[pkm.pid];
  return pkm.variant==='shiny'?(b?.shSp||b?.sp||''):(b?.sp||'');
}
function getBack(pkm){
  const b=PD[pkm.pid];
  return pkm.variant==='shiny'?(b?.shSpb||b?.spb||b?.sp||''):(b?.spb||b?.sp||'');
}
function addGold(n){GS.player.gold+=n;updateHUD();}
function spendGold(n){if(GS.player.gold<n)return false;GS.player.gold-=n;updateHUD();return true;}
function addBag(id,q=1){id=+id;GS.player.bag[id]=(GS.player.bag[id]||0)+q;}
function useBag(id,q=1){id=+id;if((GS.player.bag[id]||0)<q)return false;GS.player.bag[id]-=q;if(!GS.player.bag[id])delete GS.player.bag[id];return true;}
function cntBag(id){return GS.player.bag[+id]||0;}
function getSellPrice(pkm){const b=PD[pkm.pid];let p=(b?.goldY||20)*pkm.lv;if(pkm.variant==='dark')p*=2;if(pkm.variant==='shiny')p*=3;return Math.floor(p);}
function variantLabel(v){
  if(v==='shiny')return`<span class="ms v-shiny" title="Shiny">auto_awesome</span>`;
  if(v==='dark')return`<span class="ms v-dark" title="Dark">dark_mode</span>`;
  return'';
}
function variantName(name,v){
  if(v==='shiny')return`<span class="vname-shiny">${name}</span>`;
  if(v==='dark')return`<span class="vname-dark">${name}</span>`;
  return name;
}
const STATUS_TAG={poison:'VEN',burn:'QUE',freeze:'CON',sleep:'DOR',paralyze:'PAR'};
const STATUS_COL={poison:'#a33ea1',burn:'#ee8130',freeze:'#96d9d6',sleep:'#6390f0',paralyze:'#f7d02c'};
function statusTag(s){
  if(!s)return'';
  return`<span class="stag" style="background:${STATUS_COL[s]||'#888'}">${STATUS_TAG[s]||s.slice(0,3).toUpperCase()}</span>`;
}

// ============================================================
// POKEMON INSTANCE — FIX 3 gen formula
// ============================================================
function applyVariantStats(bs,variant){
  if(variant==='shiny')return{hp:Math.floor(bs.hp*1.15),atk:Math.floor(bs.atk*1.1),def:Math.floor(bs.def*1.1),spd:Math.floor(bs.spd*1.1)};
  if(variant==='dark')return{hp:bs.hp,atk:Math.floor(bs.atk*1.1),def:bs.def,spd:bs.spd};
  return{...bs};
}
function mkPkm(pid,variant='normal',lv=5){
  const b=PD[pid];if(!b)return null;
  const vbs=applyVariantStats(b.bs,variant);
  const hp=calcHP(vbs.hp,lv);
  return{uid:Math.random().toString(36).slice(2,9),pid,name:b.n,types:[...b.t],variant,lv,
    exp:0,expNext:expReq(lv),gender:rollGender(pid),
    currentHp:hp,maxHp:hp,
    atk:calcStat(vbs.atk,lv),def:calcStat(vbs.def,lv),spd:calcStat(vbs.spd,lv),
    moves:[...b.mv],thirdMove:null,status:null,sleepTurns:0,rar:b.rar,evoPending:null,
    transformed:false,originalPid:null,_origMoves:null,_origTypes:null,_origAtk:0,_origDef:0,_origSpd:0,
    captureSource:'capture',capturedAt:Date.now(),_pendingEvoItemId:null};
}
function statUp(pkm){
  const b=PD[pkm.pid];const vbs=applyVariantStats(b.bs,pkm.variant);
  const nh=calcHP(vbs.hp,pkm.lv);
  pkm.currentHp=Math.min(pkm.currentHp+(nh-pkm.maxHp),nh);
  pkm.maxHp=nh;pkm.atk=calcStat(vbs.atk,pkm.lv);pkm.def=calcStat(vbs.def,pkm.lv);pkm.spd=calcStat(vbs.spd,pkm.lv);
}
function clearBattleStatus(pkm){pkm.status=null;pkm.sleepTurns=0;}
function giveExp(pkm,exp){
  pkm.exp+=exp;let levs=0;
  while(pkm.exp>=pkm.expNext&&pkm.lv<100){pkm.exp-=pkm.expNext;pkm.lv++;pkm.expNext=expReq(pkm.lv);statUp(pkm);levs++;}
  if(levs>0)notif(`¡${pkm.name} subió al nivel ${pkm.lv}!`,'ok',3500);
  checkEvo(pkm);return levs;
}
function checkEvo(pkm){
  const b=PD[pkm.pid];if(!b.evo||!b.evo.length||pkm.evoPending||b.evItem)return;
  if(b.evLv&&pkm.lv>=b.evLv){pkm.evoPending=b.evo[0];setTimeout(()=>showEvoPrompt(pkm),800);}
}
function doEvolve(uid){
  const pkm=[...GS.player.team,...GS.player.pc].find(p=>p.uid===uid);
  if(!pkm||!pkm.evoPending)return;
  const tb=PD[pkm.evoPending];if(!tb)return;
  if(pkm._pendingEvoItemId){if(!useBag(pkm._pendingEvoItemId)){notif('Sin ese ítem','err');pkm.evoPending=null;pkm._pendingEvoItemId=null;document.getElementById('evo-ov').style.display='none';return;}pkm._pendingEvoItemId=null;}
  const _old=pkm.nickname||pkm.name;pkm.pid=pkm.evoPending;pkm.name=tb.n;pkm.types=[...tb.t];pkm.moves=[...tb.mv];pkm.rar=tb.rar;pkm.evoPending=null;statUp(pkm);
  document.getElementById('evo-ov').style.display='none';
  notif('¡'+_old+' evolucionó a '+pkm.name+'!','ok',5000);save();renderCurrent();
}
function skipEvo(uid){
  const pkm=[...GS.player.team,...GS.player.pc].find(p=>p.uid===uid);
  if(pkm){pkm.evoPending=null;pkm._pendingEvoItemId=null;}
  document.getElementById('evo-ov').style.display='none';
}
function showEvoPrompt(pkm){
  const tid=pkm.evoPending;const tb=PD[tid];if(!tb)return;
  const ov=document.getElementById('evo-ov');
  ov.innerHTML=`<div class="evo-box"><div class="evo-glow"></div>
    <div style="font-family:'Orbitron',sans-serif;font-size:14px;font-weight:700;color:var(--gold)">Evolución</div>
    <div class="evo-row">
      <img class="evo-spr" src="${getSprite(pkm)}" onerror="this.style.display='none'">
      <div class="evo-arrow">→</div>
      <img class="evo-spr" src="${tb.sp||''}" onerror="this.style.display='none'">
    </div>
    <p style="font-size:13px;text-align:center"><b>${pkm.name}</b> → <b>${tb.n}</b></p>
    <div class="evo-btns">
      <button class="btn-do-evo" onclick="doEvolve('${pkm.uid}')">Evolucionar</button>
      <button class="btn-skip-evo" onclick="skipEvo('${pkm.uid}')">Ahora no</button>
    </div></div>`;
  ov.style.display='flex';
}

// ============================================================
// FIX 4 — TRANSFORMACIÓN
// ============================================================
function applyTransformation(attacker,target){
  if(!attacker.transformed){
    attacker.originalPid=attacker.pid;
    attacker._origMoves=[...(attacker.moves||[])];
    attacker._origTypes=[...attacker.types];
    attacker._origAtk=attacker.atk;attacker._origDef=attacker.def;attacker._origSpd=attacker.spd;
    attacker.pid=target.pid;
    attacker.types=[...(target.types||target.t||['normal'])];
    attacker.moves=[...(target.moves||target.mv||['Placaje'])];
    attacker.atk=target.atk;attacker.def=target.def;attacker.spd=target.spd;
    attacker.transformed=true;
    bLog(`¡${attacker.name} se transformó en ${target.name}!`);
  }else{
    revertTransformation(attacker);
    bLog(`${attacker.name} revirtió la Transformación.`);
  }
}
function revertTransformation(pkm){
  if(!pkm||!pkm.originalPid)return;
  pkm.pid=pkm.originalPid;
  if(pkm._origTypes)pkm.types=pkm._origTypes;
  if(pkm._origMoves)pkm.moves=pkm._origMoves;
  if(pkm._origAtk)pkm.atk=pkm._origAtk;
  if(pkm._origDef)pkm.def=pkm._origDef;
  if(pkm._origSpd)pkm.spd=pkm._origSpd;
  pkm.originalPid=null;pkm.transformed=false;
  pkm._origMoves=null;pkm._origTypes=null;
}

// ============================================================
// FIX 5 — RARE CANDY
// ============================================================
function useRareCandy(id){
  if(!cntBag(id)){notif('Sin Caramelos Raros.','err');return;}
  const all=[...GS.player.team,...GS.player.pc].filter(p=>p.lv<100);
  if(!all.length){notif('Todos tus Pokémon son nivel 100.','warn');return;}
  showOv('enc-ov',`<div class="obox"><div class="otitle"><span class="ms" style="color:var(--gold);font-size:18px">star</span> Caramelo Raro</div>
    <p style="font-size:11px;color:var(--dim);text-align:center">¿A quién le das el caramelo?</p>
    ${all.map(p=>`<div class="heal-pick-item" onclick="doRareCandy('${p.uid}',${id})">
      <img src="${getSprite(p)}" style="width:36px;image-rendering:pixelated" onerror="this.style.display='none'">
      <div><b>${p.name}</b> Lv.${p.lv} → <span style="color:var(--green)">Lv.${Math.min(100,p.lv+1)}</span></div>
    </div>`).join('')}
    <button class="ebtn ebtn-flee" onclick="closeOv('enc-ov')"><span class="ms">close</span>Cancelar</button></div>`);
}
function doRareCandy(uid,itemId){
  closeOv('enc-ov');
  const pkm=[...GS.player.team,...GS.player.pc].find(p=>p.uid===uid);
  if(!pkm||pkm.lv>=100){notif('Ya está en nivel 100.','warn');return;}
  if(!useBag(itemId)){notif('Sin Caramelos Raros.','err');return;}
  pkm.lv=Math.min(100,pkm.lv+1);pkm.exp=0;pkm.expNext=expReq(pkm.lv);
  statUp(pkm);notif(`¡${pkm.name} subió al nivel ${pkm.lv}!`,'ok',3000);
  checkEvo(pkm);save();renderCurrent();
}

// ============================================================
// RADAR — FIX 1,2,7,8
// ============================================================
const CELL=30,GRID=11,HALF=5;
const ENCOUNTER_RANGE=2;
let spawnLoop=null;
const _sprCache={};
function loadSpr(url,cb){
  if(!url)return;
  if(_sprCache[url]){cb&&cb(_sprCache[url]);return;}
  const img=new Image();img.crossOrigin='anonymous';
  img.onload=()=>{_sprCache[url]=img;cb&&cb(img);};img.onerror=()=>{};img.src=url;
}
function getPool(){const m=MAPS[GS.map.id];let p=[...m.pool];if(m.legUn&&m.leg.length)p=p.concat(m.leg);return p;}
function rollSpawn(){
  const pool=getPool();if(!pool.length||GS.spawns.length>=10)return;
  const pid=pool[Math.floor(Math.random()*pool.length)];const b=PD[pid];if(!b)return;
  const shinyR=b.shinyR!==undefined?b.shinyR:b.rs*0.1;
  const darkR=b.darkR!==undefined?b.darkR:b.rs*0.5;
  const r=Math.random()*100;
  let variant=null;
  if(r<shinyR)variant='shiny';else if(r<shinyR+darkR)variant='dark';else if(r<shinyR+darkR+b.rs)variant='normal';
  if(!variant)return;
  let attempts=0,wx,wy;
  do{
    const angle=Math.random()*Math.PI*2;const dist=3+Math.floor(Math.random()*4);
    wx=Math.round(GS.map.x+Math.cos(angle)*dist);
    wy=Math.round(GS.map.y+Math.sin(angle)*dist);
    attempts++;
  }while(attempts<10&&(Math.abs(wx)>MAP_LIMIT||Math.abs(wy)>MAP_LIMIT||GS.spawns.some(s=>s.wx===wx&&s.wy===wy)||isBlocked(wx,wy)));
  if(Math.abs(wx)>MAP_LIMIT||Math.abs(wy)>MAP_LIMIT||isBlocked(wx,wy))return;
  const lvR=b.lvR||[3,18];
  const lv=Math.max(1,lvR[0]+Math.floor(Math.random()*(lvR[1]-lvR[0]+1)));
  GS.spawns.push({uid:Math.random().toString(36).slice(2,9),pid,variant,wx,wy,lv,gender:rollGender(pid),timer:30,timerMax:30});
  preloadSpawnSprites();renderSpawnList();renderRadarCanvas();
}
function preloadSpawnSprites(){
  // FIX 10 — always use PD url (not cached name)
  GS.spawns.forEach(s=>{const b=PD[s.pid];if(b){const url=s.variant==='shiny'?b.shSp:b.sp;loadSpr(url,()=>renderRadarCanvas());}});
}
function tickSpawns(){GS.spawns=GS.spawns.filter(s=>{s.timer--;return s.timer>0;});rollSpawn();renderSpawnList();renderRadarCanvas();}
function playerDist(s){return Math.max(Math.abs(s.wx-GS.map.x),Math.abs(s.wy-GS.map.y));}

// FIX 1+2+8 — renderRadarCanvas with GPS arrow, save/restore, blocks
function fitRadarCanvas(){
  const wrap=document.getElementById('radar-wrap');
  const cv=document.getElementById('radar-canvas');
  if(!wrap||!cv)return;
  const w=wrap.clientWidth;const h=wrap.clientHeight;
  if(cv.width!==w||cv.height!==h){cv.width=w;cv.height=h;}
}
function renderRadarCanvas(){
  const cv=document.getElementById('radar-canvas');if(!cv)return;

// 🔴 FIX: Limpiar TODO el canvas primero (evita estelas)
  const ctx=cv.getContext('2d');
  ctx.clearRect(0, 0, cv.width, cv.height); // ← AÑADE ESTA LÍNEA AL INICIO
fitRadarCanvas();
  const W=cv.width; 
  const H=cv.height;
  if(W<=0||H<=0)return;
  
  const CELL=Math.floor(Math.min(W,H)/GRID);
  const m=MAPS[GS.map.id];
  // Background
  const bgUrl=m.bgImg;
  if(bgUrl){
    const bgImg=_sprCache[bgUrl];
    if(bgImg){
      const iw=bgImg.naturalWidth||320;const ih=bgImg.naturalHeight||240;
      // Tile with player-position offset for scroll illusion
      const ox=((GS.map.x*CELL%iw)+iw)%iw;const oy=((GS.map.y*CELL%ih)+ih)%ih;
      ctx.save();ctx.globalAlpha=0.88;
      for(let tx=-ox;tx<W+iw;tx+=iw)for(let ty=-oy;ty<H+ih;ty+=ih)ctx.drawImage(bgImg,tx,ty,iw,ih);
      ctx.restore();
      ctx.fillStyle=m.col+'18';ctx.fillRect(0,0,W,H);
    }else{
      loadSpr(bgUrl,()=>renderRadarCanvas());
      const g=ctx.createLinearGradient(0,0,W,W);g.addColorStop(0,m.col+'cc');g.addColorStop(1,m.col+'44');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    }
  }else{
    const g=ctx.createLinearGradient(0,0,W,W);g.addColorStop(0,m.col+'cc');g.addColorStop(1,m.col+'44');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
  }
  // No grid (clean look)
  // FIX 8 — draw wall blocks
  // (blocks hidden when bg image, only show as subtle overlay)
  if(!m.bgImg){
    const blocks=MAP_BLOCKS[GS.map.id]||new Set();
    blocks.forEach(key=>{
      const [bx,by]=key.split(',').map(Number);
      const relX=bx-GS.map.x,relY=by-GS.map.y;
      if(Math.abs(relX)>HALF||Math.abs(relY)>HALF)return;
      const sx=W/2+relX*CELL-CELL/2,sy=H/2+relY*CELL-CELL/2;
      ctx.save();ctx.fillStyle='rgba(80,80,130,0.55)';ctx.fillRect(sx,sy,CELL,CELL);
      ctx.strokeStyle='rgba(160,160,220,0.6)';ctx.lineWidth=1.5;ctx.strokeRect(sx+1,sy+1,CELL-2,CELL-2);ctx.restore();
    });
  }
  // Encounter range ring
  ctx.save();ctx.strokeStyle='rgba(255,255,255,.15)';ctx.lineWidth=1.5;
  ctx.beginPath();ctx.arc(W/2,H/2,(ENCOUNTER_RANGE+0.5)*CELL,0,Math.PI*2);ctx.stroke();ctx.restore();
  // FIX 2 — sprites isolated with save/restore
  GS.spawns.forEach(s=>{
    const relX=s.wx-GS.map.x,relY=s.wy-GS.map.y;
    const visW=Math.ceil(W/(2*CELL))+1,visH=Math.ceil(H/(2*CELL))+1;
    if(Math.abs(relX)>visW||Math.abs(relY)>visH)return;
    const cx2=W/2+relX*CELL,cy2=H/2+relY*CELL;
    const near=playerDist(s)<=ENCOUNTER_RANGE;
    const pct=s.timer/s.timerMax;
    const col=s.variant==='shiny'?'#f7d02c':s.variant==='dark'?'#e74c3c':'#ffffff';
    ctx.save();
    ctx.beginPath();ctx.arc(cx2,cy2,CELL/2-2,-Math.PI/2,-Math.PI/2+pct*Math.PI*2);
    ctx.strokeStyle=col+'66';ctx.lineWidth=2;ctx.stroke();
    ctx.restore();
    ctx.save();
    if(near){ctx.shadowColor=col;ctx.shadowBlur=10;}
    const b=PD[s.pid];
    // FIX 10 — always get URL from PD
    const sprUrl=s.variant==='shiny'?b.shSp:b.sp;
    if(!_sprCache[sprUrl])loadSpr(sprUrl,()=>renderRadarCanvas());
    const cachedImg=_sprCache[sprUrl];
    if(cachedImg){
      const sz=near?26:22;
      // FIX 2 — dark filter with save/restore isolation
      if(s.variant==='dark')ctx.filter='grayscale(1) brightness(0.28)';
      ctx.drawImage(cachedImg,cx2-sz/2,cy2-sz/2,sz,sz);
    }else{
      ctx.beginPath();ctx.arc(cx2,cy2,near?6:4,0,Math.PI*2);
      ctx.fillStyle=col+(near?'ff':'88');ctx.fill();
    }
    ctx.restore();
    if(near){
      ctx.save();ctx.strokeStyle='#39ff14';ctx.lineWidth=1.5;ctx.setLineDash([3,3]);
      ctx.strokeRect(cx2-15,cy2-15,30,30);ctx.restore();
    }
  });
  // FIX 1 — Player circle + avatar filling it completely
  const pcx=W/2,pcy=H/2;
  const pR=13;
  ctx.save();ctx.shadowColor='#3498db';ctx.shadowBlur=18;
  ctx.beginPath();ctx.arc(pcx,pcy,pR,0,Math.PI*2);
  ctx.fillStyle='rgba(52,152,219,.3)';ctx.fill();
  ctx.strokeStyle='#3498db';ctx.lineWidth=2.5;ctx.stroke();ctx.restore();
  // Avatar fills entire circle
  const avUrl=GS.player.avatar;
  if(avUrl&&_sprCache[avUrl]){
    ctx.save();ctx.beginPath();ctx.arc(pcx,pcy,pR-1,0,Math.PI*2);ctx.clip();
    ctx.drawImage(_sprCache[avUrl],pcx-(pR-1),pcy-(pR-1),(pR-1)*2,(pR-1)*2);ctx.restore();
  }
  // FIX 1 — GPS direction arrow outside circle
  if(lastDir.dx!==0||lastDir.dy!==0){
    const angle=Math.atan2(lastDir.dy,lastDir.dx);
    const r=pR+7;const ax=pcx+Math.cos(angle)*r,ay=pcy+Math.sin(angle)*r;
    ctx.save();ctx.translate(ax,ay);ctx.rotate(angle);
    ctx.shadowColor='#3498db';ctx.shadowBlur=6;ctx.fillStyle='#3498db';
    ctx.beginPath();ctx.moveTo(6,0);ctx.lineTo(-4,-4);ctx.lineTo(-4,4);ctx.closePath();ctx.fill();
    ctx.restore();
  }
  const _ce=document.getElementById('radar-coords');if(_ce)_ce.textContent='X:'+GS.map.x+' Y:'+GS.map.y+'  ·  '+MAPS[GS.map.id].name;
}

function toggleSpawnPanel(){
  const body=document.getElementById('spawn-list');
  const arrow=document.getElementById('spawn-panel-arrow');
  if(!body)return;
  const open=body.style.display!=='none'&&body.style.display!=='';
  body.style.display=open?'none':'flex';
  if(arrow)arrow.textContent=open?'expand_more':'expand_less';
  GS._spawnOpen=!open;
}
function renderSpawnList(){
  const el=document.getElementById('spawn-list');if(!el)return;
  const cnt=document.getElementById('spawn-panel-cnt');if(cnt)cnt.textContent=GS.spawns.length||'';
  if(!GS.spawns.length){el.innerHTML='<div class="no-spawn-ov">Sin apariciones aún...</div>';return;}
  el.innerHTML=GS.spawns.map(s=>{
    const b=PD[s.pid];const d=playerDist(s);const near=d<=ENCOUNTER_RANGE;
    const pct=Math.round(s.timer/s.timerMax*100);
    const timerCol=s.timer<8?'#e74c3c':s.timer<20?'#f39c12':'#2ecc71';
    const dkSt=s.variant==='dark'?'filter:grayscale(1) brightness(0.3)':'';
    const sprUrl=s.variant==='shiny'?b.shSp:b.sp;
    const lvR=b.lvR||[3,18];
    return`<div class="sov-item ${near?'sov-near':''} ${s.variant==='shiny'?'sov-shiny':s.variant==='dark'?'sov-dark':''}" onclick="onSpawnListClick('${s.uid}')">
      <img style="width:34px;height:34px;image-rendering:pixelated;object-fit:contain;flex-shrink:0;${dkSt}" src="${sprUrl}" onerror="this.style.display='none'">
      <div style="flex:1;min-width:0;overflow:hidden">
        <div style="font-size:11px;font-weight:700;display:flex;align-items:center;gap:3px">${variantLabel(s.variant)}${variantName(b.n,s.variant)}${genderTag(s.gender)}<span style="color:var(--dim);font-size:9px">Lv.${s.lv}</span></div>
        <div style="display:flex;gap:2px;align-items:center;flex-wrap:wrap">${typeBadges(b.t)}<span style="font-size:9px;color:var(--dim)">Nv.${lvR[0]}-${lvR[1]}</span>${near?'<span style="color:#39ff14;font-size:9px;font-weight:700">CERCA</span>':'<span style="font-size:9px;color:var(--dim)">'+d+'cel</span>'}</div>
        <div style="height:2px;background:rgba(255,255,255,.1);border-radius:1px;margin-top:2px"><div style="height:100%;width:${pct}%;background:${timerCol};border-radius:1px"></div></div>
      </div>
    </div>`;
  }).join('');
}
function onSpawnListClick(uid){
  const s=GS.spawns.find(x=>x.uid===uid);if(!s)return;
  const b=PD[s.pid];
  notif(`${b.n} Lv.${s.lv} — (${s.wx>0?'+':''}${s.wx},${s.wy>0?'+':''}${s.wy}) | ${playerDist(s)} celdas`,'info',3000);
}
function setupCanvasClick(){
  const cv=document.getElementById('radar-canvas');if(!cv)return;
  cv.onclick=function(e){
    const rect=cv.getBoundingClientRect();
    const CELL_=Math.floor(Math.min(cv.width,cv.height)/GRID);
    const px=e.clientX-rect.left-cv.width/2,py=e.clientY-rect.top-cv.height/2;
    const wx=GS.map.x+Math.round(px/CELL_),wy=GS.map.y+Math.round(py/CELL_);
    const hit=GS.spawns.find(s=>s.wx===wx&&s.wy===wy);
    if(hit){if(playerDist(hit)<=ENCOUNTER_RANGE)openEncounter(hit);else notif(`Muévete más cerca (${playerDist(hit)} celdas).`,'warn');}
  };
}
function startLoop(){if(spawnLoop)clearInterval(spawnLoop);spawnLoop=setInterval(()=>{tickSpawns();},1000);}

// FIX 7+8 — move() with steps counter and block check (no fake steps on wall)
function move(dx,dy){
  const nx=Math.max(-MAP_LIMIT,Math.min(MAP_LIMIT,GS.map.x+dx));
  const ny=Math.max(-MAP_LIMIT,Math.min(MAP_LIMIT,GS.map.y+dy));
  if(isBlocked(nx,ny)){notif('¡Camino bloqueado!','warn',800);return;}
  if(nx===GS.map.x&&ny===GS.map.y)return;
  GS.map.x=nx;GS.map.y=ny;
  GS.player.steps=(GS.player.steps||0)+1;
  if(dx!==0||dy!==0)lastDir={dx,dy};
  save();renderRadarCanvas();renderSpawnList();
}

// ============================================================
// ENCOUNTER
// ============================================================
function openEncounter(s){
  const b=PD[s.pid];const rc=RARITY_CFG[b.rar||'normal'];
  const dkSt=s.variant==='dark'?'filter:grayscale(1) brightness(0.3)':'';
  const sprUrl=s.variant==='shiny'?b.shSp:b.sp;
  showOv('enc-ov',`<div class="obox">
    <div class="otitle">${variantLabel(s.variant)} ${variantName(b.n,s.variant)} ${genderTag(s.gender)} <span style="color:var(--dim);font-size:12px">Lv.${s.lv}</span></div>
    <img class="enc-sprite" src="${sprUrl}" style="${dkSt}" onerror="this.style.display='none'">
    <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;justify-content:center">${typeBadges(b.t)} <span style="font-size:11px;font-weight:700;color:${rc.col}">${rc.label}</span></div>
    <div class="enc-btns">
      <button class="ebtn ebtn-catch" onclick="quickCatch('${s.uid}')"><span class="ms" style="font-size:18px">circles</span>Atrapar</button>
      <button class="ebtn ebtn-fight" onclick="startWild('${s.uid}')"><span class="ms" style="font-size:18px">swords</span>Luchar</button>
      <button class="ebtn ebtn-flee" onclick="fleeEnc('${s.uid}')"><span class="ms" style="font-size:18px">directions_run</span>Huir</button>
    </div></div>`);
}
function quickCatch(uid){closeOv('enc-ov');selectBall(uid,0);}
function selectBall(uid,dmgPct){
  const balls=Object.values(ITEMS).filter(i=>i.cat==='pokeball'&&cntBag(i.id)>0);
  if(!balls.length){notif('Sin Poké Balls. Compra en la Tienda.','err');return;}
  showOv('enc-ov',`<div class="obox"><div class="otitle">Elige una Poké Ball</div>
    <div class="ball-grid">${balls.map(b=>`<div class="ball-item" onclick="doCatch('${uid}',${b.id},${dmgPct})">
      <img src="${b.sp}" onerror="this.style.display='none'"><span>${b.n}</span><span class="ball-cnt">x${cntBag(b.id)}</span>
    </div>`).join('')}</div>
    <button class="ebtn ebtn-flee" onclick="closeOv('enc-ov')" style="margin-top:4px"><span class="ms">close</span>Cancelar</button></div>`);
}
function doCatch(uid,ballId,dmgPct=0){
  closeOv('enc-ov');
  const s=GS.spawns.find(x=>x.uid===uid);if(!s){notif('El Pokémon escapó.','err');return;}
  const ball=ITEMS[+ballId];if(!ball||!useBag(ballId)){notif('Sin esa Poké Ball.','err');return;}
  const b=PD[s.pid];
  if(ball.bonus===100){catchPkm(s);save();return;}
  let rate=b.rc+(dmgPct/100)*b.rc+(b.rc*ball.bonus/100);rate=Math.min(rate,95);
  if(Math.random()*100<rate)catchPkm(s);else notif(`${b.n} escapó de la ${ball.n}!`,'err');
  save();
}
function catchPkm(s){
  const pkm=mkPkm(s.pid,s.variant,s.lv);if(!pkm)return;
  pkm.gender=s.gender;
  GS.spawns=GS.spawns.filter(x=>x.uid!==s.uid);
  if(GS.player.team.length<3)GS.player.team.push(pkm);
  else{GS.player.pc.push(pkm);notif(`${pkm.name} enviado al PC (equipo lleno).`,'info');}
  notif(`¡${pkm.name}${s.variant!=='normal'?' '+s.variant.toUpperCase():''} Lv.${s.lv} capturado!`,'ok',4000);
  save();updateHUD();renderRadarCanvas();renderSpawnList();
}
function startWild(uid){
  closeOv('enc-ov');
  const s=GS.spawns.find(x=>x.uid===uid);if(!s)return;
  if(!GS.player.team.some(p=>p.currentHp>0)){notif('Todos tus Pokémon están debilitados.','err');return;}
  const enemy=mkPkm(s.pid,s.variant,s.lv);if(!enemy)return;
  enemy.gender=s.gender;
  initBattle({playerTeam:[...GS.player.team],enemy,spawnUid:s.uid,isWild:true,trainer:null});
}
function fleeEnc(uid){closeOv('enc-ov');GS.spawns=GS.spawns.filter(x=>x.uid!==uid);notif('Escapaste.','info');renderRadarCanvas();renderSpawnList();}

// ============================================================
// BATTLE
// ============================================================
function initBattle(cfg){
  const fi=cfg.playerTeam.findIndex(p=>p.currentHp>0);if(fi<0){notif('Sin Pokémon vivos.','err');return;}
  GS.battle={
    team:cfg.playerTeam.map(p=>({...p,sleepTurns:p.sleepTurns||0,transformed:p.transformed||false,originalPid:p.originalPid||null,
      _origMoves:p._origMoves||null,_origTypes:p._origTypes||null,_origAtk:p._origAtk||0,_origDef:p._origDef||0,_origSpd:p._origSpd||0})),
    enemy:{...cfg.enemy,sleepTurns:0,transformed:false,originalPid:null},
    idx:fi,isWild:cfg.isWild,spawnUid:cfg.spawnUid||null,trainer:cfg.trainer||null,
    trainerQueue:(cfg.trainerQueue||[]).map(p=>({...p})),
    log:[],turn:'player',dmgDealt:0,over:false,goldGiven:false};
  goTo('battle');
}
function activeP(){return GS.battle?.team[GS.battle.idx];}
function calcDmg(atk,def,mvName){
  const mv=MOVE[mvName];if(!mv||mv.power===0)return 0;
  const stab=(atk.types||atk.t||['normal']).includes(mv.type)?1.5:1;
  const eff=typeEff(mv.type,def.types||def.t||['normal']);
  if(eff===0)return 0;
  const burnMod=(atk.status==='burn'&&mv.cat==='physical')?0.5:1;
  let d=Math.floor(((2*atk.lv/5+2)*mv.power*(atk.atk||50)/(def.def||50))/50+2);
  d=Math.floor(d*stab*eff*burnMod*(0.85+Math.random()*0.15));
  return Math.max(1,d);
}
function tryApplyStatus(mv,target){
  if(!mv.fx||mv.fx==='buff_spd')return;if(target.status)return;if(target.currentHp<=0)return;
  const chance=mv.fxChance||100;if(Math.random()*100>=chance)return;
  if(mv.fx==='poison'&&(target.types||['normal']).some(t=>t==='poison'||t==='steel'))return;
  if(mv.fx==='burn'&&(target.types||['normal']).includes('fire'))return;
  if(mv.fx==='paralyze'&&(target.types||['normal']).some(t=>t==='electric'||t==='ground'))return;
  if(mv.fx==='freeze'&&(target.types||['normal']).includes('ice'))return;
  target.status=mv.fx;if(mv.fx==='sleep')target.sleepTurns=1+Math.floor(Math.random()*5);
  const names={poison:'¡Envenenado!',burn:'¡Quemado!',paralyze:'¡Paralizado!',freeze:'¡Congelado!',sleep:'¡Dormido!'};
  bLog(`${target.name} quedó: ${names[mv.fx]||mv.fx}`);
}
function processStatusTurn(pkm){
  if(!pkm.status)return true;
  if(pkm.status==='sleep'){pkm.sleepTurns--;if(pkm.sleepTurns<=0){pkm.status=null;pkm.sleepTurns=0;bLog(`${pkm.name} se despertó.`);return true;}bLog(`${pkm.name} está dormido.`);return false;}
  if(pkm.status==='freeze'){if(Math.random()<0.20){pkm.status=null;bLog(`${pkm.name} se descongeló.`);return true;}bLog(`${pkm.name} está congelado.`);return false;}
  if(pkm.status==='paralyze'){if(Math.random()<0.25){bLog(`${pkm.name} está paralizado y no puede moverse.`);return false;}return true;}
  return true;
}
function applyStatusDamage(pkm){
  if(pkm.status==='poison'){const dmg=Math.max(1,Math.floor(pkm.maxHp/8));pkm.currentHp=Math.max(0,pkm.currentHp-dmg);bLog(`${pkm.name} sufrió ${dmg} por veneno.`);}
  if(pkm.status==='burn'){const dmg=Math.max(1,Math.floor(pkm.maxHp/16));pkm.currentHp=Math.max(0,pkm.currentHp-dmg);bLog(`${pkm.name} sufrió ${dmg} por quemadura.`);}
}
function bLog(msg){
  if(!GS.battle)return;
  GS.battle.log.unshift(msg);if(GS.battle.log.length>8)GS.battle.log.pop();
  const el=document.getElementById('b-log');
  if(el)el.innerHTML=GS.battle.log.map((l,i)=>`<div class="log-line" style="opacity:${Math.max(0.15,1-i*0.12)}">${l}</div>`).join('');
}
function playerAttack(mv){
  const bs=GS.battle;if(!bs||bs.turn!=='player'||bs.over)return;
  const p=activeP();const e=bs.enemy;if(!p||p.currentHp<=0)return;
  if(!processStatusTurn(p)){applyStatusDamage(p);renderBattle();if(p.currentHp<=0){setTimeout(()=>handlePlayerFaint(),600);return;}bs.turn='enemy';renderBattle();setTimeout(()=>enemyTurn(),1100);return;}
  // FIX 4 — Transformación
  if(mv==='Transformación'){
    applyTransformation(p,e);applyStatusDamage(p);renderBattle();
    if(p.currentHp<=0){bLog(`¡${p.name} fue derrotado!`);setTimeout(()=>handlePlayerFaint(),600);}
    else{bs.turn='enemy';renderBattle();setTimeout(()=>enemyTurn(),1100);}
    return;
  }
  const mvData=MOVE[mv];
  if(mvData&&mvData.acc&&Math.random()*100>mvData.acc){bLog(`¡${p.name} falló!`);applyStatusDamage(p);renderBattle();if(p.currentHp<=0){setTimeout(()=>handlePlayerFaint(),600);return;}bs.turn='enemy';renderBattle();setTimeout(()=>enemyTurn(),1100);return;}
  const dmg=calcDmg(p,e,mv);
  if(dmg>0){
    const eff=typeEff(mvData?.type||'normal',e.types||['normal']);
    e.currentHp=Math.max(0,e.currentHp-dmg);bs.dmgDealt+=dmg;
    const effTxt=eff>=2?' ¡Muy efectivo!':eff>0&&eff<1?' Poco efectivo…':eff===0?' ¡No afecta!':'';
    bLog(`${p.name} usó ${mv}. (${dmg} dmg)${effTxt}`);
  }else if(mvData&&mvData.power===0){bLog(`${p.name} usó ${mv}.`);}
  if(mvData)tryApplyStatus(mvData,e);
  applyStatusDamage(p);renderBattle();
  if(p.currentHp<=0){bLog(`¡${p.name} fue derrotado!`);setTimeout(()=>handlePlayerFaint(),600);}
  else if(e.currentHp<=0){bLog(`¡${e.name} fue derrotado!`);setTimeout(()=>handleEnemyFaint(),600);}
  else{bs.turn='enemy';renderBattle();setTimeout(()=>enemyTurn(),1100);}
}
function enemyTurn(){
  const bs=GS.battle;if(!bs||bs.over)return;
  const e=bs.enemy;const p=activeP();if(!p||!e)return;
  if(!processStatusTurn(e)){applyStatusDamage(e);renderBattle();if(e.currentHp<=0){bLog(`¡${e.name} fue derrotado!`);setTimeout(()=>handleEnemyFaint(),600);return;}bs.turn='player';renderBattle();return;}
  const mvs=e.mv||e.moves||['Placaje'];
  const mv=mvs[Math.floor(Math.random()*mvs.length)];const mvData=MOVE[mv];
  if(mvData&&mvData.acc&&Math.random()*100>mvData.acc){bLog(`¡${e.name} falló!`);applyStatusDamage(e);renderBattle();if(e.currentHp<=0){setTimeout(()=>handleEnemyFaint(),600);return;}bs.turn='player';renderBattle();return;}
  const dmg=calcDmg(e,p,mv);
  if(dmg>0){
    const eff=typeEff(mvData?.type||'normal',p.types||['normal']);
    p.currentHp=Math.max(0,p.currentHp-dmg);
    const effTxt=eff>=2?' ¡Muy efectivo!':eff>0&&eff<1?' Poco efectivo…':eff===0?' ¡No afecta!':'';
    bLog(`${e.name} usó ${mv}. (${dmg} dmg)${effTxt}`);
  }else if(mvData&&mvData.power===0){bLog(`${e.name} usó ${mv}.`);}
  if(mvData)tryApplyStatus(mvData,p);
  applyStatusDamage(e);renderBattle();
  if(p.currentHp<=0){bLog(`¡${p.name} fue derrotado!`);setTimeout(()=>handlePlayerFaint(),600);}
  else if(e.currentHp<=0){bLog(`¡${e.name} fue derrotado!`);setTimeout(()=>handleEnemyFaint(),600);}
  else{bs.turn='player';renderBattle();}
}
function _endBattleCleanup(bs){bs.team.forEach(t=>{revertTransformation(t);clearBattleStatus(t);});}
function handleEnemyFaint(){
  const bs=GS.battle;if(!bs||bs.over)return;
  if(!bs.isWild&&bs.trainerQueue&&bs.trainerQueue.length>0){
    const nxt=bs.trainerQueue.shift();
    bs.enemy={...nxt,pid:nxt.pid||nxt.id,currentHp:nxt.currentHp||nxt.maxHp||nxt.hp||100,maxHp:nxt.maxHp||nxt.hp||100,
      status:null,sleepTurns:0,types:nxt.types||PD[nxt.pid||nxt.id]?.t||nxt.t||['normal'],
      mv:nxt.mv||nxt.moves||['Placaje'],moves:nxt.mv||nxt.moves||['Placaje'],
      variant:'normal',name:nxt.name||nxt.n,transformed:false,originalPid:null};
    bLog(`${bs.trainer?.n||'Entrenador'} sacó a ${bs.enemy.name}!`);bs.turn='player';renderBattle();return;
  }
  const expG=Math.floor((PD[bs.enemy.pid]?.expY||50)*(bs.enemy.lv||5));
  const p=activeP();if(p)giveExp(p,expG);
  if(GS.player.expShareOn)bs.team.forEach((t,i)=>{if(i!==bs.idx&&t.currentHp>0)giveExp(t,Math.floor(expG*0.5));});
  if(!bs.goldGiven){
    bs.goldGiven=true;
    if(bs.isWild){const g=Math.floor((PD[bs.enemy.pid]?.goldY||20)*(bs.enemy.lv/5));addGold(g);notif(`+${g} Oro`,'ok');}
    else if(bs.trainer){addGold(bs.trainer.rew);notif(`¡Victoria! +${bs.trainer.rew} Oro`,'ok',4000);bs.trainer.def=true;GS.player.defeatedTrainers.add(bs.trainer.id);checkLegUnlocks();}
  }
  bs.over=true;_endBattleCleanup(bs);syncTeam();save();renderBattle();
  setTimeout(()=>{if(bs.isWild)GS.spawns=GS.spawns.filter(x=>x.uid!==bs.spawnUid);GS.battle=null;goTo('radar');},1500);
}
// FIX 6 — forced switch popup when a Pokémon faints
function showForcedSwitch(){
  const bs=GS.battle;if(!bs)return;
  const ov=document.getElementById('enc-ov');if(ov)ov.onclick=null;
  showOv('enc-ov',`<div class="obox">
    <div style="font-size:28px">💔</div>
    <div class="otitle" style="color:var(--acc)">¡${bs.team[bs.idx].name} fue derrotado!</div>
    <p style="font-size:12px;color:var(--dim);text-align:center">Elige tu siguiente Pokémon:</p>
    ${bs.team.map((p,i)=>{
      if(p.currentHp<=0)return'';
      return`<div class="switch-row" onclick="forcedSwitch(${i})">
        <img src="${getSprite(p)}" style="width:38px;image-rendering:pixelated" onerror="this.style.display='none'">
        <div><b>${p.name}</b> Lv.${p.lv} ${statusTag(p.status)}<br>
        <small style="color:var(--dim)">${p.currentHp}/${p.maxHp} HP</small></div>
        <span class="ms" style="color:var(--green);font-size:20px;margin-left:auto">chevron_right</span>
      </div>`;
    }).join('')}
  </div>`);
}
function forcedSwitch(idx){
  const ov=document.getElementById('enc-ov');
  if(ov)ov.onclick=function(e){if(e.target===this)closeOv('enc-ov');};
  closeOv('enc-ov');const bs=GS.battle;if(!bs)return;
  bs.idx=idx;bs.turn='player';bLog(`¡Vamos, ${bs.team[idx].name}!`);renderBattle();
}
function handlePlayerFaint(){
  const bs=GS.battle;if(!bs||bs.over)return;
  const next=bs.team.findIndex((p,i)=>i!==bs.idx&&p.currentHp>0);
  if(next<0){
    bs.over=true;GS.player.deaths=(GS.player.deaths||0)+1;bLog('¡Todos tus Pokémon fueron derrotados!');
    bs.team.forEach((p,i)=>{revertTransformation(p);clearBattleStatus(p);
      if(i===bs.idx)p.currentHp=Math.max(1,Math.floor(p.maxHp*0.20));else p.currentHp=0;});
    syncTeam();save();renderBattle();setTimeout(()=>{GS.battle=null;goTo('radar');},2000);
  }else{showForcedSwitch();}
}
function battleFlee(){
  const bs=GS.battle;if(!bs)return;
  if(!bs.isWild){notif('No puedes huir de un combate de entrenador.','err');return;}
  if(Math.random()*100<Math.max(30,75-(bs.enemy.lv-(activeP()?.lv||1))*5)){
    bLog('¡Escapaste!');bs.over=true;_endBattleCleanup(bs);syncTeam();save();renderBattle();
    setTimeout(()=>{GS.battle=null;goTo('radar');},800);
  }else{bLog('No pudiste escapar.');bs.turn='enemy';renderBattle();setTimeout(()=>enemyTurn(),1000);}
}
function battleSwitch(idx){
  const bs=GS.battle;if(!bs)return;
  if(idx===bs.idx){closeOv('enc-ov');return;}
  if(bs.team[idx].currentHp<=0){notif('Ese Pokémon está debilitado.','err');return;}
  bLog(`Cambiaste a ${bs.team[idx].name}.`);bs.idx=idx;bs.turn='enemy';closeOv('enc-ov');renderBattle();setTimeout(()=>enemyTurn(),1000);
}
function battleCatch(){
  const bs=GS.battle;if(!bs||!bs.isWild){notif('No puedes atrapar Pokémon de entrenadores.','err');return;}
  const balls=Object.values(ITEMS).filter(i=>i.cat==='pokeball'&&cntBag(i.id)>0);
  if(!balls.length){notif('Sin Poké Balls.','err');return;}
  showOv('enc-ov',`<div class="obox"><div class="otitle">Elige una Poké Ball</div>
    <div class="ball-grid">${balls.map(b=>`<div class="ball-item" onclick="battleDoCatch(${b.id})">
      <img src="${b.sp}" onerror="this.style.display='none'"><span>${b.n}</span><span class="ball-cnt">x${cntBag(b.id)}</span>
    </div>`).join('')}</div>
    <button class="ebtn ebtn-flee" onclick="closeOv('enc-ov')"><span class="ms">close</span></button></div>`);
}
function battleDoCatch(ballId){
  closeOv('enc-ov');const bs=GS.battle;if(!bs||!bs.isWild)return;
  const ball=ITEMS[+ballId];if(!ball||!useBag(ballId)){notif('Sin esa Poké Ball.','err');return;}
  const s={uid:bs.spawnUid,pid:bs.enemy.pid,variant:bs.enemy.variant,lv:bs.enemy.lv,gender:bs.enemy.gender};
  if(ball.bonus===100){bs.over=true;_endBattleCleanup(bs);catchPkm(s);syncTeam();save();setTimeout(()=>{GS.battle=null;goTo('radar');},800);return;}
  const b=PD[bs.enemy.pid];
  const dmgPct=((bs.enemy.maxHp-(bs.enemy.currentHp||0))/bs.enemy.maxHp)*100;
  let rate=b.rc+(dmgPct/100)*b.rc+(b.rc*ball.bonus/100);rate=Math.min(rate,95);
  if(Math.random()*100<rate){bs.over=true;_endBattleCleanup(bs);catchPkm(s);syncTeam();save();setTimeout(()=>{GS.battle=null;goTo('radar');},800);}
  else{bLog(`${bs.enemy.name} escapó de la ${ball.n}!`);bs.turn='enemy';renderBattle();setTimeout(()=>enemyTurn(),1000);}
}
function battleShowSwitch(){
  const bs=GS.battle;if(!bs)return;
  showOv('enc-ov',`<div class="obox"><div class="otitle">¿Con quién cambias?</div>
    ${bs.team.map((p,i)=>`<div class="switch-row ${p.currentHp<=0?'sw-faint':''} ${i===bs.idx?'sw-active':''}"
      onclick="${p.currentHp>0&&i!==bs.idx?`battleSwitch(${i})`:''}" style="cursor:${p.currentHp>0&&i!==bs.idx?'pointer':'not-allowed'}">
      <img src="${getSprite(p)}" style="width:38px;image-rendering:pixelated" onerror="this.style.display='none'">
      <div><b>${p.name}</b> Lv.${p.lv} ${statusTag(p.status)}<br><small style="color:var(--dim)">${p.currentHp}/${p.maxHp} HP${p.currentHp<=0?' — DEBILITADO':''}</small></div>
    </div>`).join('')}
    <button class="ebtn ebtn-flee" onclick="closeOv('enc-ov')" style="margin-top:4px"><span class="ms">close</span>Cancelar</button></div>`);
}
function battleBag(){
  const healIs=[21,13,12,11,10,14,17,18,19,20,15,16].filter(id=>cntBag(id)>0);
  showOv('enc-ov',`<div class="obox"><div class="otitle">Mochila</div>
    ${healIs.length?healIs.map(id=>{const it=ITEMS[id];return`<div class="heal-pick-item" onclick="battleUseItem(${id});closeOv('enc-ov')">
      <img src="${it.sp}" onerror="this.style.display='none'">
      <div><b>${it.n}</b> x${cntBag(id)}<br><small style="color:var(--dim)">${it.desc}</small></div>
    </div>`;}).join(''):'<p style="color:var(--dim);font-size:12px">Sin ítems de curación.</p>'}
    <button class="ebtn ebtn-flee" onclick="closeOv('enc-ov')" style="margin-top:4px"><span class="ms">close</span>Cerrar</button></div>`);
}
function battleUseItem(id){
  const bs=GS.battle;if(!bs)return;const it=ITEMS[+id];if(!it)return;
  if(it.cat==='revive'){
    const fainted=bs.team.filter(p=>p.currentHp<=0);
    if(!fainted.length){notif('No hay Pokémon debilitados','warn');return;}
    showOv('enc-ov',`<div class="obox"><div class="otitle">¿Revivir a quién? (${it.n})</div>
      ${fainted.map(p=>`<div class="heal-pick-item" onclick="doBattleRevive('${p.uid}',${id})">
        <img src="${getSprite(p)}" style="width:36px;image-rendering:pixelated;filter:grayscale(1) opacity(.5)" onerror="this.style.display='none'">
        <div><b>${p.nickname||p.name}</b><br><small style="color:var(--acc)">Debilitado · ${p.maxHp} HP max</small></div>
      </div>`).join('')}
      <button class="ebtn ebtn-flee" onclick="closeOv('enc-ov')"><span class="ms">close</span>Cancelar</button>
    </div>`);
    return;
  }
  const p=activeP();if(!p||!useBag(id))return;
  if(it.cat==='heal'){
    if(p.currentHp<=0){notif('Usa un Revivir primero','err');useBag(id,-1);return;}
    if(it.hp)p.currentHp=Math.min(p.maxHp,p.currentHp+(it.hp>=9999?p.maxHp:it.hp));
    if(it.cures&&p.status&&it.cures.includes(p.status)){p.status=null;p.sleepTurns=0;}
  }
  notif(it.n+' usada','ok');save();renderBattle();
}
function doBattleRevive(uid,itemId){
  closeOv('enc-ov');const bs=GS.battle;if(!bs)return;
  const it=ITEMS[+itemId];if(!it||!useBag(itemId)){notif('Sin ese ítem','err');return;}
  const pkm=bs.team.find(p=>p.uid===uid);if(!pkm||pkm.currentHp>0)return;
  pkm.currentHp=Math.floor(pkm.maxHp*(it.pct/100));pkm.status=null;pkm.sleepTurns=0;
  notif('¡'+(pkm.nickname||pkm.name)+' revivió!','ok');syncTeam();save();renderBattle();
}
function syncTeam(){
  if(!GS.battle)return;
  GS.battle.team.forEach((bp,i)=>{if(GS.player.team[i])Object.assign(GS.player.team[i],{
    currentHp:bp.currentHp,lv:bp.lv,exp:bp.exp,expNext:bp.expNext,maxHp:bp.maxHp,
    atk:bp.atk,def:bp.def,spd:bp.spd,status:bp.status,sleepTurns:bp.sleepTurns,
    evoPending:bp.evoPending,thirdMove:bp.thirdMove,pid:bp.pid,types:bp.types,moves:bp.moves,
    transformed:false,originalPid:null});});
}
// FIX 3 — Trainer Pokémon use mkPkm when available
function mkTrainerPkm(pk){
  if(PD[pk.id||pk.pid]){
    const p=mkPkm(pk.id||pk.pid,'normal',pk.lv);
    if(p){p.moves=pk.mv||p.moves;p.mv=p.moves;return p;}
  }
  const hp=pk.hp||100;
  return{uid:Math.random().toString(36).slice(2,9),pid:pk.id||pk.pid||0,name:pk.n||pk.name,
    types:pk.t||['normal'],variant:'normal',lv:pk.lv,exp:0,expNext:expReq(pk.lv),gender:null,
    currentHp:hp,maxHp:hp,atk:pk.atk||50,def:pk.def||50,spd:pk.spd||50,
    moves:pk.mv||['Placaje'],mv:pk.mv||['Placaje'],thirdMove:null,status:null,sleepTurns:0,
    rar:'normal',evoPending:null,transformed:false,originalPid:null};
}
function startTrainerBattle(region,tid){
  const tr=TRAINERS[region]?.trainers.find(t=>t.id===tid);
  if(!tr||tr.def){notif('Ya derrotaste a este entrenador.','warn');return;}
  const maxLv=Math.max(...GS.player.team.map(p=>p.lv),1);
  if(maxLv<tr.minLv){notif(`Necesitas Lv.${tr.minLv}+ para desafiarlo.`,'err');return;}
  if(!GS.player.team.some(p=>p.currentHp>0)){notif('Todos tus Pokémon están debilitados.','err');return;}
  const [first,...rest]=tr.pk;
  initBattle({playerTeam:[...GS.player.team],enemy:mkTrainerPkm(first),isWild:false,trainer:tr,trainerQueue:rest.map(mkTrainerPkm)});
}
function checkLegUnlocks(){
  Object.keys(TRAINERS).forEach(r=>{
    if(TRAINERS[r].trainers.every(t=>t.def))
      Object.keys(MAPS).forEach(k=>{if(MAPS[k].leg&&MAPS[k].leg.length&&!MAPS[k].legUn){MAPS[k].legUn=true;notif(`¡Legendarios desbloqueados en ${MAPS[k].name}!`,'ok',5000);}});
  });save();
}

// ============================================================
// RENDER BATTLE — FIX 2 dark style, FIX 4 transform tag
// ============================================================
function renderBattle(){
  const sc=document.getElementById('screen-battle');if(!sc||!GS.battle)return;
  const bs=GS.battle;const p=activeP();const e=bs.enemy;if(!p||!e){sc.innerHTML='';return;}
  const pp=hpPct(p);const emaxHp=e.maxHp||e.hp||100;const ep=Math.max(0,Math.round((e.currentHp/emaxHp)*100));
  // FIX 10 — sprite from PD
  const eSp=e.variant==='shiny'?PD[e.pid]?.shSp:(PD[e.pid]?.sp||`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${e.pid||1}.png`);
  const pSp=getBack(p);
  const expPct=Math.round(p.exp/p.expNext*100);
  // FIX 2 — dark filter in battle via style string
  const eDark=e.variant==='dark'?'filter:grayscale(1) brightness(0.3)':'';
  const pDark=p.variant==='dark'?'filter:grayscale(1) brightness(0.3)':'';
  // FIX 4 — transform tag
  const tfTag=p.transformed?`<span style="color:var(--gold);font-size:9px;font-weight:700;background:rgba(247,208,44,.15);border:1px solid rgba(247,208,44,.4);border-radius:4px;padding:1px 4px">★ TRANSFORM</span>`:'';
  const _mc=MAPS[GS.map.id]?.col||'#3498db';
  sc.innerHTML=`<div class="battle-wrap" style="background:linear-gradient(to bottom,${_mc}18,${_mc}06,var(--bg))">
  <div class="battle-enemy-side">
    <div class="binfo">
      <div class="bname">${variantLabel(e.variant||'normal')} ${variantName(e.name,e.variant||'normal')} ${genderTag(e.gender)} <span class="blvl">Lv.${e.lv}</span> ${statusTag(e.status)}</div>
      <div class="bhpbar"><div class="bhpbar-fill" style="width:${ep}%;background:${hpCol(ep)}"></div></div>
      <div class="bhptxt">${e.currentHp}/${emaxHp} HP</div>
      <div class="btypes">${typeBadges(e.types||['normal'])}</div>
    </div>
    <img class="b-sprite enemy-spr" src="${eSp}" style="${eDark}" onerror="this.style.display='none'">
  </div>
  <!-- player: sprite LEFT, info right -->
  <div class="battle-player-side">
    <img class="b-sprite player-spr" src="${pSp}" style="${pDark}" onerror="this.style.display='none'">
    <div class="binfo">
      <div class="bname">${p.name} ${genderTag(p.gender)} <span class="blvl">Lv.${p.lv}</span> ${statusTag(p.status)} ${tfTag}</div>
      <div class="bhpbar"><div class="bhpbar-fill" style="width:${pp}%;background:${hpCol(pp)}"></div></div>
      <div class="bhptxt">${p.currentHp}/${p.maxHp} HP</div>
      <div class="bexpbar"><div class="bexpbar-fill" style="width:${expPct}%"></div></div>
      <div style="font-size:9px;color:var(--dim);margin-top:1px">EXP: ${p.exp}/${p.expNext}</div>
    </div>
  </div>
  <div id="b-log" class="battle-log">${bs.log.map((l,i)=>`<div class="log-line" style="opacity:${Math.max(0.15,1-i*0.12)}">${l}</div>`).join('')}</div>
  <div class="battle-ctrl">
    ${bs.over?`<div class="battle-waiting"><span class="ms">hourglass_top</span> Finalizando...</div>`:
    bs.turn==='player'?`
    <div class="bmoves">
      ${(p.moves||[]).map(mv=>{const md=MOVE[mv];return`<button class="mbtn" style="border-color:${TCOL[md?.type||'normal']||'#777'}" onclick="playerAttack('${mv}')">
        <span class="mtype-dot" style="background:${TCOL[md?.type||'normal']||'#777'}"></span>${mv}<small style="opacity:.7;font-size:9px">${md?.power||'—'}</small></button>`;}).join('')}
      ${p.thirdMove?`<button class="mbtn" style="border-color:${TCOL[MOVE[p.thirdMove]?.type||'normal']||'#777'};outline:1px solid var(--gold)" onclick="playerAttack('${p.thirdMove}')">
        <span class="mtype-dot" style="background:${TCOL[MOVE[p.thirdMove]?.type||'normal']||'#777'}"></span>${p.thirdMove}<small style="opacity:.7;font-size:9px">${MOVE[p.thirdMove]?.power||'—'}</small></button>`:''}
    </div>
    <div class="bactions">
      ${bs.isWild?`<button class="abtn abtn-catch" onclick="battleCatch()"><span class="ms" style="font-size:16px">circles</span>Atrapar</button>`:''}
      <button class="abtn abtn-switch" onclick="battleShowSwitch()"><span class="ms" style="font-size:16px">swap_horiz</span>Cambiar</button>
      <button class="abtn abtn-bag" onclick="battleBag()"><span class="ms" style="font-size:16px">backpack</span>Mochila</button>
      ${bs.isWild?`<button class="abtn abtn-flee" onclick="battleFlee()"><span class="ms" style="font-size:16px">directions_run</span>Huir</button>`:''}
    </div>`:`<div class="battle-waiting"><span class="ms">hourglass_top</span> Turno del enemigo...</div>`}
  </div>
  <div class="battle-strip">
    ${bs.team.map((t,i)=>`<div class="strip-slot ${i===bs.idx?'active':''} ${t.currentHp<=0?'fainted':''}" onclick="battleShowSwitch()">
      <img src="${getSprite(t)}" onerror="this.style.display='none'">
      ${statusTag(t.status)}
      <div class="strip-hp"><div class="strip-hp-fill" style="width:${hpPct(t)}%;background:${hpCol(hpPct(t))}"></div></div>
    </div>`).join('')}
  </div></div>`;
}

// ============================================================
// NAVIGATION
// ============================================================
function goTo(screen){
  if(GS.battle&&!GS.battle.over&&screen!=='battle'){
    notif('No disponible en batalla','err',2500);return;
  }
  // If navigating away from profile to a real screen, save prevScreen
  if(screen!=='profile'){GS._prevScreen=screen;}
  GS.screen=screen;
  document.querySelectorAll('.screen').forEach(s=>s.style.display='none');
  const sc=document.getElementById('screen-'+screen);
  if(sc){sc.style.display='flex';sc.style.flexDirection='column';}
  document.querySelectorAll('.nav-btn').forEach(b=>b.classList.toggle('active',b.dataset.s===screen));
  renderCurrent();
}
// Avatar click: toggle profile; closing restores last real screen
function hudAvatarClick(){
  if(GS.battle&&!GS.battle.over){notif('No disponible en batalla','err',2500);return;}
  if(GS.screen==='profile'){
    const back=GS._prevScreen||'radar';
    goTo(back);
  }else{
    GS._prevScreen=GS.screen;
    goTo('profile');
  }
}
function renderCurrent(){
  switch(GS.screen){
    case 'radar':renderRadarCanvas();renderSpawnList();if(!spawnLoop)startLoop();break;
    case 'battle':renderBattle();break;
    case 'team':renderTeam();break;
    case 'pc':renderPC();break;
    case 'shop':renderShop();break;
    case 'inventory':renderInventory();break;
    case 'trainers':renderTrainers();break;
    case 'codes':renderCodes();break;
    case 'profile':renderProfile();break;
  }
  updateHUD();
}
function updateHUD(){
  const g=document.getElementById('hud-gold');if(g)g.textContent=GS.player.gold.toLocaleString();
  // Avatar
  const av=GS.player.avatar||DEFAULT_AVATAR;
  const hudImg=document.getElementById('hud-avatar-img');
  const hudPh=document.getElementById('hud-avatar-ph');
  if(hudImg){hudImg.src=av;hudImg.style.display='block';}
  if(hudPh)hudPh.style.display='none';
  // Battle lock on nav
  const inBattle=!!(GS.battle&&!GS.battle.over);
  document.querySelectorAll('.nav-btn').forEach(b=>{
    b.classList.toggle('nav-battle-lock',inBattle);
  });
  // Team
  const t=document.getElementById('hud-team');if(!t)return;
  t.innerHTML=GS.player.team.map(p=>{
    const dark=p.variant==='dark'&&p.currentHp>0?'filter:grayscale(1) brightness(.35)':'';
    const faint=p.currentHp<=0?'filter:grayscale(1) opacity(.3)':'';
    const vc=p.variant==='shiny'?'hud-slot-shiny':p.variant==='dark'?'hud-slot-dark':'';
    return`<div class="hud-slot ${vc}" title="${p.nickname||p.name} Lv.${p.lv}${p.currentHp<=0?' [KO]':''}">
      <img src="${getSprite(p)}" style="${faint||dark}" onerror="this.style.display='none'"></div>`;
  }).join('')+Array(Math.max(0,3-GS.player.team.length)).fill('<div class="hud-slot empty"><span class="ms" style="font-size:12px;color:var(--dim)">circles</span></div>').join('');
  loadSpr(av,()=>{if(GS.screen==='radar')renderRadarCanvas();});
}
function updateAllAvatars(){
  const av=GS.player.avatar||DEFAULT_AVATAR;
  delete _sprCache[av];
  const hudImg=document.getElementById('hud-avatar-img');
  const hudPh=document.getElementById('hud-avatar-ph');
  if(hudImg){hudImg.src=av;hudImg.style.display='block';}
  if(hudPh)hudPh.style.display='none';
  const hero=document.getElementById('profile-hero-img');if(hero)hero.src=av;
  loadSpr(av,()=>renderRadarCanvas());
}

// ============================================================
// TEAM/PC SCREENS — FIX 6
// ============================================================
function renderTeam(){
  const sc=document.getElementById('screen-team');if(!sc)return;
  sc.innerHTML=`<div class="sec-hdr"><h2>Equipo</h2><p>Máximo 3 Pokémon activos</p></div>
  <div class="view-mode-bar">
    <button class="vm-btn ${GS.viewMode==='detailed'?'active':''}" onclick="GS.viewMode='detailed';save();renderTeam()"><span class="ms" style="font-size:14px">dashboard</span>Detallado</button>
    <button class="vm-btn ${GS.viewMode==='simple'?'active':''}" onclick="GS.viewMode='simple';save();renderTeam()"><span class="ms" style="font-size:14px">view_list</span>Simple</button>
  </div>
  <div class="pkm-cards">${GS.player.team.length?GS.player.team.map((p,i)=>pkmCard(p,i,'team')).join(''):'<div class="empty-state">Captura Pokémon en el mapa.</div>'}</div>
  <div class="toggle-wrap" onclick="toggleES()">
    <div class="tog ${GS.player.expShareOn?'on':''}"></div>
    <span>Repartir EXP ${GS.player.expShareOn?'<span style="color:var(--green);font-size:10px;margin-left:4px">● Activo</span>':cntBag(200)?'':'(necesitas el ítem)'}</span>
  </div>`;
}
function toggleES(){if(!GS.player.expShareOn&&!cntBag(200)){notif('Necesitas el ítem Repartir Exp.','err');return;}GS.player.expShareOn=!GS.player.expShareOn;save();renderTeam();}

// pkmCard - simple/detailed view, rename, al-PC-if-fainted, capture info
function pkmCard(pkm,idx,src){
  const b=PD[pkm.pid];const pp=hpPct(pkm);const rc=RARITY_CFG[pkm.rar||'normal']||RARITY_CFG['normal'];
  const isFainted=pkm.currentHp<=0;const isFullHp=pkm.currentHp>=pkm.maxHp;
  const imgSt=isFainted?'filter:grayscale(1) opacity(0.3)':pkm.variant==='dark'?'filter:grayscale(1) brightness(0.28)':'';
  const evoRef=src==='team'?`GS.player.team[${idx}]`:`GS.player.pc[${idx}]`;
  const isSimple=GS.viewMode==='simple';
  const cardCls=pkm.variant==='shiny'?'card-shiny':pkm.variant==='dark'?'card-dark':'';
  const nameHtml=pkm.variant==='shiny'?`<span class="vname-shiny">${pkm.nickname||pkm.name}</span>`:pkm.variant==='dark'?`<span class="vname-dark">${pkm.nickname||pkm.name}</span>`:(pkm.nickname||pkm.name);
  const srcIcon=pkm.captureSource==='code'?'<span class="ms" style="font-size:11px;color:var(--gold)" title="Regalo">card_giftcard</span>':pkm.captureSource==='starter'?'<span class="ms" style="font-size:11px;color:var(--blue)" title="Inicial">circles</span>':'<span class="ms" style="font-size:11px;color:var(--dim)" title="Captura">filter_drama</span>';
  return`<div class="pkm-card ${isFainted?'fainted':''} ${cardCls}">
    <div class="pkm-card-hdr">
      <img class="pkm-spr" src="${getSprite(pkm)}" style="${imgSt}" onerror="this.style.display='none'">
      <div class="pkm-title">
        <div class="pkm-name">${variantLabel(pkm.variant)} ${nameHtml} ${genderTag(pkm.gender)}${pkm.nickname?`<span style="font-size:9px;color:var(--dim);font-style:italic">${pkm.name}</span>`:''}</div>
        <div class="pkm-lv">Lv.${pkm.lv}${pkm.lv>=100?' <span style="color:var(--gold);font-size:9px">MAX</span>':''}</div>
        <div style="display:flex;align-items:center;gap:4px;flex-wrap:wrap">
          <span class="rtag ${rc.cls}">${rc.label}</span>
          ${typeBadges(pkm.types||b.t)}
          ${statusTag(pkm.status)}
          ${isFainted?`<span class="faint-tag"><span class="ms" style="font-size:11px">heart_broken</span>KO</span>`:''}
        </div>
      </div>
    </div>
    ${pkm.evoPending&&!isFainted?`<div class="evo-ready-tag" onclick="showEvoPrompt(${evoRef})">⭐ Puede Evolucionar</div>`:''}
    <div class="exprow">EXP <div class="exprow-bar"><div class="exprow-fill" style="width:${Math.round(pkm.exp/pkm.expNext*100)}%"></div></div><span style="font-size:9px">${pkm.exp}/${pkm.expNext}</span></div>
    ${isFainted?`
      <div style="text-align:center;color:var(--dim);font-size:11px;padding:4px 0">Pokémon debilitado</div>
      <div class="card-acts">
        ${src==='team'?`<button class="cact cact-pc" onclick="toPC(${idx})"><span class="ms" style="font-size:14px">computer</span>Al PC</button>`:''}
        <button class="cact cact-revive" onclick="revivePkm('${pkm.uid}','${src}',${idx})"><span class="ms" style="font-size:14px">healing</span>Revivir</button>
        <button class="cact cact-sell" onclick="sellPkm('${pkm.uid}','${src}',${idx})"><span class="ms" style="font-size:14px">sell</span>${getSellPrice(pkm)}G</button>
      </div>`:`
    ${!isSimple?`
    <div class="statrow"><span>HP</span><div class="statbar"><div class="statbar-fill" style="width:${pp}%;background:${hpCol(pp)}"></div></div><span>${pkm.currentHp}/${pkm.maxHp}</span></div>
    <div class="statrow"><span>ATK</span><div class="statbar"><div class="statbar-fill" style="width:${Math.min(100,pkm.atk/3)}%;background:#e74c3c"></div></div><span>${pkm.atk}</span></div>
    <div class="statrow"><span>DEF</span><div class="statbar"><div class="statbar-fill" style="width:${Math.min(100,pkm.def/3)}%;background:#3498db"></div></div><span>${pkm.def}</span></div>
    <div class="statrow"><span>VEL</span><div class="statbar"><div class="statbar-fill" style="width:${Math.min(100,pkm.spd/3)}%;background:#f39c12"></div></div><span>${pkm.spd}</span></div>
    <div class="moves-row">${(pkm.moves||[]).map(m=>`<span class="mtag" style="background:${TCOL[MOVE[m]?.type||'normal']||'#777'}">${m}</span>`).join('')}${pkm.thirdMove?`<span class="mtag mtag-extra" style="background:${TCOL[MOVE[pkm.thirdMove]?.type||'normal']||'#777'}">${pkm.thirdMove}</span>`:''}</div>
    <div style="display:flex;align-items:center;gap:4px;margin-top:2px">${srcIcon}<span style="font-size:9px;color:var(--dim)">${pkm.capturedAt?formatDate(pkm.capturedAt):''}</span></div>`
    :`<div class="statrow"><span>HP</span><div class="statbar"><div class="statbar-fill" style="width:${pp}%;background:${hpCol(pp)}"></div></div><span>${pkm.currentHp}/${pkm.maxHp}</span></div>`}
    <div class="card-acts">
      ${pkm.evoPending?`<button class="cact cact-evo" onclick="showEvoPrompt(${evoRef})"><span class="ms" style="font-size:14px">star</span>Evo</button>`:''}
      <button class="cact" style="background:rgba(52,152,219,.1);color:var(--blue);border:1px solid rgba(52,152,219,.25)" onclick="openRename('${pkm.uid}')"><span class="ms" style="font-size:14px">edit</span>${pkm.nickname?'Emote':'Emote'}</button>
      ${src==='team'?`<button class="cact cact-pc" onclick="toPC(${idx})"><span class="ms" style="font-size:14px">computer</span>Al PC</button>`:`<button class="cact cact-team" onclick="toTeam(${idx})"><span class="ms" style="font-size:14px">swords</span>Al Equipo</button>`}
      ${!isFullHp?`<button class="cact cact-heal" onclick="healPkm('${pkm.uid}','${src}',${idx})"><span class="ms" style="font-size:14px">medication</span>Curar</button>`:''}
      ${pkm.status?`<button class="cact" style="background:rgba(255,100,100,.1);color:#ff8888;border:1px solid rgba(255,100,100,.3)" onclick="cureStatus('${pkm.uid}','${src}',${idx})"><span class="ms" style="font-size:14px">medication</span>${STATUS_TAG[pkm.status]||''}</button>`:''}
      ${(!pkm.thirdMove)&&Object.values(ITEMS).some(i=>i.cat==='mt'&&cntBag(i.id))?`<button class="cact" style="background:rgba(155,89,182,.15);color:#bb8fce;border:1px solid rgba(155,89,182,.3)" onclick="openMTForPkm('${pkm.uid}')"><span class="ms" style="font-size:14px">library_add</span>MT</button>`:''}
      <button class="cact cact-sell" onclick="sellPkm('${pkm.uid}','${src}',${idx})"><span class="ms" style="font-size:14px">sell</span>${getSellPrice(pkm)}G</button>
    </div>`}
  </div>`;
}
function openRename(uid){
  const pkm=[...GS.player.team,...GS.player.pc].find(p=>p.uid===uid);if(!pkm)return;
  showOv('enc-ov',`<div class="obox">
    <div class="otitle"><span class="ms" style="font-size:16px;color:var(--blue)">edit</span> Apodo: ${pkm.name}</div>
    <input id="rename-in" class="prof-in" value="${pkm.nickname||''}" placeholder="${pkm.name}" maxlength="20" style="width:100%"
      onkeydown="validateAlNum(event);stopMapKeys(event);if(event.key==='Enter')_doRename('${uid}')" onfocus="stopMapKeys(event)" oninput="stopMapKeys(event)">
    <div style="display:flex;gap:8px;width:100%">
      <button class="ebtn ebtn-catch" style="flex:1" onclick="_doRename('${uid}')"><span class="ms">check</span>Guardar</button>
      <button class="ebtn" style="background:rgba(231,76,60,.1);color:var(--acc);border:1px solid rgba(231,76,60,.3)" onclick="_doRename('${uid}',true)"><span class="ms">clear</span>Quitar</button>
      <button class="ebtn ebtn-flee" onclick="closeOv('enc-ov')"><span class="ms">close</span></button>
    </div>
  </div>`);
  setTimeout(()=>{const e=document.getElementById('rename-in');if(e){e.focus();e.select();}},60);
}
function _doRename(uid,clear=false){
  const pkm=[...GS.player.team,...GS.player.pc].find(p=>p.uid===uid);if(!pkm)return;
  if(clear){pkm.nickname=null;}else{const e=document.getElementById('rename-in');if(e)pkm.nickname=e.value.trim().slice(0,20)||null;}
  closeOv('enc-ov');save();renderCurrent();
  notif(pkm.nickname?'Apodo "'+pkm.nickname+'" guardado':'Apodo eliminado','ok');
}
function toPC(i){const p=GS.player.team.splice(i,1)[0];GS.player.pc.push(p);save();notif(`${p.name} movido al PC.`,'info');renderTeam();updateHUD();}
function toTeam(i){if(GS.player.team.length>=3){notif('Equipo lleno. Máximo 3.','err');return;}const p=GS.player.pc.splice(i,1)[0];GS.player.team.push(p);save();notif(`${p.name} al equipo.`,'ok');renderPC();updateHUD();}
function cureStatus(uid,src,idx){
  const list=src==='team'?GS.player.team:GS.player.pc;const pkm=list[idx];if(!pkm||!pkm.status)return;
  const cureItems={poison:[14,21],sleep:[17,21],freeze:[18,21],paralyze:[19,21],burn:[20,21]};
  const available=(cureItems[pkm.status]||[]).filter(id=>cntBag(id)>0);
  if(!available.length){notif(`Sin ítem para curar ${STATUS_TAG[pkm.status]||pkm.status}.`,'err');return;}
  showOv('enc-ov',`<div class="obox"><div class="otitle">Curar ${STATUS_TAG[pkm.status]} de ${pkm.name}</div>
    ${available.map(id=>{const it=ITEMS[id];return`<div class="heal-pick-item" onclick="doCureStatus('${uid}','${src}',${idx},${id})">
      <img src="${it.sp}" onerror="this.style.display='none'"><div><b>${it.n}</b> x${cntBag(id)}<br><small style="color:var(--dim)">${it.desc}</small></div>
    </div>`;}).join('')}
    <button class="ebtn ebtn-flee" onclick="closeOv('enc-ov')"><span class="ms">close</span>Cancelar</button></div>`);
}
function doCureStatus(uid,src,idx,itemId){
  closeOv('enc-ov');const list=src==='team'?GS.player.team:GS.player.pc;const pkm=list[idx];
  if(!pkm)return;const it=ITEMS[+itemId];if(!it||!useBag(itemId)){notif('Sin ese ítem.','err');return;}
  if(it.cures&&pkm.status&&it.cures.includes(pkm.status)){pkm.status=null;pkm.sleepTurns=0;}
  if(it.hp)pkm.currentHp=Math.min(pkm.maxHp,pkm.currentHp+(it.hp>=9999?pkm.maxHp:it.hp));
  notif(`${it.n} curó a ${pkm.name}.`,'ok');save();renderCurrent();
}
// FIX 6 — healPkm blocks fainted
function healPkm(uid,src,idx){
  const list=src==='team'?GS.player.team:GS.player.pc;const pkm=list[idx];
  if(!pkm||pkm.currentHp<=0){notif('Usa Revivir para Pokémon debilitados.','err');return;}
  if(pkm.currentHp>=pkm.maxHp){notif(`${pkm.name} ya tiene HP completo.`,'warn');return;}
  const healIs=[21,13,12,11,10].filter(id=>cntBag(id)>0);
  if(!healIs.length){notif('Sin ítems de curación.','err');return;}
  showOv('enc-ov',`<div class="obox"><div class="otitle">Curar ${pkm.name} (${pkm.currentHp}/${pkm.maxHp} HP)</div>
    ${healIs.map(id=>{const it=ITEMS[id];return`<div class="heal-pick-item" onclick="doHealPkm('${uid}','${src}',${idx},${id})">
      <img src="${it.sp}" onerror="this.style.display='none'"><div><b>${it.n}</b> x${cntBag(id)}<br><small style="color:var(--dim)">${it.desc}</small></div>
    </div>`;}).join('')}
    <button class="ebtn ebtn-flee" onclick="closeOv('enc-ov')"><span class="ms">close</span>Cancelar</button></div>`);
}
function doHealPkm(uid,src,idx,itemId){
  closeOv('enc-ov');const list=src==='team'?GS.player.team:GS.player.pc;const pkm=list[idx];
  if(!pkm||pkm.currentHp<=0)return;const it=ITEMS[+itemId];if(!it||!useBag(itemId))return;
  pkm.currentHp=Math.min(pkm.maxHp,pkm.currentHp+(it.hp>=9999?pkm.maxHp:it.hp||0));
  if(it.cures&&pkm.status&&it.cures.includes(pkm.status)){pkm.status=null;pkm.sleepTurns=0;}
  notif(`${it.n} usada en ${pkm.name}.`,'ok');save();renderCurrent();
}
// FIX 6 — revivePkm: ONLY for HP=0
function revivePkm(uid,src,idx){
  const list=src==='team'?GS.player.team:GS.player.pc;const pkm=list[idx];
  if(!pkm||pkm.currentHp>0){notif('Solo para Pokémon debilitados (0 HP).','err');return;}
  const revIs=[16,15].filter(id=>cntBag(id)>0);
  if(!revIs.length){notif('Sin Revivir. Cómpralo en la Tienda.','err');return;}
  showOv('enc-ov',`<div class="obox"><div class="otitle">Revivir a ${pkm.name}</div>
    ${revIs.map(id=>{const it=ITEMS[id];return`<div class="heal-pick-item" onclick="doRevive('${uid}','${src}',${idx},${id})">
      <img src="${it.sp}" onerror="this.style.display='none'"><div><b>${it.n}</b> x${cntBag(id)}<br><small style="color:var(--dim)">${it.desc}</small></div>
    </div>`;}).join('')}
    <button class="ebtn ebtn-flee" onclick="closeOv('enc-ov')"><span class="ms">close</span>Cancelar</button></div>`);
}
function doRevive(uid,src,idx,itemId){
  closeOv('enc-ov');const list=src==='team'?GS.player.team:GS.player.pc;const pkm=list[idx];
  if(!pkm||pkm.currentHp>0)return;const it=ITEMS[+itemId];if(!it||!useBag(itemId))return;
  pkm.currentHp=Math.floor(pkm.maxHp*(it.pct/100));pkm.status=null;pkm.sleepTurns=0;
  notif(`¡${pkm.name} revivió con ${pkm.currentHp} HP!`,'ok');save();renderCurrent();
}
function sellPkm(uid,src,idx){
  const list=src==='team'?GS.player.team:GS.player.pc;const pkm=list[idx];if(!pkm)return;
  const price=getSellPrice(pkm);
  if(!confirm(`¿Vender ${pkm.name} por ${price}G?`))return;
  list.splice(idx,1);addGold(price);notif(`Vendiste ${pkm.name} por ${price}G.`,'ok');save();renderCurrent();updateHUD();
}
function openMTForPkm(uid){
  const mts=Object.values(ITEMS).filter(i=>i.cat==='mt'&&cntBag(i.id)>0);if(!mts.length)return;
  const pkm=[...GS.player.team,...GS.player.pc].find(p=>p.uid===uid);if(!pkm)return;
  showOv('enc-ov',`<div class="obox"><div class="otitle">Enseñar MT a ${pkm.name}</div>
    ${mts.map(it=>`<div class="heal-pick-item" onclick="doTeachMT(${it.id},'${uid}')">
      <img src="${it.sp}" onerror="this.style.display='none'"><div><b>${it.n}</b> — ${it.mv}<br><small style="color:var(--dim)">${it.desc} x${cntBag(it.id)}</small></div>
    </div>`).join('')}
    <button class="ebtn ebtn-flee" onclick="closeOv('enc-ov')"><span class="ms">close</span>Cancelar</button></div>`);
}
function doTeachMT(id,uid){
  closeOv('enc-ov');const it=ITEMS[+id];const pkm=[...GS.player.team,...GS.player.pc].find(p=>p.uid===uid);
  if(!pkm||!it||!useBag(id))return;pkm.thirdMove=it.mv;notif(`${pkm.name} aprendió ${it.mv}!`,'ok');save();renderCurrent();
}
function renderPC(){
  const sc=document.getElementById('screen-pc');if(!sc)return;
  sc.innerHTML=`<div class="sec-hdr"><h2>PC de Bill</h2><p>${GS.player.pc.length} Pokémon guardados</p></div>
  <div class="pc-ctrl-row">
    <div class="pc-search-wrap">
      <span class="ms" style="color:var(--dim);font-size:18px">search</span>
      <input id="pcsearch" class="pc-search-in" type="text" placeholder="Nombre, tipo, rareza..."
        onkeydown="stopMapKeys(event)" onfocus="stopMapKeys(event)" oninput="GS.pcSearch=this.value;GS.pcPage=0;_renderPCList()">
      <button id="pcclrbtn" class="pc-clear-btn" style="display:none" onclick="GS.pcSearch='';GS.pcPage=0;document.getElementById('pcsearch').value='';document.getElementById('pcclrbtn').style.display='none';_renderPCList()"><span class="ms" style="font-size:16px">close</span></button>
    </div>
    <div class="view-mode-bar" style="margin:0">
      <button class="vm-btn ${GS.viewMode==='detailed'?'active':''}" onclick="GS.viewMode='detailed';save();renderPC()"><span class="ms" style="font-size:14px">dashboard</span></button>
      <button class="vm-btn ${GS.viewMode==='simple'?'active':''}" onclick="GS.viewMode='simple';save();renderPC()"><span class="ms" style="font-size:14px">view_list</span></button>
    </div>
  </div>
  <div id="pclist"></div><div id="pcpages"></div>`;
  if(GS.pcSearch){const si=document.getElementById('pcsearch');if(si)si.value=GS.pcSearch;const cb=document.getElementById('pcclrbtn');if(cb)cb.style.display='flex';}
  _renderPCList();
}
function _renderPCList(){
  const wrap=document.getElementById('pclist');const pages=document.getElementById('pcpages');if(!wrap)return;
  const q=(GS.pcSearch||'').toLowerCase();const PAGE=20;
  let list=GS.player.pc;
  if(q)list=list.filter(p=>(p.nickname||p.name).toLowerCase().includes(q)||p.types.some(t=>t.includes(q))||(RARITY_CFG[p.rar]?.label||'').toLowerCase().includes(q)||p.variant.includes(q));
  const total=Math.max(1,Math.ceil(list.length/PAGE));const cp=Math.min(GS.pcPage||0,total-1);
  const cb=document.getElementById('pcclrbtn');if(cb)cb.style.display=GS.pcSearch?'flex':'none';
  const slice=list.slice(cp*PAGE,(cp+1)*PAGE);
  wrap.innerHTML=slice.length?`<div class="pkm-cards">${slice.map((p,i)=>pkmCard(p,cp*PAGE+i,'pc')).join('')}</div>`
    :`<div class="empty-state">${q?'No hay registro en tu PC para: "'+GS.pcSearch+'"':'El PC está vacío.'}</div>`;
  if(pages)pages.innerHTML=total>1?`<div class="pc-pagination">
    <button class="page-btn" onclick="GS.pcPage=${Math.max(0,cp-1)};_renderPCList()" ${cp===0?'disabled':''}><span class="ms">chevron_left</span></button>
    <span class="page-info">${cp+1}/${total}</span>
    <button class="page-btn" onclick="GS.pcPage=${Math.min(total-1,cp+1)};_renderPCList()" ${cp===total-1?'disabled':''}><span class="ms">chevron_right</span></button>
  </div>`:'';
}

// ============================================================
// SHOP — FIX 5 candy category
// ============================================================
function renderShop(){
  const sc=document.getElementById('screen-shop');if(!sc)return;
  const cats=[['pokeball','Poké Balls','circles'],['candy','Caramelos Raros','star'],['heal','Curación y Estado','medication'],['revive','Revivir','healing'],['evo','Evolución','auto_awesome'],['held','Held Items','backpack'],['mt','MTs','library_add']];
  sc.innerHTML=`<div class="sec-hdr"><h2>Tienda</h2><p>${GS.player.gold.toLocaleString()} Oro disponible</p></div>
  ${cats.map(([cat,label,icon])=>{
    const its=Object.values(ITEMS).filter(i=>i.cat===cat);if(!its.length)return'';
    return`<div class="shop-cat"><h3><span class="ms" style="font-size:16px;color:#f39c12">${icon}</span> ${label}</h3><div class="shop-list">
      ${its.map(it=>`<div class="shop-item">
        <img src="${it.sp||''}" onerror="this.style.display='none'">
        <div class="shop-item-info"><span class="shop-item-name">${it.n}</span><span class="shop-item-desc">${it.desc}</span><span class="shop-item-own">En mochila: x${cntBag(it.id)}</span></div>
        <div class="shop-actions"><span class="shop-price">${it.price>=99999?'∞':it.price.toLocaleString()}G</span>
          ${it.price<99999?`<button class="btn-buy" onclick="buyItem(${it.id})">Comprar</button>`:''}
          ${it.sell>0?`<button class="btn-sell-item" onclick="sellItem(${it.id})">Vender ${it.sell}G</button>`:''}
        </div></div>`).join('')}
    </div></div>`;
  }).join('')}`;
}
function buyItem(id){const it=ITEMS[+id];if(!it)return;if(GS.player.gold<it.price){notif(`Necesitas ${it.price.toLocaleString()}G.`,'err');return;}GS.player.gold-=it.price;addBag(id,1);save();updateHUD();notif(`Compraste ${it.n}.`,'ok');renderShop();}
function sellItem(id){const it=ITEMS[+id];if(!it||!it.sell||!cntBag(id)){notif('No tienes ese ítem.','err');return;}useBag(id);addGold(it.sell);notif(`Vendiste ${it.n} por ${it.sell}G.`,'ok');save();renderShop();}

// ============================================================
// INVENTORY — FIX 5+6
// ============================================================
function renderInventory(){
  const sc=document.getElementById('screen-inventory');if(!sc)return;
  const bag=Object.keys(GS.player.bag).map(id=>({...ITEMS[+id],qty:GS.player.bag[+id]})).filter(x=>x&&x.n);
  sc.innerHTML=`<div class="sec-hdr"><h2>Inventario</h2><p>${bag.length} tipos de ítems</p></div>
  ${bag.length?`<div class="inv-grid">${bag.map(it=>`<div class="inv-item">
    <img src="${it.sp||''}" onerror="this.style.display='none'">
    <span class="inv-item-name">${it.n}</span><span class="inv-item-qty">x${it.qty}</span>
    <div style="font-size:9px;color:var(--dim);text-align:center;padding:0 4px">${it.desc||''}</div>
    <div class="inv-item-acts">
      ${it.cat==='candy'?`<button class="inv-use-btn" onclick="useRareCandy(${it.id})">Usar</button>`:''}
      ${it.cat==='evo'?`<button class="inv-use-btn" onclick="useEvoItem(${it.id})">Usar</button>`:''}
      ${it.cat==='mt'?`<button class="inv-use-btn" onclick="openMTItem(${it.id})">Enseñar</button>`:''}
      ${it.cat==='held'&&it.id===200?(GS.player.expShareOn?`<button class="inv-use-btn" style="background:rgba(46,204,113,.15);color:var(--green);cursor:not-allowed" disabled>✓ Activado</button>`:`<button class="inv-use-btn" onclick="activateHeld(${it.id})">Activar</button>`):it.cat==='held'?`<button class="inv-use-btn" onclick="activateHeld(${it.id})">Activar</button>`:''}
      ${it.cat==='heal'?`<button class="inv-use-btn" onclick="useHealFromInv(${it.id})">Usar</button>`:''}
      ${it.cat==='revive'?`<button class="inv-use-btn" onclick="useReviveFromInv(${it.id})">Revivir</button>`:''}
      ${it.sell>0?`<button class="inv-sell-btn" onclick="sellItem(${it.id});renderInventory()">Vender</button>`:''}
    </div></div>`).join('')}</div>`:'<div class="empty-state">Tu inventario está vacío.</div>'}`;
}
// FIX 6 — separate heal (alive) vs revive (fainted)
function useHealFromInv(id){
  const it=ITEMS[+id];if(!it||!cntBag(id))return;
  const targets=GS.player.team.filter(p=>p.currentHp>0&&(p.currentHp<p.maxHp||(it.cures&&it.cures.includes(p.status))));
  if(!targets.length){notif('Ningún Pokémon necesita curación.','warn');return;}
  showOv('enc-ov',`<div class="obox"><div class="otitle">¿Usar ${it.n} en quién?</div>
    ${targets.map(p=>`<div class="heal-pick-item" onclick="doUseHealOnPkm('${p.uid}',${id})">
      <img src="${getSprite(p)}" style="width:36px;image-rendering:pixelated" onerror="this.style.display='none'">
      <div><b>${p.name}</b> Lv.${p.lv} ${statusTag(p.status)}<br><small>${p.currentHp}/${p.maxHp} HP</small></div>
    </div>`).join('')}
    <button class="ebtn ebtn-flee" onclick="closeOv('enc-ov')"><span class="ms">close</span>Cancelar</button></div>`);
}
function useReviveFromInv(id){
  const it=ITEMS[+id];if(!it||!cntBag(id))return;
  const targets=GS.player.team.filter(p=>p.currentHp<=0);
  if(!targets.length){notif('No hay Pokémon debilitados.','warn');return;}
  showOv('enc-ov',`<div class="obox"><div class="otitle">¿Revivir a quién?</div>
    ${targets.map(p=>`<div class="heal-pick-item" onclick="doUseReviveOnPkm('${p.uid}',${id})">
      <img src="${getSprite(p)}" style="width:36px;image-rendering:pixelated;filter:grayscale(1) opacity(.5)" onerror="this.style.display='none'">
      <div><b>${p.name}</b> Lv.${p.lv}<br><small style="color:var(--acc)">0/${p.maxHp} HP — Debilitado</small></div>
    </div>`).join('')}
    <button class="ebtn ebtn-flee" onclick="closeOv('enc-ov')"><span class="ms">close</span>Cancelar</button></div>`);
}
function doUseHealOnPkm(uid,itemId){
  closeOv('enc-ov');const pkm=[...GS.player.team,...GS.player.pc].find(p=>p.uid===uid);
  const it=ITEMS[+itemId];if(!pkm||!it||pkm.currentHp<=0)return;
  if(!useBag(itemId))return;
  pkm.currentHp=Math.min(pkm.maxHp,pkm.currentHp+(it.hp>=9999?pkm.maxHp:it.hp||0));
  if(it.cures&&pkm.status&&it.cures.includes(pkm.status)){pkm.status=null;pkm.sleepTurns=0;}
  notif(`${it.n} usada en ${pkm.name}.`,'ok');save();renderInventory();
}
function doUseReviveOnPkm(uid,itemId){
  closeOv('enc-ov');const pkm=[...GS.player.team,...GS.player.pc].find(p=>p.uid===uid);
  const it=ITEMS[+itemId];if(!pkm||!it||pkm.currentHp>0)return;
  if(!useBag(itemId))return;
  pkm.currentHp=Math.floor(pkm.maxHp*(it.pct/100));pkm.status=null;pkm.sleepTurns=0;
  notif(`¡${pkm.name} revivió con ${pkm.currentHp} HP!`,'ok');save();renderInventory();
}
function useEvoItem(id){
  const it=ITEMS[+id];if(!it||!cntBag(id))return;
  const eligible=[...GS.player.team,...GS.player.pc].filter(p=>it.eIds&&it.eIds.includes(p.pid));
  if(!eligible.length){notif('Ningún Pokémon puede usar este ítem.','warn');return;}
  if(eligible.length===1){_applyEvoItem(eligible[0],id);}
  else{
    showOv('enc-ov',`<div class="obox"><div class="otitle">¿Usar ${it.n} en quién?</div>
      ${eligible.map(p=>`<div class="heal-pick-item" onclick="closeOv('enc-ov');_applyEvoItem(GS.player.team.find(x=>x.uid==='${p.uid}')||GS.player.pc.find(x=>x.uid==='${p.uid}'),${id})">
        <img src="${getSprite(p)}" style="width:36px;image-rendering:pixelated" onerror="this.style.display='none'">
        <div><b>${p.nickname||p.name}</b> Lv.${p.lv}</div>
      </div>`).join('')}
      <button class="ebtn ebtn-flee" onclick="closeOv('enc-ov')"><span class="ms">close</span>Cancelar</button></div>`);
  }
}
function _applyEvoItem(pkm,id){
  if(!pkm)return;const b=PD[pkm.pid];if(!b||!b.evo||!b.evo.length)return;
  pkm.evoPending=b.evo[0];pkm._pendingEvoItemId=+id;save();showEvoPrompt(pkm);
}
function openMTItem(id){
  const it=ITEMS[+id];if(!it||!cntBag(id))return;
  showOv('enc-ov',`<div class="obox"><div class="otitle">¿Enseñar ${it.mv} a quién?</div>
    ${[...GS.player.team,...GS.player.pc].map(p=>`<div class="heal-pick-item" onclick="doTeachMT(${id},'${p.uid}')">
      <img src="${getSprite(p)}" style="width:36px;image-rendering:pixelated" onerror="this.style.display='none'">
      <div><b>${p.name}</b> Lv.${p.lv} ${p.thirdMove?`(ya sabe ${p.thirdMove})`:''}</div>
    </div>`).join('')}
    <button class="ebtn ebtn-flee" onclick="closeOv('enc-ov')"><span class="ms">close</span>Cancelar</button></div>`);
}
function activateHeld(id){if(+id===200){if(GS.player.expShareOn){notif('Ya está activo','warn');return;}GS.player.expShareOn=true;notif('¡Repartir Exp activado!','ok');}save();renderInventory();}

// ============================================================
// TRAINERS
// ============================================================
function renderTrainers(){
  const sc=document.getElementById('screen-trainers');if(!sc)return;
  const maxLv=GS.player.team.length?Math.max(...GS.player.team.map(p=>p.lv)):1;
  sc.innerHTML=`<div class="sec-hdr"><h2>Entrenadores</h2><p>Tu nivel máximo: ${maxLv}</p></div>
  ${Object.entries(TRAINERS).map(([region,data])=>`
    <div class="region-block"><div class="region-hdr" style="border-color:${data.col}">
      <span>${data.name}</span><span>${data.trainers.filter(t=>t.def).length}/${data.trainers.length} derrotados</span></div>
    <div class="trainer-list">${data.trainers.map(t=>{const can=maxLv>=t.minLv;
      return`<div class="trainer-card ${t.def?'defeated':''} ${!can?'locked':''}">
        <div class="t-icon"><span class="ms" style="font-size:28px;color:var(--gold)">${t.icon}</span></div>
        <div class="t-info"><span class="t-name">${t.n}</span><span class="t-lv">Nivel mínimo: ${t.minLv}</span>
          <span class="t-reward">Recompensa: ${t.rew.toLocaleString()}G</span>
          <div class="t-team">${t.pk.map(pk=>`<span class="t-pkm"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pk.id}.png" onerror="this.style.display='none'">Lv.${pk.lv}</span>`).join('')}</div>
        </div>
        <div>${t.def?`<span class="def-badge"><span class="ms" style="font-size:16px;color:var(--green)">check_circle</span></span>`:!can?`<span class="lock-badge"><span class="ms" style="font-size:16px">lock</span></span>`:`<button class="fight-btn" onclick="startTrainerBattle('${region}','${t.id}')">Luchar</button>`}</div>
      </div>`;}).join('')}</div></div>`).join('')}
  ${Object.keys(MAPS).some(k=>MAPS[k].legUn)?`<div class="leg-unlock-msg"><span class="ms">stars</span> Legendarios desbloqueados.</div>`:''}`;
}

// ============================================================
// CODES
// ============================================================
function renderCodes(){
  const sc=document.getElementById('screen-codes');if(!sc)return;
  sc.innerHTML=`<div class="sec-hdr"><h2>Código Especial</h2></div>
  <div class="code-form">
    <input id="code-in" class="code-input" type="text" placeholder="TU-CÓDIGO-AQUÍ" maxlength="20">
    <button class="code-submit" onclick="redeemCode()"><span class="ms" style="font-size:18px">redeem</span>Canjear</button>
  </div>
  <div class="used-codes"><h3>Usados</h3>${[...GS.player.usedCodes].map(c=>`<span class="used-badge">${c}</span>`).join('')||'<span style="color:var(--dim);font-size:12px">Ninguno.</span>'}</div>
  <div class="codes-hint"><h3><span class="ms" style="font-size:16px">lightbulb</span> Códigos</h3>
    ${Object.entries(CODES).map(([k,v])=>`<div class="code-li"><b>${k}</b> — ${v.desc}</div>`).join('')}
  </div>`;
}
function redeemCode(){
  const inp=document.getElementById('code-in');if(!inp)return;
  const code=inp.value.trim().toUpperCase();
  if(!code){notif('Escribe un código.','warn');return;}
  if(GS.player.usedCodes.has(code)){notif('Código ya utilizado.','err');return;}
  const entry=CODES[code];if(!entry){notif('Código no válido.','err');return;}
  entry.rewards.forEach(r=>{
    if(r.t==='gold')addGold(r.v);
    else if(r.t==='item')addBag(r.id,r.q);
    else if(r.t==='pokemon'){const pkm=mkPkm(r.pid,r.variant||'normal',r.lv||5);if(pkm){if(GS.player.team.length<3)GS.player.team.push(pkm);else GS.player.pc.push(pkm);}}
  });
  GS.player.usedCodes.add(code);inp.value='';save();
  notif(`¡${entry.desc}`,'ok',5000);renderCodes();updateHUD();
}

// ============================================================
// PROFILE — FIX 7 steps counter
// ============================================================
function renderProfile(){
  const sc=document.getElementById('screen-profile');if(!sc)return;
  const total=GS.player.team.length+GS.player.pc.length;
  const allT=Object.values(TRAINERS).flatMap(rd=>rd.trainers);
  const defCnt=allT.filter(t=>t.def||GS.player.defeatedTrainers.has(t.id)).length;
  const av=GS.player.avatar||DEFAULT_AVATAR;
  const badgesHTML=Object.entries(TRAINERS).map(([r,rd])=>{
    const cnt=rd.trainers.filter(t=>t.def||GS.player.defeatedTrainers.has(t.id)).length;
    return`<div class="badges-region">
      <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px;color:${rd.col}">${rd.name} <span style="font-size:9px;color:var(--dim)">${cnt}/${rd.trainers.length}</span></div>
      <div class="badges-flex">${rd.trainers.map(t=>{const won=t.def||GS.player.defeatedTrainers.has(t.id);
        return`<div class="badge-cell ${won?'badge-earned':'badge-locked'}">
          <div class="badge-icon" style="${won?'background:'+t.medalCol+';box-shadow:0 0 10px '+t.medalCol+'55':'background:var(--card2)'}">${t.medalIcon||'🏅'}</div>
          <span style="font-size:9px;font-weight:700;text-align:center;color:${won?t.medalCol:'var(--dim)'}">${t.medal||'Medalla'}</span>
          <span style="font-size:8px;color:var(--dim);text-align:center">${t.n}</span>
        </div>`;}).join('')}</div></div>`;}).join('');
  sc.innerHTML=`
    <div class="profile-hero">
      <img id="profile-hero-img" src="${av}" onerror="this.src='${DEFAULT_AVATAR}'" alt="">
      <div class="profile-hero-overlay">
        <div class="profile-hero-name">${GS.player.name}</div>
        <div style="display:flex;gap:6px">
          <button class="prof-hero-btn" onclick="openEditNamePop()" title="Cambiar nombre"><span class="ms" style="font-size:16px">edit</span></button>
          <button class="prof-hero-btn" onclick="openEditAvatarPop()" title="Cambiar foto"><span class="ms" style="font-size:16px">add_a_photo</span></button>
        </div>
      </div>
    </div>
    <div style="padding:12px;display:flex;flex-direction:column;gap:12px">
      <div class="prof-stats">
        <div class="pstat"><span>Oro</span><strong>${GS.player.gold.toLocaleString()}</strong></div>
        <div class="pstat"><span>Pokémon</span><strong>${total}</strong></div>
        <div class="pstat"><span>Pasos</span><strong>${(GS.player.steps||0).toLocaleString()}</strong></div>
        <div class="pstat"><span>Debilitados</span><strong style="color:var(--acc)">${GS.player.deaths||0}</strong></div>
        <div class="pstat"><span>Gyms</span><strong>${defCnt}/${allT.length}</strong></div>
        <div class="pstat"><span>Códigos</span><strong>${GS.player.usedCodes.size}</strong></div>
        <div class="pstat"><span>Mapa</span><strong style="font-size:10px">${MAPS[GS.map.id]?.name||''}</strong></div>
        <div class="pstat"><span>Inicio</span><strong style="font-size:11px">${formatDate(GS.player.createdAt)||'—'}</strong></div>
      </div>
      <div class="gym-medals-section">
        <div class="medals-header">
          <span class="ms" style="font-size:18px;color:var(--gold)">military_tech</span>
          <span style="font-family:'Orbitron',sans-serif;font-size:13px;font-weight:700">Medallas de Gym</span>
          <span class="medals-counter">${defCnt}/${allT.length}</span>
        </div>
        ${badgesHTML}
      </div>
      <div>
        <div style="font-size:11px;color:var(--dim);text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px;display:flex;align-items:center;gap:6px"><span class="ms" style="font-size:16px">save</span>Partida</div>
        <div style="display:flex;gap:8px">
          <button class="prof-save-btn" onclick="exportSave()"><span class="ms" style="font-size:14px">download</span>Exportar</button>
          <button class="prof-save-btn" onclick="importSave()"><span class="ms" style="font-size:14px">upload</span>Importar</button>
        </div>
      </div>
      <div class="danger-zone"><h3><span class="ms" style="font-size:16px">warning</span> Zona de peligro</h3>
        <button class="danger-btn" onclick="resetGame()"><span class="ms" style="font-size:14px">delete_forever</span>Borrar partida</button>
      </div>
    </div>`;
}
function openEditAvatarPop(){
  const av=GS.player.avatar||'';
  showOv('enc-ov',`<div class="obox">
    <div class="otitle"><span class="ms" style="font-size:16px;color:var(--blue)">add_a_photo</span> Foto de perfil</div>
    <img id="pop-av-p" src="${av||DEFAULT_AVATAR}" style="width:80px;height:80px;border-radius:50%;border:3px solid var(--blue);object-fit:cover" onerror="this.src='${DEFAULT_AVATAR}'">
    <input id="pop-av-i" class="prof-in" value="${av}" placeholder="URL de imagen (opcional)" style="width:100%"
      onkeydown="stopMapKeys(event)" onfocus="stopMapKeys(event)"
      oninput="var p=document.getElementById('pop-av-p');if(p)p.src=this.value||'${DEFAULT_AVATAR}'">
    <div style="display:flex;gap:8px;width:100%">
      <button class="ebtn ebtn-catch" style="flex:1" onclick="_saveAvPop()"><span class="ms">check</span>Guardar</button>
      <button class="ebtn" style="background:rgba(231,76,60,.1);color:var(--acc);border:1px solid rgba(231,76,60,.3)" onclick="GS.player.avatar='';save();updateAllAvatars();closeOv('enc-ov');renderProfile()"><span class="ms">delete</span>Quitar</button>
      <button class="ebtn ebtn-flee" onclick="closeOv('enc-ov')"><span class="ms">close</span></button>
    </div>
  </div>`);
  setTimeout(()=>{const i=document.getElementById('pop-av-i');if(i)i.focus();},60);
}
function _saveAvPop(){
  const i=document.getElementById('pop-av-i');if(!i)return;
  GS.player.avatar=i.value.trim();save();closeOv('enc-ov');updateAllAvatars();notif('Avatar actualizado','ok');renderProfile();
}
function openEditNamePop(){
  showOv('enc-ov',`<div class="obox">
    <div class="otitle"><span class="ms" style="font-size:16px;color:var(--blue)">edit</span> Nombre de entrenador</div>
    <input id="pop-name-i" class="prof-in" value="${GS.player.name}" maxlength="20" style="width:100%"
      onkeydown="validateAlNum(event);stopMapKeys(event)" onfocus="stopMapKeys(event)" oninput="stopMapKeys(event)">
    <div style="display:flex;gap:8px;width:100%">
      <button class="ebtn ebtn-catch" style="flex:1" onclick="_saveNamePop()"><span class="ms">check</span>Guardar</button>
      <button class="ebtn ebtn-flee" onclick="closeOv('enc-ov')"><span class="ms">close</span></button>
    </div>
  </div>`);
  setTimeout(()=>{const i=document.getElementById('pop-name-i');if(i){i.focus();i.select();}},60);
}
function _saveNamePop(){
  const i=document.getElementById('pop-name-i');if(!i)return;
  const n=i.value.trim();if(n)GS.player.name=n;save();closeOv('enc-ov');notif('Nombre actualizado','ok');renderProfile();
}
function exportSave(){const d=localStorage.getItem('pf3_save');if(!d){notif('No hay partida','warn');return;}const b=new Blob([d],{type:'application/json'});const u=URL.createObjectURL(b);const a=document.createElement('a');a.href=u;a.download='pokem_'+Date.now()+'.json';a.click();URL.revokeObjectURL(u);notif('Partida exportada','ok');}
function importSave(){const i=document.createElement('input');i.type='file';i.accept='.json';i.onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>{try{JSON.parse(ev.target.result);if(!confirm('¿Sobrescribir la partida?'))return;localStorage.setItem('pf3_save',ev.target.result);notif('¡Importada!','ok',2000);setTimeout(()=>location.reload(),1500);}catch(e){notif('Archivo inválido','err');}};r.readAsText(f);};i.click();}
function saveName(){const i=document.getElementById('pname');if(i){GS.player.name=i.value.trim()||'Entrenador';save();notif('Nombre guardado','ok');}}
function saveAvatar(){
  const i=document.getElementById('pavatar');if(!i)return;
  GS.player.avatar=i.value.trim();save();
  updateAllAvatars();notif('Avatar actualizado','ok');
}
function resetGame(){if(confirm('¿Borrar TODA la partida? Esta acción no se puede deshacer.')){localStorage.clear();location.reload();}}

// ============================================================
// MAP SELECT
// ============================================================
function openMapInfo(){
  const m=MAPS[GS.map.id];
  const poolHTML=m.pool.map(pid=>{const b=PD[pid];const lvR=b.lvR||[3,18];
    return`<div class="map-info-pkm"><img src="${b.sp}" style="width:38px;height:38px;image-rendering:pixelated" onerror="this.style.display='none'">
      <div><div style="font-size:11px;font-weight:700">${b.n}</div>
      <div style="font-size:9px;color:var(--dim)">Spawn:${b.rs}% · Shiny:${b.shinyR||'?'}% · Dark:${b.darkR||'?'}%</div>
      <div style="font-size:9px;color:var(--dim)">Nv.${lvR[0]}-${lvR[1]}</div>
      ${typeBadges(b.t)}</div></div>`;}).join('');
  const legHTML=m.leg.length?m.leg.map(pid=>{const b=PD[pid];const un=m.legUn;const lvR=b.lvR||[50,70];
    return`<div class="map-info-pkm"><img src="${b.sp}" style="width:38px;height:38px;image-rendering:pixelated;${un?'':'filter:grayscale(1) opacity(.3)'}" onerror="this.style.display='none'">
      <div><div style="font-size:11px;font-weight:700;color:${un?'#d4ac0d':'var(--dim)'}">${un?b.n:'???'}</div>
      <div style="font-size:9px;color:${un?'var(--gold)':'var(--dim)'}">${un?'Nv.'+lvR[0]+'-'+lvR[1]:'Completa Gyms Kanto'}</div></div></div>`;}).join('')
    :'<div style="font-size:11px;color:var(--dim)">Sin legendarios aquí.</div>';
  showOv('enc-ov',`<div class="obox" style="max-width:340px">
    <div class="otitle"><span class="ms" style="color:${m.col}">explore</span> ${m.name}</div>
    <div style="width:100%"><div style="font-size:10px;font-weight:700;color:var(--dim);text-transform:uppercase;margin-bottom:6px">Encuentros</div><div class="map-info-list">${poolHTML}</div></div>
    ${m.leg.length?`<div style="width:100%;margin-top:8px"><div style="font-size:10px;font-weight:700;color:var(--gold);text-transform:uppercase;margin-bottom:6px">Legendarios</div><div class="map-info-list">${legHTML}</div></div>`:''}
    <button class="ebtn ebtn-flee" onclick="closeOv('enc-ov')"><span class="ms">close</span>Cerrar</button>
  </div>`);
}
function openMapSelect(){
  showOv('map-ov',`<div class="obox" style="max-width:460px">
    <div class="otitle">Seleccionar Mapa</div>
    <div class="map-grid">${Object.values(MAPS).map(m=>`
      <div class="map-opt ${GS.map.id===m.id?'active':''}" style="background:${m.bg}" onclick="changeMap('${m.id}')">
        <div class="map-opt-name">${m.name}</div>
        ${m.legUn?'<div class="leg-badge">★ Legendarios</div>':''}
      </div>`).join('')}
    </div>
    <button class="ebtn ebtn-flee" onclick="closeOv('map-ov')"><span class="ms">close</span>Cerrar</button></div>`);
}
function changeMap(id){GS.map.id=id;GS.map.x=0;GS.map.y=0;GS.spawns=[];closeOv('map-ov');save();notif(`Bienvenido a ${MAPS[id].name}!`,'info');preloadSpawnSprites();goTo('radar');}
function showOv(id,html){const el=document.getElementById(id);if(!el)return;el.innerHTML=html;el.style.display='flex';}
function closeOv(id){const el=document.getElementById(id);if(el){el.style.display='none';if(id==='enc-ov')el.onclick=function(e){if(e.target===this)closeOv('enc-ov');};}}

// ============================================================
// FIX 9 — INTRO SCREEN
// ============================================================
function showIntro(){
  const ov=document.getElementById('intro-ov');if(!ov)return;
  const isNew=!localStorage.getItem('pf3_save');
  if(isNew){
    ov.innerHTML=`<div class="intro-box">
      <div class="intro-logo">POKEM</div>
      <div class="intro-sub">Tu aventura te espera</div>
      <div style="width:100%;display:flex;flex-direction:column;gap:10px;margin-top:4px">
        <label class="intro-label">Tu apodo de entrenador</label>
        <input id="intro-name" class="prof-in" placeholder="Ash Misty Red..." maxlength="20" style="width:100%" onkeydown="validateAlNum(event);stopMapKeys(event)" oninput="this.classList.remove('field-error');stopMapKeys(event)" onfocus="stopMapKeys(event)">
        <label class="intro-label">Foto de perfil <span style="color:var(--dim);font-size:10px">(URL opcional)</span></label>
        <div style="display:flex;justify-content:center;margin:2px 0"><img id="intro-av-prev" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/25.gif" style="width:56px;height:56px;border-radius:50%;border:2px solid var(--blue);object-fit:cover;image-rendering:pixelated" onerror="this.style.display='none'"></div><div id="starter-req-msg" style="font-size:10px;color:var(--acc);text-align:center;display:none">⚠ Selecciona un Pokémon inicial</div><input id="intro-avatar" class="prof-in" placeholder="URL de foto (opcional)" style="width:100%" onkeydown="stopMapKeys(event)" onfocus="stopMapKeys(event)" oninput="var i=document.getElementById('intro-av-prev');if(i){i.src=this.value||'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/25.gif';i.style.display='block'}">
      </div>
      <div style="font-size:12px;color:var(--dim);margin-top:10px;text-align:center">¿Con quién empiezas?</div>
      <div class="starter-grid">
        ${[1,4,7,25].map(pid=>{const b=PD[pid];
          return`<div class="starter-opt" id="st-${pid}" onclick="selectStarter(${pid})">
            <img src="${b.sp}" style="width:52px;height:52px;image-rendering:pixelated" onerror="this.style.display='none'">
            <span style="font-size:10px;font-weight:700">${b.n}</span>
            <div>${typeBadges(b.t)}</div>
          </div>`;
        }).join('')}
      </div>
      <button class="intro-start-btn" onclick="startAdventure()">
        <span class="ms" style="font-size:20px">circles</span>¡Empezar Aventura!
      </button>
    </div>`;
  }else{
    const av=GS.player.avatar;
    ov.innerHTML=`<div class="intro-box" style="max-width:300px;gap:14px">
      <div class="intro-logo">POKEM</div>
      ${av?`<img src="${av}" style="width:90px;height:90px;border-radius:50%;border:3px solid var(--blue);object-fit:cover" onerror="this.style.display='none'">`
         :`<div style="width:90px;height:90px;border-radius:50%;background:var(--card2);border:3px solid var(--blue);display:flex;align-items:center;justify-content:center"><span class="ms" style="font-size:40px;color:var(--dim)">person</span></div>`}
      <div style="font-family:'Orbitron',sans-serif;font-size:20px;font-weight:700;color:var(--text);text-align:center">${GS.player.name}</div>
      <div style="font-size:12px;color:var(--dim);text-align:center">
        <span class="ms" style="font-size:13px;vertical-align:middle">directions_walk</span> ${(GS.player.steps||0).toLocaleString()} pasos &nbsp;·&nbsp;
        <span class="ms" style="font-size:13px;vertical-align:middle">circles</span> ${GS.player.team.length+GS.player.pc.length} Pokémon
      </div>
      <button class="intro-start-btn" onclick="continueAdventure()" style="background:linear-gradient(135deg,#1a6fa8,#3498db)">
        <span class="ms" style="font-size:20px">play_arrow</span>Continuar Partida
      </button>
    </div>`;
  }
  ov.style.display='flex';
}
function selectStarter(pid){
  _selectedStarterId=pid;
  document.querySelectorAll('.starter-opt').forEach(el=>el.classList.remove('selected'));
  const el=document.getElementById('st-'+pid);if(el)el.classList.add('selected');
  const sg=document.getElementById('starter-req-msg');if(sg)sg.style.display='none';
}
function startAdventure(){
  const nameEl=document.getElementById('intro-name');
  const name=(nameEl?.value||'').trim();
  let hasErr=false;
  if(!name){if(nameEl)nameEl.classList.add('field-error');notif('Escribe tu nombre de entrenador','err');hasErr=true;}
  if(!_selectedStarterId){const sg=document.getElementById('starter-req-msg');if(sg)sg.style.display='block';notif('Elige un Pokémon inicial','err');hasErr=true;}
  if(hasErr)return;
  const avatar=(document.getElementById('intro-avatar')?.value.trim()||'');
  GS.player.name=name.slice(0,20);
  GS.player.avatar=avatar;
  GS.player.createdAt=Date.now();
  GS.adventureStarted=true;
  const starter=mkPkm(_selectedStarterId,'normal',5);
  if(starter){starter.captureSource='starter';starter.capturedAt=Date.now();GS.player.team.push(starter);}
  addBag(1,5);addBag(10,3);
  save();closeIntro();
  notif('¡'+GS.player.name+', comienza tu aventura!','ok',4000);
}
function continueAdventure(){GS.adventureStarted=true;closeIntro();}
function closeIntro(){
  const ov=document.getElementById('intro-ov');
  if(ov){ov.style.opacity='0';ov.style.transition='opacity 0.4s';setTimeout(()=>{ov.style.display='none';ov.style.opacity='1';},400);}
  updateHUD();if(GS.player.avatar)loadSpr(GS.player.avatar,()=>{updateHUD();renderRadarCanvas();});
}

// ============================================================
// INIT
// ============================================================
window.addEventListener('DOMContentLoaded',()=>{
  load();
  showIntro();
  if(GS.player.avatar)loadSpr(GS.player.avatar,()=>{updateHUD();renderRadarCanvas();});
  updateHUD();setupCanvasClick();
  // Fit canvas then render
  function _resize(){fitRadarCanvas();renderRadarCanvas();}
  window.addEventListener('resize',_resize);
  setTimeout(_resize,50);
  // Preload default avatar
  loadSpr(DEFAULT_AVATAR,()=>{updateHUD();if(GS.screen==='radar')renderRadarCanvas();});
  // Preload map bg images
  Object.values(MAPS).forEach(m=>{if(m.bgImg)loadSpr(m.bgImg,()=>{if(GS.screen==='radar')renderRadarCanvas();});});
  renderSpawnList();startLoop();
  document.addEventListener('keydown',e=>{
    if(GS.screen!=='radar')return;
    const tag=(document.activeElement?.tagName||'').toLowerCase();if(tag==='input'||tag==='textarea'||tag==='select')return;
    const mp={ArrowUp:[0,-1],ArrowDown:[0,1],ArrowLeft:[-1,0],ArrowRight:[1,0],w:[0,-1],s:[0,1],a:[-1,0],d:[1,0]};
    const v=mp[e.key];if(v){move(v[0],v[1]);e.preventDefault();}
  });
  let ts=null;
  const cv=document.getElementById('radar-canvas');
  if(cv){
    cv.addEventListener('touchstart',e=>{ts={x:e.touches[0].clientX,y:e.touches[0].clientY};},{passive:true});
    cv.addEventListener('touchend',e=>{
      if(!ts)return;const dx=e.changedTouches[0].clientX-ts.x,dy=e.changedTouches[0].clientY-ts.y;ts=null;
      if(Math.max(Math.abs(dx),Math.abs(dy))<20)return;
      move(Math.abs(dx)>Math.abs(dy)?Math.sign(dx):0,Math.abs(dy)>Math.abs(dx)?Math.sign(dy):0);
    },{passive:true});
  }
});
