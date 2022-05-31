import { keys } from './notes';
import * as fs from 'fs';

async function example() {
	await fs.writeFile(__dirname + '/../../src/gen.json', JSON.stringify(keys), (err) => {
		console.log(err);
	});
}

example();
