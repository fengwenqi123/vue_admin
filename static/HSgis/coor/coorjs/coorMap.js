/**
 * 地图初始化方法【浙江省GIS监管用】
 * created by zj on 2018.7.30
 */

//定义一个地图应用全局变量
var coorapp = {};

$(function(){
	initPage(GIS_HOST);
})

//初始化页面
function initPage(serverIP){
	if(serverIP.length > 0){
		coorapp.baseUrl = serverIP + "/geowebcache/service/wms";
	}
	initMap();
}

//初始化地图
function initMap(){
	//投影坐标Web Mercator
    var projection = ol.proj.get('EPSG:3857');
    //全球范围
    var fullExtent = [-20037508.342787,-20037508.342781033,20037508.342781033,20037508.342787];
    //湖州范围
    var hzExtent=[13314436.183906829,3465152.5383587102,13534505.504637482,3644009.050138296];
    //切片方案信息(每一级的切片信息，可选择显示级别)
    var resolutions = [156543.0339,78271.516953125,39135.7584765625,19567.87923828125,9783.939619140625,4891.9698095703125,2445.9849047851562,
	                   1222.9924523925781,611.4962261962891,305.74811309814453,152.87405654907226,76.43702827453613,38.218514137268066,19.109257068634033,
	                   9.554628534317016,4.777314267158508,2.388657133579254,1.194328566789627,0.5971642833948135];
    var tileGrid = new ol.tilegrid.TileGrid({
        tileSize: 256,
        extent: fullExtent,
        resolutions: resolutions
    });
    
    coorapp.vecLayer = new ol.layer.Tile({
    	title: "电子地图", 
		type: 'DZDT',
        source: new ol.source.TileWMS({
            url: coorapp.baseUrl,
            params: {'LAYERS': 'zjdt', format: 'image/png', SRS: 'EPSG:3857'},
            tileGrid: tileGrid
        })
    });
    
    coorapp.imgLayer = new ol.layer.Tile({
    	title: "卫星影像图", 
		type: 'YXT',
        source: new ol.source.TileWMS({
            url: coorapp.baseUrl,
            params: {'LAYERS': 'zjimg', format: 'image/png', SRS: 'EPSG:3857'},
            tileGrid: tileGrid
        }),
        visible:false
    });
    
    coorapp.hzhdLayer = new ol.layer.Tile({
    	title: "电子航道图", 
		type: 'DZHDT',
        source: new ol.source.TileWMS({
            url: coorapp.baseUrl,
            params: {'LAYERS': '1226hzjt', format: 'image/png', SRS: 'EPSG:3857'},
            tileGrid: tileGrid
        }),
        visible:false
    });
    coorapp.map = new ol.Map({
        target: 'coorMap',
        layers: [coorapp.imgLayer,coorapp.vecLayer,coorapp.hzhdLayer],
        view: new ol.View({
            center: [13369136.8858, 3616007.3454],//湖州
            zoom: 13,//初始化时展示的级别
            minZoom: 9,
            maxZoom: 18,
            projection: projection,
            extent: hzExtent
        }),
        controls: ol.control.defaults().extend([
	        new ol.control.ScaleLine({}),//显示比例尺
	      	new ol.control.MousePosition({
	  			coordinateFormat: ol.coordinate.createStringXY(4),
	  			projection: 'EPSG:4326',
	  			target: document.getElementById('coor')
		  	})
		]),
		logo:false
    });
}

