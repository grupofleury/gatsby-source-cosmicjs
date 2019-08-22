'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Node = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _gatsbyNodeHelpers = require('gatsby-node-helpers');

var _gatsbyNodeHelpers2 = _interopRequireDefault(_gatsbyNodeHelpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _createNodeHelpers = (0, _gatsbyNodeHelpers2.default)({
  typePrefix: 'Cosmicjs'
}),
    createNodeFactory = _createNodeHelpers.createNodeFactory;

/**
 * Node factory with `type` option based on
 * original `createNodeFactory`.
 *
 * @param {string} type - Node type
 * @param {object} node - Node
 * @constructor
 */


var Node = exports.Node = function Node(type, node) {
  return createNodeFactory(type, function (node) {
    node.id = node._id;
    convertNumberValuesToString(node);
    delete node._id;
    return node;
  })(node);
};

/**
 *
 * # The problem
 * It seems that there is a problem with type mismatch on Cosmic.
 * The issue is that if you put a the number '10' in a textfield, then the response is converted to a `number`, but if you put the number '07', then it gets converted to a `string`.
 *
 * # Workaround
 * This method converts every number to a string, which can remove this type mismatch issue.
 *
 */
var convertNumberValuesToString = function convertNumberValuesToString(obj) {
  if (!obj) {
    return;
  }
  (0, _keys2.default)(obj).map(function (property) {
    if (typeof obj[property] == 'number') {
      obj[property] = String(obj[property]);
    } else if ((0, _typeof3.default)(obj[property]) == 'object') {
      convertNumberValuesToString(obj[property]);
    }
  });
};