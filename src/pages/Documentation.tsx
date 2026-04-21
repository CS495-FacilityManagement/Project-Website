import ReactMarkdown from "react-markdown";
import UserGuide from "../components/Documentation/UserGuide.md?raw";
import Testing from "../components/Documentation/Testing.md?raw";
import Database_Guide from "../components/Documentation/Database_Guide.md?raw";
import Development_Guide from "../components/Documentation/Development_Guide.md?raw";
import Lambda_Guide from "../components/Documentation/Lambda_Guide.md?raw";
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
             <Collapsible title="Database">
                <div className="markdown-body">
                    <ReactMarkdown>{Database_Guide}</ReactMarkdown>
                </div>
            </Collapsible>
             <Collapsible title="Development_Guide">
                <div className="markdown-body">
                    <ReactMarkdown>{Development_Guide}</ReactMarkdown>
                </div>
            </Collapsible>
            <Collapsible title="Lamda_Guide">
                <div className="markdown-body">
                    <ReactMarkdown>{Lambda_Guide}</ReactMarkdown>
                </div>
            </Collapsible>
        </div>
    );
}
