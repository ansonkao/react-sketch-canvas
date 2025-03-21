import {
  HTMLContainer,
  ShapeUtil,
  Rectangle2d,
  type TLBaseShape,
  stopEventPropagation,
  useEditor,
} from "@tldraw/tldraw";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { Tldraw } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";

// Add custom styles for tldraw
import "./TldrawIntegration.css";

type RegionShape = TLBaseShape<
  "region",
  {
    w: number;
    h: number;
  }
>;

export class RegionShapeUtil extends ShapeUtil<RegionShape> {
  static override type = "region" as const;

  getDefaultProps(): RegionShape["props"] {
    return {
      w: 200,
      h: 200,
    };
  }

  getGeometry(shape: RegionShape) {
    return new Rectangle2d({
      width: shape.props.w,
      height: shape.props.h,
      isFilled: true,
    });
  }

  component(shape: RegionShape) {
    console.log(shape.props.w, shape.props.h);

    const editor = useEditor();

    return (
      <HTMLContainer
        onPointerDown={stopEventPropagation}
        style={{
          pointerEvents: "all",
        }}
      >
        <ReactSketchCanvas
          shape={shape}
          editor={editor}
          strokeWidth={5 / this.editor.getZoomLevel()}
          strokeColor="black"
          width={`${shape.props.w}px`}
          height={`${shape.props.h}px`}
          canvasColor="transparent"
        />
      </HTMLContainer>
    );
  }

  // hideResizeHandles(_shape: RegionShape): boolean {
  //   return true;
  // }

  // hideRotateHandle(_shape: RegionShape): boolean {
  //   return true;
  // }

  // onTranslate(initial: RegionShape) {
  //   return initial;
  // }

  indicator(shape: RegionShape) {
    return <rect width={shape.props.w} height={shape.props.h} />;
  }
}

const customShapeUtils = [RegionShapeUtil];

export function TldrawIntegration() {
  return (
    <div className="reset-wrapper flex gap-4">
      <div
        className="relative border border-accent-900"
        style={{ width: 1000, height: 600 }}
      >
        <Tldraw
          // persistenceKey="dummy"
          autoFocus
          shapeUtils={customShapeUtils}
          onMount={(editor) => {
            console.log("editor", editor);

            editor.createShape({
              type: "region",
              x: 0,
              y: 0,
              props: {
                w: 600,
                h: 400,
                canvasData: "",
              },
            });
          }}
        />
      </div>
    </div>
  );
}
