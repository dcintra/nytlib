 $(document).ready(function(){
     function search(query) {
         location.href = "http://localhost:3000/search/term="+encodeURI(query)
     }

     $('#searchbutton').click(function() {
         search($('#searchbar').val());
     });

     $('#searchbar').keydown(function(e) {
     	if (e.keyCode == '13') {
     		search($(this).val());
     	}
     });
 });
