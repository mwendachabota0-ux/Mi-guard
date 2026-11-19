import { type FormEvent, useEffect, useMemo, useState } from 'react';
import { Activity, Archive, ArrowDownToLine, ArrowUpRight, Check, ChevronDown, CircleHelp, ClipboardCheck, FilePlus2, Filter, Search, ShieldAlert, X } from 'lucide-react';
import './_group.css';

type CaseId = 'A' | 'B' | 'C' | 'D';
type DetectionState = 'No Detection Indicated' | 'Illustrative Event Flag' | 'Requires Validation / Operator Review';
type OperatorAction = 'Hold / Inspect' | 'Clear' | 'Escalate' | 'Unassigned';
type EventRecord = {
  id: string; timestamp: string; vehicleRef: string; loadRef: string; caseId: CaseId;
  detectionState: DetectionState; operatorAction: OperatorAction;
  emiLevel: number; magneticLevel: number; note: string; source: string;
};
const STORAGE_KEY = 'pilot-records-v1';
const SYNTHETIC = 'ILLUSTRATIVE SYNTHETIC DATA — NOT SITE MEASUREMENTS';
const DISCLAIMER = 'CONCEPTUAL SIMULATION — For technical presentation only. Equipment configuration, detection performance and operating response are subject to detailed engineering, controlled tests and site approval.';
const seed: EventRecord[] = [
  { id:'PR-24018', timestamp:'2025-02-14T10:42:00', vehicleRef:'TR-07', loadRef:'LD-1842', caseId:'A', detectionState:'No Detection Indicated', operatorAction:'Clear', emiLevel:18.4, magneticLevel:22.1, note:'Synthetic baseline pass for interface review.', source:'Sample case' },
  { id:'PR-24017', timestamp:'2025-02-14T10:18:00', vehicleRef:'TR-12', loadRef:'LD-1839', caseId:'B', detectionState:'Illustrative Event Flag', operatorAction:'Hold / Inspect', emiLevel:68.2, magneticLevel:54.7, note:'Illustrative event flag; review site-approved response.', source:'Sample case' },
  { id:'PR-24016', timestamp:'2025-02-14T09:56:00', vehicleRef:'TR-04', loadRef:'LD-1833', caseId:'C', detectionState:'Requires Validation / Operator Review', operatorAction:'Escalate', emiLevel:42.6, magneticLevel:71.3, note:'Synthetic ambiguous example requiring human validation.', source:'Sample case' },
  { id:'PR-24015', timestamp:'2025-02-14T09:21:00', vehicleRef:'TR-09', loadRef:'LD-1827', caseId:'A', detectionState:'No Detection Indicated', operatorAction:'Clear', emiLevel:21.7, magneticLevel:19.5, note:'Second synthetic baseline example.', source:'Sample case' },
  { id:'PR-24014', timestamp:'2025-02-14T08:47:00', vehicleRef:'TR-03', loadRef:'LD-1822', caseId:'B', detectionState:'Illustrative Event Flag', operatorAction:'Unassigned', emiLevel:61.8, magneticLevel:59.2, note:'Example record for operator workflow discussion.', source:'Sample case' },
];
const caseLabel: Record<CaseId,string> = { A:'Baseline example', B:'Illustrative flag', C:'Review required', D:'Repeated-run examples' };
const statusClass = (state: DetectionState) => state.startsWith('No Detection') ? 'status-clear' : state.startsWith('Illustrative') ? 'status-flag' : 'status-review';
function readRecords(): EventRecord[] {
  try { const stored = localStorage.getItem(STORAGE_KEY); return stored ? JSON.parse(stored) as EventRecord[] : seed; } catch { return seed; }
}
function Trace({ variant }: { variant: CaseId }) {
  const paths: Record<CaseId,string> = {
    A:'M0 45 C22 42 26 46 42 43 S66 47 82 42 S105 45 122 41 S145 46 162 43 S185 44 200 41 S225 45 240 42 S265 44 280 40 S305 44 320 41 S345 45 360 41 S385 43 400 40',
    B:'M0 48 C20 44 28 47 42 42 S62 46 78 39 S100 43 116 36 S139 44 154 28 S174 13 190 25 S209 44 226 37 S249 42 265 35 S287 43 304 38 S326 42 342 36 S367 42 382 38 S393 40 400 35',
    C:'M0 44 C19 41 30 47 44 39 S65 45 80 37 S104 42 119 40 S143 43 159 31 S176 20 192 34 S215 41 230 35 S252 42 268 28 S286 18 301 30 S322 40 338 35 S362 42 378 32 S392 39 400 34',
    D:'M0 44 C20 41 32 46 48 40 S72 46 88 38 S109 43 126 35 S149 44 164 29 S184 15 199 31 S217 42 235 36 S255 43 274 34 S297 43 312 32 S331 21 347 33 S369 43 386 34 S395 37 400 33'
  };
  return <svg viewBox="0 0 400 72" role="img" aria-label={`Synthetic illustrative signal trace, case ${variant}`} className="trace"><path className="trace-grid" d="M0 18H400M0 36H400M0 54H400M80 0V72M160 0V72M240 0V72M320 0V72"/><path d={paths[variant]} className={`trace-line trace-${variant.toLowerCase()}`} /></svg>;
}
export function CurrentDashboard() {
  const [records, setRecords] = useState<EventRecord[]>(readRecords);
  const [selectedId, setSelectedId] = useState(records[0]?.id ?? '');
  const [query, setQuery] = useState('');
  const [filterCase, setFilterCase] = useState('All cases');
  const [showCreate, setShowCreate] = useState(false);
  const [vehicle, setVehicle] = useState('TR-21');
  const [load, setLoad] = useState('LD-1850');
  const [chosenCase, setChosenCase] = useState<CaseId>('A');
  const [note, setNote] = useState('');
  const [checks, setChecks] = useState([false,false,false]);
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(records)); }, [records]);
  const filtered = useMemo(() => records.filter(r => {
    const haystack = `${r.id} ${r.vehicleRef} ${r.loadRef} ${r.note} ${r.caseId}`.toLowerCase();
    return haystack.includes(query.toLowerCase()) && (filterCase === 'All cases' || r.caseId === filterCase);
  }), [records, query, filterCase]);
  const current = records.find(r => r.id === selectedId) ?? filtered[0] ?? records[0];
  useEffect(() => { if (filtered.length && !filtered.some(r => r.id === selectedId)) setSelectedId(filtered[0].id); }, [filtered, selectedId]);
  const action = (id:string, next:OperatorAction) => setRecords(list => list.map(r => r.id === id ? {...r, operatorAction:next} : r));
  const createPass = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const states: Record<CaseId,DetectionState> = { A:'No Detection Indicated', B:'Illustrative Event Flag', C:'Requires Validation / Operator Review', D:'Requires Validation / Operator Review' };
    const presets: Record<CaseId,[number,number]> = { A:[19.8,23.4], B:[63.7,56.1], C:[46.3,69.8], D:[51.2,62.4] };
    const [emiLevel, magneticLevel] = presets[chosenCase];
    const record:EventRecord = { id:`PR-${Math.floor(Date.now()/1000).toString().slice(-6)}`, timestamp:new Date().toISOString(), vehicleRef:vehicle.trim() || 'TR-XX', loadRef:load.trim() || 'LD-XXXX', caseId:chosenCase, detectionState:states[chosenCase], operatorAction:'Unassigned', emiLevel, magneticLevel, note:note.trim() || 'Simulated pass created for workflow review.', source:'User simulated' };
    setRecords(list => [record,...list]); setSelectedId(record.id); setShowCreate(false); setNote('');
  };
  const exportRecords = (format:'json'|'csv') => {
    const content = format === 'json' ? JSON.stringify(records,null,2) :
      [Object.keys(records[0] ?? {}).join(','), ...records.map(r => Object.values(r).map(v => `"${String(v).replaceAll('"','""')}"`).join(','))].join('\n');
    const blob = new Blob([content], {type:format === 'json' ? 'application/json' : 'text/csv'});
    const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href=url; link.download=`pilot-records.${format}`; link.click(); URL.revokeObjectURL(url);
  };
  return <main className="app-shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark"><Activity size={20}/></div><div><b>PILOT / RECORDS</b><span>ENGINEERING REVIEW</span></div></div>
      <div className="side-label">WORKSPACE</div>
      <div className="side-active"><span className="side-indicator"/><Activity size={16}/> Event review <span className="side-count">{records.length}</span></div>
      <div className="side-label side-gap">REFERENCE</div>
      <div className="side-link"><ClipboardCheck size={16}/> Evaluation checklist</div>
      <div className="side-link"><Archive size={16}/> Record archive</div>
      <div className="sidebar-spacer"/>
      <div className="side-note"><ShieldAlert size={16}/><span>Prototype only<br/><b>Not an operational control system</b></span></div>
      <div className="sidebar-foot"><span className="live-dot"/> LOCAL WORKSPACE <span className="mono">v0.1</span></div>
    </aside>
    <section className="main-area">
      <header className="topbar"><div className="crumb">Pilot evaluation <span>/</span> <b>Event review</b></div><div className="top-right"><span className="synthetic-pill"><i/> SYNTHETIC MODE</span><button className="icon-button" title="About this prototype" onClick={()=>document.getElementById('disclaimer')?.scrollIntoView({behavior:'smooth'})} data-testid="button-about"><CircleHelp size={17}/></button></div></header>
      <div className="content">
        <div className="page-heading fade-in">
          <div><div className="eyebrow">TECHNICAL REVIEW CONSOLE <span className="heading-index">/ 01</span></div><h1>Event review</h1><p>Review a simulated pass, choose a site-approved response, preserve the example.</p></div>
          <button className="primary-button action-btn" onClick={()=>setShowCreate(!showCreate)} data-testid="button-simulate-pass"><FilePlus2 size={16}/>{showCreate?'Close form':'Simulate a pass'}</button>
        </div>
        <div className="disclaimer" id="disclaimer"><ShieldAlert size={17}/><p>{DISCLAIMER}</p></div>
        <div className="warning-strip"><span className="warning-mark">!</span><b>{SYNTHETIC}</b><span>All records and traces shown are invented for interface evaluation.</span></div>
        {showCreate && <form className="create-panel panel fade-in" onSubmit={createPass}>
          <div className="form-title"><div><div className="eyebrow">NEW EXAMPLE RECORD</div><h2>Simulate a pass</h2></div><button type="button" className="icon-button" onClick={()=>setShowCreate(false)} aria-label="Close form"><X size={17}/></button></div>
          <div className="form-grid">
            <label>Vehicle reference<input value={vehicle} onChange={e=>setVehicle(e.target.value)} placeholder="TR-21" data-testid="input-vehicle"/></label>
            <label>Load reference<input value={load} onChange={e=>setLoad(e.target.value)} placeholder="LD-1850" data-testid="input-load"/></label>
            <label>Illustrative case<select value={chosenCase} onChange={e=>setChosenCase(e.target.value as CaseId)} data-testid="select-case"><option value="A">Case A · Baseline</option><option value="B">Case B · Event flag</option><option value="C">Case C · Review required</option><option value="D">Case D · Repeated-run example</option></select></label>
            <label className="form-note">Record note<input value={note} onChange={e=>setNote(e.target.value)} placeholder="Optional context for this example" data-testid="input-note"/></label>
          </div>
          <div className="form-foot"><span>Values are arbitrary synthetic relative units.</span><button className="primary-button action-btn" type="submit" data-testid="button-create-record"><Check size={15}/>Create record</button></div>
        </form>}
        <div className="summary-row">
          <div className="metric panel"><div className="metric-top"><span className="eyebrow">SAVED EXAMPLES</span><Archive size={16}/></div><strong>{records.length.toString().padStart(2,'0')}</strong><small>local records</small></div>
          <div className="metric panel"><div className="metric-top"><span className="eyebrow">REQUIRES REVIEW</span><span className="metric-dot amber"/></div><strong>{records.filter(r=>r.detectionState.startsWith('Requires')).length.toString().padStart(2,'0')}</strong><small>operator judgement needed</small></div>
          <div className="metric panel"><div className="metric-top"><span className="eyebrow">STORAGE</span><span className="storage-icon"><Check size={12}/></span></div><strong className="metric-word">On this device</strong><small>autosaved to local storage</small></div>
        </div>
        <section className="review-layout">
          <div className="records-panel panel">
            <div className="records-head"><div><div className="eyebrow">EVENT RECORDS</div><h2>Recent examples <span>{filtered.length}</span></h2></div><div className="export-group"><button onClick={()=>exportRecords('json')} className="text-button" data-testid="button-export-json"><ArrowDownToLine size={14}/> JSON</button><button onClick={()=>exportRecords('csv')} className="text-button" data-testid="button-export-csv">CSV</button></div></div>
            <div className="toolbar"><div className="search-box"><Search size={15}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search records…" data-testid="input-search"/></div><div className="filter-box"><Filter size={14}/><select value={filterCase} onChange={e=>setFilterCase(e.target.value)} aria-label="Filter by case" data-testid="select-filter"><option>All cases</option><option value="A">Case A</option><option value="B">Case B</option><option value="C">Case C</option><option value="D">Case D</option></select><ChevronDown size={13}/></div></div>
            <div className="records-list">
              {filtered.length ? filtered.map(r=><button key={r.id} onClick={()=>setSelectedId(r.id)} className={`record-row ${current?.id===r.id?'record-selected':''}`} data-testid={`record-row-${r.id}`}>
                <span className={`case-chip case-${r.caseId.toLowerCase()}`}>{r.caseId}</span><span className="record-main"><b>{r.vehicleRef}<span className="record-sep">/</span>{r.loadRef}</b><small>{new Date(r.timestamp).toLocaleString(undefined,{month:'short',day:'2-digit',hour:'2-digit',minute:'2-digit'})} <i>·</i> {r.id}</small></span><span className={`row-status ${statusClass(r.detectionState)}`}>{r.detectionState.startsWith('No Detection')?'No indication':r.detectionState.startsWith('Illustrative')?'Event flag':'Review'}</span><ArrowUpRight className="row-arrow" size={15}/>
              </button>) : <div className="empty-state"><Search size={20}/><b>No matching examples</b><span>Try another search or change the case filter.</span><button className="text-button" onClick={()=>{setQuery('');setFilterCase('All cases')}}>Clear filters</button></div>}
            </div>
            <div className="list-footer"><span>Showing {filtered.length} of {records.length} saved records</span><span>LOCAL • AUDITABLE</span></div>
          </div>
          <div className="detail-column">
            {current ? <section className="detail-card panel">
              <div className="detail-header"><div><div className="eyebrow">SELECTED EXAMPLE <span className="heading-index">/ {current.caseId}</span></div><h2>{current.id}</h2></div><span className={`case-chip case-${current.caseId.toLowerCase()}`}>CASE {current.caseId}</span></div>
              <div className="state-banner"><span className={`state-symbol ${statusClass(current.detectionState)}`}>{current.detectionState.startsWith('No Detection')?'—':current.detectionState.startsWith('Illustrative')?'!':'?'}</span><div><small>ILLUSTRATIVE STATE</small><b>{current.detectionState}</b></div></div>
              <div className="detail-meta"><div><span>VEHICLE</span><b>{current.vehicleRef}</b></div><div><span>LOAD REFERENCE</span><b>{current.loadRef}</b></div><div><span>TIME STAMP</span><b>{new Date(current.timestamp).toLocaleString()}</b></div><div><span>ORIGIN</span><b>{current.source}</b></div></div>
              <div className="trace-section"><div className="trace-title"><span>EXAMPLE SIGNAL TRACE</span><span>ARBITRARY RELATIVE UNITS</span></div><div className="trace-wrap"><Trace variant={current.caseId}/></div><div className="trace-values"><span><i className="trace-key emi"/>EMI <b>{current.emiLevel.toFixed(1)}</b></span><span><i className="trace-key mag"/>MAGNETIC <b>{current.magneticLevel.toFixed(1)}</b></span></div><div className="trace-label">{SYNTHETIC}</div></div>
              <div className="operator-block"><div className="operator-heading"><div><div className="eyebrow">OPERATOR RECORD</div><b>Choose response for this example</b></div><span className="current-action">{current.operatorAction}</span></div><div className="action-options">
                {(['Hold / Inspect','Clear','Escalate'] as OperatorAction[]).map(a=><button key={a} className={`response-button action-btn ${current.operatorAction===a?'response-active':''}`} onClick={()=>action(current.id,a)} data-testid={`button-action-${a.toLowerCase().replaceAll(' ','-').replace('/','and')}`}>{current.operatorAction===a&&<Check size={13}/>} {a}</button>)}
              </div><p className="operator-hint">For workflow demonstration only. Actual response requires site approval.</p></div>
              <div className="record-note"><span>NOTE</span><p>{current.note}</p></div>
            </section> : <div className="panel empty-detail">Select an example record to review.</div>}
            <section className="checklist panel"><div className="check-head"><div><div className="eyebrow">BEFORE EVALUATION</div><h3>Review checklist</h3></div><span className="check-progress">{checks.filter(Boolean).length}/3</span></div>
              {['Confirm test protocol and site approval','Review equipment configuration assumptions','Plan controlled physical testing'].map((item,i)=><label className={`check-row ${checks[i]?'checked':''}`} key={item}><input type="checkbox" checked={checks[i]} onChange={()=>setChecks(c=>c.map((v,j)=>j===i?!v:v))} data-testid={`checkbox-checklist-${i+1}`}/><span className="checkmark"><Check size={12}/></span><span>{item}</span></label>)}
              <div className="check-foot">Physical testing is required for evaluation.</div>
            </section>
          </div>
        </section>
        <section className="case-reference">
          <div className="reference-head"><div><div className="eyebrow">ILLUSTRATIVE REFERENCE SET</div><h2>Four cases, one review workflow</h2></div><p>Examples support discussion only. They do not characterize system performance.</p></div>
          <div className="case-grid">
            {(['A','B','C','D'] as CaseId[]).map((c,i)=><article className="case-tile panel" key={c}><div className="case-tile-top"><span className={`case-chip case-${c.toLowerCase()}`}>CASE {c}</span><span>{['BASELINE','EVENT FLAG','AMBIGUOUS','REPEATED RUNS'][i]}</span></div><h3>{['No detection indicated','Illustrative event flag','Requires validation','Repeated-run examples'][i]}</h3><p>{['Synthetic baseline record for reviewing a no-indication workflow.','Illustrative example for discussing a flagged event and response choices.','Ambiguous synthetic example for operator review and validation discussion.','Repeated-run content is illustrative only; physical testing is required for evaluation.'][i]}</p><div className="case-tile-trace"><Trace variant={c}/></div><div className="trace-label">{SYNTHETIC}</div></article>)}
          </div>
        </section>
        <footer className="page-footer"><span>PILOT RECORDS DASHBOARD <i>•</i> LOCAL PROTOTYPE</span><span>NO AUTOMATIC SHUTDOWN OR OPERATIONAL CONTROL</span></footer>
      </div>
    </section>
  </main>;
}

