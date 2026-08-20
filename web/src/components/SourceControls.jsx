export function SourceControls({sourceX, sourceY, onXChange, onYChange}) {

    return (
        <section className="source-controls">

            <h3>Source Position</h3>

            <div className="source-control">
                <label htmlFor="source-x">
                    Source X
                </label>
                
                <div className="source-controls-inputs">
                    <input
                    id="source-x"
                    type="range"
                    min="-5"
                    max="5"
                    step="0.1"
                    value={sourceX}
                    onChange={onXChange}
                    /> 
                    <input
                    type="number"
                    min="-5"
                    max="5"
                    step="0.01"
                    value={sourceX}
                    onChange={onXChange}
                    />
                </div>
                
            </div>

            <div className="source-control">
                <label htmlFor="source-y">
                    Source Y
                </label>

                <div className="source-controls-inputs">
                <input
                    id="source-y"
                    type="range"
                    min="-5"
                    max="5"
                    step="0.1"
                    value={sourceY}
                    onChange={onYChange}
                />
                <input
                    type="number"
                    min="-5"
                    max="5"
                    step="0.1"
                    value={sourceY}
                    onChange={onYChange}
                />
                </div>
            </div>
        </section>
    );
}