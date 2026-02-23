import jadenImg from "../assets/JadenS.jpg";
import kaitlynImg from "../assets/kaitlyn.jpg";
import maddoxImg from "../assets/maddox.jpg";
import ryanImg from "../assets/ryan.png";

export default function Bios() {
  return (
    <div className="page">
      <h1>About Us</h1>

      {/* Kaitlyn */}
      <div className="bio-card">
        <h2 className="student-name">Kaitlyn Hanson</h2>
        <h3 className="student-info">
          krhanson3@crimson.ua.edu | 318-220-6194 |{" "}
          <a href="https://linkedin.com/in/kaitlyn-rae-hanson" target="_blank">
            LinkedIn
          </a>{" "}
          | <a href="https://github.com/krhanson3">GitHub</a>
        </h3>

        <div className="bio-content">
          <img className="bio-img" src={kaitlynImg} alt="Kaitlyn Hanson" />
          <p className="bio-text">
            Driven computer science student with a solid foundation in C++, Python, Java, and SQL,
            passionate about backend software engineering and eager to develop efficient, scalable
            systems while contributing to innovative, high-performance solutions.
          </p>
        </div>
      </div>

      {/* Jaden */}
      <div className="bio-card">
        <h2 className="student-name">Jaden Sheppard</h2>
        <h3 className="student-info">
          jdsheppard3@crimson.ua.edu | 205-270-9822 |{" "}
          <a href="https://linkedin.com/in/jadensheppard" target="_blank">
            LinkedIn
          </a>{" "}
          |{" "}
          <a href="https://github.com/Jshepp23" target="_blank">
            GitHub
          </a>
        </h3>

        <div className="bio-content">
          <img className="bio-img" src={jadenImg} alt="Jaden Sheppard" />
          <p className="bio-text">
            Computer science student with interests in software engineering and data analytics,
            focused on building reliable user-centered applications and developing practical
            solutions through clean architecture and thoughtful system design.
          </p>
        </div>
      </div>

      {/* Ryan */}
      <div className="bio-card">
        <h2 className="student-name">Ryan Kutella</h2>
        <h3 className="student-info">
          rfkutella@crimson.ua.edu | 847-708-2227 |{" "}
          <a href="https://www.linkedin.com/in/ryankutella/" target="_blank">
            LinkedIn
          </a>{" "}
          | <a href="https://github.com/ryankutella25">GitHub</a>
        </h3>

        <div className="bio-content">
          <img className="bio-img" src={ryanImg} alt="Ryan Kutella" />
          <p className="bio-text">
            Computer Science student at The University of Alabama with over 7 years of programming
            experience. Passionate about software development and enjoy turning creative ideas into
            real-world solutions.
          </p>
        </div>
      </div>

      {/* Maddox */}
      <div className="bio-card">
        <h2 className="student-name">Maddox Guthrie</h2>
        <h3 className="student-info">
          mbguthrie1@crimson.ua.edu | 615-979-9334 |{" "}
          <a href="https://www.linkedin.com/in/maddox-guthrie/" target="_blank">
            LinkedIn
          </a>{" "}
          | <a href="https://github.com/mbg615">GitHub</a>
        </h3>

        <div className="bio-content">
          <img className="bio-img" src={maddoxImg} alt="Maddox Guthrie" />
          <p className="bio-text">
            Computer Science student with several years of programming experience. Passionate about
            software development, with a strong interest in backend systems and high-level technical
            challenges such as optimization and compiler theory.
          </p>
        </div>
      </div>
    </div>
  );
}
