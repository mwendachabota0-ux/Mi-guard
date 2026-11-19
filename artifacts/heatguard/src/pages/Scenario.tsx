import { useState } from 'react';
import { Link } from 'wouter';
import {
  Activity, AlertTriangle, ArrowRight, Check, ChevronRight, CircleHelp,
  Factory, GitBranch, Map, Radio, ShieldAlert, Truck, Waves,
} from 'lucide-react';

type SensorCount = 2 | 3;
type ViewMode = 'process' | 'isometric';
type Step = 0 | 1 | 2 | 3 | 4;

const steps = [
  { title: 'Discharge to conveyor', detail: 'A haul truck tips ore into the feed hopper. The sensing concept begins downstream, once material is on the conveyor—not in the truck.' },
  { title: 'S1 detects a possible item', detail: 'Sensor 1 marks a possible metal item as it travels with the ore. This is an initial indication, not a confirmed event.' },
  { title: 'S2 confirms and tracks', detail: 'Sensor 2 provides a second observation. The optional S3 arrangement adds another confirmation point and supports segment tracking discussion.' },
  { title: 'Estimate the affected section', detail: 'A controller concept combines observations with conveyor geometry and speed to estimate which ore section is affected and when it may reach the diverter.' },
  { title: 'Divert, then resume normal feed', detail: 'A conceptual diverter immediately before crusher feed sends the identified section to a hold / reject chute. The ordinary material path continues after it clears.' },
];

function ConveyorDiagram({ sensors, view, step }: { sensors: SensorCount; view: ViewMode; step: Step }) {
  const active = (n: Step) => step === n ? ' part-active' : '';
  return <svg className={`conveyor-svg ${view}`} viewBox="0 0 1120 500" role="img" aria-label={`${view === 'process' ? 'Process schematic' : 'Isometric illustration'} showing truck discharge, conveyor sensors, a conceptual ore segment diverter, reject chute, and crusher feed`}>
    <defs>
      <pattern id="ore-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="8" height="8" fill="#f2e3c3"/><path d="M0 0v8" stroke="#bd8b3d" strokeWidth="2" opacity=".5"/></pattern>
      <marker id="flow-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0L8 4 0 8z" fill="#64816f"/></marker>
      <marker id="reject-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0L8 4 0 8z" fill="#b88332"/></marker>
      <linearGradient id="belt-face" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#7b8c7e"/><stop offset="1" stopColor="#526b60"/></linearGradient>
    </defs>
    <rect width="1120" height="500" fill="#f4f1e7"/>
    <path d="M0 414H1120" stroke="#e2ddcf"/>
    <g className={`diagram-part${active(0)}`} data-part="discharge">
      <path d="M52 119h155v62l-18 21H70l-18-21z" fill="#d8d9ce" stroke="#7c8a7f" strokeWidth="3"/>
      <path d="M66 132h126v42l-14 15H80l-14-15z" fill="#eeeadd" stroke="#a9aa9b"/>
      <path d="M80 179l24 25h54l24-25" fill="none" stroke="#849186" strokeWidth="3"/>
      <text x="270" y="93" className="svg-label">TRUCK DISCHARGE</text>
      <text x="130" y="220" textAnchor="middle" className="svg-sub">feed source only</text>
      <path d="M101 83h58l19-24h44l17 18v30h-28V88h-28v19h-82z" fill="#71877a" stroke="#50685a" strokeWidth="2"/>
      <circle cx="124" cy="109" r="9" fill="#f2efe5" stroke="#52675c" strokeWidth="3"/><circle cx="213" cy="109" r="9" fill="#f2efe5" stroke="#52675c" strokeWidth="3"/>
      <path d="M130 204v58" stroke="#71877a" strokeWidth="2" strokeDasharray="5 5" markerEnd="url(#flow-arrow)"/>
      <g fill="#b08c55" stroke="#8d7246" strokeWidth="1">{[[108,244],[128,251],[148,240],[167,253],[188,244]].map(([x,y],i)=><path key={i} d={`M${x} ${y}l8 -5 8 5 -3 8 -10 1z`}/>)}</g>
    </g>
    <g className={`diagram-part${active(0)}`} data-part="belt">
      <path d="M180 278L952 278l61 39H234z" fill="url(#belt-face)" stroke="#455e52" strokeWidth="2"/>
      <path d="M234 317h779v25H234z" fill="#d4d2c4" stroke="#9b9c8d" strokeWidth="2"/>
      <path d="M248 342v39m170-39v39m190-39v39m190-39v39m170-39v39" stroke="#8b9186" strokeWidth="8"/>
      <path d="M253 296H964" fill="none" stroke="#d2dfd1" strokeWidth="2" strokeDasharray="8 8" markerEnd="url(#flow-arrow)"/>
      <g fill="#b6a078" stroke="#8e7954" strokeWidth="1">{[[282,286],[304,294],[334,285],[363,292],[400,284],[435,291],[480,286],[516,294],[565,285],[606,293],[650,284],[691,292],[742,285],[783,293],[827,284],[872,292],[919,285]].map(([x,y],i)=><path key={i} d={`M${x} ${y}l7 -5 9 3 3 6 -8 4 -10 -2z`}/>)}</g>
      <text x="513" y="374" textAnchor="middle" className="svg-label">CONVEYOR · SENSING AFTER DISCHARGE</text>
    </g>
    <g className={`diagram-part${active(1)}`} data-part="s1">
      <path d="M355 274v-64h42v64m-47-64h52" fill="none" stroke="#b27b29" strokeWidth="5"/>
      <circle cx="376" cy="262" r="8" fill="#f5e8ca" stroke="#b27b29" strokeWidth="3"/>
      <rect x="332" y="178" width="88" height="27" rx="4" fill="#f5ecd9" stroke="#c7a96a"/>
      <text x="376" y="196" textAnchor="middle" className="svg-label">S1 · DETECT</text>
    </g>
    <g className={`diagram-part${active(2)}`} data-part="s2">
      <path d="M535 274v-64h42v64m-47-64h52" fill="none" stroke="#668777" strokeWidth="5"/>
      <circle cx="556" cy="262" r="8" fill="#e5eee7" stroke="#668777" strokeWidth="3"/>
      <rect x="512" y="178" width="88" height="27" rx="4" fill="#e8eee6" stroke="#9aaf9e"/>
      <text x="556" y="196" textAnchor="middle" className="svg-label">S2 · CONFIRM</text>
    </g>
    {sensors === 3 && <g className={`diagram-part${active(2)}`} data-part="s3">
      <path d="M690 274v-64h42v64m-47-64h52" fill="none" stroke="#668777" strokeWidth="5"/>
      <circle cx="711" cy="262" r="8" fill="#e5eee7" stroke="#668777" strokeWidth="3"/>
      <rect x="666" y="178" width="91" height="27" rx="4" fill="#e8eee6" stroke="#9aaf9e"/>
      <text x="711" y="196" textAnchor="middle" className="svg-label">S3 · OPTIONAL</text>
    </g>}
    <g className={`diagram-part${active(3)}`} data-part="controller">
      <path d="M438 117h204v47H438z" rx="5" fill="#e1e6dd" stroke="#75877b" strokeWidth="2"/>
      <rect x="450" y="128" width="29" height="23" rx="2" fill="#f4f2e9" stroke="#a8b1a6"/>
      <path d="M489 130h74m-74 8h112m-112 8h86" stroke="#809187" strokeWidth="2"/>
      <text x="540" y="109" textAnchor="middle" className="svg-label">CONTROLLER / TIMING ESTIMATE</text>
      <path d="M376 177V156h62m118 0v-9m67 9h48v22m-158-14v19" fill="none" stroke="#89988b" strokeWidth="2" strokeDasharray="4 4"/>
      <rect x="457" y="229" width="157" height="32" rx="4" fill="#f6efdf" stroke="#d2bf94"/>
      <text x="535" y="243" textAnchor="middle" className="svg-tiny">AFFECTED ORE SECTION</text>
      <text x="535" y="254" textAnchor="middle" className="svg-tiny">segment + arrival window: estimate only</text>
    </g>
    <g className={`diagram-part${active(3)}`} data-part="segment">
      <path d="M769 278h95l17 39h-96z" fill="url(#ore-hatch)" stroke="#b88332" strokeWidth="2" strokeDasharray="5 4"/>
      <path d="M770 269v-13m111 19v-13" stroke="#b88332" strokeWidth="2"/>
      <text x="820" y="239" textAnchor="middle" className="svg-tiny">CONCEPTUAL SEGMENT</text>
    </g>
    <g className={`diagram-part${active(4)}`} data-part="diverter">
      <path d="M888 274l35-26 34 28-19 25z" fill="#c69b50" stroke="#8c672c" strokeWidth="3"/>
      <path d="M911 282l-54 94 56 29 61-112" fill="#e7d8b8" stroke="#927b55" strokeWidth="3"/>
      <path d="M919 300l-45 74" stroke="#b88332" strokeWidth="3" markerEnd="url(#reject-arrow)"/>
      <path d="M889 376l44 24 40-10v39l-40 13-44-24z" fill="#d7c7a7" stroke="#927b55" strokeWidth="2"/>
      <text x="937" y="462" textAnchor="middle" className="svg-label">HOLD / REJECT CHUTE</text>
      <text x="938" y="477" textAnchor="middle" className="svg-tiny">PLACEHOLDER · ENGINEERING SELECTION PENDING</text>
    </g>
    <g className={`diagram-part${active(4)}`} data-part="crusher">
      <path d="M1001 236h84v93h-84z" fill="#d8ddd2" stroke="#64776a" strokeWidth="3"/>
      <path d="M1014 251h57v52h-57z" fill="#eef0e8" stroke="#9ba69a" strokeWidth="2"/>
      <path d="M1023 258l19 19-19 19m39-38l-19 19 19 19" fill="none" stroke="#758579" strokeWidth="3"/>
      <path d="M954 296h47" fill="none" stroke="#64816f" strokeWidth="3" markerEnd="url(#flow-arrow)"/>
      <text x="1043" y="218" textAnchor="middle" className="svg-label">CRUSHER FEED</text>
      <text x="1043" y="350" textAnchor="middle" className="svg-sub">normal path resumes</text>
    </g>
    <g className="diagram-part" data-part="direction">
      <rect x="25" y="25" width="261" height="31" rx="4" fill="#e8eee6" stroke="#cbd5ca"/>
      <circle cx="42" cy="40" r="5" fill="#668777"/>
      <text x="55" y="44" className="svg-tiny">SENSING BEGINS ONLY AFTER TRUCK DISCHARGE</text>
    </g>
  </svg>;
}

export default function Scenario() {
  const [sensors, setSensors] = useState<SensorCount>(2);
  const [view, setView] = useState<ViewMode>('process');
  const [step, setStep] = useState<Step>(0);
  const stepBack = () => setStep(s => Math.max(0, s - 1) as Step);
  const stepForward = () => setStep(s => Math.min(4, s + 1) as Step);
  return <main className="app-shell scenario-shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark"><Activity size={20}/></div><div><b>HEATGUARD</b><span>ORE PASS SIMULATION</span></div></div>
      <div className="side-label">WORKSPACE</div>
      <Link href="/" className="side-link scenario-nav" data-testid="link-pass-review"><Activity size={16}/> Pass review <ChevronRight size={13}/></Link>
      <Link href="/scenario" className="side-active scenario-nav" data-testid="link-scenario"><Map size={16}/> Scenario layout <span className="side-count">WP1</span></Link>
      <div className="side-label">REFERENCE</div><div className="side-link"><ShieldAlert size={16}/> Concept basis</div>
      <div className="sidebar-spacer"/><div className="side-note"><ShieldAlert size={16}/><span>Prototype only<br/><b>No operational control path</b></span></div>
      <div className="sidebar-foot"><span className="live-dot"/> LOCAL WORKSPACE <span className="mono">v0.1</span></div>
    </aside>
    <section className="main-area">
      <header className="topbar"><div className="crumb">HEATGUARD <span>/</span> <b>Scenario &amp; system layout</b></div><div className="top-right"><span className="synthetic-pill"><i/> CONCEPT ONLY</span><Link href="/" className="scenario-top-link" data-testid="link-top-pass-review">Pass review <ArrowRight size={14}/></Link><button className="icon-button" title="Concept basis" aria-label="Concept basis" onClick={()=>document.getElementById('basis')?.scrollIntoView({behavior:'smooth'})} data-testid="button-scenario-about"><CircleHelp size={17}/></button></div></header>
      <nav className="mobile-workspace-nav" aria-label="Workspace pages"><Link href="/" data-testid="link-mobile-pass-review"><Activity size={14}/>Pass review</Link><Link href="/scenario" className="mobile-workspace-active" data-testid="link-mobile-scenario"><Map size={14}/>Scenario layout</Link></nav>
      <div className="content scenario-content">
        <div className="page-heading fade-in"><div><div className="eyebrow">WP1 · CONVEYOR PROCESS CONCEPT <span className="heading-index">/ 02</span></div><h1>After discharge, before crusher</h1><p>Trace a possible metal item through the conveyor process and a conceptual removal point.</p></div><div className="concept-state" data-testid="status-concept-only"><span/><b>CONCEPTUAL · NOT FOR CONSTRUCTION</b></div></div>
        <div className="scenario-caveat"><AlertTriangle size={17}/><p><b>Discussion concept only.</b> Layout, sensor positions, affected-segment boundaries, timing, and the removal mechanism require engineering and site validation. Nothing on this page controls equipment or certifies safety.</p></div>
        <section className="scenario-panel panel">
          <div className="scenario-toolbar"><div><div className="eyebrow">MATERIAL FLOW / WP1</div><h2>Detect · confirm · estimate · remove</h2><p>Truck discharge is the feed source. Sensing is shown on the conveyor downstream.</p></div>
            <div className="scenario-controls">
              <fieldset className="profile-select" aria-label="Sensor arrangement" data-testid="selector-sensor-arrangement"><legend>SENSOR ARRANGEMENT</legend>
                <button type="button" className={sensors===2?'selected':''} aria-pressed={sensors===2} onClick={()=>setSensors(2)} data-testid="button-sensors-2"><Radio size={14}/> 2 sensors</button>
                <button type="button" className={sensors===3?'selected':''} aria-pressed={sensors===3} onClick={()=>setSensors(3)} data-testid="button-sensors-3"><Waves size={14}/> 3 sensors</button>
              </fieldset>
              <div className="view-switch" role="group" aria-label="Select illustration view" data-testid="selector-layout-view"><button type="button" className={view==='process'?'selected':''} aria-pressed={view==='process'} onClick={()=>setView('process')} data-testid="button-view-process"><GitBranch size={14}/> Process</button><button type="button" className={view==='isometric'?'selected':''} aria-pressed={view==='isometric'} onClick={()=>setView('isometric')} data-testid="button-view-isometric"><Map size={14}/> Isometric</button></div>
            </div>
          </div>
          <div className="diagram-meta"><span className="profile-glyph"><Truck size={23}/></span><span><b>{sensors}-sensor concept</b><small>{sensors===2?'S1 detects; S2 confirms and supports tracking.':'S1 detects; S2 and optional S3 add confirmation / segment-tracking points.'}</small></span><span className="diagram-stamp">WP1 / CONCEPT ONLY</span></div>
          <div className="diagram-pan-hint">Swipe or scroll the drawing horizontally to inspect the process.</div>
          <div className="drawing-frame" role="region" aria-label={`${view} conveyor process diagram`} tabIndex={0} data-testid="drawing-conveyor-process"><ConveyorDiagram sensors={sensors} view={view} step={step}/><div className="drawing-caption"><span>{view==='process'?'CONVEYOR PROCESS SCHEMATIC':'ISOMETRIC PROCESS STUDY'}</span><span>NOT TO SCALE · SITE INPUTS PENDING</span></div></div>
          <div className="legend-row"><span className="legend-title">KEY</span><span><i className="legend-road"/>Normal ore flow</span><span><i className="legend-zone"/>Affected section · conceptual</span><span><i className="legend-hold"/>Hold / reject route</span><span><i className="legend-fixed"/>Equipment placeholder</span></div>
        </section>
        <section className="walkthrough panel" aria-label="Step-by-step process walkthrough" data-testid="panel-walkthrough">
          <div className="walkthrough-top"><div><div className="eyebrow">CLICK-THROUGH WALKTHROUGH</div><h2>{String(step+1).padStart(2,'0')} / 05 · {steps[step].title}</h2></div><div className="walkthrough-controls"><button type="button" onClick={stepBack} disabled={step===0} aria-label="Previous step" data-testid="button-step-previous">Previous</button><button type="button" onClick={stepForward} disabled={step===4} aria-label="Next step" data-testid="button-step-next">Next <ArrowRight size={14}/></button></div></div>
          <p className="walkthrough-detail" data-testid="text-step-explanation">{steps[step].detail}</p>
          <div className="step-track" role="group" aria-label="Choose walkthrough step">{steps.map((item,index)=><button key={item.title} type="button" className={step===index?'step-selected':''} aria-current={step===index?'step':undefined} onClick={()=>setStep(index as Step)} data-testid={`button-walkthrough-step-${index+1}`}><span>{String(index+1).padStart(2,'0')}</span><b>{item.title}</b></button>)}</div>
        </section>
        <section className="scenario-lower">
          <article className="basis-card panel" id="basis" data-testid="panel-design-basis"><div className="eyebrow">ENGINEERING INPUTS / LIMITS</div><h2>Timing is an estimate—not a preset</h2><p>An arrival window cannot be responsibly shown until actual conveyor speed, sensor-to-diverter distances, and equipment response are provided and validated.</p><div className="basis-list">
            <div><span className="basis-mark"><Check size={13}/></span><span><b>Concept intent</b><small>Isolate the affected ore section while normal material flow continues after it clears.</small></span></div>
            <div><span className="basis-mark pending"><AlertTriangle size={13}/></span><span><b>Inputs still required</b><small>Measured conveyor speed, surveyed distances, material behavior, and response times.</small></span></div>
            <div><span className="basis-mark pending"><AlertTriangle size={13}/></span><span><b>Mechanism not selected</b><small>Diverter and hold / reject chute are placeholders pending engineering selection.</small></span></div>
          </div><div className="basis-foot"><ShieldAlert size={14}/> Nothing here controls equipment or certifies safety.</div></article>
          <article className="sequence-card panel" data-testid="panel-process-sequence"><div className="sequence-head"><div><div className="eyebrow">PROCESS LOGIC</div><h2>One affected section. Main feed resumes.</h2></div><span className="sequence-badge">CONCEPT ONLY</span></div><ol className="sequence-list">
            <li><span>01</span><div><b>Discharge</b><small>Ore tips into hopper and lands on conveyor.</small></div><Truck size={15}/></li>
            <li><span>02</span><div><b>Detect + confirm</b><small>S1 flags a possible item; S2 and optional S3 confirm / track.</small></div><Radio size={15}/></li>
            <li><span>03</span><div><b>Estimate segment arrival</b><small>Window depends on real speed, distances, and response.</small></div><Activity size={15}/></li>
            <li><span>04</span><div><b>Remove, then continue</b><small>Conceptual diverter routes the section to hold; normal feed proceeds.</small></div><Factory size={15}/></li>
          </ol><div className="sequence-note"><GitBranch size={14}/> Layout and segment boundaries require engineering validation.</div></article>
        </section>
        <div className="scenario-bottom-nav"><span>Continue to pass-record examples</span><Link href="/" className="primary-button" data-testid="link-scenario-to-review">Open pass review <ArrowRight size={15}/></Link></div>
        <footer className="page-footer"><span>HEATGUARD <i>·</i> LOCAL CONCEPT WORKSPACE</span><span>NO OPERATIONAL CONTROL · VALIDATION REQUIRED</span></footer>
      </div>
    </section>
  </main>;
}
