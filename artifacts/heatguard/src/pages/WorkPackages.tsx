import { Activity, ArrowRight, ArrowUpRight, ClipboardCheck, Film, Map, ShieldAlert, Waves, Workflow } from 'lucide-react';
import { Link } from 'wouter';
import './work-packages.css';

const packages = [
  {
    id: 'WP1',
    title: 'Scenario & site layout',
    route: '/scenario',
    icon: Map,
    status: 'Needs review',
    tone: 'review',
    description: 'Conceptual site sequence from approach road and hopper to conveyor sensing and material handling.',
    summary: 'The concept page exists. Layout and scope still need review.',
  },
  {
    id: 'WP2',
    title: 'Signal behaviour',
    route: '/signals',
    icon: Waves,
    status: 'Awaiting technical review',
    tone: 'pending',
    description: 'Synthetic cases, illustrative signal traces and a human-review handoff.',
    summary: 'Signal assets are implemented; technical review remains open.',
  },
  {
    id: 'WP3',
    title: 'Pass review',
    route: '/records',
    icon: Activity,
    status: 'Local prototype',
    tone: 'prototype',
    description: 'Browser-only example records, operator-review choices and sample exports.',
    summary: 'A local browser prototype only; no central record system.',
  },
  {
    id: 'WP4',
    title: 'Video & editing',
    route: '/video',
    icon: Film,
    status: 'Not started',
    tone: 'not-started',
    description: 'Planned narrated, captioned explainer and editable production project.',
    summary: 'No final video or editable 3D / editor project exists.',
  },
  {
    id: 'WP5',
    title: 'Review & handover',
    route: '/review',
    icon: ClipboardCheck,
    status: 'Incomplete',
    tone: 'incomplete',
    description: 'Review evidence, asset register, stakeholder summary and release gates.',
    summary: 'WP2 notes are supporting material, not a final review pack.',
  },
];

const workspaceLinks = [
  { href: '/work-packages', label: 'Work packages', icon: Workflow },
  { href: '/scenario', label: 'WP1 · Scenario', icon: Map },
  { href: '/signals', label: 'WP2 · Signals', icon: Waves },
  { href: '/records', label: 'WP3 · Pass review', icon: Activity },
  { href: '/video', label: 'WP4 · Video', icon: Film },
  { href: '/review', label: 'WP5 · Review pack', icon: ClipboardCheck },
];

function WorkspaceNavigation({ active }: { active: string }) {
  return (
    <aside className="wp-rail">
      <Link href="/work-packages" className="wp-brand" aria-label="HEATGUARD work packages">
        <span className="wp-brand-mark"><Activity size={19} /></span>
        <span><strong>HEATGUARD</strong><small>ORE PASS SIMULATION</small></span>
      </Link>
      <div className="wp-rail-label">PILOT WORKSPACE</div>
      {workspaceLinks.map(({ href, label, icon: Icon }) => (
        <Link href={href} key={href} className="wp-rail-link" aria-current={active === href ? 'page' : undefined} data-testid={`link-workspace-${href.slice(1) || 'pass-review'}`}>
          <Icon size={15} />{label}<ArrowUpRight size={12} />
        </Link>
      ))}
      <div className="wp-rail-note"><ShieldAlert size={15} /><span>Conceptual pilot<br /><b>No operational control path</b></span></div>
      <div className="wp-rail-foot">LOCAL WORKSPACE · v0.1</div>
    </aside>
  );
}

function Footer() {
  return <footer className="wp-footer"><span>HEATGUARD <i>·</i> PILOT WORKSPACE</span><span>ILLUSTRATIVE EXAMPLES · NO SITE MEASUREMENTS</span></footer>;
}

export default function WorkPackages() {
  const active = '/work-packages';

  return (
    <main className="wp-workspace">
      <div className="wp-shell">
        <WorkspaceNavigation active="/work-packages" />
        <section className="wp-main">
          <header className="wp-topbar">
            <div className="wp-breadcrumb">HEATGUARD <span>/</span> <b>Work packages</b></div>
            <div className="wp-top-mark"><i /> CONCEPT ONLY</div>
          </header>
          <nav className="wp-mobile-nav" aria-label="Workspace pages">
            {workspaceLinks.map(({ href, label, icon: Icon }) => (
              <Link href={href} key={href} aria-current={active === href ? 'page' : undefined}>
                <Icon size={13} />{label}
              </Link>
            ))}
          </nav>
          <div className="wp-content wp-enter">
            <div className="wp-heading">
              <div>
                <div className="wp-kicker">PROJECT BOARD <em>/ FIVE WORK PACKAGES</em></div>
                <h1>Work packages</h1>
                <p>A practical map of what the pilot contains, what is available to inspect, and what still needs review.</p>
              </div>
              <span className="wp-heading-stamp">Q4 2026 PILOT · WORKING VIEW</span>
            </div>
            <div className="wp-caveat" role="note">
              <ShieldAlert size={16} />
              <p><b>Demonstration only.</b> The workspace uses synthetic traces and example records. It is not connected to real sensors, mine equipment, site measurements, or automatic controls; no detection performance is proven.</p>
            </div>

            <section className="wp-hub-intro" aria-label="Pilot scope summary">
              <div className="wp-brief-panel">
                <div className="wp-brief-label">THE PILOT IN ONE LINE</div>
                <h2>Explain a possible idea. Keep every boundary visible.</h2>
                <p>HEATGUARD is a concise engineering-pilot workspace for interns and mine stakeholders: a conceptual process, illustrative signals, and a local record workflow, with the remaining video and review handover work shown plainly.</p>
              </div>
              <aside className="wp-snapshot">
                <div>
                  <div className="wp-snapshot-label">PACKAGE MAP</div>
                  <strong>01—05</strong><small>five linked work streams</small>
                </div>
                <div className="wp-snapshot-rule" />
                <div className="wp-snapshot-foot"><ShieldAlert size={12} /> No package is accepted or complete</div>
              </aside>
            </section>

            <div className="wp-section-top">
              <div><div className="wp-kicker">CURRENT HANDOFF VIEW</div><h2>Open a package to inspect its boundary</h2></div>
              <p>Statuses describe current availability—not approval.</p>
            </div>
            <section className="wp-package-list" aria-label="Five work packages">
              {packages.map(({ id, title, route, icon: Icon, status, tone, description, summary }) => (
                <Link href={route} className="wp-package-card" key={id} data-testid={`card-package-${id.toLowerCase()}`}>
                  <span className="wp-number"><Icon size={17} /><b>{id}</b><small>PACKAGE</small></span>
                  <span className="wp-card-copy"><h3>{title}</h3><p>{description}</p></span>
                  <span className="wp-card-summary">{summary}</span>
                  <span className={`wp-status ${tone}`} data-testid={`status-${id.toLowerCase()}`}>{status}</span>
                  <ArrowRight className="wp-card-arrow" size={16} />
                </Link>
              ))}
            </section>

            <div className="wp-next-strip">
              <span><b>Current evidence, not sign-off.</b> WP2 simulation notes support discussion; technical and HSE review gates remain open.</span>
              <Link href="/review" className="wp-inline-link">Review pack status <ArrowRight size={13} /></Link>
            </div>
            <Footer />
          </div>
        </section>
      </div>
    </main>
  );
}
