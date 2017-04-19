import React, { Component, PropTypes } from 'react';

export default function textdomain(translations, pluralForm) {

	const EOT = '\u0004'; // End of Transmission

	const getTranslations = () => {
		// if translations is function, call it to get translations object,
		// otherwise just use incoming translations object
		return typeof translations === 'function' ? translations() : translations;
	};

	const getPluralForm = n => {
		// return 0 if n is not integer
		if (isNaN(parseInt(n))) {
			return 0;
		}

		// if pluralForm is function, use it to get plural form index
		if (typeof pluralForm === 'function') {
			return pluralForm(n);
		}

		// if pluralForm is string and contains only "n", "0-9", " ", "=?:%+-/*><&|"
		// characters, then we can eval it to calculate plural form
		if (typeof pluralForm === 'string' && !pluralForm.match(/[^n0-9 =?:%+-/*><&|]/i)) {
			return eval(pluralForm.toLowerCase().split('n').join(n));
		}

		return 0;
	};

	// return HOC function
	return WrappedComponent => {

		const WithGettext = class extends Component {

			getChildContext() {
				const self = this;
				return {
					gettext: self.gettext.bind(self),
					ngettext: self.ngettext.bind(self),
					xgettext: self.xgettext.bind(self)
				};
			}

			gettext(message) {
				const _translations_ = getTranslations();

				return _translations_[message] ? _translations_[message] : message;
			}

			ngettext(singular, plural, n) {
				const _translations_ = getTranslations();
				const pluralIndex = getPluralForm(n);

				return Array.isArray(_translations_[singular]) && _translations_[singular][pluralIndex]
					? _translations_[singular][pluralIndex]
					: singular;
			}

			xgettext(message, context) {
				const _translations_ = getTranslations();
				const key = context + EOT + message;

				return _translations_[key] ? _translations_[key] : message;
			}

			render() {
				return <WrappedComponent {...this.props} />
			}

		};

		WithGettext.displayName = `WithGettext(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

		WithGettext.childContextTypes = {
			gettext: PropTypes.func,
			ngettext: PropTypes.func,
			xgettext: PropTypes.func
		};

		return WithGettext;

	};

}