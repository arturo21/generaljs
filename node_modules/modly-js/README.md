# Modly.js
*Dependency-free, lightweight and responsive modal window library*

[![Build Status](https://travis-ci.org/simedia-tech/modly-js.svg?branch=master)](https://travis-ci.org/simedia-tech/modly-js)

## Installation
Install Modly.js as a NPM dependency or grab the latest version from the CDN.

**NPM:**
```shell
# yarn
yarn add modly-js --dev

# npm
npm i modly-js --save-dev
```

**CDN:**
```javascript
<script src="https://cdn.jsdelivr.net/npm/modly-js"></script>
```

## Usage
A new Modly will pop up as soon as you instanciate it:
```javascript
new Modly()
```
The above is the most basic version that is allowed (without any options).

The constructor also supports passing an options object:
```javascript
new Modly({ content: "Hi there from modly!" });
```

#### Options:
**`animation.enabled`** - (true, false) Defines, if the Modly should be shown with or without an animation.
**`animation.duration`** - (duration in ms) Defines the duration of the animation (only relevant, if `animation.enabled` is set to true).

**`className`** - (string) Additional custom class name(s) which will be added to the Modly wrapper.

**`closeButton.enabled`** - (true, false) Defines if the close button should be shown or hidden.

**`content`** - (string, HTMLElement) If a string will be passed, that's going to be the content, otherwise you can i.e. use `document.querySelector()` to grab the HTML element you want to set as content.

**`overlay.enabled`** - (true, false) Defines, if the wrapping overlay should be enabled (background color and will dispose the Modly instance on click) or disabled (no background color and won't dispose the Modly instance on click).

**`position`** - (top-left, top, top-right, right, bottom-right, bottom, bottom-left, left, center) Defines where to position the Modly. If the content of the Modly is bigger than the current screen size, it'll be positioned vertically to the top.

**`sizes.width`** - (number in px) Sets the maximum width of the Modly.

**`theme`** - (light) Defines the theme for the Modly. Currently, only `light` is implemented.

### Default options
For each of the options above, there's a pre-defined default value, which will be used, if not overridden in the options:

```javascript
const defaults = {
  animation: {
    enabled: true,
    duration: 300
  },
  className: "",
  closeButton: {
    enabled: true
  },
  content: "",
  overlay: {
    enabled: true
  },
  position: "center",
  sizes: {
    width: 900
  },
  theme: "light"
};
```