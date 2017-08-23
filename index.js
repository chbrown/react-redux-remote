import hoistStatics from 'hoist-non-react-statics'

/**
Wrap an already-`react-redux`-wrapped component to listen for componentDidMount
and componentWillReceiveProps calls.
When state changes, this function will:
1. Call mapPropsToDependencies with the current props (from both react-redux's
   mapStateToProps and the component's ownProps), returning a list of dependencies.
2. Feed these dependencies into ensureDependency via thunks, which provides the
   dispatch and getState functions that ensureDependency takes.

On the client's side, ensureDependency is responsible for checking the current
state (via getState) to determine if the dependency has already been fetched,
and if not, turning the dependency descriptions into redux actions and calling
dispatch accordingly.

Returns a function, which is intended to be immediately evaluated with a
Component class as the single argument, like react-redux's connect(mapStateToProps)(Component).

mapPropsToDependencies(props: any): Dependency[]
ensureDependency(dependency: Dependency,
                 dispatch: (action: Action) => ?,
                 getState: () => Store)

ConnectedComponent: a React component that's already been run through
react-redux's connect, which provides ConnectedComponent#selector.props
*/
function remote(mapPropsToDependencies, ensureDependency) {
  return function wrapWithRemote(ConnectedComponent) {
    class RemoteConnectedComponent extends ConnectedComponent {
      ensureDependencies(props) {
        const dependencies = mapPropsToDependencies(props)
        dependencies.forEach(dependency => {
          props.dispatch((dispatch, getState) => {
            ensureDependency(dependency, dispatch, getState)
          })
        })
      }
      componentDidMount() {
        // a connected component's componentDidMount method calls
        // this.selector.run(this.props), which updates this.selector.props
        super.componentDidMount()
        this.ensureDependencies(this.selector.props)
      }
      componentWillReceiveProps(nextProps) {
        // a connected component's componentWillReceiveProps method calls
        // this.selector.run(nextProps), which updates this.selector.props
        super.componentWillReceiveProps(nextProps)
        this.ensureDependencies(this.selector.props)
      }
    }
    RemoteConnectedComponent.displayName = `Remote(${ConnectedComponent.displayName})`
    return hoistStatics(RemoteConnectedComponent, ConnectedComponent)
  }
}

export default remote
