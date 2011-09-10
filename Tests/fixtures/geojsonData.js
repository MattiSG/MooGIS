function geojsonData() {
	return {
		"type": "FeatureCollection",
		"features": [
			{
				"type": "Feature",
				"geometry": {
					"type": "Point",
					"coordinates": [
						7.0151224435,
						43.620365368
					]
				},
				"id": 1,
				"properties": {
					"someText": "Text number 1 from feature #1",
					"someOtherText": "Text number 2 from feature #1",
					"someArray": ["textInArray1 (1)", "textInArray2 (1)", "textInArray3 (1)"],
					"someNumber": 23
				}
			},
			{
				"type": "Feature",
				"geometry": {
					"type": "Point",
					"coordinates": [
						7.0254283689,
						43.673940357
					]
				},
				"id": 2,
				"properties": {
					"someText": "Text number 1 from feature #2",
					"someOtherText": "Text number 2 from feature #2",
					"someArray": ["textInArray1 (2)", "textInArray2 (2)", "textInArray3 (2)"],
					"someNumber": 28
				}
			},
			{
				"type": "Feature",
				"geometry": {
					"type": "Point",
					"coordinates": [
						7.0107341786,
						43.696563234
					]
				},
				"id": 3,
				"properties": {
					"someText": "Text number 1 from feature #3",
					"someOtherText": "Text number 2 from feature #3",
					"someArray": ["textInArray1 (3)", "textInArray2 (3)", "textInArray3 (3)"],
					"someNumber": 44
				}
			}
		]
	}
}