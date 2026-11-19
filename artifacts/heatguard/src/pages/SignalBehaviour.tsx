import { useState } from 'react';
import {
  Activity, AlertTriangle, ArrowDown, ArrowRight, AudioLines, CircleHelp,
  ClipboardCheck, Database, GitCompareArrows, Magnet, Radio, ShieldAlert,
  SlidersHorizontal, Waves,
} from 'lucide-react';
import { Link } from 'wouter';
import './signal-behaviour.css';

type CaseId = 'A' | 'B' | 'C' | 'D';

const cases: Record<CaseId, {
  label: string;
  title: string;
  status: string;
  tone: string;
  description: string;
}> = {
  A: {
    label: 'Baseline',
    title: 'Baseline example',
    status: 'No Detection Indicated',
    tone: 'baseline',
    description: 'A synthetic baseline for discussing an observation with no event indication. This is not evidence of absence.',
  },
  B: {
    label: 'Concealed-target narrative',
    title: 'Concealed-target narrative',
    status: 'Illustrative Event Flag',
    tone: 'flag',
    description: 'A narrative example for reviewing a possible event flag. No target geometry, position, depth, or recoverable shape is represented.',
  },
  C: {
    label: 'Interference / ambiguity',
    title: 'Interference / ambiguity',
    status: 'Requires Validation / Operator Review',
    tone: 'review',
    description: 'This ambiguous example is not a model of truck metal, ore, or EMI effects. Those influences need controlled evaluation; review any future observation under site-approved procedures.',
  },
  D: {
    label: 'Five repeated synthetic runs',
    title: 'Repeated-run illustration',
    status: 'Physical evaluation required',
    tone: 'repeat',
    description: 'Five synthetic runs are drawn to support discussion only. Their similarity is not repeatability evidence; physical evaluation is required.',
  },
};

const traces: Record<CaseId, { emi: string[]; magnetic: string[] }> = {
  A: {
    emi: ['M0 78 C24 76 28 81 48 77 S77 80 96 76 S125 79 145 75 S174 80 194 76 S223 78 242 75 S272 80 292 76 S323 78 344 75 S374 79 395 76 S426 78 446 75 S486 78 520 75'],
    magnetic: ['M0 76 C20 73 32 78 53 75 S84 78 104 73 S137 77 158 74 S190 78 211 74 S243 76 265 73 S296 78 318 74 S349 76 370 73 S402 77 424 74 S463 77 484 74 S503 76 520 73'],
  },
  B: {
    emi: ['M0 78 C24 76 29 81 49 77 S77 80 96 75 S122 78 142 72 S167 76 185 60 S207 35 225 54 S248 78 267 72 S296 77 316 69 S343 77 365 72 S393 76 416 70 S449 76 470 71 S498 75 520 72'],
    magnetic: ['M0 76 C22 74 34 79 53 75 S81 77 102 73 S132 77 154 73 S180 75 199 60 S221 43 239 58 S261 77 282 71 S311 76 333 68 S361 76 383 71 S412 75 435 69 S469 76 490 70 S507 73 520 70'],
  },
  C: {
    emi: ['M0 77 C19 74 29 82 47 73 S71 80 91 68 S116 79 136 74 S162 78 183 57 S206 44 224 64 S247 77 267 70 S289 83 310 62 S333 47 351 66 S372 80 393 70 S417 77 438 61 S463 53 480 69 S502 76 520 67'],
    magnetic: ['M0 75 C20 79 31 70 50 77 S78 70 97 79 S123 67 143 76 S169 72 188 62 S210 55 230 72 S251 80 270 65 S293 57 313 76 S338 80 356 63 S379 55 399 75 S422 80 441 65 S465 60 484 76 S505 79 520 66'],
  },
  D: {
    emi: [
      'M0 78 C23 76 31 80 51 76 S81 79 101 73 S132 76 151 63 S174 48 192 65 S216 78 238 72 S269 77 289 69 S320 77 341 72 S373 76 393 70 S425 76 448 71 S490 78 520 74',
      'M0 77 C23 75 31 81 51 77 S81 78 101 74 S132 77 151 64 S174 49 192 66 S216 77 238 73 S269 78 289 70 S320 76 341 73 S373 77 393 71 S425 77 448 72 S490 77 520 75',
      'M0 79 C23 77 31 81 51 75 S81 80 101 74 S132 78 151 62 S174 50 192 64 S216 79 238 71 S269 76 289 68 S320 78 341 71 S373 77 393 69 S425 78 448 70 S490 79 520 73',
      'M0 77 C23 74 31 80 51 76 S81 77 101 72 S132 79 151 65 S174 47 192 66 S216 76 238 74 S269 77 289 71 S320 75 341 74 S373 75 393 72 S425 76 448 73 S490 76 520 74',
      'M0 78 C23 76 31 82 51 77 S81 79 101 75 S132 76 151 64 S174 51 192 67 S216 79 238 72 S269 79 289 69 S320 77 341 72 S373 78 393 70 S425 77 448 71 S490 78 520 74',
    ],
    magnetic: [
      'M0 76 C22 74 31 79 53 75 S83 79 103 73 S134 77 154 70 S179 60 198 71 S221 77 243 72 S273 78 293 69 S324 77 345 71 S377 76 397 70 S429 77 451 71 S493 77 520 73',
      'M0 77 C22 75 31 80 53 76 S83 78 103 74 S134 78 154 71 S179 61 198 72 S221 78 243 73 S273 77 293 70 S324 78 345 72 S377 77 397 71 S429 76 451 72 S493 78 520 74',
      'M0 75 C22 73 31 80 53 74 S83 80 103 72 S134 76 154 69 S179 62 198 70 S221 79 243 71 S273 79 293 68 S324 76 345 70 S377 78 397 69 S429 78 451 70 S493 77 520 72',
      'M0 78 C22 76 31 80 53 77 S83 77 103 75 S134 79 154 72 S179 58 198 73 S221 76 243 74 S273 76 293 71 S324 75 345 74 S377 75 397 72 S429 76 451 73 S493 76 520 75',
      'M0 76 C22 74 31 81 53 75 S83 79 103 73 S134 78 154 70 S179 63 198 72 S221 80 243 72 S273 80 293 69 S324 77 345 71 S377 77 397 70 S429 79 451 71 S493 78 520 73',
    ],
  },
};

function SignalTrace({ caseId, channel }: { caseId: CaseId; channel: 'emi' | 'magnetic' }) {
  const paths = traces[caseId][channel];
  return (
    <svg
      className={`signal-trace signal-trace-${channel}`}
      viewBox="0 0 520 110"
      role="img"
      aria-label={`${channel === 'emi' ? 'EMI' : 'Magnetic and gradiometric'} synthetic relative-unit trace for case ${caseId}; not a mine measurement`}
      preserveAspectRatio="none"
    >
      <path className="signal-grid" d="M0 20H520M0 48H520M0 76H520M104 0V110M208 0V110M312 0V110M416 0V110" />
      {paths.map((path, index) => (
        <path
          key={`${caseId}-${channel}-${index}`}
          className={`signal-curve ${caseId === 'D' ? 'signal-run' : ''}`}
          style={caseId === 'D' ? { opacity: 0.34 + index * 0.12 } : undefined}
          d={path}
        />
      ))}
    </svg>
  );
}

function FlowLink({ vertical = false }: { vertical?: boolean }) {
  return (
    <div className={`signal-flow-link${vertical ? ' signal-flow-link-vertical' : ''}`} aria-hidden="true">
      {vertical ? <ArrowDown size={15} /> : <ArrowRight size={15} />}
      <i />
    </div>
  );
}

export default function SignalBehaviour() {
  const [selectedCase, setSelectedCase] = useState<CaseId>('A');
  const activeCase = cases[selectedCase];

  return (
    <main className="signal-page">
      <header className="signal-page-top">
        <div className="signal-crumb">HEATGUARD <span>/</span> <b>Signal behaviour</b></div>
        <nav className="signal-page-nav" aria-label="Workspace pages">
          <Link href="/">Pass review</Link>
          <Link href="/scenario">Scenario layout</Link>
          <span className="signal-concept-tag"><i /> CONCEPT WALKTHROUGH</span>
        </nav>
      </header>

      <div className="signal-content">
        <div className="signal-heading">
          <div>
            <div className="eyebrow">WP2 · SIGNAL BEHAVIOUR <span className="heading-index">/ 03</span></div>
            <h1>From observation to operator review</h1>
            <p>A conceptual handoff for discussing how different observations might be reviewed.</p>
          </div>
          <div className="signal-heading-mark" aria-hidden="true"><Waves size={22} /><span>WP2</span></div>
        </div>

        <div className="signal-caveat" role="note">
          <ShieldAlert size={17} />
          <p><b>Illustrative synthetic data — not mine measurements.</b> This walkthrough separates a concept from verified system behaviour. No threshold, algorithm, sensor specification, or operational response is defined here.</p>
        </div>

        <section className="signal-flow-panel panel" aria-labelledby="signal-flow-title">
          <div className="signal-section-heading">
            <div>
              <div className="eyebrow">CONCEPTUAL HANDOFF</div>
              <h2 id="signal-flow-title">Observations enter review. They do not control equipment.</h2>
            </div>
            <span className="signal-flow-stamp"><Activity size={13} /> STATIC PATH · MOTION IS DECORATIVE</span>
          </div>

          <div className="signal-flow" aria-label="Conceptual signal path from observation channels through generic processing to operator review">
            <article className="signal-stage signal-input-stage">
              <div className="signal-stage-kicker"><span>01</span><span>OBSERVATION INPUTS</span></div>
              <div className="signal-input-list">
                <div className="signal-input-row"><span className="signal-icon signal-icon-emi"><Radio size={15} /></span><span><b>EMI channel</b><small>Illustrative observation</small></span></div>
                <div className="signal-input-row"><span className="signal-icon signal-icon-mag"><Magnet size={15} /></span><span><b>Magnetic / gradiometric channel</b><small>Illustrative observation</small></span></div>
                <div className="signal-input-row unspecified"><span className="signal-icon"><CircleHelp size={15} /></span><span><b>Complementary input</b><small>Unspecified · no values generated</small></span></div>
              </div>
            </article>
            <FlowLink />
            <article className="signal-stage">
              <div className="signal-stage-kicker"><span>02</span><span>CAPTURE</span></div>
              <div className="signal-stage-icon"><Database size={19} /></div>
              <h3>Conceptual data acquisition</h3>
              <p>Observations are gathered for a review workflow. Acquisition details are not specified.</p>
            </article>
            <FlowLink />
            <article className="signal-stage">
              <div className="signal-stage-kicker"><span>03</span><span>PREPARE</span></div>
              <div className="signal-stage-icon"><SlidersHorizontal size={19} /></div>
              <h3>Generic signal conditioning</h3>
              <p>A placeholder stage only. No filter, calibration, or processing method is selected.</p>
            </article>
            <FlowLink />
            <article className="signal-stage">
              <div className="signal-stage-kicker"><span>04</span><span>COMPARE</span></div>
              <div className="signal-stage-icon signal-stage-icon-amber"><GitCompareArrows size={19} /></div>
              <h3>Illustrative comparison / event flag</h3>
              <p>Example comparison for discussion; no threshold or algorithm is specified.</p>
            </article>
            <FlowLink />
            <article className="signal-stage signal-review-stage">
              <div className="signal-stage-kicker"><span>05</span><span>HUMAN REVIEW</span></div>
              <div className="signal-stage-icon signal-stage-icon-review"><ClipboardCheck size={19} /></div>
              <h3>Operator review</h3>
              <p>Review under site-approved procedures. This concept has no automatic control path.</p>
            </article>
          </div>
          <div className="signal-flow-foot"><span><i className="signal-flow-key" />Conceptual information path</span><span>NO AUTOMATIC OPERATIONAL CONTROL</span></div>
        </section>

        <section className="signal-case-panel panel" aria-labelledby="signal-case-title">
          <div className="signal-section-heading signal-case-heading">
            <div>
              <div className="eyebrow">SAMPLE CASES · SELECT TO INSPECT</div>
              <h2 id="signal-case-title">Four meanings, one review discipline</h2>
              <p>Changing the case changes the illustrative traces and interpretation only.</p>
            </div>
            <span className={`signal-selected-state ${activeCase.tone}`}>{activeCase.status}</span>
          </div>

          <div className="signal-case-layout">
            <div className="signal-case-selector" role="group" aria-label="Select an illustrative signal case">
              {(Object.keys(cases) as CaseId[]).map((caseId) => {
                const item = cases[caseId];
                return (
                  <button
                    key={caseId}
                    type="button"
                    className={`signal-case-button ${item.tone}${selectedCase === caseId ? ' selected' : ''}`}
                    aria-pressed={selectedCase === caseId}
                    onClick={() => setSelectedCase(caseId)}
                    data-testid={`button-signal-case-${caseId.toLowerCase()}`}
                  >
                    <span className={`signal-case-letter case-${caseId.toLowerCase()}`}>{caseId}</span>
                    <span className="signal-case-button-copy"><b>{item.label}</b><small>{item.status}</small></span>
                    <ArrowRight size={14} className="signal-case-arrow" />
                  </button>
                );
              })}
            </div>

            <div className={`signal-case-detail ${activeCase.tone}`} aria-live="polite" aria-atomic="true">
              <div className="signal-detail-top">
                <div><span className={`signal-case-letter case-${selectedCase.toLowerCase()}`}>CASE {selectedCase}</span><h3>{activeCase.title}</h3></div>
                <span className={`signal-state-chip ${activeCase.tone}`}>{activeCase.status}</span>
              </div>
              <p className="signal-case-description">{activeCase.description}</p>

              <div className="signal-charts">
                <div className="signal-chart">
                  <div className="signal-chart-heading"><span><Radio size={13} /> EMI channel</span><small>SYNTHETIC · RELATIVE UNITS</small></div>
                  <div className="signal-chart-frame"><SignalTrace caseId={selectedCase} channel="emi" /></div>
                  <div className="signal-chart-axis"><span>Illustrative sequence</span><span>Relative response · unscaled</span></div>
                </div>
                <div className="signal-chart">
                  <div className="signal-chart-heading"><span><Magnet size={13} /> Magnetic / gradiometric</span><small>SYNTHETIC · RELATIVE UNITS</small></div>
                  <div className="signal-chart-frame"><SignalTrace caseId={selectedCase} channel="magnetic" /></div>
                  <div className="signal-chart-axis"><span>Illustrative sequence</span><span>Relative response · unscaled</span></div>
                </div>
              </div>
              <div className="signal-data-note"><AudioLines size={14} /><span>Traces are invented shapes for interface discussion; they are not mine measurements or evidence of system performance.</span></div>
            </div>
          </div>
        </section>

        <section className="signal-reading-note" aria-label="WP2 interpretation boundary">
          <div className="signal-reading-icon"><AlertTriangle size={17} /></div>
          <div><div className="eyebrow">INTERPRETATION BOUNDARY</div><p>Sample labels describe discussion scenarios, not verified detection outcomes. Any future interpretation, validation, or response remains subject to engineering work, physical evaluation, and site-approved procedures.</p></div>
          <div className="signal-reading-tag">WP2 · CONCEPT ONLY</div>
        </section>

        <footer className="signal-footer"><span>HEATGUARD <i>·</i> SIGNAL BEHAVIOUR</span><span>SYNTHETIC EXAMPLES ONLY · NO CONTROL PATH</span></footer>
      </div>
    </main>
  );
}
