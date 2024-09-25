// ==UserScript==
// @name         Comprehensive JavaScript, Browser, and Userscript Manager Test Suite
// @namespace    http://tampermonkey.net/
// @version      4.0
// @description  Test a wide range of JavaScript functionalities, browser features, and userscript manager capabilities
// @match        http://*/*
// @match        https://*/*
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_listValues
// @grant        GM_addStyle
// @grant        GM_setClipboard
// @grant        GM_notification
// @grant        GM_openInTab
// @grant        GM_registerMenuCommand
// @grant        unsafeWindow
// ==/UserScript==

(function() {
    'use strict';

    const tests = [
        // Core JavaScript Tests
        {
            name: 'ES6 Arrow Functions',
            test: function() {
                return ((a, b) => a + b)(1, 2) === 3;
            }
        },
        {
            name: 'let and const',
            test: function() {
                let x = 1;
                const y = 2;
                return x === 1 && y === 2;
            }
        },
        {
            name: 'Template Literals',
            test: function() {
                const name = 'World';
                return `Hello ${name}!` === 'Hello World!';
            }
        },
        {
            name: 'Destructuring Assignment',
            test: function() {
                const [a, b] = [1, 2];
                const {c} = {c: 3};
                return a === 1 && b === 2 && c === 3;
            }
        },
        {
            name: 'Default Parameters',
            test: function() {
                const fn = (a = 1) => a;
                return fn() === 1 && fn(2) === 2;
            }
        },
        {
            name: 'Rest Parameters',
            test: function() {
                const sum = (...args) => args.reduce((a, b) => a + b, 0);
                return sum(1, 2, 3) === 6;
            }
        },
        {
            name: 'Spread Operator',
            test: function() {
                const arr = [1, 2, 3];
                return Math.max(...arr) === 3;
            }
        },
        {
            name: 'Object Literal Extensions',
            test: function() {
                const x = 1, y = 2;
                const obj = {x, y, method() { return 3; }};
                return obj.x === 1 && obj.y === 2 && obj.method() === 3;
            }
        },
        {
            name: 'for...of Loop',
            test: function() {
                let sum = 0;
                for (const num of [1, 2, 3]) {
                    sum += num;
                }
                return sum === 6;
            }
        },
        {
            name: 'Map',
            test: function() {
                const map = new Map();
                map.set('key', 'value');
                return map.get('key') === 'value';
            }
        },
        {
            name: 'Set',
            test: function() {
                const set = new Set([1, 2, 2, 3]);
                return set.size === 3;
            }
        },
        {
            name: 'Symbol',
            test: function() {
                const sym = Symbol('description');
                return typeof sym === 'symbol';
            }
        },
        {
            name: 'Promise',
            test: function() {
                return new Promise(resolve => resolve(true));
            }
        },
        {
            name: 'Async/Await',
            test: async function() {
                const result = await Promise.resolve(true);
                return result === true;
            }
        },
        {
            name: 'BigInt Support',
            test: function() {
                return typeof BigInt !== 'undefined' && BigInt(Number.MAX_SAFE_INTEGER) + BigInt(1) === BigInt('9007199254740992');
            }
        },
        {
            name: 'Optional Chaining',
            test: function() {
                const obj = { a: { b: { c: 42 } } };
                return obj?.a?.b?.c === 42 && obj?.x?.y === undefined;
            }
        },
        {
            name: 'Nullish Coalescing',
            test: function() {
                const nullValue = null;
                const undefinedValue = undefined;
                const zeroValue = 0;
                return (nullValue ?? 'default') === 'default' &&
                       (undefinedValue ?? 'default') === 'default' &&
                       (zeroValue ?? 'default') === 0;
            }
        },
        {
            name: 'Private Class Fields',
            test: function() {
                try {
                    class TestClass {
                        #privateField = 42;
                        getPrivateField() { return this.#privateField; }
                    }
                    const instance = new TestClass();
                    return instance.getPrivateField() === 42 && instance.privateField === undefined;
                } catch (e) {
                    return false;
                }
            }
        },
        {
            name: 'Top Level Await',
            test: async function() {
                try {
                    await Promise.resolve();
                    return true;
                } catch (e) {
                    return false;
                }
            }
        },
        {
            name: 'Dynamic Import',
            test: async function() {
                try {
                    const module = await import('data:text/javascript,export default "test"');
                    return module.default === 'test';
                } catch (e) {
                    return false;
                }
            }
        },

        // Browser API Tests
        {
            name: 'Geolocation API',
            test: function() {
                return 'geolocation' in navigator;
            }
        },
        {
            name: 'Web Storage',
            test: function() {
                return 'localStorage' in window && 'sessionStorage' in window;
            }
        },
        {
            name: 'IndexedDB',
            test: function() {
                return 'indexedDB' in window;
            }
        },
        {
            name: 'Web Workers',
            test: function() {
                return 'Worker' in window;
            }
        },
        {
            name: 'Service Workers',
            test: function() {
                return 'serviceWorker' in navigator;
            }
        },
        {
            name: 'WebGL',
            test: function() {
                const canvas = document.createElement('canvas');
                return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
            }
        },
        {
            name: 'WebRTC',
            test: function() {
                return 'RTCPeerConnection' in window;
            }
        },
        {
            name: 'WebSockets',
            test: function() {
                return 'WebSocket' in window;
            }
        },
        {
            name: 'Fetch API',
            test: function() {
                return 'fetch' in window;
            }
        },
        {
            name: 'Canvas API',
            test: function() {
                const canvas = document.createElement('canvas');
                return !!(canvas.getContext && canvas.getContext('2d'));
            }
        },
        {
            name: 'SVG',
            test: function() {
                return !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect;
            }
        },
        {
            name: 'Web Audio API',
            test: function() {
                return 'AudioContext' in window || 'webkitAudioContext' in window;
            }
        },
        {
            name: 'File API',
            test: function() {
                return 'File' in window && 'FileReader' in window && 'FileList' in window && 'Blob' in window;
            }
        },
        {
            name: 'Drag and Drop API',
            test: function() {
                const div = document.createElement('div');
                return 'draggable' in div || ('ondragstart' in div && 'ondrop' in div);
            }
        },
        {
            name: 'Web Animations API',
            test: function() {
                return 'animate' in document.createElement('div');
            }
        },
        {
            name: 'Fullscreen API',
            test: function() {
                return 'fullscreenElement' in document || 'webkitFullscreenElement' in document || 'mozFullScreenElement' in document || 'msFullscreenElement' in document;
            }
        },
        {
            name: 'ResizeObserver',
            test: function() {
                return typeof ResizeObserver !== 'undefined';
            }
        },
        {
            name: 'Pointer Events',
            test: function() {
                return 'PointerEvent' in window;
            }
        },
        {
            name: 'Web Share API',
            test: function() {
                return 'share' in navigator;
            }
        },
        {
            name: 'Payment Request API',
            test: function() {
                return 'PaymentRequest' in window;
            }
        },

        // Network-related Tests
        {
            name: 'Network Information API',
            test: function() {
                return 'connection' in navigator && navigator.connection !== undefined;
            }
        },
        {
            name: 'Network Type Detection',
            test: function() {
                if ('connection' in navigator && navigator.connection !== undefined) {
                    const connection = navigator.connection;
                    return typeof connection.type !== 'undefined';
                }
                return false;
            }
        },
        {
            name: 'Effective Connection Type',
            test: function() {
                if ('connection' in navigator && navigator.connection !== undefined) {
                    const connection = navigator.connection;
                    return typeof connection.effectiveType !== 'undefined';
                }
                return false;
            }
        },
        {
            name: 'Downlink Speed',
            test: function() {
                if ('connection' in navigator && navigator.connection !== undefined) {
                    const connection = navigator.connection;
                    return typeof connection.downlink !== 'undefined';
                }
                return false;
            }
        },
        {
            name: 'RTT (Round Trip Time)',
            test: function() {
                if ('connection' in navigator && navigator.connection !== undefined) {
                    const connection = navigator.connection;
                    return typeof connection.rtt !== 'undefined';
                }
                return false;
            }
        },
        {
            name: 'Save-Data Detection',
            test: function() {
                if ('connection' in navigator && navigator.connection !== undefined) {
                    const connection = navigator.connection;
                    return typeof connection.saveData !== 'undefined';
                }
                return false;
            }
        },
        {
            name: 'Online/Offline Events',
            test: function() {
                return 'onLine' in navigator && typeof window.ononline !== 'undefined' && typeof window.onoffline !== 'undefined';
            }
        },
        {
            name: 'Beacon API',
            test: function() {
                return 'sendBeacon' in navigator;
            }
        },
        {
            name: 'XMLHttpRequest',
            test: function() {
                return typeof XMLHttpRequest !== 'undefined';
            }
        },
        {
            name: 'Server-Sent Events',
            test: function() {
                return 'EventSource' in window;
            }
        },

        // Userscript Manager Tests
        {
            name: 'GM_xmlhttpRequest',
            test: function() {
                return typeof GM_xmlhttpRequest !== 'undefined';
            }
        },
        {
            name: 'GM Storage',
            test: function() {
                if (typeof GM_setValue === 'undefined' || typeof GM_getValue === 'undefined') return false;
                GM_setValue('testKey', 'testValue');
                const value = GM_getValue('testKey');
                GM_deleteValue('testKey');
                return value === 'testValue';
            }
        },
        {
            name: 'GM_listValues',
            test: function() {
                return typeof GM_listValues !== 'undefined';
            }
        },
        {
            name: 'GM_addStyle',
            test: function() {
                return typeof GM_addStyle !== 'undefined';
            }
        },
        {
            name: 'GM_setClipboard',
            test: function() {
                return typeof GM_setClipboard !== 'undefined';
            }
        },
        {
            name: 'GM_notification',
            test: function() {
                return typeof GM_notification !== 'undefined';
            }
        },
        {
            name: 'GM_openInTab',
            test: function() {
                return typeof GM_openInTab !== 'undefined';
            }
        },
        {
            name: 'GM_registerMenuCommand',
            test: function() {
                return typeof GM_registerMenuCommand !== 'undefined';
            }
        },
        {
            name: 'unsafeWindow',
            test: function() {
                return typeof unsafeWindow !== 'undefined';
            }
        }
    ];

    function createUI() {
        const container = document.createElement('div');
        container.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background-color: #f0f0f0;
            border: 1px solid #ccc;
            padding: 10px;
            border-radius: 5px;
            font-family: Arial, sans-serif;
            z-index: 9999;
            max-height: 80vh;
            overflow-y: auto;
            width: 300px;
        `;

        const title = document.createElement('h2');
        title.textContent = 'JavaScript, Browser, and Userscript Test Results';
        title.style.marginTop = '0';
        container.appendChild(title);

        const resultsList = document.createElement('ul');
        resultsList.style.listStyleType = 'none';
        resultsList.style.padding = '0';
        container.appendChild(resultsList);

        document.body.appendChild(container);
        return resultsList;
    }

    function runTests() {
        const resultsList = createUI();

        tests.forEach((testObj) => {
            const listItem = document.createElement('li');
            listItem.style.marginBottom = '5px';

            const nameSpan = document.createElement('span');
            nameSpan.textContent = testObj.name + ': ';
            listItem.appendChild(nameSpan);

            const resultSpan = document.createElement('span');
            resultSpan.style.fontWeight = 'bold';

            const result = testObj.test();
            if (result instanceof Promise) {
                resultSpan.textContent = 'Running...';
                result.then((success) => {
                    resultSpan.textContent = success ? 'Passed' : 'Failed';
                    resultSpan.style.color = success ? 'green' : 'red';
                }).catch(() => {
                    resultSpan.textContent = 'Error';
                    resultSpan.style.color = 'red';
                });
            } else {
                resultSpan.textContent = result ? 'Passed' : 'Failed';
                resultSpan.style.color = result ? 'green' : 'red';
            }

            listItem.appendChild(resultSpan);
            resultsList.appendChild(listItem);
        });
    }

    runTests();
})();
