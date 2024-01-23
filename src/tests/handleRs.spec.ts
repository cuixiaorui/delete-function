// TODO: vitest 无法载入 wasm 模块: Error: [vite-node] Failed to load pkg/delete_function_vsc
// import { rust2ast } from 'pkg/delete_function_vsc';
// import { describe, test } from 'vitest';

// describe("handle rust", () => {

//   test("should delete function at focurs Position", () => {
//     const code = `
//       const TIPS: &[&str] = &[
//         "Click on any AST node with a '+' to expand it",

//         "Hovering over a node highlights the \
//         corresponding location in the source code",

//         "Shift click on an AST node to expand the whole subtree",
//       ];

//       pub fn print_tips() {
//         for (i, tip) in TIPS.iter().enumerate() {
//             println!("Tip {}: {}.", i, tip);
//         }
//       }
//     `;
//     // const range = rust2ast(code, 10);
//     console.log(rust2ast);


//     // expect(range).toEqual([10, 14]);

//   });
// });