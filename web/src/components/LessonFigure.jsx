export function LessonFigure({src, alt, caption, source}) {
    return (
        <figure className="lesson-figure">
            
            <img src={src} alt={alt} loading="lazy"/>

            <figcaption>
                {caption}

                {source && (
                    <span className="figure-source">
                        {source}
                    </span>
                )}
            </figcaption>
            
        </figure>
    );
}