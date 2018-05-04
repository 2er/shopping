<template>
  <div class="home-container">
    <wv-header :fixed="true" background-color="#ffffff">
      <div class="logo-title" slot="left">
        <div class="logo"><img :src="logoImage"/></div>
        <div class="title">{{areaName}}</div>
      </div>
      <div class="member" slot="right" @click="$router.push('/member')">
        <icon name="user" :style="{color:'#A9A9A9'}"></icon>
      </div>
    </wv-header>
    <wv-swipe :height="300" :autoplay="3000">
      <wv-swipe-item v-for="(banner, index) in banners" :key="index"><img :src="banner.img"/></wv-swipe-item>
    </wv-swipe>
    <wv-grid>
      <wv-grid-item v-for="(nav, index) in navs" :key="index" :to="nav.url">
        <img :src="nav.img" slot="icon">
        <span slot="label">{{nav.title}}</span>
      </wv-grid-item>
    </wv-grid>
    <wv-group class="home-cells">
      <wv-cell class="home-cell" v-for="(cell, index) in cells" :key="index" is-link :to="cell.link">
        <img :src="cell.icon" slot="icon" class="cell-icon">
        <span slot="bd" class="cell-title">{{cell.title}}</span>
      </wv-cell>
    </wv-group>
    <wv-flex class="home-ad" v-for="(ad, index) in ads" :key="index">
      <wv-flex-item>
        <div class="ad-item"><img :src="ad.img"/></div>
      </wv-flex-item>
    </wv-flex>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'home',
  created: function () {
    this.getUserInfo()
  },
  data () {
    return {
      logoImage: 'http://i1.mallcoo.cn/sp_mall/58w0le43-7527-48b9-8125-a1d1b5eddf8e_1x60_4_0_80.jpg',
      areaName: '南方商城', // 17个中文字符
      banners: [
        {img: 'http://i1.mallcoo.cn/sp_mall/51x3n301-73e7-4119-8924-09c400841f78_750x440_4_0_80.jpg', url: 'http://www.baidu.com'},
        {img: 'http://i1.mallcoo.cn/sp_mall/6503421e-235f-4787-90e0-ec45b146a097_750x440_4_0_80.jpg', url: 'http://www.baidu.com'},
        {img: 'http://i1.mallcoo.cn/sp_mall/59x8n936-da71-4f8b-a11a-1be7150bfd77_750x440_4_0_80.jpg', url: 'http://www.baidu.com'},
        {img: 'http://i1.mallcoo.cn/sp_mall/57xcn6fc-c0cc-40c6-aff6-3dfd7d443c3a_750x440_4_0_80.jpg', url: 'http://www.baidu.com'},
        {img: 'http://i1.mallcoo.cn/sp_mall/51x3n301-73e7-4119-8924-09c400841f78_750x440_4_0_80.jpg', url: 'http://www.baidu.com'},
        {img: 'http://i1.mallcoo.cn/sp_mall/6503421e-235f-4787-90e0-ec45b146a097_750x440_4_0_80.jpg', url: 'http://www.baidu.com'}
      ],
      navs: [
        {title: '商户', img: 'http://i1.mallcoo.cn/sp_mall/5dwey607-b6de-4bdb-96ee-830ab40ca42c_90x90_1_0_80.png', url: 'http://www.baidu.com'},
        {title: '活动', img: 'http://i1.mallcoo.cn/sp_mall/5bwbyc91-469d-476b-9b6c-62a473bab703_90x90_1_0_80.png', url: 'http://www.baidu.com'},
        {title: '会员', img: 'http://i1.mallcoo.cn/sp_mall/58wcydca-e740-4ce4-9937-723b654bd356_90x90_1_0_80.png', url: 'http://www.baidu.com'},
        {title: '餐饮', img: 'http://i1.mallcoo.cn/sp_mall/58w0yfd4-bdf4-4ac3-91e8-c165449ac5cd_90x90_1_0_80.png', url: 'http://www.baidu.com'},
        {title: '团购', img: 'http://i1.mallcoo.cn/sp_mall/5bw1yaab-c24c-4b25-8fe0-c17fe100c9dc_90x90_1_0_80.png', url: 'http://www.baidu.com'},
        {title: '积分换礼', img: 'http://i1.mallcoo.cn/sp_mall/60039cc2-5aaf-463a-b555-006082e2a78c_90x90_1_0_80.png', url: 'http://www.baidu.com'},
        {title: '停车', img: 'http://i1.mallcoo.cn/sp_mall/5awey2af-b185-4169-bfb5-fcfb86d0b81f_90x90_1_0_80.png', url: 'http://www.baidu.com'},
        {title: 'WiFi', img: 'http://i1.mallcoo.cn/sp_mall/5dwey8c6-27a9-41a9-b4c4-52a8ce970cf2_90x90_1_0_80.png', url: 'http://www.baidu.com'}
      ],
      cells: [
        {
          title: '加入宁乐汇，送200积分！',
          intro: '加入宁乐汇，送200积分！',
          link: 'http://www.baidu.com',
          icon: 'http://i1.mallcoo.cn/sp_mall/56w6ld69-6780-42db-83dc-6fdde8b20aaf_40x40_1_0_80.png'
        }
      ],
      ads: [
        {img: 'http://i1.mallcoo.cn/sp_mall/5dyfx12f-b8a2-4324-9e8f-1fa7e71f003b_750x416_1_0_80.png', link: 'http://www.baidu.com'}
      ]
    }
  },
  components: {
  },
  computed: mapState({

  }),
  methods: {
    ...mapActions({
      getUserInfo: 'getUserInfo'
    })
  }
}
</script>

<style scoped>
  .home-container .wv-header .logo {
    float: left;
    height: 100%;
  }
  .home-container .wv-header .logo img{
    width: 50%;
    border-radius:50%
  }
  .home-container .wv-header .title {
    float: left;
    height: 100%;
    font-size: 14px;
    color: #343434;
  }
  .home-container .wv-swipe {
    border-radius: 0 0 100% 100%/20%;
  }
  .home-container .wv-swipe img {
    height: 300px;
  }
  .home-container .home-cells .cell-icon {
    width: 60%;
  }
  .home-container .home-cells .cell-title {
    font-size: 14px;
  }
  .home-container .home-ad {
    margin-top: 10px;
  }
  .home-container .home-ad img {
    width: 100%;
    height: 208px;
  }
</style>
