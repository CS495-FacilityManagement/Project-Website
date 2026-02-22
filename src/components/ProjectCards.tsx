const projectCards = [
  {
    title: "Project Scope",
    items: [
      "UI prototype for an AI Facilities Management platform",
      "Simulated AI insights with mock & synthetic data",
      "Role-Aware UI for various facility employees",
      "Industry-style engagement with sponsor as Product Owner",
    ],
  },
  {
    title: "User Experience Flow",
    items: [
      "Dashboard summarizing facility-wide risk & recommended actions",
      "Prioritized high-risk assets with recommended actions",
      "Asset lists and detail views",
    ],
  },
  {
    title: "Assets in Scope",
    items: [
      "HVAC Units",
      "Boilers & Chillers",
      "Electrical Panels & Generators",
      "Elevators",
      "Fire Suppression & Security",
      "Roof & Plumbing Systems",
    ],
  },
  {
    title: "Risk & Intelligence",
    items: [
      "Risk = Criticality × Health × Time-to-Failure",
      "Predictive maintenance simulated client-side",
      "Consistent, believable, and actionable logic",
    ],
  },
  {
    title: "Technical Implementation",
    items: [
      "React, TypeScript, and Next.js frontend",
      "Modern UI/UX and data visualization",
      "Internet-hosted prototype",
      "Secure-by-design architecture",
    ],
  },
];

export default function ProjectCards() {
  return (
    <div id="project-grid" className="project-grid">
      {projectCards.map((card) => (
        <div className="project-card" key={card.title}>
          <h3>{card.title}</h3>
          <ul>
            {card.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
