import Vditor from 'vditor'

export function initVditor(domId: string, contentId: string): Promise<Vditor> {
  return new Promise(resolve => {
    let vditor: Vditor
    // Modify these due to our needs
    const options = {
      height: '100%',
      lang: 'en_US',
      outline: {
        enable: true,
        position: 'right'
      },
      cache: {
        id: contentId
      },
      after: () => resolve(vditor),
    }
    // @ts-ignore NOTE: Type error from source code, not these options
    vditor = new Vditor(domId, options)
  })
}

/**
 * TODO: Change theme by time
 */
export function setVditorTheme(vditor: Vditor, theme: 'light' | 'dark') {
  const tabThemeMap = {
    light: 'classic',
    dark: 'dark',
  } as const

  const tabTheme = tabThemeMap[theme]
  vditor.setTheme(tabTheme as valueOf<typeof tabThemeMap>)
  Vditor.setContentTheme('dark', 'https://unpkg.com/vditor/dist/css/content-theme')
  return vditor
}

