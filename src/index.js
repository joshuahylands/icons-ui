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
        if (props.onClick != null || props.href != null) {
            className += ' icons-ui-click';
        }
        function onClick(event) {
            if (props.onClick != null) {
                props.onClick(event);
            } else if (props.href != null) {
                if (props.target == null || props.target == '_blank') {
                    window.open(props.href);
                } else if (props.target == '_self') {
                    window.location.href = props.href;
                }
            }
        }
        return React.createElement('i', { className: className, style: style, onClick: function(event) { onClick(event) } }, props.icon[1]);
    };

    const PreactIcon = function(props) {
        let className = 'icons-ui ' + props.icon[0];
        let style = {};
        if (props.size != null) {
            style.fontSize = props.size;
        }
        if (props.onClick != null || props.href != null) {
            className += ' icons-ui-click';
        }
        function onClick(e) {
            if (props.onClick != null) {
                props.onClick(e);
            } else if (props.href != null) {
                if (props.target == null || props.target == '_blank') {
                    window.open(props.href);
                } else if (props.target == '_self') {
                    window.location.href = props.href;
                }
            }
        }
        return preact.h('i', { class: className, style: style, onClick: function(e) { onClick(e) } }, props.icon[1]);
    };

    const VueIcon = {
        template: '<i class="icons-ui" v-bind:class="[icon[0], sizeClass]" v-bind:style="sizeStyle" v-on:click="click($event)">{{ icon[1] }}</i>',
        props: {
            icon: {
                type: Array,
                required: true
            },
            size: {
                type: [ String, Number ],
                required: false
            },
            onClick: {
                type: Function,
                required: false
            },
            href: {
                type: String,
                required: false
            },
            target: {
                type: String,
                required: false
            }
        },
        data: function() {
            let sizeClass = '';
            let sizeStyle = {};
            if (this.size != undefined) {
                sizeStyle.fontSize = this.size + 'px;';
            }
            if (this.onClick != undefined || this.href != undefined) {
                sizeClass += ' icons-ui-click';
            }
            return {
                sizeClass: sizeClass,
                sizeStyle: sizeStyle
            }
        },
        methods: {
            click: function(event) {
                if (this.onClick != undefined) {
                    this.onClick(event);
                } else if (this.href != undefined) {
                    if (this.target == undefined || this.target == '_blank') {
                        window.open(this.href);
                    } else if (this.target == '_self') {
                        window.location.href = this.href;
                    }
                }
            }
        }
    };

    const AngularJSIcon = function() {
        let iconsUI = angular.module('icons-ui', []);
        iconsUI.component('icon', {
            template: '<i class="{{$ctrl.class}}" style="{{$ctrl.style}}" ng-click="click($event)">{{$ctrl.icon[1]}}</i>',
            bindings: {
                icon: '=',
                size: '=',
                onClick: '=',
                href: '=',
                target: '='
            },
            controller: [ '$scope', '$window', function IconsUIController($scope, $window) {
                this.$onInit = function() {
                    this.class = [ 'icons-ui', this.icon[0] ];
                    this.style = '';
                    if (this.size != undefined) {
                        this.style = 'font-size:' + this.size + 'px;';
                    }
                    if (this.onClick != undefined || this.href != undefined) {
                        this.class.push('icons-ui-click');
                    }
                    this.class = this.class.join(' ');
                };
                $scope.click = function(event) {
                    if ($scope.$ctrl.onClick != undefined) {
                        $scope.$ctrl.onClick(event);
                    } else if ($scope.$ctrl.href != undefined) {
                        if ($scope.$ctrl.target == undefined || $scope.$ctrl.target == '_blank') {
                            window.open($scope.$ctrl.href);
                        } else if ($scope.$ctrl.target == '_self') {
                            window.location.href = $scope.$ctrl.href;
                        }
                    }
                };
            }]
        });

        return 'icons-ui';
    };

    const JSIcon = function(data) {
        data.size = data.size || ''
        let style = '';

        const iTag = document.createElement('i');

        if (data.size != undefined) {
            style = 'font-size:' + data.size + 'px;';
            data.size = '';
        }

        iTag.className = 'icons-ui ' + data.icon[0];
        if (style != '') {
            iTag.style = style;
        }
        iTag.innerHTML = data.icon[1];

        if (data.onClick != undefined || data.href != undefined) {
            iTag.className += ' icons-ui-click';
        }

        iTag.addEventListener('click', function(event) {
            if (data.onClick != undefined) {
                data.onClick(event);
            } else if (data.href != undefined) {
                if (data.target == undefined || data.target == '_blank') {
                    window.open(data.href);
                } else if (data.target == '_self') {
                    window.location.href = data.href;
                }
            }
        });

        return iTag;
    };    

    const InitStylesheet = function(iconsName) {
        const stylesheet = document.createElement('link');
        stylesheet.rel = 'stylesheet';
        stylesheet.href = iconsUrls[iconsName];
        stylesheet.className = 'icons-ui-' + iconsName + '-embedded';
        document.head.appendChild(stylesheet);
    };

    const InitClickStylesheet = function() {
        if (document.getElementsByClassName('icons-ui-click-styles-embedded').length == 0) {
            const stylesheet = document.createElement('style');
            stylesheet.innerHTML = '.icons-ui-click{cursor:pointer;}';
            stylesheet.className = 'icons-ui-click-styles-embedded';
            document.head.appendChild(stylesheet);
        }
    }
    
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
                InitClickStylesheet();
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
            } else if (window.preact != undefined && frameworkUsed == undefined || frameworkUsed == 'preact') {
                return PreactIcon;
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
