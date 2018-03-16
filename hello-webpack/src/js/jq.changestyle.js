import $ from jQuery;
$.fn.changeStyle = function(colorStr){
  this.css('color', colorStr);
}