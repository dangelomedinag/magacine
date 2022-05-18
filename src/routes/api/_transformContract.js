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
