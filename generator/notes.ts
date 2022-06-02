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
		Locrian: [Interval.root, Interval.m2, Interval.m3, Interval.p4, Interval.b5, Interval.m6, Interval.m7]
	};

	originalChords: { [k: string]: Interval[] } = {
		dim: [Interval.root, Interval.m3, Interval.b5],
		maj: [Interval.root, Interval.M3, Interval.p5],
		min: [Interval.root, Interval.m3, Interval.p5],
		aug: [Interval.root, Interval.M3, Interval.m6]
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
