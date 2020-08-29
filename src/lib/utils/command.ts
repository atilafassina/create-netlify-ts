interface ICommandOptions {
  [key: string]: any;
}

export function command(pkgManager: string, cmd: string): string {
  let _cmd = '--help'
  
  const options: ICommandOptions = {
    'GLOBAL_INSTALL': pkgManager === 'yarn' ? 'global add --silent' : 'i -g',
    'LOCAL_INSTALL': pkgManager === 'yarn' ? 'add --silent' : 'i',
    'DEV_INSTALL': pkgManager === 'yarn' ? 'add -D --silent' : 'i -D',
  }
  
  return options[cmd] || _cmd;
}
