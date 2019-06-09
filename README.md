# icons-ui

`icons-ui` is a package that allows multiple icon packages to be used in multiple frontend frameworks.

## Installation
To install `icons-ui` you will need [`npm`](https://www.npmjs.com/), a Javascript package manager for [Node.js](https://nodejs.org).

Use the [`npm install`](https://docs.npmjs.com/downloading-and-installing-packages-locally) command to install `icons-ui`:

```
npm install icons-ui
```

## Usage

This package can be used with both Javascript and Typescript.

Before using this package please read the Usage and Terms of Use for the icon package you intend to use.

## Icon Packages

Icon Package | Supported | Version
- | - | -
<img src="./docs/fontawesome.png" height="25"/> [Fontawesome](https://fontawesome.com/) | :white_check_mark: | 5.8.2
<img src="./docs/material.png" height="25"/> [Material Design Icons](https://material.io/) | :white_check_mark: | 
<img src="./docs/ionicons.png" height="25"/> [Ionicons](https://ionicons.com/) | :white_check_mark: | 4.5.5

## Frameworks

Framework | Supported | IconsUI Code
- | - | -
<img src="./docs/react.png" height="25"/> [React](https://reactjs.org/) | :white_check_mark: | `react`
<img src="./docs/vue.png" height="25"/> [Vue](https://vuejs.org/) | :white_check_mark: | `vue`
<img src="./docs/angularjs.png" height="25"/> [AngularJS](https://angularjs.org/) | :white_check_mark: | `angularjs`
<img src="./docs/javascript.png" height="25"/> Javascript | :white_check_mark: | `js`

## `Icon` Class

### Description

The `Icon` Class is a React Component, a Vue Component, an AngularJS Component or a function that creates a HTML element in Javascript.

### Attributes/Props

- `icon` : An Icon from the FontAwesomeIcons, MaterialIcons or IonIcons objects - **required**
- `size` : `number`. Sets the CSS font size property - **optional**

## Icon Objects

### Description

Objects that store all the data about each icon in each icon package.

These icon objects are `FontAwesomeIcons`, `MaterialIcons` and `IonIcons`. 

### Usage

To use these objects you first need to call them. You will only need to call an object once.

For example, if I wanted to use the `FontAwesomeIcons` object I would need to first call it like a function:
```javascript
FontAwesomeIcons(); // Call the object to load all it's data.
```
Now `FontAwesomeIcons` will be loaded with all the icons data.

## Examples

All Examples below will produde the following output:

<img src="./docs/example_output.png" height="100">

**React**
```javascript
import { Icon, FontAwesomeIcons, MaterialIcons } from 'icons-ui';

FontAwesomeIcons();
MaterialIcons();

ReactDOM.render(
    <div>
        <Icon icon={ FontAwesomeIcons.solid.check }/>
        <Icon icon={ MaterialIcons.filled.games } size={ 36 }/>
    </div>,
    document.getElementById('app')
);
```

**Vue**
```javascript
import { Icon, FontAwesomeIcons, MaterialIcons } from 'icons-ui';

FontAwesomeIcons();
MaterialIcons();

new Vue({
    el: '#app',
    components: {
        Icon
    },
    data: {
        checkIcon: FontAwesomeIcons.solid.check,
        gamesIcon: MaterialIcons.filled.games,
        gamesSize: 36
    }
});
```
```html
<icon :icon="checkIcon"></icon>
<icon :icon="gamesIcon" :size="gamesSize"></icon>
```

**AngularJS**
```javascript
const { Icon, MaterialIcons, FontAwesomeIcons } = require('icons-ui');

MaterialIcons();
FontAwesomeIcons();

angular.module('app', [ Icon ]);

angular.module('app').controller('AppCtrl', function AppCtrl() {
    this.checkIcon = FontAwesomeIcons.solid.check;
    this.gamesIcon = MaterialIcons.filled.games;
    this.gamesSize = 36;
});

angular.bootstrap(document.getElementById('app'), [ 'app' ]);
```
```html
<div id="app" ng-controller="AppCtrl as ctrl">
    <icon icon="ctrl.checkIcon"></icon>
    <icon icon="ctrl.gamesIcon" size="ctrl.gamesSize"></icon>
</div>
```

**Javascript**
```javascript
const { Icon, FontAwesomeIcons, MaterialIcons } = require('icons-ui');

FontAwesomeIcons();
MaterialIcons();

const checkIcon = Icon(FontAwesomeIcons.solid.check);
const gamesIcon = Icon(MaterialIcons.filled.games, 36);

const app = document.getElementById('app');

app.appendChild(checkIcon);
app.appendChild(gamesIcon);
```

## Using more than one framework

If you are using more than one framework in your project then you will need to set the `window.iconsUI` value to the relavant `IconsUI Code` in the table at the top of this file before you import the `icons-ui` package.

For example, if my page was using React and Vue, and I wanted to use `icons-ui` with Vue, I would need to set `window.iconsUI` to `vue` before importing `Icon` from 'icons-ui`.