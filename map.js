//Debug
LAYOUT_DEBUG = false;
LOAD_STORE = true;
MAP_STARTUP = false;

//*********************//
//***Utility methods***//
//*********************//
if (typeof String.prototype.endsWith !== 'function') {
    String.prototype.endsWith = function(suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
}

var basemaps = [ {label:"Streets", bm:"streets"}, {label:"Satellite", bm:"satellite"},
		{label:"Hybrid", bm:"hybrid"}, {label:"Topographic", bm:"topo"}, {label:"Light Gray Canvas", bm:"gray"},
		{label:"National Geographic", bm:"national-geographic"},{label:"Open Street Map", bm:"osm"} ]; 

//TODO: Hard-code info from maps into here, to minimize ajax requests, since most of it will be static anyways. (script to build this)		
var countyMaps = {
	'Allegany': { 
		extent: {"xmin":-8805087.036280174,"ymin":4786945.333386234,"xmax":-8714356.283705791,"ymax":4830132.254367301,"spatialReference":{"wkid":102100}},
		mapId: 'allegany',
		resolution: '1m'
	},
	'Anne Arundel': { 
		extent: {"xmin":-8553991.398363845,"ymin":4679857.056758904,"xmax":-8501708.471016765,"ymax":4753695.2260824125,"spatialReference":{"wkid":102100}},
		resolution: '2m',
		mapId:'anneArundel'
	},
	'Baltimore City': 	{ 
		extent: {"xmin":-8539774.11110263,"ymin":4749720.500611395,"xmax":-8519059.676437374,"ymax":4775326.905086894,"spatialReference":{"wkid":102100}},
		resolution: '1m',
		mapId:'baltimoreCity'
	},
	'Baltimore': {
		extent: {"xmin":-8565762.700719628,"ymin":4742688.294009118,"xmax":-8494064.768188106,"ymax":4829826.506254252,"spatialReference":{"wkid":102100}},
		resolution: '1m',
		mapId:'baltimore'
	},
	'Calvert': {
		extent: {"xmin":-8540003.422187475,"ymin":4623522.9669127455,"xmax":-8501479.159931798,"ymax":4690023.181520759,"spatialReference":{"wkid":102100}},
		resolution: '1m',
		mapId:'calvert'
	},
	'Caroline': {
		extent: {"xmin":-8459591.668431574,"ymin":4669843.806053456,"xmax":-8421526.028345607,"ymax":4742994.042122271,"spatialReference":{"wkid":102100}},
		resolution: '1m',
		mapId:'caroline'
	},
	'Carroll': {
		extent: {"xmin":-8608873.184672348,"ymin":4769747.002022136,"xmax":-8545430.451195737,"ymax":4828756.387858213,"spatialReference":{"wkid":102100}},
		resolution: '1m',
		mapId:'carroll'
	},
	'Cecil': {
		extent: {"xmin":-8488331.991066774,"ymin":4774333.223719189,"xmax":-8432380.0863621,"ymax":4827762.706490455,"spatialReference":{"wkid":102100}},
		resolution: '1m',
		mapId:'cecil'
	},
	'Charles': {
		extent: {"xmin":-8603446.155664086,"ymin":4614885.582716532,"xmax":-8534729.267235804,"ymax":4674965.0869486,"spatialReference":{"wkid":102100}},
		resolution: '1m',
		mapId:'charles'
	},
	'Dorchester': {
		extent: {"xmin":-8499033.175026653,"ymin":4615497.078942799,"xmax":-8424659.946505276,"ymax":4682150.167607383,"spatialReference":{"wkid":102100}},
		resolution: '1m',
		mapId:'dorchester'
	},
	'Frederick': {
		extent: {"xmin":-8649002.624522012,"ymin":4755376.840704543,"xmax":-8579750.676895734,"ymax":4827609.832433936,"spatialReference":{"wkid":102100}},
		resolution: '1m',
		mapId:'frederick'
	},
	'Garrett': {
		extent: {"xmin":-8868224.021643858,"ymin":4748956.130328465,"xmax":-8757848.952800022,"ymax":4838081.705309015,"spatialReference":{"wkid":102100}},
		resolution: '2m',
		mapId:'garrett'
	},
	'Harford': {
		extent: {"xmin":-8527085.564407306,"ymin":4764319.973013843,"xmax":-8465477.319609538,"ymax":4828679.950829876,"spatialReference":{"wkid":102100}},
		resolution: '2m',
		mapId:'harford'
	},
	'Howard': {
		extent: {"xmin":-8595038.082552869,"ymin":4736649.768774786,"xmax":-8536793.066999642,"ymax":4776320.586454739,"spatialReference":{"wkid":102100}},
		resolution: '2m',
		mapId:'howard'
	},
	'Kent': {
		extent: {"xmin":-8504230.892950194,"ymin":4696596.765953163,"xmax":-8428099.612778129,"ymax":4777467.141878909,"spatialReference":{"wkid":102100}},
		resolution: '1m',
		mapId:'kent'
	},
	'Montgomery': {
		extent: {"xmin":-8627982.441743735,"ymin":4711960.608638707,"xmax":-8557354.627608327,"ymax":4774256.786691042,"spatialReference":{"wkid":102100}},
		resolution: '1m',
		mapId:'montgomery'
	},
	"Prince George's": {
		extent: {"xmin":-8576540.321707888,"ymin":4662200.103225025,"xmax":-8533276.96369846,"ymax":4737261.265001097,"spatialReference":{"wkid":102100}},
		resolution: '1.2m',
		mapId:'princeGeorges'
	},
	"Queen Anne's": {
		extent: {"xmin":-8501708.471016783,"ymin":4668620.813600776,"xmax":-8426494.43518414,"ymax":4759580.877260169,"spatialReference":{"wkid":102100}},
		resolution: '1m',
		mapId:'queenAnne'
	}, 
	'Sommerset': {
		extent: {"xmin":-8467388.245316632,"ymin":4565965.884614071,"xmax":-8406467.933773428,"ymax":4624593.085308722,"spatialReference":{"wkid":102100}},
		resolution: '1m',
		mapId:'sommerset'
	},
	"St Mary's": {
		extent: {"xmin":-8560029.923598165,"ymin":4584769.393572213,"xmax":-8492841.775735585,"ymax":4653562.719028779,"spatialReference":{"wkid":102100}},
		resolution: '1m',
		mapId:'stMarys'
	},
	'Talbot': {
		extent: {"xmin":-8501020.537762085,"ymin":4660671.362659247,"xmax":-8447285.306877678,"ymax":4713642.223260803,"spatialReference":{"wkid":102100}},
		resolution: '1m',
		mapId:'talbot'
	},
	'Washington': {
		extent: {"xmin":-8727350.578514209,"ymin":4766078.024664408,"xmax":-8623472.657074794,"ymax":4829215.010027879,"spatialReference":{"wkid":102100}},
		resolution: '1m',
		mapId:'washington'
	},
	'Wicomico': {
		extent: {"xmin":-8452712.335886149,"ymin":4608694.183425576,"xmax":-8380632.2182133235,"ymax":4660518.488602856,"spatialReference":{"wkid":102100}},
		resolution: '1m',
		mapId:'wicomico'
	},
	'Worcester': {
		extent: {"xmin":-8423284.079996146,"ymin":4578654.431309393,"xmax":-8352962.013973878,"ymax":4644008.0904931305,"spatialReference":{"wkid":102100}},
		resolution: '1m',
		mapId:'worcester'
	}
};


//Constants
MD_CENTER = [-77.16, 38.48];
MIN_ZOOM = 8;

//Global variables. Maybe contain these later, but this will be it for now...
var map, idParams, idContent, mouseClick, toolbar, activeLayers = {};
var activeGP, gps, isDrawing = false;
var curLayer;
var tree, model, store;
var calcStatsButton, cancelStatsButton;
var gDojo = {};
var servicesUrl = 'arcgis/rest/services/';

require(["cbtree/Tree",
		"cbtree/store/ObjectStore",
		"cbtree/model/ForestStoreModel",
		"cbtree/util/QueryEngine",
		"esri/arcgis/utils",
		"esri/config",
		"esri/map", 
		"esri/geometry/Extent",
		"esri/graphic",
		"esri/dijit/Geocoder", 
		"esri/geometry/Point",
		"esri/layers/ArcGISDynamicMapServiceLayer",
		"esri/layers/ArcGISImageServiceLayer",
		"esri/layers/ArcGISTiledMapServiceLayer",
		"esri/layers/ImageParameters",
		"esri/request",
		"esri/symbols/SimpleLineSymbol",
		"esri/symbols/SimpleFillSymbol",
		"esri/tasks/FeatureSet",
		"esri/tasks/Geoprocessor",
		"esri/tasks/IdentifyTask",
		"esri/tasks/IdentifyParameters",
		"esri/tasks/PrintParameters",
		"esri/tasks/PrintTask",
		"esri/tasks/PrintTemplate",
		"esri/toolbars/draw",
		"esri/toolbars/navigation",
		"dijit/Dialog",
		"dijit/layout/BorderContainer", 
		"dijit/layout/ContentPane", 
		"dijit/layout/TabContainer",
		"dijit/form/Button",
		"dijit/form/CheckBox",
		"dijit/form/DropDownButton",
		"dijit/form/ToggleButton",
		"dijit/DropDownMenu",
		"dijit/MenuItem",
		"dijit/form/HorizontalSlider", 
		"dijit/form/HorizontalRuleLabels", 
		"dijit/form/HorizontalRule",
		"dijit/TitlePane",
		"dijit/Toolbar",
		"dijit/Tooltip",
		"dijit/TooltipDialog",
		"dojo/_base/Color",
		"dojo/dnd/Source",
		"dojo/string",
		"dojo/parser",
		"dojox/layout/FloatingPane",
		"dojo/domReady!"
		], 
	function InitializeLayout(Tree, ObjectStore, StoreModel, QueryEngine,
			arcgisUtils, esriConfig, Map, Extent, Graphic, Geocoder, Point, ArcGISDynamicMapServiceLayer, ArcGISImageServiceLayer, ArcGISTiledMapServiceLayer,
			ImageParameters, esriRequest, SimpleLineSymbol, SimpleFillSymbol, FeatureSet, Geoprocessor, IdentifyTask, IdentifyParameters, 
			PrintParameters, PrintTask, PrintTemplate, Draw, Navigation,
			Dialog,	BorderContainer, ContentPane, TabContainer, Button, CheckBox, DropDownButton, ToggleButton, DropDownMenu, MenuItem, HorizontalSlider, 
			HorizontalRuleLabels, HorizontalRule,TitlePane, Toolbar, Tooltip, TooltipDialog, Color, Source, dojoString, parser, FloatingPane) {
	
	parser.parse(); //Parses out Dojo elements from the DOM. IIRC, this is slower than writing them in js, so avoid putting them into HTML? 
	
	//Declaring a global version of many dojo items so that I can access them in other functions to make the code
	//easier to read. Might be a bad way to do it, but it's working well so far.
	gDojo.SimpleFillSymbol = SimpleFillSymbol;
	gDojo.Graphic = Graphic;
	gDojo.FeatureSet = FeatureSet;
	gDojo.Dialog = Dialog;
	gDojo.SimpleLineSymbol = SimpleLineSymbol;
	gDojo.Color = Color;
	gDojo.String = dojoString;
	gDojo.HorizontalSlider = HorizontalSlider;
	gDojo.HorizontalRule = HorizontalRule;
	gDojo.HorizontalRuleLabels = HorizontalRuleLabels;
	gDojo.IdentifyTask = IdentifyTask;
	gDojo.PrintParameters = PrintParameters;
	gDojo.PrintTask = PrintTask;
	gDojo.PrintTemplate = PrintTemplate;
	gDojo.TitlePane = TitlePane;
	gDojo.Geoprocessor = Geoprocessor;
	gDojo.Button = Button;
	gDojo.ArcGISTiledMapServiceLayer = ArcGISTiledMapServiceLayer;
	gDojo.ArcGISImageServiceLayer = ArcGISImageServiceLayer;
	gDojo.ArcGISDynamicMapServiceLayer = ArcGISDynamicMapServiceLayer;

	//1. Map
	map = new Map("mapDiv",{
	  	basemap: "topo",
		center: MD_CENTER,
 		logo: false,
	  	zoom: MIN_ZOOM,
	  	sliderStyle: "small"
	});
	
	map.on("load", function(evtObj){
		map.infoWindow.resize(400,100);
		toolbar = new Draw(evtObj.map, { showTooltips: true });
		toolbar.setFillSymbol(new SimpleFillSymbol("solid", new SimpleLineSymbol("dash", new Color("#444444"), 2), new Color([ 255, 226, 124,0.5])));
		toolbar.on("draw-end", computeZonalStats);
	});
	
	var treeInstructions = new TitlePane({
			title: "Select Layers",
			content: "Select layers  to view. Click on the 'Active' tab to view legends, opacity, and additional information. You can always return to this tab and make adjustments.",
			id: "treeInstructions",
			open: true
		}).placeAt(dojo.byId("layersTab"));
		
	var activeInstructions = new TitlePane({
		title: "Configure Active Layers",
		content: "View legend and change layer opacity. Click, hold and drag a layer name to change its z-position on the map. Return to the 'Layers' tab to change visible layers.",
		id: 'activeInstructions',
		open: true
	}).placeAt(dojo.byId("activeTab"),"first");

	//2. Build Navigation Tree.
	activeTabDnd = new Source("activeTabDnd");
	dojo.connect(activeTabDnd, "onDrop", function(source, node, copy){	
		numLayers = map.layerIds.length;
		var newPos = numLayers - Array.prototype.indexOf.call(dojo.byId('activeTabDnd').children, node[0])-1;
		map.reorderLayer(map.getLayer(node[0].id.substring(0,node[0].id.length-3)),newPos);
	});	

	store = new ObjectStore();

	//2a. Map layers - hardcoded titles for quicker loading times.
	
	//Biomass Maps	
	if (MAP_STARTUP && !LAYOUT_DEBUG) var biomassChecked = true;
	else var biomassChecked = false;
		
	store.add({id: 'biomass', name: 'Biomass', type: "parent"});
	store.add({id: 'biomass/fullState', name: 'Full State (30m)', url: servicesUrl+'biomass/fullState/MapServer', checked: biomassChecked, parent: 'biomass'});
	store.add({id: 'biomass/nbcd', name: 'NBCD Biomass (30m)', url: servicesUrl+'biomass/nbcd/MapServer',parent: 'biomass'});

	//Height + Canopy Maps
	store.add({id: 'height', name: 'Canopy Height', type: "parent"});	
	store.add(({id: 'height/fullState', name: 'Full State (30m)', url: servicesUrl+'height/fullState/MapServer', type: 'child', parent: 'height'}));
	store.add({id: 'cover', name: 'Canopy Cover', type: "parent"});
	store.add(({id: 'cover/fullState', name: 'Full State (30m)', url: servicesUrl+'cover/fullState/MapServer', type: 'child', parent: 'cover'}));
	for (var cur in countyMaps){
		store.add(({id: 'cover/'+countyMaps[cur].mapId, name: cur+" ("+countyMaps[cur].resolution+")", url: servicesUrl+'cover/'+countyMaps[cur].mapId+'/MapServer', parent: 'cover'}));
		store.add(({id: 'height/'+countyMaps[cur].mapId, name: cur+" ("+countyMaps[cur].resolution+")", url: servicesUrl+'height/'+countyMaps[cur].mapId+'/MapServer', parent: 'height'}));
	}

	//ED Maps
	var edMaps = [{id: 'ED_AGB_for_percent_tree_UTM_90m' ,name:'Above Ground Biomass'},
					{id: 'ED_sequestration_potential_UTM_90m', name:'Carbon Sequestration Potential'},
    				{id: 'ED_sequestration_potential_gap_UTM_90m', name:'Gap to CSP'},
    				{id: 'ED_Age_Gap_UTM_90m', name:'Gap of Years to CSP'},
    				{id: 'ED_NEP_for_percent_tree_UTM_90', name:'Net Ecosystem Exchange'}];
    var edMapsLength = edMaps.length;
	store.add({id: 'ed', name: 'ED Model Beta Estimates', type: "parent"});
	for (var i =0; i < edMapsLength; i++){
		store.add({id: 'ed/'+edMaps[i].id, name: edMaps[i].name, url: servicesUrl+'ed/'+edMaps[i].id+'/MapServer', type:"child", parent: "ed"});
	}
	
	model  = new StoreModel({ 
		store:store, 
		query:{type:"parent"},
		onNewItem: function(item, parentInfo){
			if (this.store.getValue(item, 'type') == 'parent'){
				this._requeryTop();
			}
			this.inherited(arguments);
		}
	});
	
	tree = new Tree( {
		id: "cbTree",
		model:model, 
		showRoot:false, 
		branchIcons: false,
		branchCheckBox: false,
		leafIcons: false,
		openOnClick: true,
		autoExpand: false
		}).placeAt(dojo.byId("layersTab"));
	
	tree.startup();
	tree.on("checkBoxClick", function(item){
		toggleActiveLayer(item);
	});	
					
	if (MAP_STARTUP && !LAYOUT_DEBUG){	
		toggleActiveLayer(store.get('biomass/fullState'));
	}

	//tree.expandChecked();
		
	buildZonalStatsTool(); //Temporary version until the all-layers version is available.
	buildAddMapTool();
	buildPrintTool();
	
	//3. Navigation Toolbar
	var navToolbar = new Toolbar({}, "navToolbar");
	var navTools = new Navigation(map);
	//3A. Simple buttons
	PopulateToolbar: {
		var zoomInButton = new Button({	
			id: "zoomInButton",
			iconClass: "zoomInIcon",
			onClick: function(){ navTools.activate(Navigation.ZOOM_IN); },
			label: "Zoom In"
		}).placeAt(navToolbar);
		
		var zoomOutButton = new Button({
			id: "zoomOutButton",
			iconClass: "zoomOutIcon",
			onClick: function() {navTools.activate(Navigation.ZOOM_OUT); },
			label: "Zoom Out"
		}).placeAt(navToolbar);
			
		var zoomFullExtButton = new Button({
			id: "zoomFullExtButton",
			iconClass: "zoomFullExtIcon",
			onClick: function(){ map.centerAndZoom(MD_CENTER, MIN_ZOOM); },
			label: "Full Extent"
		}).placeAt(navToolbar);
		
		var zoomPrevButton = new Button({
			id: "zoomPrevButton",
			iconClass: "zoomPrevIcon",
			onClick: function() {navTools.zoomToPrevExtent(); },
			label: "Previous Extent"
		}).placeAt(navToolbar);
	
		var zoomNextButton = new Button({
			id: "zoomNextButton",
			iconClass: "zoomNextIcon",
			onClick: function() {navTools.zoomToNextExtent(); },
			label: "Next Extent"
		}).placeAt(navToolbar);
			
		var panButton = new Button({ 
			id: "panButton",
			iconClass: "panIcon",
			onClick: function(){ navTools.activate(Navigation.PAN);},
			label: "Pan"
		}).placeAt(navToolbar);
		
		var deactivateIcon = new Button({
			id: "deactivateButton",
			iconClass: "deactivateIcon",
			onClick: function(){ navTools.deactivate();},
			label: "Deactivate"
		}).placeAt(navToolbar);
		
		dojo.connect(navTools, "onExtentHistoryChange", function(){	
			zoomPrevButton.disabled = navTools.isFirstExtent();
			dijit.byId("zoomNextButton").disabled = navTools.isLastExtent(); //TODO: Fix issue on first/last extent, have to click twice for change to happen
		});	//on(navTools, "onExtentHistoryChange", extentHistoryChangeHandler); //dojo API recommends this method, but I can't get it to work.
	}
	
	//3B. Zoom to County
	ZoomToCounty: {
		var selectCountyMenu = new DropDownMenu({ 
				style: "display: none;",
				id: 'selectCountyMenu'
				});
			
		for (var cur in countyMaps){
			var ic = (countyMaps[cur].has_1m ? "oneMeterIcon" : "");
			selectCountyMenu.addChild(new MenuItem({
				label: cur,
				iconClass: ic,
				onClick: function(){ map.setExtent(new Extent(countyMaps[this.label].extent)); } //TODO: switch to center-and-zoom
			}));
			
		}
		
		var countyButton = new DropDownButton({
			iconClass: 'countyIcon',
			label: "Zoom to County",
			dropDown: selectCountyMenu
		}).placeAt(navToolbar);	
	}
	
	//3C. Switch Basemaps
	SwitchBasemaps: {
		var basemapMenu = new DropDownMenu({
				style: "display: none;",
				id: 'selectBasemapMenu'
		});
		
		for (i = 0; i< basemaps.length; i++){ 
			basemapMenu.addChild(new MenuItem({
				label: basemaps[i].label,
				basemap: basemaps[i].bm, 
				onClick: function(){ map.setBasemap(this.basemap);	} 
			}));
		}	
			
		var basemapButton = new DropDownButton({
			iconClass: 'basemapIcon',
			label: "Switch Basemap",
			dropDown: basemapMenu
		}).placeAt(navToolbar);
	}
		
	//3D. Calculate Biomass
	CalculateBiomass: {

	//don't know what this means, from the tutorial!
		esriConfig.defaults.io.proxyUrl = "/proxy"; //identify proxy page to use if the toJson payload to the geoprocessing service is greater than 2000 characters.
		esriConfig.defaults.io.alwaysUseProxy = false; //If this null or not available the gp.execute operation will not work.  Otherwise it will do a http post to the proxy.

		
			}
		
	//4. Geocoder
	var geocoder = new Geocoder({ 
		map: map ,
		arcgisGeocoder: {
			url: "http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer",
			placeholder: "Find a location"
		}}, "geocoder");			
	geocoder.startup();

	//5. Point values on click
    idParams = new IdentifyParameters();
	idParams.tolerance = 3;
	idParams.returnGeometry = true;	
	
	map.on("click", identifyPoint);
	
	//5. Dialogs
	statsResultsDialog = new Dialog({
		id: 'statsResultsDialog',
		title: "Calculate Results",
		content: "Processing...",
		style: "width: 270px; height:109px; background-color: white; background: #fff",
		closable: true,
		onHide: function(){
//			map.graphics.clear();
			isDrawing=false;
			//dojo.byId(curLayer+"StatsButton").classList.remove("statsButtonActive");
		}
	});
	
});

function identifyPoint(evt){
	if (isDrawing || activeLayers.length == 0) return; 
	map.graphics.clear();

	mouseClick = evt.screenPoint;
	
	idParams.geometry = evt.mapPoint;
	idParams.mapExtent = map.extent;		
	idParams.width = map.width;
	idParams.height = map.height;	
	
	executeIdTasks();
}

//Recursive. It's stupid, but I give up, no clue how to make this synchronous!
function executeIdTasks(){
	var idTaskKeys = [];
	for (var key in activeLayers) {
    	idTaskKeys.push(key);
    	}
    	
    idContent = "";

	function executeIdTasksRecursively(index){
		activeLayers[idTaskKeys[index]].idTask.execute(idParams, function(idResults){
			
			val = idResults[0] ? parseFloat(idResults[0].feature.attributes["Pixel Value"]).toFixed(2): "n/a";
			item = store.get(idTaskKeys[index]);
			units='';
			if (item.parent == 'cover'){
					if (val == 0) val = 'Non-Forest';
					if (val == 1) val = 'Forest';
			} 
			else if (val == 'n/a' || val == 'NaN' || val < 0){
				val = 'n/a';
				units = "";
			} 
			else if (item.parent == 'biomass' || item.name.indexOf('Biomass') != -1)
				units = ' Mg/ha';
			else if (item.parent == 'height' || item.name.indexOf('Height') != -1)
				units = 'm';
			
			idContent += "<tr><td>"+ item.fullName + ": </td><td>" + val + units + "</td></tr>";		
			
			if (index < idTaskKeys.length-1){
				executeIdTasksRecursively(index+1);
			} else {
				var idTable = dojo.create("table", { innerHTML: idContent});
				map.infoWindow.setTitle("Values at Point");
				map.infoWindow.setContent(idTable);		
				map.infoWindow.show(mouseClick, map.getInfoWindowAnchor(mouseClick));
			}
		},
		function(err){
			console.log("executeIdTasksRecursively error: " + err);
		});
	}
	if (idTaskKeys.length > 0)
	executeIdTasksRecursively(0);
}

function setActiveGP(gpname){
	activeGP = gps[gpname];
}

function buildZonalStatsTool(){
	
	gps = {
			"biomass30" : new gDojo.Geoprocessor('http://129.2.24.138:6080/arcgis/rest/services/cms/bio_stats/GPServer/biomass_stats'),
			"cover30" : new gDojo.Geoprocessor('http://129.2.24.138:6080/arcgis/rest/services/cms/cover_stats_2/GPServer/cover_stats'),
			"height30" : new gDojo.Geoprocessor('http://129.2.24.138:6080/arcgis/rest/services/cms/height_stats_4/GPServer/height_stats')
		};
		
	activeGP = gps["biomass30"];
		
	var content = "<input type='radio' name='calcLayer' id='biomassCalc' value='Biomass' onClick='setActiveGP(\"biomass30\")' checked='checked'/><label for='biomassCalc'>Biomass </label>";
	content += "<input type='radio' name='calcLayer' id='coverCalc' value='Cover' onClick='setActiveGP(\"cover30\")'/><label for='coverCalc'>Cover </label>";
	content +=  "<input type='radio' name='calcLayer' id='heightCalc' disabled='disabled' value='Height' onClick='setActiveGP(\"height30\")'/><label style='color: gray' for='heightCalc'>Height </label>";
	content += "<br/><br/>";
	content += "Click and drag to draw a polygon and calculate area statistics. Please be patient while your results are processed.<br/><br/>";
	
	var zonalStatsMenu = new gDojo.TitlePane({
			title: "Calculate Statistics",
			id: "zonalStatsMenu",
			content: content,
			open: true
		}).placeAt(dojo.byId("toolsTab"));
		
	calcStatsButton = new gDojo.Button({
		label: "Calculate Statistics",
		onClick: function(){
			isDrawing = true;
			toolbar.on("draw-end", computeZonalStats); //have to switch this within each button.
			this.set('label',"Selection in Progress...");
			this.set('disabled',true);
			map.graphics.clear(); 
			map.infoWindow.hide();
			toolbar.activate(esri.toolbars.Draw.FREEHAND_POLYGON);
			map.hideZoomSlider();
			cancelStatsButton.set('disabled',false);
			}
		}).placeAt(zonalStatsMenu);
	
	cancelStatsButton = new gDojo.Button({
		label: "Cancel Drawing",
		disabled: true,
		onClick: function(){
			toolbar.deactivate();
			calcStatsButton.set('label',"Calculate Biomass");
			calcStatsButton.set('disabled',false);
			map.graphics.clear();
			map.infoWindow.hide();
			toolbar.deactivate(esri.toolbars.Draw.FREEHAND_POLYGON);
			map.showZoomSlider();
		}
	}).placeAt(zonalStatsMenu);
	
}

function buildAddMapTool(){
	
	var content= "Enter the URL of an ArcGIS On-line map service to add it to this map. It will be added to a 'custom' folder in the Layers tab. Some tools on this page may not apply for custom layers.<br><br>"+
	"URL:<br><input style='width:250px' type='text' id='addMapUrl' name='addMapUrl' value='http://geodata.md.gov/imap/rest/services/Boundaries/MD_PhysicalBoundaries/MapServer'><br>"+
	"Map Title:<br><input style='width:250px' type='text' id='addMapTitle' name='addMapTitle' value='County Boundaries'>"+
	"<span id='addMapResults'></span><br><br>";
	
	var addMapMenu = new gDojo.TitlePane({
		title: "Add Custom Layer",
		id: addMapMenu,
		content: content,
		open: true
	}).placeAt(dojo.byId("toolsTab"));
	
	var addMapUrl = dojo.byId('addMapUrl');
	var addMapTitle = dojo.byId('addMapTitle');
	var addMapResults = dojo.byId('addMapResults');
	
	var addMapButton = new gDojo.Button({
		label: "Add to Map",
		onClick: function(){
			
			addMapResults.innerHTML = 'Processing...';
			addMapButton.set('disabled',true);
			
			//Error-checking
			if (store.get(addMapTitle.value)){
				addMapResults.innerHTML = 'Layer with this title already exists.';	//Error: Duplicate title
			} 
			else {
				try{var mapInfo = getJSONSync(addMapUrl.value);}
				catch (err){
					addMapResults.innerHTML = 'Invalid URL';						//Error: Not an ESRI URL
				}				
				if (mapInfo.error){
						addMapResults.innerHTML = 'Invalid URL';			//Error: Not a valid map service
				}	
				else {	
					try{
						//No error: Process!
						var newLayer = [];
						newLayer.url = addMapUrl.value;						
						newLayer.id = addMapTitle.value;
						newLayer.name = addMapTitle.value;
						newLayer.fullName= addMapTitle.value;
						newLayer.opacity = 0.8;
						newLayer.type = "child";
						newLayer.tiled = (mapInfo.lods != null);
						newLayer.parent = 'custom';
						newLayer.idTask = new gDojo.IdentifyTask(newLayer.url);
						newLayer.mapInfo = mapInfo;
						newLayer.checked = true;
	
						if (newLayer.url.endsWith('ImageServer') || newLayer.url.endsWith('ImageServer/')){
							newLayer.isImageService = true;
						}
						
						store.add(newLayer);
						toggleActiveLayer(newLayer);
		
						addMapResults.innerHTML = 'Successfully added.';
						
						//add 'custom' folder if it doesn't exist yet
						if (store.get('custom') == null)
							store.add({id: 'custom', name: "Custom Layers", type: "parent"});				
					}
					catch(err){
						addMapResults.innerHTML= err;
					}
				}
		}
		addMapButton.set('disabled',false);
	}	
	}).placeAt(addMapMenu);
}

function buildPrintTool(){
	var url = servicesUrl + 'Utilities/PrintingTools/GPServer/Export Web Map Task';
	var printTask = new gDojo.PrintTask(url);
	var printParams = new gDojo.PrintParameters();
	var printTemplate = new gDojo.PrintTemplate();
	printTemplate.layout = "A3 Landscape";
	printTemplate.label = "Print to Image";

	printTemplate.layoutOptions = {
		authorText: "University of Maryland, College Park",
		copyrightText: "NASA Carbon Monitoring System",
		scalebar: "Kilometers"};

	printParams.map = map;	
	printParams.template = printTemplate;
		
	content = "The current display will be printed to an .png image file. You can then save or print this image.<br><br>" +
	"<table><tr><td>Map Title:</td><td><input type='text' id='printTitle' name='printTitle' value='Maryland CMS'></td></tr>" +
	"<tr><td>Results:</td><td id='printResults'>No map printed yet.</td></tr></table><br/>";
	

	var printMenu = new gDojo.TitlePane({
		title: "Print View",
		id: "printMenu",
		content: content,
		open: true
	}).placeAt(dojo.byId("toolsTab"));

	var printResults = dojo.byId('printResults');
	
	var printButton = new gDojo.Button({
		label: "Print to Map Image",
		onClick: function(){
				printResults.innerHTML = "Processing...";
				printButton.set('disabled',true);

				printTemplate.layoutOptions.titleText = dojo.byId('printTitle').value;

				printTask.execute(printParams, function(data){
				printButton.set('disabled',false);
					printResults.innerHTML = "<a href='" + data.url+ "' target='_blank'>Open Map Image</a>";
				}, function(err){
				printButton.set('disabled',false);
				printResults.innerHTML = "Failed to print.";
				console.log("Couldn't print.");
				console.log(url);
				console.log(err);});
		}
	}).placeAt(printMenu);

}

//TODO: Handle internet explorer
function calculateStats(e,layer){
	
	e.stopPropagation();

	if (isDrawing){
		dojo.byId(curLayer+"StatsButton").classList.remove("statsButtonActive"); //deactivate any last ones
		if (curLayer==layer){
			isDrawing = false;
			toolbar.deactivate();
			map.showZoomSlider();
			return; //We clicked a second time, cancel the drawing.
		}
	}

	dojo.byId(layer+"StatsButton").classList.add("statsButtonActive");
	
	isDrawing = true;
	curLayer = layer;
	map.graphics.clear(); 
	map.infoWindow.hide();
	toolbar.activate(esri.toolbars.Draw.FREEHAND_POLYGON);
	map.hideZoomSlider();
}

function computeZonalStats(evtObj) {
	var geometry = evtObj.geometry;
	map.showZoomSlider();
	
	var symbol = new gDojo.SimpleFillSymbol("solid", new gDojo.SimpleLineSymbol("solid", new gDojo.Color("#444444"), 2), new gDojo.Color([ 255, 226, 124,0.75]));
	var graphic = new gDojo.Graphic(geometry,symbol);

	map.graphics.add(graphic);
	toolbar.deactivate();

	var features= [];
	features.push(graphic);

	var featureSet = new gDojo.FeatureSet();
	featureSet.features = features;
	
	var params = { "inputPoly":featureSet};

	calcStatsButton.set('label',"Calculate Statistics");
	calcStatsButton.set('disabled',false);
	cancelStatsButton.set('disabled', true);
				
	statsResultsDialog.set('title', "Calculation Results");
	statsResultsDialog.set('content', "Processing...");
	statsResultsDialog.show();
		
	if (activeGP == null)
		displayError("No geoprocessor available.");
	else		
		activeGP.execute(params, displayResults, displayError);
}
	
function displayResults(results) {
	
	var content="Administrator forgot to interpret results!";

	if (results[0].value.features.length == 0){
		content="No calculations available outside of Maryland.";
	} 
	else if (activeGP == gps["cover30"]){
		content = gDojo.String.substitute(
		"The mean canopy cover in the selection is ${mean:dojo.number.format}%. ", {mean: parseFloat(results[0].value.features[0].attributes.MEAN).toFixed(2)});
	}
	else if (activeGP == gps["height30"]){
		content = gDojo.String.substitute(
		"The mean canopy cover in the selection is ${mean:dojo.number.format}m.<br/>The max tree height is ${max:dojo.number.format}m. ", {max: parseFloat(results[0].value.features[0].attributes.MAX).toFixed(2), mean: parseFloat(results[0].value.features[0].attributes.MEAN).toFixed(2)});
	}
	else if (activeGP == gps["biomass30"]){
		content = gDojo.String.substitute(
			"The total biomass in the selection is ${sum:dojo.number.format} Mg.<br/>The mean value is ${mean:dojo.number.format} Mg/ha. ",
			{sum: (results[0].value.features[0].attributes.SUM), mean: (results[0].value.features[0].attributes.MEAN)});
	}
	
	statsResultsDialog.set("content", content);
	
	
	isDrawing = false;
}

function displayError(err){
	var content = err + "<br/> Please contact site administrator.";
	
	statsResultsDialog.set("content", content);

	isDrawing = false;
}

function getJSONSync(url){
	return $.parseJSON(
			$.ajax({
				type: "GET",
				url: url+"?f=json",
				async: false,
				dataType: "json"
			}).responseText);
}

function toggleActiveLayer(item){
	if (item.checked && !map.getLayer(item.id)){
		if (!LAYOUT_DEBUG){
			opacity = item.opacity? item.opacity : 0.8;
			var layerParams = {
				opacity: opacity,
				id: item.id,
				visible: true,
				showAttribution: false	
			};
			if (item.tiled)
				map.addLayer(new gDojo.ArcGISTiledMapServiceLayer(item.url, layerParams));
			else if (item.isImageService)
				map.addLayer(new gDojo.ArcGISImageServiceLayer(item.url, layerParams));
			else
				map.addLayer(new gDojo.ArcGISDynamicMapServiceLayer(item.url, layerParams));
		}
		buildLayerMenu(item);		
	}
	
	map.getLayer(item.id).setVisibility(item.checked);
	isVisible = item.checked? 'block' : 'none';
	dojo.style(store.get(item.id).menu.domNode,'display', isVisible);
	dojo.style(dojo.byId(item.id+"Dnd"),'display',isVisible);
	
	activeLayers[item.id] ? (delete activeLayers[item.id]) : (activeLayers[item.id] = item);
}

function buildLayerMenu(curMap){

	//Get Map info when not already existing
	if (curMap.mapInfo == null){
		curMap.mapInfo = getJSONSync(curMap.url);			
		curMap.name = curMap.mapInfo.mapName;
		if (curMap.mapInfo.documentInfo)
			curMap.fullName= curMap.mapInfo.documentInfo.Title;
		else
			curMap.fullName = curMap.name;
		curMap.opacity = 0.8; //TODO: match to config file
		curMap.type = "child";
		curMap.tiled = (curMap.mapInfo.lods != null);
		curMap.idTask = new gDojo.IdentifyTask(curMap.url);
	}
	
	dndDiv = new dojo.create("div",{id:curMap.id+"Dnd"});
	
	curMap.menu = new gDojo.TitlePane({
			title: curMap.fullName,
			id: curMap.id+"Menu",
			open: true//false
		}).placeAt(dndDiv);
			
	activeTabDnd.insertNodes(false,[dndDiv],true);
	
	dojo.style(curMap.menu.domNode,'display','none'); //temporarily cancelled to debug.

	curMenu = curMap.menu;	
	curMenu.containerNode.appendChild(dojo.create("label", {'for': curMap.id+"OpacitySlider", innerHTML: "Layer Opacity"}));
		
		var slider = new gDojo.HorizontalSlider({
			id:curMap.id+"OpacitySlider",
			layer: curMap.id,
			value: curMap.opacity,
			minimum: 0,
			maximum: 1,
			intermediateChanges: true,
			showButtons:false, 
			onChange: function(value){ 
				map.getLayer(this.layer).setOpacity(value);
			}
		}).placeAt(curMenu.containerNode);
		
		var ruler = new gDojo.HorizontalRule({
			container: "bottomDecoration",
			count: 11,
			style: "height:5px;"
		}).placeAt(slider);
		
		var rulerLabel = new gDojo.HorizontalRuleLabels({
			container: "bottomDecoration",
			style: "height:1em; font-size:75%; color:gray"
		}).placeAt(slider);

		//F. Description
		if (curMap.mapInfo)
			serviceJSON = curMap.mapInfo;
		else 
			serviceJSON = getJSONSync(curMap.url);
		//other useful items: mapName, layers, layers.name, initialExtent, fullExtent, documentInfo.Title, documentInfo.Subject, documentInfo.Category, tileInfo
		curMenu.containerNode.appendChild(dojo.create("p", {innerHTML: serviceJSON["serviceDescription"]})); 
		
		//F. Legend
		legendJSON = getJSONSync(curMap.url+"/legend");
		if (curMap.parent == 'biomass' || curMap.name.indexOf('Biomass') != -1){
			legTitle = 'Biomass (Mg/ha)';
		}
		else if (curMap.parent == 'height' || curMap.name.indexOf('Height') != -1){
			legTitle = 'Height (m)';
		}
		else if (curMap.parent =='cover'){
			if (curMap.mapInfo && curMap.mapInfo.mapName == 'Full State (30m)'){
				legTitle = 'Canopy Cover (%)';
				}
			else {
				legTitle = 'Cover Classification';
			}
		} else if (curMap.parent =='ed'){
			legTitle = curMap.mapInfo.layers[0].name;
		}
		else {
			legTitle ='';
		}
		
		
		legend = legendJSON["layers"][0]["legend"]; //This is only for layer 0, since all my maps atm have just one.
		var legendContent = '<tr><th colspan="2">'+legTitle+'</th></tr>'; //TODO: grab from metadata?
		for (i = 0 ; i< legend.length; i++){
			legendContent += '<tr><td style="width:18px; height:18px; background-image:url('+curMap.url+'/0/images/'+legend[i]["url"]+')"></td><td>'+legend[i]["label"]+'</td></tr>';
		}
		curMenu.containerNode.appendChild(dojo.create("table", {'class': "mapLegend", innerHTML: legendContent, 'cellspacing':'0px'}));
		
}
