import React from "react";
import ReactDOM from "react-dom";
import { FilterGroup } from "./FilterGroup";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<FilterGroup />, div);
  ReactDOM.unmountComponentAtNode(div);
});
