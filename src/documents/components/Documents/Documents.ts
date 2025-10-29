import Component from "../../../components/Component";
import type { DocumentViewModel } from "../../viewModel/types";
import type { LayoutType } from "../DocumentItem/types";
import DocumentsLayout from "./layouts/DocumentsLayout";

type DocumentsComponentProps = {
  documents: DocumentViewModel[];
  layoutType: LayoutType;
};

class DocumentsComponent extends Component<DocumentsComponentProps> {
  protected render(): Element {
    const layout = new DocumentsLayout(this.props.documents);

    const layouts: Record<LayoutType, () => HTMLElement> = {
      list: layout.generateListLayout.bind(layout),
      grid: layout.generateGridLayout.bind(layout),
    };

    return layouts[this.props.layoutType]();
  }
}

export default DocumentsComponent;
