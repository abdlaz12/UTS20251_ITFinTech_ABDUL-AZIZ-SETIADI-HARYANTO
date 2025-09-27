/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "(pages-dir-node)/./context/CartContext.js":
/*!********************************!*\
  !*** ./context/CartContext.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CartProvider: () => (/* binding */ CartProvider),\n/* harmony export */   useCart: () => (/* binding */ useCart)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst CartContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)();\nfunction useCart() {\n    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(CartContext);\n}\nfunction CartProvider({ children }) {\n    const [cartItems, setCartItems] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const addToCart = (product)=>{\n        setCartItems((prevItems)=>{\n            const exist = prevItems.find((item)=>item._id === product._id);\n            if (exist) {\n                return prevItems.map((item)=>item._id === product._id ? {\n                        ...item,\n                        qty: item.qty + 1\n                    } : item);\n            } else {\n                return [\n                    ...prevItems,\n                    {\n                        ...product,\n                        qty: 1\n                    }\n                ];\n            }\n        });\n    };\n    // <-- TAMBAHKAN FUNGSI INI\n    const clearCart = ()=>{\n        setCartItems([]);\n    };\n    // <-- TAMBAHKAN clearCart KE DALAM VALUE\n    const value = {\n        cartItems,\n        addToCart,\n        clearCart\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(CartContext.Provider, {\n        value: value,\n        children: children\n    }, void 0, false, {\n        fileName: \"C:\\\\Desktop\\\\Coding\\\\Semester_5\\\\Back Up\\\\frontend\\\\context\\\\CartContext.js\",\n        lineNumber: 33,\n        columnNumber: 10\n    }, this);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL2NvbnRleHQvQ2FydENvbnRleHQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUE0RDtBQUU1RCxNQUFNRyw0QkFBY0gsb0RBQWFBO0FBRTFCLFNBQVNJO0lBQ2QsT0FBT0YsaURBQVVBLENBQUNDO0FBQ3BCO0FBRU8sU0FBU0UsYUFBYSxFQUFFQyxRQUFRLEVBQUU7SUFDdkMsTUFBTSxDQUFDQyxXQUFXQyxhQUFhLEdBQUdQLCtDQUFRQSxDQUFDLEVBQUU7SUFFN0MsTUFBTVEsWUFBWSxDQUFDQztRQUNqQkYsYUFBYUcsQ0FBQUE7WUFDWCxNQUFNQyxRQUFRRCxVQUFVRSxJQUFJLENBQUNDLENBQUFBLE9BQVFBLEtBQUtDLEdBQUcsS0FBS0wsUUFBUUssR0FBRztZQUM3RCxJQUFJSCxPQUFPO2dCQUNULE9BQU9ELFVBQVVLLEdBQUcsQ0FBQ0YsQ0FBQUEsT0FDbkJBLEtBQUtDLEdBQUcsS0FBS0wsUUFBUUssR0FBRyxHQUFHO3dCQUFFLEdBQUdELElBQUk7d0JBQUVHLEtBQUtILEtBQUtHLEdBQUcsR0FBRztvQkFBRSxJQUFJSDtZQUVoRSxPQUFPO2dCQUNMLE9BQU87dUJBQUlIO29CQUFXO3dCQUFFLEdBQUdELE9BQU87d0JBQUVPLEtBQUs7b0JBQUU7aUJBQUU7WUFDL0M7UUFDRjtJQUNGO0lBRUEsMkJBQTJCO0lBQzNCLE1BQU1DLFlBQVk7UUFDaEJWLGFBQWEsRUFBRTtJQUNqQjtJQUVBLHlDQUF5QztJQUN6QyxNQUFNVyxRQUFRO1FBQUVaO1FBQVdFO1FBQVdTO0lBQVU7SUFFaEQscUJBQU8sOERBQUNmLFlBQVlpQixRQUFRO1FBQUNELE9BQU9BO2tCQUFRYjs7Ozs7O0FBQzlDIiwic291cmNlcyI6WyJDOlxcRGVza3RvcFxcQ29kaW5nXFxTZW1lc3Rlcl81XFxCYWNrIFVwXFxmcm9udGVuZFxcY29udGV4dFxcQ2FydENvbnRleHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlQ29udGV4dCwgdXNlU3RhdGUsIHVzZUNvbnRleHQgfSBmcm9tICdyZWFjdCc7XHJcblxyXG5jb25zdCBDYXJ0Q29udGV4dCA9IGNyZWF0ZUNvbnRleHQoKTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB1c2VDYXJ0KCkge1xyXG4gIHJldHVybiB1c2VDb250ZXh0KENhcnRDb250ZXh0KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIENhcnRQcm92aWRlcih7IGNoaWxkcmVuIH0pIHtcclxuICBjb25zdCBbY2FydEl0ZW1zLCBzZXRDYXJ0SXRlbXNdID0gdXNlU3RhdGUoW10pO1xyXG5cclxuICBjb25zdCBhZGRUb0NhcnQgPSAocHJvZHVjdCkgPT4ge1xyXG4gICAgc2V0Q2FydEl0ZW1zKHByZXZJdGVtcyA9PiB7XHJcbiAgICAgIGNvbnN0IGV4aXN0ID0gcHJldkl0ZW1zLmZpbmQoaXRlbSA9PiBpdGVtLl9pZCA9PT0gcHJvZHVjdC5faWQpO1xyXG4gICAgICBpZiAoZXhpc3QpIHtcclxuICAgICAgICByZXR1cm4gcHJldkl0ZW1zLm1hcChpdGVtID0+XHJcbiAgICAgICAgICBpdGVtLl9pZCA9PT0gcHJvZHVjdC5faWQgPyB7IC4uLml0ZW0sIHF0eTogaXRlbS5xdHkgKyAxIH0gOiBpdGVtXHJcbiAgICAgICAgKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gWy4uLnByZXZJdGVtcywgeyAuLi5wcm9kdWN0LCBxdHk6IDEgfV07XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIC8vIDwtLSBUQU1CQUhLQU4gRlVOR1NJIElOSVxyXG4gIGNvbnN0IGNsZWFyQ2FydCA9ICgpID0+IHtcclxuICAgIHNldENhcnRJdGVtcyhbXSk7XHJcbiAgfTtcclxuXHJcbiAgLy8gPC0tIFRBTUJBSEtBTiBjbGVhckNhcnQgS0UgREFMQU0gVkFMVUVcclxuICBjb25zdCB2YWx1ZSA9IHsgY2FydEl0ZW1zLCBhZGRUb0NhcnQsIGNsZWFyQ2FydCB9O1xyXG5cclxuICByZXR1cm4gPENhcnRDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXt2YWx1ZX0+e2NoaWxkcmVufTwvQ2FydENvbnRleHQuUHJvdmlkZXI+O1xyXG59Il0sIm5hbWVzIjpbImNyZWF0ZUNvbnRleHQiLCJ1c2VTdGF0ZSIsInVzZUNvbnRleHQiLCJDYXJ0Q29udGV4dCIsInVzZUNhcnQiLCJDYXJ0UHJvdmlkZXIiLCJjaGlsZHJlbiIsImNhcnRJdGVtcyIsInNldENhcnRJdGVtcyIsImFkZFRvQ2FydCIsInByb2R1Y3QiLCJwcmV2SXRlbXMiLCJleGlzdCIsImZpbmQiLCJpdGVtIiwiX2lkIiwibWFwIiwicXR5IiwiY2xlYXJDYXJ0IiwidmFsdWUiLCJQcm92aWRlciJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(pages-dir-node)/./context/CartContext.js\n");

/***/ }),

/***/ "(pages-dir-node)/./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _context_CartContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../context/CartContext */ \"(pages-dir-node)/./context/CartContext.js\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/globals.css */ \"(pages-dir-node)/./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_2__);\n// pages/_app.js\n\n\n // Sesuaikan path jika berbeda\nfunction MyApp({ Component, pageProps }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_context_CartContext__WEBPACK_IMPORTED_MODULE_1__.CartProvider, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n            ...pageProps\n        }, void 0, false, {\n            fileName: \"C:\\\\Desktop\\\\Coding\\\\Semester_5\\\\Back Up\\\\frontend\\\\pages\\\\_app.js\",\n            lineNumber: 8,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"C:\\\\Desktop\\\\Coding\\\\Semester_5\\\\Back Up\\\\frontend\\\\pages\\\\_app.js\",\n        lineNumber: 7,\n        columnNumber: 5\n    }, this);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3BhZ2VzL19hcHAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsZ0JBQWdCOztBQUNzQztBQUN2QixDQUFDLDhCQUE4QjtBQUU5RCxTQUFTQyxNQUFNLEVBQUVDLFNBQVMsRUFBRUMsU0FBUyxFQUFFO0lBQ3JDLHFCQUNFLDhEQUFDSCw4REFBWUE7a0JBQ1gsNEVBQUNFO1lBQVcsR0FBR0MsU0FBUzs7Ozs7Ozs7Ozs7QUFHOUI7QUFFQSxpRUFBZUYsS0FBS0EsRUFBQyIsInNvdXJjZXMiOlsiQzpcXERlc2t0b3BcXENvZGluZ1xcU2VtZXN0ZXJfNVxcQmFjayBVcFxcZnJvbnRlbmRcXHBhZ2VzXFxfYXBwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIHBhZ2VzL19hcHAuanNcclxuaW1wb3J0IHsgQ2FydFByb3ZpZGVyIH0gZnJvbSAnLi4vY29udGV4dC9DYXJ0Q29udGV4dCc7XHJcbmltcG9ydCAnLi4vc3R5bGVzL2dsb2JhbHMuY3NzJzsgLy8gU2VzdWFpa2FuIHBhdGggamlrYSBiZXJiZWRhXHJcblxyXG5mdW5jdGlvbiBNeUFwcCh7IENvbXBvbmVudCwgcGFnZVByb3BzIH0pIHtcclxuICByZXR1cm4gKFxyXG4gICAgPENhcnRQcm92aWRlcj5cclxuICAgICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPlxyXG4gICAgPC9DYXJ0UHJvdmlkZXI+XHJcbiAgKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTXlBcHA7Il0sIm5hbWVzIjpbIkNhcnRQcm92aWRlciIsIk15QXBwIiwiQ29tcG9uZW50IiwicGFnZVByb3BzIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(pages-dir-node)/./pages/_app.js\n");

/***/ }),

/***/ "(pages-dir-node)/./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(pages-dir-node)/./pages/_app.js"));
module.exports = __webpack_exports__;

})();