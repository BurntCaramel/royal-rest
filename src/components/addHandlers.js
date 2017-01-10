import R from 'ramda'

export default function addHandlers(componentInstance, { changeState } = {}) {
    const setState = componentInstance.setState.bind(componentInstance)
    const evolveState = R.pipe(
      R.evolve,
      setState
    )

    componentInstance.evolveState = evolveState

    componentInstance.handleValue = R.memoize((stateProp) => (value) => {
        setState({
            [stateProp]: value
        })
    })

    componentInstance.handleEventValue = R.memoize((stateProp) => (event) => {
        setState({
            [stateProp]: event.target.value
        })
    })

    componentInstance.handleKeyValuePair = R.memoize((stateProp) => (key, value) => {
        evolveState({
            [stateProp]: R.merge(R.__, {
                [key]: value
            })
        })
    })

    R.forEach(
        ([methodName, handler]) => {
            componentInstance[methodName] = R.pipe(
                R.always(handler),
                setState
            )
        },
        R.toPairs(changeState)
    )
}
