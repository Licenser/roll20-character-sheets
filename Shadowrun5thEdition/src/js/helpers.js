	const parseIntegers = numbers => {
		for (let [key, value] of Object.entries(numbers)) {
	        numbers[key] = parseInt(value) || 0;
	    }

	    return numbers
	}