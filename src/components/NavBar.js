function NavBar({ tabs, activeTab, onTabChange }) {
  return (
    <nav aria-label="Navegação principal">
      <ul className="tab-list">
        {tabs.map((tab) => (
          <li key={tab.id}>
            <button
              type="button"
              className={activeTab === tab.id ? 'active' : ''}
              onClick={() => onTabChange(tab.id)}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavBar;
