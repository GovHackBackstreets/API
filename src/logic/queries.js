const mongo = require('../services/mongo.js')

function getStuff(req, res) {

    const response = {
        itemId: 123,
        foodName: 'Sugar',
        foodCategory: 'materials',
        steps: [
            {
                locationName: 'tescos',
                geoloc:
                {
                    lat: 51.474468,
                    long: -0.045959,
                },
                dateIn: '14-07-2017',
                dateOut: '15-07-2017',
                facilityName: 'Toms Processing Facility',
                facilityAccredation: 'NVQ LEVEL 0',
                facilityChemicals: ['water', 'test', 'a bad checmical'],
                facilityAllergens: ['nuts', 'seeds', 'mints'],
                conditionIn: 'Item was as expected',
                conditionOut: 'Woops I dropped it sorry',
            }
        ],
        componentItems: [1, 2, 3, 4],
    }


    res.status(200).send('look at GET /scan/id or /scan/all/id');
}

module.exports = {
    getStuff: getStuff
}
