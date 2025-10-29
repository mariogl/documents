import FakeDocumentsClient from "../../documents/client/FakeDocumentsClient";
import { render } from "../../testUtils";
import AppComponent from "./App";

describe("App Component", () => {
  it("should render the documents list", () => {
    const app = new AppComponent({
      documentsClient: new FakeDocumentsClient(),
    });
    render(app);
  });
});
