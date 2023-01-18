import { observer } from "mobx-react-lite"
import React, { FC, useCallback } from "react"
import { Dimensions, Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Button, Screen, Text } from "../components"
import { NumericTextInput } from "../components/NumericTextInput"
import { colors, spacing } from "../theme"

const rnrLogo = require("../../assets/images/rnr-logo.png")

const defaultTransformValues = {
  a1: 1,
  b1: 0,
  c1: 0,
  d1: 0,
  a2: 0,
  b2: 1,
  c2: 0,
  d2: 0,
  a3: 0,
  b3: 0,
  c3: 1,
  d3: 0,
  a4: 0,
  b4: 0,
  c4: 0,
  d4: 1,
}

export const WelcomeScreen: FC = observer(function WelcomeScreen() {
  const [transformValues, setTransformValues] = React.useState(defaultTransformValues)
  const [matrixValues, setMatrixValues] = React.useState<number[]>([
    transformValues.a1,
    transformValues.b1,
    transformValues.c1,
    transformValues.d1,
    transformValues.a2,
    transformValues.b2,
    transformValues.c2,
    transformValues.d2,
    transformValues.a3,
    transformValues.b3,
    transformValues.c3,
    transformValues.d3,
    transformValues.a4,
    transformValues.b4,
    transformValues.c4,
    transformValues.d4,
  ])

  const onGenerate = useCallback(() => {
    setMatrixValues([
      transformValues.a1,
      transformValues.b1,
      transformValues.c1,
      transformValues.d1,
      transformValues.a2,
      transformValues.b2,
      transformValues.c2,
      transformValues.d2,
      transformValues.a3,
      transformValues.b3,
      transformValues.c3,
      transformValues.d3,
      transformValues.a4,
      transformValues.b4,
      transformValues.c4,
      transformValues.d4,
    ])
  }, [transformValues])

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
              setTransformValues({ ...transformValues, [key]: value })
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
                  matrix: matrixValues,
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
