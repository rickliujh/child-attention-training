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
          <div class="index-item-value">{{erVal}}</div>

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
          <div class="index-item-value">{{bpVal}}</div>
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
          <div class="index-item-value">{{puVal}}</div>
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
      <ve-line class="q-pa-md" v-if="isShow" :width="chartWidth" :data="chartData" :settings="chartSettings"></ve-line>
      <q-resize-observer @resize="onResize"></q-resize-observer>
    </div>
  </div>
</template>

<script>
import { DataManager, DataType } from '../../../electron/renderer/data'
import VeLine from 'v-charts/lib/line.common'

export default {
  name: 'SchulteStatistic',
  components: {
    VeLine
  },
  data () {
    this.chartSettings = {
      labelMap: {
        'time': '花费时间',
        'wrong': '错误次数'
      },
      legendName: {
        '错误次数': '疲劳曲线'
      },
      xAxisType: ['value'],
      yAxisName: ['次', '秒']
    }
    return {
      isShow: true,
      er: false,
      erVal: 0,
      bp: false,
      bpVal: 0,
      pu: false,
      puVal: 0,
      chartData: {},
      chartWidth: '200px',
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
          five: '45以下',
          four: '46-55',
          three: '56-65',
          two: '66-75',
          one: '76以上'
        },
        {
          age: '11年',
          five: '35以下',
          four: '36-45',
          three: '46-55',
          two: '56-65',
          one: '66以上'
        },
        {
          age: '12年',
          five: '30以下',
          four: '31-35',
          three: '36-45',
          two: '46-55',
          one: '56以上'
        }
      ]
    }
  },
  methods: {
    onResize (size) {
      this.chartWidth = size.width - 30 + 'px'
    },
    canUseData (data) {
      if (!data || data.length < 5) {
        this.isShow = false
        return false
      }
      return true
    },
    renderEcChart (data) {
      if (!this.canUseData(data)) return

      this.chartData = {
        columns: ['time', 'wrong'],
        rows: data
      }
    },
    renderIndicator (data) {
      if (!this.canUseData(data)) return

      let sum = 0; let t1 = data[0].time; let t4 = data[3].time

      for (const key in data) {
        sum += parseFloat(data[key].time)
      }

      this.erVal = (sum / data.length).toFixed(2)
      this.bpVal = (t1 / this.erVal).toFixed(2)
      this.puVal = (t4 / this.erVal).toFixed(2)
    }
  },
  mounted () {
    let dm = new DataManager()

    dm.getSchultTableLastFive()
      .then((data) => this.renderIndicator(data))

    dm.getSchultTableToday()
      .then((data) => this.renderEcChart(data))
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
