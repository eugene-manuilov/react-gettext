import React, { Component, PropTypes } from 'react';

export default function withGettext(WrappedComponent) {

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
			return message;
		}

		ngettext(singular, plural, n) {
			return singular;
		}

		xgettext(message, context) {
			return message;
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

}