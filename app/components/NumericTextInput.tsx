import React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { TextField } from "./TextField"

interface NumberFormatConfig {
  divisor: number
  minimumFractionDigits: number
}

export interface NumbericTextInputProps {
  /**
   * Style overrides for the container
   */
  containerStyle?: StyleProp<ViewStyle>
  /**
   * label: string (required) - The label text to display
   */
  label: string
  /**
   * (value) => void (required) - called when the value of the TextInput changes.
   */
  onUpdate: (value?: number) => void
  /**
   * value: number (required) - if not provided, will default to 0.
   */
  value: number
}

export function NumericTextInput(props: NumbericTextInputProps) {
  const { containerStyle, label, onUpdate, value } = props

  const formatConfig = React.useMemo<NumberFormatConfig>(
    () => ({
      divisor: Math.pow(10, 1),
      minimumFractionDigits: 1,
    }),
    [],
  )

  const formatNumberValue = React.useCallback(
    (numberFormatConfig: NumberFormatConfig, numberValue?: number): string => {
      let returnValue = ""
      if (numberValue || numberValue === 0) {
        const { ...config } = numberFormatConfig
        returnValue = new Intl.NumberFormat("en-US", config).format(numberValue)
      }
      return returnValue
    },
    [],
  )

  const parseStringValue = React.useCallback(
    (text: string, numberFormatConfig: NumberFormatConfig): number => {
      const digitsOnly = text.match(/\d+/g)
      return digitsOnly ? parseInt(digitsOnly.join(""), 10) / numberFormatConfig.divisor : undefined
    },
    [],
  )

  const onUpdateHandler = React.useCallback(
    (text: string) => {
      const parsedValue = parseStringValue(text, formatConfig)
      onUpdate(parsedValue)
    },
    [onUpdate, parseStringValue, formatConfig],
  )

  return (
    <TextField
      containerStyle={containerStyle}
      keyboardType="numeric"
      label={label}
      onChangeText={onUpdateHandler}
      value={formatNumberValue(formatConfig, value)}
    />
  )
}
