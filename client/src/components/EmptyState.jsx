const EmptyState = ({ icon = "👋", title, children }) => (
  <div className="empty-state card-surface border rounded-3">
    <span className="empty-state__icon" aria-hidden="true">
      {icon}
    </span>
    <p className="empty-state__title">{title}</p>
    {children && <p className="empty-state__body">{children}</p>}
  </div>
);

export default EmptyState;
