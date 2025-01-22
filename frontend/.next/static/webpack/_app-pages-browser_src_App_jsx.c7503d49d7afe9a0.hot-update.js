/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("_app-pages-browser_src_App_jsx",{

/***/ "(app-pages-browser)/./src/config/api.js":
/*!***************************!*\
  !*** ./src/config/api.js ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



;
    // Wrapped in an IIFE to avoid polluting the global scope
    ;
    (function () {
        var _a, _b;
        // Legacy CSS implementations will `eval` browser code in a Node.js context
        // to extract CSS. For backwards compatibility, we need to check we're in a
        // browser context before continuing.
        if (typeof self !== 'undefined' &&
            // AMP / No-JS mode does not inject these helpers:
            '$RefreshHelpers$' in self) {
            // @ts-ignore __webpack_module__ is global
            var currentExports = module.exports;
            // @ts-ignore __webpack_module__ is global
            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;
            // This cannot happen in MainTemplate because the exports mismatch between
            // templating and execution.
            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
            // A module can be accepted automatically based on its exports, e.g. when
            // it is a Refresh Boundary.
            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
                // Save the previous exports signature on update so we can compare the boundary
                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)
                module.hot.dispose(function (data) {
                    data.prevSignature =
                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);
                });
                // Unconditionally accept an update to this module, we'll check if it's
                // still a Refresh Boundary later.
                // @ts-ignore importMeta is replaced in the loader
                module.hot.accept();
                // This field is set when the previous version of this module was a
                // Refresh Boundary, letting us know we need to check for invalidation or
                // enqueue an update.
                if (prevSignature !== null) {
                    // A boundary can become ineligible if its exports are incompatible
                    // with the previous exports.
                    //
                    // For example, if you add/remove/change exports, we'll want to
                    // re-execute the importing modules, and force those components to
                    // re-render. Similarly, if you convert a class component to a
                    // function, we want to invalidate the boundary.
                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {
                        module.hot.invalidate();
                    }
                    else {
                        self.$RefreshHelpers$.scheduleUpdate();
                    }
                }
            }
            else {
                // Since we just executed the code for the module, it's possible that the
                // new exports made it ineligible for being a boundary.
                // We only care about the case when we were _previously_ a boundary,
                // because we already accepted this update (accidental side effect).
                var isNoLongerABoundary = prevSignature !== null;
                if (isNoLongerABoundary) {
                    module.hot.invalidate();
                }
            }
        }
    })();


/***/ }),

/***/ "(app-pages-browser)/./src/hooks/useAuth.js":
/*!******************************!*\
  !*** ./src/hooks/useAuth.js ***!
  \******************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   useAuth: () => (/* binding */ useAuth)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _config_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config/api */ \"(app-pages-browser)/./src/config/api.js\");\n/* harmony import */ var _config_api__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_config_api__WEBPACK_IMPORTED_MODULE_1__);\n// src/hooks/useAuth.js\n/* __next_internal_client_entry_do_not_use__ useAuth auto */ var _s = $RefreshSig$();\n\n\nconst useAuth = ()=>{\n    _s();\n    const [isAuthenticated, setIsAuthenticated] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);\n    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)({\n        \"useAuth.useEffect\": ()=>{\n            const checkAuth = {\n                \"useAuth.useEffect.checkAuth\": async ()=>{\n                    try {\n                        // Verificar si hay un token en localStorage\n                        const token =  true ? localStorage.getItem('token') : 0;\n                        // Si no hay token, no intentar verificar\n                        if (!token) {\n                            setLoading(false);\n                            return;\n                        }\n                        // Intentar verificar el token\n                        const userData = await _config_api__WEBPACK_IMPORTED_MODULE_1__.authService.verifyAuth();\n                        setUser(userData);\n                        setIsAuthenticated(true);\n                    } catch (error) {\n                        console.error('Error de autenticación:', error);\n                        // Limpiar token si la verificación falla\n                        if (true) {\n                            localStorage.removeItem('token');\n                        }\n                        setIsAuthenticated(false);\n                        setError(error.message || 'Error de autenticación');\n                    } finally{\n                        setLoading(false);\n                    }\n                }\n            }[\"useAuth.useEffect.checkAuth\"];\n            checkAuth();\n        }\n    }[\"useAuth.useEffect\"], []);\n    const login = async (credentials)=>{\n        try {\n            setLoading(true);\n            const data = await _config_api__WEBPACK_IMPORTED_MODULE_1__.authService.login(credentials);\n            setUser(data.user);\n            setIsAuthenticated(true);\n            setError(null);\n            return true;\n        } catch (error) {\n            console.error('Error de inicio de sesión:', error);\n            setError(error.message || 'Error al iniciar sesión');\n            setIsAuthenticated(false);\n            return false;\n        } finally{\n            setLoading(false);\n        }\n    };\n    const logout = ()=>{\n        _config_api__WEBPACK_IMPORTED_MODULE_1__.authService.logout();\n        setUser(null);\n        setIsAuthenticated(false);\n    };\n    return {\n        isAuthenticated,\n        user,\n        loading,\n        error,\n        login,\n        logout\n    };\n};\n_s(useAuth, \"vaOJqRNqhe8+3y/pDoWbnx+olHE=\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9ob29rcy91c2VBdXRoLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsdUJBQXVCOztBQUdxQjtBQUNBO0FBR3JDLE1BQU1HLFVBQVU7O0lBQ3JCLE1BQU0sQ0FBQ0MsaUJBQWlCQyxtQkFBbUIsR0FBR0wsK0NBQVFBLENBQUM7SUFDdkQsTUFBTSxDQUFDTSxNQUFNQyxRQUFRLEdBQUdQLCtDQUFRQSxDQUFDO0lBQ2pDLE1BQU0sQ0FBQ1EsU0FBU0MsV0FBVyxHQUFHVCwrQ0FBUUEsQ0FBQztJQUN2QyxNQUFNLENBQUNVLE9BQU9DLFNBQVMsR0FBR1gsK0NBQVFBLENBQUM7SUFFbkNDLGdEQUFTQTs2QkFBQztZQUNSLE1BQU1XOytDQUFZO29CQUNoQixJQUFJO3dCQUNGLDRDQUE0Qzt3QkFDNUMsTUFBTUMsUUFBUSxLQUE2QixHQUFHQyxhQUFhQyxPQUFPLENBQUMsV0FBVyxDQUFJO3dCQUVsRix5Q0FBeUM7d0JBQ3pDLElBQUksQ0FBQ0YsT0FBTzs0QkFDVkosV0FBVzs0QkFDWDt3QkFDRjt3QkFFQSw4QkFBOEI7d0JBQzlCLE1BQU1PLFdBQVcsTUFBTWQsb0RBQVdBLENBQUNlLFVBQVU7d0JBQzdDVixRQUFRUzt3QkFDUlgsbUJBQW1CO29CQUNyQixFQUFFLE9BQU9LLE9BQU87d0JBQ2RRLFFBQVFSLEtBQUssQ0FBQywyQkFBMkJBO3dCQUV6Qyx5Q0FBeUM7d0JBQ3pDLElBQUksSUFBNkIsRUFBRTs0QkFDakNJLGFBQWFLLFVBQVUsQ0FBQzt3QkFDMUI7d0JBRUFkLG1CQUFtQjt3QkFDbkJNLFNBQVNELE1BQU1VLE9BQU8sSUFBSTtvQkFDNUIsU0FBVTt3QkFDUlgsV0FBVztvQkFDYjtnQkFDRjs7WUFFQUc7UUFDRjs0QkFBRyxFQUFFO0lBRUwsTUFBTVMsUUFBUSxPQUFPQztRQUNuQixJQUFJO1lBQ0ZiLFdBQVc7WUFDWCxNQUFNYyxPQUFPLE1BQU1yQixvREFBV0EsQ0FBQ21CLEtBQUssQ0FBQ0M7WUFDckNmLFFBQVFnQixLQUFLakIsSUFBSTtZQUNqQkQsbUJBQW1CO1lBQ25CTSxTQUFTO1lBQ1QsT0FBTztRQUNULEVBQUUsT0FBT0QsT0FBTztZQUNkUSxRQUFRUixLQUFLLENBQUMsOEJBQThCQTtZQUU1Q0MsU0FBU0QsTUFBTVUsT0FBTyxJQUFJO1lBQzFCZixtQkFBbUI7WUFDbkIsT0FBTztRQUNULFNBQVU7WUFDUkksV0FBVztRQUNiO0lBQ0Y7SUFHQSxNQUFNZSxTQUFTO1FBQ2J0QixvREFBV0EsQ0FBQ3NCLE1BQU07UUFDbEJqQixRQUFRO1FBQ1JGLG1CQUFtQjtJQUNyQjtJQUVBLE9BQU87UUFDTEQ7UUFDQUU7UUFDQUU7UUFDQUU7UUFDQVc7UUFDQUc7SUFDRjtBQUNGLEVBQUU7R0ExRVdyQiIsInNvdXJjZXMiOlsiL1VzZXJzL2RpYW5hL0Rlc2t0b3AvRmluTmVzdC9mcm9udGVuZC9zcmMvaG9va3MvdXNlQXV0aC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBzcmMvaG9va3MvdXNlQXV0aC5qc1xuXCJ1c2UgY2xpZW50XCI7XG5cbmltcG9ydCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBhdXRoU2VydmljZSB9IGZyb20gJy4uL2NvbmZpZy9hcGknO1xuXG5cbmV4cG9ydCBjb25zdCB1c2VBdXRoID0gKCkgPT4ge1xuICBjb25zdCBbaXNBdXRoZW50aWNhdGVkLCBzZXRJc0F1dGhlbnRpY2F0ZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbdXNlciwgc2V0VXNlcl0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XG4gIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGUobnVsbCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBjaGVja0F1dGggPSBhc3luYyAoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBWZXJpZmljYXIgc2kgaGF5IHVuIHRva2VuIGVuIGxvY2FsU3RvcmFnZVxuICAgICAgICBjb25zdCB0b2tlbiA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJykgOiBudWxsO1xuICAgICAgICBcbiAgICAgICAgLy8gU2kgbm8gaGF5IHRva2VuLCBubyBpbnRlbnRhciB2ZXJpZmljYXJcbiAgICAgICAgaWYgKCF0b2tlbikge1xuICAgICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEludGVudGFyIHZlcmlmaWNhciBlbCB0b2tlblxuICAgICAgICBjb25zdCB1c2VyRGF0YSA9IGF3YWl0IGF1dGhTZXJ2aWNlLnZlcmlmeUF1dGgoKTtcbiAgICAgICAgc2V0VXNlcih1c2VyRGF0YSk7XG4gICAgICAgIHNldElzQXV0aGVudGljYXRlZCh0cnVlKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGRlIGF1dGVudGljYWNpw7NuOicsIGVycm9yKTtcbiAgICAgICAgXG4gICAgICAgIC8vIExpbXBpYXIgdG9rZW4gc2kgbGEgdmVyaWZpY2FjacOzbiBmYWxsYVxuICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgndG9rZW4nKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgc2V0SXNBdXRoZW50aWNhdGVkKGZhbHNlKTtcbiAgICAgICAgc2V0RXJyb3IoZXJyb3IubWVzc2FnZSB8fCAnRXJyb3IgZGUgYXV0ZW50aWNhY2nDs24nKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjaGVja0F1dGgoKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGxvZ2luID0gYXN5bmMgKGNyZWRlbnRpYWxzKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIHNldExvYWRpbmcodHJ1ZSk7XG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgYXV0aFNlcnZpY2UubG9naW4oY3JlZGVudGlhbHMpO1xuICAgICAgc2V0VXNlcihkYXRhLnVzZXIpO1xuICAgICAgc2V0SXNBdXRoZW50aWNhdGVkKHRydWUpO1xuICAgICAgc2V0RXJyb3IobnVsbCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZGUgaW5pY2lvIGRlIHNlc2nDs246JywgZXJyb3IpO1xuICAgICAgXG4gICAgICBzZXRFcnJvcihlcnJvci5tZXNzYWdlIHx8ICdFcnJvciBhbCBpbmljaWFyIHNlc2nDs24nKTtcbiAgICAgIHNldElzQXV0aGVudGljYXRlZChmYWxzZSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgIH1cbiAgfTtcbiAgXG5cbiAgY29uc3QgbG9nb3V0ID0gKCkgPT4ge1xuICAgIGF1dGhTZXJ2aWNlLmxvZ291dCgpO1xuICAgIHNldFVzZXIobnVsbCk7XG4gICAgc2V0SXNBdXRoZW50aWNhdGVkKGZhbHNlKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGlzQXV0aGVudGljYXRlZCxcbiAgICB1c2VyLFxuICAgIGxvYWRpbmcsXG4gICAgZXJyb3IsXG4gICAgbG9naW4sXG4gICAgbG9nb3V0XG4gIH07XG59OyJdLCJuYW1lcyI6WyJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsImF1dGhTZXJ2aWNlIiwidXNlQXV0aCIsImlzQXV0aGVudGljYXRlZCIsInNldElzQXV0aGVudGljYXRlZCIsInVzZXIiLCJzZXRVc2VyIiwibG9hZGluZyIsInNldExvYWRpbmciLCJlcnJvciIsInNldEVycm9yIiwiY2hlY2tBdXRoIiwidG9rZW4iLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwidXNlckRhdGEiLCJ2ZXJpZnlBdXRoIiwiY29uc29sZSIsInJlbW92ZUl0ZW0iLCJtZXNzYWdlIiwibG9naW4iLCJjcmVkZW50aWFscyIsImRhdGEiLCJsb2dvdXQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/hooks/useAuth.js\n"));

/***/ })

});