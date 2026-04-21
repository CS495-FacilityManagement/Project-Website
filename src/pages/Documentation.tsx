import ReactMarkdown from "react-markdown";
import UserGuide from "../components/Documentation/UserGuide.md?raw";
import Testing from "../components/Documentation/Testing.md?raw";
import "../styles/style.css";

function Collapsible({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <details className="deliverable-group" open>
            <summary className="deliverable_group_title">{title}</summary>
            {children}
        </details>
    );
}

export default function Documentation() {
    return (
        <div className="page">
            <Collapsible title="User Guide">
                <div className="markdown-body">
                    <ReactMarkdown>{UserGuide}</ReactMarkdown>
                </div>
            </Collapsible>
            <Collapsible title="Testing">
                <div className="markdown-body">
                    <ReactMarkdown>{Testing}</ReactMarkdown>
                </div>
            </Collapsible>
        </div>
    );
}
