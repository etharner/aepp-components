```js
  new Vue({
    data () { return { address: '' } },
    template: `
      <div>
        <ae-address-input
          placeholder="ak$aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
          v-model="address"
        />
        Address: {{address}}
      </div>
    `
  })
```
