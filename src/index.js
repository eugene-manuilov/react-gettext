import React, { Component, PropTypes } from 'react';

export default function textdomain(translations, pluralForm) {
	const EOT = '\u0004'; // End of Transmission

	const getTranslations = function () {
		// if translations is function, call it to get translations object,
		// otherwise just use incoming translations object
		return typeof translations === 'function' ? translations() : translations;
	};

	const getPluralForm = (n) => {
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
			return eval(pluralForm.toLowerCase().split('n').join(n));
			/* eslint-enable no-eval */
		}

		return 0;
	};

	// return HOC function
	return (WrappedComponent) => {
		const WithGettext = class extends Component {
			getChildContext() {
				return {
					gettext: WithGettext.gettext,
					ngettext: WithGettext.ngettext,
					xgettext: WithGettext.xgettext,
				};
			}

			static gettext(message) {
				const messages = getTranslations();

				return messages[message] ? messages[message] : message;
			}

			static ngettext(singular, plural, n) {
				const messages = getTranslations();
				const pluralIndex = getPluralForm(n);

				return Array.isArray(messages[singular]) && messages[singular][pluralIndex]
					? messages[singular][pluralIndex]
					: singular;
			}

			static xgettext(message, context) {
				const messages = getTranslations();
				const key = context + EOT + message;

				return messages[key] ? messages[key] : message;
			}

			render() {
				return <WrappedComponent {...this.props} />;
			}
		};

		WithGettext.displayName = `WithGettext(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

		WithGettext.childContextTypes = {
			gettext: PropTypes.func,
			ngettext: PropTypes.func,
			xgettext: PropTypes.func,
		};

		return WithGettext;
	};
}
