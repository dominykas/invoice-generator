var ones = ['', 'vienas', 'du', 'trys', 'keturi', 'penki', 'šeši', 'septyni', 'aštuoni', 'devyni'];
var teens = ['', 'vienuolika', 'dvylika', 'trylika', 'keturiolika', 'penkiolika', 'šešiolika', 'septyniolika', 'aštuoniolika', 'devyniolika'];
var tens = ['', 'dešimt', 'dvidešimt', 'trisdešimt', 'keturiasdešimt', 'penkiasdešimt', 'šešiasdešimt', 'septyniasdešimt', 'aštuoniasdešimt', 'devyniasdešimt'];

var bigNumbers = [
	["šimtų", "šimtas", "šimtai"],
	["tūkstančių", "tūkstantis", "tūkstančiai"],
	["milijonų", "milijonas", "milijonai"],
	["milijardų", "milijardas", "milijardai"],
	["bilijonų", "bilijonas", "bilijonai"]
];

function getSmall(smallNumber) {

	var retval = [];
	var cHundreds = Math.floor(smallNumber / 100);
	var remainder = smallNumber % 100;

	if (cHundreds > 0) {
		retval.push(ones[cHundreds]);
		retval.push(bigNumbers[0][getForma(cHundreds)]);
	}

	if (remainder >= 10) {
		if (remainder > 10 && remainder < 20) {
			retval.push(teens[remainder-10]);
		} else {
			retval.push(tens[Math.floor(remainder / 10)]);
			remainder = remainder % 10;
		}
	}

	if (remainder > 0 && remainder < 10) {
		retval.push(ones[remainder]);
	}

	return retval.join(' ');
}

var FORMA_LITŲ = 0,
	FORMA_LITAS = 1,
	FORMA_LITAI = 2;

function getForma(number) {
	var lastTwo = number % 100;
	var last = number % 10;

	if ((lastTwo > 10) && (lastTwo < 20)) {
		return FORMA_LITŲ;
	}
	if (last == 0) {
		return FORMA_LITŲ;
	}
	if (last == 1) {
		return FORMA_LITAS;
	}
	return FORMA_LITAI;
}

var currencies = {
	EUR: ['Eurų','Euras','Eurai'],
	LTL: ['Litų','Litas','Litai']
};

var toWords = function (num, currency) {
	if (num < 0) throw new Error("Unsupported value");

	var retval = [];
	if (num == 0) retval.push("nulis");

	var i = 0;
	var cNum = num;
	while (cNum > 0) {
		var cVal = cNum % 1000;
		var cText = getSmall(cVal);
		var cForma = getForma(cVal);

		if (i > 0) {
			retval.unshift(bigNumbers[i][cForma]);
		}
		retval.unshift(cText);

		cNum = Math.floor(cNum/1000);
		i++;
	}

	if (currency) {
		retval.push(currencies[currency][getForma(num)]);
	}

	return retval.join(" ");
};

module.exports = toWords;