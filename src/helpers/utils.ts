// This file will export the basic utitlity function to use globally.
import cookie from "cookie"

export function parseCookies(req) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie)
}

export function timeDiffCalc(dateFuture, dateNow, status) {
  let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;

  // calculate days
  const days = Math.floor(diffInMilliSeconds / 86400);
  diffInMilliSeconds -= days * 86400;
  console.log('calculated days', days);

  // calculate hours
  const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
  diffInMilliSeconds -= hours * 3600;
  console.log('calculated hours', hours);

  // calculate minutes
  const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
  diffInMilliSeconds -= minutes * 60;
  console.log('minutes', minutes);

  let difference: any = '';
  switch (status) {
    case 'Days':
      difference = days;
      break;
    case 'Hours':
      difference = hours;
      break;
    case 'Minutes':
      difference = minutes;
      break;
    case 'Fulldate':
      if (days > 0) {
        difference += (days === 1) ? `${days} day, ` : `${days} days, `;
      }

      difference += (hours === 0 || hours === 1) ? `${hours} hour, ` : `${hours} hours, `;

      difference += (minutes === 0 || hours === 1) ? `${minutes} minutes` : `${minutes} minutes`;
      break;
  }

  return difference;
}

/**
 * This utility function will truncate the long text
 * with the chars provided, for example if chars = 32 then it will
 * truancate the text till 32th character and return the new text.
 * @param {*} desc 
 * @param {*} chars 
 */
export const TruncateText = (desc, chars) => {
  if (desc && desc?.length > chars) {
    return desc.substring(0, chars) + '';
  } else {
    return desc
  }
}

// import { pluralize, underscore } from 'inflected'
let pluralize: any;
let underscore: any;
export function buildRelationshipData(type, ids) {
  let data = []

  if (ids === null || ids?.length === 0) return data

  if (typeof ids === 'string') {
    const obj = { type: underscore(type), id: ids }

    return [obj]
  }

  if (Array.isArray(ids)) {
    data = ids?.map(id => ({
      type: underscore(type),
      id
    }))
  }

  return data
}

export function formatUrlResource(type) {
  if (type === 'main-image') return type

  return pluralize(type)
}

export function createCartIdentifier() {
  return 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[x]/g, () =>
    ((Math.random() * 16) | 0).toString(16)
  )
}

export function cartIdentifier(storage) {
  const cartId = createCartIdentifier()

  if (storage.get('mcart') !== null) {
    return storage.get('mcart')
  }

  storage.set('mcart', cartId)

  return cartId
}

export function parseJSON(response) {
  return new Promise(resolve => {
    response.text().then(body => {
      resolve({
        status: response.status,
        ok: response.ok,
        json: body !== '' ? JSON.parse(body) : '{}'
      })
    })
  })
}

function formatFilterString(type, filter) {
  const filterStringArray = Object.keys(filter)?.map(key => {
    const value = filter[key]
    let queryString: any = `${key},${value}`

    if (typeof value === 'object')
      queryString = Object.keys(value)?.map(
        attr => `${key}.${attr},${value[attr]}`
      )

    return `${type}(${queryString})`
  })

  return filterStringArray.join(':')
}

function formatQueryString(key, value) {
  if (key === 'limit' || key === 'offset') {
    return `page${value}`
  }

  if (key === 'filter') {
    const filterValues = Object.keys(value)?.map(filter =>
      formatFilterString(filter, value[filter])
    )

    return `${key}=${filterValues.join(':')}`
  }

  return `${key}=${value}`
}

function buildQueryParams({ includes, sort, limit, offset, filter }) {
  const query: any = {}

  if (includes) {
    query.include = includes
  }

  if (sort) {
    query.sort = `${sort}`
  }

  if (limit) {
    query.limit = `[limit]=${limit}`
  }

  if (offset) {
    query.offset = `[offset]=${offset}`
  }

  if (filter) {
    query.filter = filter
  }

  return Object.keys(query)
    ?.map(k => formatQueryString(k, query[k]))
    .join('&')
}

export function buildURL(endpoint, params) {
  if (
    params.includes ||
    params.sort ||
    params.limit ||
    params.offset ||
    params.filter
  ) {
    const paramsString = buildQueryParams(params)

    return `${endpoint}?${paramsString}`
  }

  return endpoint
}

export function buildRequestBody(body) {
  let parsedBody
  if (body) {
    if (body.options) {
      parsedBody = `{
        "data": ${JSON.stringify(body.data)},
        "options" : ${JSON.stringify(body.options)}
      }`
    } else {
      parsedBody = `{
        "data": ${JSON.stringify(body)}
      }`
    }
  }

  return parsedBody
}

export function buildCartItemData(
  id,
  quantity = null,
  type = 'cart_item',
  flows,
  isSku = false
) {
  const payload = {
    type,
    ...flows
  }

  if (type === 'cart_item') {
    if (isSku)
      Object.assign(payload, {
        sku: id,
        quantity: parseInt(quantity, 10)
      })
    else
      Object.assign(payload, {
        id,
        quantity: parseInt(quantity, 10)
      })
  }

  if (type === 'promotion_item') {
    Object.assign(payload, {
      code: id
    })
  }

  return payload
}

export function buildCartCheckoutData(
  customer,
  billing_address,
  shipping_address
) {
  let parsedCustomer = customer

  if (typeof customer === 'string') parsedCustomer = { id: customer }

  return {
    customer: parsedCustomer,
    billing_address,
    shipping_address
  }
}

export function resetProps(instance) {
  const inst = instance
    ;['includes', 'sort', 'limit', 'offset', 'filter'].forEach(
      e => delete inst[e]
    )
}

export function getCredentials(storage) {
  return JSON.parse(storage.get('moltinCredentials'))
}

export function tokenInvalid(config) {
  const credentials = getCredentials(config.storage)

  return (
    !credentials ||
    !credentials.access_token ||
    credentials.client_id !== config.client_id ||
    Math.floor(Date.now() / 1000) >= credentials.expires
  )
}

export function formatTimeTo12Hr(time) {
  if (time) {
    let timeNewDateString = time.split(":");
    let timeNewDate = new Date();
    timeNewDate.setHours(parseInt(timeNewDateString[0]));
    timeNewDate.setMinutes(parseInt(timeNewDateString[1]));
    const hour24 = timeNewDate.getHours();
    let minutes = (timeNewDate.getMinutes() === 0) ? '00' : timeNewDate.getMinutes();
    minutes = (minutes > 0 && minutes < 10) ? `0${minutes}` : minutes;
    const ampm = (hour24 >= 12) ? 'PM' : 'AM';
    let hour: any = hour24 % 12 || 12;
    //append zero is hour is single digit
    if (hour < 10) {
      hour = `0${hour}`;
    }
    return `${hour}:${minutes} ${ampm}`;
  } else return '';
};
export function hex2rgb(colour, alpha) {
  var r, g, b;
  if (colour.charAt(0) == "#") {
    colour = colour.substr(1);
  }

  r = colour.charAt(0) + '' + colour.charAt(1);
  g = colour.charAt(2) + '' + colour.charAt(3);
  b = colour.charAt(4) + '' + colour.charAt(5);

  r = parseInt(r, 16);
  g = parseInt(g, 16);
  b = parseInt(b, 16);
  return alpha ? `rgb(${r},${g},${b},${alpha}%)` : `rgb(${r},${g},${b})`;
}

export function dynamicSort(property: any, order: number) {
  var sortOrder = order;
  if (property == 'lastVisitedOn') {
    return function (a: any, b: any) {
      var result = (new Date(a[property]).getTime() < new Date(b[property]).getTime()) ? -1 : (new Date(a[property]).getTime() > new Date(b[property]).getTime()) ? 1 : 0;
      return result * sortOrder;
    }
  } else {
    return function (a: any, b: any) {
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    }
  }
}

export function getDateObj(startDate: any = new Date()) {
  let dateObj = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  const month = (dateObj.getMonth() + 1).toString().length == 1 ? `0${dateObj.getMonth() + 1}` : dateObj.getMonth() + 1;
  const date = dateObj.getDate().toString().length == 1 ? `0${dateObj.getDate()}` : dateObj.getDate();
  return {
    displayDate: date,
    displayDay: dateObj.toLocaleString('en-us', { weekday: 'long' }).substring(0, 3),
    newDate: dateObj,
    dateObj: `${dateObj.getFullYear()}-${month}-${date}`
  }
}

export function getDateStrings(inputDate: any = new Date()) {
  let dateObj = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate());
  const month = (dateObj.getMonth() + 1).toString().length == 1 ? `0${dateObj.getMonth() + 1}` : dateObj.getMonth() + 1;
  const date = dateObj.getDate().toString().length == 1 ? `0${dateObj.getDate()}` : dateObj.getDate();
  const year = dateObj.getFullYear();
  return {
    date, month, year,
    ymd: `${year}-${month}-${date}`,
    dmy: `${date}-${month}-${year}`
  }
}

export function mergeArrayWithoutDuplicates(target: any[], source: any[], sourceKey: string) {
  if (target.length && source.length) {
    let key = Object.keys(target[0])[0];
    if (sourceKey == 'socialLinks' || sourceKey == 'typeList') key = "name";
    if (sourceKey == 'accessControl') key = "uiComponent";
    return target.concat(source.filter(bo => target.every(ao => ao[key] != bo[key])));
  } else return source;
}

const isObject = (obj) => obj && typeof obj === 'object';

export function deepMergeInnerDedupeArrays(target: any, source: any) {
  Object.keys(source).forEach((key: string) => {
    const targetValue = target[key];
    const sourceValue = source[key];
    if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
      target[key] = mergeArrayWithoutDuplicates(targetValue, sourceValue, key);
    } else if (isObject(targetValue) && Array.isArray(sourceValue)) {
      target[key] = sourceValue;
    } else if (Array.isArray(targetValue) && isObject(sourceValue)) {
      target[key] = sourceValue;
    } else if (isObject(targetValue) && isObject(sourceValue)) {
      target[key] = deepMergeInnerDedupeArrays(Object.assign({}, targetValue), sourceValue);
    } else {
      target[key] = sourceValue;
    }
  });
  return target;
}

/**
 * Performs a deep merge of `source` into `target`.
 * Mutates `target` only but not its objects and arrays.
 */
export function deepMergeObjects(target, source) {

  if (!isObject(target) || !isObject(source)) {
    return source;
  }

  Object.keys(source).forEach((key: any) => {
    const targetValue: any = target[key];
    const sourceValue: any = source[key];

    if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
      target[key] = mergeArrayWithoutDuplicates(targetValue, sourceValue, key);
    } else if (isObject(targetValue) && isObject(sourceValue)) {
      target[key] = deepMergeObjects(Object.assign({}, targetValue), sourceValue);
    } else {
      target[key] = sourceValue;
    }
  });

  return target;
}


//get File object from base64 image string

export function base64ToFile(dataurl: string) {
  const imageName = 'slider.png';
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], imageName, { type: 'image/png' });
}