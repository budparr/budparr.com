---
layout: page
title: 'Mixing Future and Past Dated Entries in Wordpress, with Date-based Filters'
tags: ['Wordpress']
categories: ['Development']
---
We build web properties for publishers who are often promoting books that are not yet published. In Wordpress we treat the publish date of an entry as the publish date of the book. This presents a few problems in Wordpress showing yet-to-be-published entries, but we've been able to solve them with filters. Action hooks and filters are the most powerful feature of Wordpress, in my view. Used concisely and judiciously, they give you great control over how your content is displayed.

For a recent project for <a title="The Website of Bellevue Literary Press" href="http://blpress.org">Bellevue Literary Press</a> we wanted to display the client's books mixed in various ways based on the following rules:
<ol>
	<li>We have room for 9 books total in 3 locations. </li>
	<li>Location #1 shows 1 book: the most recently published.</li>
	<li>Location #2 shows 2 books, recently published, not including the book displayed in location #1 (solved with a simple "'offset' =&gt; 1")</li>
	<li>Location #3 show up to 6 books, if there are any, that will be published in the next 7 months.</li>
	<li>Location #3 - If there are fewer than 6 books that meet the criteria in previous rule, then, and only then, we want to show the most recently published books that were not included in locations #1 or 2</li>
</ol>
<img class="aligncenter size-full wp-image-4051" alt="Bellevue-Literary-Press-_-Bellevue-Literary-Press" src="http://budparr.com/assets/img/uploads/2013/03/Bellevue-Literary-Press-_-Bellevue-Literary-Press.jpg" width="700" height="758" />

The first two locations are handled simply with an offset rule, so we'll skip to location 3.

<strong>First, create a function to define our date filter*:</strong>
<pre><code>
function filter_where( $where = '' ) {
// posts from X to Y days 
   $where .= " AND post_date &gt;= '" . date('Y-m-d', strtotime('0 days')) . "'" . "
               AND post_date &lt;= '" . date('Y-m-d', strtotime('210 days')) . "'";
     return $where;
}
</code></pre>
The structure of this function gives me a bit of flexibility because when I wrote the code for this section I didn't know what the specific time constraints would be. You can google for other ways to set your date parameters.

<strong>Apply the function in a filter just before our query:</strong>

source: <a href="http://codex.wordpress.org/Plugin_API/Filter_Reference/posts_where">Filter Reference/posts_where</a>
<pre><code>add_filter( 'posts_where', 'filter_where' );

$books_forthcoming_args = array(
       'post_type' =&gt; 'product',
       'posts_per_page' =&gt; 6,
       'orderby' =&gt; 'date',
       'order' =&gt; 'asc',
       'meta_key' =&gt; '_thumbnail_id',
        'post_status' =&gt; 'future'
               ) ;
 $books_forthcoming = new WP_Query( $books_forthcoming_args );
</code></pre>
<em>aside: note that I wanted to only show books that had a thumbnail image, so added "'meta_key' =&gt; '_thumbnail_id'," to my parameters.</em>

<strong>Do a little math:</strong>
<pre><code>$forthcoming_count = $books_forthcoming-&gt;post_count;
$books_remaining = 6 - $forthcoming_count;
</code></pre>
The first line gives me a count of the results in the $books_list query.

The second line gives me my count of the total number of books I want to show, less the number of books I am showing with this query.

<strong>I needed to manipulate my header based on results, so add this sort of rule to header:</strong>
<pre><code>&lt;h3&gt;Recent&lt;?php if ( $forthcoming_count &gt; 0 ){ echo ' &amp; Forthcoming'; } ?&gt; Titles&lt;/h3&gt;
</code></pre>
<strong style="line-height: 1.714285714; font-size: 1rem;">Display posts in the usual fashion, then remove filter</strong>
<pre><code>remove_filter( 'posts_where', 'filter_where' );  
</code></pre>
&nbsp;

<strong>Set up the second query using our $books_remaining variable to determine the number of books to show.</strong>
<pre><code>     $books_recent_args = array(
     'posts_per_page' =&gt; $books_remaining,
     'offset' =&gt; 3,
     'orderby' =&gt; 'date',
     'order' =&gt; 'desc',
     'post_status' =&gt; 'publish'
     );
</code></pre>
"'posts_per_page' =&gt; $books_remaining," uses my earlier math to show the total number of slots available less the number of books shown in the first query.

"'offset' =&gt; 3," - accounting for the books I showed in locations #1 and 2.

"'post_status' =&gt; array( 'publish' )" - only currently published books, please.

<strong>Display Posts as usual.</strong>

If you have any thoughts or comments on this, by all means, drop a note.
