# react-gettext 0.3.0

[![Build Status](https://travis-ci.org/eugene-manuilov/react-gettext.svg?branch=master)](https://travis-ci.org/eugene-manuilov/react-gettext)

Tiny React library for implementing gettext localization in your application. It provides HOC function to enhance your application by exposing gettext functions in the context scope.

## Instalation

React Gettext requires **React 15.0 or later**. You can add this package using following commands:

```
npm install react-gettext --save
```

```
yarn add react-gettext
```

## Usage

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

To make it translatable you need to update your `app.js` file to use HOC function and export higher-order component:

```diff
  // app.js
  import React, { Component } from 'react';
+ import Textdomain from 'react-gettext';
  import Header from './Header';
  import Footer from './Footer';

- export default class App extends Component {
+ class App extends Component {
      ...
  }

+ export default Textdomain({...}, 'n != 1')(App);
```

After doing it you can start using `gettext`, `ngettext`, `xgettext` and `nxgettext` functions in your descending components:

```diff
  // Header.js
- import React, { Component } from 'react';
+ import React, { Component } from 'react';
+ import PropTypes from 'prop-types';

  export default class Header extends Component {

      render() {
          return (
-             <h1>Welcome to my application!</h1>
+             <h1>{this.context.gettext('Welcome to my application!')}</h1>
          );
      }

  }

+ Header.contextTypes = {
+     gettext: PropTypes.func.isRequired,
+     ngettext: PropTypes.func.isRequired,
+     xgettext: PropTypes.func.isRequired,
+     nxgettext: PropTypes.func.isRequired,
+ };
```

## Documentation

### Textdomain(translations, pluralForms)

Higher-order function which is exported by default from `react-gettext` package. It accepts two arguments and returns function to create higher-order component.

- **translations**: a hash object or a function which returns hash object where keys are original messages and values are translated messages.
- **pluralForms**: a string to calculate plural form (used by [Gettext PO](http://docs.translatehouse.org/projects/localization-guide/en/latest/l10n/pluralforms.html?id=l10n/pluralforms)) or a function which accepts a number and calculates a plural form number. Pay attentions that plural forms are zero-based what means to get 1st plural form it should return 0, to get 2nd - 1, and so on.

Example:

```javascript
const translations = {
    'Some text': 'Some translated text',
    ...
};

const pluralForms = '(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2)'; // 3 plural forms for Russian, Belarusian, Bosnian, Croatian, Serbian, Ukrainian, etc.

const HOC = Textdomain(translations, pluralForms)(App);
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

const HOC = Textdomain(getTranslations, getPluralForms)(App);
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

## Poedit

If you use Poedit app to translate your messages, then you can use `gettext;ngettext:1,2;xgettext:1,2c;nxgettext:1,2,4c` as keywords list to properly parse and extract strings from your javascript files.

Here is an example of a **POT** file which you can start with:

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

## Contribute

What to help or have a suggestion? Open a [new ticket](https://github.com/eugene-manuilov/react-gettext/issues/new) and we can discuss it or submit pull request. Please, make sure you run `npm test` before submitting a pull request.

## License

MIT
