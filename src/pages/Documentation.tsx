import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import UserGuide from "../components/Documentation/UserGuide.md?raw"
import Testing from "../components/Documentation/Testing.md?raw";
import Database_Guide from "../components/Documentation/Database_Guide.md?raw";
import Development_Guide from "../components/Documentation/Development_Guide.md?raw";
import Lambda_Guide from "../components/Documentation/Lambda_Guide.md?raw";

import UserGuideURL from "../components/Documentation/UserGuide.md?url"
import TestingURL from "../components/Documentation/Testing.md?url";
import Database_GuideURL from "../components/Documentation/Database_Guide.md?url";
import Development_GuideURL from "../components/Documentation/Development_Guide.md?url";
import Lambda_GuideURL from "../components/Documentation/Lambda_Guide.md?url";
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
                    <a href={UserGuideURL} download="UserGuide.md"> Download</a>
                    <ReactMarkdown>{UserGuide}</ReactMarkdown>
                </div>
            </Collapsible>
            <Collapsible title="Testing">
                <div className="markdown-body">
                    <a href={TestingURL} download="Testing.md"> Download</a>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{Testing}</ReactMarkdown>
                </div>
            </Collapsible>
             <Collapsible title="Database">
                <div className="markdown-body">
                    <a href={Database_GuideURL} download="Database_Guide.md"> Download</a>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{Database_Guide}</ReactMarkdown>
                </div>
            </Collapsible>
             <Collapsible title="Development Guide">
                <div className="markdown-body">
                    <a href={Development_GuideURL} download="Development_Guide.md"> Download</a>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{Development_Guide}</ReactMarkdown>
                </div>
            </Collapsible>
            <Collapsible title="Lambda API Guide">
                <div className="markdown-body">
                    <a href={Lambda_GuideURL} download="Lambda_Guide.md"> Download</a>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{Lambda_Guide}</ReactMarkdown>
                </div>
            </Collapsible>
            <Collapsible title="Demo Video">
                <div className="markdown-body">
                    <div className="documentation-video">
                        <iframe
                            src="https://www.youtube.com/embed/efFMyLwLpzQ"
                            title="Facility Management Demo Video"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        />
                    </div>
                </div>
            </Collapsible>
        </div>
    );
}
