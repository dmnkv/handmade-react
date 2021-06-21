import('./lib').then(({ createElement, render, useState }) => {
    const ConditionalComponent = ({ children }) => {
        if (Math.round(Math.random() * 10) % 2 === 0) {
            return null
        }

        return createElement(
          'h1',
          null,
          children
        )
    }

    const ComponentWithState = ({ name, initialState }) => {
        const [state, setState] = useState(initialState)

        console.log(name, state)

        setTimeout(() => setState(state + 1), 2000)

        return createElement('h2', null, `${name}: ${state}`)
    }

    const app = createElement(
      'div',
      null,
      [
          ' [text 1] ',
          ' [text 2] ',
          ' [text 3] ',
          createElement(
            ConditionalComponent,
            null,
            createElement(
              ComponentWithState,
              { name: 'Component 1', initialState: 1 },
              null
            )
          ),
          createElement(
            ConditionalComponent,
            null,
            createElement(
              ComponentWithState,
              { name: 'Component 2', initialState: 1000000 },
              null
            )
          )
      ]
    )

    console.log(app)

    const root = document.getElementById('root')

    render(app, root)
})