<template>
  <div class='review'>
        <h2 data-test='review-title' class='review-title'>{{ review.title }}</h2>
        <p>By {{review.user}}</p>
        <p class='place-review'>{{ review.review }}</p>
        <p>Posted on {{review.date}}</p>
  </div>
</template>

<script>
export default {
    name: 'ShowReview',
    props: ['review'],
    data: function() {
        return {
        };
    }
}
</script>

<style>

</style>