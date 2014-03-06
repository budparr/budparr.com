//control widows, ala www.css-tricks.com/preventing-widows-in-post-titles/
$("h1, h2, h3, h4, h5, h6").each(function() {  
  var wordArray = $(this).text().split(" ");
  if (wordArray.length > 1) {
    wordArray[wordArray.length-2] += "&nbsp;" + wordArray[wordArray.length-1];
    wordArray.pop();
    $(this).html(wordArray.join(" "));
  }
});


{% comment %}
// $(“h1”).each(function() {
// var self = $(this);
// self.html( self.text().replace(/\s(\S+)$/,” $1″); );
// });
{% endcomment %}


