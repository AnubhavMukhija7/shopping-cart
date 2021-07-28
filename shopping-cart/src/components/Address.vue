<template>
<div id="address-details">
  <div v-if="!addressAdded" class="form-group" >
       <label>Enter address:</label>
       <input type="fullName" 
              class="form-control" 
              id="inputFullName"
              v-model="address.fullName" 
              placeholder="Full Name" required/>
       <input type="mobileNo" 
              class="form-control" 
              id="inputMobileNo" 
              v-model="address.mobileNo"
              placeholder="mobile No." required/>
       <input type="flatNo" 
              class="form-control" 
              id="inputFlat"
              v-model="address.flatNo"
              placeholder="flat No." required/>
       <input type="area" 
              class="form-control" 
              id="inputArea"
              v-model="address.area"
              placeholder="area" required/>
       <input type="landmark" 
              class="form-control" 
              id="inputLandmark"
              v-model="address.landmark"
              placeholder="landmark">  
       <input type="city" 
              class="form-control" 
              id="inputCity"
              v-model="address.city"
              placeholder="City" required/>
       
       <input type="state" 
              class="form-control" 
              id="inputState" 
              v-model="address.state"
              placeholder="State" required/>
       <input type="country" 
              class="form-control" 
              id="inputCountry" 
              v-model="address.country"
              placeholder="Country" required/>
       <input type="zip" 
              class="form-control" 
              id="inputZip" 
              v-model="address.pincode"
              placeholder="Zip" required/>
       <input type="addressType"
              class="form-control"
              id="addressType"
              v-model="address.addressType"
              placeholder="Home/Office" required>
       <button v-on:click="addAddress">add this address</button>
  </div>
  <div v-if="addressAdded">
         <p>Address successfully added</p>
  </div>
</div>
</template>

<script lang='ts'>
import Vue from 'vue'
import { addressType } from '../interface/order-interface'
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
                     }as addressType,
                     addressAdded:false,
              }
       },
       methods:{
              addAddress(){
                     this.addressAdded=true;
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