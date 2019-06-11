// Type definitions for icons-ui 0.0.2
// Project: https://github.com/joshuahylands/icons-ui
// Definitions by: Joshua Hylands <https://github.com/joshuahylands>

export var Icon: any;

interface BasicObject {
    [key: string]: Array<string>
}

interface FontAwesomeIconsObject extends Function {
    solid: BasicObject;
    regular: BasicObject;
    light: BasicObject;
    brands: BasicObject;
}

interface MaterialIconsObject extends Function {
    filled: BasicObject;
    outlined: BasicObject;
    rounded: BasicObject;
    twotone: BasicObject;
    sharp: BasicObject;
}

interface IonIconsObject extends Function {
    material: BasicObject;
    ios: BasicObject;
}

export var FontAwesomeIcons: FontAwesomeIconsObject;
export var MaterialIcons: MaterialIconsObject;
export var IonIcons: IonIconsObject;

declare global {
    interface Window {
        iconsUI?: string;
    }
}
