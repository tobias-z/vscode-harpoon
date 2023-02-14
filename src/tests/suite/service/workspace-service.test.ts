import * as vscode from "vscode";
import { beforeEach } from "mocha";
import ActiveProjectService from "../../../service/active-project-service";
import WorkspaceService from "../../../service/workspace-service";
import * as assert from "assert";
import { getSlash } from "../../../util/system";

suite("workspace service", () => {
    let workspaceService: WorkspaceService;
    let activeProjectService: ActiveProjectService;

    beforeEach(async () => {
        activeProjectService = new ActiveProjectService([]);
        workspaceService = new WorkspaceService(
            activeProjectService,
            await vscode.extensions.getExtension("tobias-z.vscode-harpoon")!.activate(),
            "workspaceState"
        );
    });

    test("can change editor", async () => {
        const expected = `${process.cwd()}${getSlash()}package.json`;
        activeProjectService.addEditor({ fileName: expected });
        const doc = await workspaceService.changeEditorById(1);
        assert.strictEqual(doc?.document.fileName, expected);
    });

    test("can change back and forth between editors", async () => {
        const packageJson = `${process.cwd()}${getSlash()}package.json`;
        const gitIgnore = `${process.cwd()}${getSlash()}.gitignore`;

        activeProjectService.addEditor({ fileName: packageJson });
        const firstDoc = await workspaceService.changeEditorById(1);
        const firstWorkspace = firstDoc?.document.fileName;

        activeProjectService.addEditor({ fileName: gitIgnore });
        const secondDoc = await workspaceService.changeEditorById(2);
        const secondWorkspace = secondDoc?.document.fileName;

        assert.strictEqual(secondWorkspace, gitIgnore);
        assert.notStrictEqual(firstWorkspace, secondWorkspace);
    });

    test("can change editor with fileName", async () => {
        const expected = `${process.cwd()}${getSlash()}package.json`;
        activeProjectService.addEditor({ fileName: expected });
        const doc = await workspaceService.changeEditorByName(expected);
        assert.strictEqual(doc?.document.fileName, expected);
    });
});
