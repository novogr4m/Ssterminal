import { CommandType } from "../../../command";
import { useTodoStore } from "../todoStore";
import TaskType = Todo.TaskType;

/**
 * 添加任务命令
 *
 */
const updateCommand: CommandType = {
    func: "update",
    alias: ['up'],
    name: "修改任务",

    options: [
        {
            key: "index",
            desc: "任务序号",
            alias: ["n"],
            type: "string",
            required: true,
        },
        {
            key: "name",
            desc: "新修改的任务名称",
            alias: ["r"],
            type: "string",
            required:true
        }
    ],

     action(options, terminal) {
        const { index ,name} = options;
        if (!index) {
            terminal.writeTextErrorResult("请输入需要修改的任务序号");
            return;
        }
        if (!name) {
            terminal.writeTextErrorResult("请输入新的任务名称");
            return;
        }
        
        const { updateTask } = useTodoStore();
        const newTask = {
            name,
          } as TaskType;
        
        const res =  updateTask(index, newTask);
        if (res) {
            terminal.writeTextSuccessResult("修改任务成功");
        } else {
            terminal.writeTextErrorResult("修改任务失败");
        }
    },
};

export default updateCommand;
