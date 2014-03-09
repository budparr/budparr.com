<script>
$('article h1').each(function() {
    var wordArray = $(this).html().split(' ');
    if (wordArray.length > 1) {
        wordArray[wordArray.length-2] += '&nbsp;' + wordArray[wordArray.length-1];

        var lastWord = wordArray.pop();
        lastWord = lastWord.replace(/.*((?:<\/\w+>)*)$/, '$1');
        $(this).html(wordArray.join(' ') + lastWord);
    }
});

</script>