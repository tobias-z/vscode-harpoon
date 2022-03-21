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
    activeProjectService.addEditor({ fileName: expected, lastLine: 1 });
    const actual = activeProjectService.getEditor(1);
    assert.notStrictEqual(actual, null);
    assert.strictEqual(actual.fileName, expected);
  });
});
