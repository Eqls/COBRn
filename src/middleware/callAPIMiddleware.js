const callAPIMiddleware = ({ dispatch, getState }) => {
  return next => action => {
    const {
      types,
      callAPI,
      shouldCallAPI = () => true,
      payload = {},
      onSuccess,
      onFailure,
      exec
    } = action

    if (!types) {
      // Normal action: pass it on
      return next(action)
    }

    if (
      !Array.isArray(types) ||
      types.length !== 3 ||
      !types.every(type => typeof type === 'string')
    ) {
      throw new Error('Expected an array of three string types.')
    }

    if (typeof callAPI !== 'function') {
      throw new Error('Expected callAPI to be a function.')
    }

    if (!shouldCallAPI(getState())) {
      return
    }

    const [requestType, successType, failureType] = types

    dispatch(
      Object.assign({}, payload, {
        type: requestType
      })
    )

    return callAPI().then(
      response => {
        if (exec) exec(response)
        dispatch(
          Object.assign({}, payload, {
            response,
            type: successType
          })
        )
        if (onSuccess) dispatch(onSuccess)
      },
      error => {
        dispatch(
          Object.assign({}, payload, {
            error: (error.response && error.response.data) || error,
            type: failureType
          })
        )

        if (onFailure) dispatch(onFailure())
      }
    )
  }
}

export default callAPIMiddleware;