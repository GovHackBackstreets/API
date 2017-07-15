const t = require('tcomb');

const foodItem = t.struct({
	itemId: t.Integer,
	steps:t.Array(
		{	
		locationName: t.String,
		geoloc:
			{
				lat: t.Number,
			 	long: t.Number,
			 },
		dateIn: t.Date,
		dateOut: t.Date,
		facilityName: t.String,
		facilityAccredation: t.String,
		facilityChemicals: t.Array(t.String),
		facilityAllergens: t.Array(t.String),
		conditionIn: t.String,
		conditionOut: t.String,
		}
	),
	componentItems:t.Array(t.Integer),
});

module.exports{
	foodItem: foodItem;
}