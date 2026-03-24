import ProjectCards from "../components/ProjectCards";

export default function Home() {
  return (
    <div className="page">
      <h1 id="project_name">
        Design and Development of an Facilities Management User Interface
      </h1>

      <h2 id="sponsor">Mighty Muscle Facilities Management</h2>

      <div id="project-overview" className="project-description">
        <div className="project-hero">
          <h2>Project Overview</h2>
          <p>
            This capstone project focuses on the design and development of a
            web-based user-interface for a facility management
            platform. The prototype will be an internal tool that enables
            facility managers to proactively identify asset risk, reduce
            downtime, and centralize facility data through a single intuitive
            interface. Users will have automated weekly reports available to
            them to review facility health & maintenance history.
          </p>
        </div>

        <ProjectCards />
      </div>
    </div>
  );
}
