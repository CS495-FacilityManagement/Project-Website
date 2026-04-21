
function Document({embed, download}: {embed: string, download: string}) {
    return (
        <section>
            <div className="pdf-container">
                <iframe src={embed} />
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


export default function Documenation() {
    
    return (
        <div className="page">
            <Collapsible title="User Guide">
                <Document
                    embed="https://drive.google.com/file/d/1j7kbaWaRhevb4fubiTtJTyL9hNvENBsd/preview"
                    download="https://drive.google.com/file/d/1j7kbaWaRhevb4fubiTtJTyL9hNvENBsd/export/pdf"
                />

            </Collapsible>
        </div>
    )
}