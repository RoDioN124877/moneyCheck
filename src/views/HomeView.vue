<template>
  <main>
    <div class="container">
      <div v-for="operation in operations.cosProfit" :key="operation.id" class="operation-block">
        <p>{{ operation.title }}</p>
        <p>{{ operation.money }}</p>
        <p>{{ operation.class }}</p>
        <p>{{ operation.category }}</p>
        <p>{{ operation.date }}</p>
      </div>
      <div class="add-operation">
        <div @click="added = false" v-if="added == true" class="add-operation-preview">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Plus_symbol.svg/1200px-Plus_symbol.svg.png"
            alt=""
          />
        </div>
        <div class="add-operation-functional" v-else>
          <div class="add-operation-functional-header">
            <div @click="added = true">X</div>
          </div>
          <div class="add-operation-functional-main">
            <form action="" @submit.prevent="postNewOperation()">
              <input v-model="newOperation.title" type="text" placeholder="назваеме" />
              <input type="number" v-model="newOperation.money" />
              <select v-model="clas" name="" id="">
                <option value="трата">Трата</option>
                <option value="получение">Получение</option>
              </select>
              <select v-model="newOperation.category" name="" id="">
                <option v-if="clas == 'трата'" value="еда">еда</option>
                <option value="долг">долг</option>
                <option v-if="clas == 'трата'" value="развлечения">развлечения</option>
                <option v-if="clas == 'трата'" value="транспотр">транспотр</option>
                <option value="подарки">подарки</option>

                <option v-if="clas == 'трата'" value="техника">техника</option>
                <option v-else value="зарплата">зарплата</option>
              </select>
              <input v-model="newOperation.date" type="date" />
              <button class="button" type="submit">добавить</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="count">{{ count }}</div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useCosProfit } from '@/stores/counter'
const count = ref(0)
const added = ref(false)
const clas = ref('трата')
const operations = useCosProfit()
const newOperation = <any>reactive({
  id: operations.cosProfit.length,
  title: null,
  money: null,
  class: clas.value,
  category: null,
  date: null
})
const postNewOperation = () => {
  if (Object.values(newOperation).some((item) => item === null)) {
  } else {
    operations.cosProfit.push(newOperation)
  }
  countOperation()
}
const countOperation = () => {
  count.value = 0
  operations.cosProfit.forEach((elem) => {
    console.log(elem.class, elem.money)

    if (elem.class == 'трата') {
      count.value -= elem.money
    } else {
      count.value += elem.money
    }
  })
}
countOperation()
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.operation-block {
  width: 200px;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 1px solid black;
  padding: 10px;
}
.add-operation {
  width: 200px;
  height: 150px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.add-operation-functional {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.add-operation-functional-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  width: 150px;
}
.add-operation-preview img {
  width: 150px;
  height: 150px;
}
</style>
