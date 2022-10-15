import { describe, it, expect } from "vitest";
import { getDeleteFunctionNodeVue } from "../handlers/handleVue";

describe("handle vue", () => {
  it("setup", () => {
    const code = `<template>
<div>vue</div>
</template>

<script setup>
function getName() {
    console.log("name");
    function setName(){console.log("setName")}
}
</script>

<style></style>
	`;

    const index = 54;
    const node = getDeleteFunctionNodeVue(index, code);

    expect(node).toEqual({
      name: "getName",
      start: {
        line: 6,
        column: 0,
      },
      end: {
        line: 9,
        column: 1,
      },
    });
  });

  it("script ", () => {
    const code = `
	<template>
	<div>

	</div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
	setup () {
		function setName () {
			return "name"
		}

		const name = "nihao"
		return {}
	}
})
</script>

<style scoped>

</style>
`;


    const index = 50 + 87;
    const node = getDeleteFunctionNodeVue(index, code);

    expect(node).toEqual({
      name: "setName",
      start: {
        line: 13,
        column: 2,
      },
      end: {
        line: 15,
        column: 3,
      },
    });
  });

  it("empty that setup and scripte", () => {
    const code = `
	<template>
	<div>
	</div>
</template>
`;

    const index = 10;
    const node = getDeleteFunctionNodeVue(index, code);

    expect(node).toBeFalsy();
  });
});
