<script src="{{site.baseurl}}/assets/js/lists.min.js"></script>
<script type="text/javascript">
    var options = {
      valueNames: ['category', 'title',   'publication']
    };
    var entryList = new List('entry-list', options);
      // cycle through writing categories to generate filter
  {% if page.url == "/journalism/" %}    
    {% for link in site.data.writingCats %}        
        document.getElementById("filter-{{link.catName}}").onclick=function(){
            entryList.filter(function(item) {
               if (item.values().category == "{{link.name}}" ) {
                 return true;
                 } else {
                 return false;
              }
          });
        };
    {% endfor %}
   {% endif %} 
        //and clear the filters
     document.getElementById("filter-none").onclick=function(){
         entryList.filter();
        };
</script>
