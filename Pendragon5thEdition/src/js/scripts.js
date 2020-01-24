const attributes = {
	damage: ["strength", "size"],
	healing: ["strength", "constitution"],
	movement: ["strength", "dexterity"],
	hp: ["size", "constitution"],
	unconcious: ["total_hit_points"]
}


attributes.movement.forEach(attr => {
	on(`change:${attr}`, (eventinfo) => {
		attributeSumDivide(attributes.movement, 'movement_rate');
	});
})

attributes.damage.forEach(attr => {
	on(`change:${attr}`, (eventinfo) => {
		attributeSumDivide(attributes.damage, 'damage');
	});
})

attributes.healing.forEach(attr => {
	on(`change:${attr}`, (eventinfo) => {
		attributeSumDivide(attributes.healing, 'healing_rate');
	});
})

attributes.hp.forEach(attr => {
	on(`change:${attr}`, (eventinfo) => {
		hitpointsCalculato(attributes.hp, 'total_hit_points');
	});
})

attributes.unconcious.forEach(attr => {
	on(`change:${attr}`, (eventinfo) => {
		unconciousCalculator(attributes.unconcious, 'unconcious');
	});
})

//When performing calculations in King Arthur Pendragon, round
//0.5 and higher fractions upward and lesser fractions downward.
//For example, a character with a Damage value of 4.43 would
//have an effective value of 4, while a character with a Damage val-
//ue of 4.5 would have a 5.
const roundFraction = sum => sum >= 0.5 ? Math.ceil(sum) : Math.floor(sum)
const divideBy = (sum, num) => sum/num;

const totalAttributes = values => {
	let sum = 0
	Object.values(values).forEach(num => sum += parseInt(num) || 0)
	return sum
}

const attributeSumDivide = (attributes, set) => {
    getAttrs(attributes, (values) => {
    	const divide = "damage" ? 6 : 10;
    	let sum = totalAttributes(values);
    	sum = divideBy(sum, divide) ;

	    setAttrs({
	    	[`${set}`]: roundFraction(sum)
	    });
	});
};

const hitpointsCalculato = (attributes, set) => {
    getAttrs(attributes, (values) => {
	    setAttrs({
	    	[`${set}`]: totalAttributes(values)
	    });
	});
};

const unconciousCalculator = (attributes, set) => {
    getAttrs(attributes, (values) => {
    	let sum = totalAttributes(values);
    	sum = divideBy(sum, 4) ;

	    setAttrs({
	    	[`${set}`]: roundFraction(sum)
	    });
	});
};