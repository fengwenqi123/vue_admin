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
 * 要素图层显隐
 * @param {String} type 要素图层类型
 * @param {Boolean} isVisible
 */
function showInfoLayer(type, isVisible) {
  try {
    if (type) {
      var mapLayers = trackapp.map.getLayers().getArray();
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
      var mapLayers = trackapp.map.getLayers().getArray();
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
      var mapView = trackapp.map.getView();
      mapView.fit(targetFeature.getGeometry(), trackapp.map.getSize(), {duration: 2000});
    }
  } catch (e) {
    console.log(e.name + ":" + e.message);
  }
}

/**
 * 定位到轨迹船舶
 * @param {String} type 图层类型
 * @param {String} name 要素名称
 */
function locateToShip(type, name) {
  try {
    if (type) {
      var mapLayers = trackapp.map.getLayers().getArray();
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
        var featureName = layerFeatures[i].getProperties()['shipName'];
        if (featureName == name) {
          targetFeature = layerFeatures[i];
        }
      }
      var mapView = trackapp.map.getView();
      mapView.fit(targetFeature.getGeometry(), trackapp.map.getSize(), {duration: 2000});
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
    var mapView = trackapp.map.getView(trackapp.map.getSize());
    mapView.animate({center: lonlat}, {zoom: 14});
  } catch (e) {
    console.log(e.name + ":" + e.message);
  }
}

/***************************************区域轨迹业务逻辑开始******************************/
/**
 * 绘制区域
 */
function drawBox() {
  cleaBox();
  var drawSource = new ol.source.Vector({wrapX: false});
  var drawVector = new ol.layer.Vector({
    source: drawSource,
    type: "draw"
  });
  trackapp.map.addLayer(drawVector);
  var GIS_BOXDRAW;
  var geometryFunction = ol.interaction.Draw.createBox();

  GIS_BOXDRAW = new ol.interaction.Draw({
    source: drawSource,
    type: 'Circle',
    geometryFunction: geometryFunction
  });

  //绘制显示的要素样式
  var featureStyle = new ol.style.Style({
    fill: new ol.style.Fill({
      color: [255, 255, 255, 0.3]
    }),
    stroke: new ol.style.Stroke({
      color: [255, 255, 0],
      width: 3,
    })
  });

  GIS_BOXDRAW.on('drawend', function (evt) {
    var fea = evt.feature;
    if (featureStyle != null) {// 如果传入不为空，则使用自定义样式
      fea.setStyle([featureStyle]);
    }
    var boxCoor = fea.getGeometry().getCoordinates()[0];//区域坐标
    var minLonlat = webMctToWGS84(boxCoor[0][0], boxCoor[0][1]);//左下坐标
    var maxLonlat = webMctToWGS84(boxCoor[2][0], boxCoor[2][1]);//右上坐标
    trackapp.minLongitude = minLonlat[0];
    trackapp.minLatitude = minLonlat[1];
    trackapp.maxLongitude = maxLonlat[0];
    trackapp.maxLatitude = maxLonlat[1];
    trackapp.map.removeInteraction(GIS_BOXDRAW);
  }, this);
  trackapp.map.addInteraction(GIS_BOXDRAW);
}

/**
 * 清除绘制区域
 */
function cleaBox() {
  var trackLayers = trackapp.map.getLayers().getArray();
  for (i = 0; i < trackLayers.length; i++) {
    var layerType = trackLayers[i].getProperties()['type'];
    if (layerType == "draw") {
      trackapp.map.removeLayer(trackLayers[i]);
    }
  }
}

/**
 * 显示轨迹
 */
function showTrack() {
  showInfoLayer("trackPoint", true);
  showInfoLayer("trackLine", true);
}

/**
 * 隐藏轨迹
 */
function hideTrack() {
  showInfoLayer("trackPoint", false);
  showInfoLayer("trackLine", false);
}

//1.启动回放后首先获取区域内船舶，添加轨迹线（轨迹线图层隐藏）添加轨迹点(轨迹点图层隐藏)
//2.然后时间轴触发 控制船舶显示与隐藏

/**
 * 获取区域内船舶
 * @param {String} minReceiveTime 起始时间 2018-9-25 19:00:01
 * @param {String} maxReceiveTime 截止时间
 * @param {Number} minLongitude 最小经度
 * @param {Number} maxLongitude 最大经度
 * @param {Number} minLatitude 最小纬度
 * @param {Number} maxLatitude 最大纬度
 */
function getAreaShip(minReceiveTime, maxReceiveTime, minLongitude, maxLongitude, minLatitude, maxLatitude) {
  var getUrl = GIS_AREASHIP + "minReceiveTime=" + minReceiveTime + "&" + "maxReceiveTime=" + maxReceiveTime + "&"
    + "minLongitude=" + minLongitude + "&" + "maxLongitude=" + maxLongitude + "&"
    + "minLatitude=" + minLatitude + "&" + "maxLatitude=" + maxLatitude + "&type=2";
  $.ajax({
    url: getUrl,
    type: "get",
    dataType: "json",
    async: false,
    success: function (d) {
      var lineSymbol = [];
      //var markerSymbol = [];
      trackapp.shipsArray = [];
      $.each(d.data, function (i, item) {
        var oneShipArray = [];
        var onePositionArray = [];
        if (item['shipName']) {
          $.each(item['positionBeanList'], function (e, element) {
            oneShipArray.push(element);
            var lonlat = wgs84ToWebMct(element['longitude'], element['latitude']);
            onePositionArray.push(lonlat);
            //添加轨迹点(统一添加) 船名 接收时间 船速和船向
            /*var trackPointSymbol = HSymbol.getTrackMarker({'type':'trackPoint','name':element['shipName'],'receiveTime':element['receiveTimeString'],
                                                                'speed':element['speed'],'direction':element['direction']},lonlat,[255,250,250],[255,215,0],1.5,5);
                        markerSymbol.push(trackPointSymbol);*/
          });
          //添加轨迹线
          var trackLineSymbol = HSymbol.getLineSymbol({'type': 'trackLine'}, onePositionArray, [255, 48, 48], 2);
          lineSymbol.push(trackLineSymbol);
          //获取船舶
          trackapp.shipsArray.push(oneShipArray)
        }
      });
      trackapp.trackLineLayer.addLineSymbol(lineSymbol);
      //trackapp.trackPointLayer.addMarkerSymbol(markerSymbol);
    }
  });
}


var intplay;//轨迹播放定时器
/**
 * 开始轨迹播放
 * @param {String} minReceiveTime 起始时间 '2018:9:26 10:00:00'
 * @param {String} maxReceiveTime 结束时间 '2018:9:26 12:00:00'
 */
function startPlay(minReceiveTime, maxReceiveTime) {
  trackapp.areaShipLayer.clear();
  trackapp.trackPointLayer.clear();
  var minReceiveTime = minReceiveTime
  var maxReceiveTime = maxReceiveTime
  if (!trackapp.minLongitude) {
    alert('请先绘制区域')
    return false
  }
  var minLongitude = trackapp.minLongitude;
  var maxLongitude = trackapp.maxLongitude;
  var minLatitude = trackapp.minLatitude;
  var maxLatitude = trackapp.maxLatitude;

  //存放区域船名数组
  var areaShipname = [];
  //获取船舶并添加区域船舶历史轨迹 默认隐藏
  getAreaShip(minReceiveTime, maxReceiveTime, minLongitude, maxLongitude, minLatitude, maxLatitude);

  var startTime = HUtil.strToDateforSecond(minReceiveTime);
  var endTime = HUtil.strToDateforSecond(maxReceiveTime);


  //控制当前显示船舶
  intplay = setInterval(function () {
    var polygonSymbol = [];
    var markerSymbol = [];
    var fillColor = [0, 200, 0];//绿色填充
    var lineColor = [0, 0, 0];//黑边
    var textColor = [0, 200, 0];//船名颜色
    var areaShipArr = trackapp.areaShipLayer.layer.getSource().getFeatures();
    if (startTime <= endTime) {
      var midTime = startTime + 60000;
      //三个逻辑:提供新增船名;控制船舶显隐;动态添加轨迹点
      $.each(trackapp.shipsArray, function (i, item) {
        var shipElement = {};//在该时间段内的船舶对象
        $.each(item, function (e, element) {
          var shipTime = HUtil.strToDateforSecond(element['receiveTimeString']);
          if (shipTime >= startTime && shipTime < midTime) {
            shipElement = item[e];
            return;
          }
        });
        if ($.isEmptyObject(shipElement) == false) {
          //新增船名
          if (areaShipname.length == 0) {
            areaShipname.push(shipElement['shipName']);
          } else {
            if (areaShipname.indexOf(shipElement['shipName']) === -1) {
              areaShipname.push(shipElement['shipName'])
            }
          }
          window.postMessage({
            act: 'playback',
            msg: {
              name: JSON.stringify(areaShipname)
            }
          }, '*')
          //控制船舶 添加轨迹点
          if (areaShipArr.length != 0) {
            for (var i = 0; i < areaShipArr.length; i++) {
              var theShipName = areaShipArr[i].getProperties()['shipName'];
              if (theShipName == shipElement['shipName']) {
                trackapp.areaShipLayer.layer.getSource().removeFeature(areaShipArr[i]);
              }
            }
          }
          var trackPointLonlat = wgs84ToWebMct(shipElement['longitude'], shipElement['latitude']);
          var trackPointSymbol = HSymbol.getTrackMarker({
            'type': 'trackPoint', 'name': shipElement['shipName'], 'receiveTime': shipElement['receiveTimeString'],
            'speed': shipElement['speed']
          }, trackPointLonlat, [255, 250, 250], [255, 215, 0], 1.5, 5);
          markerSymbol.push(trackPointSymbol);
          var shipSymbol = HShip.getTrackShipSymbol(shipElement, fillColor, lineColor, textColor);
          polygonSymbol.push(shipSymbol);


        }
      });
      trackapp.areaShipLayer.addPolygonSymbol(polygonSymbol);
      trackapp.trackPointLayer.addMarkerSymbol(markerSymbol);
      startTime = midTime;
    } else {
      clearInterval(intplay);
    }
  }, 1000);
}

/**
 * 暂停轨迹播放
 */
function pausePlay() {

}

/**
 * 停止轨迹播放
 */
function stopPlay() {
  clearInterval(intplay);//暂停定时器
  trackapp.areaShipLayer.clear();//清除船舶
  trackapp.trackLineLayer.clear();//清除轨迹线
  trackapp.trackPointLayer.clear();//清除轨迹点
  cleaBox();//清除绘制区域
  trackapp.minLongitude = 0;
  trackapp.minLatitude = 0;
  trackapp.maxLongitude = 0;
  trackapp.maxLatitude = 0;
}

/***************************************区域轨迹业务逻辑结束******************************/

/***************************************历史轨迹业务逻辑开始******************************/

/**
 * 添加历史轨迹
 * @param {String} shipName 船名
 * @param {String} minReceiveTime 最小时间
 * @param {String} maxReceiveTime 最大时间
 */
function addHistoryTrack(shipName, minReceiveTime, maxReceiveTime) {
  trackapp.historyTrackLayer.clear();
  var getUrl = GIS_HISTORYSHIP + "minReceiveTime=" + minReceiveTime + "&" + "maxReceiveTime=" + maxReceiveTime + "&"
    + "shipName=" + shipName + "&type=2";
  $.ajax({
    url: getUrl,
    type: "get",
    dataType: "json",
    async: false,
    success: function (d) {
      var lineSymbol = [];
      var markerSymbol = [];
      var onePositionArray = [];
      if (d.data.dataList.length === 0) {
        alert('信号轨迹数据不存在')
        return
      }
      $.each(d.data.dataList, function (i, item) {
        //添加轨迹点(统一添加) 船名 接收时间 船速和船向
        var lonlat = wgs84ToWebMct(item['longitude'], item['latitude']);
        var trackPointSymbol = HSymbol.getTrackMarker({
          'type': 'trackPoint', 'name': item['shipName'], 'receiveTime': item['receiveTimeString'],
          'speed': item['speed']
        }, lonlat, [255, 250, 250], [255, 215, 0], 1.5, 5);
        onePositionArray.push(lonlat);
        markerSymbol.push(trackPointSymbol);
      });
      //添加轨迹线
      var trackLineSymbol = HSymbol.getLineSymbol({
        'type': 'trackLine',
        'name': 'history'
      }, onePositionArray, [255, 48, 48], 2);
      lineSymbol.push(trackLineSymbol);
      trackapp.historyTrackLayer.addLineSymbol(lineSymbol);
      trackapp.historyTrackLayer.addMarkerSymbol(markerSymbol);

      locateTo("historytrack", "history");
    }
  });
}

/***************************************历史轨迹业务逻辑结束******************************/
