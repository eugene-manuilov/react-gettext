import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import Textdomain from './Textdomain';

export default function withGettext(translations, pluralForm) {
	return (WrappedComponent) => {
		class WithGettext extends Textdomain {

			getTranslations() {
				// if translations is function, call it to get translations object,
				// otherwise just use incoming translations object
				return typeof translations === 'function' ? translations() : translations;
			}

			getPluralForm(n) {
				// return 0 if n is not integer
				if (isNaN(parseInt(n, 10))) {
					return 0;
				}

				// if pluralForm is function, use it to get plural form index
				if (typeof pluralForm === 'function') {
					return pluralForm(n);
				}

				// if pluralForm is string and contains only "n", "0-9", " ", "=?:%+-/*><&|"
				// characters, then we can eval it to calculate plural form
				if (typeof pluralForm === 'string' && !pluralForm.match(/[^n0-9 =?:%+-/*><&|]/i)) {
					/* eslint-disable no-eval */
					return +eval(pluralForm.toLowerCase().split('n').join(n));
					/* eslint-enable no-eval */
				}

				return 0;
			}

			render() {
				return React.createElement(WrappedComponent, this.props);
			}

		}

		WithGettext.displayName = `withGettext(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

		return hoistNonReactStatic(WithGettext, WrappedComponent);
	};
}
