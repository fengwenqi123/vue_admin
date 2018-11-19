/**
 * 地图初始化方法【浙江省GIS监管用】
 * created by zj on 2018.7.30
 */

//定义一个地图应用全局变量
var app = {};

$(function () {
  initPage(GIS_HOST);
})

//初始化页面
function initPage(serverIP) {
  if (serverIP.length > 0) {
    app.baseUrl = serverIP + "/geowebcache/service/wms";
  }
  initMap();
}

//初始化地图
function initMap() {
  //投影坐标Web Mercator
  var projection = ol.proj.get('EPSG:3857');
  //全球范围
  var fullExtent = [-20037508.342787, -20037508.342781033, 20037508.342781033, 20037508.342787];
  //浙江范围
  var zjExtent = [13125838.183906829, 3161096.5383587102, 13687110.504637482, 3644009.050138296];
  //切片方案信息(每一级的切片信息，可选择显示级别)
  var resolutions = [156543.0339, 78271.516953125, 39135.7584765625, 19567.87923828125, 9783.939619140625, 4891.9698095703125, 2445.9849047851562,
    1222.9924523925781, 611.4962261962891, 305.74811309814453, 152.87405654907226, 76.43702827453613, 38.218514137268066, 19.109257068634033,
    9.554628534317016, 4.777314267158508, 2.388657133579254, 1.194328566789627, 0.5971642833948135];
  var tileGrid = new ol.tilegrid.TileGrid({
    tileSize: 256,
    extent: fullExtent,
    resolutions: resolutions
  });

  app.vecLayer = new ol.layer.Tile({
    title: "电子地图",
    type: 'DZDT',
    source: new ol.source.TileWMS({
      url: app.baseUrl,
      params: {'LAYERS': 'zjdt', format: 'image/png', SRS: 'EPSG:3857'},
      tileGrid: tileGrid
    })
  });

  app.imgLayer = new ol.layer.Tile({
    title: "卫星影像图",
    type: 'YXT',
    source: new ol.source.TileWMS({
      url: app.baseUrl,
      params: {'LAYERS': 'zjimg', format: 'image/png', SRS: 'EPSG:3857'},
      tileGrid: tileGrid
    }),
    visible: false
  });

  app.hzhdLayer = new ol.layer.Tile({
    title: "电子航道图",
    type: 'DZHDT',
    source: new ol.source.TileWMS({
      url: app.baseUrl,
      params: {'LAYERS': '1226hzjt', format: 'image/png', SRS: 'EPSG:3857'},
      tileGrid: tileGrid
    }),
    visible: false
  });
  app.map = new ol.Map({
    target: 'map',
    layers: [app.imgLayer, app.vecLayer, app.hzhdLayer],
    view: new ol.View({
      center: [13369136.8858, 3616007.3454],//湖州
      zoom: 14,//初始化时展示的级别
      minZoom: 9,
      maxZoom: 18,
      projection: projection,
      extent: zjExtent
    }),
    controls: ol.control.defaults().extend([
      new ol.control.ScaleLine({}),//显示比例尺
      new ol.control.MousePosition({
        coordinateFormat: ol.coordinate.createStringXY(4),
        projection: 'EPSG:4326',
        target: document.getElementById('coor')
      })
    ]),
    logo: false
  });

  addInfoLayers(app.map);//增加业务图层
  initMapEvent(app.map); //地图事件

}

/**
 * 增加业务图层方法
 * @param {ol.Map} map
 * @description 页面取用图层时需要添加定时器函数
 */
function addInfoLayers(map) {

  app.flashLayer = new HInfoLayer("flash", 20);//闪烁专用图层

  app.monitorareaLayer = new HInfoLayer("marea", 10);//动态区域布控图层
  app.matouLayer = new HInfoLayer("matou", 10);//码头图层(目前只有点);
  app.shipinLayer = new HInfoLayer("shipin", 10);//监控摄像头图层
  app.aisBasestationLayer = new HInfoLayer("aisBase", 10);//AIS基站图层
  app.vhfBasestationLayer = new HInfoLayer("vhfBase", 10);//VHF基站图层
  app.emergentSourceLayer = new HInfoLayer("support", 10);//紧急物资图层
  app.hszsStationLayer = new HInfoLayer("hszs", 10);//海事站所图层
  app.kakouLayer = new HInfoLayer("kakou", 10);//卡口图层
  app.aisShipLayer = new HInfoLayer("aisship", 10, false);//ais船舶图层
  app.gpsShipLayer = new HInfoLayer("gpsship", 10, false);//gps船舶图层
  app.mixedShipLayer = new HInfoLayer("mixedship", 10);//ais&gps混合船舶图层

  map.addLayer(app.flashLayer.layer);

  map.addLayer(app.monitorareaLayer.layer);
  map.addLayer(app.matouLayer.layer);
  map.addLayer(app.shipinLayer.layer);
  map.addLayer(app.aisBasestationLayer.layer);
  map.addLayer(app.vhfBasestationLayer.layer);
  map.addLayer(app.emergentSourceLayer.layer);
  map.addLayer(app.hszsStationLayer.layer);
  map.addLayer(app.kakouLayer.layer);
  map.addLayer(app.aisShipLayer.layer);
  map.addLayer(app.gpsShipLayer.layer);
  map.addLayer(app.mixedShipLayer.layer);
}

/**
 * 地图事件
 * @param {ol.Map} map
 */
function initMapEvent(map) {
  //地图移动事件(含地图加载完毕后触发事件)
  map.on('moveend', function (e) {
    app.currentExtent = app.map.getView().calculateExtent(app.map.getSize());

    var mapLayers = app.map.getLayers().getArray();
    var theShipLayer;
    for (i = 0; i < mapLayers.length; i++) {
      var layerType = mapLayers[i].getProperties()['type'];
      if (layerType.substr(layerType.length - 4) == 'ship') {
        if (mapLayers[i].getVisible() == true) {
          theShipLayer = mapLayers[i];
          break;
        }
        ;
      }
    }
    //在页面显示当前指定船舶图层中的船舶名称
    getFeatureInExtent(app.currentExtent, theShipLayer, showShipNameIntable);
    //在页面显示当前范围内海事站所名称
    getFeatureInExtent(app.currentExtent, app.hszsStationLayer.layer, showHszsNameIntable);
    //在页面显示当前范围内监控视频名称
    getFeatureInExtent(app.currentExtent, app.shipinLayer.layer, showShipinNameIntable);
    //在页面显示当前范围内救援物资名称
    getFeatureInExtent(app.currentExtent, app.emergentSourceLayer.layer, showSupportNameIntable);
  });
  //鼠标移动事件
  map.on('pointermove', function (e) {
    //判定为要素是鼠标指针变为手形
    var pixel = map.getEventPixel(e.originalEvent);
    var feature = map.forEachFeatureAtPixel(pixel, function (feature) {
      return feature;
    })
    if (feature == undefined) {
      map.getTargetElement().style.cursor = "auto"
    } else {
      map.getTargetElement().style.cursor = "pointer"
    }
  });
}
