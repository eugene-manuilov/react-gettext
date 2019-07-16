function buildTextdomain(translations = {}, plural = 'n != 1') {
	return {
		translations,
		plural,
		gettext: message => message,
		ngettext: message => message,
		xgettext: message => message,
		nxgettext: message => message,
	};
}

export default buildTextdomain;
