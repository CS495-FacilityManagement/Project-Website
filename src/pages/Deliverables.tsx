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
                    title="Sprint 1 Project Backlog Snapshot"
                    embed="https://drive.google.com/file/d/1DTQPy66ZPsCpuP6J5QTzYqKWl8Z6tYT0/preview"
                    download="https://drive.usercontent.google.com/u/0/uc?id=1DTQPy66ZPsCpuP6J5QTzYqKWl8Z6tYT0&export=download"
                />

                <Document
                    title="Sprint 1 Backlog"
                    embed="https://drive.google.com/file/d/1dTFm0a0sGIR2Z7DInRmpW25J3oKbasQN/preview"
                    download="https://drive.usercontent.google.com/u/0/uc?id=1dTFm0a0sGIR2Z7DInRmpW25J3oKbasQN&export=download"
                />

                <Presentation
                    title="Sprint 1 Presentation"
                    embed="https://docs.google.com/presentation/d/e/2PACX-1vR_O_D6YvtTk5SqFLtd2HssH2Vonev0dZvjUO9Ri_hi5OtDNQb9uTZtYDBtNxrfmbDdTkHd_0Fm77Dd/pubembed?start=false&loop=false&delayms=3000"
                    download="https://drive.usercontent.google.com/u/0/uc?id=1fUO0LkiTpKzDozJtbR2lDhzRJdOA2m2h&export=download"
                />
            </Collapsible>

            <Collapsible title="Sprint 2">
                <Document 
                    title="Sprint 2 Planning"
                    embed="https://docs.google.com/file/d/18O9oNWow31bPtE396PKWvfmRzmC4rrfAajAhONt6w8w/preview"
                    download="https://drive.google.com/uc?export=download&id=18O9oNWow31bPtE396PKWvfmRzmC4rrfAajAhONt6w8w"
                />
                <Document 
                    title="Sprint 2 Project Backlog Snapshot"
                    embed="https://drive.google.com/file/d/1o2ke4LnsuZrPYu3spMwR-cieawHDMS-c/preview"
                    download="https://drive.google.com/uc?export=download&id=1o2ke4LnsuZrPYu3spMwR-cieawHDMS-c"
                />
                <Document 
                    title="Sprint 2 Backlog"
                    embed="https://drive.google.com/file/d/1Af9XonOrAi616qtBfAsIUROATzULQdBu/preview"
                    download="https://drive.google.com/uc?export=download&id=1Af9XonOrAi616qtBfAsIUROATzULQdBu"
                />
                <Document 
                    title="Sprint 2 Presentation"
                    embed="https://docs.google.com/file/d/1GjD589UfxoqtvPqmgETViXKX83I3euLeIMVfxHZWdic/preview"
                    download="https://docs.google.com/presentation/d/1GjD589UfxoqtvPqmgETViXKX83I3euLeIMVfxHZWdic/export/pdf"
                />
            </Collapsible>
            <Collapsible title="Sprint 3">
                <Document
                    title="Sprint 3 Planning"
                    embed="https://docs.google.com/document/d/1ZG2Pkq2SAhkVZWsaHmPJm4eFj4oDQ_Pk3eEPDLI0xjg/preview"
                    download="https://docs.google.com/document/d/1ZG2Pkq2SAhkVZWsaHmPJm4eFj4oDQ_Pk3eEPDLI0xjg/export/pdf"
                />
                <Document
                    title="Sprint 3 Project Backlog Snapshot"
                    embed="https://drive.google.com/file/d/1KnPadLe4x5hy564zbx0VgmJdYs4wYHyS/preview"
                    download="https://drive.google.com/file/d/1KnPadLe4x5hy564zbx0VgmJdYs4wYHyS/export/pdf"
                />
                <Document
                    title="Sprint 3 Backlog"
                    embed="https://drive.google.com/file/d/12mGrKhCqp0qMSbaD2h1G7LVdaKh5f3wC/preview"
                    download="https://drive.google.com/file/d/12mGrKhCqp0qMSbaD2h1G7LVdaKh5f3wC/export/pdf"
                />
                <Document
                    title="Sprint 3 Presentation"
                    embed="https://docs.google.com/presentation/d/1bZ6cVXeejqNthv0k7x1kyWbaEhKLKHF7G4Y4TI89U08/preview"
                    download="https://docs.google.com/presentation/d/1bZ6cVXeejqNthv0k7x1kyWbaEhKLKHF7G4Y4TI89U08/export/pdf"
                />
            </Collapsible>
        </div>
    );
}
