import R from 'ramda'

export default function addHandlers(componentInstance) {
    const setState = componentInstance.setState.bind(componentInstance)
    const evolveState = R.pipe(
      R.evolve,
      setState
    )

    componentInstance.evolveState = evolveState

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
}
