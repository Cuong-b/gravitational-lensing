import katex from "katex";
import "katex/dist/katex.min.css";


export function Equation({children, inline = false}) {

    const html =
        katex.renderToString(
            children,
            {
                throwOnError: false,
                displayMode: !inline
            }
        );

    if (inline) {
        return (
            <span
            className="equation-inline"
            dangerouslySetInnerHTML={{
                __html: html
            }}
            />
        );
    }

    return (
        <div
            className="equation"
            dangerouslySetInnerHTML={{
                __html: html
            }}
        />
    );
}