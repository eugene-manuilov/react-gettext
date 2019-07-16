import React from 'react';
import buildTextdomain from './buildTextdomain';

const TextdomainContext = React.createContext(buildTextdomain({}, 'n != 1'));

export default TextdomainContext;
