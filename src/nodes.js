import createNodeHelpers from 'gatsby-node-helpers'

const { createNodeFactory } = createNodeHelpers({
  typePrefix: 'Cosmicjs',
})

/**
 * Node factory with `type` option based on
 * original `createNodeFactory`.
 *
 * @param {string} type - Node type
 * @param {object} node - Node
 * @constructor
 */
export const Node = (type, node) =>
  createNodeFactory(type, node => {
    node.id = node._id
    convertNumberValuesToString(node)
    delete node._id
    return node
  })(node)

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
