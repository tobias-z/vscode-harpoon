import ActiveProjectService from "../../../service/active-project-service";
import * as assert from "assert";
import { beforeEach } from "mocha";

suite("active project service", () => {
  let activeProjectService: ActiveProjectService;

  beforeEach(() => {
    activeProjectService = new ActiveProjectService([]);
  });

  test("can add editor", () => {
    const expected = "something";
    activeProjectService.addEditor({ fileName: expected });
    const actual = activeProjectService.getEditor(1);
    assert.notStrictEqual(actual, null);
    assert.strictEqual(actual.fileName, expected);
  });

  test("given two files when they are equal then only one is added", () => {
    const name = "bob";
    activeProjectService.addEditor({ fileName: name });
    activeProjectService.addEditor({ fileName: name });
    const expected = 1;
    const actual = activeProjectService.activeEditors.length;
    assert.strictEqual(actual, expected);
  });
});
