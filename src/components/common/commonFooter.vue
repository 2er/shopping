<template>
  <div class="footer">
    <wv-footer class="footer-demo" text="Copyright © 2018 www.etonepay.com" :links="etoneLink"></wv-footer>
  </div>
</template>

<script>
export default {
  name: 'mfooter',
  data () {
    return {
      etoneLink: [
        {
          text: '易通支付',
          link: 'https://www.etonepay.com/'
        }
      ]
    }
  }
}
</script>

<style scoped>
  .footer {
    position: absolute;
    bottom: 8px;
    width: 100%;
  }
</style>
