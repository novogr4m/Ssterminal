/**
 * 注册指令文件
 */

import { CommandType } from "./command";
import searchCommands from "./commands/search/searchCommands";
import gotoCommand from "./commands/gotoCommand";
import dateCommand from "./commands/dateCommand";
import clearCommand from "./commands/terminal/clearCommand";
import historyCommand from "./commands/terminal/historyCommand";
import userCommands from "./commands/user/userCommands";
import timingCommand from "./commands/timing/timingCommand";
import backgroundCommand from "./commands/terminal/config/backgroundCommand";
import resetCommand from "./commands/terminal/config/resetCommand";
import fanyiCommand from "./commands/fanyi/fanyiCommand";
import helpCommand from "./commands/terminal/help/helpCommand";
import pingCommand from "./commands/relax/pingCommand";
import hintCommand from "./commands/terminal/config/hintCommand";
import todoCommand from "./commands/todo/todoCommand";
import musicCommand from "./commands/relax/music/musicCommand";
import gameCommand from "./commands/relax/game/gameCommand";
import shortcutCommand from "./commands/terminal/shortcut/shortcutCommand";
import welcomeCommand from "./commands/terminal/config/welcomeCommand";
import hotCommand from "./commands/hot/hotCommand";
import varbookCommand from "./commands/varbook/varbookCommand";
import fullScreenCommand from "./commands/terminal/fullScreen";
import huyaCommand from "./commands/relax/huyaCommand";
import UICommand from './commands/uidoc/index';
import articleCommand from "./commands/article/articleCommand";
import weatherCommand from './commands/weather/weatherCommand';
import bilibiliCommand from "./commands/bilibiliVideo/videoCommand";
/**
 * 命令列表（数组元素顺序会影响 help 命令的展示顺序）
 */
const commandList: CommandType[] = [
    ...userCommands,
    shortcutCommand,
    ...UICommand,
    articleCommand,
    gotoCommand,
    ...searchCommands,
    weatherCommand,
    varbookCommand,
    hotCommand,
    bilibiliCommand,
    gameCommand,
    huyaCommand,
    todoCommand,
    timingCommand,
    dateCommand,
    clearCommand,
    fanyiCommand,
    pingCommand,
    musicCommand,
    welcomeCommand,
    backgroundCommand,
    resetCommand,
    hintCommand,
    fullScreenCommand,
    historyCommand,
    helpCommand,


];

/**
 * 命令字典
 */
const commandMap: Record<string, CommandType> = {};

//设置命令map
//eg:help:{func:....,alias:....}
commandList.forEach((command) => {
    commandMap[command.func] = command;
    command.alias?.forEach((name) => {
        commandMap[name] = command;
    });
});

export { commandList, commandMap };
