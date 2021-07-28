<template>

  <div class="form-group" id="address">
      <input type="fullName" 
         class="form-control" 
         id="inputFullName"
         v-model="fullName" 
         placeholder="Flat" required/>
  <input type="mobileNo" 
         class="form-control" 
         id="inputMobileNo" 
         v-model="mobileNo"
         placeholder="mobile No." required/>
  <input type="flatNo" 
         class="form-control" 
         id="inputFlat"
         v-model="flatNo"
         placeholder="flat No." required/>
  <input type="area" 
         class="form-control" 
         id="inputArea"
         v-model="area"
         placeholder="area" required/>
  <input type="landmark" 
         class="form-control" 
         id="inputLandmark"
         v-model="landmark"
         placeholder="landmark">  
  <input type="city" 
         class="form-control" 
         id="inputCity"
         v-model="city"
         placeholder="City" required/>
  
  <input type="state" 
         class="form-control" 
         id="inputState" 
         v-model="state"
         placeholder="State" required/>
  <input type="country" 
         class="form-control" 
         id="inputCountry" 
         v-model="country"
         placeholder="Country" required/>
  <input type="zip" 
         class="form-control" 
         id="inputZip" 
         v-model="pincode"
         placeholder="Zip" required/>
  <input type="addressType"
         class="form-control"
         id="addressType"
         v-model="addressType" required>
       <button v-on="addAddress">add this address</button>
</div>
</template>

<script lang='ts'>
import Vue from 'vue'
import { address } from '../interface/order-interface'
export default Vue.extend({
       data(){
              return{
                     address:{
                            fullName:'',
                            mobileNo:0,
                            flatNo:'',
                            area:'',
                            landmark:'',
                            city:'',
                            state:'',
                            country:'',
                            pinCode:0,
                            addressType:'',
                     }as address
              }
       },
       methods:{
              addAddress(){
                     this.$emit('addressAdded',this.address);
              }
       }

})
</script>

<style>
input, label {
  margin: 5px 5px;
}

.form-group {
  margin: 30px auto;
  width: 450px;
}

.form-control {
  float: left;
}

#inputStreet {
  width: 100%;
}

#inputCity {
  width: 50%;
}

#inputState {
  width: 15%;
}

#inputZip {
  width: 28%;
}

#inputCounty {
  width: 45%;
}

#inputCountry {
  width: 50%;
}

</style>