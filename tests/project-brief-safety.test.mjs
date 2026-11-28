import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';

const source = await readFile(new URL('../scripts/project-brief-safety.js', import.meta.url), 'utf8');
const context = vm.createContext({ window: { location: { href: 'https://portfolio.example/projects/' } }, URL });
vm.runInContext(source, context);
const { escapeHTML, safeURL } = context.ProjectBriefSafety;

test('escapes HTML text and attribute characters', () => {
  assert.equal(escapeHTML(`<script title="x">Jade & Co'</script>`), '&lt;script title=&quot;x&quot;&gt;Jade &amp; Co&#39;&lt;/script&gt;');
});

test('allows safe absolute and relative links', () => {
  assert.equal(safeURL('https://example.com/project'), 'https://example.com/project');
  assert.equal(safeURL('/assets/project.webp'), '/assets/project.webp');
});

test('rejects script, data, and protocol-relative URLs', () => {
  assert.equal(safeURL('javascript:alert(1)'), '');
  assert.equal(safeURL('data:text/html,unsafe'), '');
  assert.equal(safeURL('//example.com/ambiguous'), '');
});
