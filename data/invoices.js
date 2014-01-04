module.exports = [
	{
		invoice: {
			series: 'SAMPLE',
			number: 3,
			date: {
				value: "2013-09-02"
			},
			customer: "ieltd"
		},
		items: [
			{
				qty: {
					unit: {
						value: "hours"
					},
					value: 82
				},
				rate: {
					value: 7.77,
					currency: "EUR"
				}
			},
			{
				qty: {
					unit: {
						value: "words"
					},
					value: 923
				},
				rate: {
					value: 0.47,
					currency: "EUR"
				},
				description: {
					textLT: "Vertimai: iš anglų k. į vokiečių, prancūzų, kinų, ispanų ir rusų k.",
					textEN: "Translations: English to German, French, Chinese, Spanish and Russian"
				}
			}
		]
	},
	{
		invoice: {
			series: 'SAMPLE',
			number: 2,
			date: {
				value: "2013-07-29"
			},
			customer: "ltltd",
			noEur: true
		},
		qty: {
			unit: {
				value: "weeks"
			},
			value: 4
		},
		rate: {
			value: 666,
			currency: "LTL"
		}
	},
	{
		invoice: {
			series: 'SAMPLE',
			number: 1,
			date: {
				value: "2013-06-30"
			},
			customer: "ieltd"
		},
		qty: {
			unit: {
				value: "hours"
			},
			value: 115
		},
		rate: {
			value: 6.66,
			currency: "EUR"
		}
	}];