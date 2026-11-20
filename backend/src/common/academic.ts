export enum SchoolTerm {
  FIRST = 'first',
  SECOND = 'second',
  THIRD = 'third',
}

export const CLASS_ORDER = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6'] as const;

export type ClassLevel = (typeof CLASS_ORDER)[number];

export const UPPER_LEVELS: ClassLevel[] = ['S4', 'S5', 'S6'];

export function termFromMonth(monthIndex: number): SchoolTerm {
  if (monthIndex <= 3) return SchoolTerm.FIRST;
  if (monthIndex <= 7) return SchoolTerm.SECOND;
  return SchoolTerm.THIRD;
}

export function classInYear(entryClass: string, entryYear: number, year: number): ClassLevel | null {
  const start = CLASS_ORDER.indexOf(entryClass as ClassLevel);
  if (start < 0) return null;
  const index = start + (year - entryYear);
  if (index < 0 || index >= CLASS_ORDER.length) return null;
  return CLASS_ORDER[index];
}

export interface AcademicQuery {
  year?: number;
  term?: SchoolTerm;
}

export function parsePeriod(year?: string, term?: string): AcademicQuery {
  const parsedYear = Number(year);
  const terms = Object.values(SchoolTerm);
  return {
    year: Number.isInteger(parsedYear) && parsedYear >= 2020 && parsedYear <= 2035 ? parsedYear : undefined,
    term: terms.includes(term as SchoolTerm) ? (term as SchoolTerm) : undefined,
  };
}

export function inPeriod(row: { academicYear?: number; term?: SchoolTerm }, period: AcademicQuery) {
  if (period.year && Number(row.academicYear) !== period.year) return false;
  if (period.term && row.term !== period.term) return false;
  return true;
}
