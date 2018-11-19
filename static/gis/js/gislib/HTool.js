/**
 * GIS应用工具
 * created by zj on 2018.7.30
 */

//WGS84转WebMercator
/*ol自带*/
function wgs84ToWebMct(lon,lat){
	var a = ol.proj.fromLonLat([lon,lat]);
	console.info(a);
}



//WebMercator转WGS84
function webMctToWGS84(lon,lat){
	var a = ol.proj.toLonLat([lon,lat]);
	console.info(a);
}

/*js改写*/

function WebMercator2lonLat(cx,cy){
    var x = cx/20037508.34*180;
    var y = cy/20037508.34*180;
    y = 180/Math.PI*(2*(Math.exp(y*Math.PI/180))-Math.PI/2);
    console.log(x);
    console.log(y);
}
