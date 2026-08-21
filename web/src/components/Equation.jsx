import katex from "katex";
import "katex/dist/katex.min.css";


export function Equation({
    children
}) {

    const html =
        katex.renderToString(
            children,
            {
                throwOnError: false,
                displayMode: true
            }
        );

    return (
        <div
            className="equation"
            dangerouslySetInnerHTML={{
                __html: html
            }}
        />
    );
}