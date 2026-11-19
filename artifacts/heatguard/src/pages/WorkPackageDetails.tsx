import type { ReactNode } from 'react';
import { ArrowLeft, ArrowRight, AlertTriangle, BookOpen, Clapperboard, FileText, Film, Languages, MonitorPlay, ShieldAlert, ShieldCheck } from 'lucide-react';
import { Link } from 'wouter';
import './work-packages.css';

const VIDEO_DISCLAIMER = 'CONCEPTUAL SIMULATION — For technical presentation only. Equipment configuration, detection performance and operating response are subject to detailed engineering, controlled tests and site approval.';

const detailLinks = [
  { href: '/work-packages', label: 'Work packages', icon: BookOpen },
  { href: '/scenario', label: 'WP1 · Scenario', icon: ArrowRight },
  { href: '/signals', label: 'WP2 · Signals', icon: ArrowRight },
  { href: '/records', label: 'WP3 · Pass review', icon: ArrowRight },
  { href: '/video', label: 'WP4 · Video', icon: Film },
  { href: '/review', label: 'WP5 · Review pack', icon: FileText },
];

function DetailNavigation({ title, active }: { title: string; active: string }) {
  return (
    <aside className="wp-rail">
      <Link href="/work-packages" className="wp-brand" aria-label="HEATGUARD work packages">
        <span className="wp-brand-mark"><Clapperboard size={18} /></span>
        <span><strong>HEATGUARD</strong><small>ORE PASS SIMULATION</small></span>
      </Link>
      <div className="wp-rail-label">PILOT WORKSPACE</div>
      {detailLinks.map(({ href, label, icon: Icon }) => (
        <Link href={href} key={href} className="wp-rail-link" aria-current={active === href ? 'page' : undefined} data-testid={`link-workspace-${href.slice(1) || 'pass-review'}`}>
          <Icon size={15} />{label}<ArrowRight size={12} />
        </Link>
      ))}
      <div className="wp-rail-note"><ShieldAlert size={15} /><span>Conceptual pilot<br /><b>No operational control path</b></span></div>
      <div className="wp-rail-foot">LOCAL WORKSPACE · v0.1</div>
    </aside>
  );
}

function Footer() {
  return <footer className="wp-footer"><span>HEATGUARD <i>·</i> HANDOVER WORKSPACE</span><span>NO PROVEN DETECTION · NO AUTOMATIC CONTROL</span></footer>;
}

function DetailFrame({ title, active, children }: { title: string; active: string; children: ReactNode }) {
  return (
    <main className="wp-workspace">
      <div className="wp-shell">
        <DetailNavigation title={title} active={active} />
        <section className="wp-main">
          <header className="wp-topbar">
            <div className="wp-breadcrumb">HEATGUARD <span>/</span> <b>{title}</b></div>
            <div className="wp-top-mark"><i /> CONCEPT ONLY</div>
          </header>
          <nav className="wp-mobile-nav" aria-label="Workspace pages">
            {detailLinks.map(({ href, label, icon: Icon }) => (
              <Link href={href} key={href} aria-current={active === href ? 'page' : undefined}><Icon size={13} />{label}</Link>
            ))}
          </nav>
          <div className="wp-content wp-enter">{children}<Footer /></div>
        </section>
      </div>
    </main>
  );
}

export function VideoPackage() {
  const scenes = [
    { time: '00:00–00:20', title: 'Problem & stakes', detail: 'Open on a haul truck approaching the crusher area, identify concealed G.E.T. / tramp metal as a potential hazard, and show the required disclaimer.' },
    { time: '00:20–00:50', title: 'Pilot concept', detail: 'Show modular sensing equipment, the proposed assessment area and vehicle approach, and where an operator might view results.' },
    { time: '00:50–01:30', title: 'How sensing works', detail: 'Animate conceptual EMI and magnetic / gradiometric channels with simple plots flowing to data acquisition and analysis.' },
    { time: '01:30–02:15', title: 'Three test conditions', detail: 'Show clean-load, concealed G.E.T., and interference examples; label sample traces and alert states as illustrative.' },
    { time: '02:15–02:50', title: 'Response workflow', detail: 'Show a warning, operator review, a possible hold / inspection step, and outcome documentation under site-approved procedures.' },
    { time: '02:50–03:30', title: 'Record management', detail: 'Move from an event to a mock record with timestamp, vehicle, event ID, status, action, searchable history, and a summary report.' },
    { time: '03:30–04:00', title: 'Validation & close', detail: 'Show evaluation questions about range, repeatability, false alarms, EMI / ore / truck effects, next-phase decision, and the required end-card disclaimer.' },
  ];

  return (
    <DetailFrame title="WP4 · Video & editing" active="/video">
      <Link href="/work-packages" className="wp-back-link"><ArrowLeft size={13} /> ALL WORK PACKAGES</Link>
      <div className="wp-detail-head">
        <div className="wp-detail-title">
          <div className="wp-kicker">WP4 <em>/ VIDEO + EDITING</em></div>
          <h1>Video &amp; editing</h1>
          <p>Production requirements for the final explainer, with the current deliverable state made explicit.</p>
        </div>
        <div className="wp-detail-tag"><span className="wp-status not-started">Not started</span><small>NO FINAL EXPORT PRESENT</small></div>
      </div>
      <div className="wp-caveat" role="note">
        <AlertTriangle size={16} />
        <p><b>No storyboard/script file, final video, or editable 3D / editor project currently exists.</b> This page contains a reference outline only; it is not a video deliverable or evidence that production has begun.</p>
      </div>

      <section className="wp-detail-hero">
        <div className="wp-state-panel">
          <div className="wp-kicker">DELIVERABLE BOUNDARY</div>
          <h2>Planned format. No finished media to review.</h2>
          <p>The required handover is a narrated and captioned 3–5 minute explainer, exported as 1920×1080, 16:9 MP4, alongside its editable project. Neither final item is currently available.</p>
        </div>
        <aside className="wp-state-side">
          <div><span>REQUIRED OUTPUT</span><b>1920 × 1080<br />16:9 · MP4 · 3–5 min</b></div>
          <small>Narration and readable captions are required. Approved source media only.</small>
        </aside>
      </section>

      <div className="wp-detail-grid">
        <section className="wp-detail-panel" aria-labelledby="wp4-scenes">
          <div className="wp-panel-heading"><div><div className="wp-kicker">SEVEN TIMED STORYBOARD SCENES</div><h2 id="wp4-scenes">Required running order · 4:00</h2></div><Clapperboard size={17} color="#8b7a55" /></div>
          <div className="wp-scene-list">
            {scenes.map((scene, index) => <div className="wp-scene" key={scene.title}><time>{scene.time}</time><div><b>{String(index + 1).padStart(2, '0')} · {scene.title}</b><small>{scene.detail}</small></div></div>)}
          </div>
        </section>

        <div>
          <section className="wp-detail-panel" aria-labelledby="wp4-build">
            <div className="wp-kicker">PRODUCTION REQUIREMENTS</div><h2 id="wp4-build">What needs to be made</h2>
            <ul className="wp-list">
              <li><i><Film size={12} /></i><span><b>Final export</b><small>Narrated, captioned MP4 at 1920×1080, 16:9, 3–5 minutes.</small></span></li>
              <li><i><MonitorPlay size={12} /></i><span><b>Editable source project</b><small>Editable 3D / editor project must be included; none currently exists.</small></span></li>
              <li><i><Languages size={12} /></i><span><b>Audio and captions</b><small>Clear narration and timed, readable captions throughout.</small></span></li>
              <li><i><ShieldCheck size={12} /></i><span><b>Approved source media</b><small>Use only media approved for the presentation; record source and license details for WP5.</small></span></li>
            </ul>
          </section>
          <section className="wp-detail-panel" style={{ marginTop: 12 }} aria-labelledby="wp4-references">
            <div className="wp-kicker">EXISTING REFERENCES</div><h2 id="wp4-references">Use what exists—carefully</h2>
            <p>These pages are references for a future edit, not footage or finished video scenes.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Link href="/scenario" className="wp-inline-link">WP1 · Conceptual site layout <ArrowRight size={13} /></Link>
              <Link href="/signals" className="wp-inline-link">WP2 · Synthetic signal examples <ArrowRight size={13} /></Link>
            </div>
          </section>
        </div>
      </div>

      <section className="wp-detail-panel" style={{ marginTop: 13 }} aria-labelledby="wp4-disclaimer">
        <div className="wp-kicker">VERBATIM OPENING + END CARD</div>
        <h2 id="wp4-disclaimer">Required disclaimer</h2>
        <blockquote className="wp-disclaimer-quote">“{VIDEO_DISCLAIMER}”</blockquote>
      </section>
      <div className="wp-callout"><ShieldAlert size={14} /><span>Keep all drawings and signal examples labeled conceptual / synthetic. No real sensor specifications, site measurements, proven detection claims, or automatic control behavior may be implied.</span></div>
    </DetailFrame>
  );
}

export function ReviewPackage() {
  return (
    <DetailFrame title="WP5 · Review & handover" active="/review">
      <Link href="/work-packages" className="wp-back-link"><ArrowLeft size={13} /> ALL WORK PACKAGES</Link>
      <div className="wp-detail-head">
        <div className="wp-detail-title">
          <div className="wp-kicker">WP5 <em>/ REVIEW + HANDOVER</em></div>
          <h1>Review &amp; handover</h1>
          <p>A clear inventory of the review pack still required before the pilot handover can be considered ready.</p>
        </div>
        <div className="wp-detail-tag"><span className="wp-status incomplete">Incomplete</span><small>FINAL REVIEW PACK NOT COMPLETE</small></div>
      </div>
      <div className="wp-caveat" role="note">
        <ShieldAlert size={16} />
        <p><b>The final review pack is incomplete.</b> WP2 simulation notes exist as supporting material only. They are not a technical review, HSE approval, acceptance record, or sign-off.</p>
      </div>

      <section className="wp-detail-hero">
        <div className="wp-state-panel">
          <div className="wp-kicker">CURRENT HANDOVER STATE</div>
          <h2>Evidence and review gates remain open.</h2>
          <p>Build a traceable pack that records what changed, what was checked, where assets came from, and which technical and HSE reviews are still outstanding.</p>
        </div>
        <aside className="wp-state-side">
          <div><span>SUPPORTING MATERIAL</span><b>WP2 simulation notes exist</b></div>
          <small>Useful context on synthetic examples and assumptions—not approval or sign-off.</small>
        </aside>
      </section>

      <div className="wp-detail-grid">
        <section className="wp-detail-panel" aria-labelledby="wp5-required">
          <div className="wp-panel-heading"><div><div className="wp-kicker">FINAL PACK CONTENTS</div><h2 id="wp5-required">Items still to prepare</h2></div><FileText size={17} color="#8b7a55" /></div>
          <ul className="wp-list">
            <li><i>01</i><span><b>Revision log</b><small>Record revisions, dates, authors / owners, rationale, and unresolved items.</small></span></li>
            <li><i>02</i><span><b>Acceptance checklist</b><small>Document the agreed acceptance criteria and evidence against each item. Do not treat this page as an approval record.</small></span></li>
            <li><i>03</i><span><b>Asset-source / license register</b><small>List every external visual, audio, and other media source with license terms and usage permission.</small></span></li>
            <li><i>04</i><span><b>Five-slide stakeholder summary</b><small>Explain the concept, available examples, limits, work remaining, and review gates in five concise slides.</small></span></li>
            <li><i>05</i><span><b>WP2 simulation notes</b><small>Existing supporting material describing synthetic data and assumptions; not sign-off.</small></span></li>
          </ul>
        </section>
        <div>
          <section className="wp-detail-panel" aria-labelledby="wp5-gates">
            <div className="wp-kicker">REVIEW GATES</div><h2 id="wp5-gates">Human review required</h2>
            <div className="wp-gate"><span className="wp-gate-icon"><ShieldCheck size={14} /></span><span><b>Technical review</b><small>Review assumptions, labels, scope and any future implementation detail. No performance validation is established here.</small></span></div>
            <div className="wp-gate"><span className="wp-gate-icon"><ShieldCheck size={14} /></span><span><b>HSE review</b><small>Review wording, illustrative operating context, filming or testing boundaries, and site approval requirements.</small></span></div>
            <div className="wp-gate"><span className="wp-gate-icon"><AlertTriangle size={14} /></span><span><b>Release / handover</b><small>Keep open until required files are assembled and the responsible reviewers have recorded their decisions.</small></span></div>
          </section>
          <section className="wp-detail-panel" style={{ marginTop: 12 }} aria-labelledby="wp5-boundary">
            <div className="wp-kicker">ACCEPTANCE BOUNDARY</div><h2 id="wp5-boundary">No approval is implied</h2>
            <p>This workspace contains no approval checkboxes and records no sign-off. Only the responsible reviewers can confirm an approval through the agreed review process.</p>
            <div className="wp-callout"><ShieldAlert size={14} /><span>Simulation notes support discussion; they do not replace controlled testing, technical review, or site HSE approval.</span></div>
          </section>
        </div>
      </div>
      <div className="wp-next-strip">
        <span><b>Related references:</b> WP1 conceptual layout, WP2 signal examples, and WP3 local browser-only record prototype.</span>
        <Link href="/work-packages" className="wp-inline-link">Return to work packages <ArrowRight size={13} /></Link>
      </div>
    </DetailFrame>
  );
}
