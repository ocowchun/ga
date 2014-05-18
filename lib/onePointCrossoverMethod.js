var Chromosome = require('./chromosome');

function findPosition(chromosome) {
	var length = chromosome.totalGenome.length;
	return Math.floor(Math.random() * length);
}

function crossover(chromosome1, chromosome2) {
	var position = findPosition(chromosome1);
	var newc1 = chromosome1.changeGene(position, chromosome2);
	var newc2 = chromosome2.changeGene(position, chromosome1);
	return [newc1, newc2];
}

module.exports = crossover;