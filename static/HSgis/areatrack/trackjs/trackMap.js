/**
 * 地图初始化方法【浙江省GIS监管用】
 * created by zj on 2018.7.30
 */

//定义一个地图应用全局变量
var trackapp = {};

$(function () {
  initPage(GIS_HOST);
})

//初始化页面
function initPage(serverIP) {
  if (serverIP.length > 0) {
    trackapp.baseUrl = serverIP + "/geowebcache/service/wms";
  }
  initMap();
}

//初始化地图
function initMap() {
  //投影坐标Web Mercator
  var projection = ol.proj.get('EPSG:3857');
  //全球范围
  var fullExtent = [-20037508.342787, -20037508.342781033, 20037508.342781033, 20037508.342787];
  //湖州范围
  var hzExtent = [13314436.183906829, 3465152.5383587102, 13534505.504637482, 3644009.050138296];
  //切片方案信息(每一级的切片信息，可选择显示级别)
  var resolutions = [156543.0339, 78271.516953125, 39135.7584765625, 19567.87923828125, 9783.939619140625, 4891.9698095703125, 2445.9849047851562,
    1222.9924523925781, 611.4962261962891, 305.74811309814453, 152.87405654907226, 76.43702827453613, 38.218514137268066, 19.109257068634033,
    9.554628534317016, 4.777314267158508, 2.388657133579254, 1.194328566789627, 0.5971642833948135];
  var tileGrid = new ol.tilegrid.TileGrid({
    tileSize: 256,
    extent: fullExtent,
    resolutions: resolutions
  });

  trackapp.vecLayer = new ol.layer.Tile({
    title: "电子地图",
    type: 'DZDT',
    source: new ol.source.TileWMS({
      url: trackapp.baseUrl,
      params: {'LAYERS': 'zjdt', format: 'image/png', SRS: 'EPSG:3857'},
      tileGrid: tileGrid
    })
  });

  trackapp.imgLayer = new ol.layer.Tile({
    title: "卫星影像图",
    type: 'YXT',
    source: new ol.source.TileWMS({
      url: trackapp.baseUrl,
      params: {'LAYERS': 'zjimg', format: 'image/png', SRS: 'EPSG:3857'},
      tileGrid: tileGrid
    }),
    visible: false
  });

  trackapp.hzhdLayer = new ol.layer.Tile({
    title: "电子航道图",
    type: 'DZHDT',
    source: new ol.source.TileWMS({
      url: trackapp.baseUrl,
      params: {'LAYERS': '1226hzjt', format: 'image/png', SRS: 'EPSG:3857'},
      tileGrid: tileGrid
    }),
    visible: false
  });
  trackapp.map = new ol.Map({
    target: 'trackMap',
    layers: [trackapp.imgLayer, trackapp.vecLayer, trackapp.hzhdLayer],
    view: new ol.View({
      center: [13369136.8858, 3616007.3454],//湖州
      zoom: 14,//初始化时展示的级别
      minZoom: 9,
      maxZoom: 18,
      projection: projection,
      extent: hzExtent
    }),
    controls: ol.control.defaults().extend([
      new ol.control.ScaleLine({}),//显示比例尺
      new ol.control.MousePosition({
        coordinateFormat: ol.coordinate.createStringXY(4),
        projection: 'EPSG:4326'
      })
    ]),
    logo: false
  });
  addInfoLayers(trackapp.map);//增加业务图层
  initMapEvent(trackapp.map);//增加地图事件
}


/**
 * 增加业务图层方法
 * @param {ol.Map} map
 * @description 页面取用图层时需要添加定时器函数
 */
function addInfoLayers(map) {
  trackapp.areaShipLayer = new HInfoLayer("areaShip", 100);//区域轨迹船舶图层
  trackapp.trackLineLayer = new HInfoLayer("trackLine", 100, false);//区域轨迹线图层
  trackapp.trackPointLayer = new HInfoLayer("trackPoint", 100, false);//区域轨迹点图层
  trackapp.historyTrackLayer = new HInfoLayer("historytrack", 100);//历史轨迹图层

  map.addLayer(trackapp.trackLineLayer.layer);
  map.addLayer(trackapp.trackPointLayer.layer);
  map.addLayer(trackapp.areaShipLayer.layer);
  map.addLayer(trackapp.historyTrackLayer.layer);
}

/**
 * 地图事件
 * @param {ol.Map} map
 */
function initMapEvent(map) {
  //不支持JQuery对象
  var container = document.getElementById("popup");
  var content = document.getElementById("popup-content");
  var popupCloser = document.getElementById("popup-closer");
  var overlay = new ol.Overlay({
    element: container,
    autoPan: true
  });
  map.on('click', function (e) {
    var pixel = map.getEventPixel(e.originalEvent);
    map.forEachFeatureAtPixel(pixel, function (feature) {
      var property = feature.getProperties();
      var propertyType = property['type'];
      switch (propertyType) {
        case 'trackPoint':
          var shipName = property['name'];
          var time = property['receiveTime'];
          var shipSpeed = property['speed'];
          var shipDirection = property['direction'];
          var coodinate = e.coordinate;
          content.innerHTML =
            "船名:" + shipName + "</br>" +
            "航速:" + shipSpeed + "节</br>" +
            "接收时间:" + time + "</br>"
          overlay.setPosition(coodinate);
          map.addOverlay(overlay);//不会出现多个弹出图层叠加(即切换点击时只有一个弹出层)
          break;
        default:
          break;
      }
    });
  });

  map.on('pointermove', function (e) {
    //判定为要素是鼠标指针变为手形
    var pixel = map.getEventPixel(e.originalEvent);
    map.forEachFeatureAtPixel(pixel, function (feature) {
      var property = feature.getProperties();
      var propertyType = property['type'];
      switch (propertyType) {
        case 'trackPoint':
          map.getTargetElement().style.cursor = "pointer";
          break;
        default:
          map.getTargetElement().style.cursor = "auto";
          break;
      }
    });
  });
  popupCloser.addEventListener('click', function () {
    overlay.setPosition(undefined);
  });
}

