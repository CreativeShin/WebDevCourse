function average(array){
    var sum = 0;
    for(var i=0; i<array.length; i++){
        sum += array[i];
    }
    var avg = Math.round(sum/array.length);
    return avg;
}
var score = average([90,98,89,100,100,86,94]);
console.log(score);
var score1 = average([40,65,77,82,80,54,73,63,95,49]);
console.log(score1);
// function average(scores){
//     var total =0;
//     scores.forEach(function(score){
//         total+= score;
//     });
//     var avg= total/scores.length;
//     return Math.round(avg);
// }

// var score = average([90,98,89,100,100,86,94]);
// console.log(score);
// var score1 = average([40,65,77,82,80,54,73,63,95,49]);
// console.log(score1);