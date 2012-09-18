var searchIndex = 15;
var authorIndex = 10;


function clusterObj(obj, _zoom)
{
  var c_obj = new Array();
	var coordList = new Array();
	var stemp;
	//var multiplier = 1;
	/*
	for (i=0; i<obj.length; ++i)
	{
		if (getX(obj[i].city, obj[i].country) != null)
		{
			stemp = getX(obj[i].city,obj[i].country).toString() +":"+ getY(obj[i].city, obj[i].country).toString();
			if ( c_obj[stemp] ) c_obj[stemp].push(obj[i]);
			else c_obj[stemp] = new Array(obj[i]);
			coordList.push(new Array(getX(obj[i].city,obj[i].country),getY(obj[i].city,obj[i].country)));
		}
	}
	*/
	/*
	for (i=0; i<obj.length; ++i)
	{
		if (getX(obj[i].city, obj[i].country) != null)
		{
			obj.x = getX(obj[i].city,obj[i].country);
			obj.y = getY(obj[i].city,obj[i].country);
			stemp = obj.x + ":" + obj.y;
			if ( c_obj[stemp] ) c_obj[stemp].push(obj[i]);
			else c_obj[stemp] = new Array(obj[i]);
			coordList.push(new Array(getX(obj[i].city,obj[i].country),getY(obj[i].city,obj[i].country)));
		}
	}
	*/
	
	for (i=2; i>_zoom;i--)
	{
		multiplier *= 2;
	}
	
	multiplier *= 20;
		
	for (i=0; i<obj.length;++i)
	{
		if (getX(obj[i].city, obj[i].country) != null)
		{
			var x1 = Math.floor( getX(obj[i].city,obj[i].country ) / multiplier)*multiplier;
			var y1 = Math.floor( getY(obj[i].city,obj[i].country ) / multiplier)*multiplier;
			obj.x = x1;
			obj.y = y1;
			
			stemp = obj.x + ":" + obj.y;
			if (c_obj[stemp] ) c_obj[stemp].push(obj[i]);
			else c_obj[stemp] = new Array(obj[i]);
			coordList.push(new Array(x1,y1));				
		}
	}
	
	return new Array(c_obj,coordList);
}


function showResult(ind, obj)
{
  clearCanvasObject();
	var arr = clusterObj(obj,zoom);
	var c_obj = arr[0];
	var coordList = arr[1];
	for (i=0;i<coordList.length;++i)
	{
		//drawObject(imgObject[ind],coordList[i][0], coordList[i][1]);
		//drawText(c_obj[coordList[i][0]+":"+coordList[i][1]], coordList[i][0], coordList[i][1]);
		addCanvasObject(coordList[i][0],coordList[i][1], ind);
		if (ind == search_index) addCanvasObjectAuthor(getX(authorObject.city,authorObject.country),getY(authorObject.city,authorObject.country),authorIndex);
	}
}