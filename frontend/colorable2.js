'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _vue2.default.extend({
    name: 'colorable',
    props: {
        color: String
    },
    data: function data() {
        return {
            defaultColor: null
        };
    },

    computed: {
        computedColor: function computedColor() {
            return this.color || this.defaultColor;
        }
    },
    methods: {
        addBackgroundColorClassChecks: function addBackgroundColorClassChecks(obj, color) {
            var classes = Object.assign({}, obj);
            var selectedColor = color === undefined ? this.computedColor : color;
            if (selectedColor) {
                classes[selectedColor] = true;
            }
            return classes;
        },
        addTextColorClassChecks: function addTextColorClassChecks(obj, color) {
            var classes = Object.assign({}, obj);
            if (color === undefined) color = this.computedColor;
            if (color) {
                var _color$toString$trim$ = color.toString().trim().split(' '),
                    _color$toString$trim$2 = _slicedToArray(_color$toString$trim$, 2),
                    colorName = _color$toString$trim$2[0],
                    colorModifier = _color$toString$trim$2[1];

                classes[colorName + '--text'] = true;
                colorModifier && (classes['text--' + colorModifier] = true);
            }
            return classes;
        }
    }
});
//# sourceMappingURL=colorable.js.map