var data;
/*var cancerType ="Total Cancer";
var zipSelected ="";
var zipSelected2 = "";
var iscompare = 0;
var lastChanged = 2;*/
var CancerPeople = 0;
var groceryFlag = 0;
var incomeFlag = 0;
var educationFlag = 0;
var eduIncomeFlag = 0;
var smokeFlag = 0;
var uiccpositionFlag = 1;
var count=1;



var color = d3.scale.quantile()
        .range(['#fef0d9', '#fdd49e',
               '#fdbb84', '#fc8d59', '#e34a33']);

d3.csv("data/colorv3.csv", function(dataTotal){
    data = dataTotal;
    data.forEach(function(d) {
        d.total = +d.total;
        //console.log(d.total);
    });


    color.domain([
        d3.min(data, function(d){ return d.total; }),
        d3.max(data, function(d){ return d.total; })
    ]);
});

//texture define
var orange = '#ff8c00',
        black = '#000000',
        transparent = 'rgba(0, 128, 0, 0.5)';

var t1 = textures.lines()
        .thinner()
        .stroke(black)
        .strokeWidth(0.5);

var t2 = textures.lines()
        .lighter()
        .stroke(black)
        .strokeWidth(1);

var t3 = textures.lines()
        .strokeWidth(1)
        .shapeRendering("crispEdges")
        .thicker()
        .stroke(black)
        .strokeWidth(2);

var t4 = textures.lines()
        .heavier()
        .size(8)
        .stroke(black)
        .strokeWidth(4);


var tlist = [t1, t2, t3, t4];
// texture define end

//Create a tooltip
    var tooltip = d3.select("#tooltip-map")
        .attr("class", "tooltip")
        .style("opacity", 0);

//Load in GeoJSON data
d3.json("data/mapChicago4.geojson", function(json) {

     /*var dropdownChange = function() {
        var cancerType = d3.select(this).property('value');
        updateMap(cancerType);
        legendUpdate(cancerType);

        if(educationFlag == 1){
            educationFlag = 0;
            showEducationSideBar();
        }

        if(groceryFlag == 1){
            groceryFlag = 0;
            showGrocerySideBar();
        }

        if(incomeFlag == 1){
            incomeFlag = 0;
            showIncomeSideBar();
        }
    };*/

    /*var cancer = ["Total Cancer","Nervous","Colorectal", "Lung and Bronchus", "Breast In Situ", "Cervix"];

    var dropdown = d3.select("#cancerFilter")
        .append('g')
        .attr("width", 10)
        .attr("height", 10)
        .attr("class","dropdown")
        .attr("transform", "translate(0,20)")
        .insert("select", "svg")
        .on("change", dropdownChange);

    dropdown.selectAll("option")
        .data(cancer)
        .enter().append("option")
        .attr("value", function (d) {return d; })
        .text(function (d) {
            return d;
        });*/

    //cancerPopulation Button
   /* cancerPopulationSideBar = d3.select('#cancerPopulation-side-bar')
        .append("button")
        .attr("type","button")
        .attr("class","cancerPopulationButton")
        .text("Cancer Population")
        .on('click', updateMap);*/

        //cancerPopulation Button
    cancerPeopleSideBar = d3.select('#cancerPeople-side-bar')
        .append("button")
        .attr("type","button")
        .attr("width", 50)
        .attr("class","cancerPeopleButton")
        .html("Total" + "<br>" + "Patients")
        .on('click', TotalHNC);

    //map path and projection

    //Width and height
    var width = $("#map-layer").width();
    //console.log(width);
    var height = $("#map-layer").height();
    var center = [-87.623177, 41.881832];
    var scale = 170;


    var projection = d3.geo.mercator().center(center)
        .scale(width *110)
        .translate([width/1.5, height/3]);
    var path = d3.geo.path().projection(projection);


    //Create SVG element
    var svg = d3.select(".map")
        .attr("height", height);
        

    TotalHNC();
    //updateMap();

    /*function updateMap(){

        d3.select(".cancerPopulationButton")
          .style("background-color", "#a1d99b");

          EducationRemove();
          EduIncomeRemove();
          IncomeRemove();
          TotalHNCRemove();
    //map color and tooltip value
        svg.append('g')
        .selectAll('path')
        .data(json.features)
        .enter().append('path')
        .attr('d', path)
        .attr('vector-effect', 'non-scaling-stroke')
        .attr('class', 'region-path')
        .style("fill", function(d){
            var val = (d.properties.total/ d.properties.totalPopulation) * 10000;
                    color.domain([0,3]);
                    return color(val);
        })
        .style("stroke", "#636363")
        .style('stroke-width', "1px")
        .on('mouseover', function(d){
            tooltip.transition()
                    .duration(200)
                    .style("opacity",0.9);
            tooltip.html("Zip: \n" + d.properties.zip + "<br>" + "Total Cancer People: " + d.properties.total + "<br>" + "Total Population: " + d.properties.totalPopulation + "<br>"
                        + "Male: " + d.properties.male + "<br>" + "Female: " + d.properties.female)  
                    .style("left", (d3.event.pageX) + "px")   
                    .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", 0);

        })
        .on('click',function(d){

            d3.selectAll(".clicked1")
                            .classed("clicked1", false)
                            .style('stroke', '#636363')
                            .style('stroke-width', "1px");
            d3.select(this)
              .classed("clicked1", true)
              .style('stroke', '#b10026')
              .style('stroke-width', "4px");

            DemoMap("#DemoZip", d.properties.zip)
            rod_knot("#TNMStageC", d.properties.zip, "clinical")
            rod_knot("#TNMStageP", d.properties.zip, "pathological")
              //console.log(this)

        })


                            

                

        legendUpdate();
        if(uiccpositionFlag==1){
        	UICCposition();
        }
        if(groceryFlag==1){
            groceryFlag = 0;
            showGrocerySideBar();
        }

    }*/

    //remove cancer Population data

    /*function cancerPopulationRemove(){

        d3.selectAll('.legend').remove();
        d3.selectAll('.cancer-legend-heading').remove();
        d3.select(".cancerPopulationButton")
          .style("background-color", "white");
    }*/

// mapLayer attributes
    /*function updateMap(cancerType){

        svg.selectAll('path').remove();
        svg.append('g')
            .selectAll('path')
            .data(json.features)
            .enter().append('path')
            .attr('d', path)
            .attr('vector-effect', 'non-scaling-stroke')
            .attr('class', 'region-path')
            .style("fill",function(d){
                if(cancerType=="Total Cancer"){
                    if(typeof d.properties.totalCancer === "undefined"){d.properties.totalCancer = 0;}
                    var val = d.properties.totalCancer/ d.properties.totalPopulation * 10000;
                    color.domain([100,400]);
                    return color(val);}
                else if(cancerType=="Cervix"){
                    color.domain([0,8]);
                    if(typeof d.properties.cervix === "undefined"){d.properties.cervix = 0;}
                    var val = d.properties.cervix/ d.properties.totalPopulation * 10000;

                    return color(val);}
                else if(cancerType == "Nervous"){
                    if(typeof d.properties.nervous === "undefined"){d.properties.nervous = 0;}
                    var val = d.properties.nervous/ d.properties.totalPopulation * 10000;

                    color.domain([0,8]);
                    return color(val);}
                else if(cancerType == "Colorectal"){
                    if(typeof d.properties.colorectal === "undefined"){d.properties.colorectal = 0;}
                    var val = d.properties.colorectal/ d.properties.totalPopulation * 10000;

                    color.domain([0,55]);
                    return color(val);}
                else if(cancerType == "Lung and Bronchus"){
                    if(typeof d.properties.totalCancer === "lungBron"){d.properties.lungBron = 0;}
                    var val = d.properties.lungBron/ d.properties.totalPopulation * 10000;

                    color.domain([0,66]);
                    return color(val);}
                else{
                    if(typeof d.properties.breastInSitu === "undefined"){d.properties.breastInSitu = 0;}
                    var val = d.properties.breastInSitu/ d.properties.totalPopulation * 10000;

                    color.domain([0, 25]);
                    return color(val);}
            })
            .style("stroke", "#636363")
            .style('stroke-width', "1px")
            .on('mouseover', function(d){
                tooltip.transition()
                    .duration(200)
                    .style("opacity",0.9);

                if(cancerType=="Total Cancer"){

                    tooltip.html("Zip: \n" + d.properties.zip + "<br>" + "Cancer Incidences: " + d.properties.totalCancer + "<br>" + "Total Population: " + d.properties.totalPopulation + "<br>"
                        + "Cancer Rate: " + Math.round(d.properties.totalCancer/d.properties.totalPopulation *10000)  )
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY+18) + "px");}
                else if(cancerType=="Cervix"){
                    tooltip.html("Zip: \n" + d.properties.zip + "<br>" + "Cancer Incidences: " + d.properties.cervix + "<br>" + "Total Population: " + d.properties.totalPopulation + "<br>"
                        + "Cancer Rate: " + Math.round(d.properties.cervix/d.properties.totalPopulation *10000))
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY+18) + "px");}
                else if(cancerType == "Nervous"){
                    tooltip.html("Zip: \n" + d.properties.zip + "<br>" + "Cancer Incidences: " + d.properties.nervous + "<br>" + "Total Population: " + d.properties.totalPopulation + "<br>"
                        + "Cancer Rate: " + Math.round(d.properties.nervous/d.properties.totalPopulation *10000))
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY+18) + "px");}
                else if(cancerType == "Colorectal"){
                    tooltip.html("Zip: \n" + d.properties.zip + "<br>" + "Cancer Incidences: " + d.properties.colorectal + "<br>" + "Total Population: " + d.properties.totalPopulation + "<br>"
                        + "Cancer Rate: " + Math.round(d.properties.colorectal/d.properties.totalPopulation *10000))
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY+18) + "px");}
                else if(cancerType == "Lung and Bronchus"){
                    tooltip.html("Zip: \n" + d.properties.zip + "<br>" + "Cancer Incidences: " + d.properties.lungBron + "<br>" + "Total Population: " + d.properties.totalPopulation + "<br>"
                        + "Cancer Rate: " + Math.round(d.properties.lungBron/d.properties.totalPopulation *10000))
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY+18) + "px");}
                else{
                    tooltip.html("Zip: \n" + d.properties.zip + "<br>" + "Cancer Incidences: " + d.properties.breastInSitu + "<br>" + "Total Population: " + d.properties.totalPopulation + "<br>"
                        + "Cancer Rate: " + Math.round(d.properties.breastInSitu/d.properties.totalPopulation *10000))
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY+18) + "px");}
            })
            .on("mouseout", function(d) {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);

            })
            .on('click',function(d){


                if(iscompare == 1){

                    if(lastChanged == 2){


                        d3.selectAll(".clicked1")
                            .classed("clicked1", false)
                            .style('stroke', '#636363')
                            .style('stroke-width', "1px");

                        d3.select(this)
                            .classed("clicked1", true)
                            .style('stroke', '#b10026')
                            .style('stroke-width', "4px");

                        zipSelected = d.properties.zip;
                        console.log("zip1 : " + zipSelected);



                        zipHeading(zipSelected, '#zipHeading1');
                        insuranceChart(zipSelected, '#insurancePlot1');
                        populationNumber(zipSelected, '#totalPopulation1');
                        incomeChart(zipSelected, '#incomePlot1');
                        groceryNumber(zipSelected, '#groceryNumber1');
                        cancerPyramindChart(zipSelected, '#cancerPlots1');
                        raceChart(zipSelected, '#racePlot1');
                        lastChanged = 1;
                    }
                    else{

                        d3.selectAll(".clicked2")
                            .classed("clicked2", false)
                            .style('stroke', '#636363')
                            .style('stroke-width', "1px");

                        d3.select(this)
                            .classed("clicked2", true)
                            .style('stroke', '#b10026')
                            .style('stroke-width', "4px");



                        zipSelected2 = d.properties.zip;
                        console.log("zip2 : " + zipSelected2);



                        zipHeading(zipSelected2, '#zipHeading2');
                        insuranceChart(zipSelected2, '#insurancePlot2');
                        populationNumber(zipSelected2, '#totalPopulation2');
                        incomeChart(zipSelected2, '#incomePlot2');
                        groceryNumber(zipSelected2, '#groceryNumber2');
                        cancerPyramindChart(zipSelected2, '#cancerPlots2');
                        raceChart(zipSelected2, '#racePlot2');
                        lastChanged = 2;
                    }

                }
                else{


                    d3.selectAll(".clicked1")
                        .classed("clicked1", false)
                        .style('stroke', '#636363')
                        .style('stroke-width', "1px");

                    d3.select(this)
                        .classed("clicked1", true)
                        .style('stroke', '#b10026')
                        .style('stroke-width', "4px");


                    zipSelected = d.properties.zip;
                    console.log("zip1 : " + zipSelected);
                    zipHeading(zipSelected, '#zipHeading1');
                    insuranceChart(zipSelected, '#insurancePlot1');
                    populationNumber(zipSelected, '#totalPopulation1');
                    incomeChart(zipSelected, '#incomePlot1');
                    groceryNumber(zipSelected, '#groceryNumber1');
                    cancerPyramindChart(zipSelected, '#cancerPlots1');
                    raceChart(zipSelected, '#racePlot1');

                }
            })
            .attr('opacity',1);
    }*/


    /*d3.select("#cancer-range").on("input", function () {

        var sliderValue = d3.select("#cancer-range").property("value")/100;

        svg.selectAll('.region-path')
            .transition()
            .duration(300)
            .ease("linear")
            .style("opacity", sliderValue);


        document.getElementById("cancer-slider-number").innerText = sliderValue});*/
		

        //add a legend
    /*function legendUpdate(){

    	var mapheight1 = $(".map").height();
    	var mapheight2 = mapheight1 - ((mapheight1*40)/100);
    	//console.log(mapheight2);

        var w = 120, h= 200;
        d3.selectAll('.legend').remove();
        d3.selectAll('.cancer-legend-heading').remove();

        d3.select(".map").append('g')
            .attr("width",40)
            .attr("height",60)
            .attr("class","text cancer-legend-heading")
            .append('text')
            .attr("x","3%")
            .attr("y","55%")
            .attr("font-size",'15px')
            .text('Cancer Rates');



        var key = d3.select(".map")
            .append("g")
            .attr("width",w)
            .attr("height",h)
            .attr("class","legend");

        var legend = key.append("defs")
            .append("svg:linearGradient")
            .attr("id","gradient")
            .attr("x1","100%")
            .attr("y1", "0%")
            .attr("x2", "100%")
            .attr("y2", "100%")
            .attr("spreadMethod", "pad");

        legend.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", "#e34a33")
            .attr("stop-opacity", 1);

        legend.append("stop")
            .attr("offset", "25%")
            .attr("stop-color", "#fc8d59")
            .attr("stop-opacity", 1);

        legend.append("stop")
            .attr("offset", "50%")
            .attr("stop-color", "#fdbb84")
            .attr("stop-opacity", 1);

        legend.append("stop")
            .attr("offset", "75%")
            .attr("stop-color", "#fdd49e")
            .attr("stop-opacity", 1);

        legend.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", "#fef0d9")
            .attr("stop-opacity", 1);




        key.append("rect")
            .attr("width", w - 100)
            .attr("height", h)
            .style("fill", "url(#gradient)")
            // .style("font-color","2px")
            .attr("transform", "translate(30,"+ mapheight2 +")");


        var y = d3.scale.linear()
                .range([h, 0])
                .domain([0,3]);
        var yAxis = d3.svg.axis().scale(y).orient("right").ticks(6).tickSize(8,0);


        key.append("g")
            .attr("class", "yaxis")
            .attr("transform", "translate(42,"+ mapheight2 +")")
            .call(yAxis);

    }*/


    function TotalHNC(){

        //if(CancerPeople==0){
            //TotalHNCRemove();
            d3.selectAll('.cancer-legend').remove()
            d3.selectAll('#cancer-legend-text').remove()
           
            d3.select(".cancerPeopleButton")
              .style("background-color", "#a1d99b");
            //CancerPeople = 1;

              EducationRemove();
              EduIncomeRemove();
              IncomeRemove();
              //cancerPopulationRemove();
            //map color and tooltip value
            svg.append('g')
            .selectAll('path')
            .data(json.features)
            .enter().append('path')
            .attr('d', path)
            .attr('vector-effect', 'non-scaling-stroke')
            .attr('class', 'totalHNC')
            .style("fill", function(d){
                if(d.properties.total==0){return "#edf8fb";};
                if(d.properties.total>0 && d.properties.total<=5){return "#b3cde3";};
                if(d.properties.total>5 &&d.properties.total<=10){return "#8c96c6";};
                if(d.properties.total>10 &&d.properties.total<=20){return "#88419d";};
                /*var val = (d.properties.total/ d.properties.totalPopulation) * 10000;
                        color.domain([0,3]);
                        return color(val);*/
            })
            .style("stroke", "#636363")
            .style('stroke-width', "1px")
            .on('mouseover', function(d){
                tooltip.transition()
                        .duration(200)
                        .style("opacity",0.9);
                tooltip.html("Zip: \n" + d.properties.zip + "<br>" + "Total Cancer People: " + d.properties.total + "<br>" + "Total Population: " + d.properties.totalPopulation + "<br>"
                            + "Male: " + d.properties.male + "<br>" + "Female: " + d.properties.female)  
                        .style("left", (d3.event.pageX) + "px")   
                        .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", 0);

            })
            .on('click',function(d){

                d3.selectAll(".clicked1")
                                .classed("clicked1", false)
                                .style('stroke', '#636363')
                                .style('stroke-width', "1px");
                d3.select(this)
                  .classed("clicked1", true)
                  .style('stroke', '#b10026')
                  .style('stroke-width', "4px");
                  console.log(this)

                DemoMap("#DemoZip", d.properties.zip)
                rod_knot("#TNMStageC", d.properties.zip, "clinical")
                rod_knot("#TNMStageP", d.properties.zip, "pathological")

            })

            if(uiccpositionFlag==1){
                UICCposition();
            }
            if(groceryFlag==1){
                groceryFlag = 0;
                showGrocerySideBar();
            }

            if(smokeFlag ==1){
                smokeFlag = 0;
                showSmokeSideBar();
            }

            d3.select("#sidebar-right1")
                        .append('svg')
                        .attr("width",$("#sidebar-right1").width())
                        .attr("height",25)
                        .attr("id", "cancer-legend-text")
                        .append('g')
                        .attr("class","text")
                        .append('text')
                        .attr('x', 0)
                        .attr('y', "45%")
                        .style("text-anchor", "start")
                        .style("font" ,"0.6vw sans-serif")
                        .text('Number of HNC cases');


                    var legendCancer = d3.select("#sidebar-right1").
                    append('svg').
                    attr("width", $("#sidebar-right1").width()).
                    attr("height", 50).
                    attr('class', 'cancer-legend').
                    append("g");

                    var cancerWidth = $("#sidebar-right1").width();
                    var eachCancerWidth = parseInt(cancerWidth/4);
                    CancerColor = ["#edf8fb", "#b3cde3", "#8c96c6", "#88419d"]
                    //console.log(eachIncomeWidth);


                    for (var i = 0; i < 4; i++) {
                        legendCancer.append("g:rect")
                            .attr("x", i*eachCancerWidth)
                            .attr("height", 20)
                            .attr("width", eachCancerWidth)
                            .style("fill", CancerColor[i])
                            .style("opacity", "0.9");


                        legendCancerText = ['0', '5', '10', '20']
                        legendCancer.append("text")
                            .attr("x", i* eachCancerWidth + (eachCancerWidth/2))
                            .attr("y", 30)
                            .attr("dy", ".35em")
                            .style("text-anchor", "start")
                            .style("font" ,"0.5vw sans-serif")
                            .text(String(legendCancerText[i]));
                    };

        /*}
        else if(CancerPeople==1){
            TotalHNCRemove();
            CancerPeople = 0;
            TotalHNC();


        }*/

    }

    function TotalHNCRemove(){
    CancerPeople = 0;
    d3.select(".cancerPeopleButton")
      .style("background-color", "white");

    d3.selectAll('.totalHNC').remove()
    d3.selectAll('.cancer-legend').remove()
    d3.selectAll('#cancer-legend-text').remove()

}


//dropdown value change
function UICCposition(){
	var d = [-87.6745, 41.8711]
	var xval = projection(d)[0];
	var yval = projection(d)[1];
	var NWCC = [-87.622344, 41.894817]
	var NWCCxval = projection(NWCC)[0];
	var NWCCyval = projection(NWCC)[1];
	var UChicago = [-87.6043, 41.7888];
	var UCxval = projection(UChicago)[0];
	var UCyval = projection(UChicago)[1];
    var RushUni = [-87.6700, 41.8734];
    var RushUnixval = projection(RushUni)[0];
    var RushUniyval = projection(RushUni)[1];

	var UICCC = d3.svg.symbol().type("circle").size(100);
          d3.select('.map')
            .append("path")
            .attr("d", UICCC)
            .attr("class", "uiccposition")
            .style('fill', 'black')
            .attr("transform", "translate("+ xval +","+ yval +")")
            .on('mouseover', function(d){
	            tooltip.transition()
	                    .duration(200)
	                    .style("opacity",0.9);
	            tooltip.html("University of Illinois Cancer Center")  
	                    .style("left", (d3.event.pageX) + "px")   
	                    .style("top", (d3.event.pageY - 28) + "px");
	        })
	        .on("mouseout", function(d) {
	                tooltip.transition()
	                    .duration(200)
	                    .style("opacity", 0);

	        });

    var NWCC1 = d3.svg.symbol().type("circle").size(100);
          d3.select('.map')
            .append("path")
            .attr("d", NWCC1)
            .attr("class", "uiccposition")
            .style('fill', 'yellow')
            .style("stroke", "black")
            .attr("transform", "translate("+ NWCCxval +","+ NWCCyval +")")
            .on('mouseover', function(d){
	            tooltip.transition()
	                    .duration(200)
	                    .style("opacity",0.9);
	            tooltip.html("Robert H. Lurie Comprehensive" + "<br>"+ "Cancer Center of Northwestern University")  
	                    .style("left", (d3.event.pageX) + "px")   
	                    .style("top", (d3.event.pageY - 28) + "px");
	        })
	        .on("mouseout", function(d) {
	                tooltip.transition()
	                    .duration(200)
	                    .style("opacity", 0);

	        });

    var UC1 = d3.svg.symbol().type("circle").size(100);
          d3.select('.map')
            .append("path")
            .attr("d", UC1)
            .attr("class", "uiccposition")
            .style('fill', 'blue')
            .style("stroke", "black")
            .attr("transform", "translate("+ UCxval +","+ UCyval +")")
            .on('mouseover', function(d){
	            tooltip.transition()
	                    .duration(200)
	                    .style("opacity",0.9);
	            tooltip.html("University of Chicago Medical Center")  
	                    .style("left", (d3.event.pageX) + "px")   
	                    .style("top", (d3.event.pageY - 28) + "px");
	        })
	        .on("mouseout", function(d) {
	                tooltip.transition()
	                    .duration(200)
	                    .style("opacity", 0);

	        });

    var RUCC = d3.svg.symbol().type("circle").size(50);
          d3.select('.map')
            .append("path")
            .attr("d", RUCC)
            .attr("class", "uiccposition")
            .style('fill', "#fc8d62")
            .style("stroke", "black")
            .attr("transform", "translate("+ RushUnixval +","+ RushUniyval +")")
            .on('mouseover', function(d){
                tooltip.transition()
                        .duration(200)
                        .style("opacity",0.9);
                tooltip.html("Rush University Cancer Center")  
                        .style("left", (d3.event.pageX) + "px")   
                        .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", 0);

            });

}
//UICC position show

//

// grocery on side bar tab
    grocery = d3.select('#grocery-side-bar')
        .append("button")
        .attr("type","button")
        .attr("class","groceryButton")
        .text("Grocery")
        .on('click', showGrocerySideBar);

 function  showGrocerySideBar(){
        if(groceryFlag == 0){

            svg.selectAll(".groceryCircle").remove();
            d3.selectAll('.grocery-legend').remove()
            d3.selectAll('#grocery-legend-text').remove()

            d3.select(".groceryButton")
                .style("background-color", "#a1d99b");

            d3.csv('data/groceryStores.csv', function(grocery) {

                groceryFlag = 1;
                groceryByZIP = d3.nest()
                    .key(function (d) {
                        return d.ZIPCODE;
                    })
                    .rollup(function (v) {
                        return v.length
                    })
                    .entries(grocery);


                var groceryByLoc = [];

                d3.csv('data/zipLocations.csv', function (zipLocation) {


                    for (var i = 0; i < groceryByZIP.length; i++) {
                        for (var j = 0; j < zipLocation.length; j++) {
                            if (groceryByZIP[i]["key"] == zipLocation[j]['ZIP']) {
                                groceryByLoc.push([groceryByZIP[i]["key"], groceryByZIP[i]["values"], zipLocation[j]["long"], zipLocation[j]["lat"]])
                            }
                        }
                    }
                    //console.log("groceryByLoc: " + groceryByLoc);

                    var circle = svg.selectAll("circle")
                        .data(groceryByLoc).enter()
                        .append("circle")
                        .attr("class", "groceryCircle")
                        .attr("cx", function (d) {
                            d = [d[2], d[3]];
                            return projection(d)[0]; })
                        .attr("cy", function (d) {
                            d = [d[2], d[3]];
                            return projection(d)[1];})
                        .attr("r", function (d) {
                            if (d[1] > 0 && d[1] <= 5) {
                                if(window.innerWidth<1300 || window.innerHeight<800){
                                    return "1px";
                                }
                                else{
                                    return "2px";
                                }
                            }
                            else if (d[1] > 5 && d[1] <= 19) {
                                if(window.innerWidth<1300 || window.innerHeight<800){
                                    return "1.5px";
                                }
                                else{
                                    return "5px";
                                }
                            }
                            else {
                                if(window.innerWidth<1300 || window.innerHeight<800){
                                    return "5px";
                                }
                                else{
                                    return "12px";
                                }
                            }
                        })
                        .style("stroke", "black")
                        .attr("fill", "#7f3b08")
                        .attr("opacity", 1);
                        //"#006d2c"

                    d3.select("#sidebar-right2")
                        .append('svg')
                        .attr("width",$("#sidebar-right2").width())
                        .attr("height",25)
                        .attr("transform", function(){
                            if(window.innerWidth<1300 || window.innerHeight<700){
                                return "translate(0,60)";
                            }
                            else{return "translate(0,80)";}
                        })
                        .attr("id", "grocery-legend-text")
                        .append('g')
                        .attr("class","text")
                        .append('text')
                        .attr('x', 0)
                        .attr('y', function(){
                            if(window.innerWidth<1300 || window.innerHeight<700){
                                return "45%"
                            }
                            else{return "55%"}
                        })
                        .style("text-anchor", "start")
                        .style("font" ,"0.6vw sans-serif")
                        .text('Grocery Stores');


                    var legendGrocery = d3.select("#sidebar-right2")
                    .append('svg')
                    .attr("width", $("#sidebar-right2").width())
                    .attr("height", 100)
                    .attr('class', 'grocery-legend')
                    .attr("transform", function(){
                            if(window.innerWidth<1300 || window.innerHeight<700){
                                return "translate(0,60)";
                            }
                            else{return "translate(0,80)";}
                        })
                    .append("g");
                    var data = [];


                    if(window.innerWidth<1300 || window.innerHeight<700){
                        var GLSpace = 15;
                        var firstGLSpace = 5;
                    }
                    else{
                        var GLSpace = 30;
                        var firstGLSpace = 10;
                    }


                    for (var i = 0; i < 3; i++) {

                        legendGrocery
                            .append("circle")
                            .attr("cy",
                            function (d) {
                                if (i==0) {
                                    return firstGLSpace;}
                                else
                                {return i*GLSpace;}
                            })
                        .attr("cx", 15)
                        .attr("r", function (d) {
                            if (i==0) {
                                if(window.innerWidth<1300 || window.innerHeight<800){
                                    return "1px";
                                }
                                else{
                                    return "2px";
                                }
                            }
                            else if (i==1) {
                                if(window.innerWidth<1300 || window.innerHeight<800){
                                    return "1.5px";
                                }
                                else{
                                    return "5px";
                                }
                            }
                            else {
                                if(window.innerWidth<1300 || window.innerHeight<800){
                                    return "5px";
                                }
                                else{
                                    return "12px";
                                }
                            }
                        })
                        .style("stroke", "black")
                        .style("fill", "#7f3b08")
                        .style("opacity", "0.9");

                        legendText = ['<= 5', '> 5 & <= 19', '> 20']


                        legendGrocery.append("text")
                            .attr("y", function (d) {
                                if (i==0) {
                                    return firstGLSpace;}
                                else
                                {return i*GLSpace;}
                            })
                            .attr("x", 30)
                            .attr("dy", ".35em")
                            .style("text-anchor", "start")
                            .style("font" ,"0.5vw sans-serif")
                            .text(String(legendText[i]));

                    };
                })
            })
        }
        else{
            groceryFlag = 0;

            d3.select(".groceryButton")
                .style("background-color", "white");

            svg.selectAll(".groceryCircle").remove();


            d3.selectAll('.grocery-legend').remove()
            d3.selectAll('#grocery-legend-text').remove()
        }




    }
//Grocery on side bar ends

//Income on side bar
    incomeSideBar = d3.select('#income-side-bar')
        .append("button")
        .attr("type","button")
        .attr("class","incomeButton")
        .text("Income")
        .on('click', showIncomeSideBar);


    function showIncomeSideBar() {

        if(incomeFlag == 0){
            //cancerPopulationRemove();
            EducationRemove();
            EduIncomeRemove();
            TotalHNCRemove();
            d3.selectAll('.uiccposition').remove()

            educationFlag = 0;
            d3.select(".educationButton")
              .style("background-color", "white");

            d3.selectAll('.income-path').remove()
            d3.selectAll('.income-legend').remove()
            d3.selectAll('#income-legend-text').remove()


            d3.select(".incomeButton")
                .style("background-color", "#a1d99b");

            incomeFlag = 1;
            d3.csv('data/filteredIncome.csv', function (income) {


                var colorRange = ["#810f7c","#8856a7","#8c96c6","#b3cde3","#edf8fb"];
                var color = d3.scale.quantize()
                    .domain([20000, 40000, 500000, 70000, 90000])
                    .range(["#edf8fb","#b3cde3","#8c96c6","#8856a7","#810f7c"]);


                /*income.forEach(function (d) {
                    d.percent = (d.medianIncome - 83890)/83890 ;
                })*/


                svg.append('g')
                    .selectAll('path')
                    .data(json.features)
                    .enter().append('path')
                    .attr('d', path)
                    .attr('class','income-path')
                    .style("stroke", "#636363")
                    .style('stroke-width', "1px")
                    .style('fill', function(d){
                        var incomePercent;
                        /*for(var i =0; i < income.length ; i++){
                           if(income[i].zip == +(d.properties.zip)){
                               incomePercent = income[i].percent;
                           }
                        }*/
                        incomePercent = d.properties.income;
                        //console.log("income is: "+incomePercent);

                        return color(incomePercent)
                    });


                d3.select("#sidebar-right2")
                    .append('svg')
                    .attr("width",$("#sidebar-right2").width())
                    .attr("height",25)
                    .attr("transform", "translate(0,80)")
                    .attr("id", "income-legend-text")
                    .append('g')
                    .attr("class","text")
                    .append('text')
                    .attr('x', 0)
                    .attr('y', "45%")
                    .style("text-anchor", "start")
                    .style("font" ,"0.6vw sans-serif")
                    .text('Per capita income');


                var legendIncome = d3.select("#sidebar-right2").
                append('svg').
                attr("width", $("#sidebar-right2").width()).
                attr("height", 50).
                attr('class', 'income-legend').
                attr("transform", "translate(0,80)").
                append("g");

                var incomeWidth = $("#sidebar-right2").width();
                var eachIncomeWidth = parseInt(incomeWidth/6);
                //console.log(eachIncomeWidth);


                for (var i = 0; i < 5; i++) {
                    legendIncome.append("g:rect")
	                    .attr("x", i*eachIncomeWidth)
	                    .attr("height", function(){
                            if(window.innerWidth<1300 || window.innerHeight<700){
                                return 10;
                            }
                            else{return 20;}
                        })
	                    .attr("width", eachIncomeWidth)
	                    .style("fill", colorRange[i])
                        .style("opacity", "0.9");


                    legendText = ['>80k ', '70k', '50k', '40k', '<20k']
                    legendIncome.append("text")
                        .attr("x", i* eachIncomeWidth)
                        .attr("y", function(){
                            if(window.innerWidth<1300 || window.innerHeight<700){
                                return 20;
                            }
                            else{return 30;}
                        })
                        .attr("dy", ".35em")
                        .style("text-anchor", "start")
                        .style("font" ,"0.5vw sans-serif")
                        .text(String(legendText[i]));
                };

                if(groceryFlag==1){
                groceryFlag = 0;
                showGrocerySideBar();
                }

                if(smokeFlag ==1){
                smokeFlag = 0;
                showSmokeSideBar();
                }

                if(uiccpositionFlag==1){
                	UICCposition();
                }
                
            })
    }
        else{
            /*legendUpdate();
            d3.select(".cancerPopulationButton")
              .style("background-color", "#a1d99b");*/
            TotalHNC();
            incomeFlag = 0;

            d3.select(".incomeButton")
                .style("background-color", "white");

            d3.selectAll('.income-path').remove()
            d3.selectAll('.income-legend').remove()
            d3.selectAll('#income-legend-text').remove()

        }

    }

function IncomeRemove(){
    incomeFlag = 0;
    d3.select(".incomeButton")
      .style("background-color", "white");

    d3.selectAll('.income-path').remove()
    d3.selectAll('.income-legend').remove()
    d3.selectAll('#income-legend-text').remove()

}


//Income on side bar ends

//Education on side bar
    educationSideBar = d3.select('#education-side-bar')
        .append("button")
        .attr("type","button")
        .attr("class","educationButton")
        .text("Education")
        .on('click', showEducationSideBar);




    function showEducationSideBar() {

        if(educationFlag == 0) {
            educationFlag = 1;

            //cancerPopulationRemove();
            IncomeRemove();
            EduIncomeRemove();
            TotalHNCRemove();

            d3.selectAll('.education-path').remove()
            d3.selectAll('.education-legend').remove()
            d3.selectAll('.education-legend-heading').remove()

            d3.select(".educationButton")
                .style("background-color", "#a1d99b");

            d3.csv('data/filteredEducationTotal.csv', function (edTotal) {

                    var color = d3.scale.quantile()
                       .range(["#f2f0f7","#dadaeb","#bcbddc","#9e9ac8","#807dba","#6a51a3"]);

                    color.domain([65, 97]);


                    svg.append('g')
                        .selectAll('path')
                        .data(json.features)
                        .enter().append('path')
                        .attr('d', path)
                        .attr('class', 'education-path')
                        .style('fill', function (d) {
                            var educatedPeopleRate;
                            /*for (var i = 0; i < edTotal.length; i++) {
                                if (edTotal[i].zip == +(d.properties.zip)) {
                                    educatedPeopleRate = edTotal[i].total_educated_population/edTotal[i].totalPopulation * 100;
                                }
                            }*/
                            var educatedPeopleRate = (d.properties.totalEducatedPopulation/ d.properties.totalPopulation) * 100;
            
                            //console.log("edu rate: "+educatedPeopleRate);
                            return color(educatedPeopleRate);
                            
                            
                        })
                        .style("stroke", "#636363")
                        .style('stroke-width', "1px")
                        .style("opacity", 1);


                var w = 120, h= 120;

                var mapheight1 = $('.map').height();
                var mapheight2 = mapheight1 - ((mapheight1*36)/100);

                d3.select(".map").append('g')
                    .attr("width",40)
                    .attr("height",50)
                    .attr("class","education-legend-heading")
                    .append('text')
                    .attr("x","3%")
                    .attr("y","60%")
                    .style("font" ,"0.5vw sans-serif")
                    .text('Education Rate(per 100)');


                var key = d3.select(".map")
                    .append("g")
                    .attr("width",w)
                    .attr("height",h)
                    .attr("class","education-legend");

                var legend = key.append("defs")
                    .append("svg:linearGradient")
                    .attr("id","education-gradient")
                    .attr("x1","100%")
                    .attr("y1", "0%")
                    .attr("x2", "100%")
                    .attr("y2", "100%")
                    .attr("spreadMethod", "pad");

                legend.append("stop")
                    .attr("offset", "0%")
                    .attr("stop-color", "#6a51a3")
                    .attr("stop-opacity", 1);

                legend.append("stop")
                    .attr("offset", "100%")
                    .attr("stop-color", "#f2f0f7")
                    .attr("stop-opacity", 1);


                key.append("rect")
                    .attr("width", w - 100)
                    .attr("height", h)
                    .style("fill", "url(#education-gradient)")
                    // .style("font-color","2px")
                    .attr("transform", "translate(30,"+ mapheight2 +")");



                var y = d3.scale.linear()
                    .range([h, 0])
                    .domain([60, 100]);

                var yAxis = d3.svg.axis().scale(y).orient("right").ticks(6).tickSize(6,0);

                key.append("g")
                    .attr("class", "yaxis")
                    .attr("transform", "translate(48,"+ mapheight2 +")")
                    .call(yAxis);

                //Grocery stores should show above map color

                if(groceryFlag==1){
                groceryFlag = 0;
                showGrocerySideBar();
                }

                if(smokeFlag ==1){
                smokeFlag = 0;
                showSmokeSideBar();
                }

                if(uiccpositionFlag==1){
                	UICCposition();
                }

                })
				

        }
        else{

            /*legendUpdate();
            d3.select(".cancerPopulationButton")
              .style("background-color", "#a1d99b");*/
            TotalHNC();
            educationFlag = 0;

            d3.select(".educationButton")
                .style("background-color", "white");

            d3.selectAll('.education-path').remove()
            d3.selectAll('.education-legend').remove()
            d3.selectAll('.education-legend-heading').remove()

        }

    }

function EducationRemove(){
    educationFlag = 0;
    d3.select(".educationButton")
      .style("background-color", "white");

    d3.selectAll('.education-path').remove()
    d3.selectAll('.education-legend').remove()
    d3.selectAll('.education-legend-heading').remove()
}

//Education on side bar ends

//Education + income bivariate map
//EduIncome on side bar
    eduIncomeSideBar = d3.select('#eduincome-side-bar')
        .append("button")
        .attr("type","button")
        .attr("class","eduincomeButton")
        .text("Education + income")
        .on('click', showEduIncomeSideBar);




    function showEduIncomeSideBar() {

        if(eduIncomeFlag == 0) {
            eduIncomeFlag = 1;

            //cancerPopulationRemove();
            IncomeRemove();
            EducationRemove();
            TotalHNCRemove();

            d3.selectAll('.eduIncome-path').remove()
            d3.selectAll('.eduIncome-legend').remove()
            d3.selectAll('.eduIncome-legend-heading').remove()

            d3.select(".eduincomeButton")
                .style("background-color", "#a1d99b");

            d3.csv('data/filteredEducationTotal.csv', function (edTotal) {

                    svg.append('g')
                        .selectAll('path')
                        .data(json.features)
                        .enter().append('path')
                        .attr('d', path)
                        .attr('class', 'eduIncome-path')
                        .style("stroke", "#636363")
                        .style('stroke-width', "1px")
                        .style('fill', function (d) {
                            var educatedPeopleRate;
                            var educatedPeopleRate = (d.properties.totalEducatedPopulation/ d.properties.totalPopulation) * 100;
                            var incomePeople = d.properties.income;

                            if(educatedPeopleRate<60 && incomePeople<20000){return "#e8e8e8"};
                            if(educatedPeopleRate<60 && (incomePeople>=20000 && incomePeople<=80000)){return "#b5c0da"};
                            if(educatedPeopleRate<60 && incomePeople>80000){return "#6c83b5"};
                            if((educatedPeopleRate>=60 && educatedPeopleRate<=90) && incomePeople<20000){return "#b8d6be"};
                            if((educatedPeopleRate>=60 && educatedPeopleRate<=90) && (incomePeople>=20000 && incomePeople<=80000)){return "#90b2b3"};
                            if((educatedPeopleRate>=60 && educatedPeopleRate<=90) && incomePeople>80000){return "#567994"};
                            if(educatedPeopleRate>90 && incomePeople<20000){return "#73ae80"};
                            if(educatedPeopleRate>90 && (incomePeople>=20000 && incomePeople<=80000)){return "#5a9178"};
                            if(educatedPeopleRate>90 && incomePeople>80000){return "#2a5a5b"};
                            
                        })
                        .style("opacity", 1)
                        .on('mouseover', function(d){
                            tooltip.transition()
                                   .duration(200)
                                   .style("opacity",0.9);
                            tooltip.html("Zip: \n" + d.properties.zip + "<br>" + "Total Cancer People: " + d.properties.total + "<br>" + "Total Population: " + d.properties.totalPopulation + "<br>"
                                        + "Male: " + d.properties.male + "<br>" + "Female: " + d.properties.female)  
                                    .style("left", (d3.event.pageX) + "px")   
                                    .style("top", (d3.event.pageY - 28) + "px");
                        })
                        .on('mouseout', function(d){
                            tooltip.transition()
                                   .duration(200)
                                   .style("opacity",0);
                        })

                var EIcolors = ["#e8e8e8", "#b5c0da", "#6c83b5","#b8d6be", "#90b2b3", "#567994","#73ae80", "#5a9178", "#2a5a5b"]

                var w = 120, h= 120;

                var mapheight1 = $('.map').height();
                var mapheight2 = mapheight1 - ((mapheight1*36)/100);
                var mapwidth1 = $('.map').width();
                var mapwidth2 = mapwidth1 - ((mapwidth1*36)/100);

                // d3.select(".map").append('g')
                //     .attr("width",40)
                //     .attr("height",50)
                //     .attr("class","eduIncome-legend-heading")
                //     .append('text')
                //     .attr("x","23%")
                //     .attr("y","97%")
                //     .attr("font-size",'10px')
                //     .text('Income');

                 var check = $(".map").height()*0.89;
                 var check1 = $(".map").width()*0.08;


                var mapheight1 = $('.map').height();
                var mapheight2 = mapheight1 - ((mapheight1*30)/100);
                var width1 = $(".map").width()*0.20;


                if(window.innerWidth<1300 || window.innerHeight<700){
                    var xHeightWidth = 15;
                    var EduTextySpace = 7.5;
                    var EduTextxSpace = -25;
                    var eduX = -30;
                    var eduY = 30;
                }
                else{
                    var xHeightWidth = 40;
                    var EduTextySpace = 20;
                    var EduTextxSpace = -50;
                    var eduX = -55;
                    var eduY = 80;
                }

                var key = d3.select(".map")
                    .append("g")
                    .attr("width",w)
                    .attr("height",h)
                    .attr("class","eduIncome-legend")
                    .attr("transform", "translate(" + width1 + "," + mapheight2 + ")");

                key.append('g')
                    .attr("width",40)
                    .attr("height",50)
                    .attr("class","eduIncome-legend-heading")
                    .append('text')
                    .attr("x",xHeightWidth)
                    .attr("y",3*xHeightWidth+25)
                    .style("font" ,"0.6vw sans-serif")
                    .text('Income');

                key.append('g')
                    .attr("width",40)
                    .attr("height",50)
                    .attr("class","eduIncome-legend-heading")
                    .append('text')
                    .style("font" ,"0.5vw sans-serif")
                    .attr("transform", "translate(" + eduX + "," + eduY + ")" + "rotate(-90)")
                    .text('Education');


                for (var i=0;i<3;i++){
                    key.append("g:rect")
                                .attr("x", i*xHeightWidth)
                                .attr("y", 2*xHeightWidth)
                                .attr("height", xHeightWidth)
                                .attr("width", xHeightWidth)
                                .style("fill", EIcolors[i])
                                .style("opacity", "0.9");
                    
                }
                for (var i=0;i<3;i++){
                    key.append("g:rect")
                                .attr("x", i*xHeightWidth)
                                .attr("y", 1*xHeightWidth)
                                .attr("height", xHeightWidth)
                                .attr("width", xHeightWidth)
                                .style("fill", EIcolors[i+3])
                                .style("opacity", "0.9");
                    
                }
                for (var i=0;i<3;i++){
                    key.append("g:rect")
                                .attr("x", i*xHeightWidth)
                                .attr("y", 0*xHeightWidth)
                                .attr("height", xHeightWidth)
                                .attr("width", xHeightWidth)
                                .style("fill", EIcolors[i+6])
                                .style("opacity", "0.9");
                    
                }

                var IncomeText = ['<20k ', '20k-80k', '>80k'];
                   for (var i=0;i<3;i++){
                     key.append("text")
                        .attr("x", i* xHeightWidth+2)
                        .attr("y", 3*xHeightWidth+10)
                        .attr("dy", ".35em")
                        .style("text-anchor", "start")
                        .style("font" ,"0.5vw sans-serif")
                        .text(String(IncomeText[i]));
                   }

                   var EduText = ['>90% ', '60%-90%', '<60%'];
                   for (var i=0;i<3;i++){
                     key.append("text")
                        .attr("x", EduTextxSpace)
                        .attr("y", i*xHeightWidth+EduTextySpace)
                        .attr("dy", ".35em")
                        .style("text-anchor", "start")
                        .style("font" ,"0.5vw sans-serif")
                        .text(String(EduText[i]));
                   }

                //Grocery stores should show above map color

                if(groceryFlag==1){
                groceryFlag = 0;
                showGrocerySideBar();
                }

                if(smokeFlag ==1){
                smokeFlag = 0;
                showSmokeSideBar();
                }

                if(uiccpositionFlag==1){
                	UICCposition();
                }

                })
				

        }
        else{

            /*legendUpdate();
            d3.select(".cancerPopulationButton")
              .style("background-color", "#a1d99b");*/
            TotalHNC();
            eduIncomeFlag = 0;

            d3.select(".eduincomeButton")
                .style("background-color", "white");

            d3.selectAll('.eduIncome-path').remove()
            d3.selectAll('.eduIncome-legend').remove()
            d3.selectAll('.eduIncome-legend-heading').remove()

        }

    }

function EduIncomeRemove(){
    eduIncomeFlag = 0;
    d3.select(".eduincomeButton")
      .style("background-color", "white");

    d3.selectAll('.eduIncome-path').remove()
    d3.selectAll('.eduIncome-legend').remove()
    d3.selectAll('.eduIncome-legend-heading').remove()
}
    //end of education + income bivariate map

    //texture smoke map start
    smokeSideBar = d3.select('#smoke-side-bar')
        .append("button")
        .attr("type","button")
        .attr("class","smokeButton")
        .text("Smoking")
        .on('click', showSmokeSideBar);




    function showSmokeSideBar() {

        if(smokeFlag == 0) {
            smokeFlag = 1;

            d3.selectAll('.smoke-path').remove()
            d3.selectAll('.smoke-legend').remove()
            d3.selectAll('#smoke-legend-text').remove()

            d3.select(".smokeButton")
                .style("background-color", "#a1d99b");

                    tlist.forEach(function(t) {
                        svg.call(t);
                    });


                    svg.append('g')
                        .selectAll('path')
                        .data(json.features)
                        .enter().append('path')
                        .attr('d', path)
                        .attr('class', 'smoke-path')
                        .transition()

                        .attr("transform", function (d) {

                            var centroid = path.centroid(d),
                                x = centroid[0],
                                y = centroid[1];
                            if (isNaN(x) || isNaN(y))
                                return null;
                            else {
                                var scale = 0.965;
                                return "translate(" + x + "," + y + ")"
                                    + "scale(" + scale + ")"
                                    + "translate(" + -x + "," + -y + ")";
                            }
                        })
                        .style('fill', function (d,i) {
                            if(d.properties.tobaccoUse<5){return tlist[0].url();}
                            else if(d.properties.tobaccoUse>=5 && d.properties.tobaccoUse<10) {return tlist[1].url();}
                            else if (d.properties.tobaccoUse>=10 && d.properties.tobaccoUse<15) {return tlist[2].url();}
                            else if (d.properties.tobaccoUse>=15) {return tlist[3].url();}
            
                            
                            
                        })
                        .style("opacity", 1);

                    d3.select("#sidebar-right1")
                        .append('svg')
                        .attr("width",$("#sidebar-right1").width())
                        .attr("height",25)
                        .attr("transform", "translate(0,0)")
                        .attr("id", "smoke-legend-text")
                        .append('g')
                        .attr("class","text")
                        .append('text')
                        .attr('x', 0)
                        .attr('y', "75%")
                        .style("text-anchor", "start")
                        .style("font" ,"0.5vw sans-serif")
                        .text('Tobacco Use (Smokers)');

                        console.log(window.innerWidth)

                    if(window.innerWidth<1300 || window.innerHeight<800){
                        var SmokeLegendHeight = $("#sidebar-right1").height()/2;
                        var Ival = 20;
                        var SmokeHeight = 15;
                        var SmokeSpace = 5;
                    }
                    else{
                        var SmokeLegendHeight = 200;
                        var Ival = 45;
                        var SmokeHeight = 30;
                        var SmokeSpace = 20;
                    }

                    var legendSmoke = d3.select("#sidebar-right1")
                                        .append('svg')
                                        .attr("width", $("#sidebar-right1").width())
                                        .attr("height", SmokeLegendHeight)
                                        .attr('class', 'smoke-legend')
                                        .attr("transform", "translate(0,10)")
                                        .append("g");

                    legendSmokeText = ['<5 ', '5=<x<10', '10=<x<15', '>=15']

                    for (var i = 0; i < 4; i++) {
                        legendSmoke.append("g:rect")
                                    .attr("x", 5)
                                    .attr("y",i*Ival +2)
                                    .attr("height", SmokeHeight)
                                    .attr("width", SmokeHeight)
                                    .style("fill", '#FFFFFF')
                                    .style("opacity", "0.9");

                                    legendSmoke.append("text")
                                                .attr("x", 50)
                                                .attr("y", i*Ival +SmokeSpace)
                                                .attr("dy", ".35em")
                                                .style("text-anchor", "start")
                                                .style("font" ,"0.5vw sans-serif")
                                                .text(String(legendSmokeText[i]));
                    }

                    for (var i = 0; i < 4; i++) {
                        legendSmoke.append("g:rect")
                                    .attr("x", 5)
                                    .attr("y",i*Ival +2)
                                    .attr("height", SmokeHeight)
                                    .attr("width", SmokeHeight)
                                    .attr("style", "outline: thin solid black;")
                                    .style("fill", function(d){
                                        return tlist[i].url();
                                    })
                                    .style("opacity", "1");
                    }

                    if(groceryFlag==1){
                        groceryFlag = 0;
                        showGrocerySideBar();
                    }



        }
        else{

            /*updateMap();
            d3.select(".cancerPopulationButton")
              .style("background-color", "#a1d99b");*/
            TotalHNC();
            smokeFlag = 0;

            d3.select(".smokeButton")
                .style("background-color", "white");

            d3.selectAll('.smoke-path').remove()
            d3.selectAll('.smoke-legend').remove()
            d3.selectAll('#smoke-legend-text').remove()

        }


    }
    //texture smoke map end
});
//end of d3 json file


function wrap(text, width) {
    text.each(function () {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
            y = text.attr("y"),
            dy = parseFloat(text.attr("dy")),
            tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan").attr("x", '50%').attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
            }
        }
    })
}


//population chart starts

/*function populationNumber(zipSelect,container) {

    d3.select(container).selectAll('.populationNumber').remove();


    d3.csv('data/filteredPopulation.csv', function (population) {

        var populationCount = 0;
        for (var i = 0; i < population.length; i++) {
            if (population[i]['zip']==zipSelect){

                populationCount = population[i]['totalPopulation'];
                //console.log(zipSelect);
            }
        }

         d3.select(container)
            .append('svg')
            .attr('width', $(container).width())
            .attr('height',$(container).height())
            .attr('class','populationNumber')
            .append("text")
            .attr('x', "50%")
            .attr('y', "30%")
            .style("text-anchor", "middle")
            // .attr('fill', '#006d2c')
            .text(function(d){
                return "People Count: " + populationCount
            });

    })
}
*/
//population chart ends



//read the income file and def income function

/*function incomeChart(zipSelect, container){

    d3.select(container).selectAll('.incomeNumber').remove();
    d3.selectAll('.income-heading').remove();



    d3.csv('data/filteredIncome.csv',function(income){


        var medianIncome = 0;
        for (var i = 0; i < income.length; i++) {
            if (income[i]['zip']==zipSelect){

                medianIncome = income[i]['medianIncome'];
                //console.log(zipSelect);
            }
        }

        var data = [medianIncome,83890];

        var x = d3.scale.linear()
            .domain([0, 83890])
            .range([0, 150]);


        d3.select("#incomeHeading1")
            .append('svg')
            .attr('width', $("#incomeHeading1").width())
            .attr('height',$("#incomeHeading1").height())
            .attr('class','income-heading')
            .append('text')
            .attr('x', "48%")
            .attr('y', "50%")
            .style("text-anchor", "middle")
            .attr('fill', 'black')
            .text("Average Income");

        var tooltipIncomePlot = d3.select("#tooltip-income-plot")
            .attr("class", "tooltip")
            .style("opacity", 0);

        var widthIncome = $(container).width();
        d3.select(container)
            .append('svg')
            .attr('width', $(container).width())
            .attr('height',$(container).height())
            .attr('class','incomeNumber')
            .append('text')
            .attr('x', "50%")
            .attr('y', "70%")
            .style("text-anchor", "middle")
            .attr('fill', 'black')
            .text(function (d) {
                return "Average Income: " + medianIncome + " $"
            })

    });
}*/

//insurance Chart
/*function insuranceChart(zipSelect, container){

    d3.select(container).selectAll('.insuranceChart').remove();




    d3.csv('data/filteredInsurance.csv', function(insurance){

        var insValue;
        for (var i = 0; i < insurance.length; i++) {
            if (insurance[i]['zip']==zipSelect){
                insValue = insurance[i]['percentInsured'];
            }
        }


        var margin = {
            top: 15,
            right: 10,
            bottom: 50,
            left: 80
        };

        d3.select(container)
            .append('svg')
            .attr('width', $(container).width())
            .attr('height',$(container).height())
            .attr('class','insuranceChart')
            .append("text")
            .attr('x', "50%")
            .attr('y', "70%")
            .style("text-anchor", "middle")
            .text(function(d){
                return "People Insured: " + insValue + "%";
            })
    })
}*/


//    show grocery in details
/*function groceryNumber(zipSelect,container) {

    d3.select(container).selectAll('.groceryNumber').remove();

    d3.csv('data/groceryStores.csv', function (grocery) {

        groceryByZIP = d3.nest()
            .key(function (d) { return d.ZIPCODE })
            .rollup(function (v) { return v.length })
            .entries(grocery);

        var groceryValue;
        for (var i = 0; i < groceryByZIP.length; i++){
            if (groceryByZIP[i]["key"] == zipSelect){
                groceryValue = groceryByZIP[i]["values"];
            }
        }


        d3.select(container)
            .append('svg')
            .attr('width', $(container).width())
            .attr('height',$(container).height())
            .attr('class','groceryNumber')
            .append("text")
            .attr('x', "50%")
            .attr('y', "70%")
            .style("text-anchor", "middle")
            // .attr('fill', '#006d2c')
            .text(function(d){
                // console.log(groceryValue)
                if(typeof groceryValue === "undefined"){
                    return "Grocery Stores: " + 0;
                }
                else{
                return "Grocery Stores: " + groceryValue;}
            });

    })
}*/
//show grocery in details end


// cancer Pyramind Chart starts
/*function cancerPyramindChart(zipSelect, container) {


    d3.select(container).select('.cancerPlots').remove();

    var width = $(container).width()/1.2;
    var height = $(container).height()/1.2;

    var margin = {
        top: 30,
        right: 50,
        bottom: 50,
        left: 30
    };

    d3.json('data/cancerTypesCount.json', function (cancerTypesCount) {

        var cancerCount = [];
        for(var i=0; i<cancerTypesCount.length; i++) {
            if (cancerTypesCount[i].zip == zipSelect) {
                cancerCount = (cancerTypesCount[i].properties);
            }
        }

    var stackedCancerChart = d3.select(container)
        .append("svg")
        .attr('class','cancerPlots')
        .attr("width", margin.left + width + margin.right )
        .attr("height", margin.top + height + margin.bottom )
        .append("g")
        .attr('class', 'cancer-plot-inner-region')
        .attr('transform','translate(' + margin.left + ',0)');

// SET UP SCALES

    var xScale = d3.scale.linear()
        .domain([0,400])
        .range([0,width])
        .nice();

    var yScale = d3.scale.ordinal()
        .domain(cancerCount.map(function(d) { return d.type; }))
        .rangeRoundBands([height,0], 0.1);

    var color = d3.scale.ordinal()
        .range(["#C9A0A9","#84AFDD"]);



    var segments = ['Females','Males'];
    cancerCount.sort(function(a, b) { return b.total - a.total; });

    color.domain(segments)

    var layers = d3.layout.stack()(segments.map(function (c) {
        return cancerCount.map(function (d){
            return {x: d['type'], y: +d[c], component: c};
        })
    }))

        stackedCancerChart.append('g')
        .selectAll('g')
        .data(layers)
        .enter().append('g')

        .attr('class', 'cancerTypeStackedChart')
        .attr('fill', function (d,i) {
            return color(i)
        })
        .selectAll('rect')
        .data(function (d) {
            return d
        })
        .enter().append("rect")
        .attr("y", function(d) { return yScale(d.x); })
        .attr("x", function(d) {return xScale(d.y0); })
        .attr("width", function(d) {return xScale(d.y) })
        .attr("height", yScale.rangeBand())
        .on("mouseover", function (d) {

            tooltipCancerPlot.transition()
                .duration(200)
                .style("opacity",0.9);

            tooltipCancerPlot.html(d.component+ ": " + d.y )
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY+18) + "px");
        })
        .on("mouseout", function(d) {
            tooltipCancerPlot.transition()
                .duration(500)
                .style("opacity", 0);

        });


// SET UP AXES
    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient('right')
        .tickSize(4,0);

    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient('bottom')
        .ticks(5)
        .tickFormat(d3.format(''));



    stackedCancerChart.append('g')
        .attr('class', 'axis y cancertype')
        .attr('transform', 'translate(0, 0)')
        .call(yAxis);

    stackedCancerChart.append('g')
        .attr('class', 'axis x')
        .attr('transform', 'translate(0, ' + height + ')')
        .call(xAxis);



    var tooltipCancerPlot = d3.select("#tooltip-cancer-plot")
        .attr("class", "tooltip")
        .style("opacity", 0);

    })

}*/
// cancer Pyramind Chart ends

//Zip heading under Map starts
function zipHeading(zipSelect, container){

    d3.select(container).selectAll('.zipHeading').remove();


    d3.select(container)
        .append('svg')
        .attr('width',$(container).width())
        .attr('height',$(container).height())
        .attr('class','zipHeading')
        .append("text")
        .attr('x', "50%")
        .attr('y', "40%")
        .style("text-anchor", "middle")
        .text(function(d){
            return "Zip: " + zipSelect;
        });

}
//zip head ends

//GroceryNumber show
function groceryNumber(zipSelect,container) {

    d3.select(container).selectAll('.groceryNumber').remove();

    d3.csv('data/groceryStores.csv', function (grocery) {

        groceryByZIP = d3.nest()
            .key(function (d) { return d.ZIPCODE })
            .rollup(function (v) { return v.length })
            .entries(grocery);

        var groceryValue;
        if(zipSelect==77030)
        {
            groceryValue = 4;
        }
        else
        {
            for (var i = 0; i < groceryByZIP.length; i++){
            if (groceryByZIP[i]["key"] == zipSelect){
                groceryValue = groceryByZIP[i]["values"];
                }
            }
        }
        //console.log(groceryValue);


        d3.select(container)
            .append('svg')
            .attr('width', $(container).width())
            .attr('height',$(container).height())
            .attr('class','groceryNumber')
            .append("text")
            .attr('x', "50%")
            .attr('y', "70%")
            .style("text-anchor", "middle")
            // .attr('fill', '#006d2c')
            .text(function(d){
                // console.log(groceryValue)
                if(typeof groceryValue === "undefined"){
                    return "Grocery Stores: " + 0;
                }
                else{
                return "Grocery Stores: " + groceryValue;}
            });

    })
}
//show grocery in details end

//Education show
function educationChart(zipSelect, container){

    d3.select(container).selectAll('.educationClass').remove();
    d3.selectAll('.income-heading').remove();

    d3.csv('data/filteredEducationTotal.csv', function(education){
        var educationPercentage = 0;
        if(zipSelect== 77030)
        {
            educationPercentage = ((6117/10258)*100).toFixed(2);            
        }
        else
        {
            for(var i=0;i<education.length;i++)
        {
            if(education[i].zip==zipSelect)
            {
                educationPercentage = ((education[i].total_educated_population/education[i].totalPopulation)*100).toFixed(2);
            }
        }
        }
        //console.log(educationPercentage);
        // d3.select("#incomeHeading1")
        //     .append('svg')
        //     .attr('width', $("#incomeHeading1").width())
        //     .attr('height',$("#incomeHeading1").height())
        //     .attr('class','income-heading')
        //     .append('text')
        //     .attr('x', "48%")
        //     .attr('y', "50%")
        //     .style("text-anchor", "middle")
        //     .attr('fill', 'black')
        //     .text("Educated People");

        // var tooltipIncomePlot = d3.select("#tooltip-income-plot")
        //     .attr("class", "tooltip")
        //     .style("opacity", 0);

        var widthIncome = $(container).width();
        d3.select(container)
            .append('svg')
            .attr('width', $(container).width())
            .attr('height',$(container).height())
            .attr('class','educationClass')
            .append('text')
            .attr('x', "50%")
            .attr('y', "70%")
            .style("text-anchor", "middle")
            .attr('fill', 'black')
            .text(function (d) {
                if(educationPercentage==0)
                {
                 return "Educated People: No information"  
                }
                else
                {
                    return "Educated People: " + educationPercentage + "%"
                } 
            })

    })
}
//Education end

//Demographics under map starts
function DemoMap(container,zip) {

    d3.selectAll('.Demo').remove();
    d3.selectAll('.Demo1').remove();
    d3.selectAll('.x axis').remove();
    d3.selectAll("#DemoZipHeading").selectAll('svg').remove();
    d3.selectAll("#DemoZipHeading").selectAll('.DemoZipHeading').remove();


    var margin = {top: 0, right: 10, bottom: 10, left: 5},
        width = $(container).width() - margin.left - margin.right-5,
        height = $(container).height() - margin.top - margin.bottom,
        width1 = $(container).width() - 100,
        height1 = $(container).height() - 1,
        svgW = $(container).width() -14;


    var DemoMap = d3.select(container)
        .append("svg")
        .attr("width",$(container).width())
        .attr("height", height1)
        .attr("class", "Demo")
        .append("g")
        .attr("transform", "translate(3,0)");

    var DemoMap1 = d3.select("#DemoZip1")
        .append("svg")
        .attr("width",$("#DemoZip1").width())
        .attr("height", 30)
        .attr("class", "Demo1")
        .append("g")
        .attr("transform", "translate(0,14)");

    var yScale = d3.scale.ordinal()
        .rangeRoundBands([0, height]);

    var yScale1 = d3.scale.ordinal()
        .rangeRoundBands([0, height]);

    var yScale2 = d3.scale.ordinal()
        .rangeRoundBands([0, height]);

    var xScale = d3.scale.linear()
        .rangeRound([margin.left, width-2]);

    var xScale1 = d3.scale.linear()
        .rangeRound([margin.left, width+12]);

    var xaxis = d3.svg.axis()
                .scale(xScale1)
                .orient("top")
                .ticks(10, "%"); // **

    DemoMap1.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(4,5)")
        .call(xaxis);

    var color = d3.scale.ordinal()
        .range(["#80b1d3","#8dd3c7", "#2e2e30"]);

    var color1 = d3.scale.ordinal()
        .range(["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#e5c494", "#000000"]);

    var color2 = d3.scale.ordinal()
        .range(["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fdbf6f", "#000000"]);


    var stack = d3.layout.stack();
    var segmentsStacked = ['Male', 'Female', 'GenderNaN'];
    var segmentsStackedRace = ['White', 'Black', 'American Indian', 'Hispanic', 'Asian', 'Others', 'Ethnicity-NaN'];
    var segmentsStackedInsurance = ['Medicaid/Medicare', 'Blue Cross/Blue Sheild', 'Self-Pay', 'County Care', 'others', 'Insurance-NaN'];

    d3.csv("data/demographics.csv", function(data) {


        var genderOriginalDataZipSelect;

        var demoGenderCount = [];
        var demoRaceCount = [];
        var demoInsuranceCount = [];
        var genderTotal = 0;
        var maleTotal = 0;
        var femaleTotal = 0;
        var genderNaN = 0;
        var ethTotal = 0;
        var whiteTotal = 0;
        var BlackTotal = 0;
        var AITotal = 0;
        var hispanicTotal = 0;
        var asianTotal = 0;
        var ethOthers = 0;
        var ethNan = 0;
        var InsuranceTotal = 0;
        var medTotal = 0;
        var blueTotal = 0;
        var selfpayTotal = 0;
        var countyTotal = 0;
        var InsuranceOthers = 0;
        var InsuranceNaN = 0;
        for(var i =0; i<data.length;i++){

            if(zip=="ALL"){
                genderTotal = genderTotal +1;
                if(data[i]["gender"]==1){maleTotal = maleTotal+1}
                if(data[i]["gender"]==2){femaleTotal = femaleTotal+1}
                if(data[i]["gender"]==""){genderNaN = genderNaN+1}
                ethTotal = ethTotal+1;
                if(data[i]["ethnicity"]==1){whiteTotal = whiteTotal+1}
                if(data[i]["ethnicity"]==2){BlackTotal = BlackTotal+1}
                if(data[i]["ethnicity"]==3){AITotal = AITotal+1}
                if(data[i]["ethnicity"]==4){hispanicTotal = hispanicTotal+1}
                if(data[i]["ethnicity"]==5){asianTotal = asianTotal+1}
                if(data[i]["ethnicity"]==6){ethOthers = ethOthers+1}
                if(data[i]["ethnicity"]==""){ethNan = ethNan+1}
                InsuranceTotal = InsuranceTotal+1;
                if(data[i]["insurance"]==1 || data[i]["insurance"]==2){medTotal = medTotal+1}
                if(data[i]["insurance"]==4){blueTotal = blueTotal+1}
                if(data[i]["insurance"]==8){selfpayTotal = selfpayTotal+1}
                if(data[i]["insurance"]==9){countyTotal = countyTotal+1}
                if(data[i]["insurance"]==10){InsuranceOthers = InsuranceOthers+1}
                if(data[i]["insurance"]==""){InsuranceNaN = InsuranceNaN+1}
            }
            else{
                 if((data[i]["zipcode"]) == zip){
                    genderTotal = genderTotal +1;
                    if(data[i]["gender"]==1){maleTotal = maleTotal+1}
                    if(data[i]["gender"]==2){femaleTotal = femaleTotal+1}
                    if(data[i]["gender"]==""){genderNaN = genderNaN+1}
                    ethTotal = ethTotal+1;
                    if(data[i]["ethnicity"]==1){whiteTotal = whiteTotal+1}
                    if(data[i]["ethnicity"]==2){BlackTotal = BlackTotal+1}
                    if(data[i]["ethnicity"]==3){AITotal = AITotal+1}
                    if(data[i]["ethnicity"]==4){hispanicTotal = hispanicTotal+1}
                    if(data[i]["ethnicity"]==5){asianTotal = asianTotal+1}
                    if(data[i]["ethnicity"]==6){ethOthers = ethOthers+1}
                    if(data[i]["ethnicity"]==""){ethNan = ethNan+1}
                    InsuranceTotal = InsuranceTotal+1;
                    if(data[i]["insurance"]==1 || data[i]["insurance"]==2){medTotal = medTotal+1}
                    if(data[i]["insurance"]==4){blueTotal = blueTotal+1}
                    if(data[i]["insurance"]==8){selfpayTotal = selfpayTotal+1}
                    if(data[i]["insurance"]==9){countyTotal = countyTotal+1}
                    if(data[i]["insurance"]==10){InsuranceOthers = InsuranceOthers+1}
                    if(data[i]["insurance"]==""){InsuranceNaN = InsuranceNaN+1}
                }
            }
        }
        var gmale = ((maleTotal/genderTotal)*100).toFixed(2);
        var gfemale = ((femaleTotal/genderTotal)*100).toFixed(2);
        var gnan = ((genderNaN/genderTotal)*100).toFixed(2);
        var ewhite = ((whiteTotal/ethTotal)*100).toFixed(2);
        var eblack = ((BlackTotal/ethTotal)*100).toFixed(2);
        var eai = ((AITotal/ethTotal)*100).toFixed(2);
        var ehis = ((hispanicTotal/ethTotal)*100).toFixed(2);
        var easian = ((asianTotal/ethTotal)*100).toFixed(2);
        var eother = ((ethOthers/ethTotal)*100).toFixed(2);
        var enan = ((ethNan/ethTotal)*100).toFixed(2);
        var med = ((medTotal/InsuranceTotal)*100).toFixed(2);
        var blue = ((blueTotal/InsuranceTotal)*100).toFixed(2);
        var self = ((selfpayTotal/InsuranceTotal)*100).toFixed(2);
        var county = ((countyTotal/InsuranceTotal)*100).toFixed(2);
        var inother = ((InsuranceOthers/InsuranceTotal)*100).toFixed(2);
        var innan = ((InsuranceNaN/InsuranceTotal)*100).toFixed(2);
        demoGenderCount.push({"Zip": zip, "Male": gmale, "Female": gfemale, "GenderNaN": gnan})
        demoRaceCount.push({'White': ewhite, 'Black': eblack, 'American Indian': eai, 'Hispanic': ehis, 'Asian': easian, 'Others': eother, 'Ethnicity-NaN': enan})
        demoInsuranceCount.push({'Medicaid/Medicare': med, 'Blue Cross/Blue Sheild': blue, 'Self-Pay': self, 'County Care': county, 'others': inother, 'Insurance-NaN': innan})
        //console.log(demoRaceCount)
        //console.log(demoInsuranceCount)
   

        var layers = d3.layout.stack()(segmentsStacked.map(function (c) {
            return demoGenderCount.map(function (d) {
                return {x: +[d.Zip], y: +d[c], component: c};
            });
        }));

        var layers1 = d3.layout.stack()(segmentsStackedRace.map(function (c) {
            return demoRaceCount.map(function (d) {
                return {x: +[d.Zip], y: +d[c], component: c};
            });
        }));

        var layers2 = d3.layout.stack()(segmentsStackedInsurance.map(function (c) {
            return demoInsuranceCount.map(function (d) {
                return {x: +[d.Zip], y: +d[c], component: c};
            });
        }));

        //console.log(layers);
        color.domain(segmentsStacked);
        color1.domain(segmentsStackedRace);
        color2.domain(segmentsStackedInsurance);

        var tooltipDemoGenderPlot = d3.select("#tooltip_demoAll")
            .attr("class", "tooltip")
            .style("opacity", 0);

        xScale.domain([0, 96]);
        yScale.domain(layers[0].map(function(d) { return d.y; }));
        yScale1.domain(layers1[0].map(function(d) { return d.y; }));
        yScale2.domain(layers2[0].map(function(d) { return d.y; }));


        d3.max(layers, function(d) {return d[0]["y"] + d[0]["y0"];})

        var predictHeight = (height1/3)-10;
        var layer = DemoMap.selectAll(".layers")
            .append("svg")
            .data(layers)
            .enter().append("g")
            .attr("class", "layer")
            .attr("width", width1)
            .style("fill", function(d,i) {
                return color(i);
            });

        layer.selectAll("rect")
            .data(function(d) { return d; })
            .enter().append("rect")
            .attr("y", function(d) { return yScale(d.x); })
            .attr("x", function(d) { return xScale(d.y0 ); })
            .attr("width", function(d) {return xScale(d.y + d.y0); })
            .attr("height", predictHeight)
            .on("mouseover", function (d) {
                tooltipDemoGenderPlot.transition()
                    .duration(200)
                    .style("opacity",0.9);
                    //console.log(d["y"])

                tooltipDemoGenderPlot.html(d["component"] + " : " + d["y"] + "%")
                    .style("left", (d3.event.pageX-30) + "px")
                    .style("top", (d3.event.pageY+18) + "px");
            })
            .on("mouseout", function(d) {
                 tooltipDemoGenderPlot.transition()
                    .duration(500)
                    .style("opacity", 0);

            });;

        var h = predictHeight+2;
        var h1 = h+h+2;
        var layer1 = DemoMap.selectAll(".layers")
            .append("svg")
            .data(layers1)
            .enter().append("g")
            .attr("class", "layer1")
            .attr("width", width1)
            .attr("transform", "translate(0," + h + ")")
            .style("fill", function(d,i) {
                return color1(i);
            });

        layer1.selectAll("rect")
            .data(function(d) { return d; })
            .enter().append("rect")
            .attr("y", function(d) { return yScale1(d.x); })
            .attr("x", function(d) { return xScale(d.y0 ); })
            .attr("width", function(d) {return xScale(d.y + d.y0); })
            .attr("height", predictHeight)
            .on("mouseover", function (d) {
                tooltipDemoGenderPlot.transition()
                    .duration(200)
                    .style("opacity",0.9);
                    //console.log(d["y"])

                tooltipDemoGenderPlot.html(d["component"] + " : " + d["y"] + "%")
                    .style("left", (d3.event.pageX-30) + "px")
                    .style("top", (d3.event.pageY+18) + "px");
            })
            .on("mouseout", function(d) {
                 tooltipDemoGenderPlot.transition()
                    .duration(500)
                    .style("opacity", 0);

            });


        var layer2 = DemoMap.selectAll(".layers")
            .append("svg")
            .data(layers2)
            .enter().append("g")
            .attr("class", "layer2")
            .attr("width", width1)
            .attr("transform", "translate(0," + h1 + ")")
            .style("fill", function(d,i) {
                return color2(i);
            });

        layer2.selectAll("rect")
            .data(function(d) { return d; })
            .enter().append("rect")
            .attr("y", function(d) { return yScale2(d.x); })
            .attr("x", function(d) { return xScale(d.y0 ); })
            .attr("width", function(d) {return xScale(d.y + d.y0); })
            .attr("height", predictHeight)
            .on("mouseover", function (d) {
                tooltipDemoGenderPlot.transition()
                    .duration(200)
                    .style("opacity",0.9);
                    //console.log(d["y"])

                tooltipDemoGenderPlot.html(d["component"] + " : " + d["y"] + "%")
                    .style("left", (d3.event.pageX-30) + "px")
                    .style("top", (d3.event.pageY+18) + "px");
            })
            .on("mouseout", function(d) {
                 tooltipDemoGenderPlot.transition()
                    .duration(500)
                    .style("opacity", 0);

            });;
     

    });
    DemoAxis("#DemoZipAxis")

    if(zip=="ALL"){text = "Demographics (All Zipcodes)"}
                else{text = "Demographics " + '( Zipcode: ' + zip + ')'}
            d3.select("#DemoZipHeading")
                        .append('svg')
                        .attr("width",$("#DemoZipHeading").width())
                        .attr("height",$("#DemoZipHeading").height()-8)
                        .append('g')
                        .attr("class","DemoZipHeading")
                        .append('text')
                        .attr("x", "40%")
                        .attr("y", 20)
                        .style("text-anchor", "start")
                        .style("font",'0.6vw sans-serif')
                        .text(text);

}
//Demographics under map ends
DemoMap("#DemoZip", "ALL");
function DemoAxis(container){

    d3.selectAll(".demoAxis").remove();

    var margin = {top: 20, right: 10, bottom: 22, left: 5},
    width = $(container).width() - margin.left - margin.right-15,
    height = $(container).height() - margin.top - margin.bottom;
    p = width - width/2;

    var DemoAxis = d3.select(container)
                            .append("svg")
                            .attr("width", $(container).width())
                            .attr("height", $(container).height())
                            .attr("class", "demoAxis")
                            .append("g")
                            .attr("transform", "translate(" + p + ",15)");

        DemoAxis.append("text")
                .attr("y", "18%")
                .attr("dy", ".40em")
                .style("text-anchor", "start")
                .style("font",'0.6vw sans-serif')
                .text("Gender");

        DemoAxis.append("text")
                .attr("y", "40%")
                .attr("dy", ".40em")
                .style("text-anchor", "start")
                .style("font",'0.6vw sans-serif')
                .text("Ethnicity");

        DemoAxis.append("text")
                .attr("y", "65%")
                .attr("x", -5)
                .attr("dy", ".40em")
                .style("text-anchor", "start")
                .style("font",'0.6vw sans-serif')
                .text("Insurance");


        /*var Yscale = d3.scale.ordinal()
                            .domain(["Gender", "Ethnicity", "Insurance"]).rangeRoundPoints([30, height-50], 0.5);
        var YAxis = d3.svg.axis()
                            .scale(Yscale)
                            .orient('left')
                            .tickSize(10,0);
                             // x-axis
        var y_axis = DemoAxis.append("g")
                                .attr("class", "y axis")
                                .call(YAxis);*/
}

function DemoLegend(){
    var width = $("#DemoLegend").width();
    var height = $("#DemoLegend").height();

    console.log(width, height)


    var DemoL = d3.select("#DemoLegend")
                    .append('svg')
                    .attr("width", width)
                    .attr("height", height)
}
//DemoLegend();
//DemoAxis("#DemoZipAxis")

//Race distribution chart starts for UIC
function raceChart(cohort,container,value) {
	var p = cohort;
	var Urace = [];
	var Mrace = [];


    /*d3.select(container).selectAll('.racePlot').remove();
    d3.selectAll('.raceHeading').remove();
    d3.selectAll('.raceLabel').remove();*/


    /*d3.select('#raceHeading1')
        .append('svg')
        .attr('width', $('#raceHeading1').width())
        .attr('height',$('#raceHeading1').height())
        .attr('class','raceHeading')
        .append('text')
        .attr('x', "50%")
        .attr('y', "70%")
        .style("text-anchor", "middle")
        .attr('fill', 'black')
        .text("Race Distribution");*/


    var margin = {top: 5, right: 10, bottom: 10, left: 5},
        width = $(container).width() - margin.left - margin.right-5,
        height = $(container).height() - margin.top - margin.bottom,
        width1 = $(container).width() - 1,
        height1 = $(container).height() - 1,
        svgW = $(container).width() -14;


    var raceChart = d3.select(container)
        .append("svg")
        .attr("width", $(container).width())
        .attr("height", 10)
        .attr("height", height1)
        .attr("class", "raceAll")
        .append("g")
        .attr("transform", "translate(5,18)");



    /*//scale
    var y = d3.scale.linear()
                .range([0, svgW])
                .domain([0,100]);
    //axis
    var yAxis = d3.svg.axis().scale(y).orient("top").ticks(5).tickPadding(3).tickFormat(function(d) { return d + "%"; });


    var tick = raceChart.append("g")
    			.attr("width", svgW)
        		.attr("height", height1)
	            .attr("class", "yaxis")
	            .attr("transform", "translate(1,5.5)")
	            .call(yAxis);

	var domain = raceChart.selectAll('.domain')
				.attr("width", $(container).width());
        domain.attr({
            fill: 'none',
            'stroke-width': 1,
            stroke: 'black'
        });

	var ticks1 = raceChart.selectAll('.tick line')
				.attr("width", $(container).width());
	        ticks1.attr({
	            fill: 'none',
	            'stroke-width': 2,
	            stroke: 'black'
	        });
*/


    var yScale = d3.scale.ordinal()
        .rangeRoundBands([0, height]);

    var xScale = d3.scale.linear()
        .rangeRound([0, width]);

    var color = d3.scale.ordinal()
        .range(["#80b1d3","#8dd3c7", "#bebada", "#fb8072", "#b3de69", "#fdb462"]);


    var stack = d3.layout.stack();
    var segmentsStacked = ['White', 'Black', 'American Indian', 'Hispanic', 'Asian', 'Others'];

    d3.csv("data/demographicData.csv", function(race) {


        var raceOriginalDataZipSelect;

        var raceCount = [];
        for(var i =0; i<race.length;i++){

            if((race[i]["cohort"]) == p){
                var total = +(race[i]["White"]) + +(race[i]["Black"]) + +(race[i]["American Indian"]) + +(race[i]["Hispanic"]) +
                 +(race[i]["Asian"]) + +(race[i]["Others"]);

                raceOriginalDataZipSelect = race[i];
                race[i]["White"] = ((+(race[i]["White"])/total) *100).toFixed(2);
                race[i]["Black"] = ((+(race[i]["Black"])/total) *100).toFixed(2);
                race[i]["American Indian"] = ((+(race[i]["American Indian"])/total) *100).toFixed(2);
                race[i]["Hispanic"] = ((+(race[i]["Hispanic"])/total) *100).toFixed(2);
                race[i]["Asian"] = ((+(race[i]["Asian"])/total) *100).toFixed(2);
                race[i]["Others"] = ((+(race[i]["Others"])/total) *100).toFixed(2);

                raceCount.push(race[i]);
            }
        }


        var layers = d3.layout.stack()(segmentsStacked.map(function (c) {
            return raceCount.map(function (d) {
                return {x: +[d.cohort], y: +d[c], component: c};
            });
        }));

        //console.log(raceCount);


    color.domain(segmentsStacked);

        var tooltipRacePlot = d3.select("#tooltip_raceAll")
            .attr("class", "tooltip")
            .style("opacity", 0);


    if(p=='UIC')
    {
    	xScale.domain([0, 100]).nice();
    }
    else if(p=='MDACC')
    {
    	xScale.domain([0, 96.5]);
    }
    yScale.domain(layers[0].map(function(d) { return d.y; }));


       d3.max(layers, function(d) {return d[0]["y"] + d[0]["y0"];})


        var layer = raceChart.selectAll(".layers")
        .append("svg")
        .data(layers)
        .enter().append("g")
        .attr("class", "layer")
        .attr("width", width1)
        .style("fill", function(d,i) {
                return color(i);
        });

    layer.selectAll("rect")
        .data(function(d) { return d; })
        .enter().append("rect")
        .attr("y", function(d) { return yScale(d.x); })
        .attr("x", function(d) { return xScale(d.y0 ); })
        .attr("width", function(d) {return xScale(d.y + d.y0); })
        .attr("height", yScale.rangeBand())
        .on("mouseover", function (d) {

            tooltipRacePlot.transition()
                .duration(200)
                .style("opacity",0.9);
                var raceTooltipValue = (d["y"] * (total/100)).toFixed(0);
                if(p=='UIC')
                {
                	var totalPatient = 448;
                }
                else
                {
                	var totalPatient = 644;
                }
                var percentRace = ((raceTooltipValue*100)/totalPatient).toFixed(2);

                tooltipRacePlot.html(d["component"] + " : " + raceTooltipValue + "<br>" + "Percentage : " + percentRace + "%")
                .style("left", (d3.event.pageX-30) + "px")
                .style("top", (d3.event.pageY+18) + "px");
        })
        .on("mouseout", function(d) {
            tooltipRacePlot.transition()
                .duration(500)
                .style("opacity", 0);

        });;


     var raceLegend = layer.append("g")
	            .attr("class", "raceLegend")
	            .attr("transform", function(d) { 
	            	if(d[0]["y"]>0)
	            	{
	            		var Lwidth = d[0]["y0"]+d[0]["y"]/2;
	            		if(p=='UIC')
	            		{
	            			Urace.push(Lwidth);
	            		}
	            		else if(p=='MDACC')
	            		{
	            			Mrace.push(Lwidth);
	            		}
	            		return "translate(" + (xScale(Lwidth)) + ", 5.5)"; 
	            	}
	            })
	            .style("display", function(d) { 
      				if(d[0]["y"]==0)
      					{
      						return "none";
      					}
      			});

	 /*raceLegend.append("line")
      .attr("y1", -8)
      .attr("y2", -1)
      .attr("stroke", "#000");

     raceLegend.append("text")
      .attr("y", -11)
      .attr("x", -7)
      .attr("dy", "0.35em")
      .attr("fill", "#000")
      .style("font", "10px sans-serif")
      .style("display", function(d) { 
      	if(d[0]["y"]==0)
      	{
      		return "none";
      	}
      })
      .text(function(d) { return d[0]["component"]; })*/

      if(value!='Null')
      {
      	if(p=='UIC')
      	{
      		d3.csv('data/UIC.csv', function(patientdata){
      		 for(var i=0;i<patientdata.length;i++)
	  		 {
	    		if(patientdata[i].record_id==value)
	    		{
	    			
	    			var UICraceCircle = d3.svg.symbol().type("triangle-up").size(30);
	          		d3.select('#UICrace').selectAll('.layer')
	            	  .append("path")
	            	  .attr("d", UICraceCircle)
	            	  .attr("class", "UICPatient")
	            	  .style('fill', 'black')
	            	  .attr("transform", function(){
	            	  	if(patientdata[i].ethnicity==1)
	            	  	{
	            	  		return "translate("+ (xScale(Urace[0])) +", "+ yScale.rangeBand()/2 +")";
	            	  	}
	            	  	else if(patientdata[i].ethnicity==2)
	            	  	{
	            	  		return "translate("+ (xScale(Urace[1])) +", "+ yScale.rangeBand()/2 +")";
	            	  	}
	            	  	else if(patientdata[i].ethnicity==4)
	            	  	{
	            	  		return "translate("+ (xScale(Urace[2])) +", "+ yScale.rangeBand()/2 +")";
	            	  	}
	            	  	else if(patientdata[i].ethnicity==5)
	            	  	{
	            	  		return "translate("+ (xScale(Urace[3])) +", "+ yScale.rangeBand()/2 +")";
	            	  	}
	            	  	else if(patientdata[i].ethnicity==6)
	            	  	{
	            	  		return "translate("+ (xScale(Urace[4])) +", "+ yScale.rangeBand()/2 +")";
	            	  	}
	            	  })

                      var PatientZip = patientdata[i].zip_code;
                      zipHeading(PatientZip, '#PatientZipHeading');
                      groceryNumber(PatientZip, '#PatientGroceryHeading');
                      educationChart(PatientZip, '#PatientEducationHeading')
	    		}
	  		 }
	      	})
      	}
      	else if(p=='MDACC')
      	{
      		d3.csv('data/MDACC.csv', function(patientdata){
      		 for(var i=0;i<patientdata.length;i++)
	  		 {
	    		if(patientdata[i].Dummy_ID==value)
	    		{
	    			
	    			var MDACCraceCircle = d3.svg.symbol().type("cross").size(30);
	          		d3.select('#MDACCrace').selectAll('.layer')
	            	  .append("path")
	            	  .attr("d", MDACCraceCircle)
	            	  .attr("class", "MDACCPatient")
	            	  .style('fill', 'black')
	            	  .attr("transform", function(){
	            	  	if(patientdata[i].Race=='White/Caucasion')
	            	  	{
	            	  		return "translate("+ (xScale(Mrace[0])) +", "+ yScale.rangeBand()/2 +")";
	            	  	}
	            	  	else if(patientdata[i].Race=='African American/Black')
	            	  	{
	            	  		return "translate("+ (xScale(Mrace[1])) +", "+ yScale.rangeBand()/2 +")";
	            	  	}
	            	  	else if(patientdata[i].Race=='Hispanic/Latino')
	            	  	{
	            	  		return "translate("+ (xScale(Mrace[2])) +", "+ yScale.rangeBand()/2 +")";
	            	  	}
	            	  	else if(patientdata[i].Race=='Asian')
	            	  	{
	            	  		return "translate("+ (xScale(Mrace[3])) +", "+ yScale.rangeBand()/2 +")";
	            	  	}
	            	  	else if(patientdata[i].Race=='NOS')
	            	  	{
	            	  		return "translate("+ (xScale(Mrace[4])) +", "+ yScale.rangeBand()/2 +")";
	            	  	}
	            	  })
	    		}
	  		 }
	      	})
      	}
	  }

     /*var raceLegend = d3.select(container)
     var scale = d3.scale
          .linear()
          .domain([0, 100])
          .range([0, width]);
     var axis = d3.svg.axis()
            .orient('top')
            .scale(scale);*/



/*        var dataL = 0;
        var offset = 40;

    var raceLegend = d3.select('#raceLabel1')
        .append('svg')
        .attr('width', $('#raceLabel1').width())
        .attr('height',$('#raceLabel1').height())
        .attr('class','raceLabel')
        .append("g")
        .attr("transform", "translate(25," + margin.top + ")")
        .selectAll("g")
        .data(segmentsStacked)
        .enter().append("g")
        .attr("transform", function(d, i) {
            if (i === 0) {
                dataL = d.length + offset;
                return "translate(5,0)"
            } else {
                var newdataL = dataL;
                // console.log(d.length)
                dataL +=  d.length + offset;
                return "translate(5," + (newdataL) + ")"
            }

        });*/

        /*raceLegend.append("rect")
            .attr("x", 0)
            .attr("width", 19)
            .attr("height", 19)
            .attr("fill", color);*/

        // Create text for each legend g
        // Use the data that it inherts to create the SVG text
        /*raceLegend.append("g")
            .attr("transform", "translate(20,0)")
            .append("text")
            .attr("class", "text")
            .attr("text-anchor", "start")
            .attr("x", 30)
            .attr("y", 10)
            .attr("dy", "0.32em")
            .text(function(d) { return d; })
            .call(wrap, offset);*/

    });

}
//Race distribution chart ends


//Gender chart starts
function genderChart(cohort,container,value) {
	var p = cohort;
	var Ugender =[];
	var Mgender = [];


    var margin = {top: 5, right: 10, bottom: 10, left: 5},
        width = $(container).width() - margin.left - margin.right-5,
        height = $(container).height() - margin.top - margin.bottom,
        width1 = $(container).width() - 1,
        height1 = $(container).height() - 1,
        svgW = $(container).width() -14;


    var genderChart = d3.select(container)
        .append("svg")
        .attr("width", $(container).width())
        .attr("height", $(container).height())
        .attr("class", "genderAll")
        .append("g")
        .attr("transform", "translate(5,18)");


    /*var y = d3.scale.linear()
                .range([0, svgW])
                .domain([0,100]);
    //axis
    var yAxis = d3.svg.axis().scale(y).orient("top").ticks(5).tickPadding(3).tickFormat(function(d) { return d + "%"; });


    var tick = genderChart.append("g")
          .attr("width", svgW)
            .attr("height", height1)
              .attr("class", "yaxis")
              .attr("transform", "translate(1,5.5)")
              .call(yAxis);

  var domain = genderChart.selectAll('.domain')
        .attr("width", $(container).width());
        domain.attr({
            fill: 'none',
            'stroke-width': 1,
            stroke: 'black'
        });

  var ticks1 = genderChart.selectAll('.tick line')
        .attr("width", $(container).width());
          ticks1.attr({
              fill: 'none',
              'stroke-width': 2,
              stroke: 'black'
          });
*/

    var yScale = d3.scale.ordinal()
        .rangeRoundBands([0, height]);

    var xScale = d3.scale.linear()
        .rangeRound([0, width]);

    var color = d3.scale.ordinal()
        .range(["#8da0cb","#e78ac3", "#bebada"]);


    var stack = d3.layout.stack();
    var segmentsStacked = ['Male', 'Female', 'NAN'];

    d3.csv("data/demographicData.csv", function(gender) {


        var genderOriginalDataZipSelect;

        var genderCount = [];
        for(var i =0; i<gender.length;i++){

            if((gender[i]["cohort"]) == p){
                var total = +(gender[i]["Male"]) + +(gender[i]["Female"]) + +(gender[i]["NAN"]);

                genderOriginalDataZipSelect = gender[i];
                gender[i]["Male"] = ((+(gender[i]["Male"])/total) *100).toFixed(2);
                gender[i]["Female"] = ((+(gender[i]["Female"])/total) *100).toFixed(2);
                gender[i]["NAN"] = ((+(gender[i]["NAN"])/total) *100).toFixed(2);

                genderCount.push(gender[i]);
            }
        }


        var layers = d3.layout.stack()(segmentsStacked.map(function (c) {
            return genderCount.map(function (d) {
                return {x: +[d.cohort], y: +d[c], component: c};
            });
        }));


    color.domain(segmentsStacked);

        var tooltipGenderPlot = d3.select("#tooltip_genderAll")
            .attr("class", "tooltip")
            .style("opacity", 0);

     if(p=='UIC')
    {
    	xScale.domain([0, 100]).nice();
    }
    else if(p=='MDACC')
    {
    	xScale.domain([0, 93]);
    }

    yScale.domain(layers[0].map(function(d) { return d.y; }));


       d3.max(layers, function(d) {return d[0]["y"] + d[0]["y0"];})


        var layer = genderChart.selectAll(".layers")
        .data(layers)
        .enter().append("g")
        .attr("class", "layer")
        .style("fill", function(d,i) {
                return color(i);
        });


    layer.selectAll("rect")
        .data(function(d) { return d; })
        .enter().append("rect")
        .attr("y", function(d) { return yScale(d.x); })
        .attr("x", function(d) {return xScale(d.y0 ); })
        .attr("width", function(d) {
        	//Lwidth value
                var Lwidth = (d["y0"]+d["y"])/2;
       			if(p=='UIC')
       			{
       				Ugender.push(Lwidth);
       			}
       			else if(p=='MDACC')
       			{
       				Mgender.push(Lwidth);
       			}
       			//Lwidth value end
        	return xScale(d.y + d.y0); })
        .attr("height", yScale.rangeBand())
        .on("mouseover", function (d) {

            tooltipGenderPlot.transition()
                .duration(200)
                .style("opacity",0.9);
                var genderTooltipValue = (d["y"] * (total/100)).toFixed(0);

                if(p=='UIC')
                {
                	var totalPatient = 448;
                }
                else
                {
                	var totalPatient = 644;
                }
                var percentGender = ((genderTooltipValue*100)/totalPatient).toFixed(2);

                tooltipGenderPlot.html(d["component"] + " : " + genderTooltipValue + "<br>" + "Percentage : " + percentGender + "%")
                .style("left", (d3.event.pageX-30) + "px")
                .style("top", (d3.event.pageY+18) + "px");
        })
        .on("mouseout", function(d) {
            tooltipGenderPlot.transition()
                .duration(500)
                .style("opacity", 0);

        });

        var GenderLegend = layer.append("g")
                .attr("class", "GenderLegend")
                .attr("transform", function(d) { 
                    var Lwidth = d[0]["y0"]+d[0]["y"]/2;
                    if(p=='UIC')
                    {
                        Ugender.push(Lwidth);
                    }
                    else if(p=='MDACC')
                    {
                        Mgender.push(Lwidth);
                    }
                    return "translate(" + (xScale(Lwidth)) + ", 5.5)";
                })
                .style("display", function(d) { 
                    if(d[0]["y"]==0)
                        {
                            return "none";
                        }
                });

         GenderLegend.append("line")
          .attr("y1", -8)
          .attr("y2", -1)
          .attr("stroke", "#000");

         GenderLegend.append("text")
          .attr("y", -14)
          .attr("x", function(d){
            if(p=='MDACC')
            {
                if(d[0]["component"]=='Female')
                {
                    return -22;
                }
                else return -9;
            }
            else return -9;
          })
          .attr("dy", "0.35em")
          .attr("fill", "#000")
          .style("font",'0.4vw sans-serif')
          .style("display", function(d) { 
            if(d[0]["y"]==0)
            {
                return "none";
            }
          })
          .text(function(d){
            return d[0]["component"];
          });


       if(value!='Null')
      {
      	if(p=='UIC')
      	{
      		d3.csv('data/UIC.csv', function(patientdata){
      		 for(var i=0;i<patientdata.length;i++)
	  		 {
	    		if(patientdata[i].record_id==value)
	    		{
	    			
	    			var UICgenderCircle = d3.svg.symbol().type("triangle-up").size(30);
	          		d3.select('#UICgender').selectAll('.layer')
	            	  .append("path")
	            	  .attr("d", UICgenderCircle)
	            	  .attr("class", "UICPatient")
	            	  .style('fill', 'black')
	            	  .attr("transform", function(){
	            	  	if(patientdata[i].gender==1)
	            	  	{
	            	  		return "translate("+ (xScale(Ugender[0])) +", "+ yScale.rangeBand()/2 +")";
	            	  	}
	            	  	else if(patientdata[i].gender==2)
	            	  	{
	            	  		return "translate("+ (xScale(Ugender[1])) +", "+ yScale.rangeBand()/2 +")";
	            	  	}
	            	  	else if(patientdata[i].gender==100)
	            	  	{
	            	  		return "translate("+ (xScale(Ugender[2])) +", "+ yScale.rangeBand()/2 +")";
	            	  	}
	            	  })
	    		}
	  		 }
	      	})
      	}
      	else if(p=='MDACC')
      	{
      		d3.csv('data/MDACC.csv', function(patientdata){
      		 for(var i=0;i<patientdata.length;i++)
	  		 {
	    		if(patientdata[i].Dummy_ID==value)
	    		{
	    			
	    			var MDACCgenderCircle = d3.svg.symbol().type("cross").size(30);
	          		d3.select('#MDACCgender').selectAll('.layer')
	            	  .append("path")
	            	  .attr("d", MDACCgenderCircle)
	            	  .attr("class", "MDACCPatient")
	            	  .style('fill', 'black')
	            	  .attr("transform", function(){
	            	  	if(patientdata[i].Gender=='Male')
	            	  	{
	            	  		return "translate("+ (xScale(Mgender[0])) +", "+ yScale.rangeBand()/2 +")";
	            	  	}
	            	  	else if(patientdata[i].Gender=='Female')
	            	  	{
	            	  		return "translate("+ (xScale(Mgender[1])) +", "+ yScale.rangeBand()/2 +")";
	            	  	}
	            	  	
	            	  })
	    		}
	  		 }
	      	})
      	}
	  }

    });

}
//Gender chart ends


//tcat chart starts
function tcatChart(cohort,container,value) {
	var p = cohort;
	var Utcat = [];
	var Mtcat = [];


    var margin = {top: 5, right: 10, bottom: 10, left: 5},
        width = $(container).width() - margin.left - margin.right-5,
        height = $(container).height() - margin.top - margin.bottom,
        width1 = $(container).width() - 1,
        height1 = $(container).height() - 1,
        svgW = $(container).width() -14;


    var tcatChart = d3.select(container)
        .append("svg")
        .attr("width", $(container).width())
        .attr("height", $(container).height())
        .attr("class", "tcatAll")
        .append("g")
        .attr("transform", "translate(5,18)");

    var yScale = d3.scale.ordinal()
        .rangeRoundBands([0, height], .1);

    var xScale = d3.scale.linear()
        .rangeRound([0, width]);

    var color = d3.scale.ordinal()
        .range(["#386cb0", "#ffff99", "#fdc086", "#beaed4", "#7fc97f", "#bebada"]);


    var stack = d3.layout.stack();
    var segmentsStacked = ['Tx', 'T1', 'T2', 'T3', 'T4', 'T NAN'];

    d3.csv("data/demographicData.csv", function(tcat) {

        var tcatOriginalDataZipSelect;

        var tcatCount = [];
        for(var i =0; i<tcat.length;i++){

            if((tcat[i]["cohort"]) == p){
                var total = +(tcat[i]["Tx"]) + +(tcat[i]["T1"]) + +(tcat[i]["T2"]) + +(tcat[i]["T3"])
                + +(tcat[i]["T4"]) + +(tcat[i]["T NAN"]);

                tcatOriginalDataZipSelect = tcat[i];
                tcat[i]["Tx"] = ((+(tcat[i]["Tx"])/total) *100).toFixed(2);
                tcat[i]["T1"] = ((+(tcat[i]["T1"])/total) *100).toFixed(2);
                tcat[i]["T2"] = ((+(tcat[i]["T2"])/total) *100).toFixed(2);
                tcat[i]["T3"] = ((+(tcat[i]["T3"])/total) *100).toFixed(2);
                tcat[i]["T4"] = ((+(tcat[i]["T4"])/total) *100).toFixed(2);
                tcat[i]["T NAN"] = ((+(tcat[i]["T NAN"])/total) *100).toFixed(2);

                tcatCount.push(tcat[i]);
            }
        }


        var layers = d3.layout.stack()(segmentsStacked.map(function (c) {
            return tcatCount.map(function (d) {
                return {x: +[d.cohort], y: +d[c], component: c};
            });
        }));
        //console.log(layers)


    color.domain(segmentsStacked);

        var tooltipTcatPlot = d3.select("#tooltip_tcatAll")
            .attr("class", "tooltip")
            .style("opacity", 0);

    if(p=='UIC')
    {
    	xScale.domain([0, 100]).nice();
    }
    else if(p=='MDACC')
    {
    	xScale.domain([0, 95]);
    }
    yScale.domain(layers[0].map(function(d) { return d.y; }));


       d3.max(layers, function(d) {return d[0]["y"] + d[0]["y0"];})


        var layer = tcatChart.selectAll(".layers")
        .data(layers)
        .enter().append("g")
        .attr("class", "layer")
        .style("fill", function(d,i) {
                return color(i);
        });


    layer.selectAll("rect")
        .data(function(d) { return d; })
        .enter().append("rect")
        .attr("y", function(d) { return yScale(d.x); })
        .attr("x", function(d) {return xScale(d.y0 ); })
        .attr("width", function(d) {return xScale(d.y + d.y0); })
        .attr("height", yScale.rangeBand())
        .on("mouseover", function (d) {

            tooltipTcatPlot.transition()
                .duration(200)
                .style("opacity",0.9);
                var tcatTooltipValue = (d["y"] * (total/100)).toFixed(0);
                if(p=='UIC')
                {
                	var totalPatient = 448;
                }
                else
                {
                	var totalPatient = 644;
                }
                var percentTcat = ((tcatTooltipValue*100)/totalPatient).toFixed(2);

                tooltipTcatPlot.html(d["component"] + " : " + tcatTooltipValue + "<br>" + "Percentage : " + percentTcat + "%")
                .style("left", (d3.event.pageX-30) + "px")
                .style("top", (d3.event.pageY+18) + "px");
        })
        .on("mouseout", function(d) {
            tooltipTcatPlot.transition()
                .duration(500)
                .style("opacity", 0);

        });

        var TcatLegend = layer.append("g")
	            .attr("class", "TcatLegend")
	            .attr("transform", function(d) { 
	            	var Lwidth = d[0]["y0"]+d[0]["y"]/2;
	            	if(p=='UIC')
	            	{
	            		Utcat.push(Lwidth);
	            	}
	            	else if(p=='MDACC')
	            	{
	            		Mtcat.push(Lwidth);
	            	}
	            	return "translate(" + (xScale(Lwidth)) + ", 5.5)";
	            })
	            .style("display", function(d) { 
      				if(d[0]["y"]==0)
      					{
      						return "none";
      					}
      			});

		 TcatLegend.append("line")
	      .attr("y1", -8)
	      .attr("y2", -1)
	      .attr("stroke", "#000");

	     TcatLegend.append("text")
	      .attr("y", -14)
	      .attr("x", function(d){
            if(p=='MDACC')
            {
                if(d[0]["component"]=='Tx')
                {
                    return -6;
                }
                else return -9;
            }
            else return -9;
          })
	      .attr("dy", "0.35em")
	      .attr("fill", "#000")
	      .style("font",'0.4vw sans-serif')
	      .style("display", function(d) { 
	      	if(d[0]["y"]==0)
	      	{
	      		return "none";
	      	}
	      })
	      .text(function(d){
	      	return d[0]["component"];
	      });

	      if(value!='Null')                                            
	      {
	      	if(p=='UIC')
	      	{        
	      		d3.csv('data/UIC.csv', function(patientdata){
	      		 for(var i=0;i<patientdata.length;i++)
		  		 {
		    		if(patientdata[i].record_id==value)
		    		{
		    			
		    			var UICtcatCircle = d3.svg.symbol().type("triangle-up").size(30);
		          		d3.select('#UICtcat').selectAll('.layer')
		            	  .append("path")
		            	  .attr("d", UICtcatCircle)
		            	  .attr("class", "UICPatient")
		            	  .style('fill', 'black')
		            	  .attr("transform", function(){
		            	  	if(patientdata[i].t_stage_clinical==2)
		            	  	{
		            	  		return "translate("+ (xScale(Utcat[0])) +", "+ yScale.rangeBand()/2 +")";
		            	  	}
		            	  	else if(patientdata[i].t_stage_clinical==3 || patientdata[i].t_stage_clinical==4 || patientdata[i].t_stage_clinical==5)
		            	  	{
		            	  		return "translate("+ (xScale(Utcat[1])) +", "+ yScale.rangeBand()/2 +")";
		            	  	}
		            	  	else if(patientdata[i].t_stage_clinical==6)
		            	  	{
		            	  		return "translate("+ (xScale(Utcat[2])) +", "+ yScale.rangeBand()/2 +")";
		            	  	}
		            	  	else if(patientdata[i].t_stage_clinical==7)
		            	  	{
		            	  		return "translate("+ (xScale(Utcat[3])) +", "+ yScale.rangeBand()/2 +")";
		            	  	}
		            	  	else if(patientdata[i].t_stage_clinical==8 || patientdata[i].t_stage_clinical==9 || patientdata[i].t_stage_clinical==10)
		            	  	{
		            	  		return "translate("+ (xScale(Utcat[4])) +", "+ yScale.rangeBand()/2 +")";
		            	  	}
		            	  	else if(patientdata[i].t_stage_clinical==100)
		            	  	{
		            	  		return "translate("+ (xScale(Utcat[5])) +", "+ yScale.rangeBand()/2 +")";
		            	  	}
		            	  })
		    		}
		  		 }
		      	})
	      	}
	      	else if(p=='MDACC')
	      	{
	      		d3.csv('data/MDACC.csv', function(patientdata){
	      		 for(var i=0;i<patientdata.length;i++)
		  		 {
		    		if(patientdata[i].Dummy_ID==value)
		    		{
		    			
		    			var MDACCtcatCircle = d3.svg.symbol().type("cross").size(30);
		          		d3.select('#MDACCtcat').selectAll('.layer')
		            	  .append("path")
		            	  .attr("d", MDACCtcatCircle)
		            	  .attr("class", "MDACCPatient")
		            	  .style('fill', 'black')
		            	  .attr("transform", function(){
		            	  	if(patientdata[i].T_category=='T1')
		            	  	{
		            	  		return "translate("+ (xScale(Mtcat[1])) +", "+ yScale.rangeBand()/2 +")";
		            	  	}
		            	  	else if(patientdata[i].T_category=='T2')
		            	  	{
		            	  		return "translate("+ (xScale(Mtcat[2])) +", "+ yScale.rangeBand()/2 +")";
		            	  	}
		            	  	else if(patientdata[i].T_category=='T3')
		            	  	{
		            	  		return "translate("+ (xScale(Mtcat[3])) +", "+ yScale.rangeBand()/2 +")";
		            	  	}
		            	  	else if(patientdata[i].T_category=='T4')
		            	  	{
		            	  		return "translate("+ (xScale(Mtcat[4])) +", "+ yScale.rangeBand()/2 +")";
		            	  	}
		            	  	
		            	  })
		    		}
		  		 }
		      	})
	      	}
		  }

    });

}
//tcat chart ends


//ncat chart starts
function ncatChart(cohort,container,value) {
	var p = cohort;
	var Uncat = [];
	var Mncat = [];

    var margin = {top: 5, right: 10, bottom: 10, left: 5},
        width = $(container).width() - margin.left - margin.right-5,
        height = $(container).height() - margin.top - margin.bottom,
        width1 = $(container).width() - 1,
        height1 = $(container).height() - 1,
        svgW = $(container).width() -14;


    var ncatChart = d3.select(container)
        .append("svg")
        .attr("width", $(container).width())
        .attr("height", $(container).height())
        .attr("class", "ncatAll")
        .append("g")
        .attr("transform", "translate(5,18)");

    var yScale = d3.scale.ordinal()
        .rangeRoundBands([0, height], .1);

    var xScale = d3.scale.linear()
        .rangeRound([0, width]);

    var color = d3.scale.ordinal()
        .range(["#fdbf6f","#33a02c", "#b2df8a", "#a6cee3", "#bebada"]);


    var stack = d3.layout.stack();
    var segmentsStacked = ['N0', 'N1', 'N2', 'N3', 'N_NAN'];

    d3.csv("data/demographicData.csv", function(ncat) {


        var ncatOriginalDataZipSelect;

        var ncatCount = [];
        for(var i =0; i<ncat.length;i++){

            if((ncat[i]["cohort"]) == p){
                var total = +(ncat[i]["N0"]) + +(ncat[i]["N1"]) + +(ncat[i]["N2"]) + +(ncat[i]["N3"]) +
                 +(ncat[i]["N_NAN"]);

                ncatOriginalDataZipSelect = ncat[i];
                ncat[i]["N0"] = ((+(ncat[i]["N0"])/total) *100).toFixed(2);
                ncat[i]["N1"] = ((+(ncat[i]["N1"])/total) *100).toFixed(2);
                ncat[i]["N2"] = ((+(ncat[i]["N2"])/total) *100).toFixed(2);
                ncat[i]["N3"] = ((+(ncat[i]["N3"])/total) *100).toFixed(2);
                ncat[i]["N_NAN"] = ((+(ncat[i]["N_NAN"])/total) *100).toFixed(2);

                ncatCount.push(ncat[i]);
            }
        }


        var layers = d3.layout.stack()(segmentsStacked.map(function (c) {
            return ncatCount.map(function (d) {
                return {x: +[d.cohort], y: +d[c], component: c};
            });
        }));


    color.domain(segmentsStacked);

        var tooltipNcatPlot = d3.select("#tooltip_ncatAll")
            .attr("class", "tooltip")
            .style("opacity", 0);

    if(p=='UIC')
    {
    	xScale.domain([0, 100]).nice();
    }
    else if(p=='MDACC')
    {
    	xScale.domain([0, 96.5]);
    }
    yScale.domain(layers[0].map(function(d) { return d.y; }));


       d3.max(layers, function(d) {return d[0]["y"] + d[0]["y0"];})


        var layer = ncatChart.selectAll(".layers")
        .data(layers)
        .enter().append("g")
        .attr("class", "layer")
        .style("fill", function(d,i) {
                return color(i);
        });


    layer.selectAll("rect")
        .data(function(d) { return d; })
        .enter().append("rect")
        .attr("y", function(d) { return yScale(d.x); })
        .attr("x", function(d) {return xScale(d.y0 ); })
        .attr("width", function(d) {return xScale(d.y + d.y0); })
        .attr("height", yScale.rangeBand())
        .on("mouseover", function (d) {

            tooltipNcatPlot.transition()
                .duration(200)
                .style("opacity",0.9);
                var ncatTooltipValue = (d["y"] * (total/100)).toFixed(0);
                if(p=='UIC')
                {
                	var totalPatient = 448;
                }
                else
                {
                	var totalPatient = 644;
                }
                var percentNcat = ((ncatTooltipValue*100)/totalPatient).toFixed(2);

                tooltipNcatPlot.html(d["component"] + " : " + ncatTooltipValue + "<br>" + "Percentage : " + percentNcat + "%")
                .style("left", (d3.event.pageX-30) + "px")
                .style("top", (d3.event.pageY+18) + "px");
        })
        .on("mouseout", function(d) {
            tooltipNcatPlot.transition()
                .duration(500)
                .style("opacity", 0);

        });

        var NcatLegend = layer.append("g")
	            .attr("class", "NcatLegend")
	            .attr("transform", function(d) { 
	            	var Lwidth = d[0]["y0"]+d[0]["y"]/2;
	            	if(p=='UIC')
	            	{
	            		Uncat.push(Lwidth);
	            	}
	            	else if(p=='MDACC')
	            	{
	            		Mncat.push(Lwidth);
	            	}
	            	return "translate(" + (xScale(Lwidth)) + ", 5.5)";
	            })
	            .style("display", function(d) { 
      				if(d[0]["y"]==0)
      					{
      						return "none";
      					}
      			});

		 NcatLegend.append("line")
	      .attr("y1", -8)
	      .attr("y2", -1)
	      .attr("stroke", "#000");

	     NcatLegend.append("text")
	      .attr("y", -14)
	      .attr("x", -9)
	      .attr("dy", "0.35em")
	      .attr("fill", "#000")
	      .style("font",'0.4vw sans-serif')
	      .style("display", function(d) { 
	      	if(d[0]["y"]==0)
	      	{
	      		return "none";
	      	}
	      })
	      .text(function(d){
	      	return d[0]["component"];
	      });


	      if(value!='Null')
	      {
	      	if(p=='UIC')
	      	{
	      		d3.csv('data/UIC.csv', function(patientdata){
	      		 for(var i=0;i<patientdata.length;i++)
		  		 {
		    		if(patientdata[i].record_id==value)
		    		{
		    			
		    			var UICncatCircle = d3.svg.symbol().type("triangle-up").size(30);
		          		d3.select('#UICncat').selectAll('.layer')
		            	  .append("path")
		            	  .attr("d", UICncatCircle)
		            	  .attr("class", "UICPatient")
		            	  .style('fill', 'black')
		            	  .attr("transform", function(){
		            	  	if(patientdata[i].n_stage_clinical==1)
		            	  	{
		            	  		return "translate("+ (xScale(Uncat[0])) +", "+ yScale.rangeBand()/2 +")";
		            	  	}
		            	  	else if(patientdata[i].n_stage_clinical==2)
		            	  	{
		            	  		return "translate("+ (xScale(Uncat[1])) +", "+ yScale.rangeBand()/2 +")";
		            	  	}
		            	  	else if(patientdata[i].n_stage_clinical==3  || patientdata[i].n_stage_clinical==4 || patientdata[i].n_stage_clinical==5  || patientdata[i].n_stage_clinical==6)
		            	  	{
		            	  		return "translate("+ (xScale(Uncat[2])) +", "+ yScale.rangeBand()/2 +")";
		            	  	}
		            	  	else if(patientdata[i].n_stage_clinical==7)
		            	  	{
		            	  		return "translate("+ (xScale(Uncat[3])) +", "+ yScale.rangeBand()/2 +")";
		            	  	}
		            	  	else if(patientdata[i].n_stage_clinical==100)
		            	  	{
		            	  		return "translate("+ (xScale(Uncat[4])) +", "+ yScale.rangeBand()/2 +")";
		            	  	}
		            	  })
		    		}
		  		 }
		      	})
	      	}
	      	else if(p=='MDACC')
	      	{
	      		d3.csv('data/MDACC.csv', function(patientdata){
	      		 for(var i=0;i<patientdata.length;i++)
		  		 {
		    		if(patientdata[i].Dummy_ID==value)
		    		{
		    			
		    			var MDACCncatCircle = d3.svg.symbol().type("cross").size(30);
		          		d3.select('#MDACCncat').selectAll('.layer')
		            	  .append("path")
		            	  .attr("d", MDACCncatCircle)
		            	  .attr("class", "MDACCPatient")
		            	  .style('fill', 'black')
		            	  .attr("transform", function(){
		            	  	if(patientdata[i].N_category=='N0')
		            	  	{
		            	  		return "translate("+ (xScale(Mncat[0])) +", "+ yScale.rangeBand()/2 +")";
		            	  	}
		            	  	else if(patientdata[i].N_category=='N1')
		            	  	{
		            	  		return "translate("+ (xScale(Mncat[1])) +", "+ yScale.rangeBand()/2 +")";
		            	  	}
		            	  	else if(patientdata[i].N_category=='N2')
		            	  	{
		            	  		return "translate("+ (xScale(Mncat[2])) +", "+ yScale.rangeBand()/2 +")";
		            	  	}
		            	  	else if(patientdata[i].N_category=='N3')
		            	  	{
		            	  		return "translate("+ (xScale(Mncat[3])) +", "+ yScale.rangeBand()/2 +")";
		            	  	}
		            	  	
		            	  })
		    		}
		  		 }
		      	})
	      	}
		  }

    });

}
//ncat chart ends

//Feeding chart for All starts
function feedingChart(cohort,container,value) {
	var p = cohort;
	var Ufeed = [];
	var Mfeed = [];

    var margin = {top: 5, right: 10, bottom: 10, left: 5},
        width = $(container).width() - margin.left - margin.right-5,
        height = $(container).height() - margin.top - margin.bottom,
        width1 = $(container).width() - 1,
        height1 = $(container).height() - 1,
        svgW = $(container).width() -14;


    var feedingChart = d3.select(container)
        .append("svg")
        .attr("width", $(container).width())
        .attr("height", $(container).height())
        .attr("class", "FeedingAll")
        .append("g")
        .attr("transform", "translate(5,18)");

    

    var yScale = d3.scale.ordinal()
        .rangeRoundBands([0, height], .1);

    var xScale = d3.scale.linear()
        .rangeRound([0, width]);

    var color = d3.scale.ordinal()
        .range(["#b3cde3","#ccebc5", "#bebada"]);


    var stack = d3.layout.stack();
    var segmentsStacked = ['FT_Y', 'FT_N', 'FT_NaN'];
    var Flegend = ['Yes', 'No', 'NaN'];

    d3.csv("data/demographicData.csv", function(feeding) {


        var feedingOriginalDataZipSelect;

        var feedingCount = [];
        for(var i =0; i<feeding.length;i++){

            if((feeding[i]["cohort"]) == p){
                var total = +(feeding[i]["FT_Y"]) + +(feeding[i]["FT_N"]) + +(feeding[i]["FT_NaN"]);

                feedingOriginalDataZipSelect = feeding[i];
                feeding[i]["FT_Y"] = ((+(feeding[i]["FT_Y"])/total) *100).toFixed(2);
                feeding[i]["FT_N"] = ((+(feeding[i]["FT_N"])/total) *100).toFixed(2);
                feeding[i]["FT_NaN"] = ((+(feeding[i]["FT_NaN"])/total) *100).toFixed(2);

                feedingCount.push(feeding[i]);
            }
        }


        var layers = d3.layout.stack()(segmentsStacked.map(function (c) {
            return feedingCount.map(function (d) {
                return {x: +[d.cohort], y: +d[c], component: c};
            });
        }));


    color.domain(segmentsStacked);

        var tooltipFeedingPlot = d3.select("#tooltip_FeedingAll")
            .attr("class", "tooltip")
            .style("opacity", 0);

    if(p=='UIC')
    {
        xScale.domain([0, 100]).nice();
    }
    else if(p=='MDACC')
    {
        xScale.domain([0, 99]);
    }
    yScale.domain(layers[0].map(function(d) { return d.y; }));


       d3.max(layers, function(d) {return d[0]["y"] + d[0]["y0"];})


        var layer = feedingChart.selectAll(".layers")
        .data(layers)
        .enter().append("g")
        .attr("class", "layer")
        .style("fill", function(d,i) {
                return color(i);
        });


    layer.selectAll("rect")
        .data(function(d) { return d; })
        .enter().append("rect")
        .attr("y", function(d) { return yScale(d.x); })
        .attr("x", function(d) {return xScale(d.y0 ); })
        .attr("width", function(d) {
            return xScale(d.y + d.y0); 
        })
        .attr("height", yScale.rangeBand())
        .on("mouseover", function (d) {

            tooltipFeedingPlot.transition()
                .duration(200)
                .style("opacity",0.9);
                var feedingTooltipValue = (d["y"] * (total/100)).toFixed(0);
                if(p=='UIC')
                {
                	var totalPatient = 448;
                }
                else
                {
                	var totalPatient = 644;
                }
                var percentFeeding = ((feedingTooltipValue*100)/totalPatient).toFixed(2);

                tooltipFeedingPlot.html(d["component"] + " : " + feedingTooltipValue + "<br>" + "Percentage : " + percentFeeding + "%")
                .style("left", (d3.event.pageX-30) + "px")
                .style("top", (d3.event.pageY+18) + "px");
        })
        .on("mouseout", function(d) {
            tooltipFeedingPlot.transition()
                .duration(500)
                .style("opacity", 0);

        });
        var FeedingLegend = layer.append("g")
	            .attr("class", "FeedingLegend")
	            .attr("transform", function(d) { 
	            	var Lwidth = d[0]["y0"]+d[0]["y"]/2;
	            	if(p=='UIC')
	            	{
	            		Ufeed.push(Lwidth);
	            	}
	            	else if(p=='MDACC')
	            	{
	            		Mfeed.push(Lwidth);
	            	}
	            	return "translate(" + (xScale(Lwidth)) + ", 5.5)";
	            })
	            .style("display", function(d) { 
      				if(d[0]["y"]==0)
      					{
      						return "none";
      					}
      			});

		 FeedingLegend.append("line")
	      .attr("y1", -8)
	      .attr("y2", -1)
	      .attr("stroke", "#000");

	     FeedingLegend.append("text")
	      .attr("y", -14)
	      .attr("x", function(d){
            if(d[0]["component"]=="FT_NaN")
            {
                return -9;
            }
            else
            {
                return -7;
            }
          })
	      .attr("dy", "0.35em")
	      .attr("fill", "#000")
	      .style("font",'0.4vw sans-serif')
	      .style("display", function(d) { 
	      	if(d[0]["y"]==0)
	      	{
	      		return "none";
	      	}
	      })
	      .text(function(d){
	      	if(d[0]["component"]=="FT_Y")
	      	{
	      		return "Yes";
	      	}
	      	else if(d[0]["component"]=="FT_N")
	      	{
	      		return "No";
	      	}
	      	else if(d[0]["component"]=="FT_NaN")
	      	{
	      		return "NaN";
	      	}
	      });


	      if(value!='Null')
	      {
	      	if(p=='UIC')
	      	{
	      		d3.csv('data/UIC.csv', function(patientdata){
	      		 for(var i=0;i<patientdata.length;i++)
		  		 {
		    		if(patientdata[i].record_id==value)
		    		{
		    			
		    			var UICfeedCircle = d3.svg.symbol().type("triangle-up").size(30);
		          		d3.select('#UICfeeding').selectAll('.layer')
		            	  .append("path")
		            	  .attr("d", UICfeedCircle)
		            	  .attr("class", "UICPatient")
		            	  .style('fill', 'black')
		            	  .attr("transform", function(){
		            	  	if(patientdata[i].feeding==1)
		            	  	{
		            	  		return "translate("+ (xScale(Ufeed[0])) +", "+ yScale.rangeBand()/2 +")";
		            	  	}
		            	  	else if(patientdata[i].feeding==0)
		            	  	{
		            	  		return "translate("+ (xScale(Ufeed[1])) +", "+ yScale.rangeBand()/2 +")";
		            	  	}
		            	  	else if(patientdata[i].feeding==100)
		            	  	{
		            	  		return "translate("+ (xScale(Ufeed[2])) +", "+ yScale.rangeBand()/2 +")";
		            	  	}
		            	  })
		    		}
		  		 }
		      	})
	      	}
	      	else if(p=='MDACC')
	      	{
	      		d3.csv('data/MDACC.csv', function(patientdata){
	      		 for(var i=0;i<patientdata.length;i++)
		  		 {
		    		if(patientdata[i].Dummy_ID==value)
		    		{
		    			
		    			var MDACCfeedCircle = d3.svg.symbol().type("cross").size(30);
		          		d3.select('#MDACCfeeding').selectAll('.layer')
		            	  .append("path")
		            	  .attr("d", MDACCfeedCircle)
		            	  .attr("class", "MDACCPatient")
		            	  .style('fill', 'black')
		            	  .attr("transform", function(){
		            	  	if(patientdata[i].Feeding_tube=='Y')
		            	  	{
		            	  		return "translate("+ (xScale(Mfeed[0])) +", "+ yScale.rangeBand()/2 +")";
		            	  	}
		            	  	else if(patientdata[i].Feeding_tube=='N')
		            	  	{
		            	  		return "translate("+ (xScale(Mfeed[1])) +", "+ yScale.rangeBand()/2 +")";
		            	  	}
		            	  	else if(patientdata[i].Feeding_tube=='')
		            	  	{
		            	  		return "translate("+ (xScale(Mfeed[2])) +", "+ yScale.rangeBand()/2 +")";
		            	  	}
		            	  	
		            	  })
		    		}
		  		 }
		      	})
	      	}
		  }

    });

}
//Feeding chart for All ends

//HPV chart for all starts
function HPVChart(cohort,container,value) {
	var p = cohort;
	var Uhpv = [];
	var Mhpv = [];

    var margin = {top: 5, right: 10, bottom: 10, left: 5},
        width = $(container).width() - margin.left - margin.right-5,
        height = $(container).height() - margin.top - margin.bottom,
        width1 = $(container).width() - 1,
        height1 = $(container).height() - 1,
        svgW = $(container).width() -14;


    var HPVChart = d3.select(container)
        .append("svg")
        .attr("width", $(container).width())
        .attr("height", $(container).height())
        .attr("class", "HPVall")
        .append("g")
        .attr("transform", "translate(5,18)");

    
    var yScale = d3.scale.ordinal()
        .rangeRoundBands([0, height], .1);

    var xScale = d3.scale.linear()
        .rangeRound([0, width]);

    var color = d3.scale.ordinal()
        .range(["#fdcdac","#e6f5c9", "#bebada"]);


    var stack = d3.layout.stack();
    var segmentsStacked = ['HPV_Positive', 'HPV_Negative', 'HPV_Unknown'];

    d3.csv("data/demographicData.csv", function(hpv) {


        var hpvOriginalDataZipSelect;

        var hpvCount = [];
        for(var i =0; i<hpv.length;i++){

            if((hpv[i]["cohort"]) == p){
                var total = +(hpv[i]["HPV_Positive"]) + +(hpv[i]["HPV_Negative"]) + +(hpv[i]["HPV_Unknown"]);

                hpvOriginalDataZipSelect = hpv[i];
                hpv[i]["HPV_Positive"] = ((+(hpv[i]["HPV_Positive"])/total) *100).toFixed(2);
                hpv[i]["HPV_Negative"] = ((+(hpv[i]["HPV_Negative"])/total) *100).toFixed(2);
                hpv[i]["HPV_Unknown"] = ((+(hpv[i]["HPV_Unknown"])/total) *100).toFixed(2);

                hpvCount.push(hpv[i]);
            }
        }


        var layers = d3.layout.stack()(segmentsStacked.map(function (c) {
            return hpvCount.map(function (d) {
                return {x: +[d.cohort], y: +d[c], component: c};
            });
        }));


    color.domain(segmentsStacked);

        var tooltipHPVPlot = d3.select("#tooltip_HPVall")
            .attr("class", "tooltip")
            .style("opacity", 0);

    xScale.domain([0, 100]).nice();
    yScale.domain(layers[0].map(function(d) { return d.y; }));


       d3.max(layers, function(d) {return d[0]["y"] + d[0]["y0"];})


        var layer = HPVChart.selectAll(".layers")
        .data(layers)
        .enter().append("g")
        .attr("class", "layer")
        .style("fill", function(d,i) {
                return color(i);
        });


    layer.selectAll("rect")
        .data(function(d) { return d; })
        .enter().append("rect")
        .attr("y", function(d) { return yScale(d.x); })
        .attr("x", function(d) {return xScale(d.y0 ); })
        .attr("width", function(d) {return xScale(d.y + d.y0); })
        .attr("height", yScale.rangeBand())
        .on("mouseover", function (d) {

            tooltipHPVPlot.transition()
                .duration(200)
                .style("opacity",0.9);
                var HPVTooltipValue = (d["y"] * (total/100)).toFixed(0);
                if(p=='UIC')
                {
                	var totalPatient = 448;
                }
                else
                {
                	var totalPatient = 644;
                }
                var percentHPV = ((HPVTooltipValue*100)/totalPatient).toFixed(2);

                tooltipHPVPlot.html(d["component"] + " : " + HPVTooltipValue + "<br>" + "Percentage : " + percentHPV + "%")
                .style("left", (d3.event.pageX-30) + "px")
                .style("top", (d3.event.pageY+18) + "px");
        })
        .on("mouseout", function(d) {
            tooltipHPVPlot.transition()
                .duration(500)
                .style("opacity", 0);

        });
        var HPVLegend = layer.append("g")
	            .attr("class", "HPVLegend")
	            .attr("transform", function(d) { 
	            	var Lwidth = d[0]["y0"]+d[0]["y"]/2;
	            	if(p=='UIC')
	            	{
	            		Uhpv.push(Lwidth);
	            	}
	            	else if(p=='MDACC')
	            	{
	            		Mhpv.push(Lwidth);
	            	}
	            	return "translate(" + (xScale(Lwidth)) + ", 5.5)";
	            })
	            .style("display", function(d) { 
      				if(d[0]["y"]==0)
      					{
      						return "none";
      					}
      			});

		 HPVLegend.append("line")
	      .attr("y1", -8)
	      .attr("y2", -1)
	      .attr("stroke", "#000");

	     HPVLegend.append("text")
	      .attr("x", function(d){
            if(p=='UIC')
            {
                if(d[0]["component"]=="HPV_Positive")
                {
                    return -15;
                }
                else if (d[0]["component"]=="HPV_Negative")
                {
                    return -5;
                }
                else return -9;
            }
            else return -9;
          })
	      .attr("y", -14)
	      .attr("dy", "0.35em")
	      .attr("fill", "#000")
	      .style("font",'0.4vw sans-serif')
	      .style("display", function(d) { 
	      	if(d[0]["y"]==0)
	      	{
	      		return "none";
	      	}
	      })
	      .text(function(d){
	      	if(d[0]["component"]=="HPV_Positive")
	      	{
	      		return "Pos(+)";
	      	}
	      	else if(d[0]["component"]=="HPV_Negative")
	      	{
	      		return "Neg(-)";
	      	}
	      	else if(d[0]["component"]=="HPV_Unknown")
	      	{
	      		return "NaN";
	      	}
	      });

	      if(value!='Null')
	      {
	      	if(p=='UIC')
	      	{
	      		d3.csv('data/UIC.csv', function(patientdata){
	      		 for(var i=0;i<patientdata.length;i++)
		  		 {
		    		if(patientdata[i].record_id==value)
		    		{
		    			
		    			var UIChpvCircle = d3.svg.symbol().type("triangle-up").size(30);
		          		d3.select('#UIChpv').selectAll('.layer')
		            	  .append("path")
		            	  .attr("d", UIChpvCircle)
		            	  .attr("class", "UICPatient")
		            	  .style('fill', 'black')
		            	  .attr("transform", function(){
		            	  	if(patientdata[i].hpv_status==1)
		            	  	{
		            	  		return "translate("+ (xScale(Uhpv[0])) +", "+ yScale.rangeBand()/2 +")";
		            	  	}
		            	  	else if(patientdata[i].hpv_status==2)
		            	  	{
		            	  		return "translate("+ (xScale(Uhpv[1])) +", "+ yScale.rangeBand()/2 +")";
		            	  	}
		            	  	else if(patientdata[i].hpv_status==3 || patientdata[i].hpv_status==4 || patientdata[i].hpv_status==100)
		            	  	{
		            	  		return "translate("+ (xScale(Uhpv[2])) +", "+ yScale.rangeBand()/2 +")";
		            	  	}
		            	  })
		    		}
		  		 }
		      	})
	      	}
	      	else if(p=='MDACC')
	      	{
	      		d3.csv('data/MDACC.csv', function(patientdata){
	      		 for(var i=0;i<patientdata.length;i++)
		  		 {
		    		if(patientdata[i].Dummy_ID==value)
		    		{
		    			
		    			var MDACChpvCircle = d3.svg.symbol().type("cross").size(30);
		          		d3.select('#MDACChpv').selectAll('.layer')
		            	  .append("path")
		            	  .attr("d", MDACChpvCircle)
		            	  .attr("class", "MDACCPatient")
		            	  .style('fill', 'black')
		            	  .attr("transform", function(){
		            	  	if(patientdata[i].HPV=='Positive')
		            	  	{
		            	  		return "translate("+ (xScale(Mhpv[0])) +", "+ yScale.rangeBand()/2 +")";
		            	  	}
		            	  	else if(patientdata[i].HPV=='Negative')
		            	  	{
		            	  		return "translate("+ (xScale(Mhpv[1])) +", "+ yScale.rangeBand()/2 +")";
		            	  	}
		            	  	else if(patientdata[i].HPV=='Unknown')
		            	  	{
		            	  		return "translate("+ (xScale(Mhpv[2])) +", "+ yScale.rangeBand()/2 +")";
		            	  	}
		            	  })
		    		}
		  		 }
		      	})
	      	}
		  }

    });

}
//HPV chart for all ends

//Survival chart for all starts
function SurvivalChart(cohort,container,value) {
	var p = cohort;
	var Usurvival = [];
	var Msurvival = [];

    var margin = {top: 5, right: 10, bottom: 10, left: 5},
        width = $(container).width() - margin.left - margin.right-5,
        height = $(container).height() - margin.top - margin.bottom,
        width1 = $(container).width() - 1,
        height1 = $(container).height() - 1,
        svgW = $(container).width() -14;


    var SurvivalChart = d3.select(container)
        .append("svg")
        .attr("width", $(container).width())
        .attr("height", $(container).height())
        .attr("class", "SurvivalAll")
        .append("g")
        .attr("transform", "translate(5,18)");

    
    var yScale = d3.scale.ordinal()
        .rangeRoundBands([0, height], .1);

    var xScale = d3.scale.linear()
        .rangeRound([0, width]);

    var color = d3.scale.ordinal()
        .range(["#80b1d3","#8dd3c7", "#bebada"]);


    var stack = d3.layout.stack();
    var segmentsStacked = ['Dead', 'Alive', 'Survival_NAN'];

    d3.csv("data/demographicData.csv", function(Survival) {


        var SurvivalOriginalDataZipSelect;

        var SurvivalCount = [];
        for(var i =0; i<Survival.length;i++){

            if((Survival[i]["cohort"]) == p){
                var total = +(Survival[i]["Dead"]) + +(Survival[i]["Alive"]) + +(Survival[i]["Survival_NAN"]);

                SurvivalOriginalDataZipSelect = Survival[i];
                Survival[i]["Dead"] = ((+(Survival[i]["Dead"])/total) *100).toFixed(2);
                Survival[i]["Alive"] = ((+(Survival[i]["Alive"])/total) *100).toFixed(2);
                Survival[i]["Survival_NAN"] = ((+(Survival[i]["Survival_NAN"])/total) *100).toFixed(2);

                SurvivalCount.push(Survival[i]);
            }
        }


        var layers = d3.layout.stack()(segmentsStacked.map(function (c) {
            return SurvivalCount.map(function (d) {
                return {x: +[d.cohort], y: +d[c], component: c};
            });
        }));


    color.domain(segmentsStacked);

        var tooltipSurvivalPlot = d3.select("#tooltip_SurvivalAll")
            .attr("class", "tooltip")
            .style("opacity", 0);

    if(p=='UIC')
    {
    	xScale.domain([0, 100]).nice();
    }
    else if(p=='MDACC')
    {
    	xScale.domain([0, 92]);
    }
    yScale.domain(layers[0].map(function(d) { return d.y; }));


       d3.max(layers, function(d) {return d[0]["y"] + d[0]["y0"];})


        var layer = SurvivalChart.selectAll(".layers")
        .data(layers)
        .enter().append("g")
        .attr("class", "layer")
        .style("fill", function(d,i) {
                return color(i);
        });


    layer.selectAll("rect")
        .data(function(d) { return d; })
        .enter().append("rect")
        .attr("y", function(d) { return yScale(d.x); })
        .attr("x", function(d) {return xScale(d.y0 ); })
        .attr("width", function(d) {return xScale(d.y + d.y0); })
        .attr("height", yScale.rangeBand())
        .on("mouseover", function (d) {

            tooltipSurvivalPlot.transition()
                .duration(200)
                .style("opacity",0.9);
                var SurvivalTooltipValue = (d["y"] * (total/100)).toFixed(0);
                if(p=='UIC')
                {
                	var totalPatient = 448;
                }
                else
                {
                	var totalPatient = 644;
                }
                var percentSurvival = ((SurvivalTooltipValue*100)/totalPatient).toFixed(2);

                tooltipSurvivalPlot.html(d["component"] + " : " + SurvivalTooltipValue + "<br>" + "Percentage : " + percentSurvival + "%")
                .style("left", (d3.event.pageX-30) + "px")
                .style("top", (d3.event.pageY+18) + "px");
        })
        .on("mouseout", function(d) {
            tooltipSurvivalPlot.transition()
                .duration(500)
                .style("opacity", 0);

        });
        var SurvivalLegend = layer.append("g")
	            .attr("class", "SurvivalLegend")
	            .attr("transform", function(d) { 
	            	var Lwidth = d[0]["y0"]+d[0]["y"]/2;
	            	if(p=='UIC')
	            	{
	            		Usurvival.push(Lwidth);
	            	}
	            	else if(p=='MDACC')
	            	{
	            		Msurvival.push(Lwidth);
	            	}
	            	return "translate(" + (xScale(Lwidth)) + ", 5.5)";
	            })
	            .style("display", function(d) { 
      				if(d[0]["y"]==0)
      					{
      						return "none";
      					}
      			});

		 SurvivalLegend.append("line")
	      .attr("y1", -8)
	      .attr("y2", -1)
	      .attr("stroke", "#000");

	     SurvivalLegend.append("text")
	      .attr("y", -14)
	      .attr("x", -9)
	      .attr("dy", "0.35em")
	      .attr("fill", "#000")
	      .style("font",'0.4vw sans-serif')
	      .style("display", function(d) { 
	      	if(d[0]["y"]==0)
	      	{
	      		return "none";
	      	}
	      })
	      .text(function(d){
	      	if(d[0]["component"]=="Dead")
	      	{
	      		return "Dead";
	      	}
	      	else if(d[0]["component"]=="Alive")
	      	{
	      		return "Alive";
	      	}
	      	else if(d[0]["component"]=="Survival_NAN")
	      	{
	      		return "NaN";
	      	}
	      });


	      if(value!='Null')
	      {
	      	if(p=='UIC')
	      	{
	      		d3.csv('data/UIC.csv', function(patientdata){
	      		 for(var i=0;i<patientdata.length;i++)
		  		 {
		    		if(patientdata[i].record_id==value)
		    		{
		    			
		    			var UICsurvivalCircle = d3.svg.symbol().type("triangle-up").size(30);
		          		d3.select('#UICsurvival').selectAll('.layer')
		            	  .append("path")
		            	  .attr("d", UICsurvivalCircle)
		            	  .attr("class", "UICPatient")
		            	  .style('fill', 'black')
		            	  .attr("transform", function(){
		            	  	if(patientdata[i].death==0)
		            	  	{
		            	  		return "translate("+ (xScale(Usurvival[0])) +", "+ yScale.rangeBand()/2 +")";
		            	  	}
		            	  	else if(patientdata[i].death==1)
		            	  	{
		            	  		return "translate("+ (xScale(Usurvival[1])) +", "+ yScale.rangeBand()/2 +")";
		            	  	}
		            	  	else if(patientdata[i].death==100)
		            	  	{
		            	  		return "translate("+ (xScale(Usurvival[2])) +", "+ yScale.rangeBand()/2 +")";
		            	  	}
		            	  })
		    		}
		  		 }
		      	})
	      	}
	      	else if(p=='MDACC')
	      	{
	      		d3.csv('data/MDACC.csv', function(patientdata){
	      		 for(var i=0;i<patientdata.length;i++)
		  		 {
		    		if(patientdata[i].Dummy_ID==value)
		    		{
		    			
		    			var MDACCsurvivalCircle = d3.svg.symbol().type("cross").size(30);
		          		d3.select('#MDACCsurvival').selectAll('.layer')
		            	  .append("path")
		            	  .attr("d", MDACCsurvivalCircle)
		            	  .attr("class", "MDACCPatient")
		            	  .style('fill', 'black')
		            	  .attr("transform", function(){
		            	  	if(patientdata[i].Overall_Survival==0)
		            	  	{
		            	  		return "translate("+ (xScale(Msurvival[0])) +", "+ yScale.rangeBand()/2 +")";
		            	  	}
		            	  	else if(patientdata[i].Overall_Survival==1)
		            	  	{
		            	  		return "translate("+ (xScale(Msurvival[1])) +", "+ yScale.rangeBand()/2 +")";
		            	  	}
		            	  })
		    		}
		  		 }
		      	})
	      	}
		  }


    });

}
//Survival chart for all ends

//Treatment chart starts
function TreatmentChart(cohort,container,value) {
    var p = cohort;
    var Utreatment = [];
    var Mtreatment = [];

    var margin = {top: 5, right: 10, bottom: 10, left: 5},
        width = $(container).width() - margin.left - margin.right-5,
        height = $(container).height() - margin.top - margin.bottom,
        width1 = $(container).width() - 1,
        height1 = $(container).height() - 1,
        svgW = $(container).width() -14;


    var TreatmentChart = d3.select(container)
        .append("svg")
        .attr("width", $(container).width())
        .attr("height", $(container).height())
        .attr("class", "TreatmentAll")
        .append("g")
        .attr("transform", "translate(5,18)");

    
    var yScale = d3.scale.ordinal()
        .rangeRoundBands([0, height], .1);

    var xScale = d3.scale.linear()
        .rangeRound([0, width]);

    var color = d3.scale.ordinal()
        .range(["#7fc97f","#beaed4", "#fdc086", "#ffff99", "#386cb0", "#f0027f"]);


    var stack = d3.layout.stack();
    var segmentsStacked = ['CC', 'IC+CC', 'Salvage+Rad', 'Salvage', 'Rad', 'IC+Rad'];

    d3.csv("data/demographicData.csv", function(Treatment) {


        var TreatmentOriginalDataZipSelect;

        var TreatmentCount = [];
        for(var i =0; i<Treatment.length;i++){

            if((Treatment[i]["cohort"]) == p){
                var total = +(Treatment[i]["CC"]) + +(Treatment[i]["IC+CC"]) + +(Treatment[i]["Salvage+Rad"])+ +(Treatment[i]["Salvage"])+ +(Treatment[i]["Rad"])+ +(Treatment[i]["IC+Rad"]);

                TreatmentOriginalDataZipSelect = Treatment[i];
                Treatment[i]["CC"] = ((+(Treatment[i]["CC"])/total) *100).toFixed(2);
                Treatment[i]["IC+CC"] = ((+(Treatment[i]["IC+CC"])/total) *100).toFixed(2);
                Treatment[i]["Salvage+Rad"] = ((+(Treatment[i]["Salvage+Rad"])/total) *100).toFixed(2);
                Treatment[i]["Salvage"] = ((+(Treatment[i]["Salvage"])/total) *100).toFixed(2);
                Treatment[i]["Rad"] = ((+(Treatment[i]["Rad"])/total) *100).toFixed(2);
                Treatment[i]["IC+Rad"] = ((+(Treatment[i]["IC+Rad"])/total) *100).toFixed(2);

                TreatmentCount.push(Treatment[i]);
            }
        }


        var layers = d3.layout.stack()(segmentsStacked.map(function (c) {
            return TreatmentCount.map(function (d) {
                return {x: +[d.cohort], y: +d[c], component: c};
            });
        }));


    color.domain(segmentsStacked);

        var tooltipTreatmentPlot = d3.select("#tooltip_TreatmentAll")
            .attr("class", "tooltip")
            .style("opacity", 0);

    if(p=='UIC')
    {
        xScale.domain([0, 95]);
    }
    else if(p=='MDACC')
    {
        xScale.domain([0, 100]);
    }
    yScale.domain(layers[0].map(function(d) { return d.y; }));


       d3.max(layers, function(d) {return d[0]["y"] + d[0]["y0"];})


        var layer = TreatmentChart.selectAll(".layers")
        .data(layers)
        .enter().append("g")
        .attr("class", "layer")
        .style("fill", function(d,i) {
                return color(i);
        });


    layer.selectAll("rect")
        .data(function(d) { return d; })
        .enter().append("rect")
        .attr("y", function(d) { return yScale(d.x); })
        .attr("x", function(d) {return xScale(d.y0 ); })
        .attr("width", function(d) {return xScale(d.y + d.y0); })
        .attr("height", yScale.rangeBand())
        .on("mouseover", function (d) {

            tooltipTreatmentPlot.transition()
                .duration(200)
                .style("opacity",0.9);
                var TreatmentTooltipValue = (d["y"] * (total/100)).toFixed(0);
                if(p=='UIC')
                {
                    var totalPatient = 448;
                }
                else
                {
                    var totalPatient = 644;
                }
                var percentTreatment = ((TreatmentTooltipValue*100)/totalPatient).toFixed(2);

                tooltipTreatmentPlot.html(d["component"] + " : " + TreatmentTooltipValue + "<br>" + "Percentage : " + percentTreatment + "%")
                .style("left", (d3.event.pageX-30) + "px")
                .style("top", (d3.event.pageY+18) + "px");
        })
        .on("mouseout", function(d) {
            tooltipTreatmentPlot.transition()
                .duration(500)
                .style("opacity", 0);

        });
        var TreatmentLegend = layer.append("g")
                .attr("class", "TreatmentLegend")
                .attr("transform", function(d) { 
                    var Lwidth = d[0]["y0"]+d[0]["y"]/2;
                    if(p=='UIC')
                    {
                        Utreatment.push(Lwidth);
                    }
                    else if(p=='MDACC')
                    {
                        Mtreatment.push(Lwidth);
                    }
                    return "translate(" + (xScale(Lwidth)) + ", 5.5)";
                })
                .style("display", function(d) { 
                    if(d[0]["y"]==0)
                        {
                            return "none";
                        }
                });

         TreatmentLegend.append("line")
          .attr("y1", -8)
          .attr("y2", -1)
          .attr("stroke", "#000");

         TreatmentLegend.append("text")
          .attr("y", -14)
          .attr("x", function(d){
            if(d[0]["component"]=="Salvage+Rad")
            {
                return -35;
            }
            if(d[0]["component"]=="Rad")
            {
                return -16;
            }
            else{
                return -9;
            }
          })
          .attr("dy", "0.35em")
          .attr("fill", "#000")
          .style("font",'0.4vw sans-serif')
          .style("display", function(d) { 
            if(d[0]["y"]==0)
            {
                return "none";
            }
          })
          .text(function(d){
            return d[0]["component"];
          });


          if(value!='Null')
          {
            if(p=='UIC')
            {
                d3.csv('data/UIC.csv', function(patientdata){
                 for(var i=0;i<patientdata.length;i++)
                 {
                    if(patientdata[i].record_id==value)
                    {
                        if(patientdata[i].CC==1 || patientdata[i].xrt==1 || patientdata[i].salvage_rad==1 || patientdata[i].salvage==1)
                        {
                            var UICtreatmentCircle = d3.svg.symbol().type("triangle-up").size(30);
                            d3.select('#UICtreatment').selectAll('.layer')
                              .append("path")
                              .attr("d", UICtreatmentCircle)
                              .attr("class", "UICPatient")
                              .style('fill', 'black')
                              .attr("transform", function(){
                                if(patientdata[i].CC==1)
                                {
                                    return "translate("+ (xScale(Utreatment[0])) +", "+ yScale.rangeBand()/2 +")";
                                }
                                else if(patientdata[i].xrt==1)
                                {
                                    return "translate("+ (xScale(Utreatment[4])) +", "+ yScale.rangeBand()/2 +")";
                                }
                                else if(patientdata[i].salvage_rad==1)
                                {
                                    return "translate("+ (xScale(Mtreatment[2])) +", "+ yScale.rangeBand()/2 +")";
                                }
                                else if(patientdata[i].salvage==1)
                                {
                                    return "translate("+ (xScale(Mtreatment[3])) +", "+ yScale.rangeBand()/2 +")";
                                }
                              })
                        }
                        
                    }
                 }
                })
            }
            else if(p=='MDACC')
            {
                d3.csv('data/MDACC.csv', function(patientdata){
                 for(var i=0;i<patientdata.length;i++)
                 {
                    if(patientdata[i].Dummy_ID==value)
                    {
                        
                        var MDACCtreatmentCircle = d3.svg.symbol().type("cross").size(30);
                        d3.select('#MDACCtreatment').selectAll('.layer')
                          .append("path")
                          .attr("d", MDACCtreatmentCircle)
                          .attr("class", "MDACCPatient")
                          .style('fill', 'black')
                          .attr("transform", function(){
                            if(patientdata[i].Therapeutic_combination=="CC")
                            {
                                return "translate("+ (xScale(Mtreatment[0])) +", "+ yScale.rangeBand()/2 +")";
                            }
                            else if(patientdata[i].Therapeutic_combination=="IC+CC")
                            {
                                return "translate("+ (xScale(Mtreatment[1])) +", "+ yScale.rangeBand()/2 +")";
                            }
                            else if(patientdata[i].Therapeutic_combination=="Radiation alone")
                            {
                                return "translate("+ (xScale(Mtreatment[4])) +", "+ yScale.rangeBand()/2 +")";
                            }
                            else if(patientdata[i].Therapeutic_combination=="IC+Radiation alone")
                            {
                                return "translate("+ (xScale(Mtreatment[5])) +", "+ yScale.rangeBand()/2 +")";
                            }
                          })
                    }
                 }
                })
            }
          }


    });

}
//Treatment chart ends

//Chart heading starts
/*function ChartHeading(){

	var chartHeading = ['Gender', 'Race', 'T-cat', 'N-cat', 'HPV', 'Feeding Tube', 'Survival'];
	var chartContainer = ['#gender', '#race', '#tcat', '#ncat', '#hpv', '#feeding', '#survival'];
	

	for(var i=0;i<chartHeading.length;i++)
	{
		var p = d3.select(chartContainer[i])
		        .append('svg')
		        .attr('width', $(chartContainer[i]).width())
		        .attr('height',$(chartContainer[i]).height())
		        .attr('class','Heading')
		        .append('text')
		        .attr('x', "50%")
		        .attr('y', "50%")
		        .attr("font-size",'12px')
		        .style("text-anchor", "middle")
		        .attr('fill', 'black')
		        .html(function(d){
		        	if(chartHeading[i]=='Feeding Tube') {return 'Feeding' + "<br>" + 'Tube'};
		        	return chartHeading[i];
        });
	}
}*/
//chart heading ends

//UIC Heading starts
/*function UICHeading(){

	var UICContainer = ['#UICHeading1', '#UICHeading2', '#UICHeading3', '#UICHeading4', '#UICHeading5', '#UICHeading6', '#UICHeading7'];
	var MDACCContainer = ['#MDACCHeading1', '#MDACCHeading2', '#MDACCHeading3', '#MDACCHeading4', '#MDACCHeading5', '#MDACCHeading6', '#MDACCHeading7']

	for(var i=0;i<UICContainer.length;i++)
	{
		var p = d3.select(UICContainer[i])
		        .append('svg')
		        .attr('width', $(UICContainer[i]).width())
		        .attr('height',$(UICContainer[i]).height())
		        .attr('class','Heading')
		        .append('text')
		        .attr('x', "65%")
		        .attr('y', "80%")
		        .attr("font-size",'12px')
		        .style("text-anchor", "middle")
		        .attr('fill', 'black')
		        .text("UIC");
	}

	for(var i=0;i<MDACCContainer.length;i++)
	{
		var p = d3.select(MDACCContainer[i])
		        .append('svg')
		        .attr('width', $(MDACCContainer[i]).width())
		        .attr('height',$(MDACCContainer[i]).height())
		        .attr('class','Heading')
		        .append('text')
		        .attr('x', "55%")
		        .attr('y', "80%")
		        .attr("font-size",'12px')
		        .style("text-anchor", "middle")
		        .attr('fill', 'black')
		        .text("MDACC");
	}
}*/
//UIC Heading ends

//ChartHeading();
//UICHeading();

raceChart('UIC','#UICrace', 'Null');
raceChart('MDACC','#MDACCrace', 'Null');
genderChart('UIC', '#UICgender', 'Null');
genderChart('MDACC', '#MDACCgender', 'Null');
tcatChart('UIC', "#UICtcat", 'Null');
tcatChart('MDACC', "#MDACCtcat", 'Null');
ncatChart('UIC', "#UICncat", "Null");
ncatChart('MDACC', "#MDACCncat", "Null")
feedingChart('UIC', "#UICfeeding", "Null");
feedingChart('MDACC', "#MDACCfeeding", "Null");
HPVChart('UIC', "#UIChpv", "Null");
HPVChart('MDACC', "#MDACChpv", "Null");
SurvivalChart('UIC', "#UICsurvival", "Null")
SurvivalChart('MDACC', "#MDACCsurvival", "Null")
TreatmentChart('UIC', "#UICtreatment", "Null")
TreatmentChart('MDACC', "#MDACCtreatment", "Null")

//compare tabs
/*function compareZip(){

    iscompare = 1;

    d3.select('.compareButton')
        .style('background-color',"#9ecae1");


    if(zipSelected == ""){

    }
    else {
        zipHeading(zipSelected, '#zipHeading1');
        insuranceChart(zipSelected, '#insurancePlot1');
        populationNumber(zipSelected, '#totalPopulation1');
        incomeChart(zipSelected, '#incomePlot1');
        groceryNumber(zipSelected, '#groceryNumber1');
        cancerPyramindChart(zipSelected, '#cancerPlots1');
        raceChart(zipSelected, '#racePlot1');

        lastChanged = 1;
    }
}*/


//overview tab
/*function overview(){
    iscompare = 0;

    d3.select('.compareButton')
        .style('background-color',"white");


    d3.selectAll('.zipHeading').remove();
    d3.selectAll('.populationNumber').remove();
    d3.selectAll('.cancerPlots').remove();
    d3.selectAll('.incomeNumber').remove();
    d3.selectAll('.income-heading').remove();
    d3.selectAll('.waffleChart').remove();
    d3.selectAll('.insuranceChart').remove();
    d3.selectAll('.racePlot').remove();
    d3.selectAll('.raceHeading').remove();
    d3.selectAll('.raceLabel').remove();
    d3.selectAll('.groceryNumber').remove();


    d3.selectAll(".clicked1")
        .classed("clicked1", false)
        .style('stroke', '#636363')
        .style('stroke-width', "1px");

    d3.selectAll(".clicked2")
        .classed("clicked2", false)
        .style('stroke', '#636363')
        .style('stroke-width', "1px");


    zipSelected2 = "";
    zipSelected = "";



}*/


//View Heading
/*function zipHeading(zipSelect, container){

    d3.select(container).selectAll('.zipHeading').remove();


    d3.select(container)
        .append('svg')
        .attr('width',$(container).width())
        .attr('height',$(container).height())
        .attr('class','zipHeading')
        .append("text")
        .attr('x', "50%")
        .attr('y', "40%")
        .style("text-anchor", "middle")
        .attr('fill', 'black')
        .attr('font-size', "large")
        .text(function(d){
            return "Zip: " + zipSelect;
        });

}
*/



//MDACC Dropdown starts
/*d3.csv('data/MDACC.csv', function (patientdata){
	var MDACCpID = [];
	for(var i=0;i<patientdata.length;i++)
  	{
    	MDACCpID.push(patientdata[i].Dummy_ID);
  	}
  	 var dropdownChange = function() {
        var patientID = d3.select(this).property('value');
        d3.select('#MDACCrace').selectAll('.raceAll').remove();
        d3.select('#MDACCrace').selectAll('.layer').remove();
        d3.select('#MDACCrace').selectAll('.raceLegend').remove();
        raceChart('MDACC', '#MDACCrace', patientID);

        d3.select('#MDACCgender').selectAll('.genderAll').remove();
        d3.select('#MDACCgender').selectAll('.layer').remove();
        d3.select('#MDACCrace').selectAll('.yaxis').remove();
        genderChart('MDACC', '#MDACCgender', patientID);

        d3.select('#MDACCtcat').selectAll('.tcatAll').remove();
        d3.select('#MDACCtcat').selectAll('.layer').remove();
        d3.select('#MDACCtcat').selectAll('.TcatLegend').remove();
        tcatChart('MDACC', '#MDACCtcat', patientID);

        d3.select('#MDACCncat').selectAll('.ncatAll').remove();
        d3.select('#MDACCncat').selectAll('.layer').remove();
        d3.select('#MDACCncat').selectAll('.NcatLegend').remove();
        ncatChart('MDACC', '#MDACCncat', patientID);

        d3.select('#MDACCfeeding').selectAll('.FeedingAll').remove();
        d3.select('#MDACCfeeding').selectAll('.layer').remove();
        d3.select('#MDACCfeeding').selectAll('.FeedingLegend').remove();
        feedingChart('MDACC', '#MDACCfeeding', patientID);

        d3.select('#MDACChpv').selectAll('.HPVall').remove();
        d3.select('#MDACChpv').selectAll('.layer').remove();
        d3.select('#MDACChpv').selectAll('.HPVLegend').remove();
        HPVChart('MDACC', '#MDACChpv', patientID);

        d3.select('#MDACCsurvival').selectAll('.SurvivalAll').remove();
        d3.select('#MDACCsurvival').selectAll('.layer').remove();
        d3.select('#MDACCsurvival').selectAll('.SurvivalLegend').remove();
        SurvivalChart('MDACC', '#MDACCsurvival', patientID);

        d3.select('#MDACCtreatment').selectAll('.TreatmentAll').remove();
        d3.select('#MDACCtreatment').selectAll('.layer').remove();
        d3.select('#MDACCtreatment').selectAll('.TreatmentLegend').remove();
        TreatmentChart('MDACC', '#MDACCtreatment', patientID);
    };
  	var dropdown = d3.select("#MDACCdropdown")
        .append('g')
        .attr("width", 10)
        .attr("height", 10)
        .attr("class","dropdown")
        .attr("transform", "translate(0,20)")
        .insert("select", "svg")
        .on("change", dropdownChange);

    dropdown.selectAll("option")
        .data(MDACCpID)
        .enter().append("option")
        .attr("value", function (d) {return d; })
        .text(function (d) {
            return "MDACC Patient " +d;
        });
})*/

//MDACC Dropdown ends

function UICScatterPlot(container){

    d3.selectAll("#UICScatterplot").selectAll('.ClusteringScatterPlot').remove();
    d3.selectAll("#UICScatterplot").selectAll('.x axis').remove();
    d3.selectAll("#UICScatterplot").selectAll('.y axis').remove();
    d3.selectAll("#UICScatterplot").selectAll('.point').remove();
    d3.selectAll("#UICScatterplot").selectAll('.legendScatter').remove();
    d3.selectAll("#UICScatterplot").selectAll('.legendScatter1').remove();
    d3.selectAll("#UICScatterplot").selectAll('.legendMaleFemale').remove();

    d3.selectAll("#dropdownID").remove();

    var margin = {top: 20, right: 10, bottom: 22, left: 5},
    width = $(container).width() - margin.left - margin.right-15,
    height = $(container).height() - margin.top - margin.bottom;

   var xValue = function(d) { return d.age_diagnosed;}, // data -> value
    xScale = d3.scale.linear().range([0, width]), // value -> display
    xMap = function(d) { return xScale(xValue(d));}, // data -> display
    xAxis = d3.svg.axis().scale(xScale).orient("bottom");

// setup y
    var yValue = function(d) { return d["Overall_Survival"];}, // data -> value
    yScale = d3.scale.linear().range([height, 0]), // value -> display
    yMap = function(d) { return yScale(yValue(d));}, // data -> display
    yAxis = d3.svg.axis().scale(yScale).orient("left");

// setup fill color
    var legendText = ["Male", "Female", "Dead"];
    var LegendColor = ["#af8dc3", "#7fbf7b", "#FFFFFF"];
    var CohortText = ["UIC", "MDACC"];
    var Cohort2 = ["MDACC"]
    var Cohort1 = ["UIC"]
    var TcatText = ["T1", "T2", "T3", "T4"];
    var NcatText = ["N1", "N2", "N3", "N4"];

    var UICScatterPlot = d3.select(container)
        .append("svg")
        .attr("width", $(container).width())
        .attr("height", $(container).height())
        .attr("class", "ClusteringScatterPlot")
        .append("g")
        .attr("transform", "translate(30,5)");



    d3.csv("data/UICandMDACC.csv", function(data) {
    //console.log(data)

  // change string (from CSV) into number format
      data.forEach(function(d) {
        d.age_diagnosed = +d.age_diagnosed;
        d["Overall_Survival"] = +d["Overall_Survival"];
    //    console.log(d);
      });

      // don't want dots overlapping axis, so add in buffer to data domain
      xScale.domain([d3.min(data, xValue)-1, d3.max(data, xValue)+1]);
      yScale.domain([d3.min(data, yValue)-1, d3.max(data, yValue)+1]);

        var tooltipScatterlot = d3.select("#tooltip_ClusteringScatterPlot")
            .attr("class", "tooltip")
            .style("opacity", 0);

      // x-axis
      var x_axis = UICScatterPlot.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(-10," + height + ")")
          .call(xAxis)
          .append("text")
          .attr("class", "label")
          .attr("x", width-width/3)
          .attr("y", 25)
          .style("text-anchor", "end")
          .text("Age at Diagnosis (years)");

      // y-axis
      axis = width-795;
      var y_axis = UICScatterPlot.append("g")
          .attr("class", "y axis")
          
          .call(yAxis)
          .append("text")
          .attr("class", "label")
          .attr("transform", "rotate(-90)")
          .attr("x", -3)
          .attr("y", 15)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Overall Survival (number of months)");

      // draw dots
      UICScatterPlot.selectAll(".point")
          .data(data)
          .enter().append("path")
          .attr("class", "point")
          .attr("d", function(d,i) {
              if(i>0 && i<448){return d3.svg.symbol()
              	.size(130)
              	.type(d3.svg.symbolTypes[0])();} 
              else{return d3.svg.symbol()
              	.size(130)
              	.type(d3.svg.symbolTypes[3])();}
          	 })
          .style("fill", function(d) { 
                if(d.Gender=="Male" || d.Gender==1)
                {
                  //console.log(d.Cohort)
                  return "#af8dc3";
                }
                else if(d.Gender=="Female" || d.Gender==2)
                {
                  return "#7fbf7b";
                }
          })
          .style("opacity", function(d){
            if(UICbuttonFlag==1 && T0buttonFlag==1 && N0buttonFlag==1 && CCbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==0 && d.N_category==0 && d.CC==1){return 1;}
                else{return 0.1;}
            }

            else if(UICbuttonFlag==1 && T0buttonFlag==1 && N0buttonFlag==1 && ICCCbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==0 && d.N_category==0 && d.IC_CC==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T0buttonFlag==1 && N0buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==0 && d.N_category==0 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T0buttonFlag==1 && N0buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==0 && d.N_category==0 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T0buttonFlag==1 && N1buttonFlag==1 && CCbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==0 && d.N_category==1 && d.CC==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T0buttonFlag==1 && N1buttonFlag==1 && ICCCbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==0 && d.N_category==1 && d.IC_CC==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T0buttonFlag==1 && N1buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==0 && d.N_category==1 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T0buttonFlag==1 && N1buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==0 && d.N_category==1 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T0buttonFlag==1 && N2buttonFlag==1 && CCbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==0 && d.N_category==2 && d.CC==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T0buttonFlag==1 && N2buttonFlag==1 && ICCCbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==0 && d.N_category==2 && d.IC_CC==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T0buttonFlag==1 && N2buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==0 && d.N_category==2 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T0buttonFlag==1 && N2buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==0 && d.N_category==2 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T0buttonFlag==1 && N3buttonFlag==1 && CCbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==0 && d.N_category==3 && d.CC==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T0buttonFlag==1 && N3buttonFlag==1 && ICCCbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==0 && d.N_category==3 && d.IC_CC==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T0buttonFlag==1 && N3buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==0 && d.N_category==3 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T0buttonFlag==1 && N3buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==0 && d.N_category==3 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T1buttonFlag==1 && N0buttonFlag==1 && CCbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==1 && d.N_category==0 && d.CC==1){return 1;}
                else{return 0.1;}
            }

            else if(UICbuttonFlag==1 && T1buttonFlag==1 && N0buttonFlag==1 && ICCCbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==1 && d.N_category==0 && d.IC_CC==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T1buttonFlag==1 && N0buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==1 && d.N_category==0 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T1buttonFlag==1 && N0buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==1 && d.N_category==0 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T1buttonFlag==1 && N1buttonFlag==1 && CCbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==1 && d.N_category==1 && d.CC==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T1buttonFlag==1 && N1buttonFlag==1 && ICCCbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==1 && d.N_category==1 && d.IC_CC==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T1buttonFlag==1 && N1buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==1 && d.N_category==1 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T1buttonFlag==1 && N1buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==1 && d.N_category==1 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T1buttonFlag==1 && N2buttonFlag==1 && CCbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==1 && d.N_category==2 && d.CC==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T1buttonFlag==1 && N2buttonFlag==1 && ICCCbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==1 && d.N_category==2 && d.IC_CC==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T1buttonFlag==1 && N2buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==1 && d.N_category==2 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T1buttonFlag==1 && N2buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==1 && d.N_category==2 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T1buttonFlag==1 && N3buttonFlag==1 && CCbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==1 && d.N_category==3 && d.CC==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T1buttonFlag==1 && N3buttonFlag==1 && ICCCbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==0 && d.N_category==3 && d.IC_CC==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T0buttonFlag==1 && N3buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==1 && d.N_category==3 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T1buttonFlag==1 && N3buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==1 && d.N_category==3 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T2buttonFlag==1 && N0buttonFlag==1 && CCbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==2 && d.N_category==0 && d.CC==1){return 1;}
                else{return 0.1;}
            }

            else if(UICbuttonFlag==1 && T2buttonFlag==1 && N0buttonFlag==1 && ICCCbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==2 && d.N_category==0 && d.IC_CC==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T2buttonFlag==1 && N0buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==2 && d.N_category==0 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T2buttonFlag==1 && N0buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==2 && d.N_category==0 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T2buttonFlag==1 && N1buttonFlag==1 && CCbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==2 && d.N_category==1 && d.CC==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T2buttonFlag==1 && N1buttonFlag==1 && ICCCbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==2 && d.N_category==1 && d.IC_CC==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T2buttonFlag==1 && N1buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==2 && d.N_category==1 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T2buttonFlag==1 && N1buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==2 && d.N_category==1 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T0buttonFlag==1 && N2buttonFlag==1 && CCbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==0 && d.N_category==2 && d.CC==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T2buttonFlag==1 && N2buttonFlag==1 && ICCCbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==2 && d.N_category==2 && d.IC_CC==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T2buttonFlag==1 && N2buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==2 && d.N_category==2 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T2buttonFlag==1 && N2buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==2 && d.N_category==2 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T2buttonFlag==1 && N3buttonFlag==1 && CCbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==2 && d.N_category==3 && d.CC==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T2buttonFlag==1 && N3buttonFlag==1 && ICCCbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==2 && d.N_category==3 && d.IC_CC==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T2buttonFlag==1 && N3buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==2 && d.N_category==3 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T2buttonFlag==1 && N3buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==2 && d.N_category==3 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T3buttonFlag==1 && N0buttonFlag==1 && CCbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==3 && d.N_category==0 && d.CC==1){return 1;}
                else{return 0.1;}
            }

            else if(UICbuttonFlag==1 && T3buttonFlag==1 && N0buttonFlag==1 && ICCCbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==3 && d.N_category==0 && d.IC_CC==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T3buttonFlag==1 && N0buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==3 && d.N_category==0 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T3buttonFlag==1 && N0buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==3 && d.N_category==0 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T3buttonFlag==1 && N1buttonFlag==1 && CCbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==3 && d.N_category==1 && d.CC==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T3buttonFlag==1 && N1buttonFlag==1 && ICCCbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==3 && d.N_category==1 && d.IC_CC==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T3buttonFlag==1 && N1buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==3 && d.N_category==1 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T3buttonFlag==1 && N1buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==3 && d.N_category==1 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T3buttonFlag==1 && N2buttonFlag==1 && CCbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==3 && d.N_category==2 && d.CC==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T3buttonFlag==1 && N2buttonFlag==1 && ICCCbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==3 && d.N_category==2 && d.IC_CC==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T3buttonFlag==1 && N2buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==3 && d.N_category==2 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T3buttonFlag==1 && N2buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==3 && d.N_category==2 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T3buttonFlag==1 && N3buttonFlag==1 && CCbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==3 && d.N_category==3 && d.CC==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T3buttonFlag==1 && N3buttonFlag==1 && ICCCbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==3 && d.N_category==3 && d.IC_CC==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T3buttonFlag==1 && N3buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==3 && d.N_category==3 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T3buttonFlag==1 && N3buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==3 && d.N_category==3 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T4buttonFlag==1 && N0buttonFlag==1 && CCbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==4 && d.N_category==0 && d.CC==1){return 1;}
                else{return 0.1;}
            }

            else if(UICbuttonFlag==1 && T4buttonFlag==1 && N0buttonFlag==1 && ICCCbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==4 && d.N_category==0 && d.IC_CC==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T4buttonFlag==1 && N0buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==4 && d.N_category==0 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T4buttonFlag==1 && N0buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==4 && d.N_category==0 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T4buttonFlag==1 && N1buttonFlag==1 && CCbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==4 && d.N_category==1 && d.CC==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T4buttonFlag==1 && N1buttonFlag==1 && ICCCbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==4 && d.N_category==1 && d.IC_CC==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T4buttonFlag==1 && N1buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==4 && d.N_category==1 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T4buttonFlag==1 && N1buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==4 && d.N_category==1 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T4buttonFlag==1 && N2buttonFlag==1 && CCbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==4 && d.N_category==2 && d.CC==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T4buttonFlag==1 && N2buttonFlag==1 && ICCCbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==4 && d.N_category==2 && d.IC_CC==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T4buttonFlag==1 && N2buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==4 && d.N_category==2 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T4buttonFlag==1 && N2buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==4 && d.N_category==2 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T4buttonFlag==1 && N3buttonFlag==1 && CCbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==4 && d.N_category==3 && d.CC==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T4buttonFlag==1 && N3buttonFlag==1 && ICCCbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==4 && d.N_category==3 && d.IC_CC==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T4buttonFlag==1 && N3buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==4 && d.N_category==3 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T4buttonFlag==1 && N3buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==4 && d.N_category==3 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T0buttonFlag==1 && N0buttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==0 && d.N_category==0){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T0buttonFlag==1 && N1buttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==0 && d.N_category==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T0buttonFlag==1 && N2buttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==0 && d.N_category==2){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T0buttonFlag==1 && N3buttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==0 && d.N_category==3){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T1buttonFlag==1 && N0buttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==1 && d.N_category==0){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T1buttonFlag==1 && N1buttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==1 && d.N_category==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T1buttonFlag==1 && N2buttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==1 && d.N_category==2){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T1buttonFlag==1 && N3buttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==1 && d.N_category==3){return 1;}
                else{return 0.1;}
            }

            else if(UICbuttonFlag==1 && T2buttonFlag==1 && N0buttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==2 && d.N_category==0){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T2buttonFlag==1 && N1buttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==2 && d.N_category==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T2buttonFlag==1 && N2buttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==2 && d.N_category==2){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T2buttonFlag==1 && N3buttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==2 && d.N_category==3){return 1;}
                else{return 0.1;}
            }
            
            else if(UICbuttonFlag==1 && T3buttonFlag==1 && N0buttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==3 && d.N_category==0){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T3buttonFlag==1 && N1buttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==3 && d.N_category==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T3buttonFlag==1 && N2buttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==3 && d.N_category==2){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T3buttonFlag==1 && N3buttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==3 && d.N_category==3){return 1;}
                else{return 0.1;}
            }

            else if(UICbuttonFlag==1 && T4buttonFlag==1 && N0buttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==4 && d.N_category==0){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T4buttonFlag==1 && N1buttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==4 && d.N_category==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T4buttonFlag==1 && N2buttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==4 && d.N_category==2){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T4buttonFlag==1 && N3buttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==4 && d.N_category==3){return 1;}
                else{return 0.1;}
            }

            else if(UICbuttonFlag==1 && T0buttonFlag==1 && CCbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==0 && d.CC==1){return 1;}
                else{return 0.1;}
            }

            else if(UICbuttonFlag==1 && T0buttonFlag==1 && ICCCbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==0 && d.IC_CC==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T0buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==0 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T0buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==0 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }

            else if(UICbuttonFlag==1 && T1buttonFlag==1 && CCbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==1 && d.CC==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T1buttonFlag==1 && ICCCbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==1 && d.IC_CC==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T1buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==1 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T1buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==1 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }

            else if(UICbuttonFlag==1 && T2buttonFlag==1 && CCbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==2 && d.CC==1){return 1;}
                else{return 0.1;}
            }

            else if(UICbuttonFlag==1 && T2buttonFlag==1 && ICCCbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==2 && d.IC_CC==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T2buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==2 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T2buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==2 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }

            else if(UICbuttonFlag==1 && T3buttonFlag==1 && CCbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==3 && d.CC==1){return 1;}
                else{return 0.1;}
            }

            else if(UICbuttonFlag==1 && T3buttonFlag==1 && ICCCbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==3 && d.IC_CC==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T3buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==3 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T3buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==3 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }

            else if(UICbuttonFlag==1 && T4buttonFlag==1 && CCbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==4 && d.CC==1){return 1;}
                else{return 0.1;}
            }

            else if(UICbuttonFlag==1 && T4buttonFlag==1 && ICCCbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==4 && d.IC_CC==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T4buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==4 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T4buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==4 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }

            else if(UICbuttonFlag==1 && N0buttonFlag==1 && CCbuttonFlag==1){
                if(d.Cohort=="UIC" && d.N_category==0 && d.CC==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && N0buttonFlag==1 && ICCCbuttonFlag==1){
                if(d.Cohort=="UIC" && d.N_category==0 && d.IC_CC==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && N0buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="UIC" && d.N_category==0 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && N0buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="UIC" && d.N_category==0 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }

            else if(UICbuttonFlag==1 && N1buttonFlag==1 && CCbuttonFlag==1){
                if(d.Cohort=="UIC" && d.N_category==1 && d.CC==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && N1buttonFlag==1 && ICCCbuttonFlag==1){
                if(d.Cohort=="UIC" && d.N_category==1 && d.IC_CC==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && N1buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="UIC" && d.N_category==1 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && N1buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="UIC" && d.N_category==1 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }

            else if(UICbuttonFlag==1 && N2buttonFlag==1 && CCbuttonFlag==1){
                if(d.Cohort=="UIC" && d.N_category==2 && d.CC==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && N2buttonFlag==1 && ICCCbuttonFlag==1){
                if(d.Cohort=="UIC" && d.N_category==2 && d.IC_CC==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && N2buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="UIC" && d.N_category==2 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && N2buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="UIC" && d.N_category==2 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }

            else if(UICbuttonFlag==1 && N3buttonFlag==1 && CCbuttonFlag==1){
                if(d.Cohort=="UIC" && d.N_category==3 && d.CC==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && N3buttonFlag==1 && ICCCbuttonFlag==1){
                if(d.Cohort=="UIC" && d.N_category==3 && d.IC_CC==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && N3buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="UIC" && d.N_category==3 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && N3buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="UIC" && d.N_category==3 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }

            else if(UICbuttonFlag==1&& CCbuttonFlag==1){
                if(d.Cohort=="UIC" && d.CC==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && ICCCbuttonFlag==1){
                if(d.Cohort=="UIC" && d.IC_CC==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="UIC" && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="UIC"  && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }

            else if(UICbuttonFlag==1 && T0buttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==0){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T1buttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T2buttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==2){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T3buttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==3){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && T4buttonFlag==1){
                if(d.Cohort=="UIC" && d.T_category==4){return 1;}
                else{return 0.1;}
            }

            else if(UICbuttonFlag==1 && N0buttonFlag==1){
                if(d.Cohort=="UIC" && d.N_category==0){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && N1buttonFlag==1){
                if(d.Cohort=="UIC" && d.N_category==1){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && N2buttonFlag==1){
                if(d.Cohort=="UIC" && d.N_category==2){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1 && N3buttonFlag==1){
                if(d.Cohort=="UIC" && d.N_category==3){return 1;}
                else{return 0.1;}
            }
            else if(UICbuttonFlag==1){
                if(d.Cohort=="UIC"){return 1;}
                else{return 0.1;}
            }


            //MDACC check

            else if(MDACCbuttonFlag==1 && T0buttonFlag==1 && N0buttonFlag==1 && CCbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==0 && d.N_category==0 && d.CC==1){return 1;}
                else{return 0.1;}
            }

            else if(MDACCbuttonFlag==1 && T0buttonFlag==1 && N0buttonFlag==1 && ICCCbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==0 && d.N_category==0 && d.IC_CC==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T0buttonFlag==1 && N0buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==0 && d.N_category==0 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T0buttonFlag==1 && N0buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==0 && d.N_category==0 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T0buttonFlag==1 && N1buttonFlag==1 && CCbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==0 && d.N_category==1 && d.CC==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T0buttonFlag==1 && N1buttonFlag==1 && ICCCbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==0 && d.N_category==1 && d.IC_CC==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T0buttonFlag==1 && N1buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==0 && d.N_category==1 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T0buttonFlag==1 && N1buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==0 && d.N_category==1 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T0buttonFlag==1 && N2buttonFlag==1 && CCbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==0 && d.N_category==2 && d.CC==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T0buttonFlag==1 && N2buttonFlag==1 && ICCCbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==0 && d.N_category==2 && d.IC_CC==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T0buttonFlag==1 && N2buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==0 && d.N_category==2 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T0buttonFlag==1 && N2buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==0 && d.N_category==2 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T0buttonFlag==1 && N3buttonFlag==1 && CCbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==0 && d.N_category==3 && d.CC==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T0buttonFlag==1 && N3buttonFlag==1 && ICCCbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==0 && d.N_category==3 && d.IC_CC==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T0buttonFlag==1 && N3buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==0 && d.N_category==3 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T0buttonFlag==1 && N3buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==0 && d.N_category==3 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T1buttonFlag==1 && N0buttonFlag==1 && CCbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==1 && d.N_category==0 && d.CC==1){return 1;}
                else{return 0.1;}
            }

            else if(MDACCbuttonFlag==1 && T1buttonFlag==1 && N0buttonFlag==1 && ICCCbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==1 && d.N_category==0 && d.IC_CC==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T1buttonFlag==1 && N0buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==1 && d.N_category==0 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T1buttonFlag==1 && N0buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==1 && d.N_category==0 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T1buttonFlag==1 && N1buttonFlag==1 && CCbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==1 && d.N_category==1 && d.CC==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T1buttonFlag==1 && N1buttonFlag==1 && ICCCbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==1 && d.N_category==1 && d.IC_CC==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T1buttonFlag==1 && N1buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==1 && d.N_category==1 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T1buttonFlag==1 && N1buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==1 && d.N_category==1 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T1buttonFlag==1 && N2buttonFlag==1 && CCbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==1 && d.N_category==2 && d.CC==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T1buttonFlag==1 && N2buttonFlag==1 && ICCCbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==1 && d.N_category==2 && d.IC_CC==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T1buttonFlag==1 && N2buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==1 && d.N_category==2 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T1buttonFlag==1 && N2buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==1 && d.N_category==2 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T1buttonFlag==1 && N3buttonFlag==1 && CCbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==1 && d.N_category==3 && d.CC==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T1buttonFlag==1 && N3buttonFlag==1 && ICCCbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==0 && d.N_category==3 && d.IC_CC==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T0buttonFlag==1 && N3buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==1 && d.N_category==3 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T1buttonFlag==1 && N3buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==1 && d.N_category==3 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T2buttonFlag==1 && N0buttonFlag==1 && CCbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==2 && d.N_category==0 && d.CC==1){return 1;}
                else{return 0.1;}
            }

            else if(MDACCbuttonFlag==1 && T2buttonFlag==1 && N0buttonFlag==1 && ICCCbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==2 && d.N_category==0 && d.IC_CC==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T2buttonFlag==1 && N0buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==2 && d.N_category==0 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T2buttonFlag==1 && N0buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==2 && d.N_category==0 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T2buttonFlag==1 && N1buttonFlag==1 && CCbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==2 && d.N_category==1 && d.CC==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T2buttonFlag==1 && N1buttonFlag==1 && ICCCbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==2 && d.N_category==1 && d.IC_CC==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T2buttonFlag==1 && N1buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==2 && d.N_category==1 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T2buttonFlag==1 && N1buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==2 && d.N_category==1 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T0buttonFlag==1 && N2buttonFlag==1 && CCbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==0 && d.N_category==2 && d.CC==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T2buttonFlag==1 && N2buttonFlag==1 && ICCCbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==2 && d.N_category==2 && d.IC_CC==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T2buttonFlag==1 && N2buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==2 && d.N_category==2 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T2buttonFlag==1 && N2buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==2 && d.N_category==2 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T2buttonFlag==1 && N3buttonFlag==1 && CCbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==2 && d.N_category==3 && d.CC==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T2buttonFlag==1 && N3buttonFlag==1 && ICCCbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==2 && d.N_category==3 && d.IC_CC==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T2buttonFlag==1 && N3buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==2 && d.N_category==3 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T2buttonFlag==1 && N3buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==2 && d.N_category==3 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T3buttonFlag==1 && N0buttonFlag==1 && CCbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==3 && d.N_category==0 && d.CC==1){return 1;}
                else{return 0.1;}
            }

            else if(MDACCbuttonFlag==1 && T3buttonFlag==1 && N0buttonFlag==1 && ICCCbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==3 && d.N_category==0 && d.IC_CC==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T3buttonFlag==1 && N0buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==3 && d.N_category==0 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T3buttonFlag==1 && N0buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==3 && d.N_category==0 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T3buttonFlag==1 && N1buttonFlag==1 && CCbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==3 && d.N_category==1 && d.CC==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T3buttonFlag==1 && N1buttonFlag==1 && ICCCbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==3 && d.N_category==1 && d.IC_CC==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T3buttonFlag==1 && N1buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==3 && d.N_category==1 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T3buttonFlag==1 && N1buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==3 && d.N_category==1 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T3buttonFlag==1 && N2buttonFlag==1 && CCbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==3 && d.N_category==2 && d.CC==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T3buttonFlag==1 && N2buttonFlag==1 && ICCCbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==3 && d.N_category==2 && d.IC_CC==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T3buttonFlag==1 && N2buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==3 && d.N_category==2 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T3buttonFlag==1 && N2buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==3 && d.N_category==2 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T3buttonFlag==1 && N3buttonFlag==1 && CCbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==3 && d.N_category==3 && d.CC==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T3buttonFlag==1 && N3buttonFlag==1 && ICCCbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==3 && d.N_category==3 && d.IC_CC==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T3buttonFlag==1 && N3buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==3 && d.N_category==3 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T3buttonFlag==1 && N3buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==3 && d.N_category==3 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T4buttonFlag==1 && N0buttonFlag==1 && CCbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==4 && d.N_category==0 && d.CC==1){return 1;}
                else{return 0.1;}
            }

            else if(MDACCbuttonFlag==1 && T4buttonFlag==1 && N0buttonFlag==1 && ICCCbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==4 && d.N_category==0 && d.IC_CC==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T4buttonFlag==1 && N0buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==4 && d.N_category==0 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T4buttonFlag==1 && N0buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==4 && d.N_category==0 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T4buttonFlag==1 && N1buttonFlag==1 && CCbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==4 && d.N_category==1 && d.CC==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T4buttonFlag==1 && N1buttonFlag==1 && ICCCbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==4 && d.N_category==1 && d.IC_CC==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T4buttonFlag==1 && N1buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==4 && d.N_category==1 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T4buttonFlag==1 && N1buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==4 && d.N_category==1 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T4buttonFlag==1 && N2buttonFlag==1 && CCbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==4 && d.N_category==2 && d.CC==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T4buttonFlag==1 && N2buttonFlag==1 && ICCCbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==4 && d.N_category==2 && d.IC_CC==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T4buttonFlag==1 && N2buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==4 && d.N_category==2 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T4buttonFlag==1 && N2buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==4 && d.N_category==2 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T4buttonFlag==1 && N3buttonFlag==1 && CCbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==4 && d.N_category==3 && d.CC==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T4buttonFlag==1 && N3buttonFlag==1 && ICCCbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==4 && d.N_category==3 && d.IC_CC==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T4buttonFlag==1 && N3buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==4 && d.N_category==3 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T4buttonFlag==1 && N3buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==4 && d.N_category==3 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T0buttonFlag==1 && N0buttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==0 && d.N_category==0){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T0buttonFlag==1 && N1buttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==0 && d.N_category==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T0buttonFlag==1 && N2buttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==0 && d.N_category==2){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T0buttonFlag==1 && N3buttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==0 && d.N_category==3){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T1buttonFlag==1 && N0buttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==1 && d.N_category==0){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T1buttonFlag==1 && N1buttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==1 && d.N_category==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T1buttonFlag==1 && N2buttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==1 && d.N_category==2){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T1buttonFlag==1 && N3buttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==1 && d.N_category==3){return 1;}
                else{return 0.1;}
            }

            else if(MDACCbuttonFlag==1 && T2buttonFlag==1 && N0buttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==2 && d.N_category==0){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T2buttonFlag==1 && N1buttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==2 && d.N_category==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T2buttonFlag==1 && N2buttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==2 && d.N_category==2){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T2buttonFlag==1 && N3buttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==2 && d.N_category==3){return 1;}
                else{return 0.1;}
            }
            
            else if(MDACCbuttonFlag==1 && T3buttonFlag==1 && N0buttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==3 && d.N_category==0){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T3buttonFlag==1 && N1buttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==3 && d.N_category==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T3buttonFlag==1 && N2buttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==3 && d.N_category==2){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T3buttonFlag==1 && N3buttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==3 && d.N_category==3){return 1;}
                else{return 0.1;}
            }

            else if(MDACCbuttonFlag==1 && T4buttonFlag==1 && N0buttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==4 && d.N_category==0){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T4buttonFlag==1 && N1buttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==4 && d.N_category==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T4buttonFlag==1 && N2buttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==4 && d.N_category==2){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T4buttonFlag==1 && N3buttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==4 && d.N_category==3){return 1;}
                else{return 0.1;}
            }

            else if(MDACCbuttonFlag==1 && T0buttonFlag==1 && CCbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==0 && d.CC==1){return 1;}
                else{return 0.1;}
            }

            else if(MDACCbuttonFlag==1 && T0buttonFlag==1 && ICCCbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==0 && d.IC_CC==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T0buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==0 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T0buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==0 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }

            else if(MDACCbuttonFlag==1 && T1buttonFlag==1 && CCbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==1 && d.CC==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T1buttonFlag==1 && ICCCbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==1 && d.IC_CC==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T1buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==1 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T1buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==1 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }

            else if(MDACCbuttonFlag==1 && T2buttonFlag==1 && CCbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==2 && d.CC==1){return 1;}
                else{return 0.1;}
            }

            else if(MDACCbuttonFlag==1 && T2buttonFlag==1 && ICCCbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==2 && d.IC_CC==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T2buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==2 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T2buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==2 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }

            else if(MDACCbuttonFlag==1 && T3buttonFlag==1 && CCbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==3 && d.CC==1){return 1;}
                else{return 0.1;}
            }

            else if(MDACCbuttonFlag==1 && T3buttonFlag==1 && ICCCbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==3 && d.IC_CC==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T3buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==3 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T3buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==3 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }

            else if(MDACCbuttonFlag==1 && T4buttonFlag==1 && CCbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==4 && d.CC==1){return 1;}
                else{return 0.1;}
            }

            else if(MDACCbuttonFlag==1 && T4buttonFlag==1 && ICCCbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==4 && d.IC_CC==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T4buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==4 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T4buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==4 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }

            else if(MDACCbuttonFlag==1 && N0buttonFlag==1 && CCbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.N_category==0 && d.CC==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && N0buttonFlag==1 && ICCCbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.N_category==0 && d.IC_CC==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && N0buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.N_category==0 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && N0buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.N_category==0 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }

            else if(MDACCbuttonFlag==1 && N1buttonFlag==1 && CCbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.N_category==1 && d.CC==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && N1buttonFlag==1 && ICCCbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.N_category==1 && d.IC_CC==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && N1buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.N_category==1 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && N1buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.N_category==1 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }

            else if(MDACCbuttonFlag==1 && N2buttonFlag==1 && CCbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.N_category==2 && d.CC==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && N2buttonFlag==1 && ICCCbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.N_category==2 && d.IC_CC==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && N2buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.N_category==2 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && N2buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.N_category==2 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }

            else if(MDACCbuttonFlag==1 && N3buttonFlag==1 && CCbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.N_category==3 && d.CC==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && N3buttonFlag==1 && ICCCbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.N_category==3 && d.IC_CC==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && N3buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.N_category==3 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && N3buttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.N_category==3 && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }

            else if(MDACCbuttonFlag==1&& CCbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.CC==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && ICCCbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.IC_CC==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="MDACC" && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && RadbuttonFlag==1){
                if(d.Cohort=="MDACC"  && d.Radiation_alone==1){return 1;}
                else{return 0.1;}
            }

            else if(MDACCbuttonFlag==1 && T0buttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==0){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T1buttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T2buttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==2){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T3buttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==3){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && T4buttonFlag==1){
                if(d.Cohort=="MDACC" && d.T_category==4){return 1;}
                else{return 0.1;}
            }

            else if(MDACCbuttonFlag==1 && N0buttonFlag==1){
                if(d.Cohort=="MDACC" && d.N_category==0){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && N1buttonFlag==1){
                if(d.Cohort=="MDACC" && d.N_category==1){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && N2buttonFlag==1){
                if(d.Cohort=="MDACC" && d.N_category==2){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1 && N3buttonFlag==1){
                if(d.Cohort=="MDACC" && d.N_category==3){return 1;}
                else{return 0.1;}
            }
            else if(MDACCbuttonFlag==1){
                if(d.Cohort=="MDACC"){return 1;}
                else{return 0.1;}
            }

            else{return 1;}
          })
          .style("stroke", function(d){
            if(d.Dead==1){
                return "#d94801";
            }
            else{return "black";}
          })
          .style("stroke-width", 1)   
          .on("mouseover", function(d) {
              if(d.HPV_Positive==1)
              {
                var HPV = "Positive";
              }
              else if(d.HPV_Negative==1)
              {
                var HPV = "Negative";
              }
              else if(d.HPV_Unknown==1)
              {
                var HPV = "Unknown";
              }

              if(d.feeding==1)
              {
                var Feeding_tube = "Yes";
              }
              else if(d.feeding==0)
              {
                var Feeding_tube = "No";
              }
              else if(d.feeding==100)
              {
                var Feeding_tube = "Unknown";
              }

              if(d.Gender==1 || d.Gender== "Male")
              {
                var gender = "Male";
              }
              else if(d.Gender==2 || d.Gender== "Female")
              {
                var gender = "Female";
              }

              if(d.CC==1)
              {
                var Therapeutic = "CC";
              }
              else if(d.Radiation_alone==1)
              {
                var Therapeutic = "Radiation alone";
              }
              else if(d.IC_CC==1)
              {
                var Therapeutic = "IC+CC";
              }
              else if(d.IC_Radiation_alone==1)
              {
                var Therapeutic = "IC+Radiation alone";
              }
              else{var Therapeutic = "Unknown"}

              if(d.Race_White==1)
              {
                var Race = "White";
              }
              else if(d.Race_Black==1)
              {
                var Race = "Black";
              }
              else if(d.Race_Hispanic==1)
              {
                var Race = "Hispanic";
              }
              else if(d.Race_Asian==1)
              {
                var Race = "Asia";
              }
              else if(d.Race_NOS==1)
              {
                var Race = "Others";
              }
              tooltipScatterlot.transition()
                   .duration(200)
                   .style("opacity", .9);
              tooltipScatterlot.html("Gender: " + gender + "<br/>" +
                            "Race: "  + Race + "<br/>" +
                            "T-category: T"  + d.T_category + "<br/>" +
                            "N-category: N"  + d.N_category + "<br/>" +
                            "HPV: "  + HPV + "<br/>" +
                            "Treatment: "  + Therapeutic + "<br/>" +
                            "Feeding Tube:"  + Feeding_tube + "<br/>")
                   .style("left", (d3.event.pageX + 5) + "px")
                   .style("top", (d3.event.pageY - 28) + "px");
          })
          .on("mouseout", function(d) {
              tooltipScatterlot.transition()
                   .duration(500)
                   .style("opacity", 0);
          })
          .attr("transform", function(d) {
          	a = d.age_diagnosed
          	b = d["Overall_Survival"]
          	if(a == "nan" || b == "nan")
          	{
          		a = 0;
          		b = 0;
          	}
          	return "translate(" + xScale(a) + "," + yScale(b) + ")"; 
          });;

      // draw legend

      //Cohort legend
      var legendScatterCohort1 = UICScatterPlot.selectAll(".legendScatter")
      	.data(Cohort1)
      	.enter()
          .append("g")
          .attr("class", "legendScatter")
          .attr("transform", function(d, i) { return "translate(-15," + i * 20 + ")"; });

      legendScatterCohort1.append("circle")
          .attr("r", 5)
          .attr("cx", width-13)
          .attr("cy", 8)
          .style("fill", "#000000");
      // draw legend text
      legendScatterCohort1.append("text")
          .data(Cohort1)
          .attr("x", width - 24)
          .attr("y", 10)
          .attr("dy", ".20em")
          .style("text-anchor", "end")
          .style("font",'0.6vw sans-serif')
          .text(function(d) { return d;})

      var legendScatterCohort2 = UICScatterPlot.selectAll(".legendScatter1")
          .data(Cohort2)
          .enter().append("g")
          .attr("class", "legendScatter1")
          .attr("transform", function(d, i) { return "translate(-15," + (i * 20) + ")"; });

      // draw legend colored rectangles
      legendScatterCohort2.append("rect")
          .attr("x", width - 18)
          .attr("y", 20)
          .attr("width", 12)
          .attr("height", 12)
          .style("fill", "#000000");

      // draw legend text
      legendScatterCohort2.append("text")
          .data(Cohort2)
          .attr("x", width - 24)
          .attr("y", 25)
          .attr("dy", ".20em")
          .style("text-anchor", "end")
          .style("font",'0.6vw sans-serif')
          .text(function(d) { return d;})


      //Male Female legend
      var legendScatter = UICScatterPlot.selectAll(".legendMaleFemale")
          .data(LegendColor)
          .enter().append("g")
          .attr("class", "legendMaleFemale")
          .attr("transform", function(d, i) { return "translate(-15," + (i * 20) + ")"; });

      // draw legend colored rectangles
      legendScatter.append("rect")
          .attr("x", width - 18)
          .attr("y", 45)
          .attr("width", 12)
          .attr("height", 12)
          .style("fill", function(d) { return d;})
          .style("stroke", function(d,i){
            if(i==2){return "#d94801"}
            else{return "#000000"}
          });

      // draw legend text
      legendScatter.append("text")
          .data(legendText)
          .attr("x", width - 24)
          .attr("y", 50)
          .attr("dy", ".30em")
          .style("text-anchor", "end")
          .style("font",'0.6vw sans-serif')
          .text(function(d) { return d;})


      /* //T-cat legend
      var TcatlegendScatter = UICScatterPlot.selectAll(".legendTcat")
          .data(TcatText)
          .enter().append("g")
          .attr("class", "legendTcat")
          .attr("transform", function(d, i) { return "translate(-15," + (i * 20) + ")"; });

      // draw legend colored rectangles
      TcatlegendScatter.append("rect")
          .attr("x", width - 18)
          .attr("y", 90)
          .attr("width", function(d,i){
          	if(i==0){return 6;}
          	else if(i==1){return 8;}
          	else if(i==2){return 10;}
          	else if(i==3){return 12;}
          })
          .attr("height", function(d,i){
          	if(i==0){return 6;}
          	else if(i==1){return 8;}
          	else if(i==2){return 10;}
          	else if(i==3){return 12;}
          })
          .style("fill", "#000000");

      // draw legend text
      TcatlegendScatter.append("text")
          .data(TcatText)
          .attr("x", width - 24)
          .attr("y", 95)
          .attr("dy", ".30em")
          .style("text-anchor", "end")
          .text(function(d) { return d;})*/


      /* //N-cat legend
      var NcatlegendScatter = UICScatterPlot.selectAll(".legendNcat")
          .data(NcatText)
          .enter().append("g")
          .attr("class", "legendNcat")
          .attr("transform", function(d, i) { return "translate(-15," + (i * 20) + ")"; });

      // draw legend colored rectangles
      NcatlegendScatter.append("rect")
          .attr("x", width - 18)
          .attr("y", 180)
          .attr("width", 12)
          .attr("height", 12)
          .style("fill", "#000000")
          .style("opacity", function(d,i){
          	if(i==0){return 0.5;}
          	else if(i==1){return 0.7;}
          	else if(i==2){return 0.9;}
          	else if(i==3){return 1;}
          });

      // draw legend text
      NcatlegendScatter.append("text")
          .data(NcatText)
          .attr("x", width - 24)
          .attr("y", 185)
          .attr("dy", ".30em")
          .style("text-anchor", "end")
          .text(function(d) { return d;})
*/

       //HPV legend
      /* HPVLegendText = ["HPV+"]
      var HPVlegendScatter = UICScatterPlot.selectAll(".legendHPV")
          .data(HPVLegendText)
          .enter().append("g")
          .attr("class", "legendHPV")
          .attr("transform", function(d, i) { return "translate(-15," + (i * 20) + ")"; });

      // draw legend colored rectangles
      HPVlegendScatter.append("rect")
          .attr("x", width - 18)
          .attr("y", 90)
          .attr("width", 12)
          .attr("height", 12)
          .style("fill", "#000000")
          .style("stroke", "#00FFFF");

      // draw legend text
      HPVlegendScatter.append("text")
          .data(HPVLegendText)
          .attr("x", width - 24)
          .attr("y", 95)
          .attr("dy", ".30em")
          .style("text-anchor", "end")
          .text(function(d) { return d;})*/

      



    });
}
UICScatterPlot("#UICScatterplot")

function rod_knot(container, zipcode, stage){

    d3.selectAll('.rodknot').remove();
    d3.selectAll("#TNMHeadingCUIC").selectAll('.rodknotHeading').remove();
    d3.selectAll("#TNMHeadingCUIC").selectAll('svg').remove();
    d3.selectAll("#TNMHeadingPUIC").selectAll('.rodknotHeading').remove();
    d3.selectAll("#TNMHeadingPUIC").selectAll('svg').remove();
    d3.selectAll('x axis').remove();
    d3.csv('data/demographics.csv', function(demo){
        var T0 = 0, Tx = 0, T1 = 0, T1a = 0, T1b = 0, T2 = 0, T3 = 0, T4 = 0, T4a = 0, T4b = 0, Tis = 0;
        var N0 = 0, N1 = 0, N2 = 0, N2a = 0, N2b = 0, N2c = 0, N3 = 0, Nx = 0, NDD = 0;
        var M0 = 0, M1 = 0, Mx = 0, Msus = 0, CM0 = 0;
        demoTData = []
        demoNData = []
        demoMData = []
        for(i in demo){
            if(stage=="clinical"){
                if(demo[i].zipcode==zipcode || zipcode=="ALL"){
                    if(demo[i].t_stage_clinical==1){T0++;}
                    else if(demo[i].t_stage_clinical==2){Tx++;}
                    else if(demo[i].t_stage_clinical==3){T1++;}
                    else if(demo[i].t_stage_clinical==4){T1a++;}
                    else if(demo[i].t_stage_clinical==5){T1b++;}
                    else if(demo[i].t_stage_clinical==6){T2++;}
                    else if(demo[i].t_stage_clinical==7){T3++;}
                    else if(demo[i].t_stage_clinical==8){T4++;}
                    else if(demo[i].t_stage_clinical==9){T4a++;}
                    else if(demo[i].t_stage_clinical==10){T4b++;}
                    else if(demo[i].t_stage_clinical==11){Tis++;}

                    if(demo[i].n_stage_clinical==1){N0++;}
                    else if(demo[i].n_stage_clinical==2){N1++;}
                    else if(demo[i].n_stage_clinical==3){N2++;}
                    else if(demo[i].n_stage_clinical==4){N2a++;}
                    else if(demo[i].n_stage_clinical==5){N2b++;}
                    else if(demo[i].n_stage_clinical==6){N2c++;}
                    else if(demo[i].n_stage_clinical==7){N3++;}
                    else if(demo[i].n_stage_clinical==8){Nx++;}

                    if(demo[i].m_stage_clinical==1){M0++;}
                    else if(demo[i].m_stage_clinical==2){M1++;}
                    else if(demo[i].m_stage_clinical==3){Mx++;}
                } 
            }
            if(stage=="pathological"){
                if(demo[i].zipcode==zipcode || zipcode=="ALL"){
                    if(demo[i].t_stage_path==1){T0++;}
                    else if(demo[i].t_stage_path==2){Tx++;}
                    else if(demo[i].t_stage_path==3){T1++;}
                    else if(demo[i].t_stage_path==4){T1a++;}
                    else if(demo[i].t_stage_path==5){T1b++;}
                    else if(demo[i].t_stage_path==6){T2++;}
                    else if(demo[i].t_stage_path==7){T3++;}
                    else if(demo[i].t_stage_path==8){T4++;}
                    else if(demo[i].t_stage_path==9){T4a++;}
                    else if(demo[i].t_stage_path==10){T4b++;}
                    else if(demo[i].t_stage_path==11){Tis++;}

                    if(demo[i].n_stage_clinical==1){N0++;}
                    else if(demo[i].n_stage_path==2){N1++;}
                    else if(demo[i].n_stage_path==3){N2a++;}
                    else if(demo[i].n_stage_path==4){N2b++;}
                    else if(demo[i].n_stage_path==5){N2c++;}
                    else if(demo[i].n_stage_path==6){N3++;}
                    else if(demo[i].n_stage_path==7){NDD++;}

                    if(demo[i].m_stage_path==1){M0++;}
                    else if(demo[i].m_stage_path==2){M1++;}
                    else if(demo[i].m_stage_path==3){Msus++;}
                    else if(demo[i].m_stage_path==4){CM0++;}
                }
            }
        }
        if(stage=="clinical"){
            demoTData.push({'tcat' : 'T0', 'value': T0}, {'tcat' : 'Tx', 'value': Tx}, {'tcat' : 'T1', 'value': T1}, {'tcat' : 'T1a', 'value': T1a}, {'tcat' : 'T1b', 'value': T1b},
            {'tcat' : 'T2', 'value': T2}, {'tcat' : 'T3', 'value': T3}, {'tcat' : 'T4', 'value': T4}, {'tcat' : 'T4a', 'value': T4a}, {'tcat' : 'T4b', 'value': T4b}, {'tcat' : 'Tis', 'value': Tis})
    
            demoNData.push({'ncat' : 'N0', 'value': N0}, {'ncat' : 'N1', 'value': N1}, {'ncat' : 'N2', 'value': N2}, {'ncat' : 'N2a', 'value': N2a}, {'ncat' : 'N2b', 'value': N2b},
            {'ncat' : 'N2c', 'value': N2c}, {'ncat' : 'N3', 'value': N3}, {'ncat' : 'Nx', 'value': Nx})
        
            demoMData.push({'mcat' : 'M0', 'value': M0}, {'mcat' : 'M1', 'value': M1}, {'mcat' : 'Mx', 'value': Mx})

            Tdata = ["T0", "Tx", "T1", "T1a", "T1b", "T2", "T3", "T4", "T4a", "T4b", "Tis"];
            Ndata = ["N0", "N1", "N2", "N2a", "N2b", "N2c", "N3", "Nx"];
            Mdata = ["M0", "M1", "Mx"];
            /*test.push(demoTData, demoMData, demoNData)
            console.log(demoTData)*/
            //console.log(Math.max.apply(Math, demoTData.map(a => a.value)))
        }
        if(stage=='pathological'){
            demoTData.push({'tcat' : 'T0', 'value': T0}, {'tcat' : 'Tx', 'value': Tx}, {'tcat' : 'T1', 'value': T1}, {'tcat' : 'T1a', 'value': T1a}, {'tcat' : 'T1b', 'value': T1b},
            {'tcat' : 'T2', 'value': T2}, {'tcat' : 'T3', 'value': T3}, {'tcat' : 'T4', 'value': T4}, {'tcat' : 'T4a', 'value': T4a}, {'tcat' : 'T4b', 'value': T4b}, {'tcat' : 'Tis', 'value': Tis})
    
            demoNData.push({'ncat' : 'N0', 'value': N0}, {'ncat' : 'N1', 'value': N1}, {'ncat' : 'N2a', 'value': N2a}, {'ncat' : 'N2b', 'value': N2b},
            {'ncat' : 'N2c', 'value': N2c}, {'ncat' : 'N3', 'value': N3}, {'ncat' : 'NDD', 'value': NDD})
        
            demoMData.push({'mcat' : 'M0', 'value': M0}, {'mcat' : 'M1', 'value': M1}, {'mcat' : 'Msus', 'value': Msus}, {'mcat' : 'CM0', 'value': CM0})

            Tdata = ["T0", "Tx", "T1", "T1a", "T1b", "T2", "T3", "T4", "T4a", "T4b", "Tis"];
            Ndata = ["N0", "N1", "N2a", "N2b", "N2c", "N3", "NDD"];
            Mdata = ["M0", "M1", "Msus", "CM0"];
        }

        var margin = {top: 0, right: 2, bottom: 0, left: 5},
            width = $(container).width() - margin.left - margin.right,
            height = $(container).height() - margin.top - margin.bottom;

        var ClinicalPlot = d3.select(container)
                            .append("svg")
                            .attr("width", $(container).width())
                            .attr("height", $(container).height())
                            .attr("class", "rodknot")
                            .append("g")
                            .attr("transform", "translate(20,23)");

        var innerWidth = window.innerWidth;
        var innerHeight = window.innerHeight;
        //console.log(innerWidth, innerHeight)

        if(innerWidth<1300 || innerHeight<700){
            var XscaleT = d3.scale.ordinal()
                            .domain(Tdata).rangeRoundPoints([10, width-50], 0.05);
            var XAxisT = d3.svg.axis()
                            .scale(XscaleT)
                            .orient('bottom')
                            .tickSize(10,0);
                             // x-axis
            var x_axis = ClinicalPlot.append("g")
                                .attr("class", "x axis")
                                .attr("transform", "translate(0,-2)")
                                .call(XAxisT);


            var max1 = Math.max.apply(Math, demoTData.map(a => a.value));
            var max2 = Math.max.apply(Math, demoNData.map(a => a.value));
            var max3 = Math.max.apply(Math, demoMData.map(a => a.value));
            var minR = 0;
            var maxR = 8;

            var XscaleN = d3.scale.ordinal()
                            .domain(Ndata).rangeRoundPoints([10, width-50], 0.05);
            var XAxisN = d3.svg.axis()
                            .scale(XscaleN)
                            .orient('bottom')
                            .tickSize(10,0);
                             // x-axis
            var x_axis = ClinicalPlot.append("g")
                                .attr("class", "x axis")
                                .attr("transform", "translate(0,35)")
                                .call(XAxisN);

            var XscaleM = d3.scale.ordinal()
                            .domain(Mdata).rangeRoundPoints([10, width-50], 0.05);
            var XAxisM = d3.svg.axis()
                            .scale(XscaleM)
                            .orient('bottom')
                            .tickSize(10,0);
                             // x-axis
            var x_axis = ClinicalPlot.append("g")
                                .attr("class", "x axis")
                                .attr("transform", "translate(0,68)")
                                .call(XAxisM);

            var NCenter = -22;
            var MCenter = -38;

        }
        else{
            var XscaleT = d3.scale.ordinal()
                            .domain(Tdata).rangeRoundPoints([10, width-50], 0.05);
            var XAxisT = d3.svg.axis()
                            .scale(XscaleT)
                            .orient('bottom')
                            .tickSize(15,0);
                             // x-axis
            var x_axis = ClinicalPlot.append("g")
                                .attr("class", "x axis")
                                .call(XAxisT);


            var max1 = Math.max.apply(Math, demoTData.map(a => a.value));
            var max2 = Math.max.apply(Math, demoNData.map(a => a.value));
            var max3 = Math.max.apply(Math, demoMData.map(a => a.value));
            var minR = 0;
            var maxR = 15;


            var XscaleN = d3.scale.ordinal()
                            .domain(Ndata).rangeRoundPoints([10, width-50], 0.05);
            var XAxisN = d3.svg.axis()
                            .scale(XscaleN)
                            .orient('bottom')
                            .tickSize(15,0);
                             // x-axis
            var x_axis = ClinicalPlot.append("g")
                                .attr("class", "x axis")
                                .attr("transform", "translate(0,55)")
                                .call(XAxisN);

            var XscaleM = d3.scale.ordinal()
                            .domain(Mdata).rangeRoundPoints([10, width-50], 0.05);
            var XAxisM = d3.svg.axis()
                            .scale(XscaleM)
                            .orient('bottom')
                            .tickSize(15,0);
                             // x-axis
            var x_axis = ClinicalPlot.append("g")
                                .attr("class", "x axis")
                                .attr("transform", "translate(0,105)")
                                .call(XAxisM);

            var NCenter = -3;
            var MCenter = -3;

        }


        var rScaleT = d3.scale.linear()
                        .domain([0, max1])
                        .range([minR, maxR]);

        var rScaleN = d3.scale.linear()
                        .domain([0, max2])
                        .range([minR, maxR]);

        var rScaleM = d3.scale.linear()
                        .domain([0, max3])
                        .range([minR, maxR]);

        ClinicalPlot.selectAll('.circle')
                    .data(demoTData)
                    .enter()
                    .append('circle')
                    .attr("class", "circle")
                    .attr('cx', function(d){
                        //console.log(d);
                        return XscaleT(d.tcat)
                    })
                    .attr('cy', -3)
                    .attr('r', function(d){
                        return rScaleT(d.value);
                    })
                    .style("fill", function(){
                        if(stage=="clinical"){return "#8dd3c7";}
                        else if(stage=="pathological"){return "#fc8d62";}
                    })
                    .style("stroke", "black");

        
        ClinicalPlot.selectAll('.circle1')
                    .data(demoNData)
                    .enter()
                    .append('circle')
                    .attr("class", "circle1")
                    .attr('cx', function(d){
                        //console.log(d);
                        return XscaleN(d.ncat)
                    })
                    .attr('cy', NCenter)
                    .attr('r', function(d){
                        return rScaleN(d.value);
                    })
                    .style("fill",  function(){
                        if(stage=="clinical"){return "#8dd3c7";}
                        else if(stage=="pathological"){return "#fc8d62";}
                    })
                    .style("stroke", "black")
                    .attr("transform", "translate(0,55)");


        ClinicalPlot.selectAll('.circle2')
                    .data(demoMData)
                    .enter()
                    .append('circle')
                    .attr("class", "circle2")
                    .attr('cx', function(d){
                        //console.log(d);
                        return XscaleM(d.mcat)
                    })
                    .attr('cy', MCenter)
                    .attr('r', function(d){
                        return rScaleM(d.value);
                        /*if(d.value>5){return 1.5*d.value;}
                        else{return 1.2*d.value;}*/
                    })
                    .style("fill",  function(){
                        if(stage=="clinical"){return "#8dd3c7";}
                        else if(stage=="pathological"){return "#fc8d62";}
                    })
                    .style("stroke", "black")
                    .attr("transform", "translate(0,105)");

        if(stage=="clinical"){
            if(zipcode=="ALL"){text = "UIC Clinical Staging (All Zipcodes)"}
                else{text = "UIC Clinical Staging " + '( Zipcode: ' + zipcode + ')'}
            d3.select("#TNMHeadingCUIC")
                        .append('svg')
                        .attr("width",$("#TNMHeadingCUIC").width())
                        .attr("height",$("#TNMHeadingCUIC").height()-8)
                        .append('g')
                        .attr("class","rodknotHeading")
                        .append('text')
                        .attr("x", "30%")
                        .attr("y", 20)
                        .style("text-anchor", "start")
                        .style("font",'0.6vw sans-serif')
                        .text(text);
        }
        if(stage=="pathological"){
            if(zipcode=="ALL"){text = "UIC Pathological Staging (All Zipcodes)"}
                else{text = "UIC Pathological Staging " + '( Zipcode: ' + zipcode + ')'}
            d3.select("#TNMHeadingPUIC")
                        .append('svg')
                        .attr("width",$("#TNMHeadingPUIC").width())
                        .attr("height",$("#TNMHeadingPUIC").height()-8)
                        .append('g')
                        .attr("class","rodknotHeading")
                        .append('text')
                        .attr("x", "30%")
                        .attr("y", 20)
                        .style("text-anchor", "start")
                        .style("font",'0.6vw sans-serif')
                        .text(text);
        }
    })
}

rod_knot("#TNMStageC", "ALL", "clinical")
rod_knot("#TNMStageP", "ALL", "pathological")

function rod_knotMDACC(container){

    d3.selectAll('.rodknot1').remove();
    d3.selectAll('x axis').remove();
    d3.csv('data/MDACC.csv', function(demo){
        var T0 = 0, T1 = 0, T2 = 0, T3 = 0, T4 = 0, Tis = 0;
        var N0 = 0, N1 = 0, N2 = 0, N3 = 0, Nx = 0;
        demoTData = []
        demoNData = []
        for(i in demo){
            if(demo[i].T_category=="T0"){T0++;}
            else if(demo[i].T_category=="T1"){T1++;}
            else if(demo[i].T_category=="T2"){T2++;}
            else if(demo[i].T_category=="T3"){T3++;}
            else if(demo[i].T_category=="T4"){T4++;}
            else if(demo[i].T_category=="Tis"){Tis++;}

            if(demo[i].N_category=="N0"){N0++;}
            else if(demo[i].N_category=="N1"){N1++;}
            else if(demo[i].N_category=="N2"){N2++;}
            else if(demo[i].N_category=="N3"){N3++;}
            else if(demo[i].N_category=="Nx"){Nx++;}
        }

        demoTData.push({'tcat' : 'T0', 'value': T0}, {'tcat' : 'T1', 'value': T1}, {'tcat' : 'T2', 'value': T2}, {'tcat' : 'T3', 'value': T3},
         {'tcat' : 'T4', 'value': T4}, {'tcat' : 'Tis', 'value': Tis})

        demoNData.push({'ncat' : 'N0', 'value': N0}, {'ncat' : 'N1', 'value': N1}, {'ncat' : 'N2', 'value': N2},
         {'ncat' : 'N3', 'value': N3}, {'ncat' : 'Nx', 'value': Nx})
    

        Tdata = ["T0", "T1", "T2", "T3", "T4", "Tis"];
        Ndata = ["N0", "N1", "N2", "N3", "Nx"];

        var margin = {top: 0, right: 2, bottom: 0, left: 5},
            width = $(container).width() - margin.left - margin.right,
            height = $(container).height() - margin.top - margin.bottom;

        var ClinicalPlot = d3.select(container)
                            .append("svg")
                            .attr("width", $(container).width())
                            .attr("height", $(container).height())
                            .attr("class", "rodknot1")
                            .append("g")
                            .attr("transform", "translate(20,23)");

        if(innerWidth<1300 || innerHeight<700){
            var XscaleT = d3.scale.ordinal()
                            .domain(Tdata).rangeRoundPoints([10, width-50], 0.05);
            var XAxisT = d3.svg.axis()
                            .scale(XscaleT)
                            .orient('bottom')
                            .tickSize(10,0);
                             // x-axis
            var x_axis = ClinicalPlot.append("g")
                                .attr("class", "x axis")
                                .call(XAxisT);

            var max1 = Math.max.apply(Math, demoTData.map(a => a.value));
            var max2 = Math.max.apply(Math, demoNData.map(a => a.value));
            //var max3 = Math.max.apply(Math, demoMData.map(a => a.value));
            var minR = 0;
            var maxR = 8;

            var XscaleN = d3.scale.ordinal()
                            .domain(Ndata).rangeRoundPoints([10, width-50], 0.05);
            var XAxisN = d3.svg.axis()
                                .scale(XscaleN)
                                .orient('bottom')
                                .tickSize(10,0);
                                 // x-axis
            var x_axis = ClinicalPlot.append("g")
                                    .attr("class", "x axis")
                                    .attr("transform", "translate(0,36)")
                                    .call(XAxisN);

            var NCenter = -22;

        }
        else{
            var XscaleT = d3.scale.ordinal()
                            .domain(Tdata).rangeRoundPoints([10, width-50], 0.05);
            var XAxisT = d3.svg.axis()
                            .scale(XscaleT)
                            .orient('bottom')
                            .tickSize(15,0);
                             // x-axis
            var x_axis = ClinicalPlot.append("g")
                                .attr("class", "x axis")
                                .call(XAxisT);

            var max1 = Math.max.apply(Math, demoTData.map(a => a.value));
            var max2 = Math.max.apply(Math, demoNData.map(a => a.value));
            //var max3 = Math.max.apply(Math, demoMData.map(a => a.value));
            var minR = 0;
            var maxR = 15;

            var XscaleN = d3.scale.ordinal()
                            .domain(Ndata).rangeRoundPoints([10, width-50], 0.05);
            var XAxisN = d3.svg.axis()
                                .scale(XscaleN)
                                .orient('bottom')
                                .tickSize(15,0);
                                 // x-axis
            var x_axis = ClinicalPlot.append("g")
                                    .attr("class", "x axis")
                                    .attr("transform", "translate(0,55)")
                                    .call(XAxisN);

            var NCenter = -3;
        }


        var rScaleT = d3.scale.linear()
                        .domain([0, max1])
                        .range([minR, maxR]);

        var rScaleN = d3.scale.linear()
                        .domain([0, max2])
                        .range([minR, maxR]);

        ClinicalPlot.selectAll('.circle')
                    .data(demoTData)
                    .enter()
                    .append('circle')
                    .attr("class", "circle")
                    .attr('cx', function(d){
                        //console.log(d);
                        return XscaleT(d.tcat)
                    })
                    .attr('cy', -3)
                    .attr('r', function(d){
                        return rScaleT(d.value);
                    })
                    .style("fill", "#8dd3c7")
                    .style("stroke", "black");

        ClinicalPlot.selectAll('.circle1')
                    .data(demoNData)
                    .enter()
                    .append('circle')
                    .attr("class", "circle1")
                    .attr('cx', function(d){
                        //console.log(d);
                        return XscaleN(d.ncat)
                    })
                    .attr('cy', NCenter)
                    .attr('r', function(d){
                        return rScaleN(d.value);
                    })
                    .style("fill", "#8dd3c7")
                    .style("stroke", "black")
                    .attr("transform", "translate(0,55)");

        d3.select("#TNMHeadingCMDACC")
                        .append('svg')
                        .attr("width",$("#TNMHeadingCMDACC").width())
                        .attr("height",$("#TNMHeadingCMDACC").height()-8)
                        .append('g')
                        .attr("class","rodknotHeading")
                        .append('text')
                        .attr("x", "40%")
                        .attr("y", 20)
                        .style("text-anchor", "start")
                        .style("font",'0.6vw sans-serif')
                        .text('MDACC Clinical Staging');

    })
}

rod_knotMDACC("#TNMStageCMDACC")


//ScatterPlot Buttons functions start
var UICbuttonFlag = 0;
var MDACCbuttonFlag = 0;

var T0buttonFlag = 0;
var T1buttonFlag = 0;
var T2buttonFlag = 0;
var T3buttonFlag = 0;
var T4buttonFlag = 0;

var N0buttonFlag = 0;
var N1buttonFlag = 0;
var N2buttonFlag = 0;
var N3buttonFlag = 0;

var CCbuttonFlag = 0;
var ICCCbuttonFlag = 0;
var RadbuttonFlag = 0;
var ICRadbuttonFlag = 0;
var KNNbuttonFlag = 0;


function Apply(){
    UICScatterPlot("#UICScatterplot");
    // $("#ClusteringButton2").hide()
}

function KNNButton(){
    if(KNNbuttonFlag==0){
        KNNbuttonFlag = 1;


        //UIC Dropdown start
        d3.csv('data/UIC.csv', function (patientdata){
            var UICpID = [];
            for(var i=0;i<patientdata.length;i++)
            {
                UICpID.push(patientdata[i].record_id);
            }
             var dropdownChange = function() {
                var patientID = d3.select(this).property('value');
                KNNalgo(patientID);

            };
            var dropdown = d3.select("#UICdropdown1")
                .append('g')
                .attr("width", 5)
                .attr("height", 5)
                .attr("class","dropdown")
                .attr("id", "dropdownID")
                .attr("transform", "translate(-100,100)")
                .insert("select", "svg")
                .on("change", dropdownChange);

            dropdown.selectAll("option")
                .data(UICpID)
                .enter().append("option")
                .attr("value", function (d) {return d; })
                .text(function (d) {
                    return "UIC Patient " +d;
                });
        })
        //UIC Dropdown ends
        $("#ClusteringButton1").hide();
        $("#ClusteringButton2").hide();

    }
    else{
        KNNbuttonFlag = 0;
        $(".dropdown").hide();
        $("#ClusteringButton1").show();
        $("#ClusteringButton2").show();

        UICScatterPlot("#UICScatterplot")
    }

}

function UICButton(){
    if(UICbuttonFlag==0){
        //ButtonRemove()
        // d3.selectAll("#UICscatterButton")
        //     .style("background-color", "#a1d99b");
        UICbuttonFlag = 1;
        //UICScatterPlot("#UICScatterplot")
    }
    else if(UICbuttonFlag==1){
        ButtonRemove()
        UICScatterPlot("#UICScatterplot")
        // console.log("uic button remove")
    }
}

function MDACCButton(){
    if(MDACCbuttonFlag==0){
        MDACCbuttonFlag = 1;
        //UICScatterPlot("#UICScatterplot")
    }
    else if(MDACCbuttonFlag==1){
        ButtonRemove()
        UICScatterPlot("#UICScatterplot")
    }
}

function T0Button(){
    if(T0buttonFlag==0){
        T0buttonFlag = 1;
        //UICScatterPlot("#UICScatterplot")
    }
}


function T1Button(){
    if(T1buttonFlag==0){
        T1buttonFlag = 1;
        //UICScatterPlot("#UICScatterplot")
    }
}

function T2Button(){
    if(T2buttonFlag==0){
        T2buttonFlag = 1;
        //UICScatterPlot("#UICScatterplot")
    }
}

function T3Button(){
    if(T3buttonFlag==0){
        T3buttonFlag = 1;
        //UICScatterPlot("#UICScatterplot")
    }
}

function T4Button(){
    if(T4buttonFlag==0){
        T4buttonFlag = 1;
        //UICScatterPlot("#UICScatterplot")
    }
}

function N0Button(){
    if(N0buttonFlag==0){
        N0buttonFlag = 1;
        //UICScatterPlot("#UICScatterplot")
    }
}

function N1Button(){
    if(N1buttonFlag==0){
        N1buttonFlag = 1;
        //UICScatterPlot("#UICScatterplot")
    }
}

function N2Button(){
    if(N2buttonFlag==0){
        N2buttonFlag = 1;
        //UICScatterPlot("#UICScatterplot")
    }
}

function N3Button(){
    if(N3buttonFlag==0){
        N3buttonFlag = 1;
        //UICScatterPlot("#UICScatterplot")
    }
}

function CCButton(){
    if(CCbuttonFlag==0){
        CCbuttonFlag = 1;
        //UICScatterPlot("#UICScatterplot")
    }
}


function ICCCButton(){
    if(ICCCbuttonFlag==0){
        ICCCbuttonFlag = 1;
        //UICScatterPlot("#UICScatterplot")
    }
}

function RadButton(){
    if(RadbuttonFlag==0){
        RadbuttonFlag = 1;
        //UICScatterPlot("#UICScatterplot")
    }
}

function ICRadButton(){
    if(ICRadbuttonFlag==0){
        ICRadbuttonFlag = 1;
        //UICScatterPlot("#UICScatterplot")
    }
}

function ButtonRemove()
{
    UICbuttonFlag = 0;
    $("#UICscatterButton").prop("checked",false);
    // d3.selectAll("#UICscatterButton").style("background-color", "#FFFFFF")

    MDACCbuttonFlag = 0;
    $("#MDACCscatterButton").prop("checked",false);

    T0buttonFlag = 0;
    $("#T0scatterButton").prop("checked",false);

    T1buttonFlag = 0;
    $("#T1scatterButton").prop("checked",false);

    T2buttonFlag = 0;
    $("#T2scatterButton").prop("checked",false);

    T3buttonFlag = 0;
    $("#T3scatterButton").prop("checked",false);

    T4buttonFlag = 0;
    $("#T4scatterButton").prop("checked",false);


    N0buttonFlag = 0;
    $("#N0scatterButton").prop("checked",false);

    N1buttonFlag = 0;
    $("#N1scatterButton").prop("checked",false);

    N2buttonFlag = 0;
    $("#N2scatterButton").prop("checked",false);

    N3buttonFlag = 0;
    $("#N3scatterButton").prop("checked",false);


    CCbuttonFlag = 0;
    $("#CCscatterButton").prop("checked",false);

    ICCCbuttonFlag = 0;
    $("#ICCCscatterButton").prop("checked",false);

    RadbuttonFlag = 0;
    $("#RadscatterButton").prop("checked",false);

    ICRadbuttonFlag = 0;
    $("#ICRadscatterButton").prop("checked",false);


}
//ScatterPlot Buttons functions end


// var Tounge=0, Buccal=0, FOM=0, RMT=0, hard_palate=0;

function KNNalgo(id){

    var UICPIDselect = id;
    // var Tounge, Buccal, FOM, RMT, hard_palate;
    d3.csv('data/Numeric1 UIC.csv', function(data){
        var Tonsil=0, BOT=0, NOS=0, Soft_palate=0,T_cat=0,N_cat=0, male=0,female=0;
        var DistArray = [];
        var sortDistance = [];
        var TopFive = [];
        var KNNPatientData = [];
        for(var i=0; i<data.length; i++){
            if(data[i].record_id==UICPIDselect){
                Tonsil = data[i].oropharynx_tonsil;
                BOT = data[i].oropharynx_BOT;
                NOS = data[i].oropharynx_not_specified;
                Soft_palate = data[i].oropharynx_soft_palate;
                T_cat = data[i].T_category;
                N_cat = data[i].N_category;
                male = data[i].Male;
                female = data[i].Female;
                KNNPatientData.push({"Gender": data[i].Gender, "T_category": data[i].T_category, "N_category": data[i].N_category, "HPV": data[i].HPV, "Treatment": data[i].Therapeutic,
                    "OS": data[i].Overall_Survival, "Age": data[i].age_diagnosed, "Cohort": "UIC", "Race_White": data[i].Race_White, "Race_Black": data[i].Race_Black, "Race_Hispanic": data[i].Race_Hispanic, "Race_Asian": data[i].Race_Asian,
                        "Race_NOS": data[i].Race_NOS, "HPV_Positive": data[i].HPV_Positive, "HPV_Negative": data[i].HPV_Negative, "HPV_Unknown": data[i].HPV_Unknown, "CC": data[i].CC, "Radiation_alone": data[i].Radiation_alone,
                        "Feeding_tube": data[i].feeding})
                // console.log(data[i].feeding)
                // Tounge = data[i].oral_tongue;
                // Buccal = data[i].buccal;
                // FOM = data[i].FOM;
                // RMT = data[i].RMT;
                // hard_palate = data[i].hard_palate;
            }
        }
        d3.csv('data/newNumeric3 MDACC.csv', function(MDACCdata){
            console.log(MDACCdata)
            for(var i=0;i<MDACCdata.length; i++){
                // var distance = Math.sqrt(Math.pow(Tounge - MDACCdata[i].tongue_site, 2) + Math.pow(Buccal - MDACCdata[i].Buccal, 2) + Math.pow(FOM - MDACCdata[i].FOM, 2) + Math.pow(RMT - MDACCdata[i].RMT, 2) + Math.pow(hard_palate - MDACCdata[i].hard_palate, 2));
                var distance = Math.sqrt(Math.pow(Tonsil - MDACCdata[i].Tonsil, 2) + Math.pow(BOT - MDACCdata[i].BOT, 2) + Math.pow(NOS - MDACCdata[i].NOS, 2) + Math.pow(Soft_palate - MDACCdata[i].Soft_palate, 2)
                + Math.pow(T_cat - MDACCdata[i].T_category, 2) + Math.pow(N_cat - MDACCdata[i].N_category, 2) + Math.pow(male - MDACCdata[i].Male, 2) + Math.pow(female - MDACCdata[i].Female, 2));
                DistArray.push({"ID": MDACCdata[i].Dummy_ID, "Distance": distance});
            }
            sortDistance = DistArray.slice().sort((a, b) => d3.ascending(a.Distance, b.Distance))
            for(var i=0;i<5;i++){
                TopFive[i] = sortDistance[i]
            }
            for(var i=0;i<MDACCdata.length;i++){
                for(var j=0;j<5;j++){
                    if(MDACCdata[i].Dummy_ID==TopFive[j].ID){
                        KNNPatientData.push({"Gender": MDACCdata[i].Gender, "T_category": MDACCdata[i].T_category, "N_category": MDACCdata[i].N_category, "HPV": MDACCdata[i].HPV, "Treatment": MDACCdata[i].Therapeutic,
                        "OS": MDACCdata[i].OS, "Age": MDACCdata[i].Age_Diagnosis, "Cohort": "MDACC", "Race_White": MDACCdata[i].Race_White, "Race_Black": MDACCdata[i].Race_Black, "Race_Hispanic": MDACCdata[i].Race_Hispanic, "Race_Asian": MDACCdata[i].Race_Asian,
                        "Race_NOS": MDACCdata[i].Race_NOS, "HPV_Positive": MDACCdata[i].HPV_Positive, "HPV_Negative": MDACCdata[i].HPV_Negative, "HPV_Unknown": MDACCdata[i].HPV_Unknown,
                        "CC": MDACCdata[i].CC, "Radiation_alone": MDACCdata[i].Radiation_alone, "IC_CC": MDACCdata[i].IC_CC, "IC_Radiation_alone": MDACCdata[i].IC_Radiation_alone,
                        "Feeding_tube": MDACCdata[i].Feeding_tube})

                        // console.log(MDACCdata[i].Radiation_alone)
                    }
                }
            }
            console.log(KNNPatientData)
            KNNScatterplot("#UICScatterplot", KNNPatientData)
        })
    })

}


function KNNScatterplot(container, data){
    d3.selectAll("#UICScatterplot").selectAll('.ClusteringScatterPlot').remove();
    d3.selectAll("#UICScatterplot").selectAll('.x axis').remove();
    d3.selectAll("#UICScatterplot").selectAll('.y axis').remove();
    d3.selectAll("#UICScatterplot").selectAll('.point').remove();
    d3.selectAll("#UICScatterplot").selectAll('.legendScatter').remove();
    d3.selectAll("#UICScatterplot").selectAll('.legendScatter1').remove();
    d3.selectAll("#UICScatterplot").selectAll('.legendMaleFemale').remove();

    var margin = {top: 20, right: 10, bottom: 22, left: 5},
    width = $(container).width() - margin.left - margin.right-15,
    height = $(container).height() - margin.top - margin.bottom;

   var xValue = function(d) { return d.Age;}, // data -> value
    xScale = d3.scale.linear().domain([0,100]).range([0, width]), // value -> display
    xMap = function(d) { return xScale(xValue(d));}, // data -> display
    xAxis = d3.svg.axis().scale(xScale).orient("bottom");

// setup y
    var yValue = function(d) { return d["OS"];}, // data -> value
    yScale = d3.scale.linear().range([height, 0]), // value -> display
    yMap = function(d) { return yScale(yValue(d));}, // data -> display
    yAxis = d3.svg.axis().scale(yScale).orient("left");

// setup fill color
    var legendText = ["Male", "Female", "Dead"];
    var LegendColor = ["#af8dc3", "#7fbf7b", "#FFFFFF"];
    var CohortText = ["UIC", "MDACC"];
    var Cohort2 = ["MDACC"]
    var Cohort1 = ["UIC"]
    var TcatText = ["T1", "T2", "T3", "T4"];
    var NcatText = ["N1", "N2", "N3", "N4"];

    var UICScatterPlot = d3.select(container)
        .append("svg")
        .attr("width", $(container).width())
        .attr("height", $(container).height())
        .attr("class", "ClusteringScatterPlot")
        .append("g")
        .attr("transform", "translate(30,5)");

     data.forEach(function(d) {
        d.Age = +d.Age;
        d["OS"] = +d["OS"];
    //    console.log(d);
      });

      // don't want dots overlapping axis, so add in buffer to data domain
      // xScale.domain([d3.min(data, xValue)-1, d3.max(data, xValue)+1]);
      // yScale.domain([d3.min(data, yValue)-1, d3.max(data, yValue)+1]);
      yScale.domain([0, 170]);

        var tooltipScatterlot = d3.select("#tooltip_ClusteringScatterPlot")
            .attr("class", "tooltip")
            .style("opacity", 0);

      // x-axis
      var x_axis = UICScatterPlot.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(-10," + height + ")")
          .call(xAxis)
          .append("text")
          .attr("class", "label")
          .attr("x", width-width/3)
          .attr("y", 25)
          .style("text-anchor", "end")
          .text("Age at Diagnosis (years)");

      // y-axis
      axis = width-795;
      var y_axis = UICScatterPlot.append("g")
          .attr("class", "y axis")
          
          .call(yAxis)
          .append("text")
          .attr("class", "label")
          .attr("transform", "rotate(-90)")
          .attr("x", -3)
          .attr("y", 15)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Overall Survival (number of months)");

      // draw dots
      UICScatterPlot.selectAll(".point")
          .data(data)
          .enter().append("path")
          .attr("class", "point")
          .attr("d", function(d,i) {
          if(i==0){return d3.svg.symbol()
            .size(130)
            .type(d3.svg.symbolTypes[0])();} 
          else{return d3.svg.symbol()
            .size(130)
            .type(d3.svg.symbolTypes[3])();}
             })
          .style("fill", function(d) { 
            if(d.Gender=="Male" || d.Gender==1)
            {
              //console.log(d.Cohort)
              return "#af8dc3";
            }
            else if(d.Gender=="Female" || d.Gender==2)
            {
              return "#7fbf7b";
            }
          })
          .style("stroke", "black")
          .style("stroke-width", 1)   
          .on("mouseover", function(d) {
              if(d.HPV_Positive==1)
              {
                var HPV = "Positive";
              }
              else if(d.HPV_Negative==1)
              {
                var HPV = "Negative";
              }
              else if(d.HPV_Unknown==1)
              {
                var HPV = "Unknown";
              }

              if(d.Feeding_tube==1 || d.Feeding_tube=="Y")
              {
                var Feeding_tube1 = "Yes";
              }
              else if(d.Feeding_tube==0 || d.Feeding_tube=="N")
              {
                var Feeding_tube1 = "No";
              }
              else if(d.Feeding_tube==100)
              {
                var Feeding_tube1 = "Unknown";
              }

              if(d.Gender==1 || d.Gender== "Male")
              {
                var gender = "Male";
              }
              else if(d.Gender==2 || d.Gender== "Female")
              {
                var gender = "Female";
              }

              if(d.CC==1)
              {
                var Therapeutic = "CC";
              }
              else if(d.Radiation_alone==1)
              {
                var Therapeutic = "Radiation alone";
              }
              else if(d.IC_CC==1)
              {
                var Therapeutic = "IC+CC";
              }
              else if(d.IC_Radiation_alone==1)
              {
                var Therapeutic = "IC+Radiation alone";
              }
              else{var Therapeutic = "Unknown"}

              if(d.Race_White==1)
              {
                var Race = "White";
              }
              else if(d.Race_Black==1)
              {
                var Race = "Black";
              }
              else if(d.Race_Hispanic==1)
              {
                var Race = "Hispanic";
              }
              else if(d.Race_Asian==1)
              {
                var Race = "Asia";
              }
              else if(d.Race_NOS==1)
              {
                var Race = "Others";
              }
              tooltipScatterlot.transition()
                   .duration(200)
                   .style("opacity", .9);
              tooltipScatterlot.html("Gender: " + gender + "<br/>" +
                            "Race: "  + Race + "<br/>" +
                            "T-category: T"  + d.T_category + "<br/>" +
                            "N-category: N"  + d.N_category + "<br/>" +
                            "HPV: "  + HPV + "<br/>" +
                            "Treatment: "  + Therapeutic + "<br/>" +
                            "Feeding Tube:"  + Feeding_tube1 + "<br/>")
                   .style("left", (d3.event.pageX + 5) + "px")
                   .style("top", (d3.event.pageY - 28) + "px");
          })
          .on("mouseout", function(d) {
              tooltipScatterlot.transition()
                   .duration(500)
                   .style("opacity", 0);
          })
          .attr("transform", function(d) {
            a = d.Age
            b = d["OS"]
            if(a == "nan" || b == "nan")
            {
                a = 0;
                b = 0;
            }
            return "translate(" + xScale(a) + "," + yScale(b) + ")"; 
          });

          //Cohort legend
      var legendScatterCohort1 = UICScatterPlot.selectAll(".legendScatter")
        .data(Cohort1)
        .enter()
          .append("g")
          .attr("class", "legendScatter")
          .attr("transform", function(d, i) { return "translate(-15," + i * 20 + ")"; });

      legendScatterCohort1.append("circle")
          .attr("r", 5)
          .attr("cx", width-13)
          .attr("cy", 8)
          .style("fill", "#000000");
      // draw legend text
      legendScatterCohort1.append("text")
          .data(Cohort1)
          .attr("x", width - 24)
          .attr("y", 10)
          .attr("dy", ".20em")
          .style("text-anchor", "end")
          .style("font",'0.6vw sans-serif')
          .text(function(d) { return d;})

      var legendScatterCohort2 = UICScatterPlot.selectAll(".legendScatter1")
          .data(Cohort2)
          .enter().append("g")
          .attr("class", "legendScatter1")
          .attr("transform", function(d, i) { return "translate(-15," + (i * 20) + ")"; });

      // draw legend colored rectangles
      legendScatterCohort2.append("rect")
          .attr("x", width - 18)
          .attr("y", 20)
          .attr("width", 12)
          .attr("height", 12)
          .style("fill", "#000000");

      // draw legend text
      legendScatterCohort2.append("text")
          .data(Cohort2)
          .attr("x", width - 24)
          .attr("y", 25)
          .attr("dy", ".20em")
          .style("text-anchor", "end")
          .style("font",'0.6vw sans-serif')
          .text(function(d) { return d;})


      //Male Female legend
      var legendScatter = UICScatterPlot.selectAll(".legendMaleFemale")
          .data(LegendColor)
          .enter().append("g")
          .attr("class", "legendMaleFemale")
          .attr("transform", function(d, i) { return "translate(-15," + (i * 20) + ")"; });

      // draw legend colored rectangles
      legendScatter.append("rect")
          .attr("x", width - 18)
          .attr("y", 45)
          .attr("width", 12)
          .attr("height", 12)
          .style("fill", function(d) { return d;})
          .style("stroke", function(d,i){
            if(i==2){return "#d94801"}
            else{return "#000000"}
          });

      // draw legend text
      legendScatter.append("text")
          .data(legendText)
          .attr("x", width - 24)
          .attr("y", 50)
          .attr("dy", ".30em")
          .style("text-anchor", "end")
          .style("font",'0.6vw sans-serif')
          .text(function(d) { return d;})





}

