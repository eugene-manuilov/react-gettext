import {
	gettext,
	ngettext,
	xgettext,
	nxgettext,
} from './gettext';

function buildTextdomain(translations = {}, plural = 'n != 1') {
	return {
		gettext: gettext.bind(translations),
		ngettext: ngettext.bind(translations, plural),
		xgettext: xgettext.bind(translations),
		nxgettext: nxgettext.bind(translations, plural),
	};
}

export default buildTextdomain;
