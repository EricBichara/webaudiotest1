import { Notes } from './notes';
import * as fs from 'fs';

async function generate() {
	const note: Notes = new Notes();

	const saved = note.runConverter();

	await fs.writeFile(__dirname + '/../../src/gen.json', saved, (err) => {
		console.log(err);
	});
}

generate();
