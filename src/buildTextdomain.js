import {
	gettext,
	ngettext,
	xgettext,
	nxgettext,
} from './gettext';

function buildTextdomain(translations = {}, plural = 'n != 1') {
	return {
		gettext: gettext.bind(null, translations),
		ngettext: ngettext.bind(null, translations, plural),
		xgettext: xgettext.bind(null, translations),
		nxgettext: nxgettext.bind(null, translations, plural),
	};
}

export default buildTextdomain;
