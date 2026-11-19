import { useState } from 'react';
import { Link } from 'wouter';
import {
  Activity, AlertTriangle, ArrowRight, Cable, Check, ChevronRight, CircleHelp,
  Factory, Gauge, Layers3, Map, Mountain, Radio, ShieldAlert, Truck,
} from 'lucide-react';

type VehicleProfile = 'land-cruiser' | 'haul-truck';
type ViewMode = 'plan' | 'oblique';

function VehicleGlyph({ profile, className = '' }: { profile: VehicleProfile; className?: string }) {
  if (profile === 'haul-truck') {
    return <svg className={className} viewBox="0 0 112 54" role="img" aria-label="Illustrative haul truck, larger vehicle profile">
      <path d="M8 11h55l16 14h22v16H8z" fill="currentColor" opacity=".18" stroke="currentColor" strokeWidth="2"/>
      <path d="M18 13h43l12 13H18z" fill="currentColor" opacity=".2" stroke="currentColor" strokeWidth="2"/>
      <path d="M9 27h23v14H9zm29 1h31v13H38zm35 0h24v13H73z" fill="currentColor" stroke="currentColor" strokeWidth="2"/>
      <circle cx="26" cy="43" r="7" fill="#35403c" stroke="#e4d9bd" strokeWidth="2"/>
      <circle cx="55" cy="43" r="7" fill="#35403c" stroke="#e4d9bd" strokeWidth="2"/>
      <circle cx="86" cy="43" r="7" fill="#35403c" stroke="#e4d9bd" strokeWidth="2"/>
    </svg>;
  }
  return <svg className={className} viewBox="0 0 70 38" role="img" aria-label="Illustrative Land Cruiser profile">
    <path d="M6 12h11l7-7h22l9 8h8l4 6v9H5v-9z" fill="currentColor" opacity=".2" stroke="currentColor" strokeWidth="2"/>
    <path d="M27 8h17l7 8H20z" fill="currentColor" opacity=".18" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="18" cy="29" r="5.5" fill="#35403c" stroke="#e4d9bd" strokeWidth="1.5"/>
    <circle cx="54" cy="29" r="5.5" fill="#35403c" stroke="#e4d9bd" strokeWidth="1.5"/>
  </svg>;
}

function SitePlan({ profile }: { profile: VehicleProfile }) {
  return <svg viewBox="0 0 1000 560" className="site-svg plan-svg" role="img" aria-label={`Conceptual top-down site plan for ${profile === 'land-cruiser' ? 'Land Cruiser' : 'dump truck or haul truck'} pilot profile`}>
    <defs>
      <pattern id="plan-grid" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" fill="none" stroke="#dfd9c9" strokeWidth="1" opacity=".55"/></pattern>
      <pattern id="zone-hatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="10" height="10" fill="#f6e9c9"/><path d="M0 0V10" stroke="#bb852f" strokeWidth="2" opacity=".42"/></pattern>
      <marker id="arrow-route" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5 0 10z" fill="#5e7867"/></marker>
    </defs>
    <rect width="1000" height="560" fill="#f3f0e6"/>
    <rect width="1000" height="560" fill="url(#plan-grid)" opacity=".75"/>
    <path d="M-20 372 C120 366 187 356 280 356 S423 372 520 343 S670 311 774 310 S909 321 1030 294" fill="none" stroke="#d5cdb9" strokeWidth="78" strokeLinecap="round"/>
    <path d="M-20 372 C120 366 187 356 280 356 S423 372 520 343 S670 311 774 310 S909 321 1030 294" fill="none" stroke="#f9f6ec" strokeWidth="62" strokeLinecap="round"/>
    <path d="M-20 372 C120 366 187 356 280 356 S423 372 520 343 S670 311 774 310 S909 321 1030 294" fill="none" stroke="#758b78" strokeWidth="3" strokeDasharray="12 10" markerEnd="url(#arrow-route)"/>
    <path d="M329 359 C367 444 465 465 552 438 C622 416 637 373 676 333" fill="none" stroke="#c39a53" strokeWidth="3" strokeDasharray="8 8" markerEnd="url(#arrow-route)"/>
    <path d="M166 229h208v88H166z" fill="#e5e2d6" stroke="#aaa995" strokeWidth="2"/>
    <path d="M179 242h182v61H179z" fill="#ece9dd" stroke="#c1bcaa" strokeWidth="1.5"/>
    <path d="M188 265h164" stroke="#c0b9a5" strokeWidth="1" strokeDasharray="5 6"/>
    <text x="270" y="215" textAnchor="middle" className="svg-label">STAGING / QUEUE</text>
    <text x="270" y="283" textAnchor="middle" className="svg-sub">conceptual holding area</text>
    <path d="M-5 374H164" stroke="#5e7867" strokeWidth="3" markerEnd="url(#arrow-route)"/>
    <text x="36" y="337" className="svg-label">MINE APPROACH</text>
    <text x="36" y="352" className="svg-sub">inbound haul path</text>
    <g transform="translate(610 248)">
      <path d="M0 27h74v66H0z" fill="url(#zone-hatch)" stroke="#b4822f" strokeWidth="2" strokeDasharray="5 4"/>
      <path d="M10 29v62m54-62v62" stroke="#8d672b" strokeWidth="6"/>
      <path d="M10 32h54" stroke="#8d672b" strokeWidth="4"/>
      <circle cx="10" cy="34" r="5" fill="#fff6e1" stroke="#986a24" strokeWidth="2"/>
      <circle cx="64" cy="34" r="5" fill="#fff6e1" stroke="#986a24" strokeWidth="2"/>
    </g>
    <path d="M683 263h62" stroke="#ad7c2e"/>
    <text x="752" y="253" className="svg-label">PROPOSED SENSOR PORTAL</text>
    <text x="752" y="269" className="svg-sub">zone outline · siting unverified</text>
    <text x="682" y="365" className="svg-sub">FIXED SUPPORTS</text>
    <g transform="translate(824 252)">
      <path d="M0 24h105v75H0z" fill="#d8ded2" stroke="#66796c" strokeWidth="2"/>
      <path d="M12 37h81v40H12z" fill="#e7e9df" stroke="#98a294"/>
      <path d="M20 90v9m64-9v9" stroke="#66796c" strokeWidth="4"/>
      <path d="M34 24v-9h38v9" fill="none" stroke="#66796c" strokeWidth="2"/>
      <text x="52" y="61" textAnchor="middle" className="svg-label">CRUSHER</text>
    </g>
    <text x="876" y="216" textAnchor="middle" className="svg-label">CRUSHER FEED</text>
    <g transform="translate(545 150)">
      <rect width="91" height="49" rx="4" fill="#d9e0dc" stroke="#637b70" strokeWidth="2"/>
      <rect x="10" y="10" width="19" height="15" fill="#edf0e6" stroke="#8b9b8d"/>
      <path d="M39 13h42M39 20h30m-30 8h35" stroke="#70877c" strokeWidth="2"/>
      <text x="45" y="42" textAnchor="middle" className="svg-tiny">EDGE / OPERATOR</text>
    </g>
    <path d="M592 199v35m28-35v35" stroke="#6c8174" strokeWidth="2" strokeDasharray="4 4"/>
    <g transform="translate(456 134)">
      <path d="M0 17h29m-14-14v29" stroke="#b77f2b" strokeWidth="3"/>
      <circle cx="15" cy="17" r="19" fill="none" stroke="#b77f2b" strokeDasharray="3 3"/>
      <text x="17" y="-12" textAnchor="middle" className="svg-label">POWER / COMMS</text>
      <text x="17" y="48" textAnchor="middle" className="svg-sub">location to confirm</text>
    </g>
    <g transform="translate(399 422)">
      <path d="M0 0h92v51H0z" fill="#eee4cf" stroke="#aa8753" strokeWidth="2" strokeDasharray="5 4"/>
      <path d="M12 37l25-24 23 24z" fill="#d9c7a6" stroke="#a99068"/>
      <text x="65" y="22" textAnchor="middle" className="svg-label">HOLD /</text><text x="65" y="35" textAnchor="middle" className="svg-label">BYPASS</text>
    </g>
    <g transform={`translate(${profile === 'land-cruiser' ? 75 : 57} 343)`} className="vehicle-in-plan">
      <VehicleGlyph profile={profile} className={`plan-vehicle${profile === 'haul-truck' ? ' plan-vehicle-large' : ''}`}/>
    </g>
    <text x="35" y="430" className="svg-sub">{profile === 'land-cruiser' ? 'LAND CRUISER · ILLUSTRATIVE' : 'DUMP / HAUL TRUCK · ILLUSTRATIVE'}</text>
    <path d="M949 61v52m0-52l-7 10m7-10l7 10" stroke="#66766d" strokeWidth="2"/>
    <text x="949" y="47" textAnchor="middle" className="svg-tiny">N</text>
    <g transform="translate(35 493)"><path d="M0 0h48" stroke="#5e7867" strokeWidth="3" markerEnd="url(#arrow-route)"/><text x="0" y="18" className="svg-sub">Illustrative route direction only</text></g>
    <text x="965" y="540" textAnchor="end" className="svg-tiny">NOT TO SCALE · DIMENSIONS PENDING SURVEY</text>
  </svg>;
}

function ObliqueSite({ profile }: { profile: VehicleProfile }) {
  return <svg viewBox="0 0 1000 560" className="site-svg oblique-svg" role="img" aria-label={`Conceptual oblique site layout for ${profile === 'land-cruiser' ? 'Land Cruiser' : 'dump truck or haul truck'} pilot profile`}>
    <defs>
      <pattern id="oblique-hatch" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="9" height="9" fill="#f3e7ca"/><path d="M0 0V9" stroke="#b37e2a" strokeWidth="2" opacity=".5"/></pattern>
      <marker id="arrow-oblique" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5 0 10z" fill="#617d6b"/></marker>
    </defs>
    <rect width="1000" height="560" fill="#f3f0e6"/>
    <path d="M94 384L496 156 932 371 526 502z" fill="#e2decf" stroke="#bdb7a6" strokeWidth="2"/>
    <path d="M120 373L498 174 897 371 526 477z" fill="#eeebdf"/>
    <path d="M42 398L470 165" stroke="#c8bfaa" strokeWidth="76" strokeLinecap="round"/>
    <path d="M42 398L470 165" stroke="#f8f5eb" strokeWidth="58" strokeLinecap="round"/>
    <path d="M42 398L470 165" stroke="#718878" strokeWidth="3" strokeDasharray="12 10" markerEnd="url(#arrow-oblique)"/>
    <path d="M365 247L427 215v96l-62 32z" fill="#dfdacb" stroke="#aaa490" strokeWidth="2"/>
    <path d="M378 258l37-20v58l-37 20z" fill="#ebe7da" stroke="#c2bba9"/>
    <text x="325" y="215" className="svg-label">STAGING / QUEUE</text>
    <text x="331" y="230" className="svg-sub">concept only</text>
    <g transform="translate(532 239)">
      <path d="M0 33L68 0v94L0 128z" fill="url(#oblique-hatch)" stroke="#ae7928" strokeWidth="2" strokeDasharray="5 4"/>
      <path d="M5 31v87m57-116v87" stroke="#8c672e" strokeWidth="7"/>
      <path d="M5 31L62 2" stroke="#8c672e" strokeWidth="5"/>
      <circle cx="5" cy="35" r="5" fill="#fff6e1" stroke="#956a29" strokeWidth="2"/>
      <circle cx="62" cy="6" r="5" fill="#fff6e1" stroke="#956a29" strokeWidth="2"/>
    </g>
    <path d="M604 251l83-45" stroke="#a8792e"/>
    <text x="693" y="196" className="svg-label">PROPOSED SENSOR PORTAL</text>
    <text x="693" y="212" className="svg-sub">zone; not an installed system</text>
    <g transform="translate(748 189)">
      <path d="M0 37l98-49v104L0 143z" fill="#cfd7cc" stroke="#667a6d" strokeWidth="2"/>
      <path d="M0 37l98-49 21 13-98 50z" fill="#e0e4d9" stroke="#849386" strokeWidth="2"/>
      <path d="M20 37l60-30v54l-60 30z" fill="#dce1d8" stroke="#95a092"/>
      <path d="M30 55l42-21v26L30 81z" fill="#758579"/>
      <text x="67" y="122" textAnchor="middle" className="svg-label">CRUSHER</text>
    </g>
    <g transform="translate(516 117)">
      <path d="M0 24l69-35 50 25-68 35z" fill="#e4e9df" stroke="#6b8175" strokeWidth="2"/>
      <path d="M0 24v44l51 26V49z" fill="#cad4ca" stroke="#6b8175" strokeWidth="2"/>
      <path d="M51 49l68-35v43L51 94z" fill="#b9c7bb" stroke="#6b8175" strokeWidth="2"/>
      <path d="M16 30l24 12v24L16 54z" fill="#84968a"/>
    </g>
    <path d="M538 208l-4 22m53-50l4 25" stroke="#637b70" strokeWidth="2" strokeDasharray="4 4"/>
    <text x="521" y="103" className="svg-label">OPERATOR / EDGE ENCLOSURE</text>
    <g transform="translate(422 115)">
      <path d="M0 24L23 12l23 12-23 12z" fill="#d9be82" stroke="#9a742e" strokeWidth="2"/>
      <path d="M23 12V-4" stroke="#9a742e" strokeWidth="3"/>
      <circle cx="23" cy="-5" r="4" fill="#b77f2b"/>
      <text x="18" y="-22" textAnchor="middle" className="svg-label">POWER / COMMS</text>
      <text x="19" y="55" textAnchor="middle" className="svg-sub">position pending review</text>
    </g>
    <path d="M264 334L320 306l63 31-55 31z" fill="#f0e6d2" stroke="#a98956" strokeWidth="2" strokeDasharray="5 4"/>
    <text x="306" y="350" textAnchor="middle" className="svg-label">HOLD / BYPASS</text>
    <path d="M74 394L160 347" stroke="#617d6b" strokeWidth="3" markerEnd="url(#arrow-oblique)"/>
    <text x="72" y="433" className="svg-label">MINE APPROACH</text>
    <text x="72" y="449" className="svg-sub">inbound haul path</text>
    <g transform={`translate(${profile === 'land-cruiser' ? 154 : 123} ${profile === 'land-cruiser' ? 348 : 340}) rotate(-28)`}>
      <VehicleGlyph profile={profile} className={`oblique-vehicle${profile === 'haul-truck' ? ' oblique-vehicle-large' : ''}`}/>
    </g>
    <text x="35" y="526" className="svg-sub">Route depiction is illustrative; actual traffic plan not established.</text>
    <text x="965" y="540" textAnchor="end" className="svg-tiny">OBLIQUE CONCEPT · NOT TO SCALE · SITING PENDING REVIEW</text>
  </svg>;
}

export default function Scenario() {
  const [profile, setProfile] = useState<VehicleProfile>('land-cruiser');
  const [view, setView] = useState<ViewMode>('plan');
  return <main className="app-shell scenario-shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark"><Activity size={20}/></div><div><b>HEATGUARD</b><span>ORE PASS SIMULATION</span></div></div>
      <div className="side-label">WORKSPACE</div>
      <Link href="/" className="side-link scenario-nav" data-testid="link-pass-review"><Activity size={16}/> Pass review <ChevronRight size={13}/></Link>
      <Link href="/scenario" className="side-active scenario-nav" data-testid="link-scenario"><Map size={16}/> Scenario layout <span className="side-count">WP1</span></Link>
      <div className="side-label">REFERENCE</div>
      <div className="side-link"><ShieldAlert size={16}/> Concept basis</div>
      <div className="sidebar-spacer"/>
      <div className="side-note"><ShieldAlert size={16}/><span>Prototype only<br/><b>No operational control path</b></span></div>
      <div className="sidebar-foot"><span className="live-dot"/> LOCAL WORKSPACE <span className="mono">v0.1</span></div>
    </aside>
    <section className="main-area">
      <header className="topbar">
        <div className="crumb">HEATGUARD <span>/</span> <b>Scenario &amp; system layout</b></div>
        <div className="top-right"><span className="synthetic-pill"><i/> CONCEPT ONLY</span><Link href="/" className="scenario-top-link" data-testid="link-top-pass-review">Pass review <ArrowRight size={14}/></Link><button className="icon-button" title="Concept basis" aria-label="Concept basis" onClick={()=>document.getElementById('basis')?.scrollIntoView({behavior:'smooth'})} data-testid="button-scenario-about"><CircleHelp size={17}/></button></div>
      </header>
      <nav className="mobile-workspace-nav" aria-label="Workspace pages">
        <Link href="/" data-testid="link-mobile-pass-review"><Activity size={14}/>Pass review</Link>
        <Link href="/scenario" className="mobile-workspace-active" data-testid="link-mobile-scenario"><Map size={14}/>Scenario layout</Link>
      </nav>
      <div className="content scenario-content">
        <div className="page-heading fade-in">
          <div><div className="eyebrow">WP1 · SITE CONCEPT <span className="heading-index">/ 02</span></div><h1>Scenario &amp; system layout</h1><p>Review the proposed sensing zone in context — before site survey and engineering review.</p></div>
          <div className="concept-state" data-testid="status-concept-only"><span/><b>CONCEPTUAL · NOT FOR CONSTRUCTION</b></div>
        </div>
        <div className="scenario-caveat"><AlertTriangle size={17}/><p><b>Illustrative arrangement only.</b> No surveyed dimensions, final siting, signal range, performance, or operating route behavior is established here. Dimensions and locations remain pending survey and site review.</p></div>
        <section className="scenario-panel panel">
          <div className="scenario-toolbar">
            <div><div className="eyebrow">SITE ARRANGEMENT</div><h2>Proposed heat-sensing zone before crusher feed</h2><p>Diagram separates fixed infrastructure from the proposed sensor zone.</p></div>
            <div className="scenario-controls">
              <fieldset className="profile-select" aria-label="Pilot vehicle profile" data-testid="selector-vehicle-profile">
                <legend>PILOT PROFILE</legend>
                <button type="button" className={profile==='land-cruiser'?'selected':''} aria-pressed={profile==='land-cruiser'} onClick={()=>setProfile('land-cruiser')} data-testid="button-profile-land-cruiser"><Truck size={14}/> Land Cruiser</button>
                <button type="button" className={profile==='haul-truck'?'selected':''} aria-pressed={profile==='haul-truck'} onClick={()=>setProfile('haul-truck')} data-testid="button-profile-haul-truck"><Truck size={17}/> Dump / haul truck</button>
              </fieldset>
              <div className="view-switch" role="group" aria-label="Select layout view" data-testid="selector-layout-view">
                <button type="button" className={view==='plan'?'selected':''} aria-pressed={view==='plan'} onClick={()=>setView('plan')} data-testid="button-view-plan"><Map size={14}/> Site plan</button>
                <button type="button" className={view==='oblique'?'selected':''} aria-pressed={view==='oblique'} onClick={()=>setView('oblique')} data-testid="button-view-oblique"><Layers3 size={14}/> 3D view</button>
              </div>
            </div>
          </div>
          <div className="active-profile-note" data-testid="status-profile-note"><span className="profile-glyph"><VehicleGlyph profile={profile}/></span><span><b>{profile==='land-cruiser'?'Land Cruiser':'Dump truck / haul truck'} profile</b><small>{profile==='land-cruiser'?'Compact illustrative vehicle symbol; route shown for concept review only.':'Larger illustrative vehicle symbol; approach and queue depiction do not establish turning or clearance.'}</small></span></div>
          <div className="diagram-pan-hint"><span aria-hidden="true">↔</span> Swipe or scroll the drawing horizontally to inspect the full layout.</div>
          <div className="drawing-frame" role="region" aria-label={`Scrollable conceptual ${view === 'plan' ? 'site plan' : '3D layout'} diagram`} tabIndex={0} data-testid="drawing-site-layout">
            <div className="drawing-stamp"><span>WP1</span><span>CONCEPT / UNVERIFIED</span></div>
            {view==='plan'?<SitePlan profile={profile}/>:<ObliqueSite profile={profile}/>}
            <div className="drawing-caption"><span>{view==='plan'?'TOP-DOWN SITE PLAN':'OBLIQUE / ISOMETRIC STUDY'}</span><span>NOT TO SCALE · SITE REVIEW REQUIRED</span></div>
          </div>
          <div className="legend-row" aria-label="Drawing legend">
            <span className="legend-title">LEGEND</span><span><i className="legend-road"/>Conceptual haul path</span><span><i className="legend-zone"/>Proposed sensor zone</span><span><i className="legend-fixed"/>Fixed infrastructure</span><span><i className="legend-hold"/>Alternate hold / bypass</span><span><i className="legend-equipment"><Radio size={11}/></i>Sensor elements</span>
          </div>
        </section>
        <section className="scenario-lower">
          <article className="basis-card panel" id="basis" data-testid="panel-design-basis">
            <div className="eyebrow">DESIGN BASIS / CAVEATS</div><h2>What this view can — and cannot — say</h2>
            <p>This layout frames a discussion about introducing a heat-sensing zone on the inbound approach to crusher feed. It is a location concept, not a surveyed plan or engineering drawing.</p>
            <div className="basis-list">
              <div><span className="basis-mark"><Check size={13}/></span><span><b>For review</b><small>Approach, staging, zone relationship, enclosure, utilities and an alternate hold area.</small></span></div>
              <div><span className="basis-mark pending"><AlertTriangle size={13}/></span><span><b>Pending site work</b><small>Surveyed dimensions, clearances, foundations, cable routes, utilities and final equipment siting.</small></span></div>
              <div><span className="basis-mark pending"><AlertTriangle size={13}/></span><span><b>Not established</b><small>Detection range, performance, throughput, traffic rules or safety certification.</small></span></div>
            </div>
            <div className="basis-foot"><ShieldAlert size={14}/> No engineering approval or operational control is implied.</div>
          </article>
          <article className="sequence-card panel" data-testid="panel-pass-sequence">
            <div className="sequence-head"><div><div className="eyebrow">CONCEPTUAL PASS SEQUENCE</div><h2>Review the intended context</h2></div><span className="sequence-badge">DISCUSSION AID</span></div>
            <ol className="sequence-list">
              <li><span>01</span><div><b>Approach &amp; staging</b><small>Vehicle arrives along the depicted inbound path; queue placement remains a site decision.</small></div><ArrowRight size={14}/></li>
              <li><span>02</span><div><b>Proposed sensing zone</b><small>Portal location is a concept. Any sensing arrangement requires design and validation.</small></div><Gauge size={15}/></li>
              <li><span>03</span><div><b>Human review context</b><small>Edge / operator enclosure and power-comms location are illustrative, pending review.</small></div><Cable size={15}/></li>
              <li><span>04</span><div><b>Crusher feed or hold discussion</b><small>Crusher and alternate area are shown for context only; no route behavior is defined.</small></div><Factory size={15}/></li>
            </ol>
            <div className="sequence-note"><Mountain size={14}/> Sequence is a discussion outline, not an operating procedure.</div>
          </article>
        </section>
        <div className="scenario-bottom-nav"><span>Continue to pass-record examples</span><Link href="/" className="primary-button" data-testid="link-scenario-to-review">Open pass review <ArrowRight size={15}/></Link></div>
        <footer className="page-footer"><span>HEATGUARD <i>·</i> LOCAL CONCEPT WORKSPACE</span><span>SCHEMATIC ONLY · SURVEY / SITE REVIEW PENDING</span></footer>
      </div>
    </section>
  </main>;
}
