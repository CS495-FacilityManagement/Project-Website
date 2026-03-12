const projectCards = [
  {
    title: "Project Scope",
    items: [
      "UI prototype for a Facilities Management platform",
      "Simulated insights with mock & synthetic data",
      "Role-Aware UI for various facility employees",
      "Industry-style engagement with sponsor as Product Owner",
    ],
  },
  {
    title: "User Experience Flow",
    items: [
      "Dashboard summarizing facility-wide risk & recommended actions",
      "Detailed Asset List Views",
      "Building and Asset Management",
      "Maintenance and Facility Health Reports"
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
      "Next.JS, Typescript and Tailwind CSS",
      "Modern UI for proper data visualization",
      "Internet-hosted prototype through AWS",
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
