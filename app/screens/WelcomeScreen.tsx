import { observer } from "mobx-react-lite"
import React, { FC, useCallback } from "react"
import { Dimensions, Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Button, Screen, Text } from "../components"
import { NumericTextInput } from "../components/NumericTextInput"
import { colors, spacing } from "../theme"

const rnrLogo = require("../../assets/images/rnr-logo.png")

const defaultTransformValues = {
  a1: "0.4",
  b1: "0",
  c1: "0.5",
  d1: "1.2",
  a2: "0",
  b2: "0",
  c2: "0",
  d2: "0",
  a3: "0",
  b3: "0",
  c3: "1",
  d3: "0",
  a4: "60",
  b4: "10",
  c4: "0",
  d4: "1",
}

export const WelcomeScreen: FC = observer(function WelcomeScreen() {
  const [transformValues, setTransformValues] = React.useReducer(
    (data, partialData) => ({ ...data, ...partialData }),
    defaultTransformValues,
  )
  const [matrixValues, setMatrixValues] = React.useState([
    transformValues.a1,
    transformValues.b1,
    0,
    0,
    transformValues.c1,
    transformValues.d1,
    0,
    0,
    0,
    0,
    1,
    0,
    60, // transformValues.a2,
    10, // transformValues.b2,
    0,
    1,
  ])

  const onGenerate = useCallback(() => {
    setMatrixValues([
      transformValues.a1,
      transformValues.b1,
      0,
      0,
      transformValues.c1,
      transformValues.d1,
      0,
      0,
      0,
      0,
      1,
      0,
      60, // transformValues.a2,
      10, // transformValues.b2,
      0,
      1,
    ])
  }, [])

  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top", "bottom"]}
      contentContainerStyle={$contentContainer}
    >
      <Text preset="heading" text="Matrix3D" />
      <View style={$fieldsContainer}>
        {Object.keys(defaultTransformValues).map((key) => (
          <NumericTextInput
            containerStyle={$field}
            key={key}
            label={key}
            onUpdate={(value) => {
              setTransformValues({ [key]: value })
            }}
            value={transformValues[key]}
          />
        ))}
        <Button onPress={onGenerate} preset="filled" text="Generate!" />
      </View>
      <View style={$rnrLogoContainer}>
        <Image
          style={[
            $rnrLogo,
            {
              transform: [
                {
                  matrix: matrixValues.map((value) => Number(value)),
                },
              ],
            },
          ]}
          source={rnrLogo}
          resizeMode="contain"
        />
      </View>
    </Screen>
  )
})

const $contentContainer: ViewStyle = {
  backgroundColor: colors.background,
  flex: 1,
  justifyContent: "space-between",
  paddingHorizontal: spacing.large,
  paddingTop: spacing.extraLarge,
}

const $fieldsContainer: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
}

const $field: TextStyle = {
  marginEnd: spacing.small,
  marginBottom: spacing.medium,
  width: Dimensions.get("window").width / 4 - spacing.large,
}

const $rnrLogo: ImageStyle = {
  height: 88,
  marginBottom: spacing.huge,
  width: "100%",
}

const $rnrLogoContainer: ViewStyle = {
  flex: 1,
  justifyContent: "center",
}
