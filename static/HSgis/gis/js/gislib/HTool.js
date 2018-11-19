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
 * WGS-84转GCJ-02
 * @param {Number} lon
 * @param {Number} lat
 * @return {Array[Number]} Lonlat
 */

function WGS84ToGCJ02(lon, lat) {
  var Lonlat = [];
  //参数转换
  var tlon = lon - 105.0;
  var tlat = lat - 35.0;

  //转经度
  var relon = 300.0 + tlon + 2.0 * tlat + 0.1 * tlon * tlon + 0.1 * tlon * tlat + 0.1 * Math.sqrt(Math.abs(tlon)) +
    (20.0 * Math.sin(6.0 * tlon * Math.PI) + 20.0 * Math.sin(2.0 * tlon * Math.PI)) * 2.0 / 3.0 +
    (20.0 * Math.sin(tlon * Math.PI) + 40.0 * Math.sin(tlon / 3.0 * Math.PI)) * 2.0 / 3.0 +
    (150.0 * Math.sin(tlon / 12.0 * Math.PI) + 300.0 * Math.sin(tlon / 30.0 * Math.PI)) * 2.0 / 3.0;
  //转纬度
  var relat = -100.0 + 2.0 * tlon + 3.0 * tlat + 0.2 * tlat * tlat + 0.1 * tlon * tlat + 0.2 * Math.sqrt(Math.abs(tlon)) +
    (20.0 * Math.sin(6.0 * tlon * Math.PI) + 20.0 * Math.sin(2.0 * tlon * Math.PI)) * 2.0 / 3.0 +
    (20.0 * Math.sin(tlat * Math.PI) + 40.0 * Math.sin(tlat / 3.0 * Math.PI)) * 2.0 / 3.0 +
    (160.0 * Math.sin(tlat / 12.0 * Math.PI) + 320 * Math.sin(tlat * Math.PI / 30.0)) * 2.0 / 3.0;

  var radLat = lat / 180.0 * Math.PI;
  var magic = Math.sin(radLat);
  var magics = 1 - 0.00669342162296594323 * magic * magic;
  var sqrtMagic = Math.sqrt(magics);
  var dlon = (relon * 180.0) / (6378245.0 / sqrtMagic * Math.cos(radLat) * Math.PI);
  var dLat = (relat * 180.0) / ((6378245.0 * (1 - 0.00669342162296594323)) / (magic * sqrtMagic) * Math.PI);

  Lonlat[0] = lon + dlon;
  Lonlat[0] = Lonlat[0].toFixed(4)
  Lonlat[1] = lat + dLat;
  Lonlat[1] = Lonlat[1].toFixed(4)
  return Lonlat;

}

/**
 * GCJ-02转WGS-84
 * @param {Number} lon
 * @param {Number} lat
 * @return {Array[Number,Number]} Lonlat
 */
function GCJ02ToWGS84(lon, lat) {
  var Lonlat = [];
  //参数转换
  var tlon = lon - 105.0;
  var tlat = lat - 35.0;

  //转经度
  var relon = 300.0 + tlon + 2.0 * tlat + 0.1 * tlon * tlon + 0.1 * tlon * tlat + 0.1 * Math.sqrt(Math.abs(tlon)) +
    (20.0 * Math.sin(6.0 * tlon * Math.PI) + 20.0 * Math.sin(2.0 * tlon * Math.PI)) * 2.0 / 3.0 +
    (20.0 * Math.sin(tlon * Math.PI) + 40.0 * Math.sin(tlon / 3.0 * Math.PI)) * 2.0 / 3.0 +
    (150.0 * Math.sin(tlon / 12.0 * Math.PI) + 300.0 * Math.sin(tlon / 30.0 * Math.PI)) * 2.0 / 3.0;
  //转维度
  var relat = -100.0 + 2.0 * tlon + 3.0 * tlat + 0.2 * tlat * tlat + 0.1 * tlon * tlat + 0.2 * Math.sqrt(Math.abs(tlon)) +
    (20.0 * Math.sin(6.0 * tlon * Math.PI) + 20.0 * Math.sin(2.0 * tlon * Math.PI)) * 2.0 / 3.0 +
    (20.0 * Math.sin(tlat * Math.PI) + 40.0 * Math.sin(tlat / 3.0 * Math.PI)) * 2.0 / 3.0 +
    (160.0 * Math.sin(tlat / 12.0 * Math.PI) + 320 * Math.sin(tlat * Math.PI / 30.0)) * 2.0 / 3.0;

  var radLat = lat / 180.0 * Math.PI;
  var magic = Math.sin(radLat);
  var magics = 1 - 0.00669342162296594323 * magic * magic;
  var sqrtMagic = Math.sqrt(magics);
  var dlon = (relon * 180.0) / (6378245.0 / sqrtMagic * Math.cos(radLat) * Math.PI);
  var dLat = (relat * 180.0) / ((6378245.0 * (1 - 0.00669342162296594323)) / (magic * sqrtMagic) * Math.PI);

  Lonlat[0] = lon - dlon;
  Lonlat[1] = lat - dLat;
  return Lonlat;
}

/**
 * 两点之间的距离 wgs84
 * @param {Number} plon1
 * @param {Number} plat1
 * @param {Number} plon2
 * @param {Number} plat2
 * @return {Number} distance(单位为千米)
 */
function getDistance(plon1, plat1, plon2, plat2) {

  var radLat1 = plat1 * Math.PI / 180.0;
  var radLat2 = plat2 * Math.PI / 180.0;
  var radLon1 = plon1 * Math.PI / 180.0;
  var radLon2 = plon2 * Math.PI / 180.0;

  var a = radLat1 - radLat2;
  var b = radLon1 - radLon2;

  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));

  //6378137为地球半径
  var distance = (Math.round(s * 6378137 * 10000) / 10000) / 1000;
  return distance;
}

/**
 * 求给定距离和速度的时间
 * @param {Number} distance km
 * @param {Number} speed km/h
 * @return {String} time 00时00分00秒
 */
function finaltime(distance, speed) {
  if (speed != 0) {
    var time;
    var finaltime = (distance / speed) * 3600;
    var hour = Math.floor(finaltime / 3600);
    var Minute = Math.floor(finaltime / 60) % 60;
    var second = finaltime % 60;

    if (hour < 10) {
      time = '0' + hour + "时";
    } else {
      time = hour + "时";
    }

    if (Minute < 10) {
      time += "0";
    }
    time += Minute + "分";
    if (second < 10) {
      time += "0";
    }
    time += second.toFixed(0) + "秒";

    return time;
  } else {
    return "00时00分00秒";
  }

}

/**
 * 要素图层显隐
 * @param {String} type 要素图层类型
 * @param {Boolean} isVisible
 */
function showInfoLayer(type, isVisible) {
  try {
    if (type) {
      var mapLayers = app.map.getLayers().getArray();
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

/**
 * 定位到要素
 * @param {String} type 图层类型
 * @param {String} name 要素名称
 */
function locateTo(type, name) {
  try {
    if (type) {
      var mapLayers = app.map.getLayers().getArray();
      var locateLayer;
      for (i = 0; i < mapLayers.length; i++) {
        var layerType = mapLayers[i].getProperties()['type'];
        if (layerType == type) {
          locateLayer = mapLayers[i];
          break;
        }
      }
      var layerFeatures = locateLayer.getSource().getFeatures();
      var targetFeature;
      for (i = 0; i < layerFeatures.length; i++) {
        var featureName = layerFeatures[i].getProperties()['name'];
        if (featureName == name) {
          targetFeature = layerFeatures[i];
        }
      }
      if (targetFeature) {
        var mapView = app.map.getView();
        mapView.fit(targetFeature.getGeometry(), app.map.getSize(), {duration: 2000});
      } else {
        console.log(0);
        return;
      }

    }
  } catch (e) {
    console.log(e.name + ":" + e.message);
  }
}

/**
 * 定位到坐标点
 * @param {Number} lon wgs84
 * @param {Number} lat wgs84
 */
function pointTo(lon, lat) {
  try {
    var lonlat = wgs84ToWebMct(lon, lat);
    var mapView = app.map.getView(app.map.getSize());
    mapView.animate({center: lonlat}, {zoom: 14});
  } catch (e) {
    console.log(e.name + ":" + e.message);
  }
}


/**
 * 热力图
 * @type {String} 热力图类型  ais gps mixed
 * @param {Array[][]} arr 二维数组存放经纬度 [[120.19,30.26],[120.29,30.26],[120.29,30.36]]
 * @blur {Number} 数值越大，渲染程度越低
 * @radius {Number} 数值越大，单数据越明显
 * @gradient {Array[String]} 渲染颜色数组
 * @resolution {Number} 最小显示分辨率
 * @isVisible {Boolean} 是否显示热力图
 * @return {ol.layer.Heatmap}  heatMapVectorLayer 热力图
 */

function createHeatMap(type, arr, blur, radius, gradient, resolution, isVisible) {
  try {
    var features = []
    var ex = []
    for (var i = 0; i < arr.length; i++) {
      ex[i] = {type: "Point", "coordinates": [arr[i][0], arr[i][1]]}
      features.push(ex[i])
    }
    var heatData = {
      type: "FeatureCollection",
      features: features
    }
    var vectorSource = new ol.source.Vector({
      features: (new ol.format.GeoJSON()).readFeatures(heatData, {
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:3857'
      })
    });

    var heatMapVectorLayer = new ol.layer.Heatmap({
      type: type,
      gradient: gradient ? gradient : ['#00f', '#0ff', '#0f0', '#ff0', '#f00'],
      source: vectorSource,
      blur: blur,
      radius: radius,
      minResolution: resolution,
      visible: isVisible ? true : isVisible
    });
    return heatMapVectorLayer
  } catch (e) {
    console.log(e.name + ":" + e.message)
  }
}

/**
 * 增加闪烁点
 * @param {Number} lon
 * @param {Number} lat
 * @param {String} id
 */
function addFlashMarker(lon, lat, id) {
  try {
    var lonlat = wgs84ToWebMct(lon, lat);
    var flashMarker = HSymbol.getMarkerWithID({}, lonlat, 'red', id);
    app.flashLayer.addMarkerSymbol([flashMarker]);
    var flash_div = document.getElementById("css_animation");
    var flashOverlay = new ol.Overlay({
      element: flash_div,
      positioning: 'center-center',
      offset: [5, 0],
      stopEvent: false
    });
    flashOverlay.setPosition(lonlat);
    app.map.addOverlay(flashOverlay);
  } catch (e) {
    console.log(e.name + ":" + e.message)
  }
}

/**
 * 清除绘制要素
 * @description 图层type为draw
 */
function clearFeature() {
  var coorLayers = app.map.getLayers().getArray();
  for (i = 0; i < coorLayers.length; i++) {
    var layerType = coorLayers[i].getProperties()['type'];
    if (layerType == "draw") {
      coorLayers[i].getSource().clear();
    }
  }
}

/**
 * 计算线长度（测距用）
 * @param {ol.geom.LineString} line
 */
function formatLength(line) {
  var length = Math.round(line.getLength() * 100) / 100;
  var output;
  if (length > 100) {
    output = (Math.round(length / 1000 * 100) / 100);
  } else {
    output = (Math.round(length * 100) / 100);
  }
  return output;
};


/**
 * 获取指定图层某范围内的要素
 * @param {ol.Extent} extent 当前地图范围
 * @param {ol.layer.Vector} layer 当前设置为显示的指定图层
 * @param {Function} callback 回调函数 用以处理获取到的要素
 */
function getFeatureInExtent(extent, layer, callback) {
  var features = layer.getSource().getFeaturesInExtent(extent);
  callback(features);
}


/**
 * 计算两点确定直线的方向
 * @param {Number} startx 起点经度
 * @param {Number} starty 起点纬度
 * @param {Number} endx 终点经度
 * @param {Number} endy 终点纬度
 * @description 以正北方向为0 顺时针分割 范围0--360
 */
function calulateXYAngle(startx, starty, endx, endy) {
  var tan = Math.atan(Math.abs((endy - starty) / (endx - startx))) * 180 / Math.PI + 90;
  if (endx > startx && endy > starty) {//第一象限
    return -tan + 180;
  } else if (endx > startx && endy < starty) {//第二象限
    return tan;
  } else if (endx < startx && endy > starty) {//第三象限
    return tan + 180;
  } else {//第四象限
    return 360 - tan;
  }
}
