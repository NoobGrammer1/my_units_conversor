'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function(app) {
  const convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get((req, res) => {
      
      const input = req.query.input;
      const initNum = convertHandler.getNum(input);
      const initUnit = convertHandler.getUnit(input);
      console.log('req.query.input: ', req.query.input);
      console.log('convertHandler.getNum(input): ', convertHandler.getNum(input));
      console.log('convertHandler.getUnit(input): ', convertHandler.getUnit(input));

      if (!initNum && !initUnit) {
        return res.status(200).json({error: 'invalid number and unit'});
      }

      if (!initNum) {
        return res.status(200).json({error: 'invalid number'});
      }

      if (!initUnit) {
        return res.status(200).json({error: 'invalid unit'});
      }
      
          

      const returnNum = convertHandler.convert(initNum, initUnit);
      const returnUnit = convertHandler.getReturnUnit(initUnit);
      const toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      console.log('convertHandler.convert(initNum, initUnit): ', convertHandler.convert(initNum, initUnit));
      console.log('convertHandler.getReturnUnit(initUnit): ', convertHandler.getReturnUnit(initUnit));
      
      const result = {
        initNum,
        initUnit,
        returnNum,
        returnUnit,
        string: toString,
      };

      res.json(result);
    });
};
