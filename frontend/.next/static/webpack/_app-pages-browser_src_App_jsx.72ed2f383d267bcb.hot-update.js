"use strict";
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
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   analysisService: () => (/* binding */ analysisService),\n/* harmony export */   authService: () => (/* binding */ authService),\n/* harmony export */   budgetService: () => (/* binding */ budgetService),\n/* harmony export */   categoryService: () => (/* binding */ categoryService),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   expenseService: () => (/* binding */ expenseService)\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"(app-pages-browser)/./node_modules/axios/lib/axios.js\");\n// src/services/api.js\n\nconst BASE_URL = \"http://localhost:3001/api\" || 0;\nconst axiosInstance = axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].create({\n    baseURL: BASE_URL\n});\n// Interceptor para agregar token a cada solicitud\naxiosInstance.interceptors.request.use((config)=>{\n    const token = localStorage.getItem('token');\n    if (token) {\n        config.headers.Authorization = \"Bearer \".concat(token);\n    }\n    return config;\n}, (error)=>{\n    return Promise.reject(error);\n});\n// Servicios de autenticación\nconst authService = {\n    verifyAuth: async ()=>{\n        try {\n            const response = await axiosInstance.get('/auth/verify');\n            return response.data;\n        } catch (error) {\n            // Asegúrate de manejar diferentes tipos de errores\n            if (error.response) {\n                // El servidor respondió con un error de estado\n                throw new Error(error.response.data.error || 'Error de autenticación');\n            } else if (error.request) {\n                // La solicitud se hizo pero no se recibió respuesta\n                throw new Error('No se pudo conectar al servidor');\n            } else {\n                // Algo sucedió al configurar la solicitud\n                throw new Error('Error al verificar autenticación');\n            }\n        }\n    },\n    login: async (credentials)=>{\n        try {\n            const response = await axiosInstance.post('/auth/login', credentials);\n            if (response.data.token) {\n                localStorage.setItem('token', response.data.token);\n            }\n            return response.data;\n        } catch (error) {\n            var _error_response;\n            throw ((_error_response = error.response) === null || _error_response === void 0 ? void 0 : _error_response.data) || new Error('Error al iniciar sesión');\n        }\n    },\n    logout: ()=>{\n        localStorage.removeItem('token');\n        window.location.href = '/login';\n    }\n};\n// Servicios de gastos\nconst expenseService = {\n    getAll: ()=>axiosInstance.get('/expenses'),\n    create: (expense)=>axiosInstance.post('/expenses', expense),\n    getMonthlySummary: ()=>axiosInstance.get('/expenses/monthly-summary'),\n    update: (id, expense)=>axiosInstance.put(\"/expenses/\".concat(id), expense),\n    delete: (id)=>axiosInstance.delete(\"/expenses/\".concat(id))\n};\n// Servicios de categorías\nconst categoryService = {\n    getAll: ()=>axiosInstance.get('/categories'),\n    create: (category)=>axiosInstance.post('/categories', category),\n    getStats: (id)=>axiosInstance.get(\"/categories/\".concat(id, \"/stats\")),\n    checkLimits: ()=>axiosInstance.get('/categories/limits/check')\n};\n// Servicios de presupuesto\nconst budgetService = {\n    getCurrent: ()=>axiosInstance.get('/budget/current'),\n    createOrUpdate: (budget)=>axiosInstance.post('/budget', budget),\n    getHistory: ()=>axiosInstance.get('/budget/history'),\n    getAlerts: ()=>axiosInstance.get('/budget/alerts'),\n    updateThreshold: (threshold)=>axiosInstance.put('/budget/threshold', {\n            threshold\n        })\n};\n// Servicios de análisis\nconst analysisService = {\n    getCurrent: ()=>axiosInstance.get('/analysis/current'),\n    getTrends: ()=>axiosInstance.get('/analysis/trends'),\n    getRecommendations: ()=>axiosInstance.get('/analysis/recommendations'),\n    getHistory: ()=>axiosInstance.get('/analysis/history'),\n    exportReport: ()=>axiosInstance.get('/analysis/export'),\n    getBudgetAnalysis: ()=>axiosInstance.get('/analysis/budget-analysis'),\n    getAlerts: ()=>axiosInstance.get('/analysis/alerts')\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (axiosInstance);\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQyxTQUFXN0MsY0FBY3VCLElBQUksQ0FBQyxXQUFXc0I7SUFDMURDLFlBQVksSUFBTTlDLGNBQWNrQixHQUFHLENBQUM7SUFDcEM2QixXQUFXLElBQU0vQyxjQUFja0IsR0FBRyxDQUFDO0lBQ25DOEIsaUJBQWlCLENBQUNDLFlBQ2hCakQsY0FBY29DLEdBQUcsQ0FBQyxxQkFBcUI7WUFBRWE7UUFBVTtBQUN2RCxFQUFFO0FBRUYsd0JBQXdCO0FBQ2pCLE1BQU1DLGtCQUFrQjtJQUM3QlAsWUFBWSxJQUFNM0MsY0FBY2tCLEdBQUcsQ0FBQztJQUNwQ2lDLFdBQVcsSUFBTW5ELGNBQWNrQixHQUFHLENBQUM7SUFDbkNrQyxvQkFBb0IsSUFBTXBELGNBQWNrQixHQUFHLENBQUM7SUFDNUM0QixZQUFZLElBQU05QyxjQUFja0IsR0FBRyxDQUFDO0lBQ3BDbUMsY0FBYyxJQUFNckQsY0FBY2tCLEdBQUcsQ0FBQztJQUN0Q29DLG1CQUFtQixJQUFNdEQsY0FBY2tCLEdBQUcsQ0FBQztJQUMzQzZCLFdBQVcsSUFBTS9DLGNBQWNrQixHQUFHLENBQUM7QUFDckMsRUFBRTtBQUVGLGlFQUFlbEIsYUFBYUEsRUFBQyIsInNvdXJjZXMiOlsiL1VzZXJzL2RpYW5hL0Rlc2t0b3AvRmluTmVzdC9mcm9udGVuZC9zcmMvY29uZmlnL2FwaS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBzcmMvc2VydmljZXMvYXBpLmpzXG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuXG5jb25zdCBCQVNFX1VSTCA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0FQSV9VUkwgfHwgJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMS9hcGknO1xuXG5jb25zdCBheGlvc0luc3RhbmNlID0gYXhpb3MuY3JlYXRlKHtcbiAgYmFzZVVSTDogQkFTRV9VUkwsXG59KTtcblxuLy8gSW50ZXJjZXB0b3IgcGFyYSBhZ3JlZ2FyIHRva2VuIGEgY2FkYSBzb2xpY2l0dWRcbmF4aW9zSW5zdGFuY2UuaW50ZXJjZXB0b3JzLnJlcXVlc3QudXNlKChjb25maWcpID0+IHtcbiAgY29uc3QgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKTtcbiAgaWYgKHRva2VuKSB7XG4gICAgY29uZmlnLmhlYWRlcnMuQXV0aG9yaXphdGlvbiA9IGBCZWFyZXIgJHt0b2tlbn1gO1xuICB9XG4gIHJldHVybiBjb25maWc7XG59LCAoZXJyb3IpID0+IHtcbiAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbn0pO1xuXG4vLyBTZXJ2aWNpb3MgZGUgYXV0ZW50aWNhY2nDs25cbmV4cG9ydCBjb25zdCBhdXRoU2VydmljZSA9IHtcbiAgICB2ZXJpZnlBdXRoOiBhc3luYyAoKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvc0luc3RhbmNlLmdldCgnL2F1dGgvdmVyaWZ5Jyk7XG4gICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgLy8gQXNlZ8O6cmF0ZSBkZSBtYW5lamFyIGRpZmVyZW50ZXMgdGlwb3MgZGUgZXJyb3Jlc1xuICAgICAgICAgIGlmIChlcnJvci5yZXNwb25zZSkge1xuICAgICAgICAgICAgLy8gRWwgc2Vydmlkb3IgcmVzcG9uZGnDsyBjb24gdW4gZXJyb3IgZGUgZXN0YWRvXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IucmVzcG9uc2UuZGF0YS5lcnJvciB8fCAnRXJyb3IgZGUgYXV0ZW50aWNhY2nDs24nKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGVycm9yLnJlcXVlc3QpIHtcbiAgICAgICAgICAgIC8vIExhIHNvbGljaXR1ZCBzZSBoaXpvIHBlcm8gbm8gc2UgcmVjaWJpw7MgcmVzcHVlc3RhXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIHNlIHB1ZG8gY29uZWN0YXIgYWwgc2Vydmlkb3InKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gQWxnbyBzdWNlZGnDsyBhbCBjb25maWd1cmFyIGxhIHNvbGljaXR1ZFxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFcnJvciBhbCB2ZXJpZmljYXIgYXV0ZW50aWNhY2nDs24nKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgbG9naW46IGFzeW5jIChjcmVkZW50aWFscykgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGF4aW9zSW5zdGFuY2UucG9zdCgnL2F1dGgvbG9naW4nLCBjcmVkZW50aWFscyk7XG4gICAgICBcbiAgICAgIGlmIChyZXNwb25zZS5kYXRhLnRva2VuKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2tlbicsIHJlc3BvbnNlLmRhdGEudG9rZW4pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhyb3cgZXJyb3IucmVzcG9uc2U/LmRhdGEgfHwgbmV3IEVycm9yKCdFcnJvciBhbCBpbmljaWFyIHNlc2nDs24nKTtcbiAgICB9XG4gIH0sXG5cbiAgbG9nb3V0OiAoKSA9PiB7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3Rva2VuJyk7XG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL2xvZ2luJztcbiAgfVxufTtcblxuLy8gU2VydmljaW9zIGRlIGdhc3Rvc1xuZXhwb3J0IGNvbnN0IGV4cGVuc2VTZXJ2aWNlID0ge1xuICBnZXRBbGw6ICgpID0+IGF4aW9zSW5zdGFuY2UuZ2V0KCcvZXhwZW5zZXMnKSxcbiAgY3JlYXRlOiAoZXhwZW5zZSkgPT4gYXhpb3NJbnN0YW5jZS5wb3N0KCcvZXhwZW5zZXMnLCBleHBlbnNlKSxcbiAgZ2V0TW9udGhseVN1bW1hcnk6ICgpID0+IGF4aW9zSW5zdGFuY2UuZ2V0KCcvZXhwZW5zZXMvbW9udGhseS1zdW1tYXJ5JyksXG4gIHVwZGF0ZTogKGlkLCBleHBlbnNlKSA9PiBheGlvc0luc3RhbmNlLnB1dChgL2V4cGVuc2VzLyR7aWR9YCwgZXhwZW5zZSksXG4gIGRlbGV0ZTogKGlkKSA9PiBheGlvc0luc3RhbmNlLmRlbGV0ZShgL2V4cGVuc2VzLyR7aWR9YCksXG59O1xuXG4vLyBTZXJ2aWNpb3MgZGUgY2F0ZWdvcsOtYXNcbmV4cG9ydCBjb25zdCBjYXRlZ29yeVNlcnZpY2UgPSB7XG4gIGdldEFsbDogKCkgPT4gYXhpb3NJbnN0YW5jZS5nZXQoJy9jYXRlZ29yaWVzJyksXG4gIGNyZWF0ZTogKGNhdGVnb3J5KSA9PiBheGlvc0luc3RhbmNlLnBvc3QoJy9jYXRlZ29yaWVzJywgY2F0ZWdvcnkpLFxuICBnZXRTdGF0czogKGlkKSA9PiBheGlvc0luc3RhbmNlLmdldChgL2NhdGVnb3JpZXMvJHtpZH0vc3RhdHNgKSxcbiAgY2hlY2tMaW1pdHM6ICgpID0+IGF4aW9zSW5zdGFuY2UuZ2V0KCcvY2F0ZWdvcmllcy9saW1pdHMvY2hlY2snKSxcbn07XG5cbi8vIFNlcnZpY2lvcyBkZSBwcmVzdXB1ZXN0b1xuZXhwb3J0IGNvbnN0IGJ1ZGdldFNlcnZpY2UgPSB7XG4gIGdldEN1cnJlbnQ6ICgpID0+IGF4aW9zSW5zdGFuY2UuZ2V0KCcvYnVkZ2V0L2N1cnJlbnQnKSxcbiAgY3JlYXRlT3JVcGRhdGU6IChidWRnZXQpID0+IGF4aW9zSW5zdGFuY2UucG9zdCgnL2J1ZGdldCcsIGJ1ZGdldCksXG4gIGdldEhpc3Rvcnk6ICgpID0+IGF4aW9zSW5zdGFuY2UuZ2V0KCcvYnVkZ2V0L2hpc3RvcnknKSxcbiAgZ2V0QWxlcnRzOiAoKSA9PiBheGlvc0luc3RhbmNlLmdldCgnL2J1ZGdldC9hbGVydHMnKSxcbiAgdXBkYXRlVGhyZXNob2xkOiAodGhyZXNob2xkKSA9PiBcbiAgICBheGlvc0luc3RhbmNlLnB1dCgnL2J1ZGdldC90aHJlc2hvbGQnLCB7IHRocmVzaG9sZCB9KSxcbn07XG5cbi8vIFNlcnZpY2lvcyBkZSBhbsOhbGlzaXNcbmV4cG9ydCBjb25zdCBhbmFseXNpc1NlcnZpY2UgPSB7XG4gIGdldEN1cnJlbnQ6ICgpID0+IGF4aW9zSW5zdGFuY2UuZ2V0KCcvYW5hbHlzaXMvY3VycmVudCcpLFxuICBnZXRUcmVuZHM6ICgpID0+IGF4aW9zSW5zdGFuY2UuZ2V0KCcvYW5hbHlzaXMvdHJlbmRzJyksXG4gIGdldFJlY29tbWVuZGF0aW9uczogKCkgPT4gYXhpb3NJbnN0YW5jZS5nZXQoJy9hbmFseXNpcy9yZWNvbW1lbmRhdGlvbnMnKSxcbiAgZ2V0SGlzdG9yeTogKCkgPT4gYXhpb3NJbnN0YW5jZS5nZXQoJy9hbmFseXNpcy9oaXN0b3J5JyksXG4gIGV4cG9ydFJlcG9ydDogKCkgPT4gYXhpb3NJbnN0YW5jZS5nZXQoJy9hbmFseXNpcy9leHBvcnQnKSxcbiAgZ2V0QnVkZ2V0QW5hbHlzaXM6ICgpID0+IGF4aW9zSW5zdGFuY2UuZ2V0KCcvYW5hbHlzaXMvYnVkZ2V0LWFuYWx5c2lzJyksXG4gIGdldEFsZXJ0czogKCkgPT4gYXhpb3NJbnN0YW5jZS5nZXQoJy9hbmFseXNpcy9hbGVydHMnKSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGF4aW9zSW5zdGFuY2U7XG4iXSwibmFtZXMiOlsiYXhpb3MiLCJCQVNFX1VSTCIsInByb2Nlc3MiLCJlbnYiLCJORVhUX1BVQkxJQ19BUElfVVJMIiwiYXhpb3NJbnN0YW5jZSIsImNyZWF0ZSIsImJhc2VVUkwiLCJpbnRlcmNlcHRvcnMiLCJyZXF1ZXN0IiwidXNlIiwiY29uZmlnIiwidG9rZW4iLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiaGVhZGVycyIsIkF1dGhvcml6YXRpb24iLCJlcnJvciIsIlByb21pc2UiLCJyZWplY3QiLCJhdXRoU2VydmljZSIsInZlcmlmeUF1dGgiLCJyZXNwb25zZSIsImdldCIsImRhdGEiLCJFcnJvciIsImxvZ2luIiwiY3JlZGVudGlhbHMiLCJwb3N0Iiwic2V0SXRlbSIsImxvZ291dCIsInJlbW92ZUl0ZW0iLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJleHBlbnNlU2VydmljZSIsImdldEFsbCIsImV4cGVuc2UiLCJnZXRNb250aGx5U3VtbWFyeSIsInVwZGF0ZSIsImlkIiwicHV0IiwiZGVsZXRlIiwiY2F0ZWdvcnlTZXJ2aWNlIiwiY2F0ZWdvcnkiLCJnZXRTdGF0cyIsImNoZWNrTGltaXRzIiwiYnVkZ2V0U2VydmljZSIsImdldEN1cnJlbnQiLCJjcmVhdGVPclVwZGF0ZSIsImJ1ZGdldCIsImdldEhpc3RvcnkiLCJnZXRBbGVydHMiLCJ1cGRhdGVUaHJlc2hvbGQiLCJ0aHJlc2hvbGQiLCJhbmFseXNpc1NlcnZpY2UiLCJnZXRUcmVuZHMiLCJnZXRSZWNvbW1lbmRhdGlvbnMiLCJleHBvcnRSZXBvcnQiLCJnZXRCdWRnZXRBbmFseXNpcyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/config/api.js\n"));

/***/ }),

/***/ "(app-pages-browser)/./src/hooks/useAuth.js":
/*!******************************!*\
  !*** ./src/hooks/useAuth.js ***!
  \******************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   useAuth: () => (/* binding */ useAuth)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _config_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config/api */ \"(app-pages-browser)/./src/config/api.js\");\n// src/hooks/useAuth.js\n/* __next_internal_client_entry_do_not_use__ useAuth auto */ var _s = $RefreshSig$();\n\n\nconst useAuth = ()=>{\n    _s();\n    const [isAuthenticated, setIsAuthenticated] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);\n    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)({\n        \"useAuth.useEffect\": ()=>{\n            const checkAuth = {\n                \"useAuth.useEffect.checkAuth\": async ()=>{\n                    try {\n                        // Verificar si hay un token en localStorage\n                        const token =  true ? localStorage.getItem('token') : 0;\n                        // Si no hay token, no intentar verificar\n                        if (!token) {\n                            setLoading(false);\n                            return;\n                        }\n                        // Intentar verificar el token\n                        const userData = await _config_api__WEBPACK_IMPORTED_MODULE_1__.authService.verifyAuth();\n                        setUser(userData);\n                        setIsAuthenticated(true);\n                    } catch (error) {\n                        console.error('Error de autenticación:', error);\n                        // Limpiar token si la verificación falla\n                        if (true) {\n                            localStorage.removeItem('token');\n                        }\n                        setIsAuthenticated(false);\n                        setError(error.message || 'Error de autenticación');\n                    } finally{\n                        setLoading(false);\n                    }\n                }\n            }[\"useAuth.useEffect.checkAuth\"];\n            checkAuth();\n        }\n    }[\"useAuth.useEffect\"], []);\n    const login = async (credentials)=>{\n        try {\n            setLoading(true);\n            const data = await _config_api__WEBPACK_IMPORTED_MODULE_1__.authService.login(credentials);\n            setUser(data.user);\n            setIsAuthenticated(true);\n            setError(null);\n            return true;\n        } catch (error) {\n            console.error('Error de inicio de sesión:', error);\n            setError(error.message || 'Error al iniciar sesión');\n            setIsAuthenticated(false);\n            return false;\n        } finally{\n            setLoading(false);\n        }\n    };\n    const logout = ()=>{\n        _config_api__WEBPACK_IMPORTED_MODULE_1__.authService.logout();\n        setUser(null);\n        setIsAuthenticated(false);\n    };\n    return {\n        isAuthenticated,\n        user,\n        loading,\n        error,\n        login,\n        logout\n    };\n};\n_s(useAuth, \"vaOJqRNqhe8+3y/pDoWbnx+olHE=\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9ob29rcy91c2VBdXRoLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSx1QkFBdUI7O0FBR3FCO0FBQ0E7QUFHckMsTUFBTUcsVUFBVTs7SUFDckIsTUFBTSxDQUFDQyxpQkFBaUJDLG1CQUFtQixHQUFHTCwrQ0FBUUEsQ0FBQztJQUN2RCxNQUFNLENBQUNNLE1BQU1DLFFBQVEsR0FBR1AsK0NBQVFBLENBQUM7SUFDakMsTUFBTSxDQUFDUSxTQUFTQyxXQUFXLEdBQUdULCtDQUFRQSxDQUFDO0lBQ3ZDLE1BQU0sQ0FBQ1UsT0FBT0MsU0FBUyxHQUFHWCwrQ0FBUUEsQ0FBQztJQUVuQ0MsZ0RBQVNBOzZCQUFDO1lBQ1IsTUFBTVc7K0NBQVk7b0JBQ2hCLElBQUk7d0JBQ0YsNENBQTRDO3dCQUM1QyxNQUFNQyxRQUFRLEtBQTZCLEdBQUdDLGFBQWFDLE9BQU8sQ0FBQyxXQUFXLENBQUk7d0JBRWxGLHlDQUF5Qzt3QkFDekMsSUFBSSxDQUFDRixPQUFPOzRCQUNWSixXQUFXOzRCQUNYO3dCQUNGO3dCQUVBLDhCQUE4Qjt3QkFDOUIsTUFBTU8sV0FBVyxNQUFNZCxvREFBV0EsQ0FBQ2UsVUFBVTt3QkFDN0NWLFFBQVFTO3dCQUNSWCxtQkFBbUI7b0JBQ3JCLEVBQUUsT0FBT0ssT0FBTzt3QkFDZFEsUUFBUVIsS0FBSyxDQUFDLDJCQUEyQkE7d0JBRXpDLHlDQUF5Qzt3QkFDekMsSUFBSSxJQUE2QixFQUFFOzRCQUNqQ0ksYUFBYUssVUFBVSxDQUFDO3dCQUMxQjt3QkFFQWQsbUJBQW1CO3dCQUNuQk0sU0FBU0QsTUFBTVUsT0FBTyxJQUFJO29CQUM1QixTQUFVO3dCQUNSWCxXQUFXO29CQUNiO2dCQUNGOztZQUVBRztRQUNGOzRCQUFHLEVBQUU7SUFFTCxNQUFNUyxRQUFRLE9BQU9DO1FBQ25CLElBQUk7WUFDRmIsV0FBVztZQUNYLE1BQU1jLE9BQU8sTUFBTXJCLG9EQUFXQSxDQUFDbUIsS0FBSyxDQUFDQztZQUNyQ2YsUUFBUWdCLEtBQUtqQixJQUFJO1lBQ2pCRCxtQkFBbUI7WUFDbkJNLFNBQVM7WUFDVCxPQUFPO1FBQ1QsRUFBRSxPQUFPRCxPQUFPO1lBQ2RRLFFBQVFSLEtBQUssQ0FBQyw4QkFBOEJBO1lBRTVDQyxTQUFTRCxNQUFNVSxPQUFPLElBQUk7WUFDMUJmLG1CQUFtQjtZQUNuQixPQUFPO1FBQ1QsU0FBVTtZQUNSSSxXQUFXO1FBQ2I7SUFDRjtJQUVBLE1BQU1lLFNBQVM7UUFDYnRCLG9EQUFXQSxDQUFDc0IsTUFBTTtRQUNsQmpCLFFBQVE7UUFDUkYsbUJBQW1CO0lBQ3JCO0lBRUEsT0FBTztRQUNMRDtRQUNBRTtRQUNBRTtRQUNBRTtRQUNBVztRQUNBRztJQUNGO0FBQ0YsRUFBRTtHQXpFV3JCIiwic291cmNlcyI6WyIvVXNlcnMvZGlhbmEvRGVza3RvcC9GaW5OZXN0L2Zyb250ZW5kL3NyYy9ob29rcy91c2VBdXRoLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIHNyYy9ob29rcy91c2VBdXRoLmpzXG5cInVzZSBjbGllbnRcIjtcblxuaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vY29uZmlnL2FwaSc7XG5cblxuZXhwb3J0IGNvbnN0IHVzZUF1dGggPSAoKSA9PiB7XG4gIGNvbnN0IFtpc0F1dGhlbnRpY2F0ZWQsIHNldElzQXV0aGVudGljYXRlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFt1c2VyLCBzZXRVc2VyXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZShudWxsKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGNoZWNrQXV0aCA9IGFzeW5jICgpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFZlcmlmaWNhciBzaSBoYXkgdW4gdG9rZW4gZW4gbG9jYWxTdG9yYWdlXG4gICAgICAgIGNvbnN0IHRva2VuID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKSA6IG51bGw7XG4gICAgICAgIFxuICAgICAgICAvLyBTaSBubyBoYXkgdG9rZW4sIG5vIGludGVudGFyIHZlcmlmaWNhclxuICAgICAgICBpZiAoIXRva2VuKSB7XG4gICAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSW50ZW50YXIgdmVyaWZpY2FyIGVsIHRva2VuXG4gICAgICAgIGNvbnN0IHVzZXJEYXRhID0gYXdhaXQgYXV0aFNlcnZpY2UudmVyaWZ5QXV0aCgpO1xuICAgICAgICBzZXRVc2VyKHVzZXJEYXRhKTtcbiAgICAgICAgc2V0SXNBdXRoZW50aWNhdGVkKHRydWUpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZGUgYXV0ZW50aWNhY2nDs246JywgZXJyb3IpO1xuICAgICAgICBcbiAgICAgICAgLy8gTGltcGlhciB0b2tlbiBzaSBsYSB2ZXJpZmljYWNpw7NuIGZhbGxhXG4gICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCd0b2tlbicpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBzZXRJc0F1dGhlbnRpY2F0ZWQoZmFsc2UpO1xuICAgICAgICBzZXRFcnJvcihlcnJvci5tZXNzYWdlIHx8ICdFcnJvciBkZSBhdXRlbnRpY2FjacOzbicpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNoZWNrQXV0aCgpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgbG9naW4gPSBhc3luYyAoY3JlZGVudGlhbHMpID0+IHtcbiAgICB0cnkge1xuICAgICAgc2V0TG9hZGluZyh0cnVlKTtcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBhdXRoU2VydmljZS5sb2dpbihjcmVkZW50aWFscyk7XG4gICAgICBzZXRVc2VyKGRhdGEudXNlcik7XG4gICAgICBzZXRJc0F1dGhlbnRpY2F0ZWQodHJ1ZSk7XG4gICAgICBzZXRFcnJvcihudWxsKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBkZSBpbmljaW8gZGUgc2VzacOzbjonLCBlcnJvcik7XG4gICAgICBcbiAgICAgIHNldEVycm9yKGVycm9yLm1lc3NhZ2UgfHwgJ0Vycm9yIGFsIGluaWNpYXIgc2VzacOzbicpO1xuICAgICAgc2V0SXNBdXRoZW50aWNhdGVkKGZhbHNlKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGxvZ291dCA9ICgpID0+IHtcbiAgICBhdXRoU2VydmljZS5sb2dvdXQoKTtcbiAgICBzZXRVc2VyKG51bGwpO1xuICAgIHNldElzQXV0aGVudGljYXRlZChmYWxzZSk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBpc0F1dGhlbnRpY2F0ZWQsXG4gICAgdXNlcixcbiAgICBsb2FkaW5nLFxuICAgIGVycm9yLFxuICAgIGxvZ2luLFxuICAgIGxvZ291dFxuICB9O1xufTsiXSwibmFtZXMiOlsidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJhdXRoU2VydmljZSIsInVzZUF1dGgiLCJpc0F1dGhlbnRpY2F0ZWQiLCJzZXRJc0F1dGhlbnRpY2F0ZWQiLCJ1c2VyIiwic2V0VXNlciIsImxvYWRpbmciLCJzZXRMb2FkaW5nIiwiZXJyb3IiLCJzZXRFcnJvciIsImNoZWNrQXV0aCIsInRva2VuIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInVzZXJEYXRhIiwidmVyaWZ5QXV0aCIsImNvbnNvbGUiLCJyZW1vdmVJdGVtIiwibWVzc2FnZSIsImxvZ2luIiwiY3JlZGVudGlhbHMiLCJkYXRhIiwibG9nb3V0Il0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/hooks/useAuth.js\n"));

/***/ })

});