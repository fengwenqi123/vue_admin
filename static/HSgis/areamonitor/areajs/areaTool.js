/**
 * GIS基本操作工具集
 * created by zj on 2018.7.30
 */

/**
 * wgs84坐标转webMercator
 * @param {Number} lon
 * @param {Number} lat
 * @return {Array[Number]}} Lonlat
 */
function wgs84ToWebMct(lon, lat) {
  var Lonlat = ol.proj.fromLonLat([lon, lat]);
  return Lonlat;
}

/**
 * WebMercator转WGS84
 * @param {Number} lon
 * @param {Number} lat
 * @return {Array[Number]} Lonlat
 */
function webMctToWGS84(lon, lat) {
  var Lonlat = ol.proj.toLonLat([lon, lat]);
  return Lonlat;
}

/**
 * 要素图层显隐
 * @param {String} type 要素图层类型
 * @param {Boolean} isVisible
 */
function showAreaInfoLayer(type, isVisible) {
  try {
    if (type) {
      var mapLayers = areaapp.map.getLayers().getArray();
      for (i = 0; i < mapLayers.length; i++) {
        var layerType = mapLayers[i].getProperties()['type'];
        if (layerType == type) {
          var showedLayer = mapLayers[i];
          showedLayer.setVisible(isVisible);
        }
      }
    }
  } catch (e) {
    console.log(e.name + ":" + e.message);
  }

}


/***************************************区域布控业务逻辑开始******************************/

/**
 *绘制箭头
 */
function drawArrow() {
  cleaArrow();
  var drawSource = new ol.source.Vector();
  var drawVector = new ol.layer.Vector({
    source: drawSource,
    type: "drawarrow"
  });
  areaapp.map.addLayer(drawVector);
  var GIS_ARROWDRAW;

  GIS_ARROWDRAW = new ol.interaction.Draw({
    source: drawSource,
    maxPoints: 2,
    style: new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: [255, 48, 48],
        width: 3,
      })
    }),
    type: 'LineString'
  });

  //绘制显示的要素样式
  var featureStyle = new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: [255, 48, 48],
      width: 3,
    })
  });
  areaapp.areaObj = {brushColor: "", fillColor: "", brushThickness: 10}//区域json
  areaapp.areaPoints = [];//存放区域轨迹数组
  GIS_ARROWDRAW.on('drawend', function (evt) {
    var fea = evt.feature;
    if (featureStyle != null) {// 如果传入不为空，则使用自定义样式
      fea.setStyle([featureStyle]);
    }

    var arrowStart = webMctToWGS84(fea.getGeometry().getCoordinates()[0][0], fea.getGeometry().getCoordinates()[0][1]);
    var arrowEnd = webMctToWGS84(fea.getGeometry().getCoordinates()[1][0], fea.getGeometry().getCoordinates()[1][1]);
    var arrowX = arrowEnd[0];
    var arrowY = arrowEnd[1];
    areaapp.arrowangle = calulateXYAngle(arrowStart[0], arrowStart[1], arrowEnd[0], arrowEnd[1]);
    var delta = 1200;
    var newdirect = (450 - areaapp.arrowangle) % 360;

    //箭头顶点
    var topx = arrowX + Math.cos(newdirect * Math.PI / 180) * 20 / 50000;
    var topy = arrowY + Math.sin(newdirect * Math.PI / 180) * 20 / 50000;
    var AT = wgs84ToWebMct(topx, topy);
    //左下顶点
    var leftdirect = (150 + newdirect) % 360;
    var leftx = arrowX + Math.cos(leftdirect * Math.PI / 180) / delta;
    var lefty = arrowY + Math.sin(leftdirect * Math.PI / 180) / delta;
    var AL = wgs84ToWebMct(leftx, lefty);
    //右下顶点
    var rightdirect = (210 + newdirect) % 360;
    var rightx = arrowX + Math.cos(rightdirect * Math.PI / 180) / delta;
    var righty = arrowY + Math.sin(rightdirect * Math.PI / 180) / delta;
    var AR = wgs84ToWebMct(rightx, righty);

    //生成箭头图标
    var arrowcoor = [[AT, AL, AR, AT]];
    var arrowSymbol = new ol.Feature({
      geometry: new ol.geom.Polygon(arrowcoor)
    });
    arrowSymbol.setStyle(
      new ol.style.Style({
        fill: new ol.style.Fill({
          color: [255, 48, 48]
        })
      })
    );
    drawVector.getSource().addFeatures([arrowSymbol]);
    areaapp.map.removeInteraction(GIS_ARROWDRAW);
    console.log(areaapp.arrowangle.toFixed(1));
    parent.postMessage({
      act: 'arrowangle',
      msg: {
        name: areaapp.arrowangle.toFixed(1).toString()
      }
    }, '*')
  }, this)
  areaapp.map.addInteraction(GIS_ARROWDRAW);
}

/**
 * 绘制区域
 */
function drawArea() {
  cleaArea();
  var drawSource = new ol.source.Vector({wrapX: false});
  var drawVector = new ol.layer.Vector({
    source: drawSource,
    type: "draw"
  });
  areaapp.map.addLayer(drawVector);
  var GIS_BOXDRAW;

  GIS_BOXDRAW = new ol.interaction.Draw({
    source: drawSource,
    type: 'Polygon'
  });

  //绘制显示的要素样式
  var featureStyle = new ol.style.Style({
    fill: new ol.style.Fill({
      color: [255, 255, 255, 0.5]
    }),
    stroke: new ol.style.Stroke({
      color: [128, 0, 128],
      width: 2,
    })
  });
  areaapp.areaObj = {brushColor: "", fillColor: "", brushThickness: 10}//区域json
  areaapp.areaPoints = [];//存放区域轨迹数组
  GIS_BOXDRAW.on('drawend', function (evt) {
    var fea = evt.feature;
    if (featureStyle != null) {// 如果传入不为空，则使用自定义样式
      fea.setStyle([featureStyle]);
    }
    var areaCoor = fea.getGeometry().getCoordinates()[0];//区域坐标
    for (i = 0; i < areaCoor.length; i++) {
      var lonlat = webMctToWGS84(areaCoor[i][0], areaCoor[i][1]);
      var areaPoint = {};//单个点json
      areaPoint.x = lonlat[0];
      areaPoint.y = lonlat[1];
      areaapp.areaPoints.push(areaPoint);
    }
    areaapp.areaObj.pointList = areaapp.areaPoints;
    areaapp.areaObjStr = JSON.stringify(areaapp.areaObj);
    console.log(areaapp.areaObjStr);//区域坐标字符串
    parent.postMessage({
      act: 'area',
      msg: {
        name: areaapp.areaObjStr
      }
    }, '*')
    areaapp.map.removeInteraction(GIS_BOXDRAW);
  }, this);
  areaapp.map.addInteraction(GIS_BOXDRAW);
}

/**
 * 清除绘制区域
 */
function cleaArea() {
  var areaLayers = areaapp.map.getLayers().getArray();
  for (i = 0; i < areaLayers.length; i++) {
    var layerType = areaLayers[i].getProperties()['type'];
    if (layerType == "draw") {
      areaapp.map.removeLayer(areaLayers[i]);
    }
    if (layerType == "premonitor") {
      areaapp.map.removeLayer(areaLayers[i]);
    }
  }
}

/**
 * 清除绘制箭头
 */
function cleaArrow(){
  var areaLayers = areaapp.map.getLayers().getArray();
  for (i = 0; i < areaLayers.length; i++) {
    var layerType = areaLayers[i].getProperties()['type'];
    if (layerType == "drawarrow") {
      areaapp.map.removeLayer(areaLayers[i]);
    }
  }
}

/**
 * 打开页面时添加原监控区域 
 * @param {String} areaBorder 原区域边界信息
 */
function addPreMonitorArea(areaBorder){
	var polygonSymbol = [];
	var areaObj = JSON.parse(areaBorder);
	var areaPoints = areaObj.pointList;
	var points = [];
	for(i=0;i<areaPoints.length;i++){
		var lonlat = wgs84ToWebMct(areaPoints[i].x,areaPoints[i].y);
		points.push(lonlat);
	}
	var mareaSymbol = HSymbol.getPolygonSymbol({'type':'prearea'},[points],[240,248,255,0.8],[112,128,144],2,false,'原区域',16);
	polygonSymbol.push(mareaSymbol);
	//原区域添加到地图并定位
	var preareaSource = new ol.source.Vector();
	var preareaVector = new ol.layer.Vector({
	    source: preareaSource,
	    type:"premonitor"
	});
	preareaVector.getSource().addFeatures(polygonSymbol);
    areaapp.map.addLayer(preareaVector);
    var mapView = areaapp.map.getView();
	mapView.fit(mareaSymbol.getGeometry(),areaapp.map.getSize(),{duration:2000});
}
/***************************************区域布控业务逻辑结束******************************/
