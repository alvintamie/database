var searchIndex = 1;
var authorIndex = 0;
var c_obj = new Array();
var showCoord = new Array();
var multiply = new Array(4,2,1);
var modeInMap = 0;
var highlightObj = new Object();
highlightObj.index = 10;
highlightObj.status = 0;
highlightObj.x = 0;
highlightObj.y = 0;
highlightObj.obj = null;
imgObject[10] = new Image();
imgObject[10].src = 'https://raw.github.com/alvi0010/map/master/image/person.png';

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
	
	for (i=2; i>_zoom;i--)
	{
		multiplier1 *= 2;
	}
	
	multiplier1 *= 20;
	var xAuth = Math.floor( getX(authorObject.city, authorObject.country) / multiplier1)*multiplier1 - Math.floor(imgObject[_ind].width/2);
	var yAuth = Math.floor( getY(authorObject.city,authorObject.country ) / multiplier1)*multiplier1 - Math.floor(imgObject[_ind].height/2);
	authorObject.x = xAuth;
	authorObject.y = yAuth;
	stemp = xAuth + ":"+yAuth;
	_c_obj[stemp] = new Array(authorObject);
	_c_obj[stemp].x = xAuth;
	_c_obj[stemp].y = yAuth;
	coordList.push(new Array(xAuth, yAuth));
	
	
		
	for (i=0; i<_objArr.length;++i)
	{
		//console.log("HAHAHA: "+_objArr[i].country );
		if (_objArr[i].country &&  getX(_objArr[i].city, _objArr[i].country) != null)
		{
			var x1 = Math.floor( getX(_objArr[i].city, _objArr[i].country) / multiplier1)*multiplier1 - Math.floor(imgObject[_ind].width/2);
			var y1 = Math.floor( getY(_objArr[i].city,_objArr[i].country ) / multiplier1)*multiplier1 - Math.floor(imgObject[_ind].height/2);
			//console.log("HIHIHI " + x1);
			_objArr[i].x = x1;
			_objArr[i].y = y1;
			
			stemp = _objArr[i].x + ":" + _objArr[i].y;
			if (_c_obj[stemp] )
			{
				_c_obj[stemp].push(_objArr[i]);
				_c_obj[stemp][_c_obj[stemp].length-1].index = i;
			}
			else 
			{
				_c_obj[stemp] = new Array(_objArr[i]);
				_c_obj[stemp].x = x1;
				_c_obj[stemp].y = y1;
				_c_obj[stemp][0].index = i;
				coordList.push(new Array(x1,y1));
			}
							
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
	var i;
	clearCanvasObject();
	canvasObjectText = [];
	c_obj = [];
	showCoord = [];
	canvasObjectAuthorText = "";
	modeInMap = _ind;
	//console.log("HIHIHIHIHIHI");
	
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
		canvasObjectText.push(c_obj[zoom][showCoord[zoom][i][0]+":"+showCoord[zoom][i][1]].length)		
	}
	console.log(showCoord[zoom][0]);
	
	if (_ind != searchIndex)
	{
		//console.log("HAHAHAHAHA-");
		addCanvasObjectAuthor(showCoord[zoom][0][0]/4,showCoord[zoom][0][1]/4, authorIndex);
		canvasObjectAuthorText = (c_obj[zoom][showCoord[zoom][0][0]+":"+showCoord[zoom][0][1]].length);
	}
	console.log("UDAH KLUAR IF --");
//	
//	addCanvasObjectAuthor(getX(authorObject.city, authorObject.country)/4,getY(_objArr[i].city,_objArr[i].country )/4, authorIndex)
//	
}

function refreshShow()
{
	var i;
	clearCanvasObject();
	canvasObjectText = [];
	canvasObjectAuthorText = "";
	for (i=1;i<showCoord[zoom].length;++i)
	{
		//drawObject(imgObject[ind],coordList[i][0], coordList[i][1]);
		//drawText(c_obj[coordList[i][0]+":"+coordList[i][1]], coordList[i][0], coordList[i][1]);
		addCanvasObject(showCoord[zoom][i][0]/4,showCoord[zoom][i][1]/4, 0);
		canvasObjectText.push(c_obj[zoom][showCoord[zoom][i][0]+":"+showCoord[zoom][i][1]].length);
	//	if (ind == searchIndex) addCanvasObjectAuthor(getX(authorObject.city,authorObject.country)/4,getY(authorObject.city,authorObject.country)/4,authorIndex);
	

	}
	if (modeInMap != searchIndex)
	{
		addCanvasObjectAuthor(showCoord[zoom][0][0]/4,showCoord[zoom][0][1]/4, authorIndex);
		canvasObjectAuthorText = (c_obj[zoom][showCoord[zoom][0][0]+":"+showCoord[zoom][0][1]].length);	
	}
	if (highlightObj.status == 1) highlight(highlightObj);

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
		clearHighlight();			
	}
}

function listenAllClick(_clickX, _clickY, _ind)
{
	//console.log(c_obj);
	//console.log(showCoord);
	var i;
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
	if (highlightObj.status > 0) canvasObject.pop();
	highlightObj.status == 0;
}

function highlight(_obj)
{
	clearHighlight();

	if (_obj&& _obj.y && _obj.x)
	{
		highlightObj.x = _obj.x;
		highlightObj.y = _obj.y;
	}
	else 
	{
	highlightObj.x = getX(_obj.city, _obj.country);
	highlightObj.y = getY(_obj.city, _obj.country);
	}
	goTo(highlightObj.x, highlightObj.y, canvas.width/2, canvas.height/2);
	addCanvasObject(highlightObj.x/4 - imgObject[highlightObj.index].width/8, highlightObj.y/4 - imgObject[highlightObj.index].height/8, highlightObj.index);
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
	objTemp.x = highlightObj.x/4 - imgObject[highlightObj.index].width/8;
	objTemp.y =  highlightObj.y/4 - imgObject[highlightObj.index].height/6 - 5*multiply[zoom]*(1+oscillate(currentTime/100));
	objTemp.img = highlightObj.index;
	canvasObject[canvasObject.length - 1] = objTemp;
}


