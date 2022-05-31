export enum Interval {
	root,
	m2,
	M2,
	m3,
	M3,
	p4,
	b5,
	p5,
	m6,
	M6,
	m7,
	M7
}

export const keys: string[] = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];

export class Notes {
	scales: Map<string, number[]> = new Map<string, number[]>();
	chords: Map<string, number[]> = new Map<string, number[]>();

	constructor() {
		this.scales = new Map<string, number[]>([
			['', this.convertScale([Interval.M2, Interval.b5])],
			['Ionian', this.convertScale([Interval.root, Interval.M2, Interval.M3, Interval.p4, Interval.p5, Interval.M6, Interval.M7])],
			['Dorian', this.convertScale([Interval.root, Interval.M2, Interval.m3, Interval.p4, Interval.p5, Interval.M6, Interval.m7])],
			['Phrygian', this.convertScale([Interval.root, Interval.m2, Interval.m3, Interval.p4, Interval.p5, Interval.m6, Interval.m7])]
		]);
		this.chords = new Map<string, number[]>([['', [1, 2]]]);
	}

	convertScale(notes: Interval[]): number[] {
		const convertedNotes: number[] = [];

		for (let i = 0; i < notes.length; i++) {
			const note: Interval = notes[i];
			switch (note) {
				case Interval.root:
					convertedNotes.push(1);
					break;
				case Interval.m2:
					convertedNotes.push(2);
					break;
				case Interval.M2:
					convertedNotes.push(3);
					break;
				case Interval.m3:
					convertedNotes.push(4);
					break;
				case Interval.M3:
					convertedNotes.push(5);
					break;
				case Interval.p4:
					convertedNotes.push(6);
					break;
				case Interval.b5:
					convertedNotes.push(7);
					break;
				case Interval.p5:
					convertedNotes.push(8);
					break;
				case Interval.m6:
					convertedNotes.push(9);
					break;
				case Interval.M6:
					convertedNotes.push(10);
					break;
				case Interval.m7:
					convertedNotes.push(11);
					break;
				case Interval.M7:
					convertedNotes.push(12);
					break;
			}
		}
		return convertedNotes;
	}
}
