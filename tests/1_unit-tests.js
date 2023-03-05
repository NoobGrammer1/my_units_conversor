const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
    test('convertHandler should correctly read a whole number input', function () {
        assert.equal(convertHandler.getNum('4gal'), 4);
    });

    test('convertHandler should correctly read a decimal number input', function () {
        assert.equal(convertHandler.getNum('4.2gal'), 4.2);
    });

    test('convertHandler should correctly read a fractional input', function () {
        assert.equal(convertHandler.getNum('1/2km'), 0.5);
    });

    test('convertHandler should correctly read a fractional input with a decimal', function () {
        assert.equal(convertHandler.getNum('2.5/3mi'), 0.83333);
    });

    test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3)', function () {
        assert.isNull(convertHandler.getNum('3/2/3lbs'));
    });

    test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', function () {
        assert.equal(convertHandler.getNum('kg'), 1);
    });

    test('convertHandler should correctly read each valid input unit', function () {
        assert.equal(convertHandler.getUnit('1gal'), 'gal');
        assert.equal(convertHandler.getUnit('1lbs'), 'lbs');
        assert.equal(convertHandler.getUnit('1km'), 'km');
        assert.equal(convertHandler.getUnit('1kg'), 'kg');
        assert.equal(convertHandler.getUnit('1mi'), 'mi');
    });

    test('convertHandler should correctly return an error for an invalid input unit', function () {
        assert.isNull(convertHandler.getUnit('1invalidunit'));
        assert.isNull(convertHandler.getUnit('1galon'));
        assert.isNull(convertHandler.getUnit('1lbss'));
        assert.isNull(convertHandler.getUnit('1kmm'));
        assert.isNull(convertHandler.getUnit('1kgs'));
        assert.isNull(convertHandler.getUnit('1mii'));
    });

    test('convertHandler should return the correct return unit for each valid input unit', function () {
        assert.equal(convertHandler.getReturnUnit('gal'), 'L');
        assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
        assert.equal(convertHandler.getReturnUnit('km'), 'mi');
        assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
        assert.equal(convertHandler.getReturnUnit('mi'), 'km');
    });

    test('convertHandler should correctly return the spelled-out string unit for each valid input unit', function () {
        assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
        assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
        assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
        assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
        assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
    });
    // gal to L
    test('convertHandler should correctly convert gal to L', function () {
        assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.1);
    });

    // L to gal
    test('convertHandler should correctly convert L to gal', function () {
        assert.approximately(convertHandler.convert(1, 'L'), 0.26417, 0.1);
    });

    // mi to km
    test('convertHandler should correctly convert mi to km', function () {
        assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.1);
    });

    // km to mi
    test('convertHandler should correctly convert km to mi', function () {
        assert.approximately(convertHandler.convert(1, 'km'), 0.62137, 0.1);
    });

    // lbs to kg
    test('convertHandler should correctly convert lbs to kg', function () {
        assert.approximately(convertHandler.convert(1, 'lbs'), 0.45359, 0.1);
    });

    // kg to lbs
    test('convertHandler should correctly convert kg to lbs', function () {
        assert.approximately(convertHandler.convert(1, 'kg'), 2.20462, 0.1);
    });

});
