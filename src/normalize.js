exports.processObject = (type, item, createContentDigest) => {
  const id = item._id
  delete item._id
  const nodeMetadata = {
    id,
    parent: null,
    children: [],
    internal: {
      type: `Cosmicjs${type}`,
      content: JSON.stringify(item),
      contentDigest: createContentDigest(item),
    },
  }
  // convertNumberValuesToString(item)
  return Object.assign({}, item, nodeMetadata)
}

/**
 *
 * # The problem
 * It seems that there is a problem with type mismatch on Cosmic.
 * The issue is that if you put a the number '10' in a textfield, then the response is converted to a `number`, but if you put the number '07', then it gets converted to a `string`.
 *
 * # Workaround
 * This method converts every number to a string, which can remove this type mismatch issue.
 *
 */
const convertNumberValuesToString = obj => {
  if (!obj) {
    return
  }
  Object.keys(obj).map(property => {
    if (typeof obj[property] == 'number') {
      obj[property] = String(obj[property])
    } else if (typeof obj[property] == 'object') {
      convertNumberValuesToString(obj[property])
    }
  })
}
