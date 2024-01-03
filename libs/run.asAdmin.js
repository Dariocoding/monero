import { PowerShell, PowerShell as Shell } from "node-powershell";

/**
 * Runs a PowerShell command or an executable as admin
 *
 * @param command If a string is provided, it will be used as a command to
 *   execute in an elevated PowerShell. If an object with `path` is provided,
 *   the executable will be started in Run As Admin mode
 *
 * If providing a string for elevated PowerShell, ensure the command is parsed
 *   by PowerShell correctly by using an interpolated string and wrap the
 *   command in double quotes.
 *
 * Example:
 *
 * ```
 * `"Do-The-Thing -Param '${pathToFile}'"`
 * ```
 */
export const runAsAdmin = async (command) => {
  const shell = new Shell({});
  const showWindow = process.env.SHOW_MINNER === "true";
console.log({showWindow})
  const commandPsh = PowerShell.command`Start-Process ${command} -Verb RunAs` + (showWindow ? "" : " -WindowStyle Hidden");
console.log({commandPsh})
  await shell.invoke(commandPsh);
  return await shell.dispose();
};
