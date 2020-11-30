// @ts-expect-error
import v8n from 'v8n'
import { ValueInputWithSettings } from '../../types'
import { orderKeys } from '../../utils'
import { NumberSettings, normalizeKeyValue } from '../Number/number-props'

// TODO add spring default settings

export type Spring = { tension: number; friction: number; mass?: number }
export type SpringSettings = { [key in keyof Spring]?: NumberSettings }

type SpringInput = ValueInputWithSettings<Spring, SpringSettings>

const number = v8n().number()

export const schema = (o: any) =>
  v8n()
    .schema({
      tension: number,
      friction: number,
      mass: v8n().optional(number),
    })
    .test(o)

const defaultTensionSettings = { min: 1 }
const defaultFrictionSettings = { min: 1 }
const defaultMassSettings = { min: 0.1 }

export const normalize = ({ value, ..._settings }: SpringInput) => {
  _settings = _settings || {}
  const settings = {
    tension: { ...defaultTensionSettings, ..._settings.tension },
    friction: { ...defaultFrictionSettings, ..._settings.friction },
    mass: { ...defaultMassSettings, ..._settings.mass },
  }
  const _value = orderKeys({ mass: 1, ...value }, ['tension', 'friction', 'mass'])
  return normalizeKeyValue(_value, settings)
}