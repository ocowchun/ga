'use strict';

//genome 基因組
//每個基因組會對應到一個變數
//基因組的值是二進位的 ex: [0,1,0,1]=5
function calculateGenome(genome) {
	var result = 0;
	for (var i = 0, max = genome.length; i < max; i++) {
		result += Math.pow(2, i) * genome[i];
	}
	return result;
}

var Chromosome = function() {
	var args = Array.prototype.slice.call(arguments, 0),
		i, max;
	this.genomeCount = args.length;
	this.totalGenome = [];
	for (i = 0, max = args.length; i < max; i++) {
		this['x' + i + 'genome'] = args[i];
		this['x' + i] = calculateGenome(args[i]);
		this.totalGenome = this.totalGenome.concat(args[i])
	}
};

Chromosome.prototype.changeGene = function(index, gene) {
	this.totalGenome[index] = gene;
	var currentIndex = 0;
	for (var i = 0; i < this.genomeCount; i++) {
		var length = this['x' + i + 'genome'].length;
		this['x' + i + 'genome'] = this.totalGenome.slice(currentIndex, currentIndex + length);
		this['x' + i] = calculateGenome(this['x' + i + 'genome']);
		currentIndex += length;
	}

};

module.exports = Chromosome;