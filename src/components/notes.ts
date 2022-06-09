import { debug } from 'svelte/internal';
import { start } from 'tone';

export const keys: string[] = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];

export function getChordFormula(chord: string, chords: { [k: string]: number[] }): string {
	const notes: number[] = chords[chord];
	const formula: string[] = [];

	for (let i = 0; i < notes.length; i++) {
		const note = notes[i];
		switch (note) {
			case 1:
				formula.push('R');
				break;
			case 2:
				formula.push('b2');
				break;
			case 3:
				if (notes[i - 1] < note) {
					formula.push('2');
				} else {
					formula.push('9');
				}
				break;
			case 4:
				formula.push('b3');
				break;
			case 5:
				formula.push('3');
				break;
			case 6:
				if (notes[i - 1] < note && formula.length < 3) {
					formula.push('4');
				} else {
					formula.push('11');
				}
				break;
			case 7:
				formula.push('b5');
				break;
			case 8:
				formula.push('5');
				break;
			case 9:
				if (formula[formula.length - 1] != '5' && formula[formula.length - 1] != 'b5') {
					formula.push('#5');
				} else {
					formula.push('b6');
				}
				break;
			case 10:
				if (notes[i - 1] < note && formula.length < 4) {
					formula.push('6');
				} else {
					formula.push('13');
				}
				break;
			case 11:
				formula.push('b7');
				break;
			case 12:
				formula.push('7');
				break;
		}
	}

	return formula.join(' - ');
}

export function getScaleFormula(notes: number[]): string {
	const formula: string[] = [];

	for (let i = 0; i < notes.length; i++) {
		const note: number = notes[i];
		switch (note) {
			case 1:
				formula.push('R');
				break;
			case 2:
				formula.push('b2');
				break;
			case 3:
				formula.push('2');
				break;
			case 4:
				if (formula[formula.length - 1] == 'R') {
					formula.push('#2');
				} else {
					formula.push('b3');
				}
				break;
			case 5:
				if (formula[formula.length - 1] == '#2') {
					formula.push('3');
				} else if (notes[i - 1] == 4) {
					formula.push('b4');
				} else {
					formula.push('3');
				}
				break;
			case 6:
				if (notes[i - 1] < note) {
					formula.push('4');
				} else {
					formula.push('11');
				}
				break;
			case 7:
				if (notes[i - 1] != 6 && formula[formula.length - 1] != 'b4') {
					formula.push('#4');
				} else {
					formula.push('b5');
				}
				break;
			case 8:
				formula.push('5');
				break;
			case 9:
				if (formula[formula.length - 1] == '4' || formula[formula.length - 1] == '#4') {
					formula.push('#5');
				} else {
					formula.push('b6');
				}
				break;
			case 10:
				if (formula[formula.length - 1] == '6' || formula[formula.length - 1] == 'b6') {
					formula.push('b7');
				} else {
					formula.push('6');
				}
				break;
			case 11:
				formula.push('b7');
				break;
			case 12:
				formula.push('7');
				break;
		}
	}
	return formula.join(' - ');
}

export function getChordIntervals(chordNotes: number[]): number[] {
	const intervals: number[] = [];
	intervals.push(1);
	for (let i = 0; i < chordNotes.length - 1; i++) {
		intervals.push(chordNotes[i + 1] - chordNotes[0] + 1);
	}

	return intervals;
}

export function getChord(chordKey: string, chordFormula: number[]): string[] {
	const expandedKey: string[] = Object.assign([], keys);
	expandedKey.push(...keys);
	const startIndex = keys.indexOf(chordKey);
	const chord = [chordKey + '4'];
	for (let i = 1; i < chordFormula.length; i++) {
		chord.push(expandedKey[startIndex + chordFormula[i] - 1] + '4');
	}
	console.log('cc', chord);
	return chord;
}

export function findChords(scaleNotes: number[], chords: { [k: string]: number[] }): { [k: string]: number[] } {
	const validChords: { [k: string]: number[] } = {};

	Object.entries(chords).forEach(([key, value]) => {
		const contains = value.every((v) => scaleNotes.includes(v));
		if (contains) {
			validChords[key] = value;
		}
	});

	return validChords;
}

/*export function getChordsForScale(scaleKey: string, scaleNotes: number[], chords: { [k: string]: number[] }): { [k: string]: number[] }[] {
	const chordsForScale: { [k: string]: number[] }[] = [];
	const extendedScaleNotes: number[] = Object.assign([], scaleNotes);

	scaleNotes.forEach((note) => {
		extendedScaleNotes.push(note + 2);
	});

	for (let i = 0; i < 7; i++) {
		const chordNotes: number[] = getChordIntervals(extendedScaleNotes.slice(0, 7));
		const validChords: { [k: string]: number[] } = findChords(chordNotes, chords);
		chordsForScale.push(validChords);
		extendedScaleNotes.shift();
	}

	return chordsForScale;
}*/

export function getChordsForKey(keyIndex: number, scaleNotes: number[], chords: { [k: string]: number[] }): { [k: string]: number[] } {
	const extendedScaleNotes: number[] = Object.assign([], scaleNotes);

	scaleNotes.forEach((note) => {
		extendedScaleNotes.push(note + 12);
	});

	const chordNotes: number[] = getChordIntervals(extendedScaleNotes.slice(keyIndex, keyIndex + 7));
	const validChords: { [k: string]: number[] } = findChords(chordNotes, chords);
	return validChords;
}

export function getScaleKeys(key: string, scaleNotes: number[]): string[] {
	const extentedKeys: string[] = Object.assign([], keys);
	extentedKeys.push(...keys);

	const firstIndex: number = extentedKeys.indexOf(key);
	const keysForScale: string[] = [];

	scaleNotes.forEach((note: number) => {
		if (keysForScale.length === 0) {
			keysForScale.push(extentedKeys[firstIndex + (note - 1)]);
		} else {
			const eh: string = getKeyEnharmonic(keysForScale[keysForScale.length - 1], extentedKeys[firstIndex + (note - 1)]);
			keysForScale.push(eh);
		}
	});

	return keysForScale;
}

export function getKeyEnharmonic(prev: string, current: string): string {
	switch (current) {
		case 'A':
			if (prev == 'F##') {
				return 'G##';
			}
			break;
		case 'A#':
			if (prev == 'A' || prev == 'Ab') {
				return 'Bb';
			}
			break;
		case 'C':
			if (prev == 'A#') {
				return 'B#';
			}
			break;
		case 'C#':
			if (prev == 'C' || prev == 'Cb') {
				return 'Db';
			}
			break;
		case 'D':
			if (prev == 'B#') {
				return 'C##';
			}
			break;
		case 'D#':
			if (prev == 'D' || prev == 'Db') {
				return 'Eb';
			}
			break;
		case 'E':
			if (prev == 'Eb') {
				return 'Fb';
			}
			break;
		case 'F':
			if (prev == 'D#') {
				return 'E#';
			}
			break;
		case 'F#':
			if (prev == 'F' || prev == 'Fb') {
				return 'Gb';
			}
			break;
		case 'G':
			if (prev == 'E#') {
				return 'F##';
			}
			break;
		case 'G#':
			if (prev == 'G' || prev == 'Gb') {
				return 'Ab';
			}
			break;
	}

	return current;
}

export function convertBackEnharmonic(key: string): string {
	if (key == 'G##') {
		return 'A';
	} else if (key == 'Bb') {
		return 'A#';
	} else if (key == 'A##' || key == 'Cb') {
		return 'B';
	} else if (key == 'B#') {
		return 'C';
	} else if (key == 'Db') {
		return 'C#';
	} else if (key == 'C##') {
		return 'D';
	} else if (key == 'Eb') {
		return 'D#';
	} else if (key == 'D##' || key == 'Fb') {
		return 'E';
	} else if (key == 'E#') {
		return 'F';
	} else if (key == 'E##' || key == 'Gb') {
		return 'F#';
	} else if (key == 'F##') {
		return 'G';
	} else if (key == 'Ab') {
		return 'G#';
	} else {
		return key;
	}
}
