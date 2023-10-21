import React, { CSSProperties, FC, PropsWithChildren } from 'react'

export type ConfigProviderProps = PropsWithChildren<{
  className?: string
  style?: CSSProperties
}>

export const ConfigProvider: FC<ConfigProviderProps> = (props) => {
  const { className, style, children } = props
  return (
    <div className={className} style={style}>
      {children}
    </div>
  )
}
