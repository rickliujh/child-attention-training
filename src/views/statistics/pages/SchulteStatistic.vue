<template>
  <div>
    <div class="bg-white shadow-6 rounded-borders">
      <h6 class="text-h6 text-weight-bold text-blue-6 q-pt-md q-ml-md q-mt-none q-mb-md">指标</h6>
      <div v-if="!isShow" class="q-pb-md">
        <h4 class="text-h4 text-center text-grey-5">完成5次训练来获取数据</h4>
      </div>
      <div class="index q-pb-md" v-if="isShow">
        <div
          class="index-item cursor-pointer"
          style="border-left-color: #1890FF;"
          @click="er = true"
        >
          <div class="index-item-name">工作效率（ER）</div>
          <div class="index-item-value">99</div>

          <q-dialog v-model="er" persistent transition-show="scale" transition-hide="scale">
            <q-card class="bg-primary text-white" style="width: 300px">
              <q-card-section>
                <div class="text-h6">工作效率（ER）</div>
              </q-card-section>

              <q-card-section>
                <p>通过以下公式计算：</p>
                <p class="text-center">
                  <span class="text-body1 text-weight-medium">ER =（T1 + T2 + T3 + T4 + T5）/ 5</span>，其中
                </p>
                <p>Ti是第i个表的工作时间。</p>
              </q-card-section>

              <q-card-actions align="right" class="bg-white text-primary">
                <q-btn flat label="OK" v-close-popup/>
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>
        <div
          class="index-item cursor-pointer"
          style="border-left-color: #2FC25B;"
          @click="bp = true"
        >
          <div class="index-item-name">可加工性（BP）</div>
          <div class="index-item-value">99</div>
          <q-dialog v-model="bp" persistent transition-show="scale" transition-hide="scale">
            <q-card class="bg-positive text-white" style="width: 300px">
              <q-card-section>
                <div class="text-h6">可加工性（BP）</div>
              </q-card-section>

              <q-card-section>
                <p>计算公式如下：</p>
                <p class="text-center">
                  <span class="text-body1 text-weight-medium">BP = T1 / ER</span>
                </p>
                <p>结果小于1.0--分别是良好可行性的指标，该指标越高1.0，主体需要为主要工作做准备越多。</p>
              </q-card-section>

              <q-card-actions align="right" class="bg-white text-positive">
                <q-btn flat label="OK" v-close-popup/>
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>
        <div
          class="index-item cursor-pointer"
          style="border-left-color: #FACC14;"
          @click="pu = true"
        >
          <div class="index-item-name">心理稳定性（PU）</div>
          <div class="index-item-value">99</div>
          <q-dialog v-model="pu" persistent transition-show="scale" transition-hide="scale">
            <q-card class="bg-warning text-white" style="width: 300px">
              <q-card-section>
                <div class="text-h6">心理稳定性（PU）</div>
              </q-card-section>

              <q-card-section>
                <p>通过以下公式计算：</p>
                <p class="text-center">
                  <span class="text-body1 text-weight-medium">PU = T4 / ER</span>
                </p>
                <p>结果指标小于1.0表示心理稳定性良好，该指标越高，受试者执行任务的心理稳定性越差。</p>
              </q-card-section>

              <q-card-actions align="right" class="bg-white text-warning">
                <q-btn flat label="OK" v-close-popup/>
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>
      </div>
    </div>

    <div class="bg-white shadow-6 rounded-borders q-mt-md">
      <h6 class="text-h6 text-weight-bold text-blue-6 q-pt-md q-ml-md q-mt-none q-mb-none">参考</h6>
      <q-table
        class="q-ma-md"
        title="ER评估表"
        :data="ERTableData"
        :columns="ERTableColumns"
        row-key="age"
      ></q-table>
      <div class="q-pb-sm"></div>
    </div>

    <div class="bg-white shadow-6 rounded-borders q-mt-md">
      <h6 class="text-h6 text-weight-bold text-blue-6 q-pt-md q-ml-md q-mt-none q-mb-md">疲劳曲线</h6>
      <div v-if="!isShow" class="q-pb-md">
        <h4 class="text-h4 text-center text-grey-5">完成5次训练来获取数据</h4>
      </div>
      <div id="exhausting-curve" v-if="isShow"></div>
      <q-resize-observer @resize="onResize"></q-resize-observer>
    </div>
  </div>
</template>

<script>
import G2 from '@antv/g2'
import Dp from '../../../electron/renderer/persistence'
export default {
  name: 'SchulteStatistic',
  data () {
    return {
      chart: null,
      isShow: true,
      er: false,
      bp: false,
      pu: false,
      ERTableColumns: [
        {
          name: 'age',
          label: '年龄',
          field: 'age'
        },
        {
          name: 'five',
          label: '五分',
          field: 'five'
        },
        {
          name: 'four',
          label: '四分',
          field: 'four'
        },
        {
          name: 'three',
          label: '三分',
          field: 'three'
        },
        {
          name: 'two',
          label: '两分',
          field: 'two'
        },
        {
          name: 'one',
          label: '一分',
          field: 'one'
        }
      ],
      ERTableData: [
        {
          age: '10年',
          five: '45岁以下',
          four: '46-55',
          three: '56-65',
          two: '66-75',
          one: '76岁以上'
        },
        {
          age: '11年',
          five: '35岁以下',
          four: '36-45',
          three: '46-55',
          two: '56-65',
          one: '66岁以上'
        },
        {
          age: '12年',
          five: '30岁以下',
          four: '31-35',
          three: '36-45',
          two: '46-55',
          one: '56岁以上'
        }
      ]
    }
  },
  methods: {
    onResize (size) {
      this.chart.forceFit()
    },
    renderEcChart () {
      var data = [
        {
          time: '37.9',
          wrong: 10
        },
        {
          time: '23',
          wrong: 22
        },
        {
          time: '24',
          wrong: 20
        },
        {
          time: '30',
          wrong: 26
        },
        {
          time: '25',
          wrong: 20
        }
      ]

      this.chart = new G2.Chart({
        container: 'exhausting-curve',
        width: 200,
        height: 300
      })

      var defs = {
        time: {
          type: 'linear',
          alias: '花费时间',
          formatter (val) {
            return val + 's'
          }
        },
        wrong: {
          type: 'linear',
          alias: '错误次数'
        }
      }
      this.chart.source(data, defs)
      this.chart.tooltip({
        showTitle: true
      })

      // this.chart.axis('time', {
      //   label: {
      //     formatter (val) {
      //       return val + 's'
      //     }
      //   }
      // })

      this.chart
        .line()
        .position('time*wrong')
        .shape('smooth')
      this.chart
        .point()
        .position('time*wrong')
        .shape('smooth')
        .style({
          stroke: '#fff',
          lineWidth: 1
        })
      this.chart.render()
    }
  },
  mounted () {
    let time = Date.now()
    let data = [{
      time: '37.9',
      wrong: 10
    },
    {
      time: '23',
      wrong: 22
    },
    {
      time: '24',
      wrong: 20
    },
    {
      time: '30',
      wrong: 26
    },
    {
      time: '25',
      wrong: 20
    }]
    Dp.writeData(time, data)
    this.renderEcChart()
  }
}
</script>

<style lang="stylus" scoped>
.index
  display flex
  justify-content space-around

  .index-item
    border-left-style solid
    border-left-width 5px
    padding-left 8px

    .index-item-name
      color rgba(0, 0, 0, 0.45)
      font-size 14px

    .index-item-value
      color #262626
      font-size 22px
</style>
