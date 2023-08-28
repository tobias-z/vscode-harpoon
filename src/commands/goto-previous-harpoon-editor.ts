import ActiveProjectService from "../service/active-project-service";
import WorkspaceService from "../service/workspace-service";

export default function createGotoPreviousHarpoonEditorCommand(
    activeProjectService: ActiveProjectService,
    workspaceService: WorkspaceService
) {
    return () => {
        const previousEditor = activeProjectService.previousEditor;
        if (!previousEditor) {
            return;
        }
        const id = previousEditor.editorId;
        if (id) {
            try {
                workspaceService.changeEditorById(id);
            } catch (e) {
                workspaceService.changeEditorByName(previousEditor.fileName);
            }
        } else {
            workspaceService.changeEditorByName(previousEditor.fileName);
        }
    };
}
