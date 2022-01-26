import mitt from 'mitt'
const Mitt = mitt
const emitter: mitt.Emitter = new Mitt()

export const EVENT_EXPAND_MENU = 'expand_menu'

export default emitter
