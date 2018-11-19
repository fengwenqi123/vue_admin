exports.host = function host(OPENLAYERS) {
  // var ol = require('./ol.js')
  // var OPENLAYERS = ol.map()
  var app = {};
  var HOST = '192.168.1.126'
  initPage(HOST)

//初始化页面
  function initPage(serverIP) {
    if (serverIP.length > 0) {
      app.baseUrl = 'http://' + serverIP + ':8089/geowebcache/service/wms';
    }
    initMap()
  }

//初始化地图
  function initMap() {
    //投影坐标Web Mercator
    var projection = OPENLAYERS.ol.proj.get('EPSG:3857');
    //全图范围
    var fullExtent = [-20037508.342787, -20037508.342781033, 20037508.342781033, 20037508.342787];
    //切片方案信息(每一级的切片信息，可选择显示级别)
    var resolutions = [156543.03392800014, 78271.51696399994, 39135.75848200009, 19567.87924099992, 9783.93962049996, 4891.96981024998, 2445.98490512499, 1222.992452562495, 611.4962262813797, 305.74811314055756,
      152.87405657041106, 76.43702828507324, 38.21851414253662, 19.10925707126831, 9.554628535634155, 4.77731426794937, 2.388657133974685, 1.1943285668550503, 0.5971642835598172, 0.29858214164761665];
    var tileGrid = new OPENLAYERS.ol.tilegrid.TileGrid({
      tileSize: 256,
      extent: fullExtent,
      resolutions: resolutions
    });

    app.baseLayer = new OPENLAYERS.ol.layer.Tile({
      source: new OPENLAYERS.ol.source.TileWMS({
        url: app.baseUrl,
        params: {'LAYERS': 'hangzhou', format: 'image/png', SRS: 'EPSG:3857'},
        tileGrid: tileGrid
      })
    });
    app.map = new OPENLAYERS.ol.Map({
      target: 'map',
      layers: [app.baseLayer],
      view: new OPENLAYERS.ol.View({
        center: [13377932.61887, 3537887.82851],//地图中心
        zoom: 13,//初始化时展示的级别
        minZoom: 10,
        maxZoom: 15,
        projection: projection,
        extent: fullExtent
      })
    })
  }
}

