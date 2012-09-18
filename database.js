//GLOBAL VARIABLE:
country = new Array();
city = new Array();
university = new Array();
var countryIndex = {};
var cityIndex = {};
var universityIndex = {};
////////////////////////////////////////////////////////////////////////

//DATABASE STRUCTURE:
function University (_name,_city) {
  var name = _name;
	var city = _city;
	var country = _city.getCountryObject();
	city.addUniversity(name);
	country.addUniversity(name);
	
	this.getName = function(){ return name };
	this.getCity = function(){ return city.getName() };
	this.getCountry  = function(){ return country.getName() };
	this.x = function()
	{
		if (city.x()) return city.x() 
		else return country.x();
	};
	this.y = function()
	{
		if (city.y) return city.y() 
		else return country.y();
	};
}

function City (_name, _x, _y, _country) {
	var name = _name;
	var country = _country;
	var university = new Array();
	this.x = _x;
	this.y = _y;
	country.addCity(name);
	
	this.getName = function(){ return name};
	this.getCountry = function(){return country.getName();}
	this.getCountryObject = function(){ return country; }
	this.addUniversity = function (_university)
	{
		university.push(_university);
		university.sort();
	}
	this.listUniversity = function(){ return university; }
}



function Country (_name, _x, _y) {
	var name = _name;
	var city = new Array();
	var university = new Array();
	this.x = _x;
	this.y = _y;
	
	this.getName = function(){ return name;};
	this.addUniversity = function (_university)
	{
		university.push(_university);
		university.sort();
	}
	this.addCity = function (_city)
	{
		city.push(_city);
		city.sort();
	}
	this.listUniversity = function(){ return university; }
	this.listCity = function(){ return city; }
}

////////////////////////////////////////////////////////////////
//ADD FUNCTIONS:
function addUniversity(_index,_univName,_city)
{
	university[_index] = new University(_univName, _city);
	universityIndex[_univName.toLowerCase()] = _index;
}

function addCity(_index,_cityName,_x,_y,_country)
{
	var country;
	if (_country != null) country = _country;
	else country = getObject("null");
	city[_index] = new City(_cityName, _x, _y, country);
	cityIndex[_cityName.toLowerCase() + country.getName()] = _index;
}

function addCountry(_index, _countryName, _x, _y)
{
	country[_index] = new Country(_countryName, _x, _y);
	countryIndex[_countryName.toLowerCase()] = _index;
}
//Make a dummy country with index 400:
addCountry(400, "null", 0,0);


///////////////////////////////////////////////////////////////////

//getObject FUNCTION:
function getObject(_name)
{
	var name = _name.toLowerCase();	
	if (universityIndex[name] != null) 
		return university[universityIndex[name]];
	else if (cityIndex[name] != null)
		return city[cityIndex[name]];
	else if (countryIndex[name] != null)
		return country[countryIndex[name]];
	else 
	{
		//console.log("Can't find object" + _name + '\n");
		return null;
	}
}

//getCoordinate FUNCTION:
function getX (_city, _country)
{
	if (getObject(_country) != null)
	{
		if (getObject(_city + _country) != null) return getObject(_city + _country).x;
		else if (getObject(_country) != null  && getObject(_country).getName() != "null") return getObject(_country).x;
	}
	else if (getObject(_city+"null") != null) return getObject(_city + _country).x;
	else 
	{
		//console.log("No country and city specified");
		return null;
	}
}

function getY (_city, _country)
{
	if (getObject(_country) != null)
	{
		if (getObject(_city + _country) != null) return getObject(_city + _country).y;
		else if (getObject(_country) != null && getObject(_country).getName() != "null") return getObject(_country).y;
	}
	else if (getObject(_city+"null") != null) return getObject(_city + _country).y;
	else 
	{
		console.log("No country and city specified");
		return null;
	}
}


//ADD COUNTRY DATA:
addCountry(0,"Afghanistan",2659,1637); addCountry(1,"Albania",2143,1532); addCountry(2,"Algeria",1945,1715); addCountry(3,"American Samoa",4087,2227); addCountry(4,"Andorra",1934,1512); addCountry(5,"Angola",2120,2181); addCountry(6,"Antarctica",3693,2981); addCountry(7,"Antigua and Barbuda",1219,1855); addCountry(8,"Argentina",1178,2487); addCountry(9,"Armenia",2423,1544); addCountry(10,"Aruba",1120,1910); addCountry(11,"Australia",3437,2348); addCountry(12,"Austria",2084,1430); addCountry(13,"Azerbaijan",2458,1544); addCountry(14,"Bahamas",1026,1758); addCountry(15,"Bahrain",2492,1743); addCountry(16,"Bangladesh",2942,1769); addCountry(17,"Barbados",1243,1898); addCountry(18,"Belarus",2232,1331); addCountry(19,"Belgium",1968,1376); addCountry(20,"Benin",1942,1927); addCountry(21,"Bermuda",1186,1658); addCountry(22,"Bhutan",2940,1721); addCountry(23,"Bolivia",1188,2242); addCountry(24,"Bosnia and Herzegovina",2120,1488); addCountry(25,"Botswana",2187,2305); addCountry(26,"Brazil",1276,2144); addCountry(27,"Brunei Darussalam",3222,1995); addCountry(28,"Bulgaria",2203,1510); addCountry(29,"Burkina Faso",1900,1910); 
addCountry(30,"Burundi",2257,2088); addCountry(31,"Cambodia",3109,1900); addCountry(32,"Cameroon",2053,1985); addCountry(33,"Canada",702,1219); addCountry(34,"Cape Verde",1643,1874); addCountry(35,"Cayman Islands",994,1820); addCountry(36,"Central African Republic",2145,1972); addCountry(37,"Chad",2131,1868); addCountry(38,"Chile",1091,2517); addCountry(39,"China",3046,1629); addCountry(40,"Colombia",1089,2023); addCountry(41,"Comoros",2408,2181); addCountry(42,"Congo",2095,2046); addCountry(43,"Cook Islands",97,2299); addCountry(44,"Costa Rica",961,1934); addCountry(45,"Cote d'Ivoire",1854,1959); addCountry(46,"Croatia",2099,1468); addCountry(47,"Cuba",1009,1789); addCountry(48,"Cyprus",2293,1622); addCountry(49,"Czech Republic",2083,1385); addCountry(50,"Democratic Republic Congo",2179,2070); addCountry(51,"Denmark",2025,1280); addCountry(52,"Djibouti",2399,1910); addCountry(53,"Dominica",1223,1869); addCountry(54,"Dominican Republic",1116,1826); addCountry(55,"Ecuador",1022,2063); addCountry(56,"Egypt",2255,1734); addCountry(57,"El Salvador",901,1888); addCountry(58,"Equatorial Guinea",2034,2029); addCountry(59,"Eritrea",2351,1866); 
addCountry(60,"Estonia",2206,1214); addCountry(61,"Ethiopia",2359,1953); addCountry(62,"Falkland Islands (Malvinas)",1240,2734); addCountry(63,"Faroe Islands",1838,1140); addCountry(64,"Federated States of Micronesia",3708,1973); addCountry(65,"Fiji",3948,2245); addCountry(66,"Finland",2218,1113); addCountry(67,"France",1941,1443); addCountry(68,"French Guiana",1311,1998); addCountry(69,"French Polynesia",275,2199); addCountry(70,"Gabon",2042,2056); addCountry(71,"Gambia",1737,1893); addCountry(72,"Georgia",2413,1519); addCountry(73,"Germany",2029,1368); addCountry(74,"Ghana",1901,1959); addCountry(75,"Gibraltar",1851,1607); addCountry(76,"Greece",2165,1563); addCountry(77,"Greenland",1429,694); addCountry(78,"Grenada",1210,1908); addCountry(79,"Guadeloupe",1198,1845); addCountry(80,"Guam",3563,1895); addCountry(81,"Guatemala",882,1875); addCountry(82,"Guinea",1786,1920); addCountry(83,"Guinea-Bissau",1746,1908); addCountry(84,"Guyana",1243,1984); addCountry(85,"Haiti",1090,1824); addCountry(86,"Honduras",923,1874); addCountry(87,"Hong Kong",3214,1789); addCountry(88,"Hungary",2130,1441); addCountry(89,"Iceland",1707,1068); 
addCountry(90,"India",2817,1781); addCountry(91,"Indonesia",3259,2094); addCountry(92,"Iran",2535,1656); addCountry(93,"Iraq",2407,1642); addCountry(94,"Ireland",1821,1338); addCountry(95,"Israel",2316,1666); addCountry(96,"Italy",2035,1473); addCountry(97,"Jamaica",1036,1836); addCountry(98,"Japan",3446,1620); addCountry(99,"Jordan",2329,1674); addCountry(100,"Kazakhstan",2681,1414); addCountry(101,"Kenya",2346,2035); addCountry(102,"Kuwait",2457,1697); addCountry(103,"Kyrgyzstan",2765,1521); addCountry(104,"Laos",3082,1816); addCountry(105,"Latvia",2202,1257); addCountry(106,"Lebanon",2321,1637); addCountry(107,"Lesotho",2237,2401); addCountry(108,"Liberia",1813,1980); addCountry(109,"Libyan Arab Jamahiriya",2115,1728); addCountry(110,"Liechtenstein",2028,1437); addCountry(111,"Lithuania",2181,1289); addCountry(112,"Luxembourg",1984,1395); addCountry(113,"Macao",3206,1790); addCountry(114,"Macedonia",2159,1521); addCountry(115,"Madagascar",2442,2281); addCountry(116,"Malawi",2304,2201); addCountry(117,"Malaysia",3075,1995); addCountry(118,"Maldives",2750,2053); addCountry(119,"Mali",1898,1845); 
addCountry(120,"Malta",2081,1611); addCountry(121,"Marshall Islands",3860,1970); addCountry(122,"Martinique",1220,1876); addCountry(123,"Mauritius",2571,2280); addCountry(124,"Mayotte",2431,2196); addCountry(125,"Mexico",759,1769); addCountry(126,"Moldova",2241,1436); addCountry(127,"Monaco",1998,1492); addCountry(128,"Mongolia",3095,1452); addCountry(129,"Montenegro",2134,1506); addCountry(130,"Montserrat",1204,1857); addCountry(131,"Morocco",1857,1652); addCountry(132,"Mozambique",2339,2206); addCountry(133,"Myanmar",3009,1796); addCountry(134,"Namibia",2105,2292); addCountry(135,"Nepal",2867,1713); addCountry(136,"Netherlands",1978,1347); addCountry(137,"Netherlands Antilles",1146,1881); addCountry(138,"New Caledonia",3799,2297); addCountry(139,"New Zealand",3882,2579); addCountry(140,"Nicaragua",945,1899); addCountry(141,"Niger",2021,1845); addCountry(142,"Nigeria",1996,1953); addCountry(143,"Northern Mariana Islands",3578,1864); addCountry(144,"Norway",2016,1150); addCountry(145,"Oman",2564,1792); addCountry(146,"Pacific Islands",3819,2243); addCountry(147,"Pakistan",2694,1705); addCountry(148,"Palau",3440,1963); addCountry(149,"Palestine",2319,1650); 
addCountry(150,"Panama",992,1949); addCountry(151,"Papua New Guinea",3551,2114); addCountry(152,"Paraguay",1249,2320); addCountry(153,"Peru",1043,2129); addCountry(154,"Philippines",3314,1905); addCountry(155,"Poland",2121,1349); addCountry(156,"Portugal",1819,1555); addCountry(157,"Puerto Rico",1163,1836); addCountry(158,"Qatar",2496,1750); addCountry(159,"Romania",2197,1458); addCountry(160,"Russian Federation",2991,1145); addCountry(161,"Rwanda",2256,2068); addCountry(162,"Saint Kitts and Nevis",1207,1855); addCountry(163,"Saint Vincent and the Grenadines",1218,1899); addCountry(164,"San Marino",2058,1490); addCountry(165,"Saudi Arabia",2434,1785); addCountry(166,"Senegal",1750,1879); addCountry(167,"Serbia",2153,1484); addCountry(168,"Seychelles",2548,2099); addCountry(169,"Sierra Leone",1782,1946); addCountry(170,"Singapore",3100,2034); addCountry(171,"Slovakia",2138,1409); addCountry(172,"Slovenia",2082,1457); addCountry(173,"Solomon Islands",3720,2140); addCountry(174,"Somalia",2430,2005); addCountry(175,"South Africa",2185,2397); addCountry(176,"South Korea",3373,1604); addCountry(177,"Spain",1875,1564); addCountry(178,"Sri Lanka",2830,1959); addCountry(179,"Sudan",2266,1884); 
addCountry(180,"Suriname",1278,2005); addCountry(181,"Svalbard and Jan Mayen",2120,539); addCountry(182,"Swaziland",2272,2361); addCountry(183,"Sweden",2118,1078); addCountry(184,"Switzerland",2010,1440); addCountry(185,"Syrian Arab Republic",2351,1622); addCountry(186,"Taiwan",3291,1771); addCountry(187,"Tajikistan",2726,1565); addCountry(188,"Tanzania",2316,2128); addCountry(189,"Thailand",3074,1863); addCountry(190,"Timor-Leste",3349,2148); addCountry(191,"Togo",1928,1957); addCountry(192,"Tonga",4018,2296); addCountry(193,"Trinidad and Tobago",1220,1924); addCountry(194,"Tunisia",2023,1638); addCountry(195,"Turkey",2327,1558); addCountry(196,"Turkmenistan",2580,1561); addCountry(197,"Turks and Caicos Islands",1100,1796); addCountry(198,"Uganda",2289,2028); addCountry(199,"Ukraine",2277,1408); addCountry(200,"United Arab Emirates",2532,1767); addCountry(201,"United Kingdom",1894,1310); addCountry(202,"United States",771,1509); addCountry(203,"Uruguay",1279,2441); addCountry(204,"Uzbekistan",2629,1512); addCountry(205,"Vanuatu",3824,2227); addCountry(206,"Vatican City State",2057,1520); addCountry(207,"Venezuela",1175,1964); addCountry(208,"Viet Nam",3135,1918); addCountry(209,"Virgin Islands (British)",1190,1836); 
addCountry(210,"Virgin Islands (U.S.)",1180,1838); addCountry(211,"Wallis and Futuna",3995,2204); addCountry(212,"Yemen",2470,1859); addCountry(213,"Yugoslavia",2091,1475); addCountry(214,"Zambia",2217,2210); 