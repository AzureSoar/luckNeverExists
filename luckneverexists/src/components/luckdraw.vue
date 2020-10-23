<template>
  <div class="main">
    <h1>{{ msg }}</h1>
    <h3>{{switchBtn?'一键变非':'一键变欧'}}👇</h3>
    <mt-switch v-model="switchBtn" class="switchBtn" ></mt-switch>
    <LuckyWheel
        style="width: 310px; height: 310px; "
        class="luckywheel"
        ref="LuckyWheel"
        :prizes="prizes1"
        :default-style="defaultStyle1"
        :blocks="blocks1"
        :buttons="buttons1"
        @start="startCallBack1"
        @end="endCallBack1"
    />
    <LuckyGrid
      style="width: 310px; height: 310px"
      ref="LuckDraw"
      :prizes="prizes2"
      :button="btnConfig2"
      :blocks="blocks2"
      :default-style="defaultStyle2"
      :active-style="activeStyle2"
      @start="startCallBack2"
      @end="endCallBack2"
    />
    <mt-button type="primary" @click="handleClick">氪金增加次数</mt-button>
  </div>
</template>

<script>
// import VueClipboards from 'vue-clipboards2'
export default {
  name: 'luckdraw',
  props: {
    msg: String
  },
  data() {
    return {
      luckyNum: 0,
      BlackIndex:0,
      switchBtn:false,
      originText:"",
      //转盘
      prizes1: [],
      defaultStyle1: {
          fontColor: '#d64737',
          fontSize: '14px'
      },
      blocks1: [
          { padding: '13px', background: '#d64737' }
      ],
      buttons1: [
          { radius: '50px', background: '#d64737' },
          { radius: '45px', background: '#fff' },
          { radius: '41px', background: '#f6c66f', pointer: true },
          {
          radius: '35px', background: '#ffdea0',
          imgs: [{ src: require('@/assets/img/button.png'), width: '65%', top: '-13%' }]
          }
      ],
      //九宫格
      prizes2: [],
      blocks2: [
        { padding: '15px', background: '#ffc27a', borderRadius: 28 },
        { padding: '4px', background: '#ff4a4c', borderRadius: 23 },
        { padding: '4px', background: '#ff625b', borderRadius: 20 },
      ],
      defaultStyle2: {
        gutter: 5,
        borderRadius: 15,
        fontColor: '#DF424B',
        // fontColor: '#fff',
        fontSize: '14px',
        textAlign: 'center',
        background: '#fff',
        shadow: '0 5 1 #ebf1f4'
      },
      activeStyle2: {
        background: 'linear-gradient(270deg, #FFDCB8, #FDC689)',
        shadow: ''
      },
    }
      
  },
  computed: {
    btnConfig2 () {
      return {
        x: 1,
        y: 1,
        background: 'linear-gradient(270deg, #FFDCB8, #FDC689)',
        shadow: '0 5 1 #e89b4f',
        fonts: [
          { text: `${this.luckyNum} 次`, fontColor: '#fff', top: '73%', fontSize: '11px' },
        ],
        imgs: [
          { src: require('@/assets/img/button.png'), width: '65%', top: '13%' },
          // { src: require('@/assets/img/btn.png'), width: '50%', top: '73%' }
        ]
      }
    }
  },
  methods: {
    //转盘
    getPrizesList1 () {
        this.prizes1 = []
        let data = ['不谢参与！！打工人', '1不知有什么卵用积分', '0.000000000000001元红包', '地狗超市有门槛券', '10000被迫养的狗的狗粮', '中国不移动话费充值券', '双人豪华火星单程游', '2147483647元红包']
        data.forEach((item, index) => {
            this.prizes1.push({
            title: item,
            background: index % 2 ? '#f9e3bb' : '#f8d384',
            fonts: [{ text: item, top: '8%' }],
            // imgs:[{ src: require(`@/assets/img/${index}.png`), width: '30%', top: '25%' }],
            })
        })
    },
    startCallBack1 () {
        this.$refs.LuckyWheel.play()
      setTimeout(() => {
        // this.$refs.LuckyWheel.stop(Math.random() * 8 >> 0)
        if(this.switchBtn){
          this.BlackIndex = 7
        }else {
          this.BlackIndex = Math.random() * 7 >> 0
        }
        this.$refs.LuckyWheel.stop(this.BlackIndex)
        }, 3000)
    },
    endCallBack1 (prize) {
      alert(`恭喜你获得${prize.title}`)
    },


    //九宫格
    handleClick() {
      this.luckyNum++
    },
    getPrizesList2 () {
      // 模拟接口请求奖品列表
      setTimeout(() => {
        let data = [
          { name: '辣鸡' },
          { name: '辣鸡' },
          { name: '辣鸡' },
          { name: '辣鸡' },
          { name: '辣鸡' },
          { name: '辣鸡' },
          { name: '抽奖次数＋1' },
          { name: '特等奖' }
        ]
        this.prizes2 = []
        this.luckyNum = 1
        let axis = [[0, 0], [1, 0], [2, 0], [2, 1], [2, 2], [1, 2], [0, 2], [0, 1]]
        for (let i = 0; i < 8; i++) {
          let item = data[i]
          this.prizes2.push({
            index: i, x: axis[i][0], y: axis[i][1],
            fonts: [{ text: item.name, top: '42%' }],
            // imgs: [{ src: item.img, width: '55%', top: '10%' }]
          })
        }
      }, 0)
    },
    startCallBack2 () {
      if (!this.luckyNum) return alert('次数不足，明天再来吧')
      this.$refs.LuckDraw.play()
      setTimeout(() => {
        let blackNum = 0
        if(this.switchBtn){
          blackNum = 7
        }else {
          blackNum = Math.random() * 6 >> 0
        }
        this.$refs.LuckDraw.stop(blackNum)
      }, 2000)
    },
    endCallBack2 (prize) {
      alert(`恭喜你获得大奖: ${prize.fonts[0].text}`)
      if(prize.index!=6){
        this.luckyNum--
      }
      // if(prize.index==0||prize.index==7){
      //   this.luckyNum--
      // }
      // console.log('prize',prize);
    }
  },
  mounted() {
      this.getPrizesList1()
      this.getPrizesList2()

  },
  created() {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.switchBtn {
}
.luckyWheel {
}
.magicBtn {
  /* color: #3079ed; */
  animation-name: textchange-color;
  animation-duration: 3s;
  animation-timing-function: linear;
  animation-delay: 0s;
  animation-iteration-count: infinite;
  animation-direction: normal;
  animation-fill-mode: none;
}
@keyframes textchange-color {
  0%{
    color:red;
  }
  17%{
    color:orange;
  }
  34%{
    color:yellow;
  }
  51%{
    color:green;
  }
  68%{
    color:cyan;
  }
  85%{
    color:blue;
  }
  100%{
    color:purple;
  }
}

.disappearAnimation {
  animation-name: puff-out-horizontal;
  animation-duration: 1s;
  animation-timing-function: ease;
  animation-delay: 0s;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-fill-mode: none;
}
@keyframes puff-out-horizontal {
  0%{
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
    filter: blur(0);
    opacity: 1;
  }
  100%{
    -webkit-transform: scaleX(2);
    transform: scaleX(2);
    filter: blur(4px);
    opacity: 0;
  }
}


</style>
