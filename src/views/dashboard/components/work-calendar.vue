<template>
  <div>
    <el-row type="flex" justify="end">
      <el-select
        size="small"
        style="width: 120px"
        v-model="currentYear"
        placeholder="请选择年份"
        @change="dateChange"
      >
        <el-option
          v-for="item in yearList"
          :key="item"
          :label="item"
          :value="item"
        >
          {{ item }}
        </el-option>
      </el-select>
      <el-select
        size="small"
        style="width: 120px"
        v-model="currentMonth"
        placeholder="请选择月份"
        @change="dateChange"
      >
        <el-option v-for="item in 12" :key="item" :label="item" :value="item">
          {{ item }}
        </el-option>
      </el-select>
    </el-row>
    <el-calendar v-model="currentDate">
      <template v-slot:dateCell="{ date, data }" class="content">
        <div class="date-content">
          <span class="text"> {{ data.day | getDay }}</span>
          <span v-if="isWeek(date)" class="rest">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  name: "WorkCalendar",
  props: {
    startDate: {
      type: Date,
      default: () => new Date(),
    },
  },
  data() {
    return {
      currentYear: "",
      currentMonth: "",
      currentDate: "",
      yearList: [],
    };
  },
  filters: {
    getDay(val) {
      const day = val.split("-")[2];
      return day.startsWith("0") ? day.substr(1) : day;
    },
  },
  created() {
    this.currentYear = this.startDate.getFullYear();
    this.currentMonth = this.startDate.getMonth() + 1;
    this.yearList = Array.from(Array(11), (item, index) => {
      return this.currentYear + index - 5;
    });
    this.dateChange(this.startDate.getDate());
  },

  methods: {
    isWeek(value) {
      return [6, 0].includes(value.getDay());
    },
    dateChange(date) {
        console.log(date);
      const y = this.currentYear;
      const m = this.currentMonth;
      const d = date|| 1;
      this.currentDate = new Date(y + "-" + m + "-" + d);
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-calendar-day {
  height: auto;
}
::v-deep .el-calendar-table__row td,
::v-deep .el-calendar-table tr td:first-child,
::v-deep .el-calendar-table__row td.prev {
  border: none;
}
.date-content {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
.date-content .rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
}
.date-content .text {
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
}
::v-deep .el-calendar-table td.is-selected .text {
  background: #409eff;
  color: #fff;
  border-radius: 50%;
}
::v-deep .el-calendar__header {
  display: none;
}
</style>
