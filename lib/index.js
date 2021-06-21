const tree = new Map()

let currentId

export const useState = (initialState) => {
  if (!tree.get(currentId)) {
    tree.set(
      currentId,
      [
        initialState,
        ((id) => {
          const fn = (value) => {
            tree.set(id, [value, fn])
            render()
          }
          return fn
        })(currentId)
      ]
    )
  }

  return tree.get(currentId)
}

export const createElement = (type, props, children) => {
  const nodeId = Symbol('element')
  return { type, children, props, nodeId }
}

let treeRef
let rootRef

export const render = (tree = treeRef, root = rootRef) => {
  treeRef = tree
  rootRef = root
  root.innerHTML = ''

  const _renderFunction = (treeItem, parentNode) => {
    if (typeof treeItem === "string") {
      const text = document.createTextNode(treeItem)
      parentNode.append(text)
      return parentNode
    }

    if (treeItem === null) {
      return parentNode
    }

    const { type, props, children, nodeId } = treeItem

    currentId = nodeId

    if (typeof type === 'function') {
      _renderFunction(type({ ...(props || {}), children }), parentNode)
      return parentNode
    }

    const element = document.createElement(type)
    for (const [key, value] in Object.entries(props || {})) {
      element[key] = value
    }

    if (!children) {
      parentNode.append(element)
    } else {
      const _children = Array.isArray(children) ? children : [children]
      for (const child of _children) {
        parentNode.append(_renderFunction(child, element))
      }
    }

    return parentNode
  }

  _renderFunction(tree, root)
}
