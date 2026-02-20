# Content Authoring Guide (Legal-Safe)

This project **must not** republish any copyrighted Standards or NCC text.

## Rules (Non-Negotiable)

1. **Australian Standards:** Do not copy or paste any standards text. Only store:
   - Standard identifier (e.g., “AS 1684”)
   - Your own short summary (original text only)
   - Link to official source/store page

2. **NCC References:** Do not copy or paste NCC clauses. Only store:
   - Clause identifiers
   - Your own short summary (original text only)
   - Link to official NCC page

3. **Lessons and Examples:** All explanations and worked examples must be newly authored.

4. **Disclaimer:** The footer disclaimer must remain visible in the UI.

## Adding a Formula

1. Add a JSON file to `src/data/formulas/`.
2. Follow the schema in `src/engine/calcTypes.ts`.
3. Keep explanations concise and original.
4. Add a calculator schema that references a compute function in `src/calculators/`.
5. Add the file to `src/data/formulas/index.ts`.
6. Optional: add `media.photo` with a commercially usable image. Only use photos with clear licenses. Include source URL, credit, and license label.

## Adding a Lesson

1. Add a Markdown file to `src/data/lessons/`.
2. Use your own words and examples.
3. Add an entry in `src/data/lessons/index.ts`.
4. Optional: add `media.photo` with a commercially usable image and attribution.

## Adding References

1. Add entries to `src/data/references/ncc.json` or `src/data/references/standards.json`.
2. Include only identifiers, short summaries, tags, and official URLs.
3. Do **not** include clause text or tables.

## Adding Tools

1. Add entries to `src/data/tools/index.ts`.
2. Include: title, summary, best uses, other uses, safety notes, maintenance, tags.
3. Add `media.photo` with licensed sources and attribution.
4. Prefer photos from Pexels or other commercial-friendly sources with clear licenses.

## Updating Calculators

1. Add a pure function to `src/calculators/`.
2. Wire it in `src/calculators/index.ts`.
3. Ensure it works with the unit helpers in `src/engine/unit.ts`.
4. Add or update tests in `src/tests/`.

## Checklist Before Publish

- No copyrighted text included.
- Summaries are original and short.
- Calculators validated with tests.
- Footer disclaimer still visible.
