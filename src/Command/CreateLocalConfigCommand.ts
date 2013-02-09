///<reference path='ICommand.ts'/>
///<reference path='../Config.ts'/>
///<reference path='../System/IO/FileManager.ts'/>

module Command {

    export class CreateLocalConfigCommand extends BaseCommand {

        public shortcut: string = "ncfg";
        public usage: string = "Create a local config file";
        private args: Array;

        public accept(args: Array): bool {
            return args[2] == this.shortcut;
        }

        private saveConfigFile(): void {
            var sw = System.IO.FileManager.handle.createFile(Config.FILE_NAME);
            sw.write('{\n'
                    + '    "localPath": "typings",\n'
                    + '    "repo": {\n'
                    + '        "uriList": [{\n'
                    + '                "repositoryType": "1",\n'
                    + '                "uri": "https://github.com/Diullei/tsd/raw/master/deploy/repository.json"\n'
                    + '            }\n'
                    + '        ]\n'
                    + '    }\n'
                    + '}');
            sw.flush();
            sw.close();
        }

        public exec(args: Array): void {
            if (System.IO.FileManager.handle.fileExists(Config.FILE_NAME)) {
                throw new Error("   [!] There is already a configuration file in this folder.");
            } else {
                this.saveConfigFile();
            }
            System.Console.writeLine("   [!] Configuration file created successfully.");
            System.Console.writeLine("");
        }
    }
}