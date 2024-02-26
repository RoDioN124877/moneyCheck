import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCosProfit = defineStore('counter', () => {
  const cosProfit = ref([
    {
      id: 1,
      title: "продукты",
      money: 1290,
      category: "продукты",
      date: "2024-02-26",
      class: "трата"
    },
    {
      id: 2,
      title: "зп",
      money: 600000,
      category: "зарплата",
      date: "2024-02-25",
      class: "получение"
    }
  ])

  return { cosProfit }
})
