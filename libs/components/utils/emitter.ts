import mitt from 'mitt'
const Mitt = mitt
const emitter: mitt.Emitter = new Mitt()

export const EVENT_EXPAND_SIDE_BAR = 'toggle-side-bar-expand'

export default emitter
