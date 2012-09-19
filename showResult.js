var searchIndex = 0;
var authorIndex = 0;
var c_obj = new Array();
var showCoord = new Array();
var multiply = new Array(4,2,1);



function clusterObj(_objArr, _zoom, _ind)
{
	var _c_obj = new Array();
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
		console.log("HAHAHA: "+_objArr[i].country );
		if (_objArr[i].country &&  getX(_objArr[i].city, _objArr[i].country) != null)
		{
			var x1 = Math.floor( getX(_objArr[i].city, _objArr[i].country) / multiplier1)*multiplier1 - Math.floor(imgObject[_ind].width/2);
			var y1 = Math.floor( getY(_objArr[i].city,_objArr[i].country ) / multiplier1)*multiplier1 - Math.floor(imgObject[_ind].height/2);
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
				coordList.push(new Array(x1,y1));
			}
							
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
	//addCanvasObjectAuthor(showCoord[zoom][0][0]/4,showCoord[zoom][0][1]/4, authorIndex)
	addCanvasObjectAuthor(getX(authorObject.city, authorObject.country)/4,getY(_objArr[i].city,_objArr[i].country )/4, authorIndex)
	canvasObjectText.push(c_obj[zoom][showCoord[zoom][0][0]+":"+showCoord[zoom][0][1]].length)
}

function refreshShow()
{
	var i;
	clearCanvasObject();
	canvasObjectText = [];
	for (i=1;i<showCoord[zoom].length;++i)
	{
		//drawObject(imgObject[ind],coordList[i][0], coordList[i][1]);
		//drawText(c_obj[coordList[i][0]+":"+coordList[i][1]], coordList[i][0], coordList[i][1]);
		addCanvasObject(showCoord[zoom][i][0]/4,showCoord[zoom][i][1]/4, 0);
		canvasObjectText.push(c_obj[zoom][showCoord[zoom][i][0]+":"+showCoord[zoom][i][1]].length)
	//	if (ind == searchIndex) addCanvasObjectAuthor(getX(authorObject.city,authorObject.country)/4,getY(authorObject.city,authorObject.country)/4,authorIndex);
	

	}
	addCanvasObjectAuthor(showCoord[zoom][0][0]/4,showCoord[zoom][0][1]/4, authorIndex)
	canvasObjectText.push(c_obj[zoom][showCoord[zoom][0][0]+":"+showCoord[zoom][0][1]].length)
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
		
	}
}

function listenAllClick(_clickX, _clickY, _ind)
{
	//console.log(c_obj);
	//console.log(showCoord);
	var i;
	console.log("cX,Y: " + _clickX*multiplier + " " + _clickY*multiplier);
	console.log(c_obj[zoom]);
	for (key in c_obj[zoom])
	{
		
		//console.log(_ind);
		listenClick(_clickX, _clickY, _ind, c_obj[zoom][key], checkSquare)
	}	
}

