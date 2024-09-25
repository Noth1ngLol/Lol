// ==UserScript==
// @name         Exhaustive Browser Testing Userscript
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Tests an extensive range of browser features and displays results
// @match        https://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function runTests() {
        const tests = [
            // Basic checks
            { name: "jQuery available", test: () => typeof jQuery !== 'undefined' },
            { name: "Images on page", test: () => document.images.length > 0 },
            
            // Storage
            { name: "localStorage supported", test: () => typeof localStorage !== 'undefined' },
            { name: "sessionStorage supported", test: () => typeof sessionStorage !== 'undefined' },
            { name: "Cookies enabled", test: () => navigator.cookieEnabled },
            { name: "IndexedDB supported", test: () => 'indexedDB' in window },
            
            // Network
            { name: "Online status", test: () => navigator.onLine },
            { name: "WebSockets supported", test: () => 'WebSocket' in window },
            { name: "Fetch API supported", test: () => 'fetch' in window },
            { name: "XMLHttpRequest supported", test: () => 'XMLHttpRequest' in window },
            
            // Geolocation and Sensors
            { name: "Geolocation API", test: () => 'geolocation' in navigator },
            { name: "DeviceOrientation API", test: () => 'DeviceOrientationEvent' in window },
            { name: "DeviceMotion API", test: () => 'DeviceMotionEvent' in window },
            
            // Graphics and Multimedia
            { name: "WebGL supported", test: () => {
                let canvas = document.createElement('canvas');
                return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
            }},
            { name: "Canvas supported", test: () => {
                let canvas = document.createElement('canvas');
                return !!(canvas.getContext && canvas.getContext('2d'));
            }},
            { name: "SVG supported", test: () => document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") },
            { name: "WebAudio API supported", test: () => 'AudioContext' in window },
            { name: "Video playback supported", test: () => !!document.createElement('video').canPlayType },
            { name: "WebRTC supported", test: () => 'RTCPeerConnection' in window },
            
            // CSS Features
            { name: "CSS Grid supported", test: () => CSS.supports('display', 'grid') },
            { name: "Flexbox supported", test: () => CSS.supports('display', 'flex') },
            { name: "CSS Transitions supported", test: () => CSS.supports('transition', 'all 0.5s') },
            { name: "CSS Animations supported", test: () => CSS.supports('animation', 'name 5s') },
            
            // JavaScript Features
            { name: "ES6 Arrow Functions", test: () => {
                try { eval('() => {}'); return true; } catch (e) { return false; }
            }},
            { name: "Promises supported", test: () => 'Promise' in window },
            { name: "Async/Await supported", test: () => {
                try { eval('async () => await Promise.resolve()'); return true; } catch (e) { return false; }
            }},
            { name: "ES6 Modules supported", test: () => {
                try { eval('import("").catch(() => {})'); return true; } catch (e) { return false; }
            }},
            
            // APIs and Web Features
            { name: "Service Workers supported", test: () => 'serviceWorker' in navigator },
            { name: "Web Workers supported", test: () => 'Worker' in window },
            { name: "WebAssembly supported", test: () => typeof WebAssembly === 'object' },
            { name: "Push API supported", test: () => 'PushManager' in window },
            { name: "Notifications API supported", test: () => 'Notification' in window },
            { name: "Payment Request API supported", test: () => 'PaymentRequest' in window },
            { name: "Bluetooth API supported", test: () => 'Bluetooth' in navigator },
            { name: "Web Share API supported", test: () => 'share' in navigator },
            { name: "Intersection Observer API", test: () => 'IntersectionObserver' in window },
            { name: "Resize Observer API", test: () => 'ResizeObserver' in window },
            { name: "Mutation Observer API", test: () => 'MutationObserver' in window },
            
            // Performance APIs
            { name: "Performance API supported", test: () => 'performance' in window },
            { name: "User Timing API supported", test: () => 'performance' in window && 'mark' in performance },
            { name: "Navigation Timing API", test: () => 'PerformanceNavigationTiming' in window },
            { name: "Resource Timing API", test: () => 'PerformanceResourceTiming' in window },
            
            // Security Features
            { name: "Content Security Policy supported", test: () => 'SecurityPolicyViolationEvent' in window },
            { name: "Subresource Integrity supported", test: () => 'SRIScriptElement' in window },
            { name: "Referrer Policy supported", test: () => 'referrerPolicy' in document.createElement('a') },
            { name: "CORS supported", test: () => 'XMLHttpRequest' in window && 'withCredentials' in new XMLHttpRequest() },
            
            // Experimental Features (may not be widely supported)
            { name: "Web USB API", test: () => 'USB' in navigator },
            { name: "Web NFC API", test: () => 'NDEFReader' in window },
            { name: "Web Serial API", test: () => 'serial' in navigator },
            { name: "Web MIDI API", test: () => 'requestMIDIAccess' in navigator },
            { name: "Gamepad API", test: () => 'Gamepad' in window },
            { name: "Speech Recognition API", test: () => 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window },
            { name: "Speech Synthesis API", test: () => 'speechSynthesis' in window },
            
            // Browser-specific features
            { name: "Chrome", test: () => /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor) },
            { name: "Firefox", test: () => typeof InstallTrigger !== 'undefined' },
            { name: "Safari", test: () => /^((?!chrome|android).)*safari/i.test(navigator.userAgent) },
            { name: "Edge", test: () => /Edg/.test(navigator.userAgent) },
            { name: "Internet Explorer", test: () => /*@cc_on!@*/false || !!document.documentMode },
            { name: "Opera", test: () => (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0 }
        ];

        const results = tests.map(({name, test}) => ({name, result: test()}));
        displayResults(results);
    }

    function displayResults(results) {
        const resultsDiv = document.createElement('div');
        resultsDiv.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            width: 300px;
            max-height: 80vh;
            overflow-y: auto;
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 10px;
            font-family: Arial, sans-serif;
            font-size: 14px;
            z-index: 9999;
        `;

        const title = document.createElement('h2');
        title.textContent = 'Exhaustive Browser Feature Test Results';
        title.style.cssText = 'margin-top: 0; color: #fff;';
        resultsDiv.appendChild(title);

        const categories = {
            "Basic": results.slice(0, 2),
            "Storage": results.slice(2, 6),
            "Network": results.slice(6, 10),
            "Geolocation and Sensors": results.slice(10, 13),
            "Graphics and Multimedia": results.slice(13, 19),
            "CSS Features": results.slice(19, 23),
            "JavaScript Features": results.slice(23, 27),
            "APIs and Web Features": results.slice(27, 38),
            "Performance APIs": results.slice(38, 42),
            "Security Features": results.slice(42, 46),
            "Experimental Features": results.slice(46, 53),
            "Browser Detection": results.slice(53)
        };

        for (const [category, categoryResults] of Object.entries(categories)) {
            const categoryTitle = document.createElement('h3');
            categoryTitle.textContent = category;
            categoryTitle.style.cssText = 'margin: 10px 0 5px; color: #ddd; border-bottom: 1px solid #555;';
            resultsDiv.appendChild(categoryTitle);

            categoryResults.forEach(({name, result}) => {
                const resultElem = document.createElement('div');
                resultElem.textContent = `${name}: ${result ? '✅' : '❌'}`;
                resultElem.style.cssText = `
                    margin-bottom: 5px;
                    padding: 5px;
                    background-color: ${result ? 'rgba(0, 255, 0, 0.2)' : 'rgba(255, 0, 0, 0.2)'};
                `;
                resultsDiv.appendChild(resultElem);
            });
        }

        document.body.appendChild(resultsDiv);
    }

    // Run tests when the page is fully loaded
    window.addEventListener('load', runTests);
})();
