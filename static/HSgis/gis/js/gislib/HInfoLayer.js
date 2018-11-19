/**
 * 要素图层类(ol.layer.Vector)
 * @param {String} type 图层类型【必需】
 * @param {Number} scale 最大显示分辨率(需要研究层级和显示分辨率的关系)
 * @param {Boolean} isVisible 图层是否显示
 * created by zj on 2018.7.30
 */

function HInfoLayer(type,scale,isVisible){
    this.scale = scale;
    this.layer = new ol.layer.Vector({
    	source : new ol.source.Vector(),
    	type:type,
    	visible:isVisible?true:isVisible
    });
} 

/**
 * 要素图层中添加点(点标记或点图片)
 * @param {Array[ol.feature]} marker 参数是一个marker数组
 */
HInfoLayer.prototype.addMarkerSymbol = function(marker){
	this.layer.getSource().addFeatures(marker);
	this.layer.setMaxResolution(this.scale);
}

/**
 * 要素图层中添加线
 * @param {Array[ol.feature]} line 线数组
 */
HInfoLayer.prototype.addLineSymbol = function(line){
	this.layer.getSource().addFeatures(line);
	this.layer.setMaxResolution(this.scale);
}

/**
 * 要素图层中添加面
 * @param {Array[ol.feature]} polygon 面数组
 */
HInfoLayer.prototype.addPolygonSymbol = function(polygon){
	this.layer.getSource().addFeatures(polygon);
	this.layer.setMaxResolution(this.scale);
}

/**
 * 要素图层添加文字标签
 * @param {Array[ol.feature]} lableSymbol 文字标签数组
 */
HInfoLayer.prototype.addLableSymbol = function(lableSymbol){
    this.layer.getSource().addFeatures(lableSymbol);
	this.layer.setMaxResolution(this.scale);
}

/*
 * 清除图层中的要素
 */
HInfoLayer.prototype.clear = function(){
	this.layer.getSource().clear();
}


