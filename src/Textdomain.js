import React, { Component } from 'react';

class Textdomain extends Component {

	getTranslations() {
		const { catalog } = this.props;

		return catalog;
	}

	getPluralForm() {
		const { pluralForm } = this.props;

		return pluralForm;
	}

	render() {
		return this.props.children;
	}

}

Textdomain.contextTypes = {

};

export default Textdomain;