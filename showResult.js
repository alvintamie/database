var searchIndex = 15;
var authorIndex = 10;
var c_obj = new Array();
var showCoord = new Array();
var multiply = new Array(4,2,1);



function clusterObj(_objArr, _zoom, _ind)
{
	var _c_obj = new Object();
	var coordList = new Array();
	var stemp;
	var multiplier1 = 1;
	var i = 0;
	
	for (i=2; i>_zoom;i--)
	{
		multiplier1 *= 2;
	}
	
	multiplier1 *= 20;
		
	for (i=0; i<_objArr.length;++i)
	{
	//console.log("hahaha " + _objArr[i].city + " " + _objArr[i].country);
	//console.log(getObject(_objArr[i].country).getName() + " -- " + getObject(_objArr[i].city));
		if (getX(_objArr[i].city, _objArr[i].country) != null)
		{
			var x1 = Math.floor( getX(_objArr[i].city, _objArr[i].country) / multiplier1)*multiplier1 - Math.floor(imgObject[_ind].width/2);
			var y1 = Math.floor( getY(_objArr[i].city,_objArr[i].country ) / multiplier1)*multiplier1 - Math.floor(imgObject[_ind].height/2);
			//var x1 = Math.floor( getX(_objArr[i].city, _objArr[i].country));
			//var y1 = Math.floor( getY(_objArr[i].city, _objArr[i].country));
			//console.log(_zoom);
			_objArr[i].x = x1;
			_objArr[i].y = y1;
			
			stemp = _objArr[i].x + ":" + _objArr[i].y;
			if (_c_obj[stemp] )
			{
				_c_obj[stemp].push(_objArr[i]);
				//_c_obj[stemp][_c_obj[stemp].length-1].zoom = _zoom;
			}
			else 
			{
				_c_obj[stemp] = new Array(_objArr[i]);
				_c_obj[stemp].x = x1;
				_c_obj[stemp].y = y1;
				//_c_obj[stemp][0].zoom = _zoom;
			}
			coordList.push(new Array(x1,y1));				
		}
	}
	
	return new Array(_c_obj,coordList);
}


function showResult(_ind, _objArr)
{
	clearCanvasObject();
	//console.log(_objArr);
	//var arr = clusterObj(obj);
	var i=0;
	for (i=0;i<=2;++i)
	{
		var objTemp = new Object();
		//var objTemp = jQuery.extend(true, {}, _objArr);
		//console.log(i);
		c_obj.push(clusterObj(_objArr,i, _ind)[0]);
		showCoord.push(clusterObj(_objArr,i, _ind)[1]);
		//console.log (clusterObj(_objArr,i));
	}
	console.log(c_obj);
	for (i=0;i<showCoord[zoom].length;++i)
	{
		//drawObject(imgObject[ind],coordList[i][0], coordList[i][1]);
		//drawText(c_obj[coordList[i][0]+":"+coordList[i][1]], coordList[i][0], coordList[i][1]);
		//console.log("x: " + showCoord[zoom][i][0]+"y: " +  showCoord[zoom][i][1] + "ind: " + _ind);
		addCanvasObject(showCoord[zoom][i][0]/4,showCoord[zoom][i][1]/4, 0);
		//addCanvasObject(10,10, 0);

		//if (_ind == searchIndex) addCanvasObjectAuthor(getX(authorObject.city,authorObject.country),getY(authorObject.city,authorObject.country),authorIndex);
	}
}

function refreshShow()
{
	ind = 0;
	clearCanvasObject();
	console.log(showCoord[zoom].length);
	for (i=0;i<showCoord[zoom].length;++i)
	{
		//drawObject(imgObject[ind],coordList[i][0], coordList[i][1]);
		//drawText(c_obj[coordList[i][0]+":"+coordList[i][1]], coordList[i][0], coordList[i][1]);
		//console.log(zoom);
		addCanvasObject(showCoord[zoom][i][0]/4,showCoord[zoom][i][1]/4, ind);
		//if (ind == searchIndex) addCanvasObjectAuthor(getX(authorObject.city,authorObject.country),getY(authorObject.city,authorObject.country),authorIndex);
	}
	
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
	
	for (key in c_obj[zoom])
	{
		//console.log("cX,Y: " + _clickX*multiplier1 + " " + _clickY*multiplier1 + "objX,Y: " + c_obj[zoom][key].x + " " + c_obj[zoom][key].y);
		//console.log(_ind);
		listenClick(_clickX, _clickY, _ind, c_obj[zoom][key], checkSquare)
	}	
}

