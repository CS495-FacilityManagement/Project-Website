function Presentation({title, embed, download}) {
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

export default function Deliverables() {
    return (
        <div className="page">
            <Presentation
                title="Preliminary Presentation"
                embed="https://docs.google.com/presentation/d/e/2PACX-1vQ7iPyGsCWZtszLqBkkMMru4Z_b7P4M8dV5eD_pMe03QGsSW9viGgUd-X0IyPfI5_NA7rkIsao1E-Ru/pubembed?start=false&loop=false&delayms=3000"
                download="https://drive.google.com/uc?export=download&id=1DQ0uR8j9YY9Xgn2_FMX8tIKahq4LXAfV"
            />

            <Presentation
                title="Sprint 1 Presentation"
                embed="https://docs.google.com/presentation/d/e/2PACX-1vR_O_D6YvtTk5SqFLtd2HssH2Vonev0dZvjUO9Ri_hi5OtDNQb9uTZtYDBtNxrfmbDdTkHd_0Fm77Dd/pubembed?start=false&loop=false&delayms=3000"
                download=""
            />
        </div>
    );
}
