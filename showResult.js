//The mode choice in the map:
var referenceMode = 1;
var citedByMode = 2;
var relevantDocumentMode = 3;
var coAuthorsMode = 4;
var searchMode = 5;
var viewAllModeActive = 0;
var modeInMap = 1;

//Index for picture
var canvasObjectIndex = 0;
var changeIndex = 1;
var highlightObjIndex = 2;
var authorIndex = 3;

//To initialize showMap (it is initialized if showResult is called);
var showInitialized = 0;

//Some object:
var c_obj = new Array();
var showCoord = new Array();
var multiply = new Array(4,2,1);
var highlightObjArr = new Array();
var highlightObj;
var highlightObjStatus = 0;
var showInfoDiv;

//Cluster Size:
var clusterSize = 38;

//FOR ADJUSTMENT:
var halfPointerWidth = 6;
var halfPointerHeight = 6;

//SEMENTARA (sebelum ada index):
//var tempo = true;


//imgObject[10] = new Image();
//imgObject[10].src = 'https://raw.github.com/alvi0010/map/master/image/person.png';

function geoCmp(_objA, _objB)
{
	if (_objA.country == _objB.country && _objA.city && _objB.city)
		return _objA.city.localeCompare(_objB.city);
	else	if(_objA.country && _objB.country)
		return _objA.country.localeCompare(_objB.country);
	else return 1;
}

function clusterObj(_objArr, _zoom, _ind)
{
	var _c_obj = new Object();
	var coordList = new Array();
	var stemp;
	var multiplier1 = 1;
	var i;
	var tcountry;
	
	for (i=2; i>_zoom;i--)
	{
		multiplier1 *= 2;
	}
	
	multiplier1 *= clusterSize;
	if (authorObject != _objArr[0])
	{
		if (typeof(authorObject.city) == 'undefined' ) authorObject.city = authorObject.country;
		if (typeof(authorObject.hitCount) == 'undefined') authorObject.hitCount = 1;
		if (typeof(authorObject.country) == 'undefined') authorObject.country = authorObject.name;
		var xAuth = Math.floor( getX(authorObject.city, authorObject.country) / multiplier1)*multiplier1;
		var yAuth = Math.floor( getY(authorObject.city,authorObject.country ) / multiplier1)*multiplier1;
		
		//var xAuth = Math.floor( getX(authorObject.city,tcountry) / multiplier1)*multiplier1 - Math.floor(imgObject[_ind].width/2);
	//	var yAuth = Math.floor( getY(authorObject.city,tcountry ) / multiplier1)*multiplier1 - Math.floor(imgObject[_ind].height/2);
		
		authorObject.x = xAuth;
		authorObject.y = yAuth;
		
		xAuth = xAuth -    Math.floor(imgObject[authorIndex].width/2) + multiplier1/4;
		yAuth = yAuth -   Math.floor(imgObject[authorIndex].height/2) + multiplier1/4;
		
		stemp = xAuth + ":"+yAuth;
		_c_obj[stemp] = new Array(authorObject);
		_c_obj[stemp].x = xAuth;
		_c_obj[stemp].y = yAuth;
		_c_obj[stemp].hitCount = authorObject.hitCount;
		coordList.push(new Array(xAuth, yAuth));
	}
	
	
	
	
	for (i=0; i<_objArr.length;++i)
	{
		if (typeof(_objArr[i].country) == 'undefined') _objArr[i].country = _objArr[i].name;
		//console.log("HAHAHA: "+_objArr[i].country );
		if (_objArr[i].country &&  getX(_objArr[i].city, _objArr[i].country) != null)
		{
			//CHECK EXISTANCE OF CITY
			if (typeof(_objArr[i].city) == 'undefined') _objArr[i].city = _objArr[i].country;
			//CHECK EXISTANCE OF HITCOUNT
			if (typeof(_objArr[i].hitCount) == 'undefined') _objArr[i].hitCount = 1;
			//CHECK EXISTANCE OF COUNTRY (REPLACED WITH NAME IF NOT EXIST)
		
			
			
			
			var x1 = Math.floor( getX(_objArr[i].city, _objArr[i].country) / multiplier1)*multiplier1;
			var y1 = Math.floor( getY(_objArr[i].city,_objArr[i].country ) / multiplier1)*multiplier1 ;
		
		//	var x1 = Math.floor( getX(_objArr[i].city,tcountry) / multiplier1)*multiplier1 - Math.floor(imgObject[_ind].width/2);
		//	var y1 = Math.floor( getY(_objArr[i].city,tcountry ) / multiplier1)*multiplier1 - Math.floor(imgObject[_ind].height/2);
			//console.log("HIHIHI " + x1);
			_objArr[i].x = x1;
			_objArr[i].y = y1;
			
			x1 -= Math.floor(imgObject[canvasObjectIndex].width/2) - multiplier1/4;
			y1 -= Math.floor(imgObject[canvasObjectIndex].height/2) - multiplier1/4;
			
			stemp = x1 + ":" + y1;
			if (_c_obj[stemp] )
			{
				_c_obj[stemp].push(_objArr[i]);
			//	_c_obj[stemp][_c_obj[stemp].length-1].index = i;
				_c_obj[stemp].hitCount += parseInt(_objArr[i].hitCount);
			}
			else 
			{
				_c_obj[stemp] = new Array(_objArr[i]);
				_c_obj[stemp].x = x1;
				_c_obj[stemp].y = y1;
			//	_c_obj[stemp][0].index = i;
				_c_obj[stemp].hitCount = parseInt(_objArr[i].hitCount);
				coordList.push(new Array(x1,y1));
			}
			if (x1 >= 3190 && x1 <= 3212 && y1 >=1763 && y1 <= 1765)
			console.log(stemp + " " + _c_obj[stemp].hitCount)
							
		}
	}
	for (key in _c_obj)
	{
		_c_obj[key].sort(geoCmp);
	}
	
	return new Array(_c_obj,coordList);
}


function showResult(_ind, _objArr)
{
	
	if (_ind == modeInMap)
	{
		showInitialized = 1;
		var i;
		clearCanvasObject();
		highlightObjStatus = 0;
		canvasObjectText = [];
		c_obj = [];
		showCoord = [];
		canvasObjectAuthorText = "";
	//	console.log(_objArr);
		
		//var arr = clusterObj(obj);
		for (i=0;i<=2;++i)
		{
			c_obj.push(clusterObj(_objArr,i,_ind)[0]);
			showCoord.push(clusterObj(_objArr,i,_ind)[1]);
		}
		
		
		for (i=1;i<showCoord[zoom].length;++i)
		{
			//drawObject(imgObject[ind],coordList[i][0], coordList[i][1]);
			//drawText(c_obj[coordList[i][0]+":"+coordList[i][1]], coordList[i][0], coordList[i][1]);
			addCanvasObject(showCoord[zoom][i][0]/4,showCoord[zoom][i][1]/4, canvasObjectIndex);
			c_obj[zoom][showCoord[zoom][i][0]+":"+showCoord[zoom][i][1]].index = i-1;
			canvasObjectText.push(c_obj[zoom][showCoord[zoom][i][0]+":"+showCoord[zoom][i][1]].hitCount)		
		}
		//console.log(showCoord[zoom][0]);
		
		if (modeInMap != searchMode)
		{
			addCanvasObjectAuthor(showCoord[zoom][0][0]/4,showCoord[zoom][0][1]/4, authorIndex);
			c_obj[zoom][showCoord[zoom][0][0]+":"+showCoord[zoom][0][1]].index = showCoord[zoom].length-1;
			canvasObjectAuthorText = (c_obj[zoom][showCoord[zoom][0][0]+":"+showCoord[zoom][0][1]].hitCount);
		}
		console.log(c_obj);
	}
//	addCanvasObjectAuthor(getX(authorObject.city, authorObject.country)/4,getY(_objArr[i].city,_objArr[i].country )/4, authorIndex)
//	
}

function refreshShow()
{
	if (showInitialized)
	{
		var i;
		clearCanvasObject();
		canvasObjectText = [];
		canvasObjectAuthorText = "";
		if (showCoord[zoom])
		for (i=1;i<showCoord[zoom].length;++i)
		{
			//drawObject(imgObject[ind],coordList[i][0], coordList[i][1]);
			//drawText(c_obj[coordList[i][0]+":"+coordList[i][1]], coordList[i][0], coordList[i][1]);
			addCanvasObject(showCoord[zoom][i][0]/4,showCoord[zoom][i][1]/4, canvasObjectIndex);
			c_obj[zoom][showCoord[zoom][i][0]+":"+showCoord[zoom][i][1]].index = i-1;
			canvasObjectText.push(c_obj[zoom][showCoord[zoom][i][0]+":"+showCoord[zoom][i][1]].hitCount);
		//	if (ind == searchMode) addCanvasObjectAuthor(getX(authorObject.city,authorObject.country)/4,getY(authorObject.city,authorObject.country)/4,authorIndex);
		
	
		}
		if (modeInMap != searchMode)
		{
			addCanvasObjectAuthor(showCoord[zoom][0][0]/4,showCoord[zoom][0][1]/4, authorIndex);
			c_obj[zoom][showCoord[zoom][0][0]+":"+showCoord[zoom][0][1]].index = showCoord[zoom].length-1;
			canvasObjectAuthorText = (c_obj[zoom][showCoord[zoom][0][0]+":"+showCoord[zoom][0][1]].hitCount);
	//	canvasObjectAuthorText = "test";
		}
		if (highlightObjStatus == 1) refreshHighlight();		
	}
	
}

function checkSquare(_clickX, _clickY, _ind, _obj)
{
	if (_clickX - halfPointerWidth >= _obj.x/multiply[zoom] && _clickX - halfPointerWidth <= _obj.x/multiply[zoom] + imgObject[canvasObjectIndex].width && _clickY - halfPointerHeight >= _obj.y/multiply[zoom] && _clickY-halfPointerHeight <= _obj.y/multiply[zoom] + imgObject[canvasObjectIndex].height) return  true;
	else return false;
}

function checkCircle(_clickX, _clickY, _ind, _obj)
{
	var radius = img.Object[_ind].width/2;
	var xCenter = _obj.x/multiply[zoom] + radius;
	var yCenter = _obj.y/multiply[zoom] + radius;
	if ( (_clickX-xCenter)*(_clickX-xCenter) + (_clickY-yCenter)*(_clickY-yCenter) <= radius) return true;
	else return false;
	
}

function listenClick(_clickX, _clickY, _ind, _obj, _check)
{
	if (_check(_clickX, _clickY, _ind, _obj))
	{
		console.log(_obj);
		if (viewAllModeActive == 0)
		{
			if (modeInMap == referenceMode) updateReference(_obj,1);
			else if (modeInMap == citedByMode) updateCitedBy(_obj,1);
			else if (modeInMap == relevantDocumentMode)	updateRelevantDocument(_obj,1);
			else if (modeInMap == coAuthorsMode) updateCoauthors(_obj,1);
			else if (modeInMap == searchMode) updateSearch(_obj,1);

			
		}
		else if (viewAllModeActive == 1) 
		{
			if (modeInMap == relevantDocumentMode) getRelevantDocumentFilter1(_obj);
			else if (modeInMap == citedByMode) getCitedbyFilter1(_obj);			
		}
	}
}

function listenAllClick(_clickX, _clickY, _ind)
{
	//console.log(c_obj);
	//console.log(showCoord);
	//console.log("cX,Y: " + _clickX*multiply[zoom]+ " " + _clickY*multiply[zoom]);
	//console.log(c_obj[zoom]);
	for (key in c_obj[zoom])
	{
		
		//console.log(_ind);
		listenClick(_clickX, _clickY, _ind, c_obj[zoom][key], checkSquare)
	}	
}

function clearHighlight()
{
	clearCanvasObjectHighlight();
	highlightObjStatus = 0;
}

function highlight(_obj)
{
	if (  ( typeof(_obj.x) != 'undefined' && typeof(_obj.y) != 'undefined') ||  typeof(_obj.country)!= 'undefined' || typeof(_obj.city)!='undefined' )
	{
		clearHighlight();
		console.log("The highlighted Object:")
		console.log(_obj);
		for (i=0;i<=2;++i)
		{
			highlightObj = new Object();
			if (_obj&& _obj.y && _obj.x)
			{
				highlightObj.x = _obj.x ;
				highlightObj.y = _obj.y ;
			}
			else 
			{
				highlightObj.x = getX(_obj.city, _obj.country);
				highlightObj.y = getY(_obj.city, _obj.country);
			}
			
			highlightObj.x = Math.floor(highlightObj.x / multiply[i]/clusterSize)*multiply[i]*clusterSize - Math.floor(imgObject[highlightObjIndex].width/2) + multiply[i]*clusterSize/4;
			highlightObj.y = Math.floor(highlightObj.y / multiply[i]/clusterSize)*multiply[i]*clusterSize - Math.floor(imgObject[highlightObjIndex].height/2) + multiply[i]*clusterSize/4;
			highlightObjArr[i] = highlightObj;		
		}
		
		
		goTo(highlightObjArr[zoom].x, highlightObjArr[zoom].y, canvas.width/2, canvas.height/2);
		addCanvasObjectHighlight(highlightObjArr[zoom].x/4, highlightObjArr[zoom].y/4 , highlightObjIndex);
		highlightObjStatus = 1;
	}
	else console.log(_obj);
}

function refreshHighlight()
{
	//console.log("hehe: " + highlightObj.status);
	clearHighlight();
	addCanvasObjectHighlight(highlightObjArr[zoom].x/4 , highlightObjArr[zoom].y/4 , highlightObjIndex);
	highlightObjStatus = 1;
}

function oscillate(a)
{
	return Math.sin(a);
}

function renderHighlight()
{	
		var currentTime = (new Date())%5000000;
		var objTemp = new Object();
		//var dY = new Date();
		objTemp.x = highlightObjArr[zoom].x/4;
		objTemp.y =  highlightObjArr[zoom].y/4 - imgObject[canvasObjectIndex].height*multiply[zoom]/7 - 1.5*multiply[zoom]*(3+oscillate(currentTime/200));
		objTemp.img = highlightObjIndex;
		canvasObjectHighlight[canvasObjectHighlight.length - 1] = objTemp;

}

function showCityCountryInfo(_obj)
{
//	console.log(_obj.x + " " + _obj.y) ;
//	console.log(imageCoords[0] + " " + imageCoords[1]);
//	console.log(canvas.offsetLeft + " " + canvas.offsetTop );
	var stemp;
	var i;
	var countObj = new Array();
	var diffX = (_obj.x/multiply[zoom] + imageCoords[0] + canvas.offsetLeft)%img[zoom].width;
	var diffY = (_obj.y/multiply[zoom] + imageCoords[1] + canvas.offsetTop)%img[zoom].height;
	
	if (diffX < 0) diffX += img[zoom].width;
	diffX += 70;
	diffY -= 100;
	if (diffX - canvas.offsetLeft > canvas.width/2) diffX -= 330;
	if (diffY - canvas.offsetTop < canvas.height /3) diffY += 150;
	
	showInfoDiv.innerHTML = "    ";
	showInfoDiv.style.top =  diffY + "px";
	showInfoDiv.style.left = diffX + "px";
	showInfoDiv.style.display = "block";
	
	if (zoom == 0 || zoom == 1 || viewAllModeActive == 1)
	{
		showInfoDiv.style["font-size"] = "15px";
		for (i=_obj.length-1; i>=0;--i )
		{
			if (i==_obj.length-1 || (i<_obj.length-1 && _obj[i].country != _obj[i+1].country)) countObj[i]=_obj[i].hitCount;
			else countObj[i] = countObj[i+1] + _obj[i].hitCount;
		}
		j = 0;
		for (i=0;i<_obj.length;++i)
		{
			if (i==0 || (i>0 && _obj[i].country != _obj[i-1].country))
			{
				showInfoDiv.innerHTML +=  _obj[i].country +"(" + countObj[i] + ")" + "<br>"; 
				j++;
			}
			if (j >= 10)
			{
				showInfoDiv.innerHTML += ". . ." + "<br>";
				break;
			}
		}
		
	}
	else if (zoom == 2 && viewAllModeActive == 0)
	{
		showInfoDiv.style["font-size"] = "12px";
		for (i=_obj.length-1; i>=0;--i )
		{
			if (i==_obj.length-1 || (i<_obj.length-1 && _obj[i].city != _obj[i+1].city)) countObj[i]=_obj[i].hitCount;
			else countObj[i] = countObj[i+1] + _obj[i].hitCount;
		}
		j = 0;
		for (i=0;i<_obj.length;++i)
		{
			if (i==0 || (i>0 && _obj[i].city != _obj[i-1].city))
			{
				showInfoDiv.innerHTML +=  _obj[i].city+","+ _obj[i].country +"(" + countObj[i] + ")" +  "<br>"; 
				j++;
			}
			if (j >= 10) 
			{
				showInfoDiv.innerHTML += ". . ." + "<br>";
				break;
			}
		}
		
	}



}

function listenMouseOver(_mouseX, _mouseY, _ind, _obj, _check)
{
	if (_check(_mouseX, _mouseY, _ind, _obj))
	{
		showCityCountryInfo(_obj);
		canvasObjectChange.x = _obj.x/4;
		canvasObjectChange.y = _obj.y/4;
		canvasObjectChange.img = changeIndex;
		canvasObjectChange.status = 1;
	//	console.log(canvasObjectChange);
		return 1;
	}
	else
	{
	//	console.log(_obj.index);
	//	canvasObjectChange = new Object();
		return 0;

	}
}

function listenAllMouseOver(_mouseX, _mouseY, _ind)
{
	var touchObj = 0;
	for (key in c_obj[zoom])
	{
		if (listenMouseOver(_mouseX, _mouseY, _ind, c_obj[zoom][key], checkSquare))
			touchObj = 1;
	}
	if (touchObj == 0) 
	{
		showInfoDiv.style.display = "none";
		canvasObjectChange.status = -1;
	}
}

