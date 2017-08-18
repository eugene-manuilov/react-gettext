import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import Textdomain from './Textdomain';

const withGettext = (translations = {}, pluralForm = 'n != 1') => (WrappedComponent) => {
	class WithGettext extends Textdomain {

		constructor(props) {
			super(props);
			this.wrappedComponent = null;
		}

		getWrappedComponent() {
			return this.wrappedComponent;
		}

		render() {
			this.wrappedComponent = React.createElement(WrappedComponent, this.props);
			return this.wrappedComponent;
		}

	}

	WithGettext.defaultProps = {
		translations,
		plural: pluralForm,
	};

	WithGettext.displayName = `withGettext(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

	return hoistNonReactStatic(WithGettext, WrappedComponent);
};

export { Textdomain };
export default withGettext;
