'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Star = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _star = require('./star');

var _star2 = _interopRequireDefault(_star);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.Star = _star2.default;

var Rater = function (_Component) {
  _inherits(Rater, _Component);

  function Rater(props) {
    _classCallCheck(this, Rater);

    var _this = _possibleConstructorReturn(this, (Rater.__proto__ || Object.getPrototypeOf(Rater)).call(this, props));

    _this.state = {
      rating: props.rating,
      lastRating: props.rating,
      isRating: false
    };
    return _this;
  }

  _createClass(Rater, [{
    key: 'callback',
    value: function callback(args) {
      var callback = this.props.onRate;

      callback && callback(args);
    }
  }, {
    key: 'willRate',
    value: function willRate(rating) {
      this.setState({
        rating: rating,
        isRating: true
      });
      this.callback({ rating: rating });
    }
  }, {
    key: 'onRate',
    value: function onRate(rating) {
      this.setState({
        rating: rating,
        lastRating: rating
      });
      this.callback({ rating: rating });
    }
  }, {
    key: 'onCancelRate',
    value: function onCancelRate() {
      var rating = this.state.lastRating;

      this.setState({
        rating: rating,
        isRating: false
      });
      this.callback({ rating: rating });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          total = _props.total,
          interactive = _props.interactive,
          children = _props.children,
          restProps = _objectWithoutProperties(_props, ['total', 'interactive', 'children']);

      var _state = this.state,
          rating = _state.rating,
          isRating = _state.isRating;

      children = Array.prototype.concat(children).filter(Boolean);
      delete restProps.rating;
      delete restProps.onRate;
      var nodes = Array.apply(null, Array(total)).map(function (_, i) {
        var starProps = {
          key: 'star-' + i,
          isActive: !isRating && rating - i >= 1,
          willBeActive: isRating && i < rating,
          isActiveHalf: !isRating && rating - i >= 0.5 && rating - i < 1,
          isDisabled: !interactive,
          onClick: _this2.onRate.bind(_this2, i + 1),
          onMouseEnter: _this2.willRate.bind(_this2, i + 1)
        };
        if (children.length) {
          return _react2.default.cloneElement(children[i % children.length], starProps);
        } else {
          return _react2.default.createElement(_star2.default, starProps);
        }
      });
      if (interactive) {
        return _react2.default.createElement(
          'div',
          _extends({ className: 'react-rater', onMouseLeave: this.onCancelRate.bind(this) }, restProps),
          nodes
        );
      } else {
        return _react2.default.createElement(
          'div',
          _extends({ className: 'react-rater' }, restProps),
          nodes
        );
      }
    }
  }]);

  return Rater;
}(_react.Component);

exports.default = Rater;


Rater.propTypes = {
  total: _react.PropTypes.number,
  rating: _react.PropTypes.number,
  interactive: _react.PropTypes.bool,
  children: _react.PropTypes.any,
  onRate: _react.PropTypes.func
};

Rater.defaultProps = {
  total: 5,
  rating: 0,
  interactive: true
};