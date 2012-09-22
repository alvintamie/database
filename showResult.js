var searchIndex = 1;
var authorIndex = 0;
var viewAllIndex = 0;
var changeIndex = 1;
var c_obj = new Array();
var showCoord = new Array();
var multiply = new Array(4,2,1);
var modeInMap = 0;
var highlightObj = new Object();
highlightObj.index = 0;
highlightObj.status = 0;
highlightObj.x = 0;
highlightObj.y = 0;
highlightObj.obj = null;
var showInfoObj;
//SEMENTARA (sebelum ada index):
var tempo = true;


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
	
	multiplier1 *= 35;
	
	if (typeof(authorObject.city) == 'undefined' ) authorObject.city = "noCity";
	if (typeof(authorObject.hitCount) == 'undefined') authorObject.hitCount = 1;
	if (typeof(authorObject.country) == 'undefined') authorObject.country = authorObject.name;
	var xAuth = Math.floor( getX(authorObject.city, authorObject.country) / multiplier1)*multiplier1 - Math.floor(imgObject[_ind].width/2);
	var yAuth = Math.floor( getY(authorObject.city,authorObject.country ) / multiplier1)*multiplier1 - Math.floor(imgObject[_ind].height/2);
	
	//var xAuth = Math.floor( getX(authorObject.city,tcountry) / multiplier1)*multiplier1 - Math.floor(imgObject[_ind].width/2);
//	var yAuth = Math.floor( getY(authorObject.city,tcountry ) / multiplier1)*multiplier1 - Math.floor(imgObject[_ind].height/2);
	
	authorObject.x = xAuth;
	authorObject.y = yAuth;
	stemp = xAuth + ":"+yAuth;
	_c_obj[stemp] = new Array(authorObject);
	_c_obj[stemp].x = xAuth;
	_c_obj[stemp].y = yAuth;
	_c_obj[stemp].hitCount = authorObject.hitCount;
	coordList.push(new Array(xAuth, yAuth));
	
	
	
		
	for (i=0; i<_objArr.length;++i)
	{
		if (typeof(_objArr[i].country) == 'undefined') _objArr[i].country = _objArr[i].name;
		//console.log("HAHAHA: "+_objArr[i].country );
		if (_objArr[i].country &&  getX(_objArr[i].city, _objArr[i].country) != null)
		{
			//CHECK EXISTANCE OF CITY
			if (typeof(_objArr[i].city) == 'undefined') _objArr[i].city = "noCity";
			//CHECK EXISTANCE OF HITCOUNT
			if (typeof(_objArr[i].hitCount) == 'undefined') _objArr[i].hitCount = 1;
			//CHECK EXISTANCE OF COUNTRY (REPLACED WITH NAME IF NOT EXIST)
		
			
			
			
			var x1 = Math.floor( getX(_objArr[i].city, _objArr[i].country) / multiplier1)*multiplier1 - Math.floor(imgObject[_ind].width/2);
			var y1 = Math.floor( getY(_objArr[i].city,_objArr[i].country ) / multiplier1)*multiplier1 - Math.floor(imgObject[_ind].height/2);
		
		//	var x1 = Math.floor( getX(_objArr[i].city,tcountry) / multiplier1)*multiplier1 - Math.floor(imgObject[_ind].width/2);
		//	var y1 = Math.floor( getY(_objArr[i].city,tcountry ) / multiplier1)*multiplier1 - Math.floor(imgObject[_ind].height/2);
			//console.log("HIHIHI " + x1);
			_objArr[i].x = x1;
			_objArr[i].y = y1;
			
			stemp = _objArr[i].x + ":" + _objArr[i].y;
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
		var i;
		clearCanvasObject();
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
			addCanvasObject(showCoord[zoom][i][0]/4,showCoord[zoom][i][1]/4, _ind);
			c_obj[zoom][showCoord[zoom][i][0]+":"+showCoord[zoom][i][1]].index = i-1;
			canvasObjectText.push(c_obj[zoom][showCoord[zoom][i][0]+":"+showCoord[zoom][i][1]].hitCount)		
		}
		//console.log(showCoord[zoom][0]);
		
		if (_ind != searchIndex || tempo)
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
	var i;
	clearCanvasObject();
	canvasObjectText = [];
	canvasObjectAuthorText = "";
	if (showCoord[zoom])
	for (i=1;i<showCoord[zoom].length;++i)
	{
		//drawObject(imgObject[ind],coordList[i][0], coordList[i][1]);
		//drawText(c_obj[coordList[i][0]+":"+coordList[i][1]], coordList[i][0], coordList[i][1]);
		addCanvasObject(showCoord[zoom][i][0]/4,showCoord[zoom][i][1]/4, 0);
		c_obj[zoom][showCoord[zoom][i][0]+":"+showCoord[zoom][i][1]].index = i-1;
		canvasObjectText.push(c_obj[zoom][showCoord[zoom][i][0]+":"+showCoord[zoom][i][1]].hitCount);
	//	if (ind == searchIndex) addCanvasObjectAuthor(getX(authorObject.city,authorObject.country)/4,getY(authorObject.city,authorObject.country)/4,authorIndex);
	

	}
	if (modeInMap != searchIndex || tempo)
	{
		addCanvasObjectAuthor(showCoord[zoom][0][0]/4,showCoord[zoom][0][1]/4, authorIndex);
		c_obj[zoom][showCoord[zoom][0][0]+":"+showCoord[zoom][0][1]].index = showCoord[zoom].length-1;
		canvasObjectAuthorText = (c_obj[zoom][showCoord[zoom][0][0]+":"+showCoord[zoom][0][1]].hitCount);
//	canvasObjectAuthorText = "test";
	}
	if (highlightObj.status == 1) refreshHighlight();

}

function checkSquare(_clickX, _clickY, _ind, _obj)
{
	
	if (_clickX >= _obj.x/multiply[zoom] && _clickX <= _obj.x/multiply[zoom] + imgObject[_ind].width && _clickY >= _obj.y/multiply[zoom] && _clickY <= _obj.y/multiply[zoom] + imgObject[_ind].height) return  true;
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
		updateRelevantDocument(_obj,1);
		//SEMENTARA:
		//clearHighlight();
		if (modeInMap == viewAllIndex) 1;
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
	highlightObj.status = 0;
}

function highlight(_obj)
{
	clearHighlight();

	if (_obj&& _obj.y && _obj.x)
	{
		highlightObj.x = _obj.x - imgObject[highlightObj.index].width/2;
		highlightObj.y = _obj.y - imgObject[highlightObj.index].height/2;
	}
	else 
	{
		highlightObj.x = getX(_obj.city, _obj.country)- imgObject[highlightObj.index].width/2;
		highlightObj.y = getY(_obj.city, _obj.country)- imgObject[highlightObj.index].height/2;
	}
	goTo(highlightObj.x, highlightObj.y, canvas.width/2, canvas.height/2);
	addCanvasObjectHighlight(highlightObj.x/4, highlightObj.y/4 , highlightObj.index);
	highlightObj.status = 1;
}

function refreshHighlight()
{
	//console.log("hehe: " + highlightObj.status);
	clearHighlight();
	addCanvasObjectHighlight(highlightObj.x/4 , highlightObj.y/4 , highlightObj.index);
	highlightObj.status = 1;
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
		objTemp.x = highlightObj.x/4;
		objTemp.y =  highlightObj.y/4 - imgObject[highlightObj.index].width - 3*multiply[zoom]*(2+oscillate(currentTime/200));
		objTemp.img = highlightObj.index;
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
	if (diffX - canvas.offsetLeft > canvas.width/2) diffX -= 290;
	if (diffY - canvas.offsetTop < canvas.height /3) diffY += 150;
	
	showInfoObj.innerHTML = "    ";
	showInfoObj.style.top =  diffY + "px";
	showInfoObj.style.left = diffX + "px";
	showInfoObj.style.display = "block";
	for (i=_obj.length-1; i>=0;--i )
	{
		if (i==_obj.length-1 || (i<_obj.length-1 && _obj[i].country != _obj[i+1].country)) countObj[i]=_obj[i].hitCount;
		else countObj[i] = countObj[i+1] + _obj[i].hitCount;
	}
	for (i=0;i<_obj.length;++i)
	if (i==0 || (i>0 && _obj[i].country != _obj[i-1].country))showInfoObj.innerHTML +=  _obj[i].country +"(" + countObj[i] + ")" + "<br>"; 
}

function listenMouseOver(_mouseX, _mouseY, _ind, _obj, _check)
{
	if (_check(_mouseX, _mouseY, _ind, _obj))
	{
		showCityCountryInfo(_obj);
		canvasObjectChange.x = _obj.x;
		canvasObjectChange.y = _obj.y;
		canvasObjectChange.img = changeIndex;
		canvasObjectChange.status = 1;
		return 1;
	}
	else
	{
		console.log(_obj.index);
		canvasObjectChange.status = -1;
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
	if (touchObj == 0) showInfoObj.style.display = "none";
}

