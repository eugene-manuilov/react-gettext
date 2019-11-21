# react-gettext 1.0.1

[![npm version](https://badge.fury.io/js/react-gettext.svg)](https://badge.fury.io/js/react-gettext) [![Build Status](https://travis-ci.org/eugene-manuilov/react-gettext.svg?branch=master)](https://travis-ci.org/eugene-manuilov/react-gettext)

A tiny React library that helps to implement internalization in your application using gettext functions. It uses [React Context API](https://reactjs.org/docs/context.html) to expose gettext functions to children components.

## Instalation

> **Note:** This library requires **React 16.3 or later**

```
npm i react react-gettext
```

## Usage

To use this library in your application, you need to do a few simple steps:

1. Prepare translations and define plural form functions.
1. Add `TextdomainContext.Provider` provider to the root of your application.
1. Updated your components to use context functions, provided by `TextdomainContext`, to translate text messages.

Let's take a closer look at each step. First of all, you to create translation catalogs and prepare plural form functions for every language that you are going to use. Each language needs one catalog and one plural form function. 

The translation catalog is an object that contains key/value pairs where keys are original singular messages and values are translations. If you have a message that can have plural forms, the value for it should be an array with translations where each translation corresponds to appropriate plural form. Finally, if you want to use a context with your messages, then it should be prepended to the message itself and separated by using `\u0004` (end of transition) character. Here is an example:

```javascript
{
	"Hello world!": "¡Hola Mundo!", // regular message
	"article": ["artículo", "artículos"], // plural version
	"Logo link\u0004Homepage": "Página principal", // single message with "Logo link" contex
	"Search results count\u0004article": ["artículo", "artículos"], // plural version with "Search results count" context
}
```

The plural form function is a function that determines the number of a plural form that should be used for a particular translation. For English, the plural form is `n != 1 ? 1 : 0`, that means to use a translation with `0` index when `n == 1`, and a translation with `1` index in all other cases. Slavic and arabic languages have more than 2 plural forms and their functions are more complicated. Translate Toolkit has a [list of plural forms expressions for many languages](http://docs.translatehouse.org/projects/localization-guide/en/latest/l10n/pluralforms.html?id=l10n/pluralforms) that you can use in your project. An example of a plural form function can be the following:

```javascript
function getPluralForm(n) {
    return n != 1 ? 1 : 0;
}
```

The next step is to pass translations and plural form function for the current language to the `buildTextdomain` function. It will create APIs that need to be passed to the `TextdomainContext.Provider` provider that you need to add to the root of your project:

```javascript
import React, { Component } from 'react';
import { TextdomainContext, buildTextdomain } from 'react-gettext';

class MyApp extends Component {

    constructor(props) {
        super(props);
        this.state = { textdomain: buildTextdomain(...) };
    }

    render() {
        return (
            <div>
                <TextdomainContext.Provider value={this.state.textdomain}>
                    <ComponentA />
                    ...
                </TextdomainContext>
            </div>
        );
    }

}
```

> **Note:** Please, pay attention that you need to avoid passing the results of `buildTextdomain` function directly into `TextdomainContext.Provider`'s value to escape unintentional renders in consumers when a provider’s parent re-renders.

Finally, the last step is to update your descendant components to consume these context APIs. Import `TexdomainContext` in the child component and assign it to the component `contextType` static properly. It will expose gettext APIs to that component via `this.context` field:


```javascript
import React, { Component } from 'react';
import { TextdomainContext } from 'react-gettext';

class ComponentA extends Component {

    render() {
        const { gettext, ngettext, xgettext, nxgettext } = this.context;

        return (
            <div>...</div>
        );
    }

}

ComponentA.contextType = TextdomainContext;
```

## An example

Let's assume you have following React application:

```javascript
// app.js
import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';

export default class App extends Component {

    render() {
        return (
            <div id="app">
                <Header />
                ...
                <Footer />
            </div>
        );
    }

}
```

```javascript
// Header.js
import React, { Component } from 'react';

export default class Header extends Component {

    render() {
        return (
            <h1>Welcome to my application!</h1>
        );
    }

}
```

To make it translatable, you need to update your `app.js` file to use TextdomainContext provider and build textdomain using messages list and plural form function:

```diff
  // app.js
  import React, { Component } from 'react';
+ import { TextdomainContext, buildTextdomain } from 'react-gettext';
  import Header from './Header';
  import Footer from './Footer';

  export default class App extends Component {

+     constructor(props) {
+         super(props);
+         this.state = {
+             textdomain: buildTextdomain(
+                 {
+                     'Welcome to my application!': 'Bienvenido a mi aplicación!',
+                     // ...
+                 },
+                 n => n != 1
+             ),
+         };
+     }

      render() {
          return (
              <div id="app">
+                 <TextdomainContext.Provider value={this.state.textdomain}>
                      <Header />
                      ...
                      <Footer />
+                 </TextdomainContext.Provider>
              </div>
          );
      }
  }
```

After doing it you can start using `gettext`, `ngettext`, `xgettext` and `nxgettext` functions in your descending components:

```diff
  // Header.js
  import React, { Component } from 'react';
+ import { TextdomainContext } from 'react-gettext';

  export default class Header extends Component {

      render() {
+         const { gettext } = this.context;
          return (
-             <h1>Welcome to my application!</h1>
+             <h1>{gettext('Welcome to my application!')}</h1>
          );
      }

  }

+ Header.contextType = TextdomainContext;
```

Check a [sample](https://github.com/eugene-manuilov/react-gettext/tree/master/examples/poedit) application to see how it works.

## Documentation

### buildTextdomain(translations, pluralForm)

Builds gettext APIs for TextdomainContext provider that will work with provided translations.

- **translations**: an object with translated messages.
- **pluralForm**: a function that determines a plural form or a stringular reresentation of it.

```javascript
const api = buildTextdomain( { ... }, n => n == 1 ? 0 : 1 );
// or
const api = buildTextdomain( { ... }, 'n == 1 ? 0 : 1' );
```

### gettext(message)

The function to translate a string. Accepts original message and returns translation if it exists, otherwise original message.

- **message**: a string to be translated.

Example:

```javascript
// somewhere in your jsx component
this.context.gettext('Some text');
```

### ngettext(singular, plural, n)

The function to translate plural string. Accepts singular and plural messages along with a number to calculate plural form against. Returns translated message based on plural form if it exists, otherwise original message based on **n** value.

- **singular**: a string to be translated when count is not plural
- **plural**: a string to be translated when count is plural
- **n**: a number to count plural form

Example:

```javascript
// somewhere in your jsx component
this.context.ngettext('day ago', 'days ago', numberOfDays);
```

### xgettext(message, context)

The function to translate a string based on a specific context. Accepts a message to translate and a translation context string. Returns translated message if it exists, otherwise original string.

- **message**: A string to be translated.
- **context**: A context to search translation in.

Example:

```javascript
// somewhere in your jsx component
this.context.xgettext('some text', 'context where this message is used');
```

### nxgettext(singular, plural, n, context)

The function to translate plural string based on a specific context. Accepts singular and plural messages along with a number to calculate plural form against and context string. Returns translated message based on plural form if it exists, otherwise original message based on **n** value.

- **singular**: a string to be translated when count is not plural
- **plural**: a string to be translated when count is plural
- **n**: a number to count plural form
- **context**: A context to search translation in.

Example:

```javascript
// somewhere in your jsx component
this.context.nxgettext('day ago', 'days ago', numberOfDays, 'Article publish date');
```

## Legacy API

The initial version of this library had been created when React used the legacy version of Context APIs, thus it played a keystone role in the main approach of how to use this library at that time. However, in the late March of 2018, React 16.3 was released and that API became deprecated, so do the main approach used in this library. 

The proper way to use this library is described in the [Usage](#usage) section, this section contains legacy API that will be removed in next versions of the library. We don't encourage you to use it in a new project.

### withGettext(translations, pluralForms, options)

Higher-order function which is exported by default from `react-gettext` package. It accepts two arguments and returns function to create higher-order component.

- **translations**: a hash object or a function which returns hash object where keys are original messages and values are translated messages.
- **pluralForms**: a string to calculate plural form (used by [Gettext PO](http://docs.translatehouse.org/projects/localization-guide/en/latest/l10n/pluralforms.html?id=l10n/pluralforms)) or a function which accepts a number and calculates a plural form number. Pay attentions that plural forms are zero-based what means to get 1st plural form it should return 0, to get 2nd - 1, and so on.
- **options**: a hash object with options. Currently supports following options:
  - **withRef**: an optional boolean flag that determines whether or not to set `ref` property to a wrapped component what will allow you to get wrapped component instance by calling `getWrappedComponent()` function of the HOC. By default: `FALSE`.

Example:

```javascript
const translations = {
    'Some text': 'Some translated text',
    ...
};

const pluralForms = '(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2)'; // 3 plural forms for Russian, Belarusian, Bosnian, Croatian, Serbian, Ukrainian, etc.

const HOC = withGettext(translations, pluralForms)(App);
```

```javascript
function getTranslations() {
    return {
        'Some text': 'Some translated text',
        ...
    };
}

function getPluralForms(n) {
    return n > 1 ? 1 : 0;
}

const HOC = withGettext(getTranslations, getPluralForms)(App);
```

As an alternative you can pass translations and plural form as properties to higher-order-component, like this:

```javascript
function getTranslations() {
    return {
        'Some text': 'Some translated text',
        ...
    };
}

function getPluralForms(n) {
    return n > 1 ? 1 : 0;
}

const HOC = withGettext()(App);

...

ReactDOM.render(<HOC translations={getTranslations} plural={getPluralForms}>...</HOC>, ...);
```

One more alternative is to not create HOC, but use Textdomain component directly. You can import it using `import { Textdomain } from 'react-gettext'` and use it as a regular component which will provide context functions to translate your messages. Just don't forget to pass `translations` and `plural` props to this component when you render it.

## Poedit

If you want to use Poedit application to translate your messages, then use the following keywords to properly extract static copy from your javascript files:

```
gettext;ngettext:1,2;xgettext:1,2c;nxgettext:1,2,4c
```

Here is an example of a **POT** file that you can use as a starting point:

```
msgid ""
msgstr ""
"Plural-Forms: nplurals=2; plural=(n != 1);\n"
"Project-Id-Version: \n"
"POT-Creation-Date: \n"
"PO-Revision-Date: \n"
"Last-Translator: \n"
"Language-Team: \n"
"MIME-Version: 1.0\n"
"Content-Type: text/plain; charset=iso-8859-1\n"
"Content-Transfer-Encoding: 8bit\n"
"X-Poedit-Basepath: ./src\n"
"X-Poedit-KeywordsList: gettext;ngettext:1,2;xgettext:1,2c;nxgettext:1,2,4c\n"
"X-Poedit-SourceCharset: UTF-8\n"
```

If you prefer using npm scripts, then you can add the following command to your `package.json` file to extract static copy and generate POT file using CLI commands. Make sure, you have correct `project` and  `output` paths.

```
"gettext:extract": "find /path/to/project -name \"*.js\" | xargs xgettext --from-code=UTF-8 --language=JavaScript --keyword=gettext --keyword=ngettext:1,2 --keyword=xgettext:1,2c --keyword=nxgettext:1,2,4c --output=/path/to/project/projectname.pot --sort-by-file --package-name=\"My Project Name\" --package-version=\"1.0.0\""
```

## Contribute

Want to help or have a suggestion? Open a [new ticket](https://github.com/eugene-manuilov/react-gettext/issues/new) and we can discuss it or submit pull request. Please, make sure you run `npm test` before submitting a pull request.

## License

MIT
