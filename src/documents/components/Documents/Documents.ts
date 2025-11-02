import type { Document } from "@documents/types";
import Component from "@shared/components/Component";

import type { LayoutType } from "../DocumentItem/types";
import DocumentsLayout from "./layouts/DocumentsLayout";

type DocumentsComponentProps = {
  documents: Document[];
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
}

export default DocumentsComponent;
