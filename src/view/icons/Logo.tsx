import React from 'react'
import {StyleSheet, TextProps} from 'react-native'
import Svg, {
  Defs,
  LinearGradient,
  Path,
  PathProps,
  Stop,
  SvgProps,
} from 'react-native-svg'
import {Image} from 'expo-image'

import {colors} from '#/lib/styles'
import {useKawaiiMode} from '#/state/preferences/kawaii'

const ratio = 57 / 64

type Props = {
  fill?: PathProps['fill']
  style?: TextProps['style']
} & Omit<SvgProps, 'style'>

export const Logo = React.forwardRef(function LogoImpl(props: Props, ref) {
  const {fill, ...rest} = props
  const gradient = fill === 'sky'
  const styles = StyleSheet.flatten(props.style)
  const _fill = gradient ? 'url(#sky)' : fill || styles?.color || colors.blue3
  // @ts-ignore it's fiiiiine
  const size = parseInt(rest.width || 32)

  const isKawaii = useKawaiiMode()

  if (isKawaii) {
    return (
      <Image
        source={
          size > 100
            ? require('../../../assets/kawaii.png')
            : require('../../../assets/kawaii_smol.png')
        }
        accessibilityLabel="Bluesky"
        accessibilityHint=""
        accessibilityIgnoresInvertColors
        style={[{height: size, aspectRatio: 1.4}]}
      />
    )
  }

  return (
    <Svg
      fill="none"
      ref={ref}
      viewBox="0 0 64 57"
      {...rest}
      style={[{width: size, height: size * ratio}, styles]}
    >
      <Defs>
        <LinearGradient id="trans" x1="0" y1="0" x2="0" y2="100%" spreadMethod="pad" gradientUnits="userSpaceOnUse" gradientTransform="rotate(-15 32 32)">
          <Stop offset="0%" stopColor="#5bcefa" stopOpacity="1"/>
          <Stop offset="20%" stopColor="#5bcefa" stopOpacity="1"/>
          <Stop offset="20%" stopColor="#f5a9b8" stopOpacity="1"/>
          <Stop offset="40%" stopColor="#f5a9b8" stopOpacity="1"/>
          <Stop offset="40%" stopColor="#ffffff" stopOpacity="1"/>
          <Stop offset="60%" stopColor="#ffffff" stopOpacity="1"/>
          <Stop offset="60%" stopColor="#f5a9b8" stopOpacity="1"/>
          <Stop offset="80%" stopColor="#f5a9b8" stopOpacity="1"/>
          <Stop offset="80%" stopColor="#5bcefa" stopOpacity="1"/>
          <Stop offset="100%" stopColor="#5bcefa" stopOpacity="1"/>
        </LinearGradient>
      </Defs>
      <Path
        fill="url(#trans)"
        d="M13.873 3.805C21.21 9.332 29.103 20.537 32 26.55v15.882c0-.338-.13.044-.41.867-1.512 4.456-7.418 21.847-20.923 7.944-7.111-7.32-3.819-14.64 9.125-16.85-7.405 1.264-15.73-.825-18.014-9.015C1.12 23.022 0 8.51 0 6.55 0-3.268 8.579-.182 13.873 3.805ZM50.127 3.805C42.79 9.332 34.897 20.537 32 26.55v15.882c0-.338.13.044.41.867 1.512 4.456 7.418 21.847 20.923 7.944 7.111-7.32 3.819-14.64-9.125-16.85 7.405 1.264 15.73-.825 18.014-9.015C62.88 23.022 64 8.51 64 6.55c0-9.818-8.578-6.732-13.873-2.745Z"
      />
    </Svg>
  )
})
