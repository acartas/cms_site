
//*********************//
//***Utility methods***//
//*********************//
if (typeof String.prototype.endsWith !== 'function') {
    String.prototype.endsWith = function(suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
}

//********************//
//***General config***//
//********************//
var config = {
	stateOpacity: {
		'biomass': 0.9, 
		'height': 0.9, 
		'cover': 0.9
		},
	countyOpacity: {
		'height': 0.7, 
		'coverPercent': 0.7, 
		'coverBinary': 0.4
		}
};

/*TODO: Grab extents from services
 */	
var basemaps = [ {label:"Streets", bm:"streets"}, {label:"Satellite", bm:"satellite"},
		{label:"Hybrid", bm:"hybrid"}, {label:"Topographic", bm:"topo"}, {label:"Light Gray Canvas", bm:"gray"},
		{label:"National Geographic", bm:"national-geographic"},{label:"Open Street Map", bm:"osm"} ]; 
		
var countyMaps = {
	'Allegany': { 
		extent: {"xmin":-8805087.036280174,"ymin":4786945.333386234,"xmax":-8714356.283705791,"ymax":4830132.254367301,"spatialReference":{"wkid":102100}}
	},
	'Anne Arundel': { 
		extent: {"xmin":-8553991.398363845,"ymin":4679857.056758904,"xmax":-8501708.471016765,"ymax":4753695.2260824125,"spatialReference":{"wkid":102100}}
	},
	'Baltimore City': 	{ 
		extent: {"xmin":-8539774.11110263,"ymin":4749720.500611395,"xmax":-8519059.676437374,"ymax":4775326.905086894,"spatialReference":{"wkid":102100}}
	},
	'Baltimore': {
		extent: {"xmin":-8565762.700719628,"ymin":4742688.294009118,"xmax":-8494064.768188106,"ymax":4829826.506254252,"spatialReference":{"wkid":102100}}
	},
	'Calvert': {
		extent: {"xmin":-8540003.422187475,"ymin":4623522.9669127455,"xmax":-8501479.159931798,"ymax":4690023.181520759,"spatialReference":{"wkid":102100}}
	},
	'Caroline': {
		extent: {"xmin":-8459591.668431574,"ymin":4669843.806053456,"xmax":-8421526.028345607,"ymax":4742994.042122271,"spatialReference":{"wkid":102100}}
	},
	'Carroll': {
		extent: {"xmin":-8608873.184672348,"ymin":4769747.002022136,"xmax":-8545430.451195737,"ymax":4828756.387858213,"spatialReference":{"wkid":102100}}
	},
	'Cecil': {
		extent: {"xmin":-8488331.991066774,"ymin":4774333.223719189,"xmax":-8432380.0863621,"ymax":4827762.706490455,"spatialReference":{"wkid":102100}}
	},
	'Charles': {
		extent: {"xmin":-8603446.155664086,"ymin":4614885.582716532,"xmax":-8534729.267235804,"ymax":4674965.0869486,"spatialReference":{"wkid":102100}}
	},
	'Dorchester': {
		extent: {"xmin":-8499033.175026653,"ymin":4615497.078942799,"xmax":-8424659.946505276,"ymax":4682150.167607383,"spatialReference":{"wkid":102100}}
	},
	'Frederick': {
		extent: {"xmin":-8649002.624522012,"ymin":4755376.840704543,"xmax":-8579750.676895734,"ymax":4827609.832433936,"spatialReference":{"wkid":102100}}
	},
	'Garrett': {
		extent: {"xmin":-8868224.021643858,"ymin":4748956.130328465,"xmax":-8757848.952800022,"ymax":4838081.705309015,"spatialReference":{"wkid":102100}}
	},
	'Harford': {
		extent: {"xmin":-8527085.564407306,"ymin":4764319.973013843,"xmax":-8465477.319609538,"ymax":4828679.950829876,"spatialReference":{"wkid":102100}}
	},
	'Howard': {
		extent: {"xmin":-8595038.082552869,"ymin":4736649.768774786,"xmax":-8536793.066999642,"ymax":4776320.586454739,"spatialReference":{"wkid":102100}}
	},
	'Kent': {
		extent: {"xmin":-8504230.892950194,"ymin":4696596.765953163,"xmax":-8428099.612778129,"ymax":4777467.141878909,"spatialReference":{"wkid":102100}}
	},
	'Montgomery': {
		extent: {"xmin":-8627982.441743735,"ymin":4711960.608638707,"xmax":-8557354.627608327,"ymax":4774256.786691042,"spatialReference":{"wkid":102100}}
	},
	"Prince George's": {
		extent: {"xmin":-8576540.321707888,"ymin":4662200.103225025,"xmax":-8533276.96369846,"ymax":4737261.265001097,"spatialReference":{"wkid":102100}}
	},
	"Queen Anne's": {
		extent: {"xmin":-8501708.471016783,"ymin":4668620.813600776,"xmax":-8426494.43518414,"ymax":4759580.877260169,"spatialReference":{"wkid":102100}}
	}, 
	'Sommerset': {
		extent: {"xmin":-8467388.245316632,"ymin":4565965.884614071,"xmax":-8406467.933773428,"ymax":4624593.085308722,"spatialReference":{"wkid":102100}}
	},
	"St Mary's": {
		extent: {"xmin":-8560029.923598165,"ymin":4584769.393572213,"xmax":-8492841.775735585,"ymax":4653562.719028779,"spatialReference":{"wkid":102100}}
	},
	'Talbot': {
		extent: {"xmin":-8501020.537762085,"ymin":4660671.362659247,"xmax":-8447285.306877678,"ymax":4713642.223260803,"spatialReference":{"wkid":102100}}
	},
	'Washington': {
		extent: {"xmin":-8727350.578514209,"ymin":4766078.024664408,"xmax":-8623472.657074794,"ymax":4829215.010027879,"spatialReference":{"wkid":102100}}
	},
	'Wicomico': {
		extent: {"xmin":-8452712.335886149,"ymin":4608694.183425576,"xmax":-8380632.2182133235,"ymax":4660518.488602856,"spatialReference":{"wkid":102100}}
	},
	'Worcester': {
		extent: {"xmin":-8423284.079996146,"ymin":4578654.431309393,"xmax":-8352962.013973878,"ymax":4644008.0904931305,"spatialReference":{"wkid":102100}}
	}
};

