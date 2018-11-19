/**
 * GIS业务js
 * created by zj on 2018.8.30
 */

/*******************************************要素获取及展示方法开始****************************************/
/**
 * 分层加载要素数据
 * @param {String} type 加载业务要素类型
 * @description 除船舶图层外,其他要素初始化时顺次添加一次
 */
function loadInfoLayer(type) {
  if ((type == null || type == "marea") && app.monitorareaLayer) loadMonitorArea();
  if ((type == null || type == "shipin") && app.shipinLayer) loadShipin();
  if ((type == null || type == "aisBase") && app.aisBasestationLayer) loadAISBasestation();
  if ((type == null || type == "vhfBase") && app.vhfBasestationLayer) loadVHFBasestation();
  if ((type == null || type == "matou") && app.matouLayer) loadMatou();
  if ((type == null || type == "support") && app.emergentSourceLayer) loadSupport();
  if ((type == null || type == "hszs") && app.hszsStationLayer) loadHszs();
  if ((type == null || type == "kakou") && app.kakouLayer) loadKakou();
}

/**
 * 加载动态布控区域
 */
function loadMonitorArea() {
  try {
    $.ajax({
      url: GIS_SERVERIP + "/area/custom/?order=name&pageSize=10000",
      type: "get",
      dataType: "json",
      async: true,
      success: function (d) {
        var areadata = d.data.dataList
        var polygonSymbol = [];
        app.monitorareaLayer.clear();
        $.each(areadata, function (i, item) {
          var mareaAttr = {
            'type': 'marea',
            'name': item.name
          }
          if (item.area != null && item.area != '') {
            var areaObj = JSON.parse(item.area);
            var areaPoints = areaObj.pointList;
            var points = [];
            for (i = 0; i < areaPoints.length; i++) {
              var lonlat = wgs84ToWebMct(areaPoints[i].x, areaPoints[i].y);
              points.push(lonlat);
            }
            var mareaSymbol = HSymbol.getPolygonSymbol(mareaAttr, [points], [255, 255, 255, 0.5], [128, 0, 128], 2, false, mareaAttr['name'], 16, [255, 48, 48]);
            polygonSymbol.push(mareaSymbol)
          }
        });
        app.monitorareaLayer.addPolygonSymbol(polygonSymbol);
      }
    });
  } catch (e) {
    console.log(e.name + ":" + e.message);
  }
}

/**
 * 加载卡口
 */
function loadKakou() {
  try {
    $.ajax({
      url: GIS_SERVERIP + "/inspection/crosssection/list",
      type: "get",
      dataType: "json",
      async: true,
      success: function (d) {
        var markerSymbol = [];
        app.kakouLayer.clear();
        $.each(d.data, function (i, item) {
          var kakouAttr = {
            'type': 'kakou',
            'name': item.name,
            'code': item.code,
            'id': item.id
          };
          var lonlat = wgs84ToWebMct(item.longitude, item.latitude);
          var kakouSymbol = HSymbol.getPictureMarkerSymbol(kakouAttr, lonlat, 'img/kakou.png', 0.7, kakouAttr['name'], 14, [0, 0, 0], -20, -20);
          markerSymbol.push(kakouSymbol);
        });
        app.kakouLayer.addMarkerSymbol(markerSymbol);
      }
    });
  } catch (e) {
    console.log(e.name + ":" + e.message);
  }
}

/**
 * 加载海事站所
 */
function loadHszs() {
  try {
    $.ajax({
      url: GIS_SERVERIP + "/gis/station/list",
      type: "get",
      dataType: "json",
      async: true,
      success: function (d) {
        var markerSymbol = [];
        app.hszsStationLayer.clear();
        $.each(d.data, function (i, item) {
          if (i != 103 && i != 104 && i != 105 && i != 106 && i != 107 && i != 108) {
            var hszsAttr = {
              'type': 'hszs',
              'name': item.name,
              'id': item.id
            };
            var lonlat = wgs84ToWebMct(item.longitude, item.latitude);
            var hszsSymbol = HSymbol.getPictureMarkerSymbol(hszsAttr, lonlat, 'img/hszs.png', 0.7, hszsAttr['name'], 14, [0, 0, 0], -20, -20);
            markerSymbol.push(hszsSymbol);
          }
        });
        app.hszsStationLayer.addMarkerSymbol(markerSymbol);
      }
    });
  } catch (e) {
    console.log(e.name + ":" + e.message);
  }
}

/**
 * 加载紧急物资
 */
function loadSupport() {
  try {
    $.ajax({
      url: GIS_SERVERIP + "/gis/emergencyResource/list",
      type: "get",
      dataType: "json",
      async: true,
      success: function (d) {
        var markerSymbol = [];
        app.emergentSourceLayer.clear();
        $.each(d.data, function (i, item) {
          var supportAttr = {
            'type': 'support',
            'name': item.siteName,
            'id': item.id
          };
          var lonlat = wgs84ToWebMct(item.longitude, item.latitude);
          var supportSymbol = HSymbol.getPictureMarkerSymbol(supportAttr, lonlat, 'img/support.png', 0.7, supportAttr['name'], 14, [0, 0, 0], -30, -20);
          markerSymbol.push(supportSymbol);
        });
        app.emergentSourceLayer.addMarkerSymbol(markerSymbol);
      }
    });
  } catch (e) {
    console.log(e.name + ":" + e.message);
  }
}

/**
 * 加载码头
 */
function loadMatou() {
  try {
    $.ajax({
      url: GIS_SERVERIP + "/gis/pier/list",
      type: "get",
      dataType: "json",
      async: true,
      success: function (d) {
        var markerSymbol = [];
        app.matouLayer.clear();
        $.each(d.data, function (i, item) {
          var matouAttr = {
            'type': 'matou',
            'name': item.shortName,
            'id': item.id
          };
          var lonlat = wgs84ToWebMct(item.longitude, item.latitude);
          var matouSymbol = HSymbol.getPictureMarkerSymbol(matouAttr, lonlat, 'img/matou.png', 0.7, matouAttr['name'], 14, [0, 0, 0], -50, -20);
          markerSymbol.push(matouSymbol);
        });
        app.matouLayer.addMarkerSymbol(markerSymbol);
      }
    });
  } catch (e) {
    console.log(e.name + ":" + e.message);
  }
}

/**
 * 加载VHF基站
 */
function loadVHFBasestation() {
  try {
    $.ajax({
      url: GIS_SERVERIP + "/gis/vhfStation/list",
      type: "get",
      dataType: "json",
      async: true,
      success(d) {
        var markerSymbol = [];
        app.aisBasestationLayer.clear();
        $.each(d.data, function (i, item) {
          var vhfBasestationAttr = {
            'type': 'vhfBase',
            'name': item.name,
            'id': item.id
          };
          var lonlat = wgs84ToWebMct(item.longitude, item.latitude);
          var vhfBasestationSymbol = HSymbol.getPictureMarkerSymbol(vhfBasestationAttr, lonlat, 'img/VHFstation.png', 0.7);
          markerSymbol.push(vhfBasestationSymbol);
        });
        app.vhfBasestationLayer.addMarkerSymbol(markerSymbol);
      }
    });
  } catch (e) {
    console.log(e.name + ":" + e.message);
  }
}

/**
 * 加载AIS基站
 */
function loadAISBasestation() {
  try {
    $.ajax({
      url: GIS_SERVERIP + "/gis/aisStation/list",
      type: "get",
      dataType: "json",
      async: true,
      success: function (d) {
        var markerSymbol = [];
        app.aisBasestationLayer.clear();
        $.each(d.data, function (i, item) {
          var aisBasestationAttr = {
            'type': 'aisBase',
            'name': item.name,
            'id': item.id
          };
          var lonlat = wgs84ToWebMct(item.lon, item.lat);
          var aisBasestationSymbol = HSymbol.getPictureMarkerSymbol(aisBasestationAttr, lonlat, 'img/AISstation.png', 0.7);
          markerSymbol.push(aisBasestationSymbol);
        });
        app.aisBasestationLayer.addMarkerSymbol(markerSymbol);
      }
    });
  } catch (e) {
    console.log(e.name + ":" + e.message);
  }
}

/**
 * 加载监控摄像头
 */
function loadShipin() {
  try {
    app.shipinLayer.clear();
    $.ajax({
      url: GIS_SERVERIP + "/gis/videoSurveillance/list",
      type: "get",
      dataType: "json",
      async: true,
      success: function (d) {
        var markerSymbol = [];
        $.each(d.data, function (i, item) {
          var shipinAttr = {
            'type': 'shipin',
            'name': item.name,
            'id': item.id,
            'rtmp': item.rtmp
          };
          var lonlat = wgs84ToWebMct(item.longitude, item.latitude);
          var videoSymbol = HSymbol.getPictureMarkerSymbol(shipinAttr, lonlat, 'img/video.png', 0.7, shipinAttr['name'], 14, [0, 0, 0], 15, 1);
          markerSymbol.push(videoSymbol);
        });
        app.shipinLayer.addMarkerSymbol(markerSymbol);
      }
    });
  } catch (e) {
    console.log(e.name + ":" + e.message);
  }
}

/**
 * 加载船舶
 */
function loadShip() {
  try {
    //MIXED
    $.ajax({
      url: GIS_SERVERIP + "/gps/position/latestPos",
      type: "get",
      dataType: "json",
      async: true,
      success: function (d) {
        app.GIS_MIXED = [];
        app.obj = []
        var polygonSymbol = [];
        var fillColor; //= [0,200,0];//普通船舶 黄色填充
        var lineColor; //= [0,0,205];//AIS蓝边
        var shipSymbol;
        var textColor = [0, 200, 0];//船名颜色
        app.mixedShipLayer.clear();
        $.each(d.data, function (i, item) {
          var shipAttr = {
            'type': 'mixedship',
            'name': item.shipName,
            'lon': item.longitude,
            'lat': item.latitude,
            'speed': item.speed,
            'direction': item.direction,
            'headDirection': item.headDirection,
            'message': item.no,
            'shipType': item.shipType,
            'receiveTime': item.receiveTimeString
          };
          app.GIS_MIXED.push([item.longitude, item.latitude]);
          app.obj.push(item)
          if (item.shipType == 1) {
            fillColor = [255, 255, 0];//客船黄色红框
            lineColor = [255, 0, 0];
            shipSymbol = HShip.getShipSymbol(shipAttr, fillColor, lineColor, textColor);
          } else if (item.shipType == 2) {
            fillColor = [0, 200, 0];//货船绿色黑框
            lineColor = [0, 0, 0];
            shipSymbol = HShip.getShipSymbol(shipAttr, fillColor, lineColor, textColor);
          } else if (item.shipType == 3) {
            fillColor = [255, 0, 0];//危险品红色黄框
            lineColor = [255, 255, 0];
            shipSymbol = HShip.getShipSymbol(shipAttr, fillColor, lineColor, textColor);
          } else if (item.shipName.substr(0, 3) == '浙海巡') {
            fillColor = [1, 87, 155];//海巡艇蓝色黑框
            lineColor = [0, 0, 0];
            shipSymbol = HShip.getShipSymbol(shipAttr, fillColor, lineColor, textColor);
          } else {
            fillColor = [255, 255, 255];//未知名和其他白色黑框
            lineColor = [0, 0, 0];
            shipSymbol = HShip.getShipSymbol(shipAttr, fillColor, lineColor, textColor);
          }
          polygonSymbol.push(shipSymbol);
        });
        parent.postMessage({
          act: 'ship',
          msg: {
            name: JSON.stringify(app.obj)
          }
        }, '*')
        app.mixedShipLayer.addPolygonSymbol(polygonSymbol);
        loadgps();
      }
    });

    //GPS
    function loadgps() {
      $.ajax({
        url: GIS_SERVERIP + "/gps/position/gps",
        type: "get",
        dataType: "json",
        async: true,
        success: function (d) {
          app.GIS_GPS = [];
          var polygonSymbol = [];
          var fillColor; //= [0,200,0];//普通船舶 黄色填充
          var lineColor; //= [0,0,205];//AIS蓝边
          var shipSymbol;
          var textColor = [0, 200, 0];//船名颜色
          app.gpsShipLayer.clear();
          $.each(d.data, function (i, item) {
            var shipAttr = {
              'type': 'gpsship',
              'name': item.shipName,
              'lon': item.longitude,
              'lat': item.latitude,
              'speed': item.speed,
              'direction': item.direction,
              'headDirection': item.headDirection,
              'message': item.no,
              'shipType': item.shipType,
              'receiveTime': item.receiveTimeString
            };
            app.GIS_GPS.push([item.longitude, item.latitude]);
            if (item.shipType == 1) {
              fillColor = [255, 255, 0];//客船黄色红框
              lineColor = [255, 0, 0];
              shipSymbol = HShip.getShipSymbol(shipAttr, fillColor, lineColor, textColor);
            } else if (item.shipType == 2) {
              fillColor = [0, 200, 0];//货船绿色黑框
              lineColor = [0, 0, 0];
              shipSymbol = HShip.getShipSymbol(shipAttr, fillColor, lineColor, textColor);
            } else if (item.shipType == 3) {
              fillColor = [255, 0, 0];//危险品红色黄框
              lineColor = [255, 255, 0];
              shipSymbol = HShip.getShipSymbol(shipAttr, fillColor, lineColor, textColor);
            } else if (item.shipName.substr(0, 3) == '浙海巡') {
              fillColor = [1, 87, 155];//海巡艇蓝色黑框
              lineColor = [0, 0, 0];
              shipSymbol = HShip.getShipSymbol(shipAttr, fillColor, lineColor, textColor);
            } else {
              fillColor = [255, 255, 255];//未知名和其他白色黑框
              lineColor = [0, 0, 0];
              shipSymbol = HShip.getShipSymbol(shipAttr, fillColor, lineColor, textColor);
            }
            polygonSymbol.push(shipSymbol);
          });
          app.gpsShipLayer.addPolygonSymbol(polygonSymbol);
          loadais();
        }
      });
    }

    //AIS
    function loadais() {
      $.ajax({
        url: GIS_SERVERIP + "/gps/position/ais",
        type: "get",
        dataType: "json",
        async: true,
        success: function (d) {
          app.GIS_AIS = [];
          var polygonSymbol = [];
          var fillColor;
          var lineColor;
          var shipSymbol;
          var textColor = [0, 200, 0];//船名颜色
          app.aisShipLayer.clear();
          $.each(d.data, function (i, item) {
            var shipAttr = {
              'type': 'aisship',
              'name': item.shipName,
              'lon': item.longitude,
              'lat': item.latitude,
              'speed': item.speed,
              'direction': item.direction,
              'headDirection': item.headDirection,
              'message': item.no,
              'shipType': item.shipType,
              'receiveTime': item.receiveTimeString
            };
            app.GIS_AIS.push([item.longitude, item.latitude]);
            if (item.shipType == 1) {
              fillColor = [255, 255, 0];//客船黄色红框
              lineColor = [255, 0, 0];
              shipSymbol = HShip.getShipSymbol(shipAttr, fillColor, lineColor, textColor);
            } else if (item.shipType == 2) {
              fillColor = [0, 200, 0];//货船绿色黑框
              lineColor = [0, 0, 0];
              shipSymbol = HShip.getShipSymbol(shipAttr, fillColor, lineColor, textColor);
            } else if (item.shipType == 3) {
              fillColor = [255, 0, 0];//危险品红色黄框
              lineColor = [255, 255, 0];
              shipSymbol = HShip.getShipSymbol(shipAttr, fillColor, lineColor, textColor);
            } else if (item.shipName.substr(0, 3) == '浙海巡') {
              fillColor = [1, 87, 155];//海巡艇蓝色黑框
              lineColor = [0, 0, 0];
              shipSymbol = HShip.getShipSymbol(shipAttr, fillColor, lineColor, textColor);
            } else {
              fillColor = [255, 255, 255];//未知名和其他白色黑框
              lineColor = [0, 0, 0];
              shipSymbol = HShip.getShipSymbol(shipAttr, fillColor, lineColor, textColor);
            }
            polygonSymbol.push(shipSymbol);
          });
          app.aisShipLayer.addPolygonSymbol(polygonSymbol);
        }
      });
    }
  } catch (e) {
    console.log(e.name + ":" + e.message);
  }
}

/**
 * 在地图页面显示当前指定船舶图层中的船舶要素
 * @param {Array[]} shipFeatures 获取到的船舶要素数组
 */
function showShipNameIntable(shipFeatures) {
  if (shipFeatures.length != 0) {
    var shipType = shipFeatures[0].getProperties()['type'];// 船舶图层类型（定位用）'aisship','gpsship','mixedship'
    var shipNames = [];
    for (i = 0; i < shipFeatures.length; i++) {
      var shipName = shipFeatures[i].getProperties()['name'];//单个船舶要素船名
      shipNames.push(shipName)
    }
    parent.postMessage({
      act: 'shipNames',
      msg: {
        name: JSON.stringify(shipNames),
        type: shipType
      }
    }, '*')
    // console.log(shipType);
    // console.log(shipNames);
  }
}

/**
 *在地图页面显示当前范围内的海事站所
 * @param {Array[]} hszsFeatures
 */
function showHszsNameIntable(hszsFeatures) {
  if (hszsFeatures.length != 0) {
    var hszsType = hszsFeatures[0].getProperties()['type'];// 海事站所图层 'hszs'
    var hszsNames = [];
    for (i = 0; i < hszsFeatures.length; i++) {
      var hszsName = hszsFeatures[i].getProperties()['name'];//单个海市站所要素船名
      hszsNames.push(hszsName)
    }
    parent.postMessage({
      act: 'hszsNames',
      msg: {
        name: JSON.stringify(hszsNames),
        type: hszsType
      }
    }, '*')
  }
}

/**
 *在地图页面显示当前范围内的监控视频
 * @param {Array[]} shipinFeatures
 */
function showShipinNameIntable(shipinFeatures) {
  if (shipinFeatures.length != 0) {
    var shipinType = shipinFeatures[0].getProperties()['type'];// 监控视频图层 'shipin'
    var shipinNames = [];
    for (i = 0; i < shipinFeatures.length; i++) {
      var shipinName = shipinFeatures[i].getProperties()['name'];//单个监控视频要素名称
      shipinNames.push(shipinName)
    }
    parent.postMessage({
      act: 'jksp',
      msg: {
        name: JSON.stringify(shipinNames),
        type: shipinType
      }
    }, '*')
    // console.log(shipinType);
    // console.log(shipinNames);
  }
}

/**
 *在地图页面显示当前范围内的救援物资
 * @param {Array[]} supportFeatures
 */
function showSupportNameIntable(supportFeatures) {
  if (supportFeatures.length != 0) {
    var supportType = supportFeatures[0].getProperties()['type'];// 紧急物资图层 'support'
    var supportNames = [];
    for (i = 0; i < supportFeatures.length; i++) {
      var supportName = supportFeatures[i].getProperties()['name'];//单个紧急物资要素名称
      supportNames.push(supportName)
    }
    parent.postMessage({
      act: 'support',
      msg: {
        name: JSON.stringify(supportNames),
        type: supportType
      }
    }, '*')
    // console.log(supportType);
    // console.log(supportNames);
  }
}

/*******************************************要素获取及展示方法结束****************************************/

/*******************************************业务公用GIS方法开始****************************************/


/**
 * 公用弹出框显示方法
 * @param {ol.Map} map
 */
function showPopup(map) {
  try {
    map.on('click', function (e) {
      var pixel = app.map.getEventPixel(e.originalEvent);
      map.forEachFeatureAtPixel(pixel, function (feature) {
        var property = feature.getProperties();
        var propertyType = property['type'];
        var obj = {};
        obj.shipName = property['name']
        obj.shipLon = property['lon']
        obj.shipLat = property['lat']
        obj.shipSpeed = property['speed']
        obj.shipDirection = property['direction']
        obj.shipheadDirection = property['headDirection']
        obj.shipMessage = 'GPS' + property['message']
        obj.receiveTime = property['receiveTime']
        switch (propertyType) {
          case 'aisship':
            parent.postMessage({
              act: 'shipManage',
              msg: {
                name: property['name'],
                aisClass: obj
              }
            }, '*')
            break;
          case 'gpsship':
            parent.postMessage({
              act: 'shipManage',
              msg: {
                name: property['name'],
                aisClass: obj
              }
            }, '*')
            break;
          case 'mixedship':
            parent.postMessage({
              act: 'shipManage',
              msg: {
                name: property['name'],
                aisClass: obj
              }
            }, '*')
            break;
          case 'shipin':
            console.log("视频名称:" + property['name']);
            console.log("播放地址:" + property['rtmp']);
            console.log("id:" + property['id']);
            parent.postMessage({
              act: 'rtmp',
              msg: {
                name: property['name'],
                rtmp: property['rtmp']
              }
            }, '*')
            break;
          case 'aisBase':
            console.log("AIS基站名称:" + property['name']);
            console.log("id:" + property['id']);
            parent.postMessage({
              act: 'aisName',
              msg: {
                name: property['name'],
                id: property['id']
              }
            }, '*')
            break;
          case 'vhfBase':
            console.log("VHF基站名称:" + property['name']);
            console.log("id:" + property['id']);
            parent.postMessage({
              act: 'vhfName',
              msg: {
                name: property['name'],
                id: property['id']
              }
            }, '*')
            break;
          case 'matou':
            console.log("码头名称:" + property['name']);
            console.log("id:" + property['id']);
            parent.postMessage({
              act: 'matouName',
              msg: {
                name: property['name'],
                id: property['id']
              }
            }, '*')
            break;
          case 'support':
            console.log("救援点名称:" + property['name']);
            console.log("id:" + property['id']);
            parent.postMessage({
              act: 'wzcb',
              msg: {
                name: property['name'],
                id: property['id']
              }
            }, '*')
            break;
          case 'hszs':
            console.log("海事站所名称:" + property['name']);
            console.log("id:" + property['id']);
            parent.postMessage({
              act: 'hszs',
              msg: {
                name: property['name'],
                id: property['id']
              }
            }, '*')
            break;
          case 'kakou':
            console.log("卡口名称:" + property['name']);
            console.log("卡口编号:" + property['code']);
            console.log("id:" + property['id']);
            parent.postMessage({
              act: 'kakou',
              msg: {
                name: property['name'],
                code: property['code'],
                id: property['id']
              }
            }, '*')
          default:
            break;
        }
      });
    });
  } catch (e) {
    console.log(e.name + ":" + e.message);
  }
}

/*******************************************业务公用GIS方法结束****************************************/

/********************************************页面点击事件开始******************************************/
/**
 * 抵达时间
 * @description 海巡救援
 */
function calArriveTime() {
  var shipSpeed = parseInt($("#hxSpeed").val().split("km/h")[0]);

  var source = new ol.source.Vector();
  var vector = new ol.layer.Vector({
    type: "draw",
    source: source,
    style: new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: [255, 69, 0],
        width: 3
      }),
    })
  });
  app.map.addLayer(vector);
  var GIS_DISMEASURE;
  //开始绘制
  GIS_DISMEASURE = new ol.interaction.Draw({
    source: source,
    type: 'LineString',
    style: new ol.style.Style({
      image: new ol.style.Circle({
        radius: 5,
        fill: new ol.style.Fill({
          color: [255, 255, 255, 0.5]
        }),
        stroke: new ol.style.Stroke({
          color: [255, 69, 0],
          width: 1.5
        })
      }),
      stroke: new ol.style.Stroke({
        color: [255, 69, 0],
        width: 2,
        lineDash: [10, 10]
      })
    })
  });
  GIS_DISMEASURE.on('drawstart',
    function (evt) {
      var fea = evt.feature;               //绘制的要素
      fea.getGeometry().on('change', function (evt) {         //鼠标在移动的时候执行
        var geom = evt.target;
        if (geom instanceof ol.geom.LineString) {
          var distance = formatLength(geom);
          var time = finaltime(distance, shipSpeed);
        }
        $("#arriveTime").attr("value", time);
      });
    }, this);
  GIS_DISMEASURE.on('drawend', function (evt) {
    app.map.removeInteraction(GIS_DISMEASURE);
  }, this);
  app.map.addInteraction(GIS_DISMEASURE);
}

/**
 *显示报警
 * @param {Number} lon
 * @param {Number} lat
 * @param {String} alarmID
 */
function showAlarmPoint(lon, lat, alarmID) {
  $("#css_animation").css("display", "block");
  pointTo(lon, lat);
  var flashFeatures = app.flashLayer.layer.getSource().getFeatures();
  if (flashFeatures.length != 0) {
    for (i = 0; i < flashFeatures.length; i++) {
      var flashFeatureID = flashFeatures[i].getProperties()['id'];
      if (flashFeatureID == alarmID) {
        app.flashLayer.layer.getSource().removeFeature(flashFeatures[i]);
      }
    }
  }
  addFlashMarker(lon, lat, alarmID);
}

/**
 *解除报警
 * @param {String} alarmID
 */
function removeAlarmPoint(alarmID) {
  $("#css_animation").css("display", "none");
  var flashFeatures = app.flashLayer.layer.getSource().getFeatures();
  if (flashFeatures.length != 0) {
    for (i = 0; i < flashFeatures.length; i++) {
      var flashFeatureID = flashFeatures[i].getProperties()['id'];
      if (flashFeatureID == alarmID) {
        app.flashLayer.layer.getSource().removeFeature(flashFeatures[i]);
      }
    }
  }
}

/**
 * 定位信号设置
 * objS 获得下拉框元素
 * sign 得到下拉框选中的对象，默认是AIS，即只显示AIS信号船只。
 */
function signChange(sign) {
  // var objS = document.getElementById("sign");
  // var sign = objS.options[objS.selectedIndex].value
  if (sign == "AIS") {
    showInfoLayer('aisship', true);
    showInfoLayer('gpsship', false);
    showInfoLayer('mixedship', false);
    showInfoLayer('initshipAIS', true);
    showInfoLayer('initshipGPS', false);
    showInfoLayer('initshipMIXED', false);
    getFeatureInExtent(app.currentExtent, app.aisShipLayer.layer, showShipNameIntable);
  } else if (sign == "GPS") {
    showInfoLayer('aisship', false);
    showInfoLayer('gpsship', true);
    showInfoLayer('mixedship', false);
    showInfoLayer('initshipAIS', false);
    showInfoLayer('initshipGPS', true);
    showInfoLayer('initshipMIXED', false);
    getFeatureInExtent(app.currentExtent, app.gpsShipLayer.layer, showShipNameIntable);
  } else {
    showInfoLayer('aisship', false);
    showInfoLayer('gpsship', false);
    showInfoLayer('mixedship', true);
    showInfoLayer('initshipAIS', false);
    showInfoLayer('initshipGPS', false);
    showInfoLayer('initshipMIXED', true);
    getFeatureInExtent(app.currentExtent, app.mixedShipLayer.layer, showShipNameIntable);
  }
}

/**
 * 显示电子地图
 */
function openDZDT() {
  showInfoLayer('DZDT', true);
  showInfoLayer('YXT', false);
}

/**
 * 显示卫星影像图
 */
function openYXT() {
  showInfoLayer('YXT', true);
  showInfoLayer('DZDT', false);
}

/**
 * 显示和隐藏电子航道图
 * @description name属性open表示显示电子地图;close表示隐藏电子地图
 */
function closeDZHDT() {
  var temp = document.getElementById('DZHDT').name
  if (temp == "open") {
    showInfoLayer('DZHDT', false);
    $("#DZHDT").attr("name", "close");
  }
  if (temp == "close") {
    showInfoLayer('DZHDT', true);
    $("#DZHDT").attr("name", "open");
  }
}

/**
 * 要素图层控制
 */
//全选 全不选
$("#checkAll").click(
  function () {
    $("[name=checks]").prop("checked", $(this).prop("checked"));
    $("[name=checks]").change();
  }
)

//单个要素显示
$("[name=checks]").change(function () {
  var val = $(this).val();
  var isShow = $(this).prop("checked");
  showInfoLayer(val, isShow);
})

//快速定位
//杭州  pointTo(120.185,30.276)
//湖州  pointTo(120.097,30.870)

/**
 * 新窗口中弹出子页面
 * @param {String} url 链接
 * @param {String} 窗口样式
 */
function openWindow(url, styleParameter) {
  window.open(url, '_blank', styleParameter);
}

/********************************************页面点击事件结束******************************************/
