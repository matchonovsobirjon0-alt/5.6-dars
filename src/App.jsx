import { useMemo, useState } from "react";
import "./App.css";
import achievementImage from "./achievement.png";

const repositories = [
  {
    name: "5.5-dars",
    language: "TypeScript",
    color: "#3178c6",
    updated: "2 days ago",
  },
  {
    name: "5.4-dars",
    language: "JavaScript",
    color: "#f1e05a",
    updated: "5 days ago",
  },
  {
    name: "5.3-dars",
    language: "JavaScript",
    color: "#f1e05a",
    updated: "last week",
  },
  {
    name: "5.2-dars",
    language: "JavaScript",
    color: "#f1e05a",
    updated: "last week",
  },
  {
    name: "5.1-dars",
    language: "JavaScript",
    color: "#f1e05a",
    updated: "2 weeks ago",
  },
  {
    name: "4.9-dars",
    language: "HTML",
    color: "#e34c26",
    updated: "3 weeks ago",
  },
  {
    name: "4.8-dars",
    language: "CSS",
    color: "#663399",
    updated: "last month",
  },
];

function Icon({ name, size = 16, filled = false }) {
  const paths = {
    menu: (
      <>
        <path d="M4 6h16M4 12h16M4 18h16" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    overview: (
      <>
        <path d="M3 5.5h8v13H3zM14 5.5h7v13h-7z" />
        <path d="M5.5 8h3M5.5 11h3M16 8h3" />
      </>
    ),
    repos: (
      <>
        <path d="M5 3.5h11l3 3v14H5z" />
        <path d="M15 3.5v4h4M8 11h8M8 15h8" />
      </>
    ),
    projects: (
      <>
        <path d="M3 5h8v6H3zM13 5h8v6h-8zM3 13h8v6H3zM13 13h8v6h-8z" />
      </>
    ),
    package: (
      <>
        <path d="m12 2.8 8.5 4.7v9L12 21.2l-8.5-4.7v-9z" />
        <path d="m3.8 7.5 8.2 4.7 8.2-4.7M12 12.2v9" />
      </>
    ),
    star: (
      <path d="m12 3 2.8 5.8 6.4.9-4.6 4.5 1.1 6.4-5.7-3-5.7 3 1.1-6.4-4.6-4.5 6.4-.9z" />
    ),
    people: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="10" cy="7" r="4" />
        <path d="M20 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />
      </>
    ),
    plus: (
      <>
        <path d="M12 5v14M5 12h14" />
      </>
    ),
    down: <path d="m7 10 5 5 5-5" />,
    fork: (
      <>
        <circle cx="6" cy="5" r="2" />
        <circle cx="18" cy="19" r="2" />
        <circle cx="6" cy="19" r="2" />
        <path d="M6 7v10M18 17v-2a4 4 0 0 0-4-4H10a4 4 0 0 1-4-4" />
      </>
    ),
    monitor: (
      <>
        <rect x="3" y="4" width="18" height="13" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </>
    ),
    inbox: (
      <>
        <path d="M4 4h16l2 11v5H2v-5z" />
        <path d="M2 14h6l2 3h4l2-3h6" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

function Avatar({ small = false }) {
  return (
    <div
      className={`avatar${small ? " avatar-small" : ""}`}
      aria-label="Profile avatar"
    >
      <span className="avatar-bar avatar-bar-top" />
      <span className="avatar-bar avatar-bar-left" />
      <span className="avatar-bar avatar-bar-right" />
      <span className="avatar-bar avatar-bar-bottom-left" />
      <span className="avatar-bar avatar-bar-bottom-right" />
    </div>
  );
}

function App() {
  const [query, setQuery] = useState("");
  const [starred, setStarred] = useState({});
  const [activeSection, setActiveSection] = useState("repositories");
  const [activeMenu, setActiveMenu] = useState("");
  const [sortNewest, setSortNewest] = useState(true);
  const starredCount = Object.values(starred).filter(Boolean).length;

  const visibleRepositories = useMemo(() => {
    const filtered = repositories.filter((repository) =>
      repository.name.toLowerCase().includes(query.toLowerCase()) &&
      (activeSection !== "stars" || starred[repository.name]),
    );
    return sortNewest ? filtered : [...filtered].reverse();
  }, [activeSection, query, sortNewest, starred]);

  function toggleMenu(menu) {
    setActiveMenu(activeMenu === menu ? "" : menu);
  }

  return (
    <div className="github-page">
      <header className="site-header">
        <div className="header-main">
          <button
            className="icon-button menu-button"
            aria-label="Open navigation menu"
          >
            <Icon name="menu" size={19} />
          </button>
          <a className="github-mark" href="#" aria-label="GitHub home">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12 .9a11.2 11.2 0 0 0-3.54 21.83c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.28-1.24-1.62-1.24-1.62-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 .1.75 2.08 3.65 1.5.1-.73.4-1.24.71-1.53-2.47-.28-5.07-1.24-5.07-5.5 0-1.22.44-2.22 1.16-3-.12-.29-.5-1.43.11-2.98 0 0 .95-.3 3.08 1.15a10.7 10.7 0 0 1 5.6 0c2.13-1.45 3.08-1.15 3.08-1.15.61 1.55.23 2.7.11 2.98.72.78 1.16 1.78 1.16 3 0 4.27-2.61 5.21-5.1 5.49.4.35.76 1.02.76 2.06v3.05c0 .3.2.65.77.54A11.2 11.2 0 0 0 12 .9Z"
              />
            </svg>
          </a>
          <a className="owner-name" href="#">
            matchonovsobirjon0-alt
          </a>

          <div className="header-actions">
            <label className="global-search">
              <Icon name="search" size={16} />
              <input
                aria-label="Search GitHub"
                placeholder="Type / to search"
              />
              <kbd>/</kbd>
            </label>
            <button
              className="icon-button team-button"
              aria-label="Organizations"
            >
              <Icon name="people" size={17} />
              <Icon name="down" size={12} />
            </button>
            <span className="header-divider" />
            <button className="icon-button add-button" aria-label="Create new">
              <Icon name="plus" size={17} />
              <Icon name="down" size={12} />
            </button>
            <button className="icon-button" aria-label="Issues">
              <span className="issue-icon">◉</span>
            </button>
            <button className="icon-button" aria-label="Pull requests">
              <Icon name="fork" size={17} />
            </button>
            <button className="icon-button" aria-label="Projects">
              <Icon name="monitor" size={17} />
            </button>
            <button className="icon-button" aria-label="Inbox">
              <Icon name="inbox" size={17} />
            </button>
            <button className="profile-button" aria-label="Account menu">
              <Avatar small />
            </button>
          </div>
        </div>
        <nav className="profile-tabs" aria-label="Profile navigation">
          <a href="#">
            <Icon name="overview" />
            Overview
          </a>
          <a
            href="#repositories"
            className={activeSection === "repositories" ? "selected" : ""}
            onClick={() => setActiveSection("repositories")}
          >
            <Icon name="repos" />
            Repositories<span className="repo-count">18</span>
          </a>
          <a href="#">
            <Icon name="projects" />
            Projects
          </a>
          <a href="#">
            <Icon name="package" />
            Packages
          </a>
          <a
            href="#stars"
            className={activeSection === "stars" ? "selected" : ""}
            onClick={() => setActiveSection("stars")}
          >
            <Icon name="star" />
            Stars<span className="repo-count">{starredCount}</span>
          </a>
        </nav>
      </header>

      <main className="page-content">
        <aside className="profile-sidebar">
          <div className="profile-avatar-wrap">
            <Avatar />
            <button className="mood-button" aria-label="Set a status">
              ☺
            </button>
          </div>
          <div className="profile-name">matchonovsobirjon0-alt</div>
          <button className="edit-profile">Edit profile</button>
          <div className="followers">
            <Icon name="people" size={15} />
            <a href="#">0 followers</a>
            <span>·</span>
            <a href="#">2 following</a>
          </div>
          <section className="achievements">
            <h2>Achievements</h2>

            <div className="achievement-badge" aria-label="Achievement">
              <img src={achievementImage} alt="Achievement" />
            </div>
          </section>
        </aside>

        <section
          className="repositories"
          id={activeSection}
          aria-label={activeSection === "stars" ? "Stars" : "Repositories"}
        >
          <div className="repo-toolbar">
            <label className="repo-search">
              <input
                type="search"
                placeholder="Find a repository..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>
            <div className="filters">
              {["Type", "Language"].map((filter) => (
                <div className="filter-wrap" key={filter}>
                  <button
                    className="filter-button"
                    onClick={() => toggleMenu(filter)}
                  >
                    {filter}
                    <Icon name="down" size={13} />
                  </button>
                  {activeMenu === filter && (
                    <div className="filter-menu">
                      {filter === "Type" ? "All" : "All languages"}
                    </div>
                  )}
                </div>
              ))}
              <button
                className="filter-button sort-button"
                onClick={() => setSortNewest(!sortNewest)}
              >
                Sort
                <Icon name="down" size={13} />
              </button>
              <button className="new-button">
                <span>▣</span> New
              </button>
            </div>
          </div>

          {visibleRepositories.length ? (
            visibleRepositories.map((repository) => (
              <article className="repository-row" key={repository.name}>
                <div className="repository-details">
                  <div className="repo-title-line">
                    <a className="repo-name" href="#">
                      {repository.name}
                    </a>
                    <span className="visibility">Public</span>
                  </div>
                  <div className="repo-meta">
                    <span
                      className="language-dot"
                      style={{ backgroundColor: repository.color }}
                    />
                    <span>{repository.language}</span>
                    <span className="updated">
                      Updated {repository.updated}
                    </span>
                  </div>
                </div>
                <div className="repo-actions">
                  <div className="star-control">
                    <button
                      className={`star-button${starred[repository.name] ? " is-starred" : ""}`}
                      onClick={() => {
                        setStarred({
                          ...starred,
                          [repository.name]: !starred[repository.name],
                        });
                      }}
                      aria-label={`${starred[repository.name] ? "Unstar" : "Star"} ${repository.name}`}
                    >
                      <Icon
                        name="star"
                        size={15}
                        filled={Boolean(starred[repository.name])}
                      />
                      {starred[repository.name] ? "Starred" : "Star"}
                    </button>
                    <button
                      className="star-dropdown"
                      aria-label={`More options for ${repository.name}`}
                    >
                      <Icon name="down" size={12} />
                    </button>
                  </div>
                  <div className="activity-line" />
                </div>
              </article>
            ))
          ) : (
            <p className="empty-state">
              {activeSection === "stars"
                ? "You haven’t starred any repositories yet."
                : "No repositories match your search."}
            </p>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
