var fs = require('fs');
var path = require('path');
var strftime = require('strftime');
var toWordsEn = require('./../toWords.en.js');
var toWordsLt = require('./../toWords.lt.js');

var ejs = require('ejs');
var renderInvoiceFn = require('./../views/invoice.ejs');

var firstCap = function firstCap(s) {
	return s.charAt(0).toUpperCase() + s.slice(1);
};

var getCt = function getCt(num) {
	var ct = Math.round(num * 100) % 100;
	if (ct < 10) ct = "0" + ct;
	return "" + ct;
};

var lt_LT = {
	months: [
		"sausio", "vasario", "kovo", "balandžio", "gegužės", "birželio",
		"liepos", "rugpjūčio", "rugsėjo", "spalio", "lapkričio", "gruodžio"
	],
	units: {
		weeks: "sav.",
		hours: "val.",
		words: "žod."
	}
};
var en_EN = {
	units: {
		weeks: "weeks",
		hours: "hours",
		words: "words"
	}
};

var getInvoiceHtml = function (data, customer, ourselves) {

	var invoiceTotalEur = 0;
	var invoiceTotalLtl = 0;

	if (!data.items) {
		// va-1 to va-6
		data.items = [
			{
				qty: data.qty,
				rate: data.rate
			}
		];
	}

	for (var i = 0; i < data.items.length; i++) {
		var item = data.items[i];

		item.qty.unit.textLT = lt_LT.units[item.qty.unit.value];
		item.qty.unit.textEN = en_EN.units[item.qty.unit.value];

		var rate = item.rate.value;

		var multEur = (item.rate.currency == "EUR" ? 1 : 1 / 3.4528);
		var multLtl = (item.rate.currency == "EUR" ? 3.4528 : 1);

		item.total = {
			eur: { value: item.qty.value * rate * multEur },
			ltl: { value: item.qty.value * rate * multLtl }
		};

		invoiceTotalEur += (+item.total.eur.value);
		invoiceTotalLtl += (+item.total.ltl.value);
	}
	data.totalExVat = {
		eur: { value: invoiceTotalEur },
		ltl: { value: invoiceTotalLtl }
	};

	var invoiceDate = new Date(data.invoice.date.value);
	data.invoice.date.textEN = strftime("%e/%b/%Y", invoiceDate);
	data.invoice.date.textLT = strftime("%Y m. %B %e d.", invoiceDate, lt_LT);

	data.customer = customer;

	data.vatRate = customer.vatNo.substr(0, 2) == "LT" ? 21 : 0;
	data.totalVat = {
		eur: { value: invoiceTotalEur * data.vatRate / 100 },
		ltl: { value: invoiceTotalLtl * data.vatRate / 100 }
	};
	data.totalIncVat = {
		eur: { value: data.totalExVat.eur.value + data.totalVat.eur.value },
		ltl: { value: data.totalExVat.ltl.value + data.totalVat.ltl.value }
	};

	var ctEur = getCt(data.totalIncVat.eur.value);
	var ctLtl = getCt(data.totalIncVat.ltl.value);

	data.totalIncVat.eur.textEN = firstCap(toWordsEn(Math.floor(data.totalIncVat.eur.value))) + ' Euro ' + ctEur + ' ct.';
	data.totalIncVat.ltl.textEN = firstCap(toWordsEn(Math.floor(data.totalIncVat.ltl.value))) + ' Litas ' + ctLtl + ' ct.';

	data.totalIncVat.eur.textLT = firstCap(toWordsLt(Math.floor(data.totalIncVat.eur.value), 'EUR')) + ' ' + ctEur + ' ct.';
	data.totalIncVat.ltl.textLT = firstCap(toWordsLt(Math.floor(data.totalIncVat.ltl.value), 'LTL')) + ' ' + ctLtl + ' ct.';

	data.ourselves = ourselves;

	return renderInvoiceFn(data);
};

var getInvoiceFn = function (data) {
	return ('invoice-' + data.invoice.series + data.invoice.number + '-' + strftime('%Y%m%d', new Date(data.invoice.date.value)) + '.html').toLowerCase();
};

var customers = require("./../data/customers");

module.exports = function (grunt) {
	grunt.registerTask("generate-html", "Generate HTML for invoices", function () {
		require('./../data/invoices').forEach(function (invData) {
			var fn = path.join(__dirname, '..', 'output', getInvoiceFn(invData));
			console.log("Writing: %s", fn);
			fs.writeFileSync(fn, getInvoiceHtml(invData, customers[invData.invoice.customer], customers.ourselves));
		});
	});
};
