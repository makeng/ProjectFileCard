import Vditor from 'vditor'

export function initVditor(id: string) {
  // Nothing we should change here
  const OPTIONS_FORM_DOC = {}
  // Modify these due to our needs
  const options = {
    height: '100%'
  }
  return new Vditor(id, { ...OPTIONS_FORM_DOC, ...options })
}
