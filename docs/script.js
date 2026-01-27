
function showPage(pageId) 
{   document.querySelectorAll('.page').forEach(page => {page.classList.remove('active');});
    document.getElementById(pageId).classList.add('active');
}

const projectCards = [
    {
        title: "Project Scope",
        items: [
            "UI prototype for an AI Facilities Management platform",
            "Simulated AI insights with mock & synthetic data",
            "Role-Aware UI for various facility employees",
            "Industry-style engagement with sponsor as Product Owner"
        ]
    },
    {
        title: "User Experience Flow",
        items: [
            "Dashboard summarizing facility-wide risk & recommended actions",
            "Prioritized high-risk assets with recommended actions",
            "Asset lists and detail views"
        ]
    },
    {
        title: "Assets in Scope",
        items: [
            "HVAC Units",
            "Boilers & Chillers",
            "Electrical Panels & Generators",
            "Elevators",
            "Fire Suppression & Security",
            "Roof & Plumbing Systems"
        ],
       
    },
    {
        title: "Risk & Intelligence",
        items: [
            "Risk = Criticality × Health × Time-to-Failure",
            "Predictive maintenance simulated client-side",
            "Consistent, believable, and actionable logic"
        ]
    },
    {
        title: "Technical Implementation",
        items: [
            "React, TypeScript, and Next.js frontend",
            "Modern UI/UX and data visualization",
            "Internet-hosted prototype",
            "Secure-by-design architecture"
        ]
    }
];

function renderProjectCards() {
    const grid = document.getElementById("project-grid");

    projectCards.forEach(card => {
        const cardDiv = document.createElement("div");
        cardDiv.className = "project-card";

        const h3 = document.createElement("h3");
        h3.textContent = card.title;
        cardDiv.appendChild(h3);

        const ul = document.createElement("ul");
        if (card.isAssetList) {
            ul.className = "asset-list"; 
        }

        card.items.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            ul.appendChild(li);
        });

        cardDiv.appendChild(ul);
        grid.appendChild(cardDiv);
    });
}

document.addEventListener("DOMContentLoaded", renderProjectCards);
