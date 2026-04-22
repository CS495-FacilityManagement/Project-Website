import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/deliverables">Project Deliverables</Link>
      <Link to="/documentation">Project Documentation</Link>
      <Link to="/bios">Group Bios</Link>
    </nav>
  );
}
