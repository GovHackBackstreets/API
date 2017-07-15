const t = require('tcomb')

const location = t.struct({
    lat: t.Num,
    long: t.Num
})

const step = t.struct({
    location: location,
    supplier: t.Str,
    rating: t.Number
})

// a predicate is a function with signature: (x) -> boolean
const predicate = function (x) { return x < 6; };

// a positive number
const Rating = t.subtype(t.Num, predicate, 'Positive');

const stamp = t.struct({
    locationName: t.Str,
    geoloc:location,
    facilityName: t.Str,
    FSA: t.Str,
    facilityChemicals: t.list(t.Str,'chemicals'),
    facilityAllergens: t.list(t.Str,'allergens'),
    conditionIn: t.Str,
    conditionOut: t.Str,
    physicalQuality:t.maybe(Rating),
    chemicalContaminents:t.maybe(Rating),
    microbialSafety:t.maybe(Rating),
    temperatureControl:t.maybe(Rating)
});

const passport = t.struct({
    itemId: t.Num,
    name:t.Str,
  //  stamps: t.list(stamp,'passportstamps'),
    links: t.list(t.Number,'passportlinks')
});



module.exports = {
    step: step,
    passport: passport,
    stamp:stamp,
}