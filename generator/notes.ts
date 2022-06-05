export const keys: string[] = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];

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

export class Notes {
	originalScales: { [k: string]: Interval[] } = {
		Ionian: [Interval.root, Interval.M2, Interval.M3, Interval.p4, Interval.p5, Interval.M6, Interval.M7],
		Dorian: [Interval.root, Interval.M2, Interval.m3, Interval.p4, Interval.p5, Interval.M6, Interval.m7],
		Phrygian: [Interval.root, Interval.m2, Interval.m3, Interval.p4, Interval.p5, Interval.m6, Interval.m7],
		Lydian: [Interval.root, Interval.M2, Interval.M3, Interval.b5, Interval.p5, Interval.M6, Interval.M7],
		Mixolydian: [Interval.root, Interval.M2, Interval.M3, Interval.p4, Interval.p5, Interval.M6, Interval.m7],
		Aeolian: [Interval.root, Interval.M2, Interval.m3, Interval.p4, Interval.p5, Interval.m6, Interval.m7],
		Locrian: [Interval.root, Interval.m2, Interval.m3, Interval.p4, Interval.b5, Interval.m6, Interval.m7],
		//Melodic Minor Modes W-H-W-W-W-W-H
		'Melodic Minor': [Interval.root, Interval.M2, Interval.m3, Interval.p4, Interval.p5, Interval.M6, Interval.M7],
		'Dorian m2': [Interval.root, Interval.m2, Interval.m3, Interval.p4, Interval.p5, Interval.M6, Interval.m7],
		'Lydian Augmented': [Interval.root, Interval.M2, Interval.M3, Interval.b5, Interval.m6, Interval.M6, Interval.M7],
		'Lydian Dominant': [Interval.root, Interval.M2, Interval.M3, Interval.b5, Interval.p5, Interval.M6, Interval.m7],
		'Mixolydian m6': [Interval.root, Interval.M2, Interval.M3, Interval.p4, Interval.p5, Interval.m6, Interval.m7],
		'Aeolian b5': [Interval.root, Interval.M2, Interval.m3, Interval.p4, Interval.b5, Interval.m6, Interval.m7],
		Altered: [Interval.root, Interval.m2, Interval.m3, Interval.M3, Interval.b5, Interval.m6, Interval.m7],
		//Harmonic Minor Modes W-H-W-W-H-WH-H
		'Harmonic Minor': [Interval.root, Interval.M2, Interval.m3, Interval.p4, Interval.p5, Interval.m6, Interval.M7],
		'Locrian #6': [Interval.root, Interval.m2, Interval.m3, Interval.p4, Interval.b5, Interval.M6, Interval.m7],
		'Ionian #5': [Interval.root, Interval.M2, Interval.M3, Interval.p4, Interval.m6, Interval.M6, Interval.M7],
		'Dorian #4': [Interval.root, Interval.M2, Interval.m3, Interval.b5, Interval.p5, Interval.M6, Interval.m7],
		'Phrygian Dominant': [Interval.root, Interval.m2, Interval.M3, Interval.p4, Interval.p5, Interval.m6, Interval.m7],
		'Lydian #2': [Interval.root, Interval.m3, Interval.M3, Interval.b5, Interval.p5, Interval.M6, Interval.M7],
		'Super Locrian': [Interval.root, Interval.m2, Interval.m3, Interval.M3, Interval.b5, Interval.m6, Interval.M6]
	};

	originalChords: { [k: string]: Interval[] } = {
		dim: [Interval.root, Interval.m3, Interval.b5],
		maj: [Interval.root, Interval.M3, Interval.p5],
		min: [Interval.root, Interval.m3, Interval.p5],
		aug: [Interval.root, Interval.M3, Interval.m6],
		'maj b5': [Interval.root, Interval.M3, Interval.b5],
		'maj 6': [Interval.root, Interval.M3, Interval.p5, Interval.M6],
		'maj 6add9': [Interval.root, Interval.M3, Interval.p5, Interval.M6, Interval.M2],
		'maj 7': [Interval.root, Interval.M3, Interval.p5, Interval.M7],
		'maj 7b5': [Interval.root, Interval.M3, Interval.b5, Interval.M7],
		'maj 7#5': [Interval.root, Interval.M3, Interval.m6, Interval.M7],
		'maj 9': [Interval.root, Interval.M3, Interval.p5, Interval.M7, Interval.M2],
		'maj add9': [Interval.root, Interval.M3, Interval.p5, Interval.M2],
		'maj 11': [Interval.root, Interval.M3, Interval.p5, Interval.M7, Interval.p4],
		'maj 13': [Interval.root, Interval.M3, Interval.p5, Interval.M7, Interval.M2, Interval.p4, Interval.M6],
		'maj 7(#11)': [Interval.root, Interval.M3, Interval.p5, Interval.M7, Interval.b5],
		'maj 6(11)': [Interval.root, Interval.M3, Interval.M6, Interval.p4],
		//Minor
		'min 6': [Interval.root, Interval.m3, Interval.p5, Interval.M6],
		'min 6add9': [Interval.root, Interval.m3, Interval.p5, Interval.M6, Interval.M2],
		'min 7': [Interval.root, Interval.m3, Interval.p5, Interval.m7],
		'min 7b5': [Interval.root, Interval.m3, Interval.b5, Interval.m7],
		'min 9': [Interval.root, Interval.m3, Interval.p5, Interval.m7, Interval.M2],
		'min add9': [Interval.root, Interval.m3, Interval.p5, Interval.M2],
		'min add9add11': [Interval.root, Interval.m3, Interval.p5, Interval.M2, Interval.p4],
		'min add11': [Interval.root, Interval.m3, Interval.p5, Interval.p4],
		'min 13': [Interval.root, Interval.m3, Interval.p5, Interval.m7, Interval.M2, Interval.p4, Interval.M6],
		'min 11b9': [Interval.root, Interval.m3, Interval.p5, Interval.m7, Interval.m2, Interval.p4],

		//Minor Major
		'm/M 7': [Interval.root, Interval.m3, Interval.p5, Interval.M7],
		'm/M 9': [Interval.root, Interval.m3, Interval.p5, Interval.M7, Interval.M2],
		'm/M 11': [Interval.root, Interval.m3, Interval.p5, Interval.M7, Interval.M2, Interval.p4],
		'm/M 13': [Interval.root, Interval.m3, Interval.p5, Interval.M7, Interval.M2, Interval.p4, Interval.M6],

		//Dominant
		'dom 7': [Interval.root, Interval.M3, Interval.p5, Interval.m7],
		'dom #5': [Interval.root, Interval.M3, Interval.m6, Interval.m7],
		'dom b5': [Interval.root, Interval.M3, Interval.b5, Interval.m7],
		'dom 9': [Interval.root, Interval.M3, Interval.p5, Interval.m7, Interval.M2],
		'dom 11': [Interval.root, Interval.M3, Interval.p5, Interval.m7, Interval.p4],

		//Diminished
		'dim 7': [Interval.root, Interval.m3, Interval.b5, Interval.M6],

		//Other
		'6': [Interval.root, Interval.M3, Interval.p5, Interval.M6],
		'6 add9': [Interval.root, Interval.M3, Interval.p5, Interval.M6, Interval.M2],
		'sus 2': [Interval.root, Interval.M2, Interval.p5],
		'sus 4': [Interval.root, Interval.p4, Interval.p5],
		'sus #4': [Interval.root, Interval.p4, Interval.b5],
		'sus b5': [Interval.root, Interval.p4, Interval.b5],
		'7 sus 4b9': [Interval.root, Interval.p4, Interval.m7, Interval.m2],
		'13(no3)': [Interval.root, Interval.p5, Interval.m7, Interval.M6]
	};

	runConverter(): string {
		const scales: { [k: string]: number[] } = {};
		const chords: { [k: string]: number[] } = {};

		for (const [key, value] of Object.entries(this.originalScales)) {
			scales[key] = this.convertScale(value);
		}

		for (const [key, value] of Object.entries(this.originalChords)) {
			chords[key] = this.convertScale(value);
		}

		const str = JSON.stringify({
			scales,
			chords
		});

		return str;
	}

	convertScale(notes: Interval[]): number[] {
		const convertedIntervals: number[] = [];
		notes.forEach((element: Interval) => {
			switch (element) {
				case Interval.root:
					convertedIntervals.push(1);
					break;
				case Interval.m2:
					convertedIntervals.push(2);
					break;
				case Interval.M2:
					convertedIntervals.push(3);
					break;
				case Interval.m3:
					convertedIntervals.push(4);
					break;
				case Interval.M3:
					convertedIntervals.push(5);
					break;
				case Interval.p4:
					convertedIntervals.push(6);
					break;
				case Interval.b5:
					convertedIntervals.push(7);
					break;
				case Interval.p5:
					convertedIntervals.push(8);
					break;
				case Interval.m6:
					convertedIntervals.push(9);
					break;
				case Interval.M6:
					convertedIntervals.push(10);
					break;
				case Interval.m7:
					convertedIntervals.push(11);
					break;
				case Interval.M7:
					convertedIntervals.push(12);
					break;
			}
		});
		return convertedIntervals;
	}
}
