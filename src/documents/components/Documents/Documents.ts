import Component from "../../../components/Component";
import type { DocumentViewModel } from "../../viewModel/types";
import type { LayoutType } from "../DocumentItem/types";
import DocumentsLayout from "./layouts/DocumentsLayout";

type DocumentsComponentProps = {
  documents: DocumentViewModel[];
  layoutType: LayoutType;
};

class DocumentsComponent extends Component<DocumentsComponentProps> {
  private currentLayoutType: LayoutType = this.props.layoutType;

  protected render(): Element {
    const layout = new DocumentsLayout(this.props.documents);

    const layouts: Record<LayoutType, () => HTMLElement> = {
      list: layout.generateListLayout.bind(layout),
      grid: layout.generateGridLayout.bind(layout),
    };

    return layouts[this.currentLayoutType]();
  }

  updateLayout(layoutType: LayoutType): void {
    this.currentLayoutType = layoutType;

    const updatedElement = this.render();
    this.setElement(updatedElement);
  }
}

export default DocumentsComponent;
