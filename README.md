# react-redux-remote

Hook into the `componentDidMount` and `componentWillReceiveProps` stages of the React component lifecycle,
extracting `props` as managed by the `selector` of a [`react-redux`](https://github.com/reactjs/react-redux) `connect()`'ed component.

    import remote from 'react-redux-remote'

    const UserTable = ({users}) => ( ... )
    function mapStateToProps(...) { ... }
    function mapPropsToDependencies(...) { ... }

    const ConnectedUserTable = connect(mapStateToProps)(UserTable)
    const RemoteConnectedUserTable = remote(mapPropsToDependencies, ensureDependency)(ConnectedUserTable)
    export default RemoteConnectedUserTable

Kind of like [`react-refetch`](https://github.com/heroku/react-refetch), but keeps [`redux`](https://github.com/reactjs/redux) in the loop.


## Install

    npm install --save react-redux-remote


## References

* [`react-redux/components/connectAdvanced`](https://github.com/reactjs/react-redux/blob/master/src/components/connectAdvanced.js)


## License

Copyright (c) 2017 Christopher Brown. [MIT Licensed](https://chbrown.github.io/licenses/MIT/#2017).
