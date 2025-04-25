// ==UserScript==
// @name               Twitter Web Exporter - Auto Edition
// @name:zh-CN         Twitter 数据导出工具 自动采集补丁
// @name:zh-TW         Twitter 資料匯出工具 自动采集补丁
// @name:ja            Twitter データエクスポーター 自動採集补丁
// @namespace          withui
// @version            1.2.1-beta.6
// @author             prin <hi@prin.studio>
// @description        Export tweets, bookmarks, lists and much more to JSON/CSV/HTML from Twitter(X) web app.
// @description:zh-CN  从 Twitter(X) 网页版导出推文、书签、列表等各种数据，支持导出 JSON/CSV/HTML。
// @description:zh-TW  從 Twitter(X) 網頁版匯出推文、書籤、列表等各種資料，支援匯出 JSON/CSV/HTML。
// @description:ja     Twitter(X) ブラウザ版からツイート、ブックマーク、リストなどを取得し JSON/CSV/HTML に出力します。
// @license            MIT
// @icon               data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABmklEQVR4Ae3XA4wcARSA4dq2bUQ1g9pRbVtBzai2otpug9pxUttn2753/3m9Ozq/5NsdvvfGM6VKoshE8/ORFbAMbxCGWHzDHjS2sXxPlM0eKYclGoq3w1eIHVGYikaYg6e4ZppgAgQrVBSvDw+IEylIhSAATUyTHIYgFdsUNnAGosAfDMccLMtOchli4g7quFC8FhIhCsRD8Bk1sxMdgVjwxRyUdtDABIgKH9DQNNEkiB1fMB9VbDSwEKLQJ1S1TFQRXhAHYnADy9ETdTEeotAze7tzNJIhCiRBFLpnq/hmzMR65UkVO2WrgaOQPLLW3u6XPDLAVgOl8R5isEhUtHcSdkEoxEBXnN3ZuuMbxCDDnTVQF52xBcEQHX1BaWcNtDLwMpzg6tNtN0RnD5U8XsviGkQnYWih9CWjNBbDHaJBMsZqec8rjV54B1EoFXO0Fh+DrxCFEjBTTdFy6IvNGu4Hf9FXSdGheAUvjZdgLPajqtp3+jl4jVSIAgHYjRZ6fWC0wSpcwScEQZCMUPzEfezEYJQrVRKFOdIAZGq1QBG8EiYAAAAASUVORK5CYII=
// @homepage           https://github.com/prinsss/twitter-web-exporter
// @homepageURL        https://github.com/prinsss/twitter-web-exporter
// @supportURL         https://github.com/prinsss/twitter-web-exporter/issues
// @downloadURL        https://github.com/prinsss/twitter-web-exporter/releases/latest/download/twitter-web-exporter.user.js
// @updateURL          https://github.com/prinsss/twitter-web-exporter/releases/latest/download/twitter-web-exporter.user.js
// @match              *://twitter.com/*
// @match              *://x.com/*
// @require            https://cdn.jsdelivr.net/npm/dayjs@1.11.13/dayjs.min.js
// @require            https://cdn.jsdelivr.net/npm/dexie@4.0.9/dist/dexie.min.js
// @require            https://cdn.jsdelivr.net/npm/dexie-export-import@4.1.2/dist/dexie-export-import.js
// @require            https://cdn.jsdelivr.net/npm/i18next@23.16.2/i18next.min.js
// @require            https://cdn.jsdelivr.net/npm/preact@10.24.3/dist/preact.min.js
// @require            https://cdn.jsdelivr.net/npm/preact@10.24.3/hooks/dist/hooks.umd.js
// @require            https://cdn.jsdelivr.net/npm/@preact/signals-core@1.8.0/dist/signals-core.min.js
// @require            https://cdn.jsdelivr.net/npm/@preact/signals@1.3.0/dist/signals.min.js
// @require            https://cdn.jsdelivr.net/npm/@tanstack/table-core@8.20.5/build/umd/index.production.js
// @grant              GM_addStyle
// @grant              GM_registerMenuCommand
// @grant              unsafeWindow
// @run-at             document-start
// ==/UserScript==

(t=>{if(typeof GM_addStyle=="function"){GM_addStyle(t);return}const o=document.createElement("style");o.textContent=t,document.head.append(o)})(` #twe-root *,#twe-root :before,#twe-root :after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }#twe-root ::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }#twe-root *,#twe-root :before,#twe-root :after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}#twe-root :before,#twe-root :after{--tw-content: ""}#twe-root,#twe-root :host{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}#twe-root{margin:0;line-height:inherit}#twe-root hr{height:0;color:inherit;border-top-width:1px}#twe-root abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}#twe-root h1,#twe-root h2,#twe-root h3,#twe-root h4,#twe-root h5,#twe-root h6{font-size:inherit;font-weight:inherit}#twe-root a{color:inherit;text-decoration:inherit}#twe-root b,#twe-root strong{font-weight:bolder}#twe-root code,#twe-root kbd,#twe-root samp,#twe-root pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}#twe-root small{font-size:80%}#twe-root sub,#twe-root sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}#twe-root sub{bottom:-.25em}#twe-root sup{top:-.5em}#twe-root table{text-indent:0;border-color:inherit;border-collapse:collapse}#twe-root button,#twe-root input,#twe-root optgroup,#twe-root select,#twe-root textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;letter-spacing:inherit;color:inherit;margin:0;padding:0}#twe-root button,#twe-root select{text-transform:none}#twe-root button,#twe-root input:where([type=button]),#twe-root input:where([type=reset]),#twe-root input:where([type=submit]){-webkit-appearance:button;background-color:transparent;background-image:none}#twe-root :-moz-focusring{outline:auto}#twe-root :-moz-ui-invalid{box-shadow:none}#twe-root progress{vertical-align:baseline}#twe-root ::-webkit-inner-spin-button,#twe-root ::-webkit-outer-spin-button{height:auto}#twe-root [type=search]{-webkit-appearance:textfield;outline-offset:-2px}#twe-root ::-webkit-search-decoration{-webkit-appearance:none}#twe-root ::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}#twe-root summary{display:list-item}#twe-root blockquote,#twe-root dl,#twe-root dd,#twe-root h1,#twe-root h2,#twe-root h3,#twe-root h4,#twe-root h5,#twe-root h6,#twe-root hr,#twe-root figure,#twe-root p,#twe-root pre{margin:0}#twe-root fieldset{margin:0;padding:0}#twe-root legend{padding:0}#twe-root ol,#twe-root ul,#twe-root menu{list-style:none;margin:0;padding:0}#twe-root dialog{padding:0}#twe-root textarea{resize:vertical}#twe-root input::-moz-placeholder,#twe-root textarea::-moz-placeholder{opacity:1;color:#9ca3af}#twe-root input::placeholder,#twe-root textarea::placeholder{opacity:1;color:#9ca3af}#twe-root button,#twe-root [role=button]{cursor:pointer}#twe-root :disabled{cursor:default}#twe-root img,#twe-root svg,#twe-root video,#twe-root canvas,#twe-root audio,#twe-root iframe,#twe-root embed,#twe-root object{display:block;vertical-align:middle}#twe-root img,#twe-root video{max-width:100%;height:auto}#twe-root [hidden]:where(:not([hidden=until-found])){display:none}#twe-root,#twe-root [data-theme]{background-color:var(--fallback-b1,oklch(var(--b1)/1));color:var(--fallback-bc,oklch(var(--bc)/1))}@supports not (color: oklch(0% 0 0)){#twe-root{color-scheme:light;--fallback-p: #491eff;--fallback-pc: #d4dbff;--fallback-s: #ff41c7;--fallback-sc: #fff9fc;--fallback-a: #00cfbd;--fallback-ac: #00100d;--fallback-n: #2b3440;--fallback-nc: #d7dde4;--fallback-b1: #ffffff;--fallback-b2: #e5e6e6;--fallback-b3: #e5e6e6;--fallback-bc: #1f2937;--fallback-in: #00b3f0;--fallback-inc: #000000;--fallback-su: #00ca92;--fallback-suc: #000000;--fallback-wa: #ffc22d;--fallback-wac: #000000;--fallback-er: #ff6f70;--fallback-erc: #000000}@media (prefers-color-scheme: dark){#twe-root{color-scheme:dark;--fallback-p: #7582ff;--fallback-pc: #050617;--fallback-s: #ff71cf;--fallback-sc: #190211;--fallback-a: #00c7b5;--fallback-ac: #000e0c;--fallback-n: #2a323c;--fallback-nc: #a6adbb;--fallback-b1: #1d232a;--fallback-b2: #191e24;--fallback-b3: #15191e;--fallback-bc: #a6adbb;--fallback-in: #00b3f0;--fallback-inc: #000000;--fallback-su: #00ca92;--fallback-suc: #000000;--fallback-wa: #ffc22d;--fallback-wac: #000000;--fallback-er: #ff6f70;--fallback-erc: #000000}}}#twe-root{-webkit-tap-highlight-color:transparent}#twe-root *{scrollbar-color:color-mix(in oklch,currentColor 35%,transparent) transparent}#twe-root *:hover{scrollbar-color:color-mix(in oklch,currentColor 60%,transparent) transparent}#twe-root{color-scheme:light;--in: 72.06% .191 231.6;--su: 64.8% .15 160;--wa: 84.71% .199 83.87;--er: 71.76% .221 22.18;--pc: 15.2344% .017892 200.026556;--sc: 15.787% .020249 356.29965;--ac: 15.8762% .029206 78.618794;--nc: 84.7148% .013247 313.189598;--inc: 0% 0 0;--suc: 0% 0 0;--wac: 0% 0 0;--erc: 0% 0 0;--rounded-box: 16px;--rounded-badge: 30.4px;--animation-btn: .25s;--animation-input: .2s;--btn-focus-scale: .95;--border-btn: 1px;--p: 76.172% .089459 200.026556;--s: 78.9351% .101246 356.29965;--a: 79.3811% .146032 78.618794;--n: 23.5742% .066235 313.189598;--b1: 97.7882% .00418 56.375637;--b2: 93.9822% .007638 61.449292;--b3: 91.5861% .006811 53.440502;--bc: 23.5742% .066235 313.189598;--rounded-btn: 30.4px;--tab-border: 2px;--tab-radius: 11.2px}@media (prefers-color-scheme: dark){#twe-root{color-scheme:dark;--b2: 26.8053% .020556 277.508664;--b3: 24.7877% .019009 277.508664;--pc: 15.0922% .036614 346.812432;--sc: 14.8405% .029709 301.883095;--ac: 16.6785% .024826 66.558491;--nc: 87.8891% .006515 275.524078;--inc: 17.6526% .018676 212.846491;--suc: 17.4199% .043903 148.024881;--wac: 19.1068% .026849 112.757109;--erc: 13.6441% .041266 24.430965;--rounded-box: 16px;--rounded-btn: 8px;--rounded-badge: 30.4px;--animation-btn: .25s;--animation-input: .2s;--btn-focus-scale: .95;--border-btn: 1px;--tab-border: 1px;--tab-radius: 8px;--p: 75.4611% .18307 346.812432;--s: 74.2023% .148546 301.883095;--a: 83.3927% .124132 66.558491;--n: 39.4456% .032576 275.524078;--b1: 28.8229% .022103 277.508664;--bc: 97.7477% .007913 106.545019;--in: 88.263% .09338 212.846491;--su: 87.0995% .219516 148.024881;--wa: 95.5338% .134246 112.757109;--er: 68.2204% .206328 24.430965}}#twe-root [data-theme=cupcake]{color-scheme:light;--in: 72.06% .191 231.6;--su: 64.8% .15 160;--wa: 84.71% .199 83.87;--er: 71.76% .221 22.18;--pc: 15.2344% .017892 200.026556;--sc: 15.787% .020249 356.29965;--ac: 15.8762% .029206 78.618794;--nc: 84.7148% .013247 313.189598;--inc: 0% 0 0;--suc: 0% 0 0;--wac: 0% 0 0;--erc: 0% 0 0;--rounded-box: 16px;--rounded-badge: 30.4px;--animation-btn: .25s;--animation-input: .2s;--btn-focus-scale: .95;--border-btn: 1px;--p: 76.172% .089459 200.026556;--s: 78.9351% .101246 356.29965;--a: 79.3811% .146032 78.618794;--n: 23.5742% .066235 313.189598;--b1: 97.7882% .00418 56.375637;--b2: 93.9822% .007638 61.449292;--b3: 91.5861% .006811 53.440502;--bc: 23.5742% .066235 313.189598;--rounded-btn: 30.4px;--tab-border: 2px;--tab-radius: 11.2px}#twe-root [data-theme=dark]{color-scheme:dark;--in: 72.06% .191 231.6;--su: 64.8% .15 160;--wa: 84.71% .199 83.87;--er: 71.76% .221 22.18;--pc: 13.138% .0392 275.75;--sc: 14.96% .052 342.55;--ac: 14.902% .0334 183.61;--inc: 0% 0 0;--suc: 0% 0 0;--wac: 0% 0 0;--erc: 0% 0 0;--rounded-box: 16px;--rounded-btn: 8px;--rounded-badge: 30.4px;--animation-btn: .25s;--animation-input: .2s;--btn-focus-scale: .95;--border-btn: 1px;--tab-border: 1px;--tab-radius: 8px;--p: 65.69% .196 275.75;--s: 74.8% .26 342.55;--a: 74.51% .167 183.61;--n: 31.3815% .021108 254.139175;--nc: 74.6477% .0216 264.435964;--b1: 25.3267% .015896 252.417568;--b2: 23.2607% .013807 253.100675;--b3: 21.1484% .01165 254.087939;--bc: 74.6477% .0216 264.435964}#twe-root [data-theme=emerald]{color-scheme:light;--b2: 93% 0 0;--b3: 86% 0 0;--in: 72.06% .191 231.6;--su: 64.8% .15 160;--wa: 84.71% .199 83.87;--er: 71.76% .221 22.18;--inc: 0% 0 0;--suc: 0% 0 0;--wac: 0% 0 0;--erc: 0% 0 0;--rounded-box: 16px;--rounded-btn: 8px;--rounded-badge: 30.4px;--border-btn: 1px;--tab-border: 1px;--tab-radius: 8px;--p: 76.6626% .135433 153.450024;--pc: 33.3872% .040618 162.240129;--s: 61.3028% .202368 261.294233;--sc: 100% 0 0;--a: 72.7725% .149783 33.200363;--ac: 0% 0 0;--n: 35.5192% .032071 262.988584;--nc: 98.4625% .001706 247.838921;--b1: 100% 0 0;--bc: 35.5192% .032071 262.988584;--animation-btn: 0;--animation-input: 0;--btn-focus-scale: 1}#twe-root [data-theme=cyberpunk]{color-scheme:light;--b2: 87.8943% .16647 104.32;--b3: 81.2786% .15394 104.32;--in: 72.06% .191 231.6;--su: 64.8% .15 160;--wa: 84.71% .199 83.87;--er: 71.76% .221 22.18;--bc: 18.902% .0358 104.32;--pc: 14.844% .0418 6.35;--sc: 16.666% .0368 204.72;--ac: 14.372% .04352 310.43;--inc: 0% 0 0;--suc: 0% 0 0;--wac: 0% 0 0;--erc: 0% 0 0;--animation-btn: .25s;--animation-input: .2s;--btn-focus-scale: .95;--border-btn: 1px;--tab-border: 1px;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;--p: 74.22% .209 6.35;--s: 83.33% .184 204.72;--a: 71.86% .2176 310.43;--n: 23.04% .065 269.31;--nc: 94.51% .179 104.32;--b1: 94.51% .179 104.32;--rounded-box: 0;--rounded-btn: 0;--rounded-badge: 0;--tab-radius: 0}#twe-root [data-theme=valentine]{color-scheme:light;--b2: 88.0567% .024834 337.06289;--b3: 81.4288% .022964 337.06289;--pc: 13.7239% .030755 15.066527;--sc: 14.3942% .029258 293.189609;--ac: 14.2537% .014961 197.828857;--inc: 90.923% .043042 262.880917;--suc: 12.541% .033982 149.213788;--wac: 13.3168% .031484 58.31834;--erc: 14.614% .0414 27.33;--rounded-box: 16px;--rounded-badge: 30.4px;--animation-btn: .25s;--animation-input: .2s;--btn-focus-scale: .95;--border-btn: 1px;--tab-border: 1px;--p: 68.6197% .153774 15.066527;--s: 71.971% .14629 293.189609;--a: 71.2685% .074804 197.828857;--n: 54.6053% .143342 358.004839;--nc: 90.2701% .037202 336.955191;--b1: 94.6846% .026703 337.06289;--bc: 37.3085% .081131 4.606426;--in: 54.615% .215208 262.880917;--su: 62.7052% .169912 149.213788;--wa: 66.584% .157422 58.31834;--er: 73.07% .207 27.33;--rounded-btn: 30.4px;--tab-radius: 11.2px}#twe-root [data-theme=lofi]{color-scheme:light;--inc: 15.908% .0206 205.9;--suc: 18.026% .0306 164.14;--wac: 17.674% .027 79.94;--erc: 15.732% .03 28.47;--border-btn: 1px;--tab-border: 1px;--p: 15.9066% 0 0;--pc: 100% 0 0;--s: 21.455% .001566 17.278957;--sc: 100% 0 0;--a: 26.8618% 0 0;--ac: 100% 0 0;--n: 0% 0 0;--nc: 100% 0 0;--b1: 100% 0 0;--b2: 96.1151% 0 0;--b3: 92.268% .001082 17.17934;--bc: 0% 0 0;--in: 79.54% .103 205.9;--su: 90.13% .153 164.14;--wa: 88.37% .135 79.94;--er: 78.66% .15 28.47;--rounded-box: 4px;--rounded-btn: 2px;--rounded-badge: 2px;--tab-radius: 2px;--animation-btn: 0;--animation-input: 0;--btn-focus-scale: 1}#twe-root [data-theme=dracula]{color-scheme:dark;--b2: 26.8053% .020556 277.508664;--b3: 24.7877% .019009 277.508664;--pc: 15.0922% .036614 346.812432;--sc: 14.8405% .029709 301.883095;--ac: 16.6785% .024826 66.558491;--nc: 87.8891% .006515 275.524078;--inc: 17.6526% .018676 212.846491;--suc: 17.4199% .043903 148.024881;--wac: 19.1068% .026849 112.757109;--erc: 13.6441% .041266 24.430965;--rounded-box: 16px;--rounded-btn: 8px;--rounded-badge: 30.4px;--animation-btn: .25s;--animation-input: .2s;--btn-focus-scale: .95;--border-btn: 1px;--tab-border: 1px;--tab-radius: 8px;--p: 75.4611% .18307 346.812432;--s: 74.2023% .148546 301.883095;--a: 83.3927% .124132 66.558491;--n: 39.4456% .032576 275.524078;--b1: 28.8229% .022103 277.508664;--bc: 97.7477% .007913 106.545019;--in: 88.263% .09338 212.846491;--su: 87.0995% .219516 148.024881;--wa: 95.5338% .134246 112.757109;--er: 68.2204% .206328 24.430965}#twe-root [data-theme=cmyk]{color-scheme:light;--b2: 93% 0 0;--b3: 86% 0 0;--bc: 20% 0 0;--pc: 14.3544% .02666 239.443325;--sc: 12.8953% .040552 359.339283;--ac: 18.8458% .037948 105.306968;--nc: 84.3557% 0 0;--inc: 13.6952% .0189 217.284104;--suc: 89.3898% .032505 321.406278;--wac: 14.2473% .031969 52.023412;--erc: 12.4027% .041677 28.717543;--rounded-box: 16px;--rounded-btn: 8px;--rounded-badge: 30.4px;--animation-btn: .25s;--animation-input: .2s;--btn-focus-scale: .95;--border-btn: 1px;--tab-border: 1px;--tab-radius: 8px;--p: 71.7722% .133298 239.443325;--s: 64.4766% .202758 359.339283;--a: 94.2289% .189741 105.306968;--n: 21.7787% 0 0;--b1: 100% 0 0;--in: 68.4759% .094499 217.284104;--su: 46.949% .162524 321.406278;--wa: 71.2364% .159843 52.023412;--er: 62.0133% .208385 28.717543}#twe-root [data-theme=business]{color-scheme:dark;--b2: 22.6487% 0 0;--b3: 20.944% 0 0;--bc: 84.8707% 0 0;--pc: 88.3407% .019811 251.473931;--sc: 12.8185% .005481 229.389418;--ac: 13.4542% .033545 35.791525;--nc: 85.4882% .00265 253.041249;--inc: 12.5233% .028702 240.033697;--suc: 14.0454% .018919 156.59611;--wac: 15.4965% .023141 81.519177;--erc: 90.3221% .029356 29.674507;--animation-btn: .25s;--animation-input: .2s;--btn-focus-scale: .95;--border-btn: 1px;--tab-border: 1px;--tab-radius: 8px;--p: 41.7036% .099057 251.473931;--s: 64.0924% .027405 229.389418;--a: 67.271% .167726 35.791525;--n: 27.441% .01325 253.041249;--b1: 24.3535% 0 0;--in: 62.6163% .143511 240.033697;--su: 70.2268% .094594 156.59611;--wa: 77.4824% .115704 81.519177;--er: 51.6105% .14678 29.674507;--rounded-box: 4px;--rounded-btn: 2px;--rounded-badge: 2px}#twe-root [data-theme=winter]{color-scheme:light;--pc: 91.372% .051 257.57;--sc: 88.5103% .03222 282.339433;--ac: 11.988% .038303 335.171434;--nc: 83.9233% .012704 257.651965;--inc: 17.6255% .017178 214.515264;--suc: 16.0988% .015404 197.823719;--wac: 17.8345% .009167 71.47031;--erc: 14.6185% .022037 20.076293;--rounded-box: 16px;--rounded-btn: 8px;--rounded-badge: 30.4px;--animation-btn: .25s;--animation-input: .2s;--btn-focus-scale: .95;--border-btn: 1px;--tab-border: 1px;--tab-radius: 8px;--p: 56.86% .255 257.57;--s: 42.5516% .161098 282.339433;--a: 59.9398% .191515 335.171434;--n: 19.6166% .063518 257.651965;--b1: 100% 0 0;--b2: 97.4663% .011947 259.822565;--b3: 93.2686% .016223 262.751375;--bc: 41.8869% .053885 255.824911;--in: 88.1275% .085888 214.515264;--su: 80.4941% .077019 197.823719;--wa: 89.1725% .045833 71.47031;--er: 73.0926% .110185 20.076293}#twe-root .alert{display:grid;width:100%;grid-auto-flow:row;align-content:flex-start;align-items:center;justify-items:center;gap:16px;text-align:center;border-radius:var(--rounded-box, 16px);border-width:1px;--tw-border-opacity: 1;border-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-border-opacity)));padding:16px;--tw-text-opacity: 1;color:var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)));--alert-bg: var(--fallback-b2,oklch(var(--b2)/1));--alert-bg-mix: var(--fallback-b1,oklch(var(--b1)/1));background-color:var(--alert-bg)}@media (min-width: 640px){#twe-root .alert{grid-auto-flow:column;grid-template-columns:auto minmax(auto,1fr);justify-items:start;text-align:start}}#twe-root .avatar.placeholder>div{display:flex;align-items:center;justify-content:center}#twe-root .badge{display:inline-flex;align-items:center;justify-content:center;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-timing-function:cubic-bezier(0,0,.2,1);transition-duration:.2s;height:20px;font-size:14px;line-height:20px;width:-moz-fit-content;width:fit-content;padding-left:9.008px;padding-right:9.008px;border-radius:var(--rounded-badge, 30.4px);border-width:1px;--tw-border-opacity: 1;border-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-border-opacity)));--tw-bg-opacity: 1;background-color:var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)));--tw-text-opacity: 1;color:var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)))}@media (hover:hover){#twe-root .checkbox-accent:hover{--tw-border-opacity: 1;border-color:var(--fallback-a,oklch(var(--a)/var(--tw-border-opacity)))}#twe-root .label a:hover{--tw-text-opacity: 1;color:var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)))}#twe-root .menu li>*:not(ul,.menu-title,details,.btn):active,#twe-root .menu li>*:not(ul,.menu-title,details,.btn).active,#twe-root .menu li>details>summary:active{--tw-bg-opacity: 1;background-color:var(--fallback-n,oklch(var(--n)/var(--tw-bg-opacity)));--tw-text-opacity: 1;color:var(--fallback-nc,oklch(var(--nc)/var(--tw-text-opacity)))}#twe-root .table tr.hover:hover,#twe-root .table tr.hover:nth-child(2n):hover{--tw-bg-opacity: 1;background-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-bg-opacity)))}#twe-root .\\!table tr.hover:hover,#twe-root .\\!table tr.hover:nth-child(2n):hover{--tw-bg-opacity: 1 !important;background-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-bg-opacity)))!important}#twe-root .table-zebra tr.hover:hover,#twe-root .table-zebra tr.hover:nth-child(2n):hover{--tw-bg-opacity: 1;background-color:var(--fallback-b3,oklch(var(--b3)/var(--tw-bg-opacity)))}}#twe-root .btn{display:inline-flex;height:48px;min-height:48px;flex-shrink:0;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;user-select:none;flex-wrap:wrap;align-items:center;justify-content:center;border-radius:var(--rounded-btn, 8px);border-color:transparent;border-color:oklch(var(--btn-color, var(--b2)) / var(--tw-border-opacity));padding-left:16px;padding-right:16px;text-align:center;font-size:14px;line-height:1em;gap:8px;font-weight:600;text-decoration-line:none;transition-duration:.2s;transition-timing-function:cubic-bezier(0,0,.2,1);border-width:var(--border-btn, 1px);transition-property:color,background-color,border-color,opacity,box-shadow,transform;--tw-text-opacity: 1;color:var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)));--tw-shadow: 0 1px 2px 0 rgb(0 0 0 / .05);--tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow);outline-color:var(--fallback-bc,oklch(var(--bc)/1));background-color:oklch(var(--btn-color, var(--b2)) / var(--tw-bg-opacity));--tw-bg-opacity: 1;--tw-border-opacity: 1}#twe-root .btn-disabled,#twe-root .btn[disabled],#twe-root .btn:disabled{pointer-events:none}#twe-root :where(.btn:is(input[type=checkbox])),#twe-root :where(.btn:is(input[type=radio])){width:auto;-webkit-appearance:none;-moz-appearance:none;appearance:none}#twe-root .btn:is(input[type=checkbox]):after,#twe-root .btn:is(input[type=radio]):after{--tw-content: attr(aria-label);content:var(--tw-content)}#twe-root .card{position:relative;display:flex;flex-direction:column;border-radius:var(--rounded-box, 16px)}#twe-root .card:focus{outline:2px solid transparent;outline-offset:2px}#twe-root .card figure{display:flex;align-items:center;justify-content:center}#twe-root .card.image-full{display:grid}#twe-root .card.image-full:before{position:relative;content:"";z-index:10;border-radius:var(--rounded-box, 16px);--tw-bg-opacity: 1;background-color:var(--fallback-n,oklch(var(--n)/var(--tw-bg-opacity)));opacity:.75}#twe-root .card.image-full:before,#twe-root .card.image-full>*{grid-column-start:1;grid-row-start:1}#twe-root .card.image-full>figure img{height:100%;-o-object-fit:cover;object-fit:cover}#twe-root .card.image-full>.card-body{position:relative;z-index:20;--tw-text-opacity: 1;color:var(--fallback-nc,oklch(var(--nc)/var(--tw-text-opacity)))}#twe-root .checkbox{flex-shrink:0;--chkbg: var(--fallback-bc,oklch(var(--bc)/1));--chkfg: var(--fallback-b1,oklch(var(--b1)/1));height:24px;width:24px;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;border-radius:var(--rounded-btn, 8px);border-width:1px;border-color:var(--fallback-bc,oklch(var(--bc)/var(--tw-border-opacity)));--tw-border-opacity: .2}#twe-root .divider{display:flex;flex-direction:row;align-items:center;align-self:stretch;margin-top:16px;margin-bottom:16px;height:16px;white-space:nowrap}#twe-root .divider:before,#twe-root .divider:after{height:2px;width:100%;flex-grow:1;--tw-content: "";content:var(--tw-content);background-color:var(--fallback-bc,oklch(var(--bc)/.1))}#twe-root .dropdown{position:relative;display:inline-block}#twe-root .dropdown>*:not(summary):focus{outline:2px solid transparent;outline-offset:2px}#twe-root .dropdown .dropdown-content{position:absolute}#twe-root .dropdown:is(:not(details)) .dropdown-content{visibility:hidden;opacity:0;transform-origin:top;--tw-scale-x: .95;--tw-scale-y: .95;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-timing-function:cubic-bezier(0,0,.2,1);transition-duration:.2s}#twe-root .dropdown-end .dropdown-content{inset-inline-end:0px}#twe-root .dropdown-left .dropdown-content{bottom:auto;inset-inline-end:100%;top:0;transform-origin:right}#twe-root .dropdown-right .dropdown-content{bottom:auto;inset-inline-start:100%;top:0;transform-origin:left}#twe-root .dropdown-bottom .dropdown-content{bottom:auto;top:100%;transform-origin:top}#twe-root .dropdown-top .dropdown-content{bottom:100%;top:auto;transform-origin:bottom}#twe-root .dropdown-end.dropdown-right .dropdown-content,#twe-root .dropdown-end.dropdown-left .dropdown-content{bottom:0;top:auto}#twe-root .dropdown.dropdown-open .dropdown-content,#twe-root .dropdown:not(.dropdown-hover):focus .dropdown-content,#twe-root .dropdown:focus-within .dropdown-content{visibility:visible;opacity:1}@media (hover: hover){#twe-root .dropdown.dropdown-hover:hover .dropdown-content{visibility:visible;opacity:1}#twe-root .btm-nav>*.disabled:hover,#twe-root .btm-nav>*[disabled]:hover{pointer-events:none;--tw-border-opacity: 0;background-color:var(--fallback-n,oklch(var(--n)/var(--tw-bg-opacity)));--tw-bg-opacity: .1;color:var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)));--tw-text-opacity: .2}#twe-root .btn:hover{--tw-border-opacity: 1;border-color:var(--fallback-b3,oklch(var(--b3)/var(--tw-border-opacity)));--tw-bg-opacity: 1;background-color:var(--fallback-b3,oklch(var(--b3)/var(--tw-bg-opacity)))}@supports (color: color-mix(in oklab,black,black)){#twe-root .btn:hover{background-color:color-mix(in oklab,oklch(var(--btn-color, var(--b2)) / var(--tw-bg-opacity, 1)) 90%,black);border-color:color-mix(in oklab,oklch(var(--btn-color, var(--b2)) / var(--tw-border-opacity, 1)) 90%,black)}}@supports not (color: oklch(0% 0 0)){#twe-root .btn:hover{background-color:var(--btn-color, var(--fallback-b2));border-color:var(--btn-color, var(--fallback-b2))}}#twe-root .btn.glass:hover{--glass-opacity: 25%;--glass-border-opacity: 15%}#twe-root .btn-ghost:hover{border-color:transparent}@supports (color: oklch(0% 0 0)){#twe-root .btn-ghost:hover{background-color:var(--fallback-bc,oklch(var(--bc)/.2))}}#twe-root .btn-outline.btn-primary:hover{--tw-text-opacity: 1;color:var(--fallback-pc,oklch(var(--pc)/var(--tw-text-opacity)))}@supports (color: color-mix(in oklab,black,black)){#twe-root .btn-outline.btn-primary:hover{background-color:color-mix(in oklab,var(--fallback-p,oklch(var(--p)/1)) 90%,black);border-color:color-mix(in oklab,var(--fallback-p,oklch(var(--p)/1)) 90%,black)}}#twe-root .btn-outline.btn-secondary:hover{--tw-text-opacity: 1;color:var(--fallback-sc,oklch(var(--sc)/var(--tw-text-opacity)))}@supports (color: color-mix(in oklab,black,black)){#twe-root .btn-outline.btn-secondary:hover{background-color:color-mix(in oklab,var(--fallback-s,oklch(var(--s)/1)) 90%,black);border-color:color-mix(in oklab,var(--fallback-s,oklch(var(--s)/1)) 90%,black)}}#twe-root .btn-outline.btn-warning:hover{--tw-text-opacity: 1;color:var(--fallback-wac,oklch(var(--wac)/var(--tw-text-opacity)))}@supports (color: color-mix(in oklab,black,black)){#twe-root .btn-outline.btn-warning:hover{background-color:color-mix(in oklab,var(--fallback-wa,oklch(var(--wa)/1)) 90%,black);border-color:color-mix(in oklab,var(--fallback-wa,oklch(var(--wa)/1)) 90%,black)}}#twe-root .btn-disabled:hover,#twe-root .btn[disabled]:hover,#twe-root .btn:disabled:hover{--tw-border-opacity: 0;background-color:var(--fallback-n,oklch(var(--n)/var(--tw-bg-opacity)));--tw-bg-opacity: .2;color:var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)));--tw-text-opacity: .2}@supports (color: color-mix(in oklab,black,black)){#twe-root .btn:is(input[type=checkbox]:checked):hover,#twe-root .btn:is(input[type=radio]:checked):hover{background-color:color-mix(in oklab,var(--fallback-p,oklch(var(--p)/1)) 90%,black);border-color:color-mix(in oklab,var(--fallback-p,oklch(var(--p)/1)) 90%,black)}}#twe-root .dropdown.dropdown-hover:hover .dropdown-content{--tw-scale-x: 1;--tw-scale-y: 1;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}#twe-root :where(.menu li:not(.menu-title,.disabled)>*:not(ul,details,.menu-title)):not(.active,.btn):hover,#twe-root :where(.menu li:not(.menu-title,.disabled)>details>summary:not(.menu-title)):not(.active,.btn):hover{cursor:pointer;outline:2px solid transparent;outline-offset:2px}@supports (color: oklch(0% 0 0)){#twe-root :where(.menu li:not(.menu-title,.disabled)>*:not(ul,details,.menu-title)):not(.active,.btn):hover,#twe-root :where(.menu li:not(.menu-title,.disabled)>details>summary:not(.menu-title)):not(.active,.btn):hover{background-color:var(--fallback-bc,oklch(var(--bc)/.1))}}}#twe-root .dropdown:is(details) summary::-webkit-details-marker{display:none}#twe-root .footer{display:grid;width:100%;grid-auto-flow:row;place-items:start;-moz-column-gap:16px;column-gap:16px;row-gap:40px;font-size:14px;line-height:20px}#twe-root .footer>*{display:grid;place-items:start;gap:8px}@media (min-width: 48rem){#twe-root .footer{grid-auto-flow:column}#twe-root .footer-center{grid-auto-flow:row dense}}#twe-root .label{display:flex;-webkit-user-select:none;-moz-user-select:none;user-select:none;align-items:center;justify-content:space-between;padding:8px 4px}#twe-root .input{flex-shrink:1;-webkit-appearance:none;-moz-appearance:none;appearance:none;height:48px;padding-left:16px;padding-right:16px;font-size:16px;line-height:2;line-height:24px;border-radius:var(--rounded-btn, 8px);border-width:1px;border-color:transparent;--tw-bg-opacity: 1;background-color:var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)))}#twe-root .input[type=number]::-webkit-inner-spin-button,#twe-root .input-md[type=number]::-webkit-inner-spin-button{margin-top:-16px;margin-bottom:-16px;margin-inline-end:-16px}#twe-root .input-xs[type=number]::-webkit-inner-spin-button{margin-top:-4px;margin-bottom:-4px;margin-inline-end:-0px}#twe-root .input-sm[type=number]::-webkit-inner-spin-button{margin-top:0;margin-bottom:0;margin-inline-end:-0px}#twe-root .join{display:inline-flex;align-items:stretch;border-radius:var(--rounded-btn, 8px)}#twe-root .join :where(.join-item){border-start-end-radius:0;border-end-end-radius:0;border-end-start-radius:0;border-start-start-radius:0}#twe-root .join .join-item:not(:first-child):not(:last-child),#twe-root .join *:not(:first-child):not(:last-child) .join-item{border-start-end-radius:0;border-end-end-radius:0;border-end-start-radius:0;border-start-start-radius:0}#twe-root .join .join-item:first-child:not(:last-child),#twe-root .join *:first-child:not(:last-child) .join-item{border-start-end-radius:0;border-end-end-radius:0}#twe-root .join .dropdown .join-item:first-child:not(:last-child),#twe-root .join *:first-child:not(:last-child) .dropdown .join-item{border-start-end-radius:inherit;border-end-end-radius:inherit}#twe-root .join :where(.join-item:first-child:not(:last-child)),#twe-root .join :where(*:first-child:not(:last-child) .join-item){border-end-start-radius:inherit;border-start-start-radius:inherit}#twe-root .join .join-item:last-child:not(:first-child),#twe-root .join *:last-child:not(:first-child) .join-item{border-end-start-radius:0;border-start-start-radius:0}#twe-root .join :where(.join-item:last-child:not(:first-child)),#twe-root .join :where(*:last-child:not(:first-child) .join-item){border-start-end-radius:inherit;border-end-end-radius:inherit}@supports not selector(:has(*)){#twe-root :where(.join *){border-radius:inherit}}@supports selector(:has(*)){#twe-root :where(.join *:has(.join-item)){border-radius:inherit}}#twe-root .link{cursor:pointer;text-decoration-line:underline}#twe-root .menu{display:flex;flex-direction:column;flex-wrap:wrap;font-size:14px;line-height:20px;padding:8px}#twe-root .menu :where(li ul){position:relative;white-space:nowrap;margin-inline-start:16px;padding-inline-start:8px}#twe-root .menu :where(li:not(.menu-title)>*:not(ul,details,.menu-title,.btn)),#twe-root .menu :where(li:not(.menu-title)>details>summary:not(.menu-title)){display:grid;grid-auto-flow:column;align-content:flex-start;align-items:center;gap:8px;grid-auto-columns:minmax(auto,max-content) auto max-content;-webkit-user-select:none;-moz-user-select:none;user-select:none}#twe-root .menu li.disabled{cursor:not-allowed;-webkit-user-select:none;-moz-user-select:none;user-select:none;color:var(--fallback-bc,oklch(var(--bc)/.3))}#twe-root .menu :where(li>.menu-dropdown:not(.menu-dropdown-show)){display:none}#twe-root :where(.menu li){position:relative;display:flex;flex-shrink:0;flex-direction:column;flex-wrap:wrap;align-items:stretch}#twe-root :where(.menu li) .badge{justify-self:end}#twe-root .modal{pointer-events:none;position:fixed;top:0;right:0;bottom:0;left:0;margin:0;display:grid;height:100%;max-height:none;width:100%;max-width:none;justify-items:center;padding:0;opacity:0;overscroll-behavior:contain;z-index:999;background-color:transparent;color:inherit;transition-duration:.2s;transition-timing-function:cubic-bezier(0,0,.2,1);transition-property:transform,opacity,visibility;overflow-y:hidden}#twe-root :where(.modal){align-items:center}#twe-root .modal-open,#twe-root .modal:target,#twe-root .modal-toggle:checked+.modal,#twe-root .modal[open]{pointer-events:auto;visibility:visible;opacity:1}#twe-root:has(:is(.modal-open,.modal:target,.modal-toggle:checked+.modal,.modal[open])){overflow:hidden;scrollbar-gutter:stable}#twe-root .progress{position:relative;width:100%;-webkit-appearance:none;-moz-appearance:none;appearance:none;overflow:hidden;height:8px;border-radius:var(--rounded-box, 16px);background-color:var(--fallback-bc,oklch(var(--bc)/.2))}#twe-root .select{display:inline-flex;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;user-select:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;height:48px;min-height:48px;padding-inline-start:16px;padding-inline-end:40px;font-size:14px;line-height:20px;line-height:2;border-radius:var(--rounded-btn, 8px);border-width:1px;border-color:transparent;--tw-bg-opacity: 1;background-color:var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)));background-image:linear-gradient(45deg,transparent 50%,currentColor 50%),linear-gradient(135deg,currentColor 50%,transparent 50%);background-position:calc(100% - 20px) calc(1px + 50%),calc(100% - 16.1px) calc(1px + 50%);background-size:4px 4px,4px 4px;background-repeat:no-repeat}#twe-root .select[multiple]{height:auto}#twe-root .\\!table{position:relative!important;width:100%!important;border-radius:var(--rounded-box, 16px)!important;text-align:left!important;font-size:14px!important;line-height:20px!important}#twe-root .table{position:relative;width:100%;border-radius:var(--rounded-box, 16px);text-align:left;font-size:14px;line-height:20px}#twe-root .\\!table :where(.table-pin-rows thead tr){position:sticky!important;top:0!important;z-index:1!important;--tw-bg-opacity: 1 !important;background-color:var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)))!important}#twe-root .table :where(.table-pin-rows thead tr){position:sticky;top:0;z-index:1;--tw-bg-opacity: 1;background-color:var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)))}#twe-root .\\!table :where(.table-pin-rows tfoot tr){position:sticky!important;bottom:0!important;z-index:1!important;--tw-bg-opacity: 1 !important;background-color:var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)))!important}#twe-root .table :where(.table-pin-rows tfoot tr){position:sticky;bottom:0;z-index:1;--tw-bg-opacity: 1;background-color:var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)))}#twe-root .\\!table :where(.table-pin-cols tr th){position:sticky!important;left:0!important;right:0!important;--tw-bg-opacity: 1 !important;background-color:var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)))!important}#twe-root .table :where(.table-pin-cols tr th){position:sticky;left:0;right:0;--tw-bg-opacity: 1;background-color:var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)))}#twe-root .table-zebra tbody tr:nth-child(2n) :where(.table-pin-cols tr th){--tw-bg-opacity: 1;background-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-bg-opacity)))}#twe-root .timeline{position:relative;display:flex}#twe-root :where(.timeline>li){position:relative;display:grid;flex-shrink:0;align-items:center;grid-template-rows:var(--timeline-row-start, minmax(0, 1fr)) auto var( --timeline-row-end, minmax(0, 1fr) );grid-template-columns:var(--timeline-col-start, minmax(0, 1fr)) auto var( --timeline-col-end, minmax(0, 1fr) )}#twe-root .timeline>li>hr{width:100%;border-width:0px}#twe-root :where(.timeline>li>hr):first-child{grid-column-start:1;grid-row-start:2}#twe-root :where(.timeline>li>hr):last-child{grid-column-start:3;grid-column-end:none;grid-row-start:2;grid-row-end:auto}#twe-root .toggle{flex-shrink:0;--tglbg: var(--fallback-b1,oklch(var(--b1)/1));--handleoffset: 24px;--handleoffsetcalculator: calc(var(--handleoffset) * -1);--togglehandleborder: 0 0;height:24px;width:48px;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;border-radius:var(--rounded-badge, 30.4px);border-width:1px;border-color:currentColor;background-color:currentColor;color:var(--fallback-bc,oklch(var(--bc)/.5));transition:background,box-shadow var(--animation-input, .2s) ease-out;box-shadow:var(--handleoffsetcalculator) 0 0 2px var(--tglbg) inset,0 0 0 2px var(--tglbg) inset,var(--togglehandleborder)}#twe-root .alert-error{border-color:var(--fallback-er,oklch(var(--er)/.2));--tw-text-opacity: 1;color:var(--fallback-erc,oklch(var(--erc)/var(--tw-text-opacity)));--alert-bg: var(--fallback-er,oklch(var(--er)/1));--alert-bg-mix: var(--fallback-b1,oklch(var(--b1)/1))}#twe-root .badge-accent{--tw-border-opacity: 1;border-color:var(--fallback-a,oklch(var(--a)/var(--tw-border-opacity)));--tw-bg-opacity: 1;background-color:var(--fallback-a,oklch(var(--a)/var(--tw-bg-opacity)));--tw-text-opacity: 1;color:var(--fallback-ac,oklch(var(--ac)/var(--tw-text-opacity)))}#twe-root .badge-outline.badge-accent{--tw-text-opacity: 1;color:var(--fallback-a,oklch(var(--a)/var(--tw-text-opacity)))}#twe-root .btm-nav>*:where(.active){border-top-width:2px;--tw-bg-opacity: 1;background-color:var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)))}#twe-root .btm-nav>*.disabled,#twe-root .btm-nav>*[disabled]{pointer-events:none;--tw-border-opacity: 0;background-color:var(--fallback-n,oklch(var(--n)/var(--tw-bg-opacity)));--tw-bg-opacity: .1;color:var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)));--tw-text-opacity: .2}#twe-root .btm-nav>* .label{font-size:16px;line-height:24px}@media (prefers-reduced-motion: no-preference){#twe-root .btn{animation:button-pop var(--animation-btn, .25s) ease-out}}#twe-root .btn:active:hover,#twe-root .btn:active:focus{animation:button-pop 0s ease-out;transform:scale(var(--btn-focus-scale, .97))}@supports not (color: oklch(0% 0 0)){#twe-root .btn{background-color:var(--btn-color, var(--fallback-b2));border-color:var(--btn-color, var(--fallback-b2))}#twe-root .btn-primary{--btn-color: var(--fallback-p)}#twe-root .btn-secondary{--btn-color: var(--fallback-s)}#twe-root .btn-neutral{--btn-color: var(--fallback-n)}#twe-root .btn-warning{--btn-color: var(--fallback-wa)}}@supports (color: color-mix(in oklab,black,black)){#twe-root .btn-outline.btn-primary.btn-active{background-color:color-mix(in oklab,var(--fallback-p,oklch(var(--p)/1)) 90%,black);border-color:color-mix(in oklab,var(--fallback-p,oklch(var(--p)/1)) 90%,black)}#twe-root .btn-outline.btn-secondary.btn-active{background-color:color-mix(in oklab,var(--fallback-s,oklch(var(--s)/1)) 90%,black);border-color:color-mix(in oklab,var(--fallback-s,oklch(var(--s)/1)) 90%,black)}#twe-root .btn-outline.btn-warning.btn-active{background-color:color-mix(in oklab,var(--fallback-wa,oklch(var(--wa)/1)) 90%,black);border-color:color-mix(in oklab,var(--fallback-wa,oklch(var(--wa)/1)) 90%,black)}}#twe-root .btn:focus-visible{outline-style:solid;outline-width:2px;outline-offset:2px}#twe-root .btn-primary{--tw-text-opacity: 1;color:var(--fallback-pc,oklch(var(--pc)/var(--tw-text-opacity)));outline-color:var(--fallback-p,oklch(var(--p)/1))}@supports (color: oklch(0% 0 0)){#twe-root .btn-primary{--btn-color: var(--p)}#twe-root .btn-secondary{--btn-color: var(--s)}#twe-root .btn-neutral{--btn-color: var(--n)}#twe-root .btn-warning{--btn-color: var(--wa)}}#twe-root .btn-secondary{--tw-text-opacity: 1;color:var(--fallback-sc,oklch(var(--sc)/var(--tw-text-opacity)));outline-color:var(--fallback-s,oklch(var(--s)/1))}#twe-root .btn-neutral{--tw-text-opacity: 1;color:var(--fallback-nc,oklch(var(--nc)/var(--tw-text-opacity)));outline-color:var(--fallback-n,oklch(var(--n)/1))}#twe-root .btn-warning{--tw-text-opacity: 1;color:var(--fallback-wac,oklch(var(--wac)/var(--tw-text-opacity)));outline-color:var(--fallback-wa,oklch(var(--wa)/1))}#twe-root .btn.glass{--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow);outline-color:currentColor}#twe-root .btn.glass.btn-active{--glass-opacity: 25%;--glass-border-opacity: 15%}#twe-root .btn-ghost{border-width:1px;border-color:transparent;background-color:transparent;color:currentColor;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow);outline-color:currentColor}#twe-root .btn-ghost.btn-active{border-color:transparent;background-color:var(--fallback-bc,oklch(var(--bc)/.2))}#twe-root .btn-outline.btn-primary{--tw-text-opacity: 1;color:var(--fallback-p,oklch(var(--p)/var(--tw-text-opacity)))}#twe-root .btn-outline.btn-primary.btn-active{--tw-text-opacity: 1;color:var(--fallback-pc,oklch(var(--pc)/var(--tw-text-opacity)))}#twe-root .btn-outline.btn-secondary{--tw-text-opacity: 1;color:var(--fallback-s,oklch(var(--s)/var(--tw-text-opacity)))}#twe-root .btn-outline.btn-secondary.btn-active{--tw-text-opacity: 1;color:var(--fallback-sc,oklch(var(--sc)/var(--tw-text-opacity)))}#twe-root .btn-outline.btn-warning{--tw-text-opacity: 1;color:var(--fallback-wa,oklch(var(--wa)/var(--tw-text-opacity)))}#twe-root .btn-outline.btn-warning.btn-active{--tw-text-opacity: 1;color:var(--fallback-wac,oklch(var(--wac)/var(--tw-text-opacity)))}#twe-root .btn.btn-disabled,#twe-root .btn[disabled],#twe-root .btn:disabled{--tw-border-opacity: 0;background-color:var(--fallback-n,oklch(var(--n)/var(--tw-bg-opacity)));--tw-bg-opacity: .2;color:var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)));--tw-text-opacity: .2}#twe-root .btn:is(input[type=checkbox]:checked),#twe-root .btn:is(input[type=radio]:checked){--tw-border-opacity: 1;border-color:var(--fallback-p,oklch(var(--p)/var(--tw-border-opacity)));--tw-bg-opacity: 1;background-color:var(--fallback-p,oklch(var(--p)/var(--tw-bg-opacity)));--tw-text-opacity: 1;color:var(--fallback-pc,oklch(var(--pc)/var(--tw-text-opacity)))}#twe-root .btn:is(input[type=checkbox]:checked):focus-visible,#twe-root .btn:is(input[type=radio]:checked):focus-visible{outline-color:var(--fallback-p,oklch(var(--p)/1))}@keyframes button-pop{0%{transform:scale(var(--btn-focus-scale, .98))}40%{transform:scale(1.02)}to{transform:scale(1)}}#twe-root .card :where(figure:first-child){overflow:hidden;border-start-start-radius:inherit;border-start-end-radius:inherit;border-end-start-radius:unset;border-end-end-radius:unset}#twe-root .card :where(figure:last-child){overflow:hidden;border-start-start-radius:unset;border-start-end-radius:unset;border-end-start-radius:inherit;border-end-end-radius:inherit}#twe-root .card:focus-visible{outline:2px solid currentColor;outline-offset:2px}#twe-root .card.bordered{border-width:1px;--tw-border-opacity: 1;border-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-border-opacity)))}#twe-root .card.compact .card-body{padding:16px;font-size:14px;line-height:20px}#twe-root .card.image-full :where(figure){overflow:hidden;border-radius:inherit}#twe-root .checkbox:focus{box-shadow:none}#twe-root .checkbox:focus-visible{outline-style:solid;outline-width:2px;outline-offset:2px;outline-color:var(--fallback-bc,oklch(var(--bc)/1))}#twe-root .checkbox:disabled{border-width:0px;cursor:not-allowed;border-color:transparent;--tw-bg-opacity: 1;background-color:var(--fallback-bc,oklch(var(--bc)/var(--tw-bg-opacity)));opacity:.2}#twe-root .checkbox:checked,#twe-root .checkbox[aria-checked=true]{background-repeat:no-repeat;animation:checkmark var(--animation-input, .2s) ease-out;background-color:var(--chkbg);background-image:linear-gradient(-45deg,transparent 65%,var(--chkbg) 65.99%),linear-gradient(45deg,transparent 75%,var(--chkbg) 75.99%),linear-gradient(-45deg,var(--chkbg) 40%,transparent 40.99%),linear-gradient(45deg,var(--chkbg) 30%,var(--chkfg) 30.99%,var(--chkfg) 40%,transparent 40.99%),linear-gradient(-45deg,var(--chkfg) 50%,var(--chkbg) 50.99%)}#twe-root .checkbox:indeterminate{--tw-bg-opacity: 1;background-color:var(--fallback-bc,oklch(var(--bc)/var(--tw-bg-opacity)));background-repeat:no-repeat;animation:checkmark var(--animation-input, .2s) ease-out;background-image:linear-gradient(90deg,transparent 80%,var(--chkbg) 80%),linear-gradient(-90deg,transparent 80%,var(--chkbg) 80%),linear-gradient(0deg,var(--chkbg) 43%,var(--chkfg) 43%,var(--chkfg) 57%,var(--chkbg) 57%)}#twe-root .checkbox-accent{--chkbg: var(--fallback-a,oklch(var(--a)/1));--chkfg: var(--fallback-ac,oklch(var(--ac)/1));--tw-border-opacity: 1;border-color:var(--fallback-a,oklch(var(--a)/var(--tw-border-opacity)))}#twe-root .checkbox-accent:focus-visible{outline-color:var(--fallback-a,oklch(var(--a)/1))}#twe-root .checkbox-accent:checked,#twe-root .checkbox-accent[aria-checked=true]{--tw-border-opacity: 1;border-color:var(--fallback-a,oklch(var(--a)/var(--tw-border-opacity)));--tw-bg-opacity: 1;background-color:var(--fallback-a,oklch(var(--a)/var(--tw-bg-opacity)));--tw-text-opacity: 1;color:var(--fallback-ac,oklch(var(--ac)/var(--tw-text-opacity)))}@keyframes checkmark{0%{background-position-y:5px}50%{background-position-y:-2px}to{background-position-y:0}}#twe-root .divider:not(:empty){gap:16px}#twe-root .dropdown.dropdown-open .dropdown-content,#twe-root .dropdown:focus .dropdown-content,#twe-root .dropdown:focus-within .dropdown-content{--tw-scale-x: 1;--tw-scale-y: 1;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}#twe-root .label-text{font-size:14px;line-height:20px;--tw-text-opacity: 1;color:var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)))}#twe-root .input input{--tw-bg-opacity: 1;background-color:var(--fallback-p,oklch(var(--p)/var(--tw-bg-opacity)));background-color:transparent}#twe-root .input input:focus{outline:2px solid transparent;outline-offset:2px}#twe-root .input[list]::-webkit-calendar-picker-indicator{line-height:1em}#twe-root .input-bordered{border-color:var(--fallback-bc,oklch(var(--bc)/.2))}#twe-root .input:focus,#twe-root .input:focus-within{box-shadow:none;border-color:var(--fallback-bc,oklch(var(--bc)/.2));outline-style:solid;outline-width:2px;outline-offset:2px;outline-color:var(--fallback-bc,oklch(var(--bc)/.2))}#twe-root .input:has(>input[disabled]),#twe-root .input-disabled,#twe-root .input:disabled,#twe-root .input[disabled]{cursor:not-allowed;--tw-border-opacity: 1;border-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-border-opacity)));--tw-bg-opacity: 1;background-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-bg-opacity)));color:var(--fallback-bc,oklch(var(--bc)/.4))}#twe-root .input:has(>input[disabled])::-moz-placeholder,#twe-root .input-disabled::-moz-placeholder,#twe-root .input:disabled::-moz-placeholder,#twe-root .input[disabled]::-moz-placeholder{color:var(--fallback-bc,oklch(var(--bc)/var(--tw-placeholder-opacity)));--tw-placeholder-opacity: .2}#twe-root .input:has(>input[disabled])::placeholder,#twe-root .input-disabled::placeholder,#twe-root .input:disabled::placeholder,#twe-root .input[disabled]::placeholder{color:var(--fallback-bc,oklch(var(--bc)/var(--tw-placeholder-opacity)));--tw-placeholder-opacity: .2}#twe-root .input:has(>input[disabled])>input[disabled]{cursor:not-allowed}#twe-root .input::-webkit-date-and-time-value{text-align:inherit}#twe-root .join>:where(*:not(:first-child)){margin-top:0;margin-bottom:0;margin-inline-start:-1px}#twe-root .join>:where(*:not(:first-child)):is(.btn){margin-inline-start:calc(var(--border-btn) * -1)}#twe-root .join-item:focus{isolation:isolate}#twe-root .link:focus{outline:2px solid transparent;outline-offset:2px}#twe-root .link:focus-visible{outline:2px solid currentColor;outline-offset:2px}#twe-root .loading{pointer-events:none;display:inline-block;aspect-ratio:1 / 1;width:24px;background-color:currentColor;-webkit-mask-size:100%;mask-size:100%;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;-webkit-mask-image:url("data:image/svg+xml,%3Csvg width='24' height='24' stroke='black' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform-origin='center'%3E%3Ccircle cx='12' cy='12' r='9.5' fill='none' stroke-width='3' stroke-linecap='round'%3E%3CanimateTransform attributeName='transform' type='rotate' from='0 12 12' to='360 12 12' dur='2s' repeatCount='indefinite'/%3E%3Canimate attributeName='stroke-dasharray' values='0,150;42,150;42,150' keyTimes='0;0.475;1' dur='1.5s' repeatCount='indefinite'/%3E%3Canimate attributeName='stroke-dashoffset' values='0;-16;-59' keyTimes='0;0.475;1' dur='1.5s' repeatCount='indefinite'/%3E%3C/circle%3E%3C/g%3E%3C/svg%3E");mask-image:url("data:image/svg+xml,%3Csvg width='24' height='24' stroke='black' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform-origin='center'%3E%3Ccircle cx='12' cy='12' r='9.5' fill='none' stroke-width='3' stroke-linecap='round'%3E%3CanimateTransform attributeName='transform' type='rotate' from='0 12 12' to='360 12 12' dur='2s' repeatCount='indefinite'/%3E%3Canimate attributeName='stroke-dasharray' values='0,150;42,150;42,150' keyTimes='0;0.475;1' dur='1.5s' repeatCount='indefinite'/%3E%3Canimate attributeName='stroke-dashoffset' values='0;-16;-59' keyTimes='0;0.475;1' dur='1.5s' repeatCount='indefinite'/%3E%3C/circle%3E%3C/g%3E%3C/svg%3E")}#twe-root .loading-spinner{-webkit-mask-image:url("data:image/svg+xml,%3Csvg width='24' height='24' stroke='black' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform-origin='center'%3E%3Ccircle cx='12' cy='12' r='9.5' fill='none' stroke-width='3' stroke-linecap='round'%3E%3CanimateTransform attributeName='transform' type='rotate' from='0 12 12' to='360 12 12' dur='2s' repeatCount='indefinite'/%3E%3Canimate attributeName='stroke-dasharray' values='0,150;42,150;42,150' keyTimes='0;0.475;1' dur='1.5s' repeatCount='indefinite'/%3E%3Canimate attributeName='stroke-dashoffset' values='0;-16;-59' keyTimes='0;0.475;1' dur='1.5s' repeatCount='indefinite'/%3E%3C/circle%3E%3C/g%3E%3C/svg%3E");mask-image:url("data:image/svg+xml,%3Csvg width='24' height='24' stroke='black' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform-origin='center'%3E%3Ccircle cx='12' cy='12' r='9.5' fill='none' stroke-width='3' stroke-linecap='round'%3E%3CanimateTransform attributeName='transform' type='rotate' from='0 12 12' to='360 12 12' dur='2s' repeatCount='indefinite'/%3E%3Canimate attributeName='stroke-dasharray' values='0,150;42,150;42,150' keyTimes='0;0.475;1' dur='1.5s' repeatCount='indefinite'/%3E%3Canimate attributeName='stroke-dashoffset' values='0;-16;-59' keyTimes='0;0.475;1' dur='1.5s' repeatCount='indefinite'/%3E%3C/circle%3E%3C/g%3E%3C/svg%3E")}#twe-root :where(.menu li:empty){--tw-bg-opacity: 1;background-color:var(--fallback-bc,oklch(var(--bc)/var(--tw-bg-opacity)));opacity:.1;margin:8px 16px;height:1px}#twe-root .menu :where(li ul):before{position:absolute;bottom:12px;inset-inline-start:0px;top:12px;width:1px;--tw-bg-opacity: 1;background-color:var(--fallback-bc,oklch(var(--bc)/var(--tw-bg-opacity)));opacity:.1;content:""}#twe-root .menu :where(li:not(.menu-title)>*:not(ul,details,.menu-title,.btn)),#twe-root .menu :where(li:not(.menu-title)>details>summary:not(.menu-title)){border-radius:var(--rounded-btn, 8px);padding:8px 16px;text-align:start;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-timing-function:cubic-bezier(0,0,.2,1);transition-duration:.2s;text-wrap:balance}#twe-root :where(.menu li:not(.menu-title,.disabled)>*:not(ul,details,.menu-title)):not(summary,.active,.btn).focus,#twe-root :where(.menu li:not(.menu-title,.disabled)>*:not(ul,details,.menu-title)):not(summary,.active,.btn):focus,#twe-root :where(.menu li:not(.menu-title,.disabled)>*:not(ul,details,.menu-title)):is(summary):not(.active,.btn):focus-visible,#twe-root :where(.menu li:not(.menu-title,.disabled)>details>summary:not(.menu-title)):not(summary,.active,.btn).focus,#twe-root :where(.menu li:not(.menu-title,.disabled)>details>summary:not(.menu-title)):not(summary,.active,.btn):focus,#twe-root :where(.menu li:not(.menu-title,.disabled)>details>summary:not(.menu-title)):is(summary):not(.active,.btn):focus-visible{cursor:pointer;background-color:var(--fallback-bc,oklch(var(--bc)/.1));--tw-text-opacity: 1;color:var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)));outline:2px solid transparent;outline-offset:2px}#twe-root .menu li>*:not(ul,.menu-title,details,.btn):active,#twe-root .menu li>*:not(ul,.menu-title,details,.btn).active,#twe-root .menu li>details>summary:active{--tw-bg-opacity: 1;background-color:var(--fallback-n,oklch(var(--n)/var(--tw-bg-opacity)));--tw-text-opacity: 1;color:var(--fallback-nc,oklch(var(--nc)/var(--tw-text-opacity)))}#twe-root .menu :where(li>details>summary)::-webkit-details-marker{display:none}#twe-root .menu :where(li>details>summary):after,#twe-root .menu :where(li>.menu-dropdown-toggle):after{justify-self:end;display:block;margin-top:-8px;height:8px;width:8px;transform:rotate(45deg);transition-property:transform,margin-top;transition-duration:.3s;transition-timing-function:cubic-bezier(.4,0,.2,1);content:"";transform-origin:75% 75%;box-shadow:2px 2px;pointer-events:none}#twe-root .menu :where(li>details[open]>summary):after,#twe-root .menu :where(li>.menu-dropdown-toggle.menu-dropdown-show):after{transform:rotate(225deg);margin-top:0}#twe-root .mockup-phone .display{overflow:hidden;border-radius:40px;margin-top:-25px}#twe-root .mockup-browser .mockup-browser-toolbar .input{position:relative;margin-left:auto;margin-right:auto;display:block;height:28px;width:384px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;--tw-bg-opacity: 1;background-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-bg-opacity)));padding-left:32px;direction:ltr}#twe-root .mockup-browser .mockup-browser-toolbar .input:before{content:"";position:absolute;left:8px;top:50%;aspect-ratio:1 / 1;height:12px;--tw-translate-y: -50%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));border-radius:9999px;border-width:2px;border-color:currentColor;opacity:.6}#twe-root .mockup-browser .mockup-browser-toolbar .input:after{content:"";position:absolute;left:20px;top:50%;height:8px;--tw-translate-y: 25%;--tw-rotate: -45deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));border-radius:9999px;border-width:1px;border-color:currentColor;opacity:.6}#twe-root .modal:not(dialog:not(.modal-open)),#twe-root .modal::backdrop{background-color:#0006;animation:modal-pop .2s ease-out}#twe-root .modal-open .modal-box,#twe-root .modal-toggle:checked+.modal .modal-box,#twe-root .modal:target .modal-box,#twe-root .modal[open] .modal-box{--tw-translate-y: 0px;--tw-scale-x: 1;--tw-scale-y: 1;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}@keyframes modal-pop{0%{opacity:0}}#twe-root .progress::-moz-progress-bar{border-radius:var(--rounded-box, 16px);background-color:currentColor}#twe-root .progress-primary::-moz-progress-bar{border-radius:var(--rounded-box, 16px);--tw-bg-opacity: 1;background-color:var(--fallback-p,oklch(var(--p)/var(--tw-bg-opacity)))}#twe-root .progress-secondary::-moz-progress-bar{border-radius:var(--rounded-box, 16px);--tw-bg-opacity: 1;background-color:var(--fallback-s,oklch(var(--s)/var(--tw-bg-opacity)))}#twe-root .progress:indeterminate{--progress-color: var(--fallback-bc,oklch(var(--bc)/1));background-image:repeating-linear-gradient(90deg,var(--progress-color) -1%,var(--progress-color) 10%,transparent 10%,transparent 90%);background-size:200%;background-position-x:15%;animation:progress-loading 5s ease-in-out infinite}#twe-root .progress-primary:indeterminate{--progress-color: var(--fallback-p,oklch(var(--p)/1))}#twe-root .progress-secondary:indeterminate{--progress-color: var(--fallback-s,oklch(var(--s)/1))}#twe-root .progress::-webkit-progress-bar{border-radius:var(--rounded-box, 16px);background-color:transparent}#twe-root .progress::-webkit-progress-value{border-radius:var(--rounded-box, 16px);background-color:currentColor}#twe-root .progress-primary::-webkit-progress-value{--tw-bg-opacity: 1;background-color:var(--fallback-p,oklch(var(--p)/var(--tw-bg-opacity)))}#twe-root .progress-secondary::-webkit-progress-value{--tw-bg-opacity: 1;background-color:var(--fallback-s,oklch(var(--s)/var(--tw-bg-opacity)))}#twe-root .progress:indeterminate::-moz-progress-bar{background-color:transparent;background-image:repeating-linear-gradient(90deg,var(--progress-color) -1%,var(--progress-color) 10%,transparent 10%,transparent 90%);background-size:200%;background-position-x:15%;animation:progress-loading 5s ease-in-out infinite}@keyframes progress-loading{50%{background-position-x:-115%}}@keyframes radiomark{0%{box-shadow:0 0 0 12px var(--fallback-b1,oklch(var(--b1)/1)) inset,0 0 0 12px var(--fallback-b1,oklch(var(--b1)/1)) inset}50%{box-shadow:0 0 0 3px var(--fallback-b1,oklch(var(--b1)/1)) inset,0 0 0 3px var(--fallback-b1,oklch(var(--b1)/1)) inset}to{box-shadow:0 0 0 4px var(--fallback-b1,oklch(var(--b1)/1)) inset,0 0 0 4px var(--fallback-b1,oklch(var(--b1)/1)) inset}}@keyframes rating-pop{0%{transform:translateY(-.125em)}40%{transform:translateY(-.125em)}to{transform:translateY(0)}}#twe-root .select-bordered{border-color:var(--fallback-bc,oklch(var(--bc)/.2))}#twe-root .select:focus{box-shadow:none;border-color:var(--fallback-bc,oklch(var(--bc)/.2));outline-style:solid;outline-width:2px;outline-offset:2px;outline-color:var(--fallback-bc,oklch(var(--bc)/.2))}#twe-root .select-disabled,#twe-root .select:disabled,#twe-root .select[disabled]{cursor:not-allowed;--tw-border-opacity: 1;border-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-border-opacity)));--tw-bg-opacity: 1;background-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-bg-opacity)));color:var(--fallback-bc,oklch(var(--bc)/.4))}#twe-root .select-disabled::-moz-placeholder,#twe-root .select:disabled::-moz-placeholder,#twe-root .select[disabled]::-moz-placeholder{color:var(--fallback-bc,oklch(var(--bc)/var(--tw-placeholder-opacity)));--tw-placeholder-opacity: .2}#twe-root .select-disabled::placeholder,#twe-root .select:disabled::placeholder,#twe-root .select[disabled]::placeholder{color:var(--fallback-bc,oklch(var(--bc)/var(--tw-placeholder-opacity)));--tw-placeholder-opacity: .2}#twe-root .select-multiple,#twe-root .select[multiple],#twe-root .select[size].select:not([size="1"]){background-image:none;padding-right:16px}#twe-root [dir=rtl] .select{background-position:calc(0% + 12px) calc(1px + 50%),calc(0% + 16px) calc(1px + 50%)}@keyframes skeleton{0%{background-position:150%}to{background-position:-50%}}#twe-root .\\!table:where([dir=rtl],[dir=rtl] *){text-align:right!important}#twe-root .table:where([dir=rtl],[dir=rtl] *){text-align:right}#twe-root .\\!table :where(th,td){padding:12px 16px!important;vertical-align:middle!important}#twe-root .table :where(th,td){padding:12px 16px;vertical-align:middle}#twe-root .table tr.active,#twe-root .table tr.active:nth-child(2n),#twe-root .table-zebra tbody tr:nth-child(2n){--tw-bg-opacity: 1;background-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-bg-opacity)))}#twe-root .\\!table tr.active,#twe-root .\\!table tr.active:nth-child(2n){--tw-bg-opacity: 1 !important;background-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-bg-opacity)))!important}#twe-root .table-zebra tr.active,#twe-root .table-zebra tr.active:nth-child(2n),#twe-root .table-zebra-zebra tbody tr:nth-child(2n){--tw-bg-opacity: 1;background-color:var(--fallback-b3,oklch(var(--b3)/var(--tw-bg-opacity)))}#twe-root .\\!table :where(thead tr,tbody tr:not(:last-child),tbody tr:first-child:last-child){border-bottom-width:1px!important;--tw-border-opacity: 1 !important;border-bottom-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-border-opacity)))!important}#twe-root .table :where(thead tr,tbody tr:not(:last-child),tbody tr:first-child:last-child){border-bottom-width:1px;--tw-border-opacity: 1;border-bottom-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-border-opacity)))}#twe-root .\\!table :where(thead,tfoot){white-space:nowrap!important;font-size:12px!important;line-height:16px!important;font-weight:700!important;color:var(--fallback-bc,oklch(var(--bc)/.6))!important}#twe-root .table :where(thead,tfoot){white-space:nowrap;font-size:12px;line-height:16px;font-weight:700;color:var(--fallback-bc,oklch(var(--bc)/.6))}#twe-root .\\!table :where(tfoot){border-top-width:1px!important;--tw-border-opacity: 1 !important;border-top-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-border-opacity)))!important}#twe-root .table :where(tfoot){border-top-width:1px;--tw-border-opacity: 1;border-top-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-border-opacity)))}#twe-root .timeline hr{height:4px}#twe-root :where(.timeline hr){--tw-bg-opacity: 1;background-color:var(--fallback-b3,oklch(var(--b3)/var(--tw-bg-opacity)))}#twe-root :where(.timeline:has(.timeline-middle) hr):first-child{border-start-end-radius:var(--rounded-badge, 30.4px);border-end-end-radius:var(--rounded-badge, 30.4px);border-start-start-radius:0px;border-end-start-radius:0px}#twe-root :where(.timeline:has(.timeline-middle) hr):last-child{border-start-start-radius:var(--rounded-badge, 30.4px);border-end-start-radius:var(--rounded-badge, 30.4px);border-start-end-radius:0px;border-end-end-radius:0px}#twe-root :where(.timeline:not(:has(.timeline-middle)) :first-child hr:last-child){border-start-start-radius:var(--rounded-badge, 30.4px);border-end-start-radius:var(--rounded-badge, 30.4px);border-start-end-radius:0px;border-end-end-radius:0px}#twe-root :where(.timeline:not(:has(.timeline-middle)) :last-child hr:first-child){border-start-end-radius:var(--rounded-badge, 30.4px);border-end-end-radius:var(--rounded-badge, 30.4px);border-start-start-radius:0px;border-end-start-radius:0px}@keyframes toast-pop{0%{transform:scale(.9);opacity:0}to{transform:scale(1);opacity:1}}#twe-root [dir=rtl] .toggle{--handleoffsetcalculator: calc(var(--handleoffset) * 1)}#twe-root .toggle:focus-visible{outline-style:solid;outline-width:2px;outline-offset:2px;outline-color:var(--fallback-bc,oklch(var(--bc)/.2))}#twe-root .toggle:hover{background-color:currentColor}#twe-root .toggle:checked,#twe-root .toggle[aria-checked=true]{background-image:none;--handleoffsetcalculator: var(--handleoffset);--tw-text-opacity: 1;color:var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)))}#twe-root [dir=rtl] .toggle:checked,#twe-root [dir=rtl] .toggle[aria-checked=true]{--handleoffsetcalculator: calc(var(--handleoffset) * -1)}#twe-root .toggle:indeterminate{--tw-text-opacity: 1;color:var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)));box-shadow:calc(var(--handleoffset) / 2) 0 0 2px var(--tglbg) inset,calc(var(--handleoffset) / -2) 0 0 2px var(--tglbg) inset,0 0 0 2px var(--tglbg) inset}#twe-root [dir=rtl] .toggle:indeterminate{box-shadow:calc(var(--handleoffset) / 2) 0 0 2px var(--tglbg) inset,calc(var(--handleoffset) / -2) 0 0 2px var(--tglbg) inset,0 0 0 2px var(--tglbg) inset}#twe-root .toggle-primary:focus-visible{outline-color:var(--fallback-p,oklch(var(--p)/1))}#twe-root .toggle-primary:checked,#twe-root .toggle-primary[aria-checked=true]{border-color:var(--fallback-p,oklch(var(--p)/var(--tw-border-opacity)));--tw-border-opacity: .1;--tw-bg-opacity: 1;background-color:var(--fallback-p,oklch(var(--p)/var(--tw-bg-opacity)));--tw-text-opacity: 1;color:var(--fallback-pc,oklch(var(--pc)/var(--tw-text-opacity)))}#twe-root .toggle-secondary:focus-visible{outline-color:var(--fallback-s,oklch(var(--s)/1))}#twe-root .toggle-secondary:checked,#twe-root .toggle-secondary[aria-checked=true]{border-color:var(--fallback-s,oklch(var(--s)/var(--tw-border-opacity)));--tw-border-opacity: .1;--tw-bg-opacity: 1;background-color:var(--fallback-s,oklch(var(--s)/var(--tw-bg-opacity)));--tw-text-opacity: 1;color:var(--fallback-sc,oklch(var(--sc)/var(--tw-text-opacity)))}#twe-root .toggle:disabled{cursor:not-allowed;--tw-border-opacity: 1;border-color:var(--fallback-bc,oklch(var(--bc)/var(--tw-border-opacity)));background-color:transparent;opacity:.3;--togglehandleborder: 0 0 0 3px var(--fallback-bc,oklch(var(--bc)/1)) inset, var(--handleoffsetcalculator) 0 0 3px var(--fallback-bc,oklch(var(--bc)/1)) inset}#twe-root .btm-nav-xs>*:where(.active){border-top-width:1px}#twe-root .btm-nav-sm>*:where(.active){border-top-width:2px}#twe-root .btm-nav-md>*:where(.active){border-top-width:2px}#twe-root .btm-nav-lg>*:where(.active){border-top-width:4px}#twe-root .btn-xs{height:24px;min-height:24px;padding-left:8px;padding-right:8px;font-size:12px}#twe-root .btn-sm{height:32px;min-height:32px;padding-left:12px;padding-right:12px;font-size:14px}#twe-root .btn-square:where(.btn-xs){height:24px;width:24px;padding:0}#twe-root .btn-square:where(.btn-sm){height:32px;width:32px;padding:0}#twe-root .btn-circle:where(.btn-xs){height:24px;width:24px;border-radius:9999px;padding:0}#twe-root .btn-circle:where(.btn-sm){height:32px;width:32px;border-radius:9999px;padding:0}#twe-root [type=checkbox].checkbox-sm{height:20px;width:20px}#twe-root .input-xs{height:24px;padding-left:8px;padding-right:8px;font-size:12px;line-height:16px;line-height:1.625}#twe-root .input-sm{height:32px;padding-left:12px;padding-right:12px;font-size:14px;line-height:32px}#twe-root .join.join-vertical{flex-direction:column}#twe-root .join.join-vertical .join-item:first-child:not(:last-child),#twe-root .join.join-vertical *:first-child:not(:last-child) .join-item{border-end-start-radius:0;border-end-end-radius:0;border-start-start-radius:inherit;border-start-end-radius:inherit}#twe-root .join.join-vertical .join-item:last-child:not(:first-child),#twe-root .join.join-vertical *:last-child:not(:first-child) .join-item{border-start-start-radius:0;border-start-end-radius:0;border-end-start-radius:inherit;border-end-end-radius:inherit}#twe-root .join.join-horizontal{flex-direction:row}#twe-root .join.join-horizontal .join-item:first-child:not(:last-child),#twe-root .join.join-horizontal *:first-child:not(:last-child) .join-item{border-end-end-radius:0;border-start-end-radius:0;border-end-start-radius:inherit;border-start-start-radius:inherit}#twe-root .join.join-horizontal .join-item:last-child:not(:first-child),#twe-root .join.join-horizontal *:last-child:not(:first-child) .join-item{border-end-start-radius:0;border-start-start-radius:0;border-end-end-radius:inherit;border-start-end-radius:inherit}#twe-root .select-sm{height:32px;min-height:32px;padding-left:12px;padding-right:32px;font-size:14px;line-height:32px}#twe-root [dir=rtl] .select-sm{padding-left:32px;padding-right:12px}#twe-root .select-xs{height:24px;min-height:24px;padding-left:8px;padding-right:32px;font-size:12px;line-height:16px;line-height:1.625}#twe-root [dir=rtl] .select-xs{padding-left:32px;padding-right:8px}#twe-root .tooltip{position:relative;display:inline-block;--tooltip-offset: calc(100% + 1px + var(--tooltip-tail, 0px))}#twe-root .tooltip:before{position:absolute;pointer-events:none;z-index:1;content:var(--tw-content);--tw-content: attr(data-tip)}#twe-root .tooltip:before,#twe-root .tooltip-top:before{transform:translate(-50%);top:auto;left:50%;right:auto;bottom:var(--tooltip-offset)}#twe-root .tooltip-bottom:before{transform:translate(-50%);top:var(--tooltip-offset);left:50%;right:auto;bottom:auto}#twe-root .card-compact .card-body{padding:16px;font-size:14px;line-height:20px}#twe-root .card-compact .card-title{margin-bottom:4px}#twe-root .join.join-vertical>:where(*:not(:first-child)){margin-left:0;margin-right:0;margin-top:-1px}#twe-root .join.join-vertical>:where(*:not(:first-child)):is(.btn){margin-top:calc(var(--border-btn) * -1)}#twe-root .join.join-horizontal>:where(*:not(:first-child)){margin-top:0;margin-bottom:0;margin-inline-start:-1px}#twe-root .join.join-horizontal>:where(*:not(:first-child)):is(.btn){margin-inline-start:calc(var(--border-btn) * -1);margin-top:0}#twe-root .menu-sm :where(li:not(.menu-title)>*:not(ul,details,.menu-title)),#twe-root .menu-sm :where(li:not(.menu-title)>details>summary:not(.menu-title)){border-radius:var(--rounded-btn, 8px);padding:4px 12px;font-size:14px;line-height:20px}#twe-root .menu-sm .menu-title{padding:8px 12px}#twe-root .table-xs :not(thead):not(tfoot) tr{font-size:12px;line-height:16px}#twe-root .table-xs :where(th,td){padding:4px 8px}#twe-root .tooltip{position:relative;display:inline-block;text-align:center;--tooltip-tail: 3px;--tooltip-color: var(--fallback-n,oklch(var(--n)/1));--tooltip-text-color: var(--fallback-nc,oklch(var(--nc)/1));--tooltip-tail-offset: calc(100% + 1px - var(--tooltip-tail))}#twe-root .tooltip:before,#twe-root .tooltip:after{opacity:0;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-backdrop-filter;transition-delay:.1s;transition-duration:.2s;transition-timing-function:cubic-bezier(.4,0,.2,1)}#twe-root .tooltip:after{position:absolute;content:"";border-style:solid;border-width:var(--tooltip-tail, 0);width:0;height:0;display:block}#twe-root .tooltip:before{max-width:320px;white-space:normal;border-radius:4px;padding:4px 8px;font-size:14px;line-height:20px;background-color:var(--tooltip-color);color:var(--tooltip-text-color);width:-moz-max-content;width:max-content}#twe-root .tooltip.tooltip-open:before{opacity:1;transition-delay:75ms}#twe-root .tooltip.tooltip-open:after{opacity:1;transition-delay:75ms}#twe-root .tooltip:hover:before{opacity:1;transition-delay:75ms}#twe-root .tooltip:hover:after{opacity:1;transition-delay:75ms}#twe-root .tooltip:has(:focus-visible):after,#twe-root .tooltip:has(:focus-visible):before{opacity:1;transition-delay:75ms}#twe-root .tooltip:not([data-tip]):hover:before,#twe-root .tooltip:not([data-tip]):hover:after{visibility:hidden;opacity:0}#twe-root .tooltip:after,#twe-root .tooltip-top:after{transform:translate(-50%);border-color:var(--tooltip-color) transparent transparent transparent;top:auto;left:50%;right:auto;bottom:var(--tooltip-tail-offset)}#twe-root .tooltip-bottom:after{transform:translate(-50%);border-color:transparent transparent var(--tooltip-color) transparent;top:var(--tooltip-tail-offset);left:50%;right:auto;bottom:auto}#twe-root .static{position:static}#twe-root .fixed{position:fixed}#twe-root .absolute{position:absolute}#twe-root .relative{position:relative}#twe-root .inset-0{top:0;right:0;bottom:0;left:0}#twe-root .bottom-0\\.5{bottom:2px}#twe-root .bottom-10{bottom:40px}#twe-root .left-0\\.5{left:2px}#twe-root .left-8{left:32px}#twe-root .left-\\[-15px\\]{left:-15px}#twe-root .right-3{right:12px}#twe-root .top-3{top:12px}#twe-root .top-8{top:32px}#twe-root .top-\\[80\\%\\]{top:80%}#twe-root .z-10{z-index:10}#twe-root .z-50{z-index:50}#twe-root .col-span-3{grid-column:span 3 / span 3}#twe-root .m-0{margin:0}#twe-root .my-3{margin-top:12px;margin-bottom:12px}#twe-root .my-\\[2px\\]{margin-top:2px;margin-bottom:2px}#twe-root .mb-0{margin-bottom:0}#twe-root .mb-1{margin-bottom:4px}#twe-root .mb-2{margin-bottom:8px}#twe-root .mb-3{margin-bottom:12px}#twe-root .ml-0\\.5{margin-left:2px}#twe-root .ml-1{margin-left:4px}#twe-root .ml-2{margin-left:8px}#twe-root .ml-4{margin-left:16px}#twe-root .mr-2{margin-right:8px}#twe-root .mr-3{margin-right:12px}#twe-root .mt-0{margin-top:0}#twe-root .mt-2{margin-top:8px}#twe-root .mt-3{margin-top:12px}#twe-root .mt-6{margin-top:24px}#twe-root .block{display:block}#twe-root .inline{display:inline}#twe-root .flex{display:flex}#twe-root .inline-flex{display:inline-flex}#twe-root .\\!table{display:table!important}#twe-root .table{display:table}#twe-root .grid{display:grid}#twe-root .contents{display:contents}#twe-root .hidden{display:none}#twe-root .h-12{height:48px}#twe-root .h-28{height:112px}#twe-root .h-4{height:16px}#twe-root .h-6{height:24px}#twe-root .h-8{height:32px}#twe-root .h-9{height:36px}#twe-root .h-\\[320px\\]{height:320px}#twe-root .h-full{height:100%}#twe-root .max-h-44{max-height:176px}#twe-root .max-h-\\[400px\\]{max-height:400px}#twe-root .max-h-\\[500px\\]{max-height:500px}#twe-root .max-h-full{max-height:100%}#twe-root .min-h-\\[512px\\]{min-height:512px}#twe-root .w-12{width:48px}#twe-root .w-20{width:80px}#twe-root .w-24{width:96px}#twe-root .w-32{width:128px}#twe-root .w-36{width:144px}#twe-root .w-4{width:16px}#twe-root .w-48{width:192px}#twe-root .w-52{width:208px}#twe-root .w-6{width:24px}#twe-root .w-60{width:240px}#twe-root .w-80{width:320px}#twe-root .w-9{width:36px}#twe-root .w-auto{width:auto}#twe-root .w-full{width:100%}#twe-root .w-max{width:-moz-max-content;width:max-content}#twe-root .max-w-4xl{max-width:896px}#twe-root .max-w-full{max-width:100%}#twe-root .max-w-lg{max-width:512px}#twe-root .max-w-sm{max-width:384px}#twe-root .max-w-xl{max-width:576px}#twe-root .max-w-xs{max-width:320px}#twe-root .flex-1{flex:1 1 0%}#twe-root .flex-shrink-0,#twe-root .shrink-0{flex-shrink:0}#twe-root .flex-grow,#twe-root .grow{flex-grow:1}#twe-root .origin-\\[bottom_center\\]{transform-origin:bottom center}#twe-root .translate-x-0{--tw-translate-x: 0px;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}#twe-root .translate-x-\\[-500px\\]{--tw-translate-x: -500px;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}#twe-root .transform-none{transform:none}@keyframes ping{75%,to{transform:scale(2);opacity:0}}#twe-root .animate-ping{animation:ping 1s cubic-bezier(0,0,.2,1) infinite}#twe-root .cursor-pointer{cursor:pointer}#twe-root .select-none{-webkit-user-select:none;-moz-user-select:none;user-select:none}#twe-root .resize{resize:both}#twe-root .grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}#twe-root .flex-row{flex-direction:row}#twe-root .flex-col{flex-direction:column}#twe-root .items-start{align-items:flex-start}#twe-root .items-center{align-items:center}#twe-root .justify-start{justify-content:flex-start}#twe-root .justify-end{justify-content:flex-end}#twe-root .justify-center{justify-content:center}#twe-root .justify-between{justify-content:space-between}#twe-root .gap-2{gap:8px}#twe-root .space-x-1>:not([hidden])~:not([hidden]){--tw-space-x-reverse: 0;margin-right:calc(4px * var(--tw-space-x-reverse));margin-left:calc(4px * calc(1 - var(--tw-space-x-reverse)))}#twe-root .space-x-2>:not([hidden])~:not([hidden]){--tw-space-x-reverse: 0;margin-right:calc(8px * var(--tw-space-x-reverse));margin-left:calc(8px * calc(1 - var(--tw-space-x-reverse)))}#twe-root .overflow-auto{overflow:auto}#twe-root .overflow-hidden{overflow:hidden}#twe-root .overflow-scroll{overflow:scroll}#twe-root .overflow-y-auto{overflow-y:auto}#twe-root .overflow-x-scroll{overflow-x:scroll}#twe-root .overflow-y-scroll{overflow-y:scroll}#twe-root .overscroll-none{overscroll-behavior:none}#twe-root .truncate{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}#twe-root .whitespace-nowrap{white-space:nowrap}#twe-root .whitespace-pre{white-space:pre}#twe-root .whitespace-pre-wrap{white-space:pre-wrap}#twe-root .break-words{overflow-wrap:break-word}#twe-root .break-all{word-break:break-all}#twe-root .rounded{border-radius:4px}#twe-root .rounded-box{border-radius:var(--rounded-box, 16px)}#twe-root .rounded-full{border-radius:9999px}#twe-root .rounded-md{border-radius:6px}#twe-root .border{border-width:1px}#twe-root .border-b{border-bottom-width:1px}#twe-root .border-solid{border-style:solid}#twe-root .border-neutral-content{--tw-border-opacity: 1;border-color:var(--fallback-nc,oklch(var(--nc)/var(--tw-border-opacity, 1)))}#twe-root .border-opacity-50{--tw-border-opacity: .5}#twe-root .bg-base-100{--tw-bg-opacity: 1;background-color:var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity, 1)))}#twe-root .bg-base-200{--tw-bg-opacity: 1;background-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-bg-opacity, 1)))}#twe-root .bg-base-300{--tw-bg-opacity: 1;background-color:var(--fallback-b3,oklch(var(--b3)/var(--tw-bg-opacity, 1)))}#twe-root .bg-black{--tw-bg-opacity: 1;background-color:rgb(0 0 0 / var(--tw-bg-opacity, 1))}#twe-root .bg-blue-500{--tw-bg-opacity: 1;background-color:rgb(59 130 246 / var(--tw-bg-opacity, 1))}#twe-root .bg-secondary{--tw-bg-opacity: 1;background-color:var(--fallback-s,oklch(var(--s)/var(--tw-bg-opacity, 1)))}#twe-root .bg-transparent{background-color:transparent}#twe-root .bg-white{--tw-bg-opacity: 1;background-color:rgb(255 255 255 / var(--tw-bg-opacity, 1))}#twe-root .bg-opacity-30{--tw-bg-opacity: .3}#twe-root .bg-opacity-50{--tw-bg-opacity: .5}#twe-root .fill-base-content{fill:var(--fallback-bc,oklch(var(--bc)/1))}#twe-root .object-contain{-o-object-fit:contain;object-fit:contain}#twe-root .object-cover{-o-object-fit:cover;object-fit:cover}#twe-root .p-0{padding:0}#twe-root .p-1{padding:4px}#twe-root .p-2{padding:8px}#twe-root .p-4{padding:16px}#twe-root .px-0\\.5{padding-left:2px;padding-right:2px}#twe-root .px-2{padding-left:8px;padding-right:8px}#twe-root .px-4{padding-left:16px;padding-right:16px}#twe-root .py-2{padding-top:8px;padding-bottom:8px}#twe-root .py-3{padding-top:12px;padding-bottom:12px}#twe-root .text-center{text-align:center}#twe-root .align-top{vertical-align:top}#twe-root .align-middle{vertical-align:middle}#twe-root .font-mono{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace}#twe-root .text-base{font-size:16px;line-height:24px}#twe-root .text-sm{font-size:14px;line-height:20px}#twe-root .text-xl{font-size:20px;line-height:28px}#twe-root .text-xs{font-size:12px;line-height:16px}#twe-root .font-bold{font-weight:700}#twe-root .font-medium{font-weight:500}#twe-root .font-semibold{font-weight:600}#twe-root .leading-4{line-height:16px}#twe-root .leading-5{line-height:20px}#twe-root .leading-6{line-height:24px}#twe-root .leading-8{line-height:32px}#twe-root .leading-\\[48px\\]{line-height:48px}#twe-root .leading-loose{line-height:2}#twe-root .leading-none{line-height:1}#twe-root .leading-normal{line-height:1.5}#twe-root .text-base-content{--tw-text-opacity: 1;color:var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity, 1)))}#twe-root .text-blue-500{--tw-text-opacity: 1;color:rgb(59 130 246 / var(--tw-text-opacity, 1))}#twe-root .text-error{--tw-text-opacity: 1;color:var(--fallback-er,oklch(var(--er)/var(--tw-text-opacity, 1)))}#twe-root .text-success{--tw-text-opacity: 1;color:var(--fallback-su,oklch(var(--su)/var(--tw-text-opacity, 1)))}#twe-root .text-white{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity, 1))}#twe-root .text-opacity-50{--tw-text-opacity: .5}#twe-root .text-opacity-60{--tw-text-opacity: .6}#twe-root .text-opacity-70{--tw-text-opacity: .7}#twe-root .underline{text-decoration-line:underline}#twe-root .opacity-50{opacity:.5}#twe-root .opacity-75{opacity:.75}#twe-root .shadow{--tw-shadow: 0 1px 3px 0 rgb(0 0 0 / .1), 0 1px 2px -1px rgb(0 0 0 / .1);--tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}#twe-root .shadow-xl{--tw-shadow: 0 20px 25px -5px rgb(0 0 0 / .1), 0 8px 10px -6px rgb(0 0 0 / .1);--tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}#twe-root .filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}#twe-root .transition-all{transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}#twe-root .transition-colors{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}#twe-root .transition-transform{transition-property:transform;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}#twe-root .duration-200{transition-duration:.2s}#twe-root .duration-500{transition-duration:.5s}#twe-root .table-border-bc :where(thead,tbody) :where(tr:not(:last-child)),#twe-root .table-border-bc :where(thead,tbody) :where(tr:first-child:last-child){--tw-border-opacity: 20%;border-bottom-width:1px;border-bottom-color:var(--fallback-bc, oklch(var(--bc) / var(--tw-border-opacity)))}#twe-root .table-padding-sm :where(th,td){padding:8px 12px}#twe-root .before\\:max-w-40:before{content:var(--tw-content);max-width:160px}#twe-root .before\\:max-w-max:before{content:var(--tw-content);max-width:-moz-max-content;max-width:max-content}#twe-root .before\\:whitespace-pre-line:before{content:var(--tw-content);white-space:pre-line}#twe-root .hover\\:bg-base-200:hover{--tw-bg-opacity: 1;background-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-bg-opacity, 1)))}#twe-root .hover\\:bg-blue-700:hover{--tw-bg-opacity: 1;background-color:rgb(29 78 216 / var(--tw-bg-opacity, 1))}#twe-root .hover\\:bg-gray-100:hover{--tw-bg-opacity: 1;background-color:rgb(243 244 246 / var(--tw-bg-opacity, 1))}#twe-root .hover\\:text-blue-700:hover{--tw-text-opacity: 1;color:rgb(29 78 216 / var(--tw-text-opacity, 1))}#twe-root .group:hover .group-hover\\:translate-x-\\[5px\\]{--tw-translate-x: 5px;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}#twe-root .group:hover .group-hover\\:rotate-\\[20deg\\]{--tw-rotate: 20deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}#twe-root .group:hover .group-hover\\:opacity-90{opacity:.9}@media (min-width: 640px){#twe-root .sm\\:max-w-screen-sm{max-width:640px}}@media (min-width: 768px){#twe-root .md\\:max-w-screen-md{max-width:768px}#twe-root .md\\:max-w-screen-sm{max-width:640px}}@media (prefers-color-scheme: dark){#twe-root .dark\\:border-gray-700{--tw-border-opacity: 1;border-color:rgb(55 65 81 / var(--tw-border-opacity, 1))}#twe-root .dark\\:bg-gray-800{--tw-bg-opacity: 1;background-color:rgb(31 41 55 / var(--tw-bg-opacity, 1))}#twe-root .dark\\:hover\\:bg-gray-700:hover{--tw-bg-opacity: 1;background-color:rgb(55 65 81 / var(--tw-bg-opacity, 1))}}#twe-root .\\[\\&\\>path\\]\\:stroke-0>path{stroke-width:0} `);

(function (preact, hooks, signals, i18next, dayjs, Dexie, dexieExportImport) {
  'use strict';

  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  var f = 0;
  function u(e, t, n, o, i, u2) {
    t || (t = {});
    var a, c, l = t;
    "ref" in t && (a = t.ref, delete t.ref);
    var p = { type: e, props: l, key: n, ref: a, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, constructor: void 0, __v: --f, __i: -1, __u: 0, __source: i, __self: u2 };
    if ("function" == typeof e && (a = e.defaultProps)) for (c in a) void 0 === l[c] && (l[c] = a[c]);
    return preact.options.vnode && preact.options.vnode(p), p;
  }
  /**
   * @license @tabler/icons-preact v3.19.0 - MIT
   *
   * This source code is licensed under the MIT license.
   * See the LICENSE file in the root directory of this source tree.
   */
  var defaultAttributes = {
    outline: {
      xmlns: "http://www.w3.org/2000/svg",
      width: 24,
      height: 24,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 2,
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    },
    filled: {
      xmlns: "http://www.w3.org/2000/svg",
      width: 24,
      height: 24,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      stroke: "none"
    }
  };
  /**
   * @license @tabler/icons-preact v3.19.0 - MIT
   *
   * This source code is licensed under the MIT license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const createPreactComponent = (type, iconName, iconNamePascal, iconNode) => {
    const Component2 = ({
      color = "currentColor",
      size = 24,
      stroke = 2,
      title,
      children,
      className = "",
      class: classes = "",
      style,
      ...rest
    }) => preact.h(
      "svg",
      {
        ...defaultAttributes[type],
        width: String(size),
        height: String(size),
        class: [`tabler-icon`, `tabler-icon-${iconName}`, classes, className].join(" "),
        ...type === "filled" ? {
          fill: color
        } : {
          "stroke-width": stroke,
          stroke: color
        },
        style,
        ...rest
      },
      [
        title && preact.h("title", {}, title),
        ...iconNode.map(([tag, attrs]) => preact.h(tag, attrs)),
        ...preact.toChildArray(children)
      ]
    );
    Component2.displayName = `${iconNamePascal}`;
    return Component2;
  };
  /**
   * @license @tabler/icons-preact v3.19.0 - MIT
   *
   * This source code is licensed under the MIT license.
   * See the LICENSE file in the root directory of this source tree.
   */
  var IconArrowUpRight = createPreactComponent("outline", "arrow-up-right", "IconArrowUpRight", [["path", { "d": "M17 7l-10 10", "key": "svg-0" }], ["path", { "d": "M8 7l9 0l0 9", "key": "svg-1" }]]);
  /**
   * @license @tabler/icons-preact v3.19.0 - MIT
   *
   * This source code is licensed under the MIT license.
   * See the LICENSE file in the root directory of this source tree.
   */
  var IconDatabaseExport = createPreactComponent("outline", "database-export", "IconDatabaseExport", [["path", { "d": "M4 6c0 1.657 3.582 3 8 3s8 -1.343 8 -3s-3.582 -3 -8 -3s-8 1.343 -8 3", "key": "svg-0" }], ["path", { "d": "M4 6v6c0 1.657 3.582 3 8 3c1.118 0 2.183 -.086 3.15 -.241", "key": "svg-1" }], ["path", { "d": "M20 12v-6", "key": "svg-2" }], ["path", { "d": "M4 12v6c0 1.657 3.582 3 8 3c.157 0 .312 -.002 .466 -.005", "key": "svg-3" }], ["path", { "d": "M16 19h6", "key": "svg-4" }], ["path", { "d": "M19 16l3 3l-3 3", "key": "svg-5" }]]);
  /**
   * @license @tabler/icons-preact v3.19.0 - MIT
   *
   * This source code is licensed under the MIT license.
   * See the LICENSE file in the root directory of this source tree.
   */
  var IconExclamationCircle = createPreactComponent("outline", "exclamation-circle", "IconExclamationCircle", [["path", { "d": "M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0", "key": "svg-0" }], ["path", { "d": "M12 9v4", "key": "svg-1" }], ["path", { "d": "M12 16v.01", "key": "svg-2" }]]);
  /**
   * @license @tabler/icons-preact v3.19.0 - MIT
   *
   * This source code is licensed under the MIT license.
   * See the LICENSE file in the root directory of this source tree.
   */
  var IconHelp = createPreactComponent("outline", "help", "IconHelp", [["path", { "d": "M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0", "key": "svg-0" }], ["path", { "d": "M12 17l0 .01", "key": "svg-1" }], ["path", { "d": "M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4", "key": "svg-2" }]]);
  /**
   * @license @tabler/icons-preact v3.19.0 - MIT
   *
   * This source code is licensed under the MIT license.
   * See the LICENSE file in the root directory of this source tree.
   */
  var IconReportAnalytics = createPreactComponent("outline", "report-analytics", "IconReportAnalytics", [["path", { "d": "M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2", "key": "svg-0" }], ["path", { "d": "M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z", "key": "svg-1" }], ["path", { "d": "M9 17v-5", "key": "svg-2" }], ["path", { "d": "M12 17v-1", "key": "svg-3" }], ["path", { "d": "M15 17v-3", "key": "svg-4" }]]);
  /**
   * @license @tabler/icons-preact v3.19.0 - MIT
   *
   * This source code is licensed under the MIT license.
   * See the LICENSE file in the root directory of this source tree.
   */
  var IconSettings = createPreactComponent("outline", "settings", "IconSettings", [["path", { "d": "M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z", "key": "svg-0" }], ["path", { "d": "M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0", "key": "svg-1" }]]);
  /**
   * @license @tabler/icons-preact v3.19.0 - MIT
   *
   * This source code is licensed under the MIT license.
   * See the LICENSE file in the root directory of this source tree.
   */
  var IconTrashX = createPreactComponent("outline", "trash-x", "IconTrashX", [["path", { "d": "M4 7h16", "key": "svg-0" }], ["path", { "d": "M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12", "key": "svg-1" }], ["path", { "d": "M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3", "key": "svg-2" }], ["path", { "d": "M10 12l4 4m0 -4l-4 4", "key": "svg-3" }]]);
  /**
   * @license @tabler/icons-preact v3.19.0 - MIT
   *
   * This source code is licensed under the MIT license.
   * See the LICENSE file in the root directory of this source tree.
   */
  var IconX = createPreactComponent("outline", "x", "IconX", [["path", { "d": "M18 6l-12 12", "key": "svg-0" }], ["path", { "d": "M6 6l12 12", "key": "svg-1" }]]);
  /**
   * @license @tabler/icons-preact v3.19.0 - MIT
   *
   * This source code is licensed under the MIT license.
   * See the LICENSE file in the root directory of this source tree.
   */
  var IconBrandGithubFilled = createPreactComponent("filled", "brand-github-filled", "IconBrandGithubFilled", [["path", { "d": "M5.315 2.1c.791 -.113 1.9 .145 3.333 .966l.272 .161l.16 .1l.397 -.083a13.3 13.3 0 0 1 4.59 -.08l.456 .08l.396 .083l.161 -.1c1.385 -.84 2.487 -1.17 3.322 -1.148l.164 .008l.147 .017l.076 .014l.05 .011l.144 .047a1 1 0 0 1 .53 .514a5.2 5.2 0 0 1 .397 2.91l-.047 .267l-.046 .196l.123 .163c.574 .795 .93 1.728 1.03 2.707l.023 .295l.007 .272c0 3.855 -1.659 5.883 -4.644 6.68l-.245 .061l-.132 .029l.014 .161l.008 .157l.004 .365l-.002 .213l-.003 3.834a1 1 0 0 1 -.883 .993l-.117 .007h-6a1 1 0 0 1 -.993 -.883l-.007 -.117v-.734c-1.818 .26 -3.03 -.424 -4.11 -1.878l-.535 -.766c-.28 -.396 -.455 -.579 -.589 -.644l-.048 -.019a1 1 0 0 1 .564 -1.918c.642 .188 1.074 .568 1.57 1.239l.538 .769c.76 1.079 1.36 1.459 2.609 1.191l.001 -.678l-.018 -.168a5.03 5.03 0 0 1 -.021 -.824l.017 -.185l.019 -.12l-.108 -.024c-2.976 -.71 -4.703 -2.573 -4.875 -6.139l-.01 -.31l-.004 -.292a5.6 5.6 0 0 1 .908 -3.051l.152 -.222l.122 -.163l-.045 -.196a5.2 5.2 0 0 1 .145 -2.642l.1 -.282l.106 -.253a1 1 0 0 1 .529 -.514l.144 -.047l.154 -.03z", "key": "svg-0" }]]);
  /**
   * @license @tabler/icons-preact v3.19.0 - MIT
   *
   * This source code is licensed under the MIT license.
   * See the LICENSE file in the root directory of this source tree.
   */
  var IconBrandTwitterFilled = createPreactComponent("filled", "brand-twitter-filled", "IconBrandTwitterFilled", [["path", { "d": "M14.058 3.41c-1.807 .767 -2.995 2.453 -3.056 4.38l-.002 .182l-.243 -.023c-2.392 -.269 -4.498 -1.512 -5.944 -3.531a1 1 0 0 0 -1.685 .092l-.097 .186l-.049 .099c-.719 1.485 -1.19 3.29 -1.017 5.203l.03 .273c.283 2.263 1.5 4.215 3.779 5.679l.173 .107l-.081 .043c-1.315 .663 -2.518 .952 -3.827 .9c-1.056 -.04 -1.446 1.372 -.518 1.878c3.598 1.961 7.461 2.566 10.792 1.6c4.06 -1.18 7.152 -4.223 8.335 -8.433l.127 -.495c.238 -.993 .372 -2.006 .401 -3.024l.003 -.332l.393 -.779l.44 -.862l.214 -.434l.118 -.247c.265 -.565 .456 -1.033 .574 -1.43l.014 -.056l.008 -.018c.22 -.593 -.166 -1.358 -.941 -1.358l-.122 .007a.997 .997 0 0 0 -.231 .057l-.086 .038a7.46 7.46 0 0 1 -.88 .36l-.356 .115l-.271 .08l-.772 .214c-1.336 -1.118 -3.144 -1.254 -5.012 -.554l-.211 .084z", "key": "svg-0" }]]);
  var _GM_registerMenuCommand = /* @__PURE__ */ (() => typeof GM_registerMenuCommand != "undefined" ? GM_registerMenuCommand : void 0)();
  var _unsafeWindow = /* @__PURE__ */ (() => typeof unsafeWindow != "undefined" ? unsafeWindow : void 0)();
  const en = { "common": { "Open Control Panel": "Open Control Panel", "Browse around to capture more data.": "Browse around to capture more data.", "Settings": "Settings", "General": "General", "Theme": "Theme", "Language": "Language", "Debug": "Debug", "Date Time Format": "Date Time Format", "Click for more information. This will take effect on both previewer and exported files.": "Click for more information. This will take effect on both previewer and exported files.", "Local Database": "Local Database", "Analyze DB": "Analyze", "Export DB": "Export", "Clear DB": "Clear", "Are you sure to clear all data in the database?": "Are you sure to clear all data in the database?", "Database cleared.": "Database cleared.", "Module": "Module", "Modules (Scroll to see more)": "Modules (Scroll to see more)", "About": "About", "Version": "Version", "Search...": "Search...", "Something went wrong.": "Something went wrong.", "Error:": "Error:", "Captured:": "Captured:", "Rows per page:": "Rows per page:", "A - B of N items": "{{from}} - {{to}} of {{total}} items", "No data available.": "No data available.", "Clear": "Clear", "Export Media": "Export Media", "Export Data": "Export Data", "JSON View": "JSON View", "Media View": "Media View", "Bookmarks": "Bookmarks", "DirectMessages": "DirectMessages", "Followers": "Followers", "Following": "Following", "HomeTimeline": "HomeTimeline", "Likes": "Likes", "ListMembers": "ListMembers", "ListSubscribers": "ListSubscribers", "ListTimeline": "ListTimeline", "RuntimeLogs": "RuntimeLogs", "SearchTimeline": "SearchTimeline", "TweetDetail": "TweetDetail", "UserDetail": "UserDetail", "UserMedia": "UserMedia", "UserTweets": "UserTweets" }, "exporter": { "ID": "ID", "Date": "Date", "Content": "Content", "Show Full Text": "Show Full Text", "Media": "Media", "Screen Name": "Screen Name", "Profile Name": "Profile Name", "Profile Image": "Profile Image", "Replying To": "Replying To", "RT Source": "RT Source", "Quote Source": "Quote Source", "Favorites": "Favorites", "Retweets": "Retweets", "Bookmarks": "Bookmarks", "Quotes": "Quotes", "Replies": "Replies", "Views": "Views", "Favorited": "Favorited", "Retweeted": "Retweeted", "Bookmarked": "Bookmarked", "URL": "URL", "Actions": "Actions", "Details": "Details", "Description": "Description", "Profile Banner": "Profile Banner", "Followers": "Followers", "FollowingCount": "Following Count", "Statuses": "Statuses", "Favourites": "Favourites", "Listed": "Listed", "Location": "Location", "Website": "Website", "Birthdate": "Birthdate", "Verified Type": "Verified Type", "Blue Verified": "Blue Verified", "Following": "Following", "Follows You": "Follows You", "Can DM": "Can DM", "Protected": "Protected", "Created At": "Created At", "Sender": "Sender", "Recipient": "Recipient", "Conversation ID": "Conversation ID", "Conversation Type": "Conversation Type", "Data": "Data", "Export captured data as JSON/HTML/CSV file. This may take a while depending on the amount of data. The exported file does not include media files such as images and videos but only the URLs.": "Export captured data as JSON/HTML/CSV file. This may take a while depending on the amount of data. The exported file does not include media files such as images and videos but only the URLs.", "Data length:": "Data length:", "Include all metadata:": "Include all metadata:", "Export as:": "Export as:", "No data selected.": "No data selected.", "Cancel": "Cancel", "Start Export": "Start Export", "Download and save media files from captured data. This may take a while depending on the amount of data. Media that will be downloaded includes: profile images, profile banners (for users), images, videos (for tweets).": "Download and save media files from captured data. This may take a while depending on the amount of data. Media that will be downloaded includes: profile images, profile banners (for users), images, videos (for tweets).", "For more than 100 media or large files, it is recommended to copy the URLs and download them with an external download manager such as aria2.": "For more than 100 media or large files, it is recommended to copy the URLs and download them with an external download manager such as aria2.", "Filename template:": "Filename template:", "Rate limit (ms):": "Rate limit (ms):", "Media Filter:": "Media Filter:", "File Name": "File Name", "Media Type": "Media Type", "Download URL": "Download URL", "No media selected.": "No media selected.", "Copied!": "Copied!", "Copy URLs": "Copy URLs", "The tweet ID": "The tweet ID", "The username of tweet author": "The username of tweet author", "The profile name of tweet author": "The profile name of tweet author", "The media index in tweet (start from 0)": "The media index in tweet (start from 0)", "The order of media in tweet (1/2/3/4)": "The order of media in tweet (1/2/3/4)", "The post date in YYYYMMDD format": "The post date in YYYYMMDD format", "The post time in HHmmss format": "The post time in HHmmss format", "The media type (photo/video/animated_gif)": "The media type (photo/video/animated_gif)", "The file extension of media (jpg/png/mp4)": "The file extension of media (jpg/png/mp4)", "Failed to export media. Open DevTools for more details.": "Failed to export media. Open DevTools for more details.", "Failed to copy media URLs. Open DevTools for more details.": "Failed to copy media URLs. Open DevTools for more details.", "filter.photo": "Photo", "filter.video": "Video", "filter.animated_gif": "GIF", "filter.retweet": "Include retweets" } };
  const zh_Hans = { "common": { "Open Control Panel": "打开控制面板", "Browse around to capture more data.": "采集标签,用户,搜索结果中推文的详情和评论", "Settings": "设置", "General": "通用", "Theme": "主题", "Language": "语言", "Debug": "调试开关", "Date Time Format": "日期时间格式", "Click for more information. This will take effect on both previewer and exported files.": "点击查看详细信息。此选项会影响预览和导出的文件。", "Local Database": "本地数据库", "Analyze DB": "统计", "Export DB": "导出", "Clear DB": "清空", "Are you sure to clear all data in the database?": "确定要清空数据库中的所有数据吗？", "Database cleared.": "数据库已清空。", "Module": "模块", "Modules (Scroll to see more)": "模块列表（滑动以查看完整列表）", "About": "关于", "Version": "版本", "Search...": "搜索...", "Something went wrong.": "出错了。", "Error:": "错误:", "Captured:": "已捕获:", "Rows per page:": "每页显示行数:", "A - B of N items": "第 {{from}} - {{to}} 项，共 {{total}} 项", "No data available.": "没有数据。", "Clear": "清除", "Export Media": "导出媒体文件", "Export Data": "导出数据", "JSON View": "JSON 数据预览", "Media View": "媒体预览", "Bookmarks": "书签", "DirectMessages": "私信", "Followers": "关注者", "Following": "正在关注", "HomeTimeline": "主页时间线", "Likes": "喜欢", "ListMembers": "列表成员", "ListSubscribers": "列表关注者", "ListTimeline": "列表时间线", "RuntimeLogs": "运行时日志", "SearchTimeline": "搜索结果", "TweetDetail": "推文详情", "UserDetail": "用户详情", "UserMedia": "用户媒体", "UserTweets": "用户推文" }, "exporter": { "ID": "ID", "Date": "日期", "Content": "内容", "Show Full Text": "显示全文", "Media": "媒体", "Screen Name": "用户名", "Profile Name": "用户昵称", "Profile Image": "用户头像", "Replying To": "回复推文", "RT Source": "转推来源", "Quote Source": "引用来源", "Favorites": "喜欢数量", "Retweets": "转推数量", "Bookmarks": "书签数量", "Quotes": "引用数量", "Replies": "回复数量", "Views": "查看次数", "Favorited": "已喜欢", "Retweeted": "已转推", "Bookmarked": "已加书签", "URL": "URL", "Actions": "操作", "Details": "查看详情", "Description": "简介", "Profile Banner": "个人资料头图", "Followers": "关注者数量", "FollowingCount": "正在关注数量", "Statuses": "推文数量", "Favourites": "喜欢数量", "Listed": "被加入列表数", "Location": "位置", "Website": "网站", "Birthdate": "出生日期", "Verified Type": "认证类型", "Blue Verified": "蓝标认证", "Following": "正在关注", "Follows You": "关注你", "Can DM": "可私信", "Protected": "受保护", "Created At": "创建时间", "Sender": "发送者", "Recipient": "接收者", "Conversation ID": "对话 ID", "Conversation Type": "对话类型", "Data": "数据", "Export captured data as JSON/HTML/CSV file. This may take a while depending on the amount of data. The exported file does not include media files such as images and videos but only the URLs.": "将捕获的数据导出为 JSON/HTML/CSV 文件。这可能需要一些时间，具体取决于数据量。导出的文件不包括图片和视频等媒体文件，只包括它们的 URL。", "Data length:": "数据长度:", "Include all metadata:": "包括所有元数据:", "Export as:": "导出为:", "No data selected.": "未选择数据。", "Cancel": "取消", "Start Export": "开始导出", "Download and save media files from captured data. This may take a while depending on the amount of data. Media that will be downloaded includes: profile images, profile banners (for users), images, videos (for tweets).": "从捕获的数据中下载并保存媒体文件。这可能需要一些时间，具体取决于数据量。将下载的媒体包括：用户的个人资料图片、个人资料头图、图片、推文中的视频。", "For more than 100 media or large files, it is recommended to copy the URLs and download them with an external download manager such as aria2.": "对于超过 100 个媒体或大文件，建议复制 URL 并使用外部下载管理器（如 aria2）下载。", "Filename template:": "文件名模板:", "Rate limit (ms):": "速率限制（毫秒）:", "Media Filter:": "媒体过滤器：", "File Name": "文件名", "Media Type": "媒体类型", "Download URL": "下载地址", "No media selected.": "未选择媒体。", "Copied!": "已复制！", "Copy URLs": "复制 URL", "The tweet ID": "推文 ID", "The username of tweet author": "推文作者的用户名", "The profile name of tweet author": "推文作者的用户昵称", "The media index in tweet (start from 0)": "推文中的媒体索引（从 0 开始）", "The order of media in tweet (1/2/3/4)": "推文中的媒体顺序（1/2/3/4）", "The post date in YYYYMMDD format": "发布日期（YYYYMMDD 格式）", "The post time in HHmmss format": "发布时间（HHmmss 格式）", "The media type (photo/video/animated_gif)": "媒体类型（photo/video/animated_gif）", "The file extension of media (jpg/png/mp4)": "媒体文件扩展名（jpg/png/mp4）", "Failed to export media. Open DevTools for more details.": "导出媒体失败。打开 DevTools 以获取更多详细信息。", "Failed to copy media URLs. Open DevTools for more details.": "复制媒体 URL 失败。打开 DevTools 以获取更多详细信息。", "filter.photo": "图片", "filter.video": "视频", "filter.animated_gif": "GIF", "filter.retweet": "包括转推" } };
  const resources = {
    "en": en,
    "zh-Hans": zh_Hans
  };
  const logLinesSignal = signals.signal([]);
  class Logger {
    constructor() {
      __publicField(this, "index", 0);
      __publicField(this, "buffer", []);
      __publicField(this, "bufferTimer", null);
    }
    info(line, ...args) {
      console.info("[twitter-web-exporter]", line, ...args);
      this.writeBuffer({ type: "info", line, index: this.index++ });
    }
    warn(line, ...args) {
      console.warn("[twitter-web-exporter]", line, ...args);
      this.writeBuffer({ type: "warn", line, index: this.index++ });
    }
    error(line, ...args) {
      console.error("[twitter-web-exporter]", line, ...args);
      this.writeBuffer({ type: "error", line, index: this.index++ });
    }
    errorWithBanner(msg, err, ...args) {
      this.error(
        `${msg} (Message: ${(err == null ? void 0 : err.message) ?? "none"})
  This may be a problem caused by Twitter updates.
  Please file an issue on GitHub:
  https://github.com/prinsss/twitter-web-exporter/issues`,
        ...args
      );
    }
    debug(...args) {
      console.debug("[twitter-web-exporter]", ...args);
    }
    /**
     * Buffer log lines to reduce the number of signal and DOM updates.
     */
    writeBuffer(log) {
      this.buffer.push(log);
      if (this.bufferTimer) {
        clearTimeout(this.bufferTimer);
      }
      this.bufferTimer = window.setTimeout(() => {
        this.bufferTimer = null;
        this.flushBuffer();
      }, 0);
    }
    /**
     * Flush buffered log lines and update the UI.
     */
    flushBuffer() {
      logLinesSignal.value = [...logLinesSignal.value, ...this.buffer];
      this.buffer = [];
    }
  }
  const logger = new Logger();
  function safeJSONParse(text) {
    try {
      return JSON.parse(text);
    } catch (e) {
      logger.error(e.message);
      return null;
    }
  }
  function useToggle(defaultValue = false) {
    const signal2 = signals.useSignal(defaultValue);
    const toggle = () => {
      signal2.value = !signal2.value;
    };
    return [signal2.value, toggle, signal2];
  }
  function cx(...classNames) {
    return classNames.filter(Boolean).join(" ");
  }
  function isEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  function parseTwitterDateTime(str) {
    const trimmed = str.replace(/^\w+ (.*)$/, "$1");
    return dayjs(trimmed, "MMM DD HH:mm:ss ZZ YYYY", "en");
  }
  function formatDateTime(date, format) {
    if (typeof date === "number" || typeof date === "string") {
      date = dayjs(date);
    }
    return date.format(format);
  }
  const name = "twitter-web-exporter";
  const version = "1.2.1-beta.6";
  const homepage = "https://github.com/prinsss/twitter-web-exporter";
  const packageJson = {
    name,
    version,
    homepage
  };
  const DEFAULT_APP_OPTIONS = {
    theme: "system",
    debug: false,
    showControlPanel: true,
    disabledExtensions: [
      "HomeTimelineModule",
      "ListTimelineModule",
      "ListSubscribersModule",
      "ListMembersModule"
    ],
    dateTimeFormat: "YYYY-MM-DD HH:mm:ss Z",
    language: "",
    version: packageJson.version
  };
  const THEMES = [
    "system",
    "cupcake",
    "dark",
    "emerald",
    "cyberpunk",
    "valentine",
    "lofi",
    "dracula",
    "cmyk",
    "business",
    "winter"
  ];
  const LOCAL_STORAGE_KEY = packageJson.name;
  class AppOptionsManager {
    constructor() {
      __publicField(this, "appOptions", { ...DEFAULT_APP_OPTIONS });
      __publicField(this, "previous", { ...DEFAULT_APP_OPTIONS });
      /**
       * Signal for subscribing to option changes.
       */
      __publicField(this, "signal", new signals.Signal(0));
      this.loadAppOptions();
    }
    get(key, defaultValue) {
      return this.appOptions[key] ?? defaultValue;
    }
    set(key, value) {
      this.appOptions[key] = value;
      this.saveAppOptions();
    }
    /**
     * Read app options from local storage.
     */
    loadAppOptions() {
      this.appOptions = {
        ...this.appOptions,
        ...safeJSONParse(localStorage.getItem(LOCAL_STORAGE_KEY) || "{}")
      };
      const oldVersion = this.appOptions.version ?? "";
      const newVersion = DEFAULT_APP_OPTIONS.version;
      if (newVersion.startsWith("1.1") && oldVersion.startsWith("1.0")) {
        this.appOptions.disabledExtensions = [
          ...this.appOptions.disabledExtensions ?? [],
          "HomeTimelineModule",
          "ListTimelineModule"
        ];
        logger.info(`App options migrated from v${oldVersion} to v${newVersion}`);
        setTimeout(() => this.saveAppOptions(), 0);
      }
      this.previous = { ...this.appOptions };
      logger.info("App options loaded", this.appOptions);
      this.signal.value++;
    }
    /**
     * Write app options to local storage.
     */
    saveAppOptions() {
      const oldValue = this.previous;
      const newValue = {
        ...this.appOptions,
        version: packageJson.version
      };
      if (isEqual(oldValue, newValue)) {
        return;
      }
      this.appOptions = newValue;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.appOptions));
      this.previous = { ...this.appOptions };
      logger.debug("App options saved", this.appOptions);
      this.signal.value++;
    }
  }
  const appOptionsManager = new AppOptionsManager();
  const LANGUAGES_CONFIG = {
    en: {
      name: "English",
      nameEn: "English",
      test: (code) => /^en/.test(code)
    },
    "zh-Hans": {
      name: "简体中文",
      nameEn: "Simplified Chinese",
      test: (code) => /^zh/.test(code)
    }
  };
  function detectBrowserLanguage() {
    const language = window.navigator.language || "en";
    for (const [langTag, langConf] of Object.entries(LANGUAGES_CONFIG)) {
      if (langConf.test(language)) {
        return langTag;
      }
    }
    return language;
  }
  const languageDetector = {
    type: "languageDetector",
    detect: function() {
      return appOptionsManager.get("language") || detectBrowserLanguage();
    }
  };
  function initI18n() {
    if (i18next.isInitialized) {
      return i18next;
    }
    i18next.on("languageChanged", (lng) => {
      if (!appOptionsManager.get("language")) {
        appOptionsManager.set("language", lng);
      }
    });
    i18next.use(languageDetector).init({
      initImmediate: true,
      defaultNS: "common",
      fallbackLng: "en",
      nsSeparator: "::",
      debug: appOptionsManager.get("debug"),
      resources
    });
    return i18next;
  }
  function useTranslation(ns) {
    const i18n = initI18n();
    const [t, setT] = hooks.useState(() => i18n.getFixedT(null, ns ?? null));
    const isMountedRef = hooks.useRef(true);
    const previousNamespaceRef = hooks.useRef(ns);
    hooks.useEffect(() => {
      isMountedRef.current = true;
      if (previousNamespaceRef.current !== ns) {
        previousNamespaceRef.current = ns;
        setT(() => i18n.getFixedT(null, ns ?? null));
      }
      function boundReset() {
        if (isMountedRef.current) {
          setT(() => i18n.getFixedT(null, ns ?? null));
        }
      }
      i18n.on("languageChanged", boundReset);
      return () => {
        isMountedRef.current = false;
        i18n.off("languageChanged", boundReset);
      };
    }, [ns]);
    return { t, i18n };
  }
  function Trans({ i18nKey, ns = "exporter" }) {
    const { t } = useTranslation(ns);
    return /* @__PURE__ */ u("span", { children: t(i18nKey) });
  }
  class ErrorBoundary extends preact.Component {
    constructor() {
      super(...arguments);
      __publicField(this, "state", { error: null });
    }
    static getDerivedStateFromError(err) {
      return { error: err.message };
    }
    componentDidCatch(err) {
      logger.error(err.message, err);
      this.setState({ error: err.message });
    }
    render() {
      if (this.state.error) {
        return /* @__PURE__ */ u("div", { class: "alert alert-error p-2", children: [
          /* @__PURE__ */ u(IconExclamationCircle, {}),
          /* @__PURE__ */ u("div", { children: [
            /* @__PURE__ */ u("h3", { class: "font-bold leading-normal", children: /* @__PURE__ */ u(Trans, { ns: "common", i18nKey: "Something went wrong." }) }),
            /* @__PURE__ */ u("p", { class: "text-xs", children: [
              /* @__PURE__ */ u(Trans, { ns: "common", i18nKey: "Error:" }),
              " ",
              this.state.error
            ] })
          ] })
        ] });
      }
      return this.props.children;
    }
  }
  function extractTweetUnion(tweet) {
    var _a, _b;
    try {
      if (tweet.__typename === "Tweet") {
        return filterEmptyTweet(tweet);
      }
      if (tweet.__typename === "TweetWithVisibilityResults") {
        return filterEmptyTweet(tweet.tweet);
      }
      if (tweet.__typename === "TweetTombstone") {
        logger.warn(`TweetTombstone received (Reason: ${(_b = (_a = tweet.tombstone) == null ? void 0 : _a.text) == null ? void 0 : _b.text})`, tweet);
        return null;
      }
      if (tweet.__typename === "TweetUnavailable") {
        logger.warn("TweetUnavailable received (Reason: unknown)", tweet);
        return null;
      }
      logger.debug(tweet);
      logger.errorWithBanner("Unknown tweet type received");
    } catch (err) {
      logger.debug(tweet);
      logger.errorWithBanner("Failed to extract tweet", err);
    }
    return null;
  }
  function extractRetweetedTweet(tweet) {
    var _a;
    if ((_a = tweet.legacy.retweeted_status_result) == null ? void 0 : _a.result) {
      return extractTweetUnion(tweet.legacy.retweeted_status_result.result);
    }
    return null;
  }
  function extractQuotedTweet(tweet) {
    var _a;
    if ((_a = tweet.quoted_status_result) == null ? void 0 : _a.result) {
      return extractTweetUnion(tweet.quoted_status_result.result);
    }
    return null;
  }
  function extractTweetMedia(tweet) {
    var _a;
    const realTweet = extractRetweetedTweet(tweet) ?? tweet;
    if ((_a = realTweet.legacy.extended_entities) == null ? void 0 : _a.media) {
      return realTweet.legacy.extended_entities.media;
    }
    return realTweet.legacy.entities.media ?? [];
  }
  function filterEmptyTweet(tweet) {
    if (!tweet.legacy) {
      logger.warn("Empty tweet received", tweet);
      return null;
    }
    return tweet;
  }
  function getMediaOriginalUrl(media) {
    var _a;
    if (media.type === "video" || media.type === "animated_gif") {
      const variants = ((_a = media.video_info) == null ? void 0 : _a.variants) ?? [];
      let maxBitrateVariant = variants[0];
      for (const variant of variants) {
        if (variant.bitrate && variant.bitrate > ((maxBitrateVariant == null ? void 0 : maxBitrateVariant.bitrate) ?? 0)) {
          maxBitrateVariant = variant;
        }
      }
      return (maxBitrateVariant == null ? void 0 : maxBitrateVariant.url) ?? media.media_url_https;
    }
    return formatTwitterImage(media.media_url_https, "orig");
  }
  function formatTwitterImage(imgUrl, name2 = "medium") {
    const regex = /^(https?:\/\/pbs\.twimg\.com\/media\/.+)\.(\w+)$/;
    const match = imgUrl.match(regex);
    if (!match) {
      return `${imgUrl}?name=${name2}`;
    }
    const [, url, ext] = match;
    return `${url}?format=${ext}&name=${name2}`;
  }
  function ExtensionPanel({
    title,
    //'AllLinks',
    description,
    //'Click to view all links'
    children,
    onClick,
    active,
    indicatorColor = "bg-secondary"
  }) {
    return /* @__PURE__ */ u("section", { class: "module-panel", children: [
      /* @__PURE__ */ u("div", { class: "h-12 flex items-center justify-start", children: [
        /* @__PURE__ */ u("div", { class: "relative flex h-4 w-4 mr-3 shrink-0", children: [
          active && /* @__PURE__ */ u(
            "span",
            {
              class: cx(
                "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                indicatorColor
              )
            }
          ),
          /* @__PURE__ */ u("span", { class: cx("relative inline-flex rounded-full h-4 w-4", indicatorColor) })
        ] }),
        /* @__PURE__ */ u("div", { class: "flex flex-col flex-grow", children: [
          /* @__PURE__ */ u("p", { class: "text-base m-0 font-medium leading-none", children: title }),
          /* @__PURE__ */ u("p", { class: "text-sm text-base-content leading-5 text-opacity-70 m-0", children: description })
        ] }),
        /* @__PURE__ */ u("button", { class: "btn btn-sm p-0 w-9 h-9", "data-ExtensionPanel-button-title": "展开采集详情面板", "aria-label": "展开采集详情面板", onClick, children: /* @__PURE__ */ u(IconArrowUpRight, {}) })
      ] }),
      children
    ] });
  }
  function Modal({
    title,
    show,
    onClose,
    children,
    class: className
  }) {
    return /* @__PURE__ */ u(
      "div",
      {
        class: `fixed inset-0 z-50 ${show ? "block" : "hidden"}`,
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "modal-title",
        children: [
          /* @__PURE__ */ u("div", { class: "fixed inset-0 bg-black bg-opacity-50", onClick: onClose }),
          /* @__PURE__ */ u(
            "div",
            {
              class: `absolute inset-0 bg-white overflow-hidden ${className}`,
              children: /* @__PURE__ */ u("div", { class: "flex flex-col h-full", children: [
                /* @__PURE__ */ u("div", { class: "flex items-center justify-between p-4 border-b dark:border-gray-700", children: [
                  /* @__PURE__ */ u("h2", { id: "modal-title", class: "text-xl text-error font-semibold", children: title }),
                  /* @__PURE__ */ u(
                    "button",
                    {
                      class: "p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full",
                      onClick: onClose,
                      "aria-label": "Close modal",
                      children: /* @__PURE__ */ u(
                        "svg",
                        {
                          class: "w-6 h-6",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24",
                          children: /* @__PURE__ */ u(
                            "path",
                            {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M6 18L18 6M6 6l12 12"
                            }
                          )
                        }
                      )
                    }
                  )
                ] }),
                children
              ] })
            }
          )
        ]
      }
    );
  }
  /**
   * @license
   * Credit: https://icooon-mono.com/12776-%e7%8c%ab%e3%81%ae%e7%84%a1%e6%96%99%e3%82%a2%e3%82%a4%e3%82%b3%e3%83%b32/
   */
  const CatIcon = () => /* @__PURE__ */ u("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512", class: "w-full h-full select-none", children: /* @__PURE__ */ u("g", { children: /* @__PURE__ */ u("path", { d: "M461.814,197.514c-2.999-11.335-14.624-18.093-25.958-15.094c-1.866,0.553-13.477,3.649-26.042,14.341 c-6.234,5.349-12.633,12.751-17.361,22.454c-4.748,9.69-7.685,21.577-7.657,35.033c0.013,16.345,4.133,34.895,13.442,56.257 c6.282,14.403,9.144,29.697,9.144,44.846c0.062,25.627-8.438,50.756-21.121,68.283c-6.296,8.777-13.546,15.606-20.816,20.022 c-2.986,1.81-5.943,3.131-8.888,4.181l0.989-5.854c-0.055-17.03-4.05-34.84-13.021-50.528 c-28.356-49.643-66.223-134.741-66.223-134.741l-1.527-4.879c29.47-7.796,58.579-23.408,73.148-54.985 c38.931-84.344-41.08-142.73-41.08-142.73s-25.958-56.222-38.924-54.06c-12.978,2.164-41.094,38.931-41.094,38.931h-23.788h-23.788 c0,0-28.108-36.767-41.08-38.931c-12.979-2.163-38.924,54.06-38.924,54.06s-80.018,58.386-41.087,142.73 c13.822,29.953,40.741,45.572,68.634,53.748l-2.951,9.662c0,0-31.908,81.552-60.279,131.195C37.198,441.092,58.478,512,97.477,512 c29.47,0,79.14,0,101.692,0c7.292,0,11.763,0,11.763,0c22.544,0,72.222,0,101.691,0c12.654,0,23.38-7.547,31.204-19.324 c15.826-0.013,30.81-4.872,43.707-12.758c19.455-11.915,34.708-30.32,45.434-51.896c10.685-21.618,16.856-46.636,16.878-72.672 c0-20.484-3.885-41.619-12.682-61.813c-7.561-17.34-9.918-30.216-9.904-39.29c0.028-7.526,1.5-12.544,3.359-16.414 c1.417-2.889,3.124-5.17,4.983-7.091c2.771-2.868,5.964-4.879,8.349-6.054c1.182-0.595,2.135-0.968,2.674-1.162l0.449-0.152 l-0.007-0.028C458.179,220.189,464.779,208.724,461.814,197.514z" }) }) });
  const globalObject = _unsafeWindow ?? window ?? globalThis;
  const xhrOpen = globalObject.XMLHttpRequest.prototype.open;
  class ExtensionManager {
    constructor() {
      __publicField(this, "extensions", /* @__PURE__ */ new Map());
      __publicField(this, "disabledExtensions", /* @__PURE__ */ new Set());
      __publicField(this, "debugEnabled", false);
      /**
       * Signal for subscribing to extension changes.
       */
      __publicField(this, "signal", new signals.Signal(1));
      this.installHttpHooks();
      this.disabledExtensions = new Set(appOptionsManager.get("disabledExtensions", []));
      if (appOptionsManager.get("debug")) {
        this.debugEnabled = true;
        logger.info("Debug mode enabled");
      }
    }
    /**
     * Register and instantiate a new extension.
     *
     * @param ctor Extension constructor.
     */
    add(ctor) {
      try {
        logger.debug(`Register new extension: ${ctor.name}`);
        const instance = new ctor(this);
        this.extensions.set(instance.name, instance);
      } catch (err) {
        logger.error(`Failed to register extension: ${ctor.name}`, err);
      }
    }
    /**
     * Set up all enabled extensions.
     */
    start() {
      for (const ext of this.extensions.values()) {
        if (this.disabledExtensions.has(ext.name)) {
          this.disable(ext.name);
        } else {
          this.enable(ext.name);
        }
      }
    }
    enable(name2) {
      try {
        this.disabledExtensions.delete(name2);
        appOptionsManager.set("disabledExtensions", [...this.disabledExtensions]);
        const ext = this.extensions.get(name2);
        ext.enabled = true;
        ext.setup();
        logger.debug(`Enabled extension: ${name2}`);
        this.signal.value++;
      } catch (err) {
        logger.error(`Failed to enable extension: ${name2}`, err);
      }
    }
    disable(name2) {
      try {
        this.disabledExtensions.add(name2);
        appOptionsManager.set("disabledExtensions", [...this.disabledExtensions]);
        const ext = this.extensions.get(name2);
        ext.enabled = false;
        ext.dispose();
        logger.debug(`Disabled extension: ${name2}`);
        this.signal.value++;
      } catch (err) {
        logger.error(`Failed to disable extension: ${name2}`, err);
      }
    }
    getExtensions() {
      return [...this.extensions.values()];
    }
    /**
     * Here we hooks the browser's XHR method to intercept Twitter's Web API calls.
     * This need to be done before any XHR request is made.
     */
    installHttpHooks() {
      const manager = this;
      globalObject.XMLHttpRequest.prototype.open = function(method, url) {
        if (manager.debugEnabled) {
          logger.debug(`XHR initialized`, { method, url });
        }
        this.addEventListener("load", () => {
          if (manager.debugEnabled) {
            logger.debug(`XHR finished`, { method, url });
          }
          manager.getExtensions().filter((ext) => ext.enabled).forEach((ext) => {
            const func = ext.intercept();
            if (func) {
              func({ method, url }, this, ext);
            }
          });
        });
        xhrOpen.apply(this, arguments);
      };
      logger.info("Hooked into XMLHttpRequest");
      setTimeout(() => {
        if (!("webpackChunk_twitter_responsive_web" in globalObject)) {
          logger.error(
            'Error: Wrong execution context detected.\n  This script needs to be injected into "page" context rather than "content" context.\n  The XMLHttpRequest hook will not work properly.\n  See: https://github.com/prinsss/twitter-web-exporter/issues/19'
          );
        }
      }, 1e3);
    }
  }
  var ExtensionType = /* @__PURE__ */ ((ExtensionType2) => {
    ExtensionType2["TWEET"] = "tweet";
    ExtensionType2["USER"] = "user";
    ExtensionType2["CUSTOM"] = "custom";
    ExtensionType2["NONE"] = "none";
    return ExtensionType2;
  })(ExtensionType || {});
  class Extension {
    constructor(manager) {
      __publicField(this, "name", "");
      __publicField(this, "enabled", true);
      __publicField(this, "type", "none");
      __publicField(this, "manager");
      this.manager = manager;
    }
    /**
     * Optionally run side effects when enabled.
     */
    setup() {
    }
    /**
     * Optionally clear side effects when disabled.
     */
    dispose() {
    }
    /**
     * Intercept HTTP responses.
     */
    intercept() {
      return null;
    }
    /**
     * Render extension UI.
     */
    render() {
      return null;
    }
  }
  const extensionManager = new ExtensionManager();
  function saveFile(filename, content, prependBOM = false) {
    const link = document.createElement("a");
    let blob;
    if (content instanceof Blob) {
      blob = content;
    } else {
      blob = new Blob(prependBOM ? [new Uint8Array([239, 187, 191]), content] : [content], {
        type: "text/plain;charset=utf-8"
      });
    }
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }
  const DB_NAME = packageJson.name;
  const DB_VERSION = 1;
  class DatabaseManager {
    constructor() {
      __publicField(this, "db");
      this.db = new Dexie(DB_NAME);
      this.init();
    }
    /*
    |--------------------------------------------------------------------------
    | Type-Safe Table Accessors
    |--------------------------------------------------------------------------
    */
    tweets() {
      return this.db.table("tweets");
    }
    users() {
      return this.db.table("users");
    }
    captures() {
      return this.db.table("captures");
    }
    /*
    |--------------------------------------------------------------------------
    | Read Methods for Extensions
    |--------------------------------------------------------------------------
    */
    async extGetCaptures(extName) {
      return this.captures().where("extension").equals(extName).toArray().catch(this.logError);
    }
    async extGetCaptureCount(extName) {
      return this.captures().where("extension").equals(extName).count().catch(this.logError);
    }
    async extGetCapturedTweets(extName) {
      const captures = await this.extGetCaptures(extName);
      if (!captures) {
        return [];
      }
      const tweetIds = captures.map((capture) => capture.data_key);
      return this.tweets().where("rest_id").anyOf(tweetIds).filter((t) => this.filterEmptyData(t)).toArray().catch(this.logError);
    }
    async extGetCapturedUsers(extName) {
      const captures = await this.extGetCaptures(extName);
      if (!captures) {
        return [];
      }
      const userIds = captures.map((capture) => capture.data_key);
      return this.users().where("rest_id").anyOf(userIds).filter((t) => this.filterEmptyData(t)).toArray().catch(this.logError);
    }
    /*
    |--------------------------------------------------------------------------
    | Write Methods for Extensions
    |--------------------------------------------------------------------------
    */
    async extAddTweets(extName, tweets) {
      await this.upsertTweets(tweets);
      await this.upsertCaptures(
        tweets.map((tweet) => ({
          id: `${extName}-${tweet.rest_id}`,
          extension: extName,
          type: ExtensionType.TWEET,
          data_key: tweet.rest_id,
          created_at: Date.now()
        }))
      );
    }
    async extAddUsers(extName, users) {
      await this.upsertUsers(users);
      await this.upsertCaptures(
        users.map((user) => ({
          id: `${extName}-${user.rest_id}`,
          extension: extName,
          type: ExtensionType.USER,
          data_key: user.rest_id,
          created_at: Date.now()
        }))
      );
    }
    /*
    |--------------------------------------------------------------------------
    | Delete Methods for Extensions
    |--------------------------------------------------------------------------
    */
    async extClearCaptures(extName) {
      const captures = await this.extGetCaptures(extName);
      if (!captures) {
        return;
      }
      return this.captures().bulkDelete(captures.map((capture) => capture.id));
    }
    /*
    |--------------------------------------------------------------------------
    | Export and Import Methods
    |--------------------------------------------------------------------------
    */
    async export() {
      return dexieExportImport.exportDB(this.db).catch(this.logError);
    }
    async import(data) {
      return dexieExportImport.importInto(this.db, data).catch(this.logError);
    }
    async clear() {
      await this.deleteAllCaptures();
      await this.deleteAllTweets();
      await this.deleteAllUsers();
      logger.info("Database cleared");
    }
    async count() {
      try {
        return {
          tweets: await this.tweets().count(),
          users: await this.users().count(),
          captures: await this.captures().count()
        };
      } catch (error) {
        this.logError(error);
        return null;
      }
    }
    /*
    |--------------------------------------------------------------------------
    | Common Methods
    |--------------------------------------------------------------------------
    */
    async upsertTweets(tweets) {
      return this.db.transaction("rw", this.tweets(), () => {
        const data = tweets.map((tweet) => ({
          ...tweet,
          twe_private_fields: {
            created_at: +parseTwitterDateTime(tweet.legacy.created_at),
            updated_at: Date.now(),
            media_count: extractTweetMedia(tweet).length
          }
        }));
        return this.tweets().bulkPut(data);
      }).catch(this.logError);
    }
    async upsertUsers(users) {
      return this.db.transaction("rw", this.users(), () => {
        const data = users.map((user) => ({
          ...user,
          twe_private_fields: {
            created_at: +parseTwitterDateTime(user.legacy.created_at),
            updated_at: Date.now()
          }
        }));
        return this.users().bulkPut(data);
      }).catch(this.logError);
    }
    async upsertCaptures(captures) {
      return this.db.transaction("rw", this.captures(), () => {
        return this.captures().bulkPut(captures).catch(this.logError);
      }).catch(this.logError);
    }
    async deleteAllTweets() {
      return this.tweets().clear().catch(this.logError);
    }
    async deleteAllUsers() {
      return this.users().clear().catch(this.logError);
    }
    async deleteAllCaptures() {
      return this.captures().clear().catch(this.logError);
    }
    filterEmptyData(data) {
      if (!(data == null ? void 0 : data.legacy)) {
        logger.warn("Empty data found in DB", data);
        return false;
      }
      return true;
    }
    /*
    |--------------------------------------------------------------------------
    | Migrations
    |--------------------------------------------------------------------------
    */
    async init() {
      const tweetIndexPaths = [
        "rest_id",
        "twe_private_fields.created_at",
        "twe_private_fields.updated_at",
        "twe_private_fields.media_count",
        "core.user_results.result.legacy.screen_name",
        "legacy.favorite_count",
        "legacy.retweet_count",
        "legacy.bookmark_count",
        "legacy.quote_count",
        "legacy.reply_count",
        "views.count",
        "legacy.favorited",
        "legacy.retweeted",
        "legacy.bookmarked"
      ];
      const userIndexPaths = [
        "rest_id",
        "twe_private_fields.created_at",
        "twe_private_fields.updated_at",
        "legacy.screen_name",
        "legacy.followers_count",
        // 'legacy.friends_count',
        "legacy.statuses_count",
        "legacy.favourites_count",
        "legacy.listed_count",
        "legacy.verified_type",
        "is_blue_verified",
        "legacy.following",
        "legacy.followed_by"
      ];
      const captureIndexPaths = ["id", "extension", "type", "created_at"];
      try {
        this.db.version(DB_VERSION).stores({
          tweets: tweetIndexPaths.join(","),
          users: userIndexPaths.join(","),
          captures: captureIndexPaths.join(",")
        }).upgrade(async () => {
          logger.info("Database upgraded");
        });
        await this.db.open();
        logger.info("Database connected");
      } catch (error) {
        this.logError(error);
      }
    }
    /*
    |--------------------------------------------------------------------------
    | Loggers
    |--------------------------------------------------------------------------
    */
    logError(error) {
      logger.error(`Database Error: ${error.message}`, error);
    }
  }
  const databaseManager = new DatabaseManager();
  function Settings() {
    const { t, i18n } = useTranslation();
    const currentTheme = signals.useSignal(appOptionsManager.get("theme"));
    const [showSettings, toggleSettings] = useToggle(false);
    const styles = {
      subtitle: "mb-2 text-base-content ml-4 opacity-50 font-semibold text-xs",
      block: "text-sm mb-2 w-full flex px-4 py-2 text-base-content bg-base-200 rounded-box justify-between",
      item: "label cursor-pointer flex justify-between h-8 items-center p-0"
    };
    hooks.useEffect(() => {
      _GM_registerMenuCommand(`${t("Version")} ${packageJson.version}`, () => {
        window.open(packageJson.homepage, "_blank");
      });
    }, []);
    return /* @__PURE__ */ u(preact.Fragment, { children: [
      /* @__PURE__ */ u(
        "div",
        {
          onClick: toggleSettings,
          class: "w-9 h-9 mr-2 cursor-pointer flex justify-center items-center transition-colors duration-200 rounded-full hover:bg-base-200",
          children: /* @__PURE__ */ u(IconSettings, {})
        }
      ),
      /* @__PURE__ */ u(Modal, { title: t("Settings"), show: showSettings, onClose: toggleSettings, class: "max-w-lg", children: [
        /* @__PURE__ */ u("p", { class: styles.subtitle, children: t("General") }),
        /* @__PURE__ */ u("div", { class: cx(styles.block, "flex-col"), children: [
          /* @__PURE__ */ u("label", { class: styles.item, children: [
            /* @__PURE__ */ u("span", { class: "label-text", children: t("Theme") }),
            /* @__PURE__ */ u(
              "select",
              {
                class: "select select-xs",
                onChange: (e) => {
                  var _a;
                  currentTheme.value = ((_a = e.target) == null ? void 0 : _a.value) ?? DEFAULT_APP_OPTIONS.theme;
                  appOptionsManager.set("theme", currentTheme.value);
                },
                children: THEMES.map((theme) => /* @__PURE__ */ u("option", { value: theme, selected: currentTheme.value === theme, children: capitalizeFirstLetter(theme) }, theme))
              }
            )
          ] }),
          /* @__PURE__ */ u("label", { class: styles.item, children: [
            /* @__PURE__ */ u("span", { class: "label-text", children: t("Language") }),
            /* @__PURE__ */ u(
              "select",
              {
                class: "select select-xs",
                onChange: (e) => {
                  var _a;
                  const language = ((_a = e.target) == null ? void 0 : _a.value) ?? detectBrowserLanguage();
                  i18n.changeLanguage(language);
                  appOptionsManager.set("language", language);
                },
                children: Object.entries(LANGUAGES_CONFIG).map(([langTag, langConf]) => /* @__PURE__ */ u(
                  "option",
                  {
                    value: langTag,
                    selected: appOptionsManager.get("language") === langTag,
                    children: [
                      langConf.nameEn,
                      " - ",
                      langConf.name
                    ]
                  },
                  langTag
                ))
              }
            )
          ] }),
          /* @__PURE__ */ u("label", { class: styles.item, children: [
            /* @__PURE__ */ u("span", { class: "label-text", children: t("Debug") }),
            /* @__PURE__ */ u(
              "input",
              {
                type: "checkbox",
                class: "toggle toggle-primary",
                checked: appOptionsManager.get("debug"),
                onChange: (e) => {
                  var _a;
                  appOptionsManager.set("debug", (_a = e.target) == null ? void 0 : _a.checked);
                }
              }
            )
          ] }),
          /* @__PURE__ */ u("label", { class: styles.item, children: [
            /* @__PURE__ */ u("div", { class: "flex items-center", children: [
              /* @__PURE__ */ u("span", { class: "label-text", children: t("Date Time Format") }),
              /* @__PURE__ */ u(
                "a",
                {
                  href: "https://day.js.org/docs/en/display/format",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  class: "tooltip tooltip-bottom ml-0.5 before:max-w-40",
                  "data-tip": t(
                    "Click for more information. This will take effect on both previewer and exported files."
                  ),
                  children: /* @__PURE__ */ u(IconHelp, { size: 20 })
                }
              )
            ] }),
            /* @__PURE__ */ u(
              "input",
              {
                type: "text",
                class: "input input-bordered input-xs w-48",
                value: appOptionsManager.get("dateTimeFormat"),
                onChange: (e) => {
                  var _a;
                  appOptionsManager.set("dateTimeFormat", (_a = e.target) == null ? void 0 : _a.value);
                }
              }
            )
          ] }),
          /* @__PURE__ */ u("div", { class: styles.item, children: [
            /* @__PURE__ */ u("div", { class: "flex items-center", children: /* @__PURE__ */ u("span", { class: "label-text", children: t("Local Database") }) }),
            /* @__PURE__ */ u("div", { children: [
              /* @__PURE__ */ u(
                "button",
                {
                  class: "btn btn-xs btn-neutral mr-2",
                  onClick: async () => {
                    let storageUsageText = "Storage usage: N/A";
                    if (typeof navigator.storage.estimate === "function") {
                      const { quota = 1, usage = 0 } = await navigator.storage.estimate();
                      const usageMB = (usage / 1024 / 1024).toFixed(2);
                      const quotaMB = (quota / 1024 / 1024).toFixed(2);
                      storageUsageText = `Storage usage: ${usageMB}MB / ${quotaMB}MB`;
                    }
                    const count = await databaseManager.count();
                    alert(
                      storageUsageText + "\n\nIndexedDB tables count:\n" + JSON.stringify(count, void 0, "  ")
                    );
                  },
                  children: [
                    /* @__PURE__ */ u(IconReportAnalytics, { size: 20 }),
                    t("Analyze DB")
                  ]
                }
              ),
              /* @__PURE__ */ u(
                "button",
                {
                  class: "btn btn-xs btn-primary mr-2",
                  onClick: async () => {
                    const blob = await databaseManager.export();
                    if (blob) {
                      saveFile(`twitter-web-exporter-${Date.now()}.json`, blob);
                    }
                  },
                  children: [
                    /* @__PURE__ */ u(IconDatabaseExport, { size: 20 }),
                    t("Export DB")
                  ]
                }
              ),
              /* @__PURE__ */ u(
                "button",
                {
                  class: "btn btn-xs btn-warning",
                  onClick: async () => {
                    if (confirm(t("Are you sure to clear all data in the database?"))) {
                      await databaseManager.clear();
                    }
                  },
                  children: [
                    /* @__PURE__ */ u(IconTrashX, { size: 20 }),
                    t("Clear DB")
                  ]
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ u("p", { class: styles.subtitle, children: t("Modules (Scroll to see more)") }),
        /* @__PURE__ */ u("div", { class: cx(styles.block, "flex-col", "max-h-44 overflow-scroll"), children: extensionManager.getExtensions().map((extension) => /* @__PURE__ */ u("label", { class: cx(styles.item, "flex-shrink-0"), children: [
          /* @__PURE__ */ u("span", { children: [
            t(extension.name.replace("Module", "")),
            " ",
            t("Module")
          ] }),
          /* @__PURE__ */ u(
            "input",
            {
              type: "checkbox",
              class: "toggle toggle-secondary",
              checked: extension.enabled,
              onChange: () => {
                if (extension.enabled) {
                  extensionManager.disable(extension.name);
                } else {
                  extensionManager.enable(extension.name);
                }
              }
            }
          )
        ] }, extension.name)) }),
        /* @__PURE__ */ u("p", { class: styles.subtitle, children: t("About") }),
        /* @__PURE__ */ u("div", { class: styles.block, children: [
          /* @__PURE__ */ u("span", { class: "label-text", children: [
            t("Version"),
            " ",
            packageJson.version
          ] }),
          /* @__PURE__ */ u("a", { class: "btn btn-xs btn-ghost", target: "_blank", href: packageJson.homepage, children: [
            /* @__PURE__ */ u(IconBrandGithubFilled, { class: "[&>path]:stroke-0" }),
            "GitHub"
          ] })
        ] })
      ] })
    ] });
  }
  function App() {
    const { t } = useTranslation();
    const extensions = signals.useSignal([]);
    const currentTheme = signals.useSignal(appOptionsManager.get("theme"));
    const showControlPanel = signals.useSignal(appOptionsManager.get("showControlPanel"));
    const toggleControlPanel = () => {
      showControlPanel.value = !showControlPanel.value;
      appOptionsManager.set("showControlPanel", showControlPanel.value);
    };
    hooks.useEffect(() => {
      extensionManager.signal.subscribe(() => {
        extensions.value = extensionManager.getExtensions();
      });
      appOptionsManager.signal.subscribe(() => {
        currentTheme.value = appOptionsManager.get("theme");
      });
      _GM_registerMenuCommand(t("Open Control Panel"), toggleControlPanel);
      logger.debug("App useEffect executed");
    }, []);
    return /* @__PURE__ */ u(preact.Fragment, { children: [
      /* @__PURE__ */ u(
        "div",
        {
          onClick: toggleControlPanel,
          "data-theme": currentTheme.value,
          id: "twe-toggle-panel",
          role: "button",
          "aria-label": "Cat Toggle Panel Icon",
          "aria-expanded": showControlPanel.value,
          class: "group w-12 h-12 fixed top-[80%] left-[-15px] cursor-pointer bg-transparent fill-base-content",
          children: /* @__PURE__ */ u("div", { class: "w-full h-full origin origin-[bottom_center] transition-all duration-200 group-hover:translate-x-[5px] group-hover:rotate-[20deg] opacity-50 group-hover:opacity-90", children: /* @__PURE__ */ u(CatIcon, {}) })
        }
      ),
      /* @__PURE__ */ u(
        "section",
        {
          "data-theme": currentTheme.value,
          class: cx(
            "card card-compact bg-base-100 fixed border shadow-xl w-80 leading-loose text-base-content px-4 py-3 rounded-box border-solid border-neutral-content border-opacity-50 left-8 bottom-10 transition-transform duration-500",
            showControlPanel.value ? "translate-x-0 transform-none" : "translate-x-[-500px]"
          ),
          children: [
            /* @__PURE__ */ u("header", { class: "flex items-center h-9", children: [
              /* @__PURE__ */ u(IconBrandTwitterFilled, { class: "mr-2" }),
              /* @__PURE__ */ u("h2", { class: "font-semibold leading-none text-xl m-0 flex-grow", children: "Web Exporter P" }),
              /* @__PURE__ */ u(ErrorBoundary, { children: /* @__PURE__ */ u(Settings, {}) }),
              /* @__PURE__ */ u(
                "div",
                {
                  onClick: toggleControlPanel,
                  class: "w-9 h-9 cursor-pointer flex justify-center items-center transition-colors duration-200 rounded-full hover:bg-base-200",
                  children: /* @__PURE__ */ u(IconX, {})
                }
              )
            ] }),
            /* @__PURE__ */ u("p", { class: "text-sm text-base-content text-opacity-70 mb-1 leading-none", children: t("Browse around to capture more data.") }),
            /* @__PURE__ */ u("div", { class: "divider mt-0 mb-0" }),
            /* @__PURE__ */ u("main", { children: extensions.value.map((ext) => {
              const Component2 = ext.render();
              if (ext.enabled && Component2) {
                return /* @__PURE__ */ u(ErrorBoundary, { children: /* @__PURE__ */ u(Component2, { extension: ext }, ext.name) });
              }
              return null;
            }) })
          ]
        }
      )
    ] });
  }
  function AllLinksUI({ extension }) {
    var _a;
    useTranslation();
    const [showModal, toggleShowModal] = useToggle();
    const [currentIndex, setCurrentIndex] = hooks.useState(0);
    const [isDownloaded, setIsDownloaded] = hooks.useState(false);
    const [linkdatas, setLinkdatas] = hooks.useState([]);
    const [clipboardLoaded, setClipboardLoaded] = hooks.useState(false);
    const [lastUsername, setLastUsername] = hooks.useState("");
    const [selection, setSelection] = hooks.useState("用户推文");
    const [userTweetsData, setUserTweetsData] = hooks.useState([]);
    const [bookmarksData, setBookmarksData] = hooks.useState([]);
    const [searchData, setSearchData] = hooks.useState([]);
    const [detailrecords, setDetailrecords] = hooks.useState([]);
    const title = "自动采集详情";
    const [dataSource, setDataSource] = hooks.useState("UserTweetsModule");
    const datas = dataSource === "UserTweetsModule" ? userTweetsData : dataSource === "BookmarksModule" ? bookmarksData : dataSource === "SearchTimelineModule" ? searchData : [];
    const loadDataFromDB = async () => {
      try {
        const userTweets = await databaseManager.extGetCapturedTweets("UserTweetsModule");
        setUserTweetsData(userTweets || []);
        const bookmarks = await databaseManager.extGetCapturedTweets("BookmarksModule");
        setBookmarksData(bookmarks || []);
        const search = await databaseManager.extGetCapturedTweets("SearchTimelineModule");
        setSearchData(search || []);
        const details = await databaseManager.extGetCapturedTweets("TweetDetailModule");
        setDetailrecords(details || []);
        logger.debug("数据库数据加载完成", {
          userTweets: userTweets == null ? void 0 : userTweets.length,
          bookmarks: bookmarks == null ? void 0 : bookmarks.length,
          search: search == null ? void 0 : search.length,
          details: details == null ? void 0 : details.length
        });
      } catch (error) {
        logger.error("从数据库加载数据失败", error);
      }
    };
    hooks.useEffect(() => {
      loadDataFromDB();
      const intervalId = setInterval(loadDataFromDB, 5e3);
      return () => clearInterval(intervalId);
    }, []);
    const getCurrentTweetUrl = () => {
      var _a2, _b, _c, _d;
      if (items && items[currentIndex] && items[currentIndex].rest_id) {
        const item = items[currentIndex];
        const screenName = item.__typename === "Tweet" ? (_d = (_c = (_b = (_a2 = item.core) == null ? void 0 : _a2.user_results) == null ? void 0 : _b.result) == null ? void 0 : _c.legacy) == null ? void 0 : _d.screen_name : null;
        return screenName ? `https://twitter.com/${screenName}/status/${items[currentIndex].rest_id}` : `https://twitter.com/i/web/status/${items[currentIndex].rest_id}`;
      }
      return "#";
    };
    const handleRollingLinkClick = (e) => {
      var _a2, _b, _c, _d;
      console.log("[all-links>>ui.tsx] handleRollingLinkClick currentIndex: ", currentIndex);
      e.preventDefault();
      console.log("[all-links>>ui.tsx] handleRollingLinkClick currentIndex: ", currentIndex);
      console.log("[all-links>>ui.tsx] handleRollingLinkClick isDownloaded: ", isDownloaded);
      if (items && items[currentIndex] && currentIndex <= items.length - 1) {
        const record = items[currentIndex];
        const screenName = record.__typename === "Tweet" ? (_d = (_c = (_b = (_a2 = record.core) == null ? void 0 : _a2.user_results) == null ? void 0 : _b.result) == null ? void 0 : _c.legacy) == null ? void 0 : _d.screen_name : null;
        setLastUsername(screenName || "");
        const tweetUrl = screenName ? `https://twitter.com/${screenName}/status/${items[currentIndex].rest_id}` : `https://twitter.com/i/web/status/${items[currentIndex].rest_id}`;
        window.open(tweetUrl, "_blank");
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else if (!isDownloaded) {
        const patchname = selection == "用户推文" ? lastUsername : "其他推文";
        exportTweetDetailsData({ patchname });
        setIsDownloaded(true);
      } else {
        console.log("[all-links>>ui.tsx] handleRollingLinkClick currentIndex: ", currentIndex);
        console.log("[all-links>>ui.tsx] handleRollingLinkClick items.length: ", items == null ? void 0 : items.length);
      }
    };
    let atag;
    const loadFromClipboard = async () => {
      try {
        const text = await navigator.clipboard.readText();
        logger.debug("从剪贴板读取文本", text);
        const lines = text.split("\n").filter((line) => line.trim() !== "");
        if (lines.length > 0) {
          const tweetObjects = lines.map((url) => {
            const match = url.match(/(?:twitter\.com|x\.com)\/([^/]+)\/status\/([0-9]+)/);
            if (!match) return null;
            const screenName = match[1];
            const tweetId = match[2];
            return {
              "__typename": "Tweet",
              "rest_id": tweetId,
              "legacy": {
                "entities": {
                  "urls": [],
                  "media": []
                },
                "created_at": (/* @__PURE__ */ new Date()).toString(),
                "full_text": "",
                "favorite_count": 0,
                "favorited": false,
                "retweet_count": 0,
                "retweeted": false,
                "user_id_str": "",
                "id_str": tweetId || "",
                "is_quote_status": false,
                "lang": "",
                "quote_count": 0,
                "reply_count": 0,
                "conversation_id_str": "",
                "display_text_range": [0, 0],
                "bookmark_count": 0,
                "bookmarked": false,
                "possibly_sensitive": false,
                "possibly_sensitive_editable": false
              },
              "core": {
                "user_results": {
                  "result": {
                    "__typename": "User",
                    "legacy": {
                      "screen_name": screenName
                    }
                  }
                }
              },
              "edit_control": {
                "edit_tweet_ids": [],
                "editable_until_msecs": "0",
                "is_edit_eligible": false,
                "edits_remaining": "0"
              },
              "is_translatable": false,
              "views": {
                "state": "Enabled"
              },
              "source": "",
              "twe_private_fields": {
                "created_at": Date.now(),
                "updated_at": Date.now(),
                "media_count": 0
              }
            };
          }).filter((tweetx) => tweetx !== null);
          if (tweetObjects.length > 0) {
            setLinkdatas(tweetObjects);
            setClipboardLoaded(true);
            logger.debug("从剪贴板加载数据成功，记录数", tweetObjects.length);
            return;
          } else {
            logger.error("未能从URL中提取有效的推文信息");
          }
        } else {
          logger.error("剪贴板内容为空或格式不正确");
        }
      } catch (e) {
        logger.error("读取剪贴板失败:", e);
      }
      setLinkdatas([]);
      return;
    };
    hooks.useEffect(() => {
      loadFromClipboard();
    }, []);
    const clearTweetDetailsData = async () => {
      logger.debug("清空推文详情数据");
      return databaseManager.extClearCaptures("TweetDetailModule");
    };
    const exportTweetDetailsData = async ({ patchname }) => {
      const processExportData = () => {
        return detailrecords == null ? void 0 : detailrecords.map((record) => {
          var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D;
          const screenName = record.__typename === "Tweet" ? (_d = (_c = (_b = (_a2 = record.core) == null ? void 0 : _a2.user_results) == null ? void 0 : _b.result) == null ? void 0 : _c.legacy) == null ? void 0 : _d.screen_name : null;
          const isTweet = record.__typename === "Tweet";
          const createdAt = ((_e = record.legacy) == null ? void 0 : _e.created_at) ? formatDateTime(
            parseTwitterDateTime(record.legacy.created_at),
            appOptionsManager.get("dateTimeFormat")
          ) : null;
          const fullText = isTweet ? ((_f = record.legacy) == null ? void 0 : _f.full_text) || ((_i = (_h = (_g = record.note_tweet) == null ? void 0 : _g.note_tweet_results) == null ? void 0 : _h.result) == null ? void 0 : _i.text) || "" : "";
          const media = isTweet ? extractTweetMedia(record).map((media2) => ({
            type: media2.type,
            url: media2.url,
            thumbnail: formatTwitterImage(media2.media_url_https, "thumb"),
            original: getMediaOriginalUrl(media2),
            ext_alt_text: media2.ext_alt_text
          })) : [];
          const name2 = isTweet ? (_m = (_l = (_k = (_j = record.core) == null ? void 0 : _j.user_results) == null ? void 0 : _k.result) == null ? void 0 : _l.legacy) == null ? void 0 : _m.name : null;
          const profileImageUrl = isTweet ? (_q = (_p = (_o = (_n = record.core) == null ? void 0 : _n.user_results) == null ? void 0 : _o.result) == null ? void 0 : _p.legacy) == null ? void 0 : _q.profile_image_url_https : null;
          const inReplyTo = isTweet ? (_r = record.legacy) == null ? void 0 : _r.in_reply_to_status_id_str : null;
          const retweetedStatus = isTweet ? (_s = extractRetweetedTweet(record)) == null ? void 0 : _s.rest_id : null;
          const quotedStatus = isTweet ? (_t = extractQuotedTweet(record)) == null ? void 0 : _t.rest_id : null;
          const favoriteCount = isTweet ? (_u = record.legacy) == null ? void 0 : _u.favorite_count : null;
          const retweetCount = isTweet ? (_v = record.legacy) == null ? void 0 : _v.retweet_count : null;
          const bookmarkCount = isTweet ? (_w = record.legacy) == null ? void 0 : _w.bookmark_count : null;
          const quoteCount = isTweet ? (_x = record.legacy) == null ? void 0 : _x.quote_count : null;
          const replyCount = isTweet ? (_y = record.legacy) == null ? void 0 : _y.reply_count : null;
          const viewsCount = isTweet && typeof ((_z = record.views) == null ? void 0 : _z.count) !== "undefined" ? (_A = record.views) == null ? void 0 : _A.count : null;
          const favorited = isTweet ? (_B = record.legacy) == null ? void 0 : _B.favorited : null;
          const retweeted = isTweet ? (_C = record.legacy) == null ? void 0 : _C.retweeted : null;
          const bookmarked = isTweet ? (_D = record.legacy) == null ? void 0 : _D.bookmarked : null;
          const url = screenName ? `https://twitter.com/${screenName}/status/${record.rest_id}` : `https://twitter.com/i/web/status/${record.rest_id}`;
          return {
            id: record.rest_id,
            created_at: createdAt,
            full_text: fullText,
            media,
            screen_name: screenName,
            name: name2,
            profile_image_url: profileImageUrl,
            in_reply_to: inReplyTo,
            retweeted_status: retweetedStatus,
            quoted_status: quotedStatus,
            favorite_count: favoriteCount,
            retweet_count: retweetCount,
            bookmark_count: bookmarkCount,
            quote_count: quoteCount,
            reply_count: replyCount,
            views_count: viewsCount,
            favorited,
            retweeted,
            bookmarked,
            url
          };
        });
      };
      const exportData = processExportData();
      if (exportData) {
        const filename = `tweet_details_${selection}_${patchname}_${Date.now()}.json`;
        logger.debug("导出推文详情数据文件名", filename);
        navigator.clipboard.writeText(filename).catch(console.error);
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    };
    const items = clipboardLoaded ? linkdatas : datas;
    const buttons = /* @__PURE__ */ u("div", { children: [
      /* @__PURE__ */ u("div", { className: "mb-3", children: /* @__PURE__ */ u(
        "button",
        {
          class: "ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700",
          onClick: () => {
            exportTweetDetailsData({ patchname: "autobak" }).then(() => {
              clearTweetDetailsData();
              setCurrentIndex(0);
              setIsDownloaded(false);
            });
          },
          children: [
            "当前推文详情数量: ",
            detailrecords == null ? void 0 : detailrecords.length,
            " , 备份并清空推文详情模块数据(谨慎操作)"
          ]
        }
      ) }),
      /* @__PURE__ */ u("div", { className: "mb-3", children: /* @__PURE__ */ u(
        "button",
        {
          class: "ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700",
          onClick: () => {
            loadFromClipboard().then(() => {
              setDataSource("未选");
              setCurrentIndex(0);
              setIsDownloaded(false);
            });
            setSelection("剪贴板");
          },
          children: "自动采集剪贴板中的推文详情数据"
        }
      ) }),
      /* @__PURE__ */ u("div", { className: "mb-3", children: /* @__PURE__ */ u(
        "button",
        {
          class: "ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700",
          onClick: () => {
            setLinkdatas([]);
            setClipboardLoaded(false);
            setDataSource("UserTweetsModule");
            setCurrentIndex(0);
            setIsDownloaded(false);
            setSelection("用户推文");
          },
          children: "自动采集[用户]推文详情数据"
        }
      ) }),
      /* @__PURE__ */ u("div", { className: "mb-3", children: /* @__PURE__ */ u(
        "button",
        {
          class: "ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700",
          onClick: () => {
            setLinkdatas([]);
            setClipboardLoaded(false);
            setDataSource("BookmarksModule");
            setCurrentIndex(0);
            setIsDownloaded(false);
            setSelection("标签");
          },
          children: "自动采集[书签]推文详情数据"
        }
      ) }),
      /* @__PURE__ */ u("div", { className: "mb-3", children: /* @__PURE__ */ u(
        "button",
        {
          class: "ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700",
          onClick: () => {
            setLinkdatas([]);
            setClipboardLoaded(false);
            setDataSource("SearchTimelineModule");
            setCurrentIndex(0);
            setIsDownloaded(false);
            setSelection("搜索结果");
          },
          children: "自动采集[搜索结果]推文详情数据"
        }
      ) })
    ] });
    if (items && items.length > 0) {
      let dynamictext = "";
      if (currentIndex <= items.length - 1) {
        dynamictext = `当前选项:${selection}, 链接数: ${items.length}, 当前数据:` + ((_a = items[currentIndex]) == null ? void 0 : _a.rest_id) + "(" + (items.length - currentIndex) + ")";
      } else {
        dynamictext = isDownloaded ? `${selection}推文详情文件下载完成` : "没有更多链接了，点击导出全部推文详情数据";
      }
      const linkElement = /* @__PURE__ */ u(
        "a",
        {
          href: getCurrentTweetUrl(),
          onClick: handleRollingLinkClick,
          class: "text-blue-500 hover:text-blue-700 underline",
          target: "_blank",
          rel: "noopener noreferrer",
          "aria-label": `rollinglink-${items.length}`,
          children: dynamictext
        }
      );
      if (currentIndex == 0) {
        atag = /* @__PURE__ */ u("div", { children: [
          linkElement,
          buttons
        ] });
      } else {
        atag = linkElement;
      }
    } else {
      atag = /* @__PURE__ */ u("div", { children: [
        /* @__PURE__ */ u("div", { children: [
          "当前选项[",
          selection,
          "]没有数据"
        ] }),
        buttons
      ] });
    }
    return /* @__PURE__ */ u(
      ExtensionPanel,
      {
        title,
        description: "Click to view all links",
        active: false,
        onClick: toggleShowModal,
        "aria-label": "All Links Menu",
        "data-ExtensionPanel-title": title,
        children: /* @__PURE__ */ u(
          Modal,
          {
            class: "fixed inset-0 w-full h-full z-50 bg-white dark:bg-gray-800 overflow-auto flex flex-col",
            title: `${title}(刷新或点击关闭按钮可关闭此页)`,
            show: showModal,
            onClose: toggleShowModal,
            children: /* @__PURE__ */ u("div", { class: "flex-1 p-4 overflow-y-auto", children: atag })
          }
        )
      }
    );
  }
  class AllLinksModule extends Extension {
    constructor(manager) {
      super(manager);
      this.name = "AllLinksModule";
      this.type = ExtensionType.CUSTOM;
    }
    render() {
      return AllLinksUI;
    }
  }
  extensionManager.add(AllLinksModule);
  extensionManager.start();
  function mountApp() {
    const root = document.createElement("div");
    root.id = "twe-root";
    document.body.append(root);
    preact.render(/* @__PURE__ */ u(App, {}), root);
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountApp);
  } else {
    mountApp();
  }

})(preact, preactHooks, preactSignals, i18next, dayjs, Dexie, DexieExportImport);