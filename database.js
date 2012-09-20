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
countryX["Afghanistan"]=2659; countryY["Afghanistan"]=1637; countryX["Albania"]=2143; countryY["Albania"]=1532; countryX["Algeria"]=1945; countryY["Algeria"]=1715; countryX["American Samoa"]=4087; countryY["American Samoa"]=2227; countryX["Andorra"]=1934; countryY["Andorra"]=1512; countryX["Angola"]=2120; countryY["Angola"]=2181; countryX["Antarctica"]=3693; countryY["Antarctica"]=2981; countryX["Antigua and Barbuda"]=1219; countryY["Antigua and Barbuda"]=1855; countryX["Argentina"]=1178; countryY["Argentina"]=2487; countryX["Armenia"]=2423; countryY["Armenia"]=1544; countryX["Aruba"]=1120; countryY["Aruba"]=1910; countryX["Australia"]=3437; countryY["Australia"]=2348; countryX["Austria"]=2084; countryY["Austria"]=1430; countryX["Azerbaijan"]=2458; countryY["Azerbaijan"]=1544; countryX["Bahamas"]=1026; countryY["Bahamas"]=1758; countryX["Bahrain"]=2492; countryY["Bahrain"]=1743; countryX["Bangladesh"]=2942; countryY["Bangladesh"]=1769; countryX["Barbados"]=1243; countryY["Barbados"]=1898; countryX["Belarus"]=2232; countryY["Belarus"]=1331; countryX["Belgium"]=1968; countryY["Belgium"]=1376; 
countryX["Benin"]=1942; countryY["Benin"]=1927; countryX["Bermuda"]=1186; countryY["Bermuda"]=1658; countryX["Bhutan"]=2940; countryY["Bhutan"]=1721; countryX["Bolivia"]=1188; countryY["Bolivia"]=2242; countryX["Bosnia and Herzegovina"]=2120; countryY["Bosnia and Herzegovina"]=1488; countryX["Botswana"]=2187; countryY["Botswana"]=2305; countryX["Brazil"]=1276; countryY["Brazil"]=2144; countryX["Brunei Darussalam"]=3222; countryY["Brunei Darussalam"]=1995; countryX["Bulgaria"]=2203; countryY["Bulgaria"]=1510; countryX["Burkina Faso"]=1900; countryY["Burkina Faso"]=1910; countryX["Burundi"]=2257; countryY["Burundi"]=2088; countryX["Cambodia"]=3109; countryY["Cambodia"]=1900; countryX["Cameroon"]=2053; countryY["Cameroon"]=1985; countryX["Canada"]=702; countryY["Canada"]=1219; countryX["Cape Verde"]=1643; countryY["Cape Verde"]=1874; countryX["Cayman Islands"]=994; countryY["Cayman Islands"]=1820; countryX["Central African Republic"]=2145; countryY["Central African Republic"]=1972; countryX["Chad"]=2131; countryY["Chad"]=1868; countryX["Chile"]=1091; countryY["Chile"]=2517; countryX["China"]=3046; countryY["China"]=1629; 
countryX["Colombia"]=1089; countryY["Colombia"]=2023; countryX["Comoros"]=2408; countryY["Comoros"]=2181; countryX["Congo"]=2095; countryY["Congo"]=2046; countryX["Cook Islands"]=97; countryY["Cook Islands"]=2299; countryX["Costa Rica"]=961; countryY["Costa Rica"]=1934; countryX["Cote d'Ivoire"]=1854; countryY["Cote d'Ivoire"]=1959; countryX["Croatia"]=2099; countryY["Croatia"]=1468; countryX["Cuba"]=1009; countryY["Cuba"]=1789; countryX["Cyprus"]=2293; countryY["Cyprus"]=1622; countryX["Czech Republic"]=2083; countryY["Czech Republic"]=1385; countryX["Democratic Republic Congo"]=2179; countryY["Democratic Republic Congo"]=2070; countryX["Denmark"]=2025; countryY["Denmark"]=1280; countryX["Djibouti"]=2399; countryY["Djibouti"]=1910; countryX["Dominica"]=1223; countryY["Dominica"]=1869; countryX["Dominican Republic"]=1116; countryY["Dominican Republic"]=1826; countryX["Ecuador"]=1022; countryY["Ecuador"]=2063; countryX["Egypt"]=2255; countryY["Egypt"]=1734; countryX["El Salvador"]=901; countryY["El Salvador"]=1888; countryX["Equatorial Guinea"]=2034; countryY["Equatorial Guinea"]=2029; countryX["Eritrea"]=2351; countryY["Eritrea"]=1866; 
countryX["Estonia"]=2206; countryY["Estonia"]=1214; countryX["Ethiopia"]=2359; countryY["Ethiopia"]=1953; countryX["Falkland Islands (Malvinas)"]=1240; countryY["Falkland Islands (Malvinas)"]=2734; countryX["Faroe Islands"]=1838; countryY["Faroe Islands"]=1140; countryX["Federated States of Micronesia"]=3708; countryY["Federated States of Micronesia"]=1973; countryX["Fiji"]=3948; countryY["Fiji"]=2245; countryX["Finland"]=2218; countryY["Finland"]=1113; countryX["France"]=1941; countryY["France"]=1443; countryX["French Guiana"]=1311; countryY["French Guiana"]=1998; countryX["French Polynesia"]=275; countryY["French Polynesia"]=2199; countryX["Gabon"]=2042; countryY["Gabon"]=2056; countryX["Gambia"]=1737; countryY["Gambia"]=1893; countryX["Georgia"]=2413; countryY["Georgia"]=1519; countryX["Germany"]=2029; countryY["Germany"]=1368; countryX["Ghana"]=1901; countryY["Ghana"]=1959; countryX["Gibraltar"]=1851; countryY["Gibraltar"]=1607; countryX["Greece"]=2165; countryY["Greece"]=1563; countryX["Greenland"]=1429; countryY["Greenland"]=694; countryX["Grenada"]=1210; countryY["Grenada"]=1908; countryX["Guadeloupe"]=1198; countryY["Guadeloupe"]=1845; 
countryX["Guam"]=3563; countryY["Guam"]=1895; countryX["Guatemala"]=882; countryY["Guatemala"]=1875; countryX["Guinea"]=1786; countryY["Guinea"]=1920; countryX["Guinea-Bissau"]=1746; countryY["Guinea-Bissau"]=1908; countryX["Guyana"]=1243; countryY["Guyana"]=1984; countryX["Haiti"]=1090; countryY["Haiti"]=1824; countryX["Honduras"]=923; countryY["Honduras"]=1874; countryX["Hong Kong"]=3214; countryY["Hong Kong"]=1789; countryX["Hungary"]=2130; countryY["Hungary"]=1441; countryX["Iceland"]=1707; countryY["Iceland"]=1068; countryX["India"]=2817; countryY["India"]=1781; countryX["Indonesia"]=3259; countryY["Indonesia"]=2094; countryX["Iran"]=2535; countryY["Iran"]=1656; countryX["Iraq"]=2407; countryY["Iraq"]=1642; countryX["Ireland"]=1821; countryY["Ireland"]=1338; countryX["Israel"]=2316; countryY["Israel"]=1666; countryX["Italy"]=2035; countryY["Italy"]=1473; countryX["Jamaica"]=1036; countryY["Jamaica"]=1836; countryX["Japan"]=3446; countryY["Japan"]=1620; countryX["Jordan"]=2329; countryY["Jordan"]=1674; 
countryX["Kazakhstan"]=2681; countryY["Kazakhstan"]=1414; countryX["Kenya"]=2346; countryY["Kenya"]=2035; countryX["Kuwait"]=2457; countryY["Kuwait"]=1697; countryX["Kyrgyzstan"]=2765; countryY["Kyrgyzstan"]=1521; countryX["Laos"]=3082; countryY["Laos"]=1816; countryX["Latvia"]=2202; countryY["Latvia"]=1257; countryX["Lebanon"]=2321; countryY["Lebanon"]=1637; countryX["Lesotho"]=2237; countryY["Lesotho"]=2401; countryX["Liberia"]=1813; countryY["Liberia"]=1980; countryX["Libyan Arab Jamahiriya"]=2115; countryY["Libyan Arab Jamahiriya"]=1728; countryX["Liechtenstein"]=2028; countryY["Liechtenstein"]=1437; countryX["Lithuania"]=2181; countryY["Lithuania"]=1289; countryX["Luxembourg"]=1984; countryY["Luxembourg"]=1395; countryX["Macao"]=3206; countryY["Macao"]=1790; countryX["Macedonia"]=2159; countryY["Macedonia"]=1521; countryX["Madagascar"]=2442; countryY["Madagascar"]=2281; countryX["Malawi"]=2304; countryY["Malawi"]=2201; countryX["Malaysia"]=3075; countryY["Malaysia"]=1995; countryX["Maldives"]=2750; countryY["Maldives"]=2053; countryX["Mali"]=1898; countryY["Mali"]=1845; 
countryX["Malta"]=2081; countryY["Malta"]=1611; countryX["Marshall Islands"]=3860; countryY["Marshall Islands"]=1970; countryX["Martinique"]=1220; countryY["Martinique"]=1876; countryX["Mauritius"]=2571; countryY["Mauritius"]=2280; countryX["Mayotte"]=2431; countryY["Mayotte"]=2196; countryX["Mexico"]=759; countryY["Mexico"]=1769; countryX["Moldova"]=2241; countryY["Moldova"]=1436; countryX["Monaco"]=1998; countryY["Monaco"]=1492; countryX["Mongolia"]=3095; countryY["Mongolia"]=1452; countryX["Montenegro"]=2134; countryY["Montenegro"]=1506; countryX["Montserrat"]=1204; countryY["Montserrat"]=1857; countryX["Morocco"]=1857; countryY["Morocco"]=1652; countryX["Mozambique"]=2339; countryY["Mozambique"]=2206; countryX["Myanmar"]=3009; countryY["Myanmar"]=1796; countryX["Namibia"]=2105; countryY["Namibia"]=2292; countryX["Nepal"]=2867; countryY["Nepal"]=1713; countryX["Netherlands"]=1978; countryY["Netherlands"]=1347; countryX["Netherlands Antilles"]=1146; countryY["Netherlands Antilles"]=1881; countryX["New Caledonia"]=3799; countryY["New Caledonia"]=2297; countryX["New Zealand"]=3882; countryY["New Zealand"]=2579; 
countryX["Nicaragua"]=945; countryY["Nicaragua"]=1899; countryX["Niger"]=2021; countryY["Niger"]=1845; countryX["Nigeria"]=1996; countryY["Nigeria"]=1953; countryX["Northern Mariana Islands"]=3578; countryY["Northern Mariana Islands"]=1864; countryX["Norway"]=2016; countryY["Norway"]=1150; countryX["Oman"]=2564; countryY["Oman"]=1792; countryX["Pacific Islands"]=3819; countryY["Pacific Islands"]=2243; countryX["Pakistan"]=2694; countryY["Pakistan"]=1705; countryX["Palau"]=3440; countryY["Palau"]=1963; countryX["Palestine"]=2319; countryY["Palestine"]=1650; countryX["Panama"]=992; countryY["Panama"]=1949; countryX["Papua New Guinea"]=3551; countryY["Papua New Guinea"]=2114; countryX["Paraguay"]=1249; countryY["Paraguay"]=2320; countryX["Peru"]=1043; countryY["Peru"]=2129; countryX["Philippines"]=3314; countryY["Philippines"]=1905; countryX["Poland"]=2121; countryY["Poland"]=1349; countryX["Portugal"]=1819; countryY["Portugal"]=1555; countryX["Puerto Rico"]=1163; countryY["Puerto Rico"]=1836; countryX["Qatar"]=2496; countryY["Qatar"]=1750; countryX["Romania"]=2197; countryY["Romania"]=1458; 
countryX["Russian Federation"]=2991; countryY["Russian Federation"]=1145; countryX["Rwanda"]=2256; countryY["Rwanda"]=2068; countryX["Saint Kitts and Nevis"]=1207; countryY["Saint Kitts and Nevis"]=1855; countryX["Saint Vincent and the Grenadines"]=1218; countryY["Saint Vincent and the Grenadines"]=1899; countryX["San Marino"]=2058; countryY["San Marino"]=1490; countryX["Saudi Arabia"]=2434; countryY["Saudi Arabia"]=1785; countryX["Senegal"]=1750; countryY["Senegal"]=1879; countryX["Serbia"]=2153; countryY["Serbia"]=1484; countryX["Seychelles"]=2548; countryY["Seychelles"]=2099; countryX["Sierra Leone"]=1782; countryY["Sierra Leone"]=1946; countryX["Singapore"]=3100; countryY["Singapore"]=2034; countryX["Slovakia"]=2138; countryY["Slovakia"]=1409; countryX["Slovenia"]=2082; countryY["Slovenia"]=1457; countryX["Solomon Islands"]=3720; countryY["Solomon Islands"]=2140; countryX["Somalia"]=2430; countryY["Somalia"]=2005; countryX["South Africa"]=2185; countryY["South Africa"]=2397; countryX["South Korea"]=3373; countryY["South Korea"]=1604; countryX["Spain"]=1875; countryY["Spain"]=1564; countryX["Sri Lanka"]=2830; countryY["Sri Lanka"]=1959; countryX["Sudan"]=2266; countryY["Sudan"]=1884; 
countryX["Suriname"]=1278; countryY["Suriname"]=2005; countryX["Svalbard and Jan Mayen"]=2120; countryY["Svalbard and Jan Mayen"]=539; countryX["Swaziland"]=2272; countryY["Swaziland"]=2361; countryX["Sweden"]=2118; countryY["Sweden"]=1078; countryX["Switzerland"]=2010; countryY["Switzerland"]=1440; countryX["Syrian Arab Republic"]=2351; countryY["Syrian Arab Republic"]=1622; countryX["Taiwan"]=3291; countryY["Taiwan"]=1771; countryX["Tajikistan"]=2726; countryY["Tajikistan"]=1565; countryX["Tanzania"]=2316; countryY["Tanzania"]=2128; countryX["Thailand"]=3074; countryY["Thailand"]=1863; countryX["Timor-Leste"]=3349; countryY["Timor-Leste"]=2148; countryX["Togo"]=1928; countryY["Togo"]=1957; countryX["Tonga"]=4018; countryY["Tonga"]=2296; countryX["Trinidad and Tobago"]=1220; countryY["Trinidad and Tobago"]=1924; countryX["Tunisia"]=2023; countryY["Tunisia"]=1638; countryX["Turkey"]=2327; countryY["Turkey"]=1558; countryX["Turkmenistan"]=2580; countryY["Turkmenistan"]=1561; countryX["Turks and Caicos Islands"]=1100; countryY["Turks and Caicos Islands"]=1796; countryX["Uganda"]=2289; countryY["Uganda"]=2028; countryX["Ukraine"]=2277; countryY["Ukraine"]=1408; 
countryX["United Arab Emirates"]=2532; countryY["United Arab Emirates"]=1767; countryX["United Kingdom"]=1894; countryY["United Kingdom"]=1310; countryX["United States"]=771; countryY["United States"]=1509; countryX["Uruguay"]=1279; countryY["Uruguay"]=2441; countryX["Uzbekistan"]=2629; countryY["Uzbekistan"]=1512; countryX["Vanuatu"]=3824; countryY["Vanuatu"]=2227; countryX["Vatican City State"]=2057; countryY["Vatican City State"]=1520; countryX["Venezuela"]=1175; countryY["Venezuela"]=1964; countryX["Viet Nam"]=3135; countryY["Viet Nam"]=1918; countryX["Virgin Islands (British)"]=1190; countryY["Virgin Islands (British)"]=1836; countryX["Virgin Islands (U.S.)"]=1180; countryY["Virgin Islands (U.S.)"]=1838; countryX["Wallis and Futuna"]=3995; countryY["Wallis and Futuna"]=2204; countryX["Yemen"]=2470; countryY["Yemen"]=1859; countryX["Yugoslavia"]=2091; countryY["Yugoslavia"]=1475; countryX["Zambia"]=2217; countryY["Zambia"]=2210; countryX["Zimbabwe"]=2261; countryY["Zimbabwe"]=2276; 