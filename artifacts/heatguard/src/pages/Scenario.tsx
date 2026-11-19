import { useState } from 'react';
import { Link } from 'wouter';
import {
  Activity, AlertTriangle, ArrowRight, Check, ChevronRight, CircleHelp,
  Factory, GitBranch, Map, Radio, ShieldAlert, Truck, Waves, MoveRight,
} from 'lucide-react';

type SensorCount = 2 | 3;
type ViewMode = 'process' | 'isometric';
type VehicleProfile = 'land-cruiser' | 'dump-truck';
type Step = 0 | 1 | 2 | 3 | 4;

const steps = [
  { title: 'Approach & discharge', detail: 'A delivery vehicle follows the conceptual mine approach road to the receiving hopper and unloads. The illustrative vehicle path ends at the hopper; sensing does not take place in the vehicle.' },
  { title: 'S1 initial indication', detail: 'After discharge, material moves onto the conveyor. S1 represents an initial indication of a possible item travelling with the material, not a confirmed event.' },
  { title: 'S2 confirmation', detail: 'S2 supplies a second observation downstream. The optional S3 arrangement adds another observation point; neither sensor count nor role is selected for a real installation.' },
  { title: 'Estimate interval & timing', detail: 'A controller concept would combine observations with real conveyor movement, distance, and response inputs to estimate an affected-material interval and arrival window. Both boundaries remain uncertain here.' },
  { title: 'Hold affected material; continue feed', detail: 'A generic diverter immediately before the crusher illustrates a possible hold / reject route. After the estimated affected interval passes, unaffected material continues on the normal crusher-feed path; no automatic crusher shutdown is shown.' },
];

function VehicleSymbol({ profile, className = '' }: { profile: VehicleProfile; className?: string }) {
  return <g className={`vehicle-symbol ${profile} ${className}`} aria-label={profile === 'land-cruiser' ? 'Illustrative Land Cruiser profile' : 'Illustrative dump-truck profile'}>
    {profile === 'land-cruiser' ? <>
      <path d="M-38 3l5-14q2-5 9-6h29q7 1 12 7l10 3 8 7v10h-73z" fill="#71897b" stroke="#435c50" strokeWidth="2"/>
      <path d="M-18-14h23q5 1 9 6h-36z" fill="#dce2d7" stroke="#526c5f" strokeWidth="1.5"/>
      <path d="M8-13v9m-25-10v10" stroke="#526c5f" strokeWidth="1.5"/>
      <circle cx="-22" cy="10" r="7" fill="#e9e5d8" stroke="#45574d" strokeWidth="3"/><circle cx="23" cy="10" r="7" fill="#e9e5d8" stroke="#45574d" strokeWidth="3"/>
    </> : <>
      <path d="M-43-5h42v17h-42z" fill="#b48b49" stroke="#745c35" strokeWidth="2"/>
      <path d="M-39-9h35v5h-35z" fill="#d6b87e" stroke="#745c35" strokeWidth="1.5"/>
      <path d="M-1 0h19l10 7v10H-1z" fill="#71897b" stroke="#435c50" strokeWidth="2"/>
      <path d="M7 2h9l6 5H7z" fill="#dce2d7" stroke="#526c5f" strokeWidth="1"/>
      <circle cx="-27" cy="14" r="7" fill="#e9e5d8" stroke="#45574d" strokeWidth="3"/><circle cx="15" cy="14" r="7" fill="#e9e5d8" stroke="#45574d" strokeWidth="3"/>
    </>}
  </g>;
}

function DiagramDefs() {
  return <defs>
    <pattern id="wp1-ore-hatch" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="9" height="9" fill="#f0e3c7"/><path d="M0 0v9" stroke="#b58234" strokeWidth="2" opacity=".55"/>
    </pattern>
    <pattern id="wp1-zone-hatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="10" height="10" fill="#f5ecd8" fillOpacity=".6"/><path d="M0 0v10" stroke="#c19a55" strokeWidth="2" opacity=".42"/>
    </pattern>
    <marker id="wp1-flow-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0 0L9 4.5 0 9z" fill="#587765"/></marker>
    <marker id="wp1-road-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0L8 4 0 8z" fill="#718778"/></marker>
    <marker id="wp1-reject-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0L8 4 0 8z" fill="#a87931"/></marker>
  </defs>;
}

function ProcessDrawing({ sensors, profile, step }: { sensors: SensorCount; profile: VehicleProfile; step: Step }) {
  const active = (n: Step) => step === n ? ' part-active' : '';
  return <svg className="conveyor-svg site-svg process-drawing" viewBox="0 0 1180 560" role="img" aria-label="Conceptual site and conveyor process schematic: approach road to hopper, truck path ending at discharge, conveyor-only sensing after discharge, and separate reject and normal crusher routes">
    <DiagramDefs/>
    <rect width="1180" height="560" fill="#f3f0e6"/>
    <path d="M0 456C180 427 295 468 466 445s346-29 714 1v114H0z" fill="#e8e5d8"/>
    <path d="M24 70c140-42 215-20 329 5m-285 27c92-34 163-26 235-8m-191 377c145-45 274-34 400-5m420-379c80-24 156-22 222-5m-160 49c75-18 139-16 204 1" fill="none" stroke="#ddd9ca" strokeWidth="2"/>
    <text x="42" y="40" className="svg-tiny drawing-overline">CONCEPTUAL MINE CONTEXT + PROCESS · RELATIVE LOCATIONS ONLY</text>
    <g className={`diagram-part${active(0)}`} data-part="road">
      <path d="M8 434C88 424 117 400 151 365s41-71 78-99" fill="none" stroke="#c8c4b6" strokeWidth="76" strokeLinecap="round"/>
      <path d="M8 434C88 424 117 400 151 365s41-71 78-99" fill="none" stroke="#f1eee5" strokeWidth="64" strokeLinecap="round"/>
      <path d="M12 434C88 424 117 400 151 365s41-71 78-99" fill="none" stroke="#a6ad9f" strokeWidth="2" strokeDasharray="11 12" markerEnd="url(#wp1-road-arrow)"/>
      <text x="30" y="500" className="svg-label">MINE APPROACH ROAD</text>
      <text x="30" y="516" className="svg-sub">illustrative access route</text>
      <path d="M199 273h62v33h-62z" fill="#d7ddd2" stroke="#75877a" strokeWidth="2"/>
      <path d="M203 279h54v20h-54z" fill="#edf0e7" stroke="#a4ad9e"/>
      <text x="229" y="253" textAnchor="middle" className="svg-label">RECEIVING HOPPER</text>
      <text x="229" y="322" textAnchor="middle" className="svg-sub">fixed equipment</text>
      <path d="M255 299l45 31" stroke="#879588" strokeWidth="5"/>
      <g transform={`translate(137 368) scale(${profile === 'dump-truck' ? 1.13 : .82})`}>
        <VehicleSymbol profile={profile}/>
      </g>
      <path d="M177 341l30-29" stroke="#637e6c" strokeWidth="2" strokeDasharray="5 5" markerEnd="url(#wp1-road-arrow)"/>
      <text x="75" y="317" className="svg-tiny">ILLUSTRATIVE VEHICLE · SYMBOL ONLY</text>
      <text x="87" y="334" className="svg-tiny">path ends at hopper</text>
      <path d="M213 309v31" stroke="#9e7b42" strokeWidth="2" strokeDasharray="3 4" markerEnd="url(#wp1-flow-arrow)"/>
      <text x="229" y="354" textAnchor="middle" className="svg-tiny">DISCHARGE</text>
    </g>
    <g className={`diagram-part${active(0)}`} data-part="belt">
      <path d="M297 330H984l42 26H326z" fill="#657d6c" stroke="#455d50" strokeWidth="2"/>
      <path d="M326 356h700v19H326z" fill="#d4d2c5" stroke="#9b9c8d" strokeWidth="2"/>
      <path d="M352 375v46m130-46v46m139-46v46m140-46v46m137-46v46" stroke="#879087" strokeWidth="8"/>
      <path d="M339 340h648" fill="none" stroke="#dce4d8" strokeWidth="2" strokeDasharray="10 8" markerEnd="url(#wp1-flow-arrow)"/>
      <g fill="#b6a078" stroke="#8e7954" strokeWidth="1">{[[355,329],[382,336],[416,328],[450,337],[489,328],[529,336],[570,328],[610,337],[651,328],[692,336],[735,328],[777,337],[817,328],[858,336],[900,328],[945,336]].map(([x,y],i)=><path key={i} d={`M${x} ${y}l8 -5 9 3 3 6 -8 4 -10 -2z`}/>)}</g>
      <text x="578" y="405" textAnchor="middle" className="svg-label">CONVEYOR / MATERIAL PATH →</text>
      <text x="578" y="421" textAnchor="middle" className="svg-sub">sensing begins only after discharge</text>
      <g className={`diagram-part movement-input${active(3)}`} data-part="movement">
        <rect x="614" y="454" width="212" height="44" rx="5" fill="#e6e9df" stroke="#829286" strokeWidth="1.5"/>
        <path d="M629 468h32m-32 8h54m-54 8h39" stroke="#94a094" strokeWidth="2"/>
        <text x="699" y="472" className="svg-label">MOVEMENT / SPEED INPUT</text>
        <text x="699" y="488" className="svg-tiny">GENERIC PLACEHOLDER · TYPE NOT SELECTED</text>
      </g>
    </g>
    <g className={`diagram-part sensor-zone${active(1)}${active(2)}`} data-part="sensor-zone">
      <rect x="411" y="198" width="348" height="144" rx="7" fill="url(#wp1-zone-hatch)" stroke="#b58a43" strokeWidth="2" strokeDasharray="7 5"/>
      <text x="585" y="189" textAnchor="middle" className="svg-label">PROPOSED SENSOR ZONE · CONVEYOR ONLY</text>
      <text x="585" y="215" textAnchor="middle" className="svg-tiny">SENSING AFTER DISCHARGE · NO TRUCK SENSING</text>
    </g>
    <g className={`diagram-part${active(1)}`} data-part="s1">
      <path d="M458 330v-71h34v71m-39-71h44" fill="none" stroke="#b27b29" strokeWidth="5"/>
      <circle cx="475" cy="318" r="8" fill="#f5e8ca" stroke="#b27b29" strokeWidth="3"/>
      <rect x="433" y="227" width="84" height="27" rx="4" fill="#f5ecd9" stroke="#c7a96a"/>
      <text x="475" y="245" textAnchor="middle" className="svg-label">S1 · INITIAL</text>
    </g>
    <g className={`diagram-part${active(2)}`} data-part="s2">
      <path d="M583 330v-71h34v71m-39-71h44" fill="none" stroke="#668777" strokeWidth="5"/>
      <circle cx="600" cy="318" r="8" fill="#e5eee7" stroke="#668777" strokeWidth="3"/>
      <rect x="558" y="227" width="84" height="27" rx="4" fill="#e8eee6" stroke="#9aaf9e"/>
      <text x="600" y="245" textAnchor="middle" className="svg-label">S2 · OBSERVE</text>
    </g>
    {sensors === 3 && <g className={`diagram-part${active(2)}`} data-part="s3">
      <path d="M704 330v-71h34v71m-39-71h44" fill="none" stroke="#668777" strokeWidth="5" strokeDasharray="8 3"/>
      <circle cx="721" cy="318" r="8" fill="#e5eee7" stroke="#668777" strokeWidth="3"/>
      <rect x="679" y="227" width="84" height="27" rx="4" fill="#e8eee6" stroke="#9aaf9e"/>
      <text x="721" y="245" textAnchor="middle" className="svg-label">S3 · OPTIONAL</text>
    </g>}
    <g className={`diagram-part${active(3)}`} data-part="controller">
      <rect x="781" y="101" width="215" height="88" rx="5" fill="#e4e8df" stroke="#75877b" strokeWidth="2"/>
      <rect x="795" y="116" width="33" height="29" rx="2" fill="#f5f2e8" stroke="#a8b1a6"/>
      <path d="M837 119h145m-145 9h115m-115 9h132" stroke="#809187" strokeWidth="2"/>
      <text x="888" y="92" textAnchor="middle" className="svg-label">CONTROLLER / TIMING ESTIMATE</text>
      <text x="888" y="162" textAnchor="middle" className="svg-tiny">observations + real movement / distance / response</text>
      <path d="M475 226v-20h306m-181 20v-21m121 21v-21m52 0h29v-17" fill="none" stroke="#89988b" strokeWidth="2" strokeDasharray="4 4"/>
      <rect x="782" y="206" width="205" height="45" rx="4" fill="#f6efdf" stroke="#d2bf94"/>
      <text x="884" y="222" textAnchor="middle" className="svg-tiny">AFFECTED MATERIAL + ARRIVAL WINDOW</text>
      <text x="884" y="239" textAnchor="middle" className="svg-tiny">ESTIMATE ONLY · INPUTS NOT SPECIFIED</text>
    </g>
    <g className={`diagram-part${active(3)}${active(4)}`} data-part="segment">
      <path d="M811 329h89l15 27h-90z" fill="url(#wp1-ore-hatch)" stroke="#b88332" strokeWidth="2" strokeDasharray="6 4"/>
      <path d="M810 316v-12m106 31v-12" stroke="#b88332" strokeWidth="2" strokeDasharray="3 3"/>
      <text x="862" y="289" textAnchor="middle" className="svg-label">AFFECTED INTERVAL</text>
      <text x="862" y="305" textAnchor="middle" className="svg-tiny">approximate · boundaries uncertain</text>
      <path d="M810 314h107" stroke="#b88332" strokeWidth="1" strokeDasharray="2 5"/>
    </g>
    <g className={`diagram-part${active(4)}`} data-part="diverter">
      <path d="M932 329l23-29 29 25-18 22z" fill="#c69b50" stroke="#8c672c" strokeWidth="3"/>
      <path d="M952 346l-36 70 51 19 46-72" fill="#e7d8b8" stroke="#927b55" strokeWidth="3"/>
      <path d="M952 357l-31 55" stroke="#a87931" strokeWidth="3" markerEnd="url(#wp1-reject-arrow)"/>
      <path d="M911 416l41 16 46-13v35l-45 13-42-17z" fill="#d7c7a7" stroke="#927b55" strokeWidth="2"/>
      <text x="929" y="489" textAnchor="middle" className="svg-label">HOLD / REJECT</text>
      <text x="929" y="505" textAnchor="middle" className="svg-tiny">GENERIC CHUTE PLACEHOLDER</text>
    </g>
    <g className={`diagram-part${active(4)}`} data-part="crusher">
      <path d="M1032 269h95v102h-95z" fill="#d8ddd2" stroke="#64776a" strokeWidth="3"/>
      <path d="M1047 286h65v57h-65z" fill="#eef0e8" stroke="#9ba69a" strokeWidth="2"/>
      <path d="M1056 294l22 21-22 20m45-41l-22 21 22 20" fill="none" stroke="#758579" strokeWidth="3"/>
      <path d="M982 341h49" fill="none" stroke="#587765" strokeWidth="3" markerEnd="url(#wp1-flow-arrow)"/>
      <text x="1079" y="250" textAnchor="middle" className="svg-label">CRUSHER</text>
      <text x="1079" y="390" textAnchor="middle" className="svg-sub">unaffected feed continues</text>
    </g>
    <g className="diagram-part" data-part="disclaimer">
      <rect x="28" y="68" width="294" height="27" rx="4" fill="#e8eee6" stroke="#cbd5ca"/>
      <circle cx="44" cy="81" r="5" fill="#668777"/>
      <text x="57" y="85" className="svg-tiny">TRUCK TO HOPPER · SENSING BEGINS DOWNSTREAM</text>
    </g>
  </svg>;
}

function IsometricDrawing({ sensors, profile, step }: { sensors: SensorCount; profile: VehicleProfile; step: Step }) {
  const active = (n: Step) => step === n ? ' part-active' : '';
  return <svg className="conveyor-svg site-svg isometric-drawing" viewBox="0 0 1180 560" role="img" aria-label="Distinct isometric-style conceptual mine and conveyor illustration with access road, delivery vehicle at hopper, conveyor sensing structures, controller, diverter, reject chute, and crusher">
    <DiagramDefs/>
    <rect width="1180" height="560" fill="#f1eee4"/>
    <path d="M0 477l278-42 165 48 300-47 198 37 239-32v119H0z" fill="#e5e2d5"/>
    <path d="M36 106l160-30 121 31-158 34zM731 88l190-39 120 29-189 42zM492 446l142-28 110 25-142 30z" fill="none" stroke="#d8d4c6" strokeWidth="2"/>
    <text x="40" y="38" className="svg-tiny drawing-overline">ISOMETRIC SITE STUDY · RELATIVE LOCATIONS · NOT TO SCALE</text>
    <g className={`diagram-part${active(0)}`} data-part="road">
      <path d="M35 433l108-93 93 28-109 98z" fill="#c7c5b9" stroke="#a09f94" strokeWidth="2"/>
      <path d="M44 432l101-85 69 21-100 86z" fill="#edeae0"/>
      <path d="M61 427l83-70m-18 90l81-69" stroke="#a5aa9e" strokeWidth="2" strokeDasharray="8 8"/>
      <text x="40" y="510" className="svg-label">MINE APPROACH</text>
      <text x="40" y="526" className="svg-sub">illustrative road to receiving area</text>
      <g transform={`translate(155 402) scale(${profile === 'dump-truck' ? .9 : .69})`}>
        <path d="M-38 0l20-19 45 3 17 19-16 13h-54z" fill="#738a7b" stroke="#425a4e" strokeWidth="2"/>
        <path d="M-10-14h29l12 14H-24z" fill="#dce2d7" stroke="#526c5f" strokeWidth="1.5"/>
        {profile === 'dump-truck' && <path d="M-49-22l41-9 9 20-43 9z" fill="#b38a48" stroke="#745c35" strokeWidth="2"/>}
        <circle cx="-23" cy="13" r="8" fill="#e9e5d8" stroke="#45574d" strokeWidth="3"/><circle cx="29" cy="13" r="8" fill="#e9e5d8" stroke="#45574d" strokeWidth="3"/>
      </g>
      <path d="M190 368l91-73" fill="none" stroke="#718778" strokeWidth="3" strokeDasharray="6 5" markerEnd="url(#wp1-road-arrow)"/>
      <text x="120" y="331" className="svg-tiny">ILLUSTRATIVE VEHICLE · PATH TO HOPPER</text>
      <path d="M250 271l88-23 56 32-89 26z" fill="#aab5a8" stroke="#6f8275" strokeWidth="2"/>
      <path d="M305 306v44l-31-50v-13z" fill="#c8d0c4" stroke="#77897c" strokeWidth="2"/>
      <path d="M305 350l31-9v-43l-31 8z" fill="#a0ad9f" stroke="#77897c" strokeWidth="2"/>
      <text x="306" y="222" textAnchor="middle" className="svg-label">RECEIVING HOPPER</text>
      <text x="306" y="238" textAnchor="middle" className="svg-sub">fixed equipment</text>
      <path d="M333 304l60 32" stroke="#8b9589" strokeWidth="8"/>
      <path d="M343 309l47 26" stroke="#c29c58" strokeWidth="2" strokeDasharray="3 4" markerEnd="url(#wp1-flow-arrow)"/>
      <text x="367" y="363" className="svg-tiny">DISCHARGE</text>
    </g>
    <g className={`diagram-part sensor-zone${active(1)}${active(2)}`} data-part="sensor-zone">
      <path d="M392 250l461-111 115 61-460 116z" fill="url(#wp1-zone-hatch)" fillOpacity=".78" stroke="#b58a43" strokeWidth="2" strokeDasharray="8 5"/>
      <text x="620" y="139" textAnchor="middle" className="svg-label">PROPOSED SENSOR ZONE · ON CONVEYOR</text>
    </g>
    <g className={`diagram-part${active(0)}`} data-part="belt">
      <path d="M383 298l480-117 113 62-481 121z" fill="#637b6a" stroke="#40594c" strokeWidth="3"/>
      <path d="M495 364v68l-18-10v-63m180 18v61l-18-10v-56m177-11v62l-18-10v-57" fill="#b7b9ac" stroke="#858d81" strokeWidth="2"/>
      <path d="M384 298l111 66v18l-111-65z" fill="#4c6455" stroke="#40594c" strokeWidth="2"/>
      <path d="M406 300l450-110" fill="none" stroke="#d9e1d5" strokeWidth="2" strokeDasharray="10 8" markerEnd="url(#wp1-flow-arrow)"/>
      <g fill="#b6a078" stroke="#8e7954" strokeWidth="1">{[[442,285],[488,278],[535,269],[579,261],[625,250],[671,240],[717,231],[763,220],[809,210],[850,201]].map(([x,y],i)=><path key={i} d={`M${x} ${y}l8 -5 9 3 3 6 -8 4 -10 -2z`}/>)}</g>
      <text x="599" y="408" textAnchor="middle" className="svg-label">CONVEYOR / MATERIAL PATH</text>
      <text x="599" y="424" textAnchor="middle" className="svg-sub">sensor observations downstream of discharge</text>
    </g>
    {[
      { key: 's1', x: 500, label: 'S1 · INITIAL', step: 1, color: '#b27b29' },
      { key: 's2', x: 639, label: 'S2 · OBSERVE', step: 2, color: '#668777' },
      ...(sensors === 3 ? [{ key: 's3', x: 757, label: 'S3 · OPTIONAL', step: 2, color: '#668777' }] : []),
    ].map(sensor => <g key={sensor.key} className={`diagram-part${active(sensor.step as Step)}`} data-part={sensor.key}>
      <path d={`M${sensor.x-14} 265v-88l25-6v88m-31-81l37-9`} fill="none" stroke={sensor.color} strokeWidth="5"/>
      <circle cx={sensor.x-2} cy="252" r="8" fill="#f5ecd9" stroke={sensor.color} strokeWidth="3"/>
      <rect x={sensor.x-48} y="153" width="96" height="26" rx="4" fill="#f5ecd9" stroke={sensor.color}/>
      <text x={sensor.x} y="171" textAnchor="middle" className="svg-label">{sensor.label}</text>
    </g>)}
    <g className={`diagram-part${active(3)}`} data-part="controller">
      <path d="M555 73l151-35 57 30-151 37z" fill="#dce2d8" stroke="#6e8275" strokeWidth="2"/>
      <path d="M555 73v57l57 33v-58z" fill="#bcc7bb" stroke="#6e8275" strokeWidth="2"/>
      <path d="M612 105l151-37v58l-151 37z" fill="#aab8aa" stroke="#6e8275" strokeWidth="2"/>
      <path d="M572 84l24-6v15l-24 6z" fill="#f2f0e6" stroke="#8e9b8f"/>
      <path d="M608 78l116-29m-116 39l91-23" stroke="#849487" strokeWidth="2"/>
      <text x="648" y="28" textAnchor="middle" className="svg-label">CONTROLLER / TIMING ESTIMATE</text>
      <text x="648" y="174" textAnchor="middle" className="svg-tiny">generic movement / speed input placeholder</text>
    </g>
    <g className={`diagram-part${active(3)}${active(4)}`} data-part="segment">
      <path d="M781 205l68-17 34 19-68 18z" fill="url(#wp1-ore-hatch)" stroke="#b88332" strokeWidth="2" strokeDasharray="6 4"/>
      <path d="M781 198l-3-18m105 14l5-18" stroke="#b88332" strokeWidth="2" strokeDasharray="3 3"/>
      <text x="835" y="166" textAnchor="middle" className="svg-label">APPROX. AFFECTED INTERVAL</text>
      <text x="835" y="181" textAnchor="middle" className="svg-tiny">uncertain boundaries · estimate only</text>
    </g>
    <g className={`diagram-part${active(4)}`} data-part="diverter">
      <path d="M903 225l39-34 41 23-41 36z" fill="#c69b50" stroke="#8c672c" strokeWidth="3"/>
      <path d="M922 242l-20 91 45 19 34-100" fill="#e7d8b8" stroke="#927b55" strokeWidth="3"/>
      <path d="M924 256l-15 66" stroke="#a87931" strokeWidth="3" markerEnd="url(#wp1-reject-arrow)"/>
      <path d="M887 332l36 17 45-15 3 34-46 17-37-19z" fill="#d7c7a7" stroke="#927b55" strokeWidth="2"/>
      <text x="929" y="406" textAnchor="middle" className="svg-label">HOLD / REJECT</text>
      <text x="929" y="421" textAnchor="middle" className="svg-tiny">GENERIC CHUTE</text>
    </g>
    <g className={`diagram-part${active(4)}`} data-part="crusher">
      <path d="M1010 149l77-20 56 31-77 22z" fill="#e0e4d9" stroke="#65786c" strokeWidth="3"/>
      <path d="M1010 149v115l56 33V182z" fill="#c1cbbf" stroke="#65786c" strokeWidth="3"/>
      <path d="M1066 182l77-22v116l-77 21z" fill="#aab8aa" stroke="#65786c" strokeWidth="3"/>
      <path d="M1027 170l22 13v44l-22-13z" fill="#eff0e8" stroke="#879488"/>
      <path d="M1033 178l11 16-11 7m26 5l-13 5 13 19" fill="none" stroke="#78897c" strokeWidth="3"/>
      <path d="M977 245l34-8" stroke="#587765" strokeWidth="4" markerEnd="url(#wp1-flow-arrow)"/>
      <text x="1074" y="119" textAnchor="middle" className="svg-label">CRUSHER</text>
      <text x="1075" y="324" textAnchor="middle" className="svg-sub">unaffected feed continues</text>
    </g>
    <g className={`diagram-part movement-input${active(3)}`} data-part="movement">
      <rect x="485" y="466" width="261" height="42" rx="4" fill="#e6e9df" stroke="#829286"/>
      <text x="615" y="483" textAnchor="middle" className="svg-label">MOVEMENT / SPEED · INPUT PLACEHOLDER</text>
      <text x="615" y="498" textAnchor="middle" className="svg-tiny">NO DEVICE TYPE OR VALUE SELECTED</text>
    </g>
    <g className="diagram-part">
      <rect x="40" y="66" width="303" height="26" rx="4" fill="#e8eee6" stroke="#cbd5ca"/>
      <text x="54" y="83" className="svg-tiny">SENSING STARTS ON CONVEYOR AFTER DISCHARGE</text>
    </g>
  </svg>;
}

export default function Scenario() {
  const [sensors, setSensors] = useState<SensorCount>(2);
  const [view, setView] = useState<ViewMode>('process');
  const [profile, setProfile] = useState<VehicleProfile>('dump-truck');
  const [step, setStep] = useState<Step>(0);
  const stepBack = () => setStep(s => Math.max(0, s - 1) as Step);
  const stepForward = () => setStep(s => Math.min(4, s + 1) as Step);
  const Diagram = view === 'process' ? ProcessDrawing : IsometricDrawing;
  return <main className="app-shell scenario-shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark"><Activity size={20}/></div><div><b>HEATGUARD</b><span>ORE PASS SIMULATION</span></div></div>
      <div className="side-label">WORKSPACE</div>
      <Link href="/" className="side-link scenario-nav" data-testid="link-pass-review"><Activity size={16}/> Pass review <ChevronRight size={13}/></Link>
      <Link href="/scenario" className="side-active scenario-nav" data-testid="link-scenario"><Map size={16}/> Scenario layout <span className="side-count">WP1</span></Link>
      <Link href="/signals" className="side-link scenario-nav" data-testid="link-signal-behaviour"><Waves size={16}/> Signal behaviour <ChevronRight size={13}/></Link>
      <div className="side-label">REFERENCE</div><div className="side-link"><ShieldAlert size={16}/> Concept basis</div>
      <div className="sidebar-spacer"/><div className="side-note"><ShieldAlert size={16}/><span>Prototype only<br/><b>No operational control path</b></span></div>
      <div className="sidebar-foot"><span className="live-dot"/> LOCAL WORKSPACE <span className="mono">v0.1</span></div>
    </aside>
    <section className="main-area">
      <header className="topbar"><div className="crumb">HEATGUARD <span>/</span> <b>Scenario &amp; system layout</b></div><div className="top-right"><span className="synthetic-pill"><i/> CONCEPT ONLY</span><Link href="/" className="scenario-top-link" data-testid="link-top-pass-review">Pass review <ArrowRight size={14}/></Link><Link href="/signals" className="scenario-top-link" data-testid="link-top-signals">Signal behaviour <Waves size={14}/></Link><button className="icon-button" title="Concept basis" aria-label="Concept basis" onClick={()=>document.getElementById('basis')?.scrollIntoView({behavior:'smooth'})} data-testid="button-scenario-about"><CircleHelp size={17}/></button></div></header>
      <nav className="mobile-workspace-nav" aria-label="Workspace pages"><Link href="/" data-testid="link-mobile-pass-review"><Activity size={14}/>Pass review</Link><Link href="/scenario" className="mobile-workspace-active" data-testid="link-mobile-scenario"><Map size={14}/>Scenario layout</Link><Link href="/signals" data-testid="link-mobile-signals"><Waves size={14}/>Signal behaviour</Link></nav>
      <div className="content scenario-content">
        <div className="page-heading fade-in"><div><div className="eyebrow">WP1 · MINE CONTEXT + CONVEYOR LAYOUT <span className="heading-index">/ 02</span></div><h1>From approach road to crusher</h1><p>Follow delivery to the hopper, then trace the proposed conveyor-only sensing sequence.</p></div><div className="concept-state" data-testid="status-concept-only"><span/><b>CONCEPTUAL · NOT FOR CONSTRUCTION</b></div></div>
        <div className="scenario-caveat"><AlertTriangle size={17}/><p><b>Discussion concept only.</b> The generic site plan is not surveyed or to scale. No sensor is shown in the truck. Geometry, sensor roles, estimated material boundaries, timing, and diverter / chute require engineering review and controlled tests. This is not an operating or safety claim.</p></div>
        <section className="scenario-panel panel">
          <div className="scenario-toolbar"><div><div className="eyebrow">SITE CONTEXT / MATERIAL FLOW</div><h2>Delivery ends at the hopper. Sensing starts on the belt.</h2><p>Vehicle profile changes only the illustrative vehicle symbol and scale; both routes end at the receiving hopper.</p></div>
            <div className="scenario-controls">
              <fieldset className="profile-select vehicle-select" aria-label="Illustrative delivery vehicle profile" data-testid="selector-vehicle-profile"><legend>DELIVERY VEHICLE · SYMBOL ONLY</legend>
                <button type="button" className={profile==='land-cruiser'?'selected':''} aria-pressed={profile==='land-cruiser'} onClick={()=>setProfile('land-cruiser')} data-testid="button-profile-land-cruiser"><Truck size={14}/> Land Cruiser</button>
                <button type="button" className={profile==='dump-truck'?'selected':''} aria-pressed={profile==='dump-truck'} onClick={()=>setProfile('dump-truck')} data-testid="button-profile-dump-truck"><Truck size={16}/> Dump truck</button>
              </fieldset>
              <div className="scenario-control-row">
                <fieldset className="profile-select" aria-label="Sensor arrangement" data-testid="selector-sensor-arrangement"><legend>SENSOR ARRANGEMENT</legend>
                  <button type="button" className={sensors===2?'selected':''} aria-pressed={sensors===2} onClick={()=>setSensors(2)} data-testid="button-sensors-2"><Radio size={14}/> 2 sensors</button>
                  <button type="button" className={sensors===3?'selected':''} aria-pressed={sensors===3} onClick={()=>setSensors(3)} data-testid="button-sensors-3"><Waves size={14}/> 3 sensors</button>
                </fieldset>
                <div className="view-switch" role="group" aria-label="Select illustration view" data-testid="selector-layout-view"><button type="button" className={view==='process'?'selected':''} aria-pressed={view==='process'} onClick={()=>setView('process')} data-testid="button-view-process"><GitBranch size={14}/> Process</button><button type="button" className={view==='isometric'?'selected':''} aria-pressed={view==='isometric'} onClick={()=>setView('isometric')} data-testid="button-view-isometric"><Map size={14}/> Isometric</button></div>
              </div>
            </div>
          </div>
          <div className="diagram-meta"><span className="profile-glyph"><Truck size={23}/></span><span><b>{sensors}-sensor concept · delivery profile is illustrative only</b><small>{sensors===2?'S1 initial indication; S2 second observation.':'S1 initial indication; S2 second observation; optional S3 adds an observation.'} The selected vehicle symbol ends at the hopper.</small></span><span className="diagram-stamp">WP1 / CONCEPT ONLY</span></div>
          <div className="diagram-pan-hint"><MoveRight size={14}/> Swipe or scroll horizontally to inspect the full layout.</div>
          <div className="drawing-frame" role="region" aria-label={`${view} mine and conveyor layout drawing`} tabIndex={0} data-testid="drawing-conveyor-process"><Diagram sensors={sensors} profile={profile} step={step}/><div className="drawing-caption"><span>{view==='process'?'MINE CONTEXT + CONVEYOR PROCESS SCHEMATIC':'ISOMETRIC SITE + PROCESS STUDY'}</span><span>RELATIVE ONLY · NOT TO SCALE · SITE INPUTS PENDING</span></div></div>
          <div className="legend-row"><span className="legend-title">KEY</span><span><i className="legend-road"/>Vehicle travel path</span><span><i className="legend-material"/>Conveyor / material path</span><span><i className="legend-zone"/>Proposed sensor zone</span><span><i className="legend-hold"/>Hold / reject route</span><span><i className="legend-fixed"/>Fixed equipment</span></div>
        </section>
        <section className="walkthrough panel" aria-label="Step-by-step process walkthrough" data-testid="panel-walkthrough">
          <div className="walkthrough-top"><div><div className="eyebrow">FIVE-STAGE WALKTHROUGH</div><h2>{String(step+1).padStart(2,'0')} / 05 · {steps[step].title}</h2></div><div className="walkthrough-controls"><button type="button" onClick={stepBack} disabled={step===0} aria-label="Previous step" data-testid="button-step-previous">Previous</button><button type="button" onClick={stepForward} disabled={step===4} aria-label="Next step" data-testid="button-step-next">Next <ArrowRight size={14}/></button></div></div>
          <p className="walkthrough-detail" aria-live="polite" aria-atomic="true" data-testid="text-step-explanation">{steps[step].detail}</p>
          <div className="step-track" role="group" aria-label="Choose walkthrough step">{steps.map((item,index)=><button key={item.title} type="button" className={step===index?'step-selected':''} aria-current={step===index?'step':undefined} onClick={()=>setStep(index as Step)} data-testid={`button-walkthrough-step-${index+1}`}><span>{String(index+1).padStart(2,'0')}</span><b>{item.title}</b></button>)}</div>
        </section>
        <section className="scenario-lower">
          <article className="basis-card panel" id="basis" data-testid="panel-design-basis"><div className="eyebrow">ENGINEERING INPUTS / LIMITS</div><h2>Working assumptions, visibly provisional</h2><p>This page illustrates sequence and relative position only. It does not define an implementation, estimate values, or claim performance.</p><div className="basis-list">
            <div><span className="basis-mark"><Check size={13}/></span><span><b>Context &amp; vehicle</b><small>Generic, unsurveyed site plan. Vehicle profile is delivery / offloading context only; both paths end at the hopper.</small></span></div>
            <div><span className="basis-mark pending"><AlertTriangle size={13}/></span><span><b>Sensing &amp; movement input</b><small>S1 is initial indication, S2 a second observation, and optional S3 another observation. Conveyor movement / speed is a generic placeholder; no device type is selected.</small></span></div>
            <div><span className="basis-mark pending"><AlertTriangle size={13}/></span><span><b>Estimate &amp; separation</b><small>Controller timing / segment estimate has no specified algorithm or values. Boundaries are uncertain; diverter and chute are generic placeholders.</small></span></div>
            <div><span className="basis-mark pending"><AlertTriangle size={13}/></span><span><b>Operating response</b><small>Normal feed is depicted continuing after the affected interval. No automatic crusher shutdown, performance claim, or safety claim is made.</small></span></div>
          </div><div className="basis-foot"><ShieldAlert size={14}/> Final geometry, clearances, sensor roles / count, segment estimation, actuator, and response need engineering / site review and controlled tests.</div></article>
          <article className="sequence-card panel" data-testid="panel-process-sequence"><div className="sequence-head"><div><div className="eyebrow">SAME FIVE STAGES</div><h2>From delivery to normal feed</h2></div><span className="sequence-badge">CONCEPT ONLY</span></div><ol className="sequence-list">
            <li><span>01</span><div><b>Approach &amp; discharge</b><small>Delivery vehicle follows the road to hopper; path ends there.</small></div><Truck size={15}/></li>
            <li><span>02</span><div><b>S1 initial indication</b><small>First possible-item indication after material reaches the conveyor.</small></div><Radio size={15}/></li>
            <li><span>03</span><div><b>S2 confirmation</b><small>S2 adds an observation; optional S3 adds another.</small></div><Waves size={15}/></li>
             <li><span>04</span><div><b>Estimate interval &amp; timing</b><small>Movement, distance, and response inputs inform an uncertain interval and arrival window.</small></div><Activity size={15}/></li>
             <li><span>05</span><div><b>Hold affected material; continue feed</b><small>Generic reject route before crusher; unaffected feed continues afterward.</small></div><Factory size={15}/></li>
          </ol><div className="sequence-note"><GitBranch size={14}/> Schematic positions and boundaries are not to scale.</div></article>
        </section>
        <section className="scenario-review-note" aria-label="Review status"><b>Next review gate</b><span>Confirm site geometry, vehicle clearances, sensor roles and count, segment-estimation method, actuator / mechanism, and operating response with engineering and site stakeholders. Validate only through controlled tests.</span></section>
        <div className="scenario-bottom-nav"><span>Continue to pass-record examples</span><Link href="/" className="primary-button" data-testid="link-scenario-to-review">Open pass review <ArrowRight size={15}/></Link></div>
        <footer className="page-footer"><span>HEATGUARD <i>·</i> LOCAL CONCEPT WORKSPACE</span><span>NO OPERATIONAL CONTROL · NO PERFORMANCE CLAIMS</span></footer>
      </div>
    </section>
  </main>;
}
