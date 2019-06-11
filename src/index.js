module.exports = (function() {

    'use strict';

    if (window._iconsUI == undefined) {
        window._iconsUI = {};
        window._iconsUI.materialIcons = null;
        window._iconsUI.fontawesomeIcons = null;
        window._iconsUI.ionicons = null;
    }

    const iconsUrls = Object.freeze({
        fontawesome: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.css',
        materialicons: 'https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp',
        ionicons: 'https://unpkg.com/ionicons@4.5.5/dist/css/ionicons.min.css'
    });

    const ReactIcon = function(props) {
        let className = 'icons-ui ' + props.icon[0];
        let style = {};
        if (props.size != null) {
            style.fontSize = props.size;
        }
        return React.createElement('i', { className: className, style: style }, props.icon[1]);
    };

    const VueIcon = {
        template: '<i class="icons-ui" v-bind:class="[icon[0], sizeClass]" v-bind:style="sizeStyle">{{ icon[1] }}</i>',
        props: {
            icon: {
                type: Array,
                required: true
            },
            size: {
                type: [ String, Number ],
                required: false
            }
        },
        data: function() {
            let sizeClass = '';
            let sizeStyle = {};
            if (this.size != undefined) {
                sizeStyle.fontSize = this.size + 'px;';
            }
            return {
                sizeClass: sizeClass,
                sizeStyle: sizeStyle
            }
        }
    };

    const AngularJSIcon = function() {
        let iconsUI = angular.module('icons-ui', []);
        iconsUI.component('icon', {
            template: '<i class="{{$ctrl.class}}" style="{{$ctrl.style}}">{{$ctrl.icon[1]}}</i>',
            bindings: {
                icon: '=',
                size: '='
            },
            controller: function IconsUIController() {
                this.$onInit = function() {
                    this.class = [ 'icons-ui', this.icon[0] ];
                    this.style = '';
                    if (this.size != undefined) {
                        this.style = 'font-size:' + this.size + 'px;';
                    }
                    this.class = this.class.join(' ');
                }
            }
        });

        return 'icons-ui';
    };

    const JSIcon = function(icon, size) {
        size = size || ''
        let style = '';

        const iTag = document.createElement('i');

        if (size != undefined) {
            style = 'font-size:' + size + 'px;';
            size = '';
        }

        iTag.className = 'icons-ui ' + icon[0];
        if (style != '') {
            iTag.style = style;
        }
        iTag.innerHTML = icon[1];
        return iTag;
    };    

    const InitStylesheet = function(iconsName) {
        const stylesheet = document.createElement('link');
        stylesheet.rel = 'stylesheet';
        stylesheet.href = iconsUrls[iconsName];
        stylesheet.className = 'icons-ui-' + iconsName + '-embedded';
        document.head.appendChild(stylesheet);
    };

    const req = function(url) {
        let xhr = new XMLHttpRequest();
        xhr.onload = function() {
            console.log(xhr.response);
        };
        xhr.responseType = 'json';
        xhr.open('GET', url);
        xhr.send();
    };

    class FObject extends Function {
        constructor(func) {
            super('return this.func();');
            this.func = func;
            return this.bind(this);
        }
    }

    const InitIcons = function(iconsName) {
        let obj = new FObject(function() {
            if (document.getElementsByClassName('icons-ui-' + iconsName + '-embedded').length == 0) {
                InitStylesheet(iconsName);
                const iconData = require('./icons/' + iconsName);
                const iconKeys = Object.keys(iconData);
                for (let i = 0; i < iconKeys.length; i++) {
                    obj[iconKeys[i]] = iconData[iconKeys[i]];
                }
            }
        });
        return obj;
    };

    return {

        MaterialIcons: (function() {
            if (window._iconsUI.materialIcons == null) {
                window._iconsUI.materialIcons = InitIcons('materialicons');
            }
            return window._iconsUI.materialIcons;
        })(),

        FontAwesomeIcons: (function() {
            if (window._iconsUI.fontawesomeIcons == null) {
                window._iconsUI.fontawesomeIcons = InitIcons('fontawesome');
            }
            return window._iconsUI.fontawesomeIcons;
        })(),

        IonIcons: (function() {
            if (window._iconsUI.ionicons == null) {
                window._iconsUI.ionicons = InitIcons('ionicons');
            }
            return window._iconsUI.ionicons;
        })(),

        Icon: (function() {
            let frameworkUsed = window.iconsUI;

            if (window.React != undefined && frameworkUsed == undefined || frameworkUsed == 'react') {
                return ReactIcon;
            } else if (window.Vue != undefined && frameworkUsed == undefined || frameworkUsed == 'vue') {
                return VueIcon;
            } else if (window.angular != undefined && frameworkUsed == undefined || frameworkUsed == 'angularjs') {
                return AngularJSIcon();
            } else {
                return JSIcon;
            }
        })()

    };

})();
