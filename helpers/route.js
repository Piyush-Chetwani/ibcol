const _ = require('lodash');
const geoip = require('geoip-country');
const { parse } = require('url')

const translations = require('../translations');
const translationsMapping = require('../translationsMapping');

const defaultLocale = translations['_default']._locale;


const getLocaleObject = (requestedLocale) => {
  const requestedLocaleObject = _.find(translations, {
    _locale: {
      id: requestedLocale
    }
  });

  if (requestedLocaleObject !== undefined) {
    if (process.env.ENV === 'production') {
      // check to see if requestedLocaleObject has been disabled
      if (requestedLocaleObject._locale.disabled === true) {
        return undefined
      }
    }
  }

  return requestedLocaleObject;
}

const findDefaultPath = (req, prefix = "") => {
  // console.log('req', req);
  const urlObject = parse(req.url.replace(prefix, ""));
  const pathname = urlObject.pathname;
  // console.log('pathname', pathname);
  const search = _.isEmpty(urlObject.search) ? '' : urlObject.search;
  const pathTokens = pathname.split('/');


  const requestedLocale = _.isEmpty(pathTokens[1]) ? undefined : pathTokens[1].toLowerCase();
  const requestedParams = (_.isEmpty(pathTokens[2])) ? '' : `/${pathTokens[2]}`;

  console.log('search', search);
  console.log('requestedLocale', requestedLocale);
  console.log('requestedParams', requestedParams);


  const requestedLocaleObject = getLocaleObject(requestedLocale)
  ;
  const requestedLocaleSupported = requestedLocaleObject !== undefined;

  let translationId;
  // console.log('pathTokens', pathTokens);
  // console.log('requestedLocaleSupported', requestedLocaleSupported);
  if (requestedLocaleSupported) {
    translationId = requestedLocaleObject._locale.id;
    if (pathTokens.length === 3) {
      return `/${translationId}/`;
    }
  } else {
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    let geo = geoip.lookup(ip);
    


    // const id = (geo === null) ? undefined : translationsMapping[geo.country];
    const id =undefined;

    translationId = 
      (id === undefined) ? 
        defaultLocale.id 
        : getLocaleObject(id) !== undefined ? 
          id
          : defaultLocale.id;

  }

  
  if (requestedLocale === undefined)
    return `/${translationId}/`;

  // maybe locale is missing and requestedLocale is really part of the requestedParams?

  return `/${translationId}/${requestedLocale}${requestedParams}${search}`;


}



const routeToDefaultPath = (req, res, next, prefix = "") => {
  const status = (process.env.ENV === 'production') ? 301 : 302;
  const defaultPath = findDefaultPath(req, prefix);
  console.log('defaultPath', defaultPath);
  if (req.url.replace(prefix, "") !== defaultPath) {
    console.log('req.url', req.url);
    console.log('defaultPath', defaultPath);
    res.writeHead(status, {"Location": defaultPath});
    res.end();
  } else {
    if (next)
      next();
  }
  
}


module.exports = {
  findDefaultPath,
  routeToDefaultPath,
  getLocaleObject
};