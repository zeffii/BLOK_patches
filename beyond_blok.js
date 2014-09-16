var data, downscale, group1, items_wide, num_patches, prefix, psize, rect_style, style_one, svg, tb, tile;

// either early onset dementia or rusty, either way - scary.

prefix = "https://raw.githubusercontent.com/zeffii/BLOK_patches/master/";


// data = tributary.cardamon;

d3.json("cardamon.json", function(data) {
    data = data;
    num_patches = data.images.length;
    items_wide = Math.floor(Math.sqrt(num_patches));
    console.log(num_patches)
    draw_content(data)
});



psize = 50;
downscale = 0.988;

style_one = {fill: '#5f22ae', stroke: '#e0e0e0', 'stroke-width': 1};
rect_style = {fill: "#a2d1e5", stroke: "#e1e1ee", 'stroke-width': 1.3708};

d3.select("body").style("background-color", rgb(219,219,219))

var svg = d3.select("svg");
var blok_patches = svg.append("g").classed("blok_patches", true);

var button_col = '#66665A';

var text_style = {
  "fill": "#0b1818", 
  "font-size": 1.194550032 +"em", 
  "font-face": "sans-serif"
};

var y_pos = 44;
var x_pos = 120;

function get_color(d) {
  if (d.toLowerCase().indexOf('readme') > -1)  return "#b2fc9b"
  if (d.toLowerCase().indexOf('pad') > -1)  return "#ee5355"
  if (d.toLowerCase().indexOf('lead') > -1)  return "#ee52bf"
  if (d.toLowerCase().indexOf('stab') > -1)  return "#51d5ef"
  if (d.toLowerCase().indexOf('bd') > -1)  return "#ca7777"
  if (d.toLowerCase().indexOf('perc') > -1)  return "#59b9be"
  if (d.toLowerCase().indexOf('tonal') > -1)  return "#487971"
  if (d.indexOf('unsorted') > -1)  return "#edfafb"
  return '#342'
}

function draw_content(data) {
       
  var sg = blok_patches.append("g")
    .classed("solo_group", true)
    .attr("transform", translate(x_pos, y_pos))  
  
  var groups = sg.selectAll("g")
    .data(data.images);
      
  var bp = groups.enter()
    .append("g")
    .classed("inlet_", true)
      .attr({
        "transform": function(d, i){ 
          var xy = get_pos((num_patches-1)-i);
          return translate(xy[0], xy[1])
        }})
  
  // for each patch group make a xlink:href
  .append("a")
      .attr({
        "xlink:href": function(d){ return prefix + d},
        "xlink:show": "new",
        "cursor": "pointer"
      })
  
  // for each patch group make a rect
  bp.append("rect")
    .style(rect_style)
    .style('fill', function(d){ return get_color(d) })
    .attr({
        "height": psize*downscale,
        "width": psize*downscale
    })

  // for each patch group make a text label
  bp.append("text")
    .text(function(d){ 
      return d.replace(/\\/g, "  \\  ");
    })
    .classed("patch_label", true)
      .style(text_style)
    .attr({
      'opacity':0.0,
      "transform": function(d, i){ 
          var xy = get_pos((num_patches-1)-i);
        return translate(-xy[0], -xy[1]-10)}
    })

  
  // attach mouse behaviour
  bp.each(function(d){
    var obj = d3.select(this);
    var r = obj.select('rect');
    var label = obj.select('.patch_label');

    obj.on("mouseover", function(d){
      r.transition().duration(200).style("fill", "yellow")
      label.transition().duration(200).attr({'opacity':1.0})
    })
    obj.on("mouseout", function(d){
      r.transition().duration(200).style("fill", get_color(d))
      label.transition().duration(100).attr({'opacity':0.0})
    })
  })


}


// ----------- helper functions ----------------

function get_pos(i){
  var x = psize * (i % items_wide);
  var y = psize * Math.floor(i / items_wide);
  return [x, y]
}

function translate(value_x, value_y){
  return "translate(" + [value_x, value_y] + ")"
}

function rgb(r, g ,b) { 
    return "rgb(" + [r,g,b] + ")" 
}

