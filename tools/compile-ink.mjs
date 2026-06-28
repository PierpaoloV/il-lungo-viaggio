// Compila l'ink in JSON usando inkjs (stesso compilatore del gioco web).
// La compilazione in-editor di ink-unity-integration è inaffidabile in batchmode
// su Unity 6.5, quindi compiliamo qui e usiamo solo la runtime ink in Unity.
//
// Uso:  node tools/compile-ink.mjs
import { Compiler } from '/Users/pierpaolovendittelli/projects/personal-projects/il-lungo-viaggio/node_modules/inkjs/dist/ink-full.mjs';
import { readFileSync, writeFileSync } from 'fs';

const inkPath = 'ink/prologo.ink';
const outPath = 'Assets/Resources/prologo.json'; // caricato a runtime con Resources.Load

const src = readFileSync(inkPath, 'utf8');
const story = new Compiler(src).Compile();
const json = story.ToJson();
writeFileSync(outPath, json);
const m = json.match(/"inkVersion"\s*:\s*(\d+)/);
console.log('OK', outPath, 'len', json.length, 'inkVersion', m ? m[1] : '?');
