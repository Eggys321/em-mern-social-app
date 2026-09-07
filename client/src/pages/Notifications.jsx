import Navbar from "../layouts/Navbar";
import NavSection from "../components/NavSection";
import Bio from "../components/Bio";
import Seo from "../components/Seo";

const Notifications = () => (
  <>
    <Seo
      title="Notifications"
      description="See likes, comments and follows from your community."
      noIndex
    />
    <Navbar />
    <div className="home-wrapper">
      <div className="container">
        <main className="row home-main gap-2 pt-3">
          <section className="col-md-4 d-none d-md-block p-2 rounded-2 border profile-section">
            <Bio />
          </section>

          <section className="col-md">
            <div className="card-surface border rounded-2 p-5 text-center">
              <h1 className="h4 fw-bold mb-2">You&apos;re all caught up</h1>
              <p className="text-muted-em mb-0">
                Likes, comments and new followers will show up here.
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
    <NavSection />
  </>
);

export default Notifications;
