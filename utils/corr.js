module.exports.Corr = function (x, y) {

  var length = x.length;
  var mean1 = 0;
  for (var i = 0; i < length; i++) {
    mean1+= Number(x[i]);
  } 
  mean1=mean1/length;
  var mean2 = 0;
  for (var i = 0; i < length; i++) {
    mean2 += Number(y[i]);
  }
  mean2 = mean2/ length;
  var a = 0;
  var b = 0;
  var axb = 0;
  var a2 = 0;
  var b2 = 0;

  for (var i = 0; i < length; i++) {
    a = x[i] - mean1;
    b = y[i] - mean2;
    axb = axb + (a * b);
    a2 = a2 + a*a;
    b2 = b2 + b*b;
  }

  var corr = axb / Math.sqrt(a2 * b2);

  return corr;
}