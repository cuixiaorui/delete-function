import { describe, it, expect } from "vitest";
import { getDeleteFunctionNodeJs } from "../handlers/handleJs";
describe("handle ts", () => {
  it("should delete function at offset Position", () => {
    let offset = 20;

    const documentText = `
    function getName ():string {
        return 'name'
    }
    `;

    const node = getDeleteFunctionNodeJs(offset, documentText);

    expect(node).toEqual({
      name: "getName",
      start: {
        line: 2,
        column: 4,
        index: 5,
      },
      end: {
        line: 4,
        column: 5,
        index: 61,
      },
    });
  });
});
