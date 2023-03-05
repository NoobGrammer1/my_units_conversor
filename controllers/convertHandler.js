function ConvertHandler() {

  this.getNum = function (input) {
    const regex = /^((\d+(\.\d+)?\/\d+(\.\d+)?|\d*\.\d+|\d+)?)([a-zA-Z]+)?$/;
    const result = input.match(regex);
    
    if (result) {
      let num = result[1];

      // check for fraction and convert to decimal
      if (num.includes("/")) {
        let frac = num.split("/");
        if (frac.length > 2) {
          return null;
        }
        num = parseFloat(frac[0]) / parseFloat(frac[1]);
        
        
      } else {
        num = parseFloat(num);
      }
      num = Number(num.toFixed(5));
      return num || 1;
    } else {
      return null;
    }
  };

  this.getUnit = function(input) {
    const units = {
      gal: ['gal', 'gallons'],
      lbs: ['lbs', 'pounds'],
      km: ['km', 'kilometers'],
      kg: ['kg', 'kilograms'],
      mi: ['mi', 'miles'],
      L: ['L', 'liters']
    };
    const unitMatch = input.match(/[a-zA-Z]+$/);
    console.log(unitMatch);
    if (unitMatch) {
      const unit = unitMatch[0];
      for (let validUnit in units) {
        if (units[validUnit].includes(unit)) {
          return validUnit;
        }
      }
    }
    return null;
  };
  
  
  
  this.getReturnUnit = function (initUnit) {
    let result;

    switch (initUnit) {
      case "gal":
        result = "L";
        break;
      case "L":
        result = "gal";
        break;
      case "mi":
        result = "km";
        break;
      case "km":
        result = "mi";
        break;
      case "lbs":
        result = "kg";
        break;
      case "kg":
        result = "lbs";
        break;
      default:
        result = null;
    }

    return result;
  };

  this.spellOutUnit = function (unit) {
    let result;

    switch (unit) {
      case "gal":
        result = "gallons";
        break;
      case "L":
        result = "liters";
        break;
      case "mi":
        result = "miles";
        break;
      case "km":
        result = "kilometers";
        break;
      case "lbs":
        result = "pounds";
        break;
      case "kg":
        result = "kilograms";
        break;
      default:
        result = null;
    }

    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    const LToGal = 0.264172;
    const kgToLbs = 2.20462;
    const kmToMi = 0.621371;
    let result;

    switch (initUnit) {
      case "gal":
        result = initNum * galToL;
        break;
      case "L":
        result = initNum * LToGal;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum * kmToMi;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum * kgToLbs;
        break;
      default:
        result = null;
    }

    return parseFloat(result.toFixed(5));

  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    const initUnitStr = this.spellOutUnit(initUnit);
    const returnUnitStr = this.spellOutUnit(returnUnit);

    let result = `${initNum} ${initUnitStr} converts to ${returnNum} ${returnUnitStr}`;

    return result;
  };
}

module.exports = ConvertHandler;