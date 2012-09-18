var searchIndex = 0;
var authorIndex = 0;
var c_obj = new Array();
var showCoord = new Array();



function clusterObj(_objArr, _zoom)
{
	var _c_obj = new Array();
	var coordList = new Array();
	var stemp;
	var multiplier = 1;
	var i;
	
	for (i=2; i>zoom;i--)
	{
		multiplier *= 2;
	}
	
	multiplier *= 5;
		
	for (i=0; i<_objArr.length;++i)
	{
		//console.log("HAHAHA: "+_objArr[i].country +);
		if (_objArr[i].country &&  getX(_objArr[i].city, _objArr[i].country) != null)
		{
			var x1 = Math.floor( getX(_objArr[i].city,_objArr[i].country ) / multiplier)*multiplier;
			var y1 = Math.floor( getY(_objArr[i].city,_objArr[i].country ) / multiplier)*multiplier;
			console.log("HIHIHI " + x1);
			_objArr[i].x = x1;
			_objArr[i].y = y1;
			
			stemp = _objArr[i].x + ":" + _objArr[i].y;
			if (_c_obj[stemp] ) _c_obj[stemp].push(_objArr[i]);
			else 
			{
				_c_obj[stemp] = new Array(_objArr[i]);
				_c_obj[stemp].x = x1;
				_c_obj[stemp].y = y1;
			}
			coordList.push(new Array(x1,y1));				
		}
	}
	
	return new Array(_c_obj,coordList);
}


function showResult(_ind, _objArr)
{
	var i;
	clearCanvasObject();
	canvasObjectText = [];
	//console.log("HIHIHIHIHIHI");
	
	//var arr = clusterObj(obj);
	for (i=0;i<=2;++i)
	{
		c_obj.push(clusterObj(_objArr,i)[0]);
		showCoord.push(clusterObj(_objArr,i)[1]);
	}
	
	for (i=0;i<showCoord[zoom].length;++i)
	{
		//drawObject(imgObject[ind],coordList[i][0], coordList[i][1]);
		//drawText(c_obj[coordList[i][0]+":"+coordList[i][1]], coordList[i][0], coordList[i][1]);
		addCanvasObject(showCoord[zoom][i][0]/4,showCoord[zoom][i][1]/4, _ind);
		canvasObjectText.push(c_obj[zoom][showCoord[zoom][i][0]+":"+showCoord[zoom][i][1]].length)
		if (_ind == searchIndex) addCanvasObjectAuthor(getX(authorObject.city,authorObject.country)/4,getY(authorObject.city,authorObject.country)/4,authorIndex);
		
	}
}

function refreshShow()
{
	var i;
	clearCanvasObject();
	canvasObjectText = [];
	for (i=0;i<showCoord[zoom].length;++i)
	{
		//drawObject(imgObject[ind],coordList[i][0], coordList[i][1]);
		//drawText(c_obj[coordList[i][0]+":"+coordList[i][1]], coordList[i][0], coordList[i][1]);
		addCanvasObject(showCoord[zoom][i][0]/4,showCoord[zoom][i][1]/4, 0);
		canvasObjectText.push(c_obj[zoom][showCoord[zoom][i][0]+":"+showCoord[zoom][i][1]].length)
	//	if (ind == searchIndex) addCanvasObjectAuthor(getX(authorObject.city,authorObject.country)/4,getY(authorObject.city,authorObject.country)/4,authorIndex);
		addCanvasObjectAuthor(getX(authorObject.city,authorObject.country)/4,getY(authorObject.city,authorObject.country)/4,authorIndex);

	}
}

function checkSquare(_clickX, _clickY, _ind, _obj)
{
	if (_clickX >= _obj.x && _clickX <= _obj.x + imgObject[_ind].width && _clickY >= _obj.y && _clickY <= _obj.y + imgObject[_ind].height) return  true;
	else return false;
}

function checkCircle(_clickX, _clickY, _ind, _obj)
{
	var radius = img.Object[_ind].width/2;
	var xCenter = _obj.x + radius;
	var yCenter = _obj.y + radius;
	if ( (_clickX-xCenter)*(_clickX-xCenter) + (_clickY-yCenter)*(_clickY-yCenter) <= radius) return true;
	else return false;
	
}

function listenClick(_clickX, _clickY, _ind, _obj, _check)
{
	if (_check(_clickX, _clickY, _ind, _obj))
	{
		console.log("nice click" + _obj);
	}
}

function listenAllClick(_clickX, _clickY, _ind)
{
	for (obj in c_obj[zoom])
	{
		listenClick(_clickX, _clickY, _ind, obj, checkSquare)
	}	
}

