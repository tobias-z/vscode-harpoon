import ActiveProjectService from "../service/active-project-service";
import WorkspaceService from "../service/workspace-service";

export function createRemoveEditorByIdCommand(
    workspaceService: WorkspaceService,
    activeProjectService: ActiveProjectService
) {
    return (id: number) => {
        return async () => {
            const didRemove = activeProjectService.removeEditorById(id);
            if (didRemove) {
                workspaceService.saveWorkspace();
            }
        };
    };
}
