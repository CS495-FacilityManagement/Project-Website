function Presentation({title, embed, download} : {title: string, embed: string, download: string}) {
    return (
        <section>
            <h2 className="deliverable_title">{title}</h2>

            <div className="slide-container">
                <iframe src={embed} allowFullScreen/>
            </div>

            <p>
                <a href={download} target="_blank" rel="noreferrer">
                    Download Presentation (PDF)
                </a>
            </p>
        </section>
    );
}

function Document({title, embed, download}: {title: string, embed: string, download: string}) {
    return (
        <section>
            <h2 className="deliverable_title">{title}</h2>

            <div className="pdf-container">
                <iframe src={embed} title={title}/>
            </div>
            <p>
                <a href={download} target="_blank" rel="noreferrer">
                    Download Document (PDF)
                </a>
            </p>
        </section>
    );
}

function Collapsible({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <details className="deliverable-group" open>
            <summary className="deliverable_group_title">{title}</summary>
            {children}
        </details>
    );
}

export default function Deliverables() {
    return (
        <div className="page">
            <Collapsible title="Preliminary">
                <Presentation
                    title="Preliminary Presentation"
                    embed="https://docs.google.com/presentation/d/e/2PACX-1vQ7iPyGsCWZtszLqBkkMMru4Z_b7P4M8dV5eD_pMe03QGsSW9viGgUd-X0IyPfI5_NA7rkIsao1E-Ru/pubembed?start=false&loop=false&delayms=3000"
                    download="https://drive.google.com/uc?export=download&id=1DQ0uR8j9YY9Xgn2_FMX8tIKahq4LXAfV"
                />
            </Collapsible>
            
            <Collapsible title="Sprint 1">
                <Document
                    title="Sprint 1 Planning"
                    embed="https://docs.google.com/document/d/e/2PACX-1vTnmZQidc35J4rXZJnnmkUwhRH-Dvrcj6AAR4c50oAflRWElGeU6QAWlsgglA8GFECspNXR4_m16m6C/pub?embedded=true"
                    download="https://drive.usercontent.google.com/u/1/uc?id=1glPQyaBvTH2kWHCpsEHyJb4gz_8BcwbJ&export=download"
                />

                <Document
                    title="Sprint 1 Backlog Snapshot"
                    embed="https://drive.google.com/file/d/1DTQPy66ZPsCpuP6J5QTzYqKWl8Z6tYT0/preview"
                    download="https://drive.usercontent.google.com/u/0/uc?id=1DTQPy66ZPsCpuP6J5QTzYqKWl8Z6tYT0&export=download"
                />

                <Document
                    title="Sprint 1 Backlog"
                    embed="https://drive.google.com/file/d/1ma0xc1VnsiWsKJIGNcICt84ph-gP5seW/preview"
                    download="https://drive.usercontent.google.com/u/0/uc?id=1ma0xc1VnsiWsKJIGNcICt84ph-gP5seW&export=download"
                />

                <Presentation
                    title="Sprint 1 Presentation"
                    embed="https://docs.google.com/presentation/d/e/2PACX-1vR_O_D6YvtTk5SqFLtd2HssH2Vonev0dZvjUO9Ri_hi5OtDNQb9uTZtYDBtNxrfmbDdTkHd_0Fm77Dd/pubembed?start=false&loop=false&delayms=3000"
                    download=""
                />
            </Collapsible>
        </div>
    );
}
