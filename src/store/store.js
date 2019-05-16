import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//状态
const state={
  //用户登录信息
  userInfo:JSON.parse(sessionStorage.getItem('userInfo')),
  //所有轨迹信息可视化数据
  traces:[],
  //分作家轨迹数组可视化数据
  poetTraces:[],
  //轨迹表信息
  tracesInfo:[],
  //所有作品可视化数据
  poemsData:[],
  //分作家作品可视化数据
  poetsPoems:[],
  //作品表信息
  poemsInfo:[],
  //轨迹与作品模式切换
  mode:'轨迹'

}

//mutations  操作state
const mutations = {
  SAVE_USERINFO(state,userInfo){

    //把用户信息存入本地存储
    sessionStorage.setItem('userInfo',JSON.stringify(userInfo))
    state.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))

  },

  //所有轨迹信息可视化数据存入
  setTraces (state,tracesData){
    state.traces = []
    state.tracesInfo = []
    tracesData.forEach(function (value) {
      let {startx,starty,endx,endy} = value
      let {作家,朝代,年份,起始点,目的地省,目的地市县} = value
      state.traces.push([[startx,starty],[endx,endy]])
      let traceInfo = {
        作家,
        朝代,
        年份,
        起始点,
        目的地省,
        目的地市县
      }
      state.tracesInfo.push(traceInfo)
    })
  },

  //文人轨迹数组可视化数据存入
  setPTraces (state,tracesData){
    state.poetTraces = []
    state.tracesInfo = []
    tracesData.forEach(function (poet) {
      let poetTrace = []
      poet.forEach(function (value) {
        let {startx,starty,endx,endy} = value
        let {作家,朝代,年份,起始点,目的地省,目的地市县} = value
        poetTrace.push([[startx,starty],[endx,endy]])
        let traceInfo = {
          作家,
          朝代,
          年份,
          起始点,
          目的地省,
          目的地市县
        }
        state.tracesInfo.push(traceInfo)
      })
      state.poetTraces.push(poetTrace)
    })
  },

  //所有作品可视化数据存入
  setPoems(state,poemsData){
    state.poemsData = []
    state.poemsInfo = poemsData
    poemsData.forEach(function (value) {
      state.poemsData.push({
        name: value.地点,
        value: [value.经度,value.纬度,value.count]
      })
    })
  },

  //分作家作品可视化数据存入
  setPPoems(state,poemsData){
    state.poetsPoems = []
    state.poemsInfo = []
    poemsData.forEach(function (value) {
      let poetPoems = []
      value.forEach(function (value) {
        poetPoems.push({
          name: value.地点,
          value: [value.经度,value.纬度,value.count]
        })
        state.poemsInfo.push(value)
      })
      state.poetsPoems.push(poetPoems)
      //console.log(state.poetsPoems)
    })
  },

  //显示数据切换
  changeMode(state,newMode){
    state.mode = newMode
    console.log(state.mode)
  }
}

const store = new Vuex.Store({
  state,
  mutations
});

export default store