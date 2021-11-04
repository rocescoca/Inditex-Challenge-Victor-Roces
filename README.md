# Calculator exercise

## Inspiration

The design and main features are inspired by the [Xiaomi Mui Calculator](https://play.google.com/store/apps/details?id=com.miui.calculator&hl=es&gl=US)

## User interaction

There are 3 interactive elements:

- theme buttons: buttons that can be clicked to change the theme
- history: list of historical expressions, clicking one expression will load it
  - history container is scrolled to the bottom automatically using [react-scrollable-feed](https://www.npmjs.com/package/react-scrollable-feed)
- keyboard: different keys that can be clicked
  - all keys can be clicked like in physical calculator, the state management will decide if something must be ignored
  - physical keyboard is supported, keys have shortcuts like Enter or Backspace

## State management

The Calculator uses redux & redux toolkit for state management

There are 3 elements in the calculator state:

- expression: array of symbols that represents a math expression. The array is always valid, validation happens before any symbol goes here
- evaluatedValue: a number that represents the value of the expression
- history: array of historical expressions

There are some rules on the reducers that prevent wrong symbols to go in the expression, for example when "key decimal point" is pressed two times, the second action will have no effect.

Using this rules, only valid expressions are stored, when the expression changes the value is evaluated with [math.js](https://www.npmjs.com/package/mathjs) and updated in the state

Symbols IDs are managed with [uuid](https://www.npmjs.com/package/uuid), each symbol has a unique random ID.

## Testing

The calculator has integrations tests that press sequences of keys and expect the right result

## Responsive design

The calculator is a responsive component that fits its container.
In the exercise, the calculator is placed inside a <Container> component that fits the whole screen.

This <Container> is 100vw x 100vh but [on mobile browsers the 100vh is not reliable](https://stackoverflow.com/questions/37112218/css3-100vh-not-constant-in-mobile-browser/37113430#37113430).

To fix this I used [react-div-100vh](https://www.npmjs.com/package/react-div-100vh), a component that does just that, create a div with real 100vh, full-screen height.

## CSS reset

[Sanitize.css](https://www.npmjs.com/package/sanitize.css?activeTab=dependencies) is used as base reset for cross-browser stability

## Themes

The calculator uses css-variables for coloring. The <Container> component allows to switch between different themes, each theme applies a class that overrides the css-variables.

## Icons

Icons are from [react-icons](https://www.npmjs.com/package/react-icons)
