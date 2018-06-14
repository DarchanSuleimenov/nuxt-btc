<template>
  <section class="container">
    <el-card class="box-card">
      <el-form
        ref="form"
        size="medium"
        label-width="250px"
        >
        <el-form-item label="Количество купленных биткоинов">
          <el-input-number
            v-model="bitcoins"
            :min="0">
          </el-input-number>
        </el-form-item>
        <el-form-item label="Дата покупки биткоинов">
          <el-date-picker
            type="date"
            placeholder="Выберите дату"
            v-model="date"
            @change="dateChange">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="Курс биткоинов на дату покупки">
          <el-input
            :value="dateRate"
            readonly>
          </el-input>
        </el-form-item>
        <el-form-item label="Стоимость купленных BTC в USD:">
          <el-input
            :value="inUSD"
            readonly>
          </el-input>
        </el-form-item>
        <el-form-item label="Текущий курс BTC в USD:">
          <el-input
            :value="currentRate"
            readonly>
          </el-input>
        </el-form-item>
        <el-form-item label="Доходность в %:">
          <el-input
            :value="effectPercent"
            readonly>
          </el-input>
        </el-form-item>
        <el-form-item label="Доходность в USD:">
          <el-input
            :value="effectUSD"
            readonly>
          </el-input>
        </el-form-item>
      </el-form>
    </el-card>
  </section>
</template>

<script>
import { getRate } from '~/assets/coinapi.js'
import { getCurrentRate } from '~/assets/coinmarketcapapi.js'

export default {
  components: {
  },
  data () {
    return {
      bitcoins: 0,
      // date: (new Date()).toISOString()
      date: '',
      dateRate: 0
    }
  },
  async asyncData (context) {
    try {
      let data = await getCurrentRate()
      if (data === null) throw('Неправильные параметры запроса!')
      return { currentRate: data }

    } catch (err) {
      console.error(err)
      return { currentRate: 0 }
    }
  },
  watch: {
    date: function (date) {

    }
  },
  computed: {
    inUSD () {
      return this.bitcoins * this.dateRate
    },
    effectPercent () {
      if (this.dateRate == 0) {
        return 0
      } else {
        return this.currentRate / this.dateRate
      }
    },
    effectUSD () {
      return this.bitcoins * this.currentRate - this.inUSD
    }
  },
  methods: {
    async dateChange() {
      try {
        this.$nuxt.$loading.start()
        let data = await getRate('BTC', 'USD', this.date, process.env.COINAPI_KEY)
        this.$nuxt.$loading.finish()

        if (data === null) throw('Неправильные параметры запроса!')
        this.dateRate = data.rate

      } catch (err) {
        console.error(err)
        this.dateRate = 0
      }
    }
  },
}
</script>

<style scoped>
</style>
