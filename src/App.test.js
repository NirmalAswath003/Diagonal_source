import { update } from "../src/redux/data.js";
import store from "./redux/Store";
const data1 = require(`../src/Api/CONTENTLISTINGPAGE-PAGE${1}.json`);
var data = data1.page["content-items"].content;
describe("data redux state tests", () => {
  it("Should initially set data to an empty object", () => {
    const state = store.getState().data;
    expect(state.value).toEqual([]);
  });
  it("Should be able to fetch the data and store the same", async () => {
    const result = await store.dispatch(update(data));
    const games = result.payload;
    const state = store.getState().data;
    const finaldata = state.value[0];
    expect(finaldata).toBe(games);
  });
});
