import Vditor from 'vditor'

export function initVditor(id: string): Promise<Vditor> {
  // Nothing we should change here
  const OPTIONS_FORM_DOC = {}

  return new Promise(resolve => {
    let vditor: Vditor
    // Modify these due to our needs
    const options = {
      height: '100%',
      after: () => resolve(vditor),
    }
    vditor = new Vditor(id, { ...OPTIONS_FORM_DOC, ...options })
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

