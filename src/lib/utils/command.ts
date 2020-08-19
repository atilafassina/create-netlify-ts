export function command(pkgManager: string, cmd: string) {
  switch (cmd) {
    case 'GLOBAL_INSTALL':
      return pkgManager === 'yarn' ? 'global add --silent' : 'i -g'
    case 'LOCAL_INSTALL':
      return pkgManager === 'yarn' ? 'add --silent' : 'i'
    case 'DEV_INSTALL':
      return pkgManager === 'yarn' ? 'add -D --silent' : 'i -D'
    default:
      return '--help'
  }
}
