// transform response to consistent contract API

export function transform(json) {
	let obj = {};

	for (const key in json) {
		let value = json[key];

		if (value === 'N/A' || value === '') {
			value = null;
		}
		if (key === 'Response') {
			value = json[key] === 'True';
		}

		if (key === 'Ratings' && Array.isArray(json[key]) && json[key].length > 0) {
			let newArray = [];

			newArray = json[key].map((e) => {
				let newRatings = {};

				for (const k in e) {
					newRatings[k.toLowerCase()] = e[k];
				}
				return { ...newRatings };
			});

			value = newArray;
		}

		if (value) {
			if (key === 'Year') {
				if (value.trim().endsWith('–')) value = value.slice(0, -1);
			}

			if (key === 'Genre') {
				if (value.includes(',')) value = json[key].split(',').map((e) => e.trim());
				else value = [];
			}

			if (key === 'Language') {
				if (value.includes(',')) value = json[key].split(',').map((e) => e.trim());
				else value = [value];
			}
		} else {
			if (key === 'Genre') {
				value = [];
			}
			if (key === 'Language') {
				value = [];
			}
		}

		obj[key.toLowerCase()] = value;
	}

	return obj;
}
