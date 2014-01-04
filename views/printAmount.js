var fmtNum = function fmtNum(num) {
	var s = Math.round(num * 100) + '';
	if (isNaN(num)) throw new Error("Can't fmtNum(NaN)");
	if (s == '0') return '0.00';
	return s.substr(0, s.length - 2) + '.' + s.substr(s.length - 2, 2);
};

module.exports = function (amt, curr, noFmt) {
	if (typeof (noFmt) == "undefined") noFmt = true;
	if (!!noFmt) {
		amt = fmtNum(amt);
	}
	if (curr == "EUR") {
		return ("&euro;" + amt);
	}
	if (curr == "LTL") {
		return (amt + " Lt.");
	}
	throw new Error("No such currency: " + curr);
};