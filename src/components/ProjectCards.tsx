const projectCards = [
  {
    title: "Project Scope",
    items: [
      "UI prototype for a Facilities Management platform",
      "Simulated insights with mock data",
      "Role-Aware UI for various facility employees",
      "Industry-style engagement with sponsor as Product Owner",
    ],
  },
  {
    title: "User Experience Flow",
    items: [
      "Dashboard summarizing facility-wide risk & recommended actions",
      "Detailed Asset List Views",
      "Building, Asset, and User Management",
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
    title: "FrontEnd TechStack",
    items: [
      "Next.JS (React & Typescript)", "Tailwind CSS",
      "Gridstack Widget Library",
      "AWS Amplify",
    ],
  },
  {
    title: "BackEnd TechStack",
    items: [
      "Python (FastAPI)",
      "PostgreSQL (Amazon RDS)",
      "AWS Lambda",
      "API Gateway (HTTP API)",
      "Mangum (ASGI adapter for Lambda)",
      "Amazon Cognito (JWT authentication)",
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
