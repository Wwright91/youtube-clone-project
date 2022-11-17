import "./About.css";

const About = () => {
  return (
    <div className="about">
      <h1>About</h1>
      <div className="project-intro">
        <h2>Project</h2>
        <p>
          YouTube clone project to practice react skills, crud and collaborating
          on GitHub.
        </p>
        <div className="buttons-container">
          <a
            href="https://github.com/Wwright91/youtube-clone-project"
            target="_blank"
          >
            <button>Source Code</button>
          </a>
          <a href="" target="_blank">
            <button>Live Demo</button>
          </a>
        </div>
      </div>
      <hr />
      <h2>Developers</h2>
      <div className="developers">
        <div className="dev">
          <div className="name-github">
            <h3>Wisdom Wright</h3>
            <div className="github">
              <a href="https://github.com/Wwright91">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  viewBox="0 0 24 24"
                  fill="#e62143"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>

          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima
            asperiores ipsam hic, accusantium enim eligendi dolores, cupiditate
            tenetur molestiae harum quasi soluta, ab atque voluptas aliquam sint
            quaerat adipisci itaque?
          </p>
        </div>
        <div className="dev">
          <div className="name-github">
            <h3>Bo Latt</h3>
            <div className="github">
              <a href="https://github.com/bolattt">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  viewBox="0 0 24 24"
                  fill="#e62143"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>

          <p>I am a 9.2 Pursuit Fellow.</p>
          <p>I think about code when I don't code.</p>
          <p>I overcomplicate and overthink sometimes.</p>
          <p>But I might know how to center a div. 😉 </p>
        </div>
      </div>
    </div>
  );
};

export default About;
