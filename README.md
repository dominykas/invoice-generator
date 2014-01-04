This is an experiment. I do not intend to support it.

This code was born out of my needs - I pieced it along little by little, making small improvements every time I was issuing an invoice.

There are no tests - I commit HTMLs/PDFs into source control (`output` folder) and verify that old invoices were generated in the same fashion - proving that code is not broken (ya, right).

Features:
 * bilingual (EN/LT)
 * VAT (LT)
 * EUR+LTL in one

Installation:
 * node/npm
 * phantomjs
 * `npm install -g grunt-cli`

Usage:
 * edit `data/customers.js`
 * edit `data/invoices.js`
 * `grunt`
 * enjoy `output`

License:
 * My code: MIT
 * node_modules: usually mentioned in package.json or README.md where appropriate
 * toWords.en.js: mentioned in the file
 * toWords.lt.js: I do not know. Seriously. I think I rewrote everything I copy/pasted from somewhere, but I might be wrong.
