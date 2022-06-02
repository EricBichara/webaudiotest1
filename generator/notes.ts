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
	originalScales = new Map<string, Interval[]>([
		['Ionian', [Interval.root, Interval.M2, Interval.M3, Interval.p4, Interval.p5, Interval.M6, Interval.M7]],
		['Dorian', [Interval.root, Interval.M2, Interval.m3, Interval.p4, Interval.p5, Interval.M6, Interval.m7]],
		['Phrygian', [Interval.root, Interval.m2, Interval.m3, Interval.p4, Interval.p5, Interval.m6, Interval.m7]],
		['Lydian', [Interval.root, Interval.M2, Interval.M3, Interval.b5, Interval.p5, Interval.M6, Interval.M7]],
		['Mixolydian', [Interval.root, Interval.M2, Interval.M3, Interval.p4, Interval.p5, Interval.M6, Interval.m7]],
		['Aeolian', [Interval.root, Interval.M2, Interval.m3, Interval.p4, Interval.p5, Interval.m6, Interval.m7]],
		['Locrian', [Interval.root, Interval.m2, Interval.m3, Interval.p4, Interval.b5, Interval.m6, Interval.m7]]
	]);
	originalChords = new Map<string, Interval[]>([
		['dim', [Interval.root, Interval.m3, Interval.b5]],
		['maj', [Interval.root, Interval.M3, Interval.p5]],
		['min', [Interval.root, Interval.m3, Interval.p5]],
		['aug', [Interval.root, Interval.M3, Interval.m6]]
	]);

	runConverter(): string {
		const scales = new Map<string, number[]>();
		const chords = new Map<string, number[]>();

		this.originalScales.forEach((value, key) => {
			scales.set(key, this.convertScale(value));
		});

		this.originalChords.forEach((value, key) => {
			chords.set(key, this.convertScale(value));
		});

		const str = JSON.stringify(
			{
				scales,
				chords
			},
			this.replacer
		);

		return str;
	}

	replacer(key, value) {
		if (value instanceof Map) {
			return {
				dataType: 'Map',
				value: Array.from(value.entries()) // or with spread: value: [...value]
			};
		} else {
			return value;
		}
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
