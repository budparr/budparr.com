//adds anchor to headings ala ben.balter.com
(function() {
  $(function() {
    return $(".entry-content h2, .entry-content h3, .entry-content h4, .entry-content h5, .entry-content h6").each(function(i, el) {
      var $el, icon, id;
      $el = $(el);
      id = $el.attr('id');
      icon = '<i class="fa fa-link fa-fw"></i>';
      if (id) {
        return $el.prepend($("<a />").addClass("header-link").attr("href", "#" + id).html(icon));
      }
    });
  });
}).call(this);