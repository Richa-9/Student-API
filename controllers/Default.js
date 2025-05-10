'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.studentsGET = function studentsGET(req, res, next) {
  Default.studentsGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.studentsPOST = function studentsPOST(req, res, next, body) {
  Default.studentsPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.studentsRollNumberDELETE = function studentsRollNumberDELETE(req, res, next, rollNumber) {
  Default.studentsRollNumberDELETE(rollNumber)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.studentsRollNumberGET = function studentsRollNumberGET(req, res, next, rollNumber) {
  Default.studentsRollNumberGET(rollNumber)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.studentsRollNumberPUT = function studentsRollNumberPUT(req, res, next, body, rollNumber) {
  Default.studentsRollNumberPUT(body, rollNumber)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

// ✅ New PATCH method controller
module.exports.studentsRollNumberPATCH = function studentsRollNumberPATCH(req, res, next, body, rollNumber) {
  Default.studentsRollNumberPATCH(body, rollNumber)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
