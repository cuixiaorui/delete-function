import { describe, it, expect } from "vitest";
import { getDeleteFunctionNodeJs } from "../handlers/handleJs";

describe("handle js", () => {
  it("should delete function at offset Position", () => {
    // getName
    let offset = 29;

    const documentText = `
    const name = "cxr";
    function getName () {
        return 'name'
    }
    function setName(newName){
      name = newName
    }
    `;

    const node = getDeleteFunctionNodeJs(offset, documentText);

    expect(node).toEqual({
      name: "getName",
      start: {
        line: 3,
        column: 4,
        index: 29,
      },
      end: {
        line: 5,
        column: 5,
        index: 78,
      },
    });

    // update offset
    // setName
    offset = 83;

    const updatedNode = getDeleteFunctionNodeJs(offset, documentText);

    expect(updatedNode).toEqual({
      name: "setName",
      start: {
        line: 6,
        column: 4,
        index: 83,
      },
      end: {
        line: 8,
        column: 5,
        index: 136,
      },
    });
  });

  describe("nested function", () => {
    it("should delete outside function", () => {
      const offset = 38;

      const documentText = `
    const name = "cxr";
    function getName () {
      function heihei(){
        return "heihei"
      }
    }
    `;

      const node = getDeleteFunctionNodeJs(offset, documentText);

      expect(node).toEqual({
        name: "getName",
        start: {
          line: 3,
          column: 4,
          index: 29,
        },
        end: {
          line: 7,
          column: 5,
          index: 113,
        },
      });
    });
    it("should delete inside function", () => {
      // 定位到 heihei 的位置
      const offset = 57;

      const documentText = `
    const name = "cxr";
    function getName () {
      function heihei(){
        return "heihei"
      }
    }
    `;

      const node = getDeleteFunctionNodeJs(offset, documentText);

      expect(node).toEqual({
        name: "heihei",
        start: {
          line: 4,
          column: 6,
          index: 57,
        },
        end: {
          line: 6,
          column: 7,
          index: 107,
        },
      });
    });
  });
});

describe("FunctionExpression", () => {
  it("should delete function at offset Position", () => {
    // getName function
    let offset = 45;

    const documentText = `
    const name = "cxr";
    const getName = function () {
        return 'name'
    }
    const setName = function (){
      return 'name'
    }
    `;

    const node = getDeleteFunctionNodeJs(offset, documentText);

    expect(node).toEqual({
      name: "getName",
      start: {
        line: 3,
        column: 4,
        index: 29,
      },
      end: {
        line: 5,
        column: 5,
        index: 86,
      },
    });

    // update offset
    // setName
    offset = 91;
    const updatedNode = getDeleteFunctionNodeJs(offset, documentText);

    expect(updatedNode).toEqual({
      name: "setName",
      start: {
        line: 6,
        column: 4,
        index: 91,
      },
      end: {
        line: 8,
        column: 5,
        index: 145,
      },
    });
  });

  describe("nested function", () => {
    it("should delete outside function", () => {
      // getName function
      const offset = 29;

      const documentText = `
    const name = "cxr";
    const getName = function () {
        return 'name'

        const setName = function (){
          console.log("setName")
        }
    }
    `;

      const node = getDeleteFunctionNodeJs(offset, documentText);

      expect(node).toEqual({
        name: "getName",
        start: {
          line: 3,
          column: 4,
          index: 29,
        },
        end: {
          line: 9,
          column: 5,
          index: 167,
        },
      });
    });

    it("should delete inside function", () => {
      // setName function
      const offset = 90;

      const documentText = `
    const name = "cxr";
    const getName = function () {
        return 'name'

        const setName = function (){
          console.log("setName")
        }
    }
    `;

      const node = getDeleteFunctionNodeJs(offset, documentText);

      expect(node).toEqual({
        name: "setName",
        start: {
          line: 6,
          column: 8,
          index: 90,
        },
        end: {
          line: 8,
          column: 9,
          index: 161,
        },
      });
    });
  });
});

describe("ArrowFunctionExpression", () => {
  it("should delete function at offset Position", () => {
    // getName
    let offset = 29;

    const documentText = `
    const name = "cxr";
    const getName = ()=> "cxr";
    const setName = ()=> "cxr";
    `;

    // 应该返回的是 getName
    const node = getDeleteFunctionNodeJs(offset, documentText);

    expect(node).toEqual({
      name: "getName",
      start: {
        line: 3,
        column: 4,
        index: 29,
      },
      end: {
        line: 3,
        column: 31,
        index: 56,
      },
    });

    // update offset
    // setName
    offset = 61;

    const updatedNode = getDeleteFunctionNodeJs(offset, documentText);

    expect(updatedNode).toEqual({
      name: "setName",
      start: {
        line: 4,
        column: 4,
        index: 61,
      },
      end: {
        line: 4,
        column: 31,
        index: 88,
      },
    });
  });

  describe("nested function", () => {
    it("should delete outside function", () => {
      // getName function
      const offset = 29;

      const documentText = `
    const name = "cxr";
    const getName = ()=> {
      console.log("heihei");
      const setName = ()=> "hei"
    };
    `;

      const node = getDeleteFunctionNodeJs(offset, documentText);

      expect(node).toEqual({
        name: "getName",
        start: {
          line: 3,
          column: 4,
          index: 29,
        },
        end: {
          line: 6,
          column: 6,
          index: 120,
        },
      });
    });

    it("should delete inside function", () => {
      // setName function
      const offset = 87;

      const documentText = `
    const name = "cxr";
    const getName = ()=> {
      console.log("heihei");
      const setName = ()=> "hei"
    };
    `;

      const node = getDeleteFunctionNodeJs(offset, documentText);

      expect(node).toEqual({
        name: "setName",
        start: {
          line: 5,
          column: 6,
          index: 87,
        },
        end: {
          line: 5,
          column: 32,
          index: 113,
        },
      });
    });
  });
});
