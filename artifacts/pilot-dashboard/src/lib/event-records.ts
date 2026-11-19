export const SYNTHETIC_DATA_LABEL =
  'ILLUSTRATIVE SYNTHETIC DATA — NOT SITE MEASUREMENTS';

export const CASE_IDS = ['A', 'B', 'C', 'D'] as const;
export type CaseId = (typeof CASE_IDS)[number];

export const DETECTION_STATES = [
  'No Detection Indicated',
  'Illustrative Event Flag',
  'Requires Validation / Operator Review',
] as const;
export type DetectionState = (typeof DETECTION_STATES)[number];

export const OPERATOR_ACTIONS = [
  'Hold / Inspect',
  'Clear',
  'Escalate',
  'Unassigned',
] as const;
export type OperatorAction = (typeof OPERATOR_ACTIONS)[number];

export type EventRecord = {
  id: string;
  timestamp: string;
  vehicleRef: string;
  loadRef: string;
  caseId: CaseId;
  detectionState: DetectionState;
  operatorAction: OperatorAction;
  emiLevel: number;
  magneticLevel: number;
  note: string;
  source: string;
  syntheticLabel: typeof SYNTHETIC_DATA_LABEL;
};

export const SAMPLE_RECORDS: EventRecord[] = [
  {
    id: 'PR-24018',
    timestamp: '2025-02-14T10:42:00',
    vehicleRef: 'TR-07',
    loadRef: 'LD-1842',
    caseId: 'A',
    detectionState: 'No Detection Indicated',
    operatorAction: 'Clear',
    emiLevel: 18.4,
    magneticLevel: 22.1,
    note: 'Synthetic baseline pass for interface review.',
    source: 'Sample case',
    syntheticLabel: SYNTHETIC_DATA_LABEL,
  },
  {
    id: 'PR-24017',
    timestamp: '2025-02-14T10:18:00',
    vehicleRef: 'TR-12',
    loadRef: 'LD-1839',
    caseId: 'B',
    detectionState: 'Illustrative Event Flag',
    operatorAction: 'Hold / Inspect',
    emiLevel: 68.2,
    magneticLevel: 54.7,
    note: 'Illustrative event flag; review site-approved response.',
    source: 'Sample case',
    syntheticLabel: SYNTHETIC_DATA_LABEL,
  },
  {
    id: 'PR-24016',
    timestamp: '2025-02-14T09:56:00',
    vehicleRef: 'TR-04',
    loadRef: 'LD-1833',
    caseId: 'C',
    detectionState: 'Requires Validation / Operator Review',
    operatorAction: 'Escalate',
    emiLevel: 42.6,
    magneticLevel: 71.3,
    note: 'Synthetic ambiguous example requiring human validation.',
    source: 'Sample case',
    syntheticLabel: SYNTHETIC_DATA_LABEL,
  },
  {
    id: 'PR-24015',
    timestamp: '2025-02-14T09:21:00',
    vehicleRef: 'TR-09',
    loadRef: 'LD-1827',
    caseId: 'A',
    detectionState: 'No Detection Indicated',
    operatorAction: 'Clear',
    emiLevel: 21.7,
    magneticLevel: 19.5,
    note: 'Second synthetic baseline example.',
    source: 'Sample case',
    syntheticLabel: SYNTHETIC_DATA_LABEL,
  },
  {
    id: 'PR-24014',
    timestamp: '2025-02-14T08:47:00',
    vehicleRef: 'TR-03',
    loadRef: 'LD-1822',
    caseId: 'B',
    detectionState: 'Illustrative Event Flag',
    operatorAction: 'Unassigned',
    emiLevel: 61.8,
    magneticLevel: 59.2,
    note: 'Example record for operator workflow discussion.',
    source: 'Sample case',
    syntheticLabel: SYNTHETIC_DATA_LABEL,
  },
];

export const CSV_COLUMNS: (keyof EventRecord)[] = [
  'id',
  'timestamp',
  'vehicleRef',
  'loadRef',
  'caseId',
  'detectionState',
  'operatorAction',
  'emiLevel',
  'magneticLevel',
  'note',
  'source',
  'syntheticLabel',
];

export type RecordLoadResult = {
  records: EventRecord[];
  recoveryNotice: string | null;
  storageError: string | null;
};

export type RecordStorageReader = {
  getItem(key: string): string | null;
};

export function cloneSampleRecords(): EventRecord[] {
  return SAMPLE_RECORDS.map((record) => ({ ...record }));
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function normalizeRecord(value: unknown): EventRecord | null {
  if (!isObject(value)) return null;
  const record = value;
  const isValid =
    typeof record.id === 'string' &&
    record.id.trim().length > 0 &&
    typeof record.timestamp === 'string' &&
    Number.isFinite(Date.parse(record.timestamp)) &&
    typeof record.vehicleRef === 'string' &&
    typeof record.loadRef === 'string' &&
    CASE_IDS.includes(record.caseId as CaseId) &&
    DETECTION_STATES.includes(record.detectionState as DetectionState) &&
    OPERATOR_ACTIONS.includes(record.operatorAction as OperatorAction) &&
    typeof record.emiLevel === 'number' &&
    Number.isFinite(record.emiLevel) &&
    typeof record.magneticLevel === 'number' &&
    Number.isFinite(record.magneticLevel) &&
    typeof record.note === 'string' &&
    typeof record.source === 'string';

  if (!isValid) return null;

  return {
    id: record.id.trim(),
    timestamp: record.timestamp,
    vehicleRef: record.vehicleRef,
    loadRef: record.loadRef,
    caseId: record.caseId as CaseId,
    detectionState: record.detectionState as DetectionState,
    operatorAction: record.operatorAction as OperatorAction,
    emiLevel: record.emiLevel,
    magneticLevel: record.magneticLevel,
    note: record.note,
    source: record.source,
    // Older local records may not have had this field; restore the label.
    syntheticLabel: SYNTHETIC_DATA_LABEL,
  };
}

function fallbackResult(recoveryNotice: string): RecordLoadResult {
  return {
    records: cloneSampleRecords(),
    recoveryNotice,
    storageError: null,
  };
}

export function parseStoredRecords(raw: string | null): RecordLoadResult {
  if (raw === null) {
    return {
      records: cloneSampleRecords(),
      recoveryNotice: null,
      storageError: null,
    };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw) as unknown;
  } catch {
    return fallbackResult(
      'Saved examples were unreadable. The starter records have been restored.',
    );
  }

  if (!Array.isArray(parsed)) {
    return fallbackResult(
      'Saved examples had an invalid format. The starter records have been restored.',
    );
  }

  const records: EventRecord[] = [];
  const seenIds = new Set<string>();
  let skippedCount = 0;

  for (const item of parsed) {
    const record = normalizeRecord(item);
    if (!record || seenIds.has(record.id)) {
      skippedCount += 1;
      continue;
    }
    seenIds.add(record.id);
    records.push(record);
  }

  if (skippedCount > 0 && records.length === 0) {
    return fallbackResult(
      'Saved examples were invalid. The starter records have been restored.',
    );
  }

  return {
    records,
    recoveryNotice:
      skippedCount > 0
        ? `${skippedCount} invalid or duplicate saved example(s) were skipped.`
        : null,
    storageError: null,
  };
}

export function loadStoredRecords(
  storage: RecordStorageReader,
  key: string,
): RecordLoadResult {
  try {
    return parseStoredRecords(storage.getItem(key));
  } catch {
    return {
      records: cloneSampleRecords(),
      recoveryNotice: null,
      storageError:
        'Browser storage could not be read. Changes may not survive a reload.',
    };
  }
}

export function createUniqueRecordId(
  records: readonly EventRecord[],
  now = Date.now(),
): string {
  const timestamp = Number.isFinite(now) ? Math.max(0, Math.floor(now)) : Date.now();
  const prefix = `PR-${timestamp.toString(36).toUpperCase()}`;
  const existingIds = new Set(records.map((record) => record.id));
  let sequence = 1;

  while (existingIds.has(`${prefix}-${String(sequence).padStart(3, '0')}`)) {
    sequence += 1;
  }

  return `${prefix}-${String(sequence).padStart(3, '0')}`;
}

function csvCell(value: string | number): string {
  const text = String(value);
  const safeText = typeof value === 'string' && /^[\s]*[=+\-@]/.test(text)
    ? `'${text}`
    : text;
  return `"${safeText.replaceAll('"', '""')}"`;
}

export function recordsToCsv(records: readonly EventRecord[]): string {
  const header = CSV_COLUMNS.map(csvCell).join(',');
  const rows = records.map((record) =>
    CSV_COLUMNS.map((column) => csvCell(record[column])).join(','),
  );
  return [header, ...rows].join('\r\n');
}
