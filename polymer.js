const dotenv = require('dotenv');
const result = dotenv.config();
const genome = require('./rdns/rna');

if (result.error) {
    throw result.error;
}
else {
    genome.rnaStatus();  
}

