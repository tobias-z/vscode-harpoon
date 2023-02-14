import WorkspaceService from "../service/workspace-service";

export function createGotoEditorCommand(workspaceService: WorkspaceService) {
    return (id: number) => {
        return async () => {
            await workspaceService.changeEditorById(id);
        };
    };
}
